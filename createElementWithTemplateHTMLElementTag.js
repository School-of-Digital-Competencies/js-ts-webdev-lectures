const DATABASE = [
  {
    name: "Jasmine Andrews",
    company: "Facebook",
    feedback:
      "Extremely easy to use, helped us develop our Vote for George Washington micro-site extre- mely quickly! We will definitely use it again for other projects",
  },

  {
    name: "Jasmine Andrews",
    company: "Dropbox",
    feedback:
      "Worth every penny, if you have basic HTML knowledge. It helped us get an exceptional landing page up and running in no time",
  },

  {
    name: "Jasmine Andrews",
    company: "Microsoft",
    feedback:
      "I’ve built my website with Startup just in one day, and it was ready-to-go. Code is clean and simple, easy to use by people with almost any level of programming skills.",
  },

  {
    name: "Jasmine Andrews",
    company: "Google",
    feedback:
      "As a business targeting high net worth individuals, we were looking for a slick, cool and mini-malistic design for our website",
  },
];

/**
 *
 * @param {{ name: string, company: string, feedback: string }} testimonial
 */
function createTestimonial(testimonial) {
  const testimonialTemplate = document.getElementById("testimonial-template");

  if (!testimonialTemplate) {
    throw new Error("There is no template with id = testimonial-template");
  }

  const clone = testimonialTemplate.content.cloneNode(true);

  const p = clone.querySelector("p");
  p.textContent = testimonial.feedback;

  const h4 = clone.querySelector("h4");
  h4.textContent = testimonial.name;

  const h6 = clone.querySelector("h6");
  h6.textContent = testimonial.company;

  return clone;
}

const fragment = document.createDocumentFragment();

DATABASE.forEach((item) => {
  const testimonial = createTestimonial(item);

  fragment.append(testimonial);
});

const testimonials = document.getElementById("testimonials");
testimonials.append(fragment);
