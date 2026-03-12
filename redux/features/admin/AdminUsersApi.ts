import { baseApi } from "@/redux/api/baseApi";
import { UserRole } from "@/types/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AdminUserListItem {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: string;
  joined: string;
}

export interface AdminUserListResponse {
  success: boolean;
  count: number;
  data: AdminUserListItem[];
}

export interface AdminUserDetails {
  id: number;
  email: string;
  role: UserRole;
  is_active: boolean;
  date_joined: string;
  last_login: string | null;
}

export interface AdminUserDetailsResponse {
  success: boolean;
  data: AdminUserDetails;
}

// ─── API ──────────────────────────────────────────────────────────────────────

export const adminUsersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUsers: builder.query<AdminUserListResponse, void>({
      query: () => "/admin-dashboard/users/",
      providesTags: ["Users"],
    }),
    getAdminUserDetails: builder.query<AdminUserDetailsResponse, number>({
      query: (id) => `/admin-dashboard/users/${id}/`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    toggleUserStatus: builder.mutation<
      { success: boolean; message: string },
      { id: number; is_active: boolean }
    >({
      query: ({ id, is_active }) => ({
        url: `/admin-dashboard/users/${id}/status/`,
        method: "PATCH",
        body: { is_active },
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => ({
        url: `/admin-dashboard/users/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { 
  useGetAdminUsersQuery, 
  useGetAdminUserDetailsQuery,
  useToggleUserStatusMutation,
  useDeleteUserMutation
} = adminUsersApi;
