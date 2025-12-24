import _ from 'lodash';

/**
 * Sort an array of numbers in ascending order
 */
export function sortNumbersAsc(numbers: number[]): number[] {
  return _.sortBy(numbers);
}

/**
 * Sort an array of numbers in descending order
 */
export function sortNumbersDesc(numbers: number[]): number[] {
  return _.orderBy(numbers, [], ['desc']);
}

/**
 * Sort an array of numbers using custom comparator
 */
export function sortNumbers(numbers: number[], order: 'asc' | 'desc' = 'asc'): number[] {
  return order === 'asc' ? sortNumbersAsc(numbers) : sortNumbersDesc(numbers);
}
