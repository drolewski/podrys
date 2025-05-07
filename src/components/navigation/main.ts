// @ts-ignore
import "./navigation.scss"

const links = document.querySelectorAll('a');

links.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
        console.log(link)
    }
});