const Joi = require('joi');

const validate = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true
    });

    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail) => detail.message)
        .join(', ');
      
      return res.status(400).json({
        message: '输入数据验证失败',
        errors: errorMessage
      });
    }

    // 将验证后的数据添加到请求对象
    req.body = validationResult.value;
    next();
  };
};

module.exports = validate;
