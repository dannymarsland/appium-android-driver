'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _teen_process = require('teen_process');

var _asyncbox = require('asyncbox');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumSupport = require('appium-support');

var _appiumAndroidIme = require('appium-android-ime');

var _ioAppiumSettings = require('io.appium.settings');

var _appiumUnlock = require('appium-unlock');

var _appiumAndroidBootstrap = require('appium-android-bootstrap');

var _appiumAndroidBootstrap2 = _interopRequireDefault(_appiumAndroidBootstrap);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var REMOTE_TEMP_PATH = "/data/local/tmp";
var REMOTE_INSTALL_TIMEOUT = 90000; // milliseconds
var CHROME_BROWSERS = ["Chrome", "Chromium", "Chromebeta", "Browser", "chrome", "chromium", "chromebeta", "browser", "chromium-browser"];

var helpers = {};

helpers.parseJavaVersion = function (stderr) {
  var lines = stderr.split("\n");
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(lines), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;

      if (new RegExp(/(java|openjdk) version/).test(line)) {
        return line.split(" ")[2].replace(/"/g, '');
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
};

helpers.getJavaVersion = function callee$0$0() {
  var _ref, stderr, javaVer;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Getting Java version");

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap((0, _teen_process.exec)('java', ['-version']));

      case 3:
        _ref = context$1$0.sent;
        stderr = _ref.stderr;
        javaVer = helpers.parseJavaVersion(stderr);

        if (!(javaVer === null)) {
          context$1$0.next = 8;
          break;
        }

        throw new Error("Could not get the Java version. Is Java installed?");

      case 8:
        _logger2['default'].info('Java version is: ' + javaVer);
        return context$1$0.abrupt('return', javaVer);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.prepareEmulator = function callee$0$0(adb, opts) {
  var avd, avdArgs, language, locale, avdLaunchTimeout, avdReadyTimeout, avdName, runningAVD;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        avd = opts.avd;
        avdArgs = opts.avdArgs;
        language = opts.language;
        locale = opts.locale;
        avdLaunchTimeout = opts.avdLaunchTimeout;
        avdReadyTimeout = opts.avdReadyTimeout;

        if (avd) {
          context$1$0.next = 8;
          break;
        }

        throw new Error("Cannot launch AVD without AVD name");

      case 8:
        avdName = avd.replace('@', '');
        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(adb.getRunningAVD(avdName));

      case 11:
        runningAVD = context$1$0.sent;

        if (!(runningAVD !== null)) {
          context$1$0.next = 15;
          break;
        }

        _logger2['default'].debug("Not launching AVD because it is already running.");
        return context$1$0.abrupt('return');

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(adb.launchAVD(avd, avdArgs, language, locale, avdLaunchTimeout, avdReadyTimeout));

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.ensureDeviceLocale = function callee$0$0(adb, language, country) {
  var haveLanguage, haveCountry, changed, curLanguage, curCountry, curLocale, locale;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        haveLanguage = language && typeof language === "string";
        haveCountry = country && typeof country === "string";

        if (!(!haveLanguage && !haveCountry)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return');

      case 4:
        changed = false;
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(adb.getApiLevel());

      case 7:
        context$1$0.t0 = context$1$0.sent;

        if (!(context$1$0.t0 < 23)) {
          context$1$0.next = 25;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(adb.getDeviceLanguage());

      case 11:
        curLanguage = context$1$0.sent;
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(adb.getDeviceCountry());

      case 14:
        curCountry = context$1$0.sent;

        if (!(haveLanguage && language !== curLanguage)) {
          context$1$0.next = 19;
          break;
        }

        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(adb.setDeviceLanguage(language));

      case 18:
        changed = true;

      case 19:
        if (!(haveCountry && country !== curCountry)) {
          context$1$0.next = 23;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(adb.setDeviceCountry(country));

      case 22:
        changed = true;

      case 23:
        context$1$0.next = 34;
        break;

      case 25:
        context$1$0.next = 27;
        return _regeneratorRuntime.awrap(adb.getDeviceLocale());

      case 27:
        curLocale = context$1$0.sent;
        locale = undefined;

        if (!haveCountry) {
          locale = language.toLowerCase();
        } else if (!haveLanguage) {
          locale = country;
        } else {
          locale = language.toLowerCase() + "-" + country.toUpperCase();
        }

        if (!(locale !== curLocale)) {
          context$1$0.next = 34;
          break;
        }

        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(adb.setDeviceLocale(locale));

      case 33:
        changed = true;

      case 34:
        if (!changed) {
          context$1$0.next = 37;
          break;
        }

        context$1$0.next = 37;
        return _regeneratorRuntime.awrap(adb.reboot());

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getDeviceInfoFromCaps = function callee$0$0() {
  var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var adb, udid, emPort, devices, availDevicesStr, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, device, deviceOS;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB({
          javaVersion: opts.javaVersion,
          adbPort: opts.adbPort
        }));

      case 2:
        adb = context$1$0.sent;
        udid = opts.udid;
        emPort = null;

        if (!opts.avd) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(helpers.prepareEmulator(adb, opts));

      case 8:
        udid = adb.curDeviceId;
        emPort = adb.emulatorPort;
        context$1$0.next = 63;
        break;

      case 12:
        // no avd given. lets try whatever's plugged in devices/emulators
        _logger2['default'].info("Retrieving device list");
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(adb.getDevicesWithRetry());

      case 15:
        devices = context$1$0.sent;

        if (!udid) {
          context$1$0.next = 21;
          break;
        }

        if (!_lodash2['default'].contains(_lodash2['default'].pluck(devices, 'udid'), udid)) {
          _logger2['default'].errorAndThrow('Device ' + udid + ' was not in the list ' + 'of connected devices');
        }
        emPort = adb.getPortFromEmulatorString(udid);
        context$1$0.next = 63;
        break;

      case 21:
        if (!opts.platformVersion) {
          context$1$0.next = 61;
          break;
        }

        // a platform version was given. lets try to find a device with the same os
        _logger2['default'].info('Looking for a device with Android \'' + opts.platformVersion + '\'');

        // in case we fail to find something, give the user a useful log that has
        // the device udids and os versions so they know what's available
        availDevicesStr = [];
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 27;
        _iterator2 = _getIterator(devices);

      case 29:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 43;
          break;
        }

        device = _step2.value;
        context$1$0.next = 33;
        return _regeneratorRuntime.awrap(adb.setDeviceId(device.udid));

      case 33:
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(adb.getPlatformVersion());

      case 35:
        deviceOS = context$1$0.sent;

        // build up our info string of available devices as we iterate
        availDevicesStr.push(device.udid + ' (' + deviceOS + ')');

        // we do a begins with check for implied wildcard matching
        // eg: 4 matches 4.1, 4.0, 4.1.3-samsung, etc

        if (!(deviceOS.indexOf(opts.platformVersion) === 0)) {
          context$1$0.next = 40;
          break;
        }

        udid = device.udid;
        return context$1$0.abrupt('break', 43);

      case 40:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 29;
        break;

      case 43:
        context$1$0.next = 49;
        break;

      case 45:
        context$1$0.prev = 45;
        context$1$0.t0 = context$1$0['catch'](27);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 49:
        context$1$0.prev = 49;
        context$1$0.prev = 50;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 52:
        context$1$0.prev = 52;

        if (!_didIteratorError2) {
          context$1$0.next = 55;
          break;
        }

        throw _iteratorError2;

      case 55:
        return context$1$0.finish(52);

      case 56:
        return context$1$0.finish(49);

      case 57:

        // we couldn't find anything! quit
        if (!udid) {
          _logger2['default'].errorAndThrow('Unable to find an active device or emulator ' + ('with OS ' + opts.platformVersion + '. The following ') + 'are available: ' + availDevicesStr.join(', '));
        }

        emPort = adb.getPortFromEmulatorString(udid);
        context$1$0.next = 63;
        break;

      case 61:
        // a udid was not given, grab the first device we see
        udid = devices[0].udid;
        emPort = adb.getPortFromEmulatorString(udid);

      case 63:

        _logger2['default'].info('Using device: ' + udid);
        return context$1$0.abrupt('return', { udid: udid, emPort: emPort });

      case 65:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[27, 45, 49, 57], [50,, 52, 56]]);
};

// returns a new adb instance with deviceId set
helpers.createADB = function callee$0$0(javaVersion, udid, emPort, adbPort) {
  var adb;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB({ javaVersion: javaVersion, adbPort: adbPort }));

      case 2:
        adb = context$1$0.sent;

        adb.setDeviceId(udid);
        if (emPort) {
          adb.setEmulatorPort(emPort);
        }

        return context$1$0.abrupt('return', adb);

      case 6:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getLaunchInfo = function callee$0$0(adb, opts) {
  var app, appPackage, appActivity, appWaitPackage, appWaitActivity, _ref2, apkPackage, apkActivity;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        app = opts.app;
        appPackage = opts.appPackage;
        appActivity = opts.appActivity;
        appWaitPackage = opts.appWaitPackage;
        appWaitActivity = opts.appWaitActivity;

        if (app) {
          context$1$0.next = 8;
          break;
        }

        _logger2['default'].warn("No app sent in, not parsing package/activity");
        return context$1$0.abrupt('return');

      case 8:
        if (!(appPackage && appActivity)) {
          context$1$0.next = 10;
          break;
        }

        return context$1$0.abrupt('return');

      case 10:

        _logger2['default'].debug("Parsing package and activity from app manifest");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.packageAndLaunchActivityFromManifest(app));

      case 13:
        _ref2 = context$1$0.sent;
        apkPackage = _ref2.apkPackage;
        apkActivity = _ref2.apkActivity;

        if (apkPackage && !appPackage) {
          appPackage = apkPackage;
        }
        if (!appWaitPackage) {
          appWaitPackage = appPackage;
        }
        if (apkActivity && !appActivity) {
          appActivity = apkActivity;
        }
        if (!appWaitActivity) {
          appWaitActivity = appActivity;
        }
        _logger2['default'].debug('Parsed package and activity are: ' + apkPackage + '/' + apkActivity);
        return context$1$0.abrupt('return', { appPackage: appPackage, appWaitPackage: appWaitPackage, appActivity: appActivity, appWaitActivity: appWaitActivity });

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.getRemoteApkPath = function (localApkMd5) {
  var remotePath = REMOTE_TEMP_PATH + '/' + localApkMd5 + '.apk';
  _logger2['default'].info('Remote apk path is ' + remotePath);
  return remotePath;
};

helpers.resetApp = function callee$0$0(adb, localApkPath, pkg, fastReset) {
  var androidInstallTimeout = arguments.length <= 4 || arguments[4] === undefined ? REMOTE_INSTALL_TIMEOUT : arguments[4];
  var apkMd5, remotePath;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!fastReset) {
          context$1$0.next = 6;
          break;
        }

        _logger2['default'].debug("Running fast reset (stop and clear)");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.stopAndClear(pkg));

      case 4:
        context$1$0.next = 17;
        break;

      case 6:
        _logger2['default'].debug("Running old fashion reset (reinstall)");
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.md5(localApkPath));

      case 9:
        apkMd5 = context$1$0.sent;
        remotePath = helpers.getRemoteApkPath(apkMd5, localApkPath);
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.fileExists(remotePath));

      case 13:
        if (context$1$0.sent) {
          context$1$0.next = 15;
          break;
        }

        throw new Error("Can't run slow reset without a remote apk!");

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(helpers.reinstallRemoteApk(adb, localApkPath, pkg, remotePath, androidInstallTimeout));

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.reinstallRemoteApk = function callee$0$0(adb, localApkPath, pkg, remotePath, androidInstallTimeout) {
  var tries = arguments.length <= 5 || arguments[5] === undefined ? 2 : arguments[5];
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap((0, _asyncbox.retry)(tries, function callee$1$0() {
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(adb.uninstallApk(pkg));

              case 3:
                context$2$0.next = 8;
                break;

              case 5:
                context$2$0.prev = 5;
                context$2$0.t0 = context$2$0['catch'](0);

                _logger2['default'].warn("Uninstalling remote APK failed, maybe it wasn't installed");

              case 8:
                context$2$0.prev = 8;
                context$2$0.next = 11;
                return _regeneratorRuntime.awrap(adb.installFromDevicePath(remotePath, { timeout: androidInstallTimeout }));

              case 11:
                context$2$0.next = 21;
                break;

              case 13:
                context$2$0.prev = 13;
                context$2$0.t1 = context$2$0['catch'](8);

                _logger2['default'].warn("Installing remote APK failed, going to uninstall and try " + "again");
                // if remote install failed, remove ALL the apks and re-push ours
                // to the remote cache
                context$2$0.next = 18;
                return _regeneratorRuntime.awrap(helpers.removeRemoteApks(adb));

              case 18:
                context$2$0.next = 20;
                return _regeneratorRuntime.awrap(adb.push(localApkPath, remotePath));

              case 20:
                throw context$2$0.t1;

              case 21:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[0, 5], [8, 13]]);
        }));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// throw an error to trigger the retry
