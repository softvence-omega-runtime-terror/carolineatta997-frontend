import { baseApi } from "@/redux/api/baseApi";
import { ScoutProfile } from "@/types/scout/profileType";

export const scoutProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET — handles wrapped {success, data} envelope + array or single object
    getProfile: builder.query<ScoutProfile | null, void>({
      query: () => "/scout-agent/profile/",
      transformResponse: (response: any): ScoutProfile | null => {
        // Unwrap {success: true, data: ...} envelope
        const payload = response?.data ?? response;
        // Handle array response — take first item
        if (Array.isArray(payload)) {
          return payload.length > 0 ? (payload[0] as ScoutProfile) : null;
        }
        // Handle single object
        if (payload && typeof payload === "object" && payload.id !== undefined) {
          return payload as ScoutProfile;
        }
        return null;
      },
      providesTags: ["ScoutProfile"],
    }),

    // PATCH — update existing profile
    updateProfile: builder.mutation<
      ScoutProfile,
      { id: number; data: FormData | Partial<ScoutProfile> }
    >({
      query: ({ id, data }) => ({
        url: `/scout-agent/profile/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ScoutProfile"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery, useUpdateProfileMutation } = scoutProfileApi;