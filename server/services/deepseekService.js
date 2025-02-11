const axios = require('axios');

class DeepseekService {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.deepseek.com/v1',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  }

  // 生成解读提示词
  generatePrompt(type, data, language) {
    const prompts = {
      astrology: {
        zh: `请根据以下出生信息进行专业的占星解读：
出生日期：${data.birthDate}
出生时间：${data.birthTime}
出生地点：${data.birthLocation}

请包含以下方面：
1. 上升星座和月亮星座
2. 主要星座分布
3. 重要相位
4. 人格特质分析
5. 事业发展建议
6. 感情生活分析
7. 未来一年运势预测`,
        en: `Please provide a professional astrological reading based on the following birth information:
Birth Date: ${data.birthDate}
Birth Time: ${data.birthTime}
Birth Location: ${data.birthLocation}

Please include:
1. Ascendant and Moon Sign
2. Major Planetary Positions
3. Important Aspects
4. Personality Analysis
5. Career Development Advice
6. Love Life Analysis
7. Next Year Forecast`
      },
      purpleStar: {
        zh: `请根据以下信息进行紫微斗数命盘解读：
阳历生日：${data.solarDate}
出生时辰：${data.birthHour}
性别：${data.gender}

请包含以下方面：
1. 命主星及主要星曜
2. 十二宫位分析
3. 格局判定
4. 性格特点
5. 事业方向
6. 财运分析
7. 感情姻缘
8. 健康提醒`,
        en: `Please provide a Purple Star Astrology reading based on:
Solar Date: ${data.solarDate}
Birth Hour: ${data.birthHour}
Gender: ${data.gender}

Please include:
1. Main Stars Analysis
2. Twelve Houses Analysis
3. Pattern Determination
4. Personality Traits
5. Career Direction
6. Wealth Analysis
7. Love and Marriage
8. Health Advice`
      },
      bazi: {
        zh: `请根据以下八字信息进行命理解读：
年柱：${data.yearPillar}
月柱：${data.monthPillar}
日柱：${data.dayPillar}
时柱：${data.hourPillar}

请包含以下方面：
1. 命局特点
2. 五行分析
3. 十神分析
4. 性格特征
5. 事业方向
6. 财运分析
7. 健康建议
8. 流年运势`,
        en: `Please provide a BaZi (Four Pillars) reading based on:
Year Pillar: ${data.yearPillar}
Month Pillar: ${data.monthPillar}
Day Pillar: ${data.dayPillar}
Hour Pillar: ${data.hourPillar}

Please include:
1. Destiny Pattern
2. Five Elements Analysis
3. Ten Gods Analysis
4. Personality Traits
5. Career Direction
6. Wealth Analysis
7. Health Advice
8. Annual Forecast`
      },
      mbti: {
        zh: `请根据以下MBTI测试结果进行深入解读：
性格类型：${data.type}
各维度得分：
- 外向/内向 (E/I): ${data.scores.ei}
- 感觉/直觉 (S/N): ${data.scores.sn}
- 思考/情感 (T/F): ${data.scores.tf}
- 判断/知觉 (J/P): ${data.scores.jp}

请包含以下方面：
1. 性格类型概述
2. 核心特质分析
3. 优势与潜在盲点
4. 人际关系模式
5. 最适合的职业方向
6. 个人成长建议`,
        en: `Please provide a detailed MBTI personality analysis based on:
Personality Type: ${data.type}
Dimension Scores:
- Extraversion/Introversion (E/I): ${data.scores.ei}
- Sensing/Intuition (S/N): ${data.scores.sn}
- Thinking/Feeling (T/F): ${data.scores.tf}
- Judging/Perceiving (J/P): ${data.scores.jp}

Please include:
1. Type Overview
2. Core Traits Analysis
3. Strengths and Potential Blindspots
4. Relationship Patterns
5. Best Career Paths
6. Personal Growth Suggestions`
      }
    };

    return prompts[type][language] || prompts[type].en;
  }

  // 生成解读结果
  async generateReading(type, data, language = 'zh') {
    try {
      const prompt = this.generatePrompt(type, data, language);

      const response = await this.client.post('/chat/completions', {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一位专业的占星师、命理师和心理咨询师，擅长占星、紫微斗数、八字和MBTI分析。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Deepseek API error:', error);
      throw new Error('AI解读生成失败');
    }
  }
}

module.exports = new DeepseekService();
