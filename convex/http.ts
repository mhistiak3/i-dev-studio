import { WebhookEvent } from "@clerk/nextjs/server";
import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("CLERK_WEBHOOK_SECRET is not defined");
    }

    const svix_id = request.headers.get("svix-id") || "";
    const svix_timestamp = request.headers.get("svix-timestamp") || "";
    const svix_signature = request.headers.get("svix-signature") || "";

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Missing Svix headers", { status: 400 });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);
    const webhook = new Webhook(webhookSecret);
    let event: WebhookEvent;
    try {
      event = webhook.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (error) {
      console.error("Error verifying webhook:", error);
      return new Response("Invalid webhook signature", { status: 400 });
    }

    // Handle User Created event
    const eventType = event.type;
    if (eventType === "user.created") {
      const { first_name, last_name, email_addresses, id } = event.data;
      const name = `${first_name || ""} ${last_name || ""}`.trim();
      const email = email_addresses[0]?.email_address;

      try {
        // Create user in convex
        await ctx.runMutation(api.users.syncUser, {
          userId: id,
          name,
          email,
        });
      } catch (error) {
        console.error("Error creating user in Convex:", error);
        return new Response("Error creating user", { status: 500 });
      }
    }
    return new Response("Webhook processed successfully", { status: 200 });
  }),
});

export default http;
