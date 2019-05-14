const boardWidth = 8;
const totalCells = boardWidth ** 2;
const charOffset = 64;
const board = document.getElementById('board');
const cells = [];
let highlighted = [];
let active = false;

const getColumn = pos => Number(pos.toUpperCase().charCodeAt(0)) - charOffset;

const getRow = pos => Number(pos[1]);

const getPairs = (col, row) => [
  [col - 2, row + 1],
  [col - 1, row + 2],
  [col - 1, row - 2],
  [col - 2, row - 1],
  [col + 1, row + 2],
  [col + 2, row + 1],
  [col + 2, row - 1],
  [col + 1, row - 2],
];

const columnToChar = pos => String.fromCharCode(charOffset + pos);

const isCellExist = (x, y) => x > 0 && x <= boardWidth && y > 0 && y <= boardWidth;

const getAllowMoves = (pos) => {
  const column = getColumn(pos);
  const row = getRow(pos);
  const pairs = getPairs(column, row);
  return pairs.map((i) => {
    if (isCellExist(i[0], i[1])) {
      return columnToChar(i[0]) + i[1];
    }
  });
};

const getCellNameByNumber = (number) => {
  const column = String.fromCharCode(charOffset + boardWidth - ((number - 1) % 8));
  const row = Math.ceil(number / boardWidth);
  return `${column}${row}`;
};

const drawField = () => {
  for (let i = totalCells; i > 0; i -= 1) {
    const el = document.createElement('div');
    const rowParity = Math.ceil(i / 8) % 2;
    const addClass = rowParity !== i % 2 ? 'black' : 'white';
    el.classList.add('cell');
    el.classList.add(addClass);
    el.dataset.num = i;
    el.dataset.cell = getCellNameByNumber(i);
    board.appendChild(el);
    cells.push(el);
  }
};

const highlightAllowMoves = (cell) => {
  const moves = getAllowMoves(cell);

  if (active) {
    highlighted.map(e => e.classList.remove('green'));
    highlighted = [];
  }

  cells.map((e) => {
    if (moves.indexOf(e.dataset.cell) !== -1) {
      e.classList.add('green');
      highlighted.push(e);
    }
    return 1;
  });
};

(
  drawField()
);

window.addEventListener('click', (e) => {
  const el = e.target;
  const classes = [...el.classList];
  if (classes.indexOf('cell') !== -1) {
    if(active) {
      active.classList.remove('blue');
    }
    active = el;
    highlightAllowMoves(el.dataset.cell);
    el.classList.add('blue');
  }
});
