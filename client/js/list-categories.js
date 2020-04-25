import categoryTemplate from './templates/category';
import navItemTemplate from './templates/navItem';
import { getCategories } from './api/categories';
import { $, $all, $$ } from './utils';

import listProducts from './list-products';

const $container_categories = $(".container-categories");
const $nav = $("nav ul");

const addClick = function() {
    const type = this.getAttribute('data-name');
    const name = this.querySelector(".name").textContent;
    const scroll = true;
    listProducts(type, name, scroll);
};

const listCategories = async () => {
    const { result, error } = await getCategories();
    if (error) {
        console.log(error);
        return;
    }

    $container_categories.classList.remove("loading");

    result.forEach(v => {
        const li = navItemTemplate(v.name, v.title);
        $nav.innerHTML += li;

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

    $all("nav li").forEach(v => {
        v.addEventListener('click', function() {
            const type = this.getAttribute('data-name');
            const name = this.textContent;
            const scroll = true;
            listProducts(type, name, scroll);
        });
    });

};

listCategories();