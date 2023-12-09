let currentStepSelectionSort = 0;

async function selectionSortStep() {
  let n = values.length;

  if (currentStepSelectionSort < n - 1) {
    let minIndex = currentStepSelectionSort;

    for (let j = currentStepSelectionSort + 1; j < n; j++) {
      if (values[j] < values[minIndex]) {
        minIndex = j;
      }
    }

    let temp = values[minIndex];
    values[minIndex] = values[currentStepSelectionSort];
    values[currentStepSelectionSort] = temp;

    renderBars();
    await delay(speed);
    currentStepSelectionSort++;
  } else {
    currentStepSelectionSort = 0;
    isSorting = false; 
  }
}

async function selectionSort() {
  isSorting = true;
  currentStepSelectionSort = 0;

  while (currentStepSelectionSort < values.length - 1 && isSorting) {
    await selectionSortStep();
  }
}
