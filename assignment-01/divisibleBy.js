function division(number) {
  if (number % 3 === 0 && number % 5 === 0) return "Divisible by both";

  return "not divisible by both";
}
//test
// console.log(division(15));
