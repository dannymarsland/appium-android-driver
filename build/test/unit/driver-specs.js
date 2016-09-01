'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this2 = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libLogger = require('../../lib/logger');

var _libLogger2 = _interopRequireDefault(_libLogger);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _libAndroidHelpers = require('../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _appiumBaseDriver = require('appium-base-driver');

var driver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
var expect = _chai2['default'].expect;
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('driver', function () {
  describe('constructor', function () {
    it('should call BaseDriver constructor with opts', function () {
      var driver = new _2['default']({ foo: 'bar' });
      driver.should.exist;
      driver.opts.foo.should.equal('bar');
    });
    it('should have this.findElOrEls', function () {
      var driver = new _2['default']({ foo: 'bar' });
      driver.findElOrEls.should.exist;
      driver.findElOrEls.should.be.a('function');
    });
  });
  describe('createSession', function () {
    beforeEach(function () {
      driver = new _2['default']();
      sandbox.stub(driver, 'checkAppPresent');
      sandbox.stub(driver, 'checkPackagePresent');
      sandbox.stub(driver, 'startAndroidSession');
      sandbox.stub(_appiumAdb2['default'], 'createADB', function callee$3$0(opts) {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          var _this = this;

          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              return context$4$0.abrupt('return', {
                getDevicesWithRetry: function getDevicesWithRetry() {
                  return _regeneratorRuntime.async(function getDevicesWithRetry$(context$5$0) {
                    while (1) switch (context$5$0.prev = context$5$0.next) {
                      case 0:
                        return context$5$0.abrupt('return', [{ udid: 'emulator-1234' }, { udid: 'rotalume-1337' }]);

                      case 1:
                      case 'end':
                        return context$5$0.stop();
                    }
                  }, null, _this);
                },
                getPortFromEmulatorString: function getPortFromEmulatorString() {
                  return 1234;
                },
                setDeviceId: function setDeviceId() {},
                setEmulatorPort: function setEmulatorPort() {},
                adbPort: opts.adbPort
              });

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this2);
      });
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should get java version if none is provided', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk' }));

          case 2:
            driver.opts.javaVersion.should.exist;

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should get browser package details if browserName is provided', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.spy(_libAndroidHelpers2['default'], 'getChromePkg');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', browserName: 'Chrome' }));

          case 3:
            _libAndroidHelpers2['default'].getChromePkg.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should check an app is present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk' }));

          case 2:
            driver.checkAppPresent.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should check a package is present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package' }));

          case 2:
            driver.checkPackagePresent.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should accept a package via the app capability', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', app: 'some.app.package' }));

          case 2:
            driver.checkPackagePresent.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should add server details to caps', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package' }));

          case 2:
            driver.caps.webStorageEnabled.should.exist;

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should delete a session on failure', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            // Force an error to make sure deleteSession gets called
            sandbox.stub(_libAndroidHelpers2['default'], 'getJavaVersion').throws();
            sandbox.stub(driver, 'deleteSession');
            context$3$0.prev = 2;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package' }));

          case 5:
            context$3$0.next = 9;
            break;

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](2);

          case 9:
            driver.deleteSession.calledOnce.should.be['true'];

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2, [[2, 7]]);
    });
    it('should pass along adbPort capability to ADB', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package', adbPort: 1111 }));

          case 2:
            driver.adb.adbPort.should.equal(1111);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should proxy screenshot if nativeWebScreenshot is off', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', browserName: 'chrome', nativeWebScreenshot: false }));

          case 2:
            driver.getProxyAvoidList().should.have.length(8);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should not proxy screenshot if nativeWebScreenshot is on', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.createSession({ platformName: 'Android', deviceName: 'device', browserName: 'chrome', nativeWebScreenshot: true }));

          case 2:
            driver.getProxyAvoidList().should.have.length(9);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('deleteSession', function () {
    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = new _appiumAdb2['default']();
            driver.bootstrap = new _libAndroidHelpers2['default'].bootstrap(driver.adb);
            sandbox.stub(driver, 'stopChromedriverProxies');
            sandbox.stub(driver.adb, 'setIME');
            sandbox.stub(driver.adb, 'forceStop');
            sandbox.stub(driver.adb, 'goToHome');
            sandbox.stub(driver.adb, 'uninstallApk');
            sandbox.stub(driver.adb, 'stopLogcat');
            sandbox.stub(driver.bootstrap, 'shutdown');
            sandbox.spy(_libLogger2['default'], 'debug');

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should not do anything if Android Driver has already shut down', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.bootstrap = null;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 3:
            _libLogger2['default'].debug.calledTwice.should.be['true'];
            driver.stopChromedriverProxies.called.should.be['false'];
            driver.adb.stopLogcat.called.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should reset keyboard to default IME', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.unicodeKeyboard = true;
            driver.opts.resetKeyboard = true;
            driver.defaultIME = 'someDefaultIME';
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 5:
            driver.adb.setIME.calledOnce.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should force stop non-Chrome sessions', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
            driver.adb.forceStop.calledTwice.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should force stop unlocker in Chrome sessions', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.browserName = 'Chrome';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 3:
            driver.adb.forceStop.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should uninstall APK if required', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.fullReset = true;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 3:
            driver.adb.uninstallApk.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('startAndroidSession', function () {
    beforeEach(function callee$2$0() {
      var fakeBootstrap;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = new _appiumAdb2['default']();
            driver.bootstrap = new _libAndroidHelpers2['default'].bootstrap(driver.adb);
            driver.settings = { update: function update() {} };
            driver.caps = {};

            // create a fake bootstrap because we can't mock
            // driver.bootstrap.<whatever> in advance
            fakeBootstrap = { start: function start() {},
              onUnexpectedShutdown: { 'catch': function _catch() {} }
            };

            sandbox.stub(_libAndroidHelpers2['default'], 'initDevice');
            sandbox.stub(_libAndroidHelpers2['default'], 'unlock');
            sandbox.stub(_libAndroidHelpers2['default'], 'bootstrap').returns(fakeBootstrap);
            sandbox.stub(driver, 'initAUT');
            sandbox.stub(driver, 'startAUT');
            sandbox.stub(driver, 'defaultWebviewName');
            sandbox.stub(driver, 'setContext');
            sandbox.stub(driver, 'startChromeSession');
            sandbox.stub(driver.settings, 'update');
            sandbox.stub(driver.adb, 'getPlatformVersion');

          case 16:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should set actual platform version', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 2:
            driver.adb.getPlatformVersion.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should auto launch app if it is on the device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.autoLaunch = true;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.initAUT.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should handle chrome sessions', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.browserName = 'Chrome';
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.startChromeSession.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should unlock the device', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 2:
            _libAndroidHelpers2['default'].unlock.calledOnce.should.be['true'];

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should start AUT if auto lauching', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.autoLaunch = true;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.initAUT.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should not start AUT if not auto lauching', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.autoLaunch = false;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.initAUT.calledOnce.should.be['false'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should set the context if autoWebview is requested', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.autoWebview = true;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.defaultWebviewName.calledOnce.should.be['true'];
            driver.setContext.calledOnce.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should set the context if autoWebview is requested using timeout', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.setContext.onCall(0).throws(_appiumBaseDriver.errors.NoSuchContextError);
            driver.setContext.onCall(1).returns();

            driver.opts.autoWebview = true;
            driver.opts.autoWebviewTimeout = 5000;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 6:
            driver.defaultWebviewName.calledOnce.should.be['true'];
            driver.setContext.calledTwice.should.be['true'];

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should respect timeout if autoWebview is requested', function callee$2$0() {
      var begin, end;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.setContext.throws(new _appiumBaseDriver.errors.NoSuchContextError());

            begin = Date.now();

            driver.opts.autoWebview = true;
            driver.opts.autoWebviewTimeout = 5000;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.startAndroidSession().should.eventually.be.rejected);

          case 6:
            driver.defaultWebviewName.calledOnce.should.be['true'];

            // we have a timeout of 5000ms, retrying on 500ms, so expect 10 times
            driver.setContext.callCount.should.equal(10);

            end = Date.now();

            (end - begin).should.be.above(5000);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should not set the context if autoWebview is not requested', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 2:
            driver.defaultWebviewName.calledOnce.should.be['false'];
            driver.setContext.calledOnce.should.be['false'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should set ignoreUnimportantViews cap', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver.opts.ignoreUnimportantViews = true;

            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.startAndroidSession());

          case 3:
            driver.settings.update.calledOnce.should.be['true'];
            driver.settings.update.firstCall.args[0].ignoreUnimportantViews.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('validateDesiredCaps', function () {
    before(function () {
      driver = new _2['default']();
    });
    it('should throw an error if caps do not contain an app, package or valid browser', function () {
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device' });
      }).to['throw'](/must include/);
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', browserName: 'Netscape Navigator' });
      }).to['throw'](/must include/);
    });
    it('should not throw an error if caps contain an app, package or valid browser', function () {
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk' });
      }).to.not['throw'](Error);
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', browserName: 'Chrome' });
      }).to.not['throw'](Error);
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', appPackage: 'some.app.package' });
      }).to.not['throw'](/must include/);
    });
    it('should not be sensitive to platform name casing', function () {
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'AnDrOiD', deviceName: 'device', app: '/path/to/some.apk' });
      }).to.not['throw'](Error);
    });
    it('should not throw an error if caps contain both an app and browser, for grid compatibility', function () {
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk', browserName: 'iPhone' });
      }).to.not['throw'](Error);
    });
    it('should not throw an error if caps contain androidScreenshotPath capability', function () {
      expect(function () {
        driver.validateDesiredCaps({ platformName: 'Android', deviceName: 'device', app: '/path/to/some.apk', androidScreenshotPath: '/path/to/screenshotdir' });
      }).to.not['throw'](Error);
    });
  });
  describe('proxying', function () {
    before(function () {
      driver = new _2['default']();
      driver.sessionId = 'abc';
    });
    describe('#proxyActive', function () {
      it('should exist', function () {
        driver.proxyActive.should.be.an['instanceof'](Function);
      });
      it('should return false', function () {
        driver.proxyActive('abc').should.be['false'];
      });
      it('should throw an error if session id is wrong', function () {
        (function () {
          driver.proxyActive('aaa');
        }).should['throw'];
      });
    });

    describe('#getProxyAvoidList', function () {
      it('should exist', function () {
        driver.getProxyAvoidList.should.be.an['instanceof'](Function);
      });
      it('should return jwpProxyAvoid array', function () {
        var avoidList = driver.getProxyAvoidList('abc');
        avoidList.should.be.an['instanceof'](Array);
        avoidList.should.eql(driver.jwpProxyAvoid);
      });
      it('should throw an error if session id is wrong', function () {
        (function () {
          driver.getProxyAvoidList('aaa');
        }).should['throw'];
      });
    });

    describe('#canProxy', function () {
      it('should exist', function () {
        driver.canProxy.should.be.an['instanceof'](Function);
      });
      it('should return false', function () {
        driver.canProxy('abc').should.be['false'];
      });
      it('should throw an error if session id is wrong', function () {
        (function () {
          driver.canProxy('aaa');
        }).should['throw'];
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9kcml2ZXItc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3lCQUM3QixrQkFBa0I7Ozs7cUJBQ2hCLE9BQU87Ozs7aUNBQ0wsMkJBQTJCOzs7O2dCQUNyQixPQUFPOzs7O3lCQUNqQixZQUFZOzs7O2dDQUNMLG9CQUFvQjs7QUFHM0MsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksT0FBTyxHQUFHLG1CQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLENBQUM7QUFDekIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsUUFBUSxFQUFFLFlBQU07QUFDdkIsVUFBUSxDQUFDLGFBQWEsRUFBRSxZQUFNO0FBQzVCLE1BQUUsQ0FBQyw4Q0FBOEMsRUFBRSxZQUFNO0FBQ3ZELFVBQUksTUFBTSxHQUFHLGtCQUFrQixFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQzdDLFlBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3BCLFlBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLDhCQUE4QixFQUFFLFlBQU07QUFDdkMsVUFBSSxNQUFNLEdBQUcsa0JBQWtCLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDN0MsWUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2hDLFlBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFD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QUNILFFBQUUsQ0FBQyw4Q0FBOEMsRUFBRSxZQUFNO0FBQ3ZELFNBQUMsWUFBTTtBQUFFLGdCQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FBRSxDQUFBLENBQUUsTUFBTSxTQUFNLENBQUM7T0FDM0QsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDOztBQUVILFlBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBTTtBQUMxQixRQUFFLENBQUMsY0FBYyxFQUFFLFlBQU07QUFDdkIsY0FBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsY0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO09BQ25ELENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyxxQkFBcUIsRUFBRSxZQUFNO0FBQzlCLGNBQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBTSxDQUFDO09BQ3hDLENBQUMsQ0FBQztBQUNILFFBQUUsQ0FBQyw4Q0FBOEMsRUFBRSxZQUFNO0FBQ3ZELFNBQUMsWUFBTTtBQUFFLGdCQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQUUsQ0FBQSxDQUFFLE1BQU0sU0FBTSxDQUFDO09BQ2xELENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvZHJpdmVyLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgbG9nIGZyb20gJy4uLy4uL2xpYi9sb2dnZXInO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4uLy4uL2xpYi9hbmRyb2lkLWhlbHBlcnMnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4nO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCB7IGVycm9ycyB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XG5cblxubGV0IGRyaXZlcjtcbmxldCBzYW5kYm94ID0gc2lub24uc2FuZGJveC5jcmVhdGUoKTtcbmxldCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdkcml2ZXInLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdjb25zdHJ1Y3RvcicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNhbGwgQmFzZURyaXZlciBjb25zdHJ1Y3RvciB3aXRoIG9wdHMnLCAoKSA9PiB7XG4gICAgICBsZXQgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoe2ZvbzogJ2Jhcid9KTtcbiAgICAgIGRyaXZlci5zaG91bGQuZXhpc3Q7XG4gICAgICBkcml2ZXIub3B0cy5mb28uc2hvdWxkLmVxdWFsKCdiYXInKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGhhdmUgdGhpcy5maW5kRWxPckVscycsICgpID0+IHtcbiAgICAgIGxldCBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcih7Zm9vOiAnYmFyJ30pO1xuICAgICAgZHJpdmVyLmZpbmRFbE9yRWxzLnNob3VsZC5leGlzdDtcbiAgICAgIGRyaXZlci5maW5kRWxPckVscy5zaG91bGQuYmUuYSgnZnVuY3Rpb24nKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdjcmVhdGVTZXNzaW9uJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdjaGVja0FwcFByZXNlbnQnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdjaGVja1BhY2thZ2VQcmVzZW50Jyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnc3RhcnRBbmRyb2lkU2Vzc2lvbicpO1xuICAgICAgc2FuZGJveC5zdHViKEFEQiwgJ2NyZWF0ZUFEQicsIGFzeW5jIChvcHRzKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZ2V0RGV2aWNlc1dpdGhSZXRyeTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAge3VkaWQ6ICdlbXVsYXRvci0xMjM0J30sXG4gICAgICAgICAgICAgIHt1ZGlkOiAncm90YWx1bWUtMTMzNyd9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZzogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDEyMzQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXREZXZpY2VJZDogKCkgPT4ge30sXG4gICAgICAgICAgc2V0RW11bGF0b3JQb3J0OiAoKSA9PiB7fSxcbiAgICAgICAgICBhZGJQb3J0OiBvcHRzLmFkYlBvcnRcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCBqYXZhIHZlcnNpb24gaWYgbm9uZSBpcyBwcm92aWRlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcDogJy9wYXRoL3RvL3NvbWUuYXBrJ30pO1xuICAgICAgZHJpdmVyLm9wdHMuamF2YVZlcnNpb24uc2hvdWxkLmV4aXN0O1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IGJyb3dzZXIgcGFja2FnZSBkZXRhaWxzIGlmIGJyb3dzZXJOYW1lIGlzIHByb3ZpZGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zcHkoaGVscGVycywgJ2dldENocm9tZVBrZycpO1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYnJvd3Nlck5hbWU6ICdDaHJvbWUnfSk7XG4gICAgICBoZWxwZXJzLmdldENocm9tZVBrZy5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2hlY2sgYW4gYXBwIGlzIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHA6ICcvcGF0aC90by9zb21lLmFwayd9KTtcbiAgICAgIGRyaXZlci5jaGVja0FwcFByZXNlbnQuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGNoZWNrIGEgcGFja2FnZSBpcyBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwUGFja2FnZTogJ3NvbWUuYXBwLnBhY2thZ2UnfSk7XG4gICAgICBkcml2ZXIuY2hlY2tQYWNrYWdlUHJlc2VudC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYWNjZXB0IGEgcGFja2FnZSB2aWEgdGhlIGFwcCBjYXBhYmlsaXR5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwOiAnc29tZS5hcHAucGFja2FnZSd9KTtcbiAgICAgIGRyaXZlci5jaGVja1BhY2thZ2VQcmVzZW50LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBhZGQgc2VydmVyIGRldGFpbHMgdG8gY2FwcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcFBhY2thZ2U6ICdzb21lLmFwcC5wYWNrYWdlJ30pO1xuICAgICAgZHJpdmVyLmNhcHMud2ViU3RvcmFnZUVuYWJsZWQuc2hvdWxkLmV4aXN0O1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZGVsZXRlIGEgc2Vzc2lvbiBvbiBmYWlsdXJlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gRm9yY2UgYW4gZXJyb3IgdG8gbWFrZSBzdXJlIGRlbGV0ZVNlc3Npb24gZ2V0cyBjYWxsZWRcbiAgICAgIHNhbmRib3guc3R1YihoZWxwZXJzLCAnZ2V0SmF2YVZlcnNpb24nKS50aHJvd3MoKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdkZWxldGVTZXNzaW9uJyk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHBQYWNrYWdlOiAnc29tZS5hcHAucGFja2FnZSd9KTtcbiAgICAgIH0gY2F0Y2ggKGlnbikge31cbiAgICAgIGRyaXZlci5kZWxldGVTZXNzaW9uLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBwYXNzIGFsb25nIGFkYlBvcnQgY2FwYWJpbGl0eSB0byBBREInLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHBQYWNrYWdlOiAnc29tZS5hcHAucGFja2FnZScsIGFkYlBvcnQ6IDExMTF9KTtcbiAgICAgIGRyaXZlci5hZGIuYWRiUG9ydC5zaG91bGQuZXF1YWwoMTExMSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBwcm94eSBzY3JlZW5zaG90IGlmIG5hdGl2ZVdlYlNjcmVlbnNob3QgaXMgb2ZmJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYnJvd3Nlck5hbWU6ICdjaHJvbWUnLCBuYXRpdmVXZWJTY3JlZW5zaG90OiBmYWxzZX0pO1xuICAgICAgZHJpdmVyLmdldFByb3h5QXZvaWRMaXN0KCkuc2hvdWxkLmhhdmUubGVuZ3RoKDgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IHByb3h5IHNjcmVlbnNob3QgaWYgbmF0aXZlV2ViU2NyZWVuc2hvdCBpcyBvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGJyb3dzZXJOYW1lOiAnY2hyb21lJywgbmF0aXZlV2ViU2NyZWVuc2hvdDogdHJ1ZX0pO1xuICAgICAgZHJpdmVyLmdldFByb3h5QXZvaWRMaXN0KCkuc2hvdWxkLmhhdmUubGVuZ3RoKDkpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2RlbGV0ZVNlc3Npb24nLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgICAgZHJpdmVyLmFkYiA9IG5ldyBBREIoKTtcbiAgICAgIGRyaXZlci5ib290c3RyYXAgPSBuZXcgaGVscGVycy5ib290c3RyYXAoZHJpdmVyLmFkYik7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnc3RvcENocm9tZWRyaXZlclByb3hpZXMnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnc2V0SU1FJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2ZvcmNlU3RvcCcpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdnb1RvSG9tZScpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICd1bmluc3RhbGxBcGsnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnc3RvcExvZ2NhdCcpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5ib290c3RyYXAsICdzaHV0ZG93bicpO1xuICAgICAgc2FuZGJveC5zcHkobG9nLCAnZGVidWcnKTtcbiAgICB9KTtcbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBub3QgZG8gYW55dGhpbmcgaWYgQW5kcm9pZCBEcml2ZXIgaGFzIGFscmVhZHkgc2h1dCBkb3duJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcCA9IG51bGw7XG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgbG9nLmRlYnVnLmNhbGxlZFR3aWNlLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzLmNhbGxlZC5zaG91bGQuYmUuZmFsc2U7XG4gICAgICBkcml2ZXIuYWRiLnN0b3BMb2djYXQuY2FsbGVkLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVzZXQga2V5Ym9hcmQgdG8gZGVmYXVsdCBJTUUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIub3B0cy51bmljb2RlS2V5Ym9hcmQgPSB0cnVlO1xuICAgICAgZHJpdmVyLm9wdHMucmVzZXRLZXlib2FyZCA9IHRydWU7XG4gICAgICBkcml2ZXIuZGVmYXVsdElNRSA9ICdzb21lRGVmYXVsdElNRSc7XG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgZHJpdmVyLmFkYi5zZXRJTUUuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZvcmNlIHN0b3Agbm9uLUNocm9tZSBzZXNzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgICBkcml2ZXIuYWRiLmZvcmNlU3RvcC5jYWxsZWRUd2ljZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZvcmNlIHN0b3AgdW5sb2NrZXIgaW4gQ2hyb21lIHNlc3Npb25zJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLm9wdHMuYnJvd3Nlck5hbWUgPSAnQ2hyb21lJztcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgICBkcml2ZXIuYWRiLmZvcmNlU3RvcC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdW5pbnN0YWxsIEFQSyBpZiByZXF1aXJlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5vcHRzLmZ1bGxSZXNldCA9IHRydWU7XG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgZHJpdmVyLmFkYi51bmluc3RhbGxBcGsuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzdGFydEFuZHJvaWRTZXNzaW9uJywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGRyaXZlci5hZGIgPSBuZXcgQURCKCk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwID0gbmV3IGhlbHBlcnMuYm9vdHN0cmFwKGRyaXZlci5hZGIpO1xuICAgICAgZHJpdmVyLnNldHRpbmdzID0geyB1cGRhdGUgKCkge30gfTtcbiAgICAgIGRyaXZlci5jYXBzID0ge307XG5cbiAgICAgIC8vIGNyZWF0ZSBhIGZha2UgYm9vdHN0cmFwIGJlY2F1c2Ugd2UgY2FuJ3QgbW9ja1xuICAgICAgLy8gZHJpdmVyLmJvb3RzdHJhcC48d2hhdGV2ZXI+IGluIGFkdmFuY2VcbiAgICAgIGxldCBmYWtlQm9vdHN0cmFwID0ge3N0YXJ0ICgpIHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgb25VbmV4cGVjdGVkU2h1dGRvd246IHtjYXRjaCAoKSB7fX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgc2FuZGJveC5zdHViKGhlbHBlcnMsICdpbml0RGV2aWNlJyk7XG4gICAgICBzYW5kYm94LnN0dWIoaGVscGVycywgJ3VubG9jaycpO1xuICAgICAgc2FuZGJveC5zdHViKGhlbHBlcnMsICdib290c3RyYXAnKS5yZXR1cm5zKGZha2VCb290c3RyYXApO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2luaXRBVVQnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzdGFydEFVVCcpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2RlZmF1bHRXZWJ2aWV3TmFtZScpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3NldENvbnRleHQnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzdGFydENocm9tZVNlc3Npb24nKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuc2V0dGluZ3MsICd1cGRhdGUnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZ2V0UGxhdGZvcm1WZXJzaW9uJyk7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHNhbmRib3gucmVzdG9yZSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgc2V0IGFjdHVhbCBwbGF0Zm9ybSB2ZXJzaW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QW5kcm9pZFNlc3Npb24oKTtcbiAgICAgIGRyaXZlci5hZGIuZ2V0UGxhdGZvcm1WZXJzaW9uLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBhdXRvIGxhdW5jaCBhcHAgaWYgaXQgaXMgb24gdGhlIGRldmljZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5vcHRzLmF1dG9MYXVuY2ggPSB0cnVlO1xuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QW5kcm9pZFNlc3Npb24oKTtcbiAgICAgIGRyaXZlci5pbml0QVVULmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBoYW5kbGUgY2hyb21lIHNlc3Npb25zJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLm9wdHMuYnJvd3Nlck5hbWUgPSAnQ2hyb21lJztcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XG4gICAgICBkcml2ZXIuc3RhcnRDaHJvbWVTZXNzaW9uLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB1bmxvY2sgdGhlIGRldmljZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XG4gICAgICBoZWxwZXJzLnVubG9jay5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgc3RhcnQgQVVUIGlmIGF1dG8gbGF1Y2hpbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIub3B0cy5hdXRvTGF1bmNoID0gdHJ1ZTtcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XG4gICAgICBkcml2ZXIuaW5pdEFVVC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IHN0YXJ0IEFVVCBpZiBub3QgYXV0byBsYXVjaGluZycsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5vcHRzLmF1dG9MYXVuY2ggPSBmYWxzZTtcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XG4gICAgICBkcml2ZXIuaW5pdEFVVC5jYWxsZWRPbmNlLnNob3VsZC5iZS5mYWxzZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHNldCB0aGUgY29udGV4dCBpZiBhdXRvV2VidmlldyBpcyByZXF1ZXN0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIub3B0cy5hdXRvV2VidmlldyA9IHRydWU7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpO1xuICAgICAgZHJpdmVyLmRlZmF1bHRXZWJ2aWV3TmFtZS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLnNldENvbnRleHQuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHNldCB0aGUgY29udGV4dCBpZiBhdXRvV2VidmlldyBpcyByZXF1ZXN0ZWQgdXNpbmcgdGltZW91dCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5zZXRDb250ZXh0Lm9uQ2FsbCgwKS50aHJvd3MoZXJyb3JzLk5vU3VjaENvbnRleHRFcnJvcik7XG4gICAgICBkcml2ZXIuc2V0Q29udGV4dC5vbkNhbGwoMSkucmV0dXJucygpO1xuXG4gICAgICBkcml2ZXIub3B0cy5hdXRvV2VidmlldyA9IHRydWU7XG4gICAgICBkcml2ZXIub3B0cy5hdXRvV2Vidmlld1RpbWVvdXQgPSA1MDAwO1xuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QW5kcm9pZFNlc3Npb24oKTtcbiAgICAgIGRyaXZlci5kZWZhdWx0V2Vidmlld05hbWUuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5zZXRDb250ZXh0LmNhbGxlZFR3aWNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVzcGVjdCB0aW1lb3V0IGlmIGF1dG9XZWJ2aWV3IGlzIHJlcXVlc3RlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5zZXRDb250ZXh0LnRocm93cyhuZXcgZXJyb3JzLk5vU3VjaENvbnRleHRFcnJvcigpKTtcblxuICAgICAgbGV0IGJlZ2luID0gRGF0ZS5ub3coKTtcblxuICAgICAgZHJpdmVyLm9wdHMuYXV0b1dlYnZpZXcgPSB0cnVlO1xuICAgICAgZHJpdmVyLm9wdHMuYXV0b1dlYnZpZXdUaW1lb3V0ID0gNTAwMDtcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWQ7XG4gICAgICBkcml2ZXIuZGVmYXVsdFdlYnZpZXdOYW1lLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG5cbiAgICAgIC8vIHdlIGhhdmUgYSB0aW1lb3V0IG9mIDUwMDBtcywgcmV0cnlpbmcgb24gNTAwbXMsIHNvIGV4cGVjdCAxMCB0aW1lc1xuICAgICAgZHJpdmVyLnNldENvbnRleHQuY2FsbENvdW50LnNob3VsZC5lcXVhbCgxMCk7XG5cbiAgICAgIGxldCBlbmQgPSBEYXRlLm5vdygpO1xuICAgICAgKGVuZCAtIGJlZ2luKS5zaG91bGQuYmUuYWJvdmUoNTAwMCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBub3Qgc2V0IHRoZSBjb250ZXh0IGlmIGF1dG9XZWJ2aWV3IGlzIG5vdCByZXF1ZXN0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpO1xuICAgICAgZHJpdmVyLmRlZmF1bHRXZWJ2aWV3TmFtZS5jYWxsZWRPbmNlLnNob3VsZC5iZS5mYWxzZTtcbiAgICAgIGRyaXZlci5zZXRDb250ZXh0LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLmZhbHNlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgc2V0IGlnbm9yZVVuaW1wb3J0YW50Vmlld3MgY2FwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLm9wdHMuaWdub3JlVW5pbXBvcnRhbnRWaWV3cyA9IHRydWU7XG5cbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XG4gICAgICBkcml2ZXIuc2V0dGluZ3MudXBkYXRlLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuc2V0dGluZ3MudXBkYXRlLmZpcnN0Q2FsbC5hcmdzWzBdLmlnbm9yZVVuaW1wb3J0YW50Vmlld3Muc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgndmFsaWRhdGVEZXNpcmVkQ2FwcycsICgpID0+IHtcbiAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIGNhcHMgZG8gbm90IGNvbnRhaW4gYW4gYXBwLCBwYWNrYWdlIG9yIHZhbGlkIGJyb3dzZXInLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICBkcml2ZXIudmFsaWRhdGVEZXNpcmVkQ2Fwcyh7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnfSk7XG4gICAgICB9KS50by50aHJvdygvbXVzdCBpbmNsdWRlLyk7XG4gICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICBkcml2ZXIudmFsaWRhdGVEZXNpcmVkQ2Fwcyh7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBicm93c2VyTmFtZTogJ05ldHNjYXBlIE5hdmlnYXRvcid9KTtcbiAgICAgIH0pLnRvLnRocm93KC9tdXN0IGluY2x1ZGUvKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCB0aHJvdyBhbiBlcnJvciBpZiBjYXBzIGNvbnRhaW4gYW4gYXBwLCBwYWNrYWdlIG9yIHZhbGlkIGJyb3dzZXInLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICBkcml2ZXIudmFsaWRhdGVEZXNpcmVkQ2Fwcyh7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHA6ICcvcGF0aC90by9zb21lLmFwayd9KTtcbiAgICAgIH0pLnRvLm5vdC50aHJvdyhFcnJvcik7XG4gICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICBkcml2ZXIudmFsaWRhdGVEZXNpcmVkQ2Fwcyh7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBicm93c2VyTmFtZTogJ0Nocm9tZSd9KTtcbiAgICAgIH0pLnRvLm5vdC50aHJvdyhFcnJvcik7XG4gICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICBkcml2ZXIudmFsaWRhdGVEZXNpcmVkQ2Fwcyh7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHBQYWNrYWdlOiAnc29tZS5hcHAucGFja2FnZSd9KTtcbiAgICAgIH0pLnRvLm5vdC50aHJvdygvbXVzdCBpbmNsdWRlLyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBub3QgYmUgc2Vuc2l0aXZlIHRvIHBsYXRmb3JtIG5hbWUgY2FzaW5nJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgZHJpdmVyLnZhbGlkYXRlRGVzaXJlZENhcHMoe3BsYXRmb3JtTmFtZTogJ0FuRHJPaUQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwOiAnL3BhdGgvdG8vc29tZS5hcGsnfSk7XG4gICAgICB9KS50by5ub3QudGhyb3coRXJyb3IpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IHRocm93IGFuIGVycm9yIGlmIGNhcHMgY29udGFpbiBib3RoIGFuIGFwcCBhbmQgYnJvd3NlciwgZm9yIGdyaWQgY29tcGF0aWJpbGl0eScsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgIGRyaXZlci52YWxpZGF0ZURlc2lyZWRDYXBzKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcDogJy9wYXRoL3RvL3NvbWUuYXBrJywgYnJvd3Nlck5hbWU6ICdpUGhvbmUnfSk7XG4gICAgICB9KS50by5ub3QudGhyb3coRXJyb3IpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IHRocm93IGFuIGVycm9yIGlmIGNhcHMgY29udGFpbiBhbmRyb2lkU2NyZWVuc2hvdFBhdGggY2FwYWJpbGl0eScsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgIGRyaXZlci52YWxpZGF0ZURlc2lyZWRDYXBzKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcDogJy9wYXRoL3RvL3NvbWUuYXBrJywgYW5kcm9pZFNjcmVlbnNob3RQYXRoOiAnL3BhdGgvdG8vc2NyZWVuc2hvdGRpcid9KTtcbiAgICAgIH0pLnRvLm5vdC50aHJvdyhFcnJvcik7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgncHJveHlpbmcnLCAoKSA9PiB7XG4gICAgYmVmb3JlKCgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBkcml2ZXIuc2Vzc2lvbklkID0gJ2FiYyc7XG4gICAgfSk7XG4gICAgZGVzY3JpYmUoJyNwcm94eUFjdGl2ZScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZXhpc3QnLCAoKSA9PiB7XG4gICAgICAgIGRyaXZlci5wcm94eUFjdGl2ZS5zaG91bGQuYmUuYW4uaW5zdGFuY2VvZihGdW5jdGlvbik7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBkcml2ZXIucHJveHlBY3RpdmUoJ2FiYycpLnNob3VsZC5iZS5mYWxzZTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBzZXNzaW9uIGlkIGlzIHdyb25nJywgKCkgPT4ge1xuICAgICAgICAoKCkgPT4geyBkcml2ZXIucHJveHlBY3RpdmUoJ2FhYScpOyB9KS5zaG91bGQudGhyb3c7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCcjZ2V0UHJveHlBdm9pZExpc3QnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGV4aXN0JywgKCkgPT4ge1xuICAgICAgICBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3Quc2hvdWxkLmJlLmFuLmluc3RhbmNlb2YoRnVuY3Rpb24pO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBqd3BQcm94eUF2b2lkIGFycmF5JywgKCkgPT4ge1xuICAgICAgICBsZXQgYXZvaWRMaXN0ID0gZHJpdmVyLmdldFByb3h5QXZvaWRMaXN0KCdhYmMnKTtcbiAgICAgICAgYXZvaWRMaXN0LnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEFycmF5KTtcbiAgICAgICAgYXZvaWRMaXN0LnNob3VsZC5lcWwoZHJpdmVyLmp3cFByb3h5QXZvaWQpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHNlc3Npb24gaWQgaXMgd3JvbmcnLCAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7IGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdCgnYWFhJyk7IH0pLnNob3VsZC50aHJvdztcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJyNjYW5Qcm94eScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZXhpc3QnLCAoKSA9PiB7XG4gICAgICAgIGRyaXZlci5jYW5Qcm94eS5zaG91bGQuYmUuYW4uaW5zdGFuY2VvZihGdW5jdGlvbik7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlJywgKCkgPT4ge1xuICAgICAgICBkcml2ZXIuY2FuUHJveHkoJ2FiYycpLnNob3VsZC5iZS5mYWxzZTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBzZXNzaW9uIGlkIGlzIHdyb25nJywgKCkgPT4ge1xuICAgICAgICAoKCkgPT4geyBkcml2ZXIuY2FuUHJveHkoJ2FhYScpOyB9KS5zaG91bGQudGhyb3c7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==