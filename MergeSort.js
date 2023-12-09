async function mergeSortStep(left, right) {
  if (left < right) {
    let mid = Math.floor((left + right) / 2);

    await mergeSortStep(left, mid);
    await mergeSortStep(mid + 1, right);

    merge(left, mid, right);

    renderBars();
    await delay(speed);
  }
}

async function mergeSort() {
  await mergeSortStep(0, values.length - 1);
  currentStepMergeSort = 0;
  isSorting = false; 
}

function merge(left, mid, right) {
  let n1 = mid - left + 1;
  let n2 = right - mid;

  let L = new Array(n1);
  let R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = values[left + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = values[mid + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      values[k] = L[i];
      i++;
    } else {
      values[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    values[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    values[k] = R[j];
    j++;
    k++;
  }
}
