(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("initialize.ts", function(exports, require, module) {
"use strict";
var default_1 = require("./scenes/default");
var scalemanager_1 = require("./utils/scalemanager");
var game = new Phaser.Game({
    // See <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    width: 800,
    height: 600,
    // zoom: 1,
    // resolution: 1,
    callbacks: {
        postBoot: function () {
            new scalemanager_1.ScaleManager(game, (!game.device.os.windows && !game.device.os.linux && !game.device.os.macOS));
        }
    },
    type: Phaser.AUTO,
    parent: "content",
    // canvas: null,
    // canvasStyle: null,
    // seed: null,
    title: '☕️ Brunch with Phaser',
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
        path: 'assets/',
        maxParallelDownloads: 6,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 180
            }
        }
    },
    scene: default_1.Main,
});
//# sourceMappingURL=initialize.js.map
});

require.register("scenes/default.ts", function(exports, require, module) {
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var testSpace_1 = require("./testSpace");
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super.call(this, {
            key: "Main"
        }) || this;
    }
    Main.prototype.preload = function () {
        this.scene.add("TestSpace", testSpace_1.TestSpace, true);
    };
    Main.prototype.create = function () {
        this.add.text(100, 100, "Hello, world!");
    };
    return Main;
}(Phaser.Scene));
exports.Main = Main;
//# sourceMappingURL=default.js.map
});

;require.register("scenes/testSpace.ts", function(exports, require, module) {
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dotcard_1 = require("../utils/manipulative/dotcard");
var numbertile_1 = require("../utils/manipulative/numbertile");
var dropzone_1 = require("../utils/dropzone");
var background_1 = require("../utils/background");
var TestSpace = (function (_super) {
    __extends(TestSpace, _super);
    function TestSpace() {
        var _this = _super.call(this, {
            key: "TestSpace"
        }) || this;
        _this.preload = function () {
            _this.load.image("obstacle", "obstacle.png");
            _this.load.image("manipulative", "test_manipulative.png");
            _this.load.image("dropzone", "dropzone.png");
            _this.load.image("plains", "plain 2.jpg");
            _this.load.atlas("dotcards", "atlas/dotCards.png", "atlas/dotCards.json");
            _this.load.atlas("testing", "atlas/megasetHD-1.png", "atlas/megasetHD-1.json");
            _this.load.atlas("numbertiles", "atlas/numberTiles.png", "atlas/numberTiles.json");
            _this.load.audio("dropHit", "sounds/dropHit.mp3", null, null);
            _this.load.audio("dropMiss", "sounds/dropMiss.mp3", null, null);
            _this.load.audio("pickUp", "sounds/pickUp.mp3", null, null);
        };
        _this.create = function () {
            var bg = new background_1.Background(_this, "plains");
            var dropZones = [
                new dropzone_1.DropZone(_this, 200, 200, 50, "DOTCARD"),
                new dropzone_1.DropZone(_this, 200, 350, 50, "DOTCARD"),
                new dropzone_1.DropZone(_this, 300, 200, 50, "NUMBERTILE"),
                new dropzone_1.DropZone(_this, 300, 300, 50, "NUMBERTILE"),
            ];
            for (var _i = 0, dropZones_1 = dropZones; _i < dropZones_1.length; _i++) {
                var dropZone = dropZones_1[_i];
                dropZone.render();
            }
            // this.add.image(400, 400, "obstacle");
            // let manipulative=this.add.sprite(0, 0, 'manipulative')
            // this.add.sprite(200, 300, "dotcards", "1").setScale(0.5)
            // let dropZone=new DropZone(this, 400, 400, 50, "BAR")
            // let bar=new Bar(this, 10, manipulative, dropZone);
            // bar.render(300, 300);
            var dotCards = [
                new dotcard_1.DotCard(_this, 3, [dropZones[0], dropZones[1]]),
                new dotcard_1.DotCard(_this, 4, [dropZones[0], dropZones[1]])
            ];
            var numberTiles = [
                new numbertile_1.NumberTile(_this, 3, [dropZones[2], dropZones[3]]),
                new numbertile_1.NumberTile(_this, 4, [dropZones[2], dropZones[3]])
            ];
            for (var _a = 0, dotCards_1 = dotCards; _a < dotCards_1.length; _a++) {
                var dotCard = dotCards_1[_a];
                dotCard.dragSprite.setScale(0.5);
            }
            var y = 500;
            var x = 100;
            for (var _b = 0, dotCards_2 = dotCards; _b < dotCards_2.length; _b++) {
                var dotCard = dotCards_2[_b];
                dotCard.render(x, y);
                x += 100;
            }
            for (var _c = 0, numberTiles_1 = numberTiles; _c < numberTiles_1.length; _c++) {
                var numberTile = numberTiles_1[_c];
                numberTile.render(x, y);
                x += 100;
            }
            // let dotCard=new DotCard(this, 3, dropZone);
            // dotCard.dragSprite.setScale(0.5)
            // dotCard.render(500, 500);
        };
        return _this;
    }
    return TestSpace;
}(Phaser.Scene));
exports.TestSpace = TestSpace;
//# sourceMappingURL=testSpace.js.map
});

