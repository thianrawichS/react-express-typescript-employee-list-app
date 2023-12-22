declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string;
        DB_HOST: string;
        DB_DATABASE: string;
        DB_USER: string;
        SALTS: string;
        TOKEN_KEY: string;
      }
    }
  }
export {};
  