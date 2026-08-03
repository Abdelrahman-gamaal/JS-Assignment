function destrucure(obj) {
  const { name, age } = obj;
  return `${name} is ${age} yeaes old `;
}

console.log(destrucure({ name: "ahmed", age: 12 }));
