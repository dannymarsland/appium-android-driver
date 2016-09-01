'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _asyncbox = require('asyncbox');

var _ = require('../../../..');

var _sampleApps = require('sample-apps');

var _sampleApps2 = _interopRequireDefault(_sampleApps);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var caps = {
  app: (0, _sampleApps2['default'])('gpsDemo-debug'),
  deviceName: 'Android',
  platformName: 'Android'
};

describe.skip("geo-location", function () {
  var _this = this;

  before(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          driver = new _.AndroidDriver();
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

  it('should set geo location @skip-ci', function callee$1$0() {
    var getText, latitude, longitude, text;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this2 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getText = function getText() {
            var els;
            return _regeneratorRuntime.async(function getText$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

                case 2:
                  els = context$3$0.sent;
                  context$3$0.next = 5;
                  return _regeneratorRuntime.awrap(driver.getText(els[1].ELEMENT));

                case 5:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 6:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          };

          latitude = '27.17';
          longitude = '78.04';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(getText());

        case 5:
          text = context$2$0.sent;

          text.should.not.include('Latitude: ' + latitude);
          text.should.not.include('Longitude: ' + longitude);

          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.setGeoLocation({ latitude: latitude, longitude: longitude }));

        case 10:
          context$2$0.next = 12;
          return _regeneratorRuntime.awrap((0, _asyncbox.retryInterval)(6, 1000, function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(getText());

                case 2:
                  context$3$0.t0 = context$3$0.sent;

                  if (!(context$3$0.t0 === 'GPS Tutorial')) {
                    context$3$0.next = 5;
                    break;
                  }

                  throw new Error('Location not set yet. Retry.');

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          }));

        case 12:
          context$2$0.next = 14;
          return _regeneratorRuntime.awrap(getText());

        case 14:
          text = context$2$0.sent;

          text.should.include('Latitude: ' + latitude);
          text.should.include('Longitude: ' + longitude);

        case 17:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});

// wait for the text to change
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9nZW8tbG9jYXRpb24tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7d0JBQ2YsVUFBVTs7Z0JBQ1YsYUFBYTs7MEJBQ3BCLGFBQWE7Ozs7QUFHcEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxJQUFJLEdBQUc7QUFDVCxLQUFHLEVBQUUsNkJBQVcsZUFBZSxDQUFDO0FBQ2hDLFlBQVUsRUFBRSxTQUFTO0FBQ3JCLGNBQVksRUFBRSxTQUFTO0NBQ3hCLENBQUM7O0FBRUYsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsWUFBWTs7O0FBQ3hDLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcscUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQzs7Ozs7OztHQUNqQyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDOztBQUVILElBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtRQUNqQyxPQUFPLEVBS1AsUUFBUSxFQUNSLFNBQVMsRUFFVCxJQUFJOzs7Ozs7QUFSSixpQkFBTyxHQUFHLFNBQVYsT0FBTztnQkFDTCxHQUFHOzs7OzttREFBUyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxJQUFJLENBQUM7OztBQUE3RSxxQkFBRzs7bURBQ00sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDOzs7Ozs7Ozs7O1dBQzVDOztBQUVHLGtCQUFRLEdBQUcsT0FBTztBQUNsQixtQkFBUyxHQUFHLE9BQU87OzJDQUVOLE9BQU8sRUFBRTs7O0FBQXRCLGNBQUk7O0FBQ1IsY0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxnQkFBYyxRQUFRLENBQUcsQ0FBQztBQUNqRCxjQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLGlCQUFlLFNBQVMsQ0FBRyxDQUFDOzs7MkNBRTdDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBQyxRQUFRLEVBQVIsUUFBUSxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUMsQ0FBQzs7OzsyQ0FHNUMsNkJBQWMsQ0FBQyxFQUFFLElBQUksRUFBRTs7Ozs7bURBQ2pCLE9BQU8sRUFBRTs7Ozs7MkNBQUssY0FBYzs7Ozs7d0JBQzlCLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDOzs7Ozs7O1dBRWxELENBQUM7Ozs7MkNBRVcsT0FBTyxFQUFFOzs7QUFBdEIsY0FBSTs7QUFDSixjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sZ0JBQWMsUUFBUSxDQUFHLENBQUM7QUFDN0MsY0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLGlCQUFlLFNBQVMsQ0FBRyxDQUFDOzs7Ozs7O0dBQ2hELENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZ2VvLWxvY2F0aW9uLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IHsgcmV0cnlJbnRlcnZhbCB9IGZyb20gJ2FzeW5jYm94JztcbmltcG9ydCB7IEFuZHJvaWREcml2ZXIgfSBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgc2FtcGxlQXBwcyBmcm9tICdzYW1wbGUtYXBwcyc7XG5cblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGRyaXZlcjtcbmxldCBjYXBzID0ge1xuICBhcHA6IHNhbXBsZUFwcHMoJ2dwc0RlbW8tZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJ1xufTtcblxuZGVzY3JpYmUuc2tpcChcImdlby1sb2NhdGlvblwiLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihjYXBzKTtcbiAgfSk7XG4gIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHNldCBnZW8gbG9jYXRpb24gQHNraXAtY2knLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGdldFRleHQgPSBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgZWxzID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3JywgdHJ1ZSk7XG4gICAgICByZXR1cm4gYXdhaXQgZHJpdmVyLmdldFRleHQoZWxzWzFdLkVMRU1FTlQpO1xuICAgIH07XG5cbiAgICBsZXQgbGF0aXR1ZGUgPSAnMjcuMTcnO1xuICAgIGxldCBsb25naXR1ZGUgPSAnNzguMDQnO1xuXG4gICAgbGV0IHRleHQgPSBhd2FpdCBnZXRUZXh0KCk7XG4gICAgdGV4dC5zaG91bGQubm90LmluY2x1ZGUoYExhdGl0dWRlOiAke2xhdGl0dWRlfWApO1xuICAgIHRleHQuc2hvdWxkLm5vdC5pbmNsdWRlKGBMb25naXR1ZGU6ICR7bG9uZ2l0dWRlfWApO1xuXG4gICAgYXdhaXQgZHJpdmVyLnNldEdlb0xvY2F0aW9uKHtsYXRpdHVkZSwgbG9uZ2l0dWRlfSk7XG5cbiAgICAvLyB3YWl0IGZvciB0aGUgdGV4dCB0byBjaGFuZ2VcbiAgICBhd2FpdCByZXRyeUludGVydmFsKDYsIDEwMDAsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmIChhd2FpdCBnZXRUZXh0KCkgPT09ICdHUFMgVHV0b3JpYWwnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTG9jYXRpb24gbm90IHNldCB5ZXQuIFJldHJ5LicpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGV4dCA9IGF3YWl0IGdldFRleHQoKTtcbiAgICB0ZXh0LnNob3VsZC5pbmNsdWRlKGBMYXRpdHVkZTogJHtsYXRpdHVkZX1gKTtcbiAgICB0ZXh0LnNob3VsZC5pbmNsdWRlKGBMb25naXR1ZGU6ICR7bG9uZ2l0dWRlfWApO1xuICB9KTtcbn0pO1xuIl19