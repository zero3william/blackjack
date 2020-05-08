import * as PIXI from "pixi.js";
import blackjack_bg from "../assets/blackjack_bg.png";

const dealSpeed = 350;
const canvas = {
  width: 300,
  height: 240,
  backgroundColor: 0x486441,
  resolution: window.devicePixelRatio || 1,
};

const card_b1 = { role: "banker", pos: { x: 90, y: 36 }, sprite: null };
const card_b2 = { role: "banker", pos: { x: 115, y: 36 }, sprite: null };
const card_b3 = { role: "banker", pos: { x: 140, y: 36 }, sprite: null };
const card_b4 = { role: "banker", pos: { x: 165, y: 36 }, sprite: null };
const card_b5 = { role: "banker", pos: { x: 190, y: 36 }, sprite: null };
const card_p1 = { role: "player", pos: { x: 75, y: 200 }, sprite: null };
const card_p2 = { role: "player", pos: { x: 100, y: 200 }, sprite: null };
const card_p3 = { role: "player", pos: { x: 125, y: 200 }, sprite: null };
const card_p4 = { role: "player", pos: { x: 150, y: 200 }, sprite: null };
const card_p5 = { role: "player", pos: { x: 175, y: 200 }, sprite: null };

const position = {
  cardPool: {
    x: 25,
    y: 110,
  },
  bankerText: {
    x: 220,
    y: 10,
  },
  playerText: {
    x: 220,
    y: 214,
  },
  hitText: {
    x: 220,
    y: 190,
  },
  standText: {
    x: 250,
    y: 190,
  },
  restartText: {
    x: 220,
    y: 190,
  },
  bankerBustText: {
    x: 90,
    y: 64,
  },
  playerBustText: {
    x: 72,
    y: 150,
  },
  gameResultText: {
    x: 120,
    y: 110,
  },
};

const roleTextStyle = new PIXI.TextStyle({
  fontSize: 13,
  fill: ["#ffffff", "#00ff99"], // gradient
  stroke: "#4a1850",
  strokeThickness: 1,
});

const btnStyle = new PIXI.TextStyle({
  fontSize: 14,
  backgroundColor: "#eb877b",
  fill: ["#ffffff", "#fffabc"],
  stroke: "#4a1850",
  strokeThickness: 1,
});

const bustStyle = new PIXI.TextStyle({
  fontStyle: "italic",
  fontSize: 18,
  fill: "#eb877b",
  stroke: "#ff0c0c",
  strokeThickness: 1,
});

const loseStyle = new PIXI.TextStyle({
  fontStyle: "italic",
  fontSize: 20,
  fill: "#ececec",
  stroke: "#3c3c3c",
  strokeThickness: 5,
});

const winStyle = new PIXI.TextStyle({
  fontStyle: "italic",
  fontSize: 21,
  fill: ["#f8ce5e", "#f0963e"],
  stroke: "#4a1850",
  strokeThickness: 1,
});

export {
  blackjack_bg,
  dealSpeed,
  canvas,
  card_b1,
  card_b2,
  card_b3,
  card_b4,
  card_b5,
  card_p1,
  card_p2,
  card_p3,
  card_p4,
  card_p5,
  position,
  roleTextStyle,
  btnStyle,
  bustStyle,
  loseStyle,
  winStyle,
};
