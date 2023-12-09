async function quickSortStep(low, high) {
  if (low < high) {
    let pivotIndex = await partition(low, high);
    await quickSortStep(low, pivotIndex - 1);
    await quickSortStep(pivotIndex + 1, high);
    renderBars();
    await delay(speed);
  }
}

async function quickSort() {
  await quickSortStep(0, values.length - 1);
  currentStepQuickSort = 0;
  isSorting = false; 
}

async function partition(low, high) {
  let pivot = values[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (values[j] < pivot) {
      i++;
      let temp = values[i];
      values[i] = values[j];
      values[j] = temp;
      renderBars();
      await delay(speed);
    }
  }
  let temp = values[i + 1];
  values[i + 1] = values[high];
  values[high] = temp;
  return i + 1;
}
