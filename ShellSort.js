async function shellSort() {
  let n = values.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      let temp = values[i];
      let j = i;

      while (j >= gap && values[j - gap] > temp) {
        values[j] = values[j - gap];
        j -= gap;
        renderBars();
        await delay(speed);
      }

      values[j] = temp;
    }

    gap = Math.floor(gap / 2);
    renderBars();
    await delay(speed);
  }
  currentStepShellSort = 0;
  isSorting = false; 
}
