'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

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

describe('Localization - language and country @skip-ci @skip-real-device', function () {
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
  it('should set language to FR', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.adb.setDeviceLanguage('FR'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.adb.getDeviceLanguage().should.eventually.equal('fr'));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should set country to US', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.adb.setDeviceCountry('US'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.adb.getDeviceCountry().should.eventually.equal('US'));

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

describe('Localization - locale @skip-ci @skip-real-device', function () {
  var _this2 = this;

  // Stalls on API 23, works in CI
  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
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
    }, null, _this2);
  });
  it('should start as FR', function callee$1$0() {
    var frCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          frCaps = _Object$assign({}, defaultCaps, { locale: 'FR' });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(frCaps));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.adb.getDeviceCountry().should.eventually.equal('FR'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
  it('should start as US', function callee$1$0() {
    var usCaps;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          usCaps = _Object$assign({}, defaultCaps, { locale: 'US' });
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(usCaps));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.adb.getDeviceCountry().should.eventually.equal('US'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9sb2NhbGl6YXRpb24vbGFuZ3VhZ2UtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsYUFBYTs7OzswQkFDaEIsYUFBYTs7OztBQUVwQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLFdBQVcsR0FBRztBQUNoQixLQUFHLEVBQUUsNkJBQVcsZ0JBQWdCLENBQUM7QUFDakMsWUFBVSxFQUFFLFNBQVM7QUFDckIsY0FBWSxFQUFFLFNBQVM7Q0FDeEIsQ0FBQzs7QUFFRixRQUFRLENBQUMsZ0VBQWdFLEVBQUUsWUFBWTs7O0FBQ3JGLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUN4QyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDJCQUEyQixFQUFFOzs7OzsyQ0FDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7R0FDbkUsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDBCQUEwQixFQUFFOzs7OzsyQ0FDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7R0FDbEUsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDOztBQUVILFFBQVEsQ0FBQyxrREFBa0QsRUFBRSxZQUFXOzs7O0FBRXRFLFlBQVUsQ0FBQzs7OztBQUNULGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7Ozs7Ozs7R0FDOUIsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxvQkFBb0IsRUFBRTtRQUNuQixNQUFNOzs7O0FBQU4sZ0JBQU0sR0FBRyxlQUFjLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUM7OzJDQUNyRCxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQzs7OzsyQ0FDNUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUNsRSxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsb0JBQW9CLEVBQUU7UUFDbkIsTUFBTTs7OztBQUFOLGdCQUFNLEdBQUcsZUFBYyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDOzsyQ0FDckQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7Ozs7MkNBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7R0FDbEUsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9sb2NhbGl6YXRpb24vbGFuZ3VhZ2UtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgc2FtcGxlQXBwcyBmcm9tICdzYW1wbGUtYXBwcyc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJ1xufTtcblxuZGVzY3JpYmUoJ0xvY2FsaXphdGlvbiAtIGxhbmd1YWdlIGFuZCBjb3VudHJ5IEBza2lwLWNpIEBza2lwLXJlYWwtZGV2aWNlJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNldCBsYW5ndWFnZSB0byBGUicsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuYWRiLnNldERldmljZUxhbmd1YWdlKCdGUicpO1xuICAgIGF3YWl0IGRyaXZlci5hZGIuZ2V0RGV2aWNlTGFuZ3VhZ2UoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnZnInKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc2V0IGNvdW50cnkgdG8gVVMnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmFkYi5zZXREZXZpY2VDb3VudHJ5KCdVUycpO1xuICAgIGF3YWl0IGRyaXZlci5hZGIuZ2V0RGV2aWNlQ291bnRyeSgpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdVUycpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnTG9jYWxpemF0aW9uIC0gbG9jYWxlIEBza2lwLWNpIEBza2lwLXJlYWwtZGV2aWNlJywgZnVuY3Rpb24oKSB7XG4gIC8vIFN0YWxscyBvbiBBUEkgMjMsIHdvcmtzIGluIENJXG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gIH0pO1xuICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc3RhcnQgYXMgRlInLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGZyQ2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzLCB7bG9jYWxlOiAnRlInfSk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZnJDYXBzKTtcbiAgICBhd2FpdCBkcml2ZXIuYWRiLmdldERldmljZUNvdW50cnkoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnRlInKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgc3RhcnQgYXMgVVMnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHVzQ2FwcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRDYXBzLCB7bG9jYWxlOiAnVVMnfSk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24odXNDYXBzKTtcbiAgICBhd2FpdCBkcml2ZXIuYWRiLmdldERldmljZUNvdW50cnkoKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnVVMnKTtcbiAgfSk7XG59KTtcbiJdfQ==