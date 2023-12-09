// Function to perform one step of Insertion Sort
async function insertionSortStep() {
  let i = currentStep;
  let key = values[i];
  let j = i - 1;

  while (j >= 0 && values[j] > key) {
    values[j + 1] = values[j];
    j = j - 1;
  }

  values[j + 1] = key;
  renderBars();

  i++;

  if (i < values.length) {
    currentStep = i;
    setTimeout(insertionSortStep, speed); // Schedule the next step after a delay
  } else {
    currentStep = 0; // Reset the step when the sorting is complete
    isSorting = false; // Mark the sorting as complete
  }
}

// Function to perform the entire Insertion Sort
async function insertionSort() {
  isSorting = true;
  currentStep = 0; // Reset the step counter
  await insertionSortStep(); // Start the insertion sort process
}
