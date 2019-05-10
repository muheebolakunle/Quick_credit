import Joi from '@hapi/joi';


export default class LoanValidation {
  static validateLoan(req, res, next) {
    const schema = {
      amount: Joi.number().precision(3).min(1000).required(),
      tenor: Joi.number()
        .integer()
        .min(1)
        .max(12)
        .required(),
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
