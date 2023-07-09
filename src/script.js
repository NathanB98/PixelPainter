const gridContainer = document.querySelector('.grid-container');

let gridLength = 16;
let gridVolume = gridLength * gridLength;

function generateCanvasGrid(volume) {
    gridContainer.style.gridTemplateColumns = `repeat(${gridLength}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridLength}, 1fr)`;

    for(let i = 0; i < volume; i++) {
        let gridSquare = document.createElement('div');

        gridSquare.classList.add('grid-square');
        gridContainer.appendChild(gridSquare);
    }
}

window.onload = () => {
    generateCanvasGrid(gridVolume);
}