;require.register("utils/background.ts", function(exports, require, module) {
"use strict";
var Background = (function () {
    function Background(aTargetScene, aBackgroundImageKey) {
        this.targetScene = aTargetScene;
        this.targetScene.add.image(0, 0, aBackgroundImageKey).setOrigin(0, 0);
    }
    return Background;
}());
exports.Background = Background;
//# sourceMappingURL=background.js.map
});

;require.register("utils/dropzone.ts", function(exports, require, module) {
"use strict";
/**
 * For dragging manipulatives to the drop area
 */
var DropZone = (function () {
    function DropZone(aTargetScene, destX, destY, aPullRadius, anAcceptedType) {
        this.targetScene = aTargetScene;
        this.x = destX;
        this.y = destY;
        this.pullRadius = aPullRadius;
        this.acceptedType = anAcceptedType;
    }
    DropZone.prototype.render = function () {
        this.dropZone = this.targetScene.add.sprite(this.x, this.y, "dropzone");
        this.dropZone.setAlpha(0.8);
        this.targetScene.tweens.add({
            targets: [this.dropZone],
            alpha: 0.3,
            duration: 2000,
            ease: "Sine.easeInOut",
            yoyo: true,
            repeat: -1
        });
        switch (this.acceptedType) {
            case "BAR":
                break;
            case "DOTCARD":
                console.log("DOTCARD");
                this.dropZone.displayWidth = 75;
                this.dropZone.displayHeight = 100;
                break;
            case "NUMBERTILE":
                this.dropZone.displayWidth = 60;
                this.dropZone.displayHeight = 60;
                break;
            default:
                break;
        }
    };
    DropZone.prototype.checkBounds = function (x, y, manipulative) {
        if ((x < this.x + this.dropZone.displayWidth && x > this.x - this.dropZone.displayWidth)
            &&
                (y < this.y + this.dropZone.displayHeight && y > this.y - this.dropZone.displayHeight)
            && manipulative.type == this.acceptedType) {
            return true;
        }
        else {
            return false;
        }
    };
    return DropZone;
}());
exports.DropZone = DropZone;
//# sourceMappingURL=dropzone.js.map
});

;require.register("utils/manipulative/bar.ts", function(exports, require, module) {
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var manipulatives_1 = require("./manipulatives");
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar(theTargetScene, aValue, aResource, aDragPoint, clickCallback, pointerdownCallback, pointeroverCallback, pointerupCallback) {
        return _super.call(this, theTargetScene, aValue, manipulatives_1.ManipulativeType.BAR, aResource, aDragPoint) || this;
    }
    //bar specific rendering method
    Bar.prototype.render = function (x, y) {
        _super.prototype.render.call(this, x, y);
    };
    return Bar;
}(manipulatives_1.Manipulative));
exports.Bar = Bar;
//# sourceMappingURL=bar.js.map
});

;require.register("utils/manipulative/dotcard.ts", function(exports, require, module) {
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var manipulatives_1 = require("./manipulatives");
var DotCard = (function (_super) {
    __extends(DotCard, _super);
    function DotCard(theTargetScene, aValue, someDragPoints, clickCallback, pointerdownCallback, pointeroverCallback, pointerupCallback) {
        var _this = this;
        var frame = aValue.toString();
        var dotCard = theTargetScene.add.sprite(0, 0, "dotcards", frame);
        _this = _super.call(this, theTargetScene, aValue, manipulatives_1.ManipulativeType.DOTCARD, dotCard, someDragPoints) || this;
        return _this;
    }
    //dotcard specific rendering method
    DotCard.prototype.render = function (x, y) {
        _super.prototype.render.call(this, x, y);
    };
    return DotCard;
}(manipulatives_1.Manipulative));
exports.DotCard = DotCard;
//# sourceMappingURL=dotcard.js.map
});

