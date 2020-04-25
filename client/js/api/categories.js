import { baseUrl } from './config';

export const getCategories = () => ( 
    fetch('api/categories')
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