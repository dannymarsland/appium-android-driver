'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _this = this;

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiAsPromised = require('chai-as-promised');

var _chaiAsPromised2 = _interopRequireDefault(_chaiAsPromised);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _sampleApps = require('sample-apps');

var _sampleApps2 = _interopRequireDefault(_sampleApps);

var _2 = require('../../..');

var _3 = _interopRequireDefault(_2);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var defaultAsciiCaps = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  deviceName: 'Android',
  platformName: 'Android',
  newCommandTimeout: 90
};

var defaultUnicodeCaps = _lodash2['default'].defaults({
  unicodeKeyboard: true,
  resetKeyboard: true
}, defaultAsciiCaps);

function deSamsungify(text) {
  // For samsung S5 text is appended with ". Editing."
  return text.replace(". Editing.", "");
}

function runTextEditTest(driver, testText) {
  var keys = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var el, text;
  return _regeneratorRuntime.async(function runTextEditTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.t0 = _lodash2['default'];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.EditText', true));

      case 3:
        context$1$0.t1 = context$1$0.sent;
        el = context$1$0.t0.last.call(context$1$0.t0, context$1$0.t1);

        el = el.ELEMENT;
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(driver.clear(el));

      case 8:
        if (!keys) {
          context$1$0.next = 13;
          break;
        }

        context$1$0.next = 11;
        return _regeneratorRuntime.awrap(driver.keys([testText]));

      case 11:
        context$1$0.next = 15;
        break;

      case 13:
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(driver.setValue(testText, el));

      case 15:
        context$1$0.next = 17;
        return _regeneratorRuntime.awrap(driver.getText(el));

      case 17:
        text = context$1$0.sent;

        deSamsungify(text).should.be.equal(testText);

        return context$1$0.abrupt('return', el);

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runCombinationKeyEventTest(driver) {
  var runTest, text;
  return _regeneratorRuntime.async(function runCombinationKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        runTest = function runTest() {
          var el;
          return _regeneratorRuntime.async(function runTest$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.pressKeyCode(29, 193));

              case 2:
                context$2$0.t0 = _lodash2['default'];
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

              case 5:
                context$2$0.t1 = context$2$0.sent;
                el = context$2$0.t0.last.call(context$2$0.t0, context$2$0.t1);

                el = el.ELEMENT;
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap(driver.getText(el));

              case 10:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 11:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        };

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(runTest());

      case 3:
        text = context$1$0.sent;

        if (!(text === '')) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(runTest());

      case 7:
        text = context$1$0.sent;

      case 8:
        text.should.include('keyCode=KEYCODE_A');
        text.should.include('metaState=META_SHIFT_ON');

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function runKeyEventTest(driver) {
  var runTest, text;
  return _regeneratorRuntime.async(function runKeyEventTest$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        runTest = function runTest() {
          var el;
          return _regeneratorRuntime.async(function runTest$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                context$2$0.next = 2;
                return _regeneratorRuntime.awrap(driver.pressKeyCode(82));

              case 2:
                context$2$0.t0 = _lodash2['default'];
                context$2$0.next = 5;
                return _regeneratorRuntime.awrap(driver.findElOrEls('class name', 'android.widget.TextView', true));

              case 5:
                context$2$0.t1 = context$2$0.sent;
                el = context$2$0.t0.last.call(context$2$0.t0, context$2$0.t1);

                el = el.ELEMENT;
                context$2$0.next = 10;
                return _regeneratorRuntime.awrap(driver.getText(el));

              case 10:
                return context$2$0.abrupt('return', context$2$0.sent);

              case 11:
              case 'end':
                return context$2$0.stop();
            }
          }, null, this);
        };

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(runTest());

      case 3:
        text = context$1$0.sent;

        if (!(text === '')) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(runTest());

      case 7:
        text = context$1$0.sent;

      case 8:
        text.should.include('[keycode=82]');
        text.should.include('keyCode=KEYCODE_MENU');

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var tests = [{ label: 'editing a text field', text: 'Life, the Universe and Everything.' }, { label: 'sending \'&-\'', text: '&-' }, { label: 'sending \'&\' and \'-\' in other text', text: 'In the mid-1990s he ate fish & chips as mayor-elect.' }, { label: 'sending \'-\' in text', text: 'Super-test.' }, { label: 'sending numbers', text: '0123456789' }];

var unicodeTests = _lodash2['default'].union(tests, [{ label: 'should be able to send \'-\' in unicode text', text: 'परीक्षा-परीक्षण' }, { label: 'should be able to send \'&\' in text', text: 'Fish & chips' }, { label: 'should be able to send \'&\' in unicode text', text: 'Mīna & chips' }, { label: 'should be able to send roman characters with diacritics', text: 'Áé Œ ù ḍ' }, { label: 'should be able to send a \'u\' with an umlaut', text: 'ü' }]);

var languageTests = [{ label: 'should be able to send Tamil', text: 'சோதனை' }, { label: 'should be able to send Gujarati', text: 'પરીક્ષણ' }, { label: 'should be able to send Chinese', text: '测试' }, { label: 'should be able to send Russian', text: 'тестирование' }];

// skip rtl languages, which don't clear correctly atm
// { label: 'should be able to send Arabic', 'تجريب'],
// { label: 'should be able to send Hebrew', 'בדיקות'],
describe('keyboard', function () {
  describe('ascii', function () {
    var driver = undefined;
    before(function callee$2$0() {
      var engines;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _3['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(defaultAsciiCaps));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(driver.availableIMEEngines());

          case 5:
            engines = context$3$0.sent;
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(driver.activateIMEEngine(_lodash2['default'].first(engines)));

          case 8:
            console.log(engines);

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    describe('editing a text field', function () {
      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity('io.appium.android.apis', '.view.TextFields'));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function () {
          var test = _step.value;

          describe(test.label, function () {
            it('should work with setValue', function callee$5$0() {
              return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                while (1) switch (context$6$0.prev = context$6$0.next) {
                  case 0:
                    context$6$0.next = 2;
                    return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text));

                  case 2:
                  case 'end':
                    return context$6$0.stop();
                }
              }, null, _this);
            });
            it('should work with keys', function callee$5$0() {
              return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                while (1) switch (context$6$0.prev = context$6$0.next) {
                  case 0:
                    context$6$0.next = 2;
                    return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text, true));

                  case 2:
                  case 'end':
                    return context$6$0.stop();
                }
              }, null, _this);
            });
          });
        };

        for (var _iterator = _getIterator(tests), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    });

    describe('sending a key event', function () {
      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity('io.appium.android.apis', '.text.KeyEventText'));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should be able to send combination keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runCombinationKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should be able to send keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
  });

  describe('unicode', function () {
    var driver = undefined;
    before(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            driver = new _3['default']();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(driver.createSession(defaultUnicodeCaps));

          case 3:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });
    after(function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(driver.deleteSession());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this);
    });

    describe('editing a text field', function () {
      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity('io.appium.android.apis', '.view.TextFields'));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      var _arr = [tests, unicodeTests, languageTests];
      for (var _i = 0; _i < _arr.length; _i++) {
        var testSet = _arr[_i];var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          var _loop2 = function () {
            var test = _step2.value;

            describe(test.label, function () {
              it('should work with setValue', function callee$5$0() {
                return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                  while (1) switch (context$6$0.prev = context$6$0.next) {
                    case 0:
                      context$6$0.next = 2;
                      return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text));

                    case 2:
                    case 'end':
                      return context$6$0.stop();
                  }
                }, null, _this);
              });
              it('should work with keys', function callee$5$0() {
                return _regeneratorRuntime.async(function callee$5$0$(context$6$0) {
                  while (1) switch (context$6$0.prev = context$6$0.next) {
                    case 0:
                      context$6$0.next = 2;
                      return _regeneratorRuntime.awrap(runTextEditTest(driver, test.text, true));

                    case 2:
                    case 'end':
                      return context$6$0.stop();
                  }
                }, null, _this);
              });
            });
          };

          for (var _iterator2 = _getIterator(testSet), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    });

    describe('sending a key event', function () {
      beforeEach(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity('io.appium.android.apis', '.text.KeyEventText'));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      it('should be able to send combination keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runCombinationKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
      it('should be able to send keyevents', function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(runKeyEventTest(driver));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });
  });
});

