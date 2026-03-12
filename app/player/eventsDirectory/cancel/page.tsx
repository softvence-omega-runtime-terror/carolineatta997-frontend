"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function EventRegistrationCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-[#121433] border border-[#1E2550] rounded-[32px] p-10 max-w-lg w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="flex flex-col items-center justify-center py-4 space-y-8">
          <div className="w-24 h-24 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center border-2 border-yellow-500/30">
            <AlertCircle size={48} strokeWidth={3} />
          </div>
          <div className="space-y-3">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Payment Cancelled</h3>
            <p className="text-gray-400 max-w-sm mx-auto">You have cancelled the payment process. Your registration is incomplete and your spot is not secured.</p>
          </div>

          <button 
            onClick={() => router.push("/player/eventsDirectory")}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1E2550] to-[#121433] border border-[#1E2550] text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 transition-all shadow-lg"
          >
            <ArrowLeft size={20} /> Return to Directory
          </button>
        </div>

      </div>
    </div>
  );
}