;require.register("utils/manipulative/manipulatives.ts", function(exports, require, module) {
"use strict";
var soundmanager_1 = require("../soundmanager");
var Manipulative = (function () {
    function Manipulative(theTargetScene, aValue, aType, 
        // aResource:string,
        aSprite, someDragPoints, clickCallback, pointerdownCallback, pointeroverCallback, pointeroutCallback) {
        this.isDragging = false;
        this.startDragMS = 0;
        this.minDragDelay = 400;
        this.targetScene = theTargetScene;
        this.value = aValue;
        this.type = aType;
        // this.resourceKey=aResource;
        this.dragSprite = aSprite;
        this.onClick = clickCallback;
        this.onPointerDown = pointerdownCallback;
        this.onPointerOver = pointeroverCallback;
        this.onPointerOut = pointeroutCallback;
        this.dragPoints = someDragPoints;
        this.dragSprite = aSprite;
        //dotcards too big hotfix
        if (this.type == ManipulativeType.DOTCARD) {
            this.originalScale = 0.5;
        }
        else {
            this.originalScale = this.dragSprite.scaleX;
        }
        this.dragSprite.visible = false;
        this.soundManager = new soundmanager_1.SoundManager(this.targetScene, ["pickUp", "dropHit", "dropMiss"]);
    }
    Manipulative.prototype.clickAndFollow = function (dragSprite, originX, originY) {
        var _this = this;
        this.dragSprite = dragSprite;
        dragSprite.on("pointerdown", function () {
            if (!_this.isDragging) {
                _this.startDrag();
            }
            else {
                _this.stopDrag(originX, originY);
            }
        });
        dragSprite.on("pointerup", function () {
            if (_this.isDragging) {
                var timeLapse = Date.now() - _this.startDragMS;
                //var inOrigArea:boolean = this.checkBounds(dragSprite.x, dragSprite.y);    
                if (timeLapse > _this.minDragDelay) {
                    _this.stopDrag(originX, originY);
                }
            }
        });
        this.targetScene.input.on("pointermove", function (pointer) {
            if (_this.isDragging) {
                dragSprite.x = pointer.x;
                dragSprite.y = pointer.y;
            }
        });
    };
    Manipulative.prototype.startDrag = function () {
        if (!this.isDragging) {
            // this.pickUp.play();
            this.soundManager.play("pickUp");
            //this.dragSprite.setScale(this.origScale *1.3);
            this.isDragging = true;
            this.startDragMS = Date.now();
        }
    };
    Manipulative.prototype.stopDrag = function (originX, originY) {
        var isInBounds = false;
        for (var i = 0; i < this.dragPoints.length; i++) {
            if (this.dragPoints[i].checkBounds(this.dragSprite.x, this.dragSprite.y, this)) {
                if (!this.dragPoints[i].manipulativeInZone) {
                    this.soundManager.play("dropHit");
                    this.dragSprite.x = this.dragPoints[i].x;
                    this.dragSprite.y = this.dragPoints[i].y;
                    this.dragPoints[i].manipulativeInZone = this;
                    isInBounds = true;
                    ;
                }
                else {
                    console.log("found manipulative in spot, switching...");
                    var man = this.dragPoints[i].manipulativeInZone;
                    man.dragSprite.x = man.originalX;
                    man.dragSprite.y = man.originalY;
                    this.soundManager.play("dropHit");
                    this.dragSprite.x = this.dragPoints[i].x;
                    this.dragSprite.y = this.dragPoints[i].y;
                    this.dragPoints[i].manipulativeInZone = this;
                    isInBounds = true;
                }
            }
            else {
                this.dragPoints[i].manipulativeInZone = undefined;
            }
        }
        if (!isInBounds) {
            this.soundManager.play("dropMiss");
            this.dragSprite.x = originX;
            this.dragSprite.y = originY;
        }
        this.isDragging = false;
    };
    Manipulative.prototype.activateOnMouseOver = function () {
        var _this = this;
        this.dragSprite.on("pointerover", function () {
            _this.dragSprite.setScale(_this.originalScale * 1.25);
        });
        this.dragSprite.on("pointerout", function () {
            _this.dragSprite.setScale(_this.originalScale);
        });
    };
    Manipulative.prototype.render = function (x, y, scale) {
        this.originalX = x;
        this.originalY = y;
        this.dragSprite.visible = true;
        // this.dragSprite = this.targetScene.add.sprite(x, y, this.resourceKey);
        this.dragSprite.x = x;
        this.dragSprite.y = y;
        this.dragSprite.setInteractive();
        this.origScale = this.dragSprite.scale;
        // this.pickUp=this.targetScene.sound.add("pickUp");
        // this.dropHit=this.targetScene.sound.add("dropHit");
        // this.dropMiss=this.targetScene.sound.add("dropMiss");
        var isDragging = false;
        this.clickAndFollow(this.dragSprite, x, y);
        this.activateOnMouseOver();
    };
    return Manipulative;
}());
exports.Manipulative = Manipulative;
var ManipulativeType;
(function (ManipulativeType) {
    ManipulativeType[ManipulativeType["BAR"] = "BAR"] = "BAR";
    ManipulativeType[ManipulativeType["DOTCARD"] = "DOTCARD"] = "DOTCARD";
    ManipulativeType[ManipulativeType["NUMBERTILE"] = "NUMBERTILE"] = "NUMBERTILE";
})(ManipulativeType = exports.ManipulativeType || (exports.ManipulativeType = {}));
//# sourceMappingURL=manipulatives.js.map
});

