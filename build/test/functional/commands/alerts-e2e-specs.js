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
  platformName: 'Android'
};

describe('Commands', function () {
  var _this = this;

  before(function () {
    driver = new _2['default']();
  });
  afterEach(function callee$1$0() {
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
  describe('Alerts', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this2 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          it('should throw a notYetImplemented error for alert methods', function callee$2$0() {
            return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.createSession(defaultCaps));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(driver.getAlertText().should.eventually.be.rejectedWith(/implemented/));

                case 4:
                  context$3$0.next = 6;
                  return _regeneratorRuntime.awrap(driver.setAlertText('new text').should.eventually.be.rejectedWith(/implemented/));

                case 6:
                  context$3$0.next = 8;
                  return _regeneratorRuntime.awrap(driver.postAcceptAlert().should.eventually.be.rejectedWith(/implemented/));

                case 8:
                  context$3$0.next = 10;
                  return _regeneratorRuntime.awrap(driver.postDismissAlert().should.eventually.be.rejectedWith(/implemented/));

                case 10:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this2);
          });

        case 1:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9hbGVydHMtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLFVBQVU7Ozs7MEJBQ2IsYUFBYTs7OztBQUVwQyxrQkFBSyxNQUFNLEVBQUUsQ0FBQztBQUNkLGtCQUFLLEdBQUcsNkJBQWdCLENBQUM7O0FBRXpCLElBQUksTUFBTSxZQUFBLENBQUM7QUFDWCxJQUFJLFdBQVcsR0FBRztBQUNoQixLQUFHLEVBQUUsNkJBQVcsZ0JBQWdCLENBQUM7QUFDakMsWUFBVSxFQUFFLFNBQVM7QUFDckIsY0FBWSxFQUFFLFNBQVM7Q0FDeEIsQ0FBQzs7QUFFRixRQUFRLENBQUMsVUFBVSxFQUFFLFlBQVk7OztBQUMvQixRQUFNLENBQUMsWUFBTTtBQUNYLFVBQU0sR0FBRyxtQkFBbUIsQ0FBQztHQUM5QixDQUFDLENBQUM7QUFDSCxXQUFTLENBQUM7Ozs7OzJDQUNGLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsVUFBUSxDQUFDLFFBQVEsRUFBRTs7Ozs7O0FBQ2pCLFlBQUUsQ0FBQywwREFBMEQsRUFBRTs7Ozs7bURBQ3ZELE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7O21EQUNqQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzs7OzttREFDdEUsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDOzs7O21EQUNoRixNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzs7OzttREFDekUsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQzs7Ozs7OztXQUNqRixDQUFDLENBQUM7Ozs7Ozs7R0FDSixDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL2FsZXJ0cy1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCBzYW1wbGVBcHBzIGZyb20gJ3NhbXBsZS1hcHBzJztcblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGRyaXZlcjtcbmxldCBkZWZhdWx0Q2FwcyA9IHtcbiAgYXBwOiBzYW1wbGVBcHBzKCdBcGlEZW1vcy1kZWJ1ZycpLFxuICBkZXZpY2VOYW1lOiAnQW5kcm9pZCcsXG4gIHBsYXRmb3JtTmFtZTogJ0FuZHJvaWQnXG59O1xuXG5kZXNjcmliZSgnQ29tbWFuZHMnLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZSgoKSA9PiB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgfSk7XG4gIGFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdBbGVydHMnLCBhc3luYyAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCB0aHJvdyBhIG5vdFlldEltcGxlbWVudGVkIGVycm9yIGZvciBhbGVydCBtZXRob2RzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldEFsZXJ0VGV4dCgpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvaW1wbGVtZW50ZWQvKTtcbiAgICAgIGF3YWl0IGRyaXZlci5zZXRBbGVydFRleHQoJ25ldyB0ZXh0Jykuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9pbXBsZW1lbnRlZC8pO1xuICAgICAgYXdhaXQgZHJpdmVyLnBvc3RBY2NlcHRBbGVydCgpLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvaW1wbGVtZW50ZWQvKTtcbiAgICAgIGF3YWl0IGRyaXZlci5wb3N0RGlzbWlzc0FsZXJ0KCkuc2hvdWxkLmV2ZW50dWFsbHkuYmUucmVqZWN0ZWRXaXRoKC9pbXBsZW1lbnRlZC8pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19