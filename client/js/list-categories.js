import categoryTemplate from './templates/category';
import { getCategories } from './api/categories';
import { $, $all, $$ } from './utils';

import listProducts from './list-products';

const $container_categories = $(".container-categories");

const listCategories = async () => {
    const { result, error } = await getCategories();
    if (error) {
        console.log(error);
        return;
    }

    $container_categories.classList.remove("loading");

    result.forEach(v => {
        const category = categoryTemplate(v);
        $container_categories.innerHTML += category;
    });
    
    $all(".go-category").forEach(v => {
        v.addEventListener('click', function() {
            const type = this.getAttribute('data-name');
            const name = this.querySelector(".name").textContent;
            const scroll = true;
            listProducts(type, name, scroll);
        });
    });


};

listCategories();