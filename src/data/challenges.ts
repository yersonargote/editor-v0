export const challenges = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers in the array such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    code: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    testCases: [
      {
        input: '[2,7,11,15], 9',
        output: '[0,1]'
      },
      {
        input: '[3,2,4], 6',
        output: '[1,2]'
      }
    ]
  },
  {
    id: 'palindrome-number',
    title: 'Palindrome Number',
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a palindrome, and \`false\` otherwise.

An integer is a palindrome when it reads the same forward and backward.

For example, \`121\` is a palindrome while \`123\` is not.`,
    difficulty: 'Easy',
    tags: ['Math'],
    code: `function isPalindrome(x) {
  if (x < 0) return false;
  
  const str = x.toString();
  let left = 0;
  let right = str.length - 1;
  
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    testCases: [
      {
        input: '121',
        output: 'true'
      },
      {
        input: '-121',
        output: 'false'
      }
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.`,
    difficulty: 'Easy',
    tags: ['Stack', 'String'],
    code: `function isValid(s) {
  const stack = [];
  const pairs = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  
  for (const char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (pairs[last] !== char) return false;
    }
  }
  
  return stack.length === 0;
}`,
    testCases: [
      {
        input: '"()"',
        output: 'true'
      },
      {
        input: '"()[]{}"',
        output: 'true'
      },
      {
        input: '"(]"',
        output: 'false'
      }
    ]
  }
];