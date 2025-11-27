import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

// get snippets
export const getSnippets = query({
  handler: async (ctx) => {
    const snippets = await ctx.db.query("snippets").order("desc").collect();
    return snippets;
  },
});

// get snipped by star for user
const isSnippetStarred = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, { snippetId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;

    const star = await ctx.db
      .query("stars")
      .withIndex("byUserIdAndSnippetId")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), identity.subject),
          q.eq(q.field("snippetId"), snippetId)
        )
      )
      .first();

    return !!star;
  },
});

// GET SNIPPET STAR COUNT
export const getSnippetStarCount = query({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, { snippetId }) => {
    const starCount = await ctx.db
      .query("stars")
      .withIndex("bySnippetId")
      .filter((q) => q.eq(q.field("snippetId"), snippetId))
      .collect();

    return starCount.length;
  },
});
