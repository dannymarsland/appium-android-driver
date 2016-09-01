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

describe('Find - accessibility ID', function () {
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
  it('should find an element by name', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', 'Animation', false).should.eventually.exist);

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
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', 'Animation', true));

        case 2:
          els = context$2$0.sent;

          els.should.be.an['instanceof'](Array);
          els.should.have.length(1);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with a content-desc property containing an apostrophe', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', "Access'ibility", false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LWFjY2Vzc2liaWxpdHktaWQtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7MEJBQ2hCLGFBQWE7Ozs7QUFFcEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxXQUFXLEdBQUc7QUFDaEIsS0FBRyxFQUFFLDZCQUFXLGdCQUFnQixDQUFDO0FBQ2pDLFlBQVUsRUFBRSxTQUFTO0FBQ3JCLGNBQVksRUFBRSxTQUFTO0NBQ3hCLENBQUM7O0FBRUYsUUFBUSxDQUFDLHlCQUF5QixFQUFFLFlBQVk7OztBQUM5QyxRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7R0FDeEMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTs7Ozs7MkNBQzdCLE1BQU0sQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSzs7Ozs7OztHQUN6RixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsb0VBQW9FLEVBQUU7UUFDbkUsR0FBRzs7Ozs7MkNBQVMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDOzs7QUFBckUsYUFBRzs7QUFDUCxhQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLGNBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNuQyxhQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7R0FDM0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDhFQUE4RSxFQUFFOzs7OzsyQ0FDM0UsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUs7Ozs7Ozs7R0FDOUYsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LWFjY2Vzc2liaWxpdHktaWQtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgc2FtcGxlQXBwcyBmcm9tICdzYW1wbGUtYXBwcyc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJ1xufTtcblxuZGVzY3JpYmUoJ0ZpbmQgLSBhY2Nlc3NpYmlsaXR5IElEJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCBieSBuYW1lJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnYWNjZXNzaWJpbGl0eSBpZCcsICdBbmltYXRpb24nLCBmYWxzZSkuc2hvdWxkLmV2ZW50dWFsbHkuZXhpc3Q7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiBhbiBhcnJheSBvZiBvbmUgZWxlbWVudCBpZiB0aGUgYG11bHRpYCBwYXJhbSBpcyB0cnVlJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBlbHMgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2FjY2Vzc2liaWxpdHkgaWQnLCAnQW5pbWF0aW9uJywgdHJ1ZSk7XG4gICAgZWxzLnNob3VsZC5iZS5hbi5pbnN0YW5jZW9mKEFycmF5KTtcbiAgICBlbHMuc2hvdWxkLmhhdmUubGVuZ3RoKDEpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgd2l0aCBhIGNvbnRlbnQtZGVzYyBwcm9wZXJ0eSBjb250YWluaW5nIGFuIGFwb3N0cm9waGUnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdhY2Nlc3NpYmlsaXR5IGlkJywgXCJBY2Nlc3MnaWJpbGl0eVwiLCBmYWxzZSkuc2hvdWxkLmV2ZW50dWFsbHkuZXhpc3Q7XG4gIH0pO1xufSk7XG4iXX0=