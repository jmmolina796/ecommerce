import { capitalize } from '../utils';
import categoryImages from '../../assets/categories/*.png';

const categoryTemplate = ({
    title,
    url,
    message,
    imageName,
}) => (`
    <article>
        <a href="/${url}">
            <div class="image-container">
                <div class="image lazyload" style="background-image: url('${categoryImages[imageName]}')"></div>
            </div>
            <div class="info">
                <div class="name">${title}</div>
                <div class="offer">${message}</div>
            </div>
        </a>
    </article>
`);


export default categoryTemplate;