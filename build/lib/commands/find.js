'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _appiumBaseDriver = require('appium-base-driver');

var commands = {},
    helpers = {},
    extensions = {};

// stategy: locator strategy
// selector: the actual selector for finding an element
// mult: multiple elements or just one?
// context: finding an element from the root context? or starting from another element
helpers.findElOrEls = function callee$0$0(strategy, selector, mult) {
  var context = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];
  var params, element, doFind;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        // throws error if not valid, uses this.locatorStrategies
        this.validateLocatorStrategy(strategy);

        if (selector) {
          context$1$0.next = 3;
          break;
        }

        throw new Error("Must provide a selector when finding elements");

      case 3:
        params = {
          strategy: strategy,
          selector: selector,
          context: context,
          multiple: mult
        };
        element = undefined;

        doFind = function doFind() {
          return _regeneratorRuntime.async(function doFind$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.prev = 0;
                context$2$0.next = 3;
                return _regeneratorRuntime.awrap(this.bootstrap.sendAction('find', params));

              case 3:
                element = context$2$0.sent;
                context$2$0.next = 11;
                break;

              case 6:
                context$2$0.prev = 6;
                context$2$0.t0 = context$2$0['catch'](0);

                if (!(context$2$0.t0.message && context$2$0.t0.message.match(/An element could not be located/))) {
                  context$2$0.next = 10;
                  break;
                }

                return context$2$0.abrupt('return', false);

              case 10:
                throw context$2$0.t0;

              case 11:
                if (!mult) {
                  context$2$0.next = 15;
                  break;
                }

                return context$2$0.abrupt('return', element && element.length !== 0);

              case 15:
                return context$2$0.abrupt('return', !_lodash2['default'].isNull(element));

              case 16:
              case 'end':
                return context$2$0.stop();
            }
          }, null, _this, [[0, 6]]);
        };

        context$1$0.prev = 6;
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(this.implicitWaitForCondition(doFind));

      case 9:
        context$1$0.next = 18;
        break;

      case 11:
        context$1$0.prev = 11;
        context$1$0.t0 = context$1$0['catch'](6);

        if (!(context$1$0.t0.message && context$1$0.t0.message.match(/Condition unmet/))) {
          context$1$0.next = 17;
          break;
        }

        // only get here if we are looking for multiple elements
        // condition was not met setting res to empty array
        element = [];
        context$1$0.next = 18;
        break;

      case 17:
        throw context$1$0.t0;

      case 18:
        if (!mult) {
          context$1$0.next = 22;
          break;
        }

        return context$1$0.abrupt('return', element);

      case 22:
        if (!(!element || _lodash2['default'].size(element) === 0)) {
          context$1$0.next = 24;
          break;
        }

        throw new _appiumBaseDriver.errors.NoSuchElementError();

      case 24:
        return context$1$0.abrupt('return', element);

      case 25:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[6, 11]]);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports['default'] = extensions;

// we are fine with this, just indicate a retry

