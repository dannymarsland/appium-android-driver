'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _libAndroidHelpers = require('../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _sampleApps = require('sample-apps');

var _sampleApps2 = _interopRequireDefault(_sampleApps);

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

var opts = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  appPackage: 'io.appium.android.apis',
  androidInstallTimeout: 90000
};

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('android-helpers e2e', function () {
  describe('installApkRemotely', function () {
    it('installs an apk by pushing it to the device then installing it from within', function callee$2$0() {
      var adb;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.timeout(15000);
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB());

          case 3:
            adb = context$3$0.sent;
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(adb.uninstallApk(opts.appPackage));

          case 6:
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(adb.isAppInstalled(opts.appPackage).should.eventually.be['false']);

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].installApkRemotely(adb, opts));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(adb.isAppInstalled(opts.appPackage).should.eventually.be['true']);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
  describe('ensureDeviceLocale', function () {
    it('should set device language and country', function callee$2$0() {
      var adb;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(_appiumAdb2['default'].createADB());

          case 2:
            adb = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'fr', 'FR'));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(adb.getDeviceLanguage().should.eventually.equal('fr'));

          case 7:
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(adb.getDeviceCountry().should.eventually.equal('FR'));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(_libAndroidHelpers2['default'].ensureDeviceLocale(adb, 'en', 'US'));

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// cleanup
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9hbmRyb2lkLWhlbHBlci1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztpQ0FDekIsMkJBQTJCOzs7OzBCQUN4QixhQUFhOzs7O3lCQUNwQixZQUFZOzs7O0FBRTVCLElBQUksSUFBSSxHQUFHO0FBQ1QsS0FBRyxFQUFHLDZCQUFXLGdCQUFnQixDQUFDO0FBQ2xDLFlBQVUsRUFBRyx3QkFBd0I7QUFDckMsdUJBQXFCLEVBQUcsS0FBSztDQUM5QixDQUFDOztBQUVGLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsUUFBUSxDQUFDLHFCQUFxQixFQUFFLFlBQU07QUFDcEMsVUFBUSxDQUFDLG9CQUFvQixFQUFFLFlBQU07QUFDbkMsTUFBRSxDQUFDLDRFQUE0RSxFQUFFO1VBRTNFLEdBQUc7Ozs7QUFEUCxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzs7NkNBQ0osdUJBQUksU0FBUyxFQUFFOzs7QUFBM0IsZUFBRzs7NkNBQ0QsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7OzZDQUNqQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsU0FBTTs7Ozs2Q0FDOUQsK0JBQVEsa0JBQWtCLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzs7Ozs2Q0FDckMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQUs7Ozs7Ozs7S0FDcEUsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLG9CQUFvQixFQUFFLFlBQU07QUFDbkMsTUFBRSxDQUFDLHdDQUF3QyxFQUFFO1VBQ3ZDLEdBQUc7Ozs7OzZDQUFTLHVCQUFJLFNBQVMsRUFBRTs7O0FBQTNCLGVBQUc7OzZDQUNELCtCQUFRLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDOzs7OzZDQUMzQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7NkNBQ3JELEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs2Q0FFcEQsK0JBQVEsa0JBQWtCLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Ozs7Ozs7S0FDbEQsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9hbmRyb2lkLWhlbHBlci1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBoZWxwZXJzIGZyb20gJy4uLy4uL2xpYi9hbmRyb2lkLWhlbHBlcnMnO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcblxubGV0IG9wdHMgPSB7XG4gIGFwcCA6IHNhbXBsZUFwcHMoJ0FwaURlbW9zLWRlYnVnJyksXG4gIGFwcFBhY2thZ2UgOiAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsXG4gIGFuZHJvaWRJbnN0YWxsVGltZW91dCA6IDkwMDAwXG59O1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5kZXNjcmliZSgnYW5kcm9pZC1oZWxwZXJzIGUyZScsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2luc3RhbGxBcGtSZW1vdGVseScsICgpID0+IHtcbiAgICBpdCgnaW5zdGFsbHMgYW4gYXBrIGJ5IHB1c2hpbmcgaXQgdG8gdGhlIGRldmljZSB0aGVuIGluc3RhbGxpbmcgaXQgZnJvbSB3aXRoaW4nLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnRpbWVvdXQoMTUwMDApO1xuICAgICAgdmFyIGFkYiA9IGF3YWl0IEFEQi5jcmVhdGVBREIoKTtcbiAgICAgIGF3YWl0IGFkYi51bmluc3RhbGxBcGsob3B0cy5hcHBQYWNrYWdlKTtcbiAgICAgIGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChvcHRzLmFwcFBhY2thZ2UpLnNob3VsZC5ldmVudHVhbGx5LmJlLmZhbHNlO1xuICAgICAgYXdhaXQgaGVscGVycy5pbnN0YWxsQXBrUmVtb3RlbHkoYWRiLCBvcHRzKTtcbiAgICAgIGF3YWl0IGFkYi5pc0FwcEluc3RhbGxlZChvcHRzLmFwcFBhY2thZ2UpLnNob3VsZC5ldmVudHVhbGx5LmJlLnRydWU7XG4gICAgfSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZW5zdXJlRGV2aWNlTG9jYWxlJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgc2V0IGRldmljZSBsYW5ndWFnZSBhbmQgY291bnRyeScsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhZGIgPSBhd2FpdCBBREIuY3JlYXRlQURCKCk7XG4gICAgICBhd2FpdCBoZWxwZXJzLmVuc3VyZURldmljZUxvY2FsZShhZGIsICdmcicsICdGUicpO1xuICAgICAgYXdhaXQgYWRiLmdldERldmljZUxhbmd1YWdlKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ2ZyJyk7XG4gICAgICBhd2FpdCBhZGIuZ2V0RGV2aWNlQ291bnRyeSgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdGUicpO1xuICAgICAgLy8gY2xlYW51cFxuICAgICAgYXdhaXQgaGVscGVycy5lbnN1cmVEZXZpY2VMb2NhbGUoYWRiLCAnZW4nLCAnVVMnKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==