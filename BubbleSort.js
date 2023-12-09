let currentStepBubbleSort = 0;

async function bubbleSortStep() {
  let n = values.length;

  for (let j = 0; j < n - currentStepBubbleSort - 1; j++) {
    if (values[j] > values[j + 1]) {
      let temp = values[j];
      values[j] = values[j + 1];
      values[j + 1] = temp;
    }
  }

  currentStepBubbleSort++;

  if (currentStepBubbleSort >= n - 1) {
    currentStepBubbleSort = 0; 
    isSorting = false; 
  }
  renderBars();
}

async function bubbleSort() {
  currentStepBubbleSort = 0; 
  isSorting = true;
  while (currentStepBubbleSort < values.length - 1 && isSorting) {
    await bubbleSortStep();
    await delay(speed);
  }
  isSorting = false;
}

