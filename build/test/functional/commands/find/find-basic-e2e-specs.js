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

var _appiumAdb = require('appium-adb');

var _appiumAdb2 = _interopRequireDefault(_appiumAdb);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  deviceName: 'Android',
  platformName: 'Android'
};

describe('Find - basic', function () {
  var _this = this;

  var singleResourceId = undefined;
  before(function callee$1$0() {
    var adb;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 3:
          adb = new _appiumAdb2['default']({});
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(adb.getApiLevel());

        case 6:
          context$2$0.t0 = context$2$0.sent;

          if (!(context$2$0.t0 >= 21)) {
            context$2$0.next = 11;
            break;
          }

          context$2$0.t1 = 'decor_content_parent';
          context$2$0.next = 12;
          break;

        case 11:
          context$2$0.t1 = 'home';

        case 12:
          singleResourceId = context$2$0.t1;

        case 13:
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
  it('should find a single element by content-description', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', 'Animation', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Animation'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element by class name', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('API Demos'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find multiple elements by class name', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find an element that doesnt exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', false).should.be.rejectedWith(/could not be located/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find multiple elements that doesnt exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'blargimarg', true).should.eventually.have.length(0));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should fail on empty locator', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', '', true).should.be.rejectedWith(/selector/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find a single element by string id @skip-android-all', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'activity_sample_code', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('API Demos'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find a single element by resource-id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/' + singleResourceId, false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find multiple elements by resource-id', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/text1', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find multiple elements by resource-id even when theres just one', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'android:id/' + singleResourceId, true).should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find a single element by resource-id with implicit package', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', singleResourceId, false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find a single element by resource-id with implicit package', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'text1', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find multiple elements by resource-id with implicit package even when theres just one', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('id', singleResourceId, true).should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  describe('implicit wait', function () {
    var implicitWait = 5000;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.implicitWait(implicitWait));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should respect implicit wait with multiple elements', function callee$2$0() {
      var beforeMs, afterMs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            beforeMs = Date.now();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'there_is_nothing_called_this', true).should.eventually.have.length(0));

          case 3:
            afterMs = Date.now();

            (afterMs - beforeMs).should.be.below(implicitWait + 5000);
            (afterMs - beforeMs).should.be.above(implicitWait);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    it('should respect implicit wait with a single element', function callee$2$0() {
      var beforeMs, afterMs;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            beforeMs = Date.now();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'there_is_nothing_called_this', false).should.eventually.be.rejectedWith(/could not be located/));

          case 3:
            afterMs = Date.now();

            (afterMs - beforeMs).should.be.below(implicitWait + 5000);
            (afterMs - beforeMs).should.be.above(implicitWait);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});

// the app behaves differently on different api levels when it comes to
// which resource ids are available for testing, so we switch here to make
// sure we're using the right resource id below
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2ZpbmQtYmFzaWMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7MEJBQ2hCLGFBQWE7Ozs7eUJBQ3BCLFlBQVk7Ozs7QUFFNUIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxXQUFXLEdBQUc7QUFDaEIsS0FBRyxFQUFFLDZCQUFXLGdCQUFnQixDQUFDO0FBQ2pDLFlBQVUsRUFBRSxTQUFTO0FBQ3JCLGNBQVksRUFBRSxTQUFTO0NBQ3hCLENBQUM7O0FBRUYsUUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFZOzs7QUFDbkMsTUFBSSxnQkFBZ0IsWUFBQSxDQUFDO0FBQ3JCLFFBQU0sQ0FBQztRQUdELEdBQUc7Ozs7QUFGUCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7OztBQUNuQyxhQUFHLEdBQUcsMkJBQVEsRUFBRSxDQUFDOzsyQ0FJSSxHQUFHLENBQUMsV0FBVyxFQUFFOzs7OztrQ0FBSSxFQUFFOzs7OzsyQkFBRyxzQkFBc0I7Ozs7OzJCQUFHLE1BQU07OztBQUFsRiwwQkFBZ0I7Ozs7Ozs7R0FDakIsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxxREFBcUQsRUFBRTtRQUNwRCxFQUFFOzs7OzsyQ0FBUyxNQUFNLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxLQUFLLENBQUM7OztBQUFyRSxZQUFFOzsyQ0FDQSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENB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TUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7Ozs7Ozs7S0FDcEQsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLG9EQUFvRCxFQUFFO1VBQ25ELFFBQVEsRUFHUixPQUFPOzs7O0FBSFAsb0JBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFOzs2Q0FDbkIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsOEJBQThCLEVBQUUsS0FBSyxDQUFDLENBQ2xFLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQzs7O0FBQ3hELG1CQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTs7QUFDeEIsYUFBQyxPQUFPLEdBQUcsUUFBUSxDQUFBLENBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQzFELGFBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQSxDQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDOzs7Ozs7O0tBQ3BELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZmluZC9maW5kLWJhc2ljLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuaW1wb3J0IEFEQiBmcm9tICdhcHBpdW0tYWRiJztcblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGRyaXZlcjtcbmxldCBkZWZhdWx0Q2FwcyA9IHtcbiAgYXBwOiBzYW1wbGVBcHBzKCdBcGlEZW1vcy1kZWJ1ZycpLFxuICBkZXZpY2VOYW1lOiAnQW5kcm9pZCcsXG4gIHBsYXRmb3JtTmFtZTogJ0FuZHJvaWQnXG59O1xuXG5kZXNjcmliZSgnRmluZCAtIGJhc2ljJywgZnVuY3Rpb24gKCkge1xuICBsZXQgc2luZ2xlUmVzb3VyY2VJZDtcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRDYXBzKTtcbiAgICBsZXQgYWRiID0gbmV3IEFEQih7fSk7XG4gICAgLy8gdGhlIGFwcCBiZWhhdmVzIGRpZmZlcmVudGx5IG9uIGRpZmZlcmVudCBhcGkgbGV2ZWxzIHdoZW4gaXQgY29tZXMgdG9cbiAgICAvLyB3aGljaCByZXNvdXJjZSBpZHMgYXJlIGF2YWlsYWJsZSBmb3IgdGVzdGluZywgc28gd2Ugc3dpdGNoIGhlcmUgdG8gbWFrZVxuICAgIC8vIHN1cmUgd2UncmUgdXNpbmcgdGhlIHJpZ2h0IHJlc291cmNlIGlkIGJlbG93XG4gICAgc2luZ2xlUmVzb3VyY2VJZCA9IGF3YWl0IGFkYi5nZXRBcGlMZXZlbCgpID49IDIxID8gJ2RlY29yX2NvbnRlbnRfcGFyZW50JyA6ICdob21lJztcbiAgfSk7XG4gIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGEgc2luZ2xlIGVsZW1lbnQgYnkgY29udGVudC1kZXNjcmlwdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2FjY2Vzc2liaWxpdHkgaWQnLCAnQW5pbWF0aW9uJywgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBbmltYXRpb24nKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IGJ5IGNsYXNzIG5hbWUnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3JywgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBUEkgRGVtb3MnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBtdWx0aXBsZSBlbGVtZW50cyBieSBjbGFzcyBuYW1lJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5UZXh0VmlldycsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBub3QgZmluZCBhbiBlbGVtZW50IHRoYXQgZG9lc250IGV4aXN0JywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdibGFyZ2ltYXJnJywgZmFsc2UpXG4gICAgICAuc2hvdWxkLmJlLnJlamVjdGVkV2l0aCgvY291bGQgbm90IGJlIGxvY2F0ZWQvKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgbm90IGZpbmQgbXVsdGlwbGUgZWxlbWVudHMgdGhhdCBkb2VzbnQgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2JsYXJnaW1hcmcnLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoKDApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmYWlsIG9uIGVtcHR5IGxvY2F0b3InLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJycsIHRydWUpLnNob3VsZC5iZS5yZWplY3RlZFdpdGgoL3NlbGVjdG9yLyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSBzdHJpbmcgaWQgQHNraXAtYW5kcm9pZC1hbGwnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdhY3Rpdml0eV9zYW1wbGVfY29kZScsIGZhbHNlKTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnQVBJIERlbW9zJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYSBzaW5nbGUgZWxlbWVudCBieSByZXNvdXJjZS1pZCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgYGFuZHJvaWQ6aWQvJHtzaW5nbGVSZXNvdXJjZUlkfWAsIGZhbHNlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmV4aXN0O1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIG11bHRpcGxlIGVsZW1lbnRzIGJ5IHJlc291cmNlLWlkJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAnYW5kcm9pZDppZC90ZXh0MScsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIG11bHRpcGxlIGVsZW1lbnRzIGJ5IHJlc291cmNlLWlkIGV2ZW4gd2hlbiB0aGVyZXMganVzdCBvbmUnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsIGBhbmRyb2lkOmlkLyR7c2luZ2xlUmVzb3VyY2VJZH1gLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoKDEpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGEgc2luZ2xlIGVsZW1lbnQgYnkgcmVzb3VyY2UtaWQgd2l0aCBpbXBsaWNpdCBwYWNrYWdlJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCBzaW5nbGVSZXNvdXJjZUlkLCBmYWxzZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5leGlzdDtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhIHNpbmdsZSBlbGVtZW50IGJ5IHJlc291cmNlLWlkIHdpdGggaW1wbGljaXQgcGFja2FnZScsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2lkJywgJ3RleHQxJywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgbXVsdGlwbGUgZWxlbWVudHMgYnkgcmVzb3VyY2UtaWQgd2l0aCBpbXBsaWNpdCBwYWNrYWdlIGV2ZW4gd2hlbiB0aGVyZXMganVzdCBvbmUnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsIHNpbmdsZVJlc291cmNlSWQsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGgoMSk7XG4gIH0pO1xuICBkZXNjcmliZSgnaW1wbGljaXQgd2FpdCcsICgpID0+IHtcbiAgICBsZXQgaW1wbGljaXRXYWl0ID0gNTAwMDtcbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmltcGxpY2l0V2FpdChpbXBsaWNpdFdhaXQpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgcmVzcGVjdCBpbXBsaWNpdCB3YWl0IHdpdGggbXVsdGlwbGUgZWxlbWVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgYmVmb3JlTXMgPSBEYXRlLm5vdygpO1xuICAgICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICd0aGVyZV9pc19ub3RoaW5nX2NhbGxlZF90aGlzJywgdHJ1ZSlcbiAgICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoKDApO1xuICAgICAgbGV0IGFmdGVyTXMgPSBEYXRlLm5vdygpO1xuICAgICAgKGFmdGVyTXMgLSBiZWZvcmVNcykuc2hvdWxkLmJlLmJlbG93KGltcGxpY2l0V2FpdCArIDUwMDApO1xuICAgICAgKGFmdGVyTXMgLSBiZWZvcmVNcykuc2hvdWxkLmJlLmFib3ZlKGltcGxpY2l0V2FpdCk7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCByZXNwZWN0IGltcGxpY2l0IHdhaXQgd2l0aCBhIHNpbmdsZSBlbGVtZW50JywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGJlZm9yZU1zID0gRGF0ZS5ub3coKTtcbiAgICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAndGhlcmVfaXNfbm90aGluZ19jYWxsZWRfdGhpcycsIGZhbHNlKVxuICAgICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9jb3VsZCBub3QgYmUgbG9jYXRlZC8pO1xuICAgICAgbGV0IGFmdGVyTXMgPSBEYXRlLm5vdygpO1xuICAgICAgKGFmdGVyTXMgLSBiZWZvcmVNcykuc2hvdWxkLmJlLmJlbG93KGltcGxpY2l0V2FpdCArIDUwMDApO1xuICAgICAgKGFmdGVyTXMgLSBiZWZvcmVNcykuc2hvdWxkLmJlLmFib3ZlKGltcGxpY2l0V2FpdCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=