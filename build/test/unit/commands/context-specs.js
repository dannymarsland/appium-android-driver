'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _libWebviewHelpers = require('../../../lib/webview-helpers');

var _libWebviewHelpers2 = _interopRequireDefault(_libWebviewHelpers);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var driver = undefined;
var sandbox = _sinon2['default'].sandbox.create();
var expect = _chai2['default'].expect;
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('Context', function () {
  describe('getContexts', function () {
    after(function () {
      sandbox.restore();
    });
    it('should get Chromium context where appropriate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']({ browserName: 'Chrome' });
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.getContexts());

          case 3:
            context$3$0.t0 = context$3$0.sent;
            expect(context$3$0.t0).to.include('CHROMIUM');

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should use ADB to figure out which webviews are available', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(_libWebviewHelpers2['default'], 'getWebviews');
            driver = new _2['default']();
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getContexts());

          case 4:
            context$3$0.t0 = context$3$0.sent;
            expect(context$3$0.t0).to.not.include('CHROMIUM');

            _libWebviewHelpers2['default'].getWebviews.calledOnce.should.be['true'];

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('setContext', function () {
    beforeEach(function () {
      driver = new _2['default']();
      sandbox.stub(driver, 'getContexts', function () {
        return ['CHROMIUM', 'ANOTHER'];
      });
    });
    afterEach(function () {
      sandbox.restore();
    });
    it('should proxy commands directly to chromedriver', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'startChromedriverProxy');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.setContext('CHROMIUM'));

          case 3:
            driver.startChromedriverProxy.calledOnce.should.be['true'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should kill existing chromedrivers', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'stopChromedriverProxies');
            driver.opts.recreateChromeDriverSessions = true;
            driver.curContext = 'CHROMIUM';
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.setContext('ANOTHER'));

          case 5:
            driver.stopChromedriverProxies.calledOnce.should.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should suspend Chromedriver proxy', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'suspendChromedriverProxy');
            driver.curContext = 'CHROMIUM';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setContext('ANOTHER'));

          case 4:
            driver.suspendChromedriverProxy.calledOnce.should.be['true'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error for unkown contexts', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            sandbox.stub(driver, 'suspendChromedriverProxy');
            driver.curContext = 'FOO';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.setContext('ANOTHER').should.eventually.be.rejectedWith(/switching to context/));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('startChromedriverProxy', function () {
    it('should throw an error if a chromedriver instance is already running', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.chromedriver = 'CHROMIUM';
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.startChromedriverProxy('CHROMIUM').should.eventually.be.rejectedWith(/instance running/));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9jb250ZXh0LXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztxQkFDM0IsT0FBTzs7OztpQ0FDRSw4QkFBOEI7Ozs7Z0JBQy9CLFVBQVU7Ozs7QUFFcEMsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksT0FBTyxHQUFHLG1CQUFNLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxJQUFJLE1BQU0sR0FBRyxrQkFBSyxNQUFNLENBQUM7QUFDekIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQU07QUFDeEIsVUFBUSxDQUFDLGFBQWEsRUFBRSxZQUFNO0FBQzVCLFNBQUssQ0FBQyxZQUFNO0FBQ1YsYUFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ25CLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywrQ0FBK0MsRUFBRTs7OztBQUNsRCxrQkFBTSxHQUFHLGtCQUFrQixFQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDOzs2Q0FDdkMsTUFBTSxDQUFDLFdBQVcsRUFBRTs7OztBQUFqQyxrQkFBTSxpQkFBNkIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVOzs7Ozs7O0tBQ3pELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywyREFBMkQsRUFBRTs7OztBQUM5RCxtQkFBTyxDQUFDLElBQUksaUNBQWlCLGFBQWEsQ0FBQyxDQUFDO0FBQzVDLGtCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzZDQUNoQixNQUFNLENBQUMsV0FBVyxFQUFFOzs7O0FBQWpDLGtCQUFNLGlCQUE2QixFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVOztBQUM1RCwyQ0FBZSxXQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQUssQ0FBQzs7Ozs7OztLQUN0RCxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsWUFBWSxFQUFFLFlBQU07QUFDM0IsY0FBVSxDQUFDLFlBQU07QUFDZixZQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDN0IsYUFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLFlBQVU7QUFBRSxlQUFPLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO09BQUUsQ0FBQyxDQUFDO0tBQ3BGLENBQUMsQ0FBQztBQUNILGFBQVMsQ0FBQyxZQUFNO0FBQ2QsYUFBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ25CLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxnREFBZ0QsRUFBRTs7OztBQUNuRCxtQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLENBQUMsQ0FBQzs7NkNBQ3pDLE1BQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDOzs7QUFDbkMsa0JBQU0sQ0FBQyxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDOzs7Ozs7O0tBQ3pELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyxvQ0FBb0MsRUFBRTs7OztBQUN2QyxtQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUseUJBQXlCLENBQUMsQ0FBQztBQUNoRCxrQkFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUM7QUFDaEQsa0JBQU0sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDOzs2Q0FDekIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7OztBQUNsQyxrQkFBTSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFLLENBQUM7Ozs7Ozs7S0FDMUQsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG1DQUFtQyxFQUFFOzs7O0FBQ3RDLG1CQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0FBQ2pELGtCQUFNLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7NkNBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDOzs7QUFDbEMsa0JBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBSyxDQUFDOzs7Ozs7O0tBQzNELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQywyQ0FBMkMsRUFBRTs7OztBQUM5QyxtQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztBQUNqRCxrQkFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7OzZDQUNwQixNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQzs7Ozs7OztLQUM3RixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsd0JBQXdCLEVBQUUsWUFBTTtBQUN2QyxNQUFFLENBQUMscUVBQXFFLEVBQUU7Ozs7QUFDeEUsa0JBQU0sR0FBRyxtQkFBbUIsQ0FBQztBQUM3QixrQkFBTSxDQUFDLFlBQVksR0FBRyxVQUFVLENBQUM7OzZDQUMzQixNQUFNLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGtCQUFrQixDQUFDOzs7Ozs7O0tBQ3RHLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvY29tbWFuZHMvY29udGV4dC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCB3ZWJ2aWV3SGVscGVycyBmcm9tICcuLi8uLi8uLi9saWIvd2Vidmlldy1oZWxwZXJzJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcblxubGV0IGRyaXZlcjtcbmxldCBzYW5kYm94ID0gc2lub24uc2FuZGJveC5jcmVhdGUoKTtcbmxldCBleHBlY3QgPSBjaGFpLmV4cGVjdDtcbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdDb250ZXh0JywgKCkgPT4ge1xuICBkZXNjcmliZSgnZ2V0Q29udGV4dHMnLCAoKSA9PiB7XG4gICAgYWZ0ZXIoKCkgPT4ge1xuICAgICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBnZXQgQ2hyb21pdW0gY29udGV4dCB3aGVyZSBhcHByb3ByaWF0ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKHticm93c2VyTmFtZTogJ0Nocm9tZSd9KTtcbiAgICAgIGV4cGVjdChhd2FpdCBkcml2ZXIuZ2V0Q29udGV4dHMoKSkudG8uaW5jbHVkZSgnQ0hST01JVU0nKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHVzZSBBREIgdG8gZmlndXJlIG91dCB3aGljaCB3ZWJ2aWV3cyBhcmUgYXZhaWxhYmxlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKHdlYnZpZXdIZWxwZXJzLCAnZ2V0V2Vidmlld3MnKTtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBleHBlY3QoYXdhaXQgZHJpdmVyLmdldENvbnRleHRzKCkpLnRvLm5vdC5pbmNsdWRlKCdDSFJPTUlVTScpO1xuICAgICAgd2Vidmlld0hlbHBlcnMuZ2V0V2Vidmlld3MuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZXRDb250ZXh0JywgKCkgPT4ge1xuICAgIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdnZXRDb250ZXh0cycsIGZ1bmN0aW9uKCl7IHJldHVybiBbJ0NIUk9NSVVNJywgJ0FOT1RIRVInXTsgfSk7XG4gICAgfSk7XG4gICAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICAgIHNhbmRib3gucmVzdG9yZSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcHJveHkgY29tbWFuZHMgZGlyZWN0bHkgdG8gY2hyb21lZHJpdmVyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3N0YXJ0Q2hyb21lZHJpdmVyUHJveHknKTtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRDb250ZXh0KCdDSFJPTUlVTScpO1xuICAgICAgZHJpdmVyLnN0YXJ0Q2hyb21lZHJpdmVyUHJveHkuY2FsbGVkT25jZS5zaG91bGQuYmUudHJ1ZTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGtpbGwgZXhpc3RpbmcgY2hyb21lZHJpdmVycycsIGFzeW5jICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzdG9wQ2hyb21lZHJpdmVyUHJveGllcycpO1xuICAgICAgZHJpdmVyLm9wdHMucmVjcmVhdGVDaHJvbWVEcml2ZXJTZXNzaW9ucyA9IHRydWU7XG4gICAgICBkcml2ZXIuY3VyQ29udGV4dCA9ICdDSFJPTUlVTSc7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0Q29udGV4dCgnQU5PVEhFUicpO1xuICAgICAgZHJpdmVyLnN0b3BDaHJvbWVkcml2ZXJQcm94aWVzLmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBzdXNwZW5kIENocm9tZWRyaXZlciBwcm94eScsIGFzeW5jICgpID0+IHtcbiAgICAgIHNhbmRib3guc3R1Yihkcml2ZXIsICdzdXNwZW5kQ2hyb21lZHJpdmVyUHJveHknKTtcbiAgICAgIGRyaXZlci5jdXJDb250ZXh0ID0gJ0NIUk9NSVVNJztcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRDb250ZXh0KCdBTk9USEVSJyk7XG4gICAgICBkcml2ZXIuc3VzcGVuZENocm9tZWRyaXZlclByb3h5LmNhbGxlZE9uY2Uuc2hvdWxkLmJlLnRydWU7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBmb3IgdW5rb3duIGNvbnRleHRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgc2FuZGJveC5zdHViKGRyaXZlciwgJ3N1c3BlbmRDaHJvbWVkcml2ZXJQcm94eScpO1xuICAgICAgZHJpdmVyLmN1ckNvbnRleHQgPSAnRk9PJztcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRDb250ZXh0KCdBTk9USEVSJykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9zd2l0Y2hpbmcgdG8gY29udGV4dC8pO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ3N0YXJ0Q2hyb21lZHJpdmVyUHJveHknLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiBhIGNocm9tZWRyaXZlciBpbnN0YW5jZSBpcyBhbHJlYWR5IHJ1bm5pbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgICAgZHJpdmVyLmNocm9tZWRyaXZlciA9ICdDSFJPTUlVTSc7XG4gICAgICBhd2FpdCBkcml2ZXIuc3RhcnRDaHJvbWVkcml2ZXJQcm94eSgnQ0hST01JVU0nKS5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL2luc3RhbmNlIHJ1bm5pbmcvKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==