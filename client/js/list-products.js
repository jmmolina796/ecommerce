import productTemplate from './templates/product';
import { getProducts } from './api/products';
import { $ } from './utils';
import { scrollTo } from './utils';

const $container_products = $(".container-products");

const listProducts = async (type, name, scroll = false) => {

    if (scroll) {
        scrollTo($("#products-title"));
    }

    $container_products.classList.add("loading");
    $("#products-title").textContent = name;

    const { result, error } = await getProducts(type);
    if (error) {
        console.log(error);
        return;
    }

    while ($container_products.lastElementChild.className !== 'loader') {
        $container_products.removeChild($container_products.lastChild);
    }
    
    $container_products.classList.remove("loading");
    
    result.forEach(v => {
        const product = productTemplate(v);
        $container_products.innerHTML += product;
    });

    if (scroll) {
        scrollTo($("#products-title"));
    }
};

export default listProducts;