(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.mixins = global.mixins || {}, global.mixins.events = factory());
}(this, (function () { 'use strict';

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var helpers = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function callFunc(fn) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var l = fn.length,
        i = -1,
        a1 = args[0],
        a2 = args[1],
        a3 = args[2],
        a4 = args[3],
        a5 = args[4];

    switch (args.length) {
      case 0:
        while (++i < l) {
          fn[i].handler.call(fn[i].ctx);
        }

        return;

      case 1:
        while (++i < l) {
          fn[i].handler.call(fn[i].ctx, a1);
        }

        return;

      case 2:
        while (++i < l) {
          fn[i].handler.call(fn[i].ctx, a1, a2);
        }

        return;

      case 3:
        while (++i < l) {
          fn[i].handler.call(fn[i].ctx, a1, a2, a3);
        }

        return;

      case 4:
        while (++i < l) {
          fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
        }

        return;

      case 5:
        while (++i < l) {
          fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4, a5);
        }

        return;

      default:
        while (++i < l) {
          fn[i].handler.apply(fn[i].ctx, args);
        }

        return;
    }
  }

  exports.callFunc = callFunc;
  var idCounter = 0;

  function uniqueId() {
    var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
    return prefix + ++idCounter;
  }

  exports.uniqueId = uniqueId;

  function isFunction(a) {
    return typeof a === 'function';
  }

  function isEventEmitter(a) {
    return a && isFunction(a.on) && isFunction(a.once) && isFunction(a.off) && isFunction(a.trigger);
  }

  exports.isEventEmitter = isEventEmitter;

  function IsEventListener(a) {
    return a && isFunction(a.listenTo) && isFunction(a.listenToOnce) && isFunction(a.stopListening);
  }

  exports.IsEventListener = IsEventListener;
});
unwrapExports(helpers);
var helpers_1 = helpers.callFunc;
var helpers_2 = helpers.uniqueId;
var helpers_3 = helpers.isEventEmitter;
var helpers_4 = helpers.IsEventListener;

var eventEmitter = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function removeFromListener(listeners, fn, ctx) {
    for (var i = 0; i < listeners.length; i++) {
      var e = listeners[i];

      if (fn == null && ctx != null && e.ctx === ctx || fn != null && ctx == null && e.handler === fn || fn != null && ctx != null && e.handler === fn && e.ctx === ctx) {
        listeners.splice(i, 1);
      }
    }

    return listeners;
  }
  /**
   * Makes target, Base, an EventEmitter
   *
   * @export
   * @param {T} Base
   * @template
   * @returns {(Constructor<IEventEmitter> & T)}
   */


  function EventEmitter(Base) {
    return function (_Base) {
      _inherits(_class, _Base);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "on",
        value: function on(event, fn, ctx) {
          var once = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
          var events = (this._listeners || (this._listeners = new Map())).get(event) || [];
          events.push({
            name: event,
            once: once,
            handler: fn,
            ctx: ctx || this
          });
          if (!this._listeners.has(event)) this._listeners.set(event, events);
          return this;
        }
      }, {
        key: "once",
        value: function once(event, fn, ctx) {
          return this.on(event, fn, ctx, true);
        }
      }, {
        key: "off",
        value: function off(eventName, fn, ctx) {
          this._listeners = this._listeners || new Map();

          if (eventName == null && ctx == null) {
            this._listeners = new Map();
          } else if (this._listeners.has(eventName)) {
            var events = this._listeners.get(eventName);

            if (fn == null && ctx == null) {
              this._listeners.set(eventName, []);
            } else {
              removeFromListener(events, fn, ctx);
            }
          } else {
            this._listeners.forEach(function (value) {
              removeFromListener(value, fn, ctx);
            }); //this._listeners = new Map();

          }

          return this;
        }
      }, {
        key: "trigger",
        value: function trigger(eventName) {
          this._listeners = this._listeners || new Map();
          var events = (this._listeners.get(eventName) || []).concat(this._listeners.get("*") || []);
          var event = void 0,
              a = void 0,
              index = void 0;
          var calls = [];
          var alls = [];

          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          for (var i = 0, ii = events.length; i < ii; i++) {
            event = events[i];
            if (events[i].name === '*') {
              alls.push(events[i]);
            } else {
              calls.push(events[i]);
            }

            if (events[i].once === true) {
              index = this._listeners.get(events[i].name).indexOf(events[i]);

              this._listeners.get(events[i].name).splice(index, 1);
            }
          }

          if (alls.length) {
            var _a = [eventName].concat(args);

            this._executeListener(alls, _a);
          }

          if (calls.length) this._executeListener(calls, args);else if (eventName === 'error' && EventEmitter.throwOnError) {
            if (args.length) {
              var _a2 = args[0];

              if (!(_a2 instanceof Error)) {
                _a2 = new Error(String(_a2));
              }

              EventEmitter.throwError(_a2);
            }
          }
          return this;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          if (typeof Base.prototype.destroy === 'function') Base.prototype.destroy.call(this);
          this.off();
        }
      }, {
        key: "_executeListener",
        value: function _executeListener(func, args) {
          EventEmitter.executeListenerFunction(func, args);
        }
      }, {
        key: "listeners",
        get: function get() {
          return this._listeners;
        }
      }]);

      return _class;
    }(Base);
  }

  exports.EventEmitter = EventEmitter;

  (function (EventEmitter) {
    /**
     * If true EventEmitter will call throwError, when when no listeners for the "error" event
     */
    EventEmitter.throwOnError = false;

    function throwError(error) {
      throw error;
    }

    EventEmitter.throwError = throwError;

    function executeListenerFunction(func, args) {
      helpers.callFunc(func, args);
    }

    EventEmitter.executeListenerFunction = executeListenerFunction;
  })(EventEmitter = exports.EventEmitter || (exports.EventEmitter = {}));
});
unwrapExports(eventEmitter);
var eventEmitter_1 = eventEmitter.EventEmitter;

