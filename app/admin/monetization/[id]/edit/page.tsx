"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useGetAdSlotsQuery,
  useUpdateAdSlotMutation,
  AdSlot
} from '@/redux/features/admin/adminMonetizationApi';
import {
  ChevronLeft,
  Loader2,
  Upload,
  ImageIcon,
  Calendar,
  DollarSign,
  TrendingUp,
  Monitor,
  LayoutGrid,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function EditAdSlotPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: slotsResp, isLoading: isFetching, isError } = useGetAdSlotsQuery();
  const [updateAdSlot, { isLoading: isUpdating }] = useUpdateAdSlotMutation();

  const adSlot = (() => {
    if (!slotsResp) return null;
    let list: AdSlot[] = [];
    if ('data' in slotsResp) list = (slotsResp as any).data.adSlots || [];
    else if ('adSlots' in slotsResp) list = slotsResp.adSlots;
    else if (Array.isArray(slotsResp)) list = slotsResp;
    
    return list.find((s: AdSlot) => s.adSlotId === id || s.adSlotId === id.replace(/^AS/, '')) || null;
  })();

  const [form, setForm] = useState({
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
  });

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper to convert DD/MM/YYYY back to YYYY-MM-DD for date input
  const formatToInput = (dateStr: string) => {
    if (!dateStr || !dateStr.includes('/')) return dateStr;
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  // Helper to convert YYYY-MM-DD to DD/MM/YYYY for backend
  const formatToBackend = (dateStr: string) => {
    if (!dateStr) return '';
    if (dateStr.includes('/')) return dateStr; // already formatted
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Helper to normalize status to PascalCase (e.g., ACTIVE -> Active)
  const normalizeStatus = (status: string) => {
    if (!status) return 'Active';
    const s = status.toLowerCase();
    if (s === 'active') return 'Active';
    if (s === 'inactive') return 'Inactive';
    if (s === 'scheduled') return 'Scheduled';
    return 'Active';
  };

  useEffect(() => {
    if (adSlot) {
      const s = adSlot as any;
      setForm({
        adName: s.adName || '',
        size: s.size || '',
        position: s.position || '',
        advertiser: s.advertiser || '',
        targetUrl: s.targetUrl || '',
        startDate: formatToInput(s.startDate || s.start_date || ''),
        endDate: formatToInput(s.endDate || s.end_date || ''),
        status: normalizeStatus(s.status),
        // Support both nested and flattened pricing fields with all common naming conventions
        campaignBudget: (s.pricing?.campaignBudget ?? s.pricing?.campaign_budget ?? s.campaignBudget ?? s.campaign_budget ?? s.budget ?? '').toString(),
        billingType: s.pricing?.billingType ?? s.pricing?.billing_type ?? s.billingType ?? s.billing_type ?? 'CPM',
        ratePerThousandImpressions: (s.pricing?.ratePerThousandImpressions ?? s.pricing?.rate_per_thousand_impressions ?? s.ratePerThousandImpressions ?? s.rate_per_thousand_impressions ?? s.rate ?? '').toString(),
      });
      setBannerPreview(s.adBanner || s.ad_banner || s.banner || s.banner_url || s.image || null);
    }
  }, [adSlot]);

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerFile(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (bannerFile) {
      formData.append('addBanner', bannerFile);
    }

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
      await updateAdSlot({ id, data: formData }).unwrap();
      toast.success('Ad slot updated successfully');
      router.push('/admin/monetization');
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to update ad slot');
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (isError || (!isFetching && !adSlot)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-transparent text-white">
        <p className="text-xl font-bold mb-4">Failed to load ad slot details.</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-white/5 border border-gray-800 rounded-xl hover:bg-white/10 transition-colors">
          Go Back
        </button>
      </div>
    );
  }

  const inputClass = "w-full bg-[#0a0c16] border border-gray-700/50 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all";
  const labelClass = "block text-sx font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1";

  return (
    <div className="min-h-screen p-8 bg-transparent pb-10">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl bg-white/5 border border-gray-800 text-gray-400 hover:text-white transition-all transform hover:-translate-x-1"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-4xl font-black tracking-tight bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Edit Ad Slot
            </h1>
          </div>
          <p className="text-gray-500 ml-12 font-medium">Update advertisement details for <span className="text-cyan-400">#{id}</span></p>
        </div>
      </div>

      <div className="w-full">
        <form onSubmit={handleSubmit} className="bg-[#171b2f] border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">

          <div className="grid grid-cols-1 lg:grid-cols-3">

            {/* Left Column: Media */}
            <div className="p-8 border-b lg:border-b-0 lg:border-r border-gray-800 bg-[#0d1020]/30">
              <div className="sticky top-8">
                <label className={labelClass}>Ad Banner</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative w-full aspect-4/5 border-2 border-dashed border-gray-700 rounded-2xl overflow-hidden cursor-pointer hover:border-cyan-500/50 transition-all shadow-inner bg-[#0a0c16]"
                >
                  {bannerPreview ? (
                    <>
                      <img src={bannerPreview} alt="Banner preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity backdrop-blur-[2px]">
                        <Upload className="w-8 h-8 text-white mb-2" />
                        <p className="text-white text-sm font-bold">Change Image</p>
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-500 p-6 text-center">
                      <div className="p-4 rounded-full bg-white/5">
                        <ImageIcon className="w-10 h-10" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-300">Upload Banner</p>
                        <p className="text-xs text-gray-600 mt-1 uppercase tracking-widest">JPG, PNG or WEBP</p>
                      </div>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerChange} />

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0a0c16]/50 border border-gray-800">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">Dimensions</p>
                      <p className="text-sm font-bold text-gray-300">{form.size || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#0a0c16]/50 border border-gray-800">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-bold text-gray-600 tracking-widest">Position</p>
                      <p className="text-sm font-bold text-gray-300">{form.position || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="p-8 lg:col-span-2 space-y-8">

              {/* Section: Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-cyan-500 rounded-full" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">General Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className={labelClass}>Ad Name <span className="text-red-400">*</span></label>
                    <input type="text" placeholder="e.g. Top Banner - Homepage" value={form.adName} onChange={e => set('adName', e.target.value)} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Advertiser <span className="text-red-400">*</span></label>
                    <input type="text" placeholder="e.g. Nike Sports" value={form.advertiser} onChange={e => set('advertiser', e.target.value)} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Target URL <span className="text-red-400">*</span></label>
                    <input type="url" placeholder="https://example.com" value={form.targetUrl} onChange={e => set('targetUrl', e.target.value)} className={inputClass} required />
                  </div>
                  <div>
                    <label className={labelClass}>Size</label>
                    <input type="text" placeholder="1200x200" value={form.size} onChange={e => set('size', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Position</label>
                    <input type="text" placeholder="News Header" value={form.position} onChange={e => set('position', e.target.value)} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Section: Schedule */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-amber-500 rounded-full" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Campaign Schedule</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelClass}>Start Date</label>
                    <div className="relative">
                      <input type="date" value={form.startDate} onChange={e => set('startDate', e.target.value)} className={`${inputClass} scheme-dark pl-11`} />
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>End Date</label>
                    <div className="relative">
                      <input type="date" value={form.endDate} onChange={e => set('endDate', e.target.value)} className={`${inputClass} scheme-dark pl-11`} />
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
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
              </div>

              {/* Section: Pricing */}
              <div className="space-y-6 bg-[#0a0c16]/40 p-6 rounded-2xl border border-gray-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1 h-4 bg-emerald-500 rounded-full" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Pricing Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelClass}>Budget (€)</label>
                    <div className="relative">
                      <input type="number" min="0" placeholder="500" value={form.campaignBudget} onChange={e => set('campaignBudget', e.target.value)} className={`${inputClass} pl-11`} />
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Billing Type</label>
                    <select value={form.billingType} onChange={e => set('billingType', e.target.value)} className={inputClass}>
                      <option value="CPM">CPM (Thousand Impressions)</option>
                      <option value="CPC">CPC (Per Click)</option>
                      <option value="Flat">Flat Rate</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Rate / 1000 (€)</label>
                    <div className="relative">
                      <input type="number" min="0" placeholder="10" value={form.ratePerThousandImpressions} onChange={e => set('ratePerThousandImpressions', e.target.value)} className={`${inputClass} pl-11`} />
                      <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 py-4 bg-[#0a0c16] border border-gray-800 rounded-2xl text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all shadow-lg"
                >
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 py-4 bg-[#00d8b6] text-white rounded-2xl text-sm font-bold hover:bg-[#00c2a3] transition-all shadow-[0_8px_30px_rgb(0,216,182,0.2)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
