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
  platformName: 'Android',
  androidInstallTimeout: '90000'
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
  it('should error out for activity that fails to load after app wait activity timeout', function callee$1$0() {
    var caps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          caps = _Object$assign({}, defaultCaps);

          caps.appWaitActivity = 'non.existent.activity';
          caps.appWaitDuration = 1000; // 1 second
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.createSession(caps).should.eventually.be.rejectedWith(/never started/));

        case 5:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9kcml2ZXItZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsT0FBTzs7OzswQkFDVixhQUFhOzs7O0FBRXBDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksV0FBVyxHQUFHO0FBQ2hCLEtBQUcsRUFBRSw2QkFBVyxnQkFBZ0IsQ0FBQztBQUNqQyxZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztBQUN2Qix1QkFBcUIsRUFBRSxPQUFPO0NBQy9CLENBQUM7O0FBRUYsUUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZOzs7QUFDcEMsUUFBTSxDQUFDLFlBQU07QUFDWCxVQUFNLEdBQUcsbUJBQW1CLENBQUM7R0FDOUIsQ0FBQyxDQUFDO0FBQ0gsV0FBUyxDQUFDOzs7OzsyQ0FDRixNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw4REFBOEQsRUFBRTtjQUU1RCxVQUFVLEVBQUUsV0FBVzs7Ozs7OzJDQUR0QixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs7OzsyQ0FDRCxNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFOzs7O0FBQTFFLG9CQUFVLFFBQVYsVUFBVTtBQUFFLHFCQUFXLFFBQVgsV0FBVzs7QUFDNUIsb0JBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDbEQscUJBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Ozs7O0dBQ3ZDLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyw2REFBNkQsRUFBRTtRQUM1RCxJQUFJLFNBSUgsVUFBVSxFQUFFLFdBQVc7Ozs7O0FB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QyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUNwQyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsa0ZBQWtGLEVBQUU7UUFDakYsSUFBSTs7OztBQUFKLGNBQUksR0FBRyxlQUFjLEVBQUUsRUFBRSxXQUFXLENBQUM7O0FBQ3pDLGNBQUksQ0FBQyxlQUFlLEdBQUcsdUJBQXVCLENBQUM7QUFDL0MsY0FBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7OzJDQUN0QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7Ozs7Ozs7R0FDcEYsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDOztBQUVILFFBQVEsQ0FBQyxPQUFPLEVBQUUsWUFBWTs7O0FBQzVCLFFBQU0sQ0FBQyxZQUFNO0FBQ1gsVUFBTSxHQUFHLG1CQUFtQixDQUFDO0dBQzlCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMEJBQTBCLEVBQUU7ZUFHeEIsVUFBVTs7Ozs7OzJDQUZULE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7OzJDQUNqQyxNQUFNLENBQUMsUUFBUSxFQUFFOzs7OzJDQUNFLE1BQU0sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUU7Ozs7QUFBN0Qsb0JBQVUsU0FBVixVQUFVOztBQUNmLGNBQUksVUFBVSxFQUFFO0FBQ2Qsc0JBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1dBQ3ZEOzs7Ozs7O0dBQ0YsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9kcml2ZXItZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLic7XG5pbXBvcnQgc2FtcGxlQXBwcyBmcm9tICdzYW1wbGUtYXBwcyc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJyxcbiAgYW5kcm9pZEluc3RhbGxUaW1lb3V0OiAnOTAwMDAnXG59O1xuXG5kZXNjcmliZSgnY3JlYXRlU2Vzc2lvbicsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlKCgpID0+IHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICB9KTtcbiAgYWZ0ZXJFYWNoKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzdGFydCBhbmRyb2lkIHNlc3Npb24gZm9jdXNpbmcgb24gZGVmYXVsdCBwa2cgYW5kIGFjdCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgbGV0IHthcHBQYWNrYWdlLCBhcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICBhcHBQYWNrYWdlLnNob3VsZC5lcXVhbCgnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycpO1xuICAgIGFwcEFjdGl2aXR5LnNob3VsZC5lcXVhbCgnLkFwaURlbW9zJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHN0YXJ0IGFuZHJvaWQgc2Vzc2lvbiBmb2N1c2luZyBvbiBjdXN0b20gcGtnIGFuZCBhY3QnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgYXBwUGFja2FnZS5zaG91bGQuZXF1YWwoY2Fwcy5hcHBQYWNrYWdlKTtcbiAgICBhcHBBY3Rpdml0eS5zaG91bGQuZXF1YWwoY2Fwcy5hcHBBY3Rpdml0eSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGVycm9yIG91dCBmb3Igbm90IGFwayBleHRlbnRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHAgPSAnZm9vJztcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9hcGsvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZXJyb3Igb3V0IGlmIG5laXRoZXIgYW4gYXBwIG9yIGEgYnJvd3NlciBpcyBkZWZpbmVkJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwID0gJyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9pbmNsdWRlLyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGVycm9yIG91dCBmb3IgaW52YWxpZCBhcHAgcGF0aCcsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcCA9ICdmb28uYXBrJztcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICcudmlldy5TcGxpdFRvdWNoVmlldyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9Db3VsZCBub3QgZmluZC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHN0YXJ0IHNlc3Npb24gd2l0aG91dCBsYXVuY2hpbmcgb3IgaW5zdGFsbGluZyBhcHAnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuICAgIGNhcHMuYXV0b0xhdW5jaCA9IGZhbHNlO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgIGxldCB7YXBwUGFja2FnZSwgYXBwQWN0aXZpdHl9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgYXBwUGFja2FnZS5zaG91bGQubm90LmVxdWFsKGNhcHMuYXBwUGFja2FnZSk7XG4gICAgYXBwQWN0aXZpdHkuc2hvdWxkLm5vdC5lcXVhbChjYXBzLmFwcEFjdGl2aXR5KTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBsYXVuY2ggYWN0aXZpdHkgd2l0aCBjdXN0b20gaW50ZW50IHBhcmFtZXRlciBjYXRlZ29yeScsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcFBhY2thZ2UgPSAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcyc7XG4gICAgY2Fwcy5hcHBBY3Rpdml0eSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzLmFwcC5IZWxsb1dvcmxkJztcbiAgICBjYXBzLmludGVudENhdGVnb3J5ID0gJ2FwcGl1bS5hbmRyb2lkLmludGVudC5jYXRlZ29yeS5TQU1QTEVfQ09ERSc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgbGV0IHthcHBBY3Rpdml0eX0gPSBhd2FpdCBkcml2ZXIuYWRiLmdldEZvY3VzZWRQYWNrYWdlQW5kQWN0aXZpdHkoKTtcbiAgICBhcHBBY3Rpdml0eS5zaG91bGQuaW5jbHVkZSgnSGVsbG9Xb3JsZCcpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGxvYWQgYW4gYXBwIHZpYSBwYWNrYWdlJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjYXBzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdENhcHMpO1xuICAgIGNhcHMuYXBwID0gJyc7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLkFwaURlbW9zJztcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgICBsZXQge2FwcFBhY2thZ2V9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgYXBwUGFja2FnZS5zaG91bGQuaW5jbHVkZSgnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBlcnJvciBvdXQgaWYgcGFja2FnZSBpcyBub3Qgb24gdGhlIGRldmljZScsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcCA9ICcnO1xuICAgIGNhcHMuYXBwUGFja2FnZSA9ICdzaXBhLmRpb3JkbmEubXVpcHBhLm9pJztcbiAgICBjYXBzLmFwcEFjdGl2aXR5ID0gJy5BcGlEZW1vcyc7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9Db3VsZCBub3QgZmluZC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBnZXQgdXBkYXRlZCBjYXBhYmlsaXRpZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgIGxldCBzZXJ2ZXJDYXBzID0gYXdhaXQgZHJpdmVyLmdldFNlc3Npb24oKTtcbiAgICBzZXJ2ZXJDYXBzLnRha2VzU2NyZWVuc2hvdC5zaG91bGQuZXhpc3Q7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGdldCBkZXZpY2UgbmFtZSBhbmQgdWRpZCBpbiBzZXNzaW9uIGRldGFpbHMnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNhcHMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0Q2Fwcyk7XG4gICAgY2Fwcy5hcHBQYWNrYWdlID0gJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnO1xuICAgIGNhcHMuYXBwQWN0aXZpdHkgPSAnLnZpZXcuU3BsaXRUb3VjaFZpZXcnO1xuICAgIGxldCBzZXNzaW9uID0gYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oY2Fwcyk7XG4gICAgc2Vzc2lvblsxXS5kZXZpY2VOYW1lLnNob3VsZC5leGlzdDtcbiAgICBzZXNzaW9uWzFdLmRldmljZVVESUQuc2hvdWxkLmV4aXN0O1xuXG4gICAgbGV0IHNlcnZlckNhcHMgPSBhd2FpdCBkcml2ZXIuZ2V0U2Vzc2lvbigpO1xuICAgIHNlcnZlckNhcHMuZGV2aWNlTmFtZS5zaG91bGQuZXhpc3Q7XG4gICAgc2VydmVyQ2Fwcy5kZXZpY2VVRElELnNob3VsZC5leGlzdDtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZXJyb3Igb3V0IGZvciBhY3Rpdml0eSB0aGF0IGZhaWxzIHRvIGxvYWQgYWZ0ZXIgYXBwIHdhaXQgYWN0aXZpdHkgdGltZW91dCcsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgY2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzKTtcbiAgICBjYXBzLmFwcFdhaXRBY3Rpdml0eSA9ICdub24uZXhpc3RlbnQuYWN0aXZpdHknO1xuICAgIGNhcHMuYXBwV2FpdER1cmF0aW9uID0gMTAwMDsgLy8gMSBzZWNvbmRcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL25ldmVyIHN0YXJ0ZWQvKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gIH0pO1xuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGNsb3NlIGFwcGxpY2F0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgICBhd2FpdCBkcml2ZXIuY2xvc2VBcHAoKTtcbiAgICBsZXQge2FwcFBhY2thZ2V9ID0gYXdhaXQgZHJpdmVyLmFkYi5nZXRGb2N1c2VkUGFja2FnZUFuZEFjdGl2aXR5KCk7XG4gICAgaWYgKGFwcFBhY2thZ2UpIHtcbiAgICAgIGFwcFBhY2thZ2Uuc2hvdWxkLm5vdC5lcXVhbChcImlvLmFwcGl1bS5hbmRyb2lkLmFwaXNcIik7XG4gICAgfVxuICB9KTtcbn0pO1xuIl19