import { baseApi } from "../../api/baseApi";


export const eventsDirectoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<any[], void>({
      query: () => "/players/events/",
    }),
    getEventDetails: builder.query<any, string | number>({
      query: (id) => `/players/events/${id}/`,
    }),
    createRegistration: builder.mutation<any, any>({
      query: (data) => ({
        url: "/players/event-registration/",
        method: "POST",
        body: data,
      }),
    }),
    checkout: builder.mutation<any, { registration_id: string }>({
      query: (data) => ({
        url: "/players/event-registration/checkout/",
        method: "POST",
        body: data,
      }),
    }),
    verifyPayment: builder.mutation<any, { session_id: string; registration_id: string }>({
      query: (data) => ({
        url: "/players/event-registration/verify-payment/",
        method: "POST",
        body: data,
      }),
    }),
    getRegistrationStatus: builder.query<any, string>({
      query: (registration_id) => `/players/event-registration/status/${registration_id}/`,
    }),
    getMyRegistrations: builder.query<any[], void>({
      query: () => `/players/event-registrations/`,
      providesTags: ["Events"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventDetailsQuery,
  useCreateRegistrationMutation,
  useCheckoutMutation,
  useVerifyPaymentMutation,
  useGetRegistrationStatusQuery,
  useGetMyRegistrationsQuery,
} = eventsDirectoryApi;
