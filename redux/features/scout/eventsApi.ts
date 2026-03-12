// redux/features/scout/eventsApi.ts
import { baseApi } from "@/redux/api/baseApi";
import { Event, EventListResponse } from "@/types/scout/eventsType";

interface GetEventResponse {
  success: boolean;
  data: Event;
}

export const eventsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEvents: builder.query<EventListResponse, void>({
      query: () => "/scout-agent/event-discovery/",
      providesTags: ["Events"],
    }),

    getAllPlayersEventsRegister : builder.query<EventListResponse,void>({
      query: () => "/players/event-registrations/",
      providesTags:['']
    }),

    // Return only the inner data to match the component type
    getEvent: builder.query<Event, number>({
      query: (id) => `/events/${id}/`,
      transformResponse: (response: GetEventResponse) => response.data,
    }),

    registerForEvent: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/scout-agent/event-registrations/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const { useGetAllEventsQuery, useGetEventQuery, useRegisterForEventMutation } = eventsApi;