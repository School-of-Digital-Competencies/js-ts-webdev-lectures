console.log(document);
// HTML
console.log(document.documentElement);
// body
console.log(document.body);

// select element -> search and return link
const offer = document.getElementById("someId");

// going up to parent element
console.log(offer.parentNode); // <main>
console.log(offer.parentNode.parentNode); // <body>

// iterate children of an element
// works with array-like or collection object
for (const node of offer.childNodes) {
  console.log(node);
}
// works with js array
Array.from(offer.childNodes);

//
document.getElementsByClassName("offer");
//
document.getElementsByTagName("section");
//
Array.from(document.getElementsByTagName("section")).filter((node) =>
  node.className.includes("offer")
);
//
Array.from(document.getElementsByTagName("section")).filter((node) =>
  node.getAttribute("class").includes("offer")
);

// search by CSS selector
document.querySelectorAll('section')

