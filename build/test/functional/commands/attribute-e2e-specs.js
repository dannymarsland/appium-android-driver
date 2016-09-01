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
var animationEl = undefined;
var defaultCaps = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  deviceName: 'Android',
  platformName: 'Android'
};

describe('apidemo - attributes', function () {
  var _this = this;

  before(function callee$1$0() {
    var animation;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _2['default']();
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('accessibility id', 'Animation', false));

        case 5:
          animation = context$2$0.sent;

          animationEl = animation.ELEMENT;

        case 7:
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
  it('should be able to find resourceId attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('resourceId', animationEl).should.eventually.become('android:id/text1'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find text attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('text', animationEl).should.eventually.become('Animation'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find name attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('name', animationEl).should.eventually.become('Animation'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find name attribute, falling back to text', function callee$1$0() {
    var textView, textViewEl;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.click(animationEl));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

        case 4:
          textView = context$2$0.sent;
          textViewEl = textView[1].ELEMENT;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getAttribute('name', textViewEl).should.eventually.become('Bouncing Balls'));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.back());

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find content description attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('contentDescription', animationEl).should.eventually.become("Animation"));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find displayed attribute', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getAttribute('displayed', animationEl).should.eventually.become('true'));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to find displayed attribute through normal func', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.elementDisplayed(animationEl).should.eventually.become(true));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to get element location using getLocation', function callee$1$0() {
    var location;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getLocation(animationEl));

        case 2:
          location = context$2$0.sent;

          location.x.should.be.at.least(0);
          location.y.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to get element location using getLocationInView', function callee$1$0() {
    var location;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getLocationInView(animationEl));

        case 2:
          location = context$2$0.sent;

          location.x.should.be.at.least(0);
          location.y.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should be able to get element size', function callee$1$0() {
    var size;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getSize(animationEl));

        case 2:
          size = context$2$0.sent;

          size.width.should.be.at.least(0);
          size.height.should.be.at.least(0);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9hdHRyaWJ1dGUtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLFVBQVU7Ozs7MEJBQ2IsYUFBYTs7OztBQUVwQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLFdBQVcsWUFBQSxDQUFDO0FBQ2hCLElBQUksV0FBVyxHQUFHO0FBQ2hCLEtBQUcsRUFBRSw2QkFBVyxnQkFBZ0IsQ0FBQztBQUNqQyxZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztDQUN4QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxZQUFZOzs7QUFDM0MsUUFBTSxDQUFDO1FBR0QsU0FBUzs7OztBQUZiLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs7OzsyQ0FDakIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxXQUFXLEVBQUUsS0FBSyxDQUFDOzs7QUFBNUUsbUJBQVM7O0FBQ2IscUJBQVcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0dBQ2pDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsNkNBQTZDLEVBQUU7Ozs7OzJDQUMxQyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzs7Ozs7OztHQUNsRyxDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsdUNBQXVDLEVBQUU7Ozs7OzJDQUNwQyxNQUFN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QUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztHQUNuQyxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2F0dHJpYnV0ZS1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCBzYW1wbGVBcHBzIGZyb20gJ3NhbXBsZS1hcHBzJztcblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGRyaXZlcjtcbmxldCBhbmltYXRpb25FbDtcbmxldCBkZWZhdWx0Q2FwcyA9IHtcbiAgYXBwOiBzYW1wbGVBcHBzKCdBcGlEZW1vcy1kZWJ1ZycpLFxuICBkZXZpY2VOYW1lOiAnQW5kcm9pZCcsXG4gIHBsYXRmb3JtTmFtZTogJ0FuZHJvaWQnXG59O1xuXG5kZXNjcmliZSgnYXBpZGVtbyAtIGF0dHJpYnV0ZXMnLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gICAgbGV0IGFuaW1hdGlvbiA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnYWNjZXNzaWJpbGl0eSBpZCcsICdBbmltYXRpb24nLCBmYWxzZSk7XG4gICAgYW5pbWF0aW9uRWwgPSBhbmltYXRpb24uRUxFTUVOVDtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgcmVzb3VyY2VJZCBhdHRyaWJ1dGUnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmdldEF0dHJpYnV0ZSgncmVzb3VyY2VJZCcsIGFuaW1hdGlvbkVsKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ2FuZHJvaWQ6aWQvdGV4dDEnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIHRleHQgYXR0cmlidXRlJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5nZXRBdHRyaWJ1dGUoJ3RleHQnLCBhbmltYXRpb25FbCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCdBbmltYXRpb24nKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIG5hbWUgYXR0cmlidXRlJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5nZXRBdHRyaWJ1dGUoJ25hbWUnLCBhbmltYXRpb25FbCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCdBbmltYXRpb24nKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBmaW5kIG5hbWUgYXR0cmlidXRlLCBmYWxsaW5nIGJhY2sgdG8gdGV4dCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuY2xpY2soYW5pbWF0aW9uRWwpO1xuICAgIGxldCB0ZXh0VmlldyA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5UZXh0VmlldycsIHRydWUpO1xuICAgIGxldCB0ZXh0Vmlld0VsID0gdGV4dFZpZXdbMV0uRUxFTUVOVDtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QXR0cmlidXRlKCduYW1lJywgdGV4dFZpZXdFbCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCdCb3VuY2luZyBCYWxscycpO1xuICAgIGF3YWl0IGRyaXZlci5iYWNrKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZmluZCBjb250ZW50IGRlc2NyaXB0aW9uIGF0dHJpYnV0ZScsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QXR0cmlidXRlKCdjb250ZW50RGVzY3JpcHRpb24nLCBhbmltYXRpb25FbCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKFwiQW5pbWF0aW9uXCIpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGZpbmQgZGlzcGxheWVkIGF0dHJpYnV0ZScsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0QXR0cmlidXRlKCdkaXNwbGF5ZWQnLCBhbmltYXRpb25FbCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCd0cnVlJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZmluZCBkaXNwbGF5ZWQgYXR0cmlidXRlIHRocm91Z2ggbm9ybWFsIGZ1bmMnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmVsZW1lbnREaXNwbGF5ZWQoYW5pbWF0aW9uRWwpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSh0cnVlKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYmUgYWJsZSB0byBnZXQgZWxlbWVudCBsb2NhdGlvbiB1c2luZyBnZXRMb2NhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgbG9jYXRpb24gPSBhd2FpdCBkcml2ZXIuZ2V0TG9jYXRpb24oYW5pbWF0aW9uRWwpO1xuICAgIGxvY2F0aW9uLnguc2hvdWxkLmJlLmF0LmxlYXN0KDApO1xuICAgIGxvY2F0aW9uLnkuc2hvdWxkLmJlLmF0LmxlYXN0KDApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIGdldCBlbGVtZW50IGxvY2F0aW9uIHVzaW5nIGdldExvY2F0aW9uSW5WaWV3JywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBsb2NhdGlvbiA9IGF3YWl0IGRyaXZlci5nZXRMb2NhdGlvbkluVmlldyhhbmltYXRpb25FbCk7XG4gICAgbG9jYXRpb24ueC5zaG91bGQuYmUuYXQubGVhc3QoMCk7XG4gICAgbG9jYXRpb24ueS5zaG91bGQuYmUuYXQubGVhc3QoMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gZ2V0IGVsZW1lbnQgc2l6ZScsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgc2l6ZSA9IGF3YWl0IGRyaXZlci5nZXRTaXplKGFuaW1hdGlvbkVsKTtcbiAgICBzaXplLndpZHRoLnNob3VsZC5iZS5hdC5sZWFzdCgwKTtcbiAgICBzaXplLmhlaWdodC5zaG91bGQuYmUuYXQubGVhc3QoMCk7XG4gIH0pO1xufSk7XG4iXX0=