var eventListener = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function EventListener(Base) {
    return function (_Base) {
      _inherits(_class, _Base);

      function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
      }

      _createClass(_class, [{
        key: "listenTo",
        value: function listenTo(obj, event, fn, ctx) {
          var once = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

          if (!helpers.isEventEmitter(obj)) {
            if (eventEmitter.EventEmitter.throwOnError) eventEmitter.EventEmitter.throwError(new TypeError("obj is not an EventEmitter"));
            return this;
          }

          var listeningTo = void 0,
              id = void 0,
              meth = void 0;
          listeningTo = this._listeningTo || (this._listeningTo = {});
          id = obj.listenId || (obj.listenId = helpers.uniqueId());
          listeningTo[id] = obj;
          meth = once ? 'once' : 'on';
          obj[meth](event, fn, ctx || this);
          return this;
        }
      }, {
        key: "listenToOnce",
        value: function listenToOnce(obj, event, fn, ctx) {
          return this.listenTo(obj, event, fn, ctx, true);
        }
      }, {
        key: "stopListening",
        value: function stopListening(obj, event, callback) {
          if (obj && !helpers.isEventEmitter(obj)) {
            if (eventEmitter.EventEmitter.throwOnError) eventEmitter.EventEmitter.throwError(new TypeError("obj is not an EventEmitter"));
            return this;
          }

          var listeningTo = this._listeningTo;
          if (!listeningTo) return this;
          var remove = !event && !callback;
          if (!callback && _typeof(event) === 'object') callback = this;
          if (obj) (listeningTo = {})[obj.listenId] = obj;

          for (var id in listeningTo) {
            obj = listeningTo[id];
            obj.off(event, callback, this);
            if (remove || obj.listeners.size === 0) delete this._listeningTo[id]; //if (remove || !Object.keys((<any>obj).listeners).length) delete this._listeningTo[id];
          }

          return this;
        }
      }, {
        key: "destroy",
        value: function destroy() {
          if (typeof Base.prototype.destroy === 'function') Base.prototype.destroy.call(this);
          this.stopListening();
        }
      }]);

      return _class;
    }(Base);
  }

  exports.EventListener = EventListener;
});
unwrapExports(eventListener);
var eventListener_1 = eventListener.EventListener;

var lib = createCommonjsModule(function (module, exports) {
  function __export(m) {
    for (var p in m) {
      if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __export(eventEmitter);

  __export(eventListener);

  __export(helpers);
});
var index = unwrapExports(lib);

return index;

})));
