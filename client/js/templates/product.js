import { getDiscountPercentage, capitalize } from '../utils';

const productTemplate = ({
    name,
    originalPrice,
    discountPrice,
    savings,
    rating,
    image,
    url
}) => (`
    <article ${ discountPrice ? 'class="disccount"' : '' } >
        <a class="promoted-link" href="${url}">
        <div class="image-container">
            <div class="percentage">-${getDiscountPercentage(originalPrice, discountPrice)}%</div>
            <div class="image lazyload" style="background-image: url('${image}')"></div>
        </div>
        <div class="info"> 
            <div class="name">${capitalize(name)}</div>
            <div class="price">
                <div class="offer">${ discountPrice ? discountPrice : '' }</div>
                <div class="original">$${originalPrice}</div>
            </div>
        </div>
        </a>
    </article>
`);

export default productTemplate;