/**
 * OBJ --> undefined, but const so throw reference error before line 6
 * sectionElement -> undefined but let so throw reference error before line 13
 * h3Element -> undefined ... the same
 *  but pElement -> undefined, accessible everywhere in the file (.js), no errors
 */

const OBJ = {
  title: "ПЕРВЫЙ В МИРЕ ИНТЕНСИВ",
  highlight: "ПО СКОРОСТНОМУ НАРАЩИВАНИЮ РЕСНИЦ",
};
// pElement --> undefined, no error
// sectionElement or h3Ele --> Reference
const sectionElement = document.createElement("section");
const h3Element = document.createElement("h3");
const h2Element = document.createElement("h2");
// var pElement = document.createElement('p');
//
sectionElement.append(h3Element);
sectionElement.append(h2Element);
// or instead both lines above sectionElement.append(sectionElement.append(...[h3Element, h2Element]);)
// or instead both lines above sectionElement.append(sectionElement.append(h3Element, h2Element);)

// sectionElement.getAttribute('class');
sectionElement.setAttribute("class", "offer");

h3Element.append(OBJ.title);
h2Element.append(OBJ.highlight);

console.log(sectionElement);

const main = document.getElementsByTagName("main")[0];
main.prepend(sectionElement); // prepend - at the begining of the children nodes tree
