import { baseApi } from "@/redux/api/baseApi";

export const adminAddUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPlayer: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/admin-dashboard/users/create-player/",
        method: "POST",
        body: formData,
        // FormData doesn't need content-type header, browser sets it with boundary
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useCreatePlayerMutation } = adminAddUserApi;
