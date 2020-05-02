import { $$, $ } from './utils';
import { scrollTo } from './utils';

$$("#buy-now", "click", () => {
    scrollTo($("#products-title"));
});