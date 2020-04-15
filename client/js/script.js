(function() {

    const $ = el => document.querySelector(el);
    const $$ = (el, event, callback) => $(el).addEventListener(event, callback);
    const $_ = (el, event, callback) => $(el).addEventListener(event, callback());
    
    $_("#main_menu", "click", () => {
        let hidden = true;
        return () => {
            $("nav").style.display = hidden ? "block" : "none";
            hidden = !hidden;
        };
    });

})()