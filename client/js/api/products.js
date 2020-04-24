import { baseUrl } from './config';

export const getProducts = () => ( 
    fetch('api/products/face_masks')
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