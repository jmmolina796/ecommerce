import listProducts from './list-products';

export const $ = el => document.querySelector(el);
export const $all = el => document.querySelectorAll(el);
export const $$ = (el, event, callback) => $(el).addEventListener(event, callback);
export const $_ = (el, event, callback) => $(el).addEventListener(event, callback());

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();

export const getCompleteUrl = () => window.location.href;

export const toNumber = (str) => {
    if (!str || typeof str !== 'string') {
        return NaN;
    }

    const strWithoutCommas = str.replace(/,/g, '');

    return Number(strWithoutCommas);
};

export const getDiscountPercentage = (originalPriceStr, discountPriceStr) => {
    const originalPrice = toNumber(originalPriceStr);
    const discountPrice = toNumber(discountPriceStr);
    let percentage = 100 - (discountPrice * 100 / originalPrice);
    if (isNaN(percentage)) {
        percentage = 0;
    }
    return percentage.toFixed(0);
};

export const scrollTo = (element) => {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop - ($("header").offsetHeight + 30)
    });
};

export const getUrlPath = position => {
    const path = window.location.pathname.substring(1);
    const pathArray = path.split("/");
    if (position === -1) {
        return pathArray[pathArray.length - 1];
    } else {
        return pathArray[position];
    }
};

export const extractUrlPart = (url, position) => {
    const urlArray = url.split("/");
    if (position === -1) {
        return urlArray[urlArray.length - 1];
    } else {
        return urlArray[position];
    }
};

export function goToUrl(event) {
    event.preventDefault();

    const currentUrl = getCompleteUrl();
    const url = this.href

    if(currentUrl === url) {
        return;
    }

    window.history.pushState(null, null, url);
    
    const lastPath = getUrlPath(-1);
    listProducts(lastPath);
}