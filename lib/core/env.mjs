// src/env.mjs
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { ACCESS_TOKEN_REGEX } from "./constants/validation";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    API_TOKEN: z.string().regex(ACCESS_TOKEN_REGEX),
  },

  client: {
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },

  runtimeEnv: {
    API_TOKEN: process.env.API_TOKEN,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
