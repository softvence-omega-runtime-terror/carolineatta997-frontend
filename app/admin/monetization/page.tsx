"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGetMonetizationDataQuery, useGetAdSlotsQuery, AdSlot, useCreateAdSlotMutation, useDeleteAdSlotMutation } from '@/redux/features/admin/adminMonetizationApi';
import { DollarSign, BarChart3, TrendingUp, LayoutGrid, MousePointerClick, Loader2, ExternalLink, Eye, X, Calendar, Monitor, User, Plus, Upload, ImageIcon, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

// ─── Add Slot Modal ───────────────────────────────────────────────────────────

const defaultForm = {
  adName: '',
  size: '',
  position: '',
  advertiser: '',
  targetUrl: '',
  startDate: '',
  endDate: '',
  status: 'Active',
  campaignBudget: '',
  billingType: 'CPM',
  ratePerThousandImpressions: '',
};

function AddSlotModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState(defaultForm);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [createAdSlot, { isLoading }] = useCreateAdSlotMutation();

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bannerFile) {
      toast.error('Please upload an ad banner image');
      return;
    }

    const formData = new FormData();
    formData.append('addBanner', bannerFile);

    // Format dates to DD/MM/YYYY for backend
    const formatToBackend = (dateStr: string) => {
      if (!dateStr) return '';
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    };

    const payload = {
      adName: form.adName,
      size: form.size,
      position: form.position,
      advertiser: form.advertiser,
      targetUrl: form.targetUrl,
      startDate: formatToBackend(form.startDate),
      endDate: formatToBackend(form.endDate),
      status: form.status,
      pricing: {
        campaignBudget: Number(form.campaignBudget) || 0,
        billingType: form.billingType,
        ratePerThousandImpressions: Number(form.ratePerThousandImpressions) || 0,
      }
    };

    formData.append('data', JSON.stringify(payload));

    try {
      await createAdSlot(formData).unwrap();
      toast.success('Ad slot created successfully');
      onClose();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create ad slot');
    }
  };

  const inputClass = "w-full bg-[#0a0c16] border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors";
  const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#171b2f] border border-gray-800 rounded-2xl w-full max-w-5xl shadow-2xl max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">Add New Ad Slot</h2>
            <p className="text-gray-400 text-sm mt-0.5">Fill in details for the new advertisement placement</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">

          {/* Banner Upload */}
          <div>
            <label className={labelClass}>Ad Banner <span className="text-gray-500 text-xs">(image upload)</span></label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-colors"
            >
              {bannerPreview ? (
                <div className="relative">
                  <img src={bannerPreview} alt="Banner preview" className="w-full max-h-36 object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <p className="text-white text-sm font-medium">Change Image</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-8 text-gray-500">
                  <ImageIcon className="w-8 h-8" />
                  <p className="text-sm">Click to upload banner image</p>
                  <p className="text-xs text-gray-600">PNG, JPG, WEBP up to 5MB</p>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Ad Name <span className="text-red-400">*</span></label>
              <input type="text" placeholder="e.g. Top Banner - Homepage" value={form.adName} onChange={e => set('adName', e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Advertiser <span className="text-red-400">*</span></label>
              <input type="text" placeholder="e.g. Nike Sports" value={form.advertiser} onChange={e => set('advertiser', e.target.value)} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Size</label>
              <input type="text" placeholder="e.g. 1200x200" value={form.size} onChange={e => set('size', e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Position</label>
              <input type="text" placeholder="e.g. News Header" value={form.position} onChange={e => set('position', e.target.value)} className={inputClass} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Target URL <span className="text-red-400">*</span></label>
              <input type="url" placeholder="https://example.com" value={form.targetUrl} onChange={e => set('targetUrl', e.target.value)} className={inputClass} required />
            </div>
          </div>

          {/* Dates + Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>Start Date</label>
              <div className="relative">
                <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} className={`${inputClass} scheme-dark pl-10`} />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <div className="relative">
                <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} className={`${inputClass} scheme-dark pl-10`} />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className={inputClass}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <p className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-cyan-500 rounded-full block" />
              Pricing
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>Campaign Budget (€)</label>
                <input type="number" min="0" placeholder="500" value={form.campaignBudget} onChange={e => set('campaignBudget', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Billing Type</label>
                <select value={form.billingType} onChange={e => set('billingType', e.target.value)} className={inputClass}>
                  <option value="CPM">CPM (Cost per 1000 Impressions)</option>
                  <option value="CPC">CPC (Cost per Click)</option>
                  <option value="Flat">Flat Rate</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Rate / 1000 Impressions (€)</label>
                <input type="number" min="0" placeholder="10" value={form.ratePerThousandImpressions} onChange={e => set('ratePerThousandImpressions', e.target.value)} className={inputClass} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-[#0a0c16] border border-gray-700 rounded-lg text-sm text-gray-300 hover:bg-white/5 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isLoading} className="flex-1 py-2.5 bg-[#00d8b6] text-white rounded-lg text-sm font-medium hover:bg-[#00c2a3] transition-colors shadow-lg shadow-[#00d8b6]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" /> Save Ad Slot
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Ad Slot Detail Modal ─────────────────────────────────────────────────────

function AdSlotModal({ slot, onClose }: { slot: AdSlot; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#171b2f] border border-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">{slot.adName}</h2>
            <p className="text-gray-400 text-sm mt-0.5">Ad Slot Details</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {slot.adBanner && (
          <div className="mt-6">
            <p className="text-gray-500 text-xs mb-2">Ad Banner Preview</p>
            <div className="relative group aspect-video rounded-xl overflow-hidden border border-gray-800 bg-black/40">
              <img
                src={slot.adBanner || (slot as any).ad_banner || (slot as any).banner || (slot as any).banner_url}
                alt={slot.adName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/1200x400?text=No+Banner+Image';
                }}
              />
            </div>
          </div>
        )}

        <div className="p-6 space-y-4 text-sm">
          <div className="flex gap-3">
            <div className="flex-1 bg-[#0a0c16] border border-gray-800 rounded-lg px-4 py-3">
              <p className="text-gray-500 text-xs mb-1">Slot ID</p>
              <p className="text-gray-200 font-mono text-xs">{slot.adSlotId || '—'}</p>
            </div>
            <div className="flex-1 bg-[#0a0c16] border border-gray-800 rounded-lg px-4 py-3">
              <p className="text-gray-500 text-xs mb-1">Status</p>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                  slot.status?.toUpperCase() === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-700'
                }`}>{slot.status}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0a0c16] border border-gray-800 rounded-lg px-4 py-3">
              <p className="text-gray-500 text-xs mb-1">Campaign Budget</p>
              <p className="text-white font-bold">€{slot.pricing?.campaignBudget ?? (slot as any).campaign_budget ?? (slot as any).campaignBudget ?? '0'}</p>
            </div>
            <div className="bg-[#0a0c16] border border-gray-800 rounded-lg px-4 py-3">
              <p className="text-gray-500 text-xs mb-1">Billing Type</p>
              <p className="text-white font-bold">{slot.pricing?.billingType ?? (slot as any).billing_type ?? (slot as any).billingType ?? 'N/A'}</p>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
            <span className="text-gray-400 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Advertiser</span>
            <span className="font-medium text-white">{slot.advertiser}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
            <span className="text-gray-400 flex items-center gap-2"><Monitor className="w-3.5 h-3.5" /> Position</span>
            <span className="font-medium text-gray-300">{slot.position}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
            <span className="text-gray-400">Size</span>
            <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">{slot.size}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
            <span className="text-gray-400 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Start Date</span>
            <span className="font-medium text-gray-300">{slot.startDate}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
            <span className="text-gray-400 flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> End Date</span>
            <span className="font-medium text-gray-300">{slot.endDate}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-800/60">
            <span className="text-gray-400 flex items-center gap-2"><MousePointerClick className="w-3.5 h-3.5" /> Clicks</span>
            <span className="font-bold text-white">{slot.clicks?.toLocaleString() ?? 0}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-400">Target URL</span>
            <a href={slot.targetUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs transition-colors max-w-[220px] truncate">
              {slot.targetUrl} <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Monetization Page ────────────────────────────────────────────────────────

export default function MonetizationPage() {
  const { data: metricsResp, isLoading: metricsLoading, isError: metricsError } = useGetMonetizationDataQuery();
  const { data: adSlotsResp, isLoading: slotsLoading, isError: slotsError } = useGetAdSlotsQuery();
  const [selectedSlot, setSelectedSlot] = useState<AdSlot | null>(null);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const router = useRouter();

  const [deleteAdSlot, { isLoading: isDeleting }] = useDeleteAdSlotMutation();

  const metrics = metricsResp && 'data' in metricsResp ? (metricsResp as any).data : metricsResp;
  const adSlots = (() => {
    const raw = adSlotsResp && 'data' in adSlotsResp ? (adSlotsResp as any).data : adSlotsResp;
    return raw?.adSlots || [];
  })();

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the ad slot "${name}"?`)) {
      try {
        await deleteAdSlot(id).unwrap();
        toast.success('Ad slot deleted successfully');
      } catch (err: any) {
        toast.error(err?.data?.message || 'Failed to delete ad slot');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111f] text-white p-6 md:p-8 font-sans">
      {selectedSlot && <AdSlotModal slot={selectedSlot} onClose={() => setSelectedSlot(null)} />}
      {showAddSlot && <AddSlotModal onClose={() => setShowAddSlot(false)} />}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span className="text-cyan-400">Monetization</span>
          <span className="text-[#a855f7]">Dashboard</span>
        </h1>
        <p className="text-gray-400 mt-2 text-sm">Track revenue streams, ad slots, and platform earnings</p>
      </div>

      {/* Metrics Cards */}
      {metricsLoading ? (
        <div className="flex items-center justify-center py-12"><Loader2 className="w-7 h-7 text-cyan-500 animate-spin" /></div>
      ) : metricsError ? (
        <p className="text-red-400 text-sm mb-8">Failed to load monetization metrics.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricCard icon={<DollarSign className="w-5 h-5 text-cyan-400" />} iconBg="bg-cyan-500/10" title="Total Revenue" value={`€${(metrics?.totalRevenue ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} sub="All-time earnings" accent="text-cyan-400" />
          <MetricCard icon={<LayoutGrid className="w-5 h-5 text-purple-400" />} iconBg="bg-purple-500/10" title="Featured Listings" value={`${metrics?.featuredListings ?? 0}`} sub="Active promotions" accent="text-purple-400" />
          <MetricCard icon={<BarChart3 className="w-5 h-5 text-pink-400" />} iconBg="bg-pink-500/10" title="Ad Revenue" value={`€${(metrics?.adRevenue ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`} sub="From advertisements" accent="text-pink-400" />
          <MetricCard icon={<TrendingUp className="w-5 h-5 text-green-400" />} iconBg="bg-green-500/10" title="Revenue Increase" value={`${metrics?.revenueIncrease ?? 0}%`} sub="vs last period" accent="text-green-400" />
        </div>
      )}

      {/* Ad Slots Table */}
      <div className="bg-[#171b2f] border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
              <MousePointerClick className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-white leading-tight">Add Banner Management</h2>
              <p className="text-gray-400 text-xs mt-0.5">All active and inactive advertisement placements</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddSlot(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#00d8b6] text-white rounded-lg text-sm font-medium hover:bg-[#00c2a3] transition-colors shadow-lg shadow-[#00d8b6]/20 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add New Slot
          </button>
        </div>

        {slotsLoading ? (
          <div className="flex items-center justify-center py-12"><Loader2 className="w-7 h-7 text-cyan-500 animate-spin" /></div>
        ) : slotsError ? (
          <p className="px-6 py-8 text-red-400 text-sm">Failed to load ad slots.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#0a0c16]/60 text-gray-400 border-b border-gray-800">
                <tr>
                  <th className="px-6 py-4 font-medium">Slot ID</th>
                  <th className="px-6 py-4 font-medium">Ad Name</th>
                  <th className="px-6 py-4 font-medium">Advertiser</th>
                  <th className="px-6 py-4 font-medium">Position</th>
                  <th className="px-6 py-4 font-medium">Size</th>
                  <th className="px-6 py-4 font-medium">Start Date</th>
                  <th className="px-6 py-4 font-medium">End Date</th>
                  <th className="px-6 py-4 font-medium">Clicks</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {adSlots.length > 0 ? adSlots.map((slot: AdSlot, i: number) => (
                  <tr key={i} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">{slot.adSlotId || '—'}</td>
                    <td className="px-6 py-4 text-gray-200 font-medium">{slot.adName}</td>
                    <td className="px-6 py-4 text-gray-300">{slot.advertiser}</td>
                    <td className="px-6 py-4 text-gray-400">{slot.position}</td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">{slot.size}</td>
                    <td className="px-6 py-4 text-gray-400">{slot.startDate}</td>
                    <td className="px-6 py-4 text-gray-400">{slot.endDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-300">
                        <MousePointerClick className="w-3.5 h-3.5 text-gray-500" />
                        {slot.clicks?.toLocaleString() ?? 0}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase ${slot.status?.toUpperCase() === 'ACTIVE' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-700'
                        }`}>{slot.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setSelectedSlot(slot)} className="p-2 rounded-lg text-cyan-400 hover:bg-cyan-500/10 transition-colors" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => router.push(`/admin/monetization/${slot.adSlotId}/edit`)} className="p-2 rounded-lg text-amber-400 hover:bg-amber-500/10 transition-colors" title="Edit Slot">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(slot.adSlotId, slot.adName)}
                          disabled={isDeleting}
                          className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                          title="Delete Slot"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={10} className="px-6 py-10 text-center text-gray-500">No ad slots found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Metric Card ──────────────────────────────────────────────────────────────

function MetricCard({ icon, iconBg, title, value, sub, accent }: {
  icon: React.ReactNode; iconBg: string; title: string; value: string; sub: string; accent: string;
}) {
  return (
    <div className="bg-[#171b2f] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors">
      <div className={`inline-flex p-3 rounded-lg ${iconBg} mb-5`}>{icon}</div>
      <p className="text-gray-400 text-xs mb-1">{title}</p>
      <p className={`text-2xl font-bold tracking-tight ${accent}`}>{value}</p>
      <p className="text-gray-500 text-xs mt-1">{sub}</p>
    </div>
  );
}
