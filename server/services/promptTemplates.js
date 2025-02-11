const templates = {
  astrology: {
    zh: `作为专业占星师，请根据以下用户信息提供详细的星座解读：

用户信息：
姓名：{{name}}
性别：{{gender}}
出生日期：{{birthDate}}
出生时间：{{birthTime}}
出生地点：{{birthLocation}}

请提供以下分析：
1. 三大星座解析（太阳、月亮、上升星座）
2. 主要行星位置及其影响
3. 性格特质分析
4. 事业发展方向
5. 感情关系建议
6. 近期运势预测

输出格式要求：
{
  "basicInfo": {
    "sunSign": "",
    "moonSign": "",
    "risingSign": ""
  },
  "planets": [
    {
      "planet": "",
      "position": "",
      "influence": ""
    }
  ],
  "personality": {
    "strengths": [],
    "weaknesses": [],
    "characteristics": ""
  },
  "career": {
    "suitableFields": [],
    "advice": ""
  },
  "relationships": {
    "compatibility": [],
    "advice": ""
  },
  "forecast": {
    "general": "",
    "love": "",
    "career": "",
    "health": ""
  }
}`,
    
    en: `As a professional astrologer, please provide a detailed reading based on the following user information:

User Information:
Name: {{name}}
Gender: {{gender}}
Birth Date: {{birthDate}}
Birth Time: {{birthTime}}
Birth Location: {{birthLocation}}

Please provide the following analysis:
1. Three main signs (Sun, Moon, Rising)
2. Major planetary positions and their influences
3. Personality trait analysis
4. Career development direction
5. Relationship advice
6. Recent fortune forecast

Output format requirements:
{
  "basicInfo": {
    "sunSign": "",
    "moonSign": "",
    "risingSign": ""
  },
  "planets": [
    {
      "planet": "",
      "position": "",
      "influence": ""
    }
  ],
  "personality": {
    "strengths": [],
    "weaknesses": [],
    "characteristics": ""
  },
  "career": {
    "suitableFields": [],
    "advice": ""
  },
  "relationships": {
    "compatibility": [],
    "advice": ""
  },
  "forecast": {
    "general": "",
    "love": "",
    "career": "",
    "health": ""
  }
}`
  },

  purpleStar: {
    zh: `作为紫微斗数专家，请根据以下用户信息进行命盘解读：

用户信息：
姓名：{{name}}
性别：{{gender}}
出生日期：{{birthDate}}（农历）
出生时间：{{birthTime}}

请提供以下分析：
1. 命主星盘
2. 十二宫位分析
3. 格局判定
4. 流年运势
5. 事业财运
6. 感情姻缘

输出格式要求：
{
  "mainStars": {
    "purpleStar": "",
    "emperor": "",
    "fortune": ""
  },
  "palaces": [
    {
      "name": "",
      "stars": [],
      "interpretation": ""
    }
  ],
  "pattern": {
    "type": "",
    "description": "",
    "influence": ""
  },
  "yearlyFortune": {
    "overall": "",
    "specific": {
      "career": "",
      "wealth": "",
      "relationships": "",
      "health": ""
    }
  },
  "advice": {
    "career": "",
    "relationships": "",
    "lifestyle": ""
  }
}`,

    en: `As a Purple Star Astrology expert, please provide a reading based on the following user information:

User Information:
Name: {{name}}
Gender: {{gender}}
Birth Date: {{birthDate}} (Lunar calendar)
Birth Time: {{birthTime}}

Please provide the following analysis:
1. Main star chart
2. Twelve palace analysis
3. Pattern determination
4. Yearly fortune
5. Career and wealth
6. Love and relationships

Output format requirements:
{
  "mainStars": {
    "purpleStar": "",
    "emperor": "",
    "fortune": ""
  },
  "palaces": [
    {
      "name": "",
      "stars": [],
      "interpretation": ""
    }
  ],
  "pattern": {
    "type": "",
    "description": "",
    "influence": ""
  },
  "yearlyFortune": {
    "overall": "",
    "specific": {
      "career": "",
      "wealth": "",
      "relationships": "",
      "health": ""
    }
  },
  "advice": {
    "career": "",
    "relationships": "",
    "lifestyle": ""
  }
}`
  },

  bazi: {
    zh: `作为八字专家，请根据以下用户信息进行命理分析：

用户信息：
姓名：{{name}}
性别：{{gender}}
出生日期：{{birthDate}}（阳历）
出生时间：{{birthTime}}

请提供以下分析：
1. 八字命盘
2. 五行分析
3. 十神分析
4. 大运流年
5. 事业方向
6. 姻缘分析

输出格式要求：
{
  "chart": {
    "year": {
      "heavenlyStem": "",
      "earthlyBranch": ""
    },
    "month": {
      "heavenlyStem": "",
      "earthlyBranch": ""
    },
    "day": {
      "heavenlyStem": "",
      "earthlyBranch": ""
    },
    "hour": {
      "heavenlyStem": "",
      "earthlyBranch": ""
    }
  },
  "fiveElements": {
    "analysis": "",
    "strengths": [],
    "weaknesses": []
  },
  "tenGods": {
    "analysis": "",
    "favorable": [],
    "unfavorable": []
  },
  "destiny": {
    "currentLuck": "",
    "futureLuck": "",
    "advice": ""
  },
  "career": {
    "suitableFields": [],
    "timing": "",
    "advice": ""
  },
  "relationships": {
    "analysis": "",
    "timing": "",
    "advice": ""
  }
}`,

    en: `As a BaZi expert, please provide a reading based on the following user information:

User Information:
Name: {{name}}
Gender: {{gender}}
Birth Date: {{birthDate}} (Solar calendar)
Birth Time: {{birthTime}}

Please provide the following analysis:
1. BaZi chart
2. Five elements analysis
3. Ten gods analysis
4. Luck pillars
5. Career direction
6. Relationship analysis

Output format requirements:
{
  "chart": {
    "year": {
      "heavenlyStem": "",
      "earthlyBranch": ""
    },
    "month": {
      "heavenlyStem": "",
      "earthlyBranch": ""
    },
    "day": {
      "heavenlyStem": "",
      "earthlyBranch": ""
    },
    "hour": {
      "heavenlyStem": "",
      "earthlyBranch": ""
    }
  },
  "fiveElements": {
    "analysis": "",
    "strengths": [],
    "weaknesses": []
  },
  "tenGods": {
    "analysis": "",
    "favorable": [],
    "unfavorable": []
  },
  "destiny": {
    "currentLuck": "",
    "futureLuck": "",
    "advice": ""
  },
  "career": {
    "suitableFields": [],
    "timing": "",
    "advice": ""
  },
  "relationships": {
    "analysis": "",
    "timing": "",
    "advice": ""
  }
}`
  },

  mbti: {
    zh: `作为MBTI分析专家，请根据以下用户信息进行性格分析：

用户信息：
姓名：{{name}}
性别：{{gender}}
MBTI得分：
- 外向-内向(E-I)：{{scores.ei}}
- 感觉-直觉(S-N)：{{scores.sn}}
- 思考-情感(T-F)：{{scores.tf}}
- 判断-知觉(J-P)：{{scores.jp}}

请提供以下分析：
1. MBTI类型判定
2. 性格特征分析
3. 职业发展建议
4. 人际关系指导
5. 个人成长建议

输出格式要求：
{
  "type": {
    "code": "",
    "name": "",
    "description": ""
  },
  "personality": {
    "strengths": [],
    "weaknesses": [],
    "characteristics": ""
  },
  "career": {
    "suitableFields": [],
    "workStyle": "",
    "advice": ""
  },
  "relationships": {
    "communication": "",
    "compatibility": [],
    "advice": ""
  },
  "growth": {
    "challenges": [],
    "opportunities": [],
    "advice": ""
  }
}`,

    en: `As an MBTI expert, please provide a personality analysis based on the following user information:

User Information:
Name: {{name}}
Gender: {{gender}}
MBTI Scores:
- Extraversion-Introversion (E-I): {{scores.ei}}
- Sensing-Intuition (S-N): {{scores.sn}}
- Thinking-Feeling (T-F): {{scores.tf}}
- Judging-Perceiving (J-P): {{scores.jp}}

Please provide the following analysis:
1. MBTI type determination
2. Personality trait analysis
3. Career development advice
4. Interpersonal relationship guidance
5. Personal growth suggestions

Output format requirements:
{
  "type": {
    "code": "",
    "name": "",
    "description": ""
  },
  "personality": {
    "strengths": [],
    "weaknesses": [],
    "characteristics": ""
  },
  "career": {
    "suitableFields": [],
    "workStyle": "",
    "advice": ""
  },
  "relationships": {
    "communication": "",
    "compatibility": [],
    "advice": ""
  },
  "growth": {
    "challenges": [],
    "opportunities": [],
    "advice": ""
  }
}`
  }
};

module.exports = templates;
