import listProducts from './list-products';

window.addEventListener('popstate', function(e){
    listProducts();
});