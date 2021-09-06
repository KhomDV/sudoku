
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

module.exports = function solveSudoku(matrix) {
  // your solution

  function nullCell() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (matrix[r][c] === 0) return [r, c];
      }
    }
    return null;
  }

  function checkCell(cell, digit) {
    const [rowIndex, colIndex] = cell;

    for (let i = 0; i < 9; i++) {
      if (matrix[i][colIndex] === digit && i !== rowIndex) return false;
    }
    
    for (let i = 0; i < 9; i++) {
      if (matrix[rowIndex][i] === digit && i !== colIndex) return false;
    }

    const r = Math.floor(rowIndex / 3) * 3;
    const c = Math.floor(colIndex / 3) * 3;
    for (let i = r; i < r + 3; i++) {
      for (let j = c; j < c + 3; j++) {
        if (matrix[i][j] === digit && i !== rowIndex && j !== colIndex) return false;
      }
    }
    return true;    
  }

  let solve = () => {
    let cell = nullCell();
    if (cell === null) {
      return true;
    }
    for (let i = 1; i <= 9; i++) {
      if (checkCell(cell, i)) {
        matrix[cell[0]][cell[1]] = i;
        if (solve()) return true;
        matrix[cell[0]][cell[1]] = 0;
      }   
    }
    return false;
  }  
  solve();
  return matrix;
}
