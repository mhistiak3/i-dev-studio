import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const saveExecution = mutation({
  args: {
    language: v.string(),
    output: v.optional(v.string()),
    error: v.optional(v.string()),
    code: v.string(),
  },
  handler: async (ctx, { language, output, error, code }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authenticated");

    // save execution
    await ctx.db.insert("codeExecutions", {
      userId: identity.subject,
      language,
      output,
      error,
      code,
    });
  },
});
