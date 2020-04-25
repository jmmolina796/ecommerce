import { baseUrl } from './config';

export const getProducts = (type) => ( 
    fetch(`api/products/${type}`)
        .then(data => (
            data.json()
        ))
        .then(result => (
            ({result, error: false})
        ))
        .catch(error => (
            ({result: false, error})
        ))
);