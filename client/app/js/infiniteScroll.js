import { $ } from './utils';
import listProducts from './list-products';

const initIntersectionObserver = () => {
    const options = {}

    const callback = entries => {
        if (!$("#list-products").classList.contains("loading") && entries[0].isIntersecting === true) {
            console.log('Loading');
            const scroll = false;
            const clearElements = false;
            listProducts(scroll, clearElements);
        }
    }

    var observer = new IntersectionObserver(callback, options);
    observer.observe(document.querySelector("footer"));
};

export default initIntersectionObserver;