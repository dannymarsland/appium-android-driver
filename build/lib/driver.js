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
              adbPort: context$2$0.t1
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
            if (!(!this.appOnDevice && this.opts.autoLaunch)) {
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

            if (this.opts.skipUninstall) {
              context$2$0.next = 8;
              break;
            }

            context$2$0.next = 8;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 8:
            if (this.opts.app) {
              context$2$0.next = 11;
              break;
            }

            _logger2['default'].debug('No app capability. Assuming it is already on the device');
            return context$2$0.abrupt('return');

          case 11:
            context$2$0.next = 13;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].installApkRemotely(this.adb, this.opts.app, this.opts.appPackage, this.opts.fastReset));

          case 13:
            context$2$0.next = 15;
            return _regeneratorRuntime.awrap(_androidHelpers2['default'].pushStrings(this.opts.language, this.adb, this.opts));

          case 15:
            this.apkStrings[this.opts.language] = context$2$0.sent;

          case 16:
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
              context$2$0.next = 27;
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
            return _regeneratorRuntime.awrap(this.adb.forceStop('io.appium.unlock'));

          case 15:
            context$2$0.next = 17;
            return _regeneratorRuntime.awrap(this.adb.goToHome());

          case 17:
            if (!(this.opts.fullReset && !this.opts.skipUninstall && !this.appOnDevice)) {
              context$2$0.next = 20;
              break;
            }

            context$2$0.next = 20;
            return _regeneratorRuntime.awrap(this.adb.uninstallApk(this.opts.appPackage));

          case 20:
            context$2$0.next = 22;
            return _regeneratorRuntime.awrap(this.adb.stopLogcat());

          case 22:
            context$2$0.next = 24;
            return _regeneratorRuntime.awrap(this.bootstrap.shutdown());

          case 24:
            this.bootstrap = null;
            context$2$0.next = 28;
            break;

          case 27:
            _logger2['default'].warn("Cannot shut down Android driver; it has already shut down");

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

