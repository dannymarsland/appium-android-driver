'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = {
  appPackage: 'com.android.browser',
  appActivity: '.BrowserActivity',
  deviceName: 'Android',
  platformName: 'Android'
};

describe('setUrl', function () {
  var _this = this;

  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  after(function callee$1$0() {
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
  it('should be able to start a data uri via setUrl', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.setUrl('http://saucelabs.com'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'com.android.browser:id/url', false));

        case 4:
          el = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.include('saucelabs.com'));

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy91cmwtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLFVBQVU7Ozs7QUFFcEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxXQUFXLEdBQUc7QUFDaEIsWUFBVSxFQUFFLHFCQUFxQjtBQUNqQyxhQUFXLEVBQUUsa0JBQWtCO0FBQy9CLFlBQVUsRUFBRSxTQUFTO0FBQ3JCLGNBQVksRUFBRSxTQUFTO0NBQ3hCLENBQUM7O0FBRUYsUUFBUSxDQUFDLFFBQVEsRUFBRSxZQUFVOzs7QUFDM0IsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQ3hDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsK0NBQStDLEVBQUU7UUFFOUMsRUFBRTs7Ozs7MkNBREEsTUFBTSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzs7OzsyQ0FDNUIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsS0FBSyxDQUFDOzs7QUFBeEUsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDOzs7Ozs7O0dBQzVFLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvdXJsLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xubGV0IGRlZmF1bHRDYXBzID0ge1xuICBhcHBQYWNrYWdlOiAnY29tLmFuZHJvaWQuYnJvd3NlcicsXG4gIGFwcEFjdGl2aXR5OiAnLkJyb3dzZXJBY3Rpdml0eScsXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcbiAgcGxhdGZvcm1OYW1lOiAnQW5kcm9pZCdcbn07XG5cbmRlc2NyaWJlKCdzZXRVcmwnLCBmdW5jdGlvbigpe1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc3RhcnQgYSBkYXRhIHVyaSB2aWEgc2V0VXJsJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5zZXRVcmwoJ2h0dHA6Ly9zYXVjZWxhYnMuY29tJyk7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdjb20uYW5kcm9pZC5icm93c2VyOmlkL3VybCcsIGZhbHNlKTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5pbmNsdWRlKCdzYXVjZWxhYnMuY29tJyk7XG4gIH0pO1xufSk7XG4iXX0=