helpers.installApkRemotely = function callee$0$0(adb, opts) {
  var app, appPackage, fastReset, androidInstallTimeout, apkMd5, remotePath, remoteApkExists, installed;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        app = opts.app;
        appPackage = opts.appPackage;
        fastReset = opts.fastReset;
        androidInstallTimeout = opts.androidInstallTimeout;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.md5(app));

      case 6:
        apkMd5 = context$1$0.sent;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(helpers.getRemoteApkPath(apkMd5, app));

      case 9:
        remotePath = context$1$0.sent;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(adb.fileExists(remotePath));

      case 12:
        remoteApkExists = context$1$0.sent;

        _logger2['default'].debug("Checking if app is installed");
        context$1$0.next = 16;
        return _regeneratorRuntime.awrap(adb.isAppInstalled(appPackage));

      case 16:
        installed = context$1$0.sent;

        if (!(installed && remoteApkExists && fastReset)) {
          context$1$0.next = 23;
          break;
        }

        _logger2['default'].info("Apk is already on remote and installed, resetting");
        context$1$0.next = 21;
        return _regeneratorRuntime.awrap(helpers.resetApp(adb, app, appPackage, fastReset, androidInstallTimeout));

      case 21:
        context$1$0.next = 37;
        break;

      case 23:
        if (!(!installed || !remoteApkExists && fastReset)) {
          context$1$0.next = 37;
          break;
        }

        if (!installed) {
          _logger2['default'].info("Apk is not yet installed");
        } else {
          _logger2['default'].info("Apk was already installed but not from our remote path");
        }
        _logger2['default'].info((installed ? 'Re' : '') + 'installing apk from remote');
        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(adb.mkdir(REMOTE_TEMP_PATH));

      case 28:
        _logger2['default'].info("Clearing out any existing remote apks with the same hash");
        context$1$0.next = 31;
        return _regeneratorRuntime.awrap(helpers.removeRemoteApks(adb, [apkMd5]));

      case 31:
        if (remoteApkExists) {
          context$1$0.next = 35;
          break;
        }

        // push from local to remote
        _logger2['default'].info('Pushing ' + appPackage + ' to device. Will wait up to ' + androidInstallTimeout + ' ' + 'milliseconds before aborting');
        context$1$0.next = 35;
        return _regeneratorRuntime.awrap(adb.push(app, remotePath, { timeout: androidInstallTimeout }));

      case 35:
        context$1$0.next = 37;
        return _regeneratorRuntime.awrap(helpers.reinstallRemoteApk(adb, app, appPackage, remotePath, androidInstallTimeout));

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.removeRemoteApks = function callee$0$0(adb) {
  var exceptMd5s = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

  var apks, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, apk;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Removing any old apks");
        if (exceptMd5s) {
          _logger2['default'].debug('Except ' + JSON.stringify(exceptMd5s));
        } else {
          exceptMd5s = [];
        }
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.ls(REMOTE_TEMP_PATH + '/*.apk'));

      case 4:
        apks = context$1$0.sent;

        if (!(apks.length < 1)) {
          context$1$0.next = 8;
          break;
        }

        _logger2['default'].debug("No apks to examine");
        return context$1$0.abrupt('return');

      case 8:
        apks = apks.filter(function (apk) {
          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = _getIterator(exceptMd5s), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var md5 = _step3.value;

              return apk.indexOf(md5) === -1;
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                _iterator3['return']();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }
        });
        _iteratorNormalCompletion4 = true;
        _didIteratorError4 = false;
        _iteratorError4 = undefined;
        context$1$0.prev = 12;
        _iterator4 = _getIterator(apks);

      case 14:
        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
          context$1$0.next = 22;
          break;
        }

        apk = _step4.value;

        _logger2['default'].info('Will remove ' + apk);
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(adb.shell(['rm', '-f', apk]));

      case 19:
        _iteratorNormalCompletion4 = true;
        context$1$0.next = 14;
        break;

      case 22:
        context$1$0.next = 28;
        break;

      case 24:
        context$1$0.prev = 24;
        context$1$0.t0 = context$1$0['catch'](12);
        _didIteratorError4 = true;
        _iteratorError4 = context$1$0.t0;

      case 28:
        context$1$0.prev = 28;
        context$1$0.prev = 29;

        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }

      case 31:
        context$1$0.prev = 31;

        if (!_didIteratorError4) {
          context$1$0.next = 34;
          break;
        }

        throw _iteratorError4;

      case 34:
        return context$1$0.finish(31);

      case 35:
        return context$1$0.finish(28);

      case 36:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[12, 24, 28, 36], [29,, 31, 35]]);
};

