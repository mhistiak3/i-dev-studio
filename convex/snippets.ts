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

// delete snippet mutation
export const deleteSnippet = mutation({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, { snippetId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authenticated");

    const snippet = await ctx.db.get(snippetId);
    if (!snippet) throw new ConvexError("Snippet not found");

    if (snippet.userId !== identity.subject) {
      throw new ConvexError("Unauthorized to delete this snippet");
    }

    // delete all comment belonging to this snippet
    const comments = await ctx.db
      .query("snippetComments")
      .withIndex("bySnippetId")
      .filter((q) => q.eq(q.field("snippetId"), snippetId))
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }
    // delete all stars belonging to this snippet
    const stars = await ctx.db
      .query("stars")
      .withIndex("bySnippetId")
      .filter((q) => q.eq(q.field("snippetId"), snippetId))
      .collect();

    for (const star of stars) {
      await ctx.db.delete(star._id);
    }

    // delete the snippet
    await ctx.db.delete(snippetId);
  },
});

// star a snippet mutation
export const starSnippet = mutation({
  args: { snippetId: v.id("snippets") },
  handler: async (ctx, { snippetId }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError("User not authenticated");

    // check if already starred
    const existingStar = await ctx.db
      .query("stars")
      .withIndex("byUserIdAndSnippetId")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), identity.subject),
          q.eq(q.field("snippetId"), snippetId)
        )
      )
      .first();

    if (existingStar) {
      // already starred now unstar
      await ctx.db.delete(existingStar._id);
    } else {
      // insert star
      await ctx.db.insert("stars", {
        userId: identity.subject,
        snippetId,
      });
    }
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
export const isSnippetStarred = query({
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
