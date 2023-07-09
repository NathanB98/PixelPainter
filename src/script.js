const GRID_CONTAINER = document.querySelector('.grid-container');
const CLEAR_BUTTON = document.querySelector('.clear-btn');
const GRID_SIZE_SLIDER = document.querySelector('.size-slider');
const GRID_SIZE_DISPLAY = document.querySelector('.size-display');
const BRUSH_BUTTON = document.querySelector('.brush-btn');
const RAINBOW_BUTTON = document.querySelector('.rainbow-btn');
const ERASER_BUTTON = document.querySelector('.eraser-btn');
const COLOUR_WHEEL = document.querySelector('.colour-wheel');

let gridLength = 16;
let gridVolume = gridLength * gridLength;
let currentMode = 'brush';

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);



/* Changes the size of the canvas grid to a size given by the user via a slider element. Resizing clears the grid.
Minimum size: 1x1, Maximum size: 64x64. */
GRID_SIZE_SLIDER.oninput = function() {
    GRID_SIZE_DISPLAY.innerHTML = `${this.value} x ${this.value}`;
    gridLength = this.value;
    gridVolume = gridLength * gridLength;
    clearGrid();
}
//COLOUR_WHEEL.oninput = () => changeBrushColour();
CLEAR_BUTTON.onclick = () => clearGrid();
BRUSH_BUTTON.onclick = () => setPaintMode('brush');
RAINBOW_BUTTON.onclick = () => setPaintMode('rainbow');
ERASER_BUTTON.onclick = () => setPaintMode('eraser');

/* Paints the appropriate brush type to the canvas depending on the users choice of mode. Either brush, rainbow, or an eraser. */
function changeBrushMode(e) {
    if(e.type === 'mouseover' && !mouseDown) return;
    if(currentMode === 'rainbow') {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if(currentMode === 'brush') {
        e.target.style.backgroundColor = 'black';
    } else if(currentMode === 'eraser') {
        e.target.style.backgroundColor = '#FFFFFF';
    }
}

function setPaintMode(mode) {
    switch(mode) {
        case 'brush':
            currentMode = 'brush';
            break;
        case 'rainbow':
            currentMode = 'rainbow';
            break;
        case 'eraser':
            currentMode = 'eraser';
            break;
    }
}

/* Removes all of the elements that make up the grid from the DOM, wiping the canvas of any drawings, then loads a new grid using 
the generateCanvasGrid function. */
function clearGrid() {
    let gridSquare = document.querySelectorAll('.grid-square');
    gridSquare.forEach(pixel => {
        pixel.remove();
    });
    generateCanvasGrid(gridVolume);
}

/* Generates a square grid of a given length through DOM manipulation. Gives each element (or pixel) in the grid an eventListener. 
Takes the gridLength which will define the size of the grid generated.*/
function generateCanvasGrid(volume) {
    GRID_CONTAINER.style.gridTemplateColumns = `repeat(${gridLength}, 1fr)`;
    GRID_CONTAINER.style.gridTemplateRows = `repeat(${gridLength}, 1fr)`;

    for(let i = 0; i < volume; i++) {
        let gridSquare = document.createElement('div');

        gridSquare.classList.add('grid-square');
        gridSquare.addEventListener('mousedown', changeBrushMode);
        gridSquare.addEventListener('mouseover', changeBrushMode);
        GRID_CONTAINER.appendChild(gridSquare);
    }
}

window.onload = () => {
    generateCanvasGrid(gridVolume);
}