import { getUrlPath } from './utils';
import listProducts from './list-products';

window.addEventListener('popstate', function(e){
    const lastPath = getUrlPath(-1);
    listProducts(lastPath);
});