import productTemplate from './templates/product';
import { getProducts } from './api/products';
import { $, getUrlPath, scrollTo } from './utils';
import { categoriesUrls } from './list-categories';

const currentProductType = () => {
    const defaultProducts = 'cubrebocas_neopreno';
    const lastPath = getUrlPath(-1);

    return categoriesUrls.includes(lastPath) ? lastPath : defaultProducts ;
}

const listProducts = async (scroll = false, clearElements = true) => {
    
    const type = currentProductType();

    const $globalContainer = $("#list-products");
    const $container_products = $(".container-products");

    if (scroll) {
        scrollTo($("#products-title"));
    }

    $globalContainer.classList.add("loading");

    if(clearElements) {
        $container_products.innerHTML = "";
    }
    
    const { result, error } = await getProducts(type);
    if (error) {
        console.log(error);
        return;
    }
    
    $("#products-title").textContent = result["titleCategory"];

    $globalContainer.classList.remove("loading");
    
    result.products.forEach(v => {
        const product = productTemplate(v);
        $container_products.innerHTML += product;
    });

    if (scroll) {
        scrollTo($("#products-title"));
    }

    return Promise.resolve();
};

export default listProducts;