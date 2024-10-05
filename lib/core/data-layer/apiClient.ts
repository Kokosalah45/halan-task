import ky from "ky";
import { env } from "../env.mjs";

const apiClient = ky.extend({
  prefixUrl: env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.NEXT_PUBLIC_API_TOKEN}`,
  },
});

export default apiClient;
