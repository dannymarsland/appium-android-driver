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
var atv = 'android.widget.TextView';
var alv = 'android.widget.ListView';

describe('Find - from element', function () {
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
  it('should find a single element by tag name', function callee$1$0() {
    var el, innerEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', atv, false, el.ELEMENT));

        case 5:
          innerEl = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getText(innerEl.ELEMENT).should.eventually.equal("Access'ibility"));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find multiple elements by tag name', function callee$1$0() {
    var el, innerEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', atv, true, el.ELEMENT));

        case 5:
          innerEl = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getText(innerEl[0].ELEMENT).should.eventually.have.length.above(10));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find an element that doesnt exist', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', false, el.ELEMENT).should.be.rejectedWith(/could not be located/));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find multiple elements that dont exist', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', alv, true));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', false, el.ELEMENT).should.be.rejectedWith(/could not be located/));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2Zyb20tZWwtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7MEJBQ2hCLGFBQWE7Ozs7QUFFcEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxXQUFXLEdBQUc7QUFDaEIsS0FBRyxFQUFFLDZCQUFXLGdCQUFnQixDQUFDO0FBQ2pDLFlBQVUsRUFBRSxTQUFTO0FBQ3JCLGNBQVksRUFBRSxTQUFTO0NBQ3hCLENBQUM7QUFDRixJQUFJLEdBQUcsR0FBRyx5QkFBeUIsQ0FBQztBQUNwQyxJQUFJLEdBQUcsR0FBRyx5QkFBeUIsQ0FBQzs7QUFFcEMsUUFBUSxDQUFDLHFCQUFxQixFQUFFLFlBQVk7OztBQUMxQyxRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7R0FDeEMsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQywwQ0FBMEMsRUFBRTtRQUN6QyxFQUFFLEVBQ0YsT0FBTzs7Ozs7MkNBREksTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQzs7O0FBQXZELFlBQUU7OzJDQUNjLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7O0FBQXhFLGlCQUFPOzsyQ0FDTCxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7OztHQUNoRixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsMkNBQTJDLEVBQUU7UUFDMUMsRUFBRSxFQUNGLE9BQU87Ozs7OzJDQURJLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7OztBQUF2RCxZQUFFOzsyQ0FDYyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUM7OztBQUF2RSxpQkFBTzs7MkNBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7R0FDakYsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDhDQUE4QyxFQUFFO1FBQzdDLEVBQUU7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7OztBQUF2RCxZQUFFOzsyQ0FDQSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FDcEUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUM7Ozs7Ozs7R0FDbEQsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLG1EQUFtRCxFQUFFO1FBQ2xELEVBQUU7Ozs7OzJDQUFTLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUM7OztBQUF0RCxZQUFFOzsyQ0FDQSxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FDcEUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUM7Ozs7Ozs7R0FDbEQsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2Zyb20tZWwtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgc2FtcGxlQXBwcyBmcm9tICdzYW1wbGUtYXBwcyc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJ1xufTtcbmxldCBhdHYgPSAnYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcnO1xubGV0IGFsdiA9ICdhbmRyb2lkLndpZGdldC5MaXN0Vmlldyc7XG5cbmRlc2NyaWJlKCdGaW5kIC0gZnJvbSBlbGVtZW50JywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSB0YWcgbmFtZScsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCBhbHYsIGZhbHNlKTtcbiAgICBsZXQgaW5uZXJFbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsIGF0diwgZmFsc2UsIGVsLkVMRU1FTlQpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGlubmVyRWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoXCJBY2Nlc3MnaWJpbGl0eVwiKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSB0YWcgbmFtZScsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCBhbHYsIGZhbHNlKTtcbiAgICBsZXQgaW5uZXJFbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsIGF0diwgdHJ1ZSwgZWwuRUxFTUVOVCk7XG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoaW5uZXJFbFswXS5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hYm92ZSgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIG5vdCBmaW5kIGFuIGVsZW1lbnQgdGhhdCBkb2VzbnQgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgYWx2LCBmYWxzZSk7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2JsYXJnaW1hcmcnLCBmYWxzZSwgZWwuRUxFTUVOVClcbiAgICAgIC5zaG91bGQuYmUucmVqZWN0ZWRXaXRoKC9jb3VsZCBub3QgYmUgbG9jYXRlZC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBtdWx0aXBsZSBlbGVtZW50cyB0aGF0IGRvbnQgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgYWx2LCB0cnVlKTtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYmxhcmdpbWFyZycsIGZhbHNlLCBlbC5FTEVNRU5UKVxuICAgICAgLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL2NvdWxkIG5vdCBiZSBsb2NhdGVkLyk7XG4gIH0pO1xufSk7XG4iXX0=