'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _libAndroidHelpers = require('../../../lib/android-helpers');

var _libAndroidHelpers2 = _interopRequireDefault(_libAndroidHelpers);

var _appiumTestSupport = require('appium-test-support');

var driver = undefined;
_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

describe('General', function () {
  describe('hideKeyboard', function () {
    it('should throw an error if no keyboard is present', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = {};
            driver.adb.isSoftKeyboardPresent = function () {
              return false;
            };
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.hideKeyboard().should.be.rejectedWith(/not present/));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should throw an error if there is no selector', function () {
      driver.findElOrEls('xpath', null, false, 'some context').should.be.rejected;
    });
  });
  describe('Install App', function () {
    it('should throw an error if APK does not exist', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.installApp('non/existent/app.apk').should.be.rejectedWith(/Could not find/));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('Run installed App', (0, _appiumTestSupport.withMocks)({ helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    it('should throw error if run with full reset', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.opts = { appPackage: "app.package", appActivity: "act", fullReset: true };
            driver.caps = {};
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.initAUT().should.be.rejectedWith(/Full reset requires an app capability/));

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should reset if run with fast reset', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.opts = { appPackage: "app.package", appActivity: "act", fullReset: false, fastReset: true };
            driver.caps = {};
            driver.adb = "mock_adb";
            mocks.helpers.expects("resetApp").withExactArgs("mock_adb", undefined, "app.package", true);
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.initAUT());

          case 7:
            mocks.helpers.verify();

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should keep data if run without reset', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.opts = { appPackage: "app.package", appActivity: "act", fullReset: false, fastReset: false };
            driver.caps = {};
            mocks.helpers.expects("resetApp").never();
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.initAUT());

          case 6:
            mocks.helpers.verify();

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
  describe('getStrings', (0, _appiumTestSupport.withMocks)({ helpers: _libAndroidHelpers2['default'] }, function (mocks) {
    it('should return app strings', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.bootstrap = {};
            driver.bootstrap.sendAction = function () {
              return '';
            };
            mocks.helpers.expects("pushStrings").returns({ 'test': 'en_value' });
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(driver.getStrings('en'));

          case 6:
            strings = context$3$0.sent;

            strings.test.should.equal('en_value');
            mocks.helpers.verify();

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return cached app strings for the specified language', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = {};
            driver.adb.getDeviceLanguage = function () {
              return 'en';
            };
            driver.apkStrings.en = { 'test': 'en_value' };
            driver.apkStrings.fr = { 'test': 'fr_value' };
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.getStrings('fr'));

          case 7:
            strings = context$3$0.sent;

            strings.test.should.equal('fr_value');

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should return cached app strings for the device language', function callee$2$0() {
      var strings;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _2['default']();
            driver.adb = {};
            driver.adb.getDeviceLanguage = function () {
              return 'en';
            };
            driver.apkStrings.en = { 'test': 'en_value' };
            driver.apkStrings.fr = { 'test': 'fr_value' };
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(driver.getStrings());

          case 7:
            strings = context$3$0.sent;

            strings.test.should.equal('en_value');

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvdW5pdC9jb21tYW5kcy9nZW5lcmFsLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsVUFBVTs7OztpQ0FDaEIsOEJBQThCOzs7O2lDQUN4QixxQkFBcUI7O0FBRS9DLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBTTtBQUN4QixVQUFRLENBQUMsY0FBYyxFQUFFLFlBQU07QUFDN0IsTUFBRSxDQUFDLGlEQUFpRCxFQUFFOzs7O0FBQ3BELGtCQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDN0Isa0JBQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGtCQUFNLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLFlBQU07QUFBRSxxQkFBTyxLQUFLLENBQUM7YUFBRSxDQUFDOzs2Q0FDckQsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzs7Ozs7OztLQUNsRSxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsK0NBQStDLEVBQUUsWUFBTTtBQUN4RCxZQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDO0tBQzdFLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztBQUNILFVBQVEsQ0FBQyxhQUFhLEVBQUUsWUFBTTtBQUM1QixNQUFFLENBQUMsNkNBQTZDLEVBQUU7Ozs7QUFDaEQsa0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7NkNBQ3ZCLE1BQU0sQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7OztLQUN6RixDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsbUJBQW1CLEVBQUUsa0NBQVUsRUFBQyxPQUFPLGdDQUFBLEVBQUMsRUFBRSxVQUFDLEtBQUssRUFBSztBQUM1RCxNQUFFLENBQUMsMkNBQTJDLEVBQUU7Ozs7QUFDOUMsa0JBQU0sR0FBRyxtQkFBbUIsQ0FBQztBQUM3QixrQkFBTSxDQUFDLElBQUksR0FBRyxFQUFDLFVBQVUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUM7QUFDL0Usa0JBQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDOzs2Q0FDWCxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsdUNBQXVDLENBQUM7Ozs7Ozs7S0FDdkYsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLHFDQUFxQyxFQUFFOzs7O0FBQ3hDLGtCQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDN0Isa0JBQU0sQ0FBQyxJQUFJLEdBQUcsRUFBQyxVQUFVLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUM7QUFDakcsa0JBQU0sQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLGtCQUFNLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztBQUN4QixpQkFBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDOzs2Q0FDdEYsTUFBTSxDQUFDLE9BQU8sRUFBRTs7O0FBQ3RCLGlCQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O0tBQ3hCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyx1Q0FBdUMsRUFBRTs7OztBQUMxQyxrQkFBTSxHQUFHLG1CQUFtQixDQUFDO0FBQzdCLGtCQUFNLENBQUMsSUFBSSxHQUFHLEVBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQyxDQUFDO0FBQ2xHLGtCQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNqQixpQkFBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7OzZDQUNwQyxNQUFNLENBQUMsT0FBTyxFQUFFOzs7QUFDdEIsaUJBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7Ozs7Ozs7S0FDeEIsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDLENBQUM7QUFDSixVQUFRLENBQUMsWUFBWSxFQUFFLGtDQUFVLEVBQUMsT0FBTyxnQ0FBQSxFQUFDLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDckQsTUFBRSxDQUFDLDJCQUEyQixFQUFFO1VBTTFCLE9BQU87Ozs7QUFMWCxrQkFBTSxHQUFHLG1CQUFtQixDQUFDO0FBQzdCLGtCQUFNLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUN0QixrQkFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsWUFBTTtBQUFFLHFCQUFPLEVBQUUsQ0FBQzthQUFFLENBQUM7QUFDbkQsaUJBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUMvQixPQUFPLENBQUMsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQzs7NkNBQ2YsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7OztBQUF2QyxtQkFBTzs7QUFDWCxtQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3RDLGlCQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDOzs7Ozs7O0tBQ3hCLENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyw2REFBNkQsRUFBRTtVQU01RCxPQUFPOzs7O0FBTFgsa0JBQU0sR0FBRyxtQkFBbUIsQ0FBQztBQUM3QixrQkFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDaEIsa0JBQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsWUFBTTtBQUFFLHFCQUFPLElBQUksQ0FBQzthQUFFLENBQUM7QUFDdEQsa0JBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxDQUFDO0FBQzVDLGtCQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsQ0FBQzs7NkNBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDOzs7QUFBdkMsbUJBQU87O0FBQ1gsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Ozs7OztLQUN2QyxDQUFDLENBQUM7QUFDSCxNQUFFLENBQUMsMERBQTBELEVBQUU7VUFNekQsT0FBTzs7OztBQUxYLGtCQUFNLEdBQUcsbUJBQW1CLENBQUM7QUFDN0Isa0JBQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGtCQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLFlBQU07QUFBRSxxQkFBTyxJQUFJLENBQUM7YUFBRSxDQUFDO0FBQ3RELGtCQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsQ0FBQztBQUM1QyxrQkFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLENBQUM7OzZDQUN4QixNQUFNLENBQUMsVUFBVSxFQUFFOzs7QUFBbkMsbUJBQU87O0FBQ1gsbUJBQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Ozs7OztLQUN2QyxDQUFDLENBQUM7R0FDSixDQUFDLENBQUMsQ0FBQztDQUNMLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L3VuaXQvY29tbWFuZHMvZ2VuZXJhbC1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IGhlbHBlcnMgZnJvbSAnLi4vLi4vLi4vbGliL2FuZHJvaWQtaGVscGVycyc7XG5pbXBvcnQgeyB3aXRoTW9ja3MgfSBmcm9tICdhcHBpdW0tdGVzdC1zdXBwb3J0JztcblxubGV0IGRyaXZlcjtcbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmRlc2NyaWJlKCdHZW5lcmFsJywgKCkgPT4ge1xuICBkZXNjcmliZSgnaGlkZUtleWJvYXJkJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgdGhyb3cgYW4gZXJyb3IgaWYgbm8ga2V5Ym9hcmQgaXMgcHJlc2VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBkcml2ZXIuYWRiID0ge307XG4gICAgICBkcml2ZXIuYWRiLmlzU29mdEtleWJvYXJkUHJlc2VudCA9ICgpID0+IHsgcmV0dXJuIGZhbHNlOyB9O1xuICAgICAgYXdhaXQgZHJpdmVyLmhpZGVLZXlib2FyZCgpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL25vdCBwcmVzZW50Lyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBubyBzZWxlY3RvcicsICgpID0+IHtcbiAgICAgIGRyaXZlci5maW5kRWxPckVscygneHBhdGgnLCBudWxsLCBmYWxzZSwgJ3NvbWUgY29udGV4dCcpLnNob3VsZC5iZS5yZWplY3RlZDtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdJbnN0YWxsIEFwcCcsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHRocm93IGFuIGVycm9yIGlmIEFQSyBkb2VzIG5vdCBleGlzdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBhd2FpdCBkcml2ZXIuaW5zdGFsbEFwcCgnbm9uL2V4aXN0ZW50L2FwcC5hcGsnKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9Db3VsZCBub3QgZmluZC8pO1xuICAgIH0pO1xuICB9KTtcbiAgZGVzY3JpYmUoJ1J1biBpbnN0YWxsZWQgQXBwJywgd2l0aE1vY2tzKHtoZWxwZXJzfSwgKG1vY2tzKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBlcnJvciBpZiBydW4gd2l0aCBmdWxsIHJlc2V0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGRyaXZlci5vcHRzID0ge2FwcFBhY2thZ2U6IFwiYXBwLnBhY2thZ2VcIiwgYXBwQWN0aXZpdHk6IFwiYWN0XCIsIGZ1bGxSZXNldDogdHJ1ZX07XG4gICAgICBkcml2ZXIuY2FwcyA9IHt9O1xuICAgICAgYXdhaXQgZHJpdmVyLmluaXRBVVQoKS5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9GdWxsIHJlc2V0IHJlcXVpcmVzIGFuIGFwcCBjYXBhYmlsaXR5Lyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXNldCBpZiBydW4gd2l0aCBmYXN0IHJlc2V0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGRyaXZlci5vcHRzID0ge2FwcFBhY2thZ2U6IFwiYXBwLnBhY2thZ2VcIiwgYXBwQWN0aXZpdHk6IFwiYWN0XCIsIGZ1bGxSZXNldDogZmFsc2UsIGZhc3RSZXNldDogdHJ1ZX07XG4gICAgICBkcml2ZXIuY2FwcyA9IHt9O1xuICAgICAgZHJpdmVyLmFkYiA9IFwibW9ja19hZGJcIjtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cyhcInJlc2V0QXBwXCIpLndpdGhFeGFjdEFyZ3MoXCJtb2NrX2FkYlwiLCB1bmRlZmluZWQsIFwiYXBwLnBhY2thZ2VcIiwgdHJ1ZSk7XG4gICAgICBhd2FpdCBkcml2ZXIuaW5pdEFVVCgpO1xuICAgICAgbW9ja3MuaGVscGVycy52ZXJpZnkoKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGtlZXAgZGF0YSBpZiBydW4gd2l0aG91dCByZXNldCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBkcml2ZXIub3B0cyA9IHthcHBQYWNrYWdlOiBcImFwcC5wYWNrYWdlXCIsIGFwcEFjdGl2aXR5OiBcImFjdFwiLCBmdWxsUmVzZXQ6IGZhbHNlLCBmYXN0UmVzZXQ6IGZhbHNlfTtcbiAgICAgIGRyaXZlci5jYXBzID0ge307XG4gICAgICBtb2Nrcy5oZWxwZXJzLmV4cGVjdHMoXCJyZXNldEFwcFwiKS5uZXZlcigpO1xuICAgICAgYXdhaXQgZHJpdmVyLmluaXRBVVQoKTtcbiAgICAgIG1vY2tzLmhlbHBlcnMudmVyaWZ5KCk7XG4gICAgfSk7XG4gIH0pKTtcbiAgZGVzY3JpYmUoJ2dldFN0cmluZ3MnLCB3aXRoTW9ja3Moe2hlbHBlcnN9LCAobW9ja3MpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBhcHAgc3RyaW5ncycsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwID0ge307XG4gICAgICBkcml2ZXIuYm9vdHN0cmFwLnNlbmRBY3Rpb24gPSAoKSA9PiB7IHJldHVybiAnJzsgfTtcbiAgICAgIG1vY2tzLmhlbHBlcnMuZXhwZWN0cyhcInB1c2hTdHJpbmdzXCIpXG4gICAgICAgICAgLnJldHVybnMoeyd0ZXN0JzogJ2VuX3ZhbHVlJ30pO1xuICAgICAgbGV0IHN0cmluZ3MgPSBhd2FpdCBkcml2ZXIuZ2V0U3RyaW5ncygnZW4nKTtcbiAgICAgIHN0cmluZ3MudGVzdC5zaG91bGQuZXF1YWwoJ2VuX3ZhbHVlJyk7XG4gICAgICBtb2Nrcy5oZWxwZXJzLnZlcmlmeSgpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIGNhY2hlZCBhcHAgc3RyaW5ncyBmb3IgdGhlIHNwZWNpZmllZCBsYW5ndWFnZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBkcml2ZXIuYWRiID0ge307XG4gICAgICBkcml2ZXIuYWRiLmdldERldmljZUxhbmd1YWdlID0gKCkgPT4geyByZXR1cm4gJ2VuJzsgfTtcbiAgICAgIGRyaXZlci5hcGtTdHJpbmdzLmVuID0geyd0ZXN0JzogJ2VuX3ZhbHVlJ307XG4gICAgICBkcml2ZXIuYXBrU3RyaW5ncy5mciA9IHsndGVzdCc6ICdmcl92YWx1ZSd9O1xuICAgICAgbGV0IHN0cmluZ3MgPSBhd2FpdCBkcml2ZXIuZ2V0U3RyaW5ncygnZnInKTtcbiAgICAgIHN0cmluZ3MudGVzdC5zaG91bGQuZXF1YWwoJ2ZyX3ZhbHVlJyk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gY2FjaGVkIGFwcCBzdHJpbmdzIGZvciB0aGUgZGV2aWNlIGxhbmd1YWdlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGRyaXZlci5hZGIgPSB7fTtcbiAgICAgIGRyaXZlci5hZGIuZ2V0RGV2aWNlTGFuZ3VhZ2UgPSAoKSA9PiB7IHJldHVybiAnZW4nOyB9O1xuICAgICAgZHJpdmVyLmFwa1N0cmluZ3MuZW4gPSB7J3Rlc3QnOiAnZW5fdmFsdWUnfTtcbiAgICAgIGRyaXZlci5hcGtTdHJpbmdzLmZyID0geyd0ZXN0JzogJ2ZyX3ZhbHVlJ307XG4gICAgICBsZXQgc3RyaW5ncyA9IGF3YWl0IGRyaXZlci5nZXRTdHJpbmdzKCk7XG4gICAgICBzdHJpbmdzLnRlc3Quc2hvdWxkLmVxdWFsKCdlbl92YWx1ZScpO1xuICAgIH0pO1xuICB9KSk7XG59KTtcbiJdfQ==