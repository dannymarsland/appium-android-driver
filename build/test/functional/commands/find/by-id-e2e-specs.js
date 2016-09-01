'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../../..');

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

describe('Find - ID', function () {
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
  it('should find an element by id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/text1', false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should return an array of one element if the `multi` param is true', function callee$1$0() {
    var els;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/text1', true));

        case 2:
          els = context$2$0.sent;

          els.should.be.an['instanceof'](Array);
          els.should.have.length.above(1);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// TODO: this returns an object instead of an array. Investigate.
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LWlkLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7OzBCQUNoQixhQUFhOzs7O0FBRXBDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksV0FBVyxHQUFHO0FBQ2hCLEtBQUcsRUFBRSw2QkFBVyxnQkFBZ0IsQ0FBQztBQUNqQyxZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztDQUN4QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxXQUFXLEVBQUUsWUFBVTs7O0FBQzlCLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUN4QyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDhCQUE4QixFQUFFOzs7OzsyQ0FDM0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLOzs7Ozs7O0dBQ2xGLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxvRUFBb0UsRUFBRTtRQUVuRSxHQUFHOzs7OzsyQ0FBUyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUM7OztBQUE5RCxhQUFHOztBQUNQLGFBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsY0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ25DLGFBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7R0FDakMsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LWlkLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xubGV0IGRlZmF1bHRDYXBzID0ge1xuICBhcHA6IHNhbXBsZUFwcHMoJ0FwaURlbW9zLWRlYnVnJyksXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcbiAgcGxhdGZvcm1OYW1lOiAnQW5kcm9pZCdcbn07XG5cbmRlc2NyaWJlKCdGaW5kIC0gSUQnLCBmdW5jdGlvbigpe1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCBieSBpZCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ2FuZHJvaWQ6aWQvdGV4dDEnLCBmYWxzZSkuc2hvdWxkLmV2ZW50dWFsbHkuZXhpc3Q7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiBhbiBhcnJheSBvZiBvbmUgZWxlbWVudCBpZiB0aGUgYG11bHRpYCBwYXJhbSBpcyB0cnVlJywgYXN5bmMgKCkgPT4ge1xuICAgIC8vIFRPRE86IHRoaXMgcmV0dXJucyBhbiBvYmplY3QgaW5zdGVhZCBvZiBhbiBhcnJheS4gSW52ZXN0aWdhdGUuXG4gICAgbGV0IGVscyA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAnYW5kcm9pZDppZC90ZXh0MScsIHRydWUpO1xuICAgIGVscy5zaG91bGQuYmUuYW4uaW5zdGFuY2VvZihBcnJheSk7XG4gICAgZWxzLnNob3VsZC5oYXZlLmxlbmd0aC5hYm92ZSgxKTtcbiAgfSk7XG59KTtcbiJdfQ==