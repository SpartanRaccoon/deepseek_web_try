const { OpenAI } = require('openai');
require('dotenv').config();

// 内存存储解读结果
const readingsStore = new Map();

// 初始化 OpenAI 客户端
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY
});

// DeepSeek API 调用函数
async function getDeepSeekReading(type, data) {
  const sections = {
    overview: '综合命盘解读',
    bazi: '八字解析',
    astrology: '星盘分析',
    purpleStar: '紫微斗数',
    personality: '性格特征',
    career: '事业发展',
    future: '未来建议',
    relationships: '人际关系',
    health: '健康状况',
    timing: '吉凶时机'
  };

  // 综合解读提示语
  
  try {
    const stream = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `你是一位精通八字、紫微斗数和西方占星的命理大师。

基于用户提供的出生信息和MBTI分数（E/I: ${data.mbtiScores[0]}, S/N: ${data.mbtiScores[1]}, T/F: ${data.mbtiScores[2]}, J/P: ${data.mbtiScores[3]}），请按照以下格式进行解读：

1. 总体概述
请给出一段简明扼要的总体概述（100字以内）

2. 详细解读

${sections.overview}
重点分析命理特征
突出关键影响因素

${sections.personality}
列举3-4个核心性格特点
说明优势和潜在问题

${sections.career}
指出最适合的2-3个职业方向
分析职业发展关键点

${sections.future}
提供3-4条具体的发展建议
指出需要注意的事项

${sections.relationships}
分析人际关系特点
提供改善建议

${sections.health}
指出需要关注的健康方面
给出养生保健建议

${sections.timing}
说明近期关键时段
提供具体的时间建议

注意事项：
1. 不要使用任何特殊格式标记（如#、*、-等）
2. 重要的关键词用"引号"标注
3. 每个部分之间用空行分隔
4. 每个要点前使用数字序号，如"1. "
5. 段落要清晰，避免过长的文字块`
        },
        {
          role: 'user',
          content: `姓名：${data.name}
性别：${data.gender}
出生日期：${data.birthDate}
出生时间：${data.birthTime}
出生地点：${data.birthLocation}

请根据以上信息进行详细解读。`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      stream: true
    });

    let aiResponse = '';
    
    // 设置响应头，启用流式输出
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 处理流式响应
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        aiResponse += content;
        // 发送数据到客户端
        res.write(`data: ${JSON.stringify({ content })}

`);
      }
    }

    // 分离总体概述和详细内容
    const [summarySection, ...contentSections] = aiResponse.split('\n\n');
    
    // 处理详细内容
    const processedSections = {};
    let currentSection = '';
    
    // 提取关键词（引号中的内容）
    const extractKeywords = (text) => {
      const matches = text.match(/[""](.*?)[""]/g) || [];
      return matches.map(match => match.replace(/[""]/g, ''));
    };

    // 提取要点（以数字序号开头的行）
    const extractPoints = (lines) => {
      return lines
        .filter(line => /^\d+\./.test(line.trim()))
        .map(line => ({
          content: line.replace(/^\d+\.\s*/, '').trim(),
          keywords: extractKeywords(line)
        }));
    };

    // 处理每个部分
    contentSections.forEach(section => {
      const lines = section.split('\n');
      const sectionTitle = lines[0].trim();
      
      // 查找对应的英文键名
      const sectionKey = Object.entries(sections).find(([key, value]) => 
        value === sectionTitle
      )?.[0] || 'other';
      
      const contentLines = lines.slice(1);
      const points = extractPoints(contentLines);
      const keywords = extractKeywords(contentLines.join('\n'));
      
      processedSections[sectionKey] = {
        title: sectionTitle,
        content: contentLines.join('\n').trim(),
        points,
        keywords: Array.from(new Set(keywords))
      };
    });

    // 格式化输出
    const formattedResult = {
      summary: {
        content: summarySection.trim(),
        keywords: extractKeywords(summarySection)
      },
      sections: processedSections,
      metadata: {
        type,
        readingTime: new Date().toISOString(),
        subject: {
          name: data.name,
          gender: data.gender,
          birthDate: data.birthDate,
          birthTime: data.birthTime,
          birthLocation: data.birthLocation,
          mbtiScores: data.mbtiScores
        },
        version: '2.2'
      }
    };

    // 添加统计信息
    formattedResult.statistics = {
      totalKeywords: Object.values(processedSections)
        .reduce((acc, section) => acc + section.keywords.length, 0),
      totalPoints: Object.values(processedSections)
        .reduce((acc, section) => acc + section.points.length, 0),
      sectionCount: Object.keys(processedSections).length
    };

    return formattedResult;
  } catch (error) {
    console.error('DeepSeek API error:', error);
    throw error;
  }
}

// 控制器
const readingController = {
  // 创建新的解读
  async createReading(req, res) {
    try {
      const { type, data } = req.body;

      // 验证请求数据
      if (!type || !data) {
        return res.status(400).json({ message: '缺少必要的参数' });
      }

      // 综合解读不需要验证类型
      const type = 'comprehensive';

      // 验证必要的数据字段
      const requiredFields = ['name', 'gender', 'birthDate', 'birthTime', 'birthLocation', 'mbtiScores'];
      const missingFields = requiredFields.filter(field => !data[field]);
      if (missingFields.length > 0) {
        return res.status(400).json({ 
          message: '缺少必要的数据字段', 
          fields: missingFields 
        });
      }

      // 验证 MBTI 分数
      if (!Array.isArray(data.mbtiScores) || 
          data.mbtiScores.length !== 4 || 
          !data.mbtiScores.every(score => typeof score === 'number' && score >= 0 && score <= 100)) {
        return res.status(400).json({
          message: 'MBTI分数无效',
          details: 'mbtiScores必须是一个包含4个0-100之间数字的数组'
        });
      }

      // 使用 DeepSeek API 获取解读结果
      const result = await getDeepSeekReading(type, data);
      
      // 创建解读记录
      const reading = {
        id: Date.now().toString(),
        type,
        data,
        result,
        createdAt: new Date()
      };

      // 存储解读结果
      readingsStore.set(reading.id, reading);

      // 发送结束标记
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error) {
      console.error('Create reading error:', error);
      res.status(500).json({ 
        message: '创建解读失败',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // 获取特定解读
  async getReading(req, res) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({ message: '缺少解读 ID' });
      }
      
      // 从存储中获取解读结果
      const reading = readingsStore.get(id);
      
      if (!reading) {
        return res.status(404).json({ message: '未找到该解读结果' });
      }

      res.json(reading);
    } catch (error) {
      console.error('Get reading error:', error);
      res.status(500).json({ 
        message: '获取解读失败',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  },

  // 获取历史解读
  async getUserReadings(req, res) {
    try {
      // 将 Map 转换为数组并按创建时间排序
      const readings = Array.from(readingsStore.values())
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      res.json(readings);
    } catch (error) {
      console.error('Get readings error:', error);
      res.status(500).json({ 
        message: '获取历史解读失败',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

module.exports = readingController;
