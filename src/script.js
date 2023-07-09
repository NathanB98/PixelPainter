const GRID_CONTAINER = document.querySelector('.grid-container');
const CLEAR_BUTTON = document.querySelector('.clear-btn');
const GRID_SIZE_SLIDER = document.querySelector('.size-slider');
const GRID_SIZE_DISPLAY = document.querySelector('.size-display');

let gridLength = 16;
let gridVolume = gridLength * gridLength;

CLEAR_BUTTON.onclick = () => clearGrid();

/* Changes the size of the canvas grid to a size given by the user via a slider element. Resizing clears the grid.
Minimum size: 1x1, Maximum size: 64x64. */
GRID_SIZE_SLIDER.oninput = function() {
    GRID_SIZE_DISPLAY.innerHTML = `${this.value} x ${this.value}`;
    gridLength = this.value;
    gridVolume = gridLength * gridLength;
    clearGrid();
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
        gridSquare.addEventListener('mouseover', () => {
            gridSquare.style.backgroundColor = 'black';
        });
        GRID_CONTAINER.appendChild(gridSquare);
    }
}

window.onload = () => {
    generateCanvasGrid(gridVolume);
}