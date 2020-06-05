import {
    Game
} from './game.js';

export class Controller {
    constructor(table, size, simButton, resetButton) {
        this.board = table;
        this.size = size;
        this.simButton = simButton;
        this.autoplay = true;
        this.resetButton = resetButton;
        this.setupEvents();
    }

    setupEvents = () => {
        var self = this;
        this.resetButton.addEventListener('click', () => {
            self.render();
            clearTimeout(self.autoplayTimer);
        });
        this.simButton.addEventListener('click', () => {
            self.simulateNext();
        });
    }

    render = () => {
        var self = this;
        this.model = [];
        this.board.innerHTML = '';
        var fragment = document.createDocumentFragment();
        this.simulationStarted = false;

        for (var row = 0; row < this.size; row++) {
            var tableRow = document.createElement('tr');
            this.model[row] = [];
            for (var col = 0; col < this.size; col++) {
                var cell = document.createElement('td');
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                this.model[row][col] = checkbox;
                cell.appendChild(checkbox);
                tableRow.appendChild(cell);
            }
            fragment.appendChild(tableRow);
        }
        this.board.appendChild(fragment);
    }

    start = () => {
        var gameBoard = this.createGameBoard();
        this.game = new Game(gameBoard);
        this.simulationStarted = true;
    }

    simulateNext = () => {
        var self = this;
        if (!this.simulationStarted)
            this.start();

        this.game.next();
        this.renderModel();

        if (this.autoplay) {
            this.autoplayTimer = setTimeout(() => {
                self.simulateNext();
            }, 1000)
        }
    }

    createGameBoard = () => {
        return this.model.map((row) => {
            return row.map((checkbox) => {
                return +checkbox.checked;
            })
        })
    }

    renderModel = () => {
        for (var row = 0; row < this.size; row++) {
            for (var col = 0; col < this.size; col++) {
                this.model[row][col].checked = !!this.game.board[row][col];
            }
        }
    }
}