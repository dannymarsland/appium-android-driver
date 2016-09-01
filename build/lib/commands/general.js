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
        if (!this.chromedriver) {
          context$1$0.next = 21;
          break;
        }

        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(this.startAUT());

      case 16:
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(this.chromedriver.restart());

      case 18:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 21:
        context$1$0.next = 23;
        return _regeneratorRuntime.awrap(this.startAUT());

      case 23:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 24:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7OzhCQUNLLG9CQUFvQjs7Ozs2QkFDNUIsZ0JBQWdCOzt3QkFDckIsVUFBVTs7OztzQkFDUixXQUFXOzs7O0FBRTNCLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRWpELElBQU0saUJBQWlCLEdBQUc7QUFDeEIsVUFBUSxFQUFHLG9FQUFvRTtDQUNoRixDQUFDOztBQUVGLFFBQVEsQ0FBQyxJQUFJLEdBQUcsb0JBQWdCLElBQUk7TUFHOUIsTUFBTTs7Ozs7QUFEVixZQUFJLEdBQUcsb0JBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0FBQzFDLGNBQU0sR0FBRztBQUNYLGNBQUksRUFBRSxJQUFJO0FBQ1YsaUJBQU8sRUFBRSxLQUFLO1NBQ2Y7O0FBQ0QsWUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUM3QixnQkFBTSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDL0I7O3lDQUNZLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUM7Ozs7Ozs7Ozs7Q0FDMUQsQ0FBQzs7QUFFRixRQUFRLENBQUMsYUFBYSxHQUFHO01BR2pCLEdBQUc7Ozs7QUFGVCw0QkFBSSxJQUFJLENBQUMsb0RBQW9ELENBQUMsQ0FBQzs7O3lDQUU3QyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFBcEMsV0FBRzs0Q0FDQSxHQUFHLENBQUMsSUFBSSxFQUFFOzs7Ozs7QUFFakIsNEJBQUksYUFBYSw2REFBa0QsQ0FBQzs7Ozs7OztDQUV2RSxDQUFDOztBQUVGLFFBQVEsQ0FBQyxh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QUksQ0FBQyxXQUFXO0FBQzVCLGlCQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjO0FBQ2pDLHNCQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlO0FBQ3ZDLGlDQUF1QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCO0FBQzFELGlCQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQjtTQUNuRSxDQUFDOzs7Ozs7O0NBQ0gsQ0FBQzs7OztBQUlGLFFBQVEsQ0FBQyxNQUFNLEdBQUcsb0JBQWdCLEdBQUc7Ozs7O3lDQUM3QixJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7Q0FDbkQsQ0FBQzs7O0FBR0YsUUFBUSxDQUFDLFFBQVEsR0FBRzs7Ozs7eUNBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7Q0FDL0MsQ0FBQzs7QUFFRixlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztxQkFDWCxVQUFVIiwiZmlsZSI6ImxpYi9jb21tYW5kcy9nZW5lcmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBhbmRyb2lkSGVscGVycyBmcm9tICcuLi9hbmRyb2lkLWhlbHBlcnMnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgbG9nIGZyb20gJy4uL2xvZ2dlcic7XG5cbmxldCBjb21tYW5kcyA9IHt9LCBoZWxwZXJzID0ge30sIGV4dGVuc2lvbnMgPSB7fTtcblxuY29uc3QgbG9nVHlwZXNTdXBwb3J0ZWQgPSB7XG4gICdsb2djYXQnIDogJ0xvZ3MgZm9yIEFuZHJvaWQgYXBwbGljYXRpb25zIG9uIHJlYWwgZGV2aWNlIGFuZCBlbXVsYXRvcnMgdmlhIEFEQidcbn07XG5cbmNvbW1hbmRzLmtleXMgPSBhc3luYyBmdW5jdGlvbiAoa2V5cykge1xuICAvLyBQcm90b2NvbCBzZW5kcyBhbiBhcnJheTsgcmV0aGluayBhcHByb2FjaFxuICBrZXlzID0gXy5pc0FycmF5KGtleXMpID8ga2V5cy5qb2luKCcnKSA6IGtleXM7XG4gIGxldCBwYXJhbXMgPSB7XG4gICAgdGV4dDoga2V5cyxcbiAgICByZXBsYWNlOiBmYWxzZVxuICB9O1xuICBpZiAodGhpcy5vcHRzLnVuaWNvZGVLZXlib2FyZCkge1xuICAgIHBhcmFtcy51bmljb2RlS2V5Ym9hcmQgPSB0cnVlO1xuICB9XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKCdzZXRUZXh0JywgcGFyYW1zKTtcbn07XG5cbmNvbW1hbmRzLmdldERldmljZVRpbWUgPSBhc3luYyBmdW5jdGlvbigpIHtcbiAgbG9nLmluZm8oJ0F0dGVtcHRpbmcgdG8gY2FwdHVyZSBhbmRyb2lkIGRldmljZSBkYXRlIGFuZCB0aW1lJyk7XG4gIHRyeSB7XG4gICAgbGV0IG91dCA9IGF3YWl0IHRoaXMuYWRiLnNoZWxsKFsnZGF0ZSddKTtcbiAgICByZXR1cm4gb3V0LnRyaW0oKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBjYXB0dXJlIGRldmljZSBkYXRlIGFuZCB0aW1lOiAke2Vycn1gKTtcbiAgfVxufTtcblxuY29tbWFuZHMuZ2V0UGFnZVNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ3NvdXJjZScpO1xufTtcblxuY29tbWFuZHMuYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ3ByZXNzQmFjaycpO1xufTtcblxuY29tbWFuZHMuaGlkZUtleWJvYXJkID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBsZXQge2lzS2V5Ym9hcmRTaG93biwgY2FuQ2xvc2VLZXlib2FyZH0gPSBhd2FpdCB0aGlzLmFkYi5pc1NvZnRLZXlib2FyZFByZXNlbnQoKTtcbiAgaWYgKCFpc0tleWJvYXJkU2hvd24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJTb2Z0IGtleWJvYXJkIG5vdCBwcmVzZW50LCBjYW5ub3QgaGlkZSBrZXlib2FyZFwiKTtcbiAgfVxuXG4gIGlmIChjYW5DbG9zZUtleWJvYXJkKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFjaygpO1xuICB9IGVsc2Uge1xuICAgIGxvZy5pbmZvKFwiS2V5Ym9hcmQgaGFzIG5vIFVJOyBubyBjbG9zaW5nIG5lY2Vzc2FyeVwiKTtcbiAgfVxufTtcblxuY29tbWFuZHMub3BlblNldHRpbmdzQWN0aXZpdHkgPSBhc3luYyBmdW5jdGlvbiAoc2V0dGluZykge1xuICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IHRoaXMuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydhbScsICdzdGFydCcsICctYScsIGBhbmRyb2lkLnNldHRpbmdzLiR7c2V0dGluZ31gXSk7XG4gIGF3YWl0IHRoaXMuYWRiLndhaXRGb3JOb3RBY3Rpdml0eShhcHBQYWNrYWdlLCBhcHBBY3Rpdml0eSwgNTAwMCk7XG59O1xuXG5jb21tYW5kcy5nZXRXaW5kb3dTaXplID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbignZ2V0RGV2aWNlU2l6ZScpO1xufTtcblxuY29tbWFuZHMuZ2V0Q3VycmVudEFjdGl2aXR5ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gKGF3YWl0IHRoaXMuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKSkuYXBwQWN0aXZpdHk7XG59O1xuXG5jb21tYW5kcy5nZXRMb2dUeXBlcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIF8ua2V5cyhsb2dUeXBlc1N1cHBvcnRlZCk7XG59O1xuXG5jb21tYW5kcy5nZXRMb2cgPSBmdW5jdGlvbiAobG9nVHlwZSkge1xuICBpZiAoIV8uaGFzKGxvZ1R5cGVzU3VwcG9ydGVkLCBsb2dUeXBlKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgbG9nIHR5cGUgJHtsb2dUeXBlfS4gYCArXG4gICAgICAgICAgICAgICAgICAgIGBTdXBwb3J0ZWQgdHlwZXMgYXJlICR7SlNPTi5zdHJpbmdpZnkobG9nVHlwZXNTdXBwb3J0ZWQpfWApO1xuICB9XG5cbiAgaWYgKGxvZ1R5cGUgPT09ICdsb2djYXQnKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRiLmdldExvZ2NhdExvZ3MoKTtcbiAgfVxufTtcblxuY29tbWFuZHMuaXNBcHBJbnN0YWxsZWQgPSBmdW5jdGlvbiAoYXBwUGFja2FnZSkge1xuICByZXR1cm4gdGhpcy5hZGIuaXNBcHBJbnN0YWxsZWQoYXBwUGFja2FnZSk7XG59O1xuXG5jb21tYW5kcy5yZW1vdmVBcHAgPSBmdW5jdGlvbiAoYXBwUGFja2FnZSkge1xuICByZXR1cm4gdGhpcy5hZGIudW5pbnN0YWxsQXBrKGFwcFBhY2thZ2UpO1xufTtcblxuY29tbWFuZHMuaW5zdGFsbEFwcCA9IGFzeW5jIGZ1bmN0aW9uIChhcHBQYXRoKSB7XG4gIGlmICghKGF3YWl0IGZzLmV4aXN0cyhhcHBQYXRoKSkpIHtcbiAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGZpbmQgYXBwIGFwayBhdCAke2FwcFBhdGh9YCk7XG4gIH1cblxuICBsZXQge2Fwa1BhY2thZ2V9ID0gYXdhaXQgdGhpcy5hZGIucGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0KGFwcFBhdGgpO1xuICByZXR1cm4gYW5kcm9pZEhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KHRoaXMuYWRiLCBhcHBQYXRoLCBhcGtQYWNrYWdlLCB0aGlzLm9wdHMuZmFzdFJlc2V0KTtcbn07XG5cbmNvbW1hbmRzLmJhY2tncm91bmQgPSBhc3luYyBmdW5jdGlvbiAoc2Vjb25kcykge1xuICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IHRoaXMuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgYXdhaXQgdGhpcy5hZGIuZ29Ub0hvbWUoKTtcbiAgYXdhaXQgQi5kZWxheShzZWNvbmRzICogMTAwMCk7XG4gIHJldHVybiB0aGlzLmFkYi5zdGFydEFwcCh7XG4gICAgcGtnOiB0aGlzLm9wdHMuYXBwUGFja2FnZSxcbiAgICBhY3Rpdml0eTogdGhpcy5vcHRzLmFwcEFjdGl2aXR5LFxuICAgIGFjdGlvbjogdGhpcy5vcHRzLmludGVudEFjdGlvbixcbiAgICBjYXRlZ29yeTogdGhpcy5vcHRzLmludGVudENhdGVnb3J5LFxuICAgIGZsYWdzOiB0aGlzLm9wdHMuaW50ZW50RmxhZ3MsXG4gICAgd2FpdFBrZzogYXBwUGFja2FnZSxcbiAgICB3YWl0QWN0aXZpdHk6IGFwcEFjdGl2aXR5LFxuICAgIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzOiB0aGlzLm9wdHMub3B0aW9uYWxJbnRlbnRBcmd1bWVudHMsXG4gICAgc3RvcEFwcDogdGhpcy5vcHRzLnN0b3BBcHBPblJlc2V0IHx8ICF0aGlzLm9wdHMuZG9udFN0b3BBcHBPblJlc2V0LFxuICB9KTtcbn07XG5cbmNvbW1hbmRzLmdldFN0cmluZ3MgPSBhc3luYyBmdW5jdGlvbiAobGFuZ3VhZ2UpIHtcbiAgaWYgKCFsYW5ndWFnZSkge1xuICAgIGxhbmd1YWdlID0gYXdhaXQgdGhpcy5hZGIuZ2V0RGV2aWNlTGFuZ3VhZ2UoKTtcbiAgICBsb2cuaW5mbyhgTm8gbGFuZ3VhZ2Ugc3BlY2lmaWVkLCByZXR1cm5pbmcgc3RyaW5ncyBmb3I6ICR7bGFuZ3VhZ2V9YCk7XG4gIH1cblxuICBpZiAodGhpcy5hcGtTdHJpbmdzW2xhbmd1YWdlXSkge1xuICAgIC8vIFJldHVybiBjYWNoZWQgc3RyaW5nc1xuICAgIHJldHVybiB0aGlzLmFwa1N0cmluZ3NbbGFuZ3VhZ2VdO1xuICB9XG5cbiAgLy8gVE9ETzogVGhpcyBpcyBtdXRhdGluZyB0aGUgY3VycmVudCBsYW5ndWFnZSwgYnV0IGl0J3MgaG93IGFwcGl1bSBjdXJyZW50bHkgd29ya3NcbiAgdGhpcy5hcGtTdHJpbmdzW2xhbmd1YWdlXSA9IGF3YWl0IGFuZHJvaWRIZWxwZXJzLnB1c2hTdHJpbmdzKGxhbmd1YWdlLCB0aGlzLmFkYiwgdGhpcy5vcHRzKTtcbiAgYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbigndXBkYXRlU3RyaW5ncycpO1xuXG4gIHJldHVybiB0aGlzLmFwa1N0cmluZ3NbbGFuZ3VhZ2VdO1xufTtcblxuY29tbWFuZHMubGF1bmNoQXBwID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCB0aGlzLmluaXRBVVQoKTtcbiAgYXdhaXQgdGhpcy5zdGFydEFVVCgpO1xufTtcblxuY29tbWFuZHMuc3RhcnRBY3Rpdml0eSA9IGFzeW5jIGZ1bmN0aW9uIChhcHBQYWNrYWdlLCBhcHBBY3Rpdml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwV2FpdFBhY2thZ2UsIGFwcFdhaXRBY3Rpdml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50QWN0aW9uLCBpbnRlbnRDYXRlZ29yeSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW50ZW50RmxhZ3MsIG9wdGlvbmFsSW50ZW50QXJndW1lbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb250U3RvcEFwcE9uUmVzZXQpIHtcbiAgbG9nLmRlYnVnKGBTdGFydGluZyBwYWNrYWdlICcke2FwcFBhY2thZ2V9JyBhbmQgYWN0aXZpdHkgJyR7YXBwQWN0aXZpdHl9J2ApO1xuICBhd2FpdCB0aGlzLmFkYi5zdGFydEFwcCh7XG4gICAgcGtnOiBhcHBQYWNrYWdlLFxuICAgIGFjdGl2aXR5OiBhcHBBY3Rpdml0eSxcbiAgICB3YWl0UGtnOiBhcHBXYWl0UGFja2FnZSB8fCBhcHBQYWNrYWdlLFxuICAgIHdhaXRBY3Rpdml0eTogYXBwV2FpdEFjdGl2aXR5IHx8IGFwcEFjdGl2aXR5LFxuICAgIGFjdGlvbjogaW50ZW50QWN0aW9uLFxuICAgIGNhdGVnb3J5OiBpbnRlbnRDYXRlZ29yeSxcbiAgICBmbGFnczogaW50ZW50RmxhZ3MsXG4gICAgb3B0aW9uYWxJbnRlbnRBcmd1bWVudHMsXG4gICAgc3RvcEFwcDogIWRvbnRTdG9wQXBwT25SZXNldFxuICB9KTtcbn07XG5cbmNvbW1hbmRzLnJlc2V0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBpZiAodGhpcy5vcHRzLmZ1bGxSZXNldCkge1xuICAgIGxvZy5pbmZvKFwiUnVubmluZyBvbGQgZmFzaGlvbiByZXNldCAocmVpbnN0YWxsKVwiKTtcbiAgICBhd2FpdCB0aGlzLmFkYi5zdG9wQW5kQ2xlYXIodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgIGF3YWl0IHRoaXMuYWRiLnVuaW5zdGFsbEFwayh0aGlzLm9wdHMuYXBwUGFja2FnZSk7XG4gICAgYXdhaXQgYW5kcm9pZEhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KHRoaXMuYWRiLCB0aGlzLm9wdHMuYXBwLCB0aGlzLm9wdHMuYXBwUGFja2FnZSwgdGhpcy5vcHRzLmZhc3RSZXNldCk7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmluZm8oXCJSdW5uaW5nIGZhc3QgcmVzZXQgKHN0b3AgYW5kIGNsZWFyKVwiKTtcbiAgICBhd2FpdCB0aGlzLmFkYi5zdG9wQW5kQ2xlYXIodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICB9XG4gIGlmICh0aGlzLmNocm9tZWRyaXZlcikge1xuICAgIGF3YWl0IHRoaXMuc3RhcnRBVVQoKTtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5jaHJvbWVkcml2ZXIucmVzdGFydCgpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnN0YXJ0QVVUKCk7XG4gIH1cbn07XG5cbmNvbW1hbmRzLnN0YXJ0QVVUID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCB0aGlzLmFkYi5zdGFydEFwcCh7XG4gICAgcGtnOiB0aGlzLm9wdHMuYXBwUGFja2FnZSxcbiAgICBhY3Rpdml0eTogdGhpcy5vcHRzLmFwcEFjdGl2aXR5LFxuICAgIGFjdGlvbjogdGhpcy5vcHRzLmludGVudEFjdGlvbixcbiAgICBjYXRlZ29yeTogdGhpcy5vcHRzLmludGVudENhdGVnb3J5LFxuICAgIGZsYWdzOiB0aGlzLm9wdHMuaW50ZW50RmxhZ3MsXG4gICAgd2FpdFBrZzogdGhpcy5vcHRzLmFwcFdhaXRQYWNrYWdlLFxuICAgIHdhaXRBY3Rpdml0eTogdGhpcy5vcHRzLmFwcFdhaXRBY3Rpdml0eSxcbiAgICBvcHRpb25hbEludGVudEFyZ3VtZW50czogdGhpcy5vcHRzLm9wdGlvbmFsSW50ZW50QXJndW1lbnRzLFxuICAgIHN0b3BBcHA6IHRoaXMub3B0cy5zdG9wQXBwT25SZXNldCB8fCAhdGhpcy5vcHRzLmRvbnRTdG9wQXBwT25SZXNldCxcbiAgfSk7XG59O1xuXG4vLyB3ZSBvdmVycmlkZSBzZXRVcmwgdG8gdGFrZSBhbiBhbmRyb2lkIFVSSSB3aGljaCBjYW4gYmUgdXNlZCBmb3IgZGVlcC1saW5raW5nXG4vLyBpbnNpZGUgYW4gYXBwLCBzaW1pbGFyIHRvIHN0YXJ0aW5nIGFuIGludGVudFxuY29tbWFuZHMuc2V0VXJsID0gYXN5bmMgZnVuY3Rpb24gKHVyaSkge1xuICBhd2FpdCB0aGlzLmFkYi5zdGFydFVyaSh1cmksIHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbn07XG5cbi8vIGNsb3NpbmcgYXBwIHVzaW5nIGZvcmNlIHN0b3BcbmNvbW1hbmRzLmNsb3NlQXBwID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICBhd2FpdCB0aGlzLmFkYi5mb3JjZVN0b3AodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdfQ==