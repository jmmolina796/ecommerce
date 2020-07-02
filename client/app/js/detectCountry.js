import { $ } from './utils';

export let countryCode = 'mx';

export const setCountryCode = () => {
    const $header = $("header");
    let newCountry = $header.getAttribute('data-country');

    if(newCountry) {
        countryCode = newCountry;
    }

    $header.removeAttribute('data-country');
};

