"use strict";
import Bird from './bird.js';
import Pipe from './pipe.js';
import ScoreManager from './scoreManager.js';

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const bird = new Bird();
const pipes = [];
let frame = 0;
const scoreManager = new ScoreManager();
let isGameOver = false;
