import * as Joi from 'joi';

export const configValidationSchema = Joi.object({
  APP_PORT: Joi.number().default(3000).required(),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432).required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DEFAULT_REDIRECT_URL: Joi.string().required(),
  DEFAULT_URL_CODE: Joi.string().required(),
  API_KEY: Joi.string().required(),
});