// we want to return false if we want to potentially try again
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9maW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztzQkFBYyxRQUFROzs7O2dDQUNDLG9CQUFvQjs7QUFHM0MsSUFBSSxRQUFRLEdBQUcsRUFBRTtJQUFFLE9BQU8sR0FBRyxFQUFFO0lBQUUsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBTWpELE9BQU8sQ0FBQyxXQUFXLEdBQUcsb0JBQWdCLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSTtNQUFFLE9BQU8seURBQUcsRUFBRTtNQVF0RSxNQUFNLEVBT04sT0FBTyxFQUNQLE1BQU07Ozs7Ozs7QUFkVixZQUFJLENBQUMsdUJBQXVCLENBQUMsUUFBUSxDQUFDLENBQUM7O1lBRWxDLFFBQVE7Ozs7O2NBQ0wsSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUM7OztBQUc5RCxjQUFNLEdBQUc7QUFDWCxrQkFBUSxFQUFSLFFBQVE7QUFDUixrQkFBUSxFQUFSLFFBQVE7QUFDUixpQkFBTyxFQUFQLE9BQU87QUFDUCxrQkFBUSxFQUFFLElBQUk7U0FDZjtBQUVHLGVBQU87O0FBQ1AsY0FBTSxHQUFHLFNBQVQsTUFBTTs7Ozs7O2lEQUVVLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7OztBQUF6RCx1QkFBTzs7Ozs7Ozs7c0JBRUgsZUFBSSxPQUFPLElBQUksZUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7Ozs7O29EQUU5RCxLQUFLOzs7Ozs7cUJBTVosSUFBSTs7Ozs7b0RBQ0MsT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQzs7O29EQUUvQixDQUFDLG9CQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7U0FFNUI7Ozs7eUNBR08sSUFBSSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQzs7Ozs7Ozs7OztjQUV2QyxlQUFJLE9BQU8sSUFBSSxlQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQTs7Ozs7OztBQUdyRCxlQUFPLEdBQUcsRUFBRSxDQUFDOzs7Ozs7OzthQU1iLElBQUk7Ozs7OzRDQUNDLE9BQU87OztjQUVWLENBQUMsT0FBTyxJQUFJLG9CQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7Ozs7O2NBQzdCLElBQUkseUJBQU8sa0JBQWtCLEVBQUU7Ozs0Q0FFaEMsT0FBTzs7Ozs7OztDQUVqQixDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2ZpbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcblxuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cbi8vIHN0YXRlZ3k6IGxvY2F0b3Igc3RyYXRlZ3lcbi8vIHNlbGVjdG9yOiB0aGUgYWN0dWFsIHNlbGVjdG9yIGZvciBmaW5kaW5nIGFuIGVsZW1lbnRcbi8vIG11bHQ6IG11bHRpcGxlIGVsZW1lbnRzIG9yIGp1c3Qgb25lP1xuLy8gY29udGV4dDogZmluZGluZyBhbiBlbGVtZW50IGZyb20gdGhlIHJvb3QgY29udGV4dD8gb3Igc3RhcnRpbmcgZnJvbSBhbm90aGVyIGVsZW1lbnRcbmhlbHBlcnMuZmluZEVsT3JFbHMgPSBhc3luYyBmdW5jdGlvbiAoc3RyYXRlZ3ksIHNlbGVjdG9yLCBtdWx0LCBjb250ZXh0ID0gJycpIHtcbiAgLy8gdGhyb3dzIGVycm9yIGlmIG5vdCB2YWxpZCwgdXNlcyB0aGlzLmxvY2F0b3JTdHJhdGVnaWVzXG4gIHRoaXMudmFsaWRhdGVMb2NhdG9yU3RyYXRlZ3koc3RyYXRlZ3kpO1xuXG4gIGlmICghc2VsZWN0b3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJNdXN0IHByb3ZpZGUgYSBzZWxlY3RvciB3aGVuIGZpbmRpbmcgZWxlbWVudHNcIik7XG4gIH1cblxuICBsZXQgcGFyYW1zID0ge1xuICAgIHN0cmF0ZWd5LFxuICAgIHNlbGVjdG9yLFxuICAgIGNvbnRleHQsXG4gICAgbXVsdGlwbGU6IG11bHRcbiAgfTtcblxuICBsZXQgZWxlbWVudDtcbiAgbGV0IGRvRmluZCA9IGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgZWxlbWVudCA9IGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oJ2ZpbmQnLCBwYXJhbXMpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyci5tZXNzYWdlICYmIGVyci5tZXNzYWdlLm1hdGNoKC9BbiBlbGVtZW50IGNvdWxkIG5vdCBiZSBsb2NhdGVkLykpIHtcbiAgICAgICAgLy8gd2UgYXJlIGZpbmUgd2l0aCB0aGlzLCBqdXN0IGluZGljYXRlIGEgcmV0cnlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIC8vIHdlIHdhbnQgdG8gcmV0dXJuIGZhbHNlIGlmIHdlIHdhbnQgdG8gcG90ZW50aWFsbHkgdHJ5IGFnYWluXG4gICAgaWYgKG11bHQpIHtcbiAgICAgIHJldHVybiBlbGVtZW50ICYmIGVsZW1lbnQubGVuZ3RoICE9PSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gIV8uaXNOdWxsKGVsZW1lbnQpO1xuICAgIH1cbiAgfTtcblxuICB0cnkge1xuICAgIGF3YWl0IHRoaXMuaW1wbGljaXRXYWl0Rm9yQ29uZGl0aW9uKGRvRmluZCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIubWVzc2FnZSAmJiBlcnIubWVzc2FnZS5tYXRjaCgvQ29uZGl0aW9uIHVubWV0Lykpe1xuICAgICAgLy8gb25seSBnZXQgaGVyZSBpZiB3ZSBhcmUgbG9va2luZyBmb3IgbXVsdGlwbGUgZWxlbWVudHNcbiAgICAgIC8vIGNvbmRpdGlvbiB3YXMgbm90IG1ldCBzZXR0aW5nIHJlcyB0byBlbXB0eSBhcnJheVxuICAgICAgZWxlbWVudCA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgaWYgKG11bHQpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWVsZW1lbnQgfHwgXy5zaXplKGVsZW1lbnQpID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgZXJyb3JzLk5vU3VjaEVsZW1lbnRFcnJvcigpO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxufTtcblxuT2JqZWN0LmFzc2lnbihleHRlbnNpb25zLCBjb21tYW5kcywgaGVscGVycyk7XG5leHBvcnQgeyBjb21tYW5kcywgaGVscGVycyB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdfQ==