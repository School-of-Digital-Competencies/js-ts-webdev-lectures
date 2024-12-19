import { AppHeader } from "../../widgets";

export async function AppProductPage() {
  const element = document.createElement("main");

  try {
    const header = AppHeader();

    const template = `
    <div class="bulma-box bulma-container">
      <label class="bulma-label" for="firstname">First name</label>
      <input class="bulma-input" type="text" id="firstname" />

      <label class="bulma-label" for="password">Password</label>
      <input class="bulma-input" type="password" id="password" />

      
      <label class="bulma-label" for="textarea">Password</label>
      <textarea class="bulma-textarea" id="textarea" ></textarea>

      <div class="bulma-select">
        <select>
          <option>Select city</option>
          <option value="1">Minsk</option>
          <option value="2">Vilnius</option>
          <option value="3">Warsaw</option>
        </select>
      </div>

      <label class="bulma-checkbox">
        <input type="checkbox" />
        Remember me
      </label>
    </div>
      
    `;

    element.innerHTML = template;
  } catch (err) {
    element.innerHTML = `<h1>Some error</h1> <pre>${JSON.stringify(err)}</pre>`;
  } finally {
    return element;
  }
}
