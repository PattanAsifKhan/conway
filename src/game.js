export class Game {
    constructor(initialConfig) {
        this.initialConfig = initialConfig;
        this.height = initialConfig.length;
        this.width = initialConfig[0].length;

        this.prevBoard = [];
        this.board = this.cloneBoard(this.initialConfig);
    }
    
    next = () => {
        this.prevBoard = this.cloneBoard(this.board);
        for (var row = 0; row < this.height; row++) {
            for (var col = 0; col < this.width; col++) {
                var aliveNeighbours = this.getAliveNeighbours(this.prevBoard, row, col);
                var isCurrentCellAlive = this.prevBoard[row][col];
                if (isCurrentCellAlive) {
                    if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                        this.board[row][col] = 0;
                    }
                } else {
                    if (aliveNeighbours === 3) {
                        this.board[row][col] = 1;
                    }
                }
            }
        }
    }
  
    getAliveNeighbours(board, row, col) {
        var prevRow = board[row - 1] || [];
        var nextRow = board[row + 1] || [];
        return [
            prevRow[col-1],   prevRow[col], prevRow[col+1],
            board[row][col-1],              board[row][col+1],
            nextRow[col-1],   nextRow[col], nextRow[col+1]
        ].reduce((accumulatedValue, cell) => {
            return accumulatedValue + +!!cell;
        }, 0);
    }

    cloneBoard = (board) => {
        // slice creates a new array by slicing some elements
        return board.map((row) => row.slice());
    }

    toString = () => {
        return this.board.map((row) => row.join(' ')).join('\n');
    }   
}


var newGame = new Game([
    [0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
]);

console.log(newGame + '');
newGame.next();
console.log(newGame + '');

newGame.next();
console.log(newGame + '');
