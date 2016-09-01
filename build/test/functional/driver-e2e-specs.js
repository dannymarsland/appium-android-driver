'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../..');

var _2 = _interopRequireDefault(_);

var _sampleApps = require('sample-apps');

var _sampleApps2 = _interopRequireDefault(_sampleApps);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  deviceName: 'Android',
  platformName: 'Android'
};

describe('createSession', function () {
  var _this = this;

  before(function () {
    driver = new _2['default']();
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should start android session focusing on default pkg and act', function callee$1$0() {
    var _ref, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 4:
          _ref = context$2$0.sent;
          appPackage = _ref.appPackage;
          appActivity = _ref.appActivity;

          appPackage.should.equal('io.appium.android.apis');
          appActivity.should.equal('.ApiDemos');

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should start android session focusing on custom pkg and act', function callee$1$0() {
    var caps, _ref2, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 7:
          _ref2 = context$2$0.sent;
          appPackage = _ref2.appPackage;
          appActivity = _ref2.appActivity;

          appPackage.should.equal(caps.appPackage);
          appActivity.should.equal(caps.appActivity);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out for not apk extention', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = 'foo';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/apk/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out if neither an app or a browser is defined', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/include/));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out for invalid app path', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = 'foo.apk';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/Could not find/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to start session without launching or installing app', function callee$1$0() {
    var caps, _ref3, appPackage, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          caps.autoLaunch = false;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 8:
          _ref3 = context$2$0.sent;
          appPackage = _ref3.appPackage;
          appActivity = _ref3.appActivity;

          appPackage.should.not.equal(caps.appPackage);
          appActivity.should.not.equal(caps.appActivity);

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to launch activity with custom intent parameter category', function callee$1$0() {
    var caps, _ref4, appActivity;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = 'io.appium.android.apis.app.HelloWorld';
          caps.intentCategory = 'appium.android.intent.category.SAMPLE_CODE';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 8:
          _ref4 = context$2$0.sent;
          appActivity = _ref4.appActivity;

          appActivity.should.include('HelloWorld');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to load an app via package', function callee$1$0() {
    var caps, _ref5, appPackage;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.ApiDemos';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 8:
          _ref5 = context$2$0.sent;
          appPackage = _ref5.appPackage;

          appPackage.should.include('io.appium.android.apis');

        case 11:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error out if package is not on the device', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.app = '';
          caps.appPackage = 'sipa.diordna.muippa.oi';
          caps.appActivity = '.ApiDemos';
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/Could not find/));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get updated capabilities', function callee$1$0() {
    var caps, serverCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.getSession());

        case 7:
          serverCaps = context$2$0.sent;

          serverCaps.takesScreenshot.should.exist;

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get device name and udid in session details', function callee$1$0() {
    var caps, session, serverCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appPackage = 'io.appium.android.apis';
          caps.appActivity = '.view.SplitTouchView';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 5:
          session = context$2$0.sent;

          session[1].deviceName.should.exist;
          session[1].deviceUDID.should.exist;

          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.getSession());

        case 10:
          serverCaps = context$2$0.sent;

          serverCaps.deviceName.should.exist;
          serverCaps.deviceUDID.should.exist;

        case 13:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

