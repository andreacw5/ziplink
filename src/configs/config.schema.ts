export default () => ({
  port: parseInt(process.env.APP_PORT) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
  defaults: {
    redirectUrl: process.env.DEFAULT_REDIRECT_URL,
    urlCode: process.env.DEFAULT_URL_CODE,
  },
  auth: {
    key: process.env.API_KEY,
  },
});
