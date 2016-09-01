'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _appiumSupport = require('appium-support');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var commands = {},
    helpers = {},
    extensions = {};

var logTypesSupported = {
  'logcat': 'Logs for Android applications on real device and emulators via ADB'
};

commands.keys = function callee$0$0(keys) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // Protocol sends an array; rethink approach
        keys = _lodash2['default'].isArray(keys) ? keys.join('') : keys;
        params = {
          text: keys,
          replace: false
        };

        if (this.opts.unicodeKeyboard) {
          params.unicodeKeyboard = true;
        }
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('setText', params));

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getDeviceTime = function callee$0$0() {
  var out;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].info('Attempting to capture android device date and time');
        context$1$0.prev = 1;
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.shell(['date']));

      case 4:
        out = context$1$0.sent;
        return context$1$0.abrupt('return', out.trim());

      case 8:
        context$1$0.prev = 8;
        context$1$0.t0 = context$1$0['catch'](1);

        _logger2['default'].errorAndThrow('Could not capture device date and time: ' + context$1$0.t0);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[1, 8]]);
};

commands.getPageSource = function () {
  return this.bootstrap.sendAction('source');
};

commands.back = function () {
  return this.bootstrap.sendAction('pressBack');
};

commands.hideKeyboard = function callee$0$0() {
  var _ref, isKeyboardShown, canCloseKeyboard;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.isSoftKeyboardPresent());

      case 2:
        _ref = context$1$0.sent;
        isKeyboardShown = _ref.isKeyboardShown;
        canCloseKeyboard = _ref.canCloseKeyboard;

        if (isKeyboardShown) {
          context$1$0.next = 7;
          break;
        }

        throw new Error("Soft keyboard not present, cannot hide keyboard");

      case 7:
        if (!canCloseKeyboard) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return', this.back());

      case 11:
        _logger2['default'].info("Keyboard has no UI; no closing necessary");

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.openSettingsActivity = function callee$0$0(setting) {
  var _ref2, appPackage, appActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        _ref2 = context$1$0.sent;
        appPackage = _ref2.appPackage;
        appActivity = _ref2.appActivity;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.shell(['am', 'start', '-a', 'android.settings.' + setting]));

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.adb.waitForNotActivity(appPackage, appActivity, 5000));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getWindowSize = function () {
  return this.bootstrap.sendAction('getDeviceSize');
};

commands.getCurrentActivity = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        return context$1$0.abrupt('return', context$1$0.sent.appActivity);

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLogTypes = function () {
  return _lodash2['default'].keys(logTypesSupported);
};

commands.getLog = function (logType) {
  if (!_lodash2['default'].has(logTypesSupported, logType)) {
    throw new Error('Unsupported log type ' + logType + '. ' + ('Supported types are ' + JSON.stringify(logTypesSupported)));
  }

  if (logType === 'logcat') {
    return this.adb.getLogcatLogs();
  }
};

commands.isAppInstalled = function (appPackage) {
  return this.adb.isAppInstalled(appPackage);
};

commands.removeApp = function (appPackage) {
  return this.adb.uninstallApk(appPackage);
};

