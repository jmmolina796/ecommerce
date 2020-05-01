import productTemplate from './templates/product';
import { getProducts } from './api/products';
import { $ } from './utils';
import { scrollTo } from './utils';

const listProducts = async (type, scroll = false) => {
    
    const $container_products = $(".container-products");

    if (scroll) {
        scrollTo($("#products-title"));
    }

    $container_products.classList.add("loading");
    
    const { result, error } = await getProducts(type);
    if (error) {
        console.log(error);
        return;
    }
    
    $("#products-title").textContent = result["titleCategory"];

    while ($container_products.lastElementChild.className !== 'loader') {
        $container_products.removeChild($container_products.lastChild);
    }
    
    $container_products.classList.remove("loading");
    
    result.products.forEach(v => {
        const product = productTemplate(v);
        $container_products.innerHTML += product;
    });

    if (scroll) {
        scrollTo($("#products-title"));
    }
};

export default listProducts;