function printOdd(min, max) {
  if (min > max) {
    console.log("min must be little than or equal max");
    return;
  }
  for (let i = min; i <= max; i++) {
    if (i % 2 !== 0) {
      console.log(i);
    }
  }
}
//test
// printOdd(1, 100);

// we dont need to use continue , the condition handles what problem need