commands.installApp = function callee$0$0(appPath) {
  var _ref3, apkPackage;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(appPath));

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 4;
          break;
        }

        _logger2['default'].errorAndThrow('Could not find app apk at ' + appPath);

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.packageAndLaunchActivityFromManifest(appPath));

      case 6:
        _ref3 = context$1$0.sent;
        apkPackage = _ref3.apkPackage;
        return context$1$0.abrupt('return', _androidHelpers2['default'].installApkRemotely(this.adb, appPath, apkPackage, this.opts.fastReset));

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.background = function callee$0$0(seconds) {
  var _ref4, appPackage, appActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.getFocusedPackageAndActivity());

      case 2:
        _ref4 = context$1$0.sent;
        appPackage = _ref4.appPackage;
        appActivity = _ref4.appActivity;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(this.adb.goToHome());

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(seconds * 1000));

      case 9:
        return context$1$0.abrupt('return', this.adb.startApp({
          pkg: this.opts.appPackage,
          activity: this.opts.appActivity,
          action: this.opts.intentAction,
          category: this.opts.intentCategory,
          flags: this.opts.intentFlags,
          waitPkg: appPackage,
          waitActivity: appActivity,
          optionalIntentArguments: this.opts.optionalIntentArguments,
          stopApp: this.opts.stopAppOnReset || !this.opts.dontStopAppOnReset
        }));

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getStrings = function callee$0$0(language) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (language) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.getDeviceLanguage());

      case 3:
        language = context$1$0.sent;

        _logger2['default'].info('No language specified, returning strings for: ' + language);

      case 5:
        if (!this.apkStrings[language]) {
          context$1$0.next = 7;
          break;
        }

        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 7:
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].pushStrings(language, this.adb, this.opts));

      case 9:
        this.apkStrings[language] = context$1$0.sent;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction('updateStrings'));

      case 12:
        return context$1$0.abrupt('return', this.apkStrings[language]);

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.launchApp = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.initAUT());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.startAUT());

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.startActivity = function callee$0$0(appPackage, appActivity, appWaitPackage, appWaitActivity, intentAction, intentCategory, intentFlags, optionalIntentArguments, dontStopAppOnReset) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Starting package \'' + appPackage + '\' and activity \'' + appActivity + '\'');
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.adb.startApp({
          pkg: appPackage,
          activity: appActivity,
          waitPkg: appWaitPackage || appPackage,
          waitActivity: appWaitActivity || appActivity,
          action: intentAction,
          category: intentCategory,
          flags: intentFlags,
          optionalIntentArguments: optionalIntentArguments,
          stopApp: !dontStopAppOnReset
        }));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.reset = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.opts.fullReset) {
          context$1$0.next = 10;
          break;
        }

        _logger2['default'].info("Running old fashion reset (reinstall)");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.adb.stopAndClear(this.opts.appPackage));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

      case 6:
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_androidHelpers2['default'].installApkRemotely(this.adb, this.opts.app, this.opts.appPackage, this.opts.fastReset));

      case 8:
        context$1$0.next = 13;
        break;

      case 10:
        _logger2['default'].info("Running fast reset (stop and clear)");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(this.adb.stopAndClear(this.opts.appPackage));

      case 13:
        if (!this.isChromeSession) {
          context$1$0.next = 16;
          break;
        }

        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.chromedriver.restart());

      case 16:
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.startAUT());

      case 18:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 19:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.startAUT = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.startApp({
          pkg: this.opts.appPackage,
          activity: this.opts.appActivity,
          action: this.opts.intentAction,
          category: this.opts.intentCategory,
          flags: this.opts.intentFlags,
          waitPkg: this.opts.appWaitPackage,
          waitActivity: this.opts.appWaitActivity,
          optionalIntentArguments: this.opts.optionalIntentArguments,
          stopApp: this.opts.stopAppOnReset || !this.opts.dontStopAppOnReset
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// we override setUrl to take an android URI which can be used for deep-linking
// inside an app, similar to starting an intent
commands.setUrl = function callee$0$0(uri) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.startUri(uri, this.opts.appPackage));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// closing app using force stop
commands.closeApp = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.adb.forceStop(this.opts.appPackage));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// Return cached strings

