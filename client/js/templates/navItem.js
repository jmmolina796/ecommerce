import { capitalize } from '../utils';

const navItemTemplate = (name, title) => `<li class="go-category" data-name="${name}">${capitalize(title)}</li>`;

export default navItemTemplate;