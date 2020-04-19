import { $, $_ } from './utils';

$_("#main_menu", "click", () => {
    let hidden = true;
    return () => {
        $("nav").style.display = hidden ? "block" : "none";
        hidden = !hidden;
    };
});