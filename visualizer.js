document.getElementById('enter-btn').addEventListener('click', function() {
    document.getElementById('intro-overlay').classList.add('hide');
});



let array = [];
let arrayBars;

function generateArray() {
    for (let i = 0; i < 20; i++) {
        array[i] = Math.floor(Math.random() * 100) + 1;
    }
}

function displayArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    
    for (let i = 0; i < array.length; i++) {
        let bar = document.createElement('div');
        bar.className = 'array-bar';
        bar.style.height = `${array[i]}%`;
        container.appendChild(bar);
    }

    arrayBars = document.getElementsByClassName('array-bar');
}

function bubbleSort() {
    let i = 0, j = 0;
    let intervalId = setInterval(function() {
        if (i < array.length) {
            if (j < array.length - i - 1) {
                if (array[j] > array[j+1]) {
                    let temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;

                    arrayBars[j].style.height = `${array[j]}%`;
                    arrayBars[j+1].style.height = `${array[j+1]}%`;
                }
                j++;
            } else {
                j = 0;
                i++;
            }
        } else {
            clearInterval(intervalId);
        }
    }, 100);
}

document.getElementById('generate-array').addEventListener('click', function() {
    generateArray();
    displayArray();
});

document.getElementById('bubble-sort').addEventListener('click', function() {
    bubbleSort();
});

generateArray();
displayArray();

// Swap helper function
async function swap(i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;

    arrayBars[i].style.height = `${array[i]}%`;
    arrayBars[j].style.height = `${array[j]}%`;

    await sleep(10);
}


// Quick Sort
async function quickSort(start, end) {
    if (start >= end) {
        return;
    }
    
    let index = await partition(start, end);

    await Promise.all([
        quickSort(start, index),
        quickSort(index + 1, end)
    ]);
}

async function partition(start, end) {
    let pivotValue = array[end];
    let pivotIndex = start;
    
    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            await swap(i, pivotIndex);
            pivotIndex++;
        }
    }
    
    await swap(pivotIndex, end);

    return pivotIndex;
}

// Merge Sort
async function mergeSort(start, end) {
    if (end <= start + 1) {
        return;
    }

    let mid = Math.floor((start + end) / 2);

    await Promise.all([
        mergeSort(start, mid),
        mergeSort(mid, end)
    ]);

    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    let sortedArray = [];
    let i = start, j = mid;

    while (i < mid && j < end) {
        if (array[i] < array[j]) {
            sortedArray.push(array[i]);
            i++;
        } else {
            sortedArray.push(array[j]);
            j++;
        }
    }

    while (i < mid) {
        sortedArray.push(array[i]);
        i++;
    }

    while (j < end) {
        sortedArray.push(array[j]);
        j++;
    }

    for (let i = start; i < end; i++) {
        array[i] = sortedArray[i - start];
        arrayBars[i].style.height = `${array[i]}%`;
        await sleep(10);
    }
}

document.getElementById('quick-sort').addEventListener('click', async function() {
    await quickSort(0, array.length - 1);
    displayArray();
});

document.getElementById('merge-sort').addEventListener('click', async function() {
    await mergeSort(0, array.length);
    displayArray();
});


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('DOMContentLoaded', (event) => {
    const tileOverlay = document.getElementById('tile-overlay');
    for (let i = 0; i < 20; i++) {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tileOverlay.appendChild(tile);
    }
});

document.getElementById('enter-btn').addEventListener('click', function() {
    document.getElementById('intro-overlay').classList.add('hide');
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach((tile, i) => {
        setTimeout(() => {
            tile.style.transform = 'translateY(0)';
        }, i * 50);
    });
    setTimeout(() => {
        tiles.forEach((tile, i) => {
            setTimeout(() => {
                tile.style.transform = 'translateY(-100%)';
            }, i * 50);
        });
    }, 1000); // start the second animation 1s after the first one
});
