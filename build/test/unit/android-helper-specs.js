'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _libAndroidHelpers = require('../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var _appiumTestSupport = require('appium-test-support');

var _teen_process = require('teen_process');

var teen_process = _interopRequireWildcard(_teen_process);

var _appiumSupport = require('appium-support');

var _ioAppiumSettings = require('io.appium.settings');

var _appiumUnlock = require('appium-unlock');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var should = _chai2['default'].should();
var REMOTE_TEMP_PATH = "/data/local/tmp";
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Android Helpers', function () {
  var adb = new _appiumAdb2['default']();

  describe('parseJavaVersion', function () {
    it('should correctly parse java version', function () {
      _libAndroidHelpers2['default'].parseJavaVersion('java version "1.8.0_40"\n        Java(TM) SE Runtime Environment (build 1.8.0_40-b27)').should.be.equal("1.8.0_40");
    });
    it('should return null if it cannot parse java verstion', function () {
      should.not.exist(_libAndroidHelpers2['default'].parseJavaVersion('foo bar'));
    });
    it('should parse OpenJDK versioning', function () {
      _libAndroidHelpers2['default'].parseJavaVersion('openjdk version 1.8').should.be.equal('1.8');
    });
  });

  describe('getJavaVersion', (0, _appiumTestSupport.withMocks)({ teen_process: teen_process }, function (mocks) {
    it('should correctly get java version', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.teen_process.expects('exec').withExactArgs('java', ['-version']).returns({ stderr: 'java version "1.8.0_40"' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getJavaVersion());

          case 3:
            context$3$0.sent.should.equal('1.8.0_40');

            mocks.teen_process.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return null if it cannot parse java verstion', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.teen_process.expects('exec').withExactArgs('java', ['-version']).returns({ stderr: 'foo bar' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getJavaVersion().should.eventually.be.rejectedWith('Java'));

          case 3:
            mocks.teen_process.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('prepareEmulator', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    var opts = { avd: "foo@bar", avdArgs: "", language: "en", locale: "us" };
    it('should not launch avd if one is already running', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getRunningAVD').withExactArgs('foobar').returns("foo");
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].prepareEmulator(adb, opts));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should launch avd if one is already running', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getRunningAVD').withExactArgs('foobar').returns(null);
            mocks.adb.expects('launchAVD').withExactArgs('foo@bar', '', 'en', 'us', undefined, undefined).returns("");
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].prepareEmulator(adb, opts));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('ensureDeviceLocale', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return if language and country are not passed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getDeviceLanguage').never();
            mocks.adb.expects('getDeviceCountry').never();
            mocks.adb.expects('getDeviceLocale').never();
            mocks.adb.expects('setDeviceLanguage').never();
            mocks.adb.expects('setDeviceCountry').never();
            mocks.adb.expects('setDeviceLocale').never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb));

          case 9:
            mocks.adb.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not set language and country if it does not change when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns("18");
            mocks.adb.expects('getDeviceLanguage').returns('en');
            mocks.adb.expects('getDeviceCountry').returns('us');
            mocks.adb.expects('getDeviceLocale').never();
            mocks.adb.expects('setDeviceLanguage').never();
            mocks.adb.expects('setDeviceCountry').never();
            mocks.adb.expects('setDeviceLocale').never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'us'));

          case 10:
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set language and country if they are different when API < 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns("18");
            mocks.adb.expects('getDeviceLanguage').returns('fr');
            mocks.adb.expects('getDeviceCountry').returns('FR');
            mocks.adb.expects('getDeviceLocale').never();
            mocks.adb.expects('setDeviceLanguage').withExactArgs('en').returns("");
            mocks.adb.expects('setDeviceCountry').withExactArgs('us').returns("");
            mocks.adb.expects('setDeviceLocale').never();
            mocks.adb.expects('reboot').returns(null);
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'us'));

          case 10:
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not set locale if it does not change when API = 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns("23");
            mocks.adb.expects('getDeviceLanguage').never();
            mocks.adb.expects('getDeviceCountry').never();
            mocks.adb.expects('getDeviceLocale').returns('en-US');
            mocks.adb.expects('setDeviceLanguage').never();
            mocks.adb.expects('setDeviceCountry').never();
            mocks.adb.expects('setDeviceLocale').never();
            mocks.adb.expects('reboot').never();
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'us'));

          case 10:
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should set locale if it is different when API = 23', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('getApiLevel').returns("23");
            mocks.adb.expects('getDeviceLanguage').never();
            mocks.adb.expects('getDeviceCountry').never();
            mocks.adb.expects('getDeviceLocale').returns('fr-FR');
            mocks.adb.expects('setDeviceLanguage').never();
            mocks.adb.expects('setDeviceCountry').never();
            mocks.adb.expects('setDeviceLocale').withExactArgs('en-US').returns("");
            mocks.adb.expects('reboot').returns(null);
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'us'));

          case 10:
            mocks.adb.verify();

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe('getDeviceInfoFromCaps', function () {
    // list of device/emu udids to their os versions
    // using list instead of map to preserve order
    var devices = [{ udid: 'emulator-1234', os: '4.9.2' }, { udid: 'rotalume-1339', os: '5.1.5' }, { udid: 'rotalume-1338', os: '5.0.1' }, { udid: 'rotalume-1337', os: '5.0.1' }, { udid: 'roamulet-9000', os: '6.0' }, { udid: 'roamulet-0', os: '2.3' }, { udid: '0123456789', os: 'wellhellothere' }];
    var curDeviceId = '';

    before(function () {
      _sinon2['default'].stub(_appiumAdb2['default'], 'createADB', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          var _this2 = this;

          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              return context$4$0.abrupt('return', {
                getDevicesWithRetry: function getDevicesWithRetry() {
                  return _regeneratorRuntime.async(function getDevicesWithRetry$(context$5$0) {
                    while (1) switch (context$5$0.prev = context$5$0.next) {
                      case 0:
                        return context$5$0.abrupt('return', _lodash2['default'].map(devices, function (device) {
                          return { udid: device.udid };
                        }));

                      case 1:
                      case 'end':
                        return context$5$0.stop();
                    }
                  }, null, _this2);
                },
                getPortFromEmulatorString: function getPortFromEmulatorString() {
                  return 1234;
                },
                getRunningAVD: function getRunningAVD() {
                  return { 'udid': 'emulator-1234', 'port': 1234 };
                },
                setDeviceId: function setDeviceId(udid) {
                  curDeviceId = udid;
                },
                getPlatformVersion: function getPlatformVersion() {
                  return _lodash2['default'].filter(devices, { udid: curDeviceId })[0].os;
                },
                curDeviceId: 'emulator-1234',
                emulatorPort: 1234
              });

            case 1:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    after(function () {
      _appiumAdb2['default'].createADB.restore();
    });

    it('should throw error when udid not in list', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              udid: 'foomulator'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps).should.be.rejectedWith('foomulator'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort when udid is present', function callee$2$0() {
      var caps, _ref, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              udid: 'emulator-1234'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref = context$3$0.sent;
            udid = _ref.udid;
            emPort = _ref.emPort;

            udid.should.equal('emulator-1234');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get first deviceId and emPort if avd, platformVersion, and udid aren\'t given', function callee$2$0() {
      var _ref2, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps());

          case 2:
            _ref2 = context$3$0.sent;
            udid = _ref2.udid;
            emPort = _ref2.emPort;

            udid.should.equal('emulator-1234');
            emPort.should.equal(1234);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort when avd is present', function callee$2$0() {
      var caps, _ref3, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              avd: 'AVD_NAME'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref3 = context$3$0.sent;
            udid = _ref3.udid;
            emPort = _ref3.emPort;

            udid.should.equal('emulator-1234');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should fail if the given platformVersion is not found', function callee$2$0() {
      var caps;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '1234567890'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps).should.be.rejectedWith('Unable to find an active device or emulator with OS 1234567890'));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort if platformVersion is found and unique', function callee$2$0() {
      var caps, _ref4, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '6.0'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref4 = context$3$0.sent;
            udid = _ref4.udid;
            emPort = _ref4.emPort;

            udid.should.equal('roamulet-9000');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get the first deviceId and emPort if platformVersion is found multiple times', function callee$2$0() {
      var caps, _ref5, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '5.0.1'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref5 = context$3$0.sent;
            udid = _ref5.udid;
            emPort = _ref5.emPort;

            udid.should.equal('rotalume-1338');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get the first deviceId and emPort if platformVersion is found multiple times and is a partial match', function callee$2$0() {
      var caps, _ref6, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              platformVersion: '5.0'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref6 = context$3$0.sent;
            udid = _ref6.udid;
            emPort = _ref6.emPort;

            udid.should.equal('rotalume-1338');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should get deviceId and emPort by udid if udid and platformVersion are given', function callee$2$0() {
      var caps, _ref7, udid, emPort;

      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            caps = {
              udid: '0123456789',
              platformVersion: '2.3'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getDeviceInfoFromCaps(caps));

          case 3:
            _ref7 = context$3$0.sent;
            udid = _ref7.udid;
            emPort = _ref7.emPort;

            udid.should.equal('0123456789');
            emPort.should.equal(1234);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });

  describe('getLaunchInfoFromManifest', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return when no app present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('packageAndLaunchActivityFromManifest').never();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, {}));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return when appPackage & appActivity are already present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('packageAndLaunchActivityFromManifest').never();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, { app: "foo", appPackage: "bar",
              appActivity: "act" }));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return package and launch activity from manifest', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('packageAndLaunchActivityFromManifest').withExactArgs('foo').returns({ apkPackage: 'pkg', apkActivity: 'ack' });
            result = { appPackage: 'pkg', appWaitPackage: 'pkg',
              appActivity: 'ack', appWaitActivity: 'ack' };
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].getLaunchInfo(adb, { app: "foo" }));

          case 4:
            context$3$0.t0 = result;
            context$3$0.sent.should.deep.equal(context$3$0.t0);

            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getRemoteApkPath', function () {
    it('should return remote path', function () {
      _libAndroidHelpers2['default'].getRemoteApkPath('foo').should.equal(REMOTE_TEMP_PATH + '/foo.apk');
    });
  });
  describe('resetApp', (0, _appiumTestSupport.withMocks)({ adb: adb, fs: _appiumSupport.fs, helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    var localApkPath = 'local';
    var pkg = 'pkg';
    var androidInstallTimeout = 90000;
    it('should throw error if remote file does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.adb.expects('fileExists').returns(false);
            mocks.helpers.expects('reinstallRemoteApk').never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].resetApp(adb, localApkPath, pkg, false, androidInstallTimeout).should.eventually.be.rejectedWith('slow'));

          case 5:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw error if remote file does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.adb.expects('fileExists').returns(true);
            mocks.helpers.expects('reinstallRemoteApk').once().returns('');
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].resetApp(adb, localApkPath, pkg, false, androidInstallTimeout));

          case 5:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));

  describe.skip('reinstallRemoteApk', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    var localApkPath = 'local';
    var pkg = 'pkg';
    var remotePath = 'remote';
    var androidInstallTimeout = 90000;
    it('should throw error if remote file does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('uninstallApk').withExactArgs(pkg).returns('');
            // install remote is not defines do we mean installApkRemotely?
            mocks.adb.expects('installRemote').withExactArgs(remotePath).returns('');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].reinstallRemoteApk(adb, localApkPath, pkg, remotePath, androidInstallTimeout));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('installApkRemotely', (0, _appiumTestSupport.withMocks)({ adb: adb, fs: _appiumSupport.fs, helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    //use mock appium capabilities for this test
    var opts = {
      app: 'local',
      appPackage: 'pkg',
      fastReset: true,
      androidInstallTimeout: 90000
    };
    it('should reset app if already installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(opts.app).returns('apkmd5');
            mocks.helpers.expects('getRemoteApkPath').returns(false);
            mocks.adb.expects('fileExists').returns(true);
            mocks.adb.expects('isAppInstalled').returns(true);
            mocks.helpers.expects('resetApp').once().returns("");
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, opts));

          case 7:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it.skip('should push and reinstall apk when apk is not installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(opts.app).returns('apkmd5');
            mocks.helpers.expects('getRemoteApkPath').returns(true);
            mocks.adb.expects('fileExists').returns(true);
            mocks.adb.expects('isAppInstalled').returns(true);
            mocks.helpers.expects('resetApp').once().returns("");
            mocks.helpers.expects('reinstallRemoteApk').once().returns("");
            mocks.helpers.expects('removeTempApks').once().returns(true);
            mocks.adb.expects('mkdir').once().returns("");
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, opts));

          case 10:
            mocks.adb.verify();
            mocks.fs.verify();
            mocks.helpers.verify();

          case 13:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('removeRemoteApks', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return when no apks present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('ls').returns([]);
            mocks.adb.expects('shell').never();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].removeRemoteApks(adb));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return when only exceptMd5s are present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('ls').returns(['foo']);
            mocks.adb.expects('shell').never();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].removeRemoteApks(adb, ['foo']));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should remove all remote apks', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('ls').returns(['foo']);
            mocks.adb.expects('shell').once().returns('');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].removeRemoteApks(adb, ['bar']));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('initUnicodeKeyboard', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should install and enable unicodeIME', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('install').once().returns('');
            mocks.adb.expects('defaultIME').once().returns('defaultIME');
            mocks.adb.expects('enableIME').once().returns('');
            mocks.adb.expects('setIME').once().returns('');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].initUnicodeKeyboard(adb));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('pushSettingsApp', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should install settingsApp', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('install').withExactArgs(_ioAppiumSettings.path, false).once().returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushSettingsApp(adb));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('pushUnlock', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should install unlockApp', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('install').withExactArgs(_appiumUnlock.path, false).once().returns('');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].pushUnlock(adb));

          case 3:
            mocks.adb.verify();

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('unlock', (0, _appiumTestSupport.withMocks)({ adb: adb }, function (mocks) {
    it('should return if screen is already unlocked', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').withExactArgs().once().returns(false);
            mocks.adb.expects('startApp').never();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(adb));

          case 4:
            mocks.adb.verify();

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should start unlock app', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('isScreenLocked').onCall(0).returns(true);
            mocks.adb.expects('isScreenLocked').returns(false);
            mocks.adb.expects('forceStop').once().returns('');
            mocks.adb.expects('startApp').twice().returns('');
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].unlock(adb));

          case 6:
            mocks.adb.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('removeNullProperties', function () {
    it('should ignore null properties', function callee$2$0() {
      var test;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            test = { foo: null, bar: true };

            _libAndroidHelpers2['default'].removeNullProperties(test);
            _lodash2['default'].keys(test).length.should.equal(1);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should ignore undefined properties', function callee$2$0() {
      var test;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            test = { foo: undefined, bar: true };

            _libAndroidHelpers2['default'].removeNullProperties(test);
            _lodash2['default'].keys(test).length.should.equal(1);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should not ignore falsy properties like 0 and false', function callee$2$0() {
      var test;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            test = { foo: false, bar: true, zero: 0 };

            _libAndroidHelpers2['default'].removeNullProperties(test);
            _lodash2['default'].keys(test).length.should.equal(3);

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hbmRyb2lkLWhlbHBlci1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7OztpQ0FDTCwyQkFBMkI7Ozs7eUJBQy9CLFlBQVk7Ozs7aUNBQ0YscUJBQXFCOzs0QkFDakIsY0FBYzs7SUFBaEMsWUFBWTs7NkJBQ0wsZ0JBQWdCOztnQ0FDSyxvQkFBb0I7OzRCQUN0QixlQUFlOztzQkFDdkMsUUFBUTs7OztBQUV0QixJQUFNLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUM3QixJQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO0FBQzNDLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxZQUFNO0FBQ2hDLE1BQUksR0FBRyxHQUFHLDRCQUFTLENBQUM7O0FBRXBCLFVBQVEsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0FBQ2pDLE1BQUUsQ0FBQyxxQ0FBcUMsRUFBRSxZQUFNO0FBQzlDLHFDQUFRLGdCQUFnQix5RkFDZ0MsQ0FBQyxNQUFNLENBQzVELEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDekIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHFEQUFxRCxFQUFFLFlBQU07QUFDOUQsWUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsK0JBQVEsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUN2RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsaUNBQWlDLEVBQUUsWUFBWTtBQUNoRCxxQ0FBUSxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hFLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsZ0JBQWdCLEVBQUUsa0NB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Q0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvdW5pdC9hbmRyb2lkLWhlbHBlci1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4uLy4uL2xpYi9hbmRyb2lkLWhlbHBlcnMnO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcbmltcG9ydCB7IHdpdGhNb2NrcyB9IGZyb20gJ2FwcGl1bS10ZXN0LXN1cHBvcnQnO1xuaW1wb3J0ICogYXMgdGVlbl9wcm9jZXNzIGZyb20gJ3RlZW5fcHJvY2Vzcyc7XG5pbXBvcnQgeyBmcyB9IGZyb20gJ2FwcGl1bS1zdXBwb3J0JztcbmltcG9ydCB7IHBhdGggYXMgc2V0dGluZ3NBcGtQYXRoIH0gZnJvbSAnaW8uYXBwaXVtLnNldHRpbmdzJztcbmltcG9ydCB7IHBhdGggYXMgdW5sb2NrQXBrUGF0aCB9IGZyb20gJ2FwcGl1bS11bmxvY2snO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuY29uc3Qgc2hvdWxkID0gY2hhaS5zaG91bGQoKTtcbmNvbnN0IFJFTU9URV9URU1QX1BBVEggPSBcIi9kYXRhL2xvY2FsL3RtcFwiO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnQW5kcm9pZCBIZWxwZXJzJywgKCkgPT4ge1xuICBsZXQgYWRiID0gbmV3IEFEQigpO1xuXG4gIGRlc2NyaWJlKCdwYXJzZUphdmFWZXJzaW9uJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IHBhcnNlIGphdmEgdmVyc2lvbicsICgpID0+IHtcbiAgICAgIGhlbHBlcnMucGFyc2VKYXZhVmVyc2lvbihgamF2YSB2ZXJzaW9uIFwiMS44LjBfNDBcIlxuICAgICAgICBKYXZhKFRNKSBTRSBSdW50aW1lIEVudmlyb25tZW50IChidWlsZCAxLjguMF80MC1iMjcpYCkuc2hvdWxkXG4gICAgICAgIC5iZS5lcXVhbChcIjEuOC4wXzQwXCIpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIG51bGwgaWYgaXQgY2Fubm90IHBhcnNlIGphdmEgdmVyc3Rpb24nLCAoKSA9PiB7XG4gICAgICBzaG91bGQubm90LmV4aXN0KGhlbHBlcnMucGFyc2VKYXZhVmVyc2lvbignZm9vIGJhcicpKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHBhcnNlIE9wZW5KREsgdmVyc2lvbmluZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGhlbHBlcnMucGFyc2VKYXZhVmVyc2lvbignb3BlbmpkayB2ZXJzaW9uIDEuOCcpLnNob3VsZC5iZS5lcXVhbCgnMS44Jyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRKYXZhVmVyc2lvbicsIHdpdGhNb2Nrcyh7dGVlbl9wcm9jZXNzfSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBjb3JyZWN0bHkgZ2V0IGphdmEgdmVyc2lvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKCdleGVjJykud2l0aEV4YWN0QXJncygnamF2YScsIFsnLXZlcnNpb24nXSlcbiAgICAgICAgLnJldHVybnMoe3N0ZGVycjogJ2phdmEgdmVyc2lvbiBcIjEuOC4wXzQwXCInfSk7XG4gICAgICAoYXdhaXQgaGVscGVycy5nZXRKYXZhVmVyc2lvbigpKS5zaG91bGQuZXF1YWwoJzEuOC4wXzQwJyk7XG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gbnVsbCBpZiBpdCBjYW5ub3QgcGFyc2UgamF2YSB2ZXJzdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLnRlZW5fcHJvY2Vzcy5leHBlY3RzKCdleGVjJykud2l0aEV4YWN0QXJncygnamF2YScsIFsnLXZlcnNpb24nXSlcbiAgICAgICAgLnJldHVybnMoe3N0ZGVycjogJ2ZvbyBiYXInfSk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmdldEphdmFWZXJzaW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKCdKYXZhJyk7XG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3ByZXBhcmVFbXVsYXRvcicsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgY29uc3Qgb3B0cyA9IHthdmQ6IFwiZm9vQGJhclwiLCBhdmRBcmdzOiBcIlwiLCBsYW5ndWFnZTogXCJlblwiLCBsb2NhbGU6IFwidXNcIn07XG4gICAgaXQoJ3Nob3VsZCBub3QgbGF1bmNoIGF2ZCBpZiBvbmUgaXMgYWxyZWFkeSBydW5uaW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldFJ1bm5pbmdBVkQnKS53aXRoRXhhY3RBcmdzKCdmb29iYXInKVxuICAgICAgICAucmV0dXJucyhcImZvb1wiKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucHJlcGFyZUVtdWxhdG9yKGFkYiwgb3B0cyk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBsYXVuY2ggYXZkIGlmIG9uZSBpcyBhbHJlYWR5IHJ1bm5pbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0UnVubmluZ0FWRCcpLndpdGhFeGFjdEFyZ3MoJ2Zvb2JhcicpXG4gICAgICAgIC5yZXR1cm5zKG51bGwpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2xhdW5jaEFWRCcpLndpdGhFeGFjdEFyZ3MoJ2Zvb0BiYXInLCAnJywgJ2VuJywgJ3VzJyxcbiAgICAgICAgdW5kZWZpbmVkLCB1bmRlZmluZWQpXG4gICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgYXdhaXQgaGVscGVycy5wcmVwYXJlRW11bGF0b3IoYWRiLCBvcHRzKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnZW5zdXJlRGV2aWNlTG9jYWxlJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBpZiBsYW5ndWFnZSBhbmQgY291bnRyeSBhcmUgbm90IHBhc3NlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMYW5ndWFnZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlQ291bnRyeScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTG9jYWxlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMYW5ndWFnZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlQ291bnRyeScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTG9jYWxlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdyZWJvb3QnKS5uZXZlcigpO1xuICAgICAgYXdhaXQgaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUoYWRiKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBzZXQgbGFuZ3VhZ2UgYW5kIGNvdW50cnkgaWYgaXQgZG9lcyBub3QgY2hhbmdlIHdoZW4gQVBJIDwgMjMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKFwiMThcIik7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTGFuZ3VhZ2UnKS5yZXR1cm5zKCdlbicpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUNvdW50cnknKS5yZXR1cm5zKCd1cycpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxvY2FsZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTGFuZ3VhZ2UnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUNvdW50cnknKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxvY2FsZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncmVib290JykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZW5zdXJlRGV2aWNlTG9jYWxlKGFkYiwgJ2VuJywgJ3VzJyk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBzZXQgbGFuZ3VhZ2UgYW5kIGNvdW50cnkgaWYgdGhleSBhcmUgZGlmZmVyZW50IHdoZW4gQVBJIDwgMjMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKFwiMThcIik7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTGFuZ3VhZ2UnKS5yZXR1cm5zKCdmcicpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUNvdW50cnknKS5yZXR1cm5zKCdGUicpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxvY2FsZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTGFuZ3VhZ2UnKS53aXRoRXhhY3RBcmdzKCdlbicpXG4gICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUNvdW50cnknKS53aXRoRXhhY3RBcmdzKCd1cycpXG4gICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxvY2FsZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncmVib290JykucmV0dXJucyhudWxsKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZW5zdXJlRGV2aWNlTG9jYWxlKGFkYiwgJ2VuJywgJ3VzJyk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBub3Qgc2V0IGxvY2FsZSBpZiBpdCBkb2VzIG5vdCBjaGFuZ2Ugd2hlbiBBUEkgPSAyMycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRBcGlMZXZlbCcpLnJldHVybnMoXCIyM1wiKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMYW5ndWFnZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlQ291bnRyeScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTG9jYWxlJykucmV0dXJucygnZW4tVVMnKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMYW5ndWFnZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlQ291bnRyeScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTG9jYWxlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdyZWJvb3QnKS5uZXZlcigpO1xuICAgICAgYXdhaXQgaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUoYWRiLCAnZW4nLCAndXMnKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHNldCBsb2NhbGUgaWYgaXQgaXMgZGlmZmVyZW50IHdoZW4gQVBJID0gMjMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKFwiMjNcIik7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTGFuZ3VhZ2UnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUNvdW50cnknKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxvY2FsZScpLnJldHVybnMoJ2ZyLUZSJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTGFuZ3VhZ2UnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUNvdW50cnknKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxvY2FsZScpLndpdGhFeGFjdEFyZ3MoJ2VuLVVTJylcbiAgICAgICAgLnJldHVybnMoXCJcIik7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncmVib290JykucmV0dXJucyhudWxsKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZW5zdXJlRGV2aWNlTG9jYWxlKGFkYiwgJ2VuJywgJ3VzJyk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcblxuICBkZXNjcmliZSgnZ2V0RGV2aWNlSW5mb0Zyb21DYXBzJywgKCkgPT4ge1xuICAgIC8vIGxpc3Qgb2YgZGV2aWNlL2VtdSB1ZGlkcyB0byB0aGVpciBvcyB2ZXJzaW9uc1xuICAgIC8vIHVzaW5nIGxpc3QgaW5zdGVhZCBvZiBtYXAgdG8gcHJlc2VydmUgb3JkZXJcbiAgICBsZXQgZGV2aWNlcyA9IFtcbiAgICAgIHt1ZGlkOiAnZW11bGF0b3ItMTIzNCcsIG9zOiAnNC45LjInfSxcbiAgICAgIHt1ZGlkOiAncm90YWx1bWUtMTMzOScsIG9zOiAnNS4xLjUnfSxcbiAgICAgIHt1ZGlkOiAncm90YWx1bWUtMTMzOCcsIG9zOiAnNS4wLjEnfSxcbiAgICAgIHt1ZGlkOiAncm90YWx1bWUtMTMzNycsIG9zOiAnNS4wLjEnfSxcbiAgICAgIHt1ZGlkOiAncm9hbXVsZXQtOTAwMCcsIG9zOiAnNi4wJ30sXG4gICAgICB7dWRpZDogJ3JvYW11bGV0LTAnLCBvczogJzIuMyd9LFxuICAgICAge3VkaWQ6ICcwMTIzNDU2Nzg5Jywgb3M6ICd3ZWxsaGVsbG90aGVyZSd9XG4gICAgXTtcbiAgICBsZXQgY3VyRGV2aWNlSWQgPSAnJztcblxuICAgIGJlZm9yZSgoKSA9PiB7XG4gICAgICBzaW5vbi5zdHViKEFEQiwgJ2NyZWF0ZUFEQicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBnZXREZXZpY2VzV2l0aFJldHJ5OiBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gXy5tYXAoZGV2aWNlcywgKGRldmljZSkgPT4geyByZXR1cm4ge3VkaWQ6IGRldmljZS51ZGlkfTsgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRQb3J0RnJvbUVtdWxhdG9yU3RyaW5nOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gMTIzNDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldFJ1bm5pbmdBVkQ6ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7J3VkaWQnOiAnZW11bGF0b3ItMTIzNCcsICdwb3J0JzogMTIzNH07XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXREZXZpY2VJZDogKHVkaWQpID0+IHtcbiAgICAgICAgICAgIGN1ckRldmljZUlkID0gdWRpZDtcbiAgICAgICAgICB9LFxuICAgICAgICAgIGdldFBsYXRmb3JtVmVyc2lvbjogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIF8uZmlsdGVyKGRldmljZXMsIHt1ZGlkOiBjdXJEZXZpY2VJZH0pWzBdLm9zO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgY3VyRGV2aWNlSWQ6ICdlbXVsYXRvci0xMjM0JyxcbiAgICAgICAgICBlbXVsYXRvclBvcnQ6IDEyMzRcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgYWZ0ZXIoKCkgPT4ge1xuICAgICAgQURCLmNyZWF0ZUFEQi5yZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIHdoZW4gdWRpZCBub3QgaW4gbGlzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjYXBzID0ge1xuICAgICAgICB1ZGlkOiAnZm9vbXVsYXRvcidcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKGNhcHMpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoJ2Zvb211bGF0b3InKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCBkZXZpY2VJZCBhbmQgZW1Qb3J0IHdoZW4gdWRpZCBpcyBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNhcHMgPSB7XG4gICAgICAgIHVkaWQ6ICdlbXVsYXRvci0xMjM0J1xuICAgICAgfTtcblxuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcyk7XG4gICAgICB1ZGlkLnNob3VsZC5lcXVhbCgnZW11bGF0b3ItMTIzNCcpO1xuICAgICAgZW1Qb3J0LnNob3VsZC5lcXVhbCgxMjM0KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCBmaXJzdCBkZXZpY2VJZCBhbmQgZW1Qb3J0IGlmIGF2ZCwgcGxhdGZvcm1WZXJzaW9uLCBhbmQgdWRpZCBhcmVuXFwndCBnaXZlbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKCk7XG4gICAgICB1ZGlkLnNob3VsZC5lcXVhbCgnZW11bGF0b3ItMTIzNCcpO1xuICAgICAgZW1Qb3J0LnNob3VsZC5lcXVhbCgxMjM0KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCBkZXZpY2VJZCBhbmQgZW1Qb3J0IHdoZW4gYXZkIGlzIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY2FwcyA9IHtcbiAgICAgICAgYXZkOiAnQVZEX05BTUUnXG4gICAgICB9O1xuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcyk7XG4gICAgICB1ZGlkLnNob3VsZC5lcXVhbCgnZW11bGF0b3ItMTIzNCcpO1xuICAgICAgZW1Qb3J0LnNob3VsZC5lcXVhbCgxMjM0KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGZhaWwgaWYgdGhlIGdpdmVuIHBsYXRmb3JtVmVyc2lvbiBpcyBub3QgZm91bmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY2FwcyA9IHtcbiAgICAgICAgcGxhdGZvcm1WZXJzaW9uOiAnMTIzNDU2Nzg5MCdcbiAgICAgIH07XG4gICAgICBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyhjYXBzKVxuICAgICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgnVW5hYmxlIHRvIGZpbmQgYW4gYWN0aXZlIGRldmljZSBvciBlbXVsYXRvciB3aXRoIE9TIDEyMzQ1Njc4OTAnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCBkZXZpY2VJZCBhbmQgZW1Qb3J0IGlmIHBsYXRmb3JtVmVyc2lvbiBpcyBmb3VuZCBhbmQgdW5pcXVlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNhcHMgPSB7XG4gICAgICAgIHBsYXRmb3JtVmVyc2lvbjogJzYuMCdcbiAgICAgIH07XG4gICAgICBsZXQge3VkaWQsIGVtUG9ydH0gPSBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyhjYXBzKTtcbiAgICAgIHVkaWQuc2hvdWxkLmVxdWFsKCdyb2FtdWxldC05MDAwJyk7XG4gICAgICBlbVBvcnQuc2hvdWxkLmVxdWFsKDEyMzQpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IHRoZSBmaXJzdCBkZXZpY2VJZCBhbmQgZW1Qb3J0IGlmIHBsYXRmb3JtVmVyc2lvbiBpcyBmb3VuZCBtdWx0aXBsZSB0aW1lcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjYXBzID0ge1xuICAgICAgICBwbGF0Zm9ybVZlcnNpb246ICc1LjAuMSdcbiAgICAgIH07XG4gICAgICBsZXQge3VkaWQsIGVtUG9ydH0gPSBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyhjYXBzKTtcbiAgICAgIHVkaWQuc2hvdWxkLmVxdWFsKCdyb3RhbHVtZS0xMzM4Jyk7XG4gICAgICBlbVBvcnQuc2hvdWxkLmVxdWFsKDEyMzQpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IHRoZSBmaXJzdCBkZXZpY2VJZCBhbmQgZW1Qb3J0IGlmIHBsYXRmb3JtVmVyc2lvbiBpcyBmb3VuZCBtdWx0aXBsZSB0aW1lcyBhbmQgaXMgYSBwYXJ0aWFsIG1hdGNoJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNhcHMgPSB7XG4gICAgICAgIHBsYXRmb3JtVmVyc2lvbjogJzUuMCdcbiAgICAgIH07XG4gICAgICBsZXQge3VkaWQsIGVtUG9ydH0gPSBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyhjYXBzKTtcbiAgICAgIHVkaWQuc2hvdWxkLmVxdWFsKCdyb3RhbHVtZS0xMzM4Jyk7XG4gICAgICBlbVBvcnQuc2hvdWxkLmVxdWFsKDEyMzQpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZ2V0IGRldmljZUlkIGFuZCBlbVBvcnQgYnkgdWRpZCBpZiB1ZGlkIGFuZCBwbGF0Zm9ybVZlcnNpb24gYXJlIGdpdmVuJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNhcHMgPSB7XG4gICAgICAgIHVkaWQ6ICcwMTIzNDU2Nzg5JyxcbiAgICAgICAgcGxhdGZvcm1WZXJzaW9uOiAnMi4zJ1xuICAgICAgfTtcbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKGNhcHMpO1xuICAgICAgdWRpZC5zaG91bGQuZXF1YWwoJzAxMjM0NTY3ODknKTtcbiAgICAgIGVtUG9ydC5zaG91bGQuZXF1YWwoMTIzNCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRMYXVuY2hJbmZvRnJvbU1hbmlmZXN0Jywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB3aGVuIG5vIGFwcCBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3BhY2thZ2VBbmRMYXVuY2hBY3Rpdml0eUZyb21NYW5pZmVzdCcpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmdldExhdW5jaEluZm8oYWRiLCB7fSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gd2hlbiBhcHBQYWNrYWdlICYgYXBwQWN0aXZpdHkgYXJlIGFscmVhZHkgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdwYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QnKS5uZXZlcigpO1xuICAgICAgYXdhaXQgaGVscGVycy5nZXRMYXVuY2hJbmZvKGFkYiwge2FwcDogXCJmb29cIiwgYXBwUGFja2FnZTogXCJiYXJcIixcbiAgICAgICAgYXBwQWN0aXZpdHk6IFwiYWN0XCJ9KTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBwYWNrYWdlIGFuZCBsYXVuY2ggYWN0aXZpdHkgZnJvbSBtYW5pZmVzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdwYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QnKS53aXRoRXhhY3RBcmdzKCdmb28nKVxuICAgICAgICAucmV0dXJucyh7YXBrUGFja2FnZTogJ3BrZycsIGFwa0FjdGl2aXR5OiAnYWNrJ30pO1xuICAgICAgY29uc3QgcmVzdWx0ID0geyBhcHBQYWNrYWdlOiAncGtnJywgYXBwV2FpdFBhY2thZ2U6ICdwa2cnLFxuICAgICAgICAgICAgICAgICAgICAgICBhcHBBY3Rpdml0eTogJ2FjaycsIGFwcFdhaXRBY3Rpdml0eTogJ2FjaycgfTtcbiAgICAgIChhd2FpdCBoZWxwZXJzLmdldExhdW5jaEluZm8oYWRiLCB7YXBwOiBcImZvb1wifSkpLnNob3VsZC5kZWVwXG4gICAgICAgIC5lcXVhbChyZXN1bHQpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdnZXRSZW1vdGVBcGtQYXRoJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHJlbW90ZSBwYXRoJywgKCkgPT4ge1xuICAgICAgaGVscGVycy5nZXRSZW1vdGVBcGtQYXRoKCdmb28nKS5zaG91bGQuZXF1YWwoYCR7UkVNT1RFX1RFTVBfUEFUSH0vZm9vLmFwa2ApO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3Jlc2V0QXBwJywgd2l0aE1vY2tzKHthZGIsIGZzLCBoZWxwZXJzfSwgKG1vY2tzKSA9PiB7XG4gICAgY29uc3QgbG9jYWxBcGtQYXRoID0gJ2xvY2FsJztcbiAgICBjb25zdCBwa2cgPSAncGtnJztcbiAgICBjb25zdCBhbmRyb2lkSW5zdGFsbFRpbWVvdXQgPSA5MDAwMDtcbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIHJlbW90ZSBmaWxlIGRvZXMgbm90IGV4aXN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnbWQ1Jykud2l0aEV4YWN0QXJncyhsb2NhbEFwa1BhdGgpLnJldHVybnMoJ2Fwa21kNScpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2ZpbGVFeGlzdHMnKS5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygncmVpbnN0YWxsUmVtb3RlQXBrJykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVzZXRBcHAoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgZmFsc2UsIGFuZHJvaWRJbnN0YWxsVGltZW91dCkuc2hvdWxkLmV2ZW50dWFsbHlcbiAgICAgICAgLmJlLnJlamVjdGVkV2l0aCgnc2xvdycpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgcmVtb3RlIGZpbGUgZG9lcyBub3QgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdtZDUnKS53aXRoRXhhY3RBcmdzKGxvY2FsQXBrUGF0aCkucmV0dXJucygnYXBrbWQ1Jyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZmlsZUV4aXN0cycpLnJldHVybnModHJ1ZSk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3JlaW5zdGFsbFJlbW90ZUFwaycpLm9uY2UoKS5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVzZXRBcHAoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgZmFsc2UsIGFuZHJvaWRJbnN0YWxsVGltZW91dCk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcblxuICBkZXNjcmliZS5za2lwKCdyZWluc3RhbGxSZW1vdGVBcGsnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGNvbnN0IGxvY2FsQXBrUGF0aCA9ICdsb2NhbCc7XG4gICAgY29uc3QgcGtnID0gJ3BrZyc7XG4gICAgY29uc3QgcmVtb3RlUGF0aCA9ICdyZW1vdGUnO1xuICAgIGNvbnN0IGFuZHJvaWRJbnN0YWxsVGltZW91dCA9IDkwMDAwO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgcmVtb3RlIGZpbGUgZG9lcyBub3QgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygndW5pbnN0YWxsQXBrJykud2l0aEV4YWN0QXJncyhwa2cpLnJldHVybnMoJycpO1xuICAgICAgLy8gaW5zdGFsbCByZW1vdGUgaXMgbm90IGRlZmluZXMgZG8gd2UgbWVhbiBpbnN0YWxsQXBrUmVtb3RlbHk/XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaW5zdGFsbFJlbW90ZScpLndpdGhFeGFjdEFyZ3MocmVtb3RlUGF0aClcbiAgICAgICAgLnJldHVybnMoJycpO1xuICAgICAgYXdhaXQgaGVscGVycy5yZWluc3RhbGxSZW1vdGVBcGsoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgcmVtb3RlUGF0aCwgYW5kcm9pZEluc3RhbGxUaW1lb3V0KTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnaW5zdGFsbEFwa1JlbW90ZWx5Jywgd2l0aE1vY2tzKHthZGIsIGZzLCBoZWxwZXJzfSwgKG1vY2tzKSA9PiB7XG4gICAgLy91c2UgbW9jayBhcHBpdW0gY2FwYWJpbGl0aWVzIGZvciB0aGlzIHRlc3RcbiAgICBjb25zdCBvcHRzID0ge1xuICAgICAgYXBwIDogJ2xvY2FsJyxcbiAgICAgIGFwcFBhY2thZ2UgOiAncGtnJyxcbiAgICAgIGZhc3RSZXNldCA6IHRydWUsXG4gICAgICBhbmRyb2lkSW5zdGFsbFRpbWVvdXQgOiA5MDAwMFxuICAgIH07XG4gICAgaXQoJ3Nob3VsZCByZXNldCBhcHAgaWYgYWxyZWFkeSBpbnN0YWxsZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdtZDUnKS53aXRoRXhhY3RBcmdzKG9wdHMuYXBwKS5yZXR1cm5zKCdhcGttZDUnKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygnZ2V0UmVtb3RlQXBrUGF0aCcpLnJldHVybnMoZmFsc2UpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2ZpbGVFeGlzdHMnKS5yZXR1cm5zKHRydWUpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzQXBwSW5zdGFsbGVkJykucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygncmVzZXRBcHAnKS5vbmNlKCkucmV0dXJucyhcIlwiKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuaW5zdGFsbEFwa1JlbW90ZWx5KGFkYiwgb3B0cyk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQuc2tpcCgnc2hvdWxkIHB1c2ggYW5kIHJlaW5zdGFsbCBhcGsgd2hlbiBhcGsgaXMgbm90IGluc3RhbGxlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ21kNScpLndpdGhFeGFjdEFyZ3Mob3B0cy5hcHApLnJldHVybnMoJ2Fwa21kNScpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdnZXRSZW1vdGVBcGtQYXRoJykucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlRXhpc3RzJykucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc0FwcEluc3RhbGxlZCcpLnJldHVybnModHJ1ZSk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3Jlc2V0QXBwJykub25jZSgpLnJldHVybnMoXCJcIik7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3JlaW5zdGFsbFJlbW90ZUFwaycpLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZW1vdmVUZW1wQXBrcycpLm9uY2UoKS5yZXR1cm5zKHRydWUpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ21rZGlyJykub25jZSgpLnJldHVybnMoXCJcIik7XG4gICAgICBhd2FpdCBoZWxwZXJzLmluc3RhbGxBcGtSZW1vdGVseShhZGIsIG9wdHMpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgICAgbW9ja3MuZnMudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdyZW1vdmVSZW1vdGVBcGtzJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB3aGVuIG5vIGFwa3MgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdscycpLnJldHVybnMoW10pO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVtb3ZlUmVtb3RlQXBrcyhhZGIpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHdoZW4gb25seSBleGNlcHRNZDVzIGFyZSBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2xzJykucmV0dXJucyhbJ2ZvbyddKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLnJlbW92ZVJlbW90ZUFwa3MoYWRiLCBbJ2ZvbyddKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJlbW92ZSBhbGwgcmVtb3RlIGFwa3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnbHMnKS5yZXR1cm5zKFsnZm9vJ10pO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NoZWxsJykub25jZSgpLnJldHVybnMoJycpO1xuICAgICAgYXdhaXQgaGVscGVycy5yZW1vdmVSZW1vdGVBcGtzKGFkYiwgWydiYXInXSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ2luaXRVbmljb2RlS2V5Ym9hcmQnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgaW5zdGFsbCBhbmQgZW5hYmxlIHVuaWNvZGVJTUUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaW5zdGFsbCcpLm9uY2UoKS5yZXR1cm5zKCcnKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdkZWZhdWx0SU1FJykub25jZSgpLnJldHVybnMoJ2RlZmF1bHRJTUUnKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdlbmFibGVJTUUnKS5vbmNlKCkucmV0dXJucygnJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0SU1FJykub25jZSgpLnJldHVybnMoJycpO1xuICAgICAgYXdhaXQgaGVscGVycy5pbml0VW5pY29kZUtleWJvYXJkKGFkYik7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3B1c2hTZXR0aW5nc0FwcCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBpbnN0YWxsIHNldHRpbmdzQXBwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luc3RhbGwnKS53aXRoRXhhY3RBcmdzKHNldHRpbmdzQXBrUGF0aCwgZmFsc2UpLm9uY2UoKVxuICAgICAgICAucmV0dXJucygnJyk7XG4gICAgICBhd2FpdCBoZWxwZXJzLnB1c2hTZXR0aW5nc0FwcChhZGIpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdwdXNoVW5sb2NrJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGluc3RhbGwgdW5sb2NrQXBwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luc3RhbGwnKS53aXRoRXhhY3RBcmdzKHVubG9ja0Fwa1BhdGgsIGZhbHNlKS5vbmNlKClcbiAgICAgICAgLnJldHVybnMoJycpO1xuICAgICAgYXdhaXQgaGVscGVycy5wdXNoVW5sb2NrKGFkYik7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3VubG9jaycsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gaWYgc2NyZWVuIGlzIGFscmVhZHkgdW5sb2NrZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNTY3JlZW5Mb2NrZWQnKS53aXRoRXhhY3RBcmdzKCkub25jZSgpXG4gICAgICAgIC5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzdGFydEFwcCcpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLnVubG9jayhhZGIpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgc3RhcnQgdW5sb2NrIGFwcCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc1NjcmVlbkxvY2tlZCcpLm9uQ2FsbCgwKS5yZXR1cm5zKHRydWUpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzU2NyZWVuTG9ja2VkJykucmV0dXJucyhmYWxzZSk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZm9yY2VTdG9wJykub25jZSgpLnJldHVybnMoJycpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3N0YXJ0QXBwJykudHdpY2UoKS5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMudW5sb2NrKGFkYik7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ3JlbW92ZU51bGxQcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgaWdub3JlIG51bGwgcHJvcGVydGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCB0ZXN0ID0ge2ZvbzogbnVsbCwgYmFyOiB0cnVlfTtcbiAgICAgIGhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXModGVzdCk7XG4gICAgICBfLmtleXModGVzdCkubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGlnbm9yZSB1bmRlZmluZWQgcHJvcGVydGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCB0ZXN0ID0ge2ZvbzogdW5kZWZpbmVkLCBiYXI6IHRydWV9O1xuICAgICAgaGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyh0ZXN0KTtcbiAgICAgIF8ua2V5cyh0ZXN0KS5sZW5ndGguc2hvdWxkLmVxdWFsKDEpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IGlnbm9yZSBmYWxzeSBwcm9wZXJ0aWVzIGxpa2UgMCBhbmQgZmFsc2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgdGVzdCA9IHtmb286IGZhbHNlLCBiYXI6IHRydWUsIHplcm86IDB9O1xuICAgICAgaGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyh0ZXN0KTtcbiAgICAgIF8ua2V5cyh0ZXN0KS5sZW5ndGguc2hvdWxkLmVxdWFsKDMpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19