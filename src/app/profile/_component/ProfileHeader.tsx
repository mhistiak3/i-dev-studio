"use client";
import { motion } from "motion/react";
import {
  LuActivity,
  LuCode,
  LuStar,
  LuTimer,
  LuTrendingUp,
  LuTrophy,
  LuUser,
} from "react-icons/lu";
import { Id } from "../../../../convex/_generated/dataModel";
interface ProfileHeaderProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Clerk UserResource type requires any for dynamic properties
  user: any;
  userStats: {
    totalExecutions: number;
    languagesCount: number;
    executionsLast24Hours: number;
    languagesUsed: string[];
    favoriteLanguage: string;
    mostStarredLanguage: string;
    LanguageState: Record<string, number>;
  };
  userData: {
    _id: Id<"users">;
    _creationTime: number;
    userId: string;
    email: string;
    name: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Explanation why any is needed
  starredSnippets: any;
}
const ProfileHeader = ({
  user,
  userStats,
  userData,
  starredSnippets,
}: ProfileHeaderProps) => {
  const STATS = [
    {
      label: "Code Executions",
      value: userStats?.totalExecutions ?? 0,
      icon: LuActivity,
      color: "from-primary to-primary/80",
      gradient: "group-hover:via-primary/90",
      description: "Total code runs",
      metric: {
        label: "Last 24h",
        value: userStats?.executionsLast24Hours ?? 0,
        icon: LuTimer,
      },
    },
    {
      label: "Starred Snippets",
      value: starredSnippets?.length ?? 0,
      icon: LuStar,
      color: "from-yellow-500 to-yellow-700",
      gradient: "group-hover:via-yellow-600/90",
      description: "Saved for later",
      metric: {
        label: "Most starred",
        value: userStats?.mostStarredLanguage ?? "N/A",
        icon: LuTrophy,
      },
    },
    {
      label: "Languages Used",
      value: userStats?.languagesCount ?? 0,
      icon: LuCode,
      color: "from-green-500 to-green-700",
      gradient: "group-hover:via-green-600/90",
      description: "Different languages",
      metric: {
        label: "Most used",
        value: userStats?.favoriteLanguage ?? "N/A",
        icon: LuTrendingUp,
      },
    },
  ];

  return (
    <div
      className="relative mb-8 bg-linear-to-br from-dark to-dark/80 rounded-2xl p-8 border
     border-border/50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[32px]" />
      <div className="relative flex items-center gap-8">
        <div className="relative group">
          <div
            className="absolute inset-0 bg-linear-to-r from-primary to-primary/80 rounded-full 
          blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
          />
          <img
            src={user.imageUrl}
            alt="Profile"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full border-4 border-border/50 relative z-10 group-hover:scale-105 transition-transform"
          />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-light">{userData.name}</h1>
          </div>
          <p className="text-light/70 flex items-center gap-2">
            <LuUser className="w-4 h-4" />
            {userData.email}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {STATS.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            key={index}
            className="group relative bg-primary/5 rounded-2xl overflow-hidden"
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-linear-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-all 
              duration-500 ${stat.gradient}`}
            />

            {/* Content */}
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-light/70">
                      {stat.description}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-light tracking-tight">
                    {typeof stat.value === "number"
                      ? stat.value.toLocaleString()
                      : stat.value}
                  </h3>
                  <p className="text-sm text-light/70 mt-1">{stat.label}</p>
                </div>
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${stat.color} bg-opacity-10`}
                >
                  <stat.icon className="w-5 h-5 text-light" />
                </div>
              </div>

              {/* Additional metric */}
              <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                <stat.metric.icon className="w-4 h-4 text-light/50" />
                <span className="text-sm text-light/70">
                  {stat.metric.label}:
                </span>
                <span className="text-sm font-medium text-light">
                  {stat.metric.value}
                </span>
              </div>
            </div>

            {/* Interactive hover effect */}
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;
