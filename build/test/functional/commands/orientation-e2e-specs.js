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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  deviceName: 'Android',
  platformName: 'Android'
};

describe('apidemo - orientation', function () {
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
  it('should rotate screen to landscape', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.setOrientation('LANDSCAPE'));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.become('LANDSCAPE'));

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should rotate screen to landscape', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.setOrientation('LANDSCAPE'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.become('PORTRAIT'));

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not error when trying to rotate to portrait again', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

        case 2:
          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

        case 4:
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.setOrientation('PORTRAIT'));

        case 6:
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(_bluebird2['default'].delay(3000));

        case 8:
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.getOrientation().should.eventually.become('PORTRAIT'));

        case 10:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9vcmllbnRhdGlvbi1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsVUFBVTs7OzswQkFDYixhQUFhOzs7O3dCQUN0QixVQUFVOzs7O0FBRXhCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksV0FBVyxHQUFHO0FBQ2hCLEtBQUcsRUFBRSw2QkFBVyxnQkFBZ0IsQ0FBQztBQUNqQyxZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztDQUN4QixDQUFDOztBQUVGLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxZQUFZOzs7QUFDNUMsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQ3hDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsbUNBQW1DLEVBQUU7Ozs7OzJDQUNoQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQzs7OzsyQ0FDakMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7OzsyQ0FDYixNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQzs7OzsyQ0FDbEMsc0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQzs7OzsyQ0FDYixNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQ3BFLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxtQ0FBbUMsRUFBRTs7Ozs7MkNBQ2hDLE1BQU0sQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDOzs7OzJDQUNsQyxzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzJDQUNiLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDOzs7OzJDQUNqQyxzQkFBRSxLQUFLLENBQUMsSUFBSSxDQUFDOzs7OzJDQUNiLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7R0FDbkUsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDBEQUEwRCxFQUFFOzs7OzsyQ0FDdkQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7Ozs7MkNBQ2pDLHNCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQ2IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUM7Ozs7MkNBQ2pDLHNCQUFFLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs7MkNBQ2IsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQzs7Ozs7OztHQUNuRSxDQUFDLENBQUM7Q0FDSixDQUFDLENBQUMiLCJmaWxlIjoidGVzdC9mdW5jdGlvbmFsL2NvbW1hbmRzL29yaWVudGF0aW9uLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5sZXQgZHJpdmVyO1xubGV0IGRlZmF1bHRDYXBzID0ge1xuICBhcHA6IHNhbXBsZUFwcHMoJ0FwaURlbW9zLWRlYnVnJyksXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcbiAgcGxhdGZvcm1OYW1lOiAnQW5kcm9pZCdcbn07XG5cbmRlc2NyaWJlKCdhcGlkZW1vIC0gb3JpZW50YXRpb24nLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgcm90YXRlIHNjcmVlbiB0byBsYW5kc2NhcGUnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdQT1JUUkFJVCcpO1xuICAgIGF3YWl0IEIuZGVsYXkoMzAwMCk7XG4gICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdMQU5EU0NBUEUnKTtcbiAgICBhd2FpdCBCLmRlbGF5KDMwMDApO1xuICAgIGF3YWl0IGRyaXZlci5nZXRPcmllbnRhdGlvbigpLnNob3VsZC5ldmVudHVhbGx5LmJlY29tZSgnTEFORFNDQVBFJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJvdGF0ZSBzY3JlZW4gdG8gbGFuZHNjYXBlJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5zZXRPcmllbnRhdGlvbignTEFORFNDQVBFJyk7XG4gICAgYXdhaXQgQi5kZWxheSgzMDAwKTtcbiAgICBhd2FpdCBkcml2ZXIuc2V0T3JpZW50YXRpb24oJ1BPUlRSQUlUJyk7XG4gICAgYXdhaXQgQi5kZWxheSgzMDAwKTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0T3JpZW50YXRpb24oKS5zaG91bGQuZXZlbnR1YWxseS5iZWNvbWUoJ1BPUlRSQUlUJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIG5vdCBlcnJvciB3aGVuIHRyeWluZyB0byByb3RhdGUgdG8gcG9ydHJhaXQgYWdhaW4nLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdQT1JUUkFJVCcpO1xuICAgIGF3YWl0IEIuZGVsYXkoMzAwMCk7XG4gICAgYXdhaXQgZHJpdmVyLnNldE9yaWVudGF0aW9uKCdQT1JUUkFJVCcpO1xuICAgIGF3YWl0IEIuZGVsYXkoMzAwMCk7XG4gICAgYXdhaXQgZHJpdmVyLmdldE9yaWVudGF0aW9uKCkuc2hvdWxkLmV2ZW50dWFsbHkuYmVjb21lKCdQT1JUUkFJVCcpO1xuICB9KTtcbn0pO1xuIl19