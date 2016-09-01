'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

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
  appActivity: '.view.TextFields'
};

describe('element', function () {
  var _this = this;

  var el = undefined;
  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _3['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(caps));

        case 3:
          context$2$0.t0 = _lodash2['default'];
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.EditText', true));

        case 6:
          context$2$0.t1 = context$2$0.sent;
          el = context$2$0.t0.last.call(context$2$0.t0, context$2$0.t1);

          el.should.exist;

        case 9:
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
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.clear(el.ELEMENT));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });

  describe('setValueImmediate', function () {
    it('should set the text on the element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setValueImmediate('original value', el.ELEMENT));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('original value'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
  describe('setValue', function () {
    it('should set the text on the element', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.setValue('original value', el.ELEMENT));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('original value'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9lbGVtZW50LWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2lCQUNuQixVQUFVOzs7OzBCQUNiLGFBQWE7Ozs7c0JBQ3RCLFFBQVE7Ozs7QUFHdEIsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUc7QUFDVCxLQUFHLEVBQUUsNkJBQVcsZ0JBQWdCLENBQUM7QUFDakMsWUFBVSxFQUFFLFNBQVM7QUFDckIsY0FBWSxFQUFFLFNBQVM7QUFDdkIsYUFBVyxFQUFFLGtCQUFrQjtDQUNoQyxDQUFDOztBQUVGLFFBQVEsQ0FBQyxTQUFTLEVBQUUsWUFBWTs7O0FBQzlCLE1BQUksRUFBRSxZQUFBLENBQUM7QUFDUCxRQUFNLENBQUM7Ozs7QUFDTCxnQkFBTSxHQUFHLG1CQUFtQixDQUFDOzsyQ0FDdkIsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7Ozs7OzJDQUNkLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLHlCQUF5QixFQUFFLElBQUksQ0FBQzs7OztBQUFuRixZQUFFLGtCQUFLLElBQUk7O0FBQ1gsWUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7R0FDakIsQ0FBQyxDQUFDO0FBQ0gsT0FBSyxDQUFDOzs7OzsyQ0FDRSxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7O0dBQzdCLENBQUMsQ0FBQztBQUNILFdBQVMsQ0FBQzs7Ozs7MkNBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0dBQy9CLENBQUMsQ0FBQzs7QUFFSCxVQUFRLENBQUMsbUJBQW1CLEVBQUUsWUFBTTtBQUNsQyxNQUFFLENBQUMsb0NBQW9DLEVBQUU7Ozs7OzZDQUNqQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7Ozs2Q0FDdEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Ozs7Ozs7S0FDM0UsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLFVBQVUsRUFBRSxZQUFNO0FBQ3pCLE1BQUUsQ0FBQyxvQ0FBb0MsRUFBRTs7Ozs7NkNBQ2pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7Ozs2Q0FDN0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Ozs7Ozs7S0FDM0UsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9lbGVtZW50LWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcblxuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xubGV0IGNhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJyxcbiAgYXBwQWN0aXZpdHk6ICcudmlldy5UZXh0RmllbGRzJ1xufTtcblxuZGVzY3JpYmUoJ2VsZW1lbnQnLCBmdW5jdGlvbiAoKSB7XG4gIGxldCBlbDtcbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGNhcHMpO1xuICAgIGVsID0gXy5sYXN0KGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5FZGl0VGV4dCcsIHRydWUpKTtcbiAgICBlbC5zaG91bGQuZXhpc3Q7XG4gIH0pO1xuICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG4gIGFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmNsZWFyKGVsLkVMRU1FTlQpO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2V0VmFsdWVJbW1lZGlhdGUnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBzZXQgdGhlIHRleHQgb24gdGhlIGVsZW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuc2V0VmFsdWVJbW1lZGlhdGUoJ29yaWdpbmFsIHZhbHVlJywgZWwuRUxFTUVOVCk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnb3JpZ2luYWwgdmFsdWUnKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdzZXRWYWx1ZScsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHNldCB0aGUgdGV4dCBvbiB0aGUgZWxlbWVudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRWYWx1ZSgnb3JpZ2luYWwgdmFsdWUnLCBlbC5FTEVNRU5UKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdvcmlnaW5hbCB2YWx1ZScpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19