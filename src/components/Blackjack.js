import * as React from "react";
import * as PIXI from "pixi.js";
window.PIXI = PIXI;
require("pixi-layers");
import Cards from "../resources/card";

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

import {
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
} from "../gameConfig/blackjack";

class Blackjack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banker: [],
      player: [],
    };
  }

  componentDidMount() {
    PIXI.utils.clearTextureCache();
    this.initPixi();
  }

  initPixi() {
    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);
    this.app = new PIXI.Application(canvas);
    this.gameCanvas.appendChild(this.app.view);
    this.timeline1 = gsap.timeline();

    this.loading();
  }

  loading() {
    const loader = new PIXI.Loader();
    loader.add("bg", blackjack_bg);
    Cards.forEach((url, index) => {
      loader.add("poker" + index, Cards[index]);
    });
    loader.load((loader, resCache) => {
      this.resCache = resCache;
      this.initGame();
    });
  }

  async initGame() {
    // background
    const bg = this.getSpriteWithTexture("bg");
    bg.width = canvas.width;
    bg.height = canvas.height;
    this.app.stage.addChild(bg);

    // 牌靴
    const cardDeck = this.getSpriteWithTexture("poker0");
    this.scalePng(cardDeck);
    cardDeck.x = position.cardPool.x;
    cardDeck.y = position.cardPool.y;
    this.app.stage.addChild(cardDeck);

    this.addText("Banker", position.bankerText, roleTextStyle);
    this.addText("Player", position.playerText, roleTextStyle);
    let bankerValue = this.addText(
      "?",
      { x: position.bankerText.x + 48, y: position.bankerText.y },
      roleTextStyle
    );
    let playerValue = this.addText(
      "?",
      { x: position.playerText.x + 44, y: position.playerText.y },
      roleTextStyle
    );

    this.bankerValue = bankerValue;
    this.playerValue = playerValue;

    this.dealCard(0, card_b1);
    await this.sleep(dealSpeed);

    this.dealCard(this.getRandomCard(), card_p1);
    await this.sleep(dealSpeed);

    this.dealCard(0, card_b2);
    await this.sleep(dealSpeed);

    this.dealCard(this.getRandomCard(), card_p2);
    await this.sleep(dealSpeed);

    this.startGame();
  }

  startGame() {
    let hitText = this.addText("Hit", position.hitText, btnStyle);
    hitText.buttonMode = true;
    hitText.interactive = true;
    hitText.click = (e) => {
      switch (this.state.player.length) {
        case 2:
          this.dealCard(this.getRandomCard(), card_p3);
          break;
        case 3:
          this.dealCard(this.getRandomCard(), card_p4);
          break;
        case 4:
          this.dealCard(this.getRandomCard(), card_p5);
          break;
      }
      if (this.isBust("player")) {
        hitText.destroy(true);
        standText.destroy(true);
        this.playerBust();
        this.bankerWin();
        this.gameover();
      } else if (this.state.player.length === 5) {
        hitText.destroy(true);
        standText.destroy(true);
        this.bankerTurn();
      }
    };

    let standText = this.addText("Stand", position.standText, btnStyle);
    standText.buttonMode = true;
    standText.interactive = true;
    standText.click = (e) => {
      hitText.destroy(true);
      standText.destroy(true);
      this.bankerTurn();
    };
  }

  async bankerTurn() {
    card_b1.sprite.texture = new PIXI.Texture.from(Cards[this.state.banker[0]]);
    card_b2.sprite.texture = new PIXI.Texture.from(Cards[this.state.banker[1]]);
    this.bankerValue.text = this.totalValue(this.state.banker);

    while (
      parseInt(this.bankerValue.text) < parseInt(this.playerValue.text) &&
      this.state.banker.length < 5
    ) {
      switch (this.state.banker.length) {
        case 2:
          this.dealCard(this.getRandomCard(), card_b3);
          break;
        case 3:
          this.dealCard(this.getRandomCard(), card_b4);
          break;
        case 4:
          this.dealCard(this.getRandomCard(), card_b5);
          break;
      }
      await this.sleep(400);
    }
    if (this.isBust("banker")) {
      this.bankerBust();
      this.playerWin();
    } else if (
      parseInt(this.bankerValue.text) < parseInt(this.playerValue.text)
    ) {
      this.playerWin();
    } else {
      this.bankerWin();
    }
    this.gameover();
  }

  bankerBust() {
    this.addText("Bust", position.bankerBustText, bustStyle);
  }
  playerBust() {
    this.addText("Bust", position.playerBustText, bustStyle);
  }

  bankerWin() {
    this.addText("Lose", position.gameResultText, loseStyle);
  }
  playerWin() {
    this.addText("Win", position.gameResultText, winStyle);
  }

  gameover() {
    let restartText = this.addText("Restart", position.restartText, btnStyle);
    restartText.buttonMode = true;
    restartText.interactive = true;
    restartText.click = (e) => {
      this.restartGame();
    };
  }

  restartGame() {
    for (var i = this.app.stage.children.length - 1; i >= 1; i--) {
      this.app.stage.removeChild(this.app.stage.children[i]);
    }
    this.setState({ player: [], banker: [] });
    this.initGame();
  }

  isBust(role) {
    if (this.totalValue(this.state[role]) > 21) {
      return true;
    } else {
      return false;
    }
  }

  scalePng(sprite) {
    sprite.anchor.set(0.5);
    sprite.scale.x = 0.05;
    sprite.scale.y = 0.05;
  }

  dealCard(cardIndex, to) {
    const card = this.getSpriteWithTexture("poker" + cardIndex);
    this.scalePng(card);
    to.sprite = this.app.stage.addChild(card);
    this.timeline1.fromTo(card, position.cardPool, {
      duration: dealSpeed / 1000,
      ease: "expo.out",
      ...to.pos,
    });
    this.state[to.role].push(
      cardIndex === 0 ? this.getRandomCard() : cardIndex
    );
    if (this.state.player.length > 0) {
      this.playerValue.text = this.totalValue(this.state.player);
    }
    if (this.state.banker.length > 2) {
      this.bankerValue.text = this.totalValue(this.state.banker);
    }
  }

  getRandomCard() {
    return Math.ceil(Math.random() * 52);
  }

  cardValue(index) {
    const num = index % 13;
    switch (num) {
      case 1:
        return 1;
      case 11:
      case 12:
      case 0:
        return 10;
      default:
        return num;
    }
  }

  totalValue(arr) {
    let sum = arr.map((card) => this.cardValue(card)).reduce((a, b) => a + b);
    if (sum <= 11 && arr.some((card) => card % 13 === 1)) {
      sum = sum + 10;
    }
    return sum;
  }

  addText(text, pos, style) {
    let temp = new PIXI.Text(text, style);
    temp.x = pos.x;
    temp.y = pos.y;
    this.app.stage.addChild(temp);
    return temp;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getSpriteWithTexture(id) {
    return new PIXI.Sprite(this.resCache[id].texture);
  }

  componentWillUnmount() {}

  render() {
    let component = this;
    return (
      <div
        style={{ margin: "20px auto" }}
        ref={(thisDiv) => {
          component.gameCanvas = thisDiv;
        }}
      />
    );
  }
}

export default Blackjack;
