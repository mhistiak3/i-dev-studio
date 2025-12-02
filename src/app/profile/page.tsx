"use client";
import NavigationHeader from "@/components/NavigationHeader";
import { useUser } from "@clerk/nextjs";
import { usePaginatedQuery, useQuery } from "convex/react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LuChevronRight,
  LuCode,
  LuListVideo,
  LuLoader,
  LuStar,
} from "react-icons/lu";
import { api } from "../../../convex/_generated/api";
import SnippetCard from "../snippets/_components/SnippetCard";
import ExecutionCard from "./_component/ExecutionCard";
import ProfileHeader from "./_component/ProfileHeader";
import ProfileHeaderSkeleton from "./_component/ProfileHeaderSkeleton";

const TABS = [
  {
    id: "executions",
    label: "Code Executions",
    icon: LuListVideo,
  },
  {
    id: "starred",
    label: "Starred Snippets",
    icon: LuStar,
  },
];
const Profile = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"executions" | "starred">(
    "executions"
  );
  const [previousExecutionCount, setPreviousExecutionCount] = useState(0);

  const starredSnippets = useQuery(api.snippets.getStarredSnippets);
  const userStats = useQuery(api.codeExecutions.getUserStats, {
    userId: user?.id || "",
  });
  const {
    results: executions,
    status: executionsStatus,
    isLoading: isExecutionLoading,
    loadMore,
  } = usePaginatedQuery(
    api.codeExecutions.getUserCodeExecutions,
    {
      userId: user?.id || "",
    },
    { initialNumItems: 5 }
  );

  const userData = useQuery(api.users.getUser, { userId: user?.id || "" });

  // Auto-load more when executions are deleted to maintain view consistency
  useEffect(() => {
    if (executions && executions.length > 0) {
      // If items were deleted and we can load more, automatically load to fill the gap
      if (
        previousExecutionCount > 0 &&
        executions.length < previousExecutionCount &&
        executionsStatus === "CanLoadMore" &&
        !isExecutionLoading
      ) {
        const deletedCount = previousExecutionCount - executions.length;
        loadMore(deletedCount);
      }
      setPreviousExecutionCount(executions.length);
    }
  }, [
    executions,
    previousExecutionCount,
    executionsStatus,
    isExecutionLoading,
    loadMore,
  ]);

  // /handlers
  const handleLoadMore = () => {
    if (executionsStatus === "CanLoadMore") loadMore(5);
  };

  // login check - redirect in useEffect
  if (!user && isLoaded) {
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-body/20">
      <div className="container">
        <NavigationHeader />
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          {userData && userStats && (
            <ProfileHeader
              userData={userData}
              userStats={userStats}
              user={user}
              starredSnippets={starredSnippets}
            />
          )}
          {(userStats === undefined || !isLoaded) && <ProfileHeaderSkeleton />}

          {/* content */}
          <div className="bg-linear-to-br from-dark to-dark/80 rounded-3xl shadow-2xl shadow-black/50 border border-border/50 backdrop-blur-xl overflow-hidden">
            {/* tabs */}
            <div className="border-b border-border/50">
              <div className="flex space-x-1 p-4">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() =>
                      setActiveTab(tab.id as "executions" | "starred")
                    }
                    className={`group flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden ${
                      activeTab === tab.id
                        ? "text-primary"
                        : "text-light/70 hover:text-light"
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/10 rounded-lg"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <tab.icon className="w-4 h-4 relative z-10" />
                    <span className="text-sm font-medium relative z-10">
                      {tab.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="p-6"
              >
                {activeTab === "executions" && (
                  <div className="space-y-6">
                    {executions?.map((execution) => (
                      <ExecutionCard
                        key={execution._id}
                        execution={execution}
                      />
                    ))}

                    {isExecutionLoading ? (
                      <div className="text-center py-12">
                        <LuLoader className="w-12 h-12 text-light/30 mx-auto mb-4 animate-spin" />
                        <h3 className="text-lg font-medium text-light/70 mb-2">
                          Loading code executions...
                        </h3>
                      </div>
                    ) : (
                      executions.length === 0 && (
                        <div className="text-center py-12">
                          <LuCode className="w-12 h-12 text-light/30 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-light/70 mb-2">
                            No code executions yet
                          </h3>
                          <p className="text-light/50">
                            Start coding to see your execution history!
                          </p>
                        </div>
                      )
                    )}

                    {/* Load More Button */}
                    {executionsStatus === "CanLoadMore" && (
                      <div className="flex justify-center mt-8">
                        <button
                          onClick={handleLoadMore}
                          className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg flex items-center gap-2 
                        transition-colors"
                        >
                          Load More
                          <LuChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* ACTIVE TAB IS STARS: */}
                {activeTab === "starred" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {starredSnippets?.map((snippet) => (
                      <SnippetCard snippet={snippet} key={snippet._id} />
                    ))}

                    {(!starredSnippets || starredSnippets.length === 0) && (
                      <div className="col-span-full text-center py-12">
                        <LuStar className="w-12 h-12 text-light/30 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-light/70 mb-2">
                          No starred snippets yet
                        </h3>
                        <p className="text-light/50">
                          Start exploring and star the snippets you find useful!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
