import { capitalize } from '../utils';
import categoryImages from '../../assets/categories/*.png';

const categoryTemplate = ({
    title,
    url,
    message,
    imageName,
}) => (`
    <article class="go-category">
        <a href="/${url}">
            <div class="image">
                <img class="lazyload" src="${categoryImages[imageName]}" alt="ok">
            </div>
            <div class="info">
                <div class="name">${title}</div>
                <div class="offer">${message}</div>
            </div>
        </a>
    </article>
`);


export default categoryTemplate;