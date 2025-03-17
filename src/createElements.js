const DATA = [
  {
    title: "ПЕРВЫЙ В МИРЕ ИНТЕНСИВ",
    highlight: "ПО СКОРОСТНОМУ НАРАЩИВАНИЮ РЕСНИЦ",
    button: "ЗАПИСАТЬСЯ",
  },

  {
    title: "ТИК-ТОК",
    button: "ПОДПИСАТЬСЯ",
  },

  {
    title: "ОПЫТ ОГРОМНЫЙ",
    highlight: "НО РАССКАЖУ ЗА ДЕНЕЖКУ",
  },
];

// 1 variant
// for (let i = 0; i < DATA.length; ++i) {
//   const sectionElement = document.createElement("section");
//   const h3Element = document.createElement("h3");
//   const h2Element = document.createElement("h2");

//   sectionElement.append(h3Element);
//   sectionElement.append(h2Element);
//   sectionElement.setAttribute("class", "offer");

//   h3Element.append(DATA[i].title);
//   h2Element.append(DATA[i].highlight);

//   console.log(sectionElement);

//   const main = document.getElementsByTagName("main")[0];
//   main.append(sectionElement);
// }

// 2 variant
// DATA.forEach((item) => {
//   const sectionElement = document.createElement("section");
//   const h3Element = document.createElement("h3");
//   const h2Element = document.createElement("h2");

//   sectionElement.append(h3Element);
//   sectionElement.append(h2Element);
//   sectionElement.setAttribute("class", "offer");

//   h3Element.append(item.title);
//   h2Element.append(item.highlight);

//   console.log(sectionElement);

//   const main = document.getElementsByTagName("main")[0];
//   main.append(sectionElement);
// });

// 3 varaint --> best because of performance
// const htmlElementsNotAttachedToDOMyet = DATA.map((item) => {
//   const sectionElement = document.createElement("section");
//   const h3Element = document.createElement("h3");
//   const h2Element = document.createElement("h2");

//   sectionElement.append(h3Element);
//   sectionElement.append(h2Element);
//   sectionElement.setAttribute("class", "offer");

//   h3Element.append(item.title);
//   h2Element.append(item.highlight);

//   return sectionElement;
// });
// console.log(htmlElementsNotAttachedToDOMyet);

// const main = document.getElementsByTagName("main")[0];
// main.append(...htmlElementsNotAttachedToDOMyet);

// 4 varaint --> best of the best of course sure because of performance
const fragment = document.createDocumentFragment();
DATA.forEach((item) => {
  const sectionElement = document.createElement("section");
  const h3Element = document.createElement("h3");
  const h2Element = document.createElement("h2");

  sectionElement.append(h3Element);
  sectionElement.append(h2Element);
  sectionElement.setAttribute("class", "offer");

  h3Element.append(item.title);
  h2Element.append(item.highlight);

  fragment.append(sectionElement);
});
console.log(fragment);

const main = document.getElementsByTagName("main")[0];
main.append(fragment);
