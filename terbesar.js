const numbers = [10,2,3,5,6];
let maxNumber = numbers[0];

for (let i = 1; i < numbers.length; i++) {
  if (numbers[i] > maxNumber) {
    maxNumber = numbers[i];
  }
}

console.log(maxNumber);

function isPalindromeSimple(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = cleanedStr.split('').reverse().join('');
  return cleanedStr === reversedStr;
}

console.log(isPalindromeSimple("madam"));
console.log(isPalindromeSimple("A man, a plan, a canal: Panama"));
console.log(isPalindromeSimple("hello"));