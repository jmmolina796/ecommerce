import { listCategories } from './list-categories';
import listProducts from './list-products';
import initIntersectionObserver from './infiniteScroll';

listCategories()
    .then((categories) => {
        listProducts()
            .then(initIntersectionObserver);
    })
    .catch((err) => {
        listProducts()
            .then(initIntersectionObserver);
    });







