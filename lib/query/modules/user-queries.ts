import { defineQuery } from "../query.utils";

export const userQueries = {
  all: defineQuery<{ users: any[] }>({
    path: "users",
    queryKey: ["users"],
  }),
  byId: defineQuery<{ user: any }, { id: string }>({
    path: (params) => `users/${params.id}`,
    queryKey: (params) => ["user", params.id],
    requiresParams: true,
  }),
  // Add more user-related queries here
};
