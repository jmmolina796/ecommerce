import { capitalize } from '../utils';

const navItemTemplate = (url, title) => `<li><a href="/${url}" class="goToUrl">${capitalize(title)}</a></li>`;

export default navItemTemplate;