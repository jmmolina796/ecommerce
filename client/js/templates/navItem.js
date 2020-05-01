import { capitalize } from '../utils';

const navItemTemplate = (url, title) => `<li><a href="/${url}">${capitalize(title)}</a></li>`;

export default navItemTemplate;