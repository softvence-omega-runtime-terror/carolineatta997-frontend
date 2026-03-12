import { baseApi } from "@/redux/api/baseApi";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MonetizationData {
  totalRevenue: number;
  featuredListings: number;
  adRevenue: number;
  revenueIncrease: number;
}

export interface AdPricing {
  campaignBudget: number;
  billingType: string;
  ratePerThousandImpressions: number;
}

export interface AdSlot {
  adSlotId: string;
  adName: string;
  size: string;
  position: string;
  advertiser: string;
  targetUrl: string;
  adBanner: string;
  startDate: string;
  endDate: string;
  status: string;
  clicks: number;
  pricing?: AdPricing;
}

export interface AdSlotsResponse {
  adSlots: AdSlot[];
}

export interface CreateAdSlotResponse {
  message: string;
  adSlotId: string;
}

export interface AdSlotResponse {
  adSlot: AdSlot;
}

export interface AdSlotAnalyticsResponse {
  adSlotId: string;
  totalClicks: number;
  totalImpressions: number;
  clickRate: string;
  revenue: number;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const adminMonetizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMonetizationData: builder.query<MonetizationData, void>({
      query: () => "/admin-dashboard/monetization/",
      providesTags: ["Dashboard"],
    }),
    getAdSlots: builder.query<AdSlotsResponse, void>({
      query: () => "/admin-dashboard/ad-slots/",
      providesTags: ["Dashboard"],
    }),
    createAdSlot: builder.mutation<CreateAdSlotResponse, FormData>({
      query: (data) => ({
        url: "/admin-dashboard/ad-slots/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    updateAdSlot: builder.mutation<CreateAdSlotResponse, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/admin-dashboard/ad-slots/${id}/`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    deleteAdSlot: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/admin-dashboard/ad-slots/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getAdSlotAnalytics: builder.query<AdSlotAnalyticsResponse, string>({
      query: (id) => `/admin-dashboard/ad-slots/${id}/analytics/`,
      providesTags: (result, error, id) => [{ type: "Dashboard", id }],
    }),
  }),
});

export const {
  useGetMonetizationDataQuery,
  useGetAdSlotsQuery,
  useCreateAdSlotMutation,
  useUpdateAdSlotMutation,
  useDeleteAdSlotMutation,
  useGetAdSlotAnalyticsQuery,
} = adminMonetizationApi;
