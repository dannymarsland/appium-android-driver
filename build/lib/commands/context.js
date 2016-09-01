'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _appiumChromedriver = require('appium-chromedriver');

var _appiumChromedriver2 = _interopRequireDefault(_appiumChromedriver);

var _appiumBaseDriver = require('appium-base-driver');

var _webviewHelpers = require('../webview-helpers');

var _webviewHelpers2 = _interopRequireDefault(_webviewHelpers);

var commands = {},
    helpers = {},
    extensions = {};

/* -------------------------------
 * Actual MJSONWP command handlers
 * ------------------------------- */
commands.getCurrentContext = function callee$0$0() {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', this.curContext);

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.getContexts = function callee$0$0() {
  var webviews;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        webviews = undefined;

        if (!this.isChromeSession) {
          context$1$0.next = 5;
          break;
        }

        // if we have a Chrome browser session, we only care about the Chrome
        // context and the native context
        webviews = [_webviewHelpers.CHROMIUM_WIN];
        context$1$0.next = 8;
        break;

      case 5:
        context$1$0.next = 7;
        return _regeneratorRuntime.awrap(_webviewHelpers2['default'].getWebviews(this.adb, this.opts.androidDeviceSocket));

      case 7:
        webviews = context$1$0.sent;

      case 8:
        this.contexts = _lodash2['default'].union([_webviewHelpers.NATIVE_WIN], webviews);
        _logger2['default'].debug('Available contexts: ' + JSON.stringify(this.contexts));
        return context$1$0.abrupt('return', this.contexts);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

commands.setContext = function callee$0$0(name) {
  var contexts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (name === null) {
          name = this.defaultContextName();
        } else if (name === _webviewHelpers.WEBVIEW_WIN) {
          // handle setContext "WEBVIEW"
          name = this.defaultWebviewName();
        }
        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.getContexts());

      case 3:
        contexts = context$1$0.sent;

        if (_lodash2['default'].contains(contexts, name)) {
          context$1$0.next = 6;
          break;
        }

        throw new _appiumBaseDriver.errors.NoSuchContextError();

      case 6:
        if (!(name === this.curContext)) {
          context$1$0.next = 8;
          break;
        }

        return context$1$0.abrupt('return');

      case 8:
        context$1$0.next = 10;
        return _regeneratorRuntime.awrap(this.switchContext(name));

      case 10:
        this.curContext = name;

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

helpers.switchContext = function callee$0$0(name) {
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!this.isChromedriverContext(name)) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 3;
        return _regeneratorRuntime.awrap(this.startChromedriverProxy(name));

      case 3:
        context$1$0.next = 10;
        break;

      case 5:
        if (!this.isChromedriverContext(this.curContext)) {
          context$1$0.next = 9;
          break;
        }

        // if we're moving to a non-chromedriver webview, and our current context
        // _is_ a chromedriver webview, if caps recreateChromeDriverSessions is set
        // to true then kill chromedriver session using stopChromedriverProxies or
        // else simply suspend proxying to the latter
        if (this.opts.recreateChromeDriverSessions) {
          _logger2['default'].debug("recreateChromeDriverSessions set to true; killing existing chromedrivers");
          this.stopChromedriverProxies();
        } else {
          this.suspendChromedriverProxy();
        }
        context$1$0.next = 10;
        break;

      case 9:
        throw new Error('Didn\'t know how to handle switching to context \'' + name + '\'');

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

/* ---------------------------------
 * On-object context-related helpers
 * --------------------------------- */

// The reason this is a function and not just a constant is that both android-
// driver and selendroid-driver use this logic, and each one returns
// a different default context name
helpers.defaultContextName = function () {
  return _webviewHelpers.NATIVE_WIN;
};

helpers.defaultWebviewName = function () {
  return _webviewHelpers.WEBVIEW_BASE + this.opts.appPackage;
};

helpers.isWebContext = function () {
  return this.curContext !== null && this.curContext !== _webviewHelpers.NATIVE_WIN;
};

// Turn on proxying to an existing Chromedriver session or a new one
helpers.startChromedriverProxy = function callee$0$0(context) {
  var cd, opts;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    var _this = this;

    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].debug('Connecting to chrome-backed webview context \'' + context + '\'');

        if (!(this.chromedriver !== null)) {
          context$1$0.next = 3;
          break;
        }

        throw new Error("We already have a chromedriver instance running");

      case 3:
        cd = undefined;

        if (!this.sessionChromedrivers[context]) {
          context$1$0.next = 11;
          break;
        }

        // in the case where we've already set up a chromedriver for a context,
        // we want to reconnect to it, not create a whole new one
        _logger2['default'].debug('Found existing Chromedriver for context \'' + context + '\'. Using it.');
        cd = this.sessionChromedrivers[context];
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(setupExistingChromedriver(cd));

      case 9:
        context$1$0.next = 18;
        break;

      case 11:
        opts = _lodash2['default'].cloneDeep(this.opts);

        opts.chromeUseRunningApp = true;
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(setupNewChromedriver(opts, this.adb.curDeviceId, this.adb.getAdbServerPort()));

      case 15:
        cd = context$1$0.sent;

        // bind our stop/exit handler, passing in context so we know which
        // one stopped unexpectedly
        cd.on(_appiumChromedriver2['default'].EVENT_CHANGED, function (msg) {
          if (msg.state === _appiumChromedriver2['default'].STATE_STOPPED) {
            _this.onChromedriverStop(context);
          }
        });
        // save the chromedriver object under the context
        this.sessionChromedrivers[context] = cd;

      case 18:
        // hook up the local variables so we can proxy this biz
        this.chromedriver = cd;
        this.proxyReqRes = this.chromedriver.proxyReq.bind(this.chromedriver);
        this.jwpProxyActive = true;

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Stop proxying to any Chromedriver
helpers.suspendChromedriverProxy = function () {
  this.chromedriver = null;
  this.proxyReqRes = null;
  this.jwpProxyActive = false;
};

// Handle an out-of-band Chromedriver stop event
helpers.onChromedriverStop = function callee$0$0(context) {
  var err;
  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _logger2['default'].warn('Chromedriver for context ' + context + ' stopped unexpectedly');

        if (!(context === this.curContext)) {
          context$1$0.next = 7;
          break;
        }

        err = new Error("Chromedriver quit unexpectedly during session");
        context$1$0.next = 5;
        return _regeneratorRuntime.awrap(this.startUnexpectedShutdown(err));

      case 5:
        context$1$0.next = 9;
        break;

      case 7:
        // if a Chromedriver in the non-active context barfs, we don't really
        // care, we'll just make a new one next time we need the context.
        _logger2['default'].warn("Chromedriver quit unexpectedly, but it wasn't the active " + "context, ignoring");
        delete this.sessionChromedrivers[context];

      case 9:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
};

// Intentionally stop all the chromedrivers currently active, and ignore
// their exit events
helpers.stopChromedriverProxies = function callee$0$0() {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, context, cd;

  return _regeneratorRuntime.async(function callee$0$0$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        this.suspendChromedriverProxy(); // make sure we turn off the proxy flag
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 4;
        _iterator = _getIterator(_lodash2['default'].keys(this.sessionChromedrivers));

      case 6:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 23;
          break;
        }

        context = _step.value;
        cd = this.sessionChromedrivers[context];

        _logger2['default'].debug('Stopping chromedriver for context ' + context);
        // stop listening for the stopped state event
        cd.removeAllListeners(_appiumChromedriver2['default'].EVENT_CHANGED);
        context$1$0.prev = 11;
        context$1$0.next = 14;
        return _regeneratorRuntime.awrap(cd.stop());

      case 14:
        context$1$0.next = 19;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t0 = context$1$0['catch'](11);

        _logger2['default'].warn('Error stopping Chromedriver: ' + context$1$0.t0.message);

      case 19:
        delete this.sessionChromedrivers[context];

      case 20:
        _iteratorNormalCompletion = true;
        context$1$0.next = 6;
        break;

      case 23:
        context$1$0.next = 29;
        break;

      case 25:
        context$1$0.prev = 25;
        context$1$0.t1 = context$1$0['catch'](4);
        _didIteratorError = true;
        _iteratorError = context$1$0.t1;

      case 29:
        context$1$0.prev = 29;
        context$1$0.prev = 30;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 32:
        context$1$0.prev = 32;

        if (!_didIteratorError) {
          context$1$0.next = 35;
          break;
        }

        throw _iteratorError;

      case 35:
        return context$1$0.finish(32);

      case 36:
        return context$1$0.finish(29);

      case 37:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[4, 25, 29, 37], [11, 16], [30,, 32, 36]]);
};

helpers.isChromedriverContext = function (viewName) {
  return viewName.indexOf(_webviewHelpers.WEBVIEW_WIN) !== -1 || viewName === _webviewHelpers.CHROMIUM_WIN;
};

/* --------------------------
 * Internal library functions
 * -------------------------- */

function setupExistingChromedriver(chromedriver) {
  return _regeneratorRuntime.async(function setupExistingChromedriver$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.next = 2;
        return _regeneratorRuntime.awrap(chromedriver.hasWorkingWebview());

      case 2:
        if (context$1$0.sent) {
          context$1$0.next = 6;
          break;
        }

        _logger2['default'].debug("ChromeDriver is not associated with a window. " + "Re-initializing the session.");
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(chromedriver.restart());

      case 6:
        return context$1$0.abrupt('return', chromedriver);

      case 7:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function setupNewChromedriver(opts, curDeviceId, adbPort) {
  var chromeArgs, chromedriver, caps;
  return _regeneratorRuntime.async(function setupNewChromedriver$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        chromeArgs = {
          port: opts.chromeDriverPort,
          executable: opts.chromedriverExecutable,
          adbPort: adbPort
        };
        chromedriver = new _appiumChromedriver2['default'](chromeArgs);
        caps = {
          chromeOptions: {
            androidPackage: opts.appPackage
          }
        };

        if (opts.chromeUseRunningApp) {
          caps.chromeOptions.androidUseRunningApp = opts.chromeUseRunningApp;
        }
        if (opts.chromeAndroidActivity) {
          caps.chromeOptions.androidActivity = opts.chromeAndroidActivity;
        }
        if (opts.enablePerformanceLogging) {
          caps.loggingPrefs = { performance: 'ALL' };
        }
        caps = _webviewHelpers2['default'].decorateChromeOptions(caps, opts, curDeviceId);
        context$1$0.next = 9;
        return _regeneratorRuntime.awrap(chromedriver.start(caps));

      case 9:
        return context$1$0.abrupt('return', chromedriver);

      case 10:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

_Object$assign(extensions, commands, helpers);
exports.commands = commands;
exports.helpers = helpers;
exports.setupNewChromedriver = setupNewChromedriver;
exports['default'] = extensions;

// otherwise we use ADB to figure out which webviews are available

// if the context we want doesn't exist, fail

// if we're already in the context we want, do nothing

// We have some options when it comes to webviews. If we want a
// Chromedriver webview, we can only control one at a time.

// start proxying commands directly to chromedriver

// we exited unexpectedly while automating the current context and so want
// to shut down the session and respond with an error

// check the status by sending a simple window-based command to ChromeDriver
// if there is an error, we want to recreate the ChromeDriver session
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9jb250ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7c0JBQ0gsV0FBVzs7OztrQ0FDTCxxQkFBcUI7Ozs7Z0NBQ3ZCLG9CQUFvQjs7OEJBRXlCLG9CQUFvQjs7OztBQUV4RixJQUFJLFFBQVEsR0FBRyxFQUFFO0lBQUUsT0FBTyxHQUFHLEVBQUU7SUFBRSxVQUFVLEdBQUcsRUFBRSxDQUFDOzs7OztBQU1qRCxRQUFRLENBQUMsaUJBQWlCLEdBQUc7Ozs7NENBQ3BCLElBQUksQ0FBQyxVQUFVOzs7Ozs7O0NBQ3ZCLENBQUM7O0FBRUYsUUFBUSxDQUFDLFdBQVcsR0FBRztNQUNqQixRQUFROzs7O0FBQVIsZ0JBQVE7O2FBQ1IsSUFBSSxDQUFDLGVBQWU7Ozs7Ozs7QUFHdEIsZ0JBQVEsR0FBRyw4QkFBYyxDQUFDOzs7Ozs7eUNBR1QsNEJBQWUsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7OztBQURoQyxnQkFBUTs7O0FBR1YsWUFBSSxDQUFDLFFBQVEsR0FBRyxvQkFBRSxLQUFLLENBQUMsNEJBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNoRCw0QkFBTyxLQUFLLDBCQUF3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBRyxDQUFDOzRDQUM5RCxJQUFJLENBQUMsUUFBUTs7Ozs7OztDQUNyQixDQUFDOztBQUVGLFFBQVEsQ0FBQyxVQUFVLEdBQUcsb0JBQWdCLElBQUk7TUFPcEMsUUFBUTs7OztBQU5aLFlBQUksSUFBSSxLQUFLLElBQUksRUFBRTtBQUNqQixjQUFJLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDbEMsTUFBTSxJQUFJLElBQUksZ0NBQWdCLEVBQUU7O0FBRS9CLGNBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUNsQzs7eUNBQ29CLElBQUksQ0FBQyxXQUFXLEVBQUU7OztBQUFuQyxnQkFBUTs7WUFFUCxvQkFBRSxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQzs7Ozs7Y0FDdkIsSUFBSSx5QkFBTyxrQkFBa0IsRUFBRTs7O2NBR25DLElBQUksS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFBOzs7Ozs7Ozs7eUNBSXRCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDOzs7QUFDOUIsWUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Q0FDeEIsQ0FBQzs7QUFFRixPQUFPLENBQUMsYUFBYSxHQUFHLG9CQUFnQixJQUFJOzs7O2FBR3RDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7Ozs7Ozt5Q0FFNUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQzs7Ozs7OzthQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs7Ozs7Ozs7O0FBS3BELFlBQUksSUFBSSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsRUFBRTtBQUMxQyw4QkFBTyxLQUFLLENBQUMsMEVBQTBFLENBQUMsQ0FBQztBQUN6RixjQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztTQUNoQyxNQUFNO0FBQ0wsY0FBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDakM7Ozs7O2NBRUssSUFBSSxLQUFLLHdEQUFvRCxJQUFJLFFBQUk7Ozs7Ozs7Q0FFOUUsQ0FBQzs7Ozs7Ozs7O0FBVUYsT0FBTyxDQUFDLGtCQUFrQixHQUFHLFlBQVk7QUFDdkMsb0NBQWtCO0NBQ25CLENBQUM7O0FBRUYsT0FBTyxDQUFDLGtCQUFrQixHQUFHLFlBQVk7QUFDdkMsU0FBTywrQkFBZSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztDQUM1QyxDQUFDOztBQUVGLE9BQU8sQ0FBQyxZQUFZLEdBQUcsWUFBWTtBQUNqQyxTQUFPLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLCtCQUFlLENBQUM7Q0FDbkUsQ0FBQzs7O0FBR0YsT0FBTyxDQUFDLHNCQUFzQixHQUFHLG9CQUFnQixPQUFPO01BTWxELEVBQUUsRUFRQSxJQUFJOzs7Ozs7QUFiViw0QkFBTyxLQUFLLG9EQUFpRCxPQUFPLFFBQUksQ0FBQzs7Y0FDckUsSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUE7Ozs7O2NBQ3RCLElBQUksS0FBSyxDQUFDLGlEQUFpRCxDQUFDOzs7QUFHaEUsVUFBRTs7YUFDRixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0FBR3BDLDRCQUFPLEtBQUssZ0RBQTZDLE9BQU8sbUJBQWUsQ0FBQztBQUNoRixVQUFFLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDOzt5Q0FDbEMseUJBQXlCLENBQUMsRUFBRSxDQUFDOzs7Ozs7O0FBRS9CLFlBQUksR0FBRyxvQkFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7QUFDakMsWUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQzs7eUNBQ3JCLG9CQUFvQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzs7QUFENUQsVUFBRTs7OztBQUlGLFVBQUUsQ0FBQyxFQUFFLENBQUMsZ0NBQWEsYUFBYSxFQUFFLFVBQUMsR0FBRyxFQUFLO0FBQ3pDLGNBQUksR0FBRyxDQUFDLEtBQUssS0FBSyxnQ0FBYSxhQUFhLEVBQUU7QUFDNUMsa0JBQUssa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7V0FDbEM7U0FDRixDQUFDLENBQUM7O0FBRUgsWUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7OztBQUcxQyxZQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN2QixZQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEUsWUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Ozs7Ozs7Q0FDNUIsQ0FBQzs7O0FBR0YsT0FBTyxDQUFDLHdCQUF3QixHQUFHLFlBQVk7QUFDN0MsTUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7QUFDekIsTUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7Q0FDN0IsQ0FBQzs7O0FBR0YsT0FBTyxDQUFDLGtCQUFrQixHQUFHLG9CQUFnQixPQUFPO01BSzVDLEdBQUc7Ozs7QUFKVCw0QkFBTyxJQUFJLCtCQUE2QixPQUFPLDJCQUF3QixDQUFDOztjQUNwRSxPQUFPLEtBQUssSUFBSSxDQUFDLFVBQVUsQ0FBQTs7Ozs7QUFHekIsV0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDOzt5Q0FDOUQsSUFBSSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsQ0FBQzs7Ozs7Ozs7O0FBSXZDLDRCQUFPLElBQUksQ0FBQywyREFBMkQsR0FDM0QsbUJBQW1CLENBQUMsQ0FBQztBQUNqQyxlQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7OztDQUU3QyxDQUFDOzs7O0FBSUYsT0FBTyxDQUFDLHVCQUF1QixHQUFHO3NGQUV2QixPQUFPLEVBQ1YsRUFBRTs7Ozs7QUFGUixZQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQzs7Ozs7aUNBQ1osb0JBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQzs7Ozs7Ozs7QUFBNUMsZUFBTztBQUNWLFVBQUUsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDOztBQUMzQyw0QkFBTyxLQUFLLHdDQUFzQyxPQUFPLENBQUcsQ0FBQzs7QUFFN0QsVUFBRSxDQUFDLGtCQUFrQixDQUFDLGdDQUFhLGFBQWEsQ0FBQyxDQUFDOzs7eUNBRTFDLEVBQUUsQ0FBQyxJQUFJLEVBQUU7Ozs7Ozs7Ozs7QUFFZiw0QkFBTyxJQUFJLG1DQUFpQyxlQUFJLE9BQU8sQ0FBRyxDQUFDOzs7QUFFN0QsZUFBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FFN0MsQ0FBQzs7QUFFRixPQUFPLENBQUMscUJBQXFCLEdBQUcsVUFBVSxRQUFRLEVBQUU7QUFDbEQsU0FBTyxRQUFRLENBQUMsT0FBTyw2QkFBYSxLQUFLLENBQUMsQ0FBQyxJQUFJLFFBQVEsaUNBQWlCLENBQUM7Q0FDMUUsQ0FBQzs7Ozs7O0FBT0YsU0FBZSx5QkFBeUIsQ0FBRSxZQUFZOzs7Ozt5Q0FHekMsWUFBWSxDQUFDLGlCQUFpQixFQUFFOzs7Ozs7OztBQUN6Qyw0QkFBTyxLQUFLLENBQUMsZ0RBQWdELEdBQ2hELDhCQUE4QixDQUFDLENBQUM7O3lDQUN2QyxZQUFZLENBQUMsT0FBTyxFQUFFOzs7NENBRXZCLFlBQVk7Ozs7Ozs7Q0FDcEI7O0FBRUQsU0FBZSxvQkFBb0IsQ0FBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLE9BQU87TUFDekQsVUFBVSxFQUtWLFlBQVksRUFDWixJQUFJOzs7O0FBTkosa0JBQVUsR0FBRztBQUNmLGNBQUksRUFBRSxJQUFJLENBQUMsZ0JBQWdCO0FBQzNCLG9CQUFVLEVBQUUsSUFBSSxDQUFDLHNCQUFzQjtBQUN2QyxpQkFBTyxFQUFQLE9BQU87U0FDUjtBQUNHLG9CQUFZLEdBQUcsb0NBQWlCLFVBQVUsQ0FBQztBQUMzQyxZQUFJLEdBQUc7QUFDVCx1QkFBYSxFQUFFO0FBQ2IsMEJBQWMsRUFBRSxJQUFJLENBQUMsVUFBVTtXQUNoQztTQUNGOztBQUNELFlBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO0FBQzVCLGNBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ3BFO0FBQ0QsWUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7QUFDOUIsY0FBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQ2pFO0FBQ0QsWUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7QUFDakMsY0FBSSxDQUFDLFlBQVksR0FBRyxFQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUMsQ0FBQztTQUMxQztBQUNELFlBQUksR0FBRyw0QkFBZSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzt5Q0FDL0QsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs0Q0FDdkIsWUFBWTs7Ozs7OztDQUNwQjs7QUFFRCxlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztRQUFFLG9CQUFvQixHQUFwQixvQkFBb0I7cUJBQ2pDLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2NvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IENocm9tZWRyaXZlciBmcm9tICdhcHBpdW0tY2hyb21lZHJpdmVyJztcbmltcG9ydCB7IGVycm9ycyB9IGZyb20gJ2FwcGl1bS1iYXNlLWRyaXZlcic7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIHdlYnZpZXdIZWxwZXJzLFxuICAgICAgICAgTkFUSVZFX1dJTiwgV0VCVklFV19CQVNFLCBXRUJWSUVXX1dJTiwgQ0hST01JVU1fV0lOIH0gZnJvbSAnLi4vd2Vidmlldy1oZWxwZXJzJztcblxubGV0IGNvbW1hbmRzID0ge30sIGhlbHBlcnMgPSB7fSwgZXh0ZW5zaW9ucyA9IHt9O1xuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEFjdHVhbCBNSlNPTldQIGNvbW1hbmQgaGFuZGxlcnNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbmNvbW1hbmRzLmdldEN1cnJlbnRDb250ZXh0ID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5jdXJDb250ZXh0O1xufTtcblxuY29tbWFuZHMuZ2V0Q29udGV4dHMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIGxldCB3ZWJ2aWV3cztcbiAgaWYgKHRoaXMuaXNDaHJvbWVTZXNzaW9uKSB7XG4gICAgLy8gaWYgd2UgaGF2ZSBhIENocm9tZSBicm93c2VyIHNlc3Npb24sIHdlIG9ubHkgY2FyZSBhYm91dCB0aGUgQ2hyb21lXG4gICAgLy8gY29udGV4dCBhbmQgdGhlIG5hdGl2ZSBjb250ZXh0XG4gICAgd2Vidmlld3MgPSBbQ0hST01JVU1fV0lOXTtcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGhlcndpc2Ugd2UgdXNlIEFEQiB0byBmaWd1cmUgb3V0IHdoaWNoIHdlYnZpZXdzIGFyZSBhdmFpbGFibGVcbiAgICB3ZWJ2aWV3cyA9IGF3YWl0IHdlYnZpZXdIZWxwZXJzLmdldFdlYnZpZXdzKHRoaXMuYWRiLFxuICAgICAgdGhpcy5vcHRzLmFuZHJvaWREZXZpY2VTb2NrZXQpO1xuICB9XG4gIHRoaXMuY29udGV4dHMgPSBfLnVuaW9uKFtOQVRJVkVfV0lOXSwgd2Vidmlld3MpO1xuICBsb2dnZXIuZGVidWcoYEF2YWlsYWJsZSBjb250ZXh0czogJHtKU09OLnN0cmluZ2lmeSh0aGlzLmNvbnRleHRzKX1gKTtcbiAgcmV0dXJuIHRoaXMuY29udGV4dHM7XG59O1xuXG5jb21tYW5kcy5zZXRDb250ZXh0ID0gYXN5bmMgZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKG5hbWUgPT09IG51bGwpIHtcbiAgICBuYW1lID0gdGhpcy5kZWZhdWx0Q29udGV4dE5hbWUoKTtcbiAgfSBlbHNlIGlmIChuYW1lID09PSBXRUJWSUVXX1dJTikge1xuICAgIC8vIGhhbmRsZSBzZXRDb250ZXh0IFwiV0VCVklFV1wiXG4gICAgbmFtZSA9IHRoaXMuZGVmYXVsdFdlYnZpZXdOYW1lKCk7XG4gIH1cbiAgbGV0IGNvbnRleHRzID0gYXdhaXQgdGhpcy5nZXRDb250ZXh0cygpO1xuICAvLyBpZiB0aGUgY29udGV4dCB3ZSB3YW50IGRvZXNuJ3QgZXhpc3QsIGZhaWxcbiAgaWYgKCFfLmNvbnRhaW5zKGNvbnRleHRzLCBuYW1lKSkge1xuICAgIHRocm93IG5ldyBlcnJvcnMuTm9TdWNoQ29udGV4dEVycm9yKCk7XG4gIH1cbiAgLy8gaWYgd2UncmUgYWxyZWFkeSBpbiB0aGUgY29udGV4dCB3ZSB3YW50LCBkbyBub3RoaW5nXG4gIGlmIChuYW1lID09PSB0aGlzLmN1ckNvbnRleHQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCB0aGlzLnN3aXRjaENvbnRleHQobmFtZSk7XG4gIHRoaXMuY3VyQ29udGV4dCA9IG5hbWU7XG59O1xuXG5oZWxwZXJzLnN3aXRjaENvbnRleHQgPSBhc3luYyBmdW5jdGlvbiAobmFtZSkge1xuICAvLyBXZSBoYXZlIHNvbWUgb3B0aW9ucyB3aGVuIGl0IGNvbWVzIHRvIHdlYnZpZXdzLiBJZiB3ZSB3YW50IGFcbiAgLy8gQ2hyb21lZHJpdmVyIHdlYnZpZXcsIHdlIGNhbiBvbmx5IGNvbnRyb2wgb25lIGF0IGEgdGltZS5cbiAgaWYgKHRoaXMuaXNDaHJvbWVkcml2ZXJDb250ZXh0KG5hbWUpKSB7XG4gICAgLy8gc3RhcnQgcHJveHlpbmcgY29tbWFuZHMgZGlyZWN0bHkgdG8gY2hyb21lZHJpdmVyXG4gICAgYXdhaXQgdGhpcy5zdGFydENocm9tZWRyaXZlclByb3h5KG5hbWUpO1xuICB9IGVsc2UgaWYgKHRoaXMuaXNDaHJvbWVkcml2ZXJDb250ZXh0KHRoaXMuY3VyQ29udGV4dCkpIHtcbiAgICAvLyBpZiB3ZSdyZSBtb3ZpbmcgdG8gYSBub24tY2hyb21lZHJpdmVyIHdlYnZpZXcsIGFuZCBvdXIgY3VycmVudCBjb250ZXh0XG4gICAgLy8gX2lzXyBhIGNocm9tZWRyaXZlciB3ZWJ2aWV3LCBpZiBjYXBzIHJlY3JlYXRlQ2hyb21lRHJpdmVyU2Vzc2lvbnMgaXMgc2V0XG4gICAgLy8gdG8gdHJ1ZSB0aGVuIGtpbGwgY2hyb21lZHJpdmVyIHNlc3Npb24gdXNpbmcgc3RvcENocm9tZWRyaXZlclByb3hpZXMgb3JcbiAgICAvLyBlbHNlIHNpbXBseSBzdXNwZW5kIHByb3h5aW5nIHRvIHRoZSBsYXR0ZXJcbiAgICBpZiAodGhpcy5vcHRzLnJlY3JlYXRlQ2hyb21lRHJpdmVyU2Vzc2lvbnMpIHtcbiAgICAgIGxvZ2dlci5kZWJ1ZyhcInJlY3JlYXRlQ2hyb21lRHJpdmVyU2Vzc2lvbnMgc2V0IHRvIHRydWU7IGtpbGxpbmcgZXhpc3RpbmcgY2hyb21lZHJpdmVyc1wiKTtcbiAgICAgIHRoaXMuc3RvcENocm9tZWRyaXZlclByb3hpZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdXNwZW5kQ2hyb21lZHJpdmVyUHJveHkoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBEaWRuJ3Qga25vdyBob3cgdG8gaGFuZGxlIHN3aXRjaGluZyB0byBjb250ZXh0ICcke25hbWV9J2ApO1xuICB9XG59O1xuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogT24tb2JqZWN0IGNvbnRleHQtcmVsYXRlZCBoZWxwZXJzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuLy8gVGhlIHJlYXNvbiB0aGlzIGlzIGEgZnVuY3Rpb24gYW5kIG5vdCBqdXN0IGEgY29uc3RhbnQgaXMgdGhhdCBib3RoIGFuZHJvaWQtXG4vLyBkcml2ZXIgYW5kIHNlbGVuZHJvaWQtZHJpdmVyIHVzZSB0aGlzIGxvZ2ljLCBhbmQgZWFjaCBvbmUgcmV0dXJuc1xuLy8gYSBkaWZmZXJlbnQgZGVmYXVsdCBjb250ZXh0IG5hbWVcbmhlbHBlcnMuZGVmYXVsdENvbnRleHROYW1lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gTkFUSVZFX1dJTjtcbn07XG5cbmhlbHBlcnMuZGVmYXVsdFdlYnZpZXdOYW1lID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gV0VCVklFV19CQVNFICsgdGhpcy5vcHRzLmFwcFBhY2thZ2U7XG59O1xuXG5oZWxwZXJzLmlzV2ViQ29udGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuY3VyQ29udGV4dCAhPT0gbnVsbCAmJiB0aGlzLmN1ckNvbnRleHQgIT09IE5BVElWRV9XSU47XG59O1xuXG4vLyBUdXJuIG9uIHByb3h5aW5nIHRvIGFuIGV4aXN0aW5nIENocm9tZWRyaXZlciBzZXNzaW9uIG9yIGEgbmV3IG9uZVxuaGVscGVycy5zdGFydENocm9tZWRyaXZlclByb3h5ID0gYXN5bmMgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgbG9nZ2VyLmRlYnVnKGBDb25uZWN0aW5nIHRvIGNocm9tZS1iYWNrZWQgd2VidmlldyBjb250ZXh0ICcke2NvbnRleHR9J2ApO1xuICBpZiAodGhpcy5jaHJvbWVkcml2ZXIgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJXZSBhbHJlYWR5IGhhdmUgYSBjaHJvbWVkcml2ZXIgaW5zdGFuY2UgcnVubmluZ1wiKTtcbiAgfVxuXG4gIGxldCBjZDtcbiAgaWYgKHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF0pIHtcbiAgICAvLyBpbiB0aGUgY2FzZSB3aGVyZSB3ZSd2ZSBhbHJlYWR5IHNldCB1cCBhIGNocm9tZWRyaXZlciBmb3IgYSBjb250ZXh0LFxuICAgIC8vIHdlIHdhbnQgdG8gcmVjb25uZWN0IHRvIGl0LCBub3QgY3JlYXRlIGEgd2hvbGUgbmV3IG9uZVxuICAgIGxvZ2dlci5kZWJ1ZyhgRm91bmQgZXhpc3RpbmcgQ2hyb21lZHJpdmVyIGZvciBjb250ZXh0ICcke2NvbnRleHR9Jy4gVXNpbmcgaXQuYCk7XG4gICAgY2QgPSB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdO1xuICAgIGF3YWl0IHNldHVwRXhpc3RpbmdDaHJvbWVkcml2ZXIoY2QpO1xuICB9IGVsc2Uge1xuICAgIGxldCBvcHRzID0gXy5jbG9uZURlZXAodGhpcy5vcHRzKTtcbiAgICBvcHRzLmNocm9tZVVzZVJ1bm5pbmdBcHAgPSB0cnVlO1xuICAgIGNkID0gYXdhaXQgc2V0dXBOZXdDaHJvbWVkcml2ZXIob3B0cywgdGhpcy5hZGIuY3VyRGV2aWNlSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkYi5nZXRBZGJTZXJ2ZXJQb3J0KCkpO1xuICAgIC8vIGJpbmQgb3VyIHN0b3AvZXhpdCBoYW5kbGVyLCBwYXNzaW5nIGluIGNvbnRleHQgc28gd2Uga25vdyB3aGljaFxuICAgIC8vIG9uZSBzdG9wcGVkIHVuZXhwZWN0ZWRseVxuICAgIGNkLm9uKENocm9tZWRyaXZlci5FVkVOVF9DSEFOR0VELCAobXNnKSA9PiB7XG4gICAgICBpZiAobXNnLnN0YXRlID09PSBDaHJvbWVkcml2ZXIuU1RBVEVfU1RPUFBFRCkge1xuICAgICAgICB0aGlzLm9uQ2hyb21lZHJpdmVyU3RvcChjb250ZXh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBzYXZlIHRoZSBjaHJvbWVkcml2ZXIgb2JqZWN0IHVuZGVyIHRoZSBjb250ZXh0XG4gICAgdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVyc1tjb250ZXh0XSA9IGNkO1xuICB9XG4gIC8vIGhvb2sgdXAgdGhlIGxvY2FsIHZhcmlhYmxlcyBzbyB3ZSBjYW4gcHJveHkgdGhpcyBiaXpcbiAgdGhpcy5jaHJvbWVkcml2ZXIgPSBjZDtcbiAgdGhpcy5wcm94eVJlcVJlcyA9IHRoaXMuY2hyb21lZHJpdmVyLnByb3h5UmVxLmJpbmQodGhpcy5jaHJvbWVkcml2ZXIpO1xuICB0aGlzLmp3cFByb3h5QWN0aXZlID0gdHJ1ZTtcbn07XG5cbi8vIFN0b3AgcHJveHlpbmcgdG8gYW55IENocm9tZWRyaXZlclxuaGVscGVycy5zdXNwZW5kQ2hyb21lZHJpdmVyUHJveHkgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuY2hyb21lZHJpdmVyID0gbnVsbDtcbiAgdGhpcy5wcm94eVJlcVJlcyA9IG51bGw7XG4gIHRoaXMuandwUHJveHlBY3RpdmUgPSBmYWxzZTtcbn07XG5cbi8vIEhhbmRsZSBhbiBvdXQtb2YtYmFuZCBDaHJvbWVkcml2ZXIgc3RvcCBldmVudFxuaGVscGVycy5vbkNocm9tZWRyaXZlclN0b3AgPSBhc3luYyBmdW5jdGlvbiAoY29udGV4dCkge1xuICBsb2dnZXIud2FybihgQ2hyb21lZHJpdmVyIGZvciBjb250ZXh0ICR7Y29udGV4dH0gc3RvcHBlZCB1bmV4cGVjdGVkbHlgKTtcbiAgaWYgKGNvbnRleHQgPT09IHRoaXMuY3VyQ29udGV4dCkge1xuICAgIC8vIHdlIGV4aXRlZCB1bmV4cGVjdGVkbHkgd2hpbGUgYXV0b21hdGluZyB0aGUgY3VycmVudCBjb250ZXh0IGFuZCBzbyB3YW50XG4gICAgLy8gdG8gc2h1dCBkb3duIHRoZSBzZXNzaW9uIGFuZCByZXNwb25kIHdpdGggYW4gZXJyb3JcbiAgICBsZXQgZXJyID0gbmV3IEVycm9yKFwiQ2hyb21lZHJpdmVyIHF1aXQgdW5leHBlY3RlZGx5IGR1cmluZyBzZXNzaW9uXCIpO1xuICAgIGF3YWl0IHRoaXMuc3RhcnRVbmV4cGVjdGVkU2h1dGRvd24oZXJyKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBpZiBhIENocm9tZWRyaXZlciBpbiB0aGUgbm9uLWFjdGl2ZSBjb250ZXh0IGJhcmZzLCB3ZSBkb24ndCByZWFsbHlcbiAgICAvLyBjYXJlLCB3ZSdsbCBqdXN0IG1ha2UgYSBuZXcgb25lIG5leHQgdGltZSB3ZSBuZWVkIHRoZSBjb250ZXh0LlxuICAgIGxvZ2dlci53YXJuKFwiQ2hyb21lZHJpdmVyIHF1aXQgdW5leHBlY3RlZGx5LCBidXQgaXQgd2Fzbid0IHRoZSBhY3RpdmUgXCIgK1xuICAgICAgICAgICAgICAgIFwiY29udGV4dCwgaWdub3JpbmdcIik7XG4gICAgZGVsZXRlIHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF07XG4gIH1cbn07XG5cbi8vIEludGVudGlvbmFsbHkgc3RvcCBhbGwgdGhlIGNocm9tZWRyaXZlcnMgY3VycmVudGx5IGFjdGl2ZSwgYW5kIGlnbm9yZVxuLy8gdGhlaXIgZXhpdCBldmVudHNcbmhlbHBlcnMuc3RvcENocm9tZWRyaXZlclByb3hpZXMgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuc3VzcGVuZENocm9tZWRyaXZlclByb3h5KCk7IC8vIG1ha2Ugc3VyZSB3ZSB0dXJuIG9mZiB0aGUgcHJveHkgZmxhZ1xuICBmb3IgKGxldCBjb250ZXh0IG9mIF8ua2V5cyh0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzKSkge1xuICAgIGxldCBjZCA9IHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF07XG4gICAgbG9nZ2VyLmRlYnVnKGBTdG9wcGluZyBjaHJvbWVkcml2ZXIgZm9yIGNvbnRleHQgJHtjb250ZXh0fWApO1xuICAgIC8vIHN0b3AgbGlzdGVuaW5nIGZvciB0aGUgc3RvcHBlZCBzdGF0ZSBldmVudFxuICAgIGNkLnJlbW92ZUFsbExpc3RlbmVycyhDaHJvbWVkcml2ZXIuRVZFTlRfQ0hBTkdFRCk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNkLnN0b3AoKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZ2dlci53YXJuKGBFcnJvciBzdG9wcGluZyBDaHJvbWVkcml2ZXI6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgfVxuICAgIGRlbGV0ZSB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdO1xuICB9XG59O1xuXG5oZWxwZXJzLmlzQ2hyb21lZHJpdmVyQ29udGV4dCA9IGZ1bmN0aW9uICh2aWV3TmFtZSkge1xuICByZXR1cm4gdmlld05hbWUuaW5kZXhPZihXRUJWSUVXX1dJTikgIT09IC0xIHx8IHZpZXdOYW1lID09PSBDSFJPTUlVTV9XSU47XG59O1xuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBJbnRlcm5hbCBsaWJyYXJ5IGZ1bmN0aW9uc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBFeGlzdGluZ0Nocm9tZWRyaXZlciAoY2hyb21lZHJpdmVyKSB7XG4gIC8vIGNoZWNrIHRoZSBzdGF0dXMgYnkgc2VuZGluZyBhIHNpbXBsZSB3aW5kb3ctYmFzZWQgY29tbWFuZCB0byBDaHJvbWVEcml2ZXJcbiAgLy8gaWYgdGhlcmUgaXMgYW4gZXJyb3IsIHdlIHdhbnQgdG8gcmVjcmVhdGUgdGhlIENocm9tZURyaXZlciBzZXNzaW9uXG4gIGlmICghYXdhaXQgY2hyb21lZHJpdmVyLmhhc1dvcmtpbmdXZWJ2aWV3KCkpIHtcbiAgICBsb2dnZXIuZGVidWcoXCJDaHJvbWVEcml2ZXIgaXMgbm90IGFzc29jaWF0ZWQgd2l0aCBhIHdpbmRvdy4gXCIgK1xuICAgICAgICAgICAgICAgICBcIlJlLWluaXRpYWxpemluZyB0aGUgc2Vzc2lvbi5cIik7XG4gICAgYXdhaXQgY2hyb21lZHJpdmVyLnJlc3RhcnQoKTtcbiAgfVxuICByZXR1cm4gY2hyb21lZHJpdmVyO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZXR1cE5ld0Nocm9tZWRyaXZlciAob3B0cywgY3VyRGV2aWNlSWQsIGFkYlBvcnQpIHtcbiAgbGV0IGNocm9tZUFyZ3MgPSB7XG4gICAgcG9ydDogb3B0cy5jaHJvbWVEcml2ZXJQb3J0LFxuICAgIGV4ZWN1dGFibGU6IG9wdHMuY2hyb21lZHJpdmVyRXhlY3V0YWJsZSxcbiAgICBhZGJQb3J0XG4gIH07XG4gIGxldCBjaHJvbWVkcml2ZXIgPSBuZXcgQ2hyb21lZHJpdmVyKGNocm9tZUFyZ3MpO1xuICBsZXQgY2FwcyA9IHtcbiAgICBjaHJvbWVPcHRpb25zOiB7XG4gICAgICBhbmRyb2lkUGFja2FnZTogb3B0cy5hcHBQYWNrYWdlXG4gICAgfVxuICB9O1xuICBpZiAob3B0cy5jaHJvbWVVc2VSdW5uaW5nQXBwKSB7XG4gICAgY2Fwcy5jaHJvbWVPcHRpb25zLmFuZHJvaWRVc2VSdW5uaW5nQXBwID0gb3B0cy5jaHJvbWVVc2VSdW5uaW5nQXBwO1xuICB9XG4gIGlmIChvcHRzLmNocm9tZUFuZHJvaWRBY3Rpdml0eSkge1xuICAgIGNhcHMuY2hyb21lT3B0aW9ucy5hbmRyb2lkQWN0aXZpdHkgPSBvcHRzLmNocm9tZUFuZHJvaWRBY3Rpdml0eTtcbiAgfVxuICBpZiAob3B0cy5lbmFibGVQZXJmb3JtYW5jZUxvZ2dpbmcpIHtcbiAgICBjYXBzLmxvZ2dpbmdQcmVmcyA9IHtwZXJmb3JtYW5jZTogJ0FMTCd9O1xuICB9XG4gIGNhcHMgPSB3ZWJ2aWV3SGVscGVycy5kZWNvcmF0ZUNocm9tZU9wdGlvbnMoY2Fwcywgb3B0cywgY3VyRGV2aWNlSWQpO1xuICBhd2FpdCBjaHJvbWVkcml2ZXIuc3RhcnQoY2Fwcyk7XG4gIHJldHVybiBjaHJvbWVkcml2ZXI7XG59XG5cbk9iamVjdC5hc3NpZ24oZXh0ZW5zaW9ucywgY29tbWFuZHMsIGhlbHBlcnMpO1xuZXhwb3J0IHsgY29tbWFuZHMsIGhlbHBlcnMsIHNldHVwTmV3Q2hyb21lZHJpdmVyIH07XG5leHBvcnQgZGVmYXVsdCBleHRlbnNpb25zO1xuIl19