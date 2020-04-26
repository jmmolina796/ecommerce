import { capitalize } from '../utils';
import categoryImages from '../../assets/categories/*.png';

const categoryTemplate = ({
    name,
    title,
    message,
    imageName,
}) => (`
    <article class="go-category" data-name="${name}">
        <div class="image">
            <img class="lazyload" src="${categoryImages[imageName]}" alt="ok">
        </div>
        <div class="info">
            <div class="name">${title}</div>
            <div class="offer">${message}</div>
        </div>
    </article>
`);


export default categoryTemplate;