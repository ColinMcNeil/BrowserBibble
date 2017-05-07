//Injected JS to every page. 
const { ipcRenderer } = require('electron')
const TurtlePackage = require('../package.json');
window.TurtleVersion = TurtlePackage.version

//Send Do-Not-Track request to every page
navigator.doNotTrack = 1;
window.doNotTrack = 1;
navigator.msDoNotTrack = 1;

//Interrupts hyperlink clicks, then sends the URL back to the render process.
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', function (e) {
        var path = e.target.href;
        if (!path || !path.includes('http')) { //Sometimes links are not redirects (web apps)
            return;
        }
        console.log(path)
        e.preventDefault();
        e.stopPropagation();
        setTimeout(function () {
            console.log(path)
            ipcRenderer.sendToHost('navAttempt', path);
        }, 100);
        return false;
    }, true);
});
// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

var last_known_scroll_position = 0;
var ticking = false;

function scrollUpdate(scroll_pos) {
    ipcRenderer.sendToHost('scrollY', scroll_pos);
}

window.addEventListener('scroll', function (e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function () {
            scrollUpdate(last_known_scroll_position);
            ticking = false;
        });
    }
    ticking = true;
});

ipcRenderer.on('scrollTo', function (event,args) {
    console.log(event)
    console.log(args)
})