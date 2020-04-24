import productTemplate from './templates/product';
import { getProducts } from './api/products';
import { $, $$, $_ } from './utils';

const $container_products = $(".container-products");

const listProducts = async () => {
    const { result, error } = await getProducts();
    if (error) {
        console.log(error);
        return;
    }

    $container_products.classList.remove("loading");

    result.forEach(v => {
        const product = productTemplate(v);
        $container_products.innerHTML += product;
    });

};

listProducts();