'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _appiumBaseDriver = require('appium-base-driver');

var _appiumChromedriver = require('appium-chromedriver');

var _appiumChromedriver2 = _interopRequireDefault(_appiumChromedriver);

var _desiredCaps = require('./desired-caps');

var _desiredCaps2 = _interopRequireDefault(_desiredCaps);

var _commandsIndex = require('./commands/index');

var _commandsIndex2 = _interopRequireDefault(_commandsIndex);

var _commandsContext = require('./commands/context');

var _androidHelpers = require('./android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var _webviewHelpers = require('./webview-helpers');

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumAdb = require('appium-adb');

var _appiumSupport = require('appium-support');

var _asyncbox = require('asyncbox');

var APP_EXTENSION = '.apk';
var DEVICE_PORT = 4724;

// This is a set of methods and paths that we never want to proxy to
// Chromedriver
var NO_PROXY = [['POST', new RegExp('^/session/[^/]+/context')], ['GET', new RegExp('^/session/[^/]+/context')], ['POST', new RegExp('^/session/[^/]+/appium')], ['GET', new RegExp('^/session/[^/]+/appium')], ['POST', new RegExp('^/session/[^/]+/touch/perform')], ['POST', new RegExp('^/session/[^/]+/touch/multi/perform')], ['POST', new RegExp('^/session/[^/]+/orientation')], ['GET', new RegExp('^/session/[^/]+/orientation')]];

var AndroidDriver = (function (_BaseDriver) {
  _inherits(AndroidDriver, _BaseDriver);

  function AndroidDriver() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var shouldValidateCaps = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

    _classCallCheck(this, AndroidDriver);

    _get(Object.getPrototypeOf(AndroidDriver.prototype), 'constructor', this).call(this, opts, shouldValidateCaps);
    this.locatorStrategies = ['xpath', 'id', 'class name', 'accessibility id', '-android uiautomator'];
    this.desiredCapConstraints = _desiredCaps2['default'];
    this.sessionChromedrivers = {};
    this.jwpProxyActive = false;
    this.jwpProxyAvoid = _lodash2['default'].clone(NO_PROXY);
    this.settings = new _appiumBaseDriver.DeviceSettings({ ignoreUnimportantViews: false }, this.onSettingsUpdate.bind(this));
    this.chromedriver = null;
    this.apkStrings = {};
    this.acceptSslCerts = !!opts.acceptSslCerts;
    this.bootstrapPort = opts.bootstrapPort || DEVICE_PORT;
  }

  _createClass(AndroidDriver, [{
    key: 'createSession',
    value: function createSession(caps) {
      var sessionId, _ref, _ref2, serverDetails, defaultOpts, _helpers$getChromePkg, pkg, activity, _ref3,

      // get device udid for this session
      udid, emPort;

      return _regeneratorRuntime.async(function createSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.prev = 0;
            sessionId = undefined;
            context$2$0.next = 4;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidDriver.prototype), 'createSession', this).call(this, caps));

          case 4:
            _ref = context$2$0.sent;
            _ref2 = _slicedToArray(_ref, 1);
            sessionId = _ref2[0];
            serverDetails = { platform: 'LINUX',
              webStorageEnabled: false,
              takesScreenshot: true,
              javascriptEnabled: true,
              databaseEnabled: false,
              networkConnectionEnabled: true,
              locationContextEnabled: false,
              warnings: {},
              desired: this.caps };

            this.caps = _Object$assign(serverDetails, this.caps);

            // assigning defaults
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(_appiumSupport.tempDir.staticDir());

          case 11:
            context$2$0.t0 = context$2$0.sent;
            context$2$0.t1 = _appiumAdb.DEFAULT_ADB_PORT;
            defaultOpts = {
              action: "android.intent.action.MAIN",
              category: "android.intent.category.LAUNCHER",
              flags: "0x10200000",
              disableAndroidWatchers: false,
              tmpDir: context$2$0.t0,
              fullReset: false,
              autoLaunch: true,
              adbPort: context$2$0.t1,
              androidInstallTimeout: 90000
            };

            _lodash2['default'].defaults(this.opts, defaultOpts);

            if (this.opts.javaVersion) {
              context$2$0.next = 19;
              break;
            }

            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getJavaVersion());

          case 18:
            this.opts.javaVersion = context$2$0.sent;

          case 19:

            // not user visible via caps
            if (this.opts.noReset === true) this.opts.fullReset = false;
            if (this.opts.fullReset === true) this.opts.noReset = false;
            this.opts.fastReset = !this.opts.fullReset && !this.opts.noReset;
            this.opts.skipUninstall = this.opts.fastReset || this.opts.noReset;

            this.curContext = this.defaultContextName();

            if (this.isChromeSession) {
              _logger2['default'].info("We're going to run a Chrome-based session");
              _helpers$getChromePkg = _androidHelpers2['default'].getChromePkg(this.opts.browserName);
              pkg = _helpers$getChromePkg.pkg;
              activity = _helpers$getChromePkg.activity;

              this.opts.appPackage = pkg;
              this.opts.appActivity = activity;
              _logger2['default'].info('Chrome-type package and activity are ' + pkg + ' and ' + activity);
            }

            if (this.opts.nativeWebScreenshot) {
              this.jwpProxyAvoid.push(['GET', new RegExp('^/session/[^/]+/screenshot')]);
            }context$2$0.next = 28;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getDeviceInfoFromCaps(this.opts));

          case 28:
            _ref3 = context$2$0.sent;
            udid = _ref3.udid;
            emPort = _ref3.emPort;

            this.opts.udid = udid;
            this.opts.emPort = emPort;

            // set up an instance of ADB
            context$2$0.next = 35;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].createADB(this.opts.javaVersion, this.opts.udid, this.opts.emPort, this.opts.adbPort));

          case 35:
            this.adb = context$2$0.sent;

            if (this.helpers.isPackageOrBundle(this.opts.app)) {
              // user provided package instead of app for 'app' capability, massage options
              this.opts.appPackage = this.opts.app;
              this.opts.app = null;
            }

            if (!this.opts.app) {
              context$2$0.next = 45;
              break;
            }

            context$2$0.next = 40;
            return _regeneratorRuntime.awrap(this.helpers.configureApp(this.opts.app, APP_EXTENSION));

          case 40:
            this.opts.app = context$2$0.sent;
            context$2$0.next = 43;
            return _regeneratorRuntime.awrap(this.checkAppPresent());

          case 43:
            context$2$0.next = 49;
            break;

          case 45:
            if (!this.appOnDevice) {
              context$2$0.next = 49;
              break;
            }

            // the app isn't an actual app file but rather something we want to
            // assume is on the device and just launch via the appPackage
            _logger2['default'].info('App file was not listed, instead we\'re going to run ' + (this.opts.appPackage + ' directly on the device'));
            context$2$0.next = 49;
            return _regeneratorRuntime.awrap(this.checkPackagePresent());

          case 49:
            context$2$0.next = 51;
            return _regeneratorRuntime.awrap(this.startAndroidSession(this.opts));

          case 51:
            return context$2$0.abrupt('return', [sessionId, this.caps]);

          case 54:
            context$2$0.prev = 54;
            context$2$0.t2 = context$2$0['catch'](0);
            context$2$0.next = 58;
            return _regeneratorRuntime.awrap(this.deleteSession());

          case 58:
            throw context$2$0.t2;

          case 59:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this, [[0, 54]]);
    }
  }, {
    key: 'onSettingsUpdate',
    value: function onSettingsUpdate(key, value) {
      return _regeneratorRuntime.async(function onSettingsUpdate$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!(key === "ignoreUnimportantViews")) {
              context$2$0.next = 3;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.setCompressedLayoutHierarchy(value));

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startAndroidSession',
    value: function startAndroidSession() {
      return _regeneratorRuntime.async(function startAndroidSession$(context$2$0) {
        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info('Starting Android session');
            // set up the device to run on (real or emulator, etc)
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].initDevice(this.adb, this.opts));

          case 3:
            this.defaultIME = context$2$0.sent;

            // set actual device name, udid & platform version
            this.caps.deviceName = this.adb.curDeviceId;
            this.caps.deviceUDID = this.opts.udid;
            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(this.adb.getPlatformVersion());

          case 8:
            this.caps.platformVersion = context$2$0.sent;
            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].unlock(this.adb));

          case 11:
            if (!this.opts.autoLaunch) {
              context$2$0.next = 14;
              break;
            }

            context$2$0.next = 14;
            return _regeneratorRuntime.awrap(this.initAUT());

          case 14:
            // start UiAutomator
            this.bootstrap = new _androidHelpers2['default'].bootstrap(this.adb, this.bootstrapPort, this.opts.websocket);
            context$2$0.next = 17;
            return _regeneratorRuntime.awrap(this.bootstrap.start(this.opts.appPackage, this.opts.disableAndroidWatchers));

          case 17:
            // handling unexpected shutdown
            this.bootstrap.onUnexpectedShutdown['catch'](function callee$2$0(err) {
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    if (this.bootstrap.ignoreUnexpectedShutdown) {
                      context$3$0.next = 3;
                      break;
                    }

                    context$3$0.next = 3;
                    return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(err));

                  case 3:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this);
            });

            // Set CompressedLayoutHierarchy on the device based on current settings object
            // this has to happen _after_ bootstrap is initialized

            if (!this.opts.ignoreUnimportantViews) {
              context$2$0.next = 21;
              break;
            }

            context$2$0.next = 21;
            return _regeneratorRuntime.awrap(this.settings.update({ ignoreUnimportantViews: this.opts.ignoreUnimportantViews }));

          case 21:
            if (!this.isChromeSession) {
              context$2$0.next = 26;
              break;
            }

            context$2$0.next = 24;
            return _regeneratorRuntime.awrap(this.startChromeSession());

          case 24:
            context$2$0.next = 29;
            break;

          case 26:
            if (!this.opts.autoLaunch) {
              context$2$0.next = 29;
              break;
            }

            context$2$0.next = 29;
            return _regeneratorRuntime.awrap(this.startAUT());

          case 29:
            context$2$0.next = 31;
            return _regeneratorRuntime.awrap(this.initAutoWebview());

          case 31:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'initAutoWebview',
    value: function initAutoWebview() {
      return _regeneratorRuntime.async(function initAutoWebview$(context$2$0) {
        var _this3 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!this.opts.autoWebview) {
              context$2$0.next = 3;
              break;
            }

            context$2$0.next = 3;
            return _regeneratorRuntime.awrap((function callee$2$0() {
              var viewName, timeout;
              return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                var _this2 = this;

                while (1) switch (context$3$0.prev = context$3$0.next) {
                  case 0:
                    viewName = this.defaultWebviewName();
                    timeout = this.opts.autoWebviewTimeout || 2000;

                    _logger2['default'].info('Setting auto webview to context \'' + viewName + '\' with timeout ' + timeout + 'ms');

                    // try every 500ms until timeout is over
                    context$3$0.next = 5;
                    return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(timeout / 500, 500, function callee$3$0() {
                      return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                        while (1) switch (context$4$0.prev = context$4$0.next) {
                          case 0:
                            context$4$0.next = 2;
                            return _regeneratorRuntime.awrap(this.setContext(viewName));

                          case 2:
                          case 'end':
                            return context$4$0.stop();
                        }
                      }, null, _this2);
                    }));

                  case 5:
                  case 'end':
                    return context$3$0.stop();
                }
              }, null, _this3);
            })());

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'initAUT',
    value: function initAUT() {
      var launchInfo;
      return _regeneratorRuntime.async(function initAUT$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].getLaunchInfo(this.adb, this.opts));

          case 2:
            launchInfo = context$2$0.sent;

            _Object$assign(this.opts, launchInfo);
            _Object$assign(this.caps, launchInfo);
            // install app

            if (this.opts.app) {
              context$2$0.next = 12;
              break;
            }

            if (this.opts.fullReset) {
              _logger2['default'].errorAndThrow('Full reset requires an app capability, use fastReset if app is not provided');
            }
            _logger2['default'].debug('No app capability. Assuming it is already on the device');

            if (!this.opts.fastReset) {
              context$2$0.next = 11;
              break;
            }

            context$2$0.next = 11;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].resetApp(this.adb, this.opts.app, this.opts.appPackage, this.opts.fastReset));

          case 11:
            return context$2$0.abrupt('return');

          case 12:
            if (this.opts.skipUninstall) {
              context$2$0.next = 15;
              break;
            }

            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 15:
            context$2$0.next = 17;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].installApkRemotely(this.adb, this.opts));

          case 17:
            context$2$0.next = 19;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].pushStrings(this.opts.language, this.adb, this.opts));

          case 19:
            this.apkStrings[this.opts.language] = context$2$0.sent;

          case 20:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'startChromeSession',
    value: function startChromeSession() {
      var opts, knownPackages;
      return _regeneratorRuntime.async(function startChromeSession$(context$2$0) {
        var _this4 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].info("Starting a chrome-based browser session");
            opts = _lodash2['default'].cloneDeep(this.opts);

            opts.chromeUseRunningApp = false;

            knownPackages = ["org.chromium.chrome.shell", "com.android.chrome", "com.chrome.beta", "org.chromium.chrome"];

            if (!_lodash2['default'].contains(knownPackages, this.opts.appPackage)) {
              opts.chromeAndroidActivity = this.opts.appActivity;
            }
            context$2$0.next = 7;
            return _regeneratorRuntime.awrap((0, _commandsContext.setupNewChromedriver)(opts, this.adb.curDeviceId, this.adb.getAdbServerPort()));

          case 7:
            this.chromedriver = context$2$0.sent;

            this.chromedriver.on(_appiumChromedriver2['default'].EVENT_CHANGED, function (msg) {
              if (msg.state === _appiumChromedriver2['default'].STATE_STOPPED) {
                _this4.onChromedriverStop(_webviewHelpers.CHROMIUM_WIN);
              }
            });

            // Now that we have a Chrome session, we ensure that the context is
            // appropriately set and that this chromedriver is added to the list
            // of session chromedrivers so we can switch back and forth
            this.curContext = _webviewHelpers.CHROMIUM_WIN;
            this.sessionChromedrivers[_webviewHelpers.CHROMIUM_WIN] = this.chromedriver;
            this.proxyReqRes = this.chromedriver.proxyReq.bind(this.chromedriver);
            this.jwpProxyActive = true;

          case 13:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'checkAppPresent',
    value: function checkAppPresent() {
      return _regeneratorRuntime.async(function checkAppPresent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Checking whether app is actually present");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_appiumSupport.fs.exists(this.opts.app));

          case 3:
            if (context$2$0.sent) {
              context$2$0.next = 5;
              break;
            }

            _logger2['default'].errorAndThrow('Could not find app apk at ' + this.opts.app);

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'checkPackagePresent',
    value: function checkPackagePresent() {
      return _regeneratorRuntime.async(function checkPackagePresent$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Checking whether package is present on the device");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(this.adb.shell(['pm', 'list', 'packages', this.opts.appPackage]));

          case 3:
            if (context$2$0.sent) {
              context$2$0.next = 5;
              break;
            }

            _logger2['default'].errorAndThrow('Could not find package ' + this.opts.appPackage + ' on the device');

          case 5:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }

    // Set CompressedLayoutHierarchy on the device
  }, {
    key: 'setCompressedLayoutHierarchy',
    value: function setCompressedLayoutHierarchy(compress) {
      return _regeneratorRuntime.async(function setCompressedLayoutHierarchy$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.next = 2;
            return _regeneratorRuntime.awrap(this.bootstrap.sendAction("compressedLayoutHierarchy", { compressLayout: compress }));

          case 2:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'deleteSession',
    value: function deleteSession() {
      return _regeneratorRuntime.async(function deleteSession$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _logger2['default'].debug("Shutting down Android driver");
            context$2$0.next = 3;
            return _regeneratorRuntime.awrap(_get(Object.getPrototypeOf(AndroidDriver.prototype), 'deleteSession', this).call(this));

          case 3:
            if (!this.bootstrap) {
              context$2$0.next = 23;
              break;
            }

            context$2$0.next = 6;
            return _regeneratorRuntime.awrap(this.stopChromedriverProxies());

          case 6:
            if (!(this.opts.unicodeKeyboard && this.opts.resetKeyboard && this.defaultIME)) {
              context$2$0.next = 10;
              break;
            }

            _logger2['default'].debug('Resetting IME to ' + this.defaultIME);
            context$2$0.next = 10;
            return _regeneratorRuntime.awrap(this.adb.setIME(this.defaultIME));

          case 10:
            if (this.isChromeSession) {
              context$2$0.next = 13;
              break;
            }

            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(this.adb.forceStop(this.opts.appPackage));

          case 13:
            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(this.adb.goToHome());

          case 15:
            if (!(this.opts.fullReset && !this.opts.skipUninstall && !this.appOnDevice)) {
              context$2$0.next = 18;
              break;
            }

            context$2$0.next = 18;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 18:
            context$2$0.next = 20;
            return _regeneratorRuntime.awrap(this.bootstrap.shutdown());

          case 20:
            this.bootstrap = null;
            context$2$0.next = 24;
            break;

          case 23:
            _logger2['default'].debug("Called deleteSession but bootstrap wasn't active");

          case 24:
            context$2$0.next = 26;
            return _regeneratorRuntime.awrap(this.adb.forceStop('io.appium.unlock'));

          case 26:
            context$2$0.next = 28;
            return _regeneratorRuntime.awrap(this.adb.stopLogcat());

          case 28:
          case 'end':
            return context$2$0.stop();
        }
      }, null, this);
    }
  }, {
    key: 'validateDesiredCaps',
    value: function validateDesiredCaps(caps) {
      // check with the base class, and return if it fails
      var res = _get(Object.getPrototypeOf(AndroidDriver.prototype), 'validateDesiredCaps', this).call(this, caps);
      if (!res) return res;

      // make sure that the capabilities have one of `app`, `appPackage` or `browser`
      if ((!caps.browserName || !_androidHelpers2['default'].isChromeBrowser(caps.browserName)) && !caps.app && !caps.appPackage) {
        var msg = 'The desired capabilities must include either an app, package or browser';
        _logger2['default'].errorAndThrow(msg);
      }
      // warn if the capabilities have both `app` and `browser, although this
      // is common with selenium grid
      if (caps.browserName && caps.app) {
        var msg = 'The desired capabilities should generally not include both an app and a browser';
        _logger2['default'].warn(msg);
      }
    }
  }, {
    key: 'proxyActive',
    value: function proxyActive(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'proxyActive', this).call(this, sessionId);

      return this.jwpProxyActive;
    }
  }, {
    key: 'getProxyAvoidList',
    value: function getProxyAvoidList(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'getProxyAvoidList', this).call(this, sessionId);

      return this.jwpProxyAvoid;
    }
  }, {
    key: 'canProxy',
    value: function canProxy(sessionId) {
      _get(Object.getPrototypeOf(AndroidDriver.prototype), 'canProxy', this).call(this, sessionId);

      // this will change depending on ChromeDriver status
      return _lodash2['default'].isFunction(this.proxyReqRes);
    }
  }, {
    key: 'appOnDevice',
    get: function get() {
      return this.helpers.isPackageOrBundle(this.opts.app) || !this.opts.app && this.helpers.isPackageOrBundle(this.opts.appPackage);
    }
  }, {
    key: 'isChromeSession',
    get: function get() {
      return _androidHelpers2['default'].isChromeBrowser(this.opts.browserName);
    }
  }]);

  return AndroidDriver;
})(_appiumBaseDriver.BaseDriver);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {

  for (var _iterator = _getIterator(_lodash2['default'].pairs(_commandsIndex2['default'])), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _step$value = _slicedToArray(_step.value, 2);

    var cmd = _step$value[0];
    var fn = _step$value[1];

    AndroidDriver.prototype[cmd] = fn;
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

exports['default'] = AndroidDriver;
module.exports = exports['default'];

// the whole createSession flow is surrounded in a try-catch statement
// if creating a session fails at any point, we teardown everything we
// set up before throwing the error.

// find and copy, or download and unzip an app url or path

// Let's try to unlock before installing the app
// unlock the device

// If the user sets autoLaunch to false, they are responsible for initAUT() and startAUT()

// set up app under test

// start a chromedriver session and proxy to it

// start app

// populate appPackage, appActivity, appWaitPackage, appWaitActivity,
// and the device being used
// in the opts and caps (so it gets back to the user on session creation)

// certain cleanup we only care to do if the bootstrap was ever run

// some cleanup we want to do regardless, in case we are shutting down
// mid-startup
//# sourceMappingURL=data:application/json;base64,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QUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUNoRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEFBQUMsQ0FBQztLQUM5RDs7O1NBRW1CLGVBQUc7QUFDckIsYUFBTyw0QkFBUSxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN2RDs7O1NBMUhHLGFBQWE7Ozs7Ozs7OztBQTZVbkIsb0NBQXNCLG9CQUFFLEtBQUssNEJBQVUsNEdBQUU7OztRQUEvQixHQUFHO1FBQUUsRUFBRTs7QUFDZixpQkFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7R0FDbkM7Ozs7Ozs7Ozs7Ozs7Ozs7cUJBRWMsYUFBYSIsImZpbGUiOiJsaWIvZHJpdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZURyaXZlciwgRGV2aWNlU2V0dGluZ3MgfSBmcm9tICdhcHBpdW0tYmFzZS1kcml2ZXInO1xuaW1wb3J0IENocm9tZWRyaXZlciBmcm9tICdhcHBpdW0tY2hyb21lZHJpdmVyJztcbmltcG9ydCBkZXNpcmVkQ29uc3RyYWludHMgZnJvbSAnLi9kZXNpcmVkLWNhcHMnO1xuaW1wb3J0IGNvbW1hbmRzIGZyb20gJy4vY29tbWFuZHMvaW5kZXgnO1xuaW1wb3J0IHsgc2V0dXBOZXdDaHJvbWVkcml2ZXIgfSBmcm9tICcuL2NvbW1hbmRzL2NvbnRleHQnO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi9hbmRyb2lkLWhlbHBlcnMnO1xuaW1wb3J0IHsgQ0hST01JVU1fV0lOIH0gZnJvbSAnLi93ZWJ2aWV3LWhlbHBlcnMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgREVGQVVMVF9BREJfUE9SVCB9IGZyb20gJ2FwcGl1bS1hZGInO1xuaW1wb3J0IHsgZnMsIHRlbXBEaXIgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyByZXRyeUludGVydmFsIH0gZnJvbSAnYXN5bmNib3gnO1xuXG5cbmNvbnN0IEFQUF9FWFRFTlNJT04gPSAnLmFwayc7XG5jb25zdCBERVZJQ0VfUE9SVCA9IDQ3MjQ7XG5cbi8vIFRoaXMgaXMgYSBzZXQgb2YgbWV0aG9kcyBhbmQgcGF0aHMgdGhhdCB3ZSBuZXZlciB3YW50IHRvIHByb3h5IHRvXG4vLyBDaHJvbWVkcml2ZXJcbmNvbnN0IE5PX1BST1hZID0gW1xuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvY29udGV4dCcpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvY29udGV4dCcpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL2FwcGl1bScpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvdG91Y2gvcGVyZm9ybScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3RvdWNoL211bHRpL3BlcmZvcm0nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9vcmllbnRhdGlvbicpXSxcbiAgWydHRVQnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvb3JpZW50YXRpb24nKV0sXG5dO1xuXG5jbGFzcyBBbmRyb2lkRHJpdmVyIGV4dGVuZHMgQmFzZURyaXZlciB7XG4gIGNvbnN0cnVjdG9yIChvcHRzID0ge30sIHNob3VsZFZhbGlkYXRlQ2FwcyA9IHRydWUpIHtcbiAgICBzdXBlcihvcHRzLCBzaG91bGRWYWxpZGF0ZUNhcHMpO1xuICAgIHRoaXMubG9jYXRvclN0cmF0ZWdpZXMgPSBbXG4gICAgICAneHBhdGgnLFxuICAgICAgJ2lkJyxcbiAgICAgICdjbGFzcyBuYW1lJyxcbiAgICAgICdhY2Nlc3NpYmlsaXR5IGlkJyxcbiAgICAgICctYW5kcm9pZCB1aWF1dG9tYXRvcidcbiAgICBdO1xuICAgIHRoaXMuZGVzaXJlZENhcENvbnN0cmFpbnRzID0gZGVzaXJlZENvbnN0cmFpbnRzO1xuICAgIHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnMgPSB7fTtcbiAgICB0aGlzLmp3cFByb3h5QWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5qd3BQcm94eUF2b2lkID0gXy5jbG9uZShOT19QUk9YWSk7XG4gICAgdGhpcy5zZXR0aW5ncyA9IG5ldyBEZXZpY2VTZXR0aW5ncyh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNldHRpbmdzVXBkYXRlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuY2hyb21lZHJpdmVyID0gbnVsbDtcbiAgICB0aGlzLmFwa1N0cmluZ3MgPSB7fTtcbiAgICB0aGlzLmFjY2VwdFNzbENlcnRzID0gISFvcHRzLmFjY2VwdFNzbENlcnRzO1xuICAgIHRoaXMuYm9vdHN0cmFwUG9ydCA9IG9wdHMuYm9vdHN0cmFwUG9ydCB8fCBERVZJQ0VfUE9SVDtcbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVNlc3Npb24gKGNhcHMpIHtcbiAgICAvLyB0aGUgd2hvbGUgY3JlYXRlU2Vzc2lvbiBmbG93IGlzIHN1cnJvdW5kZWQgaW4gYSB0cnktY2F0Y2ggc3RhdGVtZW50XG4gICAgLy8gaWYgY3JlYXRpbmcgYSBzZXNzaW9uIGZhaWxzIGF0IGFueSBwb2ludCwgd2UgdGVhcmRvd24gZXZlcnl0aGluZyB3ZVxuICAgIC8vIHNldCB1cCBiZWZvcmUgdGhyb3dpbmcgdGhlIGVycm9yLlxuICAgIHRyeSB7XG4gICAgICBsZXQgc2Vzc2lvbklkO1xuICAgICAgW3Nlc3Npb25JZF0gPSBhd2FpdCBzdXBlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuXG4gICAgICBsZXQgc2VydmVyRGV0YWlscyA9IHtwbGF0Zm9ybTogJ0xJTlVYJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYlN0b3JhZ2VFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRha2VzU2NyZWVuc2hvdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2VFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldHdvcmtDb25uZWN0aW9uRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uQ29udGV4dEVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2FybmluZ3M6IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzaXJlZDogdGhpcy5jYXBzfTtcblxuICAgICAgdGhpcy5jYXBzID0gT2JqZWN0LmFzc2lnbihzZXJ2ZXJEZXRhaWxzLCB0aGlzLmNhcHMpO1xuXG4gICAgICAvLyBhc3NpZ25pbmcgZGVmYXVsdHNcbiAgICAgIGxldCBkZWZhdWx0T3B0cyA9IHtcbiAgICAgICAgYWN0aW9uOiBcImFuZHJvaWQuaW50ZW50LmFjdGlvbi5NQUlOXCIsXG4gICAgICAgIGNhdGVnb3J5OiBcImFuZHJvaWQuaW50ZW50LmNhdGVnb3J5LkxBVU5DSEVSXCIsXG4gICAgICAgIGZsYWdzOiBcIjB4MTAyMDAwMDBcIixcbiAgICAgICAgZGlzYWJsZUFuZHJvaWRXYXRjaGVyczogZmFsc2UsXG4gICAgICAgIHRtcERpcjogYXdhaXQgdGVtcERpci5zdGF0aWNEaXIoKSxcbiAgICAgICAgZnVsbFJlc2V0OiBmYWxzZSxcbiAgICAgICAgYXV0b0xhdW5jaDogdHJ1ZSxcbiAgICAgICAgYWRiUG9ydDogREVGQVVMVF9BREJfUE9SVCxcbiAgICAgICAgYW5kcm9pZEluc3RhbGxUaW1lb3V0OiA5MDAwMFxuICAgICAgfTtcbiAgICAgIF8uZGVmYXVsdHModGhpcy5vcHRzLCBkZWZhdWx0T3B0cyk7XG4gICAgICBpZiAoIXRoaXMub3B0cy5qYXZhVmVyc2lvbikge1xuICAgICAgICB0aGlzLm9wdHMuamF2YVZlcnNpb24gPSBhd2FpdCBoZWxwZXJzLmdldEphdmFWZXJzaW9uKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIG5vdCB1c2VyIHZpc2libGUgdmlhIGNhcHNcbiAgICAgIGlmICh0aGlzLm9wdHMubm9SZXNldCA9PT0gdHJ1ZSkgdGhpcy5vcHRzLmZ1bGxSZXNldCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMub3B0cy5mdWxsUmVzZXQgPT09IHRydWUpIHRoaXMub3B0cy5ub1Jlc2V0ID0gZmFsc2U7XG4gICAgICB0aGlzLm9wdHMuZmFzdFJlc2V0ID0gIXRoaXMub3B0cy5mdWxsUmVzZXQgJiYgIXRoaXMub3B0cy5ub1Jlc2V0O1xuICAgICAgdGhpcy5vcHRzLnNraXBVbmluc3RhbGwgPSB0aGlzLm9wdHMuZmFzdFJlc2V0IHx8IHRoaXMub3B0cy5ub1Jlc2V0O1xuXG4gICAgICB0aGlzLmN1ckNvbnRleHQgPSB0aGlzLmRlZmF1bHRDb250ZXh0TmFtZSgpO1xuXG4gICAgICBpZiAodGhpcy5pc0Nocm9tZVNlc3Npb24pIHtcbiAgICAgICAgbG9nLmluZm8oXCJXZSdyZSBnb2luZyB0byBydW4gYSBDaHJvbWUtYmFzZWQgc2Vzc2lvblwiKTtcbiAgICAgICAgbGV0IHtwa2csIGFjdGl2aXR5fSA9IGhlbHBlcnMuZ2V0Q2hyb21lUGtnKHRoaXMub3B0cy5icm93c2VyTmFtZSk7XG4gICAgICAgIHRoaXMub3B0cy5hcHBQYWNrYWdlID0gcGtnO1xuICAgICAgICB0aGlzLm9wdHMuYXBwQWN0aXZpdHkgPSBhY3Rpdml0eTtcbiAgICAgICAgbG9nLmluZm8oYENocm9tZS10eXBlIHBhY2thZ2UgYW5kIGFjdGl2aXR5IGFyZSAke3BrZ30gYW5kICR7YWN0aXZpdHl9YCk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdHMubmF0aXZlV2ViU2NyZWVuc2hvdCkge1xuICAgICAgICB0aGlzLmp3cFByb3h5QXZvaWQucHVzaChbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9zY3JlZW5zaG90JyldKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IGRldmljZSB1ZGlkIGZvciB0aGlzIHNlc3Npb25cbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKHRoaXMub3B0cyk7XG4gICAgICB0aGlzLm9wdHMudWRpZCA9IHVkaWQ7XG4gICAgICB0aGlzLm9wdHMuZW1Qb3J0ID0gZW1Qb3J0O1xuXG4gICAgICAvLyBzZXQgdXAgYW4gaW5zdGFuY2Ugb2YgQURCXG4gICAgICB0aGlzLmFkYiA9IGF3YWl0IGhlbHBlcnMuY3JlYXRlQURCKHRoaXMub3B0cy5qYXZhVmVyc2lvbiwgdGhpcy5vcHRzLnVkaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5lbVBvcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0cy5hZGJQb3J0KTtcblxuICAgICAgaWYgKHRoaXMuaGVscGVycy5pc1BhY2thZ2VPckJ1bmRsZSh0aGlzLm9wdHMuYXBwKSl7XG4gICAgICAgIC8vIHVzZXIgcHJvdmlkZWQgcGFja2FnZSBpbnN0ZWFkIG9mIGFwcCBmb3IgJ2FwcCcgY2FwYWJpbGl0eSwgbWFzc2FnZSBvcHRpb25zXG4gICAgICAgIHRoaXMub3B0cy5hcHBQYWNrYWdlID0gdGhpcy5vcHRzLmFwcDtcbiAgICAgICAgdGhpcy5vcHRzLmFwcCA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdHMuYXBwKSB7XG4gICAgICAgIC8vIGZpbmQgYW5kIGNvcHksIG9yIGRvd25sb2FkIGFuZCB1bnppcCBhbiBhcHAgdXJsIG9yIHBhdGhcbiAgICAgICAgdGhpcy5vcHRzLmFwcCA9IGF3YWl0IHRoaXMuaGVscGVycy5jb25maWd1cmVBcHAodGhpcy5vcHRzLmFwcCwgQVBQX0VYVEVOU0lPTik7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tBcHBQcmVzZW50KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuYXBwT25EZXZpY2UpIHtcbiAgICAgICAgLy8gdGhlIGFwcCBpc24ndCBhbiBhY3R1YWwgYXBwIGZpbGUgYnV0IHJhdGhlciBzb21ldGhpbmcgd2Ugd2FudCB0b1xuICAgICAgICAvLyBhc3N1bWUgaXMgb24gdGhlIGRldmljZSBhbmQganVzdCBsYXVuY2ggdmlhIHRoZSBhcHBQYWNrYWdlXG4gICAgICAgIGxvZy5pbmZvKGBBcHAgZmlsZSB3YXMgbm90IGxpc3RlZCwgaW5zdGVhZCB3ZSdyZSBnb2luZyB0byBydW4gYCArXG4gICAgICAgICAgICAgICAgIGAke3RoaXMub3B0cy5hcHBQYWNrYWdlfSBkaXJlY3RseSBvbiB0aGUgZGV2aWNlYCk7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tQYWNrYWdlUHJlc2VudCgpO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0QW5kcm9pZFNlc3Npb24odGhpcy5vcHRzKTtcbiAgICAgIHJldHVybiBbc2Vzc2lvbklkLCB0aGlzLmNhcHNdO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgdGhyb3cgZTtcbiAgICB9XG4gIH1cblxuICBnZXQgYXBwT25EZXZpY2UgKCkge1xuICAgIHJldHVybiB0aGlzLmhlbHBlcnMuaXNQYWNrYWdlT3JCdW5kbGUodGhpcy5vcHRzLmFwcCkgfHwgKCF0aGlzLm9wdHMuYXBwICYmXG4gICAgICAgICAgIHRoaXMuaGVscGVycy5pc1BhY2thZ2VPckJ1bmRsZSh0aGlzLm9wdHMuYXBwUGFja2FnZSkpO1xuICB9XG5cbiAgZ2V0IGlzQ2hyb21lU2Vzc2lvbiAoKSB7XG4gICAgcmV0dXJuIGhlbHBlcnMuaXNDaHJvbWVCcm93c2VyKHRoaXMub3B0cy5icm93c2VyTmFtZSk7XG4gIH1cblxuICBhc3luYyBvblNldHRpbmdzVXBkYXRlIChrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSA9PT0gXCJpZ25vcmVVbmltcG9ydGFudFZpZXdzXCIpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0Q29tcHJlc3NlZExheW91dEhpZXJhcmNoeSh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc3RhcnRBbmRyb2lkU2Vzc2lvbiAoKSB7XG4gICAgbG9nLmluZm8oYFN0YXJ0aW5nIEFuZHJvaWQgc2Vzc2lvbmApO1xuICAgIC8vIHNldCB1cCB0aGUgZGV2aWNlIHRvIHJ1biBvbiAocmVhbCBvciBlbXVsYXRvciwgZXRjKVxuICAgIHRoaXMuZGVmYXVsdElNRSA9IGF3YWl0IGhlbHBlcnMuaW5pdERldmljZSh0aGlzLmFkYiwgdGhpcy5vcHRzKTtcblxuICAgIC8vIHNldCBhY3R1YWwgZGV2aWNlIG5hbWUsIHVkaWQgJiBwbGF0Zm9ybSB2ZXJzaW9uXG4gICAgdGhpcy5jYXBzLmRldmljZU5hbWUgPSB0aGlzLmFkYi5jdXJEZXZpY2VJZDtcbiAgICB0aGlzLmNhcHMuZGV2aWNlVURJRCA9IHRoaXMub3B0cy51ZGlkO1xuICAgIHRoaXMuY2Fwcy5wbGF0Zm9ybVZlcnNpb24gPSBhd2FpdCB0aGlzLmFkYi5nZXRQbGF0Zm9ybVZlcnNpb24oKTtcblxuICAgIC8vIExldCdzIHRyeSB0byB1bmxvY2sgYmVmb3JlIGluc3RhbGxpbmcgdGhlIGFwcFxuICAgIC8vIHVubG9jayB0aGUgZGV2aWNlXG4gICAgYXdhaXQgaGVscGVycy51bmxvY2sodGhpcy5hZGIpO1xuICAgIC8vIElmIHRoZSB1c2VyIHNldHMgYXV0b0xhdW5jaCB0byBmYWxzZSwgdGhleSBhcmUgcmVzcG9uc2libGUgZm9yIGluaXRBVVQoKSBhbmQgc3RhcnRBVVQoKVxuICAgIGlmICh0aGlzLm9wdHMuYXV0b0xhdW5jaCkge1xuICAgICAgLy8gc2V0IHVwIGFwcCB1bmRlciB0ZXN0XG4gICAgICBhd2FpdCB0aGlzLmluaXRBVVQoKTtcbiAgICB9XG4gICAgLy8gc3RhcnQgVWlBdXRvbWF0b3JcbiAgICB0aGlzLmJvb3RzdHJhcCA9IG5ldyBoZWxwZXJzLmJvb3RzdHJhcCh0aGlzLmFkYiwgdGhpcy5ib290c3RyYXBQb3J0LCB0aGlzLm9wdHMud2Vic29ja2V0KTtcbiAgICBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zdGFydCh0aGlzLm9wdHMuYXBwUGFja2FnZSwgdGhpcy5vcHRzLmRpc2FibGVBbmRyb2lkV2F0Y2hlcnMpO1xuICAgIC8vIGhhbmRsaW5nIHVuZXhwZWN0ZWQgc2h1dGRvd25cbiAgICB0aGlzLmJvb3RzdHJhcC5vblVuZXhwZWN0ZWRTaHV0ZG93bi5jYXRjaChhc3luYyAoZXJyKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuYm9vdHN0cmFwLmlnbm9yZVVuZXhwZWN0ZWRTaHV0ZG93bikge1xuICAgICAgICBhd2FpdCB0aGlzLnN0YXJ0VW5leHBlY3RlZFNodXRkb3duKGVycik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTZXQgQ29tcHJlc3NlZExheW91dEhpZXJhcmNoeSBvbiB0aGUgZGV2aWNlIGJhc2VkIG9uIGN1cnJlbnQgc2V0dGluZ3Mgb2JqZWN0XG4gICAgLy8gdGhpcyBoYXMgdG8gaGFwcGVuIF9hZnRlcl8gYm9vdHN0cmFwIGlzIGluaXRpYWxpemVkXG4gICAgaWYgKHRoaXMub3B0cy5pZ25vcmVVbmltcG9ydGFudFZpZXdzKSB7XG4gICAgICBhd2FpdCB0aGlzLnNldHRpbmdzLnVwZGF0ZSh7aWdub3JlVW5pbXBvcnRhbnRWaWV3czogdGhpcy5vcHRzLmlnbm9yZVVuaW1wb3J0YW50Vmlld3N9KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0Nocm9tZVNlc3Npb24pIHtcbiAgICAgIC8vIHN0YXJ0IGEgY2hyb21lZHJpdmVyIHNlc3Npb24gYW5kIHByb3h5IHRvIGl0XG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0Q2hyb21lU2Vzc2lvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcHRzLmF1dG9MYXVuY2gpIHtcbiAgICAgICAgLy8gc3RhcnQgYXBwXG4gICAgICAgIGF3YWl0IHRoaXMuc3RhcnRBVVQoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYXdhaXQgdGhpcy5pbml0QXV0b1dlYnZpZXcoKTtcbiAgfVxuXG4gIGFzeW5jIGluaXRBdXRvV2VidmlldyAoKSB7XG4gICAgaWYgKHRoaXMub3B0cy5hdXRvV2Vidmlldykge1xuICAgICAgbGV0IHZpZXdOYW1lID0gdGhpcy5kZWZhdWx0V2Vidmlld05hbWUoKTtcbiAgICAgIGxldCB0aW1lb3V0ID0gKHRoaXMub3B0cy5hdXRvV2Vidmlld1RpbWVvdXQpIHx8IDIwMDA7XG5cbiAgICAgIGxvZy5pbmZvKGBTZXR0aW5nIGF1dG8gd2VidmlldyB0byBjb250ZXh0ICcke3ZpZXdOYW1lfScgd2l0aCB0aW1lb3V0ICR7dGltZW91dH1tc2ApO1xuXG4gICAgICAvLyB0cnkgZXZlcnkgNTAwbXMgdW50aWwgdGltZW91dCBpcyBvdmVyXG4gICAgICBhd2FpdCByZXRyeUludGVydmFsKHRpbWVvdXQgLyA1MDAsIDUwMCwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB0aGlzLnNldENvbnRleHQodmlld05hbWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cblxuICBhc3luYyBpbml0QVVUICgpIHtcbiAgICAvLyBwb3B1bGF0ZSBhcHBQYWNrYWdlLCBhcHBBY3Rpdml0eSwgYXBwV2FpdFBhY2thZ2UsIGFwcFdhaXRBY3Rpdml0eSxcbiAgICAvLyBhbmQgdGhlIGRldmljZSBiZWluZyB1c2VkXG4gICAgLy8gaW4gdGhlIG9wdHMgYW5kIGNhcHMgKHNvIGl0IGdldHMgYmFjayB0byB0aGUgdXNlciBvbiBzZXNzaW9uIGNyZWF0aW9uKVxuICAgIGxldCBsYXVuY2hJbmZvID0gYXdhaXQgaGVscGVycy5nZXRMYXVuY2hJbmZvKHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRzLCBsYXVuY2hJbmZvKTtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMuY2FwcywgbGF1bmNoSW5mbyk7XG4gICAgLy8gaW5zdGFsbCBhcHBcbiAgICBpZiAoIXRoaXMub3B0cy5hcHApIHtcbiAgICAgIGlmICh0aGlzLm9wdHMuZnVsbFJlc2V0KSB7XG4gICAgICAgIGxvZy5lcnJvckFuZFRocm93KCdGdWxsIHJlc2V0IHJlcXVpcmVzIGFuIGFwcCBjYXBhYmlsaXR5LCB1c2UgZmFzdFJlc2V0IGlmIGFwcCBpcyBub3QgcHJvdmlkZWQnKTtcbiAgICAgIH1cbiAgICAgIGxvZy5kZWJ1ZygnTm8gYXBwIGNhcGFiaWxpdHkuIEFzc3VtaW5nIGl0IGlzIGFscmVhZHkgb24gdGhlIGRldmljZScpO1xuICAgICAgaWYgKHRoaXMub3B0cy5mYXN0UmVzZXQpIHtcbiAgICAgICAgYXdhaXQgaGVscGVycy5yZXNldEFwcCh0aGlzLmFkYiwgdGhpcy5vcHRzLmFwcCwgdGhpcy5vcHRzLmFwcFBhY2thZ2UsIHRoaXMub3B0cy5mYXN0UmVzZXQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMub3B0cy5za2lwVW5pbnN0YWxsKSB7XG4gICAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgIH1cbiAgICBhd2FpdCBoZWxwZXJzLmluc3RhbGxBcGtSZW1vdGVseSh0aGlzLmFkYiwgdGhpcy5vcHRzKTtcbiAgICB0aGlzLmFwa1N0cmluZ3NbdGhpcy5vcHRzLmxhbmd1YWdlXSA9IGF3YWl0IGhlbHBlcnMucHVzaFN0cmluZ3MoXG4gICAgICAgIHRoaXMub3B0cy5sYW5ndWFnZSwgdGhpcy5hZGIsIHRoaXMub3B0cyk7XG4gIH1cblxuICBhc3luYyBzdGFydENocm9tZVNlc3Npb24gKCkge1xuICAgIGxvZy5pbmZvKFwiU3RhcnRpbmcgYSBjaHJvbWUtYmFzZWQgYnJvd3NlciBzZXNzaW9uXCIpO1xuICAgIGxldCBvcHRzID0gXy5jbG9uZURlZXAodGhpcy5vcHRzKTtcbiAgICBvcHRzLmNocm9tZVVzZVJ1bm5pbmdBcHAgPSBmYWxzZTtcblxuICAgIGNvbnN0IGtub3duUGFja2FnZXMgPSBbXCJvcmcuY2hyb21pdW0uY2hyb21lLnNoZWxsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbS5hbmRyb2lkLmNocm9tZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb20uY2hyb21lLmJldGFcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwib3JnLmNocm9taXVtLmNocm9tZVwiXTtcblxuICAgIGlmICghXy5jb250YWlucyhrbm93blBhY2thZ2VzLCB0aGlzLm9wdHMuYXBwUGFja2FnZSkpIHtcbiAgICAgIG9wdHMuY2hyb21lQW5kcm9pZEFjdGl2aXR5ID0gdGhpcy5vcHRzLmFwcEFjdGl2aXR5O1xuICAgIH1cbiAgICB0aGlzLmNocm9tZWRyaXZlciA9IGF3YWl0IHNldHVwTmV3Q2hyb21lZHJpdmVyKG9wdHMsIHRoaXMuYWRiLmN1ckRldmljZUlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGIuZ2V0QWRiU2VydmVyUG9ydCgpKTtcbiAgICB0aGlzLmNocm9tZWRyaXZlci5vbihDaHJvbWVkcml2ZXIuRVZFTlRfQ0hBTkdFRCwgKG1zZykgPT4ge1xuICAgICAgaWYgKG1zZy5zdGF0ZSA9PT0gQ2hyb21lZHJpdmVyLlNUQVRFX1NUT1BQRUQpIHtcbiAgICAgICAgdGhpcy5vbkNocm9tZWRyaXZlclN0b3AoQ0hST01JVU1fV0lOKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIE5vdyB0aGF0IHdlIGhhdmUgYSBDaHJvbWUgc2Vzc2lvbiwgd2UgZW5zdXJlIHRoYXQgdGhlIGNvbnRleHQgaXNcbiAgICAvLyBhcHByb3ByaWF0ZWx5IHNldCBhbmQgdGhhdCB0aGlzIGNocm9tZWRyaXZlciBpcyBhZGRlZCB0byB0aGUgbGlzdFxuICAgIC8vIG9mIHNlc3Npb24gY2hyb21lZHJpdmVycyBzbyB3ZSBjYW4gc3dpdGNoIGJhY2sgYW5kIGZvcnRoXG4gICAgdGhpcy5jdXJDb250ZXh0ID0gQ0hST01JVU1fV0lOO1xuICAgIHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbQ0hST01JVU1fV0lOXSA9IHRoaXMuY2hyb21lZHJpdmVyO1xuICAgIHRoaXMucHJveHlSZXFSZXMgPSB0aGlzLmNocm9tZWRyaXZlci5wcm94eVJlcS5iaW5kKHRoaXMuY2hyb21lZHJpdmVyKTtcbiAgICB0aGlzLmp3cFByb3h5QWN0aXZlID0gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIGNoZWNrQXBwUHJlc2VudCAoKSB7XG4gICAgbG9nLmRlYnVnKFwiQ2hlY2tpbmcgd2hldGhlciBhcHAgaXMgYWN0dWFsbHkgcHJlc2VudFwiKTtcbiAgICBpZiAoIShhd2FpdCBmcy5leGlzdHModGhpcy5vcHRzLmFwcCkpKSB7XG4gICAgICBsb2cuZXJyb3JBbmRUaHJvdyhgQ291bGQgbm90IGZpbmQgYXBwIGFwayBhdCAke3RoaXMub3B0cy5hcHB9YCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tQYWNrYWdlUHJlc2VudCAoKSB7XG4gICAgbG9nLmRlYnVnKFwiQ2hlY2tpbmcgd2hldGhlciBwYWNrYWdlIGlzIHByZXNlbnQgb24gdGhlIGRldmljZVwiKTtcbiAgICBpZiAoIShhd2FpdCB0aGlzLmFkYi5zaGVsbChbJ3BtJywgJ2xpc3QnLCAncGFja2FnZXMnLCB0aGlzLm9wdHMuYXBwUGFja2FnZV0pKSkge1xuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBmaW5kIHBhY2thZ2UgJHt0aGlzLm9wdHMuYXBwUGFja2FnZX0gb24gdGhlIGRldmljZWApO1xuICAgIH1cbiAgfVxuXG4gIC8vIFNldCBDb21wcmVzc2VkTGF5b3V0SGllcmFyY2h5IG9uIHRoZSBkZXZpY2VcbiAgYXN5bmMgc2V0Q29tcHJlc3NlZExheW91dEhpZXJhcmNoeSAoY29tcHJlc3MpIHtcbiAgICBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiY29tcHJlc3NlZExheW91dEhpZXJhcmNoeVwiLCB7Y29tcHJlc3NMYXlvdXQ6IGNvbXByZXNzfSk7XG4gIH1cblxuICBhc3luYyBkZWxldGVTZXNzaW9uICgpIHtcbiAgICBsb2cuZGVidWcoXCJTaHV0dGluZyBkb3duIEFuZHJvaWQgZHJpdmVyXCIpO1xuICAgIGF3YWl0IHN1cGVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICBpZiAodGhpcy5ib290c3RyYXApIHtcbiAgICAgIC8vIGNlcnRhaW4gY2xlYW51cCB3ZSBvbmx5IGNhcmUgdG8gZG8gaWYgdGhlIGJvb3RzdHJhcCB3YXMgZXZlciBydW5cbiAgICAgIGF3YWl0IHRoaXMuc3RvcENocm9tZWRyaXZlclByb3hpZXMoKTtcbiAgICAgIGlmICh0aGlzLm9wdHMudW5pY29kZUtleWJvYXJkICYmIHRoaXMub3B0cy5yZXNldEtleWJvYXJkICYmIHRoaXMuZGVmYXVsdElNRSkge1xuICAgICAgICBsb2cuZGVidWcoYFJlc2V0dGluZyBJTUUgdG8gJHt0aGlzLmRlZmF1bHRJTUV9YCk7XG4gICAgICAgIGF3YWl0IHRoaXMuYWRiLnNldElNRSh0aGlzLmRlZmF1bHRJTUUpO1xuICAgICAgfVxuICAgICAgaWYgKCF0aGlzLmlzQ2hyb21lU2Vzc2lvbikge1xuICAgICAgICBhd2FpdCB0aGlzLmFkYi5mb3JjZVN0b3AodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5hZGIuZ29Ub0hvbWUoKTtcbiAgICAgIGlmICh0aGlzLm9wdHMuZnVsbFJlc2V0ICYmICF0aGlzLm9wdHMuc2tpcFVuaW5zdGFsbCAmJiAhdGhpcy5hcHBPbkRldmljZSkge1xuICAgICAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc2h1dGRvd24oKTtcbiAgICAgIHRoaXMuYm9vdHN0cmFwID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmRlYnVnKFwiQ2FsbGVkIGRlbGV0ZVNlc3Npb24gYnV0IGJvb3RzdHJhcCB3YXNuJ3QgYWN0aXZlXCIpO1xuICAgIH1cbiAgICAvLyBzb21lIGNsZWFudXAgd2Ugd2FudCB0byBkbyByZWdhcmRsZXNzLCBpbiBjYXNlIHdlIGFyZSBzaHV0dGluZyBkb3duXG4gICAgLy8gbWlkLXN0YXJ0dXBcbiAgICBhd2FpdCB0aGlzLmFkYi5mb3JjZVN0b3AoJ2lvLmFwcGl1bS51bmxvY2snKTtcbiAgICBhd2FpdCB0aGlzLmFkYi5zdG9wTG9nY2F0KCk7XG4gIH1cblxuICB2YWxpZGF0ZURlc2lyZWRDYXBzIChjYXBzKSB7XG4gICAgLy8gY2hlY2sgd2l0aCB0aGUgYmFzZSBjbGFzcywgYW5kIHJldHVybiBpZiBpdCBmYWlsc1xuICAgIGxldCByZXMgPSBzdXBlci52YWxpZGF0ZURlc2lyZWRDYXBzKGNhcHMpO1xuICAgIGlmICghcmVzKSByZXR1cm4gcmVzO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIGNhcGFiaWxpdGllcyBoYXZlIG9uZSBvZiBgYXBwYCwgYGFwcFBhY2thZ2VgIG9yIGBicm93c2VyYFxuICAgIGlmICgoIWNhcHMuYnJvd3Nlck5hbWUgfHwgIWhlbHBlcnMuaXNDaHJvbWVCcm93c2VyKGNhcHMuYnJvd3Nlck5hbWUpKSAmJlxuICAgICAgIWNhcHMuYXBwICYmICFjYXBzLmFwcFBhY2thZ2UpIHtcbiAgICAgIGxldCBtc2cgPSAnVGhlIGRlc2lyZWQgY2FwYWJpbGl0aWVzIG11c3QgaW5jbHVkZSBlaXRoZXIgYW4gYXBwLCBwYWNrYWdlIG9yIGJyb3dzZXInO1xuICAgICAgbG9nLmVycm9yQW5kVGhyb3cobXNnKTtcbiAgICB9XG4gICAgLy8gd2FybiBpZiB0aGUgY2FwYWJpbGl0aWVzIGhhdmUgYm90aCBgYXBwYCBhbmQgYGJyb3dzZXIsIGFsdGhvdWdoIHRoaXNcbiAgICAvLyBpcyBjb21tb24gd2l0aCBzZWxlbml1bSBncmlkXG4gICAgaWYgKGNhcHMuYnJvd3Nlck5hbWUgJiYgY2Fwcy5hcHApIHtcbiAgICAgIGxldCBtc2cgPSAnVGhlIGRlc2lyZWQgY2FwYWJpbGl0aWVzIHNob3VsZCBnZW5lcmFsbHkgbm90IGluY2x1ZGUgYm90aCBhbiBhcHAgYW5kIGEgYnJvd3Nlcic7XG4gICAgICBsb2cud2Fybihtc2cpO1xuICAgIH1cbiAgfVxuXG4gIHByb3h5QWN0aXZlIChzZXNzaW9uSWQpIHtcbiAgICBzdXBlci5wcm94eUFjdGl2ZShzZXNzaW9uSWQpO1xuXG4gICAgcmV0dXJuIHRoaXMuandwUHJveHlBY3RpdmU7XG4gIH1cblxuICBnZXRQcm94eUF2b2lkTGlzdCAoc2Vzc2lvbklkKSB7XG4gICAgc3VwZXIuZ2V0UHJveHlBdm9pZExpc3Qoc2Vzc2lvbklkKTtcblxuICAgIHJldHVybiB0aGlzLmp3cFByb3h5QXZvaWQ7XG4gIH1cblxuICBjYW5Qcm94eSAoc2Vzc2lvbklkKSB7XG4gICAgc3VwZXIuY2FuUHJveHkoc2Vzc2lvbklkKTtcblxuICAgIC8vIHRoaXMgd2lsbCBjaGFuZ2UgZGVwZW5kaW5nIG9uIENocm9tZURyaXZlciBzdGF0dXNcbiAgICByZXR1cm4gXy5pc0Z1bmN0aW9uKHRoaXMucHJveHlSZXFSZXMpO1xuICB9XG59XG5cbmZvciAobGV0IFtjbWQsIGZuXSBvZiBfLnBhaXJzKGNvbW1hbmRzKSkge1xuICBBbmRyb2lkRHJpdmVyLnByb3RvdHlwZVtjbWRdID0gZm47XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFuZHJvaWREcml2ZXI7XG4iXX0=