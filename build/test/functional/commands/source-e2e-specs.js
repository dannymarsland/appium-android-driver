'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _ = require('../../..');

var _2 = _interopRequireDefault(_);

var _sampleApps = require('sample-apps');

var _sampleApps2 = _interopRequireDefault(_sampleApps);

var _xmldom = require('xmldom');

var _xpath = require('xpath');

var _xpath2 = _interopRequireDefault(_xpath);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var driver = undefined;
var defaultCaps = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  deviceName: 'Android',
  platformName: 'Android'
};
var assertSource = function assertSource(source) {
  var dom, nodes;
  return _regeneratorRuntime.async(function assertSource$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        source.should.exist;
        dom = new _xmldom.DOMParser().parseFromString(source);
        nodes = _xpath2['default'].select('//android.widget.TextView[@content-desc="App"]', dom);

        nodes.length.should.equal(1);

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, _this);
};

describe('apidemo - source', function () {
  var _this2 = this;

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
    }, null, _this2);
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
    }, null, _this2);
  });
  it('should return the page source', function callee$1$0() {
    var source;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.getPageSource());

        case 2:
          source = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(assertSource(source));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
  it('should get less source when compression is enabled', function callee$1$0() {
    var getSourceWithoutCompression, getSourceWithCompression, sourceWithoutCompression, sourceWithCompression;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      var _this3 = this;

      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          getSourceWithoutCompression = function getSourceWithoutCompression() {
            return _regeneratorRuntime.async(function getSourceWithoutCompression$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.updateSettings({ 'ignoreUnimportantViews': false }));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(driver.getPageSource());

                case 4:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this3);
          };

          getSourceWithCompression = function getSourceWithCompression() {
            return _regeneratorRuntime.async(function getSourceWithCompression$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  context$3$0.next = 2;
                  return _regeneratorRuntime.awrap(driver.updateSettings({ "ignoreUnimportantViews": true }));

                case 2:
                  context$3$0.next = 4;
                  return _regeneratorRuntime.awrap(driver.getPageSource());

                case 4:
                  return context$3$0.abrupt('return', context$3$0.sent);

                case 5:
                case 'end':
                  return context$3$0.stop();
              }
            }, null, _this3);
          };

          context$2$0.next = 4;
          return _regeneratorRuntime.awrap(getSourceWithoutCompression());

        case 4:
          sourceWithoutCompression = context$2$0.sent;
          context$2$0.next = 7;
          return _regeneratorRuntime.awrap(getSourceWithCompression());

        case 7:
          sourceWithCompression = context$2$0.sent;

          sourceWithoutCompression.length.should.be.greaterThan(sourceWithCompression.length);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this2);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9zb3VyY2UtZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O29CQUFpQixNQUFNOzs7OzhCQUNJLGtCQUFrQjs7OztnQkFDbkIsVUFBVTs7OzswQkFDYixhQUFhOzs7O3NCQUNWLFFBQVE7O3FCQUNoQixPQUFPOzs7O0FBRXpCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksV0FBVyxHQUFHO0FBQ2hCLEtBQUcsRUFBRSw2QkFBVyxnQkFBZ0IsQ0FBQztBQUNqQyxZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztDQUN4QixDQUFDO0FBQ0YsSUFBSSxZQUFZLEdBQUcsU0FBZixZQUFZLENBQVUsTUFBTTtNQUUxQixHQUFHLEVBQ0gsS0FBSzs7OztBQUZULGNBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2hCLFdBQUcsR0FBRyx1QkFBZSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUM7QUFDN0MsYUFBSyxHQUFHLG1CQUFNLE1BQU0sQ0FBQyxnREFBZ0QsRUFBRSxHQUFHLENBQUM7O0FBQy9FLGFBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7OztDQUM5QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZOzs7QUFDdkMsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQ3hDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsK0JBQStCLEVBQUU7UUFDOUIsTUFBTTs7Ozs7MkNBQVMsTUFBTSxDQUFDLGFBQWEsRUFBRTs7O0FBQXJDLGdCQUFNOzsyQ0FDSixZQUFZLENBQUMsTUFBTSxDQUFDOzs7Ozs7O0dBQzNCLENBQUMsQ0FBQztBQUNILElBQUUsQ0FBQyxvREFBb0QsRUFBRTtRQUNuRCwyQkFBMkIsRUFJM0Isd0JBQXdCLEVBSXhCLHdCQUF3QixFQUN4QixxQkFBcUI7Ozs7OztBQVRyQixxQ0FBMkIsR0FBRyxTQUE5QiwyQkFBMkI7Ozs7O21EQUN2QixNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUMsd0JBQXdCLEVBQUUsS0FBSyxFQUFDLENBQUM7Ozs7bURBQ2pELE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7Ozs7V0FDcEM7O0FBQ0csa0NBQXdCLEdBQUcsU0FBM0Isd0JBQXdCOzs7OzttREFDcEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFDLHdCQUF3QixFQUFFLElBQUksRUFBQyxDQUFDOzs7O21EQUNoRCxNQUFNLENBQUMsYUFBYSxFQUFFOzs7Ozs7Ozs7O1dBQ3BDOzs7MkNBQ29DLDJCQUEyQixFQUFFOzs7QUFBOUQsa0NBQXdCOzsyQ0FDTSx3QkFBd0IsRUFBRTs7O0FBQXhELCtCQUFxQjs7QUFDekIsa0NBQXdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7O0dBQ3JGLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvc291cmNlLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuaW1wb3J0IHsgRE9NUGFyc2VyIH0gZnJvbSAneG1sZG9tJztcbmltcG9ydCB4cGF0aCBmcm9tICd4cGF0aCc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJ1xufTtcbmxldCBhc3NlcnRTb3VyY2UgPSBhc3luYyAoc291cmNlKSA9PiB7XG4gIHNvdXJjZS5zaG91bGQuZXhpc3Q7XG4gIGxldCBkb20gPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKHNvdXJjZSk7XG4gIGxldCBub2RlcyA9IHhwYXRoLnNlbGVjdCgnLy9hbmRyb2lkLndpZGdldC5UZXh0Vmlld1tAY29udGVudC1kZXNjPVwiQXBwXCJdJywgZG9tKTtcbiAgbm9kZXMubGVuZ3RoLnNob3VsZC5lcXVhbCgxKTtcbn07XG5cbmRlc2NyaWJlKCdhcGlkZW1vIC0gc291cmNlJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiB0aGUgcGFnZSBzb3VyY2UnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHNvdXJjZSA9IGF3YWl0IGRyaXZlci5nZXRQYWdlU291cmNlKCk7XG4gICAgYXdhaXQgYXNzZXJ0U291cmNlKHNvdXJjZSk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGdldCBsZXNzIHNvdXJjZSB3aGVuIGNvbXByZXNzaW9uIGlzIGVuYWJsZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGdldFNvdXJjZVdpdGhvdXRDb21wcmVzc2lvbiA9IGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci51cGRhdGVTZXR0aW5ncyh7J2lnbm9yZVVuaW1wb3J0YW50Vmlld3MnOiBmYWxzZX0pO1xuICAgICAgcmV0dXJuIGF3YWl0IGRyaXZlci5nZXRQYWdlU291cmNlKCk7XG4gICAgfTtcbiAgICBsZXQgZ2V0U291cmNlV2l0aENvbXByZXNzaW9uID0gYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLnVwZGF0ZVNldHRpbmdzKHtcImlnbm9yZVVuaW1wb3J0YW50Vmlld3NcIjogdHJ1ZX0pO1xuICAgICAgcmV0dXJuIGF3YWl0IGRyaXZlci5nZXRQYWdlU291cmNlKCk7XG4gICAgfTtcbiAgICBsZXQgc291cmNlV2l0aG91dENvbXByZXNzaW9uID0gYXdhaXQgZ2V0U291cmNlV2l0aG91dENvbXByZXNzaW9uKCk7XG4gICAgbGV0IHNvdXJjZVdpdGhDb21wcmVzc2lvbiA9IGF3YWl0IGdldFNvdXJjZVdpdGhDb21wcmVzc2lvbigpO1xuICAgIHNvdXJjZVdpdGhvdXRDb21wcmVzc2lvbi5sZW5ndGguc2hvdWxkLmJlLmdyZWF0ZXJUaGFuKHNvdXJjZVdpdGhDb21wcmVzc2lvbi5sZW5ndGgpO1xuICB9KTtcbn0pO1xuIl19