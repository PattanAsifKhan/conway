import { Controller } from './controller';
import css from '../style/main.css';

var table = document.getElementById('board');
var simButton = document.getElementById('simulate');
var resetButton = document.getElementById('reset');
var size = 15;

var gameController = new Controller(table, size, simButton, resetButton);
gameController.render();

window["gameController"] = gameController;
    