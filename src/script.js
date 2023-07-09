const GRID_CONTAINER = document.querySelector('.grid-container');
const CLEAR_BUTTON = document.querySelector('.clear-btn');

let gridLength = 16;
let gridVolume = gridLength * gridLength;

CLEAR_BUTTON.onclick = () => clearGrid();

function clearGrid() {
    let gridSquare = document.querySelectorAll('.grid-square');
    gridSquare.forEach(pixel => {
        pixel.remove();
    });
    generateCanvasGrid(gridVolume);
}

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