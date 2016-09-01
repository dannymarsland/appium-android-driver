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

var _portfinder = require('portfinder');

var _portfinder2 = _interopRequireDefault(_portfinder);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

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
  var getPort, chromeArgs, chromedriver, caps;
  return _regeneratorRuntime.async(function setupNewChromedriver$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (opts.chromeDriverPort) {
          context$1$0.next = 6;
          break;
        }

        getPort = _bluebird2['default'].promisify(_portfinder2['default'].getPort, { context: _portfinder2['default'] });
        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(getPort());

      case 4:
        opts.chromeDriverPort = context$1$0.sent;

        _logger2['default'].debug('A port was not given, using random port: ' + opts.chromeDriverPort);

      case 6:
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
        context$1$0.next = 15;
        return _regeneratorRuntime.awrap(chromedriver.start(caps));

      case 15:
        return context$1$0.abrupt('return', chromedriver);

      case 16:
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

// if a port wasn't given, pick a random available one
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9jb21tYW5kcy9jb250ZXh0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O3NCQUFjLFFBQVE7Ozs7c0JBQ0gsV0FBVzs7OztrQ0FDTCxxQkFBcUI7Ozs7MEJBQ3ZCLFlBQVk7Ozs7d0JBQ3JCLFVBQVU7Ozs7Z0NBQ0Qsb0JBQW9COzs4QkFFeUIsb0JBQW9COzs7O0FBRXhGLElBQUksUUFBUSxHQUFHLEVBQUU7SUFBRSxPQUFPLEdBQUcsRUFBRTtJQUFFLFVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7O0FBTWpELFFBQVEsQ0FBQyxpQkFBaUIsR0FBRzs7Ozs0Q0FDcEIsSUFBSSxDQUFDLFVBQVU7Ozs7Ozs7Q0FDdkIsQ0FBQzs7QUFFRixRQUFRLENBQUMsV0FBVyxHQUFHO01BQ2pCLFFBQVE7Ozs7QUFBUixnQkFBUTs7YUFDUixJQUFJLENBQUMsZUFBZTs7Ozs7OztBQUd0QixnQkFBUSxHQUFHLDhCQUFjLENBQUM7Ozs7Ozt5Q0FHVCw0QkFBZSxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQzs7O0FBRGhDLGdCQUFROzs7QUFHVixZQUFJLENBQUMsUUFBUSxHQUFHLG9CQUFFLEtBQUssQ0FBQyw0QkFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELDRCQUFPLEtBQUssMEJBQXdCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFHLENBQUM7NENBQzlELElBQUksQ0FBQyxRQUFROzs7Ozs7O0NBQ3JCLENBQUM7O0FBRUYsUUFBUSxDQUFDLFVBQVUsR0FBRyxvQkFBZ0IsSUFBSTtNQU9wQyxRQUFROzs7O0FBTlosWUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ2pCLGNBQUksR0FBRyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUNsQyxNQUFNLElBQUksSUFBSSxnQ0FBZ0IsRUFBRTs7QUFFL0IsY0FBSSxHQUFHLElBQUks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QUFZLEdBQUcsb0NBQWlCLFVBQVUsQ0FBQztBQUMzQyxZQUFJLEdBQUc7QUFDVCx1QkFBYSxFQUFFO0FBQ2IsMEJBQWMsRUFBRSxJQUFJLENBQUMsVUFBVTtXQUNoQztTQUNGOztBQUNELFlBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO0FBQzVCLGNBQUksQ0FBQyxhQUFhLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1NBQ3BFO0FBQ0QsWUFBSSxJQUFJLENBQUMscUJBQXFCLEVBQUU7QUFDOUIsY0FBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1NBQ2pFO0FBQ0QsWUFBSSxJQUFJLENBQUMsd0JBQXdCLEVBQUU7QUFDakMsY0FBSSxDQUFDLFlBQVksR0FBRyxFQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUMsQ0FBQztTQUMxQztBQUNELFlBQUksR0FBRyw0QkFBZSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzt5Q0FDL0QsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7Ozs0Q0FDdkIsWUFBWTs7Ozs7OztDQUNwQjs7QUFFRCxlQUFjLFVBQVUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDcEMsUUFBUSxHQUFSLFFBQVE7UUFBRSxPQUFPLEdBQVAsT0FBTztRQUFFLG9CQUFvQixHQUFwQixvQkFBb0I7cUJBQ2pDLFVBQVUiLCJmaWxlIjoibGliL2NvbW1hbmRzL2NvbnRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGxvZ2dlciBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IENocm9tZWRyaXZlciBmcm9tICdhcHBpdW0tY2hyb21lZHJpdmVyJztcbmltcG9ydCBQb3J0RmluZGVyIGZyb20gJ3BvcnRmaW5kZXInO1xuaW1wb3J0IEIgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHsgZXJyb3JzIH0gZnJvbSAnYXBwaXVtLWJhc2UtZHJpdmVyJztcbmltcG9ydCB7IGRlZmF1bHQgYXMgd2Vidmlld0hlbHBlcnMsXG4gICAgICAgICBOQVRJVkVfV0lOLCBXRUJWSUVXX0JBU0UsIFdFQlZJRVdfV0lOLCBDSFJPTUlVTV9XSU4gfSBmcm9tICcuLi93ZWJ2aWV3LWhlbHBlcnMnO1xuXG5sZXQgY29tbWFuZHMgPSB7fSwgaGVscGVycyA9IHt9LCBleHRlbnNpb25zID0ge307XG5cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQWN0dWFsIE1KU09OV1AgY29tbWFuZCBoYW5kbGVyc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuY29tbWFuZHMuZ2V0Q3VycmVudENvbnRleHQgPSBhc3luYyBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLmN1ckNvbnRleHQ7XG59O1xuXG5jb21tYW5kcy5nZXRDb250ZXh0cyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgbGV0IHdlYnZpZXdzO1xuICBpZiAodGhpcy5pc0Nocm9tZVNlc3Npb24pIHtcbiAgICAvLyBpZiB3ZSBoYXZlIGEgQ2hyb21lIGJyb3dzZXIgc2Vzc2lvbiwgd2Ugb25seSBjYXJlIGFib3V0IHRoZSBDaHJvbWVcbiAgICAvLyBjb250ZXh0IGFuZCB0aGUgbmF0aXZlIGNvbnRleHRcbiAgICB3ZWJ2aWV3cyA9IFtDSFJPTUlVTV9XSU5dO1xuICB9IGVsc2Uge1xuICAgIC8vIG90aGVyd2lzZSB3ZSB1c2UgQURCIHRvIGZpZ3VyZSBvdXQgd2hpY2ggd2Vidmlld3MgYXJlIGF2YWlsYWJsZVxuICAgIHdlYnZpZXdzID0gYXdhaXQgd2Vidmlld0hlbHBlcnMuZ2V0V2Vidmlld3ModGhpcy5hZGIsXG4gICAgICB0aGlzLm9wdHMuYW5kcm9pZERldmljZVNvY2tldCk7XG4gIH1cbiAgdGhpcy5jb250ZXh0cyA9IF8udW5pb24oW05BVElWRV9XSU5dLCB3ZWJ2aWV3cyk7XG4gIGxvZ2dlci5kZWJ1ZyhgQXZhaWxhYmxlIGNvbnRleHRzOiAke0pTT04uc3RyaW5naWZ5KHRoaXMuY29udGV4dHMpfWApO1xuICByZXR1cm4gdGhpcy5jb250ZXh0cztcbn07XG5cbmNvbW1hbmRzLnNldENvbnRleHQgPSBhc3luYyBmdW5jdGlvbiAobmFtZSkge1xuICBpZiAobmFtZSA9PT0gbnVsbCkge1xuICAgIG5hbWUgPSB0aGlzLmRlZmF1bHRDb250ZXh0TmFtZSgpO1xuICB9IGVsc2UgaWYgKG5hbWUgPT09IFdFQlZJRVdfV0lOKSB7XG4gICAgLy8gaGFuZGxlIHNldENvbnRleHQgXCJXRUJWSUVXXCJcbiAgICBuYW1lID0gdGhpcy5kZWZhdWx0V2Vidmlld05hbWUoKTtcbiAgfVxuICBsZXQgY29udGV4dHMgPSBhd2FpdCB0aGlzLmdldENvbnRleHRzKCk7XG4gIC8vIGlmIHRoZSBjb250ZXh0IHdlIHdhbnQgZG9lc24ndCBleGlzdCwgZmFpbFxuICBpZiAoIV8uY29udGFpbnMoY29udGV4dHMsIG5hbWUpKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5Ob1N1Y2hDb250ZXh0RXJyb3IoKTtcbiAgfVxuICAvLyBpZiB3ZSdyZSBhbHJlYWR5IGluIHRoZSBjb250ZXh0IHdlIHdhbnQsIGRvIG5vdGhpbmdcbiAgaWYgKG5hbWUgPT09IHRoaXMuY3VyQ29udGV4dCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IHRoaXMuc3dpdGNoQ29udGV4dChuYW1lKTtcbiAgdGhpcy5jdXJDb250ZXh0ID0gbmFtZTtcbn07XG5cbmhlbHBlcnMuc3dpdGNoQ29udGV4dCA9IGFzeW5jIGZ1bmN0aW9uIChuYW1lKSB7XG4gIC8vIFdlIGhhdmUgc29tZSBvcHRpb25zIHdoZW4gaXQgY29tZXMgdG8gd2Vidmlld3MuIElmIHdlIHdhbnQgYVxuICAvLyBDaHJvbWVkcml2ZXIgd2Vidmlldywgd2UgY2FuIG9ubHkgY29udHJvbCBvbmUgYXQgYSB0aW1lLlxuICBpZiAodGhpcy5pc0Nocm9tZWRyaXZlckNvbnRleHQobmFtZSkpIHtcbiAgICAvLyBzdGFydCBwcm94eWluZyBjb21tYW5kcyBkaXJlY3RseSB0byBjaHJvbWVkcml2ZXJcbiAgICBhd2FpdCB0aGlzLnN0YXJ0Q2hyb21lZHJpdmVyUHJveHkobmFtZSk7XG4gIH0gZWxzZSBpZiAodGhpcy5pc0Nocm9tZWRyaXZlckNvbnRleHQodGhpcy5jdXJDb250ZXh0KSkge1xuICAgIC8vIGlmIHdlJ3JlIG1vdmluZyB0byBhIG5vbi1jaHJvbWVkcml2ZXIgd2VidmlldywgYW5kIG91ciBjdXJyZW50IGNvbnRleHRcbiAgICAvLyBfaXNfIGEgY2hyb21lZHJpdmVyIHdlYnZpZXcsIGlmIGNhcHMgcmVjcmVhdGVDaHJvbWVEcml2ZXJTZXNzaW9ucyBpcyBzZXRcbiAgICAvLyB0byB0cnVlIHRoZW4ga2lsbCBjaHJvbWVkcml2ZXIgc2Vzc2lvbiB1c2luZyBzdG9wQ2hyb21lZHJpdmVyUHJveGllcyBvclxuICAgIC8vIGVsc2Ugc2ltcGx5IHN1c3BlbmQgcHJveHlpbmcgdG8gdGhlIGxhdHRlclxuICAgIGlmICh0aGlzLm9wdHMucmVjcmVhdGVDaHJvbWVEcml2ZXJTZXNzaW9ucykge1xuICAgICAgbG9nZ2VyLmRlYnVnKFwicmVjcmVhdGVDaHJvbWVEcml2ZXJTZXNzaW9ucyBzZXQgdG8gdHJ1ZTsga2lsbGluZyBleGlzdGluZyBjaHJvbWVkcml2ZXJzXCIpO1xuICAgICAgdGhpcy5zdG9wQ2hyb21lZHJpdmVyUHJveGllcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN1c3BlbmRDaHJvbWVkcml2ZXJQcm94eSgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYERpZG4ndCBrbm93IGhvdyB0byBoYW5kbGUgc3dpdGNoaW5nIHRvIGNvbnRleHQgJyR7bmFtZX0nYCk7XG4gIH1cbn07XG5cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBPbi1vYmplY3QgY29udGV4dC1yZWxhdGVkIGhlbHBlcnNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4vLyBUaGUgcmVhc29uIHRoaXMgaXMgYSBmdW5jdGlvbiBhbmQgbm90IGp1c3QgYSBjb25zdGFudCBpcyB0aGF0IGJvdGggYW5kcm9pZC1cbi8vIGRyaXZlciBhbmQgc2VsZW5kcm9pZC1kcml2ZXIgdXNlIHRoaXMgbG9naWMsIGFuZCBlYWNoIG9uZSByZXR1cm5zXG4vLyBhIGRpZmZlcmVudCBkZWZhdWx0IGNvbnRleHQgbmFtZVxuaGVscGVycy5kZWZhdWx0Q29udGV4dE5hbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBOQVRJVkVfV0lOO1xufTtcblxuaGVscGVycy5kZWZhdWx0V2Vidmlld05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBXRUJWSUVXX0JBU0UgKyB0aGlzLm9wdHMuYXBwUGFja2FnZTtcbn07XG5cbmhlbHBlcnMuaXNXZWJDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5jdXJDb250ZXh0ICE9PSBudWxsICYmIHRoaXMuY3VyQ29udGV4dCAhPT0gTkFUSVZFX1dJTjtcbn07XG5cbi8vIFR1cm4gb24gcHJveHlpbmcgdG8gYW4gZXhpc3RpbmcgQ2hyb21lZHJpdmVyIHNlc3Npb24gb3IgYSBuZXcgb25lXG5oZWxwZXJzLnN0YXJ0Q2hyb21lZHJpdmVyUHJveHkgPSBhc3luYyBmdW5jdGlvbiAoY29udGV4dCkge1xuICBsb2dnZXIuZGVidWcoYENvbm5lY3RpbmcgdG8gY2hyb21lLWJhY2tlZCB3ZWJ2aWV3IGNvbnRleHQgJyR7Y29udGV4dH0nYCk7XG4gIGlmICh0aGlzLmNocm9tZWRyaXZlciAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIldlIGFscmVhZHkgaGF2ZSBhIGNocm9tZWRyaXZlciBpbnN0YW5jZSBydW5uaW5nXCIpO1xuICB9XG5cbiAgbGV0IGNkO1xuICBpZiAodGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVyc1tjb250ZXh0XSkge1xuICAgIC8vIGluIHRoZSBjYXNlIHdoZXJlIHdlJ3ZlIGFscmVhZHkgc2V0IHVwIGEgY2hyb21lZHJpdmVyIGZvciBhIGNvbnRleHQsXG4gICAgLy8gd2Ugd2FudCB0byByZWNvbm5lY3QgdG8gaXQsIG5vdCBjcmVhdGUgYSB3aG9sZSBuZXcgb25lXG4gICAgbG9nZ2VyLmRlYnVnKGBGb3VuZCBleGlzdGluZyBDaHJvbWVkcml2ZXIgZm9yIGNvbnRleHQgJyR7Y29udGV4dH0nLiBVc2luZyBpdC5gKTtcbiAgICBjZCA9IHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF07XG4gICAgYXdhaXQgc2V0dXBFeGlzdGluZ0Nocm9tZWRyaXZlcihjZCk7XG4gIH0gZWxzZSB7XG4gICAgbGV0IG9wdHMgPSBfLmNsb25lRGVlcCh0aGlzLm9wdHMpO1xuICAgIG9wdHMuY2hyb21lVXNlUnVubmluZ0FwcCA9IHRydWU7XG4gICAgY2QgPSBhd2FpdCBzZXR1cE5ld0Nocm9tZWRyaXZlcihvcHRzLCB0aGlzLmFkYi5jdXJEZXZpY2VJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRiLmdldEFkYlNlcnZlclBvcnQoKSk7XG4gICAgLy8gYmluZCBvdXIgc3RvcC9leGl0IGhhbmRsZXIsIHBhc3NpbmcgaW4gY29udGV4dCBzbyB3ZSBrbm93IHdoaWNoXG4gICAgLy8gb25lIHN0b3BwZWQgdW5leHBlY3RlZGx5XG4gICAgY2Qub24oQ2hyb21lZHJpdmVyLkVWRU5UX0NIQU5HRUQsIChtc2cpID0+IHtcbiAgICAgIGlmIChtc2cuc3RhdGUgPT09IENocm9tZWRyaXZlci5TVEFURV9TVE9QUEVEKSB7XG4gICAgICAgIHRoaXMub25DaHJvbWVkcml2ZXJTdG9wKGNvbnRleHQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHNhdmUgdGhlIGNocm9tZWRyaXZlciBvYmplY3QgdW5kZXIgdGhlIGNvbnRleHRcbiAgICB0aGlzLnNlc3Npb25DaHJvbWVkcml2ZXJzW2NvbnRleHRdID0gY2Q7XG4gIH1cbiAgLy8gaG9vayB1cCB0aGUgbG9jYWwgdmFyaWFibGVzIHNvIHdlIGNhbiBwcm94eSB0aGlzIGJpelxuICB0aGlzLmNocm9tZWRyaXZlciA9IGNkO1xuICB0aGlzLnByb3h5UmVxUmVzID0gdGhpcy5jaHJvbWVkcml2ZXIucHJveHlSZXEuYmluZCh0aGlzLmNocm9tZWRyaXZlcik7XG4gIHRoaXMuandwUHJveHlBY3RpdmUgPSB0cnVlO1xufTtcblxuLy8gU3RvcCBwcm94eWluZyB0byBhbnkgQ2hyb21lZHJpdmVyXG5oZWxwZXJzLnN1c3BlbmRDaHJvbWVkcml2ZXJQcm94eSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5jaHJvbWVkcml2ZXIgPSBudWxsO1xuICB0aGlzLnByb3h5UmVxUmVzID0gbnVsbDtcbiAgdGhpcy5qd3BQcm94eUFjdGl2ZSA9IGZhbHNlO1xufTtcblxuLy8gSGFuZGxlIGFuIG91dC1vZi1iYW5kIENocm9tZWRyaXZlciBzdG9wIGV2ZW50XG5oZWxwZXJzLm9uQ2hyb21lZHJpdmVyU3RvcCA9IGFzeW5jIGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gIGxvZ2dlci53YXJuKGBDaHJvbWVkcml2ZXIgZm9yIGNvbnRleHQgJHtjb250ZXh0fSBzdG9wcGVkIHVuZXhwZWN0ZWRseWApO1xuICBpZiAoY29udGV4dCA9PT0gdGhpcy5jdXJDb250ZXh0KSB7XG4gICAgLy8gd2UgZXhpdGVkIHVuZXhwZWN0ZWRseSB3aGlsZSBhdXRvbWF0aW5nIHRoZSBjdXJyZW50IGNvbnRleHQgYW5kIHNvIHdhbnRcbiAgICAvLyB0byBzaHV0IGRvd24gdGhlIHNlc3Npb24gYW5kIHJlc3BvbmQgd2l0aCBhbiBlcnJvclxuICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoXCJDaHJvbWVkcml2ZXIgcXVpdCB1bmV4cGVjdGVkbHkgZHVyaW5nIHNlc3Npb25cIik7XG4gICAgYXdhaXQgdGhpcy5zdGFydFVuZXhwZWN0ZWRTaHV0ZG93bihlcnIpO1xuICB9IGVsc2Uge1xuICAgIC8vIGlmIGEgQ2hyb21lZHJpdmVyIGluIHRoZSBub24tYWN0aXZlIGNvbnRleHQgYmFyZnMsIHdlIGRvbid0IHJlYWxseVxuICAgIC8vIGNhcmUsIHdlJ2xsIGp1c3QgbWFrZSBhIG5ldyBvbmUgbmV4dCB0aW1lIHdlIG5lZWQgdGhlIGNvbnRleHQuXG4gICAgbG9nZ2VyLndhcm4oXCJDaHJvbWVkcml2ZXIgcXVpdCB1bmV4cGVjdGVkbHksIGJ1dCBpdCB3YXNuJ3QgdGhlIGFjdGl2ZSBcIiArXG4gICAgICAgICAgICAgICAgXCJjb250ZXh0LCBpZ25vcmluZ1wiKTtcbiAgICBkZWxldGUgdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVyc1tjb250ZXh0XTtcbiAgfVxufTtcblxuLy8gSW50ZW50aW9uYWxseSBzdG9wIGFsbCB0aGUgY2hyb21lZHJpdmVycyBjdXJyZW50bHkgYWN0aXZlLCBhbmQgaWdub3JlXG4vLyB0aGVpciBleGl0IGV2ZW50c1xuaGVscGVycy5zdG9wQ2hyb21lZHJpdmVyUHJveGllcyA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5zdXNwZW5kQ2hyb21lZHJpdmVyUHJveHkoKTsgLy8gbWFrZSBzdXJlIHdlIHR1cm4gb2ZmIHRoZSBwcm94eSBmbGFnXG4gIGZvciAobGV0IGNvbnRleHQgb2YgXy5rZXlzKHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnMpKSB7XG4gICAgbGV0IGNkID0gdGhpcy5zZXNzaW9uQ2hyb21lZHJpdmVyc1tjb250ZXh0XTtcbiAgICBsb2dnZXIuZGVidWcoYFN0b3BwaW5nIGNocm9tZWRyaXZlciBmb3IgY29udGV4dCAke2NvbnRleHR9YCk7XG4gICAgLy8gc3RvcCBsaXN0ZW5pbmcgZm9yIHRoZSBzdG9wcGVkIHN0YXRlIGV2ZW50XG4gICAgY2QucmVtb3ZlQWxsTGlzdGVuZXJzKENocm9tZWRyaXZlci5FVkVOVF9DSEFOR0VEKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgY2Quc3RvcCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nZ2VyLndhcm4oYEVycm9yIHN0b3BwaW5nIENocm9tZWRyaXZlcjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICB9XG4gICAgZGVsZXRlIHRoaXMuc2Vzc2lvbkNocm9tZWRyaXZlcnNbY29udGV4dF07XG4gIH1cbn07XG5cbmhlbHBlcnMuaXNDaHJvbWVkcml2ZXJDb250ZXh0ID0gZnVuY3Rpb24gKHZpZXdOYW1lKSB7XG4gIHJldHVybiB2aWV3TmFtZS5pbmRleE9mKFdFQlZJRVdfV0lOKSAhPT0gLTEgfHwgdmlld05hbWUgPT09IENIUk9NSVVNX1dJTjtcbn07XG5cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEludGVybmFsIGxpYnJhcnkgZnVuY3Rpb25zXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG5hc3luYyBmdW5jdGlvbiBzZXR1cEV4aXN0aW5nQ2hyb21lZHJpdmVyIChjaHJvbWVkcml2ZXIpIHtcbiAgLy8gY2hlY2sgdGhlIHN0YXR1cyBieSBzZW5kaW5nIGEgc2ltcGxlIHdpbmRvdy1iYXNlZCBjb21tYW5kIHRvIENocm9tZURyaXZlclxuICAvLyBpZiB0aGVyZSBpcyBhbiBlcnJvciwgd2Ugd2FudCB0byByZWNyZWF0ZSB0aGUgQ2hyb21lRHJpdmVyIHNlc3Npb25cbiAgaWYgKCFhd2FpdCBjaHJvbWVkcml2ZXIuaGFzV29ya2luZ1dlYnZpZXcoKSkge1xuICAgIGxvZ2dlci5kZWJ1ZyhcIkNocm9tZURyaXZlciBpcyBub3QgYXNzb2NpYXRlZCB3aXRoIGEgd2luZG93LiBcIiArXG4gICAgICAgICAgICAgICAgIFwiUmUtaW5pdGlhbGl6aW5nIHRoZSBzZXNzaW9uLlwiKTtcbiAgICBhd2FpdCBjaHJvbWVkcml2ZXIucmVzdGFydCgpO1xuICB9XG4gIHJldHVybiBjaHJvbWVkcml2ZXI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwTmV3Q2hyb21lZHJpdmVyIChvcHRzLCBjdXJEZXZpY2VJZCwgYWRiUG9ydCkge1xuICAvLyBpZiBhIHBvcnQgd2Fzbid0IGdpdmVuLCBwaWNrIGEgcmFuZG9tIGF2YWlsYWJsZSBvbmVcbiAgaWYgKCFvcHRzLmNocm9tZURyaXZlclBvcnQpIHtcbiAgICBsZXQgZ2V0UG9ydCA9IEIucHJvbWlzaWZ5KFBvcnRGaW5kZXIuZ2V0UG9ydCwge2NvbnRleHQ6IFBvcnRGaW5kZXJ9KTtcbiAgICBvcHRzLmNocm9tZURyaXZlclBvcnQgPSBhd2FpdCBnZXRQb3J0KCk7XG4gICAgbG9nZ2VyLmRlYnVnKGBBIHBvcnQgd2FzIG5vdCBnaXZlbiwgdXNpbmcgcmFuZG9tIHBvcnQ6ICR7b3B0cy5jaHJvbWVEcml2ZXJQb3J0fWApO1xuICB9XG4gIGxldCBjaHJvbWVBcmdzID0ge1xuICAgIHBvcnQ6IG9wdHMuY2hyb21lRHJpdmVyUG9ydCxcbiAgICBleGVjdXRhYmxlOiBvcHRzLmNocm9tZWRyaXZlckV4ZWN1dGFibGUsXG4gICAgYWRiUG9ydFxuICB9O1xuICBsZXQgY2hyb21lZHJpdmVyID0gbmV3IENocm9tZWRyaXZlcihjaHJvbWVBcmdzKTtcbiAgbGV0IGNhcHMgPSB7XG4gICAgY2hyb21lT3B0aW9uczoge1xuICAgICAgYW5kcm9pZFBhY2thZ2U6IG9wdHMuYXBwUGFja2FnZVxuICAgIH1cbiAgfTtcbiAgaWYgKG9wdHMuY2hyb21lVXNlUnVubmluZ0FwcCkge1xuICAgIGNhcHMuY2hyb21lT3B0aW9ucy5hbmRyb2lkVXNlUnVubmluZ0FwcCA9IG9wdHMuY2hyb21lVXNlUnVubmluZ0FwcDtcbiAgfVxuICBpZiAob3B0cy5jaHJvbWVBbmRyb2lkQWN0aXZpdHkpIHtcbiAgICBjYXBzLmNocm9tZU9wdGlvbnMuYW5kcm9pZEFjdGl2aXR5ID0gb3B0cy5jaHJvbWVBbmRyb2lkQWN0aXZpdHk7XG4gIH1cbiAgaWYgKG9wdHMuZW5hYmxlUGVyZm9ybWFuY2VMb2dnaW5nKSB7XG4gICAgY2Fwcy5sb2dnaW5nUHJlZnMgPSB7cGVyZm9ybWFuY2U6ICdBTEwnfTtcbiAgfVxuICBjYXBzID0gd2Vidmlld0hlbHBlcnMuZGVjb3JhdGVDaHJvbWVPcHRpb25zKGNhcHMsIG9wdHMsIGN1ckRldmljZUlkKTtcbiAgYXdhaXQgY2hyb21lZHJpdmVyLnN0YXJ0KGNhcHMpO1xuICByZXR1cm4gY2hyb21lZHJpdmVyO1xufVxuXG5PYmplY3QuYXNzaWduKGV4dGVuc2lvbnMsIGNvbW1hbmRzLCBoZWxwZXJzKTtcbmV4cG9ydCB7IGNvbW1hbmRzLCBoZWxwZXJzLCBzZXR1cE5ld0Nocm9tZWRyaXZlciB9O1xuZXhwb3J0IGRlZmF1bHQgZXh0ZW5zaW9ucztcbiJdfQ==