import categoryTemplate from './templates/category';
import navItemTemplate from './templates/navItem';
import { getCategories } from './api/categories';
import { $, $all, goToUrl } from './utils';

const $container_categories = $(".container-categories");
const $nav = $("nav ul");

const listCategories = async () => {
    const { result, error } = await getCategories();
    if (error) {
        console.log(error);
        return;
    }

    $container_categories.classList.remove("loading");

    result.forEach(v => {
        const li = navItemTemplate(v.url, v.title);
        $nav.innerHTML += li;

        const category = categoryTemplate(v);
        $container_categories.innerHTML += category;
    });

    $all('.goToUrl').forEach((el) => {
        el.addEventListener('click', goToUrl);
    });

    return result;
};

export default listCategories;
