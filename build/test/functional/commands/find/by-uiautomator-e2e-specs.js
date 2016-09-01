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
  platformName: 'Android'
};

describe('Find - uiautomator', function () {
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
  it('should find elements with a boolean argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find elements within the context of another element', function callee$1$0() {
    var els;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().className("android.widget.TextView")', true));

        case 2:
          els = context$2$0.sent;

          els.length.should.be.above(8);
          els.length.should.be.below(14);

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', '.clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', '.clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find elements without prepending "new UiSelector()"', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find elements without prepending "new "', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'UiSelector().clickable(true)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should ignore trailing semicolons', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true);', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with an int argument', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().index(0)', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getName(el.ELEMENT).should.eventually.equal('android.widget.FrameLayout'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with a string argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().description("Animation")', false).should.eventually.exist);

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with an overloaded method argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().className("android.widget.TextView")', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with a Class<T> method argument', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().className(android.widget.TextView)', true).should.eventually.have.length.at.least(10));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with a long chain of methods', function callee$1$0() {
    var el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true).className(android.widget.TextView).index(1)', false));

        case 2:
          el = context$2$0.sent;
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Accessibility'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element with recursive UiSelectors', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().childSelector(new UiSelector().clickable(true)).clickable(true)', true).should.eventually.have.length(1));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find an element with bad syntax', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable((true)', true).should.eventually.be.rejectedWith(/resource could not be found/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find an element with bad syntax', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().drinkable(true)', true).should.eventually.be.rejectedWith(/resource could not be found/));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should not find an element which does not exist', function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().description("chuckwudi")', true).should.eventually.have.length(0));

        case 2:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should allow multiple selector statements and return the Union of the two sets', function callee$1$0() {
    var clickable, notClickable, both;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true)', true));

        case 2:
          clickable = context$2$0.sent;

          clickable.length.should.be.above(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(false)', true));

        case 6:
          notClickable = context$2$0.sent;

          notClickable.length.should.be.above(0);
          context$2$0.next = 10;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true); new UiSelector().clickable(false);', true));

        case 10:
          both = context$2$0.sent;

          both.should.have.length(clickable.length + notClickable.length);

        case 12:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should allow multiple selector statements and return the Union of the two sets', function callee$1$0() {
    var clickable, clickableClickable;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true)', true));

        case 2:
          clickable = context$2$0.sent;

          clickable.length.should.be.above(0);
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', 'new UiSelector().clickable(true); new UiSelector().clickable(true);', true));

        case 6:
          clickableClickable = context$2$0.sent;

          clickableClickable.length.should.be.above(0);
          clickableClickable.should.have.length(clickable.length);

        case 9:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should find an element in the second selector if the first finds no elements', function callee$1$0() {
    var selector;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiSelector().className("not.a.class"); new UiSelector().className("android.widget.TextView")';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, true).should.eventually.exist);

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should scroll to, and return elements using UiScrollable', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(new UiSelector().text("Views").instance(0))';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 3:
          el = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Views'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should allow chaining UiScrollable methods', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).setMaxSearchSwipes(10).scrollIntoView(new UiSelector().text("Views").instance(0))';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 3:
          el = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Views'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should allow UiScrollable scrollIntoView', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).scrollIntoView(new UiSelector().text("Views").instance(0));';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 3:
          el = context$2$0.sent;
          context$2$0.next = 6;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('Views'));

        case 6:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should error reasonably if a UiScrollable does not return a UiObject', function callee$1$0() {
    var selector;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          selector = 'new UiScrollable(new UiSelector().scrollable(true).instance(0)).setMaxSearchSwipes(10)';
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false).should.eventually.be.rejectedWith(/resource could not be found/));

        case 3:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
  it('should allow UiScrollable with unicode string', function callee$1$0() {
    var selector, el;
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.next = 2;
          return _regeneratorRuntime.awrap(driver.startActivity('io.appium.android.apis', '.text.Unicode'));

        case 2:
          selector = 'new UiSelector().text("عربي").instance(0);';
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(driver.findElOrEls('-android uiautomator', selector, false));

        case 5:
          el = context$2$0.sent;
          context$2$0.next = 8;
          return _regeneratorRuntime.awrap(driver.getText(el.ELEMENT).should.eventually.equal('عربي'));

        case 8:
        case 'end':
          return context$2$0.stop();
      }
    }, null, _this);
  });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9maW5kL2J5LXVpYXV0b21hdG9yLWUyZS1zcGVjcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7b0JBQWlCLE1BQU07Ozs7OEJBQ0ksa0JBQWtCOzs7O2dCQUNuQixhQUFhOzs7OzBCQUNoQixhQUFhOzs7O0FBRXBDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxNQUFNLFlBQUEsQ0FBQztBQUNYLElBQUksV0FBVyxHQUFHO0FBQ2hCLEtBQUcsRUFBRSw2QkFBVyxnQkFBZ0IsQ0FBQztBQUNqQyxZQUFVLEVBQUUsU0FBUztBQUNyQixjQUFZLEVBQUUsU0FBUztDQUN4QixDQUFDOztBQUVGLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxZQUFZOzs7QUFDekMsUUFBTSxDQUFDOzs7O0FBQ0wsZ0JBQU0sR0FBRyxtQkFBbUIsQ0FBQzs7MkNBQ3ZCLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDOzs7Ozs7O0dBQ3hDLENBQUMsQ0FBQztBQUNILE9BQUssQ0FBQzs7Ozs7MkNBQ0UsTUFBTSxDQUFDLGFBQWEsRUFBRTs7Ozs7OztHQUM3QixDQUFDLENBQUM7QUFDSCxJQUFFLENBQUMsOENBQThDLEVBQUU7Ozs7OzJDQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLGtDQUFrQyxFQUFFLElBQUksQ0FBQyxDQUN2RixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Ozs7Ozs7R0FDOUMsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLDREQUE0RCxFQUFFO1FBQzNELEdBQUc7Ozs7OzJDQUFTLE1BQU0sQ0FDbkIsV0FBVyxDQUFDLHNCQUFzQixFQUFFLHVEQUF1RCxFQUFFLElBQUksQ0FBQzs7O0FBRGpHLGFBQUc7O0FBRVAsYUFBRyxDQUFDLE1BQU0s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O0FBREYsa0JBQVEsR0FBRyw2SEFBNkg7OzJDQUM3SCxNQUFNLENBQUMsV0FBVyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7OztBQUF0RSxZQUFFOzsyQ0FDQSxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7R0FDbEUsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLHNFQUFzRSxFQUFFO1FBQ3JFLFFBQVE7Ozs7QUFBUixrQkFBUSxHQUFHLHdGQUF3Rjs7MkNBQ2pHLE1BQU0sQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUM5RCxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsNkJBQTZCLENBQUM7Ozs7Ozs7R0FDcEUsQ0FBQyxDQUFDO0FBQ0gsSUFBRSxDQUFDLCtDQUErQyxFQUFFO1FBRTlDLFFBQVEsRUFDUixFQUFFOzs7OzsyQ0FGQSxNQUFNLENBQUMsYUFBYSxDQUFDLHdCQUF3QixFQUFFLGVBQWUsQ0FBQzs7O0FBQ2pFLGtCQUFRLEdBQUcsNENBQTRDOzsyQ0FDNUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDOzs7QUFBdEUsWUFBRTs7MkNBQ0EsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDOzs7Ozs7O0dBQ2pFLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMvZmluZC9ieS11aWF1dG9tYXRvci1lMmUtc3BlY3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhaSBmcm9tICdjaGFpJztcbmltcG9ydCBjaGFpQXNQcm9taXNlZCBmcm9tICdjaGFpLWFzLXByb21pc2VkJztcbmltcG9ydCBBbmRyb2lkRHJpdmVyIGZyb20gJy4uLy4uLy4uLy4uJztcbmltcG9ydCBzYW1wbGVBcHBzIGZyb20gJ3NhbXBsZS1hcHBzJztcblxuY2hhaS5zaG91bGQoKTtcbmNoYWkudXNlKGNoYWlBc1Byb21pc2VkKTtcblxubGV0IGRyaXZlcjtcbmxldCBkZWZhdWx0Q2FwcyA9IHtcbiAgYXBwOiBzYW1wbGVBcHBzKCdBcGlEZW1vcy1kZWJ1ZycpLFxuICBkZXZpY2VOYW1lOiAnQW5kcm9pZCcsXG4gIHBsYXRmb3JtTmFtZTogJ0FuZHJvaWQnXG59O1xuXG5kZXNjcmliZSgnRmluZCAtIHVpYXV0b21hdG9yJywgZnVuY3Rpb24gKCkge1xuICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdENhcHMpO1xuICB9KTtcbiAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgZWxlbWVudHMgd2l0aCBhIGJvb2xlYW4gYXJndW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKScsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnRzIHdpdGhpbiB0aGUgY29udGV4dCBvZiBhbm90aGVyIGVsZW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGVscyA9IGF3YWl0IGRyaXZlclxuICAgICAgLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsYXNzTmFtZShcImFuZHJvaWQud2lkZ2V0LlRleHRWaWV3XCIpJywgdHJ1ZSk7XG4gICAgZWxzLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoOCk7XG4gICAgZWxzLmxlbmd0aC5zaG91bGQuYmUuYmVsb3coMTQpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGVsZW1lbnRzIHdpdGhvdXQgcHJlcGVuZGluZyBcIm5ldyBVaVNlbGVjdG9yKClcIicsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJy5jbGlja2FibGUodHJ1ZSknLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBlbGVtZW50cyB3aXRob3V0IHByZXBlbmRpbmcgXCJuZXcgVWlTZWxlY3RvcigpXCInLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICcuY2xpY2thYmxlKHRydWUpJywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgZWxlbWVudHMgd2l0aG91dCBwcmVwZW5kaW5nIFwibmV3IFVpU2VsZWN0b3IoKVwiJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnY2xpY2thYmxlKHRydWUpJywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aC5hdC5sZWFzdCgxMCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgZWxlbWVudHMgd2l0aG91dCBwcmVwZW5kaW5nIFwibmV3IFwiJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKScsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBpZ25vcmUgdHJhaWxpbmcgc2VtaWNvbG9ucycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpOycsIHRydWUpXG4gICAgICAuc2hvdWxkLmV2ZW50dWFsbHkuaGF2ZS5sZW5ndGguYXQubGVhc3QoMTApO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgd2l0aCBhbiBpbnQgYXJndW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmluZGV4KDApJywgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5nZXROYW1lKGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdhbmRyb2lkLndpZGdldC5GcmFtZUxheW91dCcpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgd2l0aCBhIHN0cmluZyBhcmd1bWVudCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXJcbiAgICAgIC5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5kZXNjcmlwdGlvbihcIkFuaW1hdGlvblwiKScsIGZhbHNlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmV4aXN0O1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBmaW5kIGFuIGVsZW1lbnQgd2l0aCBhbiBvdmVybG9hZGVkIG1ldGhvZCBhcmd1bWVudCcsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xhc3NOYW1lKFwiYW5kcm9pZC53aWRnZXQuVGV4dFZpZXdcIiknLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IHdpdGggYSBDbGFzczxUPiBtZXRob2QgYXJndW1lbnQnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsYXNzTmFtZShhbmRyb2lkLndpZGdldC5UZXh0VmlldyknLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmhhdmUubGVuZ3RoLmF0LmxlYXN0KDEwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgZmluZCBhbiBlbGVtZW50IHdpdGggYSBsb25nIGNoYWluIG9mIG1ldGhvZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKS5jbGFzc05hbWUoYW5kcm9pZC53aWRnZXQuVGV4dFZpZXcpLmluZGV4KDEpJywgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdBY2Nlc3NpYmlsaXR5Jyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCB3aXRoIHJlY3Vyc2l2ZSBVaVNlbGVjdG9ycycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2hpbGRTZWxlY3RvcihuZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZSh0cnVlKSkuY2xpY2thYmxlKHRydWUpJywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aCgxKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgbm90IGZpbmQgYW4gZWxlbWVudCB3aXRoIGJhZCBzeW50YXgnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZSgodHJ1ZSknLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvcmVzb3VyY2UgY291bGQgbm90IGJlIGZvdW5kLyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIG5vdCBmaW5kIGFuIGVsZW1lbnQgd2l0aCBiYWQgc3ludGF4JywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5kcmlua2FibGUodHJ1ZSknLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmJlLnJlamVjdGVkV2l0aCgvcmVzb3VyY2UgY291bGQgbm90IGJlIGZvdW5kLyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIG5vdCBmaW5kIGFuIGVsZW1lbnQgd2hpY2ggZG9lcyBub3QgZXhpc3QnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmRlc2NyaXB0aW9uKFwiY2h1Y2t3dWRpXCIpJywgdHJ1ZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5oYXZlLmxlbmd0aCgwKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYWxsb3cgbXVsdGlwbGUgc2VsZWN0b3Igc3RhdGVtZW50cyBhbmQgcmV0dXJuIHRoZSBVbmlvbiBvZiB0aGUgdHdvIHNldHMnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IGNsaWNrYWJsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSknLCB0cnVlKTtcbiAgICBjbGlja2FibGUubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgwKTtcbiAgICBsZXQgbm90Q2xpY2thYmxlID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsICduZXcgVWlTZWxlY3RvcigpLmNsaWNrYWJsZShmYWxzZSknLCB0cnVlKTtcbiAgICBub3RDbGlja2FibGUubGVuZ3RoLnNob3VsZC5iZS5hYm92ZSgwKTtcbiAgICBsZXQgYm90aCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSk7IG5ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKGZhbHNlKTsnLCB0cnVlKTtcbiAgICBib3RoLnNob3VsZC5oYXZlLmxlbmd0aChjbGlja2FibGUubGVuZ3RoICsgbm90Q2xpY2thYmxlLmxlbmd0aCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGFsbG93IG11bHRpcGxlIHNlbGVjdG9yIHN0YXRlbWVudHMgYW5kIHJldHVybiB0aGUgVW5pb24gb2YgdGhlIHR3byBzZXRzJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBjbGlja2FibGUgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgJ25ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpJywgdHJ1ZSk7XG4gICAgY2xpY2thYmxlLmxlbmd0aC5zaG91bGQuYmUuYWJvdmUoMCk7XG4gICAgbGV0IGNsaWNrYWJsZUNsaWNrYWJsZSA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCAnbmV3IFVpU2VsZWN0b3IoKS5jbGlja2FibGUodHJ1ZSk7IG5ldyBVaVNlbGVjdG9yKCkuY2xpY2thYmxlKHRydWUpOycsIHRydWUpO1xuICAgIGNsaWNrYWJsZUNsaWNrYWJsZS5sZW5ndGguc2hvdWxkLmJlLmFib3ZlKDApO1xuICAgIGNsaWNrYWJsZUNsaWNrYWJsZS5zaG91bGQuaGF2ZS5sZW5ndGgoY2xpY2thYmxlLmxlbmd0aCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGZpbmQgYW4gZWxlbWVudCBpbiB0aGUgc2Vjb25kIHNlbGVjdG9yIGlmIHRoZSBmaXJzdCBmaW5kcyBubyBlbGVtZW50cycsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgc2VsZWN0b3IgPSAnbmV3IFVpU2VsZWN0b3IoKS5jbGFzc05hbWUoXCJub3QuYS5jbGFzc1wiKTsgbmV3IFVpU2VsZWN0b3IoKS5jbGFzc05hbWUoXCJhbmRyb2lkLndpZGdldC5UZXh0Vmlld1wiKSc7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsIHNlbGVjdG9yLCB0cnVlKVxuICAgICAgLnNob3VsZC5ldmVudHVhbGx5LmV4aXN0O1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBzY3JvbGwgdG8sIGFuZCByZXR1cm4gZWxlbWVudHMgdXNpbmcgVWlTY3JvbGxhYmxlJywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBzZWxlY3RvciA9ICduZXcgVWlTY3JvbGxhYmxlKG5ldyBVaVNlbGVjdG9yKCkuc2Nyb2xsYWJsZSh0cnVlKS5pbnN0YW5jZSgwKSkuc2Nyb2xsSW50b1ZpZXcobmV3IFVpU2VsZWN0b3IoKS50ZXh0KFwiVmlld3NcIikuaW5zdGFuY2UoMCkpJztcbiAgICBsZXQgZWwgPSBhd2FpdCBkcml2ZXIuZmluZEVsT3JFbHMoJy1hbmRyb2lkIHVpYXV0b21hdG9yJywgc2VsZWN0b3IsIGZhbHNlKTtcbiAgICBhd2FpdCBkcml2ZXIuZ2V0VGV4dChlbC5FTEVNRU5UKS5zaG91bGQuZXZlbnR1YWxseS5lcXVhbCgnVmlld3MnKTtcbiAgfSk7XG4gIGl0KCdzaG91bGQgYWxsb3cgY2hhaW5pbmcgVWlTY3JvbGxhYmxlIG1ldGhvZHMnLCBhc3luYyAoKSA9PiB7XG4gICAgbGV0IHNlbGVjdG9yID0gJ25ldyBVaVNjcm9sbGFibGUobmV3IFVpU2VsZWN0b3IoKS5zY3JvbGxhYmxlKHRydWUpLmluc3RhbmNlKDApKS5zZXRNYXhTZWFyY2hTd2lwZXMoMTApLnNjcm9sbEludG9WaWV3KG5ldyBVaVNlbGVjdG9yKCkudGV4dChcIlZpZXdzXCIpLmluc3RhbmNlKDApKSc7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsIHNlbGVjdG9yLCBmYWxzZSk7XG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ1ZpZXdzJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIGFsbG93IFVpU2Nyb2xsYWJsZSBzY3JvbGxJbnRvVmlldycsIGFzeW5jICgpID0+IHtcbiAgICBsZXQgc2VsZWN0b3IgPSAnbmV3IFVpU2Nyb2xsYWJsZShuZXcgVWlTZWxlY3RvcigpLnNjcm9sbGFibGUodHJ1ZSkuaW5zdGFuY2UoMCkpLnNjcm9sbEludG9WaWV3KG5ldyBVaVNlbGVjdG9yKCkudGV4dChcIlZpZXdzXCIpLmluc3RhbmNlKDApKTsnO1xuICAgIGxldCBlbCA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnLWFuZHJvaWQgdWlhdXRvbWF0b3InLCBzZWxlY3RvciwgZmFsc2UpO1xuICAgIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsLkVMRU1FTlQpLnNob3VsZC5ldmVudHVhbGx5LmVxdWFsKCdWaWV3cycpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBlcnJvciByZWFzb25hYmx5IGlmIGEgVWlTY3JvbGxhYmxlIGRvZXMgbm90IHJldHVybiBhIFVpT2JqZWN0JywgYXN5bmMgKCkgPT4ge1xuICAgIGxldCBzZWxlY3RvciA9ICduZXcgVWlTY3JvbGxhYmxlKG5ldyBVaVNlbGVjdG9yKCkuc2Nyb2xsYWJsZSh0cnVlKS5pbnN0YW5jZSgwKSkuc2V0TWF4U2VhcmNoU3dpcGVzKDEwKSc7XG4gICAgYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsIHNlbGVjdG9yLCBmYWxzZSlcbiAgICAgIC5zaG91bGQuZXZlbnR1YWxseS5iZS5yZWplY3RlZFdpdGgoL3Jlc291cmNlIGNvdWxkIG5vdCBiZSBmb3VuZC8pO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCBhbGxvdyBVaVNjcm9sbGFibGUgd2l0aCB1bmljb2RlIHN0cmluZycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eSgnaW8uYXBwaXVtLmFuZHJvaWQuYXBpcycsICcudGV4dC5Vbmljb2RlJyk7XG4gICAgbGV0IHNlbGVjdG9yID0gJ25ldyBVaVNlbGVjdG9yKCkudGV4dChcIti52LHYqNmKXCIpLmluc3RhbmNlKDApOyc7XG4gICAgbGV0IGVsID0gYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCctYW5kcm9pZCB1aWF1dG9tYXRvcicsIHNlbGVjdG9yLCBmYWxzZSk7XG4gICAgYXdhaXQgZHJpdmVyLmdldFRleHQoZWwuRUxFTUVOVCkuc2hvdWxkLmV2ZW50dWFsbHkuZXF1YWwoJ9i52LHYqNmKJyk7XG4gIH0pO1xufSk7XG4iXX0=