import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

// Snippet Mutation
export const createSnippet = mutation({
  args: {
    title: v.string(),
    code: v.string(),
    language: v.string(),
  },
  handler: async (ctx, { title, code, language }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authenticated");

    // get user and check user
    const user = await ctx.db
      .query("users")
      .withIndex("byUserId")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    // insert snippet
    const snippetId = await ctx.db.insert("snippets", {
      userId: identity.subject,
      userName: user.name || "Anonymous",
      title,
      code,
      language,
    });
    return snippetId;
  },
});
