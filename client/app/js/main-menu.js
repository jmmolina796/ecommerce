import { $, $_ } from './utils';

$_("#main_menu", "click", () => {
    let hidden = true;
    const clickFunction = () => {
        hidden = true;
        $("nav").style.transform = "scaleY(0)";
        document.removeEventListener("click", clickFunction);
    }
    return e => {
        $("nav").style.transform = hidden ? "scaleY(1)" : "scaleY(0)";
        hidden = !hidden;
        e.stopPropagation();
        
        document.addEventListener("click", clickFunction);

    };
});