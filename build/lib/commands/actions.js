'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _temp = require('temp');

var _temp2 = _interopRequireDefault(_temp);

var _appiumSupport = require('appium-support');

var _admZip = require('adm-zip');

var _admZip2 = _interopRequireDefault(_admZip);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _jimp = require('jimp');

var _jimp2 = _interopRequireDefault(_jimp);

var swipeStepsPerSec = 28;
var dragStepsPerSec = 40;

var commands = {},
    helpers = {},
    extensions = {};

commands.keyevent = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // TODO deprecate keyevent; currently wd only implements keyevent
        _logger2['default'].warn("keyevent will be deprecated use pressKeyCode");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.pressKeyCode(keycode, metastate));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pressKeyCode = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("pressKeyCode", { keycode: keycode, metastate: metastate }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.longPressKeyCode = function callee$0$0(keycode) {
  var metastate = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("longPressKeyCode", { keycode: keycode, metastate: metastate }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getOrientation = function callee$0$0() {
  var orientation;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("orientation", {}));

      case 2:
        orientation = context$1$0.sent;
        return context$1$0.abrupt('return', orientation.toUpperCase());

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setOrientation = function callee$0$0(orientation) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        orientation = orientation.toUpperCase();
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("orientation", { orientation: orientation }));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.fakeFlick = function callee$0$0(xSpeed, ySpeed) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('flick', { xSpeed: xSpeed, ySpeed: ySpeed }));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.fakeFlickElement = function callee$0$0(elementId, xoffset, yoffset, speed) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { xoffset: xoffset, yoffset: yoffset, speed: speed, elementId: elementId };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('element:flick', params));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.swipe = function callee$0$0(startX, startY, endX, endY, duration, touchCount, elId) {
  var swipeOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (startX === 'null') {
          startX = 0.5;
        }
        if (startY === 'null') {
          startY = 0.5;
        }
        swipeOpts = { startX: startX, startY: startY, endX: endX, endY: endY,
          steps: Math.round(duration * swipeStepsPerSec) };

        if (!(typeof elId !== "undefined" && elId !== null)) {
          context$1$0.next = 10;
          break;
        }

        swipeOpts.elementId = elId;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:swipe", swipeOpts));

      case 7:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("swipe", swipeOpts));

      case 12:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pinchClose = function callee$0$0(startX, startY, endX, endY, duration, percent, steps, elId) {
  var pinchOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pinchOpts = {
          direction: 'in',
          elementId: elId,
          percent: percent,
          steps: steps
        };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:pinch", pinchOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pinchOpen = function callee$0$0(startX, startY, endX, endY, duration, percent, steps, elId) {
  var pinchOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pinchOpts = { direction: 'out', elementId: elId, percent: percent, steps: steps };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:pinch", pinchOpts));

      case 3:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.flick = function callee$0$0(element, xSpeed, ySpeed, xOffset, yOffset, speed) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!element) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.fakeFlickElement(element, xOffset, yOffset, speed));

      case 3:
        context$1$0.next = 7;
        break;

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.fakeFlick(xSpeed, ySpeed));

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.drag = function callee$0$0(startX, startY, endX, endY, duration, touchCount, elementId, destElId) {
  var dragOpts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        dragOpts = { elementId: elementId, destElId: destElId, startX: startX, startY: startY, endX: endX, endY: endY,
          steps: Math.round(duration * dragStepsPerSec) };

        if (!elementId) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:drag", dragOpts));

      case 4:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("drag", dragOpts));

      case 9:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.lock = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.lock());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.isLocked = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isScreenLocked());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.unlock = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].unlock(this.adb));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.openNotifications = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("openNotification"));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setLocation = function callee$0$0(latitude, longitude) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.sendTelnetCommand('geo fix ' + longitude + ' ' + latitude));

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pullFile = function callee$0$0(remotePath) {
  var localFile, data, b64data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.tmp' });
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.pull(remotePath, localFile));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(localFile));

      case 5:
        data = context$1$0.sent;
        b64data = new Buffer(data).toString('base64');
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 9:
        if (!context$1$0.sent) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 12:
        return context$1$0.abrupt('return', b64data);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pushFile = function callee$0$0(remotePath, base64Data) {
  var localFile, content, fd;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.tmp' });
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _appiumSupport.mkdirp)(_path2['default'].dirname(localFile)));

      case 3:
        content = new Buffer(base64Data, 'base64');
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.open(localFile, 'w'));

      case 6:
        fd = context$1$0.sent;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.write(fd, content, 0, content.length, 0));

      case 9:
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.close(fd));

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.adb.push(localFile, remotePath));

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 15:
        if (!context$1$0.sent) {
          context$1$0.next = 18;
          break;
        }

        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 18:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.pullFolder = function callee$0$0(remotePath) {
  var localFolder, zip;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFolder = _temp2['default'].path({ prefix: 'appium' });
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.pull(remotePath, localFolder));

      case 3:
        zip = new _admZip2['default']();

        zip.addLocalFolder(localFolder);
        return context$1$0.abrupt('return', new _Promise(function (resolve, reject) {
          zip.toBuffer(function (buffer) {
            _logger2['default'].debug('Converting in-memory zip file to base64 encoded string');
            resolve(buffer.toString('base64'));
          }, function (err) {
            reject(err);
          });
        }));

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getScreenshot = function callee$0$0() {
  var localFile, pngDir, png, cmd, image, screenOrientation, b64data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.png' });
        pngDir = this.opts.androidScreenshotPath || '/data/local/tmp/';
        png = _path2['default'].posix.resolve(pngDir, 'screenshot.png');
        cmd = ['/system/bin/rm', png + ';', '/system/bin/screencap', '-p', png];
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.shell(cmd));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 8:
        if (!context$1$0.sent) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.adb.pull(png, localFile));

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(_jimp2['default'].read(localFile));

      case 15:
        image = context$1$0.sent;
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.adb.getApiLevel());

      case 18:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 < 23)) {
          context$1$0.next = 32;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(this.adb.getScreenOrientation());

      case 22:
        screenOrientation = context$1$0.sent;
        context$1$0.prev = 23;
        context$1$0.next = 26;
        return _regeneratorRuntime.awrap(image.rotate(-90 * screenOrientation));

      case 26:
        image = context$1$0.sent;
        context$1$0.next = 32;
        break;

      case 29:
        context$1$0.prev = 29;
        context$1$0.t1 = context$1$0['catch'](23);

        _logger2['default'].warn('Could not rotate screenshot due to error: ' + context$1$0.t1);

      case 32:
        context$1$0.next = 34;
        return _regeneratorRuntime.awrap(_bluebird2['default'].promisify(image.getBuffer).call(image, _jimp2['default'].MIME_PNG));

      case 34:
        b64data = context$1$0.sent.toString('base64');
        context$1$0.next = 37;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 37:
        return context$1$0.abrupt('return', b64data);

      case 38:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[23, 29]]);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// going the long way and checking for undefined and null since