// TODO: This is mutating the current language, but it's how appium currently works
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7OzhCQUNLLG9CQUFvQjs7Ozs2QkFDNUIsZ0JBQWdCOzt3QkFDckIsVUFBVTs7OztzQkFDUixXQUFXOzs7O0FBRTNCLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRWpELElBQU0saUJBQWlCLEdBQUc7QUFDeEIsVUFBUSxFQUFHLG9FQUFvRTtDQUNoRixDQUFDOztBQUVGLFFBQVEsQ0FBQyxJQUFJLEdBQUcsb0JBQWdCLElBQUk7TUFHOUIsTUFBTTs7Ozs7QUFEVixZQUFJLEdBQUcsb0JBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzFDLGNBQU0sR0FBRztBQUNYLGNBQUksRUFBRSxJQUFJO0FBQ1YsaUJBQU8sRUFBRSxLQUFLO1NBQ2Y7O0FBQ0QsWUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUM3QixnQkFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDL0I7O3lDQUNZLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7Ozs7Ozs7Ozs7Q0FDMUQsQ0FBQzs7QUFFRixRQUFRLENBQUMsYUFBYSxHQUFHO01BR2pCLEdBQUc7Ozs7QUFGVCw0QkFBSSxJQUFJLENBQUMsb0RBQW9ELENBQUMsQ0FBQzs7O3lDQUU3QyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFBcEMsV0FBRzs0Q0FDQSxHQUFHLENBQUMsSUFBSSxFQUFFOzs7Ozs7QUFFakIsNEJBQUksYUFBYSw2REFBa0QsQ0FBQzs7Ozs7OztDQUV2RSxDQUFDOztBQUVGLFFBQVEsQ0FBQyxh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QUFJLENBQUMsSUFBSSxDQUFDLGNBQWM7QUFDakMsc0JBQVksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWU7QUFDdkMsaUNBQXVCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUI7QUFDMUQsaUJBQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCO1NBQ25FLENBQUM7Ozs7Ozs7Q0FDSCxDQUFDOzs7O0FBSUYsUUFBUSxDQUFDLE1BQU0sR0FBRyxvQkFBZ0IsR0FBRzs7Ozs7eUNBQzdCLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztDQUNuRCxDQUFDOzs7QUFHRixRQUFRLENBQUMsUUFBUSxHQUFHOzs7Ozt5Q0FDWixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztDQUMvQyxDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2dlbmVyYWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGFuZHJvaWRIZWxwZXJzIGZyb20gJy4uL2FuZHJvaWQtaGVscGVycyc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCBCIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBsb2cgZnJvbSAnLi4vbG9nZ2VyJztcblxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xuXG5jb25zdCBsb2dUeXBlc1N1cHBvcnRlZCA9IHtcbiAgJ2xvZ2NhdCcgOiAnTG9ncyBmb3IgQW5kcm9pZCBhcHBsaWNhdGlvbnMgb24gcmVhbCBkZXZpY2UgYW5kIGVtdWxhdG9ycyB2aWEgQURCJ1xufTtcblxuY29tbWFuZHMua2V5cyA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzKSB7XG4gIC8vIFByb3RvY29sIHNlbmRzIGFuIGFycmF5OyByZXRoaW5rIGFwcHJvYWNoXG4gIGtleXMgPSBfLmlzQXJyYXkoa2V5cykgPyBrZXlzLmpvaW4oJycpIDoga2V5cztcbiAgbGV0IHBhcmFtcyA9IHtcbiAgICB0ZXh0OiBrZXlzLFxuICAgIHJlcGxhY2U6IGZhbHNlXG4gIH07XG4gIGlmICh0aGlzLm9wdHMudW5pY29kZUtleWJvYXJkKSB7XG4gICAgcGFyYW1zLnVuaWNvZGVLZXlib2FyZCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ3NldFRleHQnLCBwYXJhbXMpO1xufTtcblxuY29tbWFuZHMuZ2V0RGV2aWNlVGltZSA9IGFzeW5jIGZ1bmN0aW9uKCkge1xuICBsb2cuaW5mbygnQXR0ZW1wdGluZyB0byBjYXB0dXJlIGFuZHJvaWQgZGV2aWNlIGRhdGUgYW5kIHRpbWUnKTtcbiAgdHJ5IHtcbiAgICBsZXQgb3V0ID0gYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydkYXRlJ10pO1xuICAgIHJldHVybiBvdXQudHJpbSgpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGNhcHR1cmUgZGV2aWNlIGRhdGUgYW5kIHRpbWU6ICR7ZXJyfWApO1xuICB9XG59O1xuXG5jb21tYW5kcy5nZXRQYWdlU291cmNlID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbignc291cmNlJyk7XG59O1xuXG5jb21tYW5kcy5iYWNrID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbigncHJlc3NCYWNrJyk7XG59O1xuXG5jb21tYW5kcy5oaWRlS2V5Ym9hcmQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCB7aXNLZXlib2FyZFNob3duLCBjYW5DbG9zZUtleWJvYXJkfSA9IGF3YWl0IHRoaXMuYWRiLmlzU29mdEtleWJvYXJkUHJlc2VudCgpO1xuICBpZiAoIWlzS2V5Ym9hcmRTaG93bikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlNvZnQga2V5Ym9hcmQgbm90IHByZXNlbnQsIGNhbm5vdCBoaWRlIGtleWJvYXJkXCIpO1xuICB9XG5cbiAgaWYgKGNhbkNsb3NlS2V5Ym9hcmQpIHtcbiAgICByZXR1cm4gdGhpcy5iYWNrKCk7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmluZm8oXCJLZXlib2FyZCBoYXMgbm8gVUk7IG5vIGNsb3NpbmcgbmVjZXNzYXJ5XCIpO1xuICB9XG59O1xuXG5jb21tYW5kcy5vcGVuU2V0dGluZ3NBY3Rpdml0eSA9IGFzeW5jIGZ1bmN0aW9uIChzZXR0aW5nKSB7XG4gIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgdGhpcy5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICBhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ2FtJywgJ3N0YXJ0JywgJy1hJywgYGFuZHJvaWQuc2V0dGluZ3MuJHtzZXR0aW5nfWBdKTtcbiAgYXdhaXQgdGhpcy5hZGIud2FpdEZvck5vdEFjdGl2aXR5KGFwcFBhY2thZ2UsIGFwcEFjdGl2aXR5LCA1MDAwKTtcbn07XG5cbmNvbW1hbmRzLmdldFdpbmRvd1NpemUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdnZXREZXZpY2VTaXplJyk7XG59O1xuXG5jb21tYW5kcy5nZXRDdXJyZW50QWN0aXZpdHkgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAoYXdhaXQgdGhpcy5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpKS5hcHBBY3Rpdml0eTtcbn07XG5cbmNvbW1hbmRzLmdldExvZ1R5cGVzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gXy5rZXlzKGxvZ1R5cGVzU3VwcG9ydGVkKTtcbn07XG5cbmNvbW1hbmRzLmdldExvZyA9IGZ1bmN0aW9uIChsb2dUeXBlKSB7XG4gIGlmICghXy5oYXMobG9nVHlwZXNTdXBwb3J0ZWQsIGxvZ1R5cGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBsb2cgdHlwZSAke2xvZ1R5cGV9LiBgICtcbiAgICAgICAgICAgICAgICAgICAgYFN1cHBvcnRlZCB0eXBlcyBhcmUgJHtKU09OLnN0cmluZ2lmeShsb2dUeXBlc1N1cHBvcnRlZCl9YCk7XG4gIH1cblxuICBpZiAobG9nVHlwZSA9PT0gJ2xvZ2NhdCcpIHtcbiAgICByZXR1cm4gdGhpcy5hZGIuZ2V0TG9nY2F0TG9ncygpO1xuICB9XG59O1xuXG5jb21tYW5kcy5pc0FwcEluc3RhbGxlZCA9IGZ1bmN0aW9uIChhcHBQYWNrYWdlKSB7XG4gIHJldHVybiB0aGlzLmFkYi5pc0FwcEluc3RhbGxlZChhcHBQYWNrYWdlKTtcbn07XG5cbmNvbW1hbmRzLnJlbW92ZUFwcCA9IGZ1bmN0aW9uIChhcHBQYWNrYWdlKSB7XG4gIHJldHVybiB0aGlzLmFkYi51bmluc3RhbGxBcGsoYXBwUGFja2FnZSk7XG59O1xuXG5jb21tYW5kcy5pbnN0YWxsQXBwID0gYXN5bmMgZnVuY3Rpb24gKGFwcFBhdGgpIHtcbiAgaWYgKCEoYXdhaXQgZnMuZXhpc3RzKGFwcFBhdGgpKSkge1xuICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCBhcHAgYXBrIGF0ICR7YXBwUGF0aH1gKTtcbiAgfVxuXG4gIGxldCB7YXBrUGFja2FnZX0gPSBhd2FpdCB0aGlzLmFkYi5wYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QoYXBwUGF0aCk7XG4gIHJldHVybiBhbmRyb2lkSGVscGVycy5pbnN0YWxsQXBrUmVtb3RlbHkodGhpcy5hZGIsIGFwcFBhdGgsIGFwa1BhY2thZ2UsIHRoaXMub3B0cy5mYXN0UmVzZXQpO1xufTtcblxuY29tbWFuZHMuYmFja2dyb3VuZCA9IGFzeW5jIGZ1bmN0aW9uIChzZWNvbmRzKSB7XG4gIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgdGhpcy5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICBhd2FpdCB0aGlzLmFkYi5nb1RvSG9tZSgpO1xuICBhd2FpdCBCLmRlbGF5KHNlY29uZHMgKiAxMDAwKTtcbiAgcmV0dXJuIHRoaXMuYWRiLnN0YXJ0QXBwKHtcbiAgICBwa2c6IHRoaXMub3B0cy5hcHBQYWNrYWdlLFxuICAgIGFjdGl2aXR5OiB0aGlzLm9wdHMuYXBwQWN0aXZpdHksXG4gICAgYWN0aW9uOiB0aGlzLm9wdHMuaW50ZW50QWN0aW9uLFxuICAgIGNhdGVnb3J5OiB0aGlzLm9wdHMuaW50ZW50Q2F0ZWdvcnksXG4gICAgZmxhZ3M6IHRoaXMub3B0cy5pbnRlbnRGbGFncyxcbiAgICB3YWl0UGtnOiBhcHBQYWNrYWdlLFxuICAgIHdhaXRBY3Rpdml0eTogYXBwQWN0aXZpdHksXG4gICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHM6IHRoaXMub3B0cy5vcHRpb25hbEludGVudEFyZ3VtZW50cyxcbiAgICBzdG9wQXBwOiB0aGlzLm9wdHMuc3RvcEFwcE9uUmVzZXQgfHwgIXRoaXMub3B0cy5kb250U3RvcEFwcE9uUmVzZXQsXG4gIH0pO1xufTtcblxuY29tbWFuZHMuZ2V0U3RyaW5ncyA9IGFzeW5jIGZ1bmN0aW9uIChsYW5ndWFnZSkge1xuICBpZiAoIWxhbmd1YWdlKSB7XG4gICAgbGFuZ3VhZ2UgPSBhd2FpdCB0aGlzLmFkYi5nZXREZXZpY2VMYW5ndWFnZSgpO1xuICAgIGxvZy5pbmZvKGBObyBsYW5ndWFnZSBzcGVjaWZpZWQsIHJldHVybmluZyBzdHJpbmdzIGZvcjogJHtsYW5ndWFnZX1gKTtcbiAgfVxuXG4gIGlmICh0aGlzLmFwa1N0cmluZ3NbbGFuZ3VhZ2VdKSB7XG4gICAgLy8gUmV0dXJuIGNhY2hlZCBzdHJpbmdzXG4gICAgcmV0dXJuIHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV07XG4gIH1cblxuICAvLyBUT0RPOiBUaGlzIGlzIG11dGF0aW5nIHRoZSBjdXJyZW50IGxhbmd1YWdlLCBidXQgaXQncyBob3cgYXBwaXVtIGN1cnJlbnRseSB3b3Jrc1xuICB0aGlzLmFwa1N0cmluZ3NbbGFuZ3VhZ2VdID0gYXdhaXQgYW5kcm9pZEhlbHBlcnMucHVzaFN0cmluZ3MobGFuZ3VhZ2UsIHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xuICBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCd1cGRhdGVTdHJpbmdzJyk7XG5cbiAgcmV0dXJuIHRoaXMuYXBrU3RyaW5nc1tsYW5ndWFnZV07XG59O1xuXG5jb21tYW5kcy5sYXVuY2hBcHAgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGF3YWl0IHRoaXMuaW5pdEFVVCgpO1xuICBhd2FpdCB0aGlzLnN0YXJ0QVVUKCk7XG59O1xuXG5jb21tYW5kcy5zdGFydEFjdGl2aXR5ID0gYXN5bmMgZnVuY3Rpb24gKGFwcFBhY2thZ2UsIGFwcEFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBXYWl0UGFja2FnZSwgYXBwV2FpdEFjdGl2aXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnRBY3Rpb24sIGludGVudENhdGVnb3J5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnRlbnRGbGFncywgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbnRTdG9wQXBwT25SZXNldCkge1xuICBsb2cuZGVidWcoYFN0YXJ0aW5nIHBhY2thZ2UgJyR7YXBwUGFja2FnZX0nIGFuZCBhY3Rpdml0eSAnJHthcHBBY3Rpdml0eX0nYCk7XG4gIGF3YWl0IHRoaXMuYWRiLnN0YXJ0QXBwKHtcbiAgICBwa2c6IGFwcFBhY2thZ2UsXG4gICAgYWN0aXZpdHk6IGFwcEFjdGl2aXR5LFxuICAgIHdhaXRQa2c6IGFwcFdhaXRQYWNrYWdlIHx8IGFwcFBhY2thZ2UsXG4gICAgd2FpdEFjdGl2aXR5OiBhcHBXYWl0QWN0aXZpdHkgfHwgYXBwQWN0aXZpdHksXG4gICAgYWN0aW9uOiBpbnRlbnRBY3Rpb24sXG4gICAgY2F0ZWdvcnk6IGludGVudENhdGVnb3J5LFxuICAgIGZsYWdzOiBpbnRlbnRGbGFncyxcbiAgICBvcHRpb25hbEludGVudEFyZ3VtZW50cyxcbiAgICBzdG9wQXBwOiAhZG9udFN0b3BBcHBPblJlc2V0XG4gIH0pO1xufTtcblxuY29tbWFuZHMucmVzZXQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGlmICh0aGlzLm9wdHMuZnVsbFJlc2V0KSB7XG4gICAgbG9nLmluZm8oXCJSdW5uaW5nIG9sZCBmYXNoaW9uIHJlc2V0IChyZWluc3RhbGwpXCIpO1xuICAgIGF3YWl0IHRoaXMuYWRiLnN0b3BBbmRDbGVhcih0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG4gICAgYXdhaXQgdGhpcy5hZGIudW5pbnN0YWxsQXBrKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbiAgICBhd2FpdCBhbmRyb2lkSGVscGVycy5pbnN0YWxsQXBrUmVtb3RlbHkodGhpcy5hZGIsIHRoaXMub3B0cy5hcHAsIHRoaXMub3B0cy5hcHBQYWNrYWdlLCB0aGlzLm9wdHMuZmFzdFJlc2V0KTtcbiAgfSBlbHNlIHtcbiAgICBsb2cuaW5mbyhcIlJ1bm5pbmcgZmFzdCByZXNldCAoc3RvcCBhbmQgY2xlYXIpXCIpO1xuICAgIGF3YWl0IHRoaXMuYWRiLnN0b3BBbmRDbGVhcih0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG4gIH1cbiAgaWYgKHRoaXMuaXNDaHJvbWVTZXNzaW9uKSB7XG4gICAgYXdhaXQgdGhpcy5jaHJvbWVkcml2ZXIucmVzdGFydCgpO1xuICB9XG4gIHJldHVybiBhd2FpdCB0aGlzLnN0YXJ0QVVUKCk7XG59O1xuXG5jb21tYW5kcy5zdGFydEFVVCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgYXdhaXQgdGhpcy5hZGIuc3RhcnRBcHAoe1xuICAgIHBrZzogdGhpcy5vcHRzLmFwcFBhY2thZ2UsXG4gICAgYWN0aXZpdHk6IHRoaXMub3B0cy5hcHBBY3Rpdml0eSxcbiAgICBhY3Rpb246IHRoaXMub3B0cy5pbnRlbnRBY3Rpb24sXG4gICAgY2F0ZWdvcnk6IHRoaXMub3B0cy5pbnRlbnRDYXRlZ29yeSxcbiAgICBmbGFnczogdGhpcy5vcHRzLmludGVudEZsYWdzLFxuICAgIHdhaXRQa2c6IHRoaXMub3B0cy5hcHBXYWl0UGFja2FnZSxcbiAgICB3YWl0QWN0aXZpdHk6IHRoaXMub3B0cy5hcHBXYWl0QWN0aXZpdHksXG4gICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHM6IHRoaXMub3B0cy5vcHRpb25hbEludGVudEFyZ3VtZW50cyxcbiAgICBzdG9wQXBwOiB0aGlzLm9wdHMuc3RvcEFwcE9uUmVzZXQgfHwgIXRoaXMub3B0cy5kb250U3RvcEFwcE9uUmVzZXQsXG4gIH0pO1xufTtcblxuLy8gd2Ugb3ZlcnJpZGUgc2V0VXJsIHRvIHRha2UgYW4gYW5kcm9pZCBVUkkgd2hpY2ggY2FuIGJlIHVzZWQgZm9yIGRlZXAtbGlua2luZ1xuLy8gaW5zaWRlIGFuIGFwcCwgc2ltaWxhciB0byBzdGFydGluZyBhbiBpbnRlbnRcbmNvbW1hbmRzLnNldFVybCA9IGFzeW5jIGZ1bmN0aW9uICh1cmkpIHtcbiAgYXdhaXQgdGhpcy5hZGIuc3RhcnRVcmkodXJpLCB0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG59O1xuXG4vLyBjbG9zaW5nIGFwcCB1c2luZyBmb3JjZSBzdG9wXG5jb21tYW5kcy5jbG9zZUFwcCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgYXdhaXQgdGhpcy5hZGIuZm9yY2VTdG9wKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbn07XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMgfTtcbmV4cG9ydCBkZWZhdWx0IGV4dGVuc2lvbnM7XG4iXX0=