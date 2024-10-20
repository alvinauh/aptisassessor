export interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface TestResult {
  id: string;
  userId: string;
  testType: 'speaking' | 'listening' | 'reading' | 'writing';
  score: number;
  date: string;
}