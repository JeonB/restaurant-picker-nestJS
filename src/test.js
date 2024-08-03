const solution = (n, r, c) => {
  let arr = Array.from({ length: n }, () => Array(n).fill(0));
  let count = 1;
  let x = 0;
  let y = -1;
  let dir = "up";

  while (y < r - 1 || x < c - 1) {
    if (x === n - 1) {
      arr[++y][x] = count++;
      dir = "down";
    }
    if (y === n - 1) {
      arr[y][++x] = count++;
      dir = "up";
    }
    if (y === 0) {
      arr[y][++x] = count++;
      dir = "down";
    }
    if (x === 0) {
      arr[++y][x] = count++;
      dir = "up";
    }

    if (dir === "down" && y !== n - 1 && x !== 0) {
      arr[++y][--x] = count++;
    }
    if (dir === "up" && x !== n - 1 && y !== 0) {
      arr[--y][++x] = count++;
    }
  }

  return arr[r - 1][c - 1];
};