// install app
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9kcml2ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUEyQyxvQkFBb0I7O2tDQUN0QyxxQkFBcUI7Ozs7MkJBQ2YsZ0JBQWdCOzs7OzZCQUMxQixrQkFBa0I7Ozs7K0JBQ0Ysb0JBQW9COzs4QkFDckMsbUJBQW1COzs7OzhCQUNWLG1CQUFtQjs7c0JBQ2hDLFVBQVU7Ozs7c0JBQ1osUUFBUTs7Ozt5QkFDVyxZQUFZOzs2QkFDakIsZ0JBQWdCOzt3QkFDZCxVQUFVOztBQUd4QyxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDN0IsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDOzs7O0FBSXpCLElBQU0sUUFBUSxHQUFHLENBQ2YsQ0FBQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQyxFQUMvQyxDQUFDLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLEVBQzlDLENBQUMsTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUMsRUFDOUMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxFQUM3QyxDQUFDLE1BQU0sRUFBRSxJQUFJLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLEVBQ3JELENBQUMsTUFBTSxFQUFFLElBQUksTUFBTSxDQUFDLHFDQUFxQyxDQUFDLENBQUMsRUFDM0QsQ0FBQyxNQUFNLEVBQUUsSUFBSSxNQUFNLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxFQUNuRCxDQUFDLEtBQUssRUFBRSxJQUFJLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDLENBQ25ELENBQUM7O0lBRUksYUFBYTtZQUFiLGFBQWE7O0FBQ0wsV0FEUixhQUFhLEdBQ2tDO1FBQXRDLElBQUkseURBQUcsRUFBRTtRQUFFLGtCQUFrQix5REFBRyxJQUFJOzswQkFEN0MsYUFBYTs7QUFFZiwrQkFGRSxhQUFhLDZDQUVULElBQUksRUFBRSxrQkFBa0IsRUFBRTtBQUNoQyxRQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FDdkIsT0FBTyxFQUNQLElBQUksRUFDSixZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLHNCQUFzQixDQUN2QixDQUFDO0FBQ0YsUUFBSSxDQUFDLHFCQUFxQiwyQkFBcUIsQ0FBQztBQUNoRCxRQUFJLENBQUMsb0JBQW9CLEdBQUcsRUFBRSxDQUFDO0FBQy9CLFFBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBQzVCLFFBQUksQ0FBQyxhQUFhLEdBQUcsb0JBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLFFBQUksQ0FBQyxRQUFRLEdBQUcscUNBQW1CLEVBQUMsc0JBQXNCLEVBQUUsS0FBSyxFQUFDLEVBQy9CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNyRSxRQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztBQUN6QixRQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQztBQUNyQixRQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDO0FBQzVDLFFBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxXQUFXLENBQUM7R0FDeEQ7O2VBcEJHLGFBQWE7O1dBc0JHLHVCQUFDLElBQUk7VUFLakIsU0FBUyxlQUdULGFBQWEsRUFhYixXQUFXLHlCQXlCUixHQUFHLEVBQUUsUUFBUTs7O0FBV2YsVUFBSSxFQUFFLE1BQU07Ozs7OztBQXBEYixxQkFBUzs7d0VBM0JiLGFBQWEsK0NBNEIyQixJQUFJOzs7OztBQUEzQyxxQkFBUztBQUVOLHlCQUFhLEdBQUcsRUFBQyxRQUFRLEVBQUUsT0FBTztBQUNqQiwrQkFBaUIsRUFBRSxLQUFLO0FBQ3hCLDZCQUFlLEVBQUUsSUFBSTtBQUNyQiwrQkFBaUIsRUFBRSxJQUFJO0FBQ3ZCLDZCQUFlLEVBQUUsS0FBSztBQUN0QixzQ0FBd0IsRUFBRSxJQUFJO0FBQzlCLG9DQUFzQixFQUFFLEtBQUs7QUFDN0Isc0JBQVEsRUFBRSxFQUFFO0FBQ1oscUJBQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDOztBQUV4QyxnQkFBSSxDQUFDLElBQUksR0FBRyxlQUFjLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7NkNBUXBDLHVCQUFRLFNBQVMsRUFBRTs7Ozs7QUFML0IsdUJBQVc7QUFDYixvQkFBTSxFQUFFLDRCQUE0QjtBQUNwQyxzQkFBUSxFQUFFLGtDQUFrQztBQUM1QyxtQkFBSyxFQUFFLFlBQVk7QUFDbkIsb0NBQXNCLEVBQUUsS0FBSztBQUM3QixvQkFBTTtBQUNOLHVCQUFTLEVBQUUsS0FBSztBQUNoQix3QkFBVSxFQUFFLElBQUk7QUFDaEIscUJBQU87OztBQUVULGdDQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDOztnQkFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXOzs7Ozs7NkNBQ00sNEJBQVEsY0FBYyxFQUFFOzs7QUFBdEQsZ0JBQUksQ0FBQyxJQUFJLENBQUMsV0FBVzs7Ozs7QUFJdkIsZ0JBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUM1RCxnQkFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQzVELGdCQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDakUsZ0JBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOztBQUVuRSxnQkFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzs7QUFFNUMsZ0JBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUN4QixrQ0FBSSxJQUFJLENBQUMsMkNBQTJDLENBQUMsQ0FBQztzQ0FDaEMsNEJBQVEsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQTVELGlCQUFHLHlCQUFILEdBQUc7QUFBRSxzQkFBUSx5QkFBUixRQUFROztBQUNsQixrQkFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBQzNCLGtCQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUM7QUFDakMsa0NBQUksSUFBSSwyQ0FBeUMsR0FBRyxhQUFRLFFBQVEsQ0FBRyxDQUFDO2FBQ3pFOztBQUVELGdCQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7QUFDakMsa0JBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVFOzZDQUcwQiw0QkFBUSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0FBQTlELGdCQUFJLFNBQUosSUFBSTtBQUFFLGtCQUFNLFNBQU4sTUFBTTs7QUFDakIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUN0QixnQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOzs7OzZDQUdULDRCQUFRLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7QUFGckQsZ0JBQUksQ0FBQyxHQUFHOztBQUlSLGdCQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQzs7QUFFaEQsa0JBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ3JDLGtCQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7YUFDdEI7O2lCQUVHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzs7Ozs7OzZDQUVPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQzs7O0FBQTdFLGdCQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7OzZDQUNQLElBQUksQ0FBQyxlQUFlLEVBQUU7Ozs7Ozs7aUJBQ25CLElBQUksQ0FBQyxXQUFXOzs7Ozs7O0FBR3pCLGdDQUFJLElBQUksQ0FBQywyREFDRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsNkJBQXlCLENBQUMsQ0FBQzs7NkNBQ3JELElBQUksQ0FBQyxtQkFBbUIsRUFBRTs7Ozs2Q0FHNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7OztnREFDbEMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OzZDQUV2QixJQUFJLENBQUMsYUFBYSxFQUFFOzs7Ozs7Ozs7O0tBRzdCOzs7V0FXc0IsMEJBQUMsR0FBRyxFQUFFLEtBQUs7Ozs7a0JBQzVCLEdBQUcsS0FBSyx3QkFBd0IsQ0FBQTs7Ozs7OzZDQUM1QixJQUFJLENBQUMsNEJBQTRCLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0tBRWpEOzs7V0FFeUI7Ozs7OztBQUN4QixnQ0FBSSxJQUFJLDRCQUE0QixDQUFDOzs7NkNBRWIsNEJBQVEsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQzs7O0FBQS9ELGdCQUFJLENBQUMsVUFBVTs7O0FBR2YsZ0JBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDO0FBQzVDLGdCQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7NkNBQ0osSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTs7O0FBQS9ELGdCQUFJLENBQUMsSUFBSSxDQUFDLGVBQWU7OzZDQUluQiw0QkFBUSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7O2tCQUUxQixDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUE7Ozs7Ozs2Q0FFckMsSUFBSSxDQUFDLE9BQU8sRUFBRTs7OztBQUd0QixnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLDRCQUFRLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7NkNBQ3BGLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUM7Ozs7QUFFbEYsZ0JBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLFNBQU0sQ0FBQyxvQkFBTyxHQUFHOzs7O3dCQUM3QyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3Qjs7Ozs7O3FEQUNwQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxDQUFDOzs7Ozs7O2FBRTFDLENBQUMsQ0FBQzs7Ozs7aUJBSUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0I7Ozs7Ozs2Q0FDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixFQUFDLENBQUM7OztpQkFHcEYsSUFBSSxDQUFDLGVBQWU7Ozs7Ozs2Q0FFaEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFOzs7Ozs7O2lCQUUzQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVU7Ozs7Ozs2Q0FFaEIsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs2Q0FHbkIsSUFBSSxDQUFDLGVBQWUsRUFBRTs7Ozs7OztLQUM3Qjs7O1dBRXFCOzs7Ozs7aUJBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVzs7Ozs7OztrQkFDbkIsUUFBUSxFQUNSLE9BQU87Ozs7OztBQURQLDRCQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFO0FBQ3BDLDJCQUFPLEdBQUcsQUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFLLElBQUk7O0FBRXBELHdDQUFJLElBQUksd0NBQXFDLFFBQVEsd0JBQWtCLE9BQU8sUUFBSyxDQUFDOzs7O3FEQUc5RSw2QkFBYyxPQUFPLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRTs7Ozs7NkRBQ2hDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDOzs7Ozs7O3FCQUNoQyxDQUFDOzs7Ozs7Ozs7Ozs7OztLQUVMOzs7V0FHYTtVQUlSLFVBQVU7Ozs7OzZDQUFTLDRCQUFRLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7OztBQUE3RCxzQkFBVTs7QUFDZCwyQkFBYyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLDJCQUFjLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7O2dCQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7Ozs7Ozs2Q0FDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7OztnQkFHOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHOzs7OztBQUNoQixnQ0FBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQzs7Ozs7NkNBR2pFLDRCQUFRLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Ozs7NkNBQ3hELDRCQUFRLFdBQVcsQ0FDM0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7QUFENUMsZ0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7Ozs7S0FFcEM7OztXQUV3QjtVQUVuQixJQUFJLEVBR0YsYUFBYTs7Ozs7O0FBSm5CLGdDQUFJLElBQUksQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ2hELGdCQUFJLEdBQUcsb0JBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O0FBQ2pDLGdCQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDOztBQUUzQix5QkFBYSxHQUFHLENBQUMsMkJBQTJCLEVBQzNCLG9CQUFvQixFQUNwQixpQkFBaUIsRUFDakIscUJBQXFCLENBQUM7O0FBRTdDLGdCQUFJLENBQUMsb0JBQUUsUUFBUSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3BELGtCQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDcEQ7OzZDQUN5QiwyQ0FBcUIsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7OztBQUQzRSxnQkFBSSxDQUFDLFlBQVk7O0FBRWpCLGdCQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxnQ0FBYSxhQUFhLEVBQUUsVUFBQyxHQUFHLEVBQUs7QUFDeEQsa0JBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxnQ0FBYSxhQUFhLEVBQUU7QUFDNUMsdUJBQUssa0JBQWtCLDhCQUFjLENBQUM7ZUFDdkM7YUFDRixDQUFDLENBQUM7Ozs7O0FBS0gsZ0JBQUksQ0FBQyxVQUFVLCtCQUFlLENBQUM7QUFDL0IsZ0JBQUksQ0FBQyxvQkFBb0IsOEJBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQzVELGdCQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEUsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDOzs7Ozs7O0tBQzVCOzs7V0FFcUI7Ozs7QUFDcEIsZ0NBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7OzZDQUMxQyxrQkFBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7Ozs7Ozs7O0FBQ2xDLGdDQUFJLGFBQWEsZ0NBQThCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFHLENBQUM7Ozs7Ozs7S0FFbkU7OztXQUV5Qjs7OztBQUN4QixnQ0FBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQzs7NkNBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Ozs7Ozs7QUFDMUUsZ0NBQUksYUFBYSw2QkFBMkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLG9CQUFpQixDQUFDOzs7Ozs7O0tBRXJGOzs7OztXQUdrQyxzQ0FBQyxRQUFROzs7Ozs2Q0FDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsMkJBQTJCLEVBQUUsRUFBQyxjQUFjLEVBQUUsUUFBUSxFQUFDLENBQUM7Ozs7Ozs7S0FDekY7OztXQUVtQjs7OztBQUNsQixnQ0FBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQzs7d0VBcFF4QyxhQUFhOzs7aUJBc1FYLElBQUksQ0FBQyxTQUFTOzs7Ozs7NkNBQ1YsSUFBSSxDQUFDLHVCQUF1QixFQUFFOzs7a0JBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUE7Ozs7O0FBQ3pFLGdDQUFJLEtBQUssdUJBQXFCLElBQUksQ0FBQyxVQUFVLENBQUcsQ0FBQzs7NkNBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7OztnQkFFbkMsSUFBSSxDQUFDLGVBQWU7Ozs7Ozs2Q0FDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Ozs7NkNBRTFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDOzs7OzZDQUN0QyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTs7O2tCQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQTs7Ozs7OzZDQUNoRSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs2Q0FFN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Ozs7NkNBQ3JCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFOzs7QUFDL0IsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDOzs7OztBQUV0QixnQ0FBSSxJQUFJLENBQUMsMkRBQTJELENBQUMsQ0FBQzs7Ozs7OztLQUV6RTs7O1dBRW1CLDZCQUFDLElBQUksRUFBRTs7QUFFekIsVUFBSSxHQUFHLDhCQTlSTCxhQUFhLHFEQThScUIsSUFBSSxDQUFDLENBQUM7QUFDMUMsVUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLEdBQUcsQ0FBQzs7O0FBR3JCLFVBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyw0QkFBUSxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBLElBQ2xFLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDL0IsWUFBSSxHQUFHLEdBQUcseUVBQXlFLENBQUM7QUFDcEYsNEJBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQ3hCOzs7QUFHRCxVQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUNoQyxZQUFJLEdBQUcsR0FBRyxpRkFBaUYsQ0FBQztBQUM1Riw0QkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDZjtLQUNGOzs7V0FFVyxxQkFBQyxTQUFTLEVBQUU7QUFDdEIsaUNBaFRFLGFBQWEsNkNBZ1RHLFNBQVMsRUFBRTs7QUFFN0IsYUFBTyxJQUFJLENBQUMsY0FBYyxDQUFDO0tBQzVCOzs7V0FFaUIsMkJBQUMsU0FBUyxFQUFFO0FBQzVCLGlDQXRURSxhQUFhLG1EQXNUUyxTQUFTLEVBQUU7O0FBRW5DLGFBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUMzQjs7O1dBRVEsa0JBQUMsU0FBUyxFQUFFO0FBQ25CLGlDQTVURSxhQUFhLDBDQTRUQSxTQUFTLEVBQUU7OztBQUcxQixhQUFPLG9CQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDdkM7OztTQTlNZSxlQUFHO0FBQ2pCLGFBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQUFBQyxDQUFDO0tBQzlEOzs7U0FFbUIsZUFBRztBQUNyQixhQUFPLDRCQUFRLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ3ZEOzs7U0F6SEcsYUFBYTs7Ozs7Ozs7O0FBbVVuQixvQ0FBc0Isb0JBQUUsS0FBSyw0QkFBVSw0R0FBRTs7O1FBQS9CLEdBQUc7UUFBRSxFQUFFOztBQUNmLGlCQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztHQUNuQzs7Ozs7Ozs7Ozs7Ozs7OztxQkFFYyxhQUFhIiwiZmlsZSI6ImxpYi9kcml2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlRHJpdmVyLCBEZXZpY2VTZXR0aW5ncyB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XG5pbXBvcnQgQ2hyb21lZHJpdmVyIGZyb20gJ2FwcGl1bS1jaHJvbWVkcml2ZXInO1xuaW1wb3J0IGRlc2lyZWRDb25zdHJhaW50cyBmcm9tICcuL2Rlc2lyZWQtY2Fwcyc7XG5pbXBvcnQgY29tbWFuZHMgZnJvbSAnLi9jb21tYW5kcy9pbmRleCc7XG5pbXBvcnQgeyBzZXR1cE5ld0Nocm9tZWRyaXZlciB9IGZyb20gJy4vY29tbWFuZHMvY29udGV4dCc7XG5pbXBvcnQgaGVscGVycyBmcm9tICcuL2FuZHJvaWQtaGVscGVycyc7XG5pbXBvcnQgeyBDSFJPTUlVTV9XSU4gfSBmcm9tICcuL3dlYnZpZXctaGVscGVycyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBERUZBVUxUX0FEQl9QT1JUIH0gZnJvbSAnYXBwaXVtLWFkYic7XG5pbXBvcnQgeyBmcywgdGVtcERpciB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IHJldHJ5SW50ZXJ2YWwgfSBmcm9tICdhc3luY2JveCc7XG5cblxuY29uc3QgQVBQX0VYVEVOU0lPTiA9ICcuYXBrJztcbmNvbnN0IERFVklDRV9QT1JUID0gNDcyNDtcblxuLy8gVGhpcyBpcyBhIHNldCBvZiBtZXRob2RzIGFuZCBwYXRocyB0aGF0IHdlIG5ldmVyIHdhbnQgdG8gcHJveHkgdG9cbi8vIENocm9tZWRyaXZlclxuY29uc3QgTk9fUFJPWFkgPSBbXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9jb250ZXh0JyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9jb250ZXh0JyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvYXBwaXVtJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9hcHBpdW0nKV0sXG4gIFsnUE9TVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy90b3VjaC9wZXJmb3JtJyldLFxuICBbJ1BPU1QnLCBuZXcgUmVnRXhwKCdeL3Nlc3Npb24vW14vXSsvdG91Y2gvbXVsdGkvcGVyZm9ybScpXSxcbiAgWydQT1NUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL29yaWVudGF0aW9uJyldLFxuICBbJ0dFVCcsIG5ldyBSZWdFeHAoJ14vc2Vzc2lvbi9bXi9dKy9vcmllbnRhdGlvbicpXSxcbl07XG5cbmNsYXNzIEFuZHJvaWREcml2ZXIgZXh0ZW5kcyBCYXNlRHJpdmVyIHtcbiAgY29uc3RydWN0b3IgKG9wdHMgPSB7fSwgc2hvdWxkVmFsaWRhdGVDYXBzID0gdHJ1ZSkge1xuICAgIHN1cGVyKG9wdHMsIHNob3VsZFZhbGlkYXRlQ2Fwcyk7XG4gICAgdGhpcy5sb2NhdG9yU3RyYXRlZ2llcyA9IFtcbiAgICAgICd4cGF0aCcsXG4gICAgICAnaWQnLFxuICAgICAgJ2NsYXNzIG5hbWUnLFxuICAgICAgJ2FjY2Vzc2liaWxpdHkgaWQnLFxuICAgICAgJy1hbmRyb2lkIHVpYXV0b21hdG9yJ1xuICAgIF07XG4gICAgdGhpcy5kZXNpcmVkQ2FwQ29uc3RyYWludHMgPSBkZXNpcmVkQ29uc3RyYWludHM7XG4gICAgdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVycyA9IHt9O1xuICAgIHRoaXMuandwUHJveHlBY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmp3cFByb3h5QXZvaWQgPSBfLmNsb25lKE5PX1BST1hZKTtcbiAgICB0aGlzLnNldHRpbmdzID0gbmV3IERldmljZVNldHRpbmdzKHtpZ25vcmVVbmltcG9ydGFudFZpZXdzOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2V0dGluZ3NVcGRhdGUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5jaHJvbWVkcml2ZXIgPSBudWxsO1xuICAgIHRoaXMuYXBrU3RyaW5ncyA9IHt9O1xuICAgIHRoaXMuYWNjZXB0U3NsQ2VydHMgPSAhIW9wdHMuYWNjZXB0U3NsQ2VydHM7XG4gICAgdGhpcy5ib290c3RyYXBQb3J0ID0gb3B0cy5ib290c3RyYXBQb3J0IHx8IERFVklDRV9QT1JUO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlU2Vzc2lvbiAoY2Fwcykge1xuICAgIC8vIHRoZSB3aG9sZSBjcmVhdGVTZXNzaW9uIGZsb3cgaXMgc3Vycm91bmRlZCBpbiBhIHRyeS1jYXRjaCBzdGF0ZW1lbnRcbiAgICAvLyBpZiBjcmVhdGluZyBhIHNlc3Npb24gZmFpbHMgYXQgYW55IHBvaW50LCB3ZSB0ZWFyZG93biBldmVyeXRoaW5nIHdlXG4gICAgLy8gc2V0IHVwIGJlZm9yZSB0aHJvd2luZyB0aGUgZXJyb3IuXG4gICAgdHJ5IHtcbiAgICAgIGxldCBzZXNzaW9uSWQ7XG4gICAgICBbc2Vzc2lvbklkXSA9IGF3YWl0IHN1cGVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG5cbiAgICAgIGxldCBzZXJ2ZXJEZXRhaWxzID0ge3BsYXRmb3JtOiAnTElOVVgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgd2ViU3RvcmFnZUVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZXNTY3JlZW5zaG90OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZUVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV0d29ya0Nvbm5lY3Rpb25FbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25Db250ZXh0RW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB3YXJuaW5nczoge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkZXNpcmVkOiB0aGlzLmNhcHN9O1xuXG4gICAgICB0aGlzLmNhcHMgPSBPYmplY3QuYXNzaWduKHNlcnZlckRldGFpbHMsIHRoaXMuY2Fwcyk7XG5cbiAgICAgIC8vIGFzc2lnbmluZyBkZWZhdWx0c1xuICAgICAgbGV0IGRlZmF1bHRPcHRzID0ge1xuICAgICAgICBhY3Rpb246IFwiYW5kcm9pZC5pbnRlbnQuYWN0aW9uLk1BSU5cIixcbiAgICAgICAgY2F0ZWdvcnk6IFwiYW5kcm9pZC5pbnRlbnQuY2F0ZWdvcnkuTEFVTkNIRVJcIixcbiAgICAgICAgZmxhZ3M6IFwiMHgxMDIwMDAwMFwiLFxuICAgICAgICBkaXNhYmxlQW5kcm9pZFdhdGNoZXJzOiBmYWxzZSxcbiAgICAgICAgdG1wRGlyOiBhd2FpdCB0ZW1wRGlyLnN0YXRpY0RpcigpLFxuICAgICAgICBmdWxsUmVzZXQ6IGZhbHNlLFxuICAgICAgICBhdXRvTGF1bmNoOiB0cnVlLFxuICAgICAgICBhZGJQb3J0OiBERUZBVUxUX0FEQl9QT1JUXG4gICAgICB9O1xuICAgICAgXy5kZWZhdWx0cyh0aGlzLm9wdHMsIGRlZmF1bHRPcHRzKTtcbiAgICAgIGlmICghdGhpcy5vcHRzLmphdmFWZXJzaW9uKSB7XG4gICAgICAgIHRoaXMub3B0cy5qYXZhVmVyc2lvbiA9IGF3YWl0IGhlbHBlcnMuZ2V0SmF2YVZlcnNpb24oKTtcbiAgICAgIH1cblxuICAgICAgLy8gbm90IHVzZXIgdmlzaWJsZSB2aWEgY2Fwc1xuICAgICAgaWYgKHRoaXMub3B0cy5ub1Jlc2V0ID09PSB0cnVlKSB0aGlzLm9wdHMuZnVsbFJlc2V0ID0gZmFsc2U7XG4gICAgICBpZiAodGhpcy5vcHRzLmZ1bGxSZXNldCA9PT0gdHJ1ZSkgdGhpcy5vcHRzLm5vUmVzZXQgPSBmYWxzZTtcbiAgICAgIHRoaXMub3B0cy5mYXN0UmVzZXQgPSAhdGhpcy5vcHRzLmZ1bGxSZXNldCAmJiAhdGhpcy5vcHRzLm5vUmVzZXQ7XG4gICAgICB0aGlzLm9wdHMuc2tpcFVuaW5zdGFsbCA9IHRoaXMub3B0cy5mYXN0UmVzZXQgfHwgdGhpcy5vcHRzLm5vUmVzZXQ7XG5cbiAgICAgIHRoaXMuY3VyQ29udGV4dCA9IHRoaXMuZGVmYXVsdENvbnRleHROYW1lKCk7XG5cbiAgICAgIGlmICh0aGlzLmlzQ2hyb21lU2Vzc2lvbikge1xuICAgICAgICBsb2cuaW5mbyhcIldlJ3JlIGdvaW5nIHRvIHJ1biBhIENocm9tZS1iYXNlZCBzZXNzaW9uXCIpO1xuICAgICAgICBsZXQge3BrZywgYWN0aXZpdHl9ID0gaGVscGVycy5nZXRDaHJvbWVQa2codGhpcy5vcHRzLmJyb3dzZXJOYW1lKTtcbiAgICAgICAgdGhpcy5vcHRzLmFwcFBhY2thZ2UgPSBwa2c7XG4gICAgICAgIHRoaXMub3B0cy5hcHBBY3Rpdml0eSA9IGFjdGl2aXR5O1xuICAgICAgICBsb2cuaW5mbyhgQ2hyb21lLXR5cGUgcGFja2FnZSBhbmQgYWN0aXZpdHkgYXJlICR7cGtnfSBhbmQgJHthY3Rpdml0eX1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0cy5uYXRpdmVXZWJTY3JlZW5zaG90KSB7XG4gICAgICAgIHRoaXMuandwUHJveHlBdm9pZC5wdXNoKFsnR0VUJywgbmV3IFJlZ0V4cCgnXi9zZXNzaW9uL1teL10rL3NjcmVlbnNob3QnKV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgZGV2aWNlIHVkaWQgZm9yIHRoaXMgc2Vzc2lvblxuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHModGhpcy5vcHRzKTtcbiAgICAgIHRoaXMub3B0cy51ZGlkID0gdWRpZDtcbiAgICAgIHRoaXMub3B0cy5lbVBvcnQgPSBlbVBvcnQ7XG5cbiAgICAgIC8vIHNldCB1cCBhbiBpbnN0YW5jZSBvZiBBREJcbiAgICAgIHRoaXMuYWRiID0gYXdhaXQgaGVscGVycy5jcmVhdGVBREIodGhpcy5vcHRzLmphdmFWZXJzaW9uLCB0aGlzLm9wdHMudWRpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLmVtUG9ydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRzLmFkYlBvcnQpO1xuXG4gICAgICBpZiAodGhpcy5oZWxwZXJzLmlzUGFja2FnZU9yQnVuZGxlKHRoaXMub3B0cy5hcHApKXtcbiAgICAgICAgLy8gdXNlciBwcm92aWRlZCBwYWNrYWdlIGluc3RlYWQgb2YgYXBwIGZvciAnYXBwJyBjYXBhYmlsaXR5LCBtYXNzYWdlIG9wdGlvbnNcbiAgICAgICAgdGhpcy5vcHRzLmFwcFBhY2thZ2UgPSB0aGlzLm9wdHMuYXBwO1xuICAgICAgICB0aGlzLm9wdHMuYXBwID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0cy5hcHApIHtcbiAgICAgICAgLy8gZmluZCBhbmQgY29weSwgb3IgZG93bmxvYWQgYW5kIHVuemlwIGFuIGFwcCB1cmwgb3IgcGF0aFxuICAgICAgICB0aGlzLm9wdHMuYXBwID0gYXdhaXQgdGhpcy5oZWxwZXJzLmNvbmZpZ3VyZUFwcCh0aGlzLm9wdHMuYXBwLCBBUFBfRVhURU5TSU9OKTtcbiAgICAgICAgYXdhaXQgdGhpcy5jaGVja0FwcFByZXNlbnQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5hcHBPbkRldmljZSkge1xuICAgICAgICAvLyB0aGUgYXBwIGlzbid0IGFuIGFjdHVhbCBhcHAgZmlsZSBidXQgcmF0aGVyIHNvbWV0aGluZyB3ZSB3YW50IHRvXG4gICAgICAgIC8vIGFzc3VtZSBpcyBvbiB0aGUgZGV2aWNlIGFuZCBqdXN0IGxhdW5jaCB2aWEgdGhlIGFwcFBhY2thZ2VcbiAgICAgICAgbG9nLmluZm8oYEFwcCBmaWxlIHdhcyBub3QgbGlzdGVkLCBpbnN0ZWFkIHdlJ3JlIGdvaW5nIHRvIHJ1biBgICtcbiAgICAgICAgICAgICAgICAgYCR7dGhpcy5vcHRzLmFwcFBhY2thZ2V9IGRpcmVjdGx5IG9uIHRoZSBkZXZpY2VgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5jaGVja1BhY2thZ2VQcmVzZW50KCk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuc3RhcnRBbmRyb2lkU2Vzc2lvbih0aGlzLm9wdHMpO1xuICAgICAgcmV0dXJuIFtzZXNzaW9uSWQsIHRoaXMuY2Fwc107XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgYXdhaXQgdGhpcy5kZWxldGVTZXNzaW9uKCk7XG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhcHBPbkRldmljZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVscGVycy5pc1BhY2thZ2VPckJ1bmRsZSh0aGlzLm9wdHMuYXBwKSB8fCAoIXRoaXMub3B0cy5hcHAgJiZcbiAgICAgICAgICAgdGhpcy5oZWxwZXJzLmlzUGFja2FnZU9yQnVuZGxlKHRoaXMub3B0cy5hcHBQYWNrYWdlKSk7XG4gIH1cblxuICBnZXQgaXNDaHJvbWVTZXNzaW9uICgpIHtcbiAgICByZXR1cm4gaGVscGVycy5pc0Nocm9tZUJyb3dzZXIodGhpcy5vcHRzLmJyb3dzZXJOYW1lKTtcbiAgfVxuXG4gIGFzeW5jIG9uU2V0dGluZ3NVcGRhdGUgKGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5ID09PSBcImlnbm9yZVVuaW1wb3J0YW50Vmlld3NcIikge1xuICAgICAgYXdhaXQgdGhpcy5zZXRDb21wcmVzc2VkTGF5b3V0SGllcmFyY2h5KHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzdGFydEFuZHJvaWRTZXNzaW9uICgpIHtcbiAgICBsb2cuaW5mbyhgU3RhcnRpbmcgQW5kcm9pZCBzZXNzaW9uYCk7XG4gICAgLy8gc2V0IHVwIHRoZSBkZXZpY2UgdG8gcnVuIG9uIChyZWFsIG9yIGVtdWxhdG9yLCBldGMpXG4gICAgdGhpcy5kZWZhdWx0SU1FID0gYXdhaXQgaGVscGVycy5pbml0RGV2aWNlKHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xuXG4gICAgLy8gc2V0IGFjdHVhbCBkZXZpY2UgbmFtZSwgdWRpZCAmIHBsYXRmb3JtIHZlcnNpb25cbiAgICB0aGlzLmNhcHMuZGV2aWNlTmFtZSA9IHRoaXMuYWRiLmN1ckRldmljZUlkO1xuICAgIHRoaXMuY2Fwcy5kZXZpY2VVRElEID0gdGhpcy5vcHRzLnVkaWQ7XG4gICAgdGhpcy5jYXBzLnBsYXRmb3JtVmVyc2lvbiA9IGF3YWl0IHRoaXMuYWRiLmdldFBsYXRmb3JtVmVyc2lvbigpO1xuXG4gICAgLy8gTGV0J3MgdHJ5IHRvIHVubG9jayBiZWZvcmUgaW5zdGFsbGluZyB0aGUgYXBwXG4gICAgLy8gdW5sb2NrIHRoZSBkZXZpY2VcbiAgICBhd2FpdCBoZWxwZXJzLnVubG9jayh0aGlzLmFkYik7XG4gICAgLy8gSWYgdGhlIHVzZXIgc2V0cyBhdXRvTGF1bmNoIHRvIGZhbHNlLCB0aGV5IGFyZSByZXNwb25zaWJsZSBmb3IgaW5pdEFVVCgpIGFuZCBzdGFydEFVVCgpXG4gICAgaWYgKCF0aGlzLmFwcE9uRGV2aWNlICYmIHRoaXMub3B0cy5hdXRvTGF1bmNoKSB7XG4gICAgICAvLyBzZXQgdXAgYXBwIHVuZGVyIHRlc3RcbiAgICAgIGF3YWl0IHRoaXMuaW5pdEFVVCgpO1xuICAgIH1cbiAgICAvLyBzdGFydCBVaUF1dG9tYXRvclxuICAgIHRoaXMuYm9vdHN0cmFwID0gbmV3IGhlbHBlcnMuYm9vdHN0cmFwKHRoaXMuYWRiLCB0aGlzLmJvb3RzdHJhcFBvcnQsIHRoaXMub3B0cy53ZWJzb2NrZXQpO1xuICAgIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnN0YXJ0KHRoaXMub3B0cy5hcHBQYWNrYWdlLCB0aGlzLm9wdHMuZGlzYWJsZUFuZHJvaWRXYXRjaGVycyk7XG4gICAgLy8gaGFuZGxpbmcgdW5leHBlY3RlZCBzaHV0ZG93blxuICAgIHRoaXMuYm9vdHN0cmFwLm9uVW5leHBlY3RlZFNodXRkb3duLmNhdGNoKGFzeW5jIChlcnIpID0+IHtcbiAgICAgIGlmICghdGhpcy5ib290c3RyYXAuaWdub3JlVW5leHBlY3RlZFNodXRkb3duKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuc3RhcnRVbmV4cGVjdGVkU2h1dGRvd24oZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNldCBDb21wcmVzc2VkTGF5b3V0SGllcmFyY2h5IG9uIHRoZSBkZXZpY2UgYmFzZWQgb24gY3VycmVudCBzZXR0aW5ncyBvYmplY3RcbiAgICAvLyB0aGlzIGhhcyB0byBoYXBwZW4gX2FmdGVyXyBib290c3RyYXAgaXMgaW5pdGlhbGl6ZWRcbiAgICBpZiAodGhpcy5vcHRzLmlnbm9yZVVuaW1wb3J0YW50Vmlld3MpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2V0dGluZ3MudXBkYXRlKHtpZ25vcmVVbmltcG9ydGFudFZpZXdzOiB0aGlzLm9wdHMuaWdub3JlVW5pbXBvcnRhbnRWaWV3c30pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQ2hyb21lU2Vzc2lvbikge1xuICAgICAgLy8gc3RhcnQgYSBjaHJvbWVkcml2ZXIgc2Vzc2lvbiBhbmQgcHJveHkgdG8gaXRcbiAgICAgIGF3YWl0IHRoaXMuc3RhcnRDaHJvbWVTZXNzaW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm9wdHMuYXV0b0xhdW5jaCkge1xuICAgICAgICAvLyBzdGFydCBhcHBcbiAgICAgICAgYXdhaXQgdGhpcy5zdGFydEFVVCgpO1xuICAgICAgfVxuICAgIH1cbiAgICBhd2FpdCB0aGlzLmluaXRBdXRvV2VidmlldygpO1xuICB9XG5cbiAgYXN5bmMgaW5pdEF1dG9XZWJ2aWV3ICgpIHtcbiAgICBpZiAodGhpcy5vcHRzLmF1dG9XZWJ2aWV3KSB7XG4gICAgICBsZXQgdmlld05hbWUgPSB0aGlzLmRlZmF1bHRXZWJ2aWV3TmFtZSgpO1xuICAgICAgbGV0IHRpbWVvdXQgPSAodGhpcy5vcHRzLmF1dG9XZWJ2aWV3VGltZW91dCkgfHwgMjAwMDtcblxuICAgICAgbG9nLmluZm8oYFNldHRpbmcgYXV0byB3ZWJ2aWV3IHRvIGNvbnRleHQgJyR7dmlld05hbWV9JyB3aXRoIHRpbWVvdXQgJHt0aW1lb3V0fW1zYCk7XG5cbiAgICAgIC8vIHRyeSBldmVyeSA1MDBtcyB1bnRpbCB0aW1lb3V0IGlzIG92ZXJcbiAgICAgIGF3YWl0IHJldHJ5SW50ZXJ2YWwodGltZW91dCAvIDUwMCwgNTAwLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMuc2V0Q29udGV4dCh2aWV3TmFtZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuXG4gIGFzeW5jIGluaXRBVVQgKCkge1xuICAgIC8vIHBvcHVsYXRlIGFwcFBhY2thZ2UsIGFwcEFjdGl2aXR5LCBhcHBXYWl0UGFja2FnZSwgYXBwV2FpdEFjdGl2aXR5LFxuICAgIC8vIGFuZCB0aGUgZGV2aWNlIGJlaW5nIHVzZWRcbiAgICAvLyBpbiB0aGUgb3B0cyBhbmQgY2FwcyAoc28gaXQgZ2V0cyBiYWNrIHRvIHRoZSB1c2VyIG9uIHNlc3Npb24gY3JlYXRpb24pXG4gICAgbGV0IGxhdW5jaEluZm8gPSBhd2FpdCBoZWxwZXJzLmdldExhdW5jaEluZm8odGhpcy5hZGIsIHRoaXMub3B0cyk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLm9wdHMsIGxhdW5jaEluZm8pO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5jYXBzLCBsYXVuY2hJbmZvKTtcbiAgICBpZiAoIXRoaXMub3B0cy5za2lwVW5pbnN0YWxsKSB7XG4gICAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgIH1cbiAgICAvLyBpbnN0YWxsIGFwcFxuICAgIGlmICghdGhpcy5vcHRzLmFwcCkge1xuICAgICAgbG9nLmRlYnVnKCdObyBhcHAgY2FwYWJpbGl0eS4gQXNzdW1pbmcgaXQgaXMgYWxyZWFkeSBvbiB0aGUgZGV2aWNlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGF3YWl0IGhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KHRoaXMuYWRiLCB0aGlzLm9wdHMuYXBwLCB0aGlzLm9wdHMuYXBwUGFja2FnZSwgdGhpcy5vcHRzLmZhc3RSZXNldCk7XG4gICAgdGhpcy5hcGtTdHJpbmdzW3RoaXMub3B0cy5sYW5ndWFnZV0gPSBhd2FpdCBoZWxwZXJzLnB1c2hTdHJpbmdzKFxuICAgICAgICB0aGlzLm9wdHMubGFuZ3VhZ2UsIHRoaXMuYWRiLCB0aGlzLm9wdHMpO1xuICB9XG5cbiAgYXN5bmMgc3RhcnRDaHJvbWVTZXNzaW9uICgpIHtcbiAgICBsb2cuaW5mbyhcIlN0YXJ0aW5nIGEgY2hyb21lLWJhc2VkIGJyb3dzZXIgc2Vzc2lvblwiKTtcbiAgICBsZXQgb3B0cyA9IF8uY2xvbmVEZWVwKHRoaXMub3B0cyk7XG4gICAgb3B0cy5jaHJvbWVVc2VSdW5uaW5nQXBwID0gZmFsc2U7XG5cbiAgICBjb25zdCBrbm93blBhY2thZ2VzID0gW1wib3JnLmNocm9taXVtLmNocm9tZS5zaGVsbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb20uYW5kcm9pZC5jaHJvbWVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tLmNocm9tZS5iZXRhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcIm9yZy5jaHJvbWl1bS5jaHJvbWVcIl07XG5cbiAgICBpZiAoIV8uY29udGFpbnMoa25vd25QYWNrYWdlcywgdGhpcy5vcHRzLmFwcFBhY2thZ2UpKSB7XG4gICAgICBvcHRzLmNocm9tZUFuZHJvaWRBY3Rpdml0eSA9IHRoaXMub3B0cy5hcHBBY3Rpdml0eTtcbiAgICB9XG4gICAgdGhpcy5jaHJvbWVkcml2ZXIgPSBhd2FpdCBzZXR1cE5ld0Nocm9tZWRyaXZlcihvcHRzLCB0aGlzLmFkYi5jdXJEZXZpY2VJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRiLmdldEFkYlNlcnZlclBvcnQoKSk7XG4gICAgdGhpcy5jaHJvbWVkcml2ZXIub24oQ2hyb21lZHJpdmVyLkVWRU5UX0NIQU5HRUQsIChtc2cpID0+IHtcbiAgICAgIGlmIChtc2cuc3RhdGUgPT09IENocm9tZWRyaXZlci5TVEFURV9TVE9QUEVEKSB7XG4gICAgICAgIHRoaXMub25DaHJvbWVkcml2ZXJTdG9wKENIUk9NSVVNX1dJTik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBOb3cgdGhhdCB3ZSBoYXZlIGEgQ2hyb21lIHNlc3Npb24sIHdlIGVuc3VyZSB0aGF0IHRoZSBjb250ZXh0IGlzXG4gICAgLy8gYXBwcm9wcmlhdGVseSBzZXQgYW5kIHRoYXQgdGhpcyBjaHJvbWVkcml2ZXIgaXMgYWRkZWQgdG8gdGhlIGxpc3RcbiAgICAvLyBvZiBzZXNzaW9uIGNocm9tZWRyaXZlcnMgc28gd2UgY2FuIHN3aXRjaCBiYWNrIGFuZCBmb3J0aFxuICAgIHRoaXMuY3VyQ29udGV4dCA9IENIUk9NSVVNX1dJTjtcbiAgICB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW0NIUk9NSVVNX1dJTl0gPSB0aGlzLmNocm9tZWRyaXZlcjtcbiAgICB0aGlzLnByb3h5UmVxUmVzID0gdGhpcy5jaHJvbWVkcml2ZXIucHJveHlSZXEuYmluZCh0aGlzLmNocm9tZWRyaXZlcik7XG4gICAgdGhpcy5qd3BQcm94eUFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBhc3luYyBjaGVja0FwcFByZXNlbnQgKCkge1xuICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIHdoZXRoZXIgYXBwIGlzIGFjdHVhbGx5IHByZXNlbnRcIik7XG4gICAgaWYgKCEoYXdhaXQgZnMuZXhpc3RzKHRoaXMub3B0cy5hcHApKSkge1xuICAgICAgbG9nLmVycm9yQW5kVGhyb3coYENvdWxkIG5vdCBmaW5kIGFwcCBhcGsgYXQgJHt0aGlzLm9wdHMuYXBwfWApO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNoZWNrUGFja2FnZVByZXNlbnQgKCkge1xuICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIHdoZXRoZXIgcGFja2FnZSBpcyBwcmVzZW50IG9uIHRoZSBkZXZpY2VcIik7XG4gICAgaWYgKCEoYXdhaXQgdGhpcy5hZGIuc2hlbGwoWydwbScsICdsaXN0JywgJ3BhY2thZ2VzJywgdGhpcy5vcHRzLmFwcFBhY2thZ2VdKSkpIHtcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KGBDb3VsZCBub3QgZmluZCBwYWNrYWdlICR7dGhpcy5vcHRzLmFwcFBhY2thZ2V9IG9uIHRoZSBkZXZpY2VgKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZXQgQ29tcHJlc3NlZExheW91dEhpZXJhcmNoeSBvbiB0aGUgZGV2aWNlXG4gIGFzeW5jIHNldENvbXByZXNzZWRMYXlvdXRIaWVyYXJjaHkgKGNvbXByZXNzKSB7XG4gICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImNvbXByZXNzZWRMYXlvdXRIaWVyYXJjaHlcIiwge2NvbXByZXNzTGF5b3V0OiBjb21wcmVzc30pO1xuICB9XG5cbiAgYXN5bmMgZGVsZXRlU2Vzc2lvbiAoKSB7XG4gICAgbG9nLmRlYnVnKFwiU2h1dHRpbmcgZG93biBBbmRyb2lkIGRyaXZlclwiKTtcbiAgICBhd2FpdCBzdXBlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgaWYgKHRoaXMuYm9vdHN0cmFwKSB7XG4gICAgICBhd2FpdCB0aGlzLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzKCk7XG4gICAgICBpZiAodGhpcy5vcHRzLnVuaWNvZGVLZXlib2FyZCAmJiB0aGlzLm9wdHMucmVzZXRLZXlib2FyZCAmJiB0aGlzLmRlZmF1bHRJTUUpIHtcbiAgICAgICAgbG9nLmRlYnVnKGBSZXNldHRpbmcgSU1FIHRvICR7dGhpcy5kZWZhdWx0SU1FfWApO1xuICAgICAgICBhd2FpdCB0aGlzLmFkYi5zZXRJTUUodGhpcy5kZWZhdWx0SU1FKTtcbiAgICAgIH1cbiAgICAgIGlmICghdGhpcy5pc0Nocm9tZVNlc3Npb24pIHtcbiAgICAgICAgYXdhaXQgdGhpcy5hZGIuZm9yY2VTdG9wKHRoaXMub3B0cy5hcHBQYWNrYWdlKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMuYWRiLmZvcmNlU3RvcCgnaW8uYXBwaXVtLnVubG9jaycpO1xuICAgICAgYXdhaXQgdGhpcy5hZGIuZ29Ub0hvbWUoKTtcbiAgICAgIGlmICh0aGlzLm9wdHMuZnVsbFJlc2V0ICYmICF0aGlzLm9wdHMuc2tpcFVuaW5zdGFsbCAmJiAhdGhpcy5hcHBPbkRldmljZSkge1xuICAgICAgICBhd2FpdCB0aGlzLmFkYi51bmluc3RhbGxBcGsodGhpcy5vcHRzLmFwcFBhY2thZ2UpO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5hZGIuc3RvcExvZ2NhdCgpO1xuICAgICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc2h1dGRvd24oKTtcbiAgICAgIHRoaXMuYm9vdHN0cmFwID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLndhcm4oXCJDYW5ub3Qgc2h1dCBkb3duIEFuZHJvaWQgZHJpdmVyOyBpdCBoYXMgYWxyZWFkeSBzaHV0IGRvd25cIik7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVEZXNpcmVkQ2FwcyAoY2Fwcykge1xuICAgIC8vIGNoZWNrIHdpdGggdGhlIGJhc2UgY2xhc3MsIGFuZCByZXR1cm4gaWYgaXQgZmFpbHNcbiAgICBsZXQgcmVzID0gc3VwZXIudmFsaWRhdGVEZXNpcmVkQ2FwcyhjYXBzKTtcbiAgICBpZiAoIXJlcykgcmV0dXJuIHJlcztcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSBjYXBhYmlsaXRpZXMgaGF2ZSBvbmUgb2YgYGFwcGAsIGBhcHBQYWNrYWdlYCBvciBgYnJvd3NlcmBcbiAgICBpZiAoKCFjYXBzLmJyb3dzZXJOYW1lIHx8ICFoZWxwZXJzLmlzQ2hyb21lQnJvd3NlcihjYXBzLmJyb3dzZXJOYW1lKSkgJiZcbiAgICAgICFjYXBzLmFwcCAmJiAhY2Fwcy5hcHBQYWNrYWdlKSB7XG4gICAgICBsZXQgbXNnID0gJ1RoZSBkZXNpcmVkIGNhcGFiaWxpdGllcyBtdXN0IGluY2x1ZGUgZWl0aGVyIGFuIGFwcCwgcGFja2FnZSBvciBicm93c2VyJztcbiAgICAgIGxvZy5lcnJvckFuZFRocm93KG1zZyk7XG4gICAgfVxuICAgIC8vIHdhcm4gaWYgdGhlIGNhcGFiaWxpdGllcyBoYXZlIGJvdGggYGFwcGAgYW5kIGBicm93c2VyLCBhbHRob3VnaCB0aGlzXG4gICAgLy8gaXMgY29tbW9uIHdpdGggc2VsZW5pdW0gZ3JpZFxuICAgIGlmIChjYXBzLmJyb3dzZXJOYW1lICYmIGNhcHMuYXBwKSB7XG4gICAgICBsZXQgbXNnID0gJ1RoZSBkZXNpcmVkIGNhcGFiaWxpdGllcyBzaG91bGQgZ2VuZXJhbGx5IG5vdCBpbmNsdWRlIGJvdGggYW4gYXBwIGFuZCBhIGJyb3dzZXInO1xuICAgICAgbG9nLndhcm4obXNnKTtcbiAgICB9XG4gIH1cblxuICBwcm94eUFjdGl2ZSAoc2Vzc2lvbklkKSB7XG4gICAgc3VwZXIucHJveHlBY3RpdmUoc2Vzc2lvbklkKTtcblxuICAgIHJldHVybiB0aGlzLmp3cFByb3h5QWN0aXZlO1xuICB9XG5cbiAgZ2V0UHJveHlBdm9pZExpc3QgKHNlc3Npb25JZCkge1xuICAgIHN1cGVyLmdldFByb3h5QXZvaWRMaXN0KHNlc3Npb25JZCk7XG5cbiAgICByZXR1cm4gdGhpcy5qd3BQcm94eUF2b2lkO1xuICB9XG5cbiAgY2FuUHJveHkgKHNlc3Npb25JZCkge1xuICAgIHN1cGVyLmNhblByb3h5KHNlc3Npb25JZCk7XG5cbiAgICAvLyB0aGlzIHdpbGwgY2hhbmdlIGRlcGVuZGluZyBvbiBDaHJvbWVEcml2ZXIgc3RhdHVzXG4gICAgcmV0dXJuIF8uaXNGdW5jdGlvbih0aGlzLnByb3h5UmVxUmVzKTtcbiAgfVxufVxuXG5mb3IgKGxldCBbY21kLCBmbl0gb2YgXy5wYWlycyhjb21tYW5kcykpIHtcbiAgQW5kcm9pZERyaXZlci5wcm90b3R5cGVbY21kXSA9IGZuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBBbmRyb2lkRHJpdmVyO1xuIl19