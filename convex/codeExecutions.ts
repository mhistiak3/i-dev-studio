import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

// get all code executions by user
export const getUserCodeExecutions = query({
  args: {
    userId: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("codeExecutions")
      .withIndex("byUserId")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .paginate(args.paginationOpts);
  },
});

export const getUserStats = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const executions = await ctx.db
      .query("codeExecutions")
      .withIndex("byUserId")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    // get starred snippet
    const getStarredSnippet = await ctx.db
      .query("stars")
      .withIndex("byUserId")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();

    // get all starred snippet detail
    const snippetIds = getStarredSnippet.map((star) => star.snippetId);
    const snippetDetails = await Promise.all(
      snippetIds.map(async (id) => {
        const snippet = await ctx.db.get(id);
        return snippet;
      })
    );

    // get most starred language
    const starredLanguages = snippetDetails
      .filter(Boolean)
      .reduce((acc, current) => {
        if (current?.language) {
          acc[current.language] = (acc[current.language] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

    const mostStarredLanguage =
      Object.entries(starredLanguages).sort(([, a], [, b]) => b - a)[0]?.[0] ??
      "N/A";

    // calculate execution state
    const last24Hours = executions.filter((execution) => {
      const executionTime = execution._creationTime;
      const currentTime = Date.now();
      return currentTime - executionTime <= 24 * 60 * 60 * 1000;
    }).length;

    // language state
    const LanguageState = executions.reduce((acc, execution) => {
      acc[execution.language] = (acc[execution.language] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const languages = Object.keys(LanguageState);
    const favoriteLanguage =
      Object.entries(LanguageState).sort(([, a], [, b]) => b - a)[0]?.[0] ??
      "N/A";
    return {
      totalExecutions: executions.length,
      languagesCount: languages.length,
      executionsLast24Hours: last24Hours,
      languagesUsed: languages,
      favoriteLanguage,
      mostStarredLanguage,
      LanguageState,
    };
  },
});
