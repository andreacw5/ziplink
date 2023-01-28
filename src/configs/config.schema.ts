import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_PORT: Joi.number().default(3000).required(),
  DATABASE_HOST: Joi.string().default('localhost').required(),
  DATABASE_PORT: Joi.number().default(5432).required(),
  DATABASE_NAME: Joi.string().default('url-manager').required(),
  DATABASE_USER: Joi.string().default('postgres').required(),
  DATABASE_PASSWORD: Joi.string().default('').required(),
  DEFAULT_REDIRECT_URL: Joi.string().default('https://google.com').required(),
  DEFAULT_URL_CODE: Joi.string().default('code').required(),
  API_KEY: Joi.string()
    .default('4ca685c8-0bd2-46f9-8e37-b74c8a261940')
    .required(),
});
