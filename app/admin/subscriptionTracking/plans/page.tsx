"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  useGetSubscriptionPlansQuery, 
  useCreateSubscriptionPlanMutation,
  useUpdateSubscriptionPlanMutation,
  PlanItem
} from '@/redux/features/admin/adminDashboardApi';
import { ArrowLeft, Plus, Edit, CheckCircle2, Loader2, X, PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// ─── Shared Form Fields ───────────────────────────────────────────────────────

type PlanFormState = {
  planName: string;
  price: string;
  billingInterval: string;
  status: string;
  features: string[];
};

function PlanFormFields({ form, setForm }: { form: PlanFormState; setForm: (f: PlanFormState) => void }) {
  const handleFeatureChange = (index: number, value: string) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm({ ...form, features: updated });
  };
  const addFeature = () => setForm({ ...form, features: [...form.features, ''] });
  const removeFeature = (index: number) => {
    const updated = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updated.length > 0 ? updated : [''] });
  };

  return (
    <div className="space-y-5">
      {/* Plan Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Plan Name <span className="text-red-400">*</span></label>
        <input
          type="text"
          placeholder="e.g. NextGen Elite"
          value={form.planName}
          onChange={e => setForm({ ...form, planName: e.target.value })}
          className="w-full bg-[#0a0c16] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          required
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Price (€) <span className="text-red-400">*</span></label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="e.g. 19.99"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          className="w-full bg-[#0a0c16] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          required
        />
      </div>

      {/* Billing Interval & Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Billing Interval</label>
          <select
            value={form.billingInterval}
            onChange={e => setForm({ ...form, billingInterval: e.target.value })}
            className="w-full bg-[#0a0c16] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          >
            <option value="Yearly">Yearly</option>
            <option value="Monthly">Monthly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Status</label>
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            className="w-full bg-[#0a0c16] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* Features */}
      <div>
        <div className="flex justify-between items-center mb-1.5">
          <label className="text-sm font-medium text-gray-300">Features <span className="text-red-400">*</span></label>
          <button type="button" onClick={addFeature} className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
            <PlusCircle className="w-3.5 h-3.5" /> Add Feature
          </button>
        </div>
        <div className="space-y-2">
          {form.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Feature ${i + 1}`}
                value={f}
                onChange={e => handleFeatureChange(i, e.target.value)}
                className="flex-1 bg-[#0a0c16] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              />
              <button type="button" onClick={() => removeFeature(i)} className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Create Plan Modal ────────────────────────────────────────────────────────

function CreatePlanModal({ onClose }: { onClose: () => void }) {
  const [createPlan, { isLoading }] = useCreateSubscriptionPlanMutation();
  const [form, setForm] = useState<PlanFormState>({ planName: '', price: '', billingInterval: 'Yearly', status: 'ACTIVE', features: [''] });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFeatures = form.features.filter(f => f.trim() !== '');
    if (!form.planName || !form.price || cleanFeatures.length === 0) {
      toast.error("Please fill in all required fields and at least one feature.");
      return;
    }
    try {
      const res = await createPlan({ ...form, features: cleanFeatures }).unwrap();
      toast.success(res.message || "Plan created successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create plan.");
    }
  };

  return (
    <PlanModal title="Create New Plan" subtitle="Set up a new subscription tier" onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <PlanFormFields form={form} setForm={setForm} />
        <ModalActions onClose={onClose} isLoading={isLoading} confirmLabel="Create Plan" loadingLabel="Creating..." />
      </form>
    </PlanModal>
  );
}

// ─── Edit Plan Modal ──────────────────────────────────────────────────────────

function EditPlanModal({ plan, onClose }: { plan: PlanItem; onClose: () => void }) {
  const [updatePlan, { isLoading }] = useUpdateSubscriptionPlanMutation();
  const [form, setForm] = useState<PlanFormState>({
    planName: plan.planName,
    price: plan.price,
    billingInterval: plan.billingInterval,
    status: plan.status,
    features: plan.features.length > 0 ? [...plan.features] : [''],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFeatures = form.features.filter(f => f.trim() !== '');
    if (!form.planName || !form.price || cleanFeatures.length === 0) {
      toast.error("Please fill in all required fields and at least one feature.");
      return;
    }
    try {
      const res = await updatePlan({ id: plan.id, ...form, features: cleanFeatures }).unwrap();
      toast.success(res.message || "Plan updated successfully!");
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update plan.");
    }
  };

  return (
    <PlanModal title="Edit Plan" subtitle={`Editing: ${plan.planName}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        <PlanFormFields form={form} setForm={setForm} />
        <ModalActions onClose={onClose} isLoading={isLoading} confirmLabel="Save Changes" loadingLabel="Saving..." />
      </form>
    </PlanModal>
  );
}

