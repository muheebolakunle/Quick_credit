import Joi from '@hapi/joi';


export default class UserValidation {
  static validateSignup(req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
      firstName: Joi.string().min(2).max(15).required()
        .regex(/^[a-zA-Z]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'firstName should not be empty!';
                break;
              case 'string.min':
                err.message = `firstName should have at least ${err.context.limit} characters!`;
                break;
              case 'string.max':
                err.message = `firstName should have at most ${err.context.limit} characters!`;
                break;
              case 'string.regex.base':
                err.message = 'firstName must be a word with no special characters';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      lastName: Joi.string().min(2).max(15).required()
        .regex(/^[a-zA-Z]*$/)
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'lastName should not be empty!';
                break;
              case 'string.min':
                err.message = `lastName should have at least ${err.context.limit} characters!`;
                break;
              case 'string.max':
                err.message = `lastName should have at most ${err.context.limit} characters!`;
                break;
              case 'string.regex.base':
                err.message = 'lastName must be a word with no special characters';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
      password: Joi.string().min(5).regex(/^[a-zA-Z0-9]*$/).required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'password should not be empty!';
                break;
              case 'string.min':
                err.message = `password should have at least ${err.context.limit} characters!`;
                break;
              case 'string.regex.base':
                err.message = 'password must contain alphabets and numbers only, no special characters';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
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
      password: Joi.string().min(5).regex(/^[a-zA-Z0-9]*$/).required()
        .error((errors) => {
          errors.forEach((err) => {
            switch (err.type) {
              case 'any.empty':
                err.message = 'password should not be empty!';
                break;
              case 'string.min':
                err.message = `password should have at least ${err.context.limit} characters!`;
                break;
              case 'string.regex.base':
                err.message = 'password must contain only alphabets and numbers, no special characters';
                break;
              default:
                break;
            }
          });
          return errors;
        }),
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

  static validateEmailParam(req, res, next) {
    const schema = {
      email: Joi.string().email().required(),
    };

    const { error } = Joi.validate(req.params, schema);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    return next();
  }
}
