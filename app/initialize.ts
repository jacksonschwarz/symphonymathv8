import {Main} from './scenes/default';

import {ScaleManager} from "./utils/scalemanager"

const game = new Phaser.Game(<any>{ // <any> works around the missing GameConfig.physics definition
  // See <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
  width: 1024,
  height: 768,
  // zoom: 1,
  // resolution: 1,
  callbacks:{
    postBoot(){
      new ScaleManager(game, (!game.device.os.windows && !game.device.os.linux && !game.device.os.macOS))
    }
  },
  type: Phaser.WEBGL,
  parent: "content",
  // canvas: null,
  // canvasStyle: null,
  // seed: null,
  title: '☕️ Brunch with Phaser', // 'My Phaser 3 Game'
  url: 'https://github.com/samme/brunch-phaser-typescript',
  version: '0.0.1',
  // input: {
  //   keyboard: true,
  //   mouse: true,
  //   touch: true,
  //   gamepad: false
  // },
  // disableContextMenu: false,
  // banner: false
  banner: {
    // hidePhaser: false,
    // text: 'white',
    background: ['#e54661', '#ffa644', '#998a2f', '#2c594f', '#002d40']
  },
  // fps: {
  //   min: 10,
  //   target: 60,
  //   forceSetTimeout: false,
  // },
  // pixelArt: false,
  // transparent: false,
  // clearBeforeRender: true,
  // backgroundColor: 0x000000, // black
  loader: {
    // baseURL: '',
    path: 'http://content.symphonylearning.com/assets/',
    maxParallelDownloads: 6,
    crossOrigin: 'anonymous',
    // timeout: 0
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 180
      }
    }
  },
  scene: Main,

});
