"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _androidHelpers = require('../android-helpers');

var _androidHelpers2 = _interopRequireDefault(_androidHelpers);

var commands = {},
    helpers = {},
    extensions = {};

commands.getAttribute = function callee$0$0(attribute, elementId) {
  var p;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        p = { attribute: attribute, elementId: elementId };
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getAttribute", p));

      case 3:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 4:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getName = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("className", elementId));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementDisplayed = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("displayed", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt("return", context$1$0.t0 === 'true');

      case 4:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementEnabled = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("enabled", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt("return", context$1$0.t0 === 'true');

      case 4:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.elementSelected = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getAttribute("selected", elementId));

      case 2:
        context$1$0.t0 = context$1$0.sent;
        return context$1$0.abrupt("return", context$1$0.t0 === 'true');

      case 4:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.setElementValue = function callee$0$0(keys, elementId) {
  var replace = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var text, params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        text = keys;

        if (keys instanceof Array) {
          text = keys.join("");
        }

        params = {
          elementId: elementId,
          text: text,
          replace: replace,
          unicodeKeyboard: this.opts.unicodeKeyboard
        };
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:setText", params));

      case 5:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 6:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setValue = function callee$0$0(keys, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setElementValue(keys, elementId, false));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.replaceValue = function callee$0$0(keys, elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.setElementValue(keys, elementId, true));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setValueImmediate = function callee$0$0(keys, elementId) {
  var text;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        text = keys;

        if (keys instanceof Array) {
          text = keys.join("");
        }

        // first, make sure we are focused on the element
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.click(elementId));

      case 4:
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.adb.inputText(text));

      case 6:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getText = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getText", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.clear = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:clear", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.click = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:click", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLocation = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getLocation", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getLocationInView = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.getLocation(elementId));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getSize = function callee$0$0(elementId) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:getSize", { elementId: elementId }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchLongClick = function callee$0$0(elementId, x, y, duration) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y, duration: duration };

        _androidHelpers2["default"].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchLongClick", params));

      case 4:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchDown = function callee$0$0(elementId, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y };

        _androidHelpers2["default"].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchDown", params));

      case 4:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchUp = function callee$0$0(elementId, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y };

        _androidHelpers2["default"].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchUp", params));

      case 4:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.touchMove = function callee$0$0(elementId, x, y) {
  var params;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        params = { elementId: elementId, x: x, y: y };

        _androidHelpers2["default"].removeNullProperties(params);
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:touchMove", params));

      case 4:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 5:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.complexTap = function callee$0$0(tapCount, touchCount, duration, x, y) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("click", { x: x, y: y }));

      case 2:
        return context$1$0.abrupt("return", context$1$0.sent);

      case 3:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

commands.tap = function callee$0$0(elementId) {
  var x = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var y = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var count = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];
  var i;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        i = 0;

      case 1:
        if (!(i < count)) {
          context$1$0.next = 17;
          break;
        }

        if (!elementId) {
          context$1$0.next = 12;
          break;
        }

        if (!(x !== 0 || y !== 0)) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:click", { elementId: elementId, x: x, y: y }));

      case 6:
        context$1$0.next = 10;
        break;

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("element:click", { elementId: elementId }));

      case 10:
        context$1$0.next = 14;
        break;

      case 12:
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(this.bootstrap.sendAction("click", { x: x, y: y }));

      case 14:
        i++;
        context$1$0.next = 1;
        break;

      case 17:
      case "end":
        return context$1$0.stop();
    }
  }, null, this);
};

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports["default"] = extensions;

// then send through adb

