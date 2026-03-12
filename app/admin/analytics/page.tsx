"use client";

import React, { useState, useEffect } from 'react';
import { 
  useGetAdSlotsQuery, 
  useGetAdSlotAnalyticsQuery, 
  AdSlot 
} from '@/redux/features/admin/adminMonetizationApi';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Loader2, 
  MousePointerClick, 
  Eye, 
  BarChart3, 
  TrendingUp, 
  DollarSign,
  ChevronDown,
  Layout
} from 'lucide-react';

const COLORS = ['#00E5FF', '#9C27B0', '#00d8b6', '#f43f5e'];

export default function AnalyticsPage() {
  const { data: adSlotsResp, isLoading: slotsLoading } = useGetAdSlotsQuery();
  const adSlots = (adSlotsResp as any)?.data?.adSlots || adSlotsResp?.adSlots || [];
  
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');

  useEffect(() => {
    if (adSlots.length > 0 && !selectedSlotId) {
      setSelectedSlotId(adSlots[0].adSlotId);
    }
  }, [adSlots, selectedSlotId]);

  const { 
    data: analytics, 
    isLoading: analyticsLoading, 
    isError: analyticsError 
  } = useGetAdSlotAnalyticsQuery(selectedSlotId, { skip: !selectedSlotId });

  const chartData = [
    { name: 'Clicks', value: analytics?.totalClicks || 0 },
    { name: 'Impressions', value: analytics?.totalImpressions || 0 },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#171b2f] border border-gray-800 p-3 rounded-lg shadow-xl">
          <p className="text-gray-400 text-xs mb-1">{payload[0].name}</p>
          <p className="text-white font-bold text-lg">{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white p-6 md:p-8 font-sans">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
          Ad Performance Analytics
        </h1>
        <p className="text-gray-400 mt-2 text-lg">In-depth performance metrics and engagement data for your ad slots.</p>
      </div>

      {/* Slot Selector */}
      <div className="mb-8 max-w-md">
        <label className="block text-sm font-medium text-gray-400 mb-2">Select Ad Slot</label>
        <div className="relative">
          <select 
            value={selectedSlotId} 
            onChange={(e) => setSelectedSlotId(e.target.value)}
            className="w-full bg-[#171b2f] border border-gray-800 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-cyan-500/50 transition-colors cursor-pointer"
          >
            {slotsLoading ? (
              <option>Loading slots...</option>
            ) : adSlots.length > 0 ? (
              adSlots.map((slot: AdSlot) => (
                <option key={slot.adSlotId} value={slot.adSlotId}>
                  {slot.adName} ({slot.adSlotId})
                </option>
              ))
            ) : (
              <option>No slots available</option>
            )}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {analyticsLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
          <p className="text-gray-400 animate-pulse">Fetching analytics data...</p>
        </div>
      ) : analyticsError ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 text-center">
          <p className="text-red-400">Failed to load analytics for the selected slot.</p>
        </div>
      ) : selectedSlotId ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Chart Section */}
          <div className="xl:col-span-2 bg-[#171b2f] border border-gray-800 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div>
                <h2 className="text-xl font-bold text-white">Engagement Overview</h2>
                <p className="text-gray-400 text-sm">Visualizing clicks vs impressions</p>
              </div>
              <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400">
                <BarChart3 className="w-6 h-6" />
              </div>
            </div>

            <div className="h-[400px] w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={140}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    content={(props) => {
                      const { payload } = props;
                      return (
                        <div className="flex justify-center gap-8 mt-4">
                          {payload?.map((entry: any, index: number) => (
                            <div key={`legend-${index}`} className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                              <span className="text-sm text-gray-400 font-medium">{entry.value}</span>
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Content */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-4xl font-black text-white">{analytics?.clickRate || '0%'}</p>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">CTR Rate</p>
              </div>
            </div>
          </div>

          {/* Stats Cards Section */}
          <div className="space-y-6">
            <AnalyticsCard 
              icon={<MousePointerClick className="w-5 h-5 text-cyan-400" />} 
              label="Total Clicks" 
              value={analytics?.totalClicks?.toLocaleString() || '0'} 
              color="border-cyan-500/20"
              bg="bg-cyan-500/5"
            />
            <AnalyticsCard 
              icon={<Eye className="w-5 h-5 text-purple-400" />} 
              label="Total Impressions" 
              value={analytics?.totalImpressions?.toLocaleString() || '0'} 
              color="border-purple-500/20"
              bg="bg-purple-500/5"
            />
            <AnalyticsCard 
              icon={<TrendingUp className="w-5 h-5 text-emerald-400" />} 
              label="Click Through Rate" 
              value={analytics?.clickRate || '0%'} 
              color="border-emerald-500/20"
              bg="bg-emerald-500/5"
            />
            <AnalyticsCard 
              icon={<DollarSign className="w-5 h-5 text-amber-400" />} 
              label="Generated Revenue" 
              value={`€${analytics?.revenue?.toFixed(2) || '0.00'}`} 
              color="border-amber-500/20"
              bg="bg-amber-500/5"
            />
          </div>

        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-[#171b2f] border border-dashed border-gray-800 rounded-3xl">
          <Layout className="w-16 h-16 text-gray-700 mb-4" />
          <p className="text-gray-500">Select an ad slot to view performance analytics.</p>
        </div>
      )}
    </div>
  );
}

function AnalyticsCard({ icon, label, value, color, bg }: { icon: React.ReactNode; label: string; value: string; color: string; bg: string }) {
  return (
    <div className={`bg-[#171b2f] border ${color} rounded-3xl p-6 transition-all hover:scale-[1.02] hover:shadow-2xl shadow-black/40`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${bg}`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}
