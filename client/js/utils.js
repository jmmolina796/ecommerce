export const $ = el => document.querySelector(el);
export const $$ = (el, event, callback) => $(el).addEventListener(event, callback);
export const $_ = (el, event, callback) => $(el).addEventListener(event, callback());