// we are either tapping on the default location of the element
// or an offset from the top left corner
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9lbGVtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs4QkFBMkIsb0JBQW9COzs7O0FBRS9DLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRWpELFFBQVEsQ0FBQyxZQUFZLEdBQUcsb0JBQWdCLFNBQVMsRUFBRSxTQUFTO01BQ3RELENBQUM7Ozs7QUFBRCxTQUFDLEdBQUcsRUFBQyxTQUFTLEVBQVQsU0FBUyxFQUFFLFNBQVMsRUFBVCxTQUFTLEVBQUM7O3lDQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDbEUsQ0FBQzs7QUFFRixRQUFRLENBQUMsT0FBTyxHQUFHLG9CQUFnQixTQUFTOzs7Ozt5Q0FDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDOzs7Ozs7Ozs7O0NBQ3ZELENBQUM7O0FBRUYsUUFBUSxDQUFDLGdCQUFnQixHQUFHLG9CQUFnQixTQUFTOzs7Ozt5Q0FDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDOzs7OytEQUFLLE1BQU07Ozs7Ozs7Q0FDbEUsQ0FBQzs7QUFFRixRQUFRLENBQUMsY0FBYyxHQUFHLG9CQUFnQixTQUFTOzs7Ozt5Q0FDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDOzs7OytEQUFLLE1BQU07Ozs7Ozs7Q0FDaEUsQ0FBQzs7QUFFRixRQUFRLENBQUMsZUFBZSxHQUFHLG9CQUFnQixTQUFTOzs7Ozt5Q0FDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDOzs7OytEQUFLLE1BQU07Ozs7Ozs7Q0FDakUsQ0FBQzs7QUFFRixPQUFPLENBQUMsZUFBZSxHQUFHLG9CQUFnQixJQUFJLEVBQUUsU0FBUztNQUFFLE9BQU8seURBQUcsS0FBSztNQUNwRSxJQUFJLEVBS0osTUFBTTs7OztBQUxOLFlBQUksR0FBRyxJQUFJOztBQUNmLFlBQUksSUFBSSxZQUFZLEtBQUssRUFBRTtBQUN6QixjQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUN0Qjs7QUFFRyxjQUFNLEdBQUc7QUFDWCxtQkFBUyxFQUFULFNBQVM7QUFDVCxjQUFJLEVBQUosSUFBSTtBQUNKLGlCQUFPLEVBQVAsT0FBTztBQUNQLHlCQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlO1NBQzNDOzt5Q0FFWSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUM7Ozs7Ozs7Ozs7Q0FDbEUsQ0FBQzs7QUFFRixRQUFRLENBQUMsUUFBUSxHQUFHLG9CQUFnQixJQUFJLEVBQUUsU0FBUzs7Ozs7eUNBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUM7Ozs7Ozs7Ozs7Q0FDMUQsQ0FBQzs7QUFFRixRQUFRLENBQUMsWUFBWSxHQUFHLG9CQUFnQixJQUFJLEVBQUUsU0FBUzs7Ozs7eUNBQ3hDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUM7Ozs7Ozs7Ozs7Q0FDekQsQ0FBQzs7QUFFRixRQUFRLENBQUMsaUJBQWlCLEdBQUcsb0JBQWdCLElBQUksRUFBRSxTQUFTO01BQ3RELElBQUk7Ozs7QUFBSixZQUFJLEdBQUcsSUFBSTs7QUFDZixZQUFJLElBQUksWUFBWSxLQUFLLEVBQUU7QUFDekIsY0FBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEI7Ozs7eUNBR0ssSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7Ozs7eUNBR3JCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzs7Ozs7OztDQUMvQixDQUFDOztBQUVGLFFBQVEsQ0FBQyxPQUFPLEdBQUcsb0JBQWdCLFNBQVM7Ozs7O3lDQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxFQUFDLFNBQVMsRUFBVCxTQUFTLEVBQUMsQ0FBQzs7Ozs7Ozs7OztDQUN2RSxDQUFDOztBQUVGLFFBQVEsQ0FBQyxLQUFLLEdBQUcsb0JBQWdCLFNBQVM7Ozs7O3lDQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBQyxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDckUsQ0FBQzs7QUFFRixRQUFRLENBQUMsS0FBSyxHQUFHLG9CQUFnQixTQUFTOzs7Ozt5Q0FDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEVBQUMsU0FBUyxFQUFULFNBQVMsRUFBQyxDQUFDOzs7Ozs7Ozs7O0NBQ3JFLENBQUM7O0FBRUYsUUFBUSxDQUFDLFdBQVcsR0FBRyxvQkFBZ0IsU0FBUzs7Ozs7eUNBQ2pDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLEVBQUMsU0FBUyxFQUFULFNBQVMsRUFBQyxDQUFDOzs7Ozs7Ozs7O0NBQzNFLENBQUM7O0FBRUYsUUFBUSxDQUFDLGlCQUFpQixHQUFHLG9CQUFnQixTQUFTOzs7Ozt5Q0FDdkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7Ozs7Ozs7Ozs7Q0FDekMsQ0FBQzs7QUFFRixRQUFRLENBQUMsT0FBTyxHQUFHLG9CQUFnQixTQUFTOzs7Ozt5Q0FDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsaUJBQWlCLEVBQUUsRUFBQyxTQUFTLEVBQVQsU0FBUyxFQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDdkUsQ0FBQzs7QUFFRixRQUFRLENBQUMsY0FBYyxHQUFHLG9CQUFnQixTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRO01BQzdELE1BQU07Ozs7QUFBTixjQUFNLEdBQUcsRUFBQyxTQUFTLEVBQVQsU0FBUyxFQUFFLENBQUMsRUFBRCxDQUFDLEVBQUUsQ0FBQyxFQUFELENBQUMsRUFBRSxRQUFRLEVBQVIsUUFBUSxFQUFDOztBQUN4QyxvQ0FBZSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7eUNBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQzs7Ozs7Ozs7OztDQUN6RSxDQUFDOztBQUVGLFFBQVEsQ0FBQyxTQUFTLEdBQUcsb0JBQWdCLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQztNQUM5QyxNQUFNOzs7O0FBQU4sY0FBTSxHQUFHLEVBQUMsU0FBUyxFQUFULFNBQVMsRUFBRSxDQUFDLEVBQUQsQ0FBQyxFQUFFLENBQUMsRUFBRCxDQUFDLEVBQUM7O0FBQzlCLG9DQUFlLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDOzt5Q0FDL0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDOzs7Ozs7Ozs7O0NBQ3BFLENBQUM7O0FBRUYsUUFBUSxDQUFDLE9BQU8sR0FBRyxvQkFBZ0IsU0FBUyxFQUFFLENBQUMsRUFBRSxDQUFDO01BQzVDLE1BQU07Ozs7QUFBTixjQUFNLEdBQUcsRUFBQyxTQUFTLEVBQVQsU0FBUyxFQUFFLENBQUMsRUFBRCxDQUFDLEVBQUUsQ0FBQyxFQUFELENBQUMsRUFBQzs7QUFDOUIsb0NBQWUsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7O3lDQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUM7Ozs7Ozs7Ozs7Q0FDbEUsQ0FBQzs7QUFFRixRQUFRLENBQUMsU0FBUyxHQUFHLG9CQUFnQixTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUM7TUFDOUMsTUFBTTs7OztBQUFOLGNBQU0sR0FBRyxFQUFDLFNBQVMsRUFBVCxTQUFTLEVBQUUsQ0FBQyxFQUFELENBQUMsRUFBRSxDQUFDLEVBQUQsQ0FBQyxFQUFDOztBQUM5QixvQ0FBZSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7eUNBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQzs7Ozs7Ozs7OztDQUNwRSxDQUFDOztBQUVGLFFBQVEsQ0FBQyxVQUFVLEdBQUcsb0JBQWdCLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDOzs7Ozt5Q0FDM0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUMsQ0FBQyxFQUFELENBQUMsRUFBRSxDQUFDLEVBQUQsQ0FBQyxFQUFDLENBQUM7Ozs7Ozs7Ozs7Q0FDeEQsQ0FBQzs7QUFFRixRQUFRLENBQUMsR0FBRyxHQUFHLG9CQUFnQixTQUFTO01BQUUsQ0FBQyx5REFBRyxDQUFDO01BQUUsQ0FBQyx5REFBRyxDQUFDO01BQUUsS0FBSyx5REFBRyxDQUFDO01BQ3RELENBQUM7Ozs7QUFBRCxTQUFDLEdBQUcsQ0FBQzs7O2NBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQTs7Ozs7YUFDbkIsU0FBUzs7Ozs7Y0FHUCxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7Ozs7Ozt5Q0FDZCxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsRUFBQyxTQUFTLEVBQVQsU0FBUyxFQUFFLENBQUMsRUFBRCxDQUFDLEVBQUUsQ0FBQyxFQUFELENBQUMsRUFBQyxDQUFDOzs7Ozs7Ozt5Q0FFN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEVBQUMsU0FBUyxFQUFULFNBQVMsRUFBQyxDQUFDOzs7Ozs7Ozt5Q0FHekQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUMsQ0FBQyxFQUFELENBQUMsRUFBRSxDQUFDLEVBQUQsQ0FBQyxFQUFDLENBQUM7OztBQVZ6QixTQUFDLEVBQUU7Ozs7Ozs7OztDQWEvQixDQUFDOztBQUVGLGVBQWMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNwQyxRQUFRLEdBQVIsUUFBUTtRQUFFLE9BQU8sR0FBUCxPQUFPO3FCQUNYLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2VsZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYW5kcm9pZEhlbHBlcnMgZnJvbSAnLi4vYW5kcm9pZC1oZWxwZXJzJztcblxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xuXG5jb21tYW5kcy5nZXRBdHRyaWJ1dGUgPSBhc3luYyBmdW5jdGlvbiAoYXR0cmlidXRlLCBlbGVtZW50SWQpIHtcbiAgbGV0IHAgPSB7YXR0cmlidXRlLCBlbGVtZW50SWR9O1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6Z2V0QXR0cmlidXRlXCIsIHApO1xufTtcblxuY29tbWFuZHMuZ2V0TmFtZSA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0QXR0cmlidXRlKFwiY2xhc3NOYW1lXCIsIGVsZW1lbnRJZCk7XG59O1xuXG5jb21tYW5kcy5lbGVtZW50RGlzcGxheWVkID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5nZXRBdHRyaWJ1dGUoXCJkaXNwbGF5ZWRcIiwgZWxlbWVudElkKSA9PT0gJ3RydWUnO1xufTtcblxuY29tbWFuZHMuZWxlbWVudEVuYWJsZWQgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmdldEF0dHJpYnV0ZShcImVuYWJsZWRcIiwgZWxlbWVudElkKSA9PT0gJ3RydWUnO1xufTtcblxuY29tbWFuZHMuZWxlbWVudFNlbGVjdGVkID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5nZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCBlbGVtZW50SWQpID09PSAndHJ1ZSc7XG59O1xuXG5oZWxwZXJzLnNldEVsZW1lbnRWYWx1ZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzLCBlbGVtZW50SWQsIHJlcGxhY2UgPSBmYWxzZSkge1xuICBsZXQgdGV4dCA9IGtleXM7XG4gIGlmIChrZXlzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICB0ZXh0ID0ga2V5cy5qb2luKFwiXCIpO1xuICB9XG5cbiAgbGV0IHBhcmFtcyA9IHtcbiAgICBlbGVtZW50SWQsXG4gICAgdGV4dCxcbiAgICByZXBsYWNlLFxuICAgIHVuaWNvZGVLZXlib2FyZDogdGhpcy5vcHRzLnVuaWNvZGVLZXlib2FyZFxuICB9O1xuXG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpzZXRUZXh0XCIsIHBhcmFtcyk7XG59O1xuXG5jb21tYW5kcy5zZXRWYWx1ZSA9IGFzeW5jIGZ1bmN0aW9uIChrZXlzLCBlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0RWxlbWVudFZhbHVlKGtleXMsIGVsZW1lbnRJZCwgZmFsc2UpO1xufTtcblxuY29tbWFuZHMucmVwbGFjZVZhbHVlID0gYXN5bmMgZnVuY3Rpb24gKGtleXMsIGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5zZXRFbGVtZW50VmFsdWUoa2V5cywgZWxlbWVudElkLCB0cnVlKTtcbn07XG5cbmNvbW1hbmRzLnNldFZhbHVlSW1tZWRpYXRlID0gYXN5bmMgZnVuY3Rpb24gKGtleXMsIGVsZW1lbnRJZCkge1xuICBsZXQgdGV4dCA9IGtleXM7XG4gIGlmIChrZXlzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICB0ZXh0ID0ga2V5cy5qb2luKFwiXCIpO1xuICB9XG5cbiAgLy8gZmlyc3QsIG1ha2Ugc3VyZSB3ZSBhcmUgZm9jdXNlZCBvbiB0aGUgZWxlbWVudFxuICBhd2FpdCB0aGlzLmNsaWNrKGVsZW1lbnRJZCk7XG5cbiAgLy8gdGhlbiBzZW5kIHRocm91Z2ggYWRiXG4gIGF3YWl0IHRoaXMuYWRiLmlucHV0VGV4dCh0ZXh0KTtcbn07XG5cbmNvbW1hbmRzLmdldFRleHQgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpnZXRUZXh0XCIsIHtlbGVtZW50SWR9KTtcbn07XG5cbmNvbW1hbmRzLmNsZWFyID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6Y2xlYXJcIiwge2VsZW1lbnRJZH0pO1xufTtcblxuY29tbWFuZHMuY2xpY2sgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkKSB7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDpjbGlja1wiLCB7ZWxlbWVudElkfSk7XG59O1xuXG5jb21tYW5kcy5nZXRMb2NhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmdldExvY2F0aW9uXCIsIHtlbGVtZW50SWR9KTtcbn07XG5cbmNvbW1hbmRzLmdldExvY2F0aW9uSW5WaWV3ID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCkge1xuICByZXR1cm4gYXdhaXQgdGhpcy5nZXRMb2NhdGlvbihlbGVtZW50SWQpO1xufTtcblxuY29tbWFuZHMuZ2V0U2l6ZSA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmdldFNpemVcIiwge2VsZW1lbnRJZH0pO1xufTtcblxuY29tbWFuZHMudG91Y2hMb25nQ2xpY2sgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkLCB4LCB5LCBkdXJhdGlvbikge1xuICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZCwgeCwgeSwgZHVyYXRpb259O1xuICBhbmRyb2lkSGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyhwYXJhbXMpO1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6dG91Y2hMb25nQ2xpY2tcIiwgcGFyYW1zKTtcbn07XG5cbmNvbW1hbmRzLnRvdWNoRG93biA9IGFzeW5jIGZ1bmN0aW9uIChlbGVtZW50SWQsIHgsIHkpIHtcbiAgbGV0IHBhcmFtcyA9IHtlbGVtZW50SWQsIHgsIHl9O1xuICBhbmRyb2lkSGVscGVycy5yZW1vdmVOdWxsUHJvcGVydGllcyhwYXJhbXMpO1xuICByZXR1cm4gYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImVsZW1lbnQ6dG91Y2hEb3duXCIsIHBhcmFtcyk7XG59O1xuXG5jb21tYW5kcy50b3VjaFVwID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCwgeCwgeSkge1xuICBsZXQgcGFyYW1zID0ge2VsZW1lbnRJZCwgeCwgeX07XG4gIGFuZHJvaWRIZWxwZXJzLnJlbW92ZU51bGxQcm9wZXJ0aWVzKHBhcmFtcyk7XG4gIHJldHVybiBhd2FpdCB0aGlzLmJvb3RzdHJhcC5zZW5kQWN0aW9uKFwiZWxlbWVudDp0b3VjaFVwXCIsIHBhcmFtcyk7XG59O1xuXG5jb21tYW5kcy50b3VjaE1vdmUgPSBhc3luYyBmdW5jdGlvbiAoZWxlbWVudElkLCB4LCB5KSB7XG4gIGxldCBwYXJhbXMgPSB7ZWxlbWVudElkLCB4LCB5fTtcbiAgYW5kcm9pZEhlbHBlcnMucmVtb3ZlTnVsbFByb3BlcnRpZXMocGFyYW1zKTtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OnRvdWNoTW92ZVwiLCBwYXJhbXMpO1xufTtcblxuY29tbWFuZHMuY29tcGxleFRhcCA9IGFzeW5jIGZ1bmN0aW9uICh0YXBDb3VudCwgdG91Y2hDb3VudCwgZHVyYXRpb24sIHgsIHkpIHtcbiAgcmV0dXJuIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJjbGlja1wiLCB7eCwgeX0pO1xufTtcblxuY29tbWFuZHMudGFwID0gYXN5bmMgZnVuY3Rpb24gKGVsZW1lbnRJZCwgeCA9IDAsIHkgPSAwLCBjb3VudCA9IDEpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgaWYgKGVsZW1lbnRJZCkge1xuICAgICAgLy8gd2UgYXJlIGVpdGhlciB0YXBwaW5nIG9uIHRoZSBkZWZhdWx0IGxvY2F0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgICAvLyBvciBhbiBvZmZzZXQgZnJvbSB0aGUgdG9wIGxlZnQgY29ybmVyXG4gICAgICBpZiAoeCAhPT0gMCB8fCB5ICE9PSAwKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmNsaWNrXCIsIHtlbGVtZW50SWQsIHgsIHl9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMuYm9vdHN0cmFwLnNlbmRBY3Rpb24oXCJlbGVtZW50OmNsaWNrXCIsIHtlbGVtZW50SWR9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5ib290c3RyYXAuc2VuZEFjdGlvbihcImNsaWNrXCIsIHt4LCB5fSk7XG4gICAgfVxuICB9XG59O1xuXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzLCBoZWxwZXJzKTtcbmV4cG9ydCB7IGNvbW1hbmRzLCBoZWxwZXJzIH07XG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xuIl19