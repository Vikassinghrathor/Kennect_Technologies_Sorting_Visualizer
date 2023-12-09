let bars = [];
let values = [];
let isSorting = false; 
let speed = 100; 
let currentStep = 0; 

function renderBars() {
  const container = document.getElementById('container');
  container.innerHTML = '';
  for (let i = 0; i < bars.length; i++) {
    const barContainer = document.createElement('div');
    barContainer.className = 'bar-container';

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = values[i] + 'px';

    const valueLabel = document.createElement('div');
    valueLabel.className = 'value-label';
    valueLabel.textContent = values[i];

    barContainer.appendChild(bar);
    barContainer.appendChild(valueLabel);
    container.appendChild(barContainer);
  }
}

function setBarsData(data) {
  bars = [];
  values = data.slice(); 
  for (let i = 0; i < data.length; i++) {
    bars.push(i);
  }
  renderBars();
}

function randomizeArray() {
  if (!isSorting) {
    setBarsData(
      Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 1)
    );
  }
}

function changeSize() {
  if (!isSorting) {
    values = values.map(val => Math.round(val * 0.8)); 
    renderBars();
  }
}

async function startSorting(sortFunction) {
  if (!isSorting) {
    isSorting = true;
    currentStep = 0;
    while (currentStep < bars.length - 1) {
      await sortFunction();
      currentStep++;
      await delay(speed);
    }
    isSorting = false;
  }
}

function pauseSorting() {
  isSorting = false;
}

async function resumeSorting(sortFunction) {
  if (isSorting) {
    while (currentStep < bars.length - 1) {
      await sortFunction();
      currentStep++;
      await delay(speed);
    }
    isSorting = false;
  }
}

async function stepForward(sortFunction) {
  if (isSorting && currentStep < bars.length - 1) {
    await sortFunction();
    currentStep++;
  }
}

async function skipForward(sortFunction) {
  if (isSorting) {
    const remainingSteps = bars.length - currentStep - 1;
    for (let i = 0; i < remainingSteps; i++) {
      await sortFunction();
      currentStep++;
      await delay(speed);
    }
  }
}

async function stepBack() {
  if (isSorting && currentStep > 0) {
    currentStep--;
    await renderBars();
  }
}

async function skipBack() {
  if (isSorting) {
    for (let i = currentStep; i > 0; i--) {
      currentStep--;
      await renderBars();
      await delay(speed);
    }
  }
}

function changeCanvasSize() {
  const newWidth = parseInt(document.querySelector('input[type="number"]').value);
  const newHeight = parseInt(document.querySelectorAll('input[type="number"]')[1].value);
  const container = document.getElementById('container');

  if (!isNaN(newWidth) && !isNaN(newHeight)) {
    container.style.width = newWidth + 'px';
    container.style.height = newHeight + 'px';
  }
}

function moveControls() {
  const btnContainer = document.querySelector('.btn');
  const newPosition = getRandomPosition();

  btnContainer.style.position = 'absolute';
  btnContainer.style.left = newPosition.x + 'px';
  btnContainer.style.top = newPosition.y + 'px';
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('button:nth-child(1)').addEventListener('click', skipBack);
  document.querySelector('button:nth-child(2)').addEventListener('click', stepBack);
  document.querySelector('button:nth-child(3)').addEventListener('click', pauseSorting);
  document.querySelector('button:nth-child(4)').addEventListener('click', stepForward);
  document.querySelector('button:nth-child(5)').addEventListener('click', skipForward);
  document.querySelector('button:nth-child(6)').addEventListener('click', randomizeArray); 
  document.querySelector('button:nth-child(7)').addEventListener('click', () => startSorting(selectionSort));
  document.querySelector('button:nth-child(8)').addEventListener('click', () => startSorting(bubbleSort));
  document.querySelector('button:nth-child(9)').addEventListener('click', () => startSorting(quickSort));
  document.querySelector('button:nth-child(10)').addEventListener('click', () => startSorting(mergeSort));
  document.querySelector('button:nth-child(11)').addEventListener('click', () => startSorting(shellSort));
  document.querySelector('button:nth-child(12)').addEventListener('click', changeCanvasSize);
  document.querySelector('button:nth-child(13)').addEventListener('click', moveControls);
});