// the test is flakey... try again

// the test is flakey... try again

// sometimes the default ime is not what we are using
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9rZXlib2FyZC1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7MEJBQ0MsYUFBYTs7OztpQkFDVixVQUFVOzs7O0FBR3BDLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBSSxnQkFBZ0IsR0FBRztBQUNyQixLQUFHLEVBQUUsNkJBQVcsZ0JBQWdCLENBQUM7QUFDakMsWUFBVSxFQUFFLFNBQVM7QUFDckIsY0FBWSxFQUFFLFNBQVM7QUFDdkIsbUJBQWlCLEVBQUUsRUFBRTtDQUN0QixDQUFDOztBQUVGLElBQUksa0JBQWtCLEdBQUcsb0JBQUUsUUFBUSxDQUFDO0FBQ2xDLGlCQUFlLEVBQUUsSUFBSTtBQUNyQixlQUFhLEVBQUUsSUFBSTtDQUNwQixFQUFFLGdCQUFnQixDQUFDLENBQUM7O0FBRXJCLFNBQVMsWUFBWSxDQUFFLElBQUksRUFBRTs7QUFFM0IsU0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztDQUN2Qzs7QUFFRCxTQUFlLGVBQWUsQ0FBRSxNQUFNLEVBQUUsUUFBUTtNQUFFLElBQUkseURBQUcsS0FBSztNQUN4RCxFQUFFLEVBVUYsSUFBSTs7Ozs7O3lDQVZjLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLHlCQUF5QixFQUFFLElBQUksQ0FBQzs7OztBQUFuRixVQUFFLGtCQUFLLElBQUk7O0FBQ2YsVUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUM7O3lDQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDOzs7YUFFbEIsSUFBSTs7Ozs7O3lDQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7Ozs7eUNBRXZCLE1BQU0sQ0FB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cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xuXG5cbmNoYWkuc2hvdWxkKCk7XG5jaGFpLnVzZShjaGFpQXNQcm9taXNlZCk7XG5cbmxldCBkZWZhdWx0QXNjaWlDYXBzID0ge1xuICBhcHA6IHNhbXBsZUFwcHMoJ0FwaURlbW9zLWRlYnVnJyksXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcbiAgcGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsXG4gIG5ld0NvbW1hbmRUaW1lb3V0OiA5MFxufTtcblxubGV0IGRlZmF1bHRVbmljb2RlQ2FwcyA9IF8uZGVmYXVsdHMoe1xuICB1bmljb2RlS2V5Ym9hcmQ6IHRydWUsXG4gIHJlc2V0S2V5Ym9hcmQ6IHRydWVcbn0sIGRlZmF1bHRBc2NpaUNhcHMpO1xuXG5mdW5jdGlvbiBkZVNhbXN1bmdpZnkgKHRleHQpIHtcbiAgLy8gRm9yIHNhbXN1bmcgUzUgdGV4dCBpcyBhcHBlbmRlZCB3aXRoIFwiLiBFZGl0aW5nLlwiXG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoXCIuIEVkaXRpbmcuXCIsIFwiXCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5UZXh0RWRpdFRlc3QgKGRyaXZlciwgdGVzdFRleHQsIGtleXMgPSBmYWxzZSkge1xuICBsZXQgZWwgPSBfLmxhc3QoYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LkVkaXRUZXh0JywgdHJ1ZSkpO1xuICBlbCA9IGVsLkVMRU1FTlQ7XG4gIGF3YWl0IGRyaXZlci5jbGVhcihlbCk7XG5cbiAgaWYgKGtleXMpIHtcbiAgICBhd2FpdCBkcml2ZXIua2V5cyhbdGVzdFRleHRdKTtcbiAgfSBlbHNlIHtcbiAgICBhd2FpdCBkcml2ZXIuc2V0VmFsdWUodGVzdFRleHQsIGVsKTtcbiAgfVxuXG4gIGxldCB0ZXh0ID0gYXdhaXQgZHJpdmVyLmdldFRleHQoZWwpO1xuICBkZVNhbXN1bmdpZnkodGV4dCkuc2hvdWxkLmJlLmVxdWFsKHRlc3RUZXh0KTtcblxuICByZXR1cm4gZWw7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkNvbWJpbmF0aW9uS2V5RXZlbnRUZXN0IChkcml2ZXIpIHtcbiAgbGV0IHJ1blRlc3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnByZXNzS2V5Q29kZSgyOSwgMTkzKTtcbiAgICBsZXQgZWwgPSBfLmxhc3QoYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3JywgdHJ1ZSkpO1xuICAgIGVsID0gZWwuRUxFTUVOVDtcbiAgICByZXR1cm4gYXdhaXQgZHJpdmVyLmdldFRleHQoZWwpO1xuICB9O1xuXG4gIGxldCB0ZXh0ID0gYXdhaXQgcnVuVGVzdCgpO1xuICBpZiAodGV4dCA9PT0gJycpIHtcbiAgICAvLyB0aGUgdGVzdCBpcyBmbGFrZXkuLi4gdHJ5IGFnYWluXG4gICAgdGV4dCA9IGF3YWl0IHJ1blRlc3QoKTtcbiAgfVxuICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdrZXlDb2RlPUtFWUNPREVfQScpO1xuICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdtZXRhU3RhdGU9TUVUQV9TSElGVF9PTicpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5LZXlFdmVudFRlc3QgKGRyaXZlcikge1xuICBsZXQgcnVuVGVzdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIucHJlc3NLZXlDb2RlKDgyKTtcbiAgICBsZXQgZWwgPSBfLmxhc3QoYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgJ2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3JywgdHJ1ZSkpO1xuICAgIGVsID0gZWwuRUxFTUVOVDtcbiAgICByZXR1cm4gYXdhaXQgZHJpdmVyLmdldFRleHQoZWwpO1xuICB9O1xuICBsZXQgdGV4dCA9IGF3YWl0IHJ1blRlc3QoKTtcbiAgaWYgKHRleHQgPT09ICcnKSB7XG4gICAgLy8gdGhlIHRlc3QgaXMgZmxha2V5Li4uIHRyeSBhZ2FpblxuICAgIHRleHQgPSBhd2FpdCBydW5UZXN0KCk7XG4gIH1cbiAgdGV4dC5zaG91bGQuaW5jbHVkZSgnW2tleWNvZGU9ODJdJyk7XG4gIHRleHQuc2hvdWxkLmluY2x1ZGUoJ2tleUNvZGU9S0VZQ09ERV9NRU5VJyk7XG59XG5cbmxldCB0ZXN0cyA9IFtcbiAgeyBsYWJlbDogJ2VkaXRpbmcgYSB0ZXh0IGZpZWxkJywgdGV4dDogJ0xpZmUsIHRoZSBVbml2ZXJzZSBhbmQgRXZlcnl0aGluZy4nIH0sXG4gIHsgbGFiZWw6ICdzZW5kaW5nIFxcJyYtXFwnJywgdGV4dDogJyYtJyB9LFxuICB7IGxhYmVsOiAnc2VuZGluZyBcXCcmXFwnIGFuZCBcXCctXFwnIGluIG90aGVyIHRleHQnLCB0ZXh0OiAnSW4gdGhlIG1pZC0xOTkwcyBoZSBhdGUgZmlzaCAmIGNoaXBzIGFzIG1heW9yLWVsZWN0LicgfSxcbiAgeyBsYWJlbDogJ3NlbmRpbmcgXFwnLVxcJyBpbiB0ZXh0JywgdGV4dDogJ1N1cGVyLXRlc3QuJyB9LFxuICB7IGxhYmVsOiAnc2VuZGluZyBudW1iZXJzJywgdGV4dDogJzAxMjM0NTY3ODknfSxcbl07XG5cbmxldCB1bmljb2RlVGVzdHMgPSBfLnVuaW9uKHRlc3RzLCBbXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFxcJy1cXCcgaW4gdW5pY29kZSB0ZXh0JywgdGV4dDogJ+CkquCksOClgOCkleCljeCkt+Ckvi3gpKrgpLDgpYDgpJXgpY3gpLfgpKMnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFxcJyZcXCcgaW4gdGV4dCcsIHRleHQ6ICdGaXNoICYgY2hpcHMnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFxcJyZcXCcgaW4gdW5pY29kZSB0ZXh0JywgdGV4dDogJ03Eq25hICYgY2hpcHMnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIHJvbWFuIGNoYXJhY3RlcnMgd2l0aCBkaWFjcml0aWNzJywgdGV4dDogJ8OBw6kgxZIgw7kg4biNJyB9LFxuICB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBhIFxcJ3VcXCcgd2l0aCBhbiB1bWxhdXQnLCB0ZXh0OiAnw7wnIH0sXG5dKTtcblxubGV0IGxhbmd1YWdlVGVzdHMgPSBbXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFRhbWlsJywgdGV4dDogJ+CumuCvh+CuvuCupOCuqeCviCcgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgR3VqYXJhdGknLCB0ZXh0OiAn4Kqq4Kqw4KuA4KqV4KuN4Kq34KqjJyB9LFxuICB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBDaGluZXNlJywgdGV4dDogJ+a1i+ivlScgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgUnVzc2lhbicsIHRleHQ6ICfRgtC10YHRgtC40YDQvtCy0LDQvdC40LUnIH0sXG4gIC8vIHNraXAgcnRsIGxhbmd1YWdlcywgd2hpY2ggZG9uJ3QgY2xlYXIgY29ycmVjdGx5IGF0bVxuICAvLyB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBBcmFiaWMnLCAn2KrYrNix2YrYqCddLFxuICAvLyB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBIZWJyZXcnLCAn15HXk9eZ16fXldeqJ10sXG5dO1xuXG5kZXNjcmliZSgna2V5Ym9hcmQnLCAoKSA9PiB7XG4gIGRlc2NyaWJlKCdhc2NpaScsICgpID0+IHtcbiAgICBsZXQgZHJpdmVyO1xuICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICBkcml2ZXIgPSBuZXcgQW5kcm9pZERyaXZlcigpO1xuICAgICAgYXdhaXQgZHJpdmVyLmNyZWF0ZVNlc3Npb24oZGVmYXVsdEFzY2lpQ2Fwcyk7XG5cbiAgICAgIC8vIHNvbWV0aW1lcyB0aGUgZGVmYXVsdCBpbWUgaXMgbm90IHdoYXQgd2UgYXJlIHVzaW5nXG4gICAgICBsZXQgZW5naW5lcyA9IGF3YWl0IGRyaXZlci5hdmFpbGFibGVJTUVFbmdpbmVzKCk7XG4gICAgICBhd2FpdCBkcml2ZXIuYWN0aXZhdGVJTUVFbmdpbmUoXy5maXJzdChlbmdpbmVzKSk7XG4gICAgICBjb25zb2xlLmxvZyhlbmdpbmVzKTtcbiAgICB9KTtcbiAgICBhZnRlcihhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBkcml2ZXIuZGVsZXRlU2Vzc2lvbigpO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2VkaXRpbmcgYSB0ZXh0IGZpZWxkJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJywgJy52aWV3LlRleHRGaWVsZHMnKTtcbiAgICAgIH0pO1xuXG4gICAgICBmb3IgKGxldCB0ZXN0IG9mIHRlc3RzKSB7XG4gICAgICAgIGRlc2NyaWJlKHRlc3QubGFiZWwsICgpID0+IHtcbiAgICAgICAgICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBzZXRWYWx1ZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHJ1blRleHRFZGl0VGVzdChkcml2ZXIsIHRlc3QudGV4dCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaXQoJ3Nob3VsZCB3b3JrIHdpdGgga2V5cycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHJ1blRleHRFZGl0VGVzdChkcml2ZXIsIHRlc3QudGV4dCwgdHJ1ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NlbmRpbmcgYSBrZXkgZXZlbnQnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLCAnLnRleHQuS2V5RXZlbnRUZXh0Jyk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgY29tYmluYXRpb24ga2V5ZXZlbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBydW5Db21iaW5hdGlvbktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBrZXlldmVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHJ1bktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd1bmljb2RlJywgKCkgPT4ge1xuICAgIGxldCBkcml2ZXI7XG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0VW5pY29kZUNhcHMpO1xuICAgIH0pO1xuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZWRpdGluZyBhIHRleHQgZmllbGQnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgZHJpdmVyLnN0YXJ0QWN0aXZpdHkoJ2lvLmFwcGl1bS5hbmRyb2lkLmFwaXMnLCAnLnZpZXcuVGV4dEZpZWxkcycpO1xuICAgICAgfSk7XG5cbiAgICAgIGZvciAobGV0IHRlc3RTZXQgb2YgW3Rlc3RzLCB1bmljb2RlVGVzdHMsIGxhbmd1YWdlVGVzdHNdKSB7XG4gICAgICAgIGZvciAobGV0IHRlc3Qgb2YgdGVzdFNldCkge1xuICAgICAgICAgIGRlc2NyaWJlKHRlc3QubGFiZWwsICgpID0+IHtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgd29yayB3aXRoIHNldFZhbHVlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBrZXlzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgICBhd2FpdCBydW5UZXh0RWRpdFRlc3QoZHJpdmVyLCB0ZXN0LnRleHQsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdzZW5kaW5nIGEga2V5IGV2ZW50JywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KCdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJywgJy50ZXh0LktleUV2ZW50VGV4dCcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzZW5kIGNvbWJpbmF0aW9uIGtleWV2ZW50cycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgcnVuQ29tYmluYXRpb25LZXlFdmVudFRlc3QoZHJpdmVyKTtcbiAgICAgIH0pO1xuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQga2V5ZXZlbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBydW5LZXlFdmVudFRlc3QoZHJpdmVyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl19