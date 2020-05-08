import * as React from "react";
import * as PIXI from "pixi.js";
window.PIXI = PIXI;
require("pixi-layers");
import Cards from "../resources/card";
import CardBack from "../assets/card/blue_back.png";

import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";

export class PixiComponent extends React.Component {
  constructor() {
    super();
  }

  subscribe(obj, shape) {
    obj.interactive = true;
    obj.click = (e) => {
      e.target.zIndex++;
      this.props.action(shape);
      this.orderArr = this.orderArr.filter((item) => item !== shape);
      this.orderArr.push(shape);
      this.reOrder();
    };
  }

  reOrder() {
    this.orderArr.forEach((item, index) => {
      this[item].zIndex = index;
    });
  }

  componentDidMount() {
    // register the plugin
    gsap.registerPlugin(PixiPlugin);
    // give the plugin a reference to the PIXI object
    PixiPlugin.registerPIXI(PIXI);

    this.app = new PIXI.Application({
      width: 305,
      height: 190,
      backgroundColor: 0x000000,
      resolution: window.devicePixelRatio || 1,
    });
    this.gameCanvas.appendChild(this.app.view);
    this.orderArr = ["rect", "ellipse", "star"];

    this.rect = new PIXI.Graphics();
    this.ellipse = new PIXI.Graphics();
    this.star = new PIXI.Graphics();
    const rect = this.rect;
    const ellipse = this.ellipse;
    const star = this.star;

    // Rectangle + line style 2
    rect.lineStyle(10, 0xffbd01, 1);
    rect.beginFill(0xc34288);
    rect.drawRect(30, 80, 130, 80);
    rect.endFill();

    // Ellipse + line style 2
    ellipse.lineStyle(2, 0xffffff, 1);
    ellipse.beginFill(0xaa4f08, 1);
    ellipse.drawEllipse(140, 80, 80, 50);
    ellipse.endFill();

    // draw star
    star.lineStyle(2, 0xffffff);
    star.beginFill(0x35cc5a, 1);
    star.drawStar(80, 80, 5, 65);
    star.endFill();

    this.app.stage.sortableChildren = true;
    this.app.stage.addChild(rect);
    this.app.stage.addChild(ellipse);
    this.app.stage.addChild(star);

    this.subscribe(rect, "rect");
    this.subscribe(ellipse, "ellipse");
    this.subscribe(star, "star");

    // draw card
    const cardDeck = new PIXI.Sprite.from(CardBack);
    this.scalePng(cardDeck);
    cardDeck.x = 250;
    cardDeck.y = 30;
    this.app.stage.addChild(cardDeck);

    cardDeck.interactive = true;
    cardDeck.click = (e) => {
      this.dealCard();
    };

    this.app.start();
  }

  scalePng(sprite) {
    sprite.anchor.set(0.5);
    sprite.scale.x = 0.05;
    sprite.scale.y = 0.05;
  }

  dealCard() {
    const card = new PIXI.Sprite.from(Cards[Math.floor(Math.random() * 52)]);
    this.scalePng(card);
    this.app.stage.addChild(card);
    gsap.fromTo(
      card,
      { x: 250, y: 30, duration: 0 },
      { x: 265, y: 100, duration: 0.5, ease: "expo.inOut" }
    );
  }

  /**
   * Stop the Application when unmounting.
   */
  componentWillUnmount() {
    this.app.stop();
  }

  /**
   * Simply render the div that will contain the Pixi Renderer.
   */
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
