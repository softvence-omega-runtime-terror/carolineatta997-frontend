import { baseApi } from "@/redux/api/baseApi";

export const playerDiscoveryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET all players (with optional filters)
    getDiscoveredPlayers: builder.query<any, any>({
      query: (params) => ({
        url: "/scout-agent/player-discovery/",
        params,
      }),
      providesTags: ["PlayerDiscovery"],
    }),

    // GET single player details
    getPlayerDetails: builder.query<any, string | number>({
      query: (id) => `/scout-agent/player-discovery/${id}/`,
      providesTags: (result, error, id) => [{ type: "PlayerDiscovery", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDiscoveredPlayersQuery, useGetPlayerDetailsQuery } = playerDiscoveryApi;
