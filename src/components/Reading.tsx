import React, { useState } from 'react';
import { User } from '../types';
import { assessCEFRLevel } from '../utils/openai';

interface ReadingProps {
  user: User;
}

const Reading: React.FC<ReadingProps> = ({ user }) => {
  const [text, setText] = useState('');
  const [assessment, setAssessment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAssessment = async () => {
    setIsLoading(true);
    try {
      const result = await assessCEFRLevel(text, 'reading');
      setAssessment(result);
    } catch (error) {
      console.error('Error in assessment:', error);
      setAssessment('An error occurred during assessment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-2xl font-semibold">Reading Practice</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p>Welcome to the Reading section, {user.username}!</p>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={5}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your reading sample here..."
                />
                <button
                  onClick={handleAssessment}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
                  disabled={isLoading || !text.trim()}
                >
                  {isLoading ? 'Assessing...' : 'Assess CEFR Level'}
                </button>
                {assessment && (
                  <div className="mt-4 p-4 bg-gray-100 rounded">
                    <h3 className="font-bold">Assessment Result:</h3>
                    <p>{assessment}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reading;