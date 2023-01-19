import { baseUrl } from "../utils/axios";

export const getUserById = async ({ token, select, id }) => {
  const res = await baseUrl.get(
    `/users/${id}?select=${select || "firstname lastname role _id"}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.user;
};
