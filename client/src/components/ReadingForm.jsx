import React, { useState } from 'react';
import { readingService } from '../services/api';

const ReadingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birthDate: '',
    birthTime: '',
    birthLocation: '',
    mbtiScores: [50, 50, 50, 50]
  });

  const [streamContent, setStreamContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMbtiChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      mbtiScores: prev.mbtiScores.map((score, i) => 
        i === index ? parseInt(value) : score
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStreamContent('');

    try {
      await readingService.createReading(
        'comprehensive',
        formData,
        (content) => {
          setStreamContent(prev => prev + content);
        }
      );
    } catch (error) {
      console.error('Failed to create reading:', error);
      alert('创建解读失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* 金色云纹背景 */}
      <div 
        className="absolute inset-0 bg-repeat opacity-10" 
        style={{
          backgroundImage: `url('/cloud-pattern.svg')`,
          backgroundSize: '200px',
          backgroundRepeat: 'repeat',
          opacity: '0.15'
        }}
      />

      {/* 主要内容 */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* 基本信息 */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">姓名</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">性别</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
              >
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>

            {/* 出生信息 */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">出生日期</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">出生时间</label>
              <input
                type="time"
                name="birthTime"
                value={formData.birthTime}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">出生地点</label>
              <input
                type="text"
                name="birthLocation"
                value={formData.birthLocation}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                required
              />
            </div>

            {/* MBTI 分数 */}
            <div className="col-span-2">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">MBTI 性格倾向</label>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['外向/内向', 'E/I'],
                    ['感知/直觉', 'S/N'],
                    ['思考/情感', 'T/F'],
                    ['判断/知觉', 'J/P']
                  ].map(([label, type], index) => (
                    <div key={type} className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{type.split('/')[0]}</span>
                        <span>{type.split('/')[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={formData.mbtiScores[index]}
                        onChange={(e) => handleMbtiChange(index, e.target.value)}
                        className="w-full accent-amber-500"
                      />
                      <div className="text-xs text-gray-500 text-center">
                        {formData.mbtiScores[index]}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? '命理解读中...' : '开始解读'}
          </button>
        </form>

        {/* 解读结果 */}
        {streamContent && (
          <div className="mt-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                {streamContent}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadingForm;
