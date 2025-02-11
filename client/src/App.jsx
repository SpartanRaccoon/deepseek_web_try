import React from 'react';
import ReadingForm from './components/ReadingForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">
            命理综合解读
          </h1>
          <div className="flex items-center justify-center space-x-8 text-amber-700">
            <div className="flex items-center">
              <span className="text-2xl">♈</span>
              <span className="ml-2">八字</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl">♉</span>
              <span className="ml-2">紫微</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl">♊</span>
              <span className="ml-2">星盘</span>
            </div>
          </div>
        </div>
        <ReadingForm />
      </div>
    </div>
  );
}

export default App;
