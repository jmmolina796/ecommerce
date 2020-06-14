import listProducts from './list-products';
import initIntersectionObserver from './infiniteScroll';
import { $all, goToUrl } from './utils';

window.addEventListener('DOMContentLoaded', function(e){
    
    $all('.goToUrl').forEach((el) => {
        el.addEventListener('click', goToUrl);
    });
    
    const scroll = false;
    const clearElements = false;
    listProducts(scroll, clearElements)
        .then(initIntersectionObserver);

});