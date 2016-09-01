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
    it('should throw error if remote file does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.adb.expects('fileExists').returns(false);
            mocks.helpers.expects('reinstallRemoteApk').never();
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].resetApp(adb, localApkPath, pkg, false).should.eventually.be.rejectedWith('slow'));

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
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].resetApp(adb, localApkPath, pkg, false));

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
    it('should throw error if remote file does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.adb.expects('uninstallApk').withExactArgs(pkg).returns('');
            // install remote is not defines do we mean installApkRemotely?
            mocks.adb.expects('installRemote').withExactArgs(remotePath).returns('');
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].reinstallRemoteApk(adb, localApkPath, pkg, remotePath));

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
    var localApkPath = 'local';
    var pkg = 'pkg';
    it('should reset app if already installed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.helpers.expects('getRemoteApkPath').returns(false);
            mocks.adb.expects('fileExists').returns(true);
            mocks.adb.expects('isAppInstalled').returns(true);
            mocks.helpers.expects('resetApp').once().returns("");
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, localApkPath, pkg, true));

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
            mocks.fs.expects('md5').withExactArgs(localApkPath).returns('apkmd5');
            mocks.helpers.expects('getRemoteApkPath').returns(true);
            mocks.adb.expects('fileExists').returns(true);
            mocks.adb.expects('isAppInstalled').returns(true);
            mocks.helpers.expects('resetApp').once().returns("");
            mocks.helpers.expects('reinstallRemoteApk').once().returns("");
            mocks.helpers.expects('removeTempApks').once().returns(true);
            mocks.adb.expects('mkdir').once().returns("");
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, localApkPath, pkg, true));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9hbmRyb2lkLWhlbHBlci1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7OztpQ0FDTCwyQkFBMkI7Ozs7eUJBQy9CLFlBQVk7Ozs7aUNBQ0YscUJBQXFCOzs0QkFDakIsY0FBYzs7SUFBaEMsWUFBWTs7NkJBQ0wsZ0JBQWdCOztnQ0FDSyxvQkFBb0I7OzRCQUN0QixlQUFlOztzQkFDdkMsUUFBUTs7OztBQUV0QixJQUFNLE1BQU0sR0FBRyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUM3QixJQUFNLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO0FBQzNDLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxZQUFNO0FBQ2hDLE1BQUksR0FBRyxHQUFHLDRCQUFTLENBQUM7O0FBRXBCLFVBQVEsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0FBQ2pDLE1BQUUsQ0FBQyxxQ0FBcUMsRUFBRSxZQUFNO0FBQzlDLHFDQUFRLGdCQUFnQix5RkFDZ0MsQ0FBQyxNQUFNLENBQzVELEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDekIsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHFEQUFxRCxFQUFFLFlBQU07QUFDOUQsWUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsK0JBQVEsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztLQUN2RCxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsaUNBQWlDLEVBQUUsWUFBWTtBQUNoRCxxQ0FBUSxnQkFBZ0IsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hFLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsZ0JBQWdCLEVBQUUsa0NB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QUMsK0JBQStCLEVBQUU7VUFDOUIsSUFBSTs7OztBQUFKLGdCQUFJLEdBQUcsRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUM7O0FBQ2pDLDJDQUFRLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLGdDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUNyQyxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsb0NBQW9DLEVBQUU7VUFDbkMsSUFBSTs7OztBQUFKLGdCQUFJLEdBQUcsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUM7O0FBQ3RDLDJDQUFRLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLGdDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztLQUNyQyxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMscURBQXFELEVBQUU7VUFDcEQsSUFBSTs7OztBQUFKLGdCQUFJLEdBQUcsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQzs7QUFDM0MsMkNBQVEsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsZ0NBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0tBQ3JDLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvYW5kcm9pZC1oZWxwZXItc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgaGVscGVycyBmcm9tICcuLi8uLi9saWIvYW5kcm9pZC1oZWxwZXJzJztcbmltcG9ydCBBREIgZnJvbSAnYXBwaXVtLWFkYic7XG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcbmltcG9ydCAqIGFzIHRlZW5fcHJvY2VzcyBmcm9tICd0ZWVuX3Byb2Nlc3MnO1xuaW1wb3J0IHsgZnMgfSBmcm9tICdhcHBpdW0tc3VwcG9ydCc7XG5pbXBvcnQgeyBwYXRoIGFzIHNldHRpbmdzQXBrUGF0aCB9IGZyb20gJ2lvLmFwcGl1bS5zZXR0aW5ncyc7XG5pbXBvcnQgeyBwYXRoIGFzIHVubG9ja0Fwa1BhdGggfSBmcm9tICdhcHBpdW0tdW5sb2NrJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cbmNvbnN0IHNob3VsZCA9IGNoYWkuc2hvdWxkKCk7XG5jb25zdCBSRU1PVEVfVEVNUF9QQVRIID0gXCIvZGF0YS9sb2NhbC90bXBcIjtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxuZGVzY3JpYmUoJ0FuZHJvaWQgSGVscGVycycsICgpID0+IHtcbiAgbGV0IGFkYiA9IG5ldyBBREIoKTtcblxuICBkZXNjcmliZSgncGFyc2VKYXZhVmVyc2lvbicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGNvcnJlY3RseSBwYXJzZSBqYXZhIHZlcnNpb24nLCAoKSA9PiB7XG4gICAgICBoZWxwZXJzLnBhcnNlSmF2YVZlcnNpb24oYGphdmEgdmVyc2lvbiBcIjEuOC4wXzQwXCJcbiAgICAgICAgSmF2YShUTSkgU0UgUnVudGltZSBFbnZpcm9ubWVudCAoYnVpbGQgMS44LjBfNDAtYjI3KWApLnNob3VsZFxuICAgICAgICAuYmUuZXF1YWwoXCIxLjguMF80MFwiKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGlmIGl0IGNhbm5vdCBwYXJzZSBqYXZhIHZlcnN0aW9uJywgKCkgPT4ge1xuICAgICAgc2hvdWxkLm5vdC5leGlzdChoZWxwZXJzLnBhcnNlSmF2YVZlcnNpb24oJ2ZvbyBiYXInKSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBwYXJzZSBPcGVuSkRLIHZlcnNpb25pbmcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBoZWxwZXJzLnBhcnNlSmF2YVZlcnNpb24oJ29wZW5qZGsgdmVyc2lvbiAxLjgnKS5zaG91bGQuYmUuZXF1YWwoJzEuOCcpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0SmF2YVZlcnNpb24nLCB3aXRoTW9ja3Moe3RlZW5fcHJvY2Vzc30sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgY29ycmVjdGx5IGdldCBqYXZhIHZlcnNpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cygnZXhlYycpLndpdGhFeGFjdEFyZ3MoJ2phdmEnLCBbJy12ZXJzaW9uJ10pXG4gICAgICAgIC5yZXR1cm5zKHtzdGRlcnI6ICdqYXZhIHZlcnNpb24gXCIxLjguMF80MFwiJ30pO1xuICAgICAgKGF3YWl0IGhlbHBlcnMuZ2V0SmF2YVZlcnNpb24oKSkuc2hvdWxkLmVxdWFsKCcxLjguMF80MCcpO1xuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIG51bGwgaWYgaXQgY2Fubm90IHBhcnNlIGphdmEgdmVyc3Rpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy50ZWVuX3Byb2Nlc3MuZXhwZWN0cygnZXhlYycpLndpdGhFeGFjdEFyZ3MoJ2phdmEnLCBbJy12ZXJzaW9uJ10pXG4gICAgICAgIC5yZXR1cm5zKHtzdGRlcnI6ICdmb28gYmFyJ30pO1xuICAgICAgYXdhaXQgaGVscGVycy5nZXRKYXZhVmVyc2lvbigpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgnSmF2YScpO1xuICAgICAgbW9ja3MudGVlbl9wcm9jZXNzLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdwcmVwYXJlRW11bGF0b3InLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGNvbnN0IG9wdHMgPSB7YXZkOiBcImZvb0BiYXJcIiwgYXZkQXJnczogXCJcIiwgbGFuZ3VhZ2U6IFwiZW5cIiwgbG9jYWxlOiBcInVzXCJ9O1xuICAgIGl0KCdzaG91bGQgbm90IGxhdW5jaCBhdmQgaWYgb25lIGlzIGFscmVhZHkgcnVubmluZycsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXRSdW5uaW5nQVZEJykud2l0aEV4YWN0QXJncygnZm9vYmFyJylcbiAgICAgICAgLnJldHVybnMoXCJmb29cIik7XG4gICAgICBhd2FpdCBoZWxwZXJzLnByZXBhcmVFbXVsYXRvcihhZGIsIG9wdHMpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbGF1bmNoIGF2ZCBpZiBvbmUgaXMgYWxyZWFkeSBydW5uaW5nJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldFJ1bm5pbmdBVkQnKS53aXRoRXhhY3RBcmdzKCdmb29iYXInKVxuICAgICAgICAucmV0dXJucyhudWxsKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdsYXVuY2hBVkQnKS53aXRoRXhhY3RBcmdzKCdmb29AYmFyJywgJycsICdlbicsICd1cycsXG4gICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkKVxuICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucHJlcGFyZUVtdWxhdG9yKGFkYiwgb3B0cyk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ2Vuc3VyZURldmljZUxvY2FsZScsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gaWYgbGFuZ3VhZ2UgYW5kIGNvdW50cnkgYXJlIG5vdCBwYXNzZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTGFuZ3VhZ2UnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUNvdW50cnknKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxvY2FsZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTGFuZ3VhZ2UnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUNvdW50cnknKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxvY2FsZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncmVib290JykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZW5zdXJlRGV2aWNlTG9jYWxlKGFkYik7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBub3Qgc2V0IGxhbmd1YWdlIGFuZCBjb3VudHJ5IGlmIGl0IGRvZXMgbm90IGNoYW5nZSB3aGVuIEFQSSA8IDIzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucyhcIjE4XCIpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxhbmd1YWdlJykucmV0dXJucygnZW4nKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VDb3VudHJ5JykucmV0dXJucygndXMnKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxhbmd1YWdlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VDb3VudHJ5JykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3JlYm9vdCcpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIsICdlbicsICd1cycpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgc2V0IGxhbmd1YWdlIGFuZCBjb3VudHJ5IGlmIHRoZXkgYXJlIGRpZmZlcmVudCB3aGVuIEFQSSA8IDIzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucyhcIjE4XCIpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxhbmd1YWdlJykucmV0dXJucygnZnInKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VDb3VudHJ5JykucmV0dXJucygnRlInKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxhbmd1YWdlJykud2l0aEV4YWN0QXJncygnZW4nKVxuICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VDb3VudHJ5Jykud2l0aEV4YWN0QXJncygndXMnKVxuICAgICAgICAucmV0dXJucyhcIlwiKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMb2NhbGUnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3JlYm9vdCcpLnJldHVybnMobnVsbCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIsICdlbicsICd1cycpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgbm90IHNldCBsb2NhbGUgaWYgaXQgZG9lcyBub3QgY2hhbmdlIHdoZW4gQVBJID0gMjMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0QXBpTGV2ZWwnKS5yZXR1cm5zKFwiMjNcIik7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZ2V0RGV2aWNlTGFuZ3VhZ2UnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUNvdW50cnknKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxvY2FsZScpLnJldHVybnMoJ2VuLVVTJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2V0RGV2aWNlTGFuZ3VhZ2UnKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUNvdW50cnknKS5uZXZlcigpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxvY2FsZScpLm5ldmVyKCk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncmVib290JykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZW5zdXJlRGV2aWNlTG9jYWxlKGFkYiwgJ2VuJywgJ3VzJyk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBzZXQgbG9jYWxlIGlmIGl0IGlzIGRpZmZlcmVudCB3aGVuIEFQSSA9IDIzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldEFwaUxldmVsJykucmV0dXJucyhcIjIzXCIpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2dldERldmljZUxhbmd1YWdlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VDb3VudHJ5JykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdnZXREZXZpY2VMb2NhbGUnKS5yZXR1cm5zKCdmci1GUicpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldERldmljZUxhbmd1YWdlJykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VDb3VudHJ5JykubmV2ZXIoKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzZXREZXZpY2VMb2NhbGUnKS53aXRoRXhhY3RBcmdzKCdlbi1VUycpXG4gICAgICAgIC5yZXR1cm5zKFwiXCIpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3JlYm9vdCcpLnJldHVybnMobnVsbCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIsICdlbicsICd1cycpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG5cbiAgZGVzY3JpYmUoJ2dldERldmljZUluZm9Gcm9tQ2FwcycsICgpID0+IHtcbiAgICAvLyBsaXN0IG9mIGRldmljZS9lbXUgdWRpZHMgdG8gdGhlaXIgb3MgdmVyc2lvbnNcbiAgICAvLyB1c2luZyBsaXN0IGluc3RlYWQgb2YgbWFwIHRvIHByZXNlcnZlIG9yZGVyXG4gICAgbGV0IGRldmljZXMgPSBbXG4gICAgICB7dWRpZDogJ2VtdWxhdG9yLTEyMzQnLCBvczogJzQuOS4yJ30sXG4gICAgICB7dWRpZDogJ3JvdGFsdW1lLTEzMzknLCBvczogJzUuMS41J30sXG4gICAgICB7dWRpZDogJ3JvdGFsdW1lLTEzMzgnLCBvczogJzUuMC4xJ30sXG4gICAgICB7dWRpZDogJ3JvdGFsdW1lLTEzMzcnLCBvczogJzUuMC4xJ30sXG4gICAgICB7dWRpZDogJ3JvYW11bGV0LTkwMDAnLCBvczogJzYuMCd9LFxuICAgICAge3VkaWQ6ICdyb2FtdWxldC0wJywgb3M6ICcyLjMnfSxcbiAgICAgIHt1ZGlkOiAnMDEyMzQ1Njc4OScsIG9zOiAnd2VsbGhlbGxvdGhlcmUnfVxuICAgIF07XG4gICAgbGV0IGN1ckRldmljZUlkID0gJyc7XG5cbiAgICBiZWZvcmUoKCkgPT4ge1xuICAgICAgc2lub24uc3R1YihBREIsICdjcmVhdGVBREInLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZ2V0RGV2aWNlc1dpdGhSZXRyeTogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIF8ubWFwKGRldmljZXMsIChkZXZpY2UpID0+IHsgcmV0dXJuIHt1ZGlkOiBkZXZpY2UudWRpZH07IH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZ2V0UG9ydEZyb21FbXVsYXRvclN0cmluZzogKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIDEyMzQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRSdW5uaW5nQVZEOiAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyd1ZGlkJzogJ2VtdWxhdG9yLTEyMzQnLCAncG9ydCc6IDEyMzR9O1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc2V0RGV2aWNlSWQ6ICh1ZGlkKSA9PiB7XG4gICAgICAgICAgICBjdXJEZXZpY2VJZCA9IHVkaWQ7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBnZXRQbGF0Zm9ybVZlcnNpb246ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfLmZpbHRlcihkZXZpY2VzLCB7dWRpZDogY3VyRGV2aWNlSWR9KVswXS5vcztcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN1ckRldmljZUlkOiAnZW11bGF0b3ItMTIzNCcsXG4gICAgICAgICAgZW11bGF0b3JQb3J0OiAxMjM0XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGFmdGVyKCgpID0+IHtcbiAgICAgIEFEQi5jcmVhdGVBREIucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciB3aGVuIHVkaWQgbm90IGluIGxpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY2FwcyA9IHtcbiAgICAgICAgdWRpZDogJ2Zvb211bGF0b3InXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyhjYXBzKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKCdmb29tdWxhdG9yJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgZGV2aWNlSWQgYW5kIGVtUG9ydCB3aGVuIHVkaWQgaXMgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjYXBzID0ge1xuICAgICAgICB1ZGlkOiAnZW11bGF0b3ItMTIzNCdcbiAgICAgIH07XG5cbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKGNhcHMpO1xuICAgICAgdWRpZC5zaG91bGQuZXF1YWwoJ2VtdWxhdG9yLTEyMzQnKTtcbiAgICAgIGVtUG9ydC5zaG91bGQuZXF1YWwoMTIzNCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgZmlyc3QgZGV2aWNlSWQgYW5kIGVtUG9ydCBpZiBhdmQsIHBsYXRmb3JtVmVyc2lvbiwgYW5kIHVkaWQgYXJlblxcJ3QgZ2l2ZW4nLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQge3VkaWQsIGVtUG9ydH0gPSBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcygpO1xuICAgICAgdWRpZC5zaG91bGQuZXF1YWwoJ2VtdWxhdG9yLTEyMzQnKTtcbiAgICAgIGVtUG9ydC5zaG91bGQuZXF1YWwoMTIzNCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgZGV2aWNlSWQgYW5kIGVtUG9ydCB3aGVuIGF2ZCBpcyBwcmVzZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNhcHMgPSB7XG4gICAgICAgIGF2ZDogJ0FWRF9OQU1FJ1xuICAgICAgfTtcbiAgICAgIGxldCB7dWRpZCwgZW1Qb3J0fSA9IGF3YWl0IGhlbHBlcnMuZ2V0RGV2aWNlSW5mb0Zyb21DYXBzKGNhcHMpO1xuICAgICAgdWRpZC5zaG91bGQuZXF1YWwoJ2VtdWxhdG9yLTEyMzQnKTtcbiAgICAgIGVtUG9ydC5zaG91bGQuZXF1YWwoMTIzNCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBmYWlsIGlmIHRoZSBnaXZlbiBwbGF0Zm9ybVZlcnNpb24gaXMgbm90IGZvdW5kJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGNhcHMgPSB7XG4gICAgICAgIHBsYXRmb3JtVmVyc2lvbjogJzEyMzQ1Njc4OTAnXG4gICAgICB9O1xuICAgICAgYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2FwcylcbiAgICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoJ1VuYWJsZSB0byBmaW5kIGFuIGFjdGl2ZSBkZXZpY2Ugb3IgZW11bGF0b3Igd2l0aCBPUyAxMjM0NTY3ODkwJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgZGV2aWNlSWQgYW5kIGVtUG9ydCBpZiBwbGF0Zm9ybVZlcnNpb24gaXMgZm91bmQgYW5kIHVuaXF1ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjYXBzID0ge1xuICAgICAgICBwbGF0Zm9ybVZlcnNpb246ICc2LjAnXG4gICAgICB9O1xuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcyk7XG4gICAgICB1ZGlkLnNob3VsZC5lcXVhbCgncm9hbXVsZXQtOTAwMCcpO1xuICAgICAgZW1Qb3J0LnNob3VsZC5lcXVhbCgxMjM0KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgZmlyc3QgZGV2aWNlSWQgYW5kIGVtUG9ydCBpZiBwbGF0Zm9ybVZlcnNpb24gaXMgZm91bmQgbXVsdGlwbGUgdGltZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgY2FwcyA9IHtcbiAgICAgICAgcGxhdGZvcm1WZXJzaW9uOiAnNS4wLjEnXG4gICAgICB9O1xuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcyk7XG4gICAgICB1ZGlkLnNob3VsZC5lcXVhbCgncm90YWx1bWUtMTMzOCcpO1xuICAgICAgZW1Qb3J0LnNob3VsZC5lcXVhbCgxMjM0KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCB0aGUgZmlyc3QgZGV2aWNlSWQgYW5kIGVtUG9ydCBpZiBwbGF0Zm9ybVZlcnNpb24gaXMgZm91bmQgbXVsdGlwbGUgdGltZXMgYW5kIGlzIGEgcGFydGlhbCBtYXRjaCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjYXBzID0ge1xuICAgICAgICBwbGF0Zm9ybVZlcnNpb246ICc1LjAnXG4gICAgICB9O1xuICAgICAgbGV0IHt1ZGlkLCBlbVBvcnR9ID0gYXdhaXQgaGVscGVycy5nZXREZXZpY2VJbmZvRnJvbUNhcHMoY2Fwcyk7XG4gICAgICB1ZGlkLnNob3VsZC5lcXVhbCgncm90YWx1bWUtMTMzOCcpO1xuICAgICAgZW1Qb3J0LnNob3VsZC5lcXVhbCgxMjM0KTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGdldCBkZXZpY2VJZCBhbmQgZW1Qb3J0IGJ5IHVkaWQgaWYgdWRpZCBhbmQgcGxhdGZvcm1WZXJzaW9uIGFyZSBnaXZlbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjYXBzID0ge1xuICAgICAgICB1ZGlkOiAnMDEyMzQ1Njc4OScsXG4gICAgICAgIHBsYXRmb3JtVmVyc2lvbjogJzIuMydcbiAgICAgIH07XG4gICAgICBsZXQge3VkaWQsIGVtUG9ydH0gPSBhd2FpdCBoZWxwZXJzLmdldERldmljZUluZm9Gcm9tQ2FwcyhjYXBzKTtcbiAgICAgIHVkaWQuc2hvdWxkLmVxdWFsKCcwMTIzNDU2Nzg5Jyk7XG4gICAgICBlbVBvcnQuc2hvdWxkLmVxdWFsKDEyMzQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0TGF1bmNoSW5mb0Zyb21NYW5pZmVzdCcsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gd2hlbiBubyBhcHAgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdwYWNrYWdlQW5kTGF1bmNoQWN0aXZpdHlGcm9tTWFuaWZlc3QnKS5uZXZlcigpO1xuICAgICAgYXdhaXQgaGVscGVycy5nZXRMYXVuY2hJbmZvKGFkYiwge30pO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHdoZW4gYXBwUGFja2FnZSAmIGFwcEFjdGl2aXR5IGFyZSBhbHJlYWR5IHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0JykubmV2ZXIoKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuZ2V0TGF1bmNoSW5mbyhhZGIsIHthcHA6IFwiZm9vXCIsIGFwcFBhY2thZ2U6IFwiYmFyXCIsXG4gICAgICAgIGFwcEFjdGl2aXR5OiBcImFjdFwifSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gcGFja2FnZSBhbmQgbGF1bmNoIGFjdGl2aXR5IGZyb20gbWFuaWZlc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygncGFja2FnZUFuZExhdW5jaEFjdGl2aXR5RnJvbU1hbmlmZXN0Jykud2l0aEV4YWN0QXJncygnZm9vJylcbiAgICAgICAgLnJldHVybnMoe2Fwa1BhY2thZ2U6ICdwa2cnLCBhcGtBY3Rpdml0eTogJ2Fjayd9KTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IHsgYXBwUGFja2FnZTogJ3BrZycsIGFwcFdhaXRQYWNrYWdlOiAncGtnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgYXBwQWN0aXZpdHk6ICdhY2snLCBhcHBXYWl0QWN0aXZpdHk6ICdhY2snIH07XG4gICAgICAoYXdhaXQgaGVscGVycy5nZXRMYXVuY2hJbmZvKGFkYiwge2FwcDogXCJmb29cIn0pKS5zaG91bGQuZGVlcFxuICAgICAgICAuZXF1YWwocmVzdWx0KTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgnZ2V0UmVtb3RlQXBrUGF0aCcsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiByZW1vdGUgcGF0aCcsICgpID0+IHtcbiAgICAgIGhlbHBlcnMuZ2V0UmVtb3RlQXBrUGF0aCgnZm9vJykuc2hvdWxkLmVxdWFsKGAke1JFTU9URV9URU1QX1BBVEh9L2Zvby5hcGtgKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdyZXNldEFwcCcsIHdpdGhNb2Nrcyh7YWRiLCBmcywgaGVscGVyc30sIChtb2NrcykgPT4ge1xuICAgIGNvbnN0IGxvY2FsQXBrUGF0aCA9ICdsb2NhbCc7XG4gICAgY29uc3QgcGtnID0gJ3BrZyc7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiByZW1vdGUgZmlsZSBkb2VzIG5vdCBleGlzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ21kNScpLndpdGhFeGFjdEFyZ3MobG9jYWxBcGtQYXRoKS5yZXR1cm5zKCdhcGttZDUnKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlRXhpc3RzJykucmV0dXJucyhmYWxzZSk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3JlaW5zdGFsbFJlbW90ZUFwaycpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLnJlc2V0QXBwKGFkYiwgbG9jYWxBcGtQYXRoLCBwa2csIGZhbHNlKS5zaG91bGQuZXZlbnR1YWxseVxuICAgICAgICAuYmUucmVqZWN0ZWRXaXRoKCdzbG93Jyk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiByZW1vdGUgZmlsZSBkb2VzIG5vdCBleGlzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmZzLmV4cGVjdHMoJ21kNScpLndpdGhFeGFjdEFyZ3MobG9jYWxBcGtQYXRoKS5yZXR1cm5zKCdhcGttZDUnKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlRXhpc3RzJykucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cygncmVpbnN0YWxsUmVtb3RlQXBrJykub25jZSgpLnJldHVybnMoJycpO1xuICAgICAgYXdhaXQgaGVscGVycy5yZXNldEFwcChhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCBmYWxzZSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgICBtb2Nrcy5mcy52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcblxuICBkZXNjcmliZS5za2lwKCdyZWluc3RhbGxSZW1vdGVBcGsnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGNvbnN0IGxvY2FsQXBrUGF0aCA9ICdsb2NhbCc7XG4gICAgY29uc3QgcGtnID0gJ3BrZyc7XG4gICAgY29uc3QgcmVtb3RlUGF0aCA9ICdyZW1vdGUnO1xuICAgIGl0KCdzaG91bGQgdGhyb3cgZXJyb3IgaWYgcmVtb3RlIGZpbGUgZG9lcyBub3QgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygndW5pbnN0YWxsQXBrJykud2l0aEV4YWN0QXJncyhwa2cpLnJldHVybnMoJycpO1xuICAgICAgLy8gaW5zdGFsbCByZW1vdGUgaXMgbm90IGRlZmluZXMgZG8gd2UgbWVhbiBpbnN0YWxsQXBrUmVtb3RlbHk/XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaW5zdGFsbFJlbW90ZScpLndpdGhFeGFjdEFyZ3MocmVtb3RlUGF0aClcbiAgICAgICAgLnJldHVybnMoJycpO1xuICAgICAgYXdhaXQgaGVscGVycy5yZWluc3RhbGxSZW1vdGVBcGsoYWRiLCBsb2NhbEFwa1BhdGgsIHBrZywgcmVtb3RlUGF0aCk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ2luc3RhbGxBcGtSZW1vdGVseScsIHdpdGhNb2Nrcyh7YWRiLCBmcywgaGVscGVyc30sIChtb2NrcykgPT4ge1xuICAgIGNvbnN0IGxvY2FsQXBrUGF0aCA9ICdsb2NhbCc7XG4gICAgY29uc3QgcGtnID0gJ3BrZyc7XG4gICAgaXQoJ3Nob3VsZCByZXNldCBhcHAgaWYgYWxyZWFkeSBpbnN0YWxsZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5mcy5leHBlY3RzKCdtZDUnKS53aXRoRXhhY3RBcmdzKGxvY2FsQXBrUGF0aCkucmV0dXJucygnYXBrbWQ1Jyk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ2dldFJlbW90ZUFwa1BhdGgnKS5yZXR1cm5zKGZhbHNlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlRXhpc3RzJykucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc0FwcEluc3RhbGxlZCcpLnJldHVybnModHJ1ZSk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3Jlc2V0QXBwJykub25jZSgpLnJldHVybnMoXCJcIik7XG4gICAgICBhd2FpdCBoZWxwZXJzLmluc3RhbGxBcGtSZW1vdGVseShhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCB0cnVlKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmZzLnZlcmlmeSgpO1xuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdC5za2lwKCdzaG91bGQgcHVzaCBhbmQgcmVpbnN0YWxsIGFwayB3aGVuIGFwayBpcyBub3QgaW5zdGFsbGVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuZnMuZXhwZWN0cygnbWQ1Jykud2l0aEV4YWN0QXJncyhsb2NhbEFwa1BhdGgpLnJldHVybnMoJ2Fwa21kNScpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdnZXRSZW1vdGVBcGtQYXRoJykucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdmaWxlRXhpc3RzJykucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc0FwcEluc3RhbGxlZCcpLnJldHVybnModHJ1ZSk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3Jlc2V0QXBwJykub25jZSgpLnJldHVybnMoXCJcIik7XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoJ3JlaW5zdGFsbFJlbW90ZUFwaycpLm9uY2UoKS5yZXR1cm5zKFwiXCIpO1xuICAgICAgbW9ja3MuaGVscGVycy5leHBlY3RzKCdyZW1vdmVUZW1wQXBrcycpLm9uY2UoKS5yZXR1cm5zKHRydWUpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ21rZGlyJykub25jZSgpLnJldHVybnMoXCJcIik7XG4gICAgICBhd2FpdCBoZWxwZXJzLmluc3RhbGxBcGtSZW1vdGVseShhZGIsIGxvY2FsQXBrUGF0aCwgcGtnLCB0cnVlKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICAgIG1vY2tzLmZzLnZlcmlmeSgpO1xuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgncmVtb3ZlUmVtb3RlQXBrcycsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gd2hlbiBubyBhcGtzIHByZXNlbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnbHMnKS5yZXR1cm5zKFtdKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm5ldmVyKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLnJlbW92ZVJlbW90ZUFwa3MoYWRiKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB3aGVuIG9ubHkgZXhjZXB0TWQ1cyBhcmUgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdscycpLnJldHVybnMoWydmb28nXSk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc2hlbGwnKS5uZXZlcigpO1xuICAgICAgYXdhaXQgaGVscGVycy5yZW1vdmVSZW1vdGVBcGtzKGFkYiwgWydmb28nXSk7XG4gICAgICBtb2Nrcy5hZGIudmVyaWZ5KCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgYWxsIHJlbW90ZSBhcGtzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2xzJykucmV0dXJucyhbJ2ZvbyddKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzaGVsbCcpLm9uY2UoKS5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucmVtb3ZlUmVtb3RlQXBrcyhhZGIsIFsnYmFyJ10pO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdpbml0VW5pY29kZUtleWJvYXJkJywgd2l0aE1vY2tzKHthZGJ9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIGluc3RhbGwgYW5kIGVuYWJsZSB1bmljb2RlSU1FJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2luc3RhbGwnKS5vbmNlKCkucmV0dXJucygnJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZGVmYXVsdElNRScpLm9uY2UoKS5yZXR1cm5zKCdkZWZhdWx0SU1FJyk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnZW5hYmxlSU1FJykub25jZSgpLnJldHVybnMoJycpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ3NldElNRScpLm9uY2UoKS5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMuaW5pdFVuaWNvZGVLZXlib2FyZChhZGIpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdwdXNoU2V0dGluZ3NBcHAnLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgaW5zdGFsbCBzZXR0aW5nc0FwcCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbnN0YWxsJykud2l0aEV4YWN0QXJncyhzZXR0aW5nc0Fwa1BhdGgsIGZhbHNlKS5vbmNlKClcbiAgICAgICAgLnJldHVybnMoJycpO1xuICAgICAgYXdhaXQgaGVscGVycy5wdXNoU2V0dGluZ3NBcHAoYWRiKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgfSkpO1xuICBkZXNjcmliZSgncHVzaFVubG9jaycsIHdpdGhNb2Nrcyh7YWRifSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBpbnN0YWxsIHVubG9ja0FwcCcsIGFzeW5jICgpID0+IHtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpbnN0YWxsJykud2l0aEV4YWN0QXJncyh1bmxvY2tBcGtQYXRoLCBmYWxzZSkub25jZSgpXG4gICAgICAgIC5yZXR1cm5zKCcnKTtcbiAgICAgIGF3YWl0IGhlbHBlcnMucHVzaFVubG9jayhhZGIpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCd1bmxvY2snLCB3aXRoTW9ja3Moe2FkYn0sIChtb2NrcykgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGlmIHNjcmVlbiBpcyBhbHJlYWR5IHVubG9ja2VkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2lzU2NyZWVuTG9ja2VkJykud2l0aEV4YWN0QXJncygpLm9uY2UoKVxuICAgICAgICAucmV0dXJucyhmYWxzZSk7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnc3RhcnRBcHAnKS5uZXZlcigpO1xuICAgICAgYXdhaXQgaGVscGVycy51bmxvY2soYWRiKTtcbiAgICAgIG1vY2tzLmFkYi52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHN0YXJ0IHVubG9jayBhcHAnLCBhc3luYyAoKSA9PiB7XG4gICAgICBtb2Nrcy5hZGIuZXhwZWN0cygnaXNTY3JlZW5Mb2NrZWQnKS5vbkNhbGwoMCkucmV0dXJucyh0cnVlKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdpc1NjcmVlbkxvY2tlZCcpLnJldHVybnMoZmFsc2UpO1xuICAgICAgbW9ja3MuYWRiLmV4cGVjdHMoJ2ZvcmNlU3RvcCcpLm9uY2UoKS5yZXR1cm5zKCcnKTtcbiAgICAgIG1vY2tzLmFkYi5leHBlY3RzKCdzdGFydEFwcCcpLnR3aWNlKCkucmV0dXJucygnJyk7XG4gICAgICBhd2FpdCBoZWxwZXJzLnVubG9jayhhZGIpO1xuICAgICAgbW9ja3MuYWRiLnZlcmlmeSgpO1xuICAgIH0pO1xuICB9KSk7XG4gIGRlc2NyaWJlKCdyZW1vdmVOdWxsUHJvcGVydGllcycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIGlnbm9yZSBudWxsIHByb3BlcnRpZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgdGVzdCA9IHtmb286IG51bGwsIGJhcjogdHJ1ZX07XG4gICAgICBoZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzKHRlc3QpO1xuICAgICAgXy5rZXlzKHRlc3QpLmxlbmd0aC5zaG91bGQuZXF1YWwoMSk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBpZ25vcmUgdW5kZWZpbmVkIHByb3BlcnRpZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgdGVzdCA9IHtmb286IHVuZGVmaW5lZCwgYmFyOiB0cnVlfTtcbiAgICAgIGhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXModGVzdCk7XG4gICAgICBfLmtleXModGVzdCkubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIG5vdCBpZ25vcmUgZmFsc3kgcHJvcGVydGllcyBsaWtlIDAgYW5kIGZhbHNlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHRlc3QgPSB7Zm9vOiBmYWxzZSwgYmFyOiB0cnVlLCB6ZXJvOiAwfTtcbiAgICAgIGhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXModGVzdCk7XG4gICAgICBfLmtleXModGVzdCkubGVuZ3RoLnNob3VsZC5lcXVhbCgzKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==