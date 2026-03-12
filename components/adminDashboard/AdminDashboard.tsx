"use client";

import React from "react";
import {
  Users,
  Building2,
  Search,
  Calendar,
  DollarSign,
  ShieldCheck,
  ArrowUpRight,
  MoreVertical,
} from "lucide-react";
import { useGetAdminDashboardDataQuery, AdminActivity } from "@/redux/features/admin/adminDashboardApi";

// ─── Skeleton Loader 
const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-[#1a2e45] ${className}`} />
);

// ─── Stat Card Component 
const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  color,
}: {
  icon: any;
  label: string;
  value: string | number;
  trend?: string;
  color: string;
}) => (
  <div className="bg-[#0D1B2A]/50 border border-[#162d45] rounded-2xl p-6 hover:bg-[#0D1B2A] transition-all duration-300 group">
    <div className="flex items-start justify-between">
      <div
        className={`p-3 rounded-xl bg-${color}/10 text-${color} group-hover:scale-110 transition-transform duration-300`}
        style={{ color, backgroundColor: `${color}1A` }}
      >
        <Icon size={24} />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-1 rounded-full">
          <ArrowUpRight size={12} />
          {trend}
        </span>
      )}
    </div>
    <div className="mt-4">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <h3 className="text-3xl font-bold text-white mt-1">{value}</h3>
    </div>
  </div>
);

// ─── Activity Item Component ──────────────────────────────────────────────────
const ActivityItem = ({ activity }: { activity: AdminActivity }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "player":
        return <Users size={16} />;
      case "club":
        return <Building2 size={16} />;
      case "scout":
        return <Search size={16} />;
      default:
        return <ShieldCheck size={16} />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "player":
        return "text-blue-400";
      case "club":
        return "text-purple-400";
      case "scout":
        return "text-orange-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 group hover:bg-white/5 px-4 rounded-xl transition-colors">
      <div className={`p-2 rounded-lg bg-white/5 ${getColor(activity.type)}`}>
        {getIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">
          <span className="text-slate-400">{activity.user}</span> {activity.action}
        </p>
        <p className="text-xs text-slate-500 mt-0.5">{activity.timestamp}</p>
      </div>
      <button className="p-2 text-slate-500 hover:text-white transition-colors">
        <MoreVertical size={16} />
      </button>
    </div>
  );
};

const AdminDashboard = () => {
  const { data: response, isLoading, error } = useGetAdminDashboardDataQuery();
  const data = response?.data;

  if (isLoading) {
    return (
      <div className="space-y-8 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
        <div className="bg-[#0D1B2A]/50 border border-[#162d45] rounded-2xl p-6 h-80">
          <Skeleton className="h-6 w-40 mb-6" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-12 w-full mb-4" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Dashboard API Error:", error);
    return (
      <div className="p-6 space-y-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-red-500">Failed to load Dashboard</h2>
          <p className="text-slate-400 mt-2">There was an error connecting to the server.</p>
          <div className="mt-6 p-4 bg-black/30 rounded-lg text-left overflow-auto max-h-40">
            <p className="text-xs font-mono text-red-400">Error Details:</p>
            <pre className="text-[10px] font-mono text-slate-500 mt-2">{JSON.stringify(error, null, 2)}</pre>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const overview = data?.overview;

  const stats = [
    {
      icon: Users,
      label: "Total Users",
      value: overview?.total_users?.count ?? 0,
      trend: `${overview?.total_users?.change ?? 0}%`,
      color: "#60A5FA",
    },
    {
      icon: Calendar,
      label: "Active Events",
      value: overview?.active_events?.count ?? 0,
      trend: `${overview?.active_events?.change ?? 0}%`,
      color: "#A78BFA",
    },
    {
      icon: DollarSign,
      label: "Monthly Revenue",
      value: `${overview?.monthly_revenue?.currency ?? "€"}${overview?.monthly_revenue?.amount?.toLocaleString() ?? 0}`,
      trend: `${overview?.monthly_revenue?.change ?? 0}%`,
      color: "#34D399",
    },
    {
      icon: ShieldCheck,
      label: "Subscriptions",
      value: overview?.subscriptions?.count ?? 0,
      trend: `${overview?.subscriptions?.change ?? 0}%`,
      color: "#FBBF24",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
            Dashboard overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Recent Activities */}
      <div className="bg-[#0D1B2A]/50 border border-[#162d45] rounded-2xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-[#162d45] flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Recent Activities</h2>
          <button className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">View All</button>
        </div>
        <div className="divide-y divide-[#162d45]">
          {data?.recent_activity?.length ? (
            data.recent_activity.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-400">No recent activities found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
