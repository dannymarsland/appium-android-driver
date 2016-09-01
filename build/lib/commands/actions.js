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
  var localFile, png, cmd, data, b64data;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        localFile = _temp2['default'].path({ prefix: 'appium', suffix: '.png' });
        png = '/data/local/tmp/screenshot.png';
        cmd = ['/system/bin/rm', png + ';', '/system/bin/screencap', '-p', png];
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.adb.shell(cmd));

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(localFile));

      case 7:
        if (!context$1$0.sent) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 10:
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.adb.pull(png, localFile));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.readFile(localFile));

      case 14:
        data = context$1$0.sent;
        b64data = new Buffer(data).toString('base64');
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.unlink(localFile));

      case 18:
        return context$1$0.abrupt('return', b64data);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// going the long way and checking for undefined and null since
// we can't be assured `elId` is a string and not an int

// adb push creates folders and overwrites existing files.

// TODO: find a better alternative to the AdmZip module
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9hY3Rpb25zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OzhCQUEyQixvQkFBb0I7Ozs7b0JBQzlCLE1BQU07Ozs7NkJBQ0ksZ0JBQWdCOztzQkFDeEIsU0FBUzs7OztvQkFDWCxNQUFNOzs7O3NCQUNQLFdBQVc7Ozs7QUFFM0IsSUFBTSxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7QUFDNUIsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDOztBQUUzQixJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsT0FBTyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVqRCxRQUFRLENBQUMsUUFBUSxHQUFHLG9CQUFnQixPQUFPO01BQUUsU0FBUyx5REFBRyxJQUFJOzs7OztBQUUzRCw0QkFBSSxJQUFJLENBQUMsOENBQThDLENBQUMsQ0FBQzs7eUNBQzVDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQzs7Ozs7Ozs7OztDQUNuRCxDQUFDOztBQUVGLFFBQVEsQ0FBQyxZQUFZLEdBQUcsb0JBQWdCLE9BQU87TUFBRSxTQUFTLHlEQUFHLElBQUk7Ozs7O3lDQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxjQUFjLEVBQUUsRUFBQyxPQUFPLEVBQVAsT0FBTyxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUMsQ0FBQzs7Ozs7Ozs7OztDQUM3RSxDQUFDOztBQUVGLFFBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxvQkFBZ0IsT0FBTztNQUFFLFNBQVMseURBQUcsSUFBSTs7Ozs7eUNBQ3RELElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGtCQUFrQixFQUFFLEVBQUMsT0FBTyxFQUFQLE9BQU8sRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDakYsQ0FBQzs7QUFFRixRQUFRLENBQUMsY0FBYyxHQUFHO01BQ3BCLFdBQVc7Ozs7O3lDQUFTLElBQUks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QU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2FjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYW5kcm9pZEhlbHBlcnMgZnJvbSAnLi4vYW5kcm9pZC1oZWxwZXJzJztcbmltcG9ydCB0ZW1wIGZyb20gJ3RlbXAnO1xuaW1wb3J0IHsgZnMsIG1rZGlycCB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBBZG1aaXAgZnJvbSAnYWRtLXppcCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcblxuY29uc3Qgc3dpcGVTdGVwc1BlclNlYyA9IDI4O1xuY29uc3QgZHJhZ1N0ZXBzUGVyU2VjID0gNDA7XG5cbmxldCBjb21tYW5kcyA9IHt9LCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuY29tbWFuZHMua2V5ZXZlbnQgPSBhc3luYyBmdW5jdGlvbiAoa2V5Y29kZSwgbWV0YXN0YXRlID0gbnVsbCkge1xuICAvLyBUT0RPIGRlcHJlY2F0ZSBrZXlldmVudDsgY3VycmVudGx5IHdkIG9ubHkgaW1wbGVtZW50cyBrZXlldmVudFxuICBsb2cud2FybihcImtleWV2ZW50IHdpbGwgYmUgZGVwcmVjYXRlZCB1c2UgcHJlc3NLZXlDb2RlXCIpO1xuICByZXR1cm4gYXdhaXQgdGhpcy5wcmVzc0tleUNvZGUoa2V5Y29kZSwgbWV0YXN0YXRlKTtcbn07XG5cbmNvbW1hbmRzLnByZXNzS2V5Q29kZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXljb2RlLCBtZXRhc3RhdGUgPSBudWxsKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwicHJlc3NLZXlDb2RlXCIsIHtrZXljb2RlLCBtZXRhc3RhdGV9KTtcbn07XG5cbmNvbW1hbmRzLmxvbmdQcmVzc0tleUNvZGUgPSBhc3luYyBmdW5jdGlvbiAoa2V5Y29kZSwgbWV0YXN0YXRlID0gbnVsbCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImxvbmdQcmVzc0tleUNvZGVcIiwge2tleWNvZGUsIG1ldGFzdGF0ZX0pO1xufTtcblxuY29tbWFuZHMuZ2V0T3JpZW50YXRpb24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCBvcmllbnRhdGlvbiA9IGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJvcmllbnRhdGlvblwiLCB7fSk7XG4gIHJldHVybiBvcmllbnRhdGlvbi50b1VwcGVyQ2FzZSgpO1xufTtcblxuY29tbWFuZHMuc2V0T3JpZW50YXRpb24gPSBhc3luYyBmdW5jdGlvbiAob3JpZW50YXRpb24pIHtcbiAgb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbi50b1VwcGVyQ2FzZSgpO1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcIm9yaWVudGF0aW9uXCIsIHtvcmllbnRhdGlvbn0pO1xufTtcblxuY29tbWFuZHMuZmFrZUZsaWNrID0gYXN5bmMgZnVuY3Rpb24gKHhTcGVlZCwgeVNwZWVkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdmbGljaycsIHt4U3BlZWQsIHlTcGVlZH0pO1xufTtcblxuY29tbWFuZHMuZmFrZUZsaWNrRWxlbWVudCA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQsIHhvZmZzZXQsIHlvZmZzZXQsIHNwZWVkKSB7XG4gIGxldCBwYXJhbXMgPSB7eG9mZnNldCwgeW9mZnNldCwgc3BlZWQsIGVsZW1lbnRJZH07XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdlbGVtZW50OmZsaWNrJywgcGFyYW1zKTtcbn07XG5cbmNvbW1hbmRzLnN3aXBlID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgdG91Y2hDb3VudCwgZWxJZCkge1xuICBpZiAoc3RhcnRYID09PSAnbnVsbCcpIHtcbiAgICBzdGFydFggPSAwLjU7XG4gIH1cbiAgaWYgKHN0YXJ0WSA9PT0gJ251bGwnKSB7XG4gICAgc3RhcnRZID0gMC41O1xuICB9XG4gIGxldCBzd2lwZU9wdHMgPSB7c3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFksXG4gICAgICAgICAgICAgICAgICAgc3RlcHM6IE1hdGgucm91bmQoZHVyYXRpb24gKiBzd2lwZVN0ZXBzUGVyU2VjKX07XG4gIC8vIGdvaW5nIHRoZSBsb25nIHdheSBhbmQgY2hlY2tpbmcgZm9yIHVuZGVmaW5lZCBhbmQgbnVsbCBzaW5jZVxuICAvLyB3ZSBjYW4ndCBiZSBhc3N1cmVkIGBlbElkYCBpcyBhIHN0cmluZyBhbmQgbm90IGFuIGludFxuICBpZiAodHlwZW9mIGVsSWQgIT09IFwidW5kZWZpbmVkXCIgJiYgZWxJZCAhPT0gbnVsbCkge1xuICAgIHN3aXBlT3B0cy5lbGVtZW50SWQgPSBlbElkO1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpzd2lwZVwiLCBzd2lwZU9wdHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwic3dpcGVcIiwgc3dpcGVPcHRzKTtcbiAgfVxufTtcblxuY29tbWFuZHMucGluY2hDbG9zZSA9IGFzeW5jIGZ1bmN0aW9uIChzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgZHVyYXRpb24sIHBlcmNlbnQsIHN0ZXBzLCBlbElkKSB7XG4gIGxldCBwaW5jaE9wdHMgPSB7XG4gICAgZGlyZWN0aW9uOiAnaW4nLFxuICAgIGVsZW1lbnRJZDogZWxJZCxcbiAgICBwZXJjZW50LFxuICAgIHN0ZXBzXG4gIH07XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpwaW5jaFwiLCBwaW5jaE9wdHMpO1xufTtcblxuY29tbWFuZHMucGluY2hPcGVuID0gYXN5bmMgZnVuY3Rpb24gKHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLCBkdXJhdGlvbiwgcGVyY2VudCwgc3RlcHMsIGVsSWQpIHtcbiAgbGV0IHBpbmNoT3B0cyA9IHtkaXJlY3Rpb246ICdvdXQnLCBlbGVtZW50SWQ6IGVsSWQsIHBlcmNlbnQsIHN0ZXBzfTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnBpbmNoXCIsIHBpbmNoT3B0cyk7XG59O1xuXG5jb21tYW5kcy5mbGljayA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50LCB4U3BlZWQsIHlTcGVlZCwgeE9mZnNldCwgeU9mZnNldCwgc3BlZWQpIHtcbiAgaWYgKGVsZW1lbnQpIHtcbiAgICBhd2FpdCB0aGlzLmZha2VGbGlja0VsZW1lbnQoZWxlbWVudCwgeE9mZnNldCwgeU9mZnNldCwgc3BlZWQpO1xuICB9IGVsc2Uge1xuICAgIGF3YWl0IHRoaXMuZmFrZUZsaWNrKHhTcGVlZCwgeVNwZWVkKTtcbiAgfVxufTtcblxuY29tbWFuZHMuZHJhZyA9IGFzeW5jIGZ1bmN0aW9uIChzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgZHVyYXRpb24sIHRvdWNoQ291bnQsIGVsZW1lbnRJZCwgZGVzdEVsSWQpIHtcbiAgbGV0IGRyYWdPcHRzID0ge2VsZW1lbnRJZCwgZGVzdEVsSWQsIHN0YXJ0WCwgc3RhcnRZLCBlbmRYLCBlbmRZLFxuICAgICAgICAgICAgICAgICAgc3RlcHM6IE1hdGgucm91bmQoZHVyYXRpb24gKiBkcmFnU3RlcHNQZXJTZWMpfTtcbiAgaWYgKGVsZW1lbnRJZCkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpkcmFnXCIsIGRyYWdPcHRzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImRyYWdcIiwgZHJhZ09wdHMpO1xuICB9XG59O1xuXG5jb21tYW5kcy5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5hZGIubG9jaygpO1xufTtcblxuY29tbWFuZHMuaXNMb2NrZWQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYi5pc1NjcmVlbkxvY2tlZCgpO1xufTtcblxuY29tbWFuZHMudW5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgYW5kcm9pZEhlbHBlcnMudW5sb2NrKHRoaXMuYWRiKTtcbn07XG5cbmNvbW1hbmRzLm9wZW5Ob3RpZmljYXRpb25zID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcIm9wZW5Ob3RpZmljYXRpb25cIik7XG59O1xuXG5jb21tYW5kcy5zZXRMb2NhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChsYXRpdHVkZSwgbG9uZ2l0dWRlKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmFkYi5zZW5kVGVsbmV0Q29tbWFuZChgZ2VvIGZpeCAke2xvbmdpdHVkZX0gJHtsYXRpdHVkZX1gKTtcbn07XG5cbmNvbW1hbmRzLnB1bGxGaWxlID0gYXN5bmMgZnVuY3Rpb24gKHJlbW90ZVBhdGgpIHtcbiAgbGV0IGxvY2FsRmlsZSA9IHRlbXAucGF0aCh7cHJlZml4OiAnYXBwaXVtJywgc3VmZml4OiAnLnRtcCd9KTtcbiAgYXdhaXQgdGhpcy5hZGIucHVsbChyZW1vdGVQYXRoLCBsb2NhbEZpbGUpO1xuICBsZXQgZGF0YSA9IGF3YWl0IGZzLnJlYWRGaWxlKGxvY2FsRmlsZSk7XG4gIGxldCBiNjRkYXRhID0gbmV3IEJ1ZmZlcihkYXRhKS50b1N0cmluZygnYmFzZTY0Jyk7XG4gIGlmIChhd2FpdCBmcy5leGlzdHMobG9jYWxGaWxlKSkge1xuICAgIGF3YWl0IGZzLnVubGluayhsb2NhbEZpbGUpO1xuICB9XG4gIHJldHVybiBiNjRkYXRhO1xufTtcblxuY29tbWFuZHMucHVzaEZpbGUgPSBhc3luYyBmdW5jdGlvbiAocmVtb3RlUGF0aCwgYmFzZTY0RGF0YSkge1xuICBsZXQgbG9jYWxGaWxlID0gdGVtcC5wYXRoKHtwcmVmaXg6ICdhcHBpdW0nLCBzdWZmaXg6ICcudG1wJ30pO1xuICBhd2FpdCBta2RpcnAocGF0aC5kaXJuYW1lKGxvY2FsRmlsZSkpO1xuICBsZXQgY29udGVudCA9IG5ldyBCdWZmZXIoYmFzZTY0RGF0YSwgJ2Jhc2U2NCcpO1xuICBsZXQgZmQgPSBhd2FpdCBmcy5vcGVuKGxvY2FsRmlsZSwgJ3cnKTtcbiAgYXdhaXQgZnMud3JpdGUoZmQsIGNvbnRlbnQsIDAsIGNvbnRlbnQubGVuZ3RoLCAwKTtcbiAgYXdhaXQgZnMuY2xvc2UoZmQpO1xuXG4gIC8vIGFkYiBwdXNoIGNyZWF0ZXMgZm9sZGVycyBhbmQgb3ZlcndyaXRlcyBleGlzdGluZyBmaWxlcy5cbiAgYXdhaXQgdGhpcy5hZGIucHVzaChsb2NhbEZpbGUsIHJlbW90ZVBhdGgpO1xuICBpZiAoYXdhaXQgZnMuZXhpc3RzKGxvY2FsRmlsZSkpIHtcbiAgICBhd2FpdCBmcy51bmxpbmsobG9jYWxGaWxlKTtcbiAgfVxufTtcblxuY29tbWFuZHMucHVsbEZvbGRlciA9IGFzeW5jIGZ1bmN0aW9uIChyZW1vdGVQYXRoKSB7XG4gIGxldCBsb2NhbEZvbGRlciA9IHRlbXAucGF0aCh7cHJlZml4OiAnYXBwaXVtJ30pO1xuICBhd2FpdCB0aGlzLmFkYi5wdWxsKHJlbW90ZVBhdGgsIGxvY2FsRm9sZGVyKTtcbiAgLy8gVE9ETzogZmluZCBhIGJldHRlciBhbHRlcm5hdGl2ZSB0byB0aGUgQWRtWmlwIG1vZHVsZVxuICBsZXQgemlwID0gbmV3IEFkbVppcCgpO1xuICB6aXAuYWRkTG9jYWxGb2xkZXIobG9jYWxGb2xkZXIpO1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHppcC50b0J1ZmZlcigoYnVmZmVyKSA9PiB7XG4gICAgICBsb2cuZGVidWcoJ0NvbnZlcnRpbmcgaW4tbWVtb3J5IHppcCBmaWxlIHRvIGJhc2U2NCBlbmNvZGVkIHN0cmluZycpO1xuICAgICAgcmVzb2x2ZShidWZmZXIudG9TdHJpbmcoJ2Jhc2U2NCcpKTtcbiAgICB9LCAoZXJyKSA9PiB7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb21tYW5kcy5nZXRTY3JlZW5zaG90ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQgbG9jYWxGaWxlID0gdGVtcC5wYXRoKHtwcmVmaXg6ICdhcHBpdW0nLCBzdWZmaXg6ICcucG5nJ30pO1xuICBjb25zdCBwbmcgPSAnL2RhdGEvbG9jYWwvdG1wL3NjcmVlbnNob3QucG5nJztcbiAgbGV0IGNtZCA9ICBbJy9zeXN0ZW0vYmluL3JtJywgYCR7cG5nfTtgLCAnL3N5c3RlbS9iaW4vc2NyZWVuY2FwJywgJy1wJywgcG5nXTtcbiAgYXdhaXQgdGhpcy5hZGIuc2hlbGwoY21kKTtcbiAgaWYgKGF3YWl0IGZzLmV4aXN0cyhsb2NhbEZpbGUpKSB7XG4gICAgYXdhaXQgZnMudW5saW5rKGxvY2FsRmlsZSk7XG4gIH1cbiAgYXdhaXQgdGhpcy5hZGIucHVsbChwbmcsIGxvY2FsRmlsZSk7XG4gIGxldCBkYXRhID0gYXdhaXQgZnMucmVhZEZpbGUobG9jYWxGaWxlKTtcbiAgbGV0IGI2NGRhdGEgPSBuZXcgQnVmZmVyKGRhdGEpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgYXdhaXQgZnMudW5saW5rKGxvY2FsRmlsZSk7XG4gIHJldHVybiBiNjRkYXRhO1xufTtcblxuXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzLCBoZWxwZXJzKTtcbmV4cG9ydCB7IGNvbW1hbmRzLCBoZWxwZXJzIH07XG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xuIl19