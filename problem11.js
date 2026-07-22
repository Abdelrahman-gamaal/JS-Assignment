function sum(...numbers) {
  let result = 0;
  for (const num of numbers) {
    result += num;
  }
  return result;
}
//test
// console.log(sum(1, 2, 3, 4));
