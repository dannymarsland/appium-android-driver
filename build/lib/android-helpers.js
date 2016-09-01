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
        _logger2['default'].info('Looking for a device with Android ' + opts.platformVersion);

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
        return _regeneratorRuntime.awrap(helpers.reinstallRemoteApk(adb, localApkPath, pkg, remotePath));

      case 17:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.reinstallRemoteApk = function callee$0$0(adb, localApkPath, pkg, remotePath) {
  var tries = arguments.length <= 4 || arguments[4] === undefined ? 2 : arguments[4];
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
                return _regeneratorRuntime.awrap(adb.installFromDevicePath(remotePath, { timeout: 90000 }));

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
helpers.installApkRemotely = function callee$0$0(adb, localApkPath, pkg, fastReset) {
  var installTimeout, apkMd5, remotePath, remoteApkExists, installed;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        installTimeout = REMOTE_INSTALL_TIMEOUT;
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(_appiumSupport.fs.md5(localApkPath));

      case 3:
        apkMd5 = context$1$0.sent;
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(helpers.getRemoteApkPath(apkMd5, localApkPath));

      case 6:
        remotePath = context$1$0.sent;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(adb.fileExists(remotePath));

      case 9:
        remoteApkExists = context$1$0.sent;

        _logger2['default'].debug("Checking if app is installed");
        context$1$0.next = 13;
        return _regeneratorRuntime.awrap(adb.isAppInstalled(pkg));

      case 13:
        installed = context$1$0.sent;

        if (!(installed && remoteApkExists && fastReset)) {
          context$1$0.next = 20;
          break;
        }

        _logger2['default'].info("Apk is already on remote and installed, resetting");
        context$1$0.next = 18;
        return _regeneratorRuntime.awrap(helpers.resetApp(adb, localApkPath, pkg, fastReset));

      case 18:
        context$1$0.next = 34;
        break;

      case 20:
        if (!(!installed || !remoteApkExists && fastReset)) {
          context$1$0.next = 34;
          break;
        }

        if (!installed) {
          _logger2['default'].info("Apk is not yet installed");
        } else {
          _logger2['default'].info("Apk was already installed but not from our remote path");
        }
        _logger2['default'].info((installed ? 'Re' : '') + 'installing apk from remote');
        context$1$0.next = 25;
        return _regeneratorRuntime.awrap(adb.mkdir(REMOTE_TEMP_PATH));

      case 25:
        _logger2['default'].info("Clearing out any existing remote apks with the same hash");
        context$1$0.next = 28;
        return _regeneratorRuntime.awrap(helpers.removeRemoteApks(adb, [apkMd5]));

      case 28:
        if (remoteApkExists) {
          context$1$0.next = 32;
          break;
        }

        // push from local to remote
        _logger2['default'].info('Pushing ' + pkg + ' to device. Will wait up to ' + installTimeout + ' ' + 'milliseconds before aborting');
        context$1$0.next = 32;
        return _regeneratorRuntime.awrap(adb.push(localApkPath, remotePath, { timeout: installTimeout }));

      case 32:
        context$1$0.next = 34;
        return _regeneratorRuntime.awrap(helpers.reinstallRemoteApk(adb, localApkPath, pkg, remotePath));

      case 34:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9hbmRyb2lkLWhlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7b0JBQ0wsTUFBTTs7Ozs0QkFDRixjQUFjOzt3QkFDRSxVQUFVOztzQkFDNUIsVUFBVTs7Ozs2QkFDVixnQkFBZ0I7O2dDQUNJLG9CQUFvQjs7Z0NBQ25CLG9CQUFvQjs7NEJBQ3RCLGVBQWU7O3NDQUMvQiwwQkFBMEI7Ozs7eUJBQ2hDLFlBQVk7Ozs7QUFFNUIsSUFBTSxnQkFBZ0IsR0FBRyxpQkFBaUIsQ0FBQztBQUMzQyxJQUFNLHNCQUFzQixHQUFHLEtBQUssQ0FBQztBQUNyQyxJQUFNLGVBQWUsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDN0MsUUFBUSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUM3QyxrQkFBa0IsQ0FBQyxDQUFDOztBQUU3QyxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7O0FBRWpCLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLE1BQU0sRUFBRTtBQUMzQyxNQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7Ozs7QUFDL0Isc0NBQWlCLEtBQUssNEdBQUU7VUFBZixJQUFJOztBQUNYLFVBQUksSUFBSSxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDbkQsZUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7T0FDN0M7S0FDRjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELFNBQU8sSUFBSSxDQUFDO0NBQ2IsQ0FBQzs7QUFFRixPQUFPLENBQUMsY0FBYyxHQUFHO1lBR2xCLE1BQU0sRUFDUCxPQUFPOzs7OztBQUhYLDRCQUFPLEtBQUssQ0FBQyxzQkFB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QUM7R0FDbEQ7QUFDRCxTQUFPLEVBQUMsR0FBRyxFQUFILEdBQUcsRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFDLENBQUM7Q0FDeEIsQ0FBQzs7QUFFRixPQUFPLENBQUMsU0FBUyxzQ0FBWSxDQUFDOztxQkFFZixPQUFPO1FBQ2IsZUFBZSxHQUFmLGVBQWUiLCJmaWxlIjoibGliL2FuZHJvaWQtaGVscGVycy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IHsgcmV0cnksIHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7IGZzIH0gZnJvbSAnYXBwaXVtLXN1cHBvcnQnO1xuaW1wb3J0IHsgcGF0aCBhcyB1bmljb2RlSU1FUGF0aCB9IGZyb20gJ2FwcGl1bS1hbmRyb2lkLWltZSc7XG5pbXBvcnQgeyBwYXRoIGFzIHNldHRpbmdzQXBrUGF0aCB9IGZyb20gJ2lvLmFwcGl1bS5zZXR0aW5ncyc7XG5pbXBvcnQgeyBwYXRoIGFzIHVubG9ja0Fwa1BhdGggfSBmcm9tICdhcHBpdW0tdW5sb2NrJztcbmltcG9ydCBCb290c3RyYXAgZnJvbSAnYXBwaXVtLWFuZHJvaWQtYm9vdHN0cmFwJztcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XG5cbmNvbnN0IFJFTU9URV9URU1QX1BBVEggPSBcIi9kYXRhL2xvY2FsL3RtcFwiO1xuY29uc3QgUkVNT1RFX0lOU1RBTExfVElNRU9VVCA9IDkwMDAwOyAvLyBtaWxsaXNlY29uZHNcbmNvbnN0IENIUk9NRV9CUk9XU0VSUyA9IFtcIkNocm9tZVwiLCBcIkNocm9taXVtXCIsIFwiQ2hyb21lYmV0YVwiLCBcIkJyb3dzZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcImNocm9tZVwiLCBcImNocm9taXVtXCIsIFwiY2hyb21lYmV0YVwiLCBcImJyb3dzZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICBcImNocm9taXVtLWJyb3dzZXJcIl07XG5cbmxldCBoZWxwZXJzID0ge307XG5cbmhlbHBlcnMucGFyc2VKYXZhVmVyc2lvbiA9IGZ1bmN0aW9uIChzdGRlcnIpIHtcbiAgbGV0IGxpbmVzID0gc3RkZXJyLnNwbGl0KFwiXFxuXCIpO1xuICBmb3IgKGxldCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgaWYgKG5ldyBSZWdFeHAoLyhqYXZhfG9wZW5qZGspIHZlcnNpb24vKS50ZXN0KGxpbmUpKSB7XG4gICAgICByZXR1cm4gbGluZS5zcGxpdChcIiBcIilbMl0ucmVwbGFjZSgvXCIvZywgJycpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmhlbHBlcnMuZ2V0SmF2YVZlcnNpb24gPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxvZ2dlci5kZWJ1ZyhcIkdldHRpbmcgSmF2YSB2ZXJzaW9uXCIpO1xuXG4gIGxldCB7c3RkZXJyfSA9IGF3YWl0IGV4ZWMoJ2phdmEnLCBbJy12ZXJzaW9uJ10pO1xuICBsZXQgamF2YVZlciA9IGhlbHBlcnMucGFyc2VKYXZhVmVyc2lvbihzdGRlcnIpO1xuICBpZiAoamF2YVZlciA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBnZXQgdGhlIEphdmEgdmVyc2lvbi4gSXMgSmF2YSBpbnN0YWxsZWQ/XCIpO1xuICB9XG4gIGxvZ2dlci5pbmZvKGBKYXZhIHZlcnNpb24gaXM6ICR7amF2YVZlcn1gKTtcbiAgcmV0dXJuIGphdmFWZXI7XG59O1xuXG5oZWxwZXJzLnByZXBhcmVFbXVsYXRvciA9IGFzeW5jIGZ1bmN0aW9uIChhZGIsIG9wdHMpIHtcbiAgbGV0IHthdmQsIGF2ZEFyZ3MsIGxhbmd1YWdlLCBsb2NhbGUsIGF2ZExhdW5jaFRpbWVvdXQsXG4gICAgICAgYXZkUmVhZHlUaW1lb3V0fSA9IG9wdHM7XG4gIGlmICghYXZkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGxhdW5jaCBBVkQgd2l0aG91dCBBVkQgbmFtZVwiKTtcbiAgfVxuICBsZXQgYXZkTmFtZSA9IGF2ZC5yZXBsYWNlKCdAJywgJycpO1xuICBsZXQgcnVubmluZ0FWRCA9IGF3YWl0IGFkYi5nZXRSdW5uaW5nQVZEKGF2ZE5hbWUpO1xuICBpZiAocnVubmluZ0FWRCAhPT0gbnVsbCkge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIk5vdCBsYXVuY2hpbmcgQVZEIGJlY2F1c2UgaXQgaXMgYWxyZWFkeSBydW5uaW5nLlwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgYXdhaXQgYWRiLmxhdW5jaEFWRChhdmQsIGF2ZEFyZ3MsIGxhbmd1YWdlLCBsb2NhbGUsIGF2ZExhdW5jaFRpbWVvdXQsXG4gICAgICAgICAgICAgICAgICAgICAgYXZkUmVhZHlUaW1lb3V0KTtcbn07XG5cbmhlbHBlcnMuZW5zdXJlRGV2aWNlTG9jYWxlID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgbGFuZ3VhZ2UsIGNvdW50cnkpIHtcbiAgbGV0IGhhdmVMYW5ndWFnZSA9IGxhbmd1YWdlICYmIHR5cGVvZiBsYW5ndWFnZSA9PT0gXCJzdHJpbmdcIjtcbiAgbGV0IGhhdmVDb3VudHJ5ID0gY291bnRyeSAmJiB0eXBlb2YgY291bnRyeSA9PT0gXCJzdHJpbmdcIjtcbiAgaWYgKCFoYXZlTGFuZ3VhZ2UgJiYgIWhhdmVDb3VudHJ5KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gIGlmIChhd2FpdCBhZGIuZ2V0QXBpTGV2ZWwoKSA8IDIzKVxuICB7XG4gICAgbGV0IGN1ckxhbmd1YWdlID0gYXdhaXQgYWRiLmdldERldmljZUxhbmd1YWdlKCk7XG4gICAgbGV0IGN1ckNvdW50cnkgPSBhd2FpdCBhZGIuZ2V0RGV2aWNlQ291bnRyeSgpO1xuICAgIGlmIChoYXZlTGFuZ3VhZ2UgJiYgbGFuZ3VhZ2UgIT09IGN1ckxhbmd1YWdlKSB7XG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlTGFuZ3VhZ2UobGFuZ3VhZ2UpO1xuICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChoYXZlQ291bnRyeSAmJiBjb3VudHJ5ICE9PSBjdXJDb3VudHJ5KSB7XG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlQ291bnRyeShjb3VudHJ5KTtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIHsgLy9BUEkgPj0gMjNcbiAgICBsZXQgY3VyTG9jYWxlID0gYXdhaXQgYWRiLmdldERldmljZUxvY2FsZSgpO1xuICAgIGxldCBsb2NhbGU7XG4gICAgaWYgKCFoYXZlQ291bnRyeSkge1xuICAgICAgbG9jYWxlID0gbGFuZ3VhZ2UudG9Mb3dlckNhc2UoKTtcbiAgICB9IGVsc2UgaWYgKCFoYXZlTGFuZ3VhZ2UpIHtcbiAgICAgIGxvY2FsZSA9IGNvdW50cnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvY2FsZSA9IGxhbmd1YWdlLnRvTG93ZXJDYXNlKCkgKyBcIi1cIiArIGNvdW50cnkudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gICAgaWYgKGxvY2FsZSAhPT0gY3VyTG9jYWxlKSB7XG4gICAgICBhd2FpdCBhZGIuc2V0RGV2aWNlTG9jYWxlKGxvY2FsZSk7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKGNoYW5nZWQpIHtcbiAgICBhd2FpdCBhZGIucmVib290KCk7XG4gIH1cbn07XG5cbmhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzID0gYXN5bmMgZnVuY3Rpb24gKG9wdHMgPSB7fSkge1xuICAvLyB3ZSBjYW4gY3JlYXRlIGEgdGhyb3dhd2F5IEFEQiBpbnN0YW5jZSBoZXJlLCBzbyB0aGVyZSBpcyBubyBkZXBlbmRlbmN5XG4gIC8vIG9uIGluc3RhbnRpYXRpbmcgb24gZWFybGllciAoYXQgdGhpcyBwb2ludCwgd2UgaGF2ZSBubyB1ZGlkKVxuICAvLyB3ZSBjYW4gb25seSB1c2UgdGhpcyBBREIgb2JqZWN0IGZvciBjb21tYW5kcyB0aGF0IHdvdWxkIG5vdCBiZSBjb25mdXNlZFxuICAvLyBpZiBtdWx0aXBsZSBkZXZpY2VzIGFyZSBjb25uZWN0ZWRcbiAgbGV0IGFkYiA9IGF3YWl0IEFEQi5jcmVhdGVBREIoe1xuICAgIGphdmFWZXJzaW9uOiBvcHRzLmphdmFWZXJzaW9uLFxuICAgIGFkYlBvcnQ6IG9wdHMuYWRiUG9ydFxuICB9KTtcbiAgbGV0IHVkaWQgPSBvcHRzLnVkaWQ7XG4gIGxldCBlbVBvcnQgPSBudWxsO1xuXG4gIC8vIGEgc3BlY2lmaWMgYXZkIG5hbWUgd2FzIGdpdmVuLiB0cnkgdG8gaW5pdGlhbGl6ZSB3aXRoIHRoYXRcbiAgaWYgKG9wdHMuYXZkKSB7XG4gICAgYXdhaXQgaGVscGVycy5wcmVwYXJlRW11bGF0b3IoYWRiLCBvcHRzKTtcbiAgICB1ZGlkID0gYWRiLmN1ckRldmljZUlkO1xuICAgIGVtUG9ydCA9IGFkYi5lbXVsYXRvclBvcnQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gbm8gYXZkIGdpdmVuLiBsZXRzIHRyeSB3aGF0ZXZlcidzIHBsdWdnZWQgaW4gZGV2aWNlcy9lbXVsYXRvcnNcbiAgICBsb2dnZXIuaW5mbyhcIlJldHJpZXZpbmcgZGV2aWNlIGxpc3RcIik7XG4gICAgbGV0IGRldmljZXMgPSBhd2FpdCBhZGIuZ2V0RGV2aWNlc1dpdGhSZXRyeSgpO1xuXG4gICAgLy8gdWRpZCB3YXMgZ2l2ZW4sIGxldHMgdHJ5IHRvIGluaXQgd2l0aCB0aGF0IGRldmljZVxuICAgIGlmICh1ZGlkKSB7XG4gICAgICBpZiAoIV8uY29udGFpbnMoXy5wbHVjayhkZXZpY2VzLCAndWRpZCcpLCB1ZGlkKSkge1xuICAgICAgICBsb2dnZXIuZXJyb3JBbmRUaHJvdyhgRGV2aWNlICR7dWRpZH0gd2FzIG5vdCBpbiB0aGUgbGlzdCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYG9mIGNvbm5lY3RlZCBkZXZpY2VzYCk7XG4gICAgICB9XG4gICAgICBlbVBvcnQgPSBhZGIuZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZyh1ZGlkKTtcbiAgICB9IGVsc2UgaWYgKCEhb3B0cy5wbGF0Zm9ybVZlcnNpb24pIHtcbiAgICAgIC8vIGEgcGxhdGZvcm0gdmVyc2lvbiB3YXMgZ2l2ZW4uIGxldHMgdHJ5IHRvIGZpbmQgYSBkZXZpY2Ugd2l0aCB0aGUgc2FtZSBvc1xuICAgICAgbG9nZ2VyLmluZm8oYExvb2tpbmcgZm9yIGEgZGV2aWNlIHdpdGggQW5kcm9pZCAke29wdHMucGxhdGZvcm1WZXJzaW9ufWApO1xuXG4gICAgICAvLyBpbiBjYXNlIHdlIGZhaWwgdG8gZmluZCBzb21ldGhpbmcsIGdpdmUgdGhlIHVzZXIgYSB1c2VmdWwgbG9nIHRoYXQgaGFzXG4gICAgICAvLyB0aGUgZGV2aWNlIHVkaWRzIGFuZCBvcyB2ZXJzaW9ucyBzbyB0aGV5IGtub3cgd2hhdCdzIGF2YWlsYWJsZVxuICAgICAgbGV0IGF2YWlsRGV2aWNlc1N0ciA9IFtdO1xuXG4gICAgICAvLyBmaXJzdCB0cnkgc3RhcnRlZCBkZXZpY2VzL2VtdWxhdG9yc1xuICAgICAgZm9yIChsZXQgZGV2aWNlIG9mIGRldmljZXMpIHtcbiAgICAgICAgLy8gZGlyZWN0IGFkYiBjYWxscyB0byB0aGUgc3BlY2lmaWMgZGV2aWNlXG4gICAgICAgIGF3YWl0IGFkYi5zZXREZXZpY2VJZChkZXZpY2UudWRpZCk7XG4gICAgICAgIGxldCBkZXZpY2VPUyA9IGF3YWl0IGFkYi5nZXRQbGF0Zm9ybVZlcnNpb24oKTtcblxuICAgICAgICAvLyBidWlsZCB1cCBvdXIgaW5mbyBzdHJpbmcgb2YgYXZhaWxhYmxlIGRldmljZXMgYXMgd2UgaXRlcmF0ZVxuICAgICAgICBhdmFpbERldmljZXNTdHIucHVzaChgJHtkZXZpY2UudWRpZH0gKCR7ZGV2aWNlT1N9KWApO1xuXG4gICAgICAgIC8vIHdlIGRvIGEgYmVnaW5zIHdpdGggY2hlY2sgZm9yIGltcGxpZWQgd2lsZGNhcmQgbWF0Y2hpbmdcbiAgICAgICAgLy8gZWc6IDQgbWF0Y2hlcyA0LjEsIDQuMCwgNC4xLjMtc2Ftc3VuZywgZXRjXG4gICAgICAgIGlmIChkZXZpY2VPUy5pbmRleE9mKG9wdHMucGxhdGZvcm1WZXJzaW9uKSA9PT0gMCkge1xuICAgICAgICAgIHVkaWQgPSBkZXZpY2UudWRpZDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB3ZSBjb3VsZG4ndCBmaW5kIGFueXRoaW5nISBxdWl0XG4gICAgICBpZiAoIXVkaWQpIHtcbiAgICAgICAgbG9nZ2VyLmVycm9yQW5kVGhyb3coYFVuYWJsZSB0byBmaW5kIGFuIGFjdGl2ZSBkZXZpY2Ugb3IgZW11bGF0b3IgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB3aXRoIE9TICR7b3B0cy5wbGF0Zm9ybVZlcnNpb259LiBUaGUgZm9sbG93aW5nIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgYXJlIGF2YWlsYWJsZTogYCArIGF2YWlsRGV2aWNlc1N0ci5qb2luKCcsICcpKTtcbiAgICAgIH1cblxuICAgICAgZW1Qb3J0ID0gYWRiLmdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmcodWRpZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGEgdWRpZCB3YXMgbm90IGdpdmVuLCBncmFiIHRoZSBmaXJzdCBkZXZpY2Ugd2Ugc2VlXG4gICAgICB1ZGlkID0gZGV2aWNlc1swXS51ZGlkO1xuICAgICAgZW1Qb3J0ID0gYWRiLmdldFBvcnRGcm9tRW11bGF0b3JTdHJpbmcodWRpZCk7XG4gICAgfVxuICB9XG5cbiAgbG9nZ2VyLmluZm8oYFVzaW5nIGRldmljZTogJHt1ZGlkfWApO1xuICByZXR1cm4ge3VkaWQsIGVtUG9ydH07XG59O1xuXG4vLyByZXR1cm5zIGEgbmV3IGFkYiBpbnN0YW5jZSB3aXRoIGRldmljZUlkIHNldFxuaGVscGVycy5jcmVhdGVBREIgPSBhc3luYyBmdW5jdGlvbiAoamF2YVZlcnNpb24sIHVkaWQsIGVtUG9ydCwgYWRiUG9ydCkge1xuICBsZXQgYWRiID0gYXdhaXQgQURCLmNyZWF0ZUFEQih7amF2YVZlcnNpb24sIGFkYlBvcnR9KTtcblxuICBhZGIuc2V0RGV2aWNlSWQodWRpZCk7XG4gIGlmIChlbVBvcnQpIHtcbiAgICBhZGIuc2V0RW11bGF0b3JQb3J0KGVtUG9ydCk7XG4gIH1cblxuICByZXR1cm4gYWRiO1xufTtcblxuaGVscGVycy5nZXRMYXVuY2hJbmZvID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgb3B0cykge1xuICBsZXQge2FwcCwgYXBwUGFja2FnZSwgYXBwQWN0aXZpdHksIGFwcFdhaXRQYWNrYWdlLCBhcHBXYWl0QWN0aXZpdHl9ID0gb3B0cztcbiAgaWYgKCFhcHApIHtcbiAgICBsb2dnZXIud2FybihcIk5vIGFwcCBzZW50IGluLCBub3QgcGFyc2luZyBwYWNrYWdlL2FjdGl2aXR5XCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoYXBwUGFja2FnZSAmJiBhcHBBY3Rpdml0eSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZ2dlci5kZWJ1ZyhcIlBhcnNpbmcgcGFja2FnZSBhbmQgYWN0aXZpdHkgZnJvbSBhcHAgbWFuaWZlc3RcIik7XG4gIGxldCB7YXBrUGFja2FnZSwgYXBrQWN0aXZpdHl9ID1cbiAgICBhd2FpdCBhZGIucGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0KGFwcCk7XG4gIGlmIChhcGtQYWNrYWdlICYmICFhcHBQYWNrYWdlKSB7XG4gICAgYXBwUGFja2FnZSA9IGFwa1BhY2thZ2U7XG4gIH1cbiAgaWYgKCFhcHBXYWl0UGFja2FnZSkge1xuICAgIGFwcFdhaXRQYWNrYWdlID0gYXBwUGFja2FnZTtcbiAgfVxuICBpZiAoYXBrQWN0aXZpdHkgJiYgIWFwcEFjdGl2aXR5KSB7XG4gICAgYXBwQWN0aXZpdHkgPSBhcGtBY3Rpdml0eTtcbiAgfVxuICBpZiAoIWFwcFdhaXRBY3Rpdml0eSkge1xuICAgIGFwcFdhaXRBY3Rpdml0eSA9IGFwcEFjdGl2aXR5O1xuICB9XG4gIGxvZ2dlci5kZWJ1ZyhgUGFyc2VkIHBhY2thZ2UgYW5kIGFjdGl2aXR5IGFyZTogJHthcGtQYWNrYWdlfS8ke2Fwa0FjdGl2aXR5fWApO1xuICByZXR1cm4ge2FwcFBhY2thZ2UsIGFwcFdhaXRQYWNrYWdlLCBhcHBBY3Rpdml0eSwgYXBwV2FpdEFjdGl2aXR5fTtcbn07XG5cbmhlbHBlcnMuZ2V0UmVtb3RlQXBrUGF0aCA9IGZ1bmN0aW9uIChsb2NhbEFwa01kNSkge1xuICBsZXQgcmVtb3RlUGF0aCA9IGAke1JFTU9URV9URU1QX1BBVEh9LyR7bG9jYWxBcGtNZDV9LmFwa2A7XG4gIGxvZ2dlci5pbmZvKGBSZW1vdGUgYXBrIHBhdGggaXMgJHtyZW1vdGVQYXRofWApO1xuICByZXR1cm4gcmVtb3RlUGF0aDtcbn07XG5cbmhlbHBlcnMucmVzZXRBcHAgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgZmFzdFJlc2V0KSB7XG4gIGlmIChmYXN0UmVzZXQpIHtcbiAgICBsb2dnZXIuZGVidWcoXCJSdW5uaW5nIGZhc3QgcmVzZXQgKHN0b3AgYW5kIGNsZWFyKVwiKTtcbiAgICBhd2FpdCBhZGIuc3RvcEFuZENsZWFyKHBrZyk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmRlYnVnKFwiUnVubmluZyBvbGQgZmFzaGlvbiByZXNldCAocmVpbnN0YWxsKVwiKTtcbiAgICBsZXQgYXBrTWQ1ID0gYXdhaXQgZnMubWQ1KGxvY2FsQXBrUGF0aCk7XG4gICAgbGV0IHJlbW90ZVBhdGggPSBoZWxwZXJzLmdldFJlbW90ZUFwa1BhdGgoYXBrTWQ1LCBsb2NhbEFwa1BhdGgpO1xuICAgIGlmICghYXdhaXQgYWRiLmZpbGVFeGlzdHMocmVtb3RlUGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbid0IHJ1biBzbG93IHJlc2V0IHdpdGhvdXQgYSByZW1vdGUgYXBrIVwiKTtcbiAgICB9XG4gICAgYXdhaXQgaGVscGVycy5yZWluc3RhbGxSZW1vdGVBcGsoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgcmVtb3RlUGF0aCk7XG4gIH1cbn07XG5cbmhlbHBlcnMucmVpbnN0YWxsUmVtb3RlQXBrID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgbG9jYWxBcGtQYXRoLCBwa2csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdGVQYXRoLCB0cmllcyA9IDIpIHtcbiAgYXdhaXQgcmV0cnkodHJpZXMsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgLy8gZmlyc3QgZG8gYW4gdW5pbnN0YWxsIG9mIHRoZSBwYWNrYWdlIHRvIG1ha2Ugc3VyZSBpdCdzIG5vdCB0aGVyZVxuICAgICAgYXdhaXQgYWRiLnVuaW5zdGFsbEFwayhwa2cpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci53YXJuKFwiVW5pbnN0YWxsaW5nIHJlbW90ZSBBUEsgZmFpbGVkLCBtYXliZSBpdCB3YXNuJ3QgaW5zdGFsbGVkXCIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgYXdhaXQgYWRiLmluc3RhbGxGcm9tRGV2aWNlUGF0aChyZW1vdGVQYXRoLCB7dGltZW91dDogOTAwMDB9KTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dnZXIud2FybihcIkluc3RhbGxpbmcgcmVtb3RlIEFQSyBmYWlsZWQsIGdvaW5nIHRvIHVuaW5zdGFsbCBhbmQgdHJ5IFwiICtcbiAgICAgICAgICAgICAgICAgIFwiYWdhaW5cIik7XG4gICAgICAvLyBpZiByZW1vdGUgaW5zdGFsbCBmYWlsZWQsIHJlbW92ZSBBTEwgdGhlIGFwa3MgYW5kIHJlLXB1c2ggb3Vyc1xuICAgICAgLy8gdG8gdGhlIHJlbW90ZSBjYWNoZVxuICAgICAgYXdhaXQgaGVscGVycy5yZW1vdmVSZW1vdGVBcGtzKGFkYik7XG4gICAgICBhd2FpdCBhZGIucHVzaChsb2NhbEFwa1BhdGgsIHJlbW90ZVBhdGgpO1xuICAgICAgdGhyb3cgZTsgLy8gdGhyb3cgYW4gZXJyb3IgdG8gdHJpZ2dlciB0aGUgcmV0cnlcbiAgICB9XG4gIH0pO1xufTtcblxuaGVscGVycy5pbnN0YWxsQXBrUmVtb3RlbHkgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgZmFzdFJlc2V0KSB7XG4gIGxldCBpbnN0YWxsVGltZW91dCA9IFJFTU9URV9JTlNUQUxMX1RJTUVPVVQ7XG5cbiAgbGV0IGFwa01kNSA9IGF3YWl0IGZzLm1kNShsb2NhbEFwa1BhdGgpO1xuICBsZXQgcmVtb3RlUGF0aCA9IGF3YWl0IGhlbHBlcnMuZ2V0UmVtb3RlQXBrUGF0aChhcGtNZDUsIGxvY2FsQXBrUGF0aCk7XG4gIGxldCByZW1vdGVBcGtFeGlzdHMgPSBhd2FpdCBhZGIuZmlsZUV4aXN0cyhyZW1vdGVQYXRoKTtcbiAgbG9nZ2VyLmRlYnVnKFwiQ2hlY2tpbmcgaWYgYXBwIGlzIGluc3RhbGxlZFwiKTtcbiAgbGV0IGluc3RhbGxlZCA9IGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChwa2cpO1xuXG4gIGlmIChpbnN0YWxsZWQgJiYgcmVtb3RlQXBrRXhpc3RzICYmIGZhc3RSZXNldCkge1xuICAgIGxvZ2dlci5pbmZvKFwiQXBrIGlzIGFscmVhZHkgb24gcmVtb3RlIGFuZCBpbnN0YWxsZWQsIHJlc2V0dGluZ1wiKTtcbiAgICBhd2FpdCBoZWxwZXJzLnJlc2V0QXBwKGFkYiwgbG9jYWxBcGtQYXRoLCBwa2csIGZhc3RSZXNldCk7XG4gIH0gZWxzZSBpZiAoIWluc3RhbGxlZCB8fCAoIXJlbW90ZUFwa0V4aXN0cyAmJiBmYXN0UmVzZXQpKSB7XG4gICAgaWYgKCFpbnN0YWxsZWQpIHtcbiAgICAgIGxvZ2dlci5pbmZvKFwiQXBrIGlzIG5vdCB5ZXQgaW5zdGFsbGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIuaW5mbyhcIkFwayB3YXMgYWxyZWFkeSBpbnN0YWxsZWQgYnV0IG5vdCBmcm9tIG91ciByZW1vdGUgcGF0aFwiKTtcbiAgICB9XG4gICAgbG9nZ2VyLmluZm8oYCR7aW5zdGFsbGVkID8gJ1JlJyA6ICcnfWluc3RhbGxpbmcgYXBrIGZyb20gcmVtb3RlYCk7XG4gICAgYXdhaXQgYWRiLm1rZGlyKFJFTU9URV9URU1QX1BBVEgpO1xuICAgIGxvZ2dlci5pbmZvKFwiQ2xlYXJpbmcgb3V0IGFueSBleGlzdGluZyByZW1vdGUgYXBrcyB3aXRoIHRoZSBzYW1lIGhhc2hcIik7XG4gICAgYXdhaXQgaGVscGVycy5yZW1vdmVSZW1vdGVBcGtzKGFkYiwgW2Fwa01kNV0pO1xuICAgIGlmICghcmVtb3RlQXBrRXhpc3RzKSB7XG4gICAgICAvLyBwdXNoIGZyb20gbG9jYWwgdG8gcmVtb3RlXG4gICAgICBsb2dnZXIuaW5mbyhgUHVzaGluZyAke3BrZ30gdG8gZGV2aWNlLiBXaWxsIHdhaXQgdXAgdG8gJHtpbnN0YWxsVGltZW91dH0gYCArXG4gICAgICAgICAgICAgICAgICBgbWlsbGlzZWNvbmRzIGJlZm9yZSBhYm9ydGluZ2ApO1xuICAgICAgYXdhaXQgYWRiLnB1c2gobG9jYWxBcGtQYXRoLCByZW1vdGVQYXRoLCB7dGltZW91dDogaW5zdGFsbFRpbWVvdXR9KTtcbiAgICB9XG5cbiAgICAvLyBOZXh0LCBpbnN0YWxsIGZyb20gdGhlIHJlbW90ZSBwYXRoLiBUaGlzIGNhbiBiZSBmbGFrZXkuIElmIGl0IGRvZXNuJ3RcbiAgICAvLyB3b3JrLCBjbGVhciBvdXQgYW55IGNhY2hlZCBhcGtzLCByZS1wdXNoIGZyb20gbG9jYWwsIGFuZCB0cnkgYWdhaW5cbiAgICBhd2FpdCBoZWxwZXJzLnJlaW5zdGFsbFJlbW90ZUFwayhhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCByZW1vdGVQYXRoKTtcbiAgfVxufTtcblxuaGVscGVycy5yZW1vdmVSZW1vdGVBcGtzID0gYXN5bmMgZnVuY3Rpb24gKGFkYiwgZXhjZXB0TWQ1cyA9IG51bGwpIHtcbiAgbG9nZ2VyLmRlYnVnKFwiUmVtb3ZpbmcgYW55IG9sZCBhcGtzXCIpO1xuICBpZiAoZXhjZXB0TWQ1cykge1xuICAgIGxvZ2dlci5kZWJ1ZyhgRXhjZXB0ICR7SlNPTi5zdHJpbmdpZnkoZXhjZXB0TWQ1cyl9YCk7XG4gIH0gZWxzZSB7XG4gICAgZXhjZXB0TWQ1cyA9IFtdO1xuICB9XG4gIGxldCBhcGtzID0gYXdhaXQgYWRiLmxzKGAke1JFTU9URV9URU1QX1BBVEh9LyouYXBrYCk7XG4gIGlmIChhcGtzLmxlbmd0aCA8IDEpIHtcbiAgICBsb2dnZXIuZGVidWcoXCJObyBhcGtzIHRvIGV4YW1pbmVcIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGFwa3MgPSBhcGtzLmZpbHRlcigoYXBrKSA9PiB7XG4gICAgZm9yIChsZXQgbWQ1IG9mIGV4Y2VwdE1kNXMpIHtcbiAgICAgIHJldHVybiBhcGsuaW5kZXhPZihtZDUpID09PSAtMTtcbiAgICB9XG4gIH0pO1xuICBmb3IgKGxldCBhcGsgb2YgYXBrcykge1xuICAgIGxvZ2dlci5pbmZvKGBXaWxsIHJlbW92ZSAke2Fwa31gKTtcbiAgICBhd2FpdCBhZGIuc2hlbGwoWydybScsICctZicsIGFwa10pO1xuICB9XG59O1xuXG5oZWxwZXJzLmluaXRVbmljb2RlS2V5Ym9hcmQgPSBhc3luYyBmdW5jdGlvbiAoYWRiKSB7XG4gIGxvZ2dlci5kZWJ1ZygnRW5hYmxpbmcgVW5pY29kZSBrZXlib2FyZCBzdXBwb3J0Jyk7XG4gIGxvZ2dlci5kZWJ1ZyhcIlB1c2hpbmcgdW5pY29kZSBpbWUgdG8gZGV2aWNlLi4uXCIpO1xuICBhd2FpdCBhZGIuaW5zdGFsbCh1bmljb2RlSU1FUGF0aCwgZmFsc2UpO1xuXG4gIC8vIGdldCB0aGUgZGVmYXVsdCBJTUUgc28gd2UgY2FuIHJldHVybiBiYWNrIHRvIGl0IGxhdGVyIGlmIHdlIHdhbnRcbiAgbGV0IGRlZmF1bHRJTUUgPSBhd2FpdCBhZGIuZGVmYXVsdElNRSgpO1xuXG4gIGxvZ2dlci5kZWJ1ZyhgVW5zZXR0aW5nIHByZXZpb3VzIElNRSAke2RlZmF1bHRJTUV9YCk7XG4gIGNvbnN0IGFwcGl1bUlNRSA9ICdpby5hcHBpdW0uYW5kcm9pZC5pbWUvLlVuaWNvZGVJTUUnO1xuICBsb2dnZXIuZGVidWcoYFNldHRpbmcgSU1FIHRvICcke2FwcGl1bUlNRX0nYCk7XG4gIGF3YWl0IGFkYi5lbmFibGVJTUUoYXBwaXVtSU1FKTtcbiAgYXdhaXQgYWRiLnNldElNRShhcHBpdW1JTUUpO1xuICByZXR1cm4gZGVmYXVsdElNRTtcbn07XG5cbmhlbHBlcnMucHVzaFNldHRpbmdzQXBwID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xuICBsb2dnZXIuZGVidWcoXCJQdXNoaW5nIHNldHRpbmdzIGFwayB0byBkZXZpY2UuLi5cIik7XG4gIGF3YWl0IGFkYi5pbnN0YWxsKHNldHRpbmdzQXBrUGF0aCwgZmFsc2UpO1xufTtcblxuaGVscGVycy5wdXNoVW5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xuICBsb2dnZXIuZGVidWcoXCJQdXNoaW5nIHVubG9jayBoZWxwZXIgYXBwIHRvIGRldmljZS4uLlwiKTtcbiAgYXdhaXQgYWRiLmluc3RhbGwodW5sb2NrQXBrUGF0aCwgZmFsc2UpO1xufTtcblxuLy8gcHVzaFN0cmluZ3MgbWV0aG9kIGV4dHJhY3RzIHN0cmluZy54bWwgYW5kIGNvbnZlcnRzIGl0IHRvIHN0cmluZy5qc29uIGFuZCBwdXNoZXNcbi8vIGl0IHRvIC9kYXRhL2xvY2FsL3RtcC9zdHJpbmcuanNvbiBvbiBmb3IgdXNlIG9mIGJvb3RzdHJhcFxuLy8gaWYgYXBwIGlzIG5vdCBwcmVzZW50IHRvIGV4dHJhY3Qgc3RyaW5nLnhtbCBpdCBkZWxldGVzIHJlbW90ZSBzdHJpbmdzLmpzb25cbi8vIGlmIGFwcCBkb2VzIG5vdCBoYXZlIHN0cmluZ3MueG1sIHdlIHB1c2ggYW4gZW1wdHkganNvbiBvYmplY3QgdG8gcmVtb3RlXG5oZWxwZXJzLnB1c2hTdHJpbmdzID0gYXN5bmMgZnVuY3Rpb24gKGxhbmd1YWdlLCBhZGIsIG9wdHMpIHtcbiAgbGV0IHJlbW90ZVBhdGggPSAnL2RhdGEvbG9jYWwvdG1wJztcbiAgbGV0IHN0cmluZ3NKc29uID0gJ3N0cmluZ3MuanNvbic7XG4gIGxldCBzdHJpbmdzVG1wRGlyID0gcGF0aC5yZXNvbHZlKG9wdHMudG1wRGlyLCBvcHRzLmFwcFBhY2thZ2UpO1xuICB0cnkge1xuICAgIGxvZ2dlci5kZWJ1ZygnRXh0cmFjdGluZyBzdHJpbmdzIGZyb20gYXBrJywgb3B0cy5hcHAsIGxhbmd1YWdlLCBzdHJpbmdzVG1wRGlyKTtcbiAgICBsZXQge2Fwa1N0cmluZ3MsIGxvY2FsUGF0aH0gPSBhd2FpdCBhZGIuZXh0cmFjdFN0cmluZ3NGcm9tQXBrKFxuICAgICAgICAgIG9wdHMuYXBwLCBsYW5ndWFnZSwgc3RyaW5nc1RtcERpcik7XG4gICAgYXdhaXQgYWRiLnB1c2gobG9jYWxQYXRoLCByZW1vdGVQYXRoKTtcbiAgICByZXR1cm4gYXBrU3RyaW5ncztcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKCEoYXdhaXQgZnMuZXhpc3RzKG9wdHMuYXBwKSkpIHtcbiAgICAgIC8vIGRlbGV0ZSByZW1vdGUgc3RyaW5nLmpzb24gaWYgcHJlc2VudFxuICAgICAgYXdhaXQgYWRiLnJpbXJhZihgJHtyZW1vdGVQYXRofS8ke3N0cmluZ3NKc29ufWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2dnZXIud2FybihcIkNvdWxkIG5vdCBnZXQgc3RyaW5ncywgY29udGludWluZyBhbnl3YXlcIik7XG4gICAgICBsZXQgcmVtb3RlRmlsZSA9IGAke3JlbW90ZVBhdGh9LyR7c3RyaW5nc0pzb259YDtcbiAgICAgIGF3YWl0IGFkYi5zaGVsbCgnZWNobycsIFtgJ3t9JyA+ICR7cmVtb3RlRmlsZX1gXSk7XG4gICAgfVxuICB9XG4gIHJldHVybiB7fTtcbn07XG5cbmhlbHBlcnMudW5sb2NrID0gYXN5bmMgZnVuY3Rpb24gKGFkYikge1xuICBpZiAoIShhd2FpdCBhZGIuaXNTY3JlZW5Mb2NrZWQoKSkpIHtcbiAgICBsb2dnZXIuaW5mbyhcIlNjcmVlbiBhbHJlYWR5IHVubG9ja2VkLCBkb2luZyBub3RoaW5nXCIpO1xuICAgIHJldHVybjtcbiAgfVxuICBsb2dnZXIuaW5mbyhcIlVubG9ja2luZyBzY3JlZW5cIik7XG5cbiAgYXdhaXQgcmV0cnlJbnRlcnZhbCgxMCwgMTAwMCwgYXN5bmMgKCkgPT4ge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIlNjcmVlbiBpcyBsb2NrZWQsIHRyeWluZyB0byB1bmxvY2tcIik7XG5cbiAgICAvLyBmaXJzdCBtYW51YWxseSBzdG9wIHRoZSB1bmxvY2sgYWN0aXZpdHlcbiAgICBhd2FpdCBhZGIuZm9yY2VTdG9wKCdpby5hcHBpdW0udW5sb2NrJyk7XG5cbiAgICAvLyB0aGVuIHN0YXJ0IHRoZSBhcHAgdHdpY2UsIGFzIG9uY2UgaXMgZmxha2V5XG4gICAgbGV0IHN0YXJ0T3B0cyA9IHtcbiAgICAgIHBrZzogXCJpby5hcHBpdW0udW5sb2NrXCIsXG4gICAgICBhY3Rpdml0eTogXCIuVW5sb2NrXCIsXG4gICAgICBhY3Rpb246IFwiYW5kcm9pZC5pbnRlbnQuYWN0aW9uLk1BSU5cIixcbiAgICAgIGNhdGVnb3J5OiBcImFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LkxBVU5DSEVSXCIsXG4gICAgICBmbGFnczogXCIweDEwMjAwMDAwXCIsXG4gICAgICBzdG9wQXBwOiBmYWxzZVxuICAgIH07XG4gICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHN0YXJ0T3B0cyk7XG4gICAgYXdhaXQgYWRiLnN0YXJ0QXBwKHN0YXJ0T3B0cyk7XG5cbiAgICAvLyBjaGVjayBpZiBpdCB3b3JrZWQsIHR3aWNlXG4gICAgYXdhaXQgcmV0cnlJbnRlcnZhbCgyLCAxMDAwLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIWF3YWl0IGFkYi5pc1NjcmVlbkxvY2tlZCgpKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZyhcIlNjcmVlbiB1bmxvY2tlZCBzdWNjZXNzZnVsbHlcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJTY3JlZW4gZGlkIG5vdCB1bmxvY2sgc3VjY2Vzc2Z1bGx5LCByZXRyeWluZ1wiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG5oZWxwZXJzLmluaXREZXZpY2UgPSBhc3luYyBmdW5jdGlvbiAoYWRiLCBvcHRzKSB7XG4gIGF3YWl0IGFkYi53YWl0Rm9yRGV2aWNlKCk7XG5cbiAgYXdhaXQgaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUoYWRiLCBvcHRzLmxhbmd1YWdlLCBvcHRzLmxvY2FsZSk7XG4gIGF3YWl0IGFkYi5zdGFydExvZ2NhdCgpO1xuICBsZXQgZGVmYXVsdElNRTtcbiAgaWYgKG9wdHMudW5pY29kZUtleWJvYXJkKSB7XG4gICAgZGVmYXVsdElNRSA9IGF3YWl0IGhlbHBlcnMuaW5pdFVuaWNvZGVLZXlib2FyZChhZGIpO1xuICB9XG4gIGF3YWl0IGhlbHBlcnMucHVzaFNldHRpbmdzQXBwKGFkYik7XG4gIGF3YWl0IGhlbHBlcnMucHVzaFVubG9jayhhZGIpO1xuICByZXR1cm4gZGVmYXVsdElNRTtcbn07XG5cbmhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGZvciAobGV0IGtleSBvZiBfLmtleXMob2JqKSkge1xuICAgIGlmIChfLmlzTnVsbChvYmpba2V5XSkgfHwgXy5pc1VuZGVmaW5lZChvYmpba2V5XSkpIHtcbiAgICAgIGRlbGV0ZSBvYmpba2V5XTtcbiAgICB9XG4gIH1cbn07XG5cbmhlbHBlcnMudHJ1bmNhdGVEZWNpbWFscyA9IGZ1bmN0aW9uIChudW1iZXIsIGRpZ2l0cykge1xuICBsZXQgbXVsdGlwbGllciA9IE1hdGgucG93KDEwLCBkaWdpdHMpLFxuICAgICAgYWRqdXN0ZWROdW0gPSBudW1iZXIgKiBtdWx0aXBsaWVyLFxuICAgICAgdHJ1bmNhdGVkTnVtID0gTWF0aFthZGp1c3RlZE51bSA8IDAgPyAnY2VpbCcgOiAnZmxvb3InXShhZGp1c3RlZE51bSk7XG5cbiAgcmV0dXJuIHRydW5jYXRlZE51bSAvIG11bHRpcGxpZXI7XG59O1xuXG5oZWxwZXJzLmlzQ2hyb21lQnJvd3NlciA9IGZ1bmN0aW9uIChicm93c2VyKSB7XG4gIHJldHVybiBfLmNvbnRhaW5zKENIUk9NRV9CUk9XU0VSUywgYnJvd3Nlcik7XG59O1xuXG5oZWxwZXJzLmdldENocm9tZVBrZyA9IGZ1bmN0aW9uIChicm93c2VyKSB7XG4gIGxldCBwa2csIGFjdGl2aXR5O1xuXG4gIGJyb3dzZXIgPSBicm93c2VyLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChicm93c2VyID09PSBcImNocm9taXVtXCIpIHtcbiAgICBwa2cgPSBcIm9yZy5jaHJvbWl1bS5jaHJvbWUuc2hlbGxcIjtcbiAgICBhY3Rpdml0eSA9IFwiLkNocm9tZVNoZWxsQWN0aXZpdHlcIjtcbiAgfSBlbHNlIGlmIChicm93c2VyID09PSBcImNocm9tZWJldGFcIikge1xuICAgIHBrZyA9IFwiY29tLmNocm9tZS5iZXRhXCI7XG4gICAgYWN0aXZpdHkgPSBcImNvbS5nb29nbGUuYW5kcm9pZC5hcHBzLmNocm9tZS5NYWluXCI7XG4gIH0gZWxzZSBpZiAoYnJvd3NlciA9PT0gXCJicm93c2VyXCIpIHtcbiAgICBwa2cgPSBcImNvbS5hbmRyb2lkLmJyb3dzZXJcIjtcbiAgICBhY3Rpdml0eSA9IFwiY29tLmFuZHJvaWQuYnJvd3Nlci5Ccm93c2VyQWN0aXZpdHlcIjtcbiAgfSBlbHNlIGlmIChicm93c2VyID09PSBcImNocm9taXVtLWJyb3dzZXJcIikge1xuICAgIHBrZyA9IFwib3JnLmNocm9taXVtLmNocm9tZVwiO1xuICAgIGFjdGl2aXR5ID0gXCJjb20uZ29vZ2xlLmFuZHJvaWQuYXBwcy5jaHJvbWUuTWFpblwiO1xuICB9IGVsc2Uge1xuICAgIHBrZyA9IFwiY29tLmFuZHJvaWQuY2hyb21lXCI7XG4gICAgYWN0aXZpdHkgPSBcImNvbS5nb29nbGUuYW5kcm9pZC5hcHBzLmNocm9tZS5NYWluXCI7XG4gIH1cbiAgcmV0dXJuIHtwa2csIGFjdGl2aXR5fTtcbn07XG5cbmhlbHBlcnMuYm9vdHN0cmFwID0gQm9vdHN0cmFwO1xuXG5leHBvcnQgZGVmYXVsdCBoZWxwZXJzO1xuZXhwb3J0IHsgQ0hST01FX0JST1dTRVJTIH07XG4iXX0=