describe('close', function () {
  var _this2 = this;

  before(function () {
    driver = new _2['default']();
  });
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.deleteSession());

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
  it('should close application', function callee$1$0() {
    var _ref6, appPackage;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.closeApp());

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.adb.getFocusedPackageAndActivity());

        case 6:
          _ref6 = context$2$0.sent;
          appPackage = _ref6.appPackage;

          if (appPackage) {
            appPackage.should.not.equal("io.appium.android.apis");
          }

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9kcml2ZXItZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsT0FBTzs7OzswQkFDVixhQUFhOzs7O0FBRXBDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksV0FBVyxHQUFHO0FBQ2hCLEtBQUcsRUFBRSw2QkFBVyxnQkFBZ0IsQ0FBQztBQUNqQyxZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztDQUN4QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxlQUFlLEVBQUUsWUFBWTs7O0FBQ3BDLFFBQU0sQ0FBQyxZQUFNO0FBQ1gsVUFBTSxHQUFHLG1CQUFtQixDQUFDO0dBQzlCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsOERBQThELEVBQUU7Y0FFNUQsVUFBVSxFQUFFLFdBQVc7Ozs7OzsyQ0FEdEIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7Ozs7MkNBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRTs7OztBQUExRSxvQkFBVSxRQUFWLFVBQVU7QUFBRSxxQkFBVyxRQUFYLFdBQVc7O0FBQzVCLG9CQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ2xELHFCQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQzs7Ozs7OztHQUN2QyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNkRBQTZELEVBQUU7UUFDNUQsSUFBSSxTQUlILFVBQVUsRUFBRSxXQUFXOzs7OztBQUp4QixjQUFJLEdBQUcsZUFBYyxFQUFF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QUFLLENBQUM7Ozs7Ozs7R0FDcEMsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDOztBQUVILFFBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBWTs7O0FBQzVCLFFBQU0sQ0FBQyxZQUFNO0FBQ1gsVUFBTSxHQUFHLG1CQUFtQixDQUFDO0dBQzlCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMEJBQTBCLEVBQUU7ZUFHeEIsVUFBVTs7Ozs7OzJDQUZULE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7OzJDQUNqQyxNQUFNLENBQUMsUUFBUSxFQUFFOzs7OzJDQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUU7Ozs7QUFBN0Qsb0JBQVUsU0FBVixVQUFVOztBQUNmLGNBQUksVUFBVSxFQUFFO0FBQ2Qsc0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1dBQ3ZEOzs7Ozs7O0dBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9kcml2ZXItZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLic7XG5pbXBvcnQgc2FtcGxlQXBwcyBmcm9tICdzYW1wbGUtYXBwcyc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJ1xufTtcblxuZGVzY3JpYmUoJ2NyZWF0ZVNlc3Npb24nLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgfSk7XG4gIGFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc3RhcnQgYW5kcm9pZCBzZXNzaW9uIGZvY3VzaW5nIG9uIGRlZmF1bHQgcGtnIGFuZCBhY3QnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgYXBwUGFja2FnZS5zaG91bGQuZXF1YWwoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnKTtcbiAgICBhcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoJy5BcGlEZW1vcycpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzdGFydCBhbmRyb2lkIHNlc3Npb24gZm9jdXNpbmcgb24gY3VzdG9tIHBrZyBhbmQgYWN0JywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy52aWV3LlNwbGl0VG91Y2hWaWV3JztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IGRyaXZlci5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmVxdWFsKGNhcHMuYXBwUGFja2FnZSk7XG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLmVxdWFsKGNhcHMuYXBwQWN0aXZpdHkpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBlcnJvciBvdXQgZm9yIG5vdCBhcGsgZXh0ZW50aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwID0gJ2Zvbyc7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvYXBrLyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGVycm9yIG91dCBpZiBuZWl0aGVyIGFuIGFwcCBvciBhIGJyb3dzZXIgaXMgZGVmaW5lZCcsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcCA9ICcnO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvaW5jbHVkZS8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBlcnJvciBvdXQgZm9yIGludmFsaWQgYXBwIHBhdGgnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHAgPSAnZm9vLmFwayc7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvQ291bGQgbm90IGZpbmQvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzdGFydCBzZXNzaW9uIHdpdGhvdXQgbGF1bmNoaW5nIG9yIGluc3RhbGxpbmcgYXBwJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy52aWV3LlNwbGl0VG91Y2hWaWV3JztcbiAgICBjYXBzLmF1dG9MYXVuY2ggPSBmYWxzZTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICBsZXQge2FwcFBhY2thZ2UsIGFwcEFjdGl2aXR5fSA9IGF3YWl0IGRyaXZlci5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgIGFwcFBhY2thZ2Uuc2hvdWxkLm5vdC5lcXVhbChjYXBzLmFwcFBhY2thZ2UpO1xuICAgIGFwcEFjdGl2aXR5LnNob3VsZC5ub3QuZXF1YWwoY2Fwcy5hcHBBY3Rpdml0eSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gbGF1bmNoIGFjdGl2aXR5IHdpdGggY3VzdG9tIGludGVudCBwYXJhbWV0ZXIgY2F0ZWdvcnknLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcy5hcHAuSGVsbG9Xb3JsZCc7XG4gICAgY2Fwcy5pbnRlbnRDYXRlZ29yeSA9ICdhcHBpdW0uYW5kcm9pZC5pbnRlbnQuY2F0ZWdvcnkuU0FNUExFX0NPREUnO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgIGxldCB7YXBwQWN0aXZpdHl9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLmluY2x1ZGUoJ0hlbGxvV29ybGQnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBsb2FkIGFuIGFwcCB2aWEgcGFja2FnZScsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcCA9ICcnO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy5BcGlEZW1vcyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgbGV0IHthcHBQYWNrYWdlfSA9IGF3YWl0IGRyaXZlci5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgIGFwcFBhY2thZ2Uuc2hvdWxkLmluY2x1ZGUoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZXJyb3Igb3V0IGlmIHBhY2thZ2UgaXMgbm90IG9uIHRoZSBkZXZpY2UnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHAgPSAnJztcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnc2lwYS5kaW9yZG5hLm11aXBwYS5vaSc7XG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcuQXBpRGVtb3MnO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvQ291bGQgbm90IGZpbmQvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZ2V0IHVwZGF0ZWQgY2FwYWJpbGl0aWVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy52aWV3LlNwbGl0VG91Y2hWaWV3JztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICBsZXQgc2VydmVyQ2FwcyA9IGF3YWl0IGRyaXZlci5nZXRTZXNzaW9uKCk7XG4gICAgc2VydmVyQ2Fwcy50YWtlc1NjcmVlbnNob3Quc2hvdWxkLmV4aXN0O1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBnZXQgZGV2aWNlIG5hbWUgYW5kIHVkaWQgaW4gc2Vzc2lvbiBkZXRhaWxzJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy52aWV3LlNwbGl0VG91Y2hWaWV3JztcbiAgICBsZXQgc2Vzc2lvbiA9IGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgIHNlc3Npb25bMV0uZGV2aWNlTmFtZS5zaG91bGQuZXhpc3Q7XG4gICAgc2Vzc2lvblsxXS5kZXZpY2VVRElELnNob3VsZC5leGlzdDtcblxuICAgIGxldCBzZXJ2ZXJDYXBzID0gYXdhaXQgZHJpdmVyLmdldFNlc3Npb24oKTtcbiAgICBzZXJ2ZXJDYXBzLmRldmljZU5hbWUuc2hvdWxkLmV4aXN0O1xuICAgIHNlcnZlckNhcHMuZGV2aWNlVURJRC5zaG91bGQuZXhpc3Q7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlKCgpID0+IHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICB9KTtcbiAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBjbG9zZSBhcHBsaWNhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgYXdhaXQgZHJpdmVyLmNsb3NlQXBwKCk7XG4gICAgbGV0IHthcHBQYWNrYWdlfSA9IGF3YWl0IGRyaXZlci5hZGIuZ2V0Rm9jdXNlZFBhY2thZ2VBbmRBY3Rpdml0eSgpO1xuICAgIGlmIChhcHBQYWNrYWdlKSB7XG4gICAgICBhcHBQYWNrYWdlLnNob3VsZC5ub3QuZXF1YWwoXCJpby5hcHBpdW0uYW5kcm9pZC5hcGlzXCIpO1xuICAgIH1cbiAgfSk7XG59KTtcbiJdfQ==