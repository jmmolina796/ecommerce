import listProducts from './list-products';
import initIntersectionObserver from './infiniteScroll';
import { $all, goToUrl } from './utils';
import { setCountryCode } from './detectCountry';

window.addEventListener('DOMContentLoaded', function(e){

    setCountryCode();
    
    $all('.goToUrl').forEach((el) => {
        el.addEventListener('click', goToUrl);
    });
    
    const scroll = false;
    const clearElements = false;
    listProducts(scroll, clearElements)
        .then(initIntersectionObserver);

});