// ─── Shared Modal Shell ───────────────────────────────────────────────────────

function PlanModal({ title, subtitle, onClose, children }: { title: string; subtitle: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#171b2f] border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <p className="text-gray-400 text-sm mt-0.5">{subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalActions({ onClose, isLoading, confirmLabel, loadingLabel }: { onClose: () => void; isLoading: boolean; confirmLabel: string; loadingLabel: string }) {
  return (
    <div className="flex gap-3 pt-2">
      <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-[#0a0c16] border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors">
        Cancel
      </button>
      <button type="submit" disabled={isLoading} className="flex-1 py-2.5 bg-[#00d8b6] text-white rounded-lg text-sm font-medium hover:bg-[#00c2a3] transition-colors shadow-lg shadow-[#00d8b6]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {isLoading ? loadingLabel : confirmLabel}
      </button>
    </div>
  );
}

// ─── Plan Management Page ─────────────────────────────────────────────────────

export default function PlanManagementPage() {
  const router = useRouter();
  const { data: apiResponse, isLoading, isError } = useGetSubscriptionPlansQuery();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PlanItem | null>(null);

  const plans = apiResponse && 'data' in apiResponse ? (apiResponse as any).data : apiResponse;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0f111f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
      </div>
    );
  }

  if (isError || !plans) {
    return (
      <div className="min-h-screen bg-[#0f111f] text-white p-6 md:p-8 flex flex-col items-center justify-center">
        <p className="text-red-400 mb-4">Failed to load subscription plans.</p>
        <button onClick={() => router.back()} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f111f] text-white p-6 md:p-8 font-sans">
      {showCreateModal && <CreatePlanModal onClose={() => setShowCreateModal(false)} />}
      {editingPlan && <EditPlanModal plan={editingPlan} onClose={() => setEditingPlan(null)} />}

      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <button onClick={() => router.back()} className="mt-2 p-1.5 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <span className="text-cyan-400">Plan</span>
              <span className="text-[#a855f7]">Management</span>
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Create and manage subscription plans</p>
          </div>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#00d8b6] text-white rounded-lg text-sm font-medium hover:bg-[#00c2a3] transition-colors shadow-lg shadow-[#00d8b6]/20 self-start md:self-auto">
          <Plus className="w-4 h-4" /> Create New Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.isArray(plans) && plans.map((plan: PlanItem) => (
          <div key={plan.id} className="bg-[#171b2f] border border-gray-800 rounded-xl overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-cyan-400 mb-1">{plan.planName}</h2>
                  <p className="text-gray-400 text-xs">{plan.billingInterval === 'Yearly' ? 'Yearly Plan' : 'Monthly Plan'}</p>
                </div>
                {plan.status?.toLowerCase() === 'active' && (
                  <span className="px-2.5 py-1 bg-green-500/10 text-green-500 rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-500/20">
                    Active
                  </span>
                )}
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-white">€{plan.price}</span>
                <p className="text-gray-500 text-xs mt-1">per {plan.billingInterval?.toLowerCase() === 'yearly' ? 'year' : 'month'}</p>
              </div>

              <div className="space-y-3">
                <p className="text-gray-400 text-xs mb-2">Features:</p>
                {plan.features?.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-800 bg-[#0a0c16]/50">
              <div className="bg-[#0a0c16] rounded-lg p-3 flex justify-between items-center border border-gray-800 mb-4">
                <span className="text-gray-400 text-xs">Subscribers</span>
                <span className="text-white font-bold">{plan.subscribers?.toLocaleString() || '0'}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingPlan(plan)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#1e233b] hover:bg-[#252b48] border border-gray-700/50 rounded-lg text-cyan-400 text-sm font-medium transition-colors"
                >
                  <Edit className="w-4 h-4" /> Edit
                </button>
              </div>
            </div>
          </div>
        ))}

        {(!plans || plans.length === 0) && (
          <div className="col-span-full p-12 flex flex-col items-center justify-center bg-[#171b2f] border border-gray-800 border-dashed rounded-xl">
            <p className="text-gray-400 text-center mb-4">No subscription plans found.</p>
            <button onClick={() => setShowCreateModal(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#00d8b6] text-white rounded-lg text-sm font-medium hover:bg-[#00c2a3] transition-colors shadow-lg shadow-[#00d8b6]/20">
              <Plus className="w-4 h-4" /> Create First Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
