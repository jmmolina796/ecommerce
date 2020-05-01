import { capitalize } from '../utils';

const navItemTemplate = (url, title) => `<li class="go-category"><a href="/${url}">${capitalize(title)}</a></li>`;

export default navItemTemplate;