helpers.initUnicodeKeyboard = function callee$0$0(adb) {
  var defaultIME, appiumIME;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Enabling Unicode keyboard support');
        _logger2['default'].debug("Pushing unicode ime to device...");
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(adb.install(_appiumAndroidIme.path, false));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.defaultIME());

      case 6:
        defaultIME = context$1$0.sent;

        _logger2['default'].debug('Unsetting previous IME ' + defaultIME);
        appiumIME = 'io.appium.android.ime/.UnicodeIME';

        _logger2['default'].debug('Setting IME to \'' + appiumIME + '\'');
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(adb.enableIME(appiumIME));

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(adb.setIME(appiumIME));

      case 14:
        return context$1$0.abrupt('return', defaultIME);

      case 15:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.pushSettingsApp = function callee$0$0(adb) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Pushing settings apk to device...");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.install(_ioAppiumSettings.path, false));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.pushUnlock = function callee$0$0(adb) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug("Pushing unlock helper app to device...");
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(adb.install(_appiumUnlock.path, false));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// pushStrings method extracts string.xml and converts it to string.json and pushes
// it to /data/local/tmp/string.json on for use of bootstrap
// if app is not present to extract string.xml it deletes remote strings.json
// if app does not have strings.xml we push an empty json object to remote
helpers.pushStrings = function callee$0$0(language, adb, opts) {
  var remotePath, stringsJson, stringsTmpDir, _ref3, apkStrings, localPath, remoteFile;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        remotePath = '/data/local/tmp';
        stringsJson = 'strings.json';
        stringsTmpDir = _path2['default'].resolve(opts.tmpDir, opts.appPackage);
        context$1$0.prev = 3;

        _logger2['default'].debug('Extracting strings from apk', opts.app, language, stringsTmpDir);
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(adb.extractStringsFromApk(opts.app, language, stringsTmpDir));

      case 7:
        _ref3 = context$1$0.sent;
        apkStrings = _ref3.apkStrings;
        localPath = _ref3.localPath;
        context$1$0.next = 12;
        return _regeneratorRuntime.awrap(adb.push(localPath, remotePath));

      case 12:
        return context$1$0.abrupt('return', apkStrings);

      case 15:
        context$1$0.prev = 15;
        context$1$0.t0 = context$1$0['catch'](3);
        context$1$0.next = 19;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(opts.app));

      case 19:
        if (context$1$0.sent) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 22;
        return _regeneratorRuntime.awrap(adb.rimraf(remotePath + '/' + stringsJson));

      case 22:
        context$1$0.next = 28;
        break;

      case 24:
        _logger2['default'].warn("Could not get strings, continuing anyway");
        remoteFile = remotePath + '/' + stringsJson;
        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(adb.shell('echo', ['\'{}\' > ' + remoteFile]));

      case 28:
        return context$1$0.abrupt('return', {});

      case 29:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[3, 15]]);
};

helpers.unlock = function callee$0$0(adb) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this3 = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(adb.isScreenLocked());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 5;
          break;
        }

        _logger2['default'].info("Screen already unlocked, doing nothing");
        return context$1$0.abrupt('return');

      case 5:
        _logger2['default'].info("Unlocking screen");

        context$1$0.next = 8;
        return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(10, 1000, function callee$1$0() {
          var startOpts;
          return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
            var _this2 = this;

            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                _logger2['default'].debug("Screen is locked, trying to unlock");

                // first manually stop the unlock activity
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(adb.forceStop('io.appium.unlock'));

              case 3:
                startOpts = {
                  pkg: "io.appium.unlock",
                  activity: ".Unlock",
                  action: "android.intent.action.MAIN",
                  category: "android.intent.category.LAUNCHER",
                  flags: "0x10200000",
                  stopApp: false
                };
                context$2$0.next = 6;
                return _regeneratorRuntime.awrap(adb.startApp(startOpts));

              case 6:
                context$2$0.next = 8;
                return _regeneratorRuntime.awrap(adb.startApp(startOpts));

              case 8:
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(2, 1000, function callee$2$0() {
                  return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                    while (1) switch (context$3$0.prev = context$3$0.next) {
                      case 0:
                        context$3$0.next = 2;
                        return _regeneratorRuntime.awrap(adb.isScreenLocked());

                      case 2:
                        if (context$3$0.sent) {
                          context$3$0.next = 6;
                          break;
                        }

                        _logger2['default'].debug("Screen unlocked successfully");
                        context$3$0.next = 7;
                        break;

                      case 6:
                        throw new Error("Screen did not unlock successfully, retrying");

                      case 7:
                      case 'end':
                        return context$3$0.stop();
                    }
                  }, null, _this2);
                }));

              case 10:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this3);
        }));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.initDevice = function callee$0$0(adb, opts) {
  var defaultIME;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(adb.waitForDevice());

      case 2:
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(helpers.ensureDeviceLocale(adb, opts.language, opts.locale));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(adb.startLogcat());

      case 6:
        defaultIME = undefined;

        if (!opts.unicodeKeyboard) {
          context$1$0.next = 11;
          break;
        }

        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(helpers.initUnicodeKeyboard(adb));

      case 10:
        defaultIME = context$1$0.sent;

      case 11:
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(helpers.pushSettingsApp(adb));

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(helpers.pushUnlock(adb));

      case 15:
        return context$1$0.abrupt('return', defaultIME);

      case 16:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.removeNullProperties = function (obj) {
  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _getIterator(_lodash2['default'].keys(obj)), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var key = _step5.value;

      if (_lodash2['default'].isNull(obj[key]) || _lodash2['default'].isUndefined(obj[key])) {
        delete obj[key];
      }
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5['return']) {
        _iterator5['return']();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }
};

helpers.truncateDecimals = function (number, digits) {
  var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
};

helpers.isChromeBrowser = function (browser) {
  return _lodash2['default'].contains(CHROME_BROWSERS, browser);
};

helpers.getChromePkg = function (browser) {
  var pkg = undefined,
      activity = undefined;

  browser = browser.toLowerCase();
  if (browser === "chromium") {
    pkg = "org.chromium.chrome.shell";
    activity = ".ChromeShellActivity";
  } else if (browser === "chromebeta") {
    pkg = "com.chrome.beta";
    activity = "com.google.android.apps.chrome.Main";
  } else if (browser === "browser") {
    pkg = "com.android.browser";
    activity = "com.android.browser.BrowserActivity";
  } else if (browser === "chromium-browser") {
    pkg = "org.chromium.chrome";
    activity = "com.google.android.apps.chrome.Main";
  } else {
    pkg = "com.android.chrome";
    activity = "com.google.android.apps.chrome.Main";
  }
  return { pkg: pkg, activity: activity };
};

helpers.bootstrap = _appiumAndroidBootstrap2['default'];

exports['default'] = helpers;
exports.CHROME_BROWSERS = CHROME_BROWSERS;
//API >= 23

// we can create a throwaway ADB instance here, so there is no dependency
// on instantiating on earlier (at this point, we have no udid)
// we can only use this ADB object for commands that would not be confused
// if multiple devices are connected

// a specific avd name was given. try to initialize with that

// udid was given, lets try to init with that device

// first try started devices/emulators

// direct adb calls to the specific device

// first do an uninstall of the package to make sure it's not there

// Next, install from the remote path. This can be flakey. If it doesn't
// work, clear out any cached apks, re-push from local, and try again

// get the default IME so we can return back to it later if we want

// delete remote string.json if present

// then start the app twice, as once is flakey

