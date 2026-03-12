"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetSubscriptionDetailsQuery, useCancelSubscriptionMutation } from '@/redux/features/admin/adminDashboardApi';
import {
  ArrowLeft, User, CreditCard, Receipt, Loader2, Calendar, Shield, Clock, HardDrive
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SubscriptionDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: apiResponse, isLoading, isError } = useGetSubscriptionDetailsQuery(id, { skip: !id });
  const [cancelSubscription, { isLoading: isCanceling }] = useCancelSubscriptionMutation();

  const handleCancel = async () => {
    if (confirm("Are you sure you want to cancel this subscription?")) {
      try {
        const response = await cancelSubscription({ id: String(id), confirmation: true }).unwrap();
        toast.success(response.message || "Subscription canceled successfully.");
      } catch (err: any) {
        toast.error(err?.data?.message || "Failed to cancel subscription.");
      }
    }
  };

  const data = apiResponse && 'data' in apiResponse ? (apiResponse as any).data : apiResponse;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f111f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-[#0f111f] text-white p-6 md:p-8 flex flex-col items-center justify-center">
        <p className="text-red-400 mb-4">Failed to load subscription details.</p>
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  const { user, subscription, billingHistory } = data;

  return (
    <div className="min-h-screen bg-[#0f111f] text-white p-6 md:p-8 font-sans">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Tracking
          </button>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="text-cyan-400">Subscription</span> 
            <span className="text-white">Details</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm">Managing subscription for {user?.name}</p>
        </div>
        
        <div className="flex items-center gap-3">
           <button 
             onClick={handleCancel}
             disabled={isCanceling || subscription?.status?.toLowerCase() !== 'active'}
             className="px-5 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
           >
             {isCanceling && <Loader2 className="w-4 h-4 animate-spin" />}
             {subscription?.status?.toLowerCase() !== 'active' ? 'Cannot Cancel' : 'Cancel Subscription'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* User Info Card */}
        <div className="bg-[#171b2f] border border-gray-800 rounded-xl p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-blue-500/20 rounded-lg text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">User Information</h2>
          </div>
          
          <div className="space-y-4 text-sm">
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                <span className="text-gray-400">Full Name</span>
                <span className="font-medium text-white">{user?.name}</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                <span className="text-gray-400">Email Address</span>
                <span className="font-medium text-gray-300 truncate max-w-[150px]" title={user?.email}>{user?.email}</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                <span className="text-gray-400">User ID</span>
                <span className="font-medium text-cyan-400 font-mono text-xs">{user?.userId}</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                <span className="text-gray-400">Role</span>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full">
                   <Shield className="w-3.5 h-3.5 text-purple-400" />
                   <span className="font-medium text-purple-400 text-xs">{user?.role}</span>
                </div>
             </div>
             <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">Last Login</span>
                <span className="font-medium text-gray-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gray-500" />
                  {user?.lastLogin}
                </span>
             </div>
          </div>
        </div>

        {/* Subscription Info Card */}
        <div className="bg-[#171b2f] border border-gray-800 rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-500/20 rounded-lg text-emerald-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">Subscription Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                <span className="text-gray-400">Current Plan</span>
                <span className="font-bold text-cyan-400">{subscription?.plan}</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                <span className="text-gray-400">Status</span>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  subscription?.status?.toLowerCase() === 'active' 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-red-500/10 text-red-500'
                }`}>
                  {subscription?.status}
                </span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                <span className="text-gray-400">Amount</span>
                <span className="font-medium text-white text-base">€{subscription?.amount}</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                <span className="text-gray-400">Billing Cycle</span>
                <span className="font-medium text-gray-300">{subscription?.billingCycle}</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                <span className="text-gray-400">Next Billing Date</span>
                <span className="font-medium text-gray-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                  {subscription?.nextBilling}
                </span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
                <span className="text-gray-400">Auto Renew</span>
                <span className={`${
                  subscription?.autoRenew?.toLowerCase() === 'enabled' 
                    ? 'text-green-400' 
                    : 'text-gray-500'
                } font-medium`}>
                  {subscription?.autoRenew}
                </span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-gray-800/60 md:col-span-2">
                <span className="text-gray-400">Payment Method</span>
                <span className="font-medium text-gray-300 capitalize flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-white/50" />
                  {subscription?.paymentMethod}
                </span>
             </div>
             <div className="flex justify-between items-center py-2 md:col-span-2">
                <span className="text-gray-400">Transaction ID</span>
                <span className="font-mono text-xs text-gray-400 bg-black/30 px-2 py-1 rounded border border-white/5 truncate max-w-[200px] md:max-w-none">
                  {subscription?.transactionId}
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-[#171b2f] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-800 flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
            <Receipt className="w-4 h-4" />
          </div>
          <h2 className="text-lg font-semibold text-white">Billing History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#0a0c16]/50 text-gray-400">
              <tr>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Invoice ID</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {billingHistory && billingHistory.length > 0 ? billingHistory.map((item: any, i: number) => (
                <tr key={i} className="hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4 text-gray-300 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    {item.date}
                  </td>
                  <td className="px-6 py-4">
                     <span className="font-mono text-xs text-gray-400 max-w-[150px] md:max-w-[300px] truncate block" title={item.invoiceId || 'N/A'}>
                       {item.invoiceId || 'N/A'}
                     </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">
                    €{Number(item.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                      item.status?.toLowerCase() === 'paid' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 font-medium text-xs border border-cyan-500/30 px-3 py-1.5 rounded-md hover:bg-cyan-500/10 transition-colors">
                      Download PDF
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No billing history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
