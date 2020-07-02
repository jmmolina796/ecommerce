import productTemplate from './templates/product';
import { getProducts } from './api/products';
import { $, $all, getUrlPath, scrollTo, extractUrlPart } from './utils';
import { countryCode } from './detectCountry';

let firstLoad = true;

let categoriesUrls = [];

let amountOfProductsLoaded = 0;
let isLoadedDisabled = false;

const currentProductType = () => {
    const defaultProducts = 'cubrebocas_fashion';
    const lastPath = getUrlPath(-1);

    return categoriesUrls.includes(lastPath) ? lastPath : defaultProducts ;
}

const listProducts = async (scroll = false, clearElements = true) => {

    if(firstLoad) {
        firstLoad = false;
        $all("nav a").forEach(el => categoriesUrls.push(extractUrlPart(el.href, -1)));
        amountOfProductsLoaded = $all("#list-products article").length;
        if(amountOfProductsLoaded > 0) { 
            return Promise.resolve();
        }
    }
    
    const $globalContainer = $("#list-products");
    const $container_products = $(".container-products");

    if(clearElements) {
        $container_products.innerHTML = "";
        amountOfProductsLoaded = 0;
        isLoadedDisabled = false;
    }

    if(isLoadedDisabled) {
        return Promise.resolve();
    }

    if (scroll) {
        scrollTo($("#products-title"));
    }
    
    $globalContainer.classList.add("loading");

    const type = `${currentProductType()}?elements=${amountOfProductsLoaded}&countryCode=${countryCode}`;
    
    const { result, error } = await getProducts(type);
    if (error) {
        console.log(error);
        return;
    }
    
    $("#products-title").textContent = result["titleCategory"];

    $globalContainer.classList.remove("loading");

    const numberProductsServer = result.products.length;

    if (numberProductsServer === 0) {
        isLoadedDisabled = true;
    }

    amountOfProductsLoaded += result.products.length;

    console.log(amountOfProductsLoaded);
    
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