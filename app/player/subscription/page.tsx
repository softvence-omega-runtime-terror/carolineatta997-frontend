"use client";

import React, { useState } from "react";
import { 
  Check, 
  X, 
  AlertCircle, 
  CreditCard, 
  Download, 
  Calendar,
  Lock,
  ChevronRight
} from "lucide-react";
import { 
  useGetSubscriptionQuery, 
  useGetPaymentHistoryQuery, 
  useCancelSubscriptionMutation, 
  useUpdatePaymentMethodMutation,
  useGetPlansQuery,
  useCreateCheckoutMutation,
  useVerifyPaymentMutation
} from "../../../redux/features/player/subscriptionApi";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const CheckIcon = () => (
  <div className="w-5 h-5 rounded-full bg-[#00D4AA]/20 flex items-center justify-center">
    <Check size={12} className="text-[#00D4AA]" strokeWidth={3} />
  </div>
);

const SuccessModal = ({ data, onClose }: { data: any, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative w-full max-w-xl bg-[#12143A]/80 border border-cyan-400/20 rounded-[48px] p-12 text-center shadow-[0_0_80px_rgba(34,211,238,0.15)] overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-cyan-400/10 to-transparent pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative space-y-8">
          <div className="w-24 h-24 bg-gradient-to-tr from-[#00D4AA] to-cyan-400 rounded-[32px] flex items-center justify-center text-white mx-auto shadow-[0_12px_40px_rgba(0,212,170,0.3)] rotate-3">
            <Check size={48} strokeWidth={3} />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none italic">
              Welcome to {data.plan_name}!
            </h3>
            <p className="text-gray-400 font-medium text-lg">
              Your subscription is now active. Get ready to elevate your career.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-6 bg-[#0B0D2C]/50 rounded-[24px] border border-white/5">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Plan Type</p>
              <p className="text-white font-bold">{data.plan_type} ({data.billing_cycle_name})</p>
            </div>
            <div className="p-6 bg-[#0B0D2C]/50 rounded-[24px] border border-white/5">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Next Billing</p>
              <p className="text-white font-bold">{data.next_billing_date}</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-6 rounded-[24px] bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl"
          >
            Access My Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

const SubscriptionPage = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");

  const { data: subscription, isLoading: isSubLoading } = useGetSubscriptionQuery();
  const { data: plansData, isLoading: isPlansLoading } = useGetPlansQuery();
  const { data: historyRes, isLoading: isHistoryLoading } = useGetPaymentHistoryQuery();
  const [createCheckout, { isLoading: isCreatingCheckout }] = useCreateCheckoutMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [cancelSubscription, { isLoading: isCancelling }] = useCancelSubscriptionMutation();
  const [updatePaymentMethod, { isLoading: isUpdating }] = useUpdatePaymentMethodMutation();

  const activeSub = subscription?.data;
  const plans = plansData?.data || [];
  const paymentHistory = historyRes?.data || [];

  // Use either the real subscription data or the success details from the verification
  const displaySub = activeSub || successData;

  React.useEffect(() => {
    if (sessionId) {
      const verify = async () => {
        try {
          const res = await verifyPayment({ session_id: sessionId }).unwrap();
          if (res.status === "success") {
            setSuccessData(res.data);
            toast.success("Subscription activated!");
            // Clean up the URL
            router.replace("/player/subscription");
          }
        } catch (err: any) {
          toast.error(err?.data?.message || "Verification failed");
        }
      };
      verify();
    }
  }, [sessionId, verifyPayment, router]);

  const handleSubscribe = async (plan: any) => {
    try {
      const res = await createCheckout({
        plan_type: "BASIC", 
        billing_cycle: "ANNUAL"
      }).unwrap();
      
      if (res.checkout_url) {
        window.location.href = res.checkout_url;
      }
    } catch (err: any) {
      toast.error("Failed to initiate checkout");
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const res = await cancelSubscription().unwrap();
      toast.success(res.message || "Subscription cancelled.");
      setIsCancelModalOpen(false);
    } catch (err) {
      toast.error("Failed to cancel subscription.");
    }
  };

  const handleUpdatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePaymentMethod({ dummy: "data" }).unwrap();
      toast.success("Payment method updated.");
      setIsUpdateModalOpen(false);
    } catch (err) {
      toast.error("Failed to update payment method.");
    }
  };

  if (isSubLoading || isPlansLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D4AA]"></div>
      </div>
    );
  }

  // View 1: Plan Selection (No Active Subscription and No recent Success)
  if (!displaySub) {
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500">
        <div className="text-center space-y-4 py-8">
          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic leading-tight">
            Choose Your Power Up
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Join the NextGen network and get exclusive access to scouts, premium content, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan: any) => (
            <div key={plan.id} className="relative group/card bg-[#12143A]/50 border border-white/5 rounded-[40px] p-8 flex flex-col hover:bg-[#12143A] hover:border-cyan-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {plan.id === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.planName}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">€{plan.price}</span>
                  <span className="text-gray-500 font-bold text-xs">/{plan.billingInterval.toLowerCase()}</span>
                </div>
              </div>

              <div className="space-y-4 flex-1 mb-10">
                {plan.features.map((feature: string, i: number) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <div className="mt-1 flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-gray-400 font-medium leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscribe(plan)}
                disabled={isCreatingCheckout}
                className="w-full py-4 rounded-2xl bg-[#0B0D2C] border border-white/10 text-white font-black uppercase tracking-widest text-xs group-hover/card:bg-gradient-to-r group-hover/card:from-cyan-400 group-hover/card:to-purple-500 group-hover/card:border-transparent transition-all active:scale-95"
              >
                {isCreatingCheckout ? "Initializing..." : "Get Started"}
              </button>
            </div>
          ))}
        </div>

        {successData && <SuccessModal data={successData} onClose={() => setSuccessData(null)} />}
      </div>
    );
  }

  // View 2: Active Subscription Management
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page Title */}
      <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-10 italic">
        Subscription Management
      </h1>

      {/* Current Plan Card */}
      <div className="relative overflow-hidden bg-[#12143A] rounded-[32px] p-10 border border-white/[0.05] group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-white mb-2 italic uppercase">{displaySub.plan_name}</h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{displaySub.plan_type} SUBSCRIPTION</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              {displaySub.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-sm text-gray-400 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsCancelModalOpen(true)}
                className="px-6 py-3 rounded-xl border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-500/10 transition-all active:scale-95"
              >
                Cancel Subscription
              </button>
              <button 
                className="px-6 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-black uppercase tracking-widest hover:bg-cyan-400/20 transition-all active:scale-95"
              >
                Change Plan
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="text-5xl font-black text-white">€{displaySub.amount}</p>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">/{displaySub.billing_cycle.toLowerCase()}</p>
          </div>
        </div>
      </div>

      {/* Billing Information Section */}
      <div className="bg-[#12143A] border border-white/[0.05] rounded-[32px] p-10 space-y-8">
        <h3 className="text-xl font-bold text-white tracking-tight italic uppercase">Billing Information</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 bg-[#0B0D2C]/50 rounded-2xl border border-white/[0.03]">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Next Billing Date</p>
            <p className="text-sm text-white font-bold">{displaySub.next_billing_date}</p>
          </div>
          
          <div className="p-6 bg-[#0B0D2C]/50 rounded-2xl border border-white/[0.03]">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Payment Method</p>
            <div className="flex items-center gap-3">
               <div className="w-8 h-6 bg-cyan-400/10 rounded-md flex items-center justify-center text-cyan-400 border border-cyan-400/20">
                  <CreditCard size={14} />
               </div>
               <span className="text-sm text-white font-bold">{displaySub.card_brand.toUpperCase()} •••• {displaySub.card_last_four}</span>
            </div>
          </div>
          
          <div className="p-6 bg-[#0B0D2C]/50 rounded-2xl border border-white/[0.03]">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Auto-renewal</p>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${displaySub.auto_renewal ? 'bg-[#00D4AA]' : 'bg-red-500'} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
              <span className="text-sm text-white font-black uppercase tracking-tighter">{displaySub.auto_renewal ? 'Active' : 'Disabled'}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsUpdateModalOpen(true)}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-cyan-400/30 text-cyan-400 font-black uppercase tracking-widest hover:bg-cyan-400/20 transition-all text-sm active:scale-[0.99]"
        >
          Update Payment Method
        </button>
      </div>

      {/* Payment History Section */}
      <div className="bg-[#12143A] border border-white/[0.05] rounded-[32px] p-10">
        <h3 className="text-xl font-bold text-white tracking-tight mb-8 italic uppercase">Payment History</h3>
        
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="text-left pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Date</th>
                <th className="text-left pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Description</th>
                <th className="text-left pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Amount</th>
                <th className="text-left pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                <th className="text-right pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((item: any) => (
                <tr key={item.id} className="group border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors">
                  <td className="py-6 text-sm text-gray-300 font-bold">{new Date(item.payment_date).toLocaleDateString()}</td>
                  <td className="py-6 text-sm text-gray-400">{item.description}</td>
                  <td className="py-6 text-sm text-white font-black">{item.currency.toUpperCase()} {item.amount}</td>
                  <td className="py-6">
                    <span className="px-3 py-1 bg-[#00D4AA]/10 text-[#00D4AA] text-[10px] font-black uppercase rounded-full">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-6 text-right">
                    <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/30 transition-all">
                       <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {paymentHistory.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 font-medium italic">No payment history found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Modals --- */}
      {successData && <SuccessModal data={successData} onClose={() => setSuccessData(null)} />}

      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-[#12143A] border border-white/10 rounded-[40px] p-10 text-center shadow-2xl animate-in zoom-in duration-300">
             <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-8 animate-bounce">
                <AlertCircle size={40} />
             </div>
             <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">Cancel Subscription?</h3>
             <p className="text-gray-400 mb-8 leading-relaxed">
               No refund. Your subscription will stay active until <span className="text-white font-bold">{displaySub.next_billing_date}</span>, then it will not renew.
             </p>
             
             <div className="space-y-4 mb-10 text-left bg-[#0B0D2C] p-6 rounded-2xl border border-white/5">
                {displaySub.features.map((perk: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-gray-500">
                    <X size={14} className="text-red-500/50" /> {perk}
                  </div>
                ))}
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsCancelModalOpen(false)}
                  className="py-4 rounded-xl bg-white/5 text-gray-300 font-bold hover:bg-white/10 transition-all border border-white/5 active:scale-95"
                >
                  Keep It
                </button>
                <button 
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                  className="py-4 rounded-xl bg-red-500 text-white font-black hover:bg-red-600 transition-all shadow-[0_8px_20px_rgba(239,68,68,0.3)] uppercase tracking-widest text-xs active:scale-95"
                >
                  {isCancelling ? "Processing..." : "Cancel Now"}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Update Payment Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-xl bg-[#12143A] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
             <div className="flex justify-between items-center p-8 border-b border-white/5">
                <h3 className="text-xl font-bold text-white tracking-tight italic uppercase">Update Payment Method</h3>
                <button onClick={() => setIsUpdateModalOpen(false)} className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all">
                  <X size={24} />
                </button>
             </div>

             <div className="p-10 space-y-8">
               <div className="space-y-3">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Current Payment Method</label>
                  <div className="flex items-center justify-between p-5 bg-[#0B0D2C] rounded-2xl border border-cyan-400/20">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-9 bg-gradient-to-br from-cyan-400/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 border border-cyan-400/30">
                           <CreditCard size={20} />
                        </div>
                        <div>
                           <p className="text-sm text-white font-bold">{displaySub.card_brand.toUpperCase()} •••• {displaySub.card_last_four}</p>
                           <p className="text-[10px] text-gray-500">Expires 12/26</p>
                        </div>
                     </div>
                     <span className="px-2 py-0.5 bg-cyan-400/10 text-cyan-400 text-[8px] font-black uppercase rounded-full tracking-widest">Active</span>
                  </div>
               </div>

               <form onSubmit={handleUpdatePayment} className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400">Please enter your new payment details below.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-bold ml-1">Card Number</label>
                        <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="•••• •••• •••• ••••" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-bold ml-1">CVV</label>
                        <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="•••" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-5 bg-cyan-400/5 border border-cyan-400/10 rounded-2xl">
                     <Lock size={18} className="text-cyan-400" />
                     <p className="text-[10px] text-gray-400 leading-tight">
                       <span className="text-cyan-400 font-bold">Secure Update.</span> Your payment information is processed securely through Stripe encryption.
                     </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                     <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="flex-1 py-4 text-gray-500 font-black uppercase tracking-widest text-xs hover:text-white transition-all">Cancel</button>
                     <button 
                        type="submit" 
                        disabled={isUpdating}
                        className="flex-[2] py-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg hover:opacity-90 transition-all"
                      >
                       {isUpdating ? "Updating..." : "Update Card Details"}
                     </button>
                  </div>
               </form>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
