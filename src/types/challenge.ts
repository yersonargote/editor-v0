export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  starterCode: string;
  testCases: TestCase[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  tags: string[];
}

export interface ConsoleOutput {
  type: 'log' | 'error' | 'result';
  content: string;
}