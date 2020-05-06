import { getUrlPath } from './utils';

import listCategories from './list-categories';
import listProducts from './list-products';

const defaultProducts = 'cubrebocas_neopreno';

listCategories()
    .then((categories) => {
        const categoriesUrls = categories.map(c => c.url);

        const lastPath = getUrlPath(-1);
        
        if (categoriesUrls.includes(lastPath)) {
            listProducts(lastPath);
        } else {
            listProducts(defaultProducts);
        }
    })
    .catch((err) => {
        listProducts(defaultProducts);
    });