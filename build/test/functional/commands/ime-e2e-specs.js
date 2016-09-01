'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

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
  unicodeKeyboard: true,
  resetKeyboard: true
};
var unicodeImeId = 'io.appium.android.ime/.UnicodeIME';

describe('apidemo - IME', function () {
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
  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity('io.appium.android.apis', 'io.appium.android.apis.ApiDemos'));

        case 2:
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
  it('should get the default (enabled) input method', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getActiveIMEEngine().should.eventually.equal(unicodeImeId));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should get the available input methods', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.availableIMEEngines().should.eventually.have.length.at.least(4));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should activate an installed input method', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.activateIMEEngine(unicodeImeId).should.not.be.rejected);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should fail to activate an uninstalled input method', function callee$1$0() {
    var invalidImeId;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          invalidImeId = 'sdf.wer.gdasdfsf/.OsdfEfgd';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.activateIMEEngine(invalidImeId).should.eventually.be.rejectedWith(/not available/));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should deactivate the current input method', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.activateIMEEngine(unicodeImeId));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.getActiveIMEEngine().should.eventually.equal(unicodeImeId));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.deactivateIMEEngine());

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getActiveIMEEngine().should.eventually.not.equal(unicodeImeId));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9pbWUtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLFVBQVU7Ozs7MEJBQ2IsYUFBYTs7OztBQUVwQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLFdBQVcsR0FBRztBQUNoQixLQUFHLEVBQUUsNkJBQVcsZ0JBQWdCLENBQUM7QUFDakMsWUFBVSxFQUFFLFNBQVM7QUFDckIsY0FBWSxFQUFFLFNBQVM7QUFDdkIsaUJBQWUsRUFBRSxJQUFJO0FBQ3JCLGVBQWEsRUFBRSxJQUFJO0NBQ3BCLENBQUM7QUFDRixJQUFJLFlBQVksR0FBRyxtQ0FBbUMsQ0FBQzs7QUFFdkQsUUFBUSxDQUFDLGVBQWUsRUFBRSxZQUFZOzs7QUFDcEMsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQ3hDLENBQUMsQ0FBQztBQUNILFlBQVUsQ0FBQzs7Ozs7MkNBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsRUFBRSxpQ0FBaUMsQ0FBQzs7Ozs7OztHQUN4RixDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLCtDQUErQyxFQUFFOzs7OzsyQ0FDNUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOzs7Ozs7O0dBQ3hFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyx3Q0FBd0MsRUFBRTs7Ozs7MkNBQ3JDLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztHQUM3RSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMkNBQTJDLEVBQUU7Ozs7OzJDQUN4QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsUUFBUTs7Ozs7OztHQUNwRSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMscURBQXFELEVBQUU7UUFDcEQsWUFBWTs7OztBQUFaLHNCQUFZLEdBQUcsNEJBQTRCOzsyQ0FDekMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUM7Ozs7Ozs7R0FDaEcsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDRDQUE0QyxFQUFFOzs7OzsyQ0FDekMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQzs7OzsyQ0FDdEMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDOzs7OzJDQUNqRSxNQUFNLENBQUMsbUJBQW1CLEVBQUU7Ozs7MkNBQzVCLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7R0FDNUUsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9pbWUtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgc2FtcGxlQXBwcyBmcm9tICdzYW1wbGUtYXBwcyc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJyxcbiAgdW5pY29kZUtleWJvYXJkOiB0cnVlLFxuICByZXNldEtleWJvYXJkOiB0cnVlXG59O1xubGV0IHVuaWNvZGVJbWVJZCA9ICdpby5hcHBpdW0uYW5kcm9pZC5pbWUvLlVuaWNvZGVJTUUnO1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIElNRScsIGZ1bmN0aW9uICgpIHtcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgfSk7XG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJywgJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMuQXBpRGVtb3MnKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBnZXQgdGhlIGRlZmF1bHQgKGVuYWJsZWQpIGlucHV0IG1ldGhvZCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QWN0aXZlSU1FRW5naW5lKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwodW5pY29kZUltZUlkKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZ2V0IHRoZSBhdmFpbGFibGUgaW5wdXQgbWV0aG9kcycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuYXZhaWxhYmxlSU1FRW5naW5lcygpLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBhY3RpdmF0ZSBhbiBpbnN0YWxsZWQgaW5wdXQgbWV0aG9kJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5hY3RpdmF0ZUlNRUVuZ2luZSh1bmljb2RlSW1lSWQpLnNob3VsZC5ub3QuYmUucmVqZWN0ZWQ7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZhaWwgdG8gYWN0aXZhdGUgYW4gdW5pbnN0YWxsZWQgaW5wdXQgbWV0aG9kJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBpbnZhbGlkSW1lSWQgPSAnc2RmLndlci5nZGFzZGZzZi8uT3NkZkVmZ2QnO1xuICAgIGF3YWl0IGRyaXZlci5hY3RpdmF0ZUlNRUVuZ2luZShpbnZhbGlkSW1lSWQpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvbm90IGF2YWlsYWJsZS8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBkZWFjdGl2YXRlIHRoZSBjdXJyZW50IGlucHV0IG1ldGhvZCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuYWN0aXZhdGVJTUVFbmdpbmUodW5pY29kZUltZUlkKTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QWN0aXZlSU1FRW5naW5lKCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwodW5pY29kZUltZUlkKTtcbiAgICBhd2FpdCBkcml2ZXIuZGVhY3RpdmF0ZUlNRUVuZ2luZSgpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRBY3RpdmVJTUVFbmdpbmUoKS5zaG91bGQuZXZlbnR1YWxseS5ub3QuZXF1YWwodW5pY29kZUltZUlkKTtcbiAgfSk7XG59KTtcbiJdfQ==