import { baseUrl } from "../utils/axios";

export const getOrderById = async ({ token, id, select }) => {
  const res = await baseUrl.get(
    `/orders/${id}?select=${select || "-updatedAt"}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data.order;
};
