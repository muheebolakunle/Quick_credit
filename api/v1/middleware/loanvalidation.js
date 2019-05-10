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

  static validateQuery(req, res, next) {
    const schema = {
      status: Joi.string().valid('approved').optional(),
      repaid: Joi.string().valid('true', 'false').optional(),
    };

    const { error } = Joi.validate(req.query, schema);
    if (error) {
      return res.status(400).json({
        status: 400,
        error: error.details[0].message,
      });
    }
    return next();
  }

  static validateStatus(req, res, next) {
    const schema = {
      status: Joi.string().valid('approved', 'rejected').required(),
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

  static validateLoanRepayment(req, res, next) {
    const schema = {
      paidAmount: Joi.number().min(500).required(),
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

  static validateRepaymentId(req, res, next) {
    const schema = {
      id: Joi.number().integer().required(),
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
