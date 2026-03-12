import { baseApi } from "../../api/baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscription: builder.query<any, void>({
      query: () => "/players/subscription/",
      providesTags: ["Subscription"],
    }),
    getPlans: builder.query<any, void>({
      query: () => "/players/subscription/plans/",
    }),
    getPaymentHistory: builder.query<any, void>({
      query: () => "/players/subscription/payment-history/",
      providesTags: ["PaymentHistory"],
    }),
    createCheckout: builder.mutation<any, { plan_type: string; billing_cycle: string }>({
      query: (data) => ({
        url: "/players/subscription/create-checkout/",
        method: "POST",
        body: data,
      }),
    }),
    verifyPayment: builder.mutation<any, { session_id: string }>({
      query: (data) => ({
        url: "/players/subscription/verify-payment/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subscription", "PaymentHistory"],
    }),
    cancelSubscription: builder.mutation<any, void>({
      query: () => ({
        url: "/players/subscription/cancel/",
        method: "POST",
      }),
      invalidatesTags: ["Subscription"],
    }),
    updatePaymentMethod: builder.mutation<any, any>({
      query: (data) => ({
        url: "/players/subscription/payment-method/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useGetSubscriptionQuery,
  useGetPlansQuery,
  useGetPaymentHistoryQuery,
  useCreateCheckoutMutation,
  useVerifyPaymentMutation,
  useCancelSubscriptionMutation,
  useUpdatePaymentMethodMutation,
} = subscriptionApi;
