'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

var _sampleApps = require('sample-apps');

var _sampleApps2 = _interopRequireDefault(_sampleApps);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  deviceName: 'Android',
  platformName: 'Android',
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.TextFields'
};

describe('actions', function () {
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

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

  describe('replaceValue', function () {
    var _this2 = this;

    it('should replace existing value in a text field', function callee$2$0() {
      var el;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.t0 = _lodash2['default'];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.EditText', true));

          case 3:
            context$3$0.t1 = context$3$0.sent;
            el = context$3$0.t0.last.call(context$3$0.t0, context$3$0.t1);

            el.should.exist;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.setValue('original value', el.ELEMENT));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('original value'));

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(driver.replaceValue('replaced value', el.ELEMENT));

          case 12:
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('replaced value'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });

  describe('key codes', function () {
    var _this3 = this;

    beforeEach(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.startActivity(caps.appPackage, caps.appActivity));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });

    it('should press key code 3 without metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.pressKeyCode(3).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should press key code 3 with metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.pressKeyCode(3, 193).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should long press key code 3 without metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.longPressKeyCode(3).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should long press key code 3 with metastate', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.longPressKeyCode(3, 193).should.not.be.rejected);

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9hY3Rpb25zLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7aUJBQ25CLFVBQVU7Ozs7MEJBQ2IsYUFBYTs7OztzQkFDdEIsUUFBUTs7OztBQUd0QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLElBQUksR0FBRztBQUNULEtBQUcsRUFBRSw2QkFBVyxnQkFBZ0IsQ0FBQztBQUNqQyxZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztBQUN2QixZQUFVLEVBQUUsd0JBQXdCO0FBQ3BDLGFBQVcsRUFBRSxrQkFBa0I7Q0FDaEMsQ0FBQzs7QUFHRixRQUFRLENBQUMsU0FBUyxFQUFFLFlBQU07QUFDeEIsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLGNBQWMsRUFBRSxZQUFZOzs7QUFDbkMsTUFBRSxDQUFDLCtDQUErQyxFQUFFO1VBQzlDLEVBQUU7Ozs7Ozs2Q0FBZ0IsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxDQUFDOzs7O0FBQW5GLGNBQUUsa0JBQUssSUFBSTs7QUFDZixjQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7NkNBQ1YsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDOzs7OzZDQUM3QyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs2Q0FFcEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDOzs7OzZDQUNqRCxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzs7Ozs7OztLQUMzRSxDQUFDLENBQUM7R0FDSixDQUFDLENBQUM7O0FBRUgsVUFBUSxDQUFDLFdBQVcsRUFBRSxZQUFZOzs7QUFDaEMsY0FBVSxDQUFDOzs7Ozs2Q0FDSCxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztLQUM5RCxDQUFDLENBQUM7O0FBRUgsTUFBRSxDQUFDLDJDQUEyQyxFQUFFOzs7Ozs2Q0FDeEMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0tBQ3BELENBQUMsQ0FBQztBQUNILE1BQUUsQ0FBQyx3Q0FBd0MsRUFBRTs7Ozs7NkNBQ3JDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVE7Ozs7Ozs7S0FDekQsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLGdEQUFnRCxFQUFFOzs7Ozs2Q0FDN0MsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLFFBQVE7Ozs7Ozs7S0FDeEQsQ0FBQyxDQUFDO0FBQ0gsTUFBRSxDQUFDLDZDQUE2QyxFQUFFOzs7Ozs2Q0FDMUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxRQUFROzs7Ozs7O0tBQzdELENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvYWN0aW9ucy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCBzYW1wbGVBcHBzIGZyb20gJ3NhbXBsZS1hcHBzJztcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGRyaXZlcjtcbmxldCBjYXBzID0ge1xuICBhcHA6IHNhbXBsZUFwcHMoJ0FwaURlbW9zLWRlYnVnJyksXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcbiAgcGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsXG4gIGFwcFBhY2thZ2U6ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJyxcbiAgYXBwQWN0aXZpdHk6ICcudmlldy5UZXh0RmllbGRzJ1xufTtcblxuXG5kZXNjcmliZSgnYWN0aW9ucycsICgpID0+IHtcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdyZXBsYWNlVmFsdWUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCByZXBsYWNlIGV4aXN0aW5nIHZhbHVlIGluIGEgdGV4dCBmaWVsZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBlbCA9IF8ubGFzdChhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJ2NsYXNzIG5hbWUnLCAnYW5kcm9pZC53aWRnZXQuRWRpdFRleHQnLCB0cnVlKSk7XG4gICAgICBlbC5zaG91bGQuZXhpc3Q7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0VmFsdWUoJ29yaWdpbmFsIHZhbHVlJywgZWwuRUxFTUVOVCk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnb3JpZ2luYWwgdmFsdWUnKTtcblxuICAgICAgYXdhaXQgZHJpdmVyLnJlcGxhY2VWYWx1ZSgncmVwbGFjZWQgdmFsdWUnLCBlbC5FTEVNRU5UKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdyZXBsYWNlZCB2YWx1ZScpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgna2V5IGNvZGVzJywgZnVuY3Rpb24gKCkge1xuICAgIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoY2Fwcy5hcHBQYWNrYWdlLCBjYXBzLmFwcEFjdGl2aXR5KTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcHJlc3Mga2V5IGNvZGUgMyB3aXRob3V0IG1ldGFzdGF0ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5wcmVzc0tleUNvZGUoMykuc2hvdWxkLm5vdC5iZS5yZWplY3RlZDtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIHByZXNzIGtleSBjb2RlIDMgd2l0aCBtZXRhc3RhdGUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIucHJlc3NLZXlDb2RlKDMsIDE5Mykuc2hvdWxkLm5vdC5iZS5yZWplY3RlZDtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGxvbmcgcHJlc3Mga2V5IGNvZGUgMyB3aXRob3V0IG1ldGFzdGF0ZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5sb25nUHJlc3NLZXlDb2RlKDMpLnNob3VsZC5ub3QuYmUucmVqZWN0ZWQ7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBsb25nIHByZXNzIGtleSBjb2RlIDMgd2l0aCBtZXRhc3RhdGUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIubG9uZ1ByZXNzS2V5Q29kZSgzLCAxOTMpLnNob3VsZC5ub3QuYmUucmVqZWN0ZWQ7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=