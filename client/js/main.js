import { getUrlPath } from './utils';

import listProducts from './list-products';
import './list-categories';

const lastPath = getUrlPath(-1);
const defaultProducts = 'cubrebocas';

if (lastPath) {
    listProducts(lastPath);
} else {
    listProducts(defaultProducts);
}