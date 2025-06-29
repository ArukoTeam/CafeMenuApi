// src/env.d.ts (یا types/env.d.ts)
declare namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      MONGODB_URI?: string;
      JWT_SECRET?: string;
      REFRESH_SECRET?: string
    }
  }
  