// we can't be assured `elId` is a string and not an int

// adb push creates folders and overwrites existing files.

// TODO: find a better alternative to the AdmZip module

// Android bug 8433742 - rotate screenshot if screen is rotated
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzhCQUEyQixvQkFBb0I7Ozs7b0JBQzlCLE1BQU07Ozs7NkJBQ0ksZ0JBQWdCOztzQkFDeEIsU0FBUzs7OztvQkFDWCxNQUFNOzs7O3NCQUNQLFdBQVc7Ozs7d0JBQ2IsVUFBVTs7OztvQkFDUCxNQUFNOzs7O0FBRXZCLElBQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLElBQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQzs7QUFFM0IsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFakQsUUFBUSxDQUFDLFFBQVEsR0FBRyxvQkFBZ0IsT0FBTztNQUFFLFNBQVMseURBQUcsSUFBSTs7Ozs7QUFFM0QsNEJBQUksSUFBSSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7O3lDQUM1QyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUM7Ozs7Ozs7Ozs7Q0FDbkQsQ0FBQzs7QUFFRixRQUFRLENBQUMsWUFBWSxHQUFHLG9CQUFnQixPQUFPO01BQUUsU0FBUyx5REFBRyxJQUFJOzs7Ozt5Q0FDbEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLEVBQUMsT0FBTyxFQUFQLE9BQU8sRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDN0UsQ0FBQzs7QUFFRixRQUFRLENBQUMsZ0JBQWdCLEdBQUcsb0JBQWdCLE9BQU87TUFBRSxTQUFTLHlEQUFHLElBQUk7Ozs7O3lDQUN0RCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxFQUFDLE9BQU8sRUFBUCxPQUFPLEVBQUUsU0FBUyxFQUFULFNBQVMsRUFBQyxDQUFDOzs7Ozs7Ozs7O0NBQ2pGLENBQUM7O0FBRUYsUUFBUSxDQUFDLGNBQWMsR0FB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Ozt5Q0FFTCxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFOzs7QUFBekQseUJBQWlCOzs7eUNBRUwsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQzs7O0FBQW5ELGFBQUs7Ozs7Ozs7O0FBRUwsNEJBQUksSUFBSSwrREFBb0QsQ0FBQzs7Ozt5Q0FHNUMsc0JBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGtCQUFLLFFBQVEsQ0FBQzs7O0FBQXhFLGVBQU8sb0JBQ0ksUUFBUSxDQUFDLFFBQVE7O3lDQUMxQixrQkFBRyxNQUFNLENBQUMsU0FBUyxDQUFDOzs7NENBQ25CLE9BQU87Ozs7Ozs7Q0FDZixDQUFDOztBQUdGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2FjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYW5kcm9pZEhlbHBlcnMgZnJvbSAnLi4vYW5kcm9pZC1oZWxwZXJzJztcbmltcG9ydCB0ZW1wIGZyb20gJ3RlbXAnO1xuaW1wb3J0IHsgZnMsIG1rZGlycCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBBZG1aaXAgZnJvbSAnYWRtLXppcCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBqaW1wIGZyb20gJ2ppbXAnO1xuXG5jb25zdCBzd2lwZVN0ZXBzUGVyU2VjID0gMjg7XG5jb25zdCBkcmFnU3RlcHNQZXJTZWMgPSA0MDtcblxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xuXG5jb21tYW5kcy5rZXlldmVudCA9IGFzeW5jIGZ1bmN0aW9uIChrZXljb2RlLCBtZXRhc3RhdGUgPSBudWxsKSB7XG4gIC8vIFRPRE8gZGVwcmVjYXRlIGtleWV2ZW50OyBjdXJyZW50bHkgd2Qgb25seSBpbXBsZW1lbnRzIGtleWV2ZW50XG4gIGxvZy53YXJuKFwia2V5ZXZlbnQgd2lsbCBiZSBkZXByZWNhdGVkIHVzZSBwcmVzc0tleUNvZGVcIik7XG4gIHJldHVybiBhd2FpdCB0aGlzLnByZXNzS2V5Q29kZShrZXljb2RlLCBtZXRhc3RhdGUpO1xufTtcblxuY29tbWFuZHMucHJlc3NLZXlDb2RlID0gYXN5bmMgZnVuY3Rpb24gKGtleWNvZGUsIG1ldGFzdGF0ZSA9IG51bGwpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJwcmVzc0tleUNvZGVcIiwge2tleWNvZGUsIG1ldGFzdGF0ZX0pO1xufTtcblxuY29tbWFuZHMubG9uZ1ByZXNzS2V5Q29kZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXljb2RlLCBtZXRhc3RhdGUgPSBudWxsKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwibG9uZ1ByZXNzS2V5Q29kZVwiLCB7a2V5Y29kZSwgbWV0YXN0YXRlfSk7XG59O1xuXG5jb21tYW5kcy5nZXRPcmllbnRhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IG9yaWVudGF0aW9uID0gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcIm9yaWVudGF0aW9uXCIsIHt9KTtcbiAgcmV0dXJuIG9yaWVudGF0aW9uLnRvVXBwZXJDYXNlKCk7XG59O1xuXG5jb21tYW5kcy5zZXRPcmllbnRhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChvcmllbnRhdGlvbikge1xuICBvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uLnRvVXBwZXJDYXNlKCk7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwib3JpZW50YXRpb25cIiwge29yaWVudGF0aW9ufSk7XG59O1xuXG5jb21tYW5kcy5mYWtlRmxpY2sgPSBhc3luYyBmdW5jdGlvbiAoeFNwZWVkLCB5U3BlZWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ2ZsaWNrJywge3hTcGVlZCwgeVNwZWVkfSk7XG59O1xuXG5jb21tYW5kcy5mYWtlRmxpY2tFbGVtZW50ID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCwgeG9mZnNldCwgeW9mZnNldCwgc3BlZWQpIHtcbiAgbGV0IHBhcmFtcyA9IHt4b2Zmc2V0LCB5b2Zmc2V0LCBzcGVlZCwgZWxlbWVudElkfTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ2VsZW1lbnQ6ZmxpY2snLCBwYXJhbXMpO1xufTtcblxuY29tbWFuZHMuc3dpcGUgPSBhc3luYyBmdW5jdGlvbiAoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGR1cmF0aW9uLCB0b3VjaENvdW50LCBlbElkKSB7XG4gIGlmIChzdGFydFggPT09ICdudWxsJykge1xuICAgIHN0YXJ0WCA9IDAuNTtcbiAgfVxuICBpZiAoc3RhcnRZID09PSAnbnVsbCcpIHtcbiAgICBzdGFydFkgPSAwLjU7XG4gIH1cbiAgbGV0IHN3aXBlT3B0cyA9IHtzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSxcbiAgICAgICAgICAgICAgICAgICBzdGVwczogTWF0aC5yb3VuZChkdXJhdGlvbiAqIHN3aXBlU3RlcHNQZXJTZWMpfTtcbiAgLy8gZ29pbmcgdGhlIGxvbmcgd2F5IGFuZCBjaGVja2luZyBmb3IgdW5kZWZpbmVkIGFuZCBudWxsIHNpbmNlXG4gIC8vIHdlIGNhbid0IGJlIGFzc3VyZWQgYGVsSWRgIGlzIGEgc3RyaW5nIGFuZCBub3QgYW4gaW50XG4gIGlmICh0eXBlb2YgZWxJZCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBlbElkICE9PSBudWxsKSB7XG4gICAgc3dpcGVPcHRzLmVsZW1lbnRJZCA9IGVsSWQ7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnN3aXBlXCIsIHN3aXBlT3B0cyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJzd2lwZVwiLCBzd2lwZU9wdHMpO1xuICB9XG59O1xuXG5jb21tYW5kcy5waW5jaENsb3NlID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgcGVyY2VudCwgc3RlcHMsIGVsSWQpIHtcbiAgbGV0IHBpbmNoT3B0cyA9IHtcbiAgICBkaXJlY3Rpb246ICdpbicsXG4gICAgZWxlbWVudElkOiBlbElkLFxuICAgIHBlcmNlbnQsXG4gICAgc3RlcHNcbiAgfTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnBpbmNoXCIsIHBpbmNoT3B0cyk7XG59O1xuXG5jb21tYW5kcy5waW5jaE9wZW4gPSBhc3luYyBmdW5jdGlvbiAoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksIGR1cmF0aW9uLCBwZXJjZW50LCBzdGVwcywgZWxJZCkge1xuICBsZXQgcGluY2hPcHRzID0ge2RpcmVjdGlvbjogJ291dCcsIGVsZW1lbnRJZDogZWxJZCwgcGVyY2VudCwgc3RlcHN9O1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6cGluY2hcIiwgcGluY2hPcHRzKTtcbn07XG5cbmNvbW1hbmRzLmZsaWNrID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnQsIHhTcGVlZCwgeVNwZWVkLCB4T2Zmc2V0LCB5T2Zmc2V0LCBzcGVlZCkge1xuICBpZiAoZWxlbWVudCkge1xuICAgIGF3YWl0IHRoaXMuZmFrZUZsaWNrRWxlbWVudChlbGVtZW50LCB4T2Zmc2V0LCB5T2Zmc2V0LCBzcGVlZCk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgdGhpcy5mYWtlRmxpY2soeFNwZWVkLCB5U3BlZWQpO1xuICB9XG59O1xuXG5jb21tYW5kcy5kcmFnID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgdG91Y2hDb3VudCwgZWxlbWVudElkLCBkZXN0RWxJZCkge1xuICBsZXQgZHJhZ09wdHMgPSB7ZWxlbWVudElkLCBkZXN0RWxJZCwgc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksXG4gICAgICAgICAgICAgICAgICBzdGVwczogTWF0aC5yb3VuZChkdXJhdGlvbiAqIGRyYWdTdGVwc1BlclNlYyl9O1xuICBpZiAoZWxlbWVudElkKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmRyYWdcIiwgZHJhZ09wdHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZHJhZ1wiLCBkcmFnT3B0cyk7XG4gIH1cbn07XG5cbmNvbW1hbmRzLmxvY2sgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYi5sb2NrKCk7XG59O1xuXG5jb21tYW5kcy5pc0xvY2tlZCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYWRiLmlzU2NyZWVuTG9ja2VkKCk7XG59O1xuXG5jb21tYW5kcy51bmxvY2sgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCBhbmRyb2lkSGVscGVycy51bmxvY2sodGhpcy5hZGIpO1xufTtcblxuY29tbWFuZHMub3Blbk5vdGlmaWNhdGlvbnMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwib3Blbk5vdGlmaWNhdGlvblwiKTtcbn07XG5cbmNvbW1hbmRzLnNldExvY2F0aW9uID0gYXN5bmMgZnVuY3Rpb24gKGxhdGl0dWRlLCBsb25naXR1ZGUpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYWRiLnNlbmRUZWxuZXRDb21tYW5kKGBnZW8gZml4ICR7bG9uZ2l0dWRlfSAke2xhdGl0dWRlfWApO1xufTtcblxuY29tbWFuZHMucHVsbEZpbGUgPSBhc3luYyBmdW5jdGlvbiAocmVtb3RlUGF0aCkge1xuICBsZXQgbG9jYWxGaWxlID0gdGVtcC5wYXRoKHtwcmVmaXg6ICdhcHBpdW0nLCBzdWZmaXg6ICcudG1wJ30pO1xuICBhd2FpdCB0aGlzLmFkYi5wdWxsKHJlbW90ZVBhdGgsIGxvY2FsRmlsZSk7XG4gIGxldCBkYXRhID0gYXdhaXQgZnMucmVhZEZpbGUobG9jYWxGaWxlKTtcbiAgbGV0IGI2NGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgaWYgKGF3YWl0IGZzLmV4aXN0cyhsb2NhbEZpbGUpKSB7XG4gICAgYXdhaXQgZnMudW5saW5rKGxvY2FsRmlsZSk7XG4gIH1cbiAgcmV0dXJuIGI2NGRhdGE7XG59O1xuXG5jb21tYW5kcy5wdXNoRmlsZSA9IGFzeW5jIGZ1bmN0aW9uIChyZW1vdGVQYXRoLCBiYXNlNjREYXRhKSB7XG4gIGxldCBsb2NhbEZpbGUgPSB0ZW1wLnBhdGgoe3ByZWZpeDogJ2FwcGl1bScsIHN1ZmZpeDogJy50bXAnfSk7XG4gIGF3YWl0IG1rZGlycChwYXRoLmRpcm5hbWUobG9jYWxGaWxlKSk7XG4gIGxldCBjb250ZW50ID0gbmV3IEJ1ZmZlcihiYXNlNjREYXRhLCAnYmFzZTY0Jyk7XG4gIGxldCBmZCA9IGF3YWl0IGZzLm9wZW4obG9jYWxGaWxlLCAndycpO1xuICBhd2FpdCBmcy53cml0ZShmZCwgY29udGVudCwgMCwgY29udGVudC5sZW5ndGgsIDApO1xuICBhd2FpdCBmcy5jbG9zZShmZCk7XG5cbiAgLy8gYWRiIHB1c2ggY3JlYXRlcyBmb2xkZXJzIGFuZCBvdmVyd3JpdGVzIGV4aXN0aW5nIGZpbGVzLlxuICBhd2FpdCB0aGlzLmFkYi5wdXNoKGxvY2FsRmlsZSwgcmVtb3RlUGF0aCk7XG4gIGlmIChhd2FpdCBmcy5leGlzdHMobG9jYWxGaWxlKSkge1xuICAgIGF3YWl0IGZzLnVubGluayhsb2NhbEZpbGUpO1xuICB9XG59O1xuXG5jb21tYW5kcy5wdWxsRm9sZGVyID0gYXN5bmMgZnVuY3Rpb24gKHJlbW90ZVBhdGgpIHtcbiAgbGV0IGxvY2FsRm9sZGVyID0gdGVtcC5wYXRoKHtwcmVmaXg6ICdhcHBpdW0nfSk7XG4gIGF3YWl0IHRoaXMuYWRiLnB1bGwocmVtb3RlUGF0aCwgbG9jYWxGb2xkZXIpO1xuICAvLyBUT0RPOiBmaW5kIGEgYmV0dGVyIGFsdGVybmF0aXZlIHRvIHRoZSBBZG1aaXAgbW9kdWxlXG4gIGxldCB6aXAgPSBuZXcgQWRtWmlwKCk7XG4gIHppcC5hZGRMb2NhbEZvbGRlcihsb2NhbEZvbGRlcik7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgemlwLnRvQnVmZmVyKChidWZmZXIpID0+IHtcbiAgICAgIGxvZy5kZWJ1ZygnQ29udmVydGluZyBpbi1tZW1vcnkgemlwIGZpbGUgdG8gYmFzZTY0IGVuY29kZWQgc3RyaW5nJyk7XG4gICAgICByZXNvbHZlKGJ1ZmZlci50b1N0cmluZygnYmFzZTY0JykpO1xuICAgIH0sIChlcnIpID0+IHtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbW1hbmRzLmdldFNjcmVlbnNob3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBsb2NhbEZpbGUgPSB0ZW1wLnBhdGgoe3ByZWZpeDogJ2FwcGl1bScsIHN1ZmZpeDogJy5wbmcnfSk7XG4gIGxldCBwbmdEaXIgPSB0aGlzLm9wdHMuYW5kcm9pZFNjcmVlbnNob3RQYXRoIHx8ICcvZGF0YS9sb2NhbC90bXAvJztcbiAgY29uc3QgcG5nID0gcGF0aC5wb3NpeC5yZXNvbHZlKHBuZ0RpciwgJ3NjcmVlbnNob3QucG5nJyk7XG4gIGxldCBjbWQgPSAgWycvc3lzdGVtL2Jpbi9ybScsIGAke3BuZ307YCwgJy9zeXN0ZW0vYmluL3NjcmVlbmNhcCcsICctcCcsIHBuZ107XG4gIGF3YWl0IHRoaXMuYWRiLnNoZWxsKGNtZCk7XG4gIGlmIChhd2FpdCBmcy5leGlzdHMobG9jYWxGaWxlKSkge1xuICAgIGF3YWl0IGZzLnVubGluayhsb2NhbEZpbGUpO1xuICB9XG4gIGF3YWl0IHRoaXMuYWRiLnB1bGwocG5nLCBsb2NhbEZpbGUpO1xuICBsZXQgaW1hZ2UgPSBhd2FpdCBqaW1wLnJlYWQobG9jYWxGaWxlKTtcbiAgaWYgKGF3YWl0IHRoaXMuYWRiLmdldEFwaUxldmVsKCkgPCAyMykge1xuICAgIC8vIEFuZHJvaWQgYnVnIDg0MzM3NDIgLSByb3RhdGUgc2NyZWVuc2hvdCBpZiBzY3JlZW4gaXMgcm90YXRlZFxuICAgIGxldCBzY3JlZW5PcmllbnRhdGlvbiA9IGF3YWl0IHRoaXMuYWRiLmdldFNjcmVlbk9yaWVudGF0aW9uKCk7XG4gICAgdHJ5IHtcbiAgICAgIGltYWdlID0gYXdhaXQgaW1hZ2Uucm90YXRlKC05MCAqIHNjcmVlbk9yaWVudGF0aW9uKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZy53YXJuKGBDb3VsZCBub3Qgcm90YXRlIHNjcmVlbnNob3QgZHVlIHRvIGVycm9yOiAke2Vycn1gKTtcbiAgICB9XG4gIH1cbiAgbGV0IGI2NGRhdGEgPSAoYXdhaXQgQi5wcm9taXNpZnkoaW1hZ2UuZ2V0QnVmZmVyKS5jYWxsKGltYWdlLCBqaW1wLk1JTUVfUE5HKSlcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICBhd2FpdCBmcy51bmxpbmsobG9jYWxGaWxlKTtcbiAgcmV0dXJuIGI2NGRhdGE7XG59O1xuXG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXX0=