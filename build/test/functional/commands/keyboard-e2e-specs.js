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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

_chai2['default'].should();
_chai2['default'].use(_chaiAsPromised2['default']);

var BUTTON_CLASS = 'android.widget.Button';
var EDITTEXT_CLASS = 'android.widget.EditText';
var TEXTVIEW_CLASS = 'android.widget.TextView';

var PACKAGE = 'io.appium.android.apis';
var TEXTFIELD_ACTIVITY = '.view.TextFields';
var KEYEVENT_ACTIVITY = '.text.KeyEventText';

var defaultAsciiCaps = {
  app: (0, _sampleApps2['default'])('ApiDemos-debug'),
  deviceName: 'Android',
  platformName: 'Android',
  newCommandTimeout: 90,
  appPackage: PACKAGE,
  appActivity: TEXTFIELD_ACTIVITY
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
        return _regeneratorRuntime.awrap(driver.findElOrEls('class name', EDITTEXT_CLASS, true));

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

/*
 * The key event page needs to be cleared between runs, or else we get false
 * positives from previously run tests. The page has a single button that
 * removes all text from within the main TextView.
 */
function clearKeyEvents(driver) {
  var el;
  return _regeneratorRuntime.async(function clearKeyEvents$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.t0 = _lodash2['default'];
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(driver.findElOrEls('class name', BUTTON_CLASS, true));

      case 3:
        context$1$0.t1 = context$1$0.sent;
        el = context$1$0.t0.last.call(context$1$0.t0, context$1$0.t1);

        driver.click(el.ELEMENT);

        // wait a moment for the clearing to occur, lest we too quickly try to enter more text
        context$1$0.next = 8;
        return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

      case 8:
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
                return _regeneratorRuntime.awrap(driver.findElOrEls('class name', TEXTVIEW_CLASS, true));

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
        return _regeneratorRuntime.awrap(clearKeyEvents(driver));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(runTest());

      case 5:
        text = context$1$0.sent;

        if (!(text === '')) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(runTest());

      case 9:
        text = context$1$0.sent;

      case 10:
        text.should.include('keyCode=KEYCODE_A');
        text.should.include('metaState=META_SHIFT_ON');

      case 12:
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
                return _regeneratorRuntime.awrap(driver.findElOrEls('class name', TEXTVIEW_CLASS, true));

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
        return _regeneratorRuntime.awrap(clearKeyEvents(driver));

      case 3:
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(runTest());

      case 5:
        text = context$1$0.sent;

        if (!(text === '')) {
          context$1$0.next = 10;
          break;
        }

        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(runTest());

      case 9:
        text = context$1$0.sent;

      case 10:
        text.should.include('[keycode=82]');
        text.should.include('keyCode=KEYCODE_MENU');

      case 12:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

var tests = [{ label: 'editing a text field', text: 'Life, the Universe and Everything.' }, { label: 'sending \'&-\'', text: '&-' }, { label: 'sending \'&\' and \'-\' in other text', text: 'In the mid-1990s he ate fish & chips as mayor-elect.' }, { label: 'sending \'-\' in text', text: 'Super-test.' }, { label: 'sending numbers', text: '0123456789' }];

var unicodeTests = [{ label: 'should be able to send \'-\' in unicode text', text: 'परीक्षा-परीक्षण' }, { label: 'should be able to send \'&\' in text', text: 'Fish & chips' }, { label: 'should be able to send \'&\' in unicode text', text: 'Mīna & chips' }, { label: 'should be able to send roman characters with diacritics', text: 'Áé Œ ù ḍ' }, { label: 'should be able to send a \'u\' with an umlaut', text: 'ü' }];

var languageTests = [{ label: 'should be able to send Tamil', text: 'சோதனை' }, { label: 'should be able to send Gujarati', text: 'પરીક્ષણ' }, { label: 'should be able to send Chinese', text: '测试' }, { label: 'should be able to send Russian', text: 'тестирование' }, { label: 'should be able to send Arabic', text: 'تجريب' }, { label: 'should be able to send Hebrew', text: 'בדיקות' }];

describe('keyboard', function () {
  describe('ascii', function () {
    var driver = undefined;
    before(function callee$2$0() {
      var engines, selectedEngine, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, engine;

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
            selectedEngine = _lodash2['default'].first(engines);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$3$0.prev = 10;

            for (_iterator = _getIterator(engines); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              engine = _step.value;

              // it seems that the latin ime has `android.inputmethod` in its package name
              if (engine.indexOf('android.inputmethod') !== -1) {
                selectedEngine = engine;
              }
            }
            context$3$0.next = 18;
            break;

          case 14:
            context$3$0.prev = 14;
            context$3$0.t0 = context$3$0['catch'](10);
            _didIteratorError = true;
            _iteratorError = context$3$0.t0;

          case 18:
            context$3$0.prev = 18;
            context$3$0.prev = 19;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 21:
            context$3$0.prev = 21;

            if (!_didIteratorError) {
              context$3$0.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return context$3$0.finish(21);

          case 25:
            return context$3$0.finish(18);

          case 26:
            context$3$0.next = 28;
            return _regeneratorRuntime.awrap(driver.activateIMEEngine(selectedEngine));

          case 28:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[10, 14, 18, 26], [19,, 21, 25]]);
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
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, TEXTFIELD_ACTIVITY));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        var _loop = function () {
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

        for (var _iterator2 = _getIterator(tests), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          _loop();
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

      it('should be able to clear a password field', function callee$3$0() {
        var els, el;
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.findElOrEls('class name', EDITTEXT_CLASS, true));

            case 2:
              els = context$4$0.sent;
              el = els[1].ELEMENT;
              context$4$0.next = 6;
              return _regeneratorRuntime.awrap(driver.setValue('super-duper password', el));

            case 6:
              context$4$0.next = 8;
              return _regeneratorRuntime.awrap(driver.clear(el));

            case 8:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, KEYEVENT_ACTIVITY));

            case 2:
              context$4$0.next = 4;
              return _regeneratorRuntime.awrap(_bluebird2['default'].delay(500));

            case 4:
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
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, TEXTFIELD_ACTIVITY));

            case 2:
            case 'end':
              return context$4$0.stop();
          }
        }, null, _this);
      });

      var _arr = [tests, unicodeTests, languageTests];
      for (var _i = 0; _i < _arr.length; _i++) {
        var testSet = _arr[_i];var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          var _loop2 = function () {
            var test = _step3.value;

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

          for (var _iterator3 = _getIterator(testSet), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            _loop2();
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      }
    });

    describe('sending a key event', function () {
      before(function callee$3$0() {
        return _regeneratorRuntime.async(function callee$3$0$(context$4$0) {
          while (1) switch (context$4$0.prev = context$4$0.next) {
            case 0:
              context$4$0.next = 2;
              return _regeneratorRuntime.awrap(driver.startActivity(PACKAGE, KEYEVENT_ACTIVITY));

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

// there is currently no way to assert anything about the contents
// of a password field, since there is no way to access the contents
// but this should, at the very least, not fail
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvZnVuY3Rpb25hbC9jb21tYW5kcy9rZXlib2FyZC1lMmUtc3BlY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztvQkFBaUIsTUFBTTs7Ozs4QkFDSSxrQkFBa0I7Ozs7c0JBQy9CLFFBQVE7Ozs7MEJBQ0MsYUFBYTs7OztpQkFDVixVQUFVOzs7O3dCQUN0QixVQUFVOzs7O0FBRXhCLGtCQUFLLE1BQU0sRUFBRSxDQUFDO0FBQ2Qsa0JBQUssR0FBRyw2QkFBZ0IsQ0FBQzs7QUFFekIsSUFBTSxZQUFZLEdBQUcsdUJBQXVCLENBQUM7QUFDN0MsSUFBTSxjQUFjLEdBQUcseUJBQXlCLENBQUM7QUFDakQsSUFBTSxjQUFjLEdBQUcseUJBQXlCLENBQUM7O0FBRWpELElBQU0sT0FBTyxHQUFHLHdCQUF3QixDQUFDO0FBQ3pDLElBQU0sa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDOUMsSUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQzs7QUFFL0MsSUFBSSxnQkFBZ0IsR0FBRztBQUNyQixLQUFHLEVBQUUsNkJBQVcsZ0JBQWdCLENBQUM7QUFDakMsWUFBVSxFQUFFLFNBQVM7QUFDckIsY0FBWSxFQUFFLFNBQVM7QUFDdkIsbUJBQWlCLEVBQUUsRUFBRTtBQUNyQixZQUFVLEVBQUUsT0FBTztBQUNuQixhQUFXLEVBQUUsa0JBQWtCO0NBQ2hDLENBQUM7O0FBRUYsSUFBSSxrQkFBa0IsR0FBRyxvQkFBRSxRQUFRLENBQUM7QUFDbEMsaUJBQWUsRUFBRSxJQUFJO0FBQ3JCLGVBQWEsRUFBRSxJQUFJO0NBQ3BCLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFckIsU0FBUyxZQUFZLENBQUUsSUFBSSxFQUFFOztBQUUzQixTQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0NBQ3ZDOztBQUVELFNBQWUsZUFBZSxDQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsSUFBSSx5REFBRyxLQUFLO01BQ3hE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QUFDLENBQUM7QUFDSCxRQUFFLENBQUMsa0NBQWtDLEVBQUU7Ozs7OytDQUMvQixlQUFlLENBQUMsTUFBTSxDQUFDOzs7Ozs7O09BQzlCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztHQUNKLENBQUMsQ0FBQztDQUNKLENBQUMsQ0FBQyIsImZpbGUiOiJ0ZXN0L2Z1bmN0aW9uYWwvY29tbWFuZHMva2V5Ym9hcmQtZTJlLXNwZWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoYWkgZnJvbSAnY2hhaSc7XG5pbXBvcnQgY2hhaUFzUHJvbWlzZWQgZnJvbSAnY2hhaS1hcy1wcm9taXNlZCc7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHNhbXBsZUFwcHMgZnJvbSAnc2FtcGxlLWFwcHMnO1xuaW1wb3J0IEFuZHJvaWREcml2ZXIgZnJvbSAnLi4vLi4vLi4nO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuXG5jaGFpLnNob3VsZCgpO1xuY2hhaS51c2UoY2hhaUFzUHJvbWlzZWQpO1xuXG5jb25zdCBCVVRUT05fQ0xBU1MgPSAnYW5kcm9pZC53aWRnZXQuQnV0dG9uJztcbmNvbnN0IEVESVRURVhUX0NMQVNTID0gJ2FuZHJvaWQud2lkZ2V0LkVkaXRUZXh0JztcbmNvbnN0IFRFWFRWSUVXX0NMQVNTID0gJ2FuZHJvaWQud2lkZ2V0LlRleHRWaWV3JztcblxuY29uc3QgUEFDS0FHRSA9ICdpby5hcHBpdW0uYW5kcm9pZC5hcGlzJztcbmNvbnN0IFRFWFRGSUVMRF9BQ1RJVklUWSA9ICcudmlldy5UZXh0RmllbGRzJztcbmNvbnN0IEtFWUVWRU5UX0FDVElWSVRZID0gJy50ZXh0LktleUV2ZW50VGV4dCc7XG5cbmxldCBkZWZhdWx0QXNjaWlDYXBzID0ge1xuICBhcHA6IHNhbXBsZUFwcHMoJ0FwaURlbW9zLWRlYnVnJyksXG4gIGRldmljZU5hbWU6ICdBbmRyb2lkJyxcbiAgcGxhdGZvcm1OYW1lOiAnQW5kcm9pZCcsXG4gIG5ld0NvbW1hbmRUaW1lb3V0OiA5MCxcbiAgYXBwUGFja2FnZTogUEFDS0FHRSxcbiAgYXBwQWN0aXZpdHk6IFRFWFRGSUVMRF9BQ1RJVklUWVxufTtcblxubGV0IGRlZmF1bHRVbmljb2RlQ2FwcyA9IF8uZGVmYXVsdHMoe1xuICB1bmljb2RlS2V5Ym9hcmQ6IHRydWUsXG4gIHJlc2V0S2V5Ym9hcmQ6IHRydWVcbn0sIGRlZmF1bHRBc2NpaUNhcHMpO1xuXG5mdW5jdGlvbiBkZVNhbXN1bmdpZnkgKHRleHQpIHtcbiAgLy8gRm9yIHNhbXN1bmcgUzUgdGV4dCBpcyBhcHBlbmRlZCB3aXRoIFwiLiBFZGl0aW5nLlwiXG4gIHJldHVybiB0ZXh0LnJlcGxhY2UoXCIuIEVkaXRpbmcuXCIsIFwiXCIpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5UZXh0RWRpdFRlc3QgKGRyaXZlciwgdGVzdFRleHQsIGtleXMgPSBmYWxzZSkge1xuICBsZXQgZWwgPSBfLmxhc3QoYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgRURJVFRFWFRfQ0xBU1MsIHRydWUpKTtcbiAgZWwgPSBlbC5FTEVNRU5UO1xuICBhd2FpdCBkcml2ZXIuY2xlYXIoZWwpO1xuXG4gIGlmIChrZXlzKSB7XG4gICAgYXdhaXQgZHJpdmVyLmtleXMoW3Rlc3RUZXh0XSk7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgZHJpdmVyLnNldFZhbHVlKHRlc3RUZXh0LCBlbCk7XG4gIH1cblxuICBsZXQgdGV4dCA9IGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsKTtcbiAgZGVTYW1zdW5naWZ5KHRleHQpLnNob3VsZC5iZS5lcXVhbCh0ZXN0VGV4dCk7XG5cbiAgcmV0dXJuIGVsO1xufVxuXG4vKlxuICogVGhlIGtleSBldmVudCBwYWdlIG5lZWRzIHRvIGJlIGNsZWFyZWQgYmV0d2VlbiBydW5zLCBvciBlbHNlIHdlIGdldCBmYWxzZVxuICogcG9zaXRpdmVzIGZyb20gcHJldmlvdXNseSBydW4gdGVzdHMuIFRoZSBwYWdlIGhhcyBhIHNpbmdsZSBidXR0b24gdGhhdFxuICogcmVtb3ZlcyBhbGwgdGV4dCBmcm9tIHdpdGhpbiB0aGUgbWFpbiBUZXh0Vmlldy5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY2xlYXJLZXlFdmVudHMgKGRyaXZlcikge1xuICBsZXQgZWwgPSBfLmxhc3QoYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgQlVUVE9OX0NMQVNTLCB0cnVlKSk7XG4gIGRyaXZlci5jbGljayhlbC5FTEVNRU5UKTtcblxuICAvLyB3YWl0IGEgbW9tZW50IGZvciB0aGUgY2xlYXJpbmcgdG8gb2NjdXIsIGxlc3Qgd2UgdG9vIHF1aWNrbHkgdHJ5IHRvIGVudGVyIG1vcmUgdGV4dFxuICBhd2FpdCBCLmRlbGF5KDUwMCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkNvbWJpbmF0aW9uS2V5RXZlbnRUZXN0IChkcml2ZXIpIHtcbiAgbGV0IHJ1blRlc3QgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgZHJpdmVyLnByZXNzS2V5Q29kZSgyOSwgMTkzKTtcbiAgICBsZXQgZWwgPSBfLmxhc3QoYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgVEVYVFZJRVdfQ0xBU1MsIHRydWUpKTtcbiAgICBlbCA9IGVsLkVMRU1FTlQ7XG4gICAgcmV0dXJuIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsKTtcbiAgfTtcblxuICBhd2FpdCBjbGVhcktleUV2ZW50cyhkcml2ZXIpO1xuXG4gIGxldCB0ZXh0ID0gYXdhaXQgcnVuVGVzdCgpO1xuICBpZiAodGV4dCA9PT0gJycpIHtcbiAgICAvLyB0aGUgdGVzdCBpcyBmbGFrZXkuLi4gdHJ5IGFnYWluXG4gICAgdGV4dCA9IGF3YWl0IHJ1blRlc3QoKTtcbiAgfVxuICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdrZXlDb2RlPUtFWUNPREVfQScpO1xuICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdtZXRhU3RhdGU9TUVUQV9TSElGVF9PTicpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5LZXlFdmVudFRlc3QgKGRyaXZlcikge1xuICBsZXQgcnVuVGVzdCA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCBkcml2ZXIucHJlc3NLZXlDb2RlKDgyKTtcbiAgICBsZXQgZWwgPSBfLmxhc3QoYXdhaXQgZHJpdmVyLmZpbmRFbE9yRWxzKCdjbGFzcyBuYW1lJywgVEVYVFZJRVdfQ0xBU1MsIHRydWUpKTtcbiAgICBlbCA9IGVsLkVMRU1FTlQ7XG4gICAgcmV0dXJuIGF3YWl0IGRyaXZlci5nZXRUZXh0KGVsKTtcbiAgfTtcblxuICBhd2FpdCBjbGVhcktleUV2ZW50cyhkcml2ZXIpO1xuXG4gIGxldCB0ZXh0ID0gYXdhaXQgcnVuVGVzdCgpO1xuICBpZiAodGV4dCA9PT0gJycpIHtcbiAgICAvLyB0aGUgdGVzdCBpcyBmbGFrZXkuLi4gdHJ5IGFnYWluXG4gICAgdGV4dCA9IGF3YWl0IHJ1blRlc3QoKTtcbiAgfVxuICB0ZXh0LnNob3VsZC5pbmNsdWRlKCdba2V5Y29kZT04Ml0nKTtcbiAgdGV4dC5zaG91bGQuaW5jbHVkZSgna2V5Q29kZT1LRVlDT0RFX01FTlUnKTtcbn1cblxubGV0IHRlc3RzID0gW1xuICB7IGxhYmVsOiAnZWRpdGluZyBhIHRleHQgZmllbGQnLCB0ZXh0OiAnTGlmZSwgdGhlIFVuaXZlcnNlIGFuZCBFdmVyeXRoaW5nLicgfSxcbiAgeyBsYWJlbDogJ3NlbmRpbmcgXFwnJi1cXCcnLCB0ZXh0OiAnJi0nIH0sXG4gIHsgbGFiZWw6ICdzZW5kaW5nIFxcJyZcXCcgYW5kIFxcJy1cXCcgaW4gb3RoZXIgdGV4dCcsIHRleHQ6ICdJbiB0aGUgbWlkLTE5OTBzIGhlIGF0ZSBmaXNoICYgY2hpcHMgYXMgbWF5b3ItZWxlY3QuJyB9LFxuICB7IGxhYmVsOiAnc2VuZGluZyBcXCctXFwnIGluIHRleHQnLCB0ZXh0OiAnU3VwZXItdGVzdC4nIH0sXG4gIHsgbGFiZWw6ICdzZW5kaW5nIG51bWJlcnMnLCB0ZXh0OiAnMDEyMzQ1Njc4OSd9LFxuXTtcblxubGV0IHVuaWNvZGVUZXN0cyA9IFtcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgXFwnLVxcJyBpbiB1bmljb2RlIHRleHQnLCB0ZXh0OiAn4KSq4KSw4KWA4KSV4KWN4KS34KS+LeCkquCksOClgOCkleCljeCkt+CkoycgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgXFwnJlxcJyBpbiB0ZXh0JywgdGV4dDogJ0Zpc2ggJiBjaGlwcycgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgXFwnJlxcJyBpbiB1bmljb2RlIHRleHQnLCB0ZXh0OiAnTcSrbmEgJiBjaGlwcycgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgcm9tYW4gY2hhcmFjdGVycyB3aXRoIGRpYWNyaXRpY3MnLCB0ZXh0OiAnw4HDqSDFkiDDuSDhuI0nIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIGEgXFwndVxcJyB3aXRoIGFuIHVtbGF1dCcsIHRleHQ6ICfDvCcgfSxcbl07XG5cbmxldCBsYW5ndWFnZVRlc3RzID0gW1xuICB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBUYW1pbCcsIHRleHQ6ICfgrprgr4fgrr7grqTgrqngr4gnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIEd1amFyYXRpJywgdGV4dDogJ+CqquCqsOCrgOCqleCrjeCqt+CqoycgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgQ2hpbmVzZScsIHRleHQ6ICfmtYvor5UnIH0sXG4gIHsgbGFiZWw6ICdzaG91bGQgYmUgYWJsZSB0byBzZW5kIFJ1c3NpYW4nLCB0ZXh0OiAn0YLQtdGB0YLQuNGA0L7QstCw0L3QuNC1JyB9LFxuICB7IGxhYmVsOiAnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBBcmFiaWMnLCB0ZXh0OiAn2KrYrNix2YrYqCcgfSxcbiAgeyBsYWJlbDogJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgSGVicmV3JywgdGV4dDogJ9eR15PXmden15XXqicgfSxcbl07XG5cbmRlc2NyaWJlKCdrZXlib2FyZCcsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2FzY2lpJywgKCkgPT4ge1xuICAgIGxldCBkcml2ZXI7XG4gICAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICAgIGRyaXZlciA9IG5ldyBBbmRyb2lkRHJpdmVyKCk7XG4gICAgICBhd2FpdCBkcml2ZXIuY3JlYXRlU2Vzc2lvbihkZWZhdWx0QXNjaWlDYXBzKTtcblxuICAgICAgLy8gc29tZXRpbWVzIHRoZSBkZWZhdWx0IGltZSBpcyBub3Qgd2hhdCB3ZSBhcmUgdXNpbmdcbiAgICAgIGxldCBlbmdpbmVzID0gYXdhaXQgZHJpdmVyLmF2YWlsYWJsZUlNRUVuZ2luZXMoKTtcbiAgICAgIGxldCBzZWxlY3RlZEVuZ2luZSA9IF8uZmlyc3QoZW5naW5lcyk7XG4gICAgICBmb3IgKGxldCBlbmdpbmUgb2YgZW5naW5lcykge1xuICAgICAgICAvLyBpdCBzZWVtcyB0aGF0IHRoZSBsYXRpbiBpbWUgaGFzIGBhbmRyb2lkLmlucHV0bWV0aG9kYCBpbiBpdHMgcGFja2FnZSBuYW1lXG4gICAgICAgIGlmIChlbmdpbmUuaW5kZXhPZignYW5kcm9pZC5pbnB1dG1ldGhvZCcpICE9PSAtMSkge1xuICAgICAgICAgIHNlbGVjdGVkRW5naW5lID0gZW5naW5lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhd2FpdCBkcml2ZXIuYWN0aXZhdGVJTUVFbmdpbmUoc2VsZWN0ZWRFbmdpbmUpO1xuICAgIH0pO1xuICAgIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IGRyaXZlci5kZWxldGVTZXNzaW9uKCk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZWRpdGluZyBhIHRleHQgZmllbGQnLCAoKSA9PiB7XG4gICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShQQUNLQUdFLCBURVhURklFTERfQUNUSVZJVFkpO1xuICAgICAgfSk7XG5cbiAgICAgIGZvciAobGV0IHRlc3Qgb2YgdGVzdHMpIHtcbiAgICAgICAgZGVzY3JpYmUodGVzdC5sYWJlbCwgKCkgPT4ge1xuICAgICAgICAgIGl0KCdzaG91bGQgd29yayB3aXRoIHNldFZhbHVlJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgcnVuVGV4dEVkaXRUZXN0KGRyaXZlciwgdGVzdC50ZXh0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpdCgnc2hvdWxkIHdvcmsgd2l0aCBrZXlzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgcnVuVGV4dEVkaXRUZXN0KGRyaXZlciwgdGVzdC50ZXh0LCB0cnVlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBjbGVhciBhIHBhc3N3b3JkIGZpZWxkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAvLyB0aGVyZSBpcyBjdXJyZW50bHkgbm8gd2F5IHRvIGFzc2VydCBhbnl0aGluZyBhYm91dCB0aGUgY29udGVudHNcbiAgICAgICAgLy8gb2YgYSBwYXNzd29yZCBmaWVsZCwgc2luY2UgdGhlcmUgaXMgbm8gd2F5IHRvIGFjY2VzcyB0aGUgY29udGVudHNcbiAgICAgICAgLy8gYnV0IHRoaXMgc2hvdWxkLCBhdCB0aGUgdmVyeSBsZWFzdCwgbm90IGZhaWxcbiAgICAgICAgbGV0IGVscyA9IGF3YWl0IGRyaXZlci5maW5kRWxPckVscygnY2xhc3MgbmFtZScsIEVESVRURVhUX0NMQVNTLCB0cnVlKTtcbiAgICAgICAgbGV0IGVsID0gZWxzWzFdLkVMRU1FTlQ7XG5cbiAgICAgICAgYXdhaXQgZHJpdmVyLnNldFZhbHVlKCdzdXBlci1kdXBlciBwYXNzd29yZCcsIGVsKTtcbiAgICAgICAgYXdhaXQgZHJpdmVyLmNsZWFyKGVsKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NlbmRpbmcgYSBrZXkgZXZlbnQnLCAoKSA9PiB7XG4gICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShQQUNLQUdFLCBLRVlFVkVOVF9BQ1RJVklUWSk7XG4gICAgICAgIGF3YWl0IEIuZGVsYXkoNTAwKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBjb21iaW5hdGlvbiBrZXlldmVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHJ1bkNvbWJpbmF0aW9uS2V5RXZlbnRUZXN0KGRyaXZlcik7XG4gICAgICB9KTtcbiAgICAgIGl0KCdzaG91bGQgYmUgYWJsZSB0byBzZW5kIGtleWV2ZW50cycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgcnVuS2V5RXZlbnRUZXN0KGRyaXZlcik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3VuaWNvZGUnLCAoKSA9PiB7XG4gICAgbGV0IGRyaXZlcjtcbiAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgZHJpdmVyID0gbmV3IEFuZHJvaWREcml2ZXIoKTtcbiAgICAgIGF3YWl0IGRyaXZlci5jcmVhdGVTZXNzaW9uKGRlZmF1bHRVbmljb2RlQ2Fwcyk7XG4gICAgfSk7XG4gICAgYWZ0ZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgZHJpdmVyLmRlbGV0ZVNlc3Npb24oKTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdlZGl0aW5nIGEgdGV4dCBmaWVsZCcsICgpID0+IHtcbiAgICAgIGJlZm9yZShhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IGRyaXZlci5zdGFydEFjdGl2aXR5KFBBQ0tBR0UsIFRFWFRGSUVMRF9BQ1RJVklUWSk7XG4gICAgICB9KTtcblxuICAgICAgZm9yIChsZXQgdGVzdFNldCBvZiBbdGVzdHMsIHVuaWNvZGVUZXN0cywgbGFuZ3VhZ2VUZXN0c10pIHtcbiAgICAgICAgZm9yIChsZXQgdGVzdCBvZiB0ZXN0U2V0KSB7XG4gICAgICAgICAgZGVzY3JpYmUodGVzdC5sYWJlbCwgKCkgPT4ge1xuICAgICAgICAgICAgaXQoJ3Nob3VsZCB3b3JrIHdpdGggc2V0VmFsdWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGF3YWl0IHJ1blRleHRFZGl0VGVzdChkcml2ZXIsIHRlc3QudGV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGl0KCdzaG91bGQgd29yayB3aXRoIGtleXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgIGF3YWl0IHJ1blRleHRFZGl0VGVzdChkcml2ZXIsIHRlc3QudGV4dCwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NlbmRpbmcgYSBrZXkgZXZlbnQnLCAoKSA9PiB7XG4gICAgICBiZWZvcmUoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBkcml2ZXIuc3RhcnRBY3Rpdml0eShQQUNLQUdFLCBLRVlFVkVOVF9BQ1RJVklUWSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3Nob3VsZCBiZSBhYmxlIHRvIHNlbmQgY29tYmluYXRpb24ga2V5ZXZlbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBydW5Db21iaW5hdGlvbktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgICBpdCgnc2hvdWxkIGJlIGFibGUgdG8gc2VuZCBrZXlldmVudHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHJ1bktleUV2ZW50VGVzdChkcml2ZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXX0=