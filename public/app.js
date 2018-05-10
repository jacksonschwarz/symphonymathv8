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
    width: 1024,
    height: 768,
    // zoom: 1,
    // resolution: 1,
    callbacks: {
        postBoot: function () {
            new scalemanager_1.ScaleManager(game, (!game.device.os.windows && !game.device.os.linux && !game.device.os.macOS));
        }
    },
    type: Phaser.WEBGL,
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
        path: 'http://content.symphonylearning.com/assets/',
        maxParallelDownloads: 6,
        crossOrigin: 'anonymous',
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
        //this.add.text(100, 100, "Hello, world!")
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
var background_1 = require("../utils/background");
var task_1 = require("../utils/task/task");
var TestSpace = (function (_super) {
    __extends(TestSpace, _super);
    function TestSpace() {
        var _this = _super.call(this, {
            key: "TestSpace"
        }) || this;
        _this.preload = function () {
            _this.load.image("obstacle", "img/obstacle.png");
            _this.load.image("manipulative", "img/test_manipulative.png");
            _this.load.image("dropzone", "img/dropzone.png");
            _this.load.image("plains", "img/plain 2.jpg");
            _this.load.atlas("dotcards", "img/atlas/dotCards.png", "img/atlas/dotCards.json");
            _this.load.atlas("numbertiles", "img/atlas/numberTiles.png", "img/atlas/numberTiles.json");
            _this.load.atlas("menu", "img/atlas/topBarAndButtons.png", "img/atlas/topBarAndButtons.json");
            _this.load.atlas("slider", "img/atlas/Sliders.png", "img/atlas/Sliders.json");
            _this.load.audio("dropHit", "audio/sfx/dropHit.mp3", null, null);
            _this.load.audio("dropMiss", "audio/sfx/dropMiss.mp3", null, null);
            _this.load.audio("pickUp", "audio/sfx/pickUp.mp3", null, null);
            _this.load.audio("pre_3", "audio/english/pre_3.mp3", null, null);
            _this.load.audio("plus", "audio/english/plus.mp3", null, null);
            _this.load.audio("equals", "audio/english/equals.mp3", null, null);
            _this.load.audio("post_4", "audio/english/post_4.mp3", null, null);
            _this.load.audio("pre_7", "audio/english/pre_7.mp3", null, null);
        };
        _this.create = function () {
            var bg = new background_1.Background(_this, "plains");
            // let dropZones=[
            //     new DropZone(this, 200, 200, 50, "DOTCARD"),
            //     new DropZone(this, 200, 350, 50, "DOTCARD"),
            //     new DropZone(this, 300, 200, 50, "NUMBERTILE"),
            //     new DropZone(this, 300, 300, 50, "NUMBERTILE"),
            // ]
            // for(let dropZone of dropZones){
            //     dropZone.render()
            // }
            // this.add.image(400, 400, "obstacle");
            // let manipulative=this.add.sprite(0, 0, 'manipulative')
            // this.add.sprite(200, 300, "dotcards", "1").setScale(0.5)
            // let dropZone=new DropZone(this, 400, 400, 50, "BAR")
            // let bar=new Bar(this, 10, manipulative, dropZone);
            // bar.render(300, 300);
            // let dotCards=[
            //     new DotCard(this, 3, [dropZones[0], dropZones[1]]),
            //     new DotCard(this, 4, [dropZones[0], dropZones[1]])
            // ];
            // let numberTiles=[
            //     new NumberTile(this, 3, [dropZones[2], dropZones[3]]),
            //     new NumberTile(this, "plus_symbol", [dropZones[2], dropZones[3]])
            // ];
            // for(let dotCard of dotCards){
            //     dotCard.dragSprite.setScale(0.5)
            // }
            // let y=500;
            // let x=100;
            // for(let dotCard of dotCards){
            //     dotCard.render(x, y)
            //     x+=100
            // }
            // for(let numberTile of numberTiles){
            //     numberTile.render(x, y)
            //     x+=100;
            // }
            // let narrationManager=new NarrationManager(this, ["pre_3", "plus", "post_9", "equals"])
            // narrationManager.play(800)
            var task = new task_1.Task(_this, 310030, 3, 1, true, "K", "OA", 2, 2, "Beginning Addition: Missing Result", "cards", 2, 7, [
                ["3", "+", "4", "=", "7"],
                ["3", "+", "4", "=", "7"]
            ], ["matchCards"], [{ "cards": [0, 2, 4] }, { "numbers": [4] }], ["pre_3", "plus", "post_4", "equals"], ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], "cardsnumbers", false, "3", null, "", "", [""], 0, "all", "0", { "cardsnumbers": "3_1" }, "none", "h");
            task.render();
            // let test=this.add.sprite(50, 50, "numbertiles", "1_tex.png")
            // test.setOrigin(0.0)
            // test.setPipeline("Light2D")
            // let light  = this.lights.
            // this.lights.enable().setAmbientColor(0x555555);
            // this.input.on('pointermove', function (pointer) {
            //     light.x = pointer.x;
            //     light.y = pointer.y;
            // });
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

;require.register("utils/button.ts", function(exports, require, module) {
"use strict";
var Button = (function () {
    function Button(anX, aY, aResource, aTargetScene, clickCallback) {
        this.x = anX;
        this.y = aY;
        this.resource = aResource;
        this.targetScene = aTargetScene;
        this.onClick = clickCallback;
        this.resource.visible = false;
    }
    ;
    Button.prototype.render = function () {
        var _this = this;
        this.resource.visible = true;
        this.resource.x = this.x;
        this.resource.y = this.y;
        this.resource.setInteractive();
        this.resource.on("pointerover", function () {
            _this.resource.setTint(0xBEBEBE);
        });
        this.resource.on("pointerout", function () {
            _this.resource.clearTint();
        });
        this.resource.on("pointerup", function () {
            _this.onClick();
        });
    };
    return Button;
}());
exports.Button = Button;
//# sourceMappingURL=button.js.map
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
        this.dropZone.setAlpha(0.6);
        this.targetScene.tweens.add({
            targets: [this.dropZone],
            alpha: 0.4,
            duration: 500,
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
        dotCard.setScale(0.5);
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

;require.register("utils/manipulative/index.ts", function(exports, require, module) {
"use strict";
var dotcard_1 = require("./dotcard");
exports.DotCard = dotcard_1.DotCard;
var bar_1 = require("./bar");
exports.Bar = bar_1.Bar;
var manipulatives_1 = require("./manipulatives");
exports.Manipulative = manipulatives_1.Manipulative;
var numbertile_1 = require("./numbertile");
exports.NumberTile = numbertile_1.NumberTile;
//# sourceMappingURL=index.js.map
});

;require.register("utils/manipulative/manipulatives.ts", function(exports, require, module) {
"use strict";
var soundmanager_1 = require("../soundmanager");
var Manipulative = (function () {
    function Manipulative(theTargetScene, aValue, aType, 
        // aResource:string,
        aSprite, someDragPoints, clickCallback, pointerdownCallback, pointeroverCallback, pointeroutCallback) {
        this.isInteractive = true;
        this.isDragging = false;
        this.startDragMS = 0;
        this.minDragDelay = 200;
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
        this.originalScale = this.dragSprite.scaleX;
        this.dragSprite.visible = false;
        this.soundManager = new soundmanager_1.SoundManager(this.targetScene, [
            "dropHit",
            "dropMiss",
            "pickUp"
        ]);
        this.dragSprite.setDepth(1);
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
    Manipulative.prototype.toggleActive = function (isActive, targetSprite) {
        if (isActive) {
            targetSprite.setScale(this.originalScale * 1.25);
        }
        else {
            targetSprite.setScale(this.originalScale);
        }
    };
    Manipulative.prototype.startDrag = function () {
        if (!this.isDragging) {
            this.soundManager.play("pickUp");
            // this.dragSprite.setScale(this.originalScale*1.25);
            this.toggleActive(true, this.dragSprite);
            this.dragSprite.setDepth(100);
            this.isDragging = true;
            this.targetScene.input.mouse.requestPointerLock();
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
        // this.dragSprite.setScale(this.originalScale);
        this.toggleActive(false, this.dragSprite);
        this.dragSprite.setDepth(1);
        this.targetScene.input.mouse.releasePointerLock();
        console.log('drop');
        this.isDragging = false;
    };
    Manipulative.prototype.activateOnMouseOver = function () {
        // this.dragSprite.on("pointerover", ()=>{
        //     this.dragSprite.setScale(this.originalScale*1.25)
        // })
        // this.dragSprite.on("pointerout", ()=>{
        //     this.dragSprite.setScale(this.originalScale);
        // })
    };
    Manipulative.prototype.setInteractive = function (interactiveBool) {
        this.isInteractive = interactiveBool;
    };
    Manipulative.prototype.pulse = function () {
        var graphics = this.targetScene.add.graphics(this.dragSprite.x, this.dragSprite.y);
        graphics.alpha = 0;
        graphics.fillStyle(0xffffff);
        graphics.fillRect(this.dragSprite.x - (this.dragSprite.width / 2) - 5, this.dragSprite.y - (this.dragSprite.height / 2) - 5, this.dragSprite.width + 10, this.dragSprite.height + 10);
        graphics.setDepth(0);
        this.targetScene.add.tween({
            targets: graphics,
            alpha: 0.5,
            // tint:0xffffff,
            duration: 250,
            yoyo: true,
            ease: "Sine.EaseInOut",
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
        if (this.isInteractive) {
            this.clickAndFollow(this.dragSprite, x, y);
            this.activateOnMouseOver();
        }
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
        var numberTile;
        var frame = aValue.toString();
        if (frame == "+") {
            numberTile = theTargetScene.add.sprite(0, 0, "numbertiles", "plus_symbol.png");
        }
        else if (frame == "=") {
            numberTile = theTargetScene.add.sprite(0, 0, "numbertiles", "equals_symbol.png");
        }
        else {
            numberTile = theTargetScene.add.sprite(0, 0, "numbertiles", frame + "_tex.png");
        }
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

;require.register("utils/narrationmanager.ts", function(exports, require, module) {
"use strict";
var soundmanager_1 = require("./soundmanager");
var NarrationManager = (function () {
    function NarrationManager(aTargetScene, someSounds, someManipulatives) {
        this.sounds = someSounds;
        this.targetScene = aTargetScene;
        this.soundManager = new soundmanager_1.SoundManager(aTargetScene, someSounds);
        this.manipulatives = someManipulatives;
        // this.soundManager=Main.soundManager;
    }
    NarrationManager.prototype.play = function (delay) {
        var _this = this;
        var i = 0;
        var howManyTimes = this.sounds.length;
        var f = function () {
            _this.soundManager.play(_this.sounds[i]);
            _this.manipulatives[i].pulse();
            i++;
            if (i < howManyTimes) {
                setTimeout(f, delay);
            }
        };
        f();
    };
    NarrationManager.prototype.addSound = function (soundKey) {
        this.soundManager.soundKeys.push();
    };
    return NarrationManager;
}());
exports.NarrationManager = NarrationManager;
//# sourceMappingURL=narrationmanager.js.map
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
        //document.body.height = window.innerHeight;
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

;require.register("utils/slider.ts", function(exports, require, module) {
"use strict";
var manipulative_1 = require("./manipulative");
var Slider = (function () {
    function Slider(aTargetScene, theSliderContents, theSliderType) {
        var _this = this;
        this.y = 634;
        this.isHidden = false;
        this.sliderDuration = 350;
        this.targetScene = aTargetScene;
        this.sliderContents = [];
        this.contentSprites = [];
        switch (theSliderType) {
            case "bars":
                break;
            case "cards":
                break;
            case "numbers":
                break;
            case "barsnumbers":
                break;
            case "cardsnumbers":
                this.sliderAsset = this.targetScene.add.sprite(512, this.y + 20, "slider", "CardsNumbersSlider.png");
                this.sliderAsset.setInteractive();
                this.contentSprites.push(this.sliderAsset);
                this.sliderContents.push([]);
                this.sliderContents.push([]);
                var _loop_1 = function (i) {
                    var dotcard = new manipulative_1.DotCard(aTargetScene, parseInt(theSliderContents[i]), []);
                    this_1.sliderContents[0].push(dotcard);
                    this_1.contentSprites.push(dotcard.dragSprite);
                    dotcard.dragSprite.once("pointerdown", function () {
                        var newDotCard = new manipulative_1.DotCard(aTargetScene, parseInt(theSliderContents[i]), _this.dropZones);
                        newDotCard.render(dotcard.dragSprite.x, dotcard.dragSprite.y);
                        _this.contentSprites.push(newDotCard.dragSprite);
                        _this.contentSprites.splice(_this.contentSprites.indexOf(dotcard.dragSprite), 1);
                    });
                };
                var this_1 = this;
                for (var i = 0; i < theSliderContents.length; i++) {
                    _loop_1(i);
                }
                var _loop_2 = function (i) {
                    var numbertile = new manipulative_1.NumberTile(aTargetScene, parseInt(theSliderContents[i]), []);
                    this_2.sliderContents[1].push(numbertile);
                    this_2.contentSprites.push(numbertile.dragSprite);
                    numbertile.dragSprite.once("pointerdown", function () {
                        var newNumberTile = new manipulative_1.NumberTile(aTargetScene, parseInt(theSliderContents[i]), _this.dropZones);
                        newNumberTile.render(numbertile.dragSprite.x, numbertile.dragSprite.y);
                        _this.contentSprites.push(newNumberTile.dragSprite);
                    });
                };
                var this_2 = this;
                for (var i = 0; i < theSliderContents.length; i++) {
                    _loop_2(i);
                }
                break;
        }
    }
    Slider.prototype.render = function () {
        var _this = this;
        console.log(this.sliderContents);
        var xOffset = 0;
        var yOffset = this.y;
        for (var i = 0; i < this.sliderContents.length; i++) {
            for (var j = 0; j < this.sliderContents[i].length; j++) {
                this.sliderContents[i][j].render(92 * (j + 1) + xOffset, yOffset);
            }
            yOffset += 100;
        }
        this.sliderAsset.on("pointerup", function () {
            if (_this.isHidden) {
                _this.show();
            }
            else {
                _this.hide();
            }
            _this.isHidden = !_this.isHidden;
        });
    };
    Slider.prototype.setDropZones = function (dropZones) {
        this.dropZones = dropZones;
        for (var i = 0; i < this.sliderContents.length; i++) {
            for (var j = 0; j < this.sliderContents[i].length; j++) {
                this.sliderContents[i][j].dragPoints = dropZones;
            }
        }
    };
    Slider.prototype.hide = function () {
        for (var i = 0; i < this.contentSprites.length; i++) {
            this.targetScene.add.tween({
                targets: this.contentSprites[i],
                y: this.contentSprites[i].y + 200,
                ease: "linear",
                duration: this.sliderDuration
            });
        }
        // this.targetScene.add.tween({
        //     targets:this.contentSprites,
        //     y:this.y+200,
        //     ease:"linear",
        //     duration:500
        // })
    };
    Slider.prototype.show = function () {
        for (var i = 0; i < this.contentSprites.length; i++) {
            this.targetScene.add.tween({
                targets: this.contentSprites[i],
                y: this.contentSprites[i].y - 200,
                ease: "linear",
                duration: this.sliderDuration
            });
        }
        // this.targetScene.add.tween({
        //     targets:this.contentSprites,
        //     y:this.y+20,
        //     ease:"linear",
        //     duration:500
        // })
    };
    return Slider;
}());
exports.Slider = Slider;
//# sourceMappingURL=slider.js.map
});

;require.register("utils/soundmanager.ts", function(exports, require, module) {
"use strict";
var SoundManager = (function () {
    function SoundManager(aTargetScene, someSoundKeys) {
        //an array of sound objects to play
        this.sounds = [];
        this.targetScene = aTargetScene;
        this.soundKeys = someSoundKeys;
        aTargetScene.load.audio("pre_3", "sounds/pre_3.mp3");
        for (var i = 0; i < someSoundKeys.length; i++) {
            var sound = this.targetScene.sound.add(someSoundKeys[i]);
            this.sounds.push(sound);
        }
        aTargetScene.load.once('filecomplete', this.doneLoad);
    }
    SoundManager.prototype.doneLoad = function () {
        console.log('a file is done loading');
    };
    SoundManager.prototype.play = function (sound) {
        var index = this.soundKeys.indexOf(sound);
        if (index >= 0) {
            this.sounds[index].play();
        }
        else {
            console.log('audio not found:', sound);
        }
    };
    return SoundManager;
}());
exports.SoundManager = SoundManager;
//# sourceMappingURL=soundmanager.js.map
});

;require.register("utils/task/task.ts", function(exports, require, module) {
"use strict";
var manipulative_1 = require("../manipulative");
var dropzone_1 = require("../dropzone");
var narrationmanager_1 = require("../narrationmanager");
var slider_1 = require("../slider");
var Task = (function () {
    function Task(aTargetScene, taskID, levelNum, subLevel, active, CCSSgrade, CCSSdomain, CCSSstandard, wayOfKnowing, subSkill, representation, diffLevel, taskType, taskArray, directionsArray, displayArray, audReqArray, sliderContents, sliderType, randomSlider, requiredSolutions, wp, wpBritish, wpSpanish, endPoints, steps, displayPoints, barType, notices, displayGrid, orient) {
        this.manipulativeArray = {
            "cards": [],
            "numbers": []
        };
        this.targetScene = aTargetScene;
        this.manipulativeArray = {
            "numbers": [],
            "cards": []
        };
        this.dropZones = [];
        this.taskID = taskID;
        this.levelNum = levelNum;
        this.subLevel = subLevel;
        this.active = active;
        this.CCSSgrade = CCSSgrade;
        this.CCSSdomain = CCSSdomain;
        this.CCSSstandard = CCSSstandard;
        this.wayOfKnowing = wayOfKnowing;
        this.subSkill = subSkill;
        this.representation = representation;
        this.diffLevel = diffLevel;
        this.taskType = taskType;
        this.taskArray = taskArray;
        this.directionsArray = directionsArray;
        this.displayArray = displayArray;
        this.audReqArray = audReqArray;
        this.narrationManager = new narrationmanager_1.NarrationManager(this.targetScene, audReqArray, []);
        this.slider = new slider_1.Slider(this.targetScene, sliderContents, sliderType);
        this.randomSlider = randomSlider;
        this.requiredSolutions = requiredSolutions;
        this.wp = wp;
        this.wpBritish = wpBritish;
        this.wpSpanish = wpSpanish;
        this.endPoints = endPoints;
        this.steps = steps;
        this.displayPoints = displayPoints;
        this.barType = barType;
        this.notices = notices;
        this.displayGrid = displayGrid;
        this.orient = orient;
    }
    Task.prototype.addDropZone = function (manipulativeType, manipulativeIndex, dropZone) {
        if (this.manipulativeArray[manipulativeType].length > 0) {
            this.manipulativeArray[manipulativeType][manipulativeIndex].dragSprite.visible = false;
            var x = this.manipulativeArray[manipulativeType][manipulativeIndex].originalX;
            var y = this.manipulativeArray[manipulativeType][manipulativeIndex].originalY;
            dropZone.x = x;
            dropZone.y = y;
            dropZone.render();
            this.dropZones.push(dropZone);
        }
    };
    Task.prototype.render = function () {
        this.slider.render();
        var y = 300;
        //i will be the same as the row of the actual task when displaying. In the test case, row 0 will be cards, because displayArray[i] has the key "cards"
        for (var i = 0; i < this.taskArray.length; i++) {
            var type = "";
            switch (Object.keys(this.displayArray[i])[0]) {
                case "cards":
                    type = "DOTCARD";
                    break;
                case "numbers":
                    type = "NUMBERTILE";
                    break;
                default:
                    break;
            }
            for (var j = 0; j < this.taskArray[i].length; j++) {
                switch (type) {
                    case "DOTCARD":
                        var dotCard = new manipulative_1.NumberTile(this.targetScene, this.taskArray[i][j], []);
                        dotCard.setInteractive(false);
                        this.manipulativeArray["cards"].push(dotCard);
                        dotCard.render((80 * (j + 1)) + 250, (75 * (i + 1)) + 100);
                        break;
                    case "NUMBERTILE":
                        var numberTile = new manipulative_1.NumberTile(this.targetScene, this.taskArray[i][j], []);
                        numberTile.setInteractive(false);
                        this.manipulativeArray["numbers"].push(numberTile);
                        numberTile.render((80 * (j + 1)) + 250, (100 * (i + 1)) + 100);
                        break;
                }
            }
        }
        for (var i = 0; i < this.displayArray.length; i++) {
            if (Object.keys(this.displayArray[i])[0] == "cards") {
                for (var j = 0; j < this.displayArray[i]["cards"].length; j++) {
                    this.addDropZone("cards", this.displayArray[i]["cards"][j], new dropzone_1.DropZone(this.targetScene, 0, 0, 0, "DOTCARD"));
                }
            }
            else if (Object.keys(this.displayArray[i])[0] == "numbers") {
                for (var j = 0; j < this.displayArray[i]["numbers"].length; j++) {
                    this.addDropZone("numbers", this.displayArray[i]["numbers"][j], new dropzone_1.DropZone(this.targetScene, 0, 0, 0, "NUMBERTILE"));
                }
            }
        }
        this.narrationManager.manipulatives = this.manipulativeArray[Object.getOwnPropertyNames(this.manipulativeArray)[0]];
        this.slider.setDropZones(this.dropZones);
        this.narrationManager.play(800);
    };
    return Task;
}());
exports.Task = Task;
//# sourceMappingURL=task.js.map
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('initialize');
//# sourceMappingURL=app.js.map