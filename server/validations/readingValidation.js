const Joi = require('joi');

const readingSchema = {
  create: Joi.object({
    type: Joi.string()
      .valid('astrology', 'purpleStar', 'bazi', 'mbti')
      .required()
      .messages({
        'any.required': '解读类型是必需的',
        'string.base': '解读类型必须是字符串',
        'any.only': '无效的解读类型'
      }),
    
    // 占星数据验证
    birthDate: Joi.when('type', {
      is: 'astrology',
      then: Joi.date().iso().required().messages({
        'date.base': '出生日期格式无效',
        'any.required': '占星解读需要出生日期'
      })
    }),
    birthTime: Joi.when('type', {
      is: 'astrology',
      then: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required().messages({
        'string.pattern.base': '出生时间格式应为 HH:mm',
        'any.required': '占星解读需要出生时间'
      })
    }),
    birthLocation: Joi.when('type', {
      is: 'astrology',
      then: Joi.string().required().messages({
        'any.required': '占星解读需要出生地点'
      })
    }),

    // 紫微斗数数据验证
    solarDate: Joi.when('type', {
      is: 'purpleStar',
      then: Joi.date().iso().required().messages({
        'date.base': '阳历日期格式无效',
        'any.required': '紫微斗数需要阳历日期'
      })
    }),
    birthHour: Joi.when('type', {
      is: 'purpleStar',
      then: Joi.string().valid(
        '子时', '丑时', '寅时', '卯时', '辰时', '巳时',
        '午时', '未时', '申时', '酉时', '戌时', '亥时'
      ).required().messages({
        'any.only': '无效的出生时辰',
        'any.required': '紫微斗数需要出生时辰'
      })
    }),
    gender: Joi.when('type', {
      is: 'purpleStar',
      then: Joi.string().valid('male', 'female').required().messages({
        'any.only': '性别必须是 male 或 female',
        'any.required': '紫微斗数需要性别信息'
      })
    }),

    // 八字数据验证
    yearPillar: Joi.when('type', {
      is: 'bazi',
      then: Joi.string().required().messages({
        'any.required': '八字需要年柱'
      })
    }),
    monthPillar: Joi.when('type', {
      is: 'bazi',
      then: Joi.string().required().messages({
        'any.required': '八字需要月柱'
      })
    }),
    dayPillar: Joi.when('type', {
      is: 'bazi',
      then: Joi.string().required().messages({
        'any.required': '八字需要日柱'
      })
    }),
    hourPillar: Joi.when('type', {
      is: 'bazi',
      then: Joi.string().required().messages({
        'any.required': '八字需要时柱'
      })
    }),

    // MBTI数据验证
    mbtiType: Joi.when('type', {
      is: 'mbti',
      then: Joi.string().pattern(/^[IE][NS][TF][JP]$/).required().messages({
        'string.pattern.base': 'MBTI类型格式无效',
        'any.required': 'MBTI需要性格类型'
      })
    }),
    scores: Joi.when('type', {
      is: 'mbti',
      then: Joi.object({
        ei: Joi.number().min(0).max(100).required(),
        sn: Joi.number().min(0).max(100).required(),
        tf: Joi.number().min(0).max(100).required(),
        jp: Joi.number().min(0).max(100).required()
      }).required().messages({
        'object.base': 'MBTI分数必须是对象',
        'any.required': 'MBTI需要维度分数'
      })
    })
  })
};

module.exports = {
  readingSchema
};
