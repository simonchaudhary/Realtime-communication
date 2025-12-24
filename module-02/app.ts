import { sortNumbers, sortNumbersAsc, sortNumbersDesc } from './utils/sort';

const numbers = [42, 15, 8, 23, 4, 16, 35];

console.log('Original numbers:', numbers);
console.log('Sorted ascending:', sortNumbersAsc(numbers));
console.log('Sorted descending:', sortNumbersDesc(numbers));
console.log('Sorted with order parameter (asc):', sortNumbers(numbers, 'asc'));
console.log('Sorted with order parameter (desc):', sortNumbers(numbers, 'desc'));
