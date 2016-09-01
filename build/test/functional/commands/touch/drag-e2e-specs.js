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
  appPackage: 'io.appium.android.apis',
  appActivity: '.view.DragAndDropDemo'
};

describe('apidemo - touch', function () {
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
  afterEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity(defaultCaps.appPackage, defaultCaps.appActivity));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  describe('drag', function () {
    var _this2 = this;

    it('should drag by element', function callee$2$0() {
      var dot3, dot2, gestures, results;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_dot_3', false));

          case 2:
            dot3 = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_dot_2', false));

          case 5:
            dot2 = context$3$0.sent;
            gestures = [{ options: { element: dot3.ELEMENT } }, { options: { element: dot2.ELEMENT } }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.doTouchDrag(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_result_text', false));

          case 11:
            results = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(results.ELEMENT).should.eventually.include('Dropped'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
    it('should drag by element with an offset', function callee$2$0() {
      var dot3, dot2, gestures, results;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_dot_3', false));

          case 2:
            dot3 = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_dot_2', false));

          case 5:
            dot2 = context$3$0.sent;
            gestures = [{ options: { element: dot3.ELEMENT, x: 5, y: 5 } }, { options: { element: dot2.ELEMENT, x: 5, y: 5 } }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.doTouchDrag(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElOrEls('id', 'io.appium.android.apis:id/drag_result_text', false));

          case 11:
            results = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(results.ELEMENT).should.eventually.include('Dropped'));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this2);
    });
  });
  describe('performTouch', function () {
    var _this3 = this;

    it('should drag by element', function callee$2$0() {
      var startEle, endEle, gestures, resultEle;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_3"));

          case 2:
            startEle = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_2"));

          case 5:
            endEle = context$3$0.sent;
            gestures = [{ "action": "longPress", "options": { "element": startEle.ELEMENT } }, { "action": "moveTo", "options": { "element": endEle.ELEMENT } }, { "action": "release", "options": {} }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.performTouch(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_result_text"));

          case 11:
            resultEle = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(resultEle.ELEMENT).should.eventually.equal("Dropped!"));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should drag by element by offset', function callee$2$0() {
      var startEle, endEle, gestures, element3;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_3"));

          case 2:
            startEle = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_2"));

          case 5:
            endEle = context$3$0.sent;
            gestures = [{ "action": "longPress",
              "options": { "element": startEle.ELEMENT, "x": 5, "y": 5 } }, { "action": "moveTo", "options": { "element": endEle.ELEMENT, "x": 5, "y": 5 } }, { "action": "release", "options": {} }];
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(driver.performTouch(gestures));

          case 9:
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_result_text"));

          case 11:
            element3 = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getText(element3.ELEMENT).should.eventually.equal("Dropped!"));

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
    it('should drag by absolute position', function callee$2$0() {
      var startEle, startLoc, startSize, endEle, endLoc, endSize, gestures, resultEle;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_3"));

          case 2:
            startEle = context$3$0.sent;
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.getLocationInView(startEle.ELEMENT));

          case 5:
            startLoc = context$3$0.sent;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.getSize(startEle.ELEMENT));

          case 8:
            startSize = context$3$0.sent;
            context$3$0.next = 11;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_dot_2"));

          case 11:
            endEle = context$3$0.sent;
            context$3$0.next = 14;
            return _regeneratorRuntime.awrap(driver.getLocationInView(endEle.ELEMENT));

          case 14:
            endLoc = context$3$0.sent;
            context$3$0.next = 17;
            return _regeneratorRuntime.awrap(driver.getSize(endEle.ELEMENT));

          case 17:
            endSize = context$3$0.sent;
            gestures = [{ "action": "longPress",
              "options": { "x": startLoc.x + startSize.width / 2,
                "y": startLoc.y + startSize.height / 2 } }, { "action": "moveTo",
              "options": { "x": endLoc.x + endSize.width / 2,
                "y": endLoc.y + endSize.height / 2 } }, { "action": "release", "options": {} }];
            context$3$0.next = 21;
            return _regeneratorRuntime.awrap(driver.performTouch(gestures));

          case 21:
            context$3$0.next = 23;
            return _regeneratorRuntime.awrap(driver.findElement("id", "io.appium.android.apis:id/drag_result_text"));

          case 23:
            resultEle = context$3$0.sent;
            context$3$0.next = 26;
            return _regeneratorRuntime.awrap(driver.getText(resultEle.ELEMENT).should.eventually.equal("Dropped!"));

          case 26:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this3);
    });
  });
});

// reset the view by restarting the activity
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy90b3VjaC9kcmFnLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7OzBCQUNoQixhQUFhOzs7O0FBR3BDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksV0FBVyxHQUFHO0FBQ2hCLEtBQUcsRUFBRSw2QkFBVyxnQkFBZ0IsQ0FBQztBQUNqQyxZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztBQUN2QixZQUFVLEVBQUUsd0JBQXdCO0FBQ3BDLGFBQVcsRUFBRSx1QkFBdUI7Q0FDckMsQ0FBQzs7QUFFRixRQUFRLENBQUMsaUJBQWlCLEVBQUUsWUFBWTs7O0FBQ3RDLFFBQU0sQ0FBQzs7OztBQUNMLGdCQUFNLEdBQUcsbUJBQW1CLENBQUM7OzJDQUN2QixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUN4QyxDQUFDLENBQUM7QUFDSCxPQUFLLENBQUM7Ozs7OzJDQUNFLE1BQU0sQ0FBQyxhQUFhLEVBQUU7Ozs7Ozs7R0FDN0IsQ0FBQyxDQUFDO0FBQ0gsV0FBUyxDQUFDOzs7OzsyQ0FFRixNQUFNLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztHQUM1RSxDQUFDLENBQUM7QUFDSCxVQUFRLENBQUMsTUFBTSxFQUFFLFlBQVk7OztBQUMzQixNQUFFLENBQUMsd0JBQXdCLEVBQUU7VUFDdkIsSUFBSSxFQUNKLElBQUksRUFDSixRQUFRLEVBS1IsT0FBTzs7Ozs7NkNBUE0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsc0NBQXNDLEVBQUUsS0FBSyxDQUFDOzs7QUFBcEYsZ0JBQUk7OzZDQUNT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QUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7S0FDNUUsQ0FBQyxDQUFDO0dBQ0osQ0FBQyxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwiZmlsZSI6InRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy90b3VjaC9kcmFnLWUyZS1zcGVjcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFpIGZyb20gJ2NoYWknO1xuaW1wb3J0IGNoYWlBc1Byb21pc2VkIGZyb20gJ2NoYWktYXMtcHJvbWlzZWQnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4vLi4nO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkcml2ZXI7XG5sZXQgZGVmYXVsdENhcHMgPSB7XG4gIGFwcDogc2FtcGxlQXBwcygnQXBpRGVtb3MtZGVidWcnKSxcbiAgZGV2aWNlTmFtZTogJ0FuZHJvaWQnLFxuICBwbGF0Zm9ybU5hbWU6ICdBbmRyb2lkJyxcbiAgYXBwUGFja2FnZTogJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLFxuICBhcHBBY3Rpdml0eTogJy52aWV3LkRyYWdBbmREcm9wRGVtbydcbn07XG5cbmRlc2NyaWJlKCdhcGlkZW1vIC0gdG91Y2gnLCBmdW5jdGlvbiAoKSB7XG4gIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0Q2Fwcyk7XG4gIH0pO1xuICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgfSk7XG4gIGFmdGVyRWFjaChhc3luYyAoKSA9PiB7XG4gICAgLy8gcmVzZXQgdGhlIHZpZXcgYnkgcmVzdGFydGluZyB0aGUgYWN0aXZpdHlcbiAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShkZWZhdWx0Q2Fwcy5hcHBQYWNrYWdlLCBkZWZhdWx0Q2Fwcy5hcHBBY3Rpdml0eSk7XG4gIH0pO1xuICBkZXNjcmliZSgnZHJhZycsIGZ1bmN0aW9uICgpIHtcbiAgICBpdCgnc2hvdWxkIGRyYWcgYnkgZWxlbWVudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBkb3QzID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfZG90XzMnLCBmYWxzZSk7XG4gICAgICBsZXQgZG90MiA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8yJywgZmFsc2UpO1xuICAgICAgbGV0IGdlc3R1cmVzID0gW1xuICAgICAgICB7b3B0aW9uczoge2VsZW1lbnQ6IGRvdDMuRUxFTUVOVH19LFxuICAgICAgICB7b3B0aW9uczoge2VsZW1lbnQ6IGRvdDIuRUxFTUVOVH19XG4gICAgICBdO1xuICAgICAgYXdhaXQgZHJpdmVyLmRvVG91Y2hEcmFnKGdlc3R1cmVzKTtcbiAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfcmVzdWx0X3RleHQnLCBmYWxzZSk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChyZXN1bHRzLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmluY2x1ZGUoJ0Ryb3BwZWQnKTtcbiAgICB9KTtcbiAgICBpdCgnc2hvdWxkIGRyYWcgYnkgZWxlbWVudCB3aXRoIGFuIG9mZnNldCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBkb3QzID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfZG90XzMnLCBmYWxzZSk7XG4gICAgICBsZXQgZG90MiA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnaWQnLCAnaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8yJywgZmFsc2UpO1xuICAgICAgbGV0IGdlc3R1cmVzID0gW1xuICAgICAgICB7b3B0aW9uczoge2VsZW1lbnQ6IGRvdDMuRUxFTUVOVCwgeDogNSwgeTogNX19LFxuICAgICAgICB7b3B0aW9uczoge2VsZW1lbnQ6IGRvdDIuRUxFTUVOVCwgeDogNSwgeTogNX19XG4gICAgICBdO1xuICAgICAgYXdhaXQgZHJpdmVyLmRvVG91Y2hEcmFnKGdlc3R1cmVzKTtcbiAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdpZCcsICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfcmVzdWx0X3RleHQnLCBmYWxzZSk7XG4gICAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChyZXN1bHRzLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmluY2x1ZGUoJ0Ryb3BwZWQnKTtcbiAgICB9KTtcbiAgfSk7XG4gIGRlc2NyaWJlKCdwZXJmb3JtVG91Y2gnLCBmdW5jdGlvbiAoKSB7XG4gICAgaXQoJ3Nob3VsZCBkcmFnIGJ5IGVsZW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgc3RhcnRFbGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoXCJpZFwiLCBcImlvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19kb3RfM1wiKTtcbiAgICAgIGxldCBlbmRFbGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoXCJpZFwiLCBcImlvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19kb3RfMlwiKTtcbiAgICAgIGxldCBnZXN0dXJlcyA9IFt7XCJhY3Rpb25cIjogXCJsb25nUHJlc3NcIiwgXCJvcHRpb25zXCI6IHtcImVsZW1lbnRcIjogc3RhcnRFbGUuRUxFTUVOVH19LFxuICAgICAgICAgICAgICAgICAgICAgIHtcImFjdGlvblwiOiBcIm1vdmVUb1wiLCBcIm9wdGlvbnNcIjoge1wiZWxlbWVudFwiOiBlbmRFbGUuRUxFTUVOVH19LFxuICAgICAgICAgICAgICAgICAgICAgIHtcImFjdGlvblwiOiBcInJlbGVhc2VcIiwgXCJvcHRpb25zXCI6IHt9fV07XG4gICAgICBhd2FpdCBkcml2ZXIucGVyZm9ybVRvdWNoKGdlc3R1cmVzKTtcbiAgICAgIGxldCByZXN1bHRFbGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoXCJpZFwiLCBcImlvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19yZXN1bHRfdGV4dFwiKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KHJlc3VsdEVsZS5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbChcIkRyb3BwZWQhXCIpO1xuICAgIH0pO1xuICAgIGl0KCdzaG91bGQgZHJhZyBieSBlbGVtZW50IGJ5IG9mZnNldCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBzdGFydEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8zXCIpO1xuICAgICAgbGV0IGVuZEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX2RvdF8yXCIpO1xuICAgICAgbGV0IGdlc3R1cmVzID0gW3tcImFjdGlvblwiOiBcImxvbmdQcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICBcIm9wdGlvbnNcIjoge1wiZWxlbWVudFwiOiBzdGFydEVsZS5FTEVNRU5ULCBcInhcIjogNSwgXCJ5XCI6IDV9fSxcbiAgICAgICAgICAgICAgICAgICAgICB7XCJhY3Rpb25cIjogXCJtb3ZlVG9cIiwgXCJvcHRpb25zXCI6XG4gICAgICAgICAgICAgICAgICAgICAge1wiZWxlbWVudFwiOiBlbmRFbGUuRUxFTUVOVCwgXCJ4XCI6IDUsIFwieVwiOiA1fX0sXG4gICAgICAgICAgICAgICAgICAgICAge1wiYWN0aW9uXCI6IFwicmVsZWFzZVwiLCBcIm9wdGlvbnNcIjp7fX1dO1xuICAgICAgYXdhaXQgZHJpdmVyLnBlcmZvcm1Ub3VjaChnZXN0dXJlcyk7XG4gICAgICBsZXQgZWxlbWVudDMgPSBhd2FpdCBkcml2ZXIuZmluZEVsZW1lbnQoXCJpZFwiLCBcImlvLmFwcGl1bS5hbmRyb2lkLmFwaXM6aWQvZHJhZ19yZXN1bHRfdGV4dFwiKTtcbiAgICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsZW1lbnQzLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKFwiRHJvcHBlZCFcIik7XG4gICAgfSk7XG4gICAgaXQoJ3Nob3VsZCBkcmFnIGJ5IGFic29sdXRlIHBvc2l0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHN0YXJ0RWxlID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KFwiaWRcIiwgXCJpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfZG90XzNcIik7XG4gICAgICBsZXQgc3RhcnRMb2MgPSBhd2FpdCBkcml2ZXIuZ2V0TG9jYXRpb25JblZpZXcoc3RhcnRFbGUuRUxFTUVOVCk7XG4gICAgICBsZXQgc3RhcnRTaXplID0gYXdhaXQgZHJpdmVyLmdldFNpemUoc3RhcnRFbGUuRUxFTUVOVCk7XG4gICAgICBsZXQgZW5kRWxlID0gYXdhaXQgZHJpdmVyLmZpbmRFbGVtZW50KFwiaWRcIiwgXCJpby5hcHBpdW0uYW5kcm9pZC5hcGlzOmlkL2RyYWdfZG90XzJcIik7XG4gICAgICBsZXQgZW5kTG9jID0gYXdhaXQgZHJpdmVyLmdldExvY2F0aW9uSW5WaWV3KGVuZEVsZS5FTEVNRU5UKTtcbiAgICAgIGxldCBlbmRTaXplID0gYXdhaXQgZHJpdmVyLmdldFNpemUoZW5kRWxlLkVMRU1FTlQpO1xuICAgICAgbGV0IGdlc3R1cmVzID0gW3tcImFjdGlvblwiOiBcImxvbmdQcmVzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICBcIm9wdGlvbnNcIjoge1wieFwiOiBzdGFydExvYy54ICsgKHN0YXJ0U2l6ZS53aWR0aCAvIDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInlcIjogc3RhcnRMb2MueSArIChzdGFydFNpemUuaGVpZ2h0IC8gMil9fSxcbiAgICAgICAgICAgICAgICAgICAgICB7XCJhY3Rpb25cIjogXCJtb3ZlVG9cIixcbiAgICAgICAgICAgICAgICAgICAgICAgXCJvcHRpb25zXCI6IHtcInhcIjogZW5kTG9jLnggKyAoZW5kU2l6ZS53aWR0aCAvIDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInlcIjogZW5kTG9jLnkgKyAoZW5kU2l6ZS5oZWlnaHQgLyAyKX19LFxuICAgICAgICAgICAgICAgICAgICAgIHtcImFjdGlvblwiOiBcInJlbGVhc2VcIiwgXCJvcHRpb25zXCI6e319XTtcbiAgICAgIGF3YWl0IGRyaXZlci5wZXJmb3JtVG91Y2goZ2VzdHVyZXMpO1xuICAgICAgbGV0IHJlc3VsdEVsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxlbWVudChcImlkXCIsIFwiaW8uYXBwaXVtLmFuZHJvaWQuYXBpczppZC9kcmFnX3Jlc3VsdF90ZXh0XCIpO1xuICAgICAgYXdhaXQgZHJpdmVyLmdldFRleHQocmVzdWx0RWxlLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKFwiRHJvcHBlZCFcIik7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=