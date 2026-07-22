function spliting(text) {
  let element = "";
  let array = [];
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " ") {
      array.push(element);
      element = "";
      continue;
    }

    element += text[i];
  }
  array.push(element);
  return array;
}
console.log(spliting("abdo gamal ahmed ramadan ahmed  mohamed"));
