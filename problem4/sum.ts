//FIXME: return sum of consecutive terms if n > 0, otherwise return n

/**
 * Time complexity: O(1)
 * 
 */
export function sum_to_n_a(n: number): number {
  if (n <= 0) {
    return n;
  }
  return (n * (n + 1)) / 2;
}

/**
 * Time complexity: O(log n)
 * 
 */
export function sum_to_n_b(n: number): number {
  if (n <= 0) {
    return n;
  }
  let first = 1;
  let second = n;
  let total = 0;
  while(first <= second) {
    if(first === second) {
        total += first;
        break;
    }
    total = total + first + second;
    first++;
    second--;
  };
  return total;
}

/**
 * Time complexity: O(n)
 * 
 */
export function sum_to_n_c(n: number): number {
  if (n <= 0) {
    return n;
  }

  return Array.from(Array(n + 1).keys()).reduce((acc, cur) => acc + cur, 0);
}
