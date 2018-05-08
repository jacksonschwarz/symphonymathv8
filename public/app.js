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
var game = new Phaser.Game({
    // See <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    width: 800,
    height: 600,
    // zoom: 1,
    // resolution: 1,
    type: Phaser.AUTO,
    // parent: null,
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
var bar_1 = require("../utils/manipulative/bar");
var dotcard_1 = require("../utils/manipulative/dotcard");
var dropzone_1 = require("../utils/dropzone");
var TestSpace = (function (_super) {
    __extends(TestSpace, _super);
    function TestSpace() {
        var _this = _super.call(this, {
            key: "TestSpace"
        }) || this;
        _this.preload = function () {
            _this.load.image("obstacle", "obstacle.png");
            _this.load.image("manipulative", "test_manipulative.png");
            _this.load.atlas("dotcards", "atlas/dotCards.png", "atlas/dotCards.json");
            _this.load.atlas("testing", "atlas/megasetHD-1.png", "atlas/megasetHD-1.json");
            _this.load.audio("dropHit", "sounds/dropHit.mp3", null, null);
            _this.load.audio("dropMiss", "sounds/dropMiss.mp3", null, null);
            _this.load.audio("pickUp", "sounds/pickUp.mp3", null, null);
        };
        _this.create = function () {
            _this.add.text(100, 200, "Try to drag and drop the white bar onto the red circle:");
            _this.add.image(400, 400, "obstacle");
            var manipulative = _this.add.sprite(0, 0, 'manipulative');
            // this.add.sprite(200, 300, "dotcards", "1").setScale(0.5)
            var dropZone = new dropzone_1.DropZone(400, 400, 50, "BAR");
            var bar = new bar_1.Bar(_this, 10, manipulative, dropZone);
            bar.render(300, 300);
            var dotCard = new dotcard_1.DotCard(_this, 3, dropZone);
            dotCard.dragSprite.setScale(0.5);
            dotCard.render(500, 500);
        };
        return _this;
    }
    return TestSpace;
}(Phaser.Scene));
exports.TestSpace = TestSpace;
//# sourceMappingURL=testSpace.js.map
});

;require.register("utils/dropzone.ts", function(exports, require, module) {
"use strict";
/**
 * For dragging manipulatives to the drop area
 */
var DropZone = (function () {
    function DropZone(destX, destY, aPullRadius, anAcceptedType) {
        this.x = destX;
        this.y = destY;
        this.pullRadius = aPullRadius;
        this.acceptedType = anAcceptedType;
    }
    DropZone.prototype.render = function () {
    };
    DropZone.prototype.checkBounds = function (x, y, manipulative) {
        if (((x >= this.x - this.pullRadius && x <= this.x + this.pullRadius)
            && (y >= this.y - this.pullRadius && y <= this.y + this.pullRadius))
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
    function DotCard(theTargetScene, aValue, aDragPoint, clickCallback, pointerdownCallback, pointeroverCallback, pointerupCallback) {
        var _this = this;
        var frame = aValue.toString();
        var dotCard = theTargetScene.add.sprite(0, 0, "dotcards", frame);
        dotCard.visible = false;
        console.log(dotCard);
        _this = _super.call(this, theTargetScene, aValue, manipulatives_1.ManipulativeType.DOTCARD, dotCard, aDragPoint) || this;
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
        aSprite, aDragPoint, clickCallback, pointerdownCallback, pointeroverCallback, pointeroutCallback) {
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
        this.dragPoint = aDragPoint;
        this.dragSprite = aSprite;
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
    // private checkBounds(x, y){
    //     if((x >= this.dragPoint.x-this.dragPoint.pullRadius && x <= this.dragPoint.x+this.dragPoint.pullRadius) 
    //     && (y >=this.dragPoint.y-this.dragPoint.pullRadius && y <=this.dragPoint.y+this.dragPoint.pullRadius)){
    //         return true;
    //     }
    //     else{
    //         return false;
    //     }
    // }
    Manipulative.prototype.startDrag = function () {
        console.log("pointer down, starting follow....");
        // this.pickUp.play();
        this.soundManager.play("pickUp");
        //this.dragSprite.setScale(this.origScale *1.3);
        this.isDragging = true;
        this.startDragMS = Date.now();
    };
    Manipulative.prototype.stopDrag = function (originX, originY) {
        console.log("pointer up, cancelling follow");
        //dragSprite.x=this.dragPoint.x;
        //dragSprite.y=this.dragPoint.y;
        //this.dragSprite.setScale(this.origScale);
        // this.dropHit.play();
        if (this.dragPoint.checkBounds(this.dragSprite.x, this.dragSprite.y, this)) {
            this.soundManager.play("dropHit");
            this.dragSprite.x = this.dragPoint.x;
            this.dragSprite.y = this.dragPoint.y;
        }
        else {
            this.soundManager.play("dropMiss");
            this.dragSprite.x = originX;
            this.dragSprite.y = originY;
        }
        this.isDragging = false;
    };
    Manipulative.prototype.render = function (x, y, scale) {
        this.dragSprite.visible = true;
        console.log("render called!");
        // this.dragSprite = this.targetScene.add.sprite(x, y, this.resourceKey);
        this.dragSprite.x = x;
        this.dragSprite.y = y;
        this.dragSprite.setInteractive();
        this.origScale = this.dragSprite.scale;
        console.log(this.origScale);
        // this.pickUp=this.targetScene.sound.add("pickUp");
        // this.dropHit=this.targetScene.sound.add("dropHit");
        // this.dropMiss=this.targetScene.sound.add("dropMiss");
        var isDragging = false;
        this.clickAndFollow(this.dragSprite, x, y);
    };
    return Manipulative;
}());
exports.Manipulative = Manipulative;
var ManipulativeType;
(function (ManipulativeType) {
    ManipulativeType[ManipulativeType["BAR"] = "BAR"] = "BAR";
    ManipulativeType[ManipulativeType["DOTCARD"] = "DOTCARD"] = "DOTCARD";
})(ManipulativeType = exports.ManipulativeType || (exports.ManipulativeType = {}));
//# sourceMappingURL=manipulatives.js.map
});

;require.register("utils/soundmanager.ts", function(exports, require, module) {
"use strict";
var SoundManager = (function () {
    function SoundManager(aTargetScene, someSoundKeys) {
        //an array of sound objects to play
        this.sounds = [];
        this.targetScene = aTargetScene;
        this.soundKeys = someSoundKeys;
        console.log(aTargetScene);
        for (var i = 0; i < someSoundKeys.length; i++) {
            aTargetScene.load.audio(someSoundKeys[i], "sounds/" + someSoundKeys[i] + ".mp3");
            this.sounds.push(aTargetScene.sound.add(someSoundKeys[i]));
        }
        console.log(this.sounds);
    }
    SoundManager.prototype.play = function (sound) {
        var index = this.soundKeys.indexOf(sound);
        console.log(sound, index);
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