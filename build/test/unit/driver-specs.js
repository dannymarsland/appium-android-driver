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
            sandbox.spy(_libLogger2['default'], 'warn');

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
            _libLogger2['default'].warn.calledOnce.should.be['true'];
            driver.stopChromedriverProxies.called.should.be['false'];

          case 5:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9kcml2ZXItc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O3lCQUM3QixrQkFBa0I7Ozs7cUJBQ2hCLE9BQU87Ozs7aUNBQ0wsMkJBQTJCOzs7O2dCQUNyQixPQUFPOzs7O3lCQUNqQixZQUFZOzs7O2dDQUNMLG9CQUFvQjs7QUFHM0MsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksT0FBTyxHQUFHLG1CQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLENBQUM7QUFDekIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsUUFBUSxFQUFFLFlBQU07QUFDdkIsVUFBUSxDQUFDLGFBQWEsRUFBRSxZQUFNO0FBQzVCLE1BQUUsQ0FBQyw4Q0FBOEMsRUFBRSxZQUFNO0FBQ3ZELFVBQUksTUFBTSxHQUFHLGtCQUFrQixFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQzdDLFlBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ3BCLFlBQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDckMsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLDhCQUE4QixFQUFFLFlBQU07QUFDdkMsVUFBSSxNQUFNLEdBQUcsa0JBQWtCLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7QUFDN0MsWUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2hDLFlBQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDNUMsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFD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QixFQUFFLFlBQU07QUFDOUIsY0FBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxTQUFNLENBQUM7T0FDeEMsQ0FBQyxDQUFDO0FBQ0gsUUFBRSxDQUFDLDhDQUE4QyxFQUFFLFlBQU07QUFDdkQsU0FBQyxZQUFNO0FBQUUsZ0JBQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FBRSxDQUFBLENBQUUsTUFBTSxTQUFNLENBQUM7T0FDbEQsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9kcml2ZXItc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBsb2cgZnJvbSAnLi4vLi4vbGliL2xvZ2dlcic7XG5pbXBvcnQgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi4vLi4vbGliL2FuZHJvaWQtaGVscGVycyc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLic7XG5pbXBvcnQgQURCIGZyb20gJ2FwcGl1bS1hZGInO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcblxuXG5sZXQgZHJpdmVyO1xubGV0IHNhbmRib3ggPSBzaW5vbi5zYW5kYm94LmNyZWF0ZSgpO1xubGV0IGV4cGVjdCA9IGNoYWkuZXhwZWN0O1xuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ2RyaXZlcicsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgY2FsbCBCYXNlRHJpdmVyIGNvbnN0cnVjdG9yIHdpdGggb3B0cycsICgpID0+IHtcbiAgICAgIGxldCBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcih7Zm9vOiAnYmFyJ30pO1xuICAgICAgZHJpdmVyLnNob3VsZC5leGlzdDtcbiAgICAgIGRyaXZlci5vcHRzLmZvby5zaG91bGQuZXF1YWwoJ2JhcicpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgaGF2ZSB0aGlzLmZpbmRFbE9yRWxzJywgKCkgPT4ge1xuICAgICAgbGV0IGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKHtmb286ICdiYXInfSk7XG4gICAgICBkcml2ZXIuZmluZEVsT3JFbHMuc2hvdWxkLmV4aXN0O1xuICAgICAgZHJpdmVyLmZpbmRFbE9yRWxzLnNob3VsZC5iZS5hKCdmdW5jdGlvbicpO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ2NyZWF0ZVNlc3Npb24nLCAoKSA9PiB7XG4gICAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2NoZWNrQXBwUHJlc2VudCcpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2NoZWNrUGFja2FnZVByZXNlbnQnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzdGFydEFuZHJvaWRTZXNzaW9uJyk7XG4gICAgICBzYW5kYm94LnN0dWIoQURCLCAnY3JlYXRlQURCJywgYXN5bmMgKG9wdHMpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBnZXREZXZpY2VzV2l0aFJldHJ5OiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICB7dWRpZDogJ2VtdWxhdG9yLTEyMzQnfSxcbiAgICAgICAgICAgICAge3VkaWQ6ICdyb3RhbHVtZS0xMzM3J31cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gMTIzNDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNldERldmljZUlkOiAoKSA9PiB7fSxcbiAgICAgICAgICBzZXRFbXVsYXRvclBvcnQ6ICgpID0+IHt9LFxuICAgICAgICAgIGFkYlBvcnQ6IG9wdHMuYWRiUG9ydFxuICAgICAgICB9O1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHNhbmRib3gucmVzdG9yZSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IGphdmEgdmVyc2lvbiBpZiBub25lIGlzIHByb3ZpZGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwOiAnL3BhdGgvdG8vc29tZS5hcGsnfSk7XG4gICAgICBkcml2ZXIub3B0cy5qYXZhVmVyc2lvbi5zaG91bGQuZXhpc3Q7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgYnJvd3NlciBwYWNrYWdlIGRldGFpbHMgaWYgYnJvd3Nlck5hbWUgaXMgcHJvdmlkZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBzYW5kYm94LnNweShoZWxwZXJzLCAnZ2V0Q2hyb21lUGtnJyk7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBicm93c2VyTmFtZTogJ0Nocm9tZSd9KTtcbiAgICAgIGhlbHBlcnMuZ2V0Q2hyb21lUGtnLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBjaGVjayBhbiBhcHAgaXMgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcDogJy9wYXRoL3RvL3NvbWUuYXBrJ30pO1xuICAgICAgZHJpdmVyLmNoZWNrQXBwUHJlc2VudC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgY2hlY2sgYSBwYWNrYWdlIGlzIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHBQYWNrYWdlOiAnc29tZS5hcHAucGFja2FnZSd9KTtcbiAgICAgIGRyaXZlci5jaGVja1BhY2thZ2VQcmVzZW50LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBhY2NlcHQgYSBwYWNrYWdlIHZpYSB0aGUgYXBwIGNhcGFiaWxpdHknLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHA6ICdzb21lLmFwcC5wYWNrYWdlJ30pO1xuICAgICAgZHJpdmVyLmNoZWNrUGFja2FnZVByZXNlbnQuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGFkZCBzZXJ2ZXIgZGV0YWlscyB0byBjYXBzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwUGFja2FnZTogJ3NvbWUuYXBwLnBhY2thZ2UnfSk7XG4gICAgICBkcml2ZXIuY2Fwcy53ZWJTdG9yYWdlRW5hYmxlZC5zaG91bGQuZXhpc3Q7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBkZWxldGUgYSBzZXNzaW9uIG9uIGZhaWx1cmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyBGb3JjZSBhbiBlcnJvciB0byBtYWtlIHN1cmUgZGVsZXRlU2Vzc2lvbiBnZXRzIGNhbGxlZFxuICAgICAgc2FuZGJveC5zdHViKGhlbHBlcnMsICdnZXRKYXZhVmVyc2lvbicpLnRocm93cygpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ2RlbGV0ZVNlc3Npb24nKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcFBhY2thZ2U6ICdzb21lLmFwcC5wYWNrYWdlJ30pO1xuICAgICAgfSBjYXRjaCAoaWduKSB7fVxuICAgICAgZHJpdmVyLmRlbGV0ZVNlc3Npb24uY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHBhc3MgYWxvbmcgYWRiUG9ydCBjYXBhYmlsaXR5IHRvIEFEQicsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKHtwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcFBhY2thZ2U6ICdzb21lLmFwcC5wYWNrYWdlJywgYWRiUG9ydDogMTExMX0pO1xuICAgICAgZHJpdmVyLmFkYi5hZGJQb3J0LnNob3VsZC5lcXVhbCgxMTExKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHByb3h5IHNjcmVlbnNob3QgaWYgbmF0aXZlV2ViU2NyZWVuc2hvdCBpcyBvZmYnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbih7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBicm93c2VyTmFtZTogJ2Nocm9tZScsIG5hdGl2ZVdlYlNjcmVlbnNob3Q6IGZhbHNlfSk7XG4gICAgICBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QoKS5zaG91bGQuaGF2ZS5sZW5ndGgoOCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBub3QgcHJveHkgc2NyZWVuc2hvdCBpZiBuYXRpdmVXZWJTY3JlZW5zaG90IGlzIG9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYnJvd3Nlck5hbWU6ICdjaHJvbWUnLCBuYXRpdmVXZWJTY3JlZW5zaG90OiB0cnVlfSk7XG4gICAgICBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QoKS5zaG91bGQuaGF2ZS5sZW5ndGgoOSk7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZGVsZXRlU2Vzc2lvbicsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBkcml2ZXIuYWRiID0gbmV3IEFEQigpO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcCA9IG5ldyBoZWxwZXJzLmJvb3RzdHJhcChkcml2ZXIuYWRiKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzdG9wQ2hyb21lZHJpdmVyUHJveGllcycpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdzZXRJTUUnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIuYWRiLCAnZm9yY2VTdG9wJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dvVG9Ib21lJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ3VuaW5zdGFsbEFwaycpO1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlci5hZGIsICdzdG9wTG9nY2F0Jyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmJvb3RzdHJhcCwgJ3NodXRkb3duJyk7XG4gICAgICBzYW5kYm94LnNweShsb2csICd3YXJuJyk7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHNhbmRib3gucmVzdG9yZSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IGRvIGFueXRoaW5nIGlmIEFuZHJvaWQgRHJpdmVyIGhhcyBhbHJlYWR5IHNodXQgZG93bicsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5ib290c3RyYXAgPSBudWxsO1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICAgIGxvZy53YXJuLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuc3RvcENocm9tZWRyaXZlclByb3hpZXMuY2FsbGVkLnNob3VsZC5iZS5mYWxzZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlc2V0IGtleWJvYXJkIHRvIGRlZmF1bHQgSU1FJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLm9wdHMudW5pY29kZUtleWJvYXJkID0gdHJ1ZTtcbiAgICAgIGRyaXZlci5vcHRzLnJlc2V0S2V5Ym9hcmQgPSB0cnVlO1xuICAgICAgZHJpdmVyLmRlZmF1bHRJTUUgPSAnc29tZURlZmF1bHRJTUUnO1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICAgIGRyaXZlci5hZGIuc2V0SU1FLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBmb3JjZSBzdG9wIG5vbi1DaHJvbWUgc2Vzc2lvbnMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgZHJpdmVyLmFkYi5mb3JjZVN0b3AuY2FsbGVkVHdpY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBmb3JjZSBzdG9wIHVubG9ja2VyIGluIENocm9tZSBzZXNzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5vcHRzLmJyb3dzZXJOYW1lID0gJ0Nocm9tZSc7XG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgICAgZHJpdmVyLmFkYi5mb3JjZVN0b3AuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHVuaW5zdGFsbCBBUEsgaWYgcmVxdWlyZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIub3B0cy5mdWxsUmVzZXQgPSB0cnVlO1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICAgIGRyaXZlci5hZGIudW5pbnN0YWxsQXBrLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnc3RhcnRBbmRyb2lkU2Vzc2lvbicsICgpID0+IHtcbiAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBkcml2ZXIuYWRiID0gbmV3IEFEQigpO1xuICAgICAgZHJpdmVyLmJvb3RzdHJhcCA9IG5ldyBoZWxwZXJzLmJvb3RzdHJhcChkcml2ZXIuYWRiKTtcbiAgICAgIGRyaXZlci5zZXR0aW5ncyA9IHsgdXBkYXRlICgpIHt9IH07XG4gICAgICBkcml2ZXIuY2FwcyA9IHt9O1xuXG4gICAgICAvLyBjcmVhdGUgYSBmYWtlIGJvb3RzdHJhcCBiZWNhdXNlIHdlIGNhbid0IG1vY2tcbiAgICAgIC8vIGRyaXZlci5ib290c3RyYXAuPHdoYXRldmVyPiBpbiBhZHZhbmNlXG4gICAgICBsZXQgZmFrZUJvb3RzdHJhcCA9IHtzdGFydCAoKSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uVW5leHBlY3RlZFNodXRkb3duOiB7Y2F0Y2ggKCkge319XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgIHNhbmRib3guc3R1YihoZWxwZXJzLCAnaW5pdERldmljZScpO1xuICAgICAgc2FuZGJveC5zdHViKGhlbHBlcnMsICd1bmxvY2snKTtcbiAgICAgIHNhbmRib3guc3R1YihoZWxwZXJzLCAnYm9vdHN0cmFwJykucmV0dXJucyhmYWtlQm9vdHN0cmFwKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdpbml0QVVUJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnc3RhcnRBVVQnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdkZWZhdWx0V2Vidmlld05hbWUnKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzZXRDb250ZXh0Jyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLCAnc3RhcnRDaHJvbWVTZXNzaW9uJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLnNldHRpbmdzLCAndXBkYXRlJyk7XG4gICAgICBzYW5kYm94LnN0dWIoZHJpdmVyLmFkYiwgJ2dldFBsYXRmb3JtVmVyc2lvbicpO1xuICAgIH0pO1xuICAgIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHNldCBhY3R1YWwgcGxhdGZvcm0gdmVyc2lvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XG4gICAgICBkcml2ZXIuYWRiLmdldFBsYXRmb3JtVmVyc2lvbi5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgYXV0byBsYXVuY2ggYXBwIGlmIGl0IGlzIG9uIHRoZSBkZXZpY2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIub3B0cy5hdXRvTGF1bmNoID0gdHJ1ZTtcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XG4gICAgICBkcml2ZXIuaW5pdEFVVC5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgaGFuZGxlIGNocm9tZSBzZXNzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5vcHRzLmJyb3dzZXJOYW1lID0gJ0Nocm9tZSc7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpO1xuICAgICAgZHJpdmVyLnN0YXJ0Q2hyb21lU2Vzc2lvbi5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdW5sb2NrIHRoZSBkZXZpY2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpO1xuICAgICAgaGVscGVycy51bmxvY2suY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHN0YXJ0IEFVVCBpZiBhdXRvIGxhdWNoaW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLm9wdHMuYXV0b0xhdW5jaCA9IHRydWU7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpO1xuICAgICAgZHJpdmVyLmluaXRBVVQuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBzdGFydCBBVVQgaWYgbm90IGF1dG8gbGF1Y2hpbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIub3B0cy5hdXRvTGF1bmNoID0gZmFsc2U7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpO1xuICAgICAgZHJpdmVyLmluaXRBVVQuY2FsbGVkT25jZS5zaG91bGQuYmUuZmFsc2U7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBzZXQgdGhlIGNvbnRleHQgaWYgYXV0b1dlYnZpZXcgaXMgcmVxdWVzdGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyLm9wdHMuYXV0b1dlYnZpZXcgPSB0cnVlO1xuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QW5kcm9pZFNlc3Npb24oKTtcbiAgICAgIGRyaXZlci5kZWZhdWx0V2Vidmlld05hbWUuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICAgIGRyaXZlci5zZXRDb250ZXh0LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBzZXQgdGhlIGNvbnRleHQgaWYgYXV0b1dlYnZpZXcgaXMgcmVxdWVzdGVkIHVzaW5nIHRpbWVvdXQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIuc2V0Q29udGV4dC5vbkNhbGwoMCkudGhyb3dzKGVycm9ycy5Ob1N1Y2hDb250ZXh0RXJyb3IpO1xuICAgICAgZHJpdmVyLnNldENvbnRleHQub25DYWxsKDEpLnJldHVybnMoKTtcblxuICAgICAgZHJpdmVyLm9wdHMuYXV0b1dlYnZpZXcgPSB0cnVlO1xuICAgICAgZHJpdmVyLm9wdHMuYXV0b1dlYnZpZXdUaW1lb3V0ID0gNTAwMDtcbiAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFuZHJvaWRTZXNzaW9uKCk7XG4gICAgICBkcml2ZXIuZGVmYXVsdFdlYnZpZXdOYW1lLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgICBkcml2ZXIuc2V0Q29udGV4dC5jYWxsZWRUd2ljZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlc3BlY3QgdGltZW91dCBpZiBhdXRvV2VidmlldyBpcyByZXF1ZXN0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIuc2V0Q29udGV4dC50aHJvd3MobmV3IGVycm9ycy5Ob1N1Y2hDb250ZXh0RXJyb3IoKSk7XG5cbiAgICAgIGxldCBiZWdpbiA9IERhdGUubm93KCk7XG5cbiAgICAgIGRyaXZlci5vcHRzLmF1dG9XZWJ2aWV3ID0gdHJ1ZTtcbiAgICAgIGRyaXZlci5vcHRzLmF1dG9XZWJ2aWV3VGltZW91dCA9IDUwMDA7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkO1xuICAgICAgZHJpdmVyLmRlZmF1bHRXZWJ2aWV3TmFtZS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuXG4gICAgICAvLyB3ZSBoYXZlIGEgdGltZW91dCBvZiA1MDAwbXMsIHJldHJ5aW5nIG9uIDUwMG1zLCBzbyBleHBlY3QgMTAgdGltZXNcbiAgICAgIGRyaXZlci5zZXRDb250ZXh0LmNhbGxDb3VudC5zaG91bGQuZXF1YWwoMTApO1xuXG4gICAgICBsZXQgZW5kID0gRGF0ZS5ub3coKTtcbiAgICAgIChlbmQgLSBiZWdpbikuc2hvdWxkLmJlLmFib3ZlKDUwMDApO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IHNldCB0aGUgY29udGV4dCBpZiBhdXRvV2VidmlldyBpcyBub3QgcmVxdWVzdGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QW5kcm9pZFNlc3Npb24oKTtcbiAgICAgIGRyaXZlci5kZWZhdWx0V2Vidmlld05hbWUuY2FsbGVkT25jZS5zaG91bGQuYmUuZmFsc2U7XG4gICAgICBkcml2ZXIuc2V0Q29udGV4dC5jYWxsZWRPbmNlLnNob3VsZC5iZS5mYWxzZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHNldCBpZ25vcmVVbmltcG9ydGFudFZpZXdzIGNhcCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlci5vcHRzLmlnbm9yZVVuaW1wb3J0YW50Vmlld3MgPSB0cnVlO1xuXG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBbmRyb2lkU2Vzc2lvbigpO1xuICAgICAgZHJpdmVyLnNldHRpbmdzLnVwZGF0ZS5jYWxsZWRPbmNlLnNob3VsZC5iZS50cnVlO1xuICAgICAgZHJpdmVyLnNldHRpbmdzLnVwZGF0ZS5maXJzdENhbGwuYXJnc1swXS5pZ25vcmVVbmltcG9ydGFudFZpZXdzLnNob3VsZC5iZS50cnVlO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3ZhbGlkYXRlRGVzaXJlZENhcHMnLCAoKSA9PiB7XG4gICAgYmVmb3JlKCgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBjYXBzIGRvIG5vdCBjb250YWluIGFuIGFwcCwgcGFja2FnZSBvciB2YWxpZCBicm93c2VyJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgZHJpdmVyLnZhbGlkYXRlRGVzaXJlZENhcHMoe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJ30pO1xuICAgICAgfSkudG8udGhyb3coL211c3QgaW5jbHVkZS8pO1xuICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgZHJpdmVyLnZhbGlkYXRlRGVzaXJlZENhcHMoe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYnJvd3Nlck5hbWU6ICdOZXRzY2FwZSBOYXZpZ2F0b3InfSk7XG4gICAgICB9KS50by50aHJvdygvbXVzdCBpbmNsdWRlLyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBub3QgdGhyb3cgYW4gZXJyb3IgaWYgY2FwcyBjb250YWluIGFuIGFwcCwgcGFja2FnZSBvciB2YWxpZCBicm93c2VyJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgZHJpdmVyLnZhbGlkYXRlRGVzaXJlZENhcHMoe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwOiAnL3BhdGgvdG8vc29tZS5hcGsnfSk7XG4gICAgICB9KS50by5ub3QudGhyb3coRXJyb3IpO1xuICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgZHJpdmVyLnZhbGlkYXRlRGVzaXJlZENhcHMoe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYnJvd3Nlck5hbWU6ICdDaHJvbWUnfSk7XG4gICAgICB9KS50by5ub3QudGhyb3coRXJyb3IpO1xuICAgICAgZXhwZWN0KCgpID0+IHtcbiAgICAgICAgZHJpdmVyLnZhbGlkYXRlRGVzaXJlZENhcHMoe3BsYXRmb3JtTmFtZTogJ0FuZHJvaWQnLCBkZXZpY2VOYW1lOiAnZGV2aWNlJywgYXBwUGFja2FnZTogJ3NvbWUuYXBwLnBhY2thZ2UnfSk7XG4gICAgICB9KS50by5ub3QudGhyb3coL211c3QgaW5jbHVkZS8pO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IGJlIHNlbnNpdGl2ZSB0byBwbGF0Zm9ybSBuYW1lIGNhc2luZycsICgpID0+IHtcbiAgICAgIGV4cGVjdCgoKSA9PiB7XG4gICAgICAgIGRyaXZlci52YWxpZGF0ZURlc2lyZWRDYXBzKHtwbGF0Zm9ybU5hbWU6ICdBbkRyT2lEJywgZGV2aWNlTmFtZTogJ2RldmljZScsIGFwcDogJy9wYXRoL3RvL3NvbWUuYXBrJ30pO1xuICAgICAgfSkudG8ubm90LnRocm93KEVycm9yKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCB0aHJvdyBhbiBlcnJvciBpZiBjYXBzIGNvbnRhaW4gYm90aCBhbiBhcHAgYW5kIGJyb3dzZXIsIGZvciBncmlkIGNvbXBhdGliaWxpdHknLCAoKSA9PiB7XG4gICAgICBleHBlY3QoKCkgPT4ge1xuICAgICAgICBkcml2ZXIudmFsaWRhdGVEZXNpcmVkQ2Fwcyh7cGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsIGRldmljZU5hbWU6ICdkZXZpY2UnLCBhcHA6ICcvcGF0aC90by9zb21lLmFwaycsIGJyb3dzZXJOYW1lOiAnaVBob25lJ30pO1xuICAgICAgfSkudG8ubm90LnRocm93KEVycm9yKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdwcm94eWluZycsICgpID0+IHtcbiAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGRyaXZlci5zZXNzaW9uSWQgPSAnYWJjJztcbiAgICB9KTtcbiAgICBkZXNjcmliZSgnI3Byb3h5QWN0aXZlJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBleGlzdCcsICgpID0+IHtcbiAgICAgICAgZHJpdmVyLnByb3h5QWN0aXZlLnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEZ1bmN0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGRyaXZlci5wcm94eUFjdGl2ZSgnYWJjJykuc2hvdWxkLmJlLmZhbHNlO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHNlc3Npb24gaWQgaXMgd3JvbmcnLCAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7IGRyaXZlci5wcm94eUFjdGl2ZSgnYWFhJyk7IH0pLnNob3VsZC50aHJvdztcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJyNnZXRQcm94eUF2b2lkTGlzdCcsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZXhpc3QnLCAoKSA9PiB7XG4gICAgICAgIGRyaXZlci5nZXRQcm94eUF2b2lkTGlzdC5zaG91bGQuYmUuYW4uaW5zdGFuY2VvZihGdW5jdGlvbik7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgcmV0dXJuIGp3cFByb3h5QXZvaWQgYXJyYXknLCAoKSA9PiB7XG4gICAgICAgIGxldCBhdm9pZExpc3QgPSBkcml2ZXIuZ2V0UHJveHlBdm9pZExpc3QoJ2FiYycpO1xuICAgICAgICBhdm9pZExpc3Quc2hvdWxkLmJlLmFuLmluc3RhbmNlb2YoQXJyYXkpO1xuICAgICAgICBhdm9pZExpc3Quc2hvdWxkLmVxbChkcml2ZXIuandwUHJveHlBdm9pZCk7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgc2Vzc2lvbiBpZCBpcyB3cm9uZycsICgpID0+IHtcbiAgICAgICAgKCgpID0+IHsgZHJpdmVyLmdldFByb3h5QXZvaWRMaXN0KCdhYWEnKTsgfSkuc2hvdWxkLnRocm93O1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnI2NhblByb3h5JywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBleGlzdCcsICgpID0+IHtcbiAgICAgICAgZHJpdmVyLmNhblByb3h5LnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEZ1bmN0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UnLCAoKSA9PiB7XG4gICAgICAgIGRyaXZlci5jYW5Qcm94eSgnYWJjJykuc2hvdWxkLmJlLmZhbHNlO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIHNlc3Npb24gaWQgaXMgd3JvbmcnLCAoKSA9PiB7XG4gICAgICAgICgoKSA9PiB7IGRyaXZlci5jYW5Qcm94eSgnYWFhJyk7IH0pLnNob3VsZC50aHJvdztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19