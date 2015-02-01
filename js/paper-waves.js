/**
 * Materialze made by Blake Tarter
 * Do whatever you want with it.
 */

function materialize(e, button) {

    if (!e || !button) {
        console.error('Failed to materialize, you need to pass the click event and the element.');
        return;
    }

    var x = e.offsetX, y = e.offsetY,
        ink = document.createElement('div'),
        baseStyle = 'top: ' + y + 'px; left: ' + x + 'px; ',
        widthStyle = 'border-width: ' +  button.offsetWidth / 1 + 'px; ';

    function createInk() {
        ink.className = 'ink';
        ink.setAttribute('style', baseStyle);
        button.appendChild(ink);

        requestAnimationFrame(animateToWidth);
    }

    function animateToWidth() {
        ink.setAttribute('style', baseStyle + widthStyle);
    }

    function startToFade() {
        ink.setAttribute('style', baseStyle + widthStyle + 'opacity: 0;');
    }

    function removeInk() {
        button.removeChild(ink);
    }

    requestAnimationFrame(createInk);

    setTimeout(function() {
        requestAnimationFrame(startToFade);
    }, 250);

    setTimeout(function() {
        requestAnimationFrame(removeInk);
    }, 650);
}

window.onload = function() {
    var materialButtons = document.getElementsByClassName('btn'),
        i, l;

    for (i = 0, l = materialButtons.length; i < l; i++) {
        materialButtons[i].addEventListener('click', function(e) {
            materialize(e, e.target);
        });
    }
};

