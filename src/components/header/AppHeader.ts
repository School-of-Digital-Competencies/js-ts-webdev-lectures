import "./AppHeader.css";

export function AppHeader() {
  const node = document.createElement("header");

  node.classList.add('app-header-container');

  node.innerHTML = `
        <ul class="app-header">
            <li><a href="#">Startup 3</a></li>
            
            <ul class="app-links">
                <li><a href="#overview">Overview</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#company">Company</a></li>
                <li><a href="#platfrom">Platform</a></li>
            </ul>
            
        </ul>
    `;

  return node;
}