// check if it worked, twice
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hbmRyb2lkLWhlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7b0JBQ0wsTUFBTTs7Ozs0QkFDRixjQUFjOzt3QkFDRSxVQUFVOztzQkFDNUIsVUFBVTs7Ozs2QkFDVixnQkFBZ0I7O2dDQUNJLG9CQUFvQjs7Z0NBQ25CLG9CQUFvQjs7NEJBQ3RCLGVBQWU7O3NDQUMvQiwwQkFBMEI7Ozs7eUJBQ2hDLFlBQVk7Ozs7QUFFNUIsSUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztBQUMzQyxJQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUNyQyxJQUFNLGVBQWUsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDN0MsUUFBUSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUM3QyxrQkFBa0IsQ0FBQyxDQUFDOztBQUU3QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWpCLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUMzQyxNQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7QUFDL0Isc0NBQWlCLEtBQUssNEdBQUU7VUFBZixJQUFJOztBQUNYLFVBQUksSUFBSSxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkQsZUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7T0FDN0M7S0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELFNBQU8sSUFBSSxDQUFDO0NBQ2IsQ0FBQzs7QUFFRixPQUFPLENBQUMsY0FBYyxHQUFHO1lBR2xCLE1BQU0sRUFDUCxPQUFPOzs7OztBQUhYLDRCQUFPLEtBQUssQ0FBQyxzQkFB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cUJBQXFCLENBQUM7QUFDNUIsWUFBUSxHQUFHLHFDQUFxQyxDQUFDO0dBQ2xELE1BQU0sSUFBSSxPQUFPLEtBQUssa0JBQWtCLEVBQUU7QUFDekMsT0FBRyxHQUFHLHFCQUFxQixDQUFDO0FBQzVCLFlBQVEsR0FBRyxxQ0FBcUMsQ0FBQztHQUNsRCxNQUFNO0FBQ0wsT0FBRyxHQUFHLG9CQUFvQixDQUFDO0FBQzNCLFlBQVEsR0FBRyxxQ0FBcUMsQ0FBQztHQUNsRDtBQUNELFNBQU8sRUFBQyxHQUFHLEVBQUgsR0FBRyxFQUFFLFFBQVEsRUFBUixRQUFRLEVBQUMsQ0FBQztDQUN4QixDQUFDOztBQUVGLE9BQU8sQ0FBQyxTQUFTLHNDQUFZLENBQUM7O3FCQUVmLE9BQU87UUFDYixlQUFlLEdBQWYsZUFBZSIsImZpbGUiOiJsaWIvYW5kcm9pZC1oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgeyByZXRyeSwgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCBsb2dnZXIgZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyBwYXRoIGFzIHVuaWNvZGVJTUVQYXRoIH0gZnJvbSAnYXBwaXVtLWFuZHJvaWQtaW1lJztcbmltcG9ydCB7IHBhdGggYXMgc2V0dGluZ3NBcGtQYXRoIH0gZnJvbSAnaW8uYXBwaXVtLnNldHRpbmdzJztcbmltcG9ydCB7IHBhdGggYXMgdW5sb2NrQXBrUGF0aCB9IGZyb20gJ2FwcGl1bS11bmxvY2snO1xuaW1wb3J0IEJvb3RzdHJhcCBmcm9tICdhcHBpdW0tYW5kcm9pZC1ib290c3RyYXAnO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcblxuY29uc3QgUkVNT1RFX1RFTVBfUEFUSCA9IFwiL2RhdGEvbG9jYWwvdG1wXCI7XG5jb25zdCBSRU1PVEVfSU5TVEFMTF9USU1FT1VUID0gOTAwMDA7IC8vIG1pbGxpc2Vjb25kc1xuY29uc3QgQ0hST01FX0JST1dTRVJTID0gW1wiQ2hyb21lXCIsIFwiQ2hyb21pdW1cIiwgXCJDaHJvbWViZXRhXCIsIFwiQnJvd3NlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hyb21lXCIsIFwiY2hyb21pdW1cIiwgXCJjaHJvbWViZXRhXCIsIFwiYnJvd3NlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2hyb21pdW0tYnJvd3NlclwiXTtcblxubGV0IGhlbHBlcnMgPSB7fTtcblxuaGVscGVycy5wYXJzZUphdmFWZXJzaW9uID0gZnVuY3Rpb24gKHN0ZGVycikge1xuICBsZXQgbGluZXMgPSBzdGRlcnIuc3BsaXQoXCJcXG5cIik7XG4gIGZvciAobGV0IGxpbmUgb2YgbGluZXMpIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgvKGphdmF8b3BlbmpkaykgdmVyc2lvbi8pLnRlc3QobGluZSkpIHtcbiAgICAgIHJldHVybiBsaW5lLnNwbGl0KFwiIFwiKVsyXS5yZXBsYWNlKC9cIi9nLCAnJyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuaGVscGVycy5nZXRKYXZhVmVyc2lvbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbG9nZ2VyLmRlYnVnKFwiR2V0dGluZyBKYXZhIHZlcnNpb25cIik7XG5cbiAgbGV0IHtzdGRlcnJ9ID0gYXdhaXQgZXhlYygnamF2YScsIFsnLXZlcnNpb24nXSk7XG4gIGxldCBqYXZhVmVyID0gaGVscGVycy5wYXJzZUphdmFWZXJzaW9uKHN0ZGVycik7XG4gIGlmIChqYXZhVmVyID09PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGQgbm90IGdldCB0aGUgSmF2YSB2ZXJzaW9uLiBJcyBKYXZhIGluc3RhbGxlZD9cIik7XG4gIH1cbiAgbG9nZ2VyLmluZm8oYEphdmEgdmVyc2lvbiBpczogJHtqYXZhVmVyfWApO1xuICByZXR1cm4gamF2YVZlcjtcbn07XG5cbmhlbHBlcnMucHJlcGFyZUVtdWxhdG9yID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgb3B0cykge1xuICBsZXQge2F2ZCwgYXZkQXJncywgbGFuZ3VhZ2UsIGxvY2FsZSwgYXZkTGF1bmNoVGltZW91dCxcbiAgICAgICBhdmRSZWFkeVRpbWVvdXR9ID0gb3B0cztcbiAgaWYgKCFhdmQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgbGF1bmNoIEFWRCB3aXRob3V0IEFWRCBuYW1lXCIpO1xuICB9XG4gIGxldCBhdmROYW1lID0gYXZkLnJlcGxhY2UoJ0AnLCAnJyk7XG4gIGxldCBydW5uaW5nQVZEID0gYXdhaXQgYWRiLmdldFJ1bm5pbmdBVkQoYXZkTmFtZSk7XG4gIGlmIChydW5uaW5nQVZEICE9PSBudWxsKSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiTm90IGxhdW5jaGluZyBBVkQgYmVjYXVzZSBpdCBpcyBhbHJlYWR5IHJ1bm5pbmcuXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBhd2FpdCBhZGIubGF1bmNoQVZEKGF2ZCwgYXZkQXJncywgbGFuZ3VhZ2UsIGxvY2FsZSwgYXZkTGF1bmNoVGltZW91dCxcbiAgICAgICAgICAgICAgICAgICAgICBhdmRSZWFkeVRpbWVvdXQpO1xufTtcblxuaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBsYW5ndWFnZSwgY291bnRyeSkge1xuICBsZXQgaGF2ZUxhbmd1YWdlID0gbGFuZ3VhZ2UgJiYgdHlwZW9mIGxhbmd1YWdlID09PSBcInN0cmluZ1wiO1xuICBsZXQgaGF2ZUNvdW50cnkgPSBjb3VudHJ5ICYmIHR5cGVvZiBjb3VudHJ5ID09PSBcInN0cmluZ1wiO1xuICBpZiAoIWhhdmVMYW5ndWFnZSAmJiAhaGF2ZUNvdW50cnkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgaWYgKGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpIDwgMjMpIHtcbiAgICBsZXQgY3VyTGFuZ3VhZ2UgPSBhd2FpdCBhZGIuZ2V0RGV2aWNlTGFuZ3VhZ2UoKTtcbiAgICBsZXQgY3VyQ291bnRyeSA9IGF3YWl0IGFkYi5nZXREZXZpY2VDb3VudHJ5KCk7XG4gICAgaWYgKGhhdmVMYW5ndWFnZSAmJiBsYW5ndWFnZSAhPT0gY3VyTGFuZ3VhZ2UpIHtcbiAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VMYW5ndWFnZShsYW5ndWFnZSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGhhdmVDb3VudHJ5ICYmIGNvdW50cnkgIT09IGN1ckNvdW50cnkpIHtcbiAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VDb3VudHJ5KGNvdW50cnkpO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2UgeyAvL0FQSSA+PSAyM1xuICAgIGxldCBjdXJMb2NhbGUgPSBhd2FpdCBhZGIuZ2V0RGV2aWNlTG9jYWxlKCk7XG4gICAgbGV0IGxvY2FsZTtcbiAgICBpZiAoIWhhdmVDb3VudHJ5KSB7XG4gICAgICBsb2NhbGUgPSBsYW5ndWFnZS50b0xvd2VyQ2FzZSgpO1xuICAgIH0gZWxzZSBpZiAoIWhhdmVMYW5ndWFnZSkge1xuICAgICAgbG9jYWxlID0gY291bnRyeTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9jYWxlID0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKSArIFwiLVwiICsgY291bnRyeS50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgICBpZiAobG9jYWxlICE9PSBjdXJMb2NhbGUpIHtcbiAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VMb2NhbGUobG9jYWxlKTtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAoY2hhbmdlZCkge1xuICAgIGF3YWl0IGFkYi5yZWJvb3QoKTtcbiAgfVxufTtcblxuaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMgPSBhc3luYyBmdW5jdGlvbiAob3B0cyA9IHt9KSB7XG4gIC8vIHdlIGNhbiBjcmVhdGUgYSB0aHJvd2F3YXkgQURCIGluc3RhbmNlIGhlcmUsIHNvIHRoZXJlIGlzIG5vIGRlcGVuZGVuY3lcbiAgLy8gb24gaW5zdGFudGlhdGluZyBvbiBlYXJsaWVyIChhdCB0aGlzIHBvaW50LCB3ZSBoYXZlIG5vIHVkaWQpXG4gIC8vIHdlIGNhbiBvbmx5IHVzZSB0aGlzIEFEQiBvYmplY3QgZm9yIGNvbW1hbmRzIHRoYXQgd291bGQgbm90IGJlIGNvbmZ1c2VkXG4gIC8vIGlmIG11bHRpcGxlIGRldmljZXMgYXJlIGNvbm5lY3RlZFxuICBsZXQgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQih7XG4gICAgamF2YVZlcnNpb246IG9wdHMuamF2YVZlcnNpb24sXG4gICAgYWRiUG9ydDogb3B0cy5hZGJQb3J0XG4gIH0pO1xuICBsZXQgdWRpZCA9IG9wdHMudWRpZDtcbiAgbGV0IGVtUG9ydCA9IG51bGw7XG5cbiAgLy8gYSBzcGVjaWZpYyBhdmQgbmFtZSB3YXMgZ2l2ZW4uIHRyeSB0byBpbml0aWFsaXplIHdpdGggdGhhdFxuICBpZiAob3B0cy5hdmQpIHtcbiAgICBhd2FpdCBoZWxwZXJzLnByZXBhcmVFbXVsYXRvcihhZGIsIG9wdHMpO1xuICAgIHVkaWQgPSBhZGIuY3VyRGV2aWNlSWQ7XG4gICAgZW1Qb3J0ID0gYWRiLmVtdWxhdG9yUG9ydDtcbiAgfSBlbHNlIHtcbiAgICAvLyBubyBhdmQgZ2l2ZW4uIGxldHMgdHJ5IHdoYXRldmVyJ3MgcGx1Z2dlZCBpbiBkZXZpY2VzL2VtdWxhdG9yc1xuICAgIGxvZ2dlci5pbmZvKFwiUmV0cmlldmluZyBkZXZpY2UgbGlzdFwiKTtcbiAgICBsZXQgZGV2aWNlcyA9IGF3YWl0IGFkYi5nZXREZXZpY2VzV2l0aFJldHJ5KCk7XG5cbiAgICAvLyB1ZGlkIHdhcyBnaXZlbiwgbGV0cyB0cnkgdG8gaW5pdCB3aXRoIHRoYXQgZGV2aWNlXG4gICAgaWYgKHVkaWQpIHtcbiAgICAgIGlmICghXy5jb250YWlucyhfLnBsdWNrKGRldmljZXMsICd1ZGlkJyksIHVkaWQpKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvckFuZFRocm93KGBEZXZpY2UgJHt1ZGlkfSB3YXMgbm90IGluIHRoZSBsaXN0IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgb2YgY29ubmVjdGVkIGRldmljZXNgKTtcbiAgICAgIH1cbiAgICAgIGVtUG9ydCA9IGFkYi5nZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nKHVkaWQpO1xuICAgIH0gZWxzZSBpZiAob3B0cy5wbGF0Zm9ybVZlcnNpb24pIHtcbiAgICAgIC8vIGEgcGxhdGZvcm0gdmVyc2lvbiB3YXMgZ2l2ZW4uIGxldHMgdHJ5IHRvIGZpbmQgYSBkZXZpY2Ugd2l0aCB0aGUgc2FtZSBvc1xuICAgICAgbG9nZ2VyLmluZm8oYExvb2tpbmcgZm9yIGEgZGV2aWNlIHdpdGggQW5kcm9pZCAnJHtvcHRzLnBsYXRmb3JtVmVyc2lvbn0nYCk7XG5cbiAgICAgIC8vIGluIGNhc2Ugd2UgZmFpbCB0byBmaW5kIHNvbWV0aGluZywgZ2l2ZSB0aGUgdXNlciBhIHVzZWZ1bCBsb2cgdGhhdCBoYXNcbiAgICAgIC8vIHRoZSBkZXZpY2UgdWRpZHMgYW5kIG9zIHZlcnNpb25zIHNvIHRoZXkga25vdyB3aGF0J3MgYXZhaWxhYmxlXG4gICAgICBsZXQgYXZhaWxEZXZpY2VzU3RyID0gW107XG5cbiAgICAgIC8vIGZpcnN0IHRyeSBzdGFydGVkIGRldmljZXMvZW11bGF0b3JzXG4gICAgICBmb3IgKGxldCBkZXZpY2Ugb2YgZGV2aWNlcykge1xuICAgICAgICAvLyBkaXJlY3QgYWRiIGNhbGxzIHRvIHRoZSBzcGVjaWZpYyBkZXZpY2VcbiAgICAgICAgYXdhaXQgYWRiLnNldERldmljZUlkKGRldmljZS51ZGlkKTtcbiAgICAgICAgbGV0IGRldmljZU9TID0gYXdhaXQgYWRiLmdldFBsYXRmb3JtVmVyc2lvbigpO1xuXG4gICAgICAgIC8vIGJ1aWxkIHVwIG91ciBpbmZvIHN0cmluZyBvZiBhdmFpbGFibGUgZGV2aWNlcyBhcyB3ZSBpdGVyYXRlXG4gICAgICAgIGF2YWlsRGV2aWNlc1N0ci5wdXNoKGAke2RldmljZS51ZGlkfSAoJHtkZXZpY2VPU30pYCk7XG5cbiAgICAgICAgLy8gd2UgZG8gYSBiZWdpbnMgd2l0aCBjaGVjayBmb3IgaW1wbGllZCB3aWxkY2FyZCBtYXRjaGluZ1xuICAgICAgICAvLyBlZzogNCBtYXRjaGVzIDQuMSwgNC4wLCA0LjEuMy1zYW1zdW5nLCBldGNcbiAgICAgICAgaWYgKGRldmljZU9TLmluZGV4T2Yob3B0cy5wbGF0Zm9ybVZlcnNpb24pID09PSAwKSB7XG4gICAgICAgICAgdWRpZCA9IGRldmljZS51ZGlkO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHdlIGNvdWxkbid0IGZpbmQgYW55dGhpbmchIHF1aXRcbiAgICAgIGlmICghdWRpZCkge1xuICAgICAgICBsb2dnZXIuZXJyb3JBbmRUaHJvdyhgVW5hYmxlIHRvIGZpbmQgYW4gYWN0aXZlIGRldmljZSBvciBlbXVsYXRvciBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHdpdGggT1MgJHtvcHRzLnBsYXRmb3JtVmVyc2lvbn0uIFRoZSBmb2xsb3dpbmcgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBhcmUgYXZhaWxhYmxlOiBgICsgYXZhaWxEZXZpY2VzU3RyLmpvaW4oJywgJykpO1xuICAgICAgfVxuXG4gICAgICBlbVBvcnQgPSBhZGIuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyh1ZGlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYSB1ZGlkIHdhcyBub3QgZ2l2ZW4sIGdyYWIgdGhlIGZpcnN0IGRldmljZSB3ZSBzZWVcbiAgICAgIHVkaWQgPSBkZXZpY2VzWzBdLnVkaWQ7XG4gICAgICBlbVBvcnQgPSBhZGIuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyh1ZGlkKTtcbiAgICB9XG4gIH1cblxuICBsb2dnZXIuaW5mbyhgVXNpbmcgZGV2aWNlOiAke3VkaWR9YCk7XG4gIHJldHVybiB7dWRpZCwgZW1Qb3J0fTtcbn07XG5cbi8vIHJldHVybnMgYSBuZXcgYWRiIGluc3RhbmNlIHdpdGggZGV2aWNlSWQgc2V0XG5oZWxwZXJzLmNyZWF0ZUFEQiA9IGFzeW5jIGZ1bmN0aW9uIChqYXZhVmVyc2lvbiwgdWRpZCwgZW1Qb3J0LCBhZGJQb3J0KSB7XG4gIGxldCBhZGIgPSBhd2FpdCBBREIuY3JlYXRlQURCKHtqYXZhVmVyc2lvbiwgYWRiUG9ydH0pO1xuXG4gIGFkYi5zZXREZXZpY2VJZCh1ZGlkKTtcbiAgaWYgKGVtUG9ydCkge1xuICAgIGFkYi5zZXRFbXVsYXRvclBvcnQoZW1Qb3J0KTtcbiAgfVxuXG4gIHJldHVybiBhZGI7XG59O1xuXG5oZWxwZXJzLmdldExhdW5jaEluZm8gPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBvcHRzKSB7XG4gIGxldCB7YXBwLCBhcHBQYWNrYWdlLCBhcHBBY3Rpdml0eSwgYXBwV2FpdFBhY2thZ2UsIGFwcFdhaXRBY3Rpdml0eX0gPSBvcHRzO1xuICBpZiAoIWFwcCkge1xuICAgIGxvZ2dlci53YXJuKFwiTm8gYXBwIHNlbnQgaW4sIG5vdCBwYXJzaW5nIHBhY2thZ2UvYWN0aXZpdHlcIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChhcHBQYWNrYWdlICYmIGFwcEFjdGl2aXR5KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbG9nZ2VyLmRlYnVnKFwiUGFyc2luZyBwYWNrYWdlIGFuZCBhY3Rpdml0eSBmcm9tIGFwcCBtYW5pZmVzdFwiKTtcbiAgbGV0IHthcGtQYWNrYWdlLCBhcGtBY3Rpdml0eX0gPVxuICAgIGF3YWl0IGFkYi5wYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QoYXBwKTtcbiAgaWYgKGFwa1BhY2thZ2UgJiYgIWFwcFBhY2thZ2UpIHtcbiAgICBhcHBQYWNrYWdlID0gYXBrUGFja2FnZTtcbiAgfVxuICBpZiAoIWFwcFdhaXRQYWNrYWdlKSB7XG4gICAgYXBwV2FpdFBhY2thZ2UgPSBhcHBQYWNrYWdlO1xuICB9XG4gIGlmIChhcGtBY3Rpdml0eSAmJiAhYXBwQWN0aXZpdHkpIHtcbiAgICBhcHBBY3Rpdml0eSA9IGFwa0FjdGl2aXR5O1xuICB9XG4gIGlmICghYXBwV2FpdEFjdGl2aXR5KSB7XG4gICAgYXBwV2FpdEFjdGl2aXR5ID0gYXBwQWN0aXZpdHk7XG4gIH1cbiAgbG9nZ2VyLmRlYnVnKGBQYXJzZWQgcGFja2FnZSBhbmQgYWN0aXZpdHkgYXJlOiAke2Fwa1BhY2thZ2V9LyR7YXBrQWN0aXZpdHl9YCk7XG4gIHJldHVybiB7YXBwUGFja2FnZSwgYXBwV2FpdFBhY2thZ2UsIGFwcEFjdGl2aXR5LCBhcHBXYWl0QWN0aXZpdHl9O1xufTtcblxuaGVscGVycy5nZXRSZW1vdGVBcGtQYXRoID0gZnVuY3Rpb24gKGxvY2FsQXBrTWQ1KSB7XG4gIGxldCByZW1vdGVQYXRoID0gYCR7UkVNT1RFX1RFTVBfUEFUSH0vJHtsb2NhbEFwa01kNX0uYXBrYDtcbiAgbG9nZ2VyLmluZm8oYFJlbW90ZSBhcGsgcGF0aCBpcyAke3JlbW90ZVBhdGh9YCk7XG4gIHJldHVybiByZW1vdGVQYXRoO1xufTtcblxuaGVscGVycy5yZXNldEFwcCA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCBmYXN0UmVzZXQsIGFuZHJvaWRJbnN0YWxsVGltZW91dCA9IFJFTU9URV9JTlNUQUxMX1RJTUVPVVQpIHtcbiAgaWYgKGZhc3RSZXNldCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIlJ1bm5pbmcgZmFzdCByZXNldCAoc3RvcCBhbmQgY2xlYXIpXCIpO1xuICAgIGF3YWl0IGFkYi5zdG9wQW5kQ2xlYXIocGtnKTtcbiAgfSBlbHNlIHtcbiAgICBsb2dnZXIuZGVidWcoXCJSdW5uaW5nIG9sZCBmYXNoaW9uIHJlc2V0IChyZWluc3RhbGwpXCIpO1xuICAgIGxldCBhcGtNZDUgPSBhd2FpdCBmcy5tZDUobG9jYWxBcGtQYXRoKTtcbiAgICBsZXQgcmVtb3RlUGF0aCA9IGhlbHBlcnMuZ2V0UmVtb3RlQXBrUGF0aChhcGtNZDUsIGxvY2FsQXBrUGF0aCk7XG4gICAgaWYgKCFhd2FpdCBhZGIuZmlsZUV4aXN0cyhyZW1vdGVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2FuJ3QgcnVuIHNsb3cgcmVzZXQgd2l0aG91dCBhIHJlbW90ZSBhcGshXCIpO1xuICAgIH1cbiAgICBhd2FpdCBoZWxwZXJzLnJlaW5zdGFsbFJlbW90ZUFwayhhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCByZW1vdGVQYXRoLCBhbmRyb2lkSW5zdGFsbFRpbWVvdXQpO1xuICB9XG59O1xuXG5oZWxwZXJzLnJlaW5zdGFsbFJlbW90ZUFwayA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3RlUGF0aCwgYW5kcm9pZEluc3RhbGxUaW1lb3V0LCB0cmllcyA9IDIpIHtcbiAgYXdhaXQgcmV0cnkodHJpZXMsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gZmlyc3QgZG8gYW4gdW5pbnN0YWxsIG9mIHRoZSBwYWNrYWdlIHRvIG1ha2Ugc3VyZSBpdCdzIG5vdCB0aGVyZVxuICAgICAgYXdhaXQgYWRiLnVuaW5zdGFsbEFwayhwa2cpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci53YXJuKFwiVW5pbnN0YWxsaW5nIHJlbW90ZSBBUEsgZmFpbGVkLCBtYXliZSBpdCB3YXNuJ3QgaW5zdGFsbGVkXCIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgYXdhaXQgYWRiLmluc3RhbGxGcm9tRGV2aWNlUGF0aChyZW1vdGVQYXRoLCB7dGltZW91dDogYW5kcm9pZEluc3RhbGxUaW1lb3V0fSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLndhcm4oXCJJbnN0YWxsaW5nIHJlbW90ZSBBUEsgZmFpbGVkLCBnb2luZyB0byB1bmluc3RhbGwgYW5kIHRyeSBcIiArXG4gICAgICAgICAgICAgICAgICBcImFnYWluXCIpO1xuICAgICAgLy8gaWYgcmVtb3RlIGluc3RhbGwgZmFpbGVkLCByZW1vdmUgQUxMIHRoZSBhcGtzIGFuZCByZS1wdXNoIG91cnNcbiAgICAgIC8vIHRvIHRoZSByZW1vdGUgY2FjaGVcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVtb3ZlUmVtb3RlQXBrcyhhZGIpO1xuICAgICAgYXdhaXQgYWRiLnB1c2gobG9jYWxBcGtQYXRoLCByZW1vdGVQYXRoKTtcbiAgICAgIHRocm93IGU7IC8vIHRocm93IGFuIGVycm9yIHRvIHRyaWdnZXIgdGhlIHJldHJ5XG4gICAgfVxuICB9KTtcbn07XG5cbmhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5ID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgb3B0cykge1xuICBsZXQge2FwcCwgYXBwUGFja2FnZSwgZmFzdFJlc2V0LCBhbmRyb2lkSW5zdGFsbFRpbWVvdXR9ID0gb3B0cztcblxuICBsZXQgYXBrTWQ1ID0gYXdhaXQgZnMubWQ1KGFwcCk7XG4gIGxldCByZW1vdGVQYXRoID0gYXdhaXQgaGVscGVycy5nZXRSZW1vdGVBcGtQYXRoKGFwa01kNSwgYXBwKTtcbiAgbGV0IHJlbW90ZUFwa0V4aXN0cyA9IGF3YWl0IGFkYi5maWxlRXhpc3RzKHJlbW90ZVBhdGgpO1xuICBsb2dnZXIuZGVidWcoXCJDaGVja2luZyBpZiBhcHAgaXMgaW5zdGFsbGVkXCIpO1xuICBsZXQgaW5zdGFsbGVkID0gYXdhaXQgYWRiLmlzQXBwSW5zdGFsbGVkKGFwcFBhY2thZ2UpO1xuXG4gIGlmIChpbnN0YWxsZWQgJiYgcmVtb3RlQXBrRXhpc3RzICYmIGZhc3RSZXNldCkge1xuICAgIGxvZ2dlci5pbmZvKFwiQXBrIGlzIGFscmVhZHkgb24gcmVtb3RlIGFuZCBpbnN0YWxsZWQsIHJlc2V0dGluZ1wiKTtcbiAgICBhd2FpdCBoZWxwZXJzLnJlc2V0QXBwKGFkYiwgYXBwLCBhcHBQYWNrYWdlLCBmYXN0UmVzZXQsIGFuZHJvaWRJbnN0YWxsVGltZW91dCk7XG4gIH0gZWxzZSBpZiAoIWluc3RhbGxlZCB8fCAoIXJlbW90ZUFwa0V4aXN0cyAmJiBmYXN0UmVzZXQpKSB7XG4gICAgaWYgKCFpbnN0YWxsZWQpIHtcbiAgICAgIGxvZ2dlci5pbmZvKFwiQXBrIGlzIG5vdCB5ZXQgaW5zdGFsbGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuaW5mbyhcIkFwayB3YXMgYWxyZWFkeSBpbnN0YWxsZWQgYnV0IG5vdCBmcm9tIG91ciByZW1vdGUgcGF0aFwiKTtcbiAgICB9XG4gICAgbG9nZ2VyLmluZm8oYCR7aW5zdGFsbGVkID8gJ1JlJyA6ICcnfWluc3RhbGxpbmcgYXBrIGZyb20gcmVtb3RlYCk7XG4gICAgYXdhaXQgYWRiLm1rZGlyKFJFTU9URV9URU1QX1BBVEgpO1xuICAgIGxvZ2dlci5pbmZvKFwiQ2xlYXJpbmcgb3V0IGFueSBleGlzdGluZyByZW1vdGUgYXBrcyB3aXRoIHRoZSBzYW1lIGhhc2hcIik7XG4gICAgYXdhaXQgaGVscGVycy5yZW1vdmVSZW1vdGVBcGtzKGFkYiwgW2Fwa01kNV0pO1xuICAgIGlmICghcmVtb3RlQXBrRXhpc3RzKSB7XG4gICAgICAvLyBwdXNoIGZyb20gbG9jYWwgdG8gcmVtb3RlXG4gICAgICBsb2dnZXIuaW5mbyhgUHVzaGluZyAke2FwcFBhY2thZ2V9IHRvIGRldmljZS4gV2lsbCB3YWl0IHVwIHRvICR7YW5kcm9pZEluc3RhbGxUaW1lb3V0fSBgICtcbiAgICAgICAgICAgICAgICAgIGBtaWxsaXNlY29uZHMgYmVmb3JlIGFib3J0aW5nYCk7XG4gICAgICBhd2FpdCBhZGIucHVzaChhcHAsIHJlbW90ZVBhdGgsIHt0aW1lb3V0OiBhbmRyb2lkSW5zdGFsbFRpbWVvdXR9KTtcbiAgICB9XG5cbiAgICAvLyBOZXh0LCBpbnN0YWxsIGZyb20gdGhlIHJlbW90ZSBwYXRoLiBUaGlzIGNhbiBiZSBmbGFrZXkuIElmIGl0IGRvZXNuJ3RcbiAgICAvLyB3b3JrLCBjbGVhciBvdXQgYW55IGNhY2hlZCBhcGtzLCByZS1wdXNoIGZyb20gbG9jYWwsIGFuZCB0cnkgYWdhaW5cbiAgICBhd2FpdCBoZWxwZXJzLnJlaW5zdGFsbFJlbW90ZUFwayhhZGIsIGFwcCwgYXBwUGFja2FnZSwgcmVtb3RlUGF0aCwgYW5kcm9pZEluc3RhbGxUaW1lb3V0KTtcbiAgfVxufTtcblxuaGVscGVycy5yZW1vdmVSZW1vdGVBcGtzID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgZXhjZXB0TWQ1cyA9IG51bGwpIHtcbiAgbG9nZ2VyLmRlYnVnKFwiUmVtb3ZpbmcgYW55IG9sZCBhcGtzXCIpO1xuICBpZiAoZXhjZXB0TWQ1cykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgRXhjZXB0ICR7SlNPTi5zdHJpbmdpZnkoZXhjZXB0TWQ1cyl9YCk7XG4gIH0gZWxzZSB7XG4gICAgZXhjZXB0TWQ1cyA9IFtdO1xuICB9XG4gIGxldCBhcGtzID0gYXdhaXQgYWRiLmxzKGAke1JFTU9URV9URU1QX1BBVEh9LyouYXBrYCk7XG4gIGlmIChhcGtzLmxlbmd0aCA8IDEpIHtcbiAgICBsb2dnZXIuZGVidWcoXCJObyBhcGtzIHRvIGV4YW1pbmVcIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGFwa3MgPSBhcGtzLmZpbHRlcigoYXBrKSA9PiB7XG4gICAgZm9yIChsZXQgbWQ1IG9mIGV4Y2VwdE1kNXMpIHtcbiAgICAgIHJldHVybiBhcGsuaW5kZXhPZihtZDUpID09PSAtMTtcbiAgICB9XG4gIH0pO1xuICBmb3IgKGxldCBhcGsgb2YgYXBrcykge1xuICAgIGxvZ2dlci5pbmZvKGBXaWxsIHJlbW92ZSAke2Fwa31gKTtcbiAgICBhd2FpdCBhZGIuc2hlbGwoWydybScsICctZicsIGFwa10pO1xuICB9XG59O1xuXG5oZWxwZXJzLmluaXRVbmljb2RlS2V5Ym9hcmQgPSBhc3luYyBmdW5jdGlvbiAoYWRiKSB7XG4gIGxvZ2dlci5kZWJ1ZygnRW5hYmxpbmcgVW5pY29kZSBrZXlib2FyZCBzdXBwb3J0Jyk7XG4gIGxvZ2dlci5kZWJ1ZyhcIlB1c2hpbmcgdW5pY29kZSBpbWUgdG8gZGV2aWNlLi4uXCIpO1xuICBhd2FpdCBhZGIuaW5zdGFsbCh1bmljb2RlSU1FUGF0aCwgZmFsc2UpO1xuXG4gIC8vIGdldCB0aGUgZGVmYXVsdCBJTUUgc28gd2UgY2FuIHJldHVybiBiYWNrIHRvIGl0IGxhdGVyIGlmIHdlIHdhbnRcbiAgbGV0IGRlZmF1bHRJTUUgPSBhd2FpdCBhZGIuZGVmYXVsdElNRSgpO1xuXG4gIGxvZ2dlci5kZWJ1ZyhgVW5zZXR0aW5nIHByZXZpb3VzIElNRSAke2RlZmF1bHRJTUV9YCk7XG4gIGNvbnN0IGFwcGl1bUlNRSA9ICdpby5hcHBpdW0uYW5kcm9pZC5pbWUvLlVuaWNvZGVJTUUnO1xuICBsb2dnZXIuZGVidWcoYFNldHRpbmcgSU1FIHRvICcke2FwcGl1bUlNRX0nYCk7XG4gIGF3YWl0IGFkYi5lbmFibGVJTUUoYXBwaXVtSU1FKTtcbiAgYXdhaXQgYWRiLnNldElNRShhcHBpdW1JTUUpO1xuICByZXR1cm4gZGVmYXVsdElNRTtcbn07XG5cbmhlbHBlcnMucHVzaFNldHRpbmdzQXBwID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xuICBsb2dnZXIuZGVidWcoXCJQdXNoaW5nIHNldHRpbmdzIGFwayB0byBkZXZpY2UuLi5cIik7XG4gIGF3YWl0IGFkYi5pbnN0YWxsKHNldHRpbmdzQXBrUGF0aCwgZmFsc2UpO1xufTtcblxuaGVscGVycy5wdXNoVW5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xuICBsb2dnZXIuZGVidWcoXCJQdXNoaW5nIHVubG9jayBoZWxwZXIgYXBwIHRvIGRldmljZS4uLlwiKTtcbiAgYXdhaXQgYWRiLmluc3RhbGwodW5sb2NrQXBrUGF0aCwgZmFsc2UpO1xufTtcblxuLy8gcHVzaFN0cmluZ3MgbWV0aG9kIGV4dHJhY3RzIHN0cmluZy54bWwgYW5kIGNvbnZlcnRzIGl0IHRvIHN0cmluZy5qc29uIGFuZCBwdXNoZXNcbi8vIGl0IHRvIC9kYXRhL2xvY2FsL3RtcC9zdHJpbmcuanNvbiBvbiBmb3IgdXNlIG9mIGJvb3RzdHJhcFxuLy8gaWYgYXBwIGlzIG5vdCBwcmVzZW50IHRvIGV4dHJhY3Qgc3RyaW5nLnhtbCBpdCBkZWxldGVzIHJlbW90ZSBzdHJpbmdzLmpzb25cbi8vIGlmIGFwcCBkb2VzIG5vdCBoYXZlIHN0cmluZ3MueG1sIHdlIHB1c2ggYW4gZW1wdHkganNvbiBvYmplY3QgdG8gcmVtb3RlXG5oZWxwZXJzLnB1c2hTdHJpbmdzID0gYXN5bmMgZnVuY3Rpb24gKGxhbmd1YWdlLCBhZGIsIG9wdHMpIHtcbiAgbGV0IHJlbW90ZVBhdGggPSAnL2RhdGEvbG9jYWwvdG1wJztcbiAgbGV0IHN0cmluZ3NKc29uID0gJ3N0cmluZ3MuanNvbic7XG4gIGxldCBzdHJpbmdzVG1wRGlyID0gcGF0aC5yZXNvbHZlKG9wdHMudG1wRGlyLCBvcHRzLmFwcFBhY2thZ2UpO1xuICB0cnkge1xuICAgIGxvZ2dlci5kZWJ1ZygnRXh0cmFjdGluZyBzdHJpbmdzIGZyb20gYXBrJywgb3B0cy5hcHAsIGxhbmd1YWdlLCBzdHJpbmdzVG1wRGlyKTtcbiAgICBsZXQge2Fwa1N0cmluZ3MsIGxvY2FsUGF0aH0gPSBhd2FpdCBhZGIuZXh0cmFjdFN0cmluZ3NGcm9tQXBrKFxuICAgICAgICAgIG9wdHMuYXBwLCBsYW5ndWFnZSwgc3RyaW5nc1RtcERpcik7XG4gICAgYXdhaXQgYWRiLnB1c2gobG9jYWxQYXRoLCByZW1vdGVQYXRoKTtcbiAgICByZXR1cm4gYXBrU3RyaW5ncztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKCEoYXdhaXQgZnMuZXhpc3RzKG9wdHMuYXBwKSkpIHtcbiAgICAgIC8vIGRlbGV0ZSByZW1vdGUgc3RyaW5nLmpzb24gaWYgcHJlc2VudFxuICAgICAgYXdhaXQgYWRiLnJpbXJhZihgJHtyZW1vdGVQYXRofS8ke3N0cmluZ3NKc29ufWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIud2FybihcIkNvdWxkIG5vdCBnZXQgc3RyaW5ncywgY29udGludWluZyBhbnl3YXlcIik7XG4gICAgICBsZXQgcmVtb3RlRmlsZSA9IGAke3JlbW90ZVBhdGh9LyR7c3RyaW5nc0pzb259YDtcbiAgICAgIGF3YWl0IGFkYi5zaGVsbCgnZWNobycsIFtgJ3t9JyA+ICR7cmVtb3RlRmlsZX1gXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7fTtcbn07XG5cbmhlbHBlcnMudW5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xuICBpZiAoIShhd2FpdCBhZGIuaXNTY3JlZW5Mb2NrZWQoKSkpIHtcbiAgICBsb2dnZXIuaW5mbyhcIlNjcmVlbiBhbHJlYWR5IHVubG9ja2VkLCBkb2luZyBub3RoaW5nXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBsb2dnZXIuaW5mbyhcIlVubG9ja2luZyBzY3JlZW5cIik7XG5cbiAgYXdhaXQgcmV0cnlJbnRlcnZhbCgxMCwgMTAwMCwgYXN5bmMgKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIlNjcmVlbiBpcyBsb2NrZWQsIHRyeWluZyB0byB1bmxvY2tcIik7XG5cbiAgICAvLyBmaXJzdCBtYW51YWxseSBzdG9wIHRoZSB1bmxvY2sgYWN0aXZpdHlcbiAgICBhd2FpdCBhZGIuZm9yY2VTdG9wKCdpby5hcHBpdW0udW5sb2NrJyk7XG5cbiAgICAvLyB0aGVuIHN0YXJ0IHRoZSBhcHAgdHdpY2UsIGFzIG9uY2UgaXMgZmxha2V5XG4gICAgbGV0IHN0YXJ0T3B0cyA9IHtcbiAgICAgIHBrZzogXCJpby5hcHBpdW0udW5sb2NrXCIsXG4gICAgICBhY3Rpdml0eTogXCIuVW5sb2NrXCIsXG4gICAgICBhY3Rpb246IFwiYW5kcm9pZC5pbnRlbnQuYWN0aW9uLk1BSU5cIixcbiAgICAgIGNhdGVnb3J5OiBcImFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LkxBVU5DSEVSXCIsXG4gICAgICBmbGFnczogXCIweDEwMjAwMDAwXCIsXG4gICAgICBzdG9wQXBwOiBmYWxzZVxuICAgIH07XG4gICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHN0YXJ0T3B0cyk7XG4gICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHN0YXJ0T3B0cyk7XG5cbiAgICAvLyBjaGVjayBpZiBpdCB3b3JrZWQsIHR3aWNlXG4gICAgYXdhaXQgcmV0cnlJbnRlcnZhbCgyLCAxMDAwLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIWF3YWl0IGFkYi5pc1NjcmVlbkxvY2tlZCgpKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcIlNjcmVlbiB1bmxvY2tlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTY3JlZW4gZGlkIG5vdCB1bmxvY2sgc3VjY2Vzc2Z1bGx5LCByZXRyeWluZ1wiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5oZWxwZXJzLmluaXREZXZpY2UgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBvcHRzKSB7XG4gIGF3YWl0IGFkYi53YWl0Rm9yRGV2aWNlKCk7XG5cbiAgYXdhaXQgaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUoYWRiLCBvcHRzLmxhbmd1YWdlLCBvcHRzLmxvY2FsZSk7XG4gIGF3YWl0IGFkYi5zdGFydExvZ2NhdCgpO1xuICBsZXQgZGVmYXVsdElNRTtcbiAgaWYgKG9wdHMudW5pY29kZUtleWJvYXJkKSB7XG4gICAgZGVmYXVsdElNRSA9IGF3YWl0IGhlbHBlcnMuaW5pdFVuaWNvZGVLZXlib2FyZChhZGIpO1xuICB9XG4gIGF3YWl0IGhlbHBlcnMucHVzaFNldHRpbmdzQXBwKGFkYik7XG4gIGF3YWl0IGhlbHBlcnMucHVzaFVubG9jayhhZGIpO1xuICByZXR1cm4gZGVmYXVsdElNRTtcbn07XG5cbmhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGZvciAobGV0IGtleSBvZiBfLmtleXMob2JqKSkge1xuICAgIGlmIChfLmlzTnVsbChvYmpba2V5XSkgfHwgXy5pc1VuZGVmaW5lZChvYmpba2V5XSkpIHtcbiAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICB9XG4gIH1cbn07XG5cbmhlbHBlcnMudHJ1bmNhdGVEZWNpbWFscyA9IGZ1bmN0aW9uIChudW1iZXIsIGRpZ2l0cykge1xuICBsZXQgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBkaWdpdHMpLFxuICAgICAgYWRqdXN0ZWROdW0gPSBudW1iZXIgKiBtdWx0aXBsaWVyLFxuICAgICAgdHJ1bmNhdGVkTnVtID0gTWF0aFthZGp1c3RlZE51bSA8IDAgPyAnY2VpbCcgOiAnZmxvb3InXShhZGp1c3RlZE51bSk7XG5cbiAgcmV0dXJuIHRydW5jYXRlZE51bSAvIG11bHRpcGxpZXI7XG59O1xuXG5oZWxwZXJzLmlzQ2hyb21lQnJvd3NlciA9IGZ1bmN0aW9uIChicm93c2VyKSB7XG4gIHJldHVybiBfLmNvbnRhaW5zKENIUk9NRV9CUk9XU0VSUywgYnJvd3Nlcik7XG59O1xuXG5oZWxwZXJzLmdldENocm9tZVBrZyA9IGZ1bmN0aW9uIChicm93c2VyKSB7XG4gIGxldCBwa2csIGFjdGl2aXR5O1xuXG4gIGJyb3dzZXIgPSBicm93c2VyLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChicm93c2VyID09PSBcImNocm9taXVtXCIpIHtcbiAgICBwa2cgPSBcIm9yZy5jaHJvbWl1bS5jaHJvbWUuc2hlbGxcIjtcbiAgICBhY3Rpdml0eSA9IFwiLkNocm9tZVNoZWxsQWN0aXZpdHlcIjtcbiAgfSBlbHNlIGlmIChicm93c2VyID09PSBcImNocm9tZWJldGFcIikge1xuICAgIHBrZyA9IFwiY29tLmNocm9tZS5iZXRhXCI7XG4gICAgYWN0aXZpdHkgPSBcImNvbS5nb29nbGUuYW5kcm9pZC5hcHBzLmNocm9tZS5NYWluXCI7XG4gIH0gZWxzZSBpZiAoYnJvd3NlciA9PT0gXCJicm93c2VyXCIpIHtcbiAgICBwa2cgPSBcImNvbS5hbmRyb2lkLmJyb3dzZXJcIjtcbiAgICBhY3Rpdml0eSA9IFwiY29tLmFuZHJvaWQuYnJvd3Nlci5Ccm93c2VyQWN0aXZpdHlcIjtcbiAgfSBlbHNlIGlmIChicm93c2VyID09PSBcImNocm9taXVtLWJyb3dzZXJcIikge1xuICAgIHBrZyA9IFwib3JnLmNocm9taXVtLmNocm9tZVwiO1xuICAgIGFjdGl2aXR5ID0gXCJjb20uZ29vZ2xlLmFuZHJvaWQuYXBwcy5jaHJvbWUuTWFpblwiO1xuICB9IGVsc2Uge1xuICAgIHBrZyA9IFwiY29tLmFuZHJvaWQuY2hyb21lXCI7XG4gICAgYWN0aXZpdHkgPSBcImNvbS5nb29nbGUuYW5kcm9pZC5hcHBzLmNocm9tZS5NYWluXCI7XG4gIH1cbiAgcmV0dXJuIHtwa2csIGFjdGl2aXR5fTtcbn07XG5cbmhlbHBlcnMuYm9vdHN0cmFwID0gQm9vdHN0cmFwO1xuXG5leHBvcnQgZGVmYXVsdCBoZWxwZXJzO1xuZXhwb3J0IHsgQ0hST01FX0JST1dTRVJTIH07XG4iXX0=