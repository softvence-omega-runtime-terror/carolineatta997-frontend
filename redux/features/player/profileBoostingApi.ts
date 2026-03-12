import { baseApi } from "@/redux/api/baseApi";

export const profileBoostingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoostPackages: builder.query<any, void>({
      query: () => "/players/profile-boost/packages/",
      providesTags: ["Profile"],
    }),
    requestBoost: builder.mutation<any, { boostPackageId: number; startDate: string; endDate: string }>({
      query: (data) => ({
        url: "/players/profile-boost/request/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    processPayment: builder.mutation<any, { boostRequestId: string; stripe_payment_method_id: string }>({
      query: (data) => ({
        url: "/players/profile-boost/payment/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    getBoostStatus: builder.query<any, string>({
      query: (boostRequestId) => `/players/profile-boost/${boostRequestId}/`,
      providesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetBoostPackagesQuery,
  useRequestBoostMutation,
  useProcessPaymentMutation,
  useGetBoostStatusQuery,
} = profileBoostingApi;