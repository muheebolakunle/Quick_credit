import Joi from '@hapi/joi';


export default class UserValidation {
  static validateSignup(req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
      firstName: Joi.string().min(2).max(15).required()
        .regex(/^[a-zA-Z]*$/),
      lastName: Joi.string().min(2).max(15).required()
        .regex(/^[a-zA-Z]*$/),
      password: Joi.string().min(5).regex(/^[a-zA-Z0-9]/).required(),
      address: Joi.string().min(5).max(30).required(),
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    return next();
  }

  static validateLogin(req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().min(5).regex(/^[a-zA-Z0-9]/).required(),
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    return next();
  }
}
