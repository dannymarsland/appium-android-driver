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
  platformName: 'Android',
  appActivity: '.view.SplitTouchView'
};

describe('apidemo - touch - multi-actions', function () {
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
  it('should scroll two different lists', function callee$1$0() {
    var lists, leftList, rightList, leftGestures, rightGestures;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.ListView', true));

        case 2:
          lists = context$2$0.sent;
          leftList = lists[0].ELEMENT;
          rightList = lists[1].ELEMENT;
          leftGestures = [{ action: 'press', options: { element: leftList } }, { action: 'moveTo', options: { element: leftList, x: 10, y: 0 } }, { action: 'moveTo', options: { element: leftList, x: 10, y: -75 } }, { action: 'moveTo', options: { element: leftList, x: 10, y: -150 } }];
          rightGestures = [{ action: 'press', options: { element: rightList } }, { action: 'moveTo', options: { element: rightList, x: 10, y: 0 } }, { action: 'moveTo', options: { element: rightList, x: 10, y: -75 } }, { action: 'moveTo', options: { element: rightList, x: 10, y: -150 } }];
          context$2$0.next = 9;
          return _regeneratorRuntime.awrap(driver.performMultiAction([leftGestures, rightGestures]));

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy90b3VjaC9tdWx0aS1hY3Rpb24tZTJlLXNwZWNzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7Z0JBQ25CLGFBQWE7Ozs7MEJBQ2hCLGFBQWE7Ozs7QUFFcEMsa0JBQUssTUFBTSxFQUFFLENBQUM7QUFDZCxrQkFBSyxHQUFHLDZCQUFnQixDQUFDOztBQUV6QixJQUFJLE1BQU0sWUFBQSxDQUFDO0FBQ1gsSUFBSSxXQUFXLEdBQUc7QUFDaEIsS0FBRyxFQUFFLDZCQUFXLGdCQUFnQixDQUFDO0FBQ2pDLFlBQVUsRUFBRSxTQUFTO0FBQ3JCLGNBQVksRUFBRSxTQUFTO0FBQ3ZCLGFBQVcsRUFBRSxzQkFBc0I7Q0FDcEMsQ0FBQzs7QUFFRixRQUFRLENBQUMsaUNBQWlDLEVBQUUsWUFBWTs7O0FBQ3RELFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUN4QyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLG1DQUFtQyxFQUFFO1FBQ2xDLEtBQUssRUFDTCxRQUFRLEVBQ1IsU0FBUyxFQUNULFlBQVksRUFNWixhQUFhOzs7OzsyQ0FUQyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSx5QkFBeUIsRUFBRSxJQUFJLENBQUM7OztBQUEvRSxlQUFLO0FBQ0wsa0JBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztBQUMzQixtQkFBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPO0FBQzVCLHNCQUFZLEdBQUcsQ0FDakIsRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsRUFBQyxFQUMvQyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsRUFBQyxFQUM3RCxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFDLEVBQy9ELEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFDLEVBQUMsQ0FDakU7QUFDRyx1QkFBYSxHQUFHLENBQ2xCLEVBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFDLEVBQUMsRUFDaEQsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFDLEVBQUMsRUFDOUQsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBQyxFQUNoRSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBQyxFQUFDLENBQ2xFOzsyQ0FDSyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7Ozs7Ozs7R0FDL0QsQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy90b3VjaC9tdWx0aS1hY3Rpb24tZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgQW5kcm9pZERyaXZlciBmcm9tICcuLi8uLi8uLi8uLic7XG5pbXBvcnQgc2FtcGxlQXBwcyBmcm9tICdzYW1wbGUtYXBwcyc7XG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJyxcbiAgYXBwQWN0aXZpdHk6ICcudmlldy5TcGxpdFRvdWNoVmlldydcbn07XG5cbmRlc2NyaWJlKCdhcGlkZW1vIC0gdG91Y2ggLSBtdWx0aS1hY3Rpb25zJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHNjcm9sbCB0d28gZGlmZmVyZW50IGxpc3RzJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBsaXN0cyA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsICdhbmRyb2lkLndpZGdldC5MaXN0VmlldycsIHRydWUpO1xuICAgIGxldCBsZWZ0TGlzdCA9IGxpc3RzWzBdLkVMRU1FTlQ7XG4gICAgbGV0IHJpZ2h0TGlzdCA9IGxpc3RzWzFdLkVMRU1FTlQ7XG4gICAgbGV0IGxlZnRHZXN0dXJlcyA9IFtcbiAgICAgIHthY3Rpb246ICdwcmVzcycsIG9wdGlvbnM6IHtlbGVtZW50OiBsZWZ0TGlzdH19LFxuICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHtlbGVtZW50OiBsZWZ0TGlzdCwgeDogMTAsIHk6IDB9fSxcbiAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7ZWxlbWVudDogbGVmdExpc3QsIHg6IDEwLCB5OiAtNzV9fSxcbiAgICAgIHthY3Rpb246ICdtb3ZlVG8nLCBvcHRpb25zOiB7ZWxlbWVudDogbGVmdExpc3QsIHg6IDEwLCB5OiAtMTUwfX1cbiAgICBdO1xuICAgIGxldCByaWdodEdlc3R1cmVzID0gW1xuICAgICAge2FjdGlvbjogJ3ByZXNzJywgb3B0aW9uczoge2VsZW1lbnQ6IHJpZ2h0TGlzdH19LFxuICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHtlbGVtZW50OiByaWdodExpc3QsIHg6IDEwLCB5OiAwfX0sXG4gICAgICB7YWN0aW9uOiAnbW92ZVRvJywgb3B0aW9uczoge2VsZW1lbnQ6IHJpZ2h0TGlzdCwgeDogMTAsIHk6IC03NX19LFxuICAgICAge2FjdGlvbjogJ21vdmVUbycsIG9wdGlvbnM6IHtlbGVtZW50OiByaWdodExpc3QsIHg6IDEwLCB5OiAtMTUwfX1cbiAgICBdO1xuICAgIGF3YWl0IGRyaXZlci5wZXJmb3JtTXVsdGlBY3Rpb24oW2xlZnRHZXN0dXJlcywgcmlnaHRHZXN0dXJlc10pO1xuICB9KTtcbn0pO1xuIl19