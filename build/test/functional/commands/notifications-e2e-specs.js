'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _sampleApps = require('sample-apps');

var _sampleApps2 = _interopRequireDefault(_sampleApps);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  deviceName: 'Android',
  platformName: 'Android',
  appActivity: '.app.StatusBarNotifications'
};

describe('apidemo - notifications', function () {
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

  it('should open the notification shade @skip-ci', function callee$1$0() {
    var el, textViews, text, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, view;

    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', ':-|', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.click(el.ELEMENT));

        case 5:
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(1000));

        case 7:
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.openNotifications());

        case 9:
          context$2$0.next = 11;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

        case 11:
          textViews = context$2$0.sent;
          text = [];
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 16;
          _iterator = _getIterator(textViews);

        case 18:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 28;
            break;
          }

          view = _step.value;
          context$2$0.t0 = text;
          context$2$0.next = 23;
          return _regeneratorRuntime.awrap(driver.getText(view.ELEMENT));

        case 23:
          context$2$0.t1 = context$2$0.sent;
          context$2$0.t0.push.call(context$2$0.t0, context$2$0.t1);

        case 25:
          _iteratorNormalCompletion = true;
          context$2$0.next = 18;
          break;

        case 28:
          context$2$0.next = 34;
          break;

        case 30:
          context$2$0.prev = 30;
          context$2$0.t2 = context$2$0['catch'](16);
          _didIteratorError = true;
          _iteratorError = context$2$0.t2;

        case 34:
          context$2$0.prev = 34;
          context$2$0.prev = 35;

          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }

        case 37:
          context$2$0.prev = 37;

          if (!_didIteratorError) {
            context$2$0.next = 40;
            break;
          }

          throw _iteratorError;

        case 40:
          return context$2$0.finish(37);

        case 41:
          return context$2$0.finish(34);

        case 42:
          text.should.include('Mood ring');

          // go back to the app
          context$2$0.next = 45;
          return _regeneratorRuntime.awrap(driver.keyevent(4));

        case 45:
          context$2$0.next = 47;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.become(':-|'));

        case 47:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this, [[16, 30, 34, 42], [35,, 37, 41]]);
  });
});

// give the app a second to catch up before opening notifications
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9ub3RpZmljYXRpb25zLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLFVBQVU7Ozs7MEJBQ2IsYUFBYTs7Ozt3QkFDdEIsVUFBVTs7OztBQUV4QixrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLFdBQVcsR0FBRztBQUNoQixLQUFHLEVBQUUsNkJBQVcsZ0JBQWdCLENBQUM7QUFDakMsWUFBVSxFQUFFLFNBQVM7QUFDckIsY0FBWSxFQUFFLFNBQVM7QUFDdkIsYUFBVyxFQUFFLDZCQUE2QjtDQUMzQyxDQUFDOztBQUVGLFFBQVEsQ0FBQyx5QkFBeUIsRUFBRSxZQUFZOzs7QUFDOUMsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQ3hDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7O0FBRUgsSUFBRSxDQUFDLDZDQUE2QyxFQUFFO1FBQzVDLEVBQUUsRUFPRixTQUFTLEVBQ1QsSUFBSSxrRkFDQyxJQUFJOzs7Ozs7MkNBVEUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDOzs7QUFBL0QsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDOzs7OzJDQUd4QixzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzJDQUNiLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTs7OzsyQ0FFVixNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxJQUFJLENBQUM7OztBQUFuRixtQkFBUztBQUNULGNBQUksR0FBRyxFQUFFOzs7OzttQ0FDSSxTQUFTOzs7Ozs7OztBQUFqQixjQUFJOzJCQUNYLElBQUk7OzJDQUFZLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Ozt5QkFBdkMsSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRVgsY0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7MkNBRzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7OzJDQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztHQUN0RCxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL25vdGlmaWNhdGlvbnMtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLic7XG5pbXBvcnQgc2FtcGxlQXBwcyBmcm9tICdzYW1wbGUtYXBwcyc7XG5pbXBvcnQgQiBmcm9tICdibHVlYmlyZCc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJyxcbiAgYXBwQWN0aXZpdHk6ICcuYXBwLlN0YXR1c0Jhck5vdGlmaWNhdGlvbnMnXG59O1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIG5vdGlmaWNhdGlvbnMnLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBvcGVuIHRoZSBub3RpZmljYXRpb24gc2hhZGUgQHNraXAtY2knLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdhY2Nlc3NpYmlsaXR5IGlkJywgJzotfCcsIGZhbHNlKTtcbiAgICBhd2FpdCBkcml2ZXIuY2xpY2soZWwuRUxFTUVOVCk7XG5cbiAgICAvLyBnaXZlIHRoZSBhcHAgYSBzZWNvbmQgdG8gY2F0Y2ggdXAgYmVmb3JlIG9wZW5pbmcgbm90aWZpY2F0aW9uc1xuICAgIGF3YWl0IEIuZGVsYXkoMTAwMCk7XG4gICAgYXdhaXQgZHJpdmVyLm9wZW5Ob3RpZmljYXRpb25zKCk7XG5cbiAgICBsZXQgdGV4dFZpZXdzID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3JywgdHJ1ZSk7XG4gICAgbGV0IHRleHQgPSBbXTtcbiAgICBmb3IgKGxldCB2aWV3IG9mIHRleHRWaWV3cykge1xuICAgICAgdGV4dC5wdXNoKGF3YWl0IGRyaXZlci5nZXRUZXh0KHZpZXcuRUxFTUVOVCkpO1xuICAgIH1cbiAgICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdNb29kIHJpbmcnKTtcblxuICAgIC8vIGdvIGJhY2sgdG8gdGhlIGFwcFxuICAgIGF3YWl0IGRyaXZlci5rZXlldmVudCg0KTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuYmVjb21lKCc6LXwnKTtcbiAgfSk7XG59KTtcbiJdfQ==