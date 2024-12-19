export async function AppPaymentPage() {
  const element = document.createElement("main");

  try {
    const template = `
    <div class="bulma-box bulma-container">
      <div class="bulma-field">
        <label class="bulma-label" for="firstname">First name</label>
        <input class="bulma-input" type="text" id="firstname" />
        <p class="bulma-help bulma-is-danger is-hidden">Empty string is not allowed</p>
      </div>
      
      
      <div class="bulma-field">
        <label class="bulma-label">Select city</label>
        <div class="bulma-control">
          <div class="bulma-select">
            <select id="city">
              <option>Select dropdown</option>
              <option value="1">Minsk</option>
              <option value="2">Vilnius</option>
              <option value="3">Warsaw</option>
            </select>
          </div>
        </div>
      </div>

      <div class="bulma-field">
        <div class="bulma-control">
          <label class="bulma-checkbox">
            <input type="checkbox" id="terms">
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>


      <button class="bulma-button bulma-is-black">Pay</button>
    </div>
      
    `;

    element.innerHTML = template;

    const button = element.getElementsByTagName("button")[0];

    const validateAndReturnFirstname = () => {
      const firstnameNode = element.querySelector("#firstname");
      const firstnameInvalidTextNode = element.querySelector(
        "#firstname ~ .bulma-help"
      );

      if (firstnameNode.value.length === 0) {
        firstnameNode?.classList.add("bulma-is-danger");
        firstnameInvalidTextNode.classList.remove("is-hidden");
      } else {
        firstnameNode?.classList.remove("bulma-is-danger");
        firstnameNode?.parentElement
          ?.querySelector("p")
          .classList.add("is-hidden");
      }

      return firstnameNode.value;
    };

    button.addEventListener("click", () => {
      const firstname = validateAndReturnFirstname();

      const cityNode = element.querySelector("#city");
      const city = cityNode.value;

      const termsNode = element.querySelector("#terms");
      const terms = termsNode.checked;

      fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstname: firstname,
          city: city,
          terms: terms,
        }),
      })
        .then((res) => res.json())
        .then(console.log);
    });
  } catch (err) {
    element.innerHTML = `<h1>Some error</h1> <pre>${JSON.stringify(err)}</pre>`;
  } finally {
    return element;
  }
}