;require.register("utils/manipulative/numbertile.ts", function(exports, require, module) {
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var manipulatives_1 = require("./manipulatives");
var NumberTile = (function (_super) {
    __extends(NumberTile, _super);
    function NumberTile(theTargetScene, aValue, someDragPoints, clickCallback, pointerdownCallback, pointeroverCallback, pointerupCallback) {
        var _this = this;
        var frame = aValue.toString();
        var numberTile = theTargetScene.add.sprite(0, 0, "numbertiles", frame + "_tex.png");
        // console.log(numberTile)
        _this = _super.call(this, theTargetScene, aValue, manipulatives_1.ManipulativeType.NUMBERTILE, numberTile, someDragPoints) || this;
        return _this;
    }
    //dotcard specific rendering method
    NumberTile.prototype.render = function (x, y) {
        _super.prototype.render.call(this, x, y);
    };
    return NumberTile;
}(manipulatives_1.Manipulative));
exports.NumberTile = NumberTile;
//# sourceMappingURL=numbertile.js.map
});

;require.register("utils/scalemanager.ts", function(exports, require, module) {
"use strict";
var ScaleManager = (function () {
    function ScaleManager(game, isMobile) {
        var _this = this;
        // console.log(game)
        // console.log(game.canvas);
        this.canvas = game.canvas;
        this.mobile = isMobile;
        this.game = game;
        window.addEventListener('resize', function () {
            _this.rescale();
            // this.canvas.height=window.outerHeight;
            // this.canvas.width=window.outerWidth;
            if (_this.mobile) {
                if (window.innerWidth < window.innerHeight) {
                    _this.leaveIncorrectOrientation();
                }
                else {
                    _this.enterIncorrectOrientation();
                }
            }
        });
        this.rescale();
    }
    ScaleManager.prototype.resize = function (width, height) {
        this.game.resize(width, height);
        this.game.scene.scenes.forEach(function (scene) {
            scene.cameras.main.setViewport(0, 0, width, height);
            scene.cameras.main.setZoom(this.scale);
        });
        this.rescale();
    };
    ScaleManager.prototype.rescale = function () {
        // var orientation = (this.mobile) ? 'left top' : 'center top';
        var orientation = "50% 50%";
        var scale = Math.min(window.innerWidth / this.canvas.width, window.innerHeight / this.canvas.height);
        var usedHeight = this.canvas.height * scale;
        document.body.height = window.innerHeight;
        this.canvas.setAttribute('style', '-ms-transform-origin: ' + orientation + '; -webkit-transform-origin: ' + orientation + ';' +
            ' -moz-transform-origin: ' + orientation + '; -o-transform-origin: ' + orientation + '; transform-origin: ' + orientation + ';' +
            ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' +
            ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); ' +
            ' transform: scale(' + scale + ');' +
            ' display: block; margin: 0; padding: 0; vertical-align: baseline;');
    };
    ScaleManager.prototype.enterIncorrectOrientation = function () {
        document.getElementById("orientation").style.display = "block";
        document.getElementById("content").style.display = "none";
    };
    ScaleManager.prototype.leaveIncorrectOrientation = function () {
        document.getElementById("orientation").style.display = "none";
        document.getElementById("content").style.display = "block";
    };
    return ScaleManager;
}());
exports.ScaleManager = ScaleManager;
//# sourceMappingURL=scalemanager.js.map
});

;require.register("utils/soundmanager.ts", function(exports, require, module) {
"use strict";
var SoundManager = (function () {
    function SoundManager(aTargetScene, someSoundKeys) {
        //an array of sound objects to play
        this.sounds = [];
        this.targetScene = aTargetScene;
        this.soundKeys = someSoundKeys;
        for (var i = 0; i < someSoundKeys.length; i++) {
            aTargetScene.load.audio(someSoundKeys[i], "sounds/" + someSoundKeys[i] + ".mp3");
            this.sounds.push(aTargetScene.sound.add(someSoundKeys[i]));
        }
    }
    SoundManager.prototype.play = function (sound) {
        var index = this.soundKeys.indexOf(sound);
        this.sounds[index].play();
    };
    return SoundManager;
}());
exports.SoundManager = SoundManager;
//# sourceMappingURL=soundmanager.js.map
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map