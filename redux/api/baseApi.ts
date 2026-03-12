import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
      const state = getState() as RootState;
      const token = state.auth?.accessToken;

      // Do not send Authorization header for login or registration
      if (
        token &&
        endpoint !== "login" &&
        !headers.has("Authorization")
      ) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "Profile",
    "Settings",
    "Dashboard",
    "Discovery",
    "Events",
    "Registrations",
    "Clubs",
    "ScoutProfile",
    "Users",
    "Subscription",
    "PaymentHistory",
    "ClubProfile",
    "ClubSettings",
    "ClubPrivacy",
    "ClubNotifications",
    "PlayerDiscovery"
  ],
  endpoints: () => ({}),
});