!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], e)
    : e(((t = 'undefined' != typeof globalThis ? globalThis : t || self)['lottie-player'] = {}));
})(this, function (exports) {
  'use strict';
  function _asyncIterator(t) {
    var e,
      i,
      s,
      n = 2;
    for ('undefined' != typeof Symbol && ((i = Symbol.asyncIterator), (s = Symbol.iterator)); n--; ) {
      if (i && null != (e = t[i])) return e.call(t);
      if (s && null != (e = t[s])) return new AsyncFromSyncIterator(e.call(t));
      (i = '@@asyncIterator'), (s = '@@iterator');
    }
    throw TypeError('Object is not async iterable');
  }
  function AsyncFromSyncIterator(t) {
    function e(t) {
      if (Object(t) !== t) return Promise.reject(TypeError(t + ' is not an object.'));
      var e = t.done;
      return Promise.resolve(t.value).then(function (t) {
        return { value: t, done: e };
      });
    }
    return (
      ((AsyncFromSyncIterator = function (t) {
        (this.s = t), (this.n = t.next);
      }).prototype = {
        s: null,
        n: null,
        next: function () {
          return e(this.n.apply(this.s, arguments));
        },
        return: function (t) {
          var i = this.s.return;
          return void 0 === i ? Promise.resolve({ value: t, done: !0 }) : e(i.apply(this.s, arguments));
        },
        throw: function (t) {
          var i = this.s.return;
          return void 0 === i ? Promise.reject(t) : e(i.apply(this.s, arguments));
        },
      }),
      new AsyncFromSyncIterator(t)
    );
  }
  function _jsx(t, e, i, s) {
    REACT_ELEMENT_TYPE ||
      (REACT_ELEMENT_TYPE = ('function' == typeof Symbol && Symbol.for && Symbol.for('react.element')) || 60103);
    var n = t && t.defaultProps,
      a = arguments.length - 3;
    if ((e || 0 === a || (e = { children: void 0 }), 1 === a)) e.children = s;
    else if (a > 1) {
      for (var o = Array(a), h = 0; h < a; h++) o[h] = arguments[h + 3];
      e.children = o;
    }
    if (e && n) for (var l in n) void 0 === e[l] && (e[l] = n[l]);
    else e || (e = n || {});
    return {
      $$typeof: REACT_ELEMENT_TYPE,
      type: t,
      key: void 0 === i ? null : '' + i,
      ref: null,
      props: e,
      _owner: null,
    };
  }
  function ownKeys(t, e) {
    var i = Object.keys(t);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(t);
      e &&
        (s = s.filter(function (e) {
          return Object.getOwnPropertyDescriptor(t, e).enumerable;
        })),
        i.push.apply(i, s);
    }
    return i;
  }
  function _objectSpread2(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = null != arguments[e] ? arguments[e] : {};
      e % 2
        ? ownKeys(Object(i), !0).forEach(function (e) {
            _defineProperty(t, e, i[e]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
        : ownKeys(Object(i)).forEach(function (e) {
            Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e));
          });
    }
    return t;
  }
  function _typeof(t) {
    return (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
              ? 'symbol'
              : typeof t;
          })(t);
  }
  function _wrapRegExp() {
    _wrapRegExp = function (t, e) {
      return new i(t, void 0, e);
    };
    var t = RegExp.prototype,
      e = new WeakMap();
    function i(t, s, n) {
      var a = RegExp(t, s);
      return e.set(a, n || e.get(t)), _setPrototypeOf(a, i.prototype);
    }
    function s(t, i) {
      var s = e.get(i);
      return Object.keys(s).reduce(function (e, i) {
        return (e[i] = t[s[i]]), e;
      }, Object.create(null));
    }
    return (
      _inherits(i, RegExp),
      (i.prototype.exec = function (e) {
        var i = t.exec.call(this, e);
        return i && (i.groups = s(i, this)), i;
      }),
      (i.prototype[Symbol.replace] = function (i, n) {
        if ('string' == typeof n) {
          var a = e.get(this);
          return t[Symbol.replace].call(
            this,
            i,
            n.replace(/\$<([^>]+)>/g, function (t, e) {
              return '$' + a[e];
            }),
          );
        }
        if ('function' == typeof n) {
          var o = this;
          return t[Symbol.replace].call(this, i, function () {
            var t = arguments;
            return 'object' != typeof t[t.length - 1] && (t = [].slice.call(t)).push(s(t, o)), n.apply(this, t);
          });
        }
        return t[Symbol.replace].call(this, i, n);
      }),
      _wrapRegExp.apply(this, arguments)
    );
  }
  function _AwaitValue(t) {
    this.wrapped = t;
  }
  function _AsyncGenerator(t) {
    var e, i;
    function s(e, i) {
      try {
        var a = t[e](i),
          o = a.value,
          h = o instanceof _AwaitValue;
        Promise.resolve(h ? o.wrapped : o).then(
          function (t) {
            h ? s('return' === e ? 'return' : 'next', t) : n(a.done ? 'return' : 'normal', t);
          },
          function (t) {
            s('throw', t);
          },
        );
      } catch (l) {
        n('throw', l);
      }
    }
    function n(t, n) {
      switch (t) {
        case 'return':
          e.resolve({ value: n, done: !0 });
          break;
        case 'throw':
          e.reject(n);
          break;
        default:
          e.resolve({ value: n, done: !1 });
      }
      (e = e.next) ? s(e.key, e.arg) : (i = null);
    }
    (this._invoke = function (t, n) {
      return new Promise(function (a, o) {
        var h = { key: t, arg: n, resolve: a, reject: o, next: null };
        i ? (i = i.next = h) : ((e = i = h), s(t, n));
      });
    }),
      'function' != typeof t.return && (this.return = void 0);
  }
  function _wrapAsyncGenerator(t) {
    return function () {
      return new _AsyncGenerator(t.apply(this, arguments));
    };
  }
  function _awaitAsyncGenerator(t) {
    return new _AwaitValue(t);
  }
  function _asyncGeneratorDelegate(t, e) {
    var i = {},
      s = !1;
    function n(i, n) {
      return (
        (s = !0),
        {
          done: !1,
          value: e(
            (n = new Promise(function (e) {
              e(t[i](n));
            })),
          ),
        }
      );
    }
    return (
      (i[('undefined' != typeof Symbol && Symbol.iterator) || '@@iterator'] = function () {
        return this;
      }),
      (i.next = function (t) {
        return s ? ((s = !1), t) : n('next', t);
      }),
      'function' == typeof t.throw &&
        (i.throw = function (t) {
          if (s) throw ((s = !1), t);
          return n('throw', t);
        }),
      'function' == typeof t.return &&
        (i.return = function (t) {
          return s ? ((s = !1), t) : n('return', t);
        }),
      i
    );
  }
  function asyncGeneratorStep(t, e, i, s, n, a, o) {
    try {
      var h = t[a](o),
        l = h.value;
    } catch (p) {
      return void i(p);
    }
    h.done ? e(l) : Promise.resolve(l).then(s, n);
  }
  function _asyncToGenerator(t) {
    return function () {
      var e = this,
        i = arguments;
      return new Promise(function (s, n) {
        var a = t.apply(e, i);
        function o(t) {
          asyncGeneratorStep(a, s, n, o, h, 'next', t);
        }
        function h(t) {
          asyncGeneratorStep(a, s, n, o, h, 'throw', t);
        }
        o(void 0);
      });
    };
  }
  function _classCallCheck(t, e) {
    if (!(t instanceof e)) throw TypeError('Cannot call a class as a function');
  }
  function _defineProperties(t, e) {
    for (var i = 0; i < e.length; i++) {
      var s = e[i];
      (s.enumerable = s.enumerable || !1),
        (s.configurable = !0),
        'value' in s && (s.writable = !0),
        Object.defineProperty(t, s.key, s);
    }
  }
  function _createClass(t, e, i) {
    return (
      e && _defineProperties(t.prototype, e),
      i && _defineProperties(t, i),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      t
    );
  }
  function _defineEnumerableProperties(t, e) {
    for (var i in e)
      ((a = e[i]).configurable = a.enumerable = !0), 'value' in a && (a.writable = !0), Object.defineProperty(t, i, a);
    if (Object.getOwnPropertySymbols)
      for (var s = Object.getOwnPropertySymbols(e), n = 0; n < s.length; n++) {
        var a,
          o = s[n];
        ((a = e[o]).configurable = a.enumerable = !0),
          'value' in a && (a.writable = !0),
          Object.defineProperty(t, o, a);
      }
    return t;
  }
  function _defaults(t, e) {
    for (var i = Object.getOwnPropertyNames(e), s = 0; s < i.length; s++) {
      var n = i[s],
        a = Object.getOwnPropertyDescriptor(e, n);
      a && a.configurable && void 0 === t[n] && Object.defineProperty(t, n, a);
    }
    return t;
  }
  function _defineProperty(t, e, i) {
    return (
      e in t ? Object.defineProperty(t, e, { value: i, enumerable: !0, configurable: !0, writable: !0 }) : (t[e] = i), t
    );
  }
  function _extends() {
    return (_extends =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var i = arguments[e];
          for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (t[s] = i[s]);
        }
        return t;
      }).apply(this, arguments);
  }
  function _objectSpread(t) {
    for (var e = 1; e < arguments.length; e++) {
      var i = null != arguments[e] ? Object(arguments[e]) : {},
        s = Object.keys(i);
      'function' == typeof Object.getOwnPropertySymbols &&
        s.push.apply(
          s,
          Object.getOwnPropertySymbols(i).filter(function (t) {
            return Object.getOwnPropertyDescriptor(i, t).enumerable;
          }),
        ),
        s.forEach(function (e) {
          _defineProperty(t, e, i[e]);
        });
    }
    return t;
  }
  function _inherits(t, e) {
    if ('function' != typeof e && null !== e) throw TypeError('Super expression must either be null or a function');
    (t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } })),
      Object.defineProperty(t, 'prototype', { writable: !1 }),
      e && _setPrototypeOf(t, e);
  }
  function _inheritsLoose(t, e) {
    (t.prototype = Object.create(e.prototype)), (t.prototype.constructor = t), _setPrototypeOf(t, e);
  }
  function _getPrototypeOf(t) {
    return (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function _setPrototypeOf(t, e) {
    return (_setPrototypeOf =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function _isNativeReflectConstruct() {
    if ('undefined' == typeof Reflect || !Reflect.construct || Reflect.construct.sham) return !1;
    if ('function' == typeof Proxy) return !0;
    try {
      return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
    } catch (t) {
      return !1;
    }
  }
  function _construct(t, e, i) {
    return (_construct = _isNativeReflectConstruct()
      ? Reflect.construct
      : function (t, e, i) {
          var s = [null];
          s.push.apply(s, e);
          var n = new (Function.bind.apply(t, s))();
          return i && _setPrototypeOf(n, i.prototype), n;
        }).apply(null, arguments);
  }
  function _isNativeFunction(t) {
    return -1 !== Function.toString.call(t).indexOf('[native code]');
  }
  function _wrapNativeSuper(t) {
    var e = 'function' == typeof Map ? new Map() : void 0;
    return (_wrapNativeSuper = function (t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ('function' != typeof t) throw TypeError('Super expression must either be null or a function');
      if (void 0 !== e) {
        if (e.has(t)) return e.get(t);
        e.set(t, i);
      }
      function i() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return (
        (i.prototype = Object.create(t.prototype, {
          constructor: { value: i, enumerable: !1, writable: !0, configurable: !0 },
        })),
        _setPrototypeOf(i, t)
      );
    })(t);
  }
  function _instanceof(t, e) {
    return null != e && 'undefined' != typeof Symbol && e[Symbol.hasInstance]
      ? !!e[Symbol.hasInstance](t)
      : t instanceof e;
  }
  function _interopRequireDefault(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function _getRequireWildcardCache(t) {
    if ('function' != typeof WeakMap) return null;
    var e = new WeakMap(),
      i = new WeakMap();
    return (_getRequireWildcardCache = function (t) {
      return t ? i : e;
    })(t);
  }
  function _interopRequireWildcard(t, e) {
    if (!e && t && t.__esModule) return t;
    if (null === t || ('object' != typeof t && 'function' != typeof t)) return { default: t };
    var i = _getRequireWildcardCache(e);
    if (i && i.has(t)) return i.get(t);
    var s = {},
      n = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var a in t)
      if ('default' !== a && Object.prototype.hasOwnProperty.call(t, a)) {
        var o = n ? Object.getOwnPropertyDescriptor(t, a) : null;
        o && (o.get || o.set) ? Object.defineProperty(s, a, o) : (s[a] = t[a]);
      }
    return (s.default = t), i && i.set(t, s), s;
  }
  function _newArrowCheck(t, e) {
    if (t !== e) throw TypeError('Cannot instantiate an arrow function');
  }
  function _objectDestructuringEmpty(t) {
    if (null == t) throw TypeError('Cannot destructure undefined');
  }
  function _objectWithoutPropertiesLoose(t, e) {
    if (null == t) return {};
    var i,
      s,
      n = {},
      a = Object.keys(t);
    for (s = 0; s < a.length; s++) (i = a[s]), e.indexOf(i) >= 0 || (n[i] = t[i]);
    return n;
  }
  function _objectWithoutProperties(t, e) {
    if (null == t) return {};
    var i,
      s,
      n = _objectWithoutPropertiesLoose(t, e);
    if (Object.getOwnPropertySymbols) {
      var a = Object.getOwnPropertySymbols(t);
      for (s = 0; s < a.length; s++)
        (i = a[s]), e.indexOf(i) >= 0 || (Object.prototype.propertyIsEnumerable.call(t, i) && (n[i] = t[i]));
    }
    return n;
  }
  function _assertThisInitialized(t) {
    if (void 0 === t) throw ReferenceError("this hasn't been initialised - super() hasn't been called");
    return t;
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ('object' == typeof e || 'function' == typeof e)) return e;
    if (void 0 !== e) throw TypeError('Derived constructors may only return object or undefined');
    return _assertThisInitialized(t);
  }
  function _createSuper(t) {
    var e = _isNativeReflectConstruct();
    return function () {
      var i,
        s = _getPrototypeOf(t);
      if (e) {
        var n = _getPrototypeOf(this).constructor;
        i = Reflect.construct(s, arguments, n);
      } else i = s.apply(this, arguments);
      return _possibleConstructorReturn(this, i);
    };
  }
  function _superPropBase(t, e) {
    for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = _getPrototypeOf(t)); );
    return t;
  }
  function _get() {
    return (_get =
      'undefined' != typeof Reflect && Reflect.get
        ? Reflect.get
        : function (t, e, i) {
            var s = _superPropBase(t, e);
            if (s) {
              var n = Object.getOwnPropertyDescriptor(s, e);
              return n.get ? n.get.call(arguments.length < 3 ? t : i) : n.value;
            }
          }).apply(this, arguments);
  }
  function set(t, e, i, s) {
    return (set =
      'undefined' != typeof Reflect && Reflect.set
        ? Reflect.set
        : function (t, e, i, s) {
            var n,
              a = _superPropBase(t, e);
            if (a) {
              if ((n = Object.getOwnPropertyDescriptor(a, e)).set) return n.set.call(s, i), !0;
              if (!n.writable) return !1;
            }
            if ((n = Object.getOwnPropertyDescriptor(s, e))) {
              if (!n.writable) return !1;
              (n.value = i), Object.defineProperty(s, e, n);
            } else _defineProperty(s, e, i);
            return !0;
          })(t, e, i, s);
  }
  function _set(t, e, i, s, n) {
    if (!set(t, e, i, s || t) && n) throw Error('failed to set property');
    return i;
  }
  function _taggedTemplateLiteral(t, e) {
    return e || (e = t.slice(0)), Object.freeze(Object.defineProperties(t, { raw: { value: Object.freeze(e) } }));
  }
  function _taggedTemplateLiteralLoose(t, e) {
    return e || (e = t.slice(0)), (t.raw = e), t;
  }
  function _readOnlyError(t) {
    throw TypeError('"' + t + '" is read-only');
  }
  function _writeOnlyError(t) {
    throw TypeError('"' + t + '" is write-only');
  }
  function _classNameTDZError(t) {
    throw Error('Class "' + t + '" cannot be referenced in computed property keys.');
  }
  function _temporalUndefined() {}
  function _tdz(t) {
    throw ReferenceError(t + ' is not defined - temporal dead zone');
  }
  function _temporalRef(t, e) {
    return t === _temporalUndefined ? _tdz(e) : t;
  }
  function _slicedToArray(t, e) {
    return _arrayWithHoles(t) || _iterableToArrayLimit(t, e) || _unsupportedIterableToArray(t, e) || _nonIterableRest();
  }
  function _slicedToArrayLoose(t, e) {
    return (
      _arrayWithHoles(t) || _iterableToArrayLimitLoose(t, e) || _unsupportedIterableToArray(t, e) || _nonIterableRest()
    );
  }
  function _toArray(t) {
    return _arrayWithHoles(t) || _iterableToArray(t) || _unsupportedIterableToArray(t) || _nonIterableRest();
  }
  function _toConsumableArray(t) {
    return _arrayWithoutHoles(t) || _iterableToArray(t) || _unsupportedIterableToArray(t) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(t) {
    if (Array.isArray(t)) return _arrayLikeToArray(t);
  }
  function _arrayWithHoles(t) {
    if (Array.isArray(t)) return t;
  }
  function _maybeArrayLike(t, e, i) {
    if (e && !Array.isArray(e) && 'number' == typeof e.length) {
      var s = e.length;
      return _arrayLikeToArray(e, void 0 !== i && i < s ? i : s);
    }
    return t(e, i);
  }
  function _iterableToArray(t) {
    if (('undefined' != typeof Symbol && null != t[Symbol.iterator]) || null != t['@@iterator']) return Array.from(t);
  }
  function _iterableToArrayLimit(t, e) {
    var i = null == t ? null : ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
    if (null != i) {
      var s,
        n,
        a = [],
        o = !0,
        h = !1;
      try {
        for (i = i.call(t); !(o = (s = i.next()).done) && (a.push(s.value), !e || a.length !== e); o = !0);
      } catch (l) {
        (h = !0), (n = l);
      } finally {
        try {
          o || null == i.return || i.return();
        } finally {
          if (h) throw n;
        }
      }
      return a;
    }
  }
  function _iterableToArrayLimitLoose(t, e) {
    var i = t && (('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator']);
    if (null != i) {
      var s = [];
      for (i = i.call(t), _step; !(_step = i.next()).done && (s.push(_step.value), !e || s.length !== e); );
      return s;
    }
  }
  function _unsupportedIterableToArray(t, e) {
    if (t) {
      if ('string' == typeof t) return _arrayLikeToArray(t, e);
      var i = Object.prototype.toString.call(t).slice(8, -1);
      return (
        'Object' === i && t.constructor && (i = t.constructor.name),
        'Map' === i || 'Set' === i
          ? Array.from(t)
          : 'Arguments' === i || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
          ? _arrayLikeToArray(t, e)
          : void 0
      );
    }
  }
  function _arrayLikeToArray(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var i = 0, s = Array(e); i < e; i++) s[i] = t[i];
    return s;
  }
  function _nonIterableSpread() {
    throw TypeError(
      'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  function _nonIterableRest() {
    throw TypeError(
      'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  function _createForOfIteratorHelper(t, e) {
    var i = ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
    if (!i) {
      if (Array.isArray(t) || (i = _unsupportedIterableToArray(t)) || (e && t && 'number' == typeof t.length)) {
        i && (t = i);
        var s = 0,
          n = function () {};
        return {
          s: n,
          n: function () {
            return s >= t.length ? { done: !0 } : { done: !1, value: t[s++] };
          },
          e: function (t) {
            throw t;
          },
          f: n,
        };
      }
      throw TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
      );
    }
    var a,
      o = !0,
      h = !1;
    return {
      s: function () {
        i = i.call(t);
      },
      n: function () {
        var t = i.next();
        return (o = t.done), t;
      },
      e: function (t) {
        (h = !0), (a = t);
      },
      f: function () {
        try {
          o || null == i.return || i.return();
        } finally {
          if (h) throw a;
        }
      },
    };
  }
  function _createForOfIteratorHelperLoose(t, e) {
    var i = ('undefined' != typeof Symbol && t[Symbol.iterator]) || t['@@iterator'];
    if (i) return (i = i.call(t)).next.bind(i);
    if (Array.isArray(t) || (i = _unsupportedIterableToArray(t)) || (e && t && 'number' == typeof t.length)) {
      i && (t = i);
      var s = 0;
      return function () {
        return s >= t.length ? { done: !0 } : { done: !1, value: t[s++] };
      };
    }
    throw TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
    );
  }
  function _skipFirstGeneratorNext(t) {
    return function () {
      var e = t.apply(this, arguments);
      return e.next(), e;
    };
  }
  function _toPrimitive(t, e) {
    if ('object' != typeof t || null === t) return t;
    var i = t[Symbol.toPrimitive];
    if (void 0 !== i) {
      var s = i.call(t, e || 'default');
      if ('object' != typeof s) return s;
      throw TypeError('@@toPrimitive must return a primitive value.');
    }
    return ('string' === e ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var e = _toPrimitive(t, 'string');
    return 'symbol' == typeof e ? e : String(e);
  }
  function _initializerWarningHelper(t, e) {
    throw Error(
      'Decorating class property failed. Please ensure that proposal-class-properties is enabled and runs after the decorators transform.',
    );
  }
  function _initializerDefineProperty(t, e, i, s) {
    i &&
      Object.defineProperty(t, e, {
        enumerable: i.enumerable,
        configurable: i.configurable,
        writable: i.writable,
        value: i.initializer ? i.initializer.call(s) : void 0,
      });
  }
  function _applyDecoratedDescriptor(t, e, i, s, n) {
    var a = {};
    return (
      Object.keys(s).forEach(function (t) {
        a[t] = s[t];
      }),
      (a.enumerable = !!a.enumerable),
      (a.configurable = !!a.configurable),
      ('value' in a || a.initializer) && (a.writable = !0),
      (a = i
        .slice()
        .reverse()
        .reduce(function (i, s) {
          return s(t, e, i) || i;
        }, a)),
      n &&
        void 0 !== a.initializer &&
        ((a.value = a.initializer ? a.initializer.call(n) : void 0), (a.initializer = void 0)),
      void 0 === a.initializer && (Object.defineProperty(t, e, a), (a = null)),
      a
    );
  }
  (_AsyncGenerator.prototype[('function' == typeof Symbol && Symbol.asyncIterator) || '@@asyncIterator'] = function () {
    return this;
  }),
    (_AsyncGenerator.prototype.next = function (t) {
      return this._invoke('next', t);
    }),
    (_AsyncGenerator.prototype.throw = function (t) {
      return this._invoke('throw', t);
    }),
    (_AsyncGenerator.prototype.return = function (t) {
      return this._invoke('return', t);
    });
  var id = 0;
  function _classPrivateFieldLooseKey(t) {
    return '__private_' + id++ + '_' + t;
  }
  function _classPrivateFieldLooseBase(t, e) {
    if (!Object.prototype.hasOwnProperty.call(t, e)) throw TypeError('attempted to use private field on non-instance');
    return t;
  }
  function _classPrivateFieldGet(t, e) {
    return _classApplyDescriptorGet(t, _classExtractFieldDescriptor(t, e, 'get'));
  }
  function _classPrivateFieldSet(t, e, i) {
    return _classApplyDescriptorSet(t, _classExtractFieldDescriptor(t, e, 'set'), i), i;
  }
  function _classPrivateFieldDestructureSet(t, e) {
    return _classApplyDescriptorDestructureSet(t, _classExtractFieldDescriptor(t, e, 'set'));
  }
  function _classExtractFieldDescriptor(t, e, i) {
    if (!e.has(t)) throw TypeError('attempted to ' + i + ' private field on non-instance');
    return e.get(t);
  }
  function _classStaticPrivateFieldSpecGet(t, e, i) {
    return (
      _classCheckPrivateStaticAccess(t, e),
      _classCheckPrivateStaticFieldDescriptor(i, 'get'),
      _classApplyDescriptorGet(t, i)
    );
  }
  function _classStaticPrivateFieldSpecSet(t, e, i, s) {
    return (
      _classCheckPrivateStaticAccess(t, e),
      _classCheckPrivateStaticFieldDescriptor(i, 'set'),
      _classApplyDescriptorSet(t, i, s),
      s
    );
  }
  function _classStaticPrivateMethodGet(t, e, i) {
    return _classCheckPrivateStaticAccess(t, e), i;
  }
  function _classStaticPrivateMethodSet() {
    throw TypeError('attempted to set read only static private field');
  }
  function _classApplyDescriptorGet(t, e) {
    return e.get ? e.get.call(t) : e.value;
  }
  function _classApplyDescriptorSet(t, e, i) {
    if (e.set) e.set.call(t, i);
    else {
      if (!e.writable) throw TypeError('attempted to set read only private field');
      e.value = i;
    }
  }
  function _classApplyDescriptorDestructureSet(t, e) {
    if (e.set)
      return (
        '__destrObj' in e ||
          (e.__destrObj = {
            set value(r) {
              e.set.call(t, r);
            },
          }),
        e.__destrObj
      );
    if (!e.writable) throw TypeError('attempted to set read only private field');
    return e;
  }
  function _classStaticPrivateFieldDestructureSet(t, e, i) {
    return (
      _classCheckPrivateStaticAccess(t, e),
      _classCheckPrivateStaticFieldDescriptor(i, 'set'),
      _classApplyDescriptorDestructureSet(t, i)
    );
  }
  function _classCheckPrivateStaticAccess(t, e) {
    if (t !== e) throw TypeError('Private static access of wrong provenance');
  }
  function _classCheckPrivateStaticFieldDescriptor(t, e) {
    if (void 0 === t) throw TypeError('attempted to ' + e + ' private static field before its declaration');
  }
  function _decorate(t, e, i, s) {
    var n = _getDecoratorsApi();
    if (s) for (var a = 0; a < s.length; a++) n = s[a](n);
    var o = e(function (t) {
        n.initializeInstanceElements(t, h.elements);
      }, i),
      h = n.decorateClass(_coalesceClassElements(o.d.map(_createElementDescriptor)), t);
    return n.initializeClassElements(o.F, h.elements), n.runClassFinishers(o.F, h.finishers);
  }
  function _getDecoratorsApi() {
    _getDecoratorsApi = function () {
      return t;
    };
    var t = {
      elementsDefinitionOrder: [['method'], ['field']],
      initializeInstanceElements: function (t, e) {
        ['method', 'field'].forEach(function (i) {
          e.forEach(function (e) {
            e.kind === i && 'own' === e.placement && this.defineClassElement(t, e);
          }, this);
        }, this);
      },
      initializeClassElements: function (t, e) {
        var i = t.prototype;
        ['method', 'field'].forEach(function (s) {
          e.forEach(function (e) {
            var n = e.placement;
            if (e.kind === s && ('static' === n || 'prototype' === n)) {
              var a = 'static' === n ? t : i;
              this.defineClassElement(a, e);
            }
          }, this);
        }, this);
      },
      defineClassElement: function (t, e) {
        var i = e.descriptor;
        if ('field' === e.kind) {
          var s = e.initializer;
          i = {
            enumerable: i.enumerable,
            writable: i.writable,
            configurable: i.configurable,
            value: void 0 === s ? void 0 : s.call(t),
          };
        }
        Object.defineProperty(t, e.key, i);
      },
      decorateClass: function (t, e) {
        var i = [],
          s = [],
          n = { static: [], prototype: [], own: [] };
        if (
          (t.forEach(function (t) {
            this.addElementPlacement(t, n);
          }, this),
          t.forEach(function (t) {
            if (!_hasDecorators(t)) return i.push(t);
            var e = this.decorateElement(t, n);
            i.push(e.element), i.push.apply(i, e.extras), s.push.apply(s, e.finishers);
          }, this),
          !e)
        )
          return { elements: i, finishers: s };
        var a = this.decorateConstructor(i, e);
        return s.push.apply(s, a.finishers), (a.finishers = s), a;
      },
      addElementPlacement: function (t, e, i) {
        var s = e[t.placement];
        if (!i && -1 !== s.indexOf(t.key)) throw TypeError('Duplicated element (' + t.key + ')');
        s.push(t.key);
      },
      decorateElement: function (t, e) {
        for (var i = [], s = [], n = t.decorators, a = n.length - 1; a >= 0; a--) {
          var o = e[t.placement];
          o.splice(o.indexOf(t.key), 1);
          var h = this.fromElementDescriptor(t),
            l = this.toElementFinisherExtras((0, n[a])(h) || h);
          (t = l.element), this.addElementPlacement(t, e), l.finisher && s.push(l.finisher);
          var p = l.extras;
          if (p) {
            for (var f = 0; f < p.length; f++) this.addElementPlacement(p[f], e);
            i.push.apply(i, p);
          }
        }
        return { element: t, finishers: s, extras: i };
      },
      decorateConstructor: function (t, e) {
        for (var i = [], s = e.length - 1; s >= 0; s--) {
          var n = this.fromClassDescriptor(t),
            a = this.toClassDescriptor((0, e[s])(n) || n);
          if ((void 0 !== a.finisher && i.push(a.finisher), void 0 !== a.elements)) {
            t = a.elements;
            for (var o = 0; o < t.length - 1; o++)
              for (var h = o + 1; h < t.length; h++)
                if (t[o].key === t[h].key && t[o].placement === t[h].placement)
                  throw TypeError('Duplicated element (' + t[o].key + ')');
          }
        }
        return { elements: t, finishers: i };
      },
      fromElementDescriptor: function (t) {
        var e = { kind: t.kind, key: t.key, placement: t.placement, descriptor: t.descriptor };
        return (
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Descriptor', configurable: !0 }),
          'field' === t.kind && (e.initializer = t.initializer),
          e
        );
      },
      toElementDescriptors: function (t) {
        if (void 0 !== t)
          return _toArray(t).map(function (t) {
            var e = this.toElementDescriptor(t);
            return (
              this.disallowProperty(t, 'finisher', 'An element descriptor'),
              this.disallowProperty(t, 'extras', 'An element descriptor'),
              e
            );
          }, this);
      },
      toElementDescriptor: function (t) {
        var e = String(t.kind);
        if ('method' !== e && 'field' !== e)
          throw TypeError(
            'An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "' +
              e +
              '"',
          );
        var i = _toPropertyKey(t.key),
          s = String(t.placement);
        if ('static' !== s && 'prototype' !== s && 'own' !== s)
          throw TypeError(
            'An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "' +
              s +
              '"',
          );
        var n = t.descriptor;
        this.disallowProperty(t, 'elements', 'An element descriptor');
        var a = { kind: e, key: i, placement: s, descriptor: Object.assign({}, n) };
        return (
          'field' !== e
            ? this.disallowProperty(t, 'initializer', 'A method descriptor')
            : (this.disallowProperty(n, 'get', 'The property descriptor of a field descriptor'),
              this.disallowProperty(n, 'set', 'The property descriptor of a field descriptor'),
              this.disallowProperty(n, 'value', 'The property descriptor of a field descriptor'),
              (a.initializer = t.initializer)),
          a
        );
      },
      toElementFinisherExtras: function (t) {
        return {
          element: this.toElementDescriptor(t),
          finisher: _optionalCallableProperty(t, 'finisher'),
          extras: this.toElementDescriptors(t.extras),
        };
      },
      fromClassDescriptor: function (t) {
        var e = { kind: 'class', elements: t.map(this.fromElementDescriptor, this) };
        return Object.defineProperty(e, Symbol.toStringTag, { value: 'Descriptor', configurable: !0 }), e;
      },
      toClassDescriptor: function (t) {
        var e = String(t.kind);
        if ('class' !== e)
          throw TypeError(
            'A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "' +
              e +
              '"',
          );
        this.disallowProperty(t, 'key', 'A class descriptor'),
          this.disallowProperty(t, 'placement', 'A class descriptor'),
          this.disallowProperty(t, 'descriptor', 'A class descriptor'),
          this.disallowProperty(t, 'initializer', 'A class descriptor'),
          this.disallowProperty(t, 'extras', 'A class descriptor');
        var i = _optionalCallableProperty(t, 'finisher');
        return { elements: this.toElementDescriptors(t.elements), finisher: i };
      },
      runClassFinishers: function (t, e) {
        for (var i = 0; i < e.length; i++) {
          var s = (0, e[i])(t);
          if (void 0 !== s) {
            if ('function' != typeof s) throw TypeError('Finishers must return a constructor.');
            t = s;
          }
        }
        return t;
      },
      disallowProperty: function (t, e, i) {
        if (void 0 !== t[e]) throw TypeError(i + " can't have a ." + e + ' property.');
      },
    };
    return t;
  }
  function _createElementDescriptor(t) {
    var e,
      i = _toPropertyKey(t.key);
    'method' === t.kind
      ? (e = { value: t.value, writable: !0, configurable: !0, enumerable: !1 })
      : 'get' === t.kind
      ? (e = { get: t.value, configurable: !0, enumerable: !1 })
      : 'set' === t.kind
      ? (e = { set: t.value, configurable: !0, enumerable: !1 })
      : 'field' === t.kind && (e = { configurable: !0, writable: !0, enumerable: !0 });
    var s = {
      kind: 'field' === t.kind ? 'field' : 'method',
      key: i,
      placement: t.static ? 'static' : 'field' === t.kind ? 'own' : 'prototype',
      descriptor: e,
    };
    return t.decorators && (s.decorators = t.decorators), 'field' === t.kind && (s.initializer = t.value), s;
  }
  function _coalesceGetterSetter(t, e) {
    void 0 !== t.descriptor.get ? (e.descriptor.get = t.descriptor.get) : (e.descriptor.set = t.descriptor.set);
  }
  function _coalesceClassElements(t) {
    for (
      var e = [],
        i = function (t) {
          return 'method' === t.kind && t.key === a.key && t.placement === a.placement;
        },
        s = 0;
      s < t.length;
      s++
    ) {
      var n,
        a = t[s];
      if ('method' === a.kind && (n = e.find(i))) {
        if (_isDataDescriptor(a.descriptor) || _isDataDescriptor(n.descriptor)) {
          if (_hasDecorators(a) || _hasDecorators(n))
            throw ReferenceError('Duplicated methods (' + a.key + ") can't be decorated.");
          n.descriptor = a.descriptor;
        } else {
          if (_hasDecorators(a)) {
            if (_hasDecorators(n))
              throw ReferenceError(
                "Decorators can't be placed on different accessors with for the same property (" + a.key + ').',
              );
            n.decorators = a.decorators;
          }
          _coalesceGetterSetter(a, n);
        }
      } else e.push(a);
    }
    return e;
  }
  function _hasDecorators(t) {
    return t.decorators && t.decorators.length;
  }
  function _isDataDescriptor(t) {
    return void 0 !== t && !(void 0 === t.value && void 0 === t.writable);
  }
  function _optionalCallableProperty(t, e) {
    var i = t[e];
    if (void 0 !== i && 'function' != typeof i) throw TypeError("Expected '" + e + "' to be a function");
    return i;
  }
  function _classPrivateMethodGet(t, e, i) {
    if (!e.has(t)) throw TypeError('attempted to get private field on non-instance');
    return i;
  }
  function _checkPrivateRedeclaration(t, e) {
    if (e.has(t)) throw TypeError('Cannot initialize the same private elements twice on an object');
  }
  function _classPrivateFieldInitSpec(t, e, i) {
    _checkPrivateRedeclaration(t, e), e.set(t, i);
  }
  function _classPrivateMethodInitSpec(t, e) {
    _checkPrivateRedeclaration(t, e), e.add(t);
  }
  function _classPrivateMethodSet() {
    throw TypeError('attempted to reassign private method');
  }
  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */ var _extendStatics = function (
    t,
    e,
  ) {
    return (_extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (t, e) {
          t.__proto__ = e;
        }) ||
      function (t, e) {
        for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
      })(t, e);
  };
  function __extends(t, e) {
    if ('function' != typeof e && null !== e)
      throw TypeError('Class extends value ' + String(e) + ' is not a constructor or null');
    function i() {
      this.constructor = t;
    }
    _extendStatics(t, e), (t.prototype = null === e ? Object.create(e) : ((i.prototype = e.prototype), new i()));
  }
  var _assign = function () {
    return (_assign =
      Object.assign ||
      function (t) {
        for (var e, i = 1, s = arguments.length; i < s; i++)
          for (var n in (e = arguments[i])) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t;
      }).apply(this, arguments);
  };
  function __rest(t, e) {
    var i = {};
    for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && 0 > e.indexOf(s) && (i[s] = t[s]);
    if (null != t && 'function' == typeof Object.getOwnPropertySymbols) {
      var n = 0;
      for (s = Object.getOwnPropertySymbols(t); n < s.length; n++)
        0 > e.indexOf(s[n]) && Object.prototype.propertyIsEnumerable.call(t, s[n]) && (i[s[n]] = t[s[n]]);
    }
    return i;
  }
  function __decorate(t, e, i, s) {
    var n,
      a = arguments.length,
      o = a < 3 ? e : null === s ? (s = Object.getOwnPropertyDescriptor(e, i)) : s;
    if ('object' == typeof Reflect && 'function' == typeof Reflect.decorate) o = Reflect.decorate(t, e, i, s);
    else for (var h = t.length - 1; h >= 0; h--) (n = t[h]) && (o = (a < 3 ? n(o) : a > 3 ? n(e, i, o) : n(e, i)) || o);
    return a > 3 && o && Object.defineProperty(e, i, o), o;
  }
  function __param(t, e) {
    return function (i, s) {
      e(i, s, t);
    };
  }
  function __metadata(t, e) {
    if ('object' == typeof Reflect && 'function' == typeof Reflect.metadata) return Reflect.metadata(t, e);
  }
  function __awaiter(t, e, i, s) {
    return new (i || (i = Promise))(function (n, a) {
      function o(t) {
        try {
          l(s.next(t));
        } catch (e) {
          a(e);
        }
      }
      function h(t) {
        try {
          l(s.throw(t));
        } catch (e) {
          a(e);
        }
      }
      function l(t) {
        var e;
        t.done
          ? n(t.value)
          : ((e = t.value) instanceof i
              ? e
              : new i(function (t) {
                  t(e);
                })
            ).then(o, h);
      }
      l((s = s.apply(t, e || [])).next());
    });
  }
  function __generator(t, e) {
    var i,
      s,
      n,
      a,
      o = {
        label: 0,
        sent: function () {
          if (1 & n[0]) throw n[1];
          return n[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (a = { next: h(0), throw: h(1), return: h(2) }),
      'function' == typeof Symbol &&
        (a[Symbol.iterator] = function () {
          return this;
        }),
      a
    );
    function h(a) {
      return function (h) {
        return (function (a) {
          if (i) throw TypeError('Generator is already executing.');
          for (; o; )
            try {
              if (
                ((i = 1),
                s &&
                  (n = 2 & a[0] ? s.return : a[0] ? s.throw || ((n = s.return) && n.call(s), 0) : s.next) &&
                  !(n = n.call(s, a[1])).done)
              )
                return n;
              switch (((s = 0), n && (a = [2 & a[0], n.value]), a[0])) {
                case 0:
                case 1:
                  n = a;
                  break;
                case 4:
                  return o.label++, { value: a[1], done: !1 };
                case 5:
                  o.label++, (s = a[1]), (a = [0]);
                  continue;
                case 7:
                  (a = o.ops.pop()), o.trys.pop();
                  continue;
                default:
                  if (!(n = (n = o.trys).length > 0 && n[n.length - 1]) && (6 === a[0] || 2 === a[0])) {
                    o = 0;
                    continue;
                  }
                  if (3 === a[0] && (!n || (a[1] > n[0] && a[1] < n[3]))) {
                    o.label = a[1];
                    break;
                  }
                  if (6 === a[0] && o.label < n[1]) {
                    (o.label = n[1]), (n = a);
                    break;
                  }
                  if (n && o.label < n[2]) {
                    (o.label = n[2]), o.ops.push(a);
                    break;
                  }
                  n[2] && o.ops.pop(), o.trys.pop();
                  continue;
              }
              a = e.call(t, o);
            } catch (h) {
              (a = [6, h]), (s = 0);
            } finally {
              i = n = 0;
            }
          if (5 & a[0]) throw a[1];
          return { value: a[0] ? a[1] : void 0, done: !0 };
        })([a, h]);
      };
    }
  }
  var __createBinding = Object.create
    ? function (t, e, i, s) {
        void 0 === s && (s = i),
          Object.defineProperty(t, s, {
            enumerable: !0,
            get: function () {
              return e[i];
            },
          });
      }
    : function (t, e, i, s) {
        void 0 === s && (s = i), (t[s] = e[i]);
      };
  function __exportStar(t, e) {
    for (var i in t) 'default' === i || Object.prototype.hasOwnProperty.call(e, i) || __createBinding(e, t, i);
  }
  function __values(t) {
    var e = 'function' == typeof Symbol && Symbol.iterator,
      i = e && t[e],
      s = 0;
    if (i) return i.call(t);
    if (t && 'number' == typeof t.length)
      return {
        next: function () {
          return t && s >= t.length && (t = void 0), { value: t && t[s++], done: !t };
        },
      };
    throw TypeError(e ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
  }
  function __read(t, e) {
    var i = 'function' == typeof Symbol && t[Symbol.iterator];
    if (!i) return t;
    var s,
      n,
      a = i.call(t),
      o = [];
    try {
      for (; (void 0 === e || e-- > 0) && !(s = a.next()).done; ) o.push(s.value);
    } catch (h) {
      n = { error: h };
    } finally {
      try {
        s && !s.done && (i = a.return) && i.call(a);
      } finally {
        if (n) throw n.error;
      }
    }
    return o;
  }
  function __spread() {
    for (var t = [], e = 0; e < arguments.length; e++) t = t.concat(__read(arguments[e]));
    return t;
  }
  function __spreadArrays() {
    for (var t = 0, e = 0, i = arguments.length; e < i; e++) t += arguments[e].length;
    var s = Array(t),
      n = 0;
    for (e = 0; e < i; e++) for (var a = arguments[e], o = 0, h = a.length; o < h; o++, n++) s[n] = a[o];
    return s;
  }
  function __spreadArray(t, e, i) {
    if (i || 2 === arguments.length)
      for (var s, n = 0, a = e.length; n < a; n++)
        (!s && n in e) || (s || (s = Array.prototype.slice.call(e, 0, n)), (s[n] = e[n]));
    return t.concat(s || Array.prototype.slice.call(e));
  }
  function __await(t) {
    return this instanceof __await ? ((this.v = t), this) : new __await(t);
  }
  function __asyncGenerator(t, e, i) {
    if (!Symbol.asyncIterator) throw TypeError('Symbol.asyncIterator is not defined.');
    var s,
      n = i.apply(t, e || []),
      a = [];
    return (
      (s = {}),
      o('next'),
      o('throw'),
      o('return'),
      (s[Symbol.asyncIterator] = function () {
        return this;
      }),
      s
    );
    function o(t) {
      n[t] &&
        (s[t] = function (e) {
          return new Promise(function (i, s) {
            a.push([t, e, i, s]) > 1 || h(t, e);
          });
        });
    }
    function h(t, e) {
      try {
        var i;
        (i = n[t](e)).value instanceof __await ? Promise.resolve(i.value.v).then(l, p) : f(a[0][2], i);
      } catch (s) {
        f(a[0][3], s);
      }
    }
    function l(t) {
      h('next', t);
    }
    function p(t) {
      h('throw', t);
    }
    function f(t, e) {
      t(e), a.shift(), a.length && h(a[0][0], a[0][1]);
    }
  }
  function __asyncDelegator(t) {
    var e, i;
    return (
      (e = {}),
      s('next'),
      s('throw', function (t) {
        throw t;
      }),
      s('return'),
      (e[Symbol.iterator] = function () {
        return this;
      }),
      e
    );
    function s(s, n) {
      e[s] = t[s]
        ? function (e) {
            return (i = !i) ? { value: __await(t[s](e)), done: 'return' === s } : n ? n(e) : e;
          }
        : n;
    }
  }
  function __asyncValues(t) {
    if (!Symbol.asyncIterator) throw TypeError('Symbol.asyncIterator is not defined.');
    var e,
      i = t[Symbol.asyncIterator];
    return i
      ? i.call(t)
      : ((t = __values(t)),
        (e = {}),
        s('next'),
        s('throw'),
        s('return'),
        (e[Symbol.asyncIterator] = function () {
          return this;
        }),
        e);
    function s(i) {
      e[i] =
        t[i] &&
        function (e) {
          return new Promise(function (s, n) {
            !(function (t, e, i, s) {
              Promise.resolve(s).then(function (e) {
                t({ value: e, done: i });
              }, e);
            })(s, n, (e = t[i](e)).done, e.value);
          });
        };
    }
  }
  function __makeTemplateObject(t, e) {
    return Object.defineProperty ? Object.defineProperty(t, 'raw', { value: e }) : (t.raw = e), t;
  }
  var __setModuleDefault = Object.create
    ? function (t, e) {
        Object.defineProperty(t, 'default', { enumerable: !0, value: e });
      }
    : function (t, e) {
        t.default = e;
      };
  function __importStar(t) {
    if (t && t.__esModule) return t;
    var e = {};
    if (null != t)
      for (var i in t) 'default' !== i && Object.prototype.hasOwnProperty.call(t, i) && __createBinding(e, t, i);
    return __setModuleDefault(e, t), e;
  }
  function __importDefault(t) {
    return t && t.__esModule ? t : { default: t };
  }
  function __classPrivateFieldGet(t, e, i, s) {
    if ('a' === i && !s) throw TypeError('Private accessor was defined without a getter');
    if ('function' == typeof e ? t !== e || !s : !e.has(t))
      throw TypeError('Cannot read private member from an object whose class did not declare it');
    return 'm' === i ? s : 'a' === i ? s.call(t) : s ? s.value : e.get(t);
  }
  function __classPrivateFieldSet(t, e, i, s, n) {
    if ('m' === s) throw TypeError('Private method is not writable');
    if ('a' === s && !n) throw TypeError('Private accessor was defined without a setter');
    if ('function' == typeof e ? t !== e || !n : !e.has(t))
      throw TypeError('Cannot write private member to an object whose class did not declare it');
    return 'a' === s ? n.call(t, i) : n ? (n.value = i) : e.set(t, i), i; /**
     * @license
     * Copyright 2019 Google LLC
     * SPDX-License-Identifier: BSD-3-Clause
     */
  }
  var t$3 =
      window.ShadowRoot &&
      (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
      'adoptedStyleSheets' in Document.prototype &&
      'replace' in CSSStyleSheet.prototype,
    e$8 = Symbol(),
    n$5 = new Map();
  class s$3 {
    constructor(t, e) {
      if (((this._$cssResult$ = !0), e !== e$8))
        throw Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
      this.cssText = t;
    }
    get styleSheet() {
      var t = n$5.get(this.cssText);
      return t$3 && void 0 === t && (n$5.set(this.cssText, (t = new CSSStyleSheet())), t.replaceSync(this.cssText)), t;
    }
    toString() {
      return this.cssText;
    }
  }
  var REACT_ELEMENT_TYPE,
    s$2,
    t$2,
    o$5 = (t) => new s$3('string' == typeof t ? t : t + '', e$8),
    r$3 = function (t) {
      for (var e = arguments.length, i = Array(e > 1 ? e - 1 : 0), s = 1; s < e; s++) i[s - 1] = arguments[s];
      var n =
        1 === t.length
          ? t[0]
          : i.reduce(
              (e, i, s) =>
                e +
                ((t) => {
                  if (!0 === t._$cssResult$) return t.cssText;
                  if ('number' == typeof t) return t;
                  throw Error(
                    "Value passed to 'css' function must be a 'css' function result: " +
                      t +
                      ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
                  );
                })(i) +
                t[s + 1],
              t[0],
            );
      return new s$3(n, e$8);
    },
    i$3 = (t, e) => {
      t$3
        ? (t.adoptedStyleSheets = e.map((t) => (t instanceof CSSStyleSheet ? t : t.styleSheet)))
        : e.forEach((e) => {
            var i = document.createElement('style'),
              s = window.litNonce;
            void 0 !== s && i.setAttribute('nonce', s), (i.textContent = e.cssText), t.appendChild(i);
          });
    },
    S$1 = t$3
      ? (t) => t
      : (t) =>
          t instanceof CSSStyleSheet
            ? ((t) => {
                var e = '';
                for (var i of t.cssRules) e += i.cssText;
                return o$5(e);
              })(t)
            : t,
    e$7 = window.trustedTypes,
    r$2 = e$7 ? e$7.emptyScript : '',
    h$2 = window.reactiveElementPolyfillSupport,
    o$4 = {
      toAttribute(t, e) {
        switch (e) {
          case Boolean:
            t = t ? r$2 : null;
            break;
          case Object:
          case Array:
            t = null == t ? t : JSON.stringify(t);
        }
        return t;
      },
      fromAttribute(t, e) {
        var i = t;
        switch (e) {
          case Boolean:
            i = null !== t;
            break;
          case Number:
            i = null === t ? null : Number(t);
            break;
          case Object:
          case Array:
            try {
              i = JSON.parse(t);
            } catch (s) {
              i = null;
            }
        }
        return i;
      },
    },
    n$4 = (t, e) => e !== t && (e == e || t == t),
    l$3 = { attribute: !0, type: String, converter: o$4, reflect: !1, hasChanged: n$4 };
  class a$1 extends HTMLElement {
    constructor() {
      super(),
        (this._$Et = new Map()),
        (this.isUpdatePending = !1),
        (this.hasUpdated = !1),
        (this._$Ei = null),
        this.o();
    }
    static addInitializer(t) {
      var e;
      (null !== (e = this.l) && void 0 !== e) || (this.l = []), this.l.push(t);
    }
    static get observedAttributes() {
      this.finalize();
      var t = [];
      return (
        this.elementProperties.forEach((e, i) => {
          var s = this._$Eh(i, e);
          void 0 !== s && (this._$Eu.set(s, i), t.push(s));
        }),
        t
      );
    }
    static createProperty(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : l$3;
      if (
        (e.state && (e.attribute = !1),
        this.finalize(),
        this.elementProperties.set(t, e),
        !e.noAccessor && !this.prototype.hasOwnProperty(t))
      ) {
        var i = 'symbol' == typeof t ? Symbol() : '__' + t,
          s = this.getPropertyDescriptor(t, i, e);
        void 0 !== s && Object.defineProperty(this.prototype, t, s);
      }
    }
    static getPropertyDescriptor(t, e, i) {
      return {
        get() {
          return this[e];
        },
        set(s) {
          var n = this[t];
          (this[e] = s), this.requestUpdate(t, n, i);
        },
        configurable: !0,
        enumerable: !0,
      };
    }
    static getPropertyOptions(t) {
      return this.elementProperties.get(t) || l$3;
    }
    static finalize() {
      if (this.hasOwnProperty('finalized')) return !1;
      this.finalized = !0;
      var t = Object.getPrototypeOf(this);
      if (
        (t.finalize(),
        (this.elementProperties = new Map(t.elementProperties)),
        (this._$Eu = new Map()),
        this.hasOwnProperty('properties'))
      ) {
        var e = this.properties,
          i = [...Object.getOwnPropertyNames(e), ...Object.getOwnPropertySymbols(e)];
        for (var s of i) this.createProperty(s, e[s]);
      }
      return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
    }
    static finalizeStyles(t) {
      var e = [];
      if (Array.isArray(t)) {
        var i = new Set(t.flat(1 / 0).reverse());
        for (var s of i) e.unshift(S$1(s));
      } else void 0 !== t && e.push(S$1(t));
      return e;
    }
    static _$Eh(t, e) {
      var i = e.attribute;
      return !1 === i ? void 0 : 'string' == typeof i ? i : 'string' == typeof t ? t.toLowerCase() : void 0;
    }
    o() {
      var t;
      (this._$Ep = new Promise((t) => (this.enableUpdating = t))),
        (this._$AL = new Map()),
        this._$Em(),
        this.requestUpdate(),
        null === (t = this.constructor.l) || void 0 === t || t.forEach((t) => t(this));
    }
    addController(t) {
      var e, i;
      (null !== (e = this._$Eg) && void 0 !== e ? e : (this._$Eg = [])).push(t),
        void 0 !== this.renderRoot && this.isConnected && (null === (i = t.hostConnected) || void 0 === i || i.call(t));
    }
    removeController(t) {
      var e;
      null === (e = this._$Eg) || void 0 === e || e.splice(this._$Eg.indexOf(t) >>> 0, 1);
    }
    _$Em() {
      this.constructor.elementProperties.forEach((t, e) => {
        this.hasOwnProperty(e) && (this._$Et.set(e, this[e]), delete this[e]);
      });
    }
    createRenderRoot() {
      var t,
        e = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
      return i$3(e, this.constructor.elementStyles), e;
    }
    connectedCallback() {
      var t;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
        this.enableUpdating(!0),
        null === (t = this._$Eg) ||
          void 0 === t ||
          t.forEach((t) => {
            var e;
            return null === (e = t.hostConnected) || void 0 === e ? void 0 : e.call(t);
          });
    }
    enableUpdating(t) {}
    disconnectedCallback() {
      var t;
      null === (t = this._$Eg) ||
        void 0 === t ||
        t.forEach((t) => {
          var e;
          return null === (e = t.hostDisconnected) || void 0 === e ? void 0 : e.call(t);
        });
    }
    attributeChangedCallback(t, e, i) {
      this._$AK(t, i);
    }
    _$ES(t, e) {
      var i,
        s,
        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : l$3,
        a = this.constructor._$Eh(t, n);
      if (void 0 !== a && !0 === n.reflect) {
        var o = (
          null !== (s = null === (i = n.converter) || void 0 === i ? void 0 : i.toAttribute) && void 0 !== s
            ? s
            : o$4.toAttribute
        )(e, n.type);
        (this._$Ei = t), null == o ? this.removeAttribute(a) : this.setAttribute(a, o), (this._$Ei = null);
      }
    }
    _$AK(t, e) {
      var i,
        s,
        n,
        a = this.constructor,
        o = a._$Eu.get(t);
      if (void 0 !== o && this._$Ei !== o) {
        var h = a.getPropertyOptions(o),
          l = h.converter,
          p =
            null !==
              (n =
                null !== (s = null === (i = l) || void 0 === i ? void 0 : i.fromAttribute) && void 0 !== s
                  ? s
                  : 'function' == typeof l
                  ? l
                  : null) && void 0 !== n
              ? n
              : o$4.fromAttribute;
        (this._$Ei = o), (this[o] = p(e, h.type)), (this._$Ei = null);
      }
    }
    requestUpdate(t, e, i) {
      var s = !0;
      void 0 !== t &&
        (((i = i || this.constructor.getPropertyOptions(t)).hasChanged || n$4)(this[t], e)
          ? (this._$AL.has(t) || this._$AL.set(t, e),
            !0 === i.reflect &&
              this._$Ei !== t &&
              (void 0 === this._$E_ && (this._$E_ = new Map()), this._$E_.set(t, i)))
          : (s = !1)),
        !this.isUpdatePending && s && (this._$Ep = this._$EC());
    }
    _$EC() {
      var t = this;
      return _asyncToGenerator(function* () {
        t.isUpdatePending = !0;
        try {
          yield t._$Ep;
        } catch (e) {
          Promise.reject(e);
        }
        var i = t.scheduleUpdate();
        return null != i && (yield i), !t.isUpdatePending;
      })();
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t;
      if (this.isUpdatePending) {
        this.hasUpdated, this._$Et && (this._$Et.forEach((t, e) => (this[e] = t)), (this._$Et = void 0));
        var e = !1,
          i = this._$AL;
        try {
          (e = this.shouldUpdate(i))
            ? (this.willUpdate(i),
              null === (t = this._$Eg) ||
                void 0 === t ||
                t.forEach((t) => {
                  var e;
                  return null === (e = t.hostUpdate) || void 0 === e ? void 0 : e.call(t);
                }),
              this.update(i))
            : this._$EU();
        } catch (s) {
          throw ((e = !1), this._$EU(), s);
        }
        e && this._$AE(i);
      }
    }
    willUpdate(t) {}
    _$AE(t) {
      var e;
      null === (e = this._$Eg) ||
        void 0 === e ||
        e.forEach((t) => {
          var e;
          return null === (e = t.hostUpdated) || void 0 === e ? void 0 : e.call(t);
        }),
        this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
        this.updated(t);
    }
    _$EU() {
      (this._$AL = new Map()), (this.isUpdatePending = !1);
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$Ep;
    }
    shouldUpdate(t) {
      return !0;
    }
    update(t) {
      void 0 !== this._$E_ && (this._$E_.forEach((t, e) => this._$ES(e, this[e], t)), (this._$E_ = void 0)),
        this._$EU();
    }
    updated(t) {}
    firstUpdated(t) {}
  }
  (a$1.finalized = !0),
    (a$1.elementProperties = new Map()),
    (a$1.elementStyles = []),
    (a$1.shadowRootOptions = { mode: 'open' }),
    null == h$2 || h$2({ ReactiveElement: a$1 }),
    (null !== (s$2 = globalThis.reactiveElementVersions) && void 0 !== s$2
      ? s$2
      : (globalThis.reactiveElementVersions = [])
    ).push('1.2.1');
  var i$2 = globalThis.trustedTypes,
    s$1 = i$2 ? i$2.createPolicy('lit-html', { createHTML: (t) => t }) : void 0,
    e$6 = 'lit$'.concat((Math.random() + '').slice(9), '$'),
    o$3 = '?' + e$6,
    n$3 = '<'.concat(o$3, '>'),
    l$2 = document,
    h$1 = function () {
      var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
      return l$2.createComment(t);
    },
    r$1 = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
    d = Array.isArray,
    u = (t) => {
      var e;
      return d(t) || 'function' == typeof (null === (e = t) || void 0 === e ? void 0 : e[Symbol.iterator]);
    },
    c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
    v = /-->/g,
    a = />/g,
    f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
    _ = /'/g,
    m = /"/g,
    g = /^(?:script|style|textarea)$/i,
    p = (t) =>
      function (e) {
        for (var i = arguments.length, s = Array(i > 1 ? i - 1 : 0), n = 1; n < i; n++) s[n - 1] = arguments[n];
        return { _$litType$: t, strings: e, values: s };
      },
    $ = p(1),
    y = p(2),
    b = Symbol.for('lit-noChange'),
    w = Symbol.for('lit-nothing'),
    T = new WeakMap(),
    x = (t, e, i) => {
      var s,
        n,
        a = null !== (s = null == i ? void 0 : i.renderBefore) && void 0 !== s ? s : e,
        o = a._$litPart$;
      if (void 0 === o) {
        var h = null !== (n = null == i ? void 0 : i.renderBefore) && void 0 !== n ? n : null;
        a._$litPart$ = o = new N(e.insertBefore(h$1(), h), h, void 0, null != i ? i : {});
      }
      return o._$AI(t), o;
    },
    A = l$2.createTreeWalker(l$2, 129, null, !1),
    C = (t, e) => {
      for (var i, s = t.length - 1, n = [], o = 2 === e ? '<svg>' : '', h = c, l = 0; l < s; l++) {
        for (
          var p = t[l], u = void 0, d = void 0, $ = -1, y = 0;
          y < p.length && ((h.lastIndex = y), null !== (d = h.exec(p)));

        )
          (y = h.lastIndex),
            h === c
              ? '!--' === d[1]
                ? (h = v)
                : void 0 !== d[1]
                ? (h = a)
                : void 0 !== d[2]
                ? (g.test(d[2]) && (i = RegExp('</' + d[2], 'g')), (h = f))
                : void 0 !== d[3] && (h = f)
              : h === f
              ? '>' === d[0]
                ? ((h = null != i ? i : c), ($ = -1))
                : void 0 === d[1]
                ? ($ = -2)
                : (($ = h.lastIndex - d[2].length), (u = d[1]), (h = void 0 === d[3] ? f : '"' === d[3] ? m : _))
              : h === m || h === _
              ? (h = f)
              : h === v || h === a
              ? (h = c)
              : ((h = f), (i = void 0));
        var b = h === f && t[l + 1].startsWith('/>') ? ' ' : '';
        o +=
          h === c
            ? p + n$3
            : $ >= 0
            ? (n.push(u), p.slice(0, $) + '$lit$' + p.slice($) + e$6 + b)
            : p + e$6 + (-2 === $ ? (n.push(void 0), l) : b);
      }
      var x = o + (t[s] || '<?>') + (2 === e ? '</svg>' : '');
      if (!Array.isArray(t) || !t.hasOwnProperty('raw')) throw Error('invalid template strings array');
      return [void 0 !== s$1 ? s$1.createHTML(x) : x, n];
    };
  class E {
    constructor(t, e) {
      var i,
        { strings: s, _$litType$: n } = t;
      this.parts = [];
      var a = 0,
        o = 0,
        h = s.length - 1,
        l = this.parts,
        [p, f] = C(s, n);
      if (((this.el = E.createElement(p, e)), (A.currentNode = this.el.content), 2 === n)) {
        var u = this.el.content,
          c = u.firstChild;
        c.remove(), u.append(...c.childNodes);
      }
      for (; null !== (i = A.nextNode()) && l.length < h; ) {
        if (1 === i.nodeType) {
          if (i.hasAttributes()) {
            var d = [];
            for (var m of i.getAttributeNames())
              if (m.endsWith('$lit$') || m.startsWith(e$6)) {
                var $ = f[o++];
                if ((d.push(m), void 0 !== $)) {
                  var y = i.getAttribute($.toLowerCase() + '$lit$').split(e$6),
                    v = /([.?@])?(.*)/.exec($);
                  l.push({
                    type: 1,
                    index: a,
                    name: v[2],
                    strings: y,
                    ctor: '.' === v[1] ? M : '?' === v[1] ? H : '@' === v[1] ? I : S,
                  });
                } else l.push({ type: 6, index: a });
              }
            for (var _ of d) i.removeAttribute(_);
          }
          if (g.test(i.tagName)) {
            var b = i.textContent.split(e$6),
              x = b.length - 1;
            if (x > 0) {
              i.textContent = i$2 ? i$2.emptyScript : '';
              for (var P = 0; P < x; P++) i.append(b[P], h$1()), A.nextNode(), l.push({ type: 2, index: ++a });
              i.append(b[x], h$1());
            }
          }
        } else if (8 === i.nodeType) {
          if (i.data === o$3) l.push({ type: 2, index: a });
          else
            for (var k = -1; -1 !== (k = i.data.indexOf(e$6, k + 1)); )
              l.push({ type: 7, index: a }), (k += e$6.length - 1);
        }
        a++;
      }
    }
    static createElement(t, e) {
      var i = l$2.createElement('template');
      return (i.innerHTML = t), i;
    }
  }
  function P(t, e) {
    var i,
      s,
      n,
      a,
      o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t,
      h = arguments.length > 3 ? arguments[3] : void 0;
    if (e === b) return e;
    var l = void 0 !== h ? (null === (i = o._$Cl) || void 0 === i ? void 0 : i[h]) : o._$Cu,
      p = r$1(e) ? void 0 : e._$litDirective$;
    return (
      (null == l ? void 0 : l.constructor) !== p &&
        (null === (s = null == l ? void 0 : l._$AO) || void 0 === s || s.call(l, !1),
        void 0 === p ? (l = void 0) : (l = new p(t))._$AT(t, o, h),
        void 0 !== h ? ((null !== (n = (a = o)._$Cl) && void 0 !== n ? n : (a._$Cl = []))[h] = l) : (o._$Cu = l)),
      void 0 !== l && (e = P(t, l._$AS(t, e.values), l, h)),
      e
    );
  }
  class V {
    constructor(t, e) {
      (this.v = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    p(t) {
      var e,
        {
          el: { content: i },
          parts: s,
        } = this._$AD,
        n = (null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e ? e : l$2).importNode(i, !0);
      A.currentNode = n;
      for (var a = A.nextNode(), o = 0, h = 0, l = s[0]; void 0 !== l; ) {
        if (o === l.index) {
          var p = void 0;
          2 === l.type
            ? (p = new N(a, a.nextSibling, this, t))
            : 1 === l.type
            ? (p = new l.ctor(a, l.name, l.strings, this, t))
            : 6 === l.type && (p = new L(a, this, t)),
            this.v.push(p),
            (l = s[++h]);
        }
        o !== (null == l ? void 0 : l.index) && ((a = A.nextNode()), o++);
      }
      return n;
    }
    m(t) {
      var e = 0;
      for (var i of this.v)
        void 0 !== i && (void 0 !== i.strings ? (i._$AI(t, i, e), (e += i.strings.length - 2)) : i._$AI(t[e])), e++;
    }
  }
  class N {
    constructor(t, e, i, s) {
      var n;
      (this.type = 2),
        (this._$AH = w),
        (this._$AN = void 0),
        (this._$AA = t),
        (this._$AB = e),
        (this._$AM = i),
        (this.options = s),
        (this._$Cg = null === (n = null == s ? void 0 : s.isConnected) || void 0 === n || n);
    }
    get _$AU() {
      var t, e;
      return null !== (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== e ? e : this._$Cg;
    }
    get parentNode() {
      var t = this._$AA.parentNode,
        e = this._$AM;
      return void 0 !== e && 11 === t.nodeType && (t = e.parentNode), t;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t) {
      (t = P(this, t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this)),
        r$1(t)
          ? t === w || null == t || '' === t
            ? (this._$AH !== w && this._$AR(), (this._$AH = w))
            : t !== this._$AH && t !== b && this.$(t)
          : void 0 !== t._$litType$
          ? this.T(t)
          : void 0 !== t.nodeType
          ? this.S(t)
          : u(t)
          ? this.A(t)
          : this.$(t);
    }
    M(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this._$AB;
      return this._$AA.parentNode.insertBefore(t, e);
    }
    S(t) {
      this._$AH !== t && (this._$AR(), (this._$AH = this.M(t)));
    }
    $(t) {
      this._$AH !== w && r$1(this._$AH) ? (this._$AA.nextSibling.data = t) : this.S(l$2.createTextNode(t)),
        (this._$AH = t);
    }
    T(t) {
      var e,
        { values: i, _$litType$: s } = t,
        n = 'number' == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = E.createElement(s.h, this.options)), s);
      if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === n) this._$AH.m(i);
      else {
        var a = new V(n, this),
          o = a.p(this.options);
        a.m(i), this.S(o), (this._$AH = a);
      }
    }
    _$AC(t) {
      var e = T.get(t.strings);
      return void 0 === e && T.set(t.strings, (e = new E(t))), e;
    }
    A(t) {
      d(this._$AH) || ((this._$AH = []), this._$AR());
      var e,
        i = this._$AH,
        s = 0;
      for (var n of t)
        s === i.length ? i.push((e = new N(this.M(h$1()), this.M(h$1()), this, this.options))) : (e = i[s]),
          e._$AI(n),
          s++;
      s < i.length && (this._$AR(e && e._$AB.nextSibling, s), (i.length = s));
    }
    _$AR() {
      var t,
        e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._$AA.nextSibling,
        i = arguments.length > 1 ? arguments[1] : void 0;
      for (null === (t = this._$AP) || void 0 === t || t.call(this, !1, !0, i); e && e !== this._$AB; ) {
        var s = e.nextSibling;
        e.remove(), (e = s);
      }
    }
    setConnected(t) {
      var e;
      void 0 === this._$AM && ((this._$Cg = t), null === (e = this._$AP) || void 0 === e || e.call(this, t));
    }
  }
  class S {
    constructor(t, e, i, s, n) {
      (this.type = 1),
        (this._$AH = w),
        (this._$AN = void 0),
        (this.element = t),
        (this.name = e),
        (this._$AM = s),
        (this.options = n),
        i.length > 2 || '' !== i[0] || '' !== i[1]
          ? ((this._$AH = Array(i.length - 1).fill(new String())), (this.strings = i))
          : (this._$AH = w);
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t) {
      var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this,
        i = arguments.length > 2 ? arguments[2] : void 0,
        s = arguments.length > 3 ? arguments[3] : void 0,
        n = this.strings,
        a = !1;
      if (void 0 === n) (t = P(this, t, e, 0)), (a = !r$1(t) || (t !== this._$AH && t !== b)) && (this._$AH = t);
      else {
        var o,
          h,
          l = t;
        for (t = n[0], o = 0; o < n.length - 1; o++)
          (h = P(this, l[i + o], e, o)) === b && (h = this._$AH[o]),
            a || (a = !r$1(h) || h !== this._$AH[o]),
            h === w ? (t = w) : t !== w && (t += (null != h ? h : '') + n[o + 1]),
            (this._$AH[o] = h);
      }
      a && !s && this.k(t);
    }
    k(t) {
      t === w ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : '');
    }
  }
  class M extends S {
    constructor() {
      super(...arguments), (this.type = 3);
    }
    k(t) {
      this.element[this.name] = t === w ? void 0 : t;
    }
  }
  var k = i$2 ? i$2.emptyScript : '';
  class H extends S {
    constructor() {
      super(...arguments), (this.type = 4);
    }
    k(t) {
      t && t !== w ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
    }
  }
  class I extends S {
    constructor(t, e, i, s, n) {
      super(t, e, i, s, n), (this.type = 5);
    }
    _$AI(t) {
      var e;
      if (
        (t =
          null !== (e = P(this, t, arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this, 0)) &&
          void 0 !== e
            ? e
            : w) !== b
      ) {
        var i = this._$AH,
          s = (t === w && i !== w) || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive,
          n = t !== w && (i === w || s);
        s && this.element.removeEventListener(this.name, this, i),
          n && this.element.addEventListener(this.name, this, t),
          (this._$AH = t);
      }
    }
    handleEvent(t) {
      var e, i;
      'function' == typeof this._$AH
        ? this._$AH.call(
            null !== (i = null === (e = this.options) || void 0 === e ? void 0 : e.host) && void 0 !== i
              ? i
              : this.element,
            t,
          )
        : this._$AH.handleEvent(t);
    }
  }
  class L {
    constructor(t, e, i) {
      (this.element = t), (this.type = 6), (this._$AN = void 0), (this._$AM = e), (this.options = i);
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t) {
      P(this, t);
    }
  }
  var l$1,
    o$2,
    R = { P: '$lit$', V: e$6, L: o$3, I: 1, N: C, R: V, D: u, j: P, H: N, O: S, F: H, B: I, W: M, Z: L },
    z = window.litHtmlPolyfillSupport;
  null == z || z(E, N),
    (null !== (t$2 = globalThis.litHtmlVersions) && void 0 !== t$2 ? t$2 : (globalThis.litHtmlVersions = [])).push(
      '2.1.2',
    );
  var r = a$1;
  class s extends a$1 {
    constructor() {
      super(...arguments), (this.renderOptions = { host: this }), (this._$Dt = void 0);
    }
    createRenderRoot() {
      var t,
        e,
        i = super.createRenderRoot();
      return (
        (null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t) || (e.renderBefore = i.firstChild), i
      );
    }
    update(t) {
      var e = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
        super.update(t),
        (this._$Dt = x(e, this.renderRoot, this.renderOptions));
    }
    connectedCallback() {
      var t;
      super.connectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
    }
    disconnectedCallback() {
      var t;
      super.disconnectedCallback(), null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
    }
    render() {
      return b;
    }
  }
  (s.finalized = !0),
    (s._$litElement$ = !0),
    null === (l$1 = globalThis.litElementHydrateSupport) || void 0 === l$1 || l$1.call(globalThis, { LitElement: s });
  var n$2 = globalThis.litElementPolyfillSupport;
  null == n$2 || n$2({ LitElement: s });
  var h = {
    _$AK(t, e, i) {
      t._$AK(e, i);
    },
    _$AL: (t) => t._$AL,
  };
  (null !== (o$2 = globalThis.litElementVersions) && void 0 !== o$2 ? o$2 : (globalThis.litElementVersions = [])).push(
    '3.1.2',
  );
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ var n$1 = (t) => (e) => {
      var i, s;
      return 'function' == typeof e
        ? ((i = t), (s = e), window.customElements.define(i, s), s)
        : ((t, e) => {
            var { kind: i, elements: s } = e;
            return {
              kind: i,
              elements: s,
              finisher(e) {
                window.customElements.define(t, e);
              },
            };
          })(t, e);
    },
    i$1 = (t, e) =>
      'method' !== e.kind || !e.descriptor || 'value' in e.descriptor
        ? {
            kind: 'field',
            key: Symbol(),
            placement: 'own',
            descriptor: {},
            originalKey: e.key,
            initializer() {
              'function' == typeof e.initializer && (this[e.key] = e.initializer.call(this));
            },
            finisher(i) {
              i.createProperty(e.key, t);
            },
          }
        : _objectSpread2(
            _objectSpread2({}, e),
            {},
            {
              finisher(i) {
                i.createProperty(e.key, t);
              },
            },
          );
  function e$5(t) {
    return (e, i) =>
      void 0 !== i
        ? ((t, e, i) => {
            e.constructor.createProperty(i, t);
          })(t, e, i)
        : i$1(t, e);
  }
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ function t$1(t) {
    return e$5(_objectSpread2(_objectSpread2({}, t), {}, { state: !0 }));
  }
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ var n,
    e$4 = (t, e, i) => {
      Object.defineProperty(e, i, t);
    },
    t = (t, e) => ({ kind: 'method', placement: 'prototype', key: e.key, descriptor: t }),
    o$1 = (t) => {
      var { finisher: e, descriptor: i } = t;
      return (t, s) => {
        if (void 0 === s) {
          var n,
            a = null !== (n = t.originalKey) && void 0 !== n ? n : t.key,
            o =
              null != i
                ? { kind: 'method', placement: 'prototype', key: a, descriptor: i(t.key) }
                : _objectSpread2(_objectSpread2({}, t), {}, { key: a });
          return (
            null != e &&
              (o.finisher = function (t) {
                e(t, a);
              }),
            o
          );
        }
        var h = t.constructor;
        void 0 !== i && Object.defineProperty(t, s, i(s)), null == e || e(h, s);
      };
    };
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ function e$3(t) {
    return o$1({
      finisher(e, i) {
        Object.assign(e.prototype[i], t);
      },
    });
  }
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ function i(t, e) {
    return o$1({
      descriptor(i) {
        var s = {
          get() {
            var e, i;
            return null !== (i = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(t)) &&
              void 0 !== i
              ? i
              : null;
          },
          enumerable: !0,
          configurable: !0,
        };
        if (e) {
          var n = 'symbol' == typeof i ? Symbol() : '__' + i;
          s.get = function () {
            var e, i;
            return (
              void 0 === this[n] &&
                (this[n] =
                  null !== (i = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(t)) &&
                  void 0 !== i
                    ? i
                    : null),
              this[n]
            );
          };
        }
        return s;
      },
    });
  }
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ function e$2(t) {
    return o$1({
      descriptor: (e) => ({
        get() {
          var e, i;
          return null !== (i = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelectorAll(t)) &&
            void 0 !== i
            ? i
            : [];
        },
        enumerable: !0,
        configurable: !0,
      }),
    });
  }
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ function e$1(t) {
    return o$1({
      descriptor: (e) => ({
        get() {
          var e = this;
          return _asyncToGenerator(function* () {
            var i;
            return yield e.updateComplete, null === (i = e.renderRoot) || void 0 === i ? void 0 : i.querySelector(t);
          })();
        },
        enumerable: !0,
        configurable: !0,
      }),
    });
  }
  /**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ var e =
    null != (null === (n = window.HTMLSlotElement) || void 0 === n ? void 0 : n.prototype.assignedElements)
      ? (t, e) => t.assignedElements(e)
      : (t, e) => t.assignedNodes(e).filter((t) => t.nodeType === Node.ELEMENT_NODE);
  function l(t) {
    var { slot: i, selector: s } = null != t ? t : {};
    return o$1({
      descriptor: (n) => ({
        get() {
          var n,
            a = 'slot' + (i ? '[name='.concat(i, ']') : ':not([name])'),
            o = null === (n = this.renderRoot) || void 0 === n ? void 0 : n.querySelector(a),
            h = null != o ? e(o, t) : [];
          return s ? h.filter((t) => t.matches(s)) : h;
        },
        enumerable: !0,
        configurable: !0,
      }),
    });
  }
  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */ function o(t, e, i) {
    var s,
      n = t;
    return (
      'object' == typeof t ? ((n = t.slot), (s = t)) : (s = { flatten: e }),
      i
        ? l({ slot: n, flatten: e, selector: i })
        : o$1({
            descriptor: (t) => ({
              get() {
                var t,
                  e,
                  i = 'slot' + (n ? '[name='.concat(n, ']') : ':not([name])'),
                  a = null === (t = this.renderRoot) || void 0 === t ? void 0 : t.querySelector(i);
                return null !== (e = null == a ? void 0 : a.assignedNodes(s)) && void 0 !== e ? e : [];
              },
              enumerable: !0,
              configurable: !0,
            }),
          })
    );
  }
  var commonjsGlobal =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {};
  function getDefaultExportFromCjs(t) {
    return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t;
  }
  function getDefaultExportFromNamespaceIfPresent(t) {
    return t && Object.prototype.hasOwnProperty.call(t, 'default') ? t.default : t;
  }
  function getDefaultExportFromNamespaceIfNotNamed(t) {
    return t && Object.prototype.hasOwnProperty.call(t, 'default') && 1 === Object.keys(t).length ? t.default : t;
  }
  function getAugmentedNamespace(t) {
    if (t.__esModule) return t;
    var e = Object.defineProperty({}, '__esModule', { value: !0 });
    return (
      Object.keys(t).forEach(function (i) {
        var s = Object.getOwnPropertyDescriptor(t, i);
        Object.defineProperty(
          e,
          i,
          s.get
            ? s
            : {
                enumerable: !0,
                get: function () {
                  return t[i];
                },
              },
        );
      }),
      e
    );
  }
  function commonjsRequire(t) {
    throw Error(
      'Could not dynamically require "' +
        t +
        '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.',
    );
  }
  var module,
    exports,
    factory,
    lottie$1 = { exports: {} };
  (module = lottie$1),
    (exports = lottie$1.exports),
    'undefined' != typeof navigator &&
      ((factory = function () {
        var svgNS = 'http://www.w3.org/2000/svg',
          locationHref = '',
          _useWebWorker = !1,
          initialDefaultFrame = -999999,
          setWebWorker = function (t) {
            _useWebWorker = !!t;
          },
          getWebWorker = function () {
            return _useWebWorker;
          },
          setLocationHref = function (t) {
            locationHref = t;
          },
          getLocationHref = function () {
            return locationHref;
          };
        function createTag(t) {
          return document.createElement(t);
        }
        function extendPrototype(t, e) {
          var i,
            s,
            n = t.length;
          for (i = 0; i < n; i += 1)
            for (var a in (s = t[i].prototype)) Object.prototype.hasOwnProperty.call(s, a) && (e.prototype[a] = s[a]);
        }
        function getDescriptor(t, e) {
          return Object.getOwnPropertyDescriptor(t, e);
        }
        function createProxyFunction(t) {
          function e() {}
          return (e.prototype = t), e;
        }
        var audioControllerFactory = (function () {
            function t(t) {
              (this.audios = []), (this.audioFactory = t), (this._volume = 1), (this._isMuted = !1);
            }
            return (
              (t.prototype = {
                addAudio: function (t) {
                  this.audios.push(t);
                },
                pause: function () {
                  var t,
                    e = this.audios.length;
                  for (t = 0; t < e; t += 1) this.audios[t].pause();
                },
                resume: function () {
                  var t,
                    e = this.audios.length;
                  for (t = 0; t < e; t += 1) this.audios[t].resume();
                },
                setRate: function (t) {
                  var e,
                    i = this.audios.length;
                  for (e = 0; e < i; e += 1) this.audios[e].setRate(t);
                },
                createAudio: function (t) {
                  return this.audioFactory
                    ? this.audioFactory(t)
                    : window.Howl
                    ? new window.Howl({ src: [t] })
                    : {
                        isPlaying: !1,
                        play: function () {
                          this.isPlaying = !0;
                        },
                        seek: function () {
                          this.isPlaying = !1;
                        },
                        playing: function () {},
                        rate: function () {},
                        setVolume: function () {},
                      };
                },
                setAudioFactory: function (t) {
                  this.audioFactory = t;
                },
                setVolume: function (t) {
                  (this._volume = t), this._updateVolume();
                },
                mute: function () {
                  (this._isMuted = !0), this._updateVolume();
                },
                unmute: function () {
                  (this._isMuted = !1), this._updateVolume();
                },
                getVolume: function () {
                  return this._volume;
                },
                _updateVolume: function () {
                  var t,
                    e = this.audios.length;
                  for (t = 0; t < e; t += 1) this.audios[t].volume(this._volume * (this._isMuted ? 0 : 1));
                },
              }),
              function () {
                return new t();
              }
            );
          })(),
          createTypedArray = (function () {
            function t(t, e) {
              var i,
                s = 0,
                n = [];
              switch (t) {
                case 'int16':
                case 'uint8c':
                  i = 1;
                  break;
                default:
                  i = 1.1;
              }
              for (s = 0; s < e; s += 1) n.push(i);
              return n;
            }
            return 'function' == typeof Uint8ClampedArray && 'function' == typeof Float32Array
              ? function (e, i) {
                  return 'float32' === e
                    ? new Float32Array(i)
                    : 'int16' === e
                    ? new Int16Array(i)
                    : 'uint8c' === e
                    ? new Uint8ClampedArray(i)
                    : t(e, i);
                }
              : t;
          })();
        function createSizedArray(t) {
          return Array.apply(null, { length: t });
        }
        function _typeof$6(t) {
          return (_typeof$6 =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                })(t);
        }
        var subframeEnabled = !0,
          expressionsPlugin = null,
          expressionsInterfaces = null,
          idPrefix$1 = '',
          isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
          _shouldRoundValues = !1,
          bmPow = Math.pow,
          bmSqrt = Math.sqrt,
          bmFloor = Math.floor,
          bmMax = Math.max,
          bmMin = Math.min,
          BMMath = {};
        function ProjectInterface$1() {
          return {};
        }
        (function () {
          var t,
            e = [
              'abs',
              'acos',
              'acosh',
              'asin',
              'asinh',
              'atan',
              'atanh',
              'atan2',
              'ceil',
              'cbrt',
              'expm1',
              'clz32',
              'cos',
              'cosh',
              'exp',
              'floor',
              'fround',
              'hypot',
              'imul',
              'log',
              'log1p',
              'log2',
              'log10',
              'max',
              'min',
              'pow',
              'random',
              'round',
              'sign',
              'sin',
              'sinh',
              'sqrt',
              'tan',
              'tanh',
              'trunc',
              'E',
              'LN10',
              'LN2',
              'LOG10E',
              'LOG2E',
              'PI',
              'SQRT1_2',
              'SQRT2',
            ],
            i = e.length;
          for (t = 0; t < i; t += 1) BMMath[e[t]] = Math[e[t]];
        })(),
          (BMMath.random = Math.random),
          (BMMath.abs = function (t) {
            if ('object' === _typeof$6(t) && t.length) {
              var e,
                i = createSizedArray(t.length),
                s = t.length;
              for (e = 0; e < s; e += 1) i[e] = Math.abs(t[e]);
              return i;
            }
            return Math.abs(t);
          });
        var defaultCurveSegments = 150,
          degToRads = Math.PI / 180,
          roundCorner = 0.5519;
        function roundValues(t) {
          _shouldRoundValues = !!t;
        }
        function bmRnd(t) {
          return _shouldRoundValues ? Math.round(t) : t;
        }
        function styleDiv(t) {
          (t.style.position = 'absolute'),
            (t.style.top = 0),
            (t.style.left = 0),
            (t.style.display = 'block'),
            (t.style.transformOrigin = '0 0'),
            (t.style.webkitTransformOrigin = '0 0'),
            (t.style.backfaceVisibility = 'visible'),
            (t.style.webkitBackfaceVisibility = 'visible'),
            (t.style.transformStyle = 'preserve-3d'),
            (t.style.webkitTransformStyle = 'preserve-3d'),
            (t.style.mozTransformStyle = 'preserve-3d');
        }
        function BMEnterFrameEvent(t, e, i, s) {
          (this.type = t), (this.currentTime = e), (this.totalTime = i), (this.direction = s < 0 ? -1 : 1);
        }
        function BMCompleteEvent(t, e) {
          (this.type = t), (this.direction = e < 0 ? -1 : 1);
        }
        function BMCompleteLoopEvent(t, e, i, s) {
          (this.type = t), (this.currentLoop = i), (this.totalLoops = e), (this.direction = s < 0 ? -1 : 1);
        }
        function BMSegmentStartEvent(t, e, i) {
          (this.type = t), (this.firstFrame = e), (this.totalFrames = i);
        }
        function BMDestroyEvent(t, e) {
          (this.type = t), (this.target = e);
        }
        function BMRenderFrameErrorEvent(t, e) {
          (this.type = 'renderFrameError'), (this.nativeError = t), (this.currentTime = e);
        }
        function BMConfigErrorEvent(t) {
          (this.type = 'configError'), (this.nativeError = t);
        }
        function BMAnimationConfigErrorEvent(t, e) {
          (this.type = t), (this.nativeError = e);
        }
        var _count,
          createElementID =
            ((_count = 0),
            function () {
              return idPrefix$1 + '__lottie_element_' + (_count += 1);
            });
        function HSVtoRGB(t, e, i) {
          var s, n, a, o, h, l, p, f;
          switch (
            ((l = i * (1 - e)),
            (p = i * (1 - (h = 6 * t - (o = Math.floor(6 * t))) * e)),
            (f = i * (1 - (1 - h) * e)),
            o % 6)
          ) {
            case 0:
              (s = i), (n = f), (a = l);
              break;
            case 1:
              (s = p), (n = i), (a = l);
              break;
            case 2:
              (s = l), (n = i), (a = f);
              break;
            case 3:
              (s = l), (n = p), (a = i);
              break;
            case 4:
              (s = f), (n = l), (a = i);
              break;
            case 5:
              (s = i), (n = l), (a = p);
          }
          return [s, n, a];
        }
        function RGBtoHSV(t, e, i) {
          var s,
            n = Math.max(t, e, i),
            a = Math.min(t, e, i),
            o = n - a,
            h = 0 === n ? 0 : o / n,
            l = n / 255;
          switch (n) {
            case a:
              s = 0;
              break;
            case t:
              (s = e - i + o * (e < i ? 6 : 0)), (s /= 6 * o);
              break;
            case e:
              (s = i - t + 2 * o), (s /= 6 * o);
              break;
            case i:
              (s = t - e + 4 * o), (s /= 6 * o);
          }
          return [s, h, l];
        }
        function addSaturationToRGB(t, e) {
          var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
          return (i[1] += e), i[1] > 1 ? (i[1] = 1) : i[1] <= 0 && (i[1] = 0), HSVtoRGB(i[0], i[1], i[2]);
        }
        function addBrightnessToRGB(t, e) {
          var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
          return (i[2] += e), i[2] > 1 ? (i[2] = 1) : i[2] < 0 && (i[2] = 0), HSVtoRGB(i[0], i[1], i[2]);
        }
        function addHueToRGB(t, e) {
          var i = RGBtoHSV(255 * t[0], 255 * t[1], 255 * t[2]);
          return (i[0] += e / 360), i[0] > 1 ? (i[0] -= 1) : i[0] < 0 && (i[0] += 1), HSVtoRGB(i[0], i[1], i[2]);
        }
        var rgbToHex = (function () {
            var t,
              e,
              i = [];
            for (t = 0; t < 256; t += 1) (e = t.toString(16)), (i[t] = 1 === e.length ? '0' + e : e);
            return function (t, e, s) {
              return t < 0 && (t = 0), e < 0 && (e = 0), s < 0 && (s = 0), '#' + i[t] + i[e] + i[s];
            };
          })(),
          setSubframeEnabled = function (t) {
            subframeEnabled = !!t;
          },
          getSubframeEnabled = function () {
            return subframeEnabled;
          },
          setExpressionsPlugin = function (t) {
            expressionsPlugin = t;
          },
          getExpressionsPlugin = function () {
            return expressionsPlugin;
          },
          setExpressionInterfaces = function (t) {
            expressionsInterfaces = t;
          },
          getExpressionInterfaces = function () {
            return expressionsInterfaces;
          },
          setDefaultCurveSegments = function (t) {
            defaultCurveSegments = t;
          },
          getDefaultCurveSegments = function () {
            return defaultCurveSegments;
          },
          setIdPrefix = function (t) {
            idPrefix$1 = t;
          },
          getIdPrefix = function () {
            return idPrefix$1;
          };
        function createNS(t) {
          return document.createElementNS(svgNS, t);
        }
        function _typeof$5(t) {
          return (_typeof$5 =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                })(t);
        }
        var dataManager = (function () {
            var t,
              e,
              i = 1,
              s = [],
              n = {
                onmessage: function () {},
                postMessage: function (e) {
                  t({ data: e });
                },
              },
              a = {
                postMessage: function (t) {
                  n.onmessage({ data: t });
                },
              };
            function o() {
              e ||
                ((e = (function (e) {
                  if (window.Worker && window.Blob && getWebWorker()) {
                    var i = new Blob(['var _workerSelf = self; self.onmessage = ', e.toString()], {
                        type: 'text/javascript',
                      }),
                      s = URL.createObjectURL(i);
                    return new Worker(s);
                  }
                  return (t = e), n;
                })(function (t) {
                  if (
                    (a.dataManager ||
                      (a.dataManager = (function () {
                        function t(n, a) {
                          var o,
                            h,
                            l,
                            p,
                            f,
                            c,
                            d = n.length;
                          for (h = 0; h < d; h += 1)
                            if ('ks' in (o = n[h]) && !o.completed) {
                              if (((o.completed = !0), o.hasMask)) {
                                var m = o.masksProperties;
                                for (p = m.length, l = 0; l < p; l += 1)
                                  if (m[l].pt.k.i) s(m[l].pt.k);
                                  else
                                    for (c = m[l].pt.k.length, f = 0; f < c; f += 1)
                                      m[l].pt.k[f].s && s(m[l].pt.k[f].s[0]), m[l].pt.k[f].e && s(m[l].pt.k[f].e[0]);
                              }
                              0 === o.ty
                                ? ((o.layers = e(o.refId, a)), t(o.layers, a))
                                : 4 === o.ty
                                ? i(o.shapes)
                                : 5 === o.ty && u(o);
                            }
                        }
                        function e(t, e) {
                          var i = (function (t, e) {
                            for (var i = 0, s = e.length; i < s; ) {
                              if (e[i].id === t) return e[i];
                              i += 1;
                            }
                            return null;
                          })(t, e);
                          return i
                            ? i.layers.__used
                              ? JSON.parse(JSON.stringify(i.layers))
                              : ((i.layers.__used = !0), i.layers)
                            : null;
                        }
                        function i(t) {
                          var e, n, a;
                          for (e = t.length - 1; e >= 0; e -= 1)
                            if ('sh' === t[e].ty) {
                              if (t[e].ks.k.i) s(t[e].ks.k);
                              else
                                for (a = t[e].ks.k.length, n = 0; n < a; n += 1)
                                  t[e].ks.k[n].s && s(t[e].ks.k[n].s[0]), t[e].ks.k[n].e && s(t[e].ks.k[n].e[0]);
                            } else 'gr' === t[e].ty && i(t[e].it);
                        }
                        function s(t) {
                          var e,
                            i = t.i.length;
                          for (e = 0; e < i; e += 1)
                            (t.i[e][0] += t.v[e][0]),
                              (t.i[e][1] += t.v[e][1]),
                              (t.o[e][0] += t.v[e][0]),
                              (t.o[e][1] += t.v[e][1]);
                        }
                        function n(t, e) {
                          var i = e ? e.split('.') : [100, 100, 100];
                          return (
                            t[0] > i[0] ||
                            (!(i[0] > t[0]) &&
                              (t[1] > i[1] || (!(i[1] > t[1]) && (t[2] > i[2] || (!(i[2] > t[2]) && null)))))
                          );
                        }
                        var a,
                          o = (function () {
                            var t = [4, 4, 14];
                            function e(t) {
                              var e,
                                i,
                                s,
                                n = t.length;
                              for (e = 0; e < n; e += 1)
                                5 === t[e].ty &&
                                  ((s = void 0), (s = (i = t[e]).t.d), (i.t.d = { k: [{ s: s, t: 0 }] }));
                            }
                            return function (i) {
                              if (n(t, i.v) && (e(i.layers), i.assets)) {
                                var s,
                                  a = i.assets.length;
                                for (s = 0; s < a; s += 1) i.assets[s].layers && e(i.assets[s].layers);
                              }
                            };
                          })(),
                          h =
                            ((a = [4, 7, 99]),
                            function (t) {
                              if (t.chars && !n(a, t.v)) {
                                var e,
                                  s = t.chars.length;
                                for (e = 0; e < s; e += 1) {
                                  var o = t.chars[e];
                                  o.data &&
                                    o.data.shapes &&
                                    (i(o.data.shapes),
                                    (o.data.ip = 0),
                                    (o.data.op = 99999),
                                    (o.data.st = 0),
                                    (o.data.sr = 1),
                                    (o.data.ks = {
                                      p: { k: [0, 0], a: 0 },
                                      s: { k: [100, 100], a: 0 },
                                      a: { k: [0, 0], a: 0 },
                                      r: { k: 0, a: 0 },
                                      o: { k: 100, a: 0 },
                                    }),
                                    t.chars[e].t ||
                                      (o.data.shapes.push({ ty: 'no' }),
                                      o.data.shapes[0].it.push({
                                        p: { k: [0, 0], a: 0 },
                                        s: { k: [100, 100], a: 0 },
                                        a: { k: [0, 0], a: 0 },
                                        r: { k: 0, a: 0 },
                                        o: { k: 100, a: 0 },
                                        sk: { k: 0, a: 0 },
                                        sa: { k: 0, a: 0 },
                                        ty: 'tr',
                                      })));
                                }
                              }
                            }),
                          l = (function () {
                            var t = [5, 7, 15];
                            function e(t) {
                              var e,
                                i,
                                s = t.length;
                              for (e = 0; e < s; e += 1)
                                5 === t[e].ty &&
                                  ((i = void 0),
                                  'number' == typeof (i = t[e].t.p).a && (i.a = { a: 0, k: i.a }),
                                  'number' == typeof i.p && (i.p = { a: 0, k: i.p }),
                                  'number' == typeof i.r && (i.r = { a: 0, k: i.r }));
                            }
                            return function (i) {
                              if (n(t, i.v) && (e(i.layers), i.assets)) {
                                var s,
                                  a = i.assets.length;
                                for (s = 0; s < a; s += 1) i.assets[s].layers && e(i.assets[s].layers);
                              }
                            };
                          })(),
                          p = (function () {
                            var t = [4, 1, 9];
                            function e(t) {
                              var i,
                                s,
                                n,
                                a = t.length;
                              for (i = 0; i < a; i += 1)
                                if ('gr' === t[i].ty) e(t[i].it);
                                else if ('fl' === t[i].ty || 'st' === t[i].ty) {
                                  if (t[i].c.k && t[i].c.k[0].i)
                                    for (n = t[i].c.k.length, s = 0; s < n; s += 1)
                                      t[i].c.k[s].s &&
                                        ((t[i].c.k[s].s[0] /= 255),
                                        (t[i].c.k[s].s[1] /= 255),
                                        (t[i].c.k[s].s[2] /= 255),
                                        (t[i].c.k[s].s[3] /= 255)),
                                        t[i].c.k[s].e &&
                                          ((t[i].c.k[s].e[0] /= 255),
                                          (t[i].c.k[s].e[1] /= 255),
                                          (t[i].c.k[s].e[2] /= 255),
                                          (t[i].c.k[s].e[3] /= 255));
                                  else
                                    (t[i].c.k[0] /= 255),
                                      (t[i].c.k[1] /= 255),
                                      (t[i].c.k[2] /= 255),
                                      (t[i].c.k[3] /= 255);
                                }
                            }
                            function i(t) {
                              var i,
                                s = t.length;
                              for (i = 0; i < s; i += 1) 4 === t[i].ty && e(t[i].shapes);
                            }
                            return function (e) {
                              if (n(t, e.v) && (i(e.layers), e.assets)) {
                                var s,
                                  a = e.assets.length;
                                for (s = 0; s < a; s += 1) e.assets[s].layers && i(e.assets[s].layers);
                              }
                            };
                          })(),
                          f = (function () {
                            var t = [4, 4, 18];
                            function e(t) {
                              var i, s, n;
                              for (i = t.length - 1; i >= 0; i -= 1)
                                if ('sh' === t[i].ty) {
                                  if (t[i].ks.k.i) t[i].ks.k.c = t[i].closed;
                                  else
                                    for (n = t[i].ks.k.length, s = 0; s < n; s += 1)
                                      t[i].ks.k[s].s && (t[i].ks.k[s].s[0].c = t[i].closed),
                                        t[i].ks.k[s].e && (t[i].ks.k[s].e[0].c = t[i].closed);
                                } else 'gr' === t[i].ty && e(t[i].it);
                            }
                            function i(t) {
                              var i,
                                s,
                                n,
                                a,
                                o,
                                h,
                                l = t.length;
                              for (s = 0; s < l; s += 1) {
                                if ((i = t[s]).hasMask) {
                                  var p = i.masksProperties;
                                  for (a = p.length, n = 0; n < a; n += 1)
                                    if (p[n].pt.k.i) p[n].pt.k.c = p[n].cl;
                                    else
                                      for (h = p[n].pt.k.length, o = 0; o < h; o += 1)
                                        p[n].pt.k[o].s && (p[n].pt.k[o].s[0].c = p[n].cl),
                                          p[n].pt.k[o].e && (p[n].pt.k[o].e[0].c = p[n].cl);
                                }
                                4 === i.ty && e(i.shapes);
                              }
                            }
                            return function (e) {
                              if (n(t, e.v) && (i(e.layers), e.assets)) {
                                var s,
                                  a = e.assets.length;
                                for (s = 0; s < a; s += 1) e.assets[s].layers && i(e.assets[s].layers);
                              }
                            };
                          })();
                        function u(t) {
                          0 === t.t.a.length && t.t.p;
                        }
                        var c = {
                          completeData: function (i) {
                            i.__complete ||
                              (p(i),
                              o(i),
                              h(i),
                              l(i),
                              f(i),
                              t(i.layers, i.assets),
                              (function (i, s) {
                                if (i) {
                                  var n = 0,
                                    a = i.length;
                                  for (n = 0; n < a; n += 1)
                                    1 === i[n].t &&
                                      ((i[n].data.layers = e(i[n].data.refId, s)), t(i[n].data.layers, s));
                                }
                              })(i.chars, i.assets),
                              (i.__complete = !0));
                          },
                        };
                        return (
                          (c.checkColors = p),
                          (c.checkChars = h),
                          (c.checkPathProperties = l),
                          (c.checkShapes = f),
                          (c.completeLayers = t),
                          c
                        );
                      })()),
                    a.assetLoader ||
                      (a.assetLoader = (function () {
                        function t(t) {
                          var e = t.getResponseHeader('content-type');
                          return (e && 'json' === t.responseType && -1 !== e.indexOf('json')) ||
                            (t.response && 'object' === _typeof$5(t.response))
                            ? t.response
                            : t.response && 'string' == typeof t.response
                            ? JSON.parse(t.response)
                            : t.responseText
                            ? JSON.parse(t.responseText)
                            : null;
                        }
                        return {
                          load: function (e, i, s, n) {
                            var a,
                              o = new XMLHttpRequest();
                            try {
                              o.responseType = 'json';
                            } catch (h) {}
                            o.onreadystatechange = function () {
                              if (4 === o.readyState) {
                                if (200 === o.status) s((a = t(o)));
                                else
                                  try {
                                    (a = t(o)), s(a);
                                  } catch (e) {
                                    n && n(e);
                                  }
                              }
                            };
                            try {
                              o.open('GET', e, !0);
                            } catch (l) {
                              o.open('GET', i + '/' + e, !0);
                            }
                            o.send();
                          },
                        };
                      })()),
                    'loadAnimation' === t.data.type)
                  )
                    a.assetLoader.load(
                      t.data.path,
                      t.data.fullPath,
                      function (e) {
                        a.dataManager.completeData(e), a.postMessage({ id: t.data.id, payload: e, status: 'success' });
                      },
                      function () {
                        a.postMessage({ id: t.data.id, status: 'error' });
                      },
                    );
                  else if ('complete' === t.data.type) {
                    var e = t.data.animation;
                    a.dataManager.completeData(e), a.postMessage({ id: t.data.id, payload: e, status: 'success' });
                  } else
                    'loadData' === t.data.type &&
                      a.assetLoader.load(
                        t.data.path,
                        t.data.fullPath,
                        function (e) {
                          a.postMessage({ id: t.data.id, payload: e, status: 'success' });
                        },
                        function () {
                          a.postMessage({ id: t.data.id, status: 'error' });
                        },
                      );
                })).onmessage = function (t) {
                  var e = t.data,
                    i = e.id,
                    n = s[i];
                  (s[i] = null), 'success' === e.status ? n.onComplete(e.payload) : n.onError && n.onError();
                });
            }
            function h(t, e) {
              var n = 'processId_' + (i += 1);
              return (s[n] = { onComplete: t, onError: e }), n;
            }
            return {
              loadAnimation: function (t, i, s) {
                o();
                var n = h(i, s);
                e.postMessage({
                  type: 'loadAnimation',
                  path: t,
                  fullPath: window.location.origin + window.location.pathname,
                  id: n,
                });
              },
              loadData: function (t, i, s) {
                o();
                var n = h(i, s);
                e.postMessage({
                  type: 'loadData',
                  path: t,
                  fullPath: window.location.origin + window.location.pathname,
                  id: n,
                });
              },
              completeAnimation: function (t, i, s) {
                o();
                var n = h(i, s);
                e.postMessage({ type: 'complete', animation: t, id: n });
              },
            };
          })(),
          ImagePreloader = (function () {
            var t,
              e,
              i =
                (((t = createTag('canvas')).width = 1),
                (t.height = 1),
                ((e = t.getContext('2d')).fillStyle = 'rgba(0,0,0,0)'),
                e.fillRect(0, 0, 1, 1),
                t);
            function s() {
              (this.loadedAssets += 1),
                this.loadedAssets === this.totalImages &&
                  this.loadedFootagesCount === this.totalFootages &&
                  this.imagesLoadedCb &&
                  this.imagesLoadedCb(null);
            }
            function n() {
              (this.loadedFootagesCount += 1),
                this.loadedAssets === this.totalImages &&
                  this.loadedFootagesCount === this.totalFootages &&
                  this.imagesLoadedCb &&
                  this.imagesLoadedCb(null);
            }
            function a(t, e, i) {
              var s = '';
              if (t.e) s = t.p;
              else if (e) {
                var n = t.p;
                -1 !== n.indexOf('images/') && (n = n.split('/')[1]), (s = e + n);
              } else (s = i), (s += t.u ? t.u : ''), (s += t.p);
              return s;
            }
            function o(t) {
              var e = 0,
                i = setInterval(
                  function () {
                    (t.getBBox().width || e > 500) && (this._imageLoaded(), clearInterval(i)), (e += 1);
                  }.bind(this),
                  50,
                );
            }
            function h(t) {
              var e = { assetData: t },
                i = a(t, this.assetsPath, this.path);
              return (
                dataManager.loadData(
                  i,
                  function (t) {
                    (e.img = t), this._footageLoaded();
                  }.bind(this),
                  function () {
                    (e.img = {}), this._footageLoaded();
                  }.bind(this),
                ),
                e
              );
            }
            function l() {
              (this._imageLoaded = s.bind(this)),
                (this._footageLoaded = n.bind(this)),
                (this.testImageLoaded = o.bind(this)),
                (this.createFootageData = h.bind(this)),
                (this.assetsPath = ''),
                (this.path = ''),
                (this.totalImages = 0),
                (this.totalFootages = 0),
                (this.loadedAssets = 0),
                (this.loadedFootagesCount = 0),
                (this.imagesLoadedCb = null),
                (this.images = []);
            }
            return (
              (l.prototype = {
                loadAssets: function (t, e) {
                  this.imagesLoadedCb = e;
                  var i,
                    s = t.length;
                  for (i = 0; i < s; i += 1)
                    t[i].layers ||
                      (t[i].t && 'seq' !== t[i].t
                        ? 3 === t[i].t && ((this.totalFootages += 1), this.images.push(this.createFootageData(t[i])))
                        : ((this.totalImages += 1), this.images.push(this._createImageData(t[i]))));
                },
                setAssetsPath: function (t) {
                  this.assetsPath = t || '';
                },
                setPath: function (t) {
                  this.path = t || '';
                },
                loadedImages: function () {
                  return this.totalImages === this.loadedAssets;
                },
                loadedFootages: function () {
                  return this.totalFootages === this.loadedFootagesCount;
                },
                destroy: function () {
                  (this.imagesLoadedCb = null), (this.images.length = 0);
                },
                getAsset: function (t) {
                  for (var e = 0, i = this.images.length; e < i; ) {
                    if (this.images[e].assetData === t) return this.images[e].img;
                    e += 1;
                  }
                  return null;
                },
                createImgData: function (t) {
                  var e = a(t, this.assetsPath, this.path),
                    s = createTag('img');
                  (s.crossOrigin = 'anonymous'),
                    s.addEventListener('load', this._imageLoaded, !1),
                    s.addEventListener(
                      'error',
                      function () {
                        (n.img = i), this._imageLoaded();
                      }.bind(this),
                      !1,
                    ),
                    (s.src = e);
                  var n = { img: s, assetData: t };
                  return n;
                },
                createImageData: function (t) {
                  var e = a(t, this.assetsPath, this.path),
                    s = createNS('image');
                  isSafari ? this.testImageLoaded(s) : s.addEventListener('load', this._imageLoaded, !1),
                    s.addEventListener(
                      'error',
                      function () {
                        (n.img = i), this._imageLoaded();
                      }.bind(this),
                      !1,
                    ),
                    s.setAttributeNS('http://www.w3.org/1999/xlink', 'href', e),
                    this._elementHelper.append ? this._elementHelper.append(s) : this._elementHelper.appendChild(s);
                  var n = { img: s, assetData: t };
                  return n;
                },
                imageLoaded: s,
                footageLoaded: n,
                setCacheType: function (t, e) {
                  'svg' === t
                    ? ((this._elementHelper = e), (this._createImageData = this.createImageData.bind(this)))
                    : (this._createImageData = this.createImgData.bind(this));
                },
              }),
              l
            );
          })();
        function BaseEvent() {}
        BaseEvent.prototype = {
          triggerEvent: function (t, e) {
            if (this._cbs[t]) for (var i = this._cbs[t], s = 0; s < i.length; s += 1) i[s](e);
          },
          addEventListener: function (t, e) {
            return (
              this._cbs[t] || (this._cbs[t] = []),
              this._cbs[t].push(e),
              function () {
                this.removeEventListener(t, e);
              }.bind(this)
            );
          },
          removeEventListener: function (t, e) {
            if (e) {
              if (this._cbs[t]) {
                for (var i = 0, s = this._cbs[t].length; i < s; )
                  this._cbs[t][i] === e && (this._cbs[t].splice(i, 1), (i -= 1), (s -= 1)), (i += 1);
                this._cbs[t].length || (this._cbs[t] = null);
              }
            } else this._cbs[t] = null;
          },
        };
        var markerParser = (function () {
            function t(t) {
              for (var e, i = t.split('\r\n'), s = {}, n = 0, a = 0; a < i.length; a += 1)
                2 === (e = i[a].split(':')).length && ((s[e[0]] = e[1].trim()), (n += 1));
              if (0 === n) throw Error();
              return s;
            }
            return function (e) {
              for (var i = [], s = 0; s < e.length; s += 1) {
                var n = e[s],
                  a = { time: n.tm, duration: n.dr };
                try {
                  a.payload = JSON.parse(e[s].cm);
                } catch (o) {
                  try {
                    a.payload = t(e[s].cm);
                  } catch (h) {
                    a.payload = { name: e[s].cm };
                  }
                }
                i.push(a);
              }
              return i;
            };
          })(),
          ProjectInterface = (function () {
            function t(t) {
              this.compositions.push(t);
            }
            return function () {
              function e(t) {
                for (var e = 0, i = this.compositions.length; e < i; ) {
                  if (this.compositions[e].data && this.compositions[e].data.nm === t)
                    return (
                      this.compositions[e].prepareFrame &&
                        this.compositions[e].data.xt &&
                        this.compositions[e].prepareFrame(this.currentFrame),
                      this.compositions[e].compInterface
                    );
                  e += 1;
                }
                return null;
              }
              return (e.compositions = []), (e.currentFrame = 0), (e.registerComposition = t), e;
            };
          })(),
          renderers = {},
          registerRenderer = function (t, e) {
            renderers[t] = e;
          };
        function getRenderer(t) {
          return renderers[t];
        }
        function _typeof$4(t) {
          return (_typeof$4 =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                })(t);
        }
        var AnimationItem = function () {
          (this._cbs = []),
            (this.name = ''),
            (this.path = ''),
            (this.isLoaded = !1),
            (this.currentFrame = 0),
            (this.currentRawFrame = 0),
            (this.firstFrame = 0),
            (this.totalFrames = 0),
            (this.frameRate = 0),
            (this.frameMult = 0),
            (this.playSpeed = 1),
            (this.playDirection = 1),
            (this.playCount = 0),
            (this.animationData = {}),
            (this.assets = []),
            (this.isPaused = !0),
            (this.autoplay = !1),
            (this.loop = !0),
            (this.renderer = null),
            (this.animationID = createElementID()),
            (this.assetsPath = ''),
            (this.timeCompleted = 0),
            (this.segmentPos = 0),
            (this.isSubframeEnabled = getSubframeEnabled()),
            (this.segments = []),
            (this._idle = !0),
            (this._completedLoop = !1),
            (this.projectInterface = ProjectInterface()),
            (this.imagePreloader = new ImagePreloader()),
            (this.audioController = audioControllerFactory()),
            (this.markers = []),
            (this.configAnimation = this.configAnimation.bind(this)),
            (this.onSetupError = this.onSetupError.bind(this)),
            (this.onSegmentComplete = this.onSegmentComplete.bind(this)),
            (this.drawnFrameEvent = new BMEnterFrameEvent('drawnFrame', 0, 0, 0));
        };
        extendPrototype([BaseEvent], AnimationItem),
          (AnimationItem.prototype.setParams = function (t) {
            (t.wrapper || t.container) && (this.wrapper = t.wrapper || t.container);
            var e = 'svg';
            t.animType ? (e = t.animType) : t.renderer && (e = t.renderer);
            var i = getRenderer(e);
            (this.renderer = new i(this, t.rendererSettings)),
              this.imagePreloader.setCacheType(e, this.renderer.globalData.defs),
              this.renderer.setProjectInterface(this.projectInterface),
              (this.animType = e),
              '' === t.loop || null === t.loop || void 0 === t.loop || !0 === t.loop
                ? (this.loop = !0)
                : !1 === t.loop
                ? (this.loop = !1)
                : (this.loop = parseInt(t.loop, 10)),
              (this.autoplay = !('autoplay' in t) || t.autoplay),
              (this.name = t.name ? t.name : ''),
              (this.autoloadSegments =
                !Object.prototype.hasOwnProperty.call(t, 'autoloadSegments') || t.autoloadSegments),
              (this.assetsPath = t.assetsPath),
              (this.initialSegment = t.initialSegment),
              t.audioFactory && this.audioController.setAudioFactory(t.audioFactory),
              t.animationData
                ? this.setupAnimation(t.animationData)
                : t.path &&
                  (-1 !== t.path.lastIndexOf('\\')
                    ? (this.path = t.path.substr(0, t.path.lastIndexOf('\\') + 1))
                    : (this.path = t.path.substr(0, t.path.lastIndexOf('/') + 1)),
                  (this.fileName = t.path.substr(t.path.lastIndexOf('/') + 1)),
                  (this.fileName = this.fileName.substr(0, this.fileName.lastIndexOf('.json'))),
                  dataManager.loadAnimation(t.path, this.configAnimation, this.onSetupError));
          }),
          (AnimationItem.prototype.onSetupError = function () {
            this.trigger('data_failed');
          }),
          (AnimationItem.prototype.setupAnimation = function (t) {
            dataManager.completeAnimation(t, this.configAnimation);
          }),
          (AnimationItem.prototype.setData = function (t, e) {
            e && 'object' !== _typeof$4(e) && (e = JSON.parse(e));
            var i = { wrapper: t, animationData: e },
              s = t.attributes;
            (i.path = s.getNamedItem('data-animation-path')
              ? s.getNamedItem('data-animation-path').value
              : s.getNamedItem('data-bm-path')
              ? s.getNamedItem('data-bm-path').value
              : s.getNamedItem('bm-path')
              ? s.getNamedItem('bm-path').value
              : ''),
              (i.animType = s.getNamedItem('data-anim-type')
                ? s.getNamedItem('data-anim-type').value
                : s.getNamedItem('data-bm-type')
                ? s.getNamedItem('data-bm-type').value
                : s.getNamedItem('bm-type')
                ? s.getNamedItem('bm-type').value
                : s.getNamedItem('data-bm-renderer')
                ? s.getNamedItem('data-bm-renderer').value
                : s.getNamedItem('bm-renderer')
                ? s.getNamedItem('bm-renderer').value
                : 'canvas');
            var n = s.getNamedItem('data-anim-loop')
              ? s.getNamedItem('data-anim-loop').value
              : s.getNamedItem('data-bm-loop')
              ? s.getNamedItem('data-bm-loop').value
              : s.getNamedItem('bm-loop')
              ? s.getNamedItem('bm-loop').value
              : '';
            'false' === n ? (i.loop = !1) : 'true' === n ? (i.loop = !0) : '' !== n && (i.loop = parseInt(n, 10));
            var a = s.getNamedItem('data-anim-autoplay')
              ? s.getNamedItem('data-anim-autoplay').value
              : s.getNamedItem('data-bm-autoplay')
              ? s.getNamedItem('data-bm-autoplay').value
              : !s.getNamedItem('bm-autoplay') || s.getNamedItem('bm-autoplay').value;
            (i.autoplay = 'false' !== a),
              (i.name = s.getNamedItem('data-name')
                ? s.getNamedItem('data-name').value
                : s.getNamedItem('data-bm-name')
                ? s.getNamedItem('data-bm-name').value
                : s.getNamedItem('bm-name')
                ? s.getNamedItem('bm-name').value
                : ''),
              'false' ===
                (s.getNamedItem('data-anim-prerender')
                  ? s.getNamedItem('data-anim-prerender').value
                  : s.getNamedItem('data-bm-prerender')
                  ? s.getNamedItem('data-bm-prerender').value
                  : s.getNamedItem('bm-prerender')
                  ? s.getNamedItem('bm-prerender').value
                  : '') && (i.prerender = !1),
              this.setParams(i);
          }),
          (AnimationItem.prototype.includeLayers = function (t) {
            t.op > this.animationData.op &&
              ((this.animationData.op = t.op), (this.totalFrames = Math.floor(t.op - this.animationData.ip)));
            var e,
              i,
              s = this.animationData.layers,
              n = s.length,
              a = t.layers,
              o = a.length;
            for (i = 0; i < o; i += 1)
              for (e = 0; e < n; ) {
                if (s[e].id === a[i].id) {
                  s[e] = a[i];
                  break;
                }
                e += 1;
              }
            if (
              ((t.chars || t.fonts) &&
                (this.renderer.globalData.fontManager.addChars(t.chars),
                this.renderer.globalData.fontManager.addFonts(t.fonts, this.renderer.globalData.defs)),
              t.assets)
            )
              for (n = t.assets.length, e = 0; e < n; e += 1) this.animationData.assets.push(t.assets[e]);
            (this.animationData.__complete = !1),
              dataManager.completeAnimation(this.animationData, this.onSegmentComplete);
          }),
          (AnimationItem.prototype.onSegmentComplete = function (t) {
            this.animationData = t;
            var e = getExpressionsPlugin();
            e && e.initExpressions(this), this.loadNextSegment();
          }),
          (AnimationItem.prototype.loadNextSegment = function () {
            var t = this.animationData.segments;
            if (!t || 0 === t.length || !this.autoloadSegments)
              return this.trigger('data_ready'), void (this.timeCompleted = this.totalFrames);
            var e = t.shift();
            this.timeCompleted = e.time * this.frameRate;
            var i = this.path + this.fileName + '_' + this.segmentPos + '.json';
            (this.segmentPos += 1),
              dataManager.loadData(
                i,
                this.includeLayers.bind(this),
                function () {
                  this.trigger('data_failed');
                }.bind(this),
              );
          }),
          (AnimationItem.prototype.loadSegments = function () {
            this.animationData.segments || (this.timeCompleted = this.totalFrames), this.loadNextSegment();
          }),
          (AnimationItem.prototype.imagesLoaded = function () {
            this.trigger('loaded_images'), this.checkLoaded();
          }),
          (AnimationItem.prototype.preloadImages = function () {
            this.imagePreloader.setAssetsPath(this.assetsPath),
              this.imagePreloader.setPath(this.path),
              this.imagePreloader.loadAssets(this.animationData.assets, this.imagesLoaded.bind(this));
          }),
          (AnimationItem.prototype.configAnimation = function (t) {
            if (this.renderer)
              try {
                (this.animationData = t),
                  this.initialSegment
                    ? ((this.totalFrames = Math.floor(this.initialSegment[1] - this.initialSegment[0])),
                      (this.firstFrame = Math.round(this.initialSegment[0])))
                    : ((this.totalFrames = Math.floor(this.animationData.op - this.animationData.ip)),
                      (this.firstFrame = Math.round(this.animationData.ip))),
                  this.renderer.configAnimation(t),
                  t.assets || (t.assets = []),
                  (this.assets = this.animationData.assets),
                  (this.frameRate = this.animationData.fr),
                  (this.frameMult = this.animationData.fr / 1e3),
                  this.renderer.searchExtraCompositions(t.assets),
                  (this.markers = markerParser(t.markers || [])),
                  this.trigger('config_ready'),
                  this.preloadImages(),
                  this.loadSegments(),
                  this.updaFrameModifier(),
                  this.waitForFontsLoaded(),
                  this.isPaused && this.audioController.pause();
              } catch (e) {
                this.triggerConfigError(e);
              }
          }),
          (AnimationItem.prototype.waitForFontsLoaded = function () {
            this.renderer &&
              (this.renderer.globalData.fontManager.isLoaded
                ? this.checkLoaded()
                : setTimeout(this.waitForFontsLoaded.bind(this), 20));
          }),
          (AnimationItem.prototype.checkLoaded = function () {
            if (
              !this.isLoaded &&
              this.renderer.globalData.fontManager.isLoaded &&
              (this.imagePreloader.loadedImages() || 'canvas' !== this.renderer.rendererType) &&
              this.imagePreloader.loadedFootages()
            ) {
              this.isLoaded = !0;
              var t = getExpressionsPlugin();
              t && t.initExpressions(this),
                this.renderer.initItems(),
                setTimeout(
                  function () {
                    this.trigger('DOMLoaded');
                  }.bind(this),
                  0,
                ),
                this.gotoFrame(),
                this.autoplay && this.play();
            }
          }),
          (AnimationItem.prototype.resize = function (t, e) {
            var i = 'number' == typeof t ? t : void 0,
              s = 'number' == typeof e ? e : void 0;
            this.renderer.updateContainerSize(i, s);
          }),
          (AnimationItem.prototype.setSubframe = function (t) {
            this.isSubframeEnabled = !!t;
          }),
          (AnimationItem.prototype.gotoFrame = function () {
            (this.currentFrame = this.isSubframeEnabled ? this.currentRawFrame : ~~this.currentRawFrame),
              this.timeCompleted !== this.totalFrames &&
                this.currentFrame > this.timeCompleted &&
                (this.currentFrame = this.timeCompleted),
              this.trigger('enterFrame'),
              this.renderFrame(),
              this.trigger('drawnFrame');
          }),
          (AnimationItem.prototype.renderFrame = function () {
            if (!1 !== this.isLoaded && this.renderer)
              try {
                this.renderer.renderFrame(this.currentFrame + this.firstFrame);
              } catch (t) {
                this.triggerRenderFrameError(t);
              }
          }),
          (AnimationItem.prototype.play = function (t) {
            (t && this.name !== t) ||
              (!0 === this.isPaused &&
                ((this.isPaused = !1),
                this.trigger('_pause'),
                this.audioController.resume(),
                this._idle && ((this._idle = !1), this.trigger('_active'))));
          }),
          (AnimationItem.prototype.pause = function (t) {
            (t && this.name !== t) ||
              (!1 === this.isPaused &&
                ((this.isPaused = !0),
                this.trigger('_play'),
                (this._idle = !0),
                this.trigger('_idle'),
                this.audioController.pause()));
          }),
          (AnimationItem.prototype.togglePause = function (t) {
            (t && this.name !== t) || (!0 === this.isPaused ? this.play() : this.pause());
          }),
          (AnimationItem.prototype.stop = function (t) {
            (t && this.name !== t) ||
              (this.pause(), (this.playCount = 0), (this._completedLoop = !1), this.setCurrentRawFrameValue(0));
          }),
          (AnimationItem.prototype.getMarkerData = function (t) {
            for (var e, i = 0; i < this.markers.length; i += 1)
              if ((e = this.markers[i]).payload && e.payload.name === t) return e;
            return null;
          }),
          (AnimationItem.prototype.goToAndStop = function (t, e, i) {
            if (!i || this.name === i) {
              if (isNaN(Number(t))) {
                var s = this.getMarkerData(t);
                s && this.goToAndStop(s.time, !0);
              } else e ? this.setCurrentRawFrameValue(t) : this.setCurrentRawFrameValue(t * this.frameModifier);
              this.pause();
            }
          }),
          (AnimationItem.prototype.goToAndPlay = function (t, e, i) {
            if (!i || this.name === i) {
              var s = Number(t);
              if (isNaN(s)) {
                var n = this.getMarkerData(t);
                n && (n.duration ? this.playSegments([n.time, n.time + n.duration], !0) : this.goToAndStop(n.time, !0));
              } else this.goToAndStop(s, e, i);
              this.play();
            }
          }),
          (AnimationItem.prototype.advanceTime = function (t) {
            if (!0 !== this.isPaused && !1 !== this.isLoaded) {
              var e = this.currentRawFrame + t * this.frameModifier,
                i = !1;
              e >= this.totalFrames - 1 && this.frameModifier > 0
                ? this.loop && this.playCount !== this.loop
                  ? e >= this.totalFrames
                    ? ((this.playCount += 1),
                      this.checkSegments(e % this.totalFrames) ||
                        (this.setCurrentRawFrameValue(e % this.totalFrames),
                        (this._completedLoop = !0),
                        this.trigger('loopComplete')))
                    : this.setCurrentRawFrameValue(e)
                  : this.checkSegments(e > this.totalFrames ? e % this.totalFrames : 0) ||
                    ((i = !0), (e = this.totalFrames - 1))
                : e < 0
                ? this.checkSegments(e % this.totalFrames) ||
                  (!this.loop || (this.playCount-- <= 0 && !0 !== this.loop)
                    ? ((i = !0), (e = 0))
                    : (this.setCurrentRawFrameValue(this.totalFrames + (e % this.totalFrames)),
                      this._completedLoop ? this.trigger('loopComplete') : (this._completedLoop = !0)))
                : this.setCurrentRawFrameValue(e),
                i && (this.setCurrentRawFrameValue(e), this.pause(), this.trigger('complete'));
            }
          }),
          (AnimationItem.prototype.adjustSegment = function (t, e) {
            (this.playCount = 0),
              t[1] < t[0]
                ? (this.frameModifier > 0 &&
                    (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(-1)),
                  (this.totalFrames = t[0] - t[1]),
                  (this.timeCompleted = this.totalFrames),
                  (this.firstFrame = t[1]),
                  this.setCurrentRawFrameValue(this.totalFrames - 0.001 - e))
                : t[1] > t[0] &&
                  (this.frameModifier < 0 &&
                    (this.playSpeed < 0 ? this.setSpeed(-this.playSpeed) : this.setDirection(1)),
                  (this.totalFrames = t[1] - t[0]),
                  (this.timeCompleted = this.totalFrames),
                  (this.firstFrame = t[0]),
                  this.setCurrentRawFrameValue(0.001 + e)),
              this.trigger('segmentStart');
          }),
          (AnimationItem.prototype.setSegment = function (t, e) {
            var i = -1;
            this.isPaused &&
              (this.currentRawFrame + this.firstFrame < t
                ? (i = t)
                : this.currentRawFrame + this.firstFrame > e && (i = e - t)),
              (this.firstFrame = t),
              (this.totalFrames = e - t),
              (this.timeCompleted = this.totalFrames),
              -1 !== i && this.goToAndStop(i, !0);
          }),
          (AnimationItem.prototype.playSegments = function (t, e) {
            if ((e && (this.segments.length = 0), 'object' === _typeof$4(t[0]))) {
              var i,
                s = t.length;
              for (i = 0; i < s; i += 1) this.segments.push(t[i]);
            } else this.segments.push(t);
            this.segments.length && e && this.adjustSegment(this.segments.shift(), 0), this.isPaused && this.play();
          }),
          (AnimationItem.prototype.resetSegments = function (t) {
            (this.segments.length = 0),
              this.segments.push([this.animationData.ip, this.animationData.op]),
              t && this.checkSegments(0);
          }),
          (AnimationItem.prototype.checkSegments = function (t) {
            return !!this.segments.length && (this.adjustSegment(this.segments.shift(), t), !0);
          }),
          (AnimationItem.prototype.destroy = function (t) {
            (t && this.name !== t) ||
              !this.renderer ||
              (this.renderer.destroy(),
              this.imagePreloader.destroy(),
              this.trigger('destroy'),
              (this._cbs = null),
              (this.onEnterFrame = null),
              (this.onLoopComplete = null),
              (this.onComplete = null),
              (this.onSegmentStart = null),
              (this.onDestroy = null),
              (this.renderer = null),
              (this.renderer = null),
              (this.imagePreloader = null),
              (this.projectInterface = null));
          }),
          (AnimationItem.prototype.setCurrentRawFrameValue = function (t) {
            (this.currentRawFrame = t), this.gotoFrame();
          }),
          (AnimationItem.prototype.setSpeed = function (t) {
            (this.playSpeed = t), this.updaFrameModifier();
          }),
          (AnimationItem.prototype.setDirection = function (t) {
            (this.playDirection = t < 0 ? -1 : 1), this.updaFrameModifier();
          }),
          (AnimationItem.prototype.setVolume = function (t, e) {
            (e && this.name !== e) || this.audioController.setVolume(t);
          }),
          (AnimationItem.prototype.getVolume = function () {
            return this.audioController.getVolume();
          }),
          (AnimationItem.prototype.mute = function (t) {
            (t && this.name !== t) || this.audioController.mute();
          }),
          (AnimationItem.prototype.unmute = function (t) {
            (t && this.name !== t) || this.audioController.unmute();
          }),
          (AnimationItem.prototype.updaFrameModifier = function () {
            (this.frameModifier = this.frameMult * this.playSpeed * this.playDirection),
              this.audioController.setRate(this.playSpeed * this.playDirection);
          }),
          (AnimationItem.prototype.getPath = function () {
            return this.path;
          }),
          (AnimationItem.prototype.getAssetsPath = function (t) {
            var e = '';
            if (t.e) e = t.p;
            else if (this.assetsPath) {
              var i = t.p;
              -1 !== i.indexOf('images/') && (i = i.split('/')[1]), (e = this.assetsPath + i);
            } else (e = this.path), (e += t.u ? t.u : ''), (e += t.p);
            return e;
          }),
          (AnimationItem.prototype.getAssetData = function (t) {
            for (var e = 0, i = this.assets.length; e < i; ) {
              if (t === this.assets[e].id) return this.assets[e];
              e += 1;
            }
            return null;
          }),
          (AnimationItem.prototype.hide = function () {
            this.renderer.hide();
          }),
          (AnimationItem.prototype.show = function () {
            this.renderer.show();
          }),
          (AnimationItem.prototype.getDuration = function (t) {
            return t ? this.totalFrames : this.totalFrames / this.frameRate;
          }),
          (AnimationItem.prototype.updateDocumentData = function (t, e, i) {
            try {
              this.renderer.getElementByPath(t).updateDocumentData(e, i);
            } catch (s) {}
          }),
          (AnimationItem.prototype.trigger = function (t) {
            if (this._cbs && this._cbs[t])
              switch (t) {
                case 'enterFrame':
                  this.triggerEvent(
                    t,
                    new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameModifier),
                  );
                  break;
                case 'drawnFrame':
                  (this.drawnFrameEvent.currentTime = this.currentFrame),
                    (this.drawnFrameEvent.totalTime = this.totalFrames),
                    (this.drawnFrameEvent.direction = this.frameModifier),
                    this.triggerEvent(t, this.drawnFrameEvent);
                  break;
                case 'loopComplete':
                  this.triggerEvent(t, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult));
                  break;
                case 'complete':
                  this.triggerEvent(t, new BMCompleteEvent(t, this.frameMult));
                  break;
                case 'segmentStart':
                  this.triggerEvent(t, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames));
                  break;
                case 'destroy':
                  this.triggerEvent(t, new BMDestroyEvent(t, this));
                  break;
                default:
                  this.triggerEvent(t);
              }
            'enterFrame' === t &&
              this.onEnterFrame &&
              this.onEnterFrame.call(
                this,
                new BMEnterFrameEvent(t, this.currentFrame, this.totalFrames, this.frameMult),
              ),
              'loopComplete' === t &&
                this.onLoopComplete &&
                this.onLoopComplete.call(this, new BMCompleteLoopEvent(t, this.loop, this.playCount, this.frameMult)),
              'complete' === t && this.onComplete && this.onComplete.call(this, new BMCompleteEvent(t, this.frameMult)),
              'segmentStart' === t &&
                this.onSegmentStart &&
                this.onSegmentStart.call(this, new BMSegmentStartEvent(t, this.firstFrame, this.totalFrames)),
              'destroy' === t && this.onDestroy && this.onDestroy.call(this, new BMDestroyEvent(t, this));
          }),
          (AnimationItem.prototype.triggerRenderFrameError = function (t) {
            var e = new BMRenderFrameErrorEvent(t, this.currentFrame);
            this.triggerEvent('error', e), this.onError && this.onError.call(this, e);
          }),
          (AnimationItem.prototype.triggerConfigError = function (t) {
            var e = new BMConfigErrorEvent(t, this.currentFrame);
            this.triggerEvent('error', e), this.onError && this.onError.call(this, e);
          });
        var animationManager = (function () {
            var t = {},
              e = [],
              i = 0,
              s = 0,
              n = 0,
              a = !0,
              o = !1;
            function h(t) {
              for (var i = 0, n = t.target; i < s; )
                e[i].animation === n && (e.splice(i, 1), (i -= 1), (s -= 1), n.isPaused || f()), (i += 1);
            }
            function l(t, i) {
              if (!t) return null;
              for (var n = 0; n < s; ) {
                if (e[n].elem === t && null !== e[n].elem) return e[n].animation;
                n += 1;
              }
              var a = new AnimationItem();
              return u(a, t), a.setData(t, i), a;
            }
            function p() {
              (n += 1), m();
            }
            function f() {
              n -= 1;
            }
            function u(t, i) {
              t.addEventListener('destroy', h),
                t.addEventListener('_active', p),
                t.addEventListener('_idle', f),
                e.push({ elem: i, animation: t }),
                (s += 1);
            }
            function c(t) {
              var h,
                l = t - i;
              for (h = 0; h < s; h += 1) e[h].animation.advanceTime(l);
              (i = t), n && !o ? window.requestAnimationFrame(c) : (a = !0);
            }
            function d(t) {
              (i = t), window.requestAnimationFrame(c);
            }
            function m() {
              !o && n && a && (window.requestAnimationFrame(d), (a = !1));
            }
            return (
              (t.registerAnimation = l),
              (t.loadAnimation = function (t) {
                var e = new AnimationItem();
                return u(e, null), e.setParams(t), e;
              }),
              (t.setSpeed = function (t, i) {
                var n;
                for (n = 0; n < s; n += 1) e[n].animation.setSpeed(t, i);
              }),
              (t.setDirection = function (t, i) {
                var n;
                for (n = 0; n < s; n += 1) e[n].animation.setDirection(t, i);
              }),
              (t.play = function (t) {
                var i;
                for (i = 0; i < s; i += 1) e[i].animation.play(t);
              }),
              (t.pause = function (t) {
                var i;
                for (i = 0; i < s; i += 1) e[i].animation.pause(t);
              }),
              (t.stop = function (t) {
                var i;
                for (i = 0; i < s; i += 1) e[i].animation.stop(t);
              }),
              (t.togglePause = function (t) {
                var i;
                for (i = 0; i < s; i += 1) e[i].animation.togglePause(t);
              }),
              (t.searchAnimations = function (t, e, i) {
                var s,
                  n = [].concat(
                    [].slice.call(document.getElementsByClassName('lottie')),
                    [].slice.call(document.getElementsByClassName('bodymovin')),
                  ),
                  a = n.length;
                for (s = 0; s < a; s += 1) i && n[s].setAttribute('data-bm-type', i), l(n[s], t);
                if (e && 0 === a) {
                  i || (i = 'svg');
                  var o = document.getElementsByTagName('body')[0];
                  o.innerText = '';
                  var h = createTag('div');
                  (h.style.width = '100%'),
                    (h.style.height = '100%'),
                    h.setAttribute('data-bm-type', i),
                    o.appendChild(h),
                    l(h, t);
                }
              }),
              (t.resize = function () {
                var t;
                for (t = 0; t < s; t += 1) e[t].animation.resize();
              }),
              (t.goToAndStop = function (t, i, n) {
                var a;
                for (a = 0; a < s; a += 1) e[a].animation.goToAndStop(t, i, n);
              }),
              (t.destroy = function (t) {
                var i;
                for (i = s - 1; i >= 0; i -= 1) e[i].animation.destroy(t);
              }),
              (t.freeze = function () {
                o = !0;
              }),
              (t.unfreeze = function () {
                (o = !1), m();
              }),
              (t.setVolume = function (t, i) {
                var n;
                for (n = 0; n < s; n += 1) e[n].animation.setVolume(t, i);
              }),
              (t.mute = function (t) {
                var i;
                for (i = 0; i < s; i += 1) e[i].animation.mute(t);
              }),
              (t.unmute = function (t) {
                var i;
                for (i = 0; i < s; i += 1) e[i].animation.unmute(t);
              }),
              (t.getRegisteredAnimations = function () {
                var t,
                  i = e.length,
                  s = [];
                for (t = 0; t < i; t += 1) s.push(e[t].animation);
                return s;
              }),
              t
            );
          })(),
          BezierFactory = (function () {
            var t = {
                getBezierEasing: function (t, i, s, n, a) {
                  var o = a || ('bez_' + t + '_' + i + '_' + s + '_' + n).replace(/\./g, 'p');
                  if (e[o]) return e[o];
                  var h = new p([t, i, s, n]);
                  return (e[o] = h), h;
                },
              },
              e = {},
              i = 0.1,
              s = 'function' == typeof Float32Array;
            function n(t, e) {
              return 1 - 3 * e + 3 * t;
            }
            function a(t, e) {
              return 3 * e - 6 * t;
            }
            function o(t) {
              return 3 * t;
            }
            function h(t, e, i) {
              return ((n(e, i) * t + a(e, i)) * t + o(e)) * t;
            }
            function l(t, e, i) {
              return 3 * n(e, i) * t * t + 2 * a(e, i) * t + o(e);
            }
            function p(t) {
              (this._p = t),
                (this._mSampleValues = s ? new Float32Array(11) : Array(11)),
                (this._precomputed = !1),
                (this.get = this.get.bind(this));
            }
            return (
              (p.prototype = {
                get: function (t) {
                  var e = this._p[0],
                    i = this._p[1],
                    s = this._p[2],
                    n = this._p[3];
                  return (
                    this._precomputed || this._precompute(),
                    e === i && s === n ? t : 0 === t ? 0 : 1 === t ? 1 : h(this._getTForX(t), i, n)
                  );
                },
                _precompute: function () {
                  var t = this._p[0],
                    e = this._p[1],
                    i = this._p[2],
                    s = this._p[3];
                  (this._precomputed = !0), (t === e && i === s) || this._calcSampleValues();
                },
                _calcSampleValues: function () {
                  for (var t = this._p[0], e = this._p[2], s = 0; s < 11; ++s) this._mSampleValues[s] = h(s * i, t, e);
                },
                _getTForX: function (t) {
                  for (
                    var e = this._p[0], s = this._p[2], n = this._mSampleValues, a = 0, o = 1;
                    10 !== o && n[o] <= t;
                    ++o
                  )
                    a += i;
                  var p = a + ((t - n[--o]) / (n[o + 1] - n[o])) * i,
                    f = l(p, e, s);
                  return f >= 0.001
                    ? (function (t, e, i, s) {
                        for (var n = 0; n < 4; ++n) {
                          var a = l(e, i, s);
                          if (0 === a) break;
                          e -= (h(e, i, s) - t) / a;
                        }
                        return e;
                      })(t, p, e, s)
                    : 0 === f
                    ? p
                    : (function (t, e, i, s, n) {
                        var a,
                          o,
                          l = 0;
                        do (a = h((o = e + (i - e) / 2), s, n) - t) > 0 ? (i = o) : (e = o);
                        while (Math.abs(a) > 1e-7 && ++l < 10);
                        return o;
                      })(t, a, a + i, e, s);
                },
              }),
              t
            );
          })(),
          pooling = {
            double: function (t) {
              return t.concat(createSizedArray(t.length));
            },
          },
          poolFactory = function (t, e, i) {
            var s = 0,
              n = t,
              a = createSizedArray(n);
            return {
              newElement: function () {
                return s ? a[(s -= 1)] : e();
              },
              release: function (t) {
                s === n && ((a = pooling.double(a)), (n *= 2)), i && i(t), (a[s] = t), (s += 1);
              },
            };
          },
          bezierLengthPool = poolFactory(8, function () {
            return {
              addedLength: 0,
              percents: createTypedArray('float32', getDefaultCurveSegments()),
              lengths: createTypedArray('float32', getDefaultCurveSegments()),
            };
          }),
          segmentsLengthPool = poolFactory(
            8,
            function () {
              return { lengths: [], totalLength: 0 };
            },
            function (t) {
              var e,
                i = t.lengths.length;
              for (e = 0; e < i; e += 1) bezierLengthPool.release(t.lengths[e]);
              t.lengths.length = 0;
            },
          );
        function bezFunction() {
          var t = Math;
          function e(t, e, i, s, n, a) {
            var o = t * s + e * n + i * a - n * s - a * t - i * e;
            return o > -0.001 && o < 0.001;
          }
          var i = function (t, e, i, s) {
            var n,
              a,
              o,
              h,
              l,
              p,
              f = getDefaultCurveSegments(),
              u = 0,
              c = [],
              d = [],
              m = bezierLengthPool.newElement();
            for (o = i.length, n = 0; n < f; n += 1) {
              for (l = n / (f - 1), p = 0, a = 0; a < o; a += 1)
                (h =
                  bmPow(1 - l, 3) * t[a] +
                  3 * bmPow(1 - l, 2) * l * i[a] +
                  3 * (1 - l) * bmPow(l, 2) * s[a] +
                  bmPow(l, 3) * e[a]),
                  (c[a] = h),
                  null !== d[a] && (p += bmPow(c[a] - d[a], 2)),
                  (d[a] = c[a]);
              p && (u += p = bmSqrt(p)), (m.percents[n] = l), (m.lengths[n] = u);
            }
            return (m.addedLength = u), m;
          };
          function s(t) {
            (this.segmentLength = 0), (this.points = Array(t));
          }
          function n(t, e) {
            (this.partialLength = t), (this.point = e);
          }
          var a,
            o =
              ((a = {}),
              function (t, i, o, h) {
                var l = (
                  t[0] +
                  '_' +
                  t[1] +
                  '_' +
                  i[0] +
                  '_' +
                  i[1] +
                  '_' +
                  o[0] +
                  '_' +
                  o[1] +
                  '_' +
                  h[0] +
                  '_' +
                  h[1]
                ).replace(/\./g, 'p');
                if (!a[l]) {
                  var p,
                    f,
                    u,
                    c,
                    d,
                    m,
                    $,
                    g = getDefaultCurveSegments(),
                    y = 0,
                    v = null;
                  2 === t.length &&
                    (t[0] !== i[0] || t[1] !== i[1]) &&
                    e(t[0], t[1], i[0], i[1], t[0] + o[0], t[1] + o[1]) &&
                    e(t[0], t[1], i[0], i[1], i[0] + h[0], i[1] + h[1]) &&
                    (g = 2);
                  var _ = new s(g);
                  for (u = o.length, p = 0; p < g; p += 1) {
                    for ($ = createSizedArray(u), d = p / (g - 1), m = 0, f = 0; f < u; f += 1)
                      (c =
                        bmPow(1 - d, 3) * t[f] +
                        3 * bmPow(1 - d, 2) * d * (t[f] + o[f]) +
                        3 * (1 - d) * bmPow(d, 2) * (i[f] + h[f]) +
                        bmPow(d, 3) * i[f]),
                        ($[f] = c),
                        null !== v && (m += bmPow($[f] - v[f], 2));
                    (y += m = bmSqrt(m)), (_.points[p] = new n(m, $)), (v = $);
                  }
                  (_.segmentLength = y), (a[l] = _);
                }
                return a[l];
              });
          function h(t, e) {
            var i = e.percents,
              s = e.lengths,
              n = i.length,
              a = bmFloor((n - 1) * t),
              o = t * e.addedLength,
              h = 0;
            if (a === n - 1 || 0 === a || o === s[a]) return i[a];
            for (var l = s[a] > o ? -1 : 1, p = !0; p; )
              if (
                (s[a] <= o && s[a + 1] > o ? ((h = (o - s[a]) / (s[a + 1] - s[a])), (p = !1)) : (a += l),
                a < 0 || a >= n - 1)
              ) {
                if (a === n - 1) return i[a];
                p = !1;
              }
            return i[a] + (i[a + 1] - i[a]) * h;
          }
          var l = createTypedArray('float32', 8);
          return {
            getSegmentsLength: function (t) {
              var e,
                s = segmentsLengthPool.newElement(),
                n = t.c,
                a = t.v,
                o = t.o,
                h = t.i,
                l = t._length,
                p = s.lengths,
                f = 0;
              for (e = 0; e < l - 1; e += 1) (p[e] = i(a[e], a[e + 1], o[e], h[e + 1])), (f += p[e].addedLength);
              return n && l && ((p[e] = i(a[e], a[0], o[e], h[0])), (f += p[e].addedLength)), (s.totalLength = f), s;
            },
            getNewSegment: function (e, i, s, n, a, o, p) {
              a < 0 ? (a = 0) : a > 1 && (a = 1);
              var f,
                u = h(a, p),
                c = h((o = o > 1 ? 1 : o), p),
                d = e.length,
                m = 1 - u,
                $ = 1 - c,
                g = m * m * m,
                y = u * m * m * 3,
                v = u * u * m * 3,
                _ = u * u * u,
                b = m * m * $,
                x = u * m * $ + m * u * $ + m * m * c,
                P = u * u * $ + m * u * c + u * m * c,
                k = u * u * c,
                w = m * $ * $,
                A = u * $ * $ + m * c * $ + m * $ * c,
                C = u * c * $ + m * c * c + u * $ * c,
                E = u * c * c,
                D = $ * $ * $,
                S = c * $ * $ + $ * c * $ + $ * $ * c,
                T = c * c * $ + $ * c * c + c * $ * c,
                F = c * c * c;
              for (f = 0; f < d; f += 1)
                (l[4 * f] = t.round(1e3 * (g * e[f] + y * s[f] + v * n[f] + _ * i[f])) / 1e3),
                  (l[4 * f + 1] = t.round(1e3 * (b * e[f] + x * s[f] + P * n[f] + k * i[f])) / 1e3),
                  (l[4 * f + 2] = t.round(1e3 * (w * e[f] + A * s[f] + C * n[f] + E * i[f])) / 1e3),
                  (l[4 * f + 3] = t.round(1e3 * (D * e[f] + S * s[f] + T * n[f] + F * i[f])) / 1e3);
              return l;
            },
            getPointInSegment: function (e, i, s, n, a, o) {
              var l = h(a, o),
                p = 1 - l;
              return [
                t.round(
                  1e3 *
                    (p * p * p * e[0] +
                      (l * p * p + p * l * p + p * p * l) * s[0] +
                      (l * l * p + p * l * l + l * p * l) * n[0] +
                      l * l * l * i[0]),
                ) / 1e3,
                t.round(
                  1e3 *
                    (p * p * p * e[1] +
                      (l * p * p + p * l * p + p * p * l) * s[1] +
                      (l * l * p + p * l * l + l * p * l) * n[1] +
                      l * l * l * i[1]),
                ) / 1e3,
              ];
            },
            buildBezierData: o,
            pointOnLine2D: e,
            pointOnLine3D: function (i, s, n, a, o, h, l, p, f) {
              if (0 === n && 0 === h && 0 === f) return e(i, s, a, o, l, p);
              var u,
                c = t.sqrt(t.pow(a - i, 2) + t.pow(o - s, 2) + t.pow(h - n, 2)),
                d = t.sqrt(t.pow(l - i, 2) + t.pow(p - s, 2) + t.pow(f - n, 2)),
                m = t.sqrt(t.pow(l - a, 2) + t.pow(p - o, 2) + t.pow(f - h, 2));
              return (
                (u = c > d ? (c > m ? c - d - m : m - d - c) : m > d ? m - d - c : d - c - m) > -0.0001 && u < 1e-4
              );
            },
          };
        }
        var bez = bezFunction(),
          PropertyFactory = (function () {
            var t = initialDefaultFrame,
              e = Math.abs;
            function i(t, e) {
              var i,
                n,
                a,
                o,
                h,
                l,
                p = this.offsetTime;
              'multidimensional' === this.propType && (l = createTypedArray('float32', this.pv.length));
              for (var f, u, c, d, m, $, g, y, v, _ = e.lastIndex, b = _, x = this.keyframes.length - 1, P = !0; P; ) {
                if (((f = this.keyframes[b]), (u = this.keyframes[b + 1]), b === x - 1 && t >= u.t - p)) {
                  f.h && (f = u), (_ = 0);
                  break;
                }
                if (u.t - p > t) {
                  _ = b;
                  break;
                }
                b < x - 1 ? (b += 1) : ((_ = 0), (P = !1));
              }
              c = this.keyframesMetadata[b] || {};
              var k,
                w,
                A,
                C,
                E,
                D,
                S,
                T,
                F,
                M,
                I = u.t - p,
                L = f.t - p;
              if (f.to) {
                c.bezierData || (c.bezierData = bez.buildBezierData(f.s, u.s || f.e, f.to, f.ti));
                var z = c.bezierData;
                if (t >= I || t < L) {
                  var B = t >= I ? z.points.length - 1 : 0;
                  for (m = z.points[B].point.length, d = 0; d < m; d += 1) l[d] = z.points[B].point[d];
                } else {
                  c.__fnct
                    ? (v = c.__fnct)
                    : ((v = BezierFactory.getBezierEasing(f.o.x, f.o.y, f.i.x, f.i.y, f.n).get), (c.__fnct = v)),
                    ($ = v((t - L) / (I - L)));
                  var R,
                    V = z.segmentLength * $,
                    O = e.lastFrame < t && e._lastKeyframeIndex === b ? e._lastAddedLength : 0;
                  for (
                    y = e.lastFrame < t && e._lastKeyframeIndex === b ? e._lastPoint : 0, P = !0, g = z.points.length;
                    P;

                  ) {
                    if (((O += z.points[y].partialLength), 0 === V || 0 === $ || y === z.points.length - 1)) {
                      for (m = z.points[y].point.length, d = 0; d < m; d += 1) l[d] = z.points[y].point[d];
                      break;
                    }
                    if (V >= O && V < O + z.points[y + 1].partialLength) {
                      for (
                        R = (V - O) / z.points[y + 1].partialLength, m = z.points[y].point.length, d = 0;
                        d < m;
                        d += 1
                      )
                        l[d] = z.points[y].point[d] + (z.points[y + 1].point[d] - z.points[y].point[d]) * R;
                      break;
                    }
                    y < g - 1 ? (y += 1) : (P = !1);
                  }
                  (e._lastPoint = y), (e._lastAddedLength = O - z.points[y].partialLength), (e._lastKeyframeIndex = b);
                }
              } else if (((x = f.s.length), (k = u.s || f.e), this.sh && 1 !== f.h)) {
                if (t >= I) (l[0] = k[0]), (l[1] = k[1]), (l[2] = k[2]);
                else if (t <= L) (l[0] = f.s[0]), (l[1] = f.s[1]), (l[2] = f.s[2]);
                else {
                  var N,
                    G,
                    q,
                    j,
                    H,
                    W,
                    U,
                    Y,
                    X,
                    K,
                    Z,
                    J,
                    Q,
                    tt,
                    te,
                    ti,
                    ts,
                    tr = s(f.s),
                    tn = s(k);
                  (w = l),
                    (C = (A =
                      ((N = tr),
                      (G = tn),
                      (q = (t - L) / (I - L)),
                      (X = []),
                      (K = N[0]),
                      (Z = N[1]),
                      (J = N[2]),
                      (Q = N[3]),
                      (tt = G[0]),
                      (te = G[1]),
                      (ti = G[2]),
                      (H = K * tt + Z * te + J * ti + Q * (ts = G[3])) < 0 &&
                        ((H = -H), (tt = -tt), (te = -te), (ti = -ti), (ts = -ts)),
                      1 - H > 1e-6
                        ? ((U = Math.sin((1 - q) * j) / (W = Math.sin((j = Math.acos(H))))), (Y = Math.sin(q * j) / W))
                        : ((U = 1 - q), (Y = q)),
                      (X[0] = U * K + Y * tt),
                      (X[1] = U * Z + Y * te),
                      (X[2] = U * J + Y * ti),
                      (X[3] = U * Q + Y * ts),
                      X))[0]),
                    (E = A[1]),
                    (D = A[2]),
                    (T = Math.atan2(2 * E * (S = A[3]) - 2 * C * D, 1 - 2 * E * E - 2 * D * D)),
                    (F = Math.asin(2 * C * E + 2 * D * S)),
                    (M = Math.atan2(2 * C * S - 2 * E * D, 1 - 2 * C * C - 2 * D * D)),
                    (w[0] = T / degToRads),
                    (w[1] = F / degToRads),
                    (w[2] = M / degToRads);
                }
              } else
                for (b = 0; b < x; b += 1)
                  1 !== f.h &&
                    (t >= I
                      ? ($ = 1)
                      : t < L
                      ? ($ = 0)
                      : (f.o.x.constructor === Array
                          ? (c.__fnct || (c.__fnct = []),
                            c.__fnct[b]
                              ? (v = c.__fnct[b])
                              : ((i = void 0 === f.o.x[b] ? f.o.x[0] : f.o.x[b]),
                                (n = void 0 === f.o.y[b] ? f.o.y[0] : f.o.y[b]),
                                (a = void 0 === f.i.x[b] ? f.i.x[0] : f.i.x[b]),
                                (o = void 0 === f.i.y[b] ? f.i.y[0] : f.i.y[b]),
                                (v = BezierFactory.getBezierEasing(i, n, a, o).get),
                                (c.__fnct[b] = v)))
                          : c.__fnct
                          ? (v = c.__fnct)
                          : ((i = f.o.x),
                            (n = f.o.y),
                            (a = f.i.x),
                            (o = f.i.y),
                            (v = BezierFactory.getBezierEasing(i, n, a, o).get),
                            (f.keyframeMetadata = v)),
                        ($ = v((t - L) / (I - L))))),
                    (k = u.s || f.e),
                    (h = 1 === f.h ? f.s[b] : f.s[b] + (k[b] - f.s[b]) * $),
                    'multidimensional' === this.propType ? (l[b] = h) : (l = h);
              return (e.lastIndex = _), l;
            }
            function s(t) {
              var e = t[0] * degToRads,
                i = t[1] * degToRads,
                s = t[2] * degToRads,
                n = Math.cos(e / 2),
                a = Math.cos(i / 2),
                o = Math.cos(s / 2),
                h = Math.sin(e / 2),
                l = Math.sin(i / 2),
                p = Math.sin(s / 2);
              return [h * l * o + n * a * p, h * a * o + n * l * p, n * l * o - h * a * p, n * a * o - h * l * p];
            }
            function n() {
              var e = this.comp.renderedFrame - this.offsetTime,
                i = this.keyframes[0].t - this.offsetTime,
                s = this.keyframes[this.keyframes.length - 1].t - this.offsetTime;
              if (
                !(
                  e === this._caching.lastFrame ||
                  (this._caching.lastFrame !== t &&
                    ((this._caching.lastFrame >= s && e >= s) || (this._caching.lastFrame < i && e < i)))
                )
              ) {
                this._caching.lastFrame >= e &&
                  ((this._caching._lastKeyframeIndex = -1), (this._caching.lastIndex = 0));
                var n = this.interpolateValue(e, this._caching);
                this.pv = n;
              }
              return (this._caching.lastFrame = e), this.pv;
            }
            function a(t) {
              var i;
              if ('unidimensional' === this.propType)
                (i = t * this.mult), e(this.v - i) > 1e-5 && ((this.v = i), (this._mdf = !0));
              else
                for (var s = 0, n = this.v.length; s < n; )
                  (i = t[s] * this.mult), e(this.v[s] - i) > 1e-5 && ((this.v[s] = i), (this._mdf = !0)), (s += 1);
            }
            function o() {
              if (this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) {
                if (this.lock) this.setVValue(this.pv);
                else {
                  (this.lock = !0), (this._mdf = this._isFirstFrame);
                  var t,
                    e = this.effectsSequence.length,
                    i = this.kf ? this.pv : this.data.k;
                  for (t = 0; t < e; t += 1) i = this.effectsSequence[t](i);
                  this.setVValue(i),
                    (this._isFirstFrame = !1),
                    (this.lock = !1),
                    (this.frameId = this.elem.globalData.frameId);
                }
              }
            }
            function h(t) {
              this.effectsSequence.push(t), this.container.addDynamicProperty(this);
            }
            function l(t, e, i, s) {
              (this.propType = 'unidimensional'),
                (this.mult = i || 1),
                (this.data = e),
                (this.v = i ? e.k * i : e.k),
                (this.pv = e.k),
                (this._mdf = !1),
                (this.elem = t),
                (this.container = s),
                (this.comp = t.comp),
                (this.k = !1),
                (this.kf = !1),
                (this.vel = 0),
                (this.effectsSequence = []),
                (this._isFirstFrame = !0),
                (this.getValue = o),
                (this.setVValue = a),
                (this.addEffect = h);
            }
            function p(t, e, i, s) {
              (this.propType = 'multidimensional'),
                (this.mult = i || 1),
                (this.data = e),
                (this._mdf = !1),
                (this.elem = t),
                (this.container = s),
                (this.comp = t.comp),
                (this.k = !1),
                (this.kf = !1),
                (this.frameId = -1);
              var n,
                l = e.k.length;
              for (
                this.v = createTypedArray('float32', l),
                  this.pv = createTypedArray('float32', l),
                  this.vel = createTypedArray('float32', l),
                  n = 0;
                n < l;
                n += 1
              )
                (this.v[n] = e.k[n] * this.mult), (this.pv[n] = e.k[n]);
              (this._isFirstFrame = !0),
                (this.effectsSequence = []),
                (this.getValue = o),
                (this.setVValue = a),
                (this.addEffect = h);
            }
            function f(e, s, l, p) {
              (this.propType = 'unidimensional'),
                (this.keyframes = s.k),
                (this.keyframesMetadata = []),
                (this.offsetTime = e.data.st),
                (this.frameId = -1),
                (this._caching = { lastFrame: t, lastIndex: 0, value: 0, _lastKeyframeIndex: -1 }),
                (this.k = !0),
                (this.kf = !0),
                (this.data = s),
                (this.mult = l || 1),
                (this.elem = e),
                (this.container = p),
                (this.comp = e.comp),
                (this.v = t),
                (this.pv = t),
                (this._isFirstFrame = !0),
                (this.getValue = o),
                (this.setVValue = a),
                (this.interpolateValue = i),
                (this.effectsSequence = [n.bind(this)]),
                (this.addEffect = h);
            }
            function u(e, s, l, p) {
              this.propType = 'multidimensional';
              var f,
                u,
                c,
                d,
                m,
                $ = s.k.length;
              for (f = 0; f < $ - 1; f += 1)
                s.k[f].to &&
                  s.k[f].s &&
                  s.k[f + 1] &&
                  s.k[f + 1].s &&
                  ((u = s.k[f].s),
                  (c = s.k[f + 1].s),
                  (d = s.k[f].to),
                  (m = s.k[f].ti),
                  ((2 === u.length &&
                    (u[0] !== c[0] || u[1] !== c[1]) &&
                    bez.pointOnLine2D(u[0], u[1], c[0], c[1], u[0] + d[0], u[1] + d[1]) &&
                    bez.pointOnLine2D(u[0], u[1], c[0], c[1], c[0] + m[0], c[1] + m[1])) ||
                    (3 === u.length &&
                      (u[0] !== c[0] || u[1] !== c[1] || u[2] !== c[2]) &&
                      bez.pointOnLine3D(u[0], u[1], u[2], c[0], c[1], c[2], u[0] + d[0], u[1] + d[1], u[2] + d[2]) &&
                      bez.pointOnLine3D(u[0], u[1], u[2], c[0], c[1], c[2], c[0] + m[0], c[1] + m[1], c[2] + m[2]))) &&
                    ((s.k[f].to = null), (s.k[f].ti = null)),
                  u[0] === c[0] &&
                    u[1] === c[1] &&
                    0 === d[0] &&
                    0 === d[1] &&
                    0 === m[0] &&
                    0 === m[1] &&
                    (2 === u.length || (u[2] === c[2] && 0 === d[2] && 0 === m[2])) &&
                    ((s.k[f].to = null), (s.k[f].ti = null)));
              (this.effectsSequence = [n.bind(this)]),
                (this.data = s),
                (this.keyframes = s.k),
                (this.keyframesMetadata = []),
                (this.offsetTime = e.data.st),
                (this.k = !0),
                (this.kf = !0),
                (this._isFirstFrame = !0),
                (this.mult = l || 1),
                (this.elem = e),
                (this.container = p),
                (this.comp = e.comp),
                (this.getValue = o),
                (this.setVValue = a),
                (this.interpolateValue = i),
                (this.frameId = -1);
              var g = s.k[0].s.length;
              for (
                this.v = createTypedArray('float32', g), this.pv = createTypedArray('float32', g), f = 0;
                f < g;
                f += 1
              )
                (this.v[f] = t), (this.pv[f] = t);
              (this._caching = { lastFrame: t, lastIndex: 0, value: createTypedArray('float32', g) }),
                (this.addEffect = h);
            }
            return {
              getProp: function (t, e, i, s, n) {
                var a;
                if (e.k.length) {
                  if ('number' == typeof e.k[0]) a = new p(t, e, s, n);
                  else
                    switch (i) {
                      case 0:
                        a = new f(t, e, s, n);
                        break;
                      case 1:
                        a = new u(t, e, s, n);
                    }
                } else a = new l(t, e, s, n);
                return a.effectsSequence.length && n.addDynamicProperty(a), a;
              },
            };
          })();
        function DynamicPropertyContainer() {}
        DynamicPropertyContainer.prototype = {
          addDynamicProperty: function (t) {
            -1 === this.dynamicProperties.indexOf(t) &&
              (this.dynamicProperties.push(t), this.container.addDynamicProperty(this), (this._isAnimated = !0));
          },
          iterateDynamicProperties: function () {
            this._mdf = !1;
            var t,
              e = this.dynamicProperties.length;
            for (t = 0; t < e; t += 1)
              this.dynamicProperties[t].getValue(), this.dynamicProperties[t]._mdf && (this._mdf = !0);
          },
          initDynamicPropertyContainer: function (t) {
            (this.container = t), (this.dynamicProperties = []), (this._mdf = !1), (this._isAnimated = !1);
          },
        };
        var pointPool = poolFactory(8, function () {
          return createTypedArray('float32', 2);
        });
        function ShapePath() {
          (this.c = !1),
            (this._length = 0),
            (this._maxLength = 8),
            (this.v = createSizedArray(this._maxLength)),
            (this.o = createSizedArray(this._maxLength)),
            (this.i = createSizedArray(this._maxLength));
        }
        (ShapePath.prototype.setPathData = function (t, e) {
          (this.c = t), this.setLength(e);
          for (var i = 0; i < e; )
            (this.v[i] = pointPool.newElement()),
              (this.o[i] = pointPool.newElement()),
              (this.i[i] = pointPool.newElement()),
              (i += 1);
        }),
          (ShapePath.prototype.setLength = function (t) {
            for (; this._maxLength < t; ) this.doubleArrayLength();
            this._length = t;
          }),
          (ShapePath.prototype.doubleArrayLength = function () {
            (this.v = this.v.concat(createSizedArray(this._maxLength))),
              (this.i = this.i.concat(createSizedArray(this._maxLength))),
              (this.o = this.o.concat(createSizedArray(this._maxLength))),
              (this._maxLength *= 2);
          }),
          (ShapePath.prototype.setXYAt = function (t, e, i, s, n) {
            var a;
            switch (
              ((this._length = Math.max(this._length, s + 1)),
              this._length >= this._maxLength && this.doubleArrayLength(),
              i)
            ) {
              case 'v':
                a = this.v;
                break;
              case 'i':
                a = this.i;
                break;
              case 'o':
                a = this.o;
                break;
              default:
                a = [];
            }
            (a[s] && (!a[s] || n)) || (a[s] = pointPool.newElement()), (a[s][0] = t), (a[s][1] = e);
          }),
          (ShapePath.prototype.setTripleAt = function (t, e, i, s, n, a, o, h) {
            this.setXYAt(t, e, 'v', o, h), this.setXYAt(i, s, 'o', o, h), this.setXYAt(n, a, 'i', o, h);
          }),
          (ShapePath.prototype.reverse = function () {
            var t = new ShapePath();
            t.setPathData(this.c, this._length);
            var e = this.v,
              i = this.o,
              s = this.i,
              n = 0;
            this.c && (t.setTripleAt(e[0][0], e[0][1], s[0][0], s[0][1], i[0][0], i[0][1], 0, !1), (n = 1));
            var a,
              o = this._length - 1,
              h = this._length;
            for (a = n; a < h; a += 1)
              t.setTripleAt(e[o][0], e[o][1], s[o][0], s[o][1], i[o][0], i[o][1], a, !1), (o -= 1);
            return t;
          }),
          (ShapePath.prototype.length = function () {
            return this._length;
          });
        var factory,
          shapePool =
            (((factory = poolFactory(
              4,
              function () {
                return new ShapePath();
              },
              function (t) {
                var e,
                  i = t._length;
                for (e = 0; e < i; e += 1)
                  pointPool.release(t.v[e]),
                    pointPool.release(t.i[e]),
                    pointPool.release(t.o[e]),
                    (t.v[e] = null),
                    (t.i[e] = null),
                    (t.o[e] = null);
                (t._length = 0), (t.c = !1);
              },
            )).clone = function (t) {
              var e,
                i = factory.newElement(),
                s = void 0 === t._length ? t.v.length : t._length;
              for (i.setLength(s), i.c = t.c, e = 0; e < s; e += 1)
                i.setTripleAt(t.v[e][0], t.v[e][1], t.o[e][0], t.o[e][1], t.i[e][0], t.i[e][1], e);
              return i;
            }),
            factory);
        function ShapeCollection() {
          (this._length = 0), (this._maxLength = 4), (this.shapes = createSizedArray(this._maxLength));
        }
        (ShapeCollection.prototype.addShape = function (t) {
          this._length === this._maxLength &&
            ((this.shapes = this.shapes.concat(createSizedArray(this._maxLength))), (this._maxLength *= 2)),
            (this.shapes[this._length] = t),
            (this._length += 1);
        }),
          (ShapeCollection.prototype.releaseShapes = function () {
            var t;
            for (t = 0; t < this._length; t += 1) shapePool.release(this.shapes[t]);
            this._length = 0;
          });
        var ob,
          _length,
          _maxLength,
          pool,
          shapeCollectionPool =
            ((ob = {
              newShapeCollection: function () {
                return _length ? pool[(_length -= 1)] : new ShapeCollection();
              },
              release: function (t) {
                var e,
                  i = t._length;
                for (e = 0; e < i; e += 1) shapePool.release(t.shapes[e]);
                (t._length = 0),
                  _length === _maxLength && ((pool = pooling.double(pool)), (_maxLength *= 2)),
                  (pool[_length] = t),
                  (_length += 1);
              },
            }),
            (_length = 0),
            (pool = createSizedArray((_maxLength = 4))),
            ob),
          ShapePropertyFactory = (function () {
            var t = -999999;
            function e(t, e, i) {
              var s,
                n,
                a,
                o,
                h,
                l,
                p,
                f,
                u,
                c = i.lastIndex,
                d = this.keyframes;
              if (t < d[0].t - this.offsetTime) (s = d[0].s[0]), (a = !0), (c = 0);
              else if (t >= d[d.length - 1].t - this.offsetTime)
                (s = d[d.length - 1].s ? d[d.length - 1].s[0] : d[d.length - 2].e[0]), (a = !0);
              else {
                for (
                  var m, $, g, y, v = c, _ = d.length - 1, b = !0;
                  b && (($ = d[v]), !((g = d[v + 1]).t - this.offsetTime > t));

                )
                  v < _ - 1 ? (v += 1) : (b = !1);
                (y = this.keyframesMetadata[v] || {}),
                  (c = v),
                  (a = 1 === $.h) ||
                    (t >= g.t - this.offsetTime
                      ? (f = 1)
                      : t < $.t - this.offsetTime
                      ? (f = 0)
                      : (y.__fnct
                          ? (m = y.__fnct)
                          : ((m = BezierFactory.getBezierEasing($.o.x, $.o.y, $.i.x, $.i.y).get), (y.__fnct = m)),
                        (f = m((t - ($.t - this.offsetTime)) / (g.t - this.offsetTime - ($.t - this.offsetTime))))),
                    (n = g.s ? g.s[0] : $.e[0])),
                  (s = $.s[0]);
              }
              for (l = e._length, p = s.i[0].length, i.lastIndex = c, o = 0; o < l; o += 1)
                for (h = 0; h < p; h += 1)
                  (u = a ? s.i[o][h] : s.i[o][h] + (n.i[o][h] - s.i[o][h]) * f),
                    (e.i[o][h] = u),
                    (u = a ? s.o[o][h] : s.o[o][h] + (n.o[o][h] - s.o[o][h]) * f),
                    (e.o[o][h] = u),
                    (u = a ? s.v[o][h] : s.v[o][h] + (n.v[o][h] - s.v[o][h]) * f),
                    (e.v[o][h] = u);
            }
            function i() {
              var e = this.comp.renderedFrame - this.offsetTime,
                i = this.keyframes[0].t - this.offsetTime,
                s = this.keyframes[this.keyframes.length - 1].t - this.offsetTime,
                n = this._caching.lastFrame;
              return (
                (n !== t && ((n < i && e < i) || (n > s && e > s))) ||
                  ((this._caching.lastIndex = n < e ? this._caching.lastIndex : 0),
                  this.interpolateShape(e, this.pv, this._caching)),
                (this._caching.lastFrame = e),
                this.pv
              );
            }
            function s() {
              this.paths = this.localShapeCollection;
            }
            function n(t) {
              (function (t, e) {
                if (t._length !== e._length || t.c !== e.c) return !1;
                var i,
                  s = t._length;
                for (i = 0; i < s; i += 1)
                  if (
                    t.v[i][0] !== e.v[i][0] ||
                    t.v[i][1] !== e.v[i][1] ||
                    t.o[i][0] !== e.o[i][0] ||
                    t.o[i][1] !== e.o[i][1] ||
                    t.i[i][0] !== e.i[i][0] ||
                    t.i[i][1] !== e.i[i][1]
                  )
                    return !1;
                return !0;
              })(this.v, t) ||
                ((this.v = shapePool.clone(t)),
                this.localShapeCollection.releaseShapes(),
                this.localShapeCollection.addShape(this.v),
                (this._mdf = !0),
                (this.paths = this.localShapeCollection));
            }
            function a() {
              if (this.elem.globalData.frameId !== this.frameId) {
                if (this.effectsSequence.length) {
                  if (this.lock) this.setVValue(this.pv);
                  else {
                    (this.lock = !0),
                      (this._mdf = !1),
                      (t = this.kf ? this.pv : this.data.ks ? this.data.ks.k : this.data.pt.k);
                    var t,
                      e,
                      i = this.effectsSequence.length;
                    for (e = 0; e < i; e += 1) t = this.effectsSequence[e](t);
                    this.setVValue(t), (this.lock = !1), (this.frameId = this.elem.globalData.frameId);
                  }
                } else this._mdf = !1;
              }
            }
            function o(t, e, i) {
              (this.propType = 'shape'),
                (this.comp = t.comp),
                (this.container = t),
                (this.elem = t),
                (this.data = e),
                (this.k = !1),
                (this.kf = !1),
                (this._mdf = !1);
              var n = 3 === i ? e.pt.k : e.ks.k;
              (this.v = shapePool.clone(n)),
                (this.pv = shapePool.clone(this.v)),
                (this.localShapeCollection = shapeCollectionPool.newShapeCollection()),
                (this.paths = this.localShapeCollection),
                this.paths.addShape(this.v),
                (this.reset = s),
                (this.effectsSequence = []);
            }
            function h(t) {
              this.effectsSequence.push(t), this.container.addDynamicProperty(this);
            }
            function l(e, n, a) {
              (this.propType = 'shape'),
                (this.comp = e.comp),
                (this.elem = e),
                (this.container = e),
                (this.offsetTime = e.data.st),
                (this.keyframes = 3 === a ? n.pt.k : n.ks.k),
                (this.keyframesMetadata = []),
                (this.k = !0),
                (this.kf = !0);
              var o = this.keyframes[0].s[0].i.length;
              (this.v = shapePool.newElement()),
                this.v.setPathData(this.keyframes[0].s[0].c, o),
                (this.pv = shapePool.clone(this.v)),
                (this.localShapeCollection = shapeCollectionPool.newShapeCollection()),
                (this.paths = this.localShapeCollection),
                this.paths.addShape(this.v),
                (this.lastFrame = t),
                (this.reset = s),
                (this._caching = { lastFrame: t, lastIndex: 0 }),
                (this.effectsSequence = [i.bind(this)]);
            }
            (o.prototype.interpolateShape = e),
              (o.prototype.getValue = a),
              (o.prototype.setVValue = n),
              (o.prototype.addEffect = h),
              (l.prototype.getValue = a),
              (l.prototype.interpolateShape = e),
              (l.prototype.setVValue = n),
              (l.prototype.addEffect = h);
            var p = (function () {
                var t = roundCorner;
                function e(t, e) {
                  (this.v = shapePool.newElement()),
                    this.v.setPathData(!0, 4),
                    (this.localShapeCollection = shapeCollectionPool.newShapeCollection()),
                    (this.paths = this.localShapeCollection),
                    this.localShapeCollection.addShape(this.v),
                    (this.d = e.d),
                    (this.elem = t),
                    (this.comp = t.comp),
                    (this.frameId = -1),
                    this.initDynamicPropertyContainer(t),
                    (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                    (this.s = PropertyFactory.getProp(t, e.s, 1, 0, this)),
                    this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertEllToPath());
                }
                return (
                  (e.prototype = {
                    reset: s,
                    getValue: function () {
                      this.elem.globalData.frameId !== this.frameId &&
                        ((this.frameId = this.elem.globalData.frameId),
                        this.iterateDynamicProperties(),
                        this._mdf && this.convertEllToPath());
                    },
                    convertEllToPath: function () {
                      var e = this.p.v[0],
                        i = this.p.v[1],
                        s = this.s.v[0] / 2,
                        n = this.s.v[1] / 2,
                        a = 3 !== this.d,
                        o = this.v;
                      (o.v[0][0] = e),
                        (o.v[0][1] = i - n),
                        (o.v[1][0] = a ? e + s : e - s),
                        (o.v[1][1] = i),
                        (o.v[2][0] = e),
                        (o.v[2][1] = i + n),
                        (o.v[3][0] = a ? e - s : e + s),
                        (o.v[3][1] = i),
                        (o.i[0][0] = a ? e - s * t : e + s * t),
                        (o.i[0][1] = i - n),
                        (o.i[1][0] = a ? e + s : e - s),
                        (o.i[1][1] = i - n * t),
                        (o.i[2][0] = a ? e + s * t : e - s * t),
                        (o.i[2][1] = i + n),
                        (o.i[3][0] = a ? e - s : e + s),
                        (o.i[3][1] = i + n * t),
                        (o.o[0][0] = a ? e + s * t : e - s * t),
                        (o.o[0][1] = i - n),
                        (o.o[1][0] = a ? e + s : e - s),
                        (o.o[1][1] = i + n * t),
                        (o.o[2][0] = a ? e - s * t : e + s * t),
                        (o.o[2][1] = i + n),
                        (o.o[3][0] = a ? e - s : e + s),
                        (o.o[3][1] = i - n * t);
                    },
                  }),
                  extendPrototype([DynamicPropertyContainer], e),
                  e
                );
              })(),
              f = (function () {
                function t(t, e) {
                  (this.v = shapePool.newElement()),
                    this.v.setPathData(!0, 0),
                    (this.elem = t),
                    (this.comp = t.comp),
                    (this.data = e),
                    (this.frameId = -1),
                    (this.d = e.d),
                    this.initDynamicPropertyContainer(t),
                    1 === e.sy
                      ? ((this.ir = PropertyFactory.getProp(t, e.ir, 0, 0, this)),
                        (this.is = PropertyFactory.getProp(t, e.is, 0, 0.01, this)),
                        (this.convertToPath = this.convertStarToPath))
                      : (this.convertToPath = this.convertPolygonToPath),
                    (this.pt = PropertyFactory.getProp(t, e.pt, 0, 0, this)),
                    (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                    (this.r = PropertyFactory.getProp(t, e.r, 0, degToRads, this)),
                    (this.or = PropertyFactory.getProp(t, e.or, 0, 0, this)),
                    (this.os = PropertyFactory.getProp(t, e.os, 0, 0.01, this)),
                    (this.localShapeCollection = shapeCollectionPool.newShapeCollection()),
                    this.localShapeCollection.addShape(this.v),
                    (this.paths = this.localShapeCollection),
                    this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertToPath());
                }
                return (
                  (t.prototype = {
                    reset: s,
                    getValue: function () {
                      this.elem.globalData.frameId !== this.frameId &&
                        ((this.frameId = this.elem.globalData.frameId),
                        this.iterateDynamicProperties(),
                        this._mdf && this.convertToPath());
                    },
                    convertStarToPath: function () {
                      var t,
                        e,
                        i,
                        s,
                        n = 2 * Math.floor(this.pt.v),
                        a = (2 * Math.PI) / n,
                        o = !0,
                        h = this.or.v,
                        l = this.ir.v,
                        p = this.os.v,
                        f = this.is.v,
                        u = (2 * Math.PI * h) / (2 * n),
                        c = (2 * Math.PI * l) / (2 * n),
                        d = -Math.PI / 2;
                      d += this.r.v;
                      var m = 3 === this.data.d ? -1 : 1;
                      for (this.v._length = 0, t = 0; t < n; t += 1) {
                        (i = o ? p : f), (s = o ? u : c);
                        var $ = (e = o ? h : l) * Math.cos(d),
                          g = e * Math.sin(d),
                          y = 0 === $ && 0 === g ? 0 : g / Math.sqrt($ * $ + g * g),
                          v = 0 === $ && 0 === g ? 0 : -$ / Math.sqrt($ * $ + g * g);
                        ($ += +this.p.v[0]),
                          (g += +this.p.v[1]),
                          this.v.setTripleAt(
                            $,
                            g,
                            $ - y * s * i * m,
                            g - v * s * i * m,
                            $ + y * s * i * m,
                            g + v * s * i * m,
                            t,
                            !0,
                          ),
                          (o = !o),
                          (d += a * m);
                      }
                    },
                    convertPolygonToPath: function () {
                      var t,
                        e = Math.floor(this.pt.v),
                        i = (2 * Math.PI) / e,
                        s = this.or.v,
                        n = this.os.v,
                        a = (2 * Math.PI * s) / (4 * e),
                        o = -(0.5 * Math.PI),
                        h = 3 === this.data.d ? -1 : 1;
                      for (o += this.r.v, this.v._length = 0, t = 0; t < e; t += 1) {
                        var l = s * Math.cos(o),
                          p = s * Math.sin(o),
                          f = 0 === l && 0 === p ? 0 : p / Math.sqrt(l * l + p * p),
                          u = 0 === l && 0 === p ? 0 : -l / Math.sqrt(l * l + p * p);
                        (l += +this.p.v[0]),
                          (p += +this.p.v[1]),
                          this.v.setTripleAt(
                            l,
                            p,
                            l - f * a * n * h,
                            p - u * a * n * h,
                            l + f * a * n * h,
                            p + u * a * n * h,
                            t,
                            !0,
                          ),
                          (o += i * h);
                      }
                      (this.paths.length = 0), (this.paths[0] = this.v);
                    },
                  }),
                  extendPrototype([DynamicPropertyContainer], t),
                  t
                );
              })(),
              u = (function () {
                function t(t, e) {
                  (this.v = shapePool.newElement()),
                    (this.v.c = !0),
                    (this.localShapeCollection = shapeCollectionPool.newShapeCollection()),
                    this.localShapeCollection.addShape(this.v),
                    (this.paths = this.localShapeCollection),
                    (this.elem = t),
                    (this.comp = t.comp),
                    (this.frameId = -1),
                    (this.d = e.d),
                    this.initDynamicPropertyContainer(t),
                    (this.p = PropertyFactory.getProp(t, e.p, 1, 0, this)),
                    (this.s = PropertyFactory.getProp(t, e.s, 1, 0, this)),
                    (this.r = PropertyFactory.getProp(t, e.r, 0, 0, this)),
                    this.dynamicProperties.length ? (this.k = !0) : ((this.k = !1), this.convertRectToPath());
                }
                return (
                  (t.prototype = {
                    convertRectToPath: function () {
                      var t = this.p.v[0],
                        e = this.p.v[1],
                        i = this.s.v[0] / 2,
                        s = this.s.v[1] / 2,
                        n = bmMin(i, s, this.r.v),
                        a = n * (1 - roundCorner);
                      (this.v._length = 0),
                        2 === this.d || 1 === this.d
                          ? (this.v.setTripleAt(t + i, e - s + n, t + i, e - s + n, t + i, e - s + a, 0, !0),
                            this.v.setTripleAt(t + i, e + s - n, t + i, e + s - a, t + i, e + s - n, 1, !0),
                            0 !== n
                              ? (this.v.setTripleAt(t + i - n, e + s, t + i - n, e + s, t + i - a, e + s, 2, !0),
                                this.v.setTripleAt(t - i + n, e + s, t - i + a, e + s, t - i + n, e + s, 3, !0),
                                this.v.setTripleAt(t - i, e + s - n, t - i, e + s - n, t - i, e + s - a, 4, !0),
                                this.v.setTripleAt(t - i, e - s + n, t - i, e - s + a, t - i, e - s + n, 5, !0),
                                this.v.setTripleAt(t - i + n, e - s, t - i + n, e - s, t - i + a, e - s, 6, !0),
                                this.v.setTripleAt(t + i - n, e - s, t + i - a, e - s, t + i - n, e - s, 7, !0))
                              : (this.v.setTripleAt(t - i, e + s, t - i + a, e + s, t - i, e + s, 2),
                                this.v.setTripleAt(t - i, e - s, t - i, e - s + a, t - i, e - s, 3)))
                          : (this.v.setTripleAt(t + i, e - s + n, t + i, e - s + a, t + i, e - s + n, 0, !0),
                            0 !== n
                              ? (this.v.setTripleAt(t + i - n, e - s, t + i - n, e - s, t + i - a, e - s, 1, !0),
                                this.v.setTripleAt(t - i + n, e - s, t - i + a, e - s, t - i + n, e - s, 2, !0),
                                this.v.setTripleAt(t - i, e - s + n, t - i, e - s + n, t - i, e - s + a, 3, !0),
                                this.v.setTripleAt(t - i, e + s - n, t - i, e + s - a, t - i, e + s - n, 4, !0),
                                this.v.setTripleAt(t - i + n, e + s, t - i + n, e + s, t - i + a, e + s, 5, !0),
                                this.v.setTripleAt(t + i - n, e + s, t + i - a, e + s, t + i - n, e + s, 6, !0),
                                this.v.setTripleAt(t + i, e + s - n, t + i, e + s - n, t + i, e + s - a, 7, !0))
                              : (this.v.setTripleAt(t - i, e - s, t - i + a, e - s, t - i, e - s, 1, !0),
                                this.v.setTripleAt(t - i, e + s, t - i, e + s - a, t - i, e + s, 2, !0),
                                this.v.setTripleAt(t + i, e + s, t + i - a, e + s, t + i, e + s, 3, !0)));
                    },
                    getValue: function () {
                      this.elem.globalData.frameId !== this.frameId &&
                        ((this.frameId = this.elem.globalData.frameId),
                        this.iterateDynamicProperties(),
                        this._mdf && this.convertRectToPath());
                    },
                    reset: s,
                  }),
                  extendPrototype([DynamicPropertyContainer], t),
                  t
                );
              })();
            return {
              getShapeProp: function (t, e, i) {
                var s;
                return (
                  3 === i || 4 === i
                    ? (s = (3 === i ? e.pt : e.ks).k.length ? new l(t, e, i) : new o(t, e, i))
                    : 5 === i
                    ? (s = new u(t, e))
                    : 6 === i
                    ? (s = new p(t, e))
                    : 7 === i && (s = new f(t, e)),
                  s.k && t.addDynamicProperty(s),
                  s
                );
              },
              getConstructorFunction: function () {
                return o;
              },
              getKeyframedConstructorFunction: function () {
                return l;
              },
            };
          })(),
          Matrix = (function () {
            var t = Math.cos,
              e = Math.sin,
              i = Math.tan,
              s = Math.round;
            function n() {
              return (
                (this.props[0] = 1),
                (this.props[1] = 0),
                (this.props[2] = 0),
                (this.props[3] = 0),
                (this.props[4] = 0),
                (this.props[5] = 1),
                (this.props[6] = 0),
                (this.props[7] = 0),
                (this.props[8] = 0),
                (this.props[9] = 0),
                (this.props[10] = 1),
                (this.props[11] = 0),
                (this.props[12] = 0),
                (this.props[13] = 0),
                (this.props[14] = 0),
                (this.props[15] = 1),
                this
              );
            }
            function a(i) {
              if (0 === i) return this;
              var s = t(i),
                n = e(i);
              return this._t(s, -n, 0, 0, n, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            }
            function o(i) {
              if (0 === i) return this;
              var s = t(i),
                n = e(i);
              return this._t(1, 0, 0, 0, 0, s, -n, 0, 0, n, s, 0, 0, 0, 0, 1);
            }
            function h(i) {
              if (0 === i) return this;
              var s = t(i),
                n = e(i);
              return this._t(s, 0, n, 0, 0, 1, 0, 0, -n, 0, s, 0, 0, 0, 0, 1);
            }
            function l(i) {
              if (0 === i) return this;
              var s = t(i),
                n = e(i);
              return this._t(s, -n, 0, 0, n, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            }
            function p(t, e) {
              return this._t(1, e, t, 1, 0, 0);
            }
            function f(t, e) {
              return this.shear(i(t), i(e));
            }
            function u(s, n) {
              var a = t(n),
                o = e(n);
              return this._t(a, o, 0, 0, -o, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                ._t(1, 0, 0, 0, i(s), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
                ._t(a, -o, 0, 0, o, a, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
            }
            function c(t, e, i) {
              return (
                i || 0 === i || (i = 1),
                1 === t && 1 === e && 1 === i ? this : this._t(t, 0, 0, 0, 0, e, 0, 0, 0, 0, i, 0, 0, 0, 0, 1)
              );
            }
            function d(t, e, i, s, n, a, o, h, l, p, f, u, c, d, m, $) {
              return (
                (this.props[0] = t),
                (this.props[1] = e),
                (this.props[2] = i),
                (this.props[3] = s),
                (this.props[4] = n),
                (this.props[5] = a),
                (this.props[6] = o),
                (this.props[7] = h),
                (this.props[8] = l),
                (this.props[9] = p),
                (this.props[10] = f),
                (this.props[11] = u),
                (this.props[12] = c),
                (this.props[13] = d),
                (this.props[14] = m),
                (this.props[15] = $),
                this
              );
            }
            function m(t, e, i) {
              return (
                (i = i || 0),
                0 !== t || 0 !== e || 0 !== i ? this._t(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, i, 1) : this
              );
            }
            function $(t, e, i, s, n, a, o, h, l, p, f, u, c, d, m, $) {
              var g = this.props;
              if (
                1 === t &&
                0 === e &&
                0 === i &&
                0 === s &&
                0 === n &&
                1 === a &&
                0 === o &&
                0 === h &&
                0 === l &&
                0 === p &&
                1 === f &&
                0 === u
              )
                return (
                  (g[12] = g[12] * t + g[15] * c),
                  (g[13] = g[13] * a + g[15] * d),
                  (g[14] = g[14] * f + g[15] * m),
                  (g[15] *= $),
                  (this._identityCalculated = !1),
                  this
                );
              var y = g[0],
                v = g[1],
                _ = g[2],
                b = g[3],
                x = g[4],
                P = g[5],
                k = g[6],
                w = g[7],
                A = g[8],
                C = g[9],
                E = g[10],
                D = g[11],
                S = g[12],
                T = g[13],
                F = g[14],
                M = g[15];
              return (
                (g[0] = y * t + v * n + _ * l + b * c),
                (g[1] = y * e + v * a + _ * p + b * d),
                (g[2] = y * i + v * o + _ * f + b * m),
                (g[3] = y * s + v * h + _ * u + b * $),
                (g[4] = x * t + P * n + k * l + w * c),
                (g[5] = x * e + P * a + k * p + w * d),
                (g[6] = x * i + P * o + k * f + w * m),
                (g[7] = x * s + P * h + k * u + w * $),
                (g[8] = A * t + C * n + E * l + D * c),
                (g[9] = A * e + C * a + E * p + D * d),
                (g[10] = A * i + C * o + E * f + D * m),
                (g[11] = A * s + C * h + E * u + D * $),
                (g[12] = S * t + T * n + F * l + M * c),
                (g[13] = S * e + T * a + F * p + M * d),
                (g[14] = S * i + T * o + F * f + M * m),
                (g[15] = S * s + T * h + F * u + M * $),
                (this._identityCalculated = !1),
                this
              );
            }
            function g() {
              return (
                this._identityCalculated ||
                  ((this._identity = !(
                    1 !== this.props[0] ||
                    0 !== this.props[1] ||
                    0 !== this.props[2] ||
                    0 !== this.props[3] ||
                    0 !== this.props[4] ||
                    1 !== this.props[5] ||
                    0 !== this.props[6] ||
                    0 !== this.props[7] ||
                    0 !== this.props[8] ||
                    0 !== this.props[9] ||
                    1 !== this.props[10] ||
                    0 !== this.props[11] ||
                    0 !== this.props[12] ||
                    0 !== this.props[13] ||
                    0 !== this.props[14] ||
                    1 !== this.props[15]
                  )),
                  (this._identityCalculated = !0)),
                this._identity
              );
            }
            function y(t) {
              for (var e = 0; e < 16; ) {
                if (t.props[e] !== this.props[e]) return !1;
                e += 1;
              }
              return !0;
            }
            function v(t) {
              var e;
              for (e = 0; e < 16; e += 1) t.props[e] = this.props[e];
              return t;
            }
            function _(t) {
              var e;
              for (e = 0; e < 16; e += 1) this.props[e] = t[e];
            }
            function b(t, e, i) {
              return {
                x: t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12],
                y: t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13],
                z: t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14],
              };
            }
            function x(t, e, i) {
              return t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12];
            }
            function P(t, e, i) {
              return t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13];
            }
            function k(t, e, i) {
              return t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14];
            }
            function w() {
              var t = this.props[0] * this.props[5] - this.props[1] * this.props[4],
                e = this.props[5] / t,
                i = -this.props[1] / t,
                s = -this.props[4] / t,
                n = this.props[0] / t,
                a = (this.props[4] * this.props[13] - this.props[5] * this.props[12]) / t,
                o = -(this.props[0] * this.props[13] - this.props[1] * this.props[12]) / t,
                h = new Matrix();
              return (
                (h.props[0] = e),
                (h.props[1] = i),
                (h.props[4] = s),
                (h.props[5] = n),
                (h.props[12] = a),
                (h.props[13] = o),
                h
              );
            }
            function A(t) {
              return this.getInverseMatrix().applyToPointArray(t[0], t[1], t[2] || 0);
            }
            function C(t) {
              var e,
                i = t.length,
                s = [];
              for (e = 0; e < i; e += 1) s[e] = A(t[e]);
              return s;
            }
            function E(t, e, i) {
              var s = createTypedArray('float32', 6);
              if (this.isIdentity())
                (s[0] = t[0]), (s[1] = t[1]), (s[2] = e[0]), (s[3] = e[1]), (s[4] = i[0]), (s[5] = i[1]);
              else {
                var n = this.props[0],
                  a = this.props[1],
                  o = this.props[4],
                  h = this.props[5],
                  l = this.props[12],
                  p = this.props[13];
                (s[0] = t[0] * n + t[1] * o + l),
                  (s[1] = t[0] * a + t[1] * h + p),
                  (s[2] = e[0] * n + e[1] * o + l),
                  (s[3] = e[0] * a + e[1] * h + p),
                  (s[4] = i[0] * n + i[1] * o + l),
                  (s[5] = i[0] * a + i[1] * h + p);
              }
              return s;
            }
            function D(t, e, i) {
              return this.isIdentity()
                ? [t, e, i]
                : [
                    t * this.props[0] + e * this.props[4] + i * this.props[8] + this.props[12],
                    t * this.props[1] + e * this.props[5] + i * this.props[9] + this.props[13],
                    t * this.props[2] + e * this.props[6] + i * this.props[10] + this.props[14],
                  ];
            }
            function S(t, e) {
              if (this.isIdentity()) return t + ',' + e;
              var i = this.props;
              return (
                Math.round(100 * (t * i[0] + e * i[4] + i[12])) / 100 +
                ',' +
                Math.round(100 * (t * i[1] + e * i[5] + i[13])) / 100
              );
            }
            function T() {
              for (var t = 0, e = this.props, i = 'matrix3d('; t < 16; )
                (i += s(1e4 * e[t]) / 1e4), (i += 15 === t ? ')' : ','), (t += 1);
              return i;
            }
            function F(t) {
              return (t < 1e-6 && t > 0) || (t > -0.000001 && t < 0) ? s(1e4 * t) / 1e4 : t;
            }
            function M() {
              var t = this.props;
              return (
                'matrix(' +
                F(t[0]) +
                ',' +
                F(t[1]) +
                ',' +
                F(t[4]) +
                ',' +
                F(t[5]) +
                ',' +
                F(t[12]) +
                ',' +
                F(t[13]) +
                ')'
              );
            }
            return function () {
              (this.reset = n),
                (this.rotate = a),
                (this.rotateX = o),
                (this.rotateY = h),
                (this.rotateZ = l),
                (this.skew = f),
                (this.skewFromAxis = u),
                (this.shear = p),
                (this.scale = c),
                (this.setTransform = d),
                (this.translate = m),
                (this.transform = $),
                (this.applyToPoint = b),
                (this.applyToX = x),
                (this.applyToY = P),
                (this.applyToZ = k),
                (this.applyToPointArray = D),
                (this.applyToTriplePoints = E),
                (this.applyToPointStringified = S),
                (this.toCSS = T),
                (this.to2dCSS = M),
                (this.clone = v),
                (this.cloneFromProps = _),
                (this.equals = y),
                (this.inversePoints = C),
                (this.inversePoint = A),
                (this.getInverseMatrix = w),
                (this._t = this.transform),
                (this.isIdentity = g),
                (this._identity = !0),
                (this._identityCalculated = !1),
                (this.props = createTypedArray('float32', 16)),
                this.reset();
            };
          })();
        function _typeof$3(t) {
          return (_typeof$3 =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                })(t);
        }
        var lottie = {},
          standalone = '__[STANDALONE]__',
          animationData = '__[ANIMATIONDATA]__',
          renderer = '';
        function setLocation(t) {
          setLocationHref(t);
        }
        function searchAnimations() {
          !0 === standalone
            ? animationManager.searchAnimations(animationData, standalone, renderer)
            : animationManager.searchAnimations();
        }
        function setSubframeRendering(t) {
          setSubframeEnabled(t);
        }
        function setPrefix(t) {
          setIdPrefix(t);
        }
        function loadAnimation(t) {
          return !0 === standalone && (t.animationData = JSON.parse(animationData)), animationManager.loadAnimation(t);
        }
        function setQuality(t) {
          if ('string' == typeof t)
            switch (t) {
              case 'high':
                setDefaultCurveSegments(200);
                break;
              default:
              case 'medium':
                setDefaultCurveSegments(50);
                break;
              case 'low':
                setDefaultCurveSegments(10);
            }
          else !isNaN(t) && t > 1 && setDefaultCurveSegments(t);
          getDefaultCurveSegments() >= 50 ? roundValues(!1) : roundValues(!0);
        }
        function inBrowser() {
          return 'undefined' != typeof navigator;
        }
        function installPlugin(t, e) {
          'expressions' === t && setExpressionsPlugin(e);
        }
        function getFactory(t) {
          switch (t) {
            case 'propertyFactory':
              return PropertyFactory;
            case 'shapePropertyFactory':
              return ShapePropertyFactory;
            case 'matrix':
              return Matrix;
            default:
              return null;
          }
        }
        function checkReady() {
          'complete' === document.readyState && (clearInterval(readyStateCheckInterval), searchAnimations());
        }
        function getQueryVariable(t) {
          for (var e = queryString.split('&'), i = 0; i < e.length; i += 1) {
            var s = e[i].split('=');
            if (decodeURIComponent(s[0]) == t) return decodeURIComponent(s[1]);
          }
          return null;
        }
        (lottie.play = animationManager.play),
          (lottie.pause = animationManager.pause),
          (lottie.setLocationHref = setLocation),
          (lottie.togglePause = animationManager.togglePause),
          (lottie.setSpeed = animationManager.setSpeed),
          (lottie.setDirection = animationManager.setDirection),
          (lottie.stop = animationManager.stop),
          (lottie.searchAnimations = searchAnimations),
          (lottie.registerAnimation = animationManager.registerAnimation),
          (lottie.loadAnimation = loadAnimation),
          (lottie.setSubframeRendering = setSubframeRendering),
          (lottie.resize = animationManager.resize),
          (lottie.goToAndStop = animationManager.goToAndStop),
          (lottie.destroy = animationManager.destroy),
          (lottie.setQuality = setQuality),
          (lottie.inBrowser = inBrowser),
          (lottie.installPlugin = installPlugin),
          (lottie.freeze = animationManager.freeze),
          (lottie.unfreeze = animationManager.unfreeze),
          (lottie.setVolume = animationManager.setVolume),
          (lottie.mute = animationManager.mute),
          (lottie.unmute = animationManager.unmute),
          (lottie.getRegisteredAnimations = animationManager.getRegisteredAnimations),
          (lottie.useWebWorker = setWebWorker),
          (lottie.setIDPrefix = setPrefix),
          (lottie.__getFactory = getFactory),
          (lottie.version = '5.10.0');
        var queryString = '';
        if (standalone) {
          var scripts = document.getElementsByTagName('script'),
            myScript = scripts[scripts.length - 1] || { src: '' };
          (queryString = myScript.src ? myScript.src.replace(/^[^\?]+\??/, '') : ''),
            (renderer = getQueryVariable('renderer'));
        }
        var readyStateCheckInterval = setInterval(checkReady, 100);
        try {
          'object' !== _typeof$3(exports) && (window.bodymovin = lottie);
        } catch (t) {}
        var t,
          e,
          ShapeModifiers =
            ((e = {}),
            ((t = {}).registerModifier = function (t, i) {
              e[t] || (e[t] = i);
            }),
            (t.getModifier = function (t, i, s) {
              return new e[t](i, s);
            }),
            t);
        function ShapeModifier() {}
        function TrimModifier() {}
        function PuckerAndBloatModifier() {}
        (ShapeModifier.prototype.initModifierProperties = function () {}),
          (ShapeModifier.prototype.addShapeToModifier = function () {}),
          (ShapeModifier.prototype.addShape = function (t) {
            if (!this.closed) {
              t.sh.container.addDynamicProperty(t.sh);
              var e = { shape: t.sh, data: t, localShapeCollection: shapeCollectionPool.newShapeCollection() };
              this.shapes.push(e), this.addShapeToModifier(e), this._isAnimated && t.setAsAnimated();
            }
          }),
          (ShapeModifier.prototype.init = function (t, e) {
            (this.shapes = []),
              (this.elem = t),
              this.initDynamicPropertyContainer(t),
              this.initModifierProperties(t, e),
              (this.frameId = initialDefaultFrame),
              (this.closed = !1),
              (this.k = !1),
              this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
          }),
          (ShapeModifier.prototype.processKeys = function () {
            this.elem.globalData.frameId !== this.frameId &&
              ((this.frameId = this.elem.globalData.frameId), this.iterateDynamicProperties());
          }),
          extendPrototype([DynamicPropertyContainer], ShapeModifier),
          extendPrototype([ShapeModifier], TrimModifier),
          (TrimModifier.prototype.initModifierProperties = function (t, e) {
            (this.s = PropertyFactory.getProp(t, e.s, 0, 0.01, this)),
              (this.e = PropertyFactory.getProp(t, e.e, 0, 0.01, this)),
              (this.o = PropertyFactory.getProp(t, e.o, 0, 0, this)),
              (this.sValue = 0),
              (this.eValue = 0),
              (this.getValue = this.processKeys),
              (this.m = e.m),
              (this._isAnimated =
                !!this.s.effectsSequence.length || !!this.e.effectsSequence.length || !!this.o.effectsSequence.length);
          }),
          (TrimModifier.prototype.addShapeToModifier = function (t) {
            t.pathsData = [];
          }),
          (TrimModifier.prototype.calculateShapeEdges = function (t, e, i, s, n) {
            var a,
              o,
              h = [];
            e <= 1
              ? h.push({ s: t, e: e })
              : t >= 1
              ? h.push({ s: t - 1, e: e - 1 })
              : (h.push({ s: t, e: 1 }), h.push({ s: 0, e: e - 1 }));
            var l,
              p,
              f = [],
              u = h.length;
            for (l = 0; l < u; l += 1)
              (p = h[l]).e * n < s ||
                p.s * n > s + i ||
                ((a = p.s * n <= s ? 0 : (p.s * n - s) / i),
                (o = p.e * n >= s + i ? 1 : (p.e * n - s) / i),
                f.push([a, o]));
            return f.length || f.push([0, 0]), f;
          }),
          (TrimModifier.prototype.releasePathsData = function (t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1) segmentsLengthPool.release(t[e]);
            return (t.length = 0), t;
          }),
          (TrimModifier.prototype.processShapes = function (t) {
            if (this._mdf || t) {
              var e = (this.o.v % 360) / 360;
              if (
                (e < 0 && (e += 1),
                (s = this.s.v > 1 ? 1 + e : this.s.v < 0 ? 0 + e : this.s.v + e) >
                  (n = this.e.v > 1 ? 1 + e : this.e.v < 0 ? 0 + e : this.e.v + e))
              ) {
                var i = s;
                (s = n), (n = i);
              }
              (s = 1e-4 * Math.round(1e4 * s)), (n = 1e-4 * Math.round(1e4 * n)), (this.sValue = s), (this.eValue = n);
            } else (s = this.sValue), (n = this.eValue);
            var s,
              n,
              a,
              o,
              h,
              l,
              p,
              f,
              u,
              c = this.shapes.length,
              d = 0;
            if (n === s)
              for (o = 0; o < c; o += 1)
                this.shapes[o].localShapeCollection.releaseShapes(),
                  (this.shapes[o].shape._mdf = !0),
                  (this.shapes[o].shape.paths = this.shapes[o].localShapeCollection),
                  this._mdf && (this.shapes[o].pathsData.length = 0);
            else if ((1 === n && 0 === s) || (0 === n && 1 === s)) {
              if (this._mdf)
                for (o = 0; o < c; o += 1) (this.shapes[o].pathsData.length = 0), (this.shapes[o].shape._mdf = !0);
            } else {
              var m,
                $,
                g = [];
              for (o = 0; o < c; o += 1)
                if ((m = this.shapes[o]).shape._mdf || this._mdf || t || 2 === this.m) {
                  if (((l = (a = m.shape.paths)._length), (u = 0), !m.shape._mdf && m.pathsData.length))
                    u = m.totalShapeLength;
                  else {
                    for (p = this.releasePathsData(m.pathsData), h = 0; h < l; h += 1)
                      (f = bez.getSegmentsLength(a.shapes[h])), p.push(f), (u += f.totalLength);
                    (m.totalShapeLength = u), (m.pathsData = p);
                  }
                  (d += u), (m.shape._mdf = !0);
                } else m.shape.paths = m.localShapeCollection;
              var y,
                v = s,
                _ = n,
                b = 0;
              for (o = c - 1; o >= 0; o -= 1)
                if ((m = this.shapes[o]).shape._mdf) {
                  for (
                    ($ = m.localShapeCollection).releaseShapes(),
                      2 === this.m && c > 1
                        ? ((y = this.calculateShapeEdges(s, n, m.totalShapeLength, b, d)), (b += m.totalShapeLength))
                        : (y = [[v, _]]),
                      l = y.length,
                      h = 0;
                    h < l;
                    h += 1
                  ) {
                    (v = y[h][0]),
                      (_ = y[h][1]),
                      (g.length = 0),
                      _ <= 1
                        ? g.push({ s: m.totalShapeLength * v, e: m.totalShapeLength * _ })
                        : v >= 1
                        ? g.push({ s: m.totalShapeLength * (v - 1), e: m.totalShapeLength * (_ - 1) })
                        : (g.push({ s: m.totalShapeLength * v, e: m.totalShapeLength }),
                          g.push({ s: 0, e: m.totalShapeLength * (_ - 1) }));
                    var x = this.addShapes(m, g[0]);
                    if (g[0].s !== g[0].e) {
                      if (g.length > 1) {
                        if (m.shape.paths.shapes[m.shape.paths._length - 1].c) {
                          var P = x.pop();
                          this.addPaths(x, $), (x = this.addShapes(m, g[1], P));
                        } else this.addPaths(x, $), (x = this.addShapes(m, g[1]));
                      }
                      this.addPaths(x, $);
                    }
                  }
                  m.shape.paths = $;
                }
            }
          }),
          (TrimModifier.prototype.addPaths = function (t, e) {
            var i,
              s = t.length;
            for (i = 0; i < s; i += 1) e.addShape(t[i]);
          }),
          (TrimModifier.prototype.addSegment = function (t, e, i, s, n, a, o) {
            n.setXYAt(e[0], e[1], 'o', a),
              n.setXYAt(i[0], i[1], 'i', a + 1),
              o && n.setXYAt(t[0], t[1], 'v', a),
              n.setXYAt(s[0], s[1], 'v', a + 1);
          }),
          (TrimModifier.prototype.addSegmentFromArray = function (t, e, i, s) {
            e.setXYAt(t[1], t[5], 'o', i),
              e.setXYAt(t[2], t[6], 'i', i + 1),
              s && e.setXYAt(t[0], t[4], 'v', i),
              e.setXYAt(t[3], t[7], 'v', i + 1);
          }),
          (TrimModifier.prototype.addShapes = function (t, e, i) {
            var s,
              n,
              a,
              o,
              h,
              l,
              p,
              f,
              u = t.pathsData,
              c = t.shape.paths.shapes,
              d = t.shape.paths._length,
              m = 0,
              $ = [],
              g = !0;
            for (
              i ? ((h = i._length), (f = i._length)) : ((i = shapePool.newElement()), (h = 0), (f = 0)),
                $.push(i),
                s = 0;
              s < d;
              s += 1
            ) {
              for (l = u[s].lengths, i.c = c[s].c, a = c[s].c ? l.length : l.length + 1, n = 1; n < a; n += 1)
                if (m + (o = l[n - 1]).addedLength < e.s) (m += o.addedLength), (i.c = !1);
                else {
                  if (m > e.e) {
                    i.c = !1;
                    break;
                  }
                  e.s <= m && e.e >= m + o.addedLength
                    ? (this.addSegment(c[s].v[n - 1], c[s].o[n - 1], c[s].i[n], c[s].v[n], i, h, g), (g = !1))
                    : ((p = bez.getNewSegment(
                        c[s].v[n - 1],
                        c[s].v[n],
                        c[s].o[n - 1],
                        c[s].i[n],
                        (e.s - m) / o.addedLength,
                        (e.e - m) / o.addedLength,
                        l[n - 1],
                      )),
                      this.addSegmentFromArray(p, i, h, g),
                      (g = !1),
                      (i.c = !1)),
                    (m += o.addedLength),
                    (h += 1);
                }
              if (c[s].c && l.length) {
                if (((o = l[n - 1]), m <= e.e)) {
                  var y = l[n - 1].addedLength;
                  e.s <= m && e.e >= m + y
                    ? (this.addSegment(c[s].v[n - 1], c[s].o[n - 1], c[s].i[0], c[s].v[0], i, h, g), (g = !1))
                    : ((p = bez.getNewSegment(
                        c[s].v[n - 1],
                        c[s].v[0],
                        c[s].o[n - 1],
                        c[s].i[0],
                        (e.s - m) / y,
                        (e.e - m) / y,
                        l[n - 1],
                      )),
                      this.addSegmentFromArray(p, i, h, g),
                      (g = !1),
                      (i.c = !1));
                } else i.c = !1;
                (m += o.addedLength), (h += 1);
              }
              if (
                (i._length &&
                  (i.setXYAt(i.v[f][0], i.v[f][1], 'i', f),
                  i.setXYAt(i.v[i._length - 1][0], i.v[i._length - 1][1], 'o', i._length - 1)),
                m > e.e)
              )
                break;
              s < d - 1 && ((i = shapePool.newElement()), (g = !0), $.push(i), (h = 0));
            }
            return $;
          }),
          extendPrototype([ShapeModifier], PuckerAndBloatModifier),
          (PuckerAndBloatModifier.prototype.initModifierProperties = function (t, e) {
            (this.getValue = this.processKeys),
              (this.amount = PropertyFactory.getProp(t, e.a, 0, null, this)),
              (this._isAnimated = !!this.amount.effectsSequence.length);
          }),
          (PuckerAndBloatModifier.prototype.processPath = function (t, e) {
            var i = e / 100,
              s = [0, 0],
              n = t._length,
              a = 0;
            for (a = 0; a < n; a += 1) (s[0] += t.v[a][0]), (s[1] += t.v[a][1]);
            (s[0] /= n), (s[1] /= n);
            var o,
              h,
              l,
              p,
              f,
              u,
              c = shapePool.newElement();
            for (c.c = t.c, a = 0; a < n; a += 1)
              (o = t.v[a][0] + (s[0] - t.v[a][0]) * i),
                (h = t.v[a][1] + (s[1] - t.v[a][1]) * i),
                (l = t.o[a][0] + -((s[0] - t.o[a][0]) * i)),
                (p = t.o[a][1] + -((s[1] - t.o[a][1]) * i)),
                (f = t.i[a][0] + -((s[0] - t.i[a][0]) * i)),
                (u = t.i[a][1] + -((s[1] - t.i[a][1]) * i)),
                c.setTripleAt(o, h, l, p, f, u, a);
            return c;
          }),
          (PuckerAndBloatModifier.prototype.processShapes = function (t) {
            var e,
              i,
              s,
              n,
              a,
              o,
              h = this.shapes.length,
              l = this.amount.v;
            if (0 !== l)
              for (i = 0; i < h; i += 1) {
                if (((o = (a = this.shapes[i]).localShapeCollection), a.shape._mdf || this._mdf || t))
                  for (
                    o.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, n = a.shape.paths._length, s = 0;
                    s < n;
                    s += 1
                  )
                    o.addShape(this.processPath(e[s], l));
                a.shape.paths = a.localShapeCollection;
              }
            this.dynamicProperties.length || (this._mdf = !1);
          });
        var TransformPropertyFactory = (function () {
          var t = [0, 0];
          function e(t, e, i) {
            if (
              ((this.elem = t),
              (this.frameId = -1),
              (this.propType = 'transform'),
              (this.data = e),
              (this.v = new Matrix()),
              (this.pre = new Matrix()),
              (this.appliedTransformations = 0),
              this.initDynamicPropertyContainer(i || t),
              e.p && e.p.s
                ? ((this.px = PropertyFactory.getProp(t, e.p.x, 0, 0, this)),
                  (this.py = PropertyFactory.getProp(t, e.p.y, 0, 0, this)),
                  e.p.z && (this.pz = PropertyFactory.getProp(t, e.p.z, 0, 0, this)))
                : (this.p = PropertyFactory.getProp(t, e.p || { k: [0, 0, 0] }, 1, 0, this)),
              e.rx)
            ) {
              if (
                ((this.rx = PropertyFactory.getProp(t, e.rx, 0, degToRads, this)),
                (this.ry = PropertyFactory.getProp(t, e.ry, 0, degToRads, this)),
                (this.rz = PropertyFactory.getProp(t, e.rz, 0, degToRads, this)),
                e.or.k[0].ti)
              ) {
                var s,
                  n = e.or.k.length;
                for (s = 0; s < n; s += 1) (e.or.k[s].to = null), (e.or.k[s].ti = null);
              }
              (this.or = PropertyFactory.getProp(t, e.or, 1, degToRads, this)), (this.or.sh = !0);
            } else this.r = PropertyFactory.getProp(t, e.r || { k: 0 }, 0, degToRads, this);
            e.sk &&
              ((this.sk = PropertyFactory.getProp(t, e.sk, 0, degToRads, this)),
              (this.sa = PropertyFactory.getProp(t, e.sa, 0, degToRads, this))),
              (this.a = PropertyFactory.getProp(t, e.a || { k: [0, 0, 0] }, 1, 0, this)),
              (this.s = PropertyFactory.getProp(t, e.s || { k: [100, 100, 100] }, 1, 0.01, this)),
              e.o ? (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, t)) : (this.o = { _mdf: !1, v: 1 }),
              (this._isDirty = !0),
              this.dynamicProperties.length || this.getValue(!0);
          }
          return (
            (e.prototype = {
              applyToMatrix: function (t) {
                var e = this._mdf;
                this.iterateDynamicProperties(),
                  (this._mdf = this._mdf || e),
                  this.a && t.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                  this.s && t.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                  this.sk && t.skewFromAxis(-this.sk.v, this.sa.v),
                  this.r
                    ? t.rotate(-this.r.v)
                    : t
                        .rotateZ(-this.rz.v)
                        .rotateY(this.ry.v)
                        .rotateX(this.rx.v)
                        .rotateZ(-this.or.v[2])
                        .rotateY(this.or.v[1])
                        .rotateX(this.or.v[0]),
                  this.data.p.s
                    ? this.data.p.z
                      ? t.translate(this.px.v, this.py.v, -this.pz.v)
                      : t.translate(this.px.v, this.py.v, 0)
                    : t.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
              },
              getValue: function (e) {
                if (this.elem.globalData.frameId !== this.frameId) {
                  if (
                    (this._isDirty && (this.precalculateMatrix(), (this._isDirty = !1)),
                    this.iterateDynamicProperties(),
                    this._mdf || e)
                  ) {
                    if (
                      (this.v.cloneFromProps(this.pre.props),
                      this.appliedTransformations < 1 && this.v.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                      this.appliedTransformations < 2 && this.v.scale(this.s.v[0], this.s.v[1], this.s.v[2]),
                      this.sk && this.appliedTransformations < 3 && this.v.skewFromAxis(-this.sk.v, this.sa.v),
                      this.r && this.appliedTransformations < 4
                        ? this.v.rotate(-this.r.v)
                        : !this.r &&
                          this.appliedTransformations < 4 &&
                          this.v
                            .rotateZ(-this.rz.v)
                            .rotateY(this.ry.v)
                            .rotateX(this.rx.v)
                            .rotateZ(-this.or.v[2])
                            .rotateY(this.or.v[1])
                            .rotateX(this.or.v[0]),
                      this.autoOriented)
                    ) {
                      if (((i = this.elem.globalData.frameRate), this.p && this.p.keyframes && this.p.getValueAtTime))
                        this.p._caching.lastFrame + this.p.offsetTime <= this.p.keyframes[0].t
                          ? ((s = this.p.getValueAtTime((this.p.keyframes[0].t + 0.01) / i, 0)),
                            (n = this.p.getValueAtTime(this.p.keyframes[0].t / i, 0)))
                          : this.p._caching.lastFrame + this.p.offsetTime >=
                            this.p.keyframes[this.p.keyframes.length - 1].t
                          ? ((s = this.p.getValueAtTime(this.p.keyframes[this.p.keyframes.length - 1].t / i, 0)),
                            (n = this.p.getValueAtTime(
                              (this.p.keyframes[this.p.keyframes.length - 1].t - 0.05) / i,
                              0,
                            )))
                          : ((s = this.p.pv),
                            (n = this.p.getValueAtTime(
                              (this.p._caching.lastFrame + this.p.offsetTime - 0.01) / i,
                              this.p.offsetTime,
                            )));
                      else if (
                        this.px &&
                        this.px.keyframes &&
                        this.py.keyframes &&
                        this.px.getValueAtTime &&
                        this.py.getValueAtTime
                      ) {
                        (s = []), (n = []);
                        var i,
                          s,
                          n,
                          a = this.px,
                          o = this.py;
                        a._caching.lastFrame + a.offsetTime <= a.keyframes[0].t
                          ? ((s[0] = a.getValueAtTime((a.keyframes[0].t + 0.01) / i, 0)),
                            (s[1] = o.getValueAtTime((o.keyframes[0].t + 0.01) / i, 0)),
                            (n[0] = a.getValueAtTime(a.keyframes[0].t / i, 0)),
                            (n[1] = o.getValueAtTime(o.keyframes[0].t / i, 0)))
                          : a._caching.lastFrame + a.offsetTime >= a.keyframes[a.keyframes.length - 1].t
                          ? ((s[0] = a.getValueAtTime(a.keyframes[a.keyframes.length - 1].t / i, 0)),
                            (s[1] = o.getValueAtTime(o.keyframes[o.keyframes.length - 1].t / i, 0)),
                            (n[0] = a.getValueAtTime((a.keyframes[a.keyframes.length - 1].t - 0.01) / i, 0)),
                            (n[1] = o.getValueAtTime((o.keyframes[o.keyframes.length - 1].t - 0.01) / i, 0)))
                          : ((s = [a.pv, o.pv]),
                            (n[0] = a.getValueAtTime((a._caching.lastFrame + a.offsetTime - 0.01) / i, a.offsetTime)),
                            (n[1] = o.getValueAtTime((o._caching.lastFrame + o.offsetTime - 0.01) / i, o.offsetTime)));
                      } else s = n = t;
                      this.v.rotate(-Math.atan2(s[1] - n[1], s[0] - n[0]));
                    }
                    this.data.p && this.data.p.s
                      ? this.data.p.z
                        ? this.v.translate(this.px.v, this.py.v, -this.pz.v)
                        : this.v.translate(this.px.v, this.py.v, 0)
                      : this.v.translate(this.p.v[0], this.p.v[1], -this.p.v[2]);
                  }
                  this.frameId = this.elem.globalData.frameId;
                }
              },
              precalculateMatrix: function () {
                if (
                  !this.a.k &&
                  (this.pre.translate(-this.a.v[0], -this.a.v[1], this.a.v[2]),
                  (this.appliedTransformations = 1),
                  !this.s.effectsSequence.length)
                ) {
                  if (
                    (this.pre.scale(this.s.v[0], this.s.v[1], this.s.v[2]), (this.appliedTransformations = 2), this.sk)
                  ) {
                    if (this.sk.effectsSequence.length || this.sa.effectsSequence.length) return;
                    this.pre.skewFromAxis(-this.sk.v, this.sa.v), (this.appliedTransformations = 3);
                  }
                  this.r
                    ? this.r.effectsSequence.length || (this.pre.rotate(-this.r.v), (this.appliedTransformations = 4))
                    : this.rz.effectsSequence.length ||
                      this.ry.effectsSequence.length ||
                      this.rx.effectsSequence.length ||
                      this.or.effectsSequence.length ||
                      (this.pre
                        .rotateZ(-this.rz.v)
                        .rotateY(this.ry.v)
                        .rotateX(this.rx.v)
                        .rotateZ(-this.or.v[2])
                        .rotateY(this.or.v[1])
                        .rotateX(this.or.v[0]),
                      (this.appliedTransformations = 4));
                }
              },
              autoOrient: function () {},
            }),
            extendPrototype([DynamicPropertyContainer], e),
            (e.prototype.addDynamicProperty = function (t) {
              this._addDynamicProperty(t), this.elem.addDynamicProperty(t), (this._isDirty = !0);
            }),
            (e.prototype._addDynamicProperty = DynamicPropertyContainer.prototype.addDynamicProperty),
            {
              getTransformProperty: function (t, i, s) {
                return new e(t, i, s);
              },
            }
          );
        })();
        function RepeaterModifier() {}
        function RoundCornersModifier() {}
        function floatEqual(t, e) {
          return 1e5 * Math.abs(t - e) <= Math.min(Math.abs(t), Math.abs(e));
        }
        function floatZero(t) {
          return 1e-5 >= Math.abs(t);
        }
        function lerp(t, e, i) {
          return t * (1 - i) + e * i;
        }
        function lerpPoint(t, e, i) {
          return [lerp(t[0], e[0], i), lerp(t[1], e[1], i)];
        }
        function quadRoots(t, e, i) {
          if (0 === t) return [];
          var s = e * e - 4 * t * i;
          if (s < 0) return [];
          var n = -e / (2 * t);
          if (0 === s) return [n];
          var a = Math.sqrt(s) / (2 * t);
          return [n - a, n + a];
        }
        function polynomialCoefficients(t, e, i, s) {
          return [3 * e - t - 3 * i + s, 3 * t - 6 * e + 3 * i, -3 * t + 3 * e, t];
        }
        function singlePoint(t) {
          return new PolynomialBezier(t, t, t, t, !1);
        }
        function PolynomialBezier(t, e, i, s, n) {
          n && pointEqual(t, e) && (e = lerpPoint(t, s, 1 / 3)), n && pointEqual(i, s) && (i = lerpPoint(t, s, 2 / 3));
          var a = polynomialCoefficients(t[0], e[0], i[0], s[0]),
            o = polynomialCoefficients(t[1], e[1], i[1], s[1]);
          (this.a = [a[0], o[0]]),
            (this.b = [a[1], o[1]]),
            (this.c = [a[2], o[2]]),
            (this.d = [a[3], o[3]]),
            (this.points = [t, e, i, s]);
        }
        function extrema(t, e) {
          var i = t.points[0][e],
            s = t.points[t.points.length - 1][e];
          if (i > s) {
            var n = s;
            (s = i), (i = n);
          }
          for (var a = quadRoots(3 * t.a[e], 2 * t.b[e], t.c[e]), o = 0; o < a.length; o += 1)
            if (a[o] > 0 && a[o] < 1) {
              var h = t.point(a[o])[e];
              h < i ? (i = h) : h > s && (s = h);
            }
          return { min: i, max: s };
        }
        function intersectData(t, e, i) {
          var s = t.boundingBox();
          return { cx: s.cx, cy: s.cy, width: s.width, height: s.height, bez: t, t: (e + i) / 2, t1: e, t2: i };
        }
        function splitData(t) {
          var e = t.bez.split(0.5);
          return [intersectData(e[0], t.t1, t.t), intersectData(e[1], t.t, t.t2)];
        }
        function boxIntersect(t, e) {
          return 2 * Math.abs(t.cx - e.cx) < t.width + e.width && 2 * Math.abs(t.cy - e.cy) < t.height + e.height;
        }
        function intersectsImpl(t, e, i, s, n, a) {
          if (boxIntersect(t, e)) {
            if (i >= a || (t.width <= s && t.height <= s && e.width <= s && e.height <= s)) n.push([t.t, e.t]);
            else {
              var o = splitData(t),
                h = splitData(e);
              intersectsImpl(o[0], h[0], i + 1, s, n, a),
                intersectsImpl(o[0], h[1], i + 1, s, n, a),
                intersectsImpl(o[1], h[0], i + 1, s, n, a),
                intersectsImpl(o[1], h[1], i + 1, s, n, a);
            }
          }
        }
        function crossProduct(t, e) {
          return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]];
        }
        function lineIntersection(t, e, i, s) {
          var n = [t[0], t[1], 1],
            a = [e[0], e[1], 1],
            o = [i[0], i[1], 1],
            h = [s[0], s[1], 1],
            l = crossProduct(crossProduct(n, a), crossProduct(o, h));
          return floatZero(l[2]) ? null : [l[0] / l[2], l[1] / l[2]];
        }
        function polarOffset(t, e, i) {
          return [t[0] + Math.cos(e) * i, t[1] - Math.sin(e) * i];
        }
        function pointDistance(t, e) {
          return Math.hypot(t[0] - e[0], t[1] - e[1]);
        }
        function pointEqual(t, e) {
          return floatEqual(t[0], e[0]) && floatEqual(t[1], e[1]);
        }
        function ZigZagModifier() {}
        function setPoint(t, e, i, s, n, a, o) {
          var h = i - Math.PI / 2,
            l = i + Math.PI / 2,
            p = e[0] + Math.cos(i) * s * n,
            f = e[1] - Math.sin(i) * s * n;
          t.setTripleAt(
            p,
            f,
            p + Math.cos(h) * a,
            f - Math.sin(h) * a,
            p + Math.cos(l) * o,
            f - Math.sin(l) * o,
            t.length(),
          );
        }
        function getPerpendicularVector(t, e) {
          var i = [e[0] - t[0], e[1] - t[1]],
            s = -(0.5 * Math.PI);
          return [Math.cos(s) * i[0] - Math.sin(s) * i[1], Math.sin(s) * i[0] + Math.cos(s) * i[1]];
        }
        function getProjectingAngle(t, e) {
          var i = 0 === e ? t.length() - 1 : e - 1,
            s = (e + 1) % t.length(),
            n = getPerpendicularVector(t.v[i], t.v[s]);
          return Math.atan2(0, 1) - Math.atan2(n[1], n[0]);
        }
        function zigZagCorner(t, e, i, s, n, a, o) {
          var h = getProjectingAngle(e, i),
            l = e.v[i % e._length],
            p = e.v[0 === i ? e._length - 1 : i - 1],
            f = e.v[(i + 1) % e._length],
            u = 2 === a ? Math.sqrt(Math.pow(l[0] - p[0], 2) + Math.pow(l[1] - p[1], 2)) : 0,
            c = 2 === a ? Math.sqrt(Math.pow(l[0] - f[0], 2) + Math.pow(l[1] - f[1], 2)) : 0;
          setPoint(t, e.v[i % e._length], h, o, s, c / (2 * (n + 1)), u / (2 * (n + 1)), a);
        }
        function zigZagSegment(t, e, i, s, n, a) {
          for (var o = 0; o < s; o += 1) {
            var h = (o + 1) / (s + 1),
              l =
                2 === n
                  ? Math.sqrt(
                      Math.pow(e.points[3][0] - e.points[0][0], 2) + Math.pow(e.points[3][1] - e.points[0][1], 2),
                    )
                  : 0,
              p = e.normalAngle(h);
            setPoint(t, e.point(h), p, a, i, l / (2 * (s + 1)), l / (2 * (s + 1)), n), (a = -a);
          }
          return a;
        }
        function linearOffset(t, e, i) {
          var s = Math.atan2(e[0] - t[0], e[1] - t[1]);
          return [polarOffset(t, s, i), polarOffset(e, s, i)];
        }
        function offsetSegment(t, e) {
          (i = (l = linearOffset(t.points[0], t.points[1], e))[0]),
            (s = l[1]),
            (n = (l = linearOffset(t.points[1], t.points[2], e))[0]),
            (a = l[1]),
            (o = (l = linearOffset(t.points[2], t.points[3], e))[0]),
            (h = l[1]);
          var i,
            s,
            n,
            a,
            o,
            h,
            l,
            p = lineIntersection(i, s, n, a);
          null === p && (p = s);
          var f = lineIntersection(o, h, n, a);
          return null === f && (f = o), new PolynomialBezier(i, p, f, h);
        }
        function joinLines(t, e, i, s, n) {
          var a = e.points[3],
            o = i.points[0];
          if (3 === s || pointEqual(a, o)) return a;
          if (2 === s) {
            var h = -e.tangentAngle(1),
              l = -i.tangentAngle(0) + Math.PI,
              p = lineIntersection(a, polarOffset(a, h + Math.PI / 2, 100), o, polarOffset(o, h + Math.PI / 2, 100)),
              f = p ? pointDistance(p, a) : pointDistance(a, o) / 2,
              u = polarOffset(a, h, 2 * f * roundCorner);
            return (
              t.setXYAt(u[0], u[1], 'o', t.length() - 1),
              (u = polarOffset(o, l, 2 * f * roundCorner)),
              t.setTripleAt(o[0], o[1], o[0], o[1], u[0], u[1], t.length()),
              o
            );
          }
          var c = lineIntersection(
            pointEqual(a, e.points[2]) ? e.points[0] : e.points[2],
            a,
            o,
            pointEqual(o, i.points[1]) ? i.points[3] : i.points[1],
          );
          return c && pointDistance(c, a) < n ? (t.setTripleAt(c[0], c[1], c[0], c[1], c[0], c[1], t.length()), c) : a;
        }
        function getIntersection(t, e) {
          var i = t.intersections(e);
          return i.length && floatEqual(i[0][0], 1) && i.shift(), i.length ? i[0] : null;
        }
        function pruneSegmentIntersection(t, e) {
          var i = t.slice(),
            s = e.slice(),
            n = getIntersection(t[t.length - 1], e[0]);
          return (
            n && ((i[t.length - 1] = t[t.length - 1].split(n[0])[0]), (s[0] = e[0].split(n[1])[1])),
            t.length > 1 && e.length > 1 && (n = getIntersection(t[0], e[e.length - 1]))
              ? [[t[0].split(n[0])[0]], [e[e.length - 1].split(n[1])[1]]]
              : [i, s]
          );
        }
        function pruneIntersections(t) {
          for (var e, i = 1; i < t.length; i += 1)
            (e = pruneSegmentIntersection(t[i - 1], t[i])), (t[i - 1] = e[0]), (t[i] = e[1]);
          return (
            t.length > 1 &&
              ((e = pruneSegmentIntersection(t[t.length - 1], t[0])), (t[t.length - 1] = e[0]), (t[0] = e[1])),
            t
          );
        }
        function offsetSegmentSplit(t, e) {
          var i,
            s,
            n,
            a,
            o = t.inflectionPoints();
          if (0 === o.length) return [offsetSegment(t, e)];
          if (1 === o.length || floatEqual(o[1], 1))
            return (i = (n = t.split(o[0]))[0]), (s = n[1]), [offsetSegment(i, e), offsetSegment(s, e)];
          i = (n = t.split(o[0]))[0];
          var h = (o[1] - o[0]) / (1 - o[0]);
          return (
            (a = (n = n[1].split(h))[0]), (s = n[1]), [offsetSegment(i, e), offsetSegment(a, e), offsetSegment(s, e)]
          );
        }
        function OffsetPathModifier() {}
        function getFontProperties(t) {
          for (
            var e = t.fStyle ? t.fStyle.split(' ') : [], i = 'normal', s = 'normal', n = e.length, a = 0;
            a < n;
            a += 1
          )
            switch (e[a].toLowerCase()) {
              case 'italic':
                s = 'italic';
                break;
              case 'bold':
                i = '700';
                break;
              case 'black':
                i = '900';
                break;
              case 'medium':
                i = '500';
                break;
              case 'regular':
              case 'normal':
                i = '400';
                break;
              case 'light':
              case 'thin':
                i = '200';
            }
          return { style: s, weight: t.fWeight || i };
        }
        extendPrototype([ShapeModifier], RepeaterModifier),
          (RepeaterModifier.prototype.initModifierProperties = function (t, e) {
            (this.getValue = this.processKeys),
              (this.c = PropertyFactory.getProp(t, e.c, 0, null, this)),
              (this.o = PropertyFactory.getProp(t, e.o, 0, null, this)),
              (this.tr = TransformPropertyFactory.getTransformProperty(t, e.tr, this)),
              (this.so = PropertyFactory.getProp(t, e.tr.so, 0, 0.01, this)),
              (this.eo = PropertyFactory.getProp(t, e.tr.eo, 0, 0.01, this)),
              (this.data = e),
              this.dynamicProperties.length || this.getValue(!0),
              (this._isAnimated = !!this.dynamicProperties.length),
              (this.pMatrix = new Matrix()),
              (this.rMatrix = new Matrix()),
              (this.sMatrix = new Matrix()),
              (this.tMatrix = new Matrix()),
              (this.matrix = new Matrix());
          }),
          (RepeaterModifier.prototype.applyTransforms = function (t, e, i, s, n, a) {
            var o = a ? -1 : 1,
              h = s.s.v[0] + (1 - s.s.v[0]) * (1 - n),
              l = s.s.v[1] + (1 - s.s.v[1]) * (1 - n);
            t.translate(s.p.v[0] * o * n, s.p.v[1] * o * n, s.p.v[2]),
              e.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]),
              e.rotate(-s.r.v * o * n),
              e.translate(s.a.v[0], s.a.v[1], s.a.v[2]),
              i.translate(-s.a.v[0], -s.a.v[1], s.a.v[2]),
              i.scale(a ? 1 / h : h, a ? 1 / l : l),
              i.translate(s.a.v[0], s.a.v[1], s.a.v[2]);
          }),
          (RepeaterModifier.prototype.init = function (t, e, i, s) {
            for (
              this.elem = t,
                this.arr = e,
                this.pos = i,
                this.elemsData = s,
                this._currentCopies = 0,
                this._elements = [],
                this._groups = [],
                this.frameId = -1,
                this.initDynamicPropertyContainer(t),
                this.initModifierProperties(t, e[i]);
              i > 0;

            )
              (i -= 1), this._elements.unshift(e[i]);
            this.dynamicProperties.length ? (this.k = !0) : this.getValue(!0);
          }),
          (RepeaterModifier.prototype.resetElements = function (t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1) (t[e]._processed = !1), 'gr' === t[e].ty && this.resetElements(t[e].it);
          }),
          (RepeaterModifier.prototype.cloneElements = function (t) {
            var e = JSON.parse(JSON.stringify(t));
            return this.resetElements(e), e;
          }),
          (RepeaterModifier.prototype.changeGroupRender = function (t, e) {
            var i,
              s = t.length;
            for (i = 0; i < s; i += 1) (t[i]._render = e), 'gr' === t[i].ty && this.changeGroupRender(t[i].it, e);
          }),
          (RepeaterModifier.prototype.processShapes = function (t) {
            var e,
              i,
              s,
              n,
              a,
              o = !1;
            if (this._mdf || t) {
              var h,
                l = Math.ceil(this.c.v);
              if (this._groups.length < l) {
                for (; this._groups.length < l; ) {
                  var p = { it: this.cloneElements(this._elements), ty: 'gr' };
                  p.it.push({
                    a: { a: 0, ix: 1, k: [0, 0] },
                    nm: 'Transform',
                    o: { a: 0, ix: 7, k: 100 },
                    p: { a: 0, ix: 2, k: [0, 0] },
                    r: {
                      a: 1,
                      ix: 6,
                      k: [
                        { s: 0, e: 0, t: 0 },
                        { s: 0, e: 0, t: 1 },
                      ],
                    },
                    s: { a: 0, ix: 3, k: [100, 100] },
                    sa: { a: 0, ix: 5, k: 0 },
                    sk: { a: 0, ix: 4, k: 0 },
                    ty: 'tr',
                  }),
                    this.arr.splice(0, 0, p),
                    this._groups.splice(0, 0, p),
                    (this._currentCopies += 1);
                }
                this.elem.reloadShapes(), (o = !0);
              }
              for (a = 0, s = 0; s <= this._groups.length - 1; s += 1) {
                if (((h = a < l), (this._groups[s]._render = h), this.changeGroupRender(this._groups[s].it, h), !h)) {
                  var f = this.elemsData[s].it,
                    u = f[f.length - 1];
                  0 !== u.transform.op.v
                    ? ((u.transform.op._mdf = !0), (u.transform.op.v = 0))
                    : (u.transform.op._mdf = !1);
                }
                a += 1;
              }
              this._currentCopies = l;
              var c = this.o.v,
                d = c % 1,
                m = c > 0 ? Math.floor(c) : Math.ceil(c),
                $ = this.pMatrix.props,
                g = this.rMatrix.props,
                y = this.sMatrix.props;
              this.pMatrix.reset(),
                this.rMatrix.reset(),
                this.sMatrix.reset(),
                this.tMatrix.reset(),
                this.matrix.reset();
              var v,
                _,
                b = 0;
              if (c > 0) {
                for (; b < m; )
                  this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1), (b += 1);
                d && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, d, !1), (b += d));
              } else if (c < 0) {
                for (; b > m; )
                  this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !0), (b -= 1);
                d && (this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, -d, !0), (b -= d));
              }
              for (
                s = 1 === this.data.m ? 0 : this._currentCopies - 1,
                  n = 1 === this.data.m ? 1 : -1,
                  a = this._currentCopies;
                a;

              ) {
                if (
                  ((_ = (i = (e = this.elemsData[s].it)[e.length - 1].transform.mProps.v.props).length),
                  (e[e.length - 1].transform.mProps._mdf = !0),
                  (e[e.length - 1].transform.op._mdf = !0),
                  (e[e.length - 1].transform.op.v =
                    1 === this._currentCopies
                      ? this.so.v
                      : this.so.v + (this.eo.v - this.so.v) * (s / (this._currentCopies - 1))),
                  0 !== b)
                ) {
                  for (
                    ((0 !== s && 1 === n) || (s !== this._currentCopies - 1 && -1 === n)) &&
                      this.applyTransforms(this.pMatrix, this.rMatrix, this.sMatrix, this.tr, 1, !1),
                      this.matrix.transform(
                        g[0],
                        g[1],
                        g[2],
                        g[3],
                        g[4],
                        g[5],
                        g[6],
                        g[7],
                        g[8],
                        g[9],
                        g[10],
                        g[11],
                        g[12],
                        g[13],
                        g[14],
                        g[15],
                      ),
                      this.matrix.transform(
                        y[0],
                        y[1],
                        y[2],
                        y[3],
                        y[4],
                        y[5],
                        y[6],
                        y[7],
                        y[8],
                        y[9],
                        y[10],
                        y[11],
                        y[12],
                        y[13],
                        y[14],
                        y[15],
                      ),
                      this.matrix.transform(
                        $[0],
                        $[1],
                        $[2],
                        $[3],
                        $[4],
                        $[5],
                        $[6],
                        $[7],
                        $[8],
                        $[9],
                        $[10],
                        $[11],
                        $[12],
                        $[13],
                        $[14],
                        $[15],
                      ),
                      v = 0;
                    v < _;
                    v += 1
                  )
                    i[v] = this.matrix.props[v];
                  this.matrix.reset();
                } else for (this.matrix.reset(), v = 0; v < _; v += 1) i[v] = this.matrix.props[v];
                (b += 1), (a -= 1), (s += n);
              }
            } else
              for (a = this._currentCopies, s = 0, n = 1; a; )
                (i = (e = this.elemsData[s].it)[e.length - 1].transform.mProps.v.props),
                  (e[e.length - 1].transform.mProps._mdf = !1),
                  (e[e.length - 1].transform.op._mdf = !1),
                  (a -= 1),
                  (s += n);
            return o;
          }),
          (RepeaterModifier.prototype.addShape = function () {}),
          extendPrototype([ShapeModifier], RoundCornersModifier),
          (RoundCornersModifier.prototype.initModifierProperties = function (t, e) {
            (this.getValue = this.processKeys),
              (this.rd = PropertyFactory.getProp(t, e.r, 0, null, this)),
              (this._isAnimated = !!this.rd.effectsSequence.length);
          }),
          (RoundCornersModifier.prototype.processPath = function (t, e) {
            var i,
              s = shapePool.newElement();
            s.c = t.c;
            var n,
              a,
              o,
              h,
              l,
              p,
              f,
              u,
              c,
              d,
              m,
              $,
              g = t._length,
              y = 0;
            for (i = 0; i < g; i += 1)
              (n = t.v[i]),
                (o = t.o[i]),
                (a = t.i[i]),
                n[0] === o[0] && n[1] === o[1] && n[0] === a[0] && n[1] === a[1]
                  ? (0 !== i && i !== g - 1) || t.c
                    ? ((h = 0 === i ? t.v[g - 1] : t.v[i - 1]),
                      (p = (l = Math.sqrt(Math.pow(n[0] - h[0], 2) + Math.pow(n[1] - h[1], 2)))
                        ? Math.min(l / 2, e) / l
                        : 0),
                      (f = m = n[0] + (h[0] - n[0]) * p),
                      (u = $ = n[1] - (n[1] - h[1]) * p),
                      (c = f - (f - n[0]) * roundCorner),
                      (d = u - (u - n[1]) * roundCorner),
                      s.setTripleAt(f, u, c, d, m, $, y),
                      (y += 1),
                      (h = i === g - 1 ? t.v[0] : t.v[i + 1]),
                      (p = (l = Math.sqrt(Math.pow(n[0] - h[0], 2) + Math.pow(n[1] - h[1], 2)))
                        ? Math.min(l / 2, e) / l
                        : 0),
                      (f = c = n[0] + (h[0] - n[0]) * p),
                      (u = d = n[1] + (h[1] - n[1]) * p),
                      (m = f - (f - n[0]) * roundCorner),
                      ($ = u - (u - n[1]) * roundCorner),
                      s.setTripleAt(f, u, c, d, m, $, y),
                      (y += 1))
                    : (s.setTripleAt(n[0], n[1], o[0], o[1], a[0], a[1], y), (y += 1))
                  : (s.setTripleAt(t.v[i][0], t.v[i][1], t.o[i][0], t.o[i][1], t.i[i][0], t.i[i][1], y), (y += 1));
            return s;
          }),
          (RoundCornersModifier.prototype.processShapes = function (t) {
            var e,
              i,
              s,
              n,
              a,
              o,
              h = this.shapes.length,
              l = this.rd.v;
            if (0 !== l)
              for (i = 0; i < h; i += 1) {
                if (((o = (a = this.shapes[i]).localShapeCollection), a.shape._mdf || this._mdf || t))
                  for (
                    o.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, n = a.shape.paths._length, s = 0;
                    s < n;
                    s += 1
                  )
                    o.addShape(this.processPath(e[s], l));
                a.shape.paths = a.localShapeCollection;
              }
            this.dynamicProperties.length || (this._mdf = !1);
          }),
          (PolynomialBezier.prototype.point = function (t) {
            return [
              ((this.a[0] * t + this.b[0]) * t + this.c[0]) * t + this.d[0],
              ((this.a[1] * t + this.b[1]) * t + this.c[1]) * t + this.d[1],
            ];
          }),
          (PolynomialBezier.prototype.derivative = function (t) {
            return [
              (3 * t * this.a[0] + 2 * this.b[0]) * t + this.c[0],
              (3 * t * this.a[1] + 2 * this.b[1]) * t + this.c[1],
            ];
          }),
          (PolynomialBezier.prototype.tangentAngle = function (t) {
            var e = this.derivative(t);
            return Math.atan2(e[1], e[0]);
          }),
          (PolynomialBezier.prototype.normalAngle = function (t) {
            var e = this.derivative(t);
            return Math.atan2(e[0], e[1]);
          }),
          (PolynomialBezier.prototype.inflectionPoints = function () {
            var t = this.a[1] * this.b[0] - this.a[0] * this.b[1];
            if (floatZero(t)) return [];
            var e = (-0.5 * (this.a[1] * this.c[0] - this.a[0] * this.c[1])) / t,
              i = e * e - ((1 / 3) * (this.b[1] * this.c[0] - this.b[0] * this.c[1])) / t;
            if (i < 0) return [];
            var s = Math.sqrt(i);
            return floatZero(s)
              ? s > 0 && s < 1
                ? [e]
                : []
              : [e - s, e + s].filter(function (t) {
                  return t > 0 && t < 1;
                });
          }),
          (PolynomialBezier.prototype.split = function (t) {
            if (t <= 0) return [singlePoint(this.points[0]), this];
            if (t >= 1) return [this, singlePoint(this.points[this.points.length - 1])];
            var e = lerpPoint(this.points[0], this.points[1], t),
              i = lerpPoint(this.points[1], this.points[2], t),
              s = lerpPoint(this.points[2], this.points[3], t),
              n = lerpPoint(e, i, t),
              a = lerpPoint(i, s, t),
              o = lerpPoint(n, a, t);
            return [
              new PolynomialBezier(this.points[0], e, n, o, !0),
              new PolynomialBezier(o, a, s, this.points[3], !0),
            ];
          }),
          (PolynomialBezier.prototype.bounds = function () {
            return { x: extrema(this, 0), y: extrema(this, 1) };
          }),
          (PolynomialBezier.prototype.boundingBox = function () {
            var t = this.bounds();
            return {
              left: t.x.min,
              right: t.x.max,
              top: t.y.min,
              bottom: t.y.max,
              width: t.x.max - t.x.min,
              height: t.y.max - t.y.min,
              cx: (t.x.max + t.x.min) / 2,
              cy: (t.y.max + t.y.min) / 2,
            };
          }),
          (PolynomialBezier.prototype.intersections = function (t, e, i) {
            void 0 === e && (e = 2), void 0 === i && (i = 7);
            var s = [];
            return intersectsImpl(intersectData(this, 0, 1), intersectData(t, 0, 1), 0, e, s, i), s;
          }),
          (PolynomialBezier.shapeSegment = function (t, e) {
            var i = (e + 1) % t.length();
            return new PolynomialBezier(t.v[e], t.o[e], t.i[i], t.v[i], !0);
          }),
          (PolynomialBezier.shapeSegmentInverted = function (t, e) {
            var i = (e + 1) % t.length();
            return new PolynomialBezier(t.v[i], t.i[i], t.o[e], t.v[e], !0);
          }),
          extendPrototype([ShapeModifier], ZigZagModifier),
          (ZigZagModifier.prototype.initModifierProperties = function (t, e) {
            (this.getValue = this.processKeys),
              (this.amplitude = PropertyFactory.getProp(t, e.s, 0, null, this)),
              (this.frequency = PropertyFactory.getProp(t, e.r, 0, null, this)),
              (this.pointsType = PropertyFactory.getProp(t, e.pt, 0, null, this)),
              (this._isAnimated =
                0 !== this.amplitude.effectsSequence.length ||
                0 !== this.frequency.effectsSequence.length ||
                0 !== this.pointsType.effectsSequence.length);
          }),
          (ZigZagModifier.prototype.processPath = function (t, e, i, s) {
            var n = t._length,
              a = shapePool.newElement();
            if (((a.c = t.c), t.c || (n -= 1), 0 === n)) return a;
            var o = -1,
              h = PolynomialBezier.shapeSegment(t, 0);
            zigZagCorner(a, t, 0, e, i, s, o);
            for (var l = 0; l < n; l += 1)
              (o = zigZagSegment(a, h, e, i, s, -o)),
                (h = l !== n - 1 || t.c ? PolynomialBezier.shapeSegment(t, (l + 1) % n) : null),
                zigZagCorner(a, t, l + 1, e, i, s, o);
            return a;
          }),
          (ZigZagModifier.prototype.processShapes = function (t) {
            var e,
              i,
              s,
              n,
              a,
              o,
              h = this.shapes.length,
              l = this.amplitude.v,
              p = Math.max(0, Math.round(this.frequency.v)),
              f = this.pointsType.v;
            if (0 !== l)
              for (i = 0; i < h; i += 1) {
                if (((o = (a = this.shapes[i]).localShapeCollection), a.shape._mdf || this._mdf || t))
                  for (
                    o.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, n = a.shape.paths._length, s = 0;
                    s < n;
                    s += 1
                  )
                    o.addShape(this.processPath(e[s], l, p, f));
                a.shape.paths = a.localShapeCollection;
              }
            this.dynamicProperties.length || (this._mdf = !1);
          }),
          extendPrototype([ShapeModifier], OffsetPathModifier),
          (OffsetPathModifier.prototype.initModifierProperties = function (t, e) {
            (this.getValue = this.processKeys),
              (this.amount = PropertyFactory.getProp(t, e.a, 0, null, this)),
              (this.miterLimit = PropertyFactory.getProp(t, e.ml, 0, null, this)),
              (this.lineJoin = e.lj),
              (this._isAnimated = 0 !== this.amount.effectsSequence.length);
          }),
          (OffsetPathModifier.prototype.processPath = function (t, e, i, s) {
            var n = shapePool.newElement();
            n.c = t.c;
            var a,
              o,
              h,
              l = t.length();
            t.c || (l -= 1);
            var p = [];
            for (a = 0; a < l; a += 1) (h = PolynomialBezier.shapeSegment(t, a)), p.push(offsetSegmentSplit(h, e));
            if (!t.c)
              for (a = l - 1; a >= 0; a -= 1)
                (h = PolynomialBezier.shapeSegmentInverted(t, a)), p.push(offsetSegmentSplit(h, e));
            p = pruneIntersections(p);
            var f = null,
              u = null;
            for (a = 0; a < p.length; a += 1) {
              var c = p[a];
              for (u && (f = joinLines(n, u, c[0], i, s)), u = c[c.length - 1], o = 0; o < c.length; o += 1)
                (h = c[o]),
                  f && pointEqual(h.points[0], f)
                    ? n.setXYAt(h.points[1][0], h.points[1][1], 'o', n.length() - 1)
                    : n.setTripleAt(
                        h.points[0][0],
                        h.points[0][1],
                        h.points[1][0],
                        h.points[1][1],
                        h.points[0][0],
                        h.points[0][1],
                        n.length(),
                      ),
                  n.setTripleAt(
                    h.points[3][0],
                    h.points[3][1],
                    h.points[3][0],
                    h.points[3][1],
                    h.points[2][0],
                    h.points[2][1],
                    n.length(),
                  ),
                  (f = h.points[3]);
            }
            return p.length && joinLines(n, u, p[0][0], i, s), n;
          }),
          (OffsetPathModifier.prototype.processShapes = function (t) {
            var e,
              i,
              s,
              n,
              a,
              o,
              h = this.shapes.length,
              l = this.amount.v,
              p = this.miterLimit.v,
              f = this.lineJoin;
            if (0 !== l)
              for (i = 0; i < h; i += 1) {
                if (((o = (a = this.shapes[i]).localShapeCollection), a.shape._mdf || this._mdf || t))
                  for (
                    o.releaseShapes(), a.shape._mdf = !0, e = a.shape.paths.shapes, n = a.shape.paths._length, s = 0;
                    s < n;
                    s += 1
                  )
                    o.addShape(this.processPath(e[s], l, f, p));
                a.shape.paths = a.localShapeCollection;
              }
            this.dynamicProperties.length || (this._mdf = !1);
          });
        var FontManager = (function () {
          var t = { w: 0, size: 0, shapes: [], data: { shapes: [] } },
            e = [];
          e = e.concat([
            2304, 2305, 2306, 2307, 2362, 2363, 2364, 2364, 2366, 2367, 2368, 2369, 2370, 2371, 2372, 2373, 2374, 2375,
            2376, 2377, 2378, 2379, 2380, 2381, 2382, 2383, 2387, 2388, 2389, 2390, 2391, 2402, 2403,
          ]);
          var i = ['d83cdffb', 'd83cdffc', 'd83cdffd', 'd83cdffe', 'd83cdfff'],
            s = [65039, 8205];
          function n(t, e) {
            var i = createTag('span');
            i.setAttribute('aria-hidden', !0), (i.style.fontFamily = e);
            var s = createTag('span');
            (s.innerText = 'giItT1WQy@!-/#'),
              (i.style.position = 'absolute'),
              (i.style.left = '-10000px'),
              (i.style.top = '-10000px'),
              (i.style.fontSize = '300px'),
              (i.style.fontVariant = 'normal'),
              (i.style.fontStyle = 'normal'),
              (i.style.fontWeight = 'normal'),
              (i.style.letterSpacing = '0'),
              i.appendChild(s),
              document.body.appendChild(i);
            var n = s.offsetWidth;
            return (
              (s.style.fontFamily =
                (function (t) {
                  var e,
                    i = t.split(','),
                    s = i.length,
                    n = [];
                  for (e = 0; e < s; e += 1) 'sans-serif' !== i[e] && 'monospace' !== i[e] && n.push(i[e]);
                  return n.join(',');
                })(t) +
                ', ' +
                e),
              { node: s, w: n, parent: i }
            );
          }
          function a(t, e) {
            var i,
              s = document.body && e ? 'svg' : 'canvas',
              n = getFontProperties(t);
            if ('svg' === s) {
              var a = createNS('text');
              (a.style.fontSize = '100px'),
                a.setAttribute('font-family', t.fFamily),
                a.setAttribute('font-style', n.style),
                a.setAttribute('font-weight', n.weight),
                (a.textContent = '1'),
                t.fClass
                  ? ((a.style.fontFamily = 'inherit'), a.setAttribute('class', t.fClass))
                  : (a.style.fontFamily = t.fFamily),
                e.appendChild(a),
                (i = a);
            } else {
              var o = new OffscreenCanvas(500, 500).getContext('2d');
              (o.font = n.style + ' ' + n.weight + ' 100px ' + t.fFamily), (i = o);
            }
            return {
              measureText: function (t) {
                return 'svg' === s ? ((i.textContent = t), i.getComputedTextLength()) : i.measureText(t).width;
              },
            };
          }
          var o = function () {
            (this.fonts = []),
              (this.chars = null),
              (this.typekitLoaded = 0),
              (this.isLoaded = !1),
              (this._warned = !1),
              (this.initTime = Date.now()),
              (this.setIsLoadedBinded = this.setIsLoaded.bind(this)),
              (this.checkLoadedFontsBinded = this.checkLoadedFonts.bind(this));
          };
          (o.isModifier = function (t, e) {
            var s = t.toString(16) + e.toString(16);
            return -1 !== i.indexOf(s);
          }),
            (o.isZeroWidthJoiner = function (t, e) {
              return e ? t === s[0] && e === s[1] : t === s[1];
            }),
            (o.isCombinedCharacter = function (t) {
              return -1 !== e.indexOf(t);
            });
          var h = {
            addChars: function (t) {
              if (t) {
                this.chars || (this.chars = []);
                var e,
                  i,
                  s,
                  n = t.length,
                  a = this.chars.length;
                for (e = 0; e < n; e += 1) {
                  for (i = 0, s = !1; i < a; )
                    this.chars[i].style === t[e].style &&
                      this.chars[i].fFamily === t[e].fFamily &&
                      this.chars[i].ch === t[e].ch &&
                      (s = !0),
                      (i += 1);
                  s || (this.chars.push(t[e]), (a += 1));
                }
              }
            },
            addFonts: function (t, e) {
              if (t) {
                if (this.chars) return (this.isLoaded = !0), void (this.fonts = t.list);
                if (!document.body)
                  return (
                    (this.isLoaded = !0),
                    t.list.forEach(function (t) {
                      (t.helper = a(t)), (t.cache = {});
                    }),
                    void (this.fonts = t.list)
                  );
                var i,
                  s = t.list,
                  o = s.length,
                  h = o;
                for (i = 0; i < o; i += 1) {
                  var l,
                    p,
                    f = !0;
                  if (
                    ((s[i].loaded = !1),
                    (s[i].monoCase = n(s[i].fFamily, 'monospace')),
                    (s[i].sansCase = n(s[i].fFamily, 'sans-serif')),
                    s[i].fPath)
                  ) {
                    if ('p' === s[i].fOrigin || 3 === s[i].origin) {
                      if (
                        ((l = document.querySelectorAll(
                          'style[f-forigin="p"][f-family="' +
                            s[i].fFamily +
                            '"], style[f-origin="3"][f-family="' +
                            s[i].fFamily +
                            '"]',
                        )).length > 0 && (f = !1),
                        f)
                      ) {
                        var u = createTag('style');
                        u.setAttribute('f-forigin', s[i].fOrigin),
                          u.setAttribute('f-origin', s[i].origin),
                          u.setAttribute('f-family', s[i].fFamily),
                          (u.type = 'text/css'),
                          (u.innerText =
                            '@font-face {font-family: ' +
                            s[i].fFamily +
                            "; font-style: normal; src: url('" +
                            s[i].fPath +
                            "');}"),
                          e.appendChild(u);
                      }
                    } else if ('g' === s[i].fOrigin || 1 === s[i].origin) {
                      for (
                        l = document.querySelectorAll('link[f-forigin="g"], link[f-origin="1"]'), p = 0;
                        p < l.length;
                        p += 1
                      )
                        -1 !== l[p].href.indexOf(s[i].fPath) && (f = !1);
                      if (f) {
                        var c = createTag('link');
                        c.setAttribute('f-forigin', s[i].fOrigin),
                          c.setAttribute('f-origin', s[i].origin),
                          (c.type = 'text/css'),
                          (c.rel = 'stylesheet'),
                          (c.href = s[i].fPath),
                          document.body.appendChild(c);
                      }
                    } else if ('t' === s[i].fOrigin || 2 === s[i].origin) {
                      for (
                        l = document.querySelectorAll('script[f-forigin="t"], script[f-origin="2"]'), p = 0;
                        p < l.length;
                        p += 1
                      )
                        s[i].fPath === l[p].src && (f = !1);
                      if (f) {
                        var d = createTag('link');
                        d.setAttribute('f-forigin', s[i].fOrigin),
                          d.setAttribute('f-origin', s[i].origin),
                          d.setAttribute('rel', 'stylesheet'),
                          d.setAttribute('href', s[i].fPath),
                          e.appendChild(d);
                      }
                    }
                  } else (s[i].loaded = !0), (h -= 1);
                  (s[i].helper = a(s[i], e)), (s[i].cache = {}), this.fonts.push(s[i]);
                }
                0 === h ? (this.isLoaded = !0) : setTimeout(this.checkLoadedFonts.bind(this), 100);
              } else this.isLoaded = !0;
            },
            getCharData: function (e, i, s) {
              for (var n = 0, a = this.chars.length; n < a; ) {
                if (this.chars[n].ch === e && this.chars[n].style === i && this.chars[n].fFamily === s)
                  return this.chars[n];
                n += 1;
              }
              return (
                (('string' == typeof e && 13 !== e.charCodeAt(0)) || !e) &&
                  console &&
                  console.warn &&
                  !this._warned &&
                  ((this._warned = !0), console.warn('Missing character from exported characters list: ', e, i, s)),
                t
              );
            },
            getFontByName: function (t) {
              for (var e = 0, i = this.fonts.length; e < i; ) {
                if (this.fonts[e].fName === t) return this.fonts[e];
                e += 1;
              }
              return this.fonts[0];
            },
            measureText: function (t, e, i) {
              var s = this.getFontByName(e),
                n = t.charCodeAt(0);
              if (!s.cache[n + 1]) {
                var a = s.helper;
                if (' ' === t) {
                  var o = a.measureText('|' + t + '|'),
                    h = a.measureText('||');
                  s.cache[n + 1] = (o - h) / 100;
                } else s.cache[n + 1] = a.measureText(t) / 100;
              }
              return s.cache[n + 1] * i;
            },
            checkLoadedFonts: function () {
              var t,
                e,
                i,
                s = this.fonts.length,
                n = s;
              for (t = 0; t < s; t += 1)
                this.fonts[t].loaded
                  ? (n -= 1)
                  : 'n' === this.fonts[t].fOrigin || 0 === this.fonts[t].origin
                  ? (this.fonts[t].loaded = !0)
                  : ((e = this.fonts[t].monoCase.node),
                    (i = this.fonts[t].monoCase.w),
                    e.offsetWidth !== i
                      ? ((n -= 1), (this.fonts[t].loaded = !0))
                      : ((e = this.fonts[t].sansCase.node),
                        (i = this.fonts[t].sansCase.w),
                        e.offsetWidth !== i && ((n -= 1), (this.fonts[t].loaded = !0))),
                    this.fonts[t].loaded &&
                      (this.fonts[t].sansCase.parent.parentNode.removeChild(this.fonts[t].sansCase.parent),
                      this.fonts[t].monoCase.parent.parentNode.removeChild(this.fonts[t].monoCase.parent)));
              0 !== n && Date.now() - this.initTime < 5e3
                ? setTimeout(this.checkLoadedFontsBinded, 20)
                : setTimeout(this.setIsLoadedBinded, 10);
            },
            setIsLoaded: function () {
              this.isLoaded = !0;
            },
          };
          return (o.prototype = h), o;
        })();
        function RenderableElement() {}
        RenderableElement.prototype = {
          initRenderable: function () {
            (this.isInRange = !1), (this.hidden = !1), (this.isTransparent = !1), (this.renderableComponents = []);
          },
          addRenderableComponent: function (t) {
            -1 === this.renderableComponents.indexOf(t) && this.renderableComponents.push(t);
          },
          removeRenderableComponent: function (t) {
            -1 !== this.renderableComponents.indexOf(t) &&
              this.renderableComponents.splice(this.renderableComponents.indexOf(t), 1);
          },
          prepareRenderableFrame: function (t) {
            this.checkLayerLimits(t);
          },
          checkTransparency: function () {
            this.finalTransform.mProp.o.v <= 0
              ? !this.isTransparent &&
                this.globalData.renderConfig.hideOnTransparent &&
                ((this.isTransparent = !0), this.hide())
              : this.isTransparent && ((this.isTransparent = !1), this.show());
          },
          checkLayerLimits: function (t) {
            this.data.ip - this.data.st <= t && this.data.op - this.data.st > t
              ? !0 !== this.isInRange &&
                ((this.globalData._mdf = !0), (this._mdf = !0), (this.isInRange = !0), this.show())
              : !1 !== this.isInRange && ((this.globalData._mdf = !0), (this.isInRange = !1), this.hide());
          },
          renderRenderable: function () {
            var t,
              e = this.renderableComponents.length;
            for (t = 0; t < e; t += 1) this.renderableComponents[t].renderFrame(this._isFirstFrame);
          },
          sourceRectAtTime: function () {
            return { top: 0, left: 0, width: 100, height: 100 };
          },
          getLayerSize: function () {
            return 5 === this.data.ty
              ? { w: this.data.textData.width, h: this.data.textData.height }
              : { w: this.data.width, h: this.data.height };
          },
        };
        var blendModeEnums,
          getBlendMode =
            ((blendModeEnums = {
              0: 'source-over',
              1: 'multiply',
              2: 'screen',
              3: 'overlay',
              4: 'darken',
              5: 'lighten',
              6: 'color-dodge',
              7: 'color-burn',
              8: 'hard-light',
              9: 'soft-light',
              10: 'difference',
              11: 'exclusion',
              12: 'hue',
              13: 'saturation',
              14: 'color',
              15: 'luminosity',
            }),
            function (t) {
              return blendModeEnums[t] || '';
            });
        function SliderEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
        }
        function AngleEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
        }
        function ColorEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 1, 0, i);
        }
        function PointEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 1, 0, i);
        }
        function LayerIndexEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
        }
        function MaskIndexEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
        }
        function CheckboxEffect(t, e, i) {
          this.p = PropertyFactory.getProp(e, t.v, 0, 0, i);
        }
        function NoValueEffect() {
          this.p = {};
        }
        function EffectsManager(t, e) {
          var i,
            s = t.ef || [];
          this.effectElements = [];
          var n,
            a = s.length;
          for (i = 0; i < a; i += 1) (n = new GroupEffect(s[i], e)), this.effectElements.push(n);
        }
        function GroupEffect(t, e) {
          this.init(t, e);
        }
        function BaseElement() {}
        function FrameElement() {}
        function FootageElement(t, e, i) {
          this.initFrame(),
            this.initRenderable(),
            (this.assetData = e.getAssetData(t.refId)),
            (this.footageData = e.imageLoader.getAsset(this.assetData)),
            this.initBaseData(t, e, i);
        }
        function AudioElement(t, e, i) {
          this.initFrame(),
            this.initRenderable(),
            (this.assetData = e.getAssetData(t.refId)),
            this.initBaseData(t, e, i),
            (this._isPlaying = !1),
            (this._canPlay = !1);
          var s = this.globalData.getAssetsPath(this.assetData);
          (this.audio = this.globalData.audioController.createAudio(s)),
            (this._currentTime = 0),
            this.globalData.audioController.addAudio(this),
            (this._volumeMultiplier = 1),
            (this._volume = 1),
            (this._previousVolume = null),
            (this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : { _placeholder: !0 }),
            (this.lv = PropertyFactory.getProp(this, t.au && t.au.lv ? t.au.lv : { k: [100] }, 1, 0.01, this));
        }
        function BaseRenderer() {}
        function TransformElement() {}
        function MaskElement(t, e, i) {
          (this.data = t),
            (this.element = e),
            (this.globalData = i),
            (this.storedData = []),
            (this.masksProperties = this.data.masksProperties || []),
            (this.maskElement = null);
          var s,
            n,
            a,
            o = this.globalData.defs,
            h = this.masksProperties ? this.masksProperties.length : 0;
          (this.viewData = createSizedArray(h)), (this.solidPath = '');
          var l,
            p,
            f,
            u,
            c,
            d,
            m = this.masksProperties,
            $ = 0,
            g = [],
            y = createElementID(),
            v = 'clipPath',
            _ = 'clipPath';
          for (n = 0; n < h; n += 1)
            if (
              ((('a' !== m[n].mode && 'n' !== m[n].mode) || m[n].inv || 100 !== m[n].o.k || m[n].o.x) &&
                ((v = 'mask'), (_ = 'mask')),
              ('s' !== m[n].mode && 'i' !== m[n].mode) || 0 !== $
                ? (f = null)
                : ((f = createNS('rect')).setAttribute('fill', '#ffffff'),
                  f.setAttribute('width', this.element.comp.data.w || 0),
                  f.setAttribute('height', this.element.comp.data.h || 0),
                  g.push(f)),
              (a = createNS('path')),
              'n' === m[n].mode)
            )
              (this.viewData[n] = {
                op: PropertyFactory.getProp(this.element, m[n].o, 0, 0.01, this.element),
                prop: ShapePropertyFactory.getShapeProp(this.element, m[n], 3),
                elem: a,
                lastPath: '',
              }),
                o.appendChild(a);
            else {
              if (
                (($ += 1),
                a.setAttribute('fill', 's' === m[n].mode ? '#000000' : '#ffffff'),
                a.setAttribute('clip-rule', 'nonzero'),
                0 !== m[n].x.k
                  ? ((v = 'mask'),
                    (_ = 'mask'),
                    (d = PropertyFactory.getProp(this.element, m[n].x, 0, null, this.element)),
                    (s = createElementID()),
                    (u = createNS('filter')).setAttribute('id', s),
                    (c = createNS('feMorphology')).setAttribute('operator', 'erode'),
                    c.setAttribute('in', 'SourceGraphic'),
                    c.setAttribute('radius', '0'),
                    u.appendChild(c),
                    o.appendChild(u),
                    a.setAttribute('stroke', 's' === m[n].mode ? '#000000' : '#ffffff'))
                  : ((c = null), (d = null)),
                (this.storedData[n] = {
                  elem: a,
                  x: d,
                  expan: c,
                  lastPath: '',
                  lastOperator: '',
                  filterId: s,
                  lastRadius: 0,
                }),
                'i' === m[n].mode)
              ) {
                p = g.length;
                var b = createNS('g');
                for (l = 0; l < p; l += 1) b.appendChild(g[l]);
                var x = createNS('mask');
                x.setAttribute('mask-type', 'alpha'),
                  x.setAttribute('id', y + '_' + $),
                  x.appendChild(a),
                  o.appendChild(x),
                  b.setAttribute('mask', 'url(' + getLocationHref() + '#' + y + '_' + $ + ')'),
                  (g.length = 0),
                  g.push(b);
              } else g.push(a);
              m[n].inv && !this.solidPath && (this.solidPath = this.createLayerSolidPath()),
                (this.viewData[n] = {
                  elem: a,
                  lastPath: '',
                  op: PropertyFactory.getProp(this.element, m[n].o, 0, 0.01, this.element),
                  prop: ShapePropertyFactory.getShapeProp(this.element, m[n], 3),
                  invRect: f,
                }),
                this.viewData[n].prop.k || this.drawPath(m[n], this.viewData[n].prop.v, this.viewData[n]);
            }
          for (this.maskElement = createNS(v), h = g.length, n = 0; n < h; n += 1) this.maskElement.appendChild(g[n]);
          $ > 0 &&
            (this.maskElement.setAttribute('id', y),
            this.element.maskedElement.setAttribute(_, 'url(' + getLocationHref() + '#' + y + ')'),
            o.appendChild(this.maskElement)),
            this.viewData.length && this.element.addRenderableComponent(this);
        }
        extendPrototype([DynamicPropertyContainer], GroupEffect),
          (GroupEffect.prototype.getValue = GroupEffect.prototype.iterateDynamicProperties),
          (GroupEffect.prototype.init = function (t, e) {
            (this.data = t), (this.effectElements = []), this.initDynamicPropertyContainer(e);
            var i,
              s,
              n = this.data.ef.length,
              a = this.data.ef;
            for (i = 0; i < n; i += 1) {
              switch (((s = null), a[i].ty)) {
                case 0:
                  s = new SliderEffect(a[i], e, this);
                  break;
                case 1:
                  s = new AngleEffect(a[i], e, this);
                  break;
                case 2:
                  s = new ColorEffect(a[i], e, this);
                  break;
                case 3:
                  s = new PointEffect(a[i], e, this);
                  break;
                case 4:
                case 7:
                  s = new CheckboxEffect(a[i], e, this);
                  break;
                case 10:
                  s = new LayerIndexEffect(a[i], e, this);
                  break;
                case 11:
                  s = new MaskIndexEffect(a[i], e, this);
                  break;
                case 5:
                  s = new EffectsManager(a[i], e, this);
                  break;
                default:
                  s = new NoValueEffect(a[i], e, this);
              }
              s && this.effectElements.push(s);
            }
          }),
          (BaseElement.prototype = {
            checkMasks: function () {
              if (!this.data.hasMask) return !1;
              for (var t = 0, e = this.data.masksProperties.length; t < e; ) {
                if ('n' !== this.data.masksProperties[t].mode && !1 !== this.data.masksProperties[t].cl) return !0;
                t += 1;
              }
              return !1;
            },
            initExpressions: function () {
              var t = getExpressionInterfaces();
              if (t) {
                var e = t('layer'),
                  i = t('effects'),
                  s = t('shape'),
                  n = t('text'),
                  a = t('comp');
                (this.layerInterface = e(this)),
                  this.data.hasMask && this.maskManager && this.layerInterface.registerMaskInterface(this.maskManager);
                var o = i.createEffectsInterface(this, this.layerInterface);
                this.layerInterface.registerEffectsInterface(o),
                  0 === this.data.ty || this.data.xt
                    ? (this.compInterface = a(this))
                    : 4 === this.data.ty
                    ? ((this.layerInterface.shapeInterface = s(this.shapesData, this.itemsData, this.layerInterface)),
                      (this.layerInterface.content = this.layerInterface.shapeInterface))
                    : 5 === this.data.ty &&
                      ((this.layerInterface.textInterface = n(this)),
                      (this.layerInterface.text = this.layerInterface.textInterface));
              }
            },
            setBlendMode: function () {
              var t = getBlendMode(this.data.bm);
              (this.baseElement || this.layerElement).style['mix-blend-mode'] = t;
            },
            initBaseData: function (t, e, i) {
              (this.globalData = e),
                (this.comp = i),
                (this.data = t),
                (this.layerId = createElementID()),
                this.data.sr || (this.data.sr = 1),
                (this.effectsManager = new EffectsManager(this.data, this, this.dynamicProperties));
            },
            getType: function () {
              return this.type;
            },
            sourceRectAtTime: function () {},
          }),
          (FrameElement.prototype = {
            initFrame: function () {
              (this._isFirstFrame = !1), (this.dynamicProperties = []), (this._mdf = !1);
            },
            prepareProperties: function (t, e) {
              var i,
                s = this.dynamicProperties.length;
              for (i = 0; i < s; i += 1)
                (e || (this._isParent && 'transform' === this.dynamicProperties[i].propType)) &&
                  (this.dynamicProperties[i].getValue(),
                  this.dynamicProperties[i]._mdf && ((this.globalData._mdf = !0), (this._mdf = !0)));
            },
            addDynamicProperty: function (t) {
              -1 === this.dynamicProperties.indexOf(t) && this.dynamicProperties.push(t);
            },
          }),
          (FootageElement.prototype.prepareFrame = function () {}),
          extendPrototype([RenderableElement, BaseElement, FrameElement], FootageElement),
          (FootageElement.prototype.getBaseElement = function () {
            return null;
          }),
          (FootageElement.prototype.renderFrame = function () {}),
          (FootageElement.prototype.destroy = function () {}),
          (FootageElement.prototype.initExpressions = function () {
            var t = getExpressionInterfaces();
            if (t) {
              var e = t('footage');
              this.layerInterface = e(this);
            }
          }),
          (FootageElement.prototype.getFootageData = function () {
            return this.footageData;
          }),
          (AudioElement.prototype.prepareFrame = function (t) {
            if ((this.prepareRenderableFrame(t, !0), this.prepareProperties(t, !0), this.tm._placeholder))
              this._currentTime = t / this.data.sr;
            else {
              var e = this.tm.v;
              this._currentTime = e;
            }
            this._volume = this.lv.v[0];
            var i = this._volume * this._volumeMultiplier;
            this._previousVolume !== i && ((this._previousVolume = i), this.audio.volume(i));
          }),
          extendPrototype([RenderableElement, BaseElement, FrameElement], AudioElement),
          (AudioElement.prototype.renderFrame = function () {
            this.isInRange &&
              this._canPlay &&
              (this._isPlaying
                ? (!this.audio.playing() ||
                    Math.abs(this._currentTime / this.globalData.frameRate - this.audio.seek()) > 0.1) &&
                  this.audio.seek(this._currentTime / this.globalData.frameRate)
                : (this.audio.play(),
                  this.audio.seek(this._currentTime / this.globalData.frameRate),
                  (this._isPlaying = !0)));
          }),
          (AudioElement.prototype.show = function () {}),
          (AudioElement.prototype.hide = function () {
            this.audio.pause(), (this._isPlaying = !1);
          }),
          (AudioElement.prototype.pause = function () {
            this.audio.pause(), (this._isPlaying = !1), (this._canPlay = !1);
          }),
          (AudioElement.prototype.resume = function () {
            this._canPlay = !0;
          }),
          (AudioElement.prototype.setRate = function (t) {
            this.audio.rate(t);
          }),
          (AudioElement.prototype.volume = function (t) {
            (this._volumeMultiplier = t),
              (this._previousVolume = t * this._volume),
              this.audio.volume(this._previousVolume);
          }),
          (AudioElement.prototype.getBaseElement = function () {
            return null;
          }),
          (AudioElement.prototype.destroy = function () {}),
          (AudioElement.prototype.sourceRectAtTime = function () {}),
          (AudioElement.prototype.initExpressions = function () {}),
          (BaseRenderer.prototype.checkLayers = function (t) {
            var e,
              i,
              s = this.layers.length;
            for (this.completeLayers = !0, e = s - 1; e >= 0; e -= 1)
              this.elements[e] ||
                ((i = this.layers[e]).ip - i.st <= t - this.layers[e].st &&
                  i.op - i.st > t - this.layers[e].st &&
                  this.buildItem(e)),
                (this.completeLayers = !!this.elements[e] && this.completeLayers);
            this.checkPendingElements();
          }),
          (BaseRenderer.prototype.createItem = function (t) {
            switch (t.ty) {
              case 2:
                return this.createImage(t);
              case 0:
                return this.createComp(t);
              case 1:
                return this.createSolid(t);
              case 3:
              default:
                return this.createNull(t);
              case 4:
                return this.createShape(t);
              case 5:
                return this.createText(t);
              case 6:
                return this.createAudio(t);
              case 13:
                return this.createCamera(t);
              case 15:
                return this.createFootage(t);
            }
          }),
          (BaseRenderer.prototype.createCamera = function () {
            throw Error("You're using a 3d camera. Try the html renderer.");
          }),
          (BaseRenderer.prototype.createAudio = function (t) {
            return new AudioElement(t, this.globalData, this);
          }),
          (BaseRenderer.prototype.createFootage = function (t) {
            return new FootageElement(t, this.globalData, this);
          }),
          (BaseRenderer.prototype.buildAllItems = function () {
            var t,
              e = this.layers.length;
            for (t = 0; t < e; t += 1) this.buildItem(t);
            this.checkPendingElements();
          }),
          (BaseRenderer.prototype.includeLayers = function (t) {
            this.completeLayers = !1;
            var e,
              i,
              s = t.length,
              n = this.layers.length;
            for (e = 0; e < s; e += 1)
              for (i = 0; i < n; ) {
                if (this.layers[i].id === t[e].id) {
                  this.layers[i] = t[e];
                  break;
                }
                i += 1;
              }
          }),
          (BaseRenderer.prototype.setProjectInterface = function (t) {
            this.globalData.projectInterface = t;
          }),
          (BaseRenderer.prototype.initItems = function () {
            this.globalData.progressiveLoad || this.buildAllItems();
          }),
          (BaseRenderer.prototype.buildElementParenting = function (t, e, i) {
            for (var s = this.elements, n = this.layers, a = 0, o = n.length; a < o; )
              n[a].ind == e &&
                (s[a] && !0 !== s[a]
                  ? (i.push(s[a]),
                    s[a].setAsParent(),
                    void 0 !== n[a].parent ? this.buildElementParenting(t, n[a].parent, i) : t.setHierarchy(i))
                  : (this.buildItem(a), this.addPendingElement(t))),
                (a += 1);
          }),
          (BaseRenderer.prototype.addPendingElement = function (t) {
            this.pendingElements.push(t);
          }),
          (BaseRenderer.prototype.searchExtraCompositions = function (t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1)
              if (t[e].xt) {
                var s = this.createComp(t[e]);
                s.initExpressions(), this.globalData.projectInterface.registerComposition(s);
              }
          }),
          (BaseRenderer.prototype.getElementByPath = function (t) {
            var e,
              i = t.shift();
            if ('number' == typeof i) e = this.elements[i];
            else {
              var s,
                n = this.elements.length;
              for (s = 0; s < n; s += 1)
                if (this.elements[s].data.nm === i) {
                  e = this.elements[s];
                  break;
                }
            }
            return 0 === t.length ? e : e.getElementByPath(t);
          }),
          (BaseRenderer.prototype.setupGlobalData = function (t, e) {
            (this.globalData.fontManager = new FontManager()),
              this.globalData.fontManager.addChars(t.chars),
              this.globalData.fontManager.addFonts(t.fonts, e),
              (this.globalData.getAssetData = this.animationItem.getAssetData.bind(this.animationItem)),
              (this.globalData.getAssetsPath = this.animationItem.getAssetsPath.bind(this.animationItem)),
              (this.globalData.imageLoader = this.animationItem.imagePreloader),
              (this.globalData.audioController = this.animationItem.audioController),
              (this.globalData.frameId = 0),
              (this.globalData.frameRate = t.fr),
              (this.globalData.nm = t.nm),
              (this.globalData.compSize = { w: t.w, h: t.h });
          }),
          (TransformElement.prototype = {
            initTransform: function () {
              (this.finalTransform = {
                mProp: this.data.ks
                  ? TransformPropertyFactory.getTransformProperty(this, this.data.ks, this)
                  : { o: 0 },
                _matMdf: !1,
                _opMdf: !1,
                mat: new Matrix(),
              }),
                this.data.ao && (this.finalTransform.mProp.autoOriented = !0),
                this.data.ty;
            },
            renderTransform: function () {
              if (
                ((this.finalTransform._opMdf = this.finalTransform.mProp.o._mdf || this._isFirstFrame),
                (this.finalTransform._matMdf = this.finalTransform.mProp._mdf || this._isFirstFrame),
                this.hierarchy)
              ) {
                var t,
                  e = this.finalTransform.mat,
                  i = 0,
                  s = this.hierarchy.length;
                if (!this.finalTransform._matMdf)
                  for (; i < s; ) {
                    if (this.hierarchy[i].finalTransform.mProp._mdf) {
                      this.finalTransform._matMdf = !0;
                      break;
                    }
                    i += 1;
                  }
                if (this.finalTransform._matMdf)
                  for (t = this.finalTransform.mProp.v.props, e.cloneFromProps(t), i = 0; i < s; i += 1)
                    (t = this.hierarchy[i].finalTransform.mProp.v.props),
                      e.transform(
                        t[0],
                        t[1],
                        t[2],
                        t[3],
                        t[4],
                        t[5],
                        t[6],
                        t[7],
                        t[8],
                        t[9],
                        t[10],
                        t[11],
                        t[12],
                        t[13],
                        t[14],
                        t[15],
                      );
              }
            },
            globalToLocal: function (t) {
              var e = [];
              e.push(this.finalTransform);
              for (var i, s = !0, n = this.comp; s; )
                n.finalTransform ? (n.data.hasMask && e.splice(0, 0, n.finalTransform), (n = n.comp)) : (s = !1);
              var a,
                o = e.length;
              for (i = 0; i < o; i += 1) (a = e[i].mat.applyToPointArray(0, 0, 0)), (t = [t[0] - a[0], t[1] - a[1], 0]);
              return t;
            },
            mHelper: new Matrix(),
          }),
          (MaskElement.prototype.getMaskProperty = function (t) {
            return this.viewData[t].prop;
          }),
          (MaskElement.prototype.renderFrame = function (t) {
            var e,
              i = this.element.finalTransform.mat,
              s = this.masksProperties.length;
            for (e = 0; e < s; e += 1)
              if (
                ((this.viewData[e].prop._mdf || t) &&
                  this.drawPath(this.masksProperties[e], this.viewData[e].prop.v, this.viewData[e]),
                (this.viewData[e].op._mdf || t) &&
                  this.viewData[e].elem.setAttribute('fill-opacity', this.viewData[e].op.v),
                'n' !== this.masksProperties[e].mode &&
                  (this.viewData[e].invRect &&
                    (this.element.finalTransform.mProp._mdf || t) &&
                    this.viewData[e].invRect.setAttribute('transform', i.getInverseMatrix().to2dCSS()),
                  this.storedData[e].x && (this.storedData[e].x._mdf || t)))
              ) {
                var n = this.storedData[e].expan;
                this.storedData[e].x.v < 0
                  ? ('erode' !== this.storedData[e].lastOperator &&
                      ((this.storedData[e].lastOperator = 'erode'),
                      this.storedData[e].elem.setAttribute(
                        'filter',
                        'url(' + getLocationHref() + '#' + this.storedData[e].filterId + ')',
                      )),
                    n.setAttribute('radius', -this.storedData[e].x.v))
                  : ('dilate' !== this.storedData[e].lastOperator &&
                      ((this.storedData[e].lastOperator = 'dilate'),
                      this.storedData[e].elem.setAttribute('filter', null)),
                    this.storedData[e].elem.setAttribute('stroke-width', 2 * this.storedData[e].x.v));
              }
          }),
          (MaskElement.prototype.getMaskelement = function () {
            return this.maskElement;
          }),
          (MaskElement.prototype.createLayerSolidPath = function () {
            var t = 'M0,0 ';
            return (
              (t += ' h' + this.globalData.compSize.w),
              (t += ' v' + this.globalData.compSize.h),
              (t += ' h-' + this.globalData.compSize.w),
              (t += ' v-' + this.globalData.compSize.h + ' ')
            );
          }),
          (MaskElement.prototype.drawPath = function (t, e, i) {
            var s,
              n,
              a = ' M' + e.v[0][0] + ',' + e.v[0][1];
            for (n = e._length, s = 1; s < n; s += 1)
              a +=
                ' C' +
                e.o[s - 1][0] +
                ',' +
                e.o[s - 1][1] +
                ' ' +
                e.i[s][0] +
                ',' +
                e.i[s][1] +
                ' ' +
                e.v[s][0] +
                ',' +
                e.v[s][1];
            if (
              (e.c &&
                n > 1 &&
                (a +=
                  ' C' +
                  e.o[s - 1][0] +
                  ',' +
                  e.o[s - 1][1] +
                  ' ' +
                  e.i[0][0] +
                  ',' +
                  e.i[0][1] +
                  ' ' +
                  e.v[0][0] +
                  ',' +
                  e.v[0][1]),
              i.lastPath !== a)
            ) {
              var o = '';
              i.elem && (e.c && (o = t.inv ? this.solidPath + a : a), i.elem.setAttribute('d', o)), (i.lastPath = a);
            }
          }),
          (MaskElement.prototype.destroy = function () {
            (this.element = null),
              (this.globalData = null),
              (this.maskElement = null),
              (this.data = null),
              (this.masksProperties = null);
          });
        var filtersFactory = {
            createFilter: function (t, e) {
              var i = createNS('filter');
              return (
                i.setAttribute('id', t),
                !0 !== e &&
                  (i.setAttribute('filterUnits', 'objectBoundingBox'),
                  i.setAttribute('x', '0%'),
                  i.setAttribute('y', '0%'),
                  i.setAttribute('width', '100%'),
                  i.setAttribute('height', '100%')),
                i
              );
            },
            createAlphaToLuminanceFilter: function () {
              var t = createNS('feColorMatrix');
              return (
                t.setAttribute('type', 'matrix'),
                t.setAttribute('color-interpolation-filters', 'sRGB'),
                t.setAttribute('values', '0 0 0 1 0  0 0 0 1 0  0 0 0 1 0  0 0 0 1 1'),
                t
              );
            },
          },
          featureSupport =
            ((t = { maskType: !0 }),
            (/MSIE 10/i.test(navigator.userAgent) ||
              /MSIE 9/i.test(navigator.userAgent) ||
              /rv:11.0/i.test(navigator.userAgent) ||
              /Edge\/\d./i.test(navigator.userAgent)) &&
              (t.maskType = !1),
            t),
          registeredEffects = {},
          idPrefix = 'filter_result_';
        function SVGEffects(t) {
          var e,
            i,
            s = 'SourceGraphic',
            n = t.data.ef ? t.data.ef.length : 0,
            a = createElementID(),
            o = filtersFactory.createFilter(a, !0),
            h = 0;
          for (this.filters = [], e = 0; e < n; e += 1) {
            i = null;
            var l = t.data.ef[e].ty;
            registeredEffects[l] &&
              ((i = new registeredEffects[l].effect(o, t.effectsManager.effectElements[e], t, idPrefix + h, s)),
              (s = idPrefix + h),
              registeredEffects[l].countsAsEffect && (h += 1)),
              i && this.filters.push(i);
          }
          h &&
            (t.globalData.defs.appendChild(o),
            t.layerElement.setAttribute('filter', 'url(' + getLocationHref() + '#' + a + ')')),
            this.filters.length && t.addRenderableComponent(this);
        }
        function registerEffect(t, e, i) {
          registeredEffects[t] = { effect: e, countsAsEffect: i };
        }
        function SVGBaseElement() {}
        function HierarchyElement() {}
        function RenderableDOMElement() {}
        function IImageElement(t, e, i) {
          (this.assetData = e.getAssetData(t.refId)),
            this.initElement(t, e, i),
            (this.sourceRect = { top: 0, left: 0, width: this.assetData.w, height: this.assetData.h });
        }
        function ProcessedElement(t, e) {
          (this.elem = t), (this.pos = e);
        }
        function IShapeElement() {}
        (SVGEffects.prototype.renderFrame = function (t) {
          var e,
            i = this.filters.length;
          for (e = 0; e < i; e += 1) this.filters[e].renderFrame(t);
        }),
          (SVGBaseElement.prototype = {
            initRendererElement: function () {
              this.layerElement = createNS('g');
            },
            createContainerElements: function () {
              (this.matteElement = createNS('g')),
                (this.transformedElement = this.layerElement),
                (this.maskedElement = this.layerElement),
                (this._sizeChanged = !1);
              var t = null;
              if (this.data.td) {
                this.matteMasks = {};
                var e = createNS('symbol');
                e.setAttribute('id', this.layerId);
                var i = createNS('g');
                i.appendChild(this.layerElement), e.appendChild(i), (t = i), this.globalData.defs.appendChild(e);
              } else
                this.data.tt
                  ? (this.matteElement.appendChild(this.layerElement),
                    (t = this.matteElement),
                    (this.baseElement = this.matteElement))
                  : (this.baseElement = this.layerElement);
              if (
                (this.data.ln && this.layerElement.setAttribute('id', this.data.ln),
                this.data.cl && this.layerElement.setAttribute('class', this.data.cl),
                0 === this.data.ty && !this.data.hd)
              ) {
                var s = createNS('clipPath'),
                  n = createNS('path');
                n.setAttribute(
                  'd',
                  'M0,0 L' + this.data.w + ',0 L' + this.data.w + ',' + this.data.h + ' L0,' + this.data.h + 'z',
                );
                var a = createElementID();
                if (
                  (s.setAttribute('id', a), s.appendChild(n), this.globalData.defs.appendChild(s), this.checkMasks())
                ) {
                  var o = createNS('g');
                  o.setAttribute('clipPath', 'url(' + getLocationHref() + '#' + a + ')'),
                    o.appendChild(this.layerElement),
                    (this.transformedElement = o),
                    t ? t.appendChild(this.transformedElement) : (this.baseElement = this.transformedElement);
                } else this.layerElement.setAttribute('clipPath', 'url(' + getLocationHref() + '#' + a + ')');
              }
              0 !== this.data.bm && this.setBlendMode();
            },
            renderElement: function () {
              this.finalTransform._matMdf &&
                this.transformedElement.setAttribute('transform', this.finalTransform.mat.to2dCSS()),
                this.finalTransform._opMdf &&
                  this.transformedElement.setAttribute('opacity', this.finalTransform.mProp.o.v);
            },
            destroyBaseElement: function () {
              (this.layerElement = null), (this.matteElement = null), this.maskManager.destroy();
            },
            getBaseElement: function () {
              return this.data.hd ? null : this.baseElement;
            },
            createRenderableComponents: function () {
              (this.maskManager = new MaskElement(this.data, this, this.globalData)),
                (this.renderableEffectsManager = new SVGEffects(this));
            },
            getMatte: function (t) {
              if (!this.matteMasks[t]) {
                var e,
                  i,
                  s,
                  n,
                  a = this.layerId + '_' + t;
                if (1 === t || 3 === t) {
                  var o = createNS('mask');
                  o.setAttribute('id', a),
                    o.setAttribute('mask-type', 3 === t ? 'luminance' : 'alpha'),
                    (s = createNS('use')).setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + this.layerId),
                    o.appendChild(s),
                    this.globalData.defs.appendChild(o),
                    featureSupport.maskType ||
                      1 !== t ||
                      (o.setAttribute('mask-type', 'luminance'),
                      (e = createElementID()),
                      (i = filtersFactory.createFilter(e)),
                      this.globalData.defs.appendChild(i),
                      i.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                      (n = createNS('g')).appendChild(s),
                      o.appendChild(n),
                      n.setAttribute('filter', 'url(' + getLocationHref() + '#' + e + ')'));
                } else if (2 === t) {
                  var h = createNS('mask');
                  h.setAttribute('id', a), h.setAttribute('mask-type', 'alpha');
                  var l = createNS('g');
                  h.appendChild(l), (e = createElementID()), (i = filtersFactory.createFilter(e));
                  var p = createNS('feComponentTransfer');
                  p.setAttribute('in', 'SourceGraphic'), i.appendChild(p);
                  var f = createNS('feFuncA');
                  f.setAttribute('type', 'table'),
                    f.setAttribute('tableValues', '1.0 0.0'),
                    p.appendChild(f),
                    this.globalData.defs.appendChild(i);
                  var u = createNS('rect');
                  u.setAttribute('width', this.comp.data.w),
                    u.setAttribute('height', this.comp.data.h),
                    u.setAttribute('x', '0'),
                    u.setAttribute('y', '0'),
                    u.setAttribute('fill', '#ffffff'),
                    u.setAttribute('opacity', '0'),
                    l.setAttribute('filter', 'url(' + getLocationHref() + '#' + e + ')'),
                    l.appendChild(u),
                    (s = createNS('use')).setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#' + this.layerId),
                    l.appendChild(s),
                    featureSupport.maskType ||
                      (h.setAttribute('mask-type', 'luminance'),
                      i.appendChild(filtersFactory.createAlphaToLuminanceFilter()),
                      (n = createNS('g')),
                      l.appendChild(u),
                      n.appendChild(this.layerElement),
                      l.appendChild(n)),
                    this.globalData.defs.appendChild(h);
                }
                this.matteMasks[t] = a;
              }
              return this.matteMasks[t];
            },
            setMatte: function (t) {
              this.matteElement && this.matteElement.setAttribute('mask', 'url(' + getLocationHref() + '#' + t + ')');
            },
          }),
          (HierarchyElement.prototype = {
            initHierarchy: function () {
              (this.hierarchy = []), (this._isParent = !1), this.checkParenting();
            },
            setHierarchy: function (t) {
              this.hierarchy = t;
            },
            setAsParent: function () {
              this._isParent = !0;
            },
            checkParenting: function () {
              void 0 !== this.data.parent && this.comp.buildElementParenting(this, this.data.parent, []);
            },
          }),
          extendPrototype(
            [
              RenderableElement,
              createProxyFunction({
                initElement: function (t, e, i) {
                  this.initFrame(),
                    this.initBaseData(t, e, i),
                    this.initTransform(t, e, i),
                    this.initHierarchy(),
                    this.initRenderable(),
                    this.initRendererElement(),
                    this.createContainerElements(),
                    this.createRenderableComponents(),
                    this.createContent(),
                    this.hide();
                },
                hide: function () {
                  this.hidden ||
                    (this.isInRange && !this.isTransparent) ||
                    (((this.baseElement || this.layerElement).style.display = 'none'), (this.hidden = !0));
                },
                show: function () {
                  this.isInRange &&
                    !this.isTransparent &&
                    (this.data.hd || ((this.baseElement || this.layerElement).style.display = 'block'),
                    (this.hidden = !1),
                    (this._isFirstFrame = !0));
                },
                renderFrame: function () {
                  this.data.hd ||
                    this.hidden ||
                    (this.renderTransform(),
                    this.renderRenderable(),
                    this.renderElement(),
                    this.renderInnerContent(),
                    this._isFirstFrame && (this._isFirstFrame = !1));
                },
                renderInnerContent: function () {},
                prepareFrame: function (t) {
                  (this._mdf = !1),
                    this.prepareRenderableFrame(t),
                    this.prepareProperties(t, this.isInRange),
                    this.checkTransparency();
                },
                destroy: function () {
                  (this.innerElem = null), this.destroyBaseElement();
                },
              }),
            ],
            RenderableDOMElement,
          ),
          extendPrototype(
            [BaseElement, TransformElement, SVGBaseElement, HierarchyElement, FrameElement, RenderableDOMElement],
            IImageElement,
          ),
          (IImageElement.prototype.createContent = function () {
            var t = this.globalData.getAssetsPath(this.assetData);
            (this.innerElem = createNS('image')),
              this.innerElem.setAttribute('width', this.assetData.w + 'px'),
              this.innerElem.setAttribute('height', this.assetData.h + 'px'),
              this.innerElem.setAttribute(
                'preserveAspectRatio',
                this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio,
              ),
              this.innerElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', t),
              this.layerElement.appendChild(this.innerElem);
          }),
          (IImageElement.prototype.sourceRectAtTime = function () {
            return this.sourceRect;
          }),
          (IShapeElement.prototype = {
            addShapeToModifiers: function (t) {
              var e,
                i = this.shapeModifiers.length;
              for (e = 0; e < i; e += 1) this.shapeModifiers[e].addShape(t);
            },
            isShapeInAnimatedModifiers: function (t) {
              for (var e = this.shapeModifiers.length; 0 < e; )
                if (this.shapeModifiers[0].isAnimatedWithShape(t)) return !0;
              return !1;
            },
            renderModifiers: function () {
              if (this.shapeModifiers.length) {
                var t,
                  e = this.shapes.length;
                for (t = 0; t < e; t += 1) this.shapes[t].sh.reset();
                for (
                  t = (e = this.shapeModifiers.length) - 1;
                  t >= 0 && !this.shapeModifiers[t].processShapes(this._isFirstFrame);
                  t -= 1
                );
              }
            },
            searchProcessedElement: function (t) {
              for (var e = this.processedElements, i = 0, s = e.length; i < s; ) {
                if (e[i].elem === t) return e[i].pos;
                i += 1;
              }
              return 0;
            },
            addProcessedElement: function (t, e) {
              for (var i = this.processedElements, s = i.length; s; )
                if (i[(s -= 1)].elem === t) return void (i[s].pos = e);
              i.push(new ProcessedElement(t, e));
            },
            prepareFrame: function (t) {
              this.prepareRenderableFrame(t), this.prepareProperties(t, this.isInRange);
            },
          });
        var lineCapEnum = { 1: 'butt', 2: 'round', 3: 'square' },
          lineJoinEnum = { 1: 'miter', 2: 'round', 3: 'bevel' };
        function SVGShapeData(t, e, i) {
          (this.caches = []),
            (this.styles = []),
            (this.transformers = t),
            (this.lStr = ''),
            (this.sh = i),
            (this.lvl = e),
            (this._isAnimated = !!i.k);
          for (var s = 0, n = t.length; s < n; ) {
            if (t[s].mProps.dynamicProperties.length) {
              this._isAnimated = !0;
              break;
            }
            s += 1;
          }
        }
        function SVGStyleData(t, e) {
          (this.data = t),
            (this.type = t.ty),
            (this.d = ''),
            (this.lvl = e),
            (this._mdf = !1),
            (this.closed = !0 === t.hd),
            (this.pElem = createNS('path')),
            (this.msElem = null);
        }
        function DashProperty(t, e, i, s) {
          (this.elem = t),
            (this.frameId = -1),
            (this.dataProps = createSizedArray(e.length)),
            (this.renderer = i),
            (this.k = !1),
            (this.dashStr = ''),
            (this.dashArray = createTypedArray('float32', e.length ? e.length - 1 : 0)),
            (this.dashoffset = createTypedArray('float32', 1)),
            this.initDynamicPropertyContainer(s);
          var n,
            a,
            o = e.length || 0;
          for (n = 0; n < o; n += 1)
            (a = PropertyFactory.getProp(t, e[n].v, 0, 0, this)),
              (this.k = a.k || this.k),
              (this.dataProps[n] = { n: e[n].n, p: a });
          this.k || this.getValue(!0), (this._isAnimated = this.k);
        }
        function SVGStrokeStyleData(t, e, i) {
          this.initDynamicPropertyContainer(t),
            (this.getValue = this.iterateDynamicProperties),
            (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
            (this.w = PropertyFactory.getProp(t, e.w, 0, null, this)),
            (this.d = new DashProperty(t, e.d || {}, 'svg', this)),
            (this.c = PropertyFactory.getProp(t, e.c, 1, 255, this)),
            (this.style = i),
            (this._isAnimated = !!this._isAnimated);
        }
        function SVGFillStyleData(t, e, i) {
          this.initDynamicPropertyContainer(t),
            (this.getValue = this.iterateDynamicProperties),
            (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
            (this.c = PropertyFactory.getProp(t, e.c, 1, 255, this)),
            (this.style = i);
        }
        function SVGNoStyleData(t, e, i) {
          this.initDynamicPropertyContainer(t), (this.getValue = this.iterateDynamicProperties), (this.style = i);
        }
        function GradientProperty(t, e, i) {
          (this.data = e), (this.c = createTypedArray('uint8c', 4 * e.p));
          var s = e.k.k[0].s ? e.k.k[0].s.length - 4 * e.p : e.k.k.length - 4 * e.p;
          (this.o = createTypedArray('float32', s)),
            (this._cmdf = !1),
            (this._omdf = !1),
            (this._collapsable = this.checkCollapsable()),
            (this._hasOpacity = s),
            this.initDynamicPropertyContainer(i),
            (this.prop = PropertyFactory.getProp(t, e.k, 1, null, this)),
            (this.k = this.prop.k),
            this.getValue(!0);
        }
        function SVGGradientFillStyleData(t, e, i) {
          this.initDynamicPropertyContainer(t),
            (this.getValue = this.iterateDynamicProperties),
            this.initGradientData(t, e, i);
        }
        function SVGGradientStrokeStyleData(t, e, i) {
          this.initDynamicPropertyContainer(t),
            (this.getValue = this.iterateDynamicProperties),
            (this.w = PropertyFactory.getProp(t, e.w, 0, null, this)),
            (this.d = new DashProperty(t, e.d || {}, 'svg', this)),
            this.initGradientData(t, e, i),
            (this._isAnimated = !!this._isAnimated);
        }
        function ShapeGroupData() {
          (this.it = []), (this.prevViewData = []), (this.gr = createNS('g'));
        }
        function SVGTransformData(t, e, i) {
          (this.transform = { mProps: t, op: e, container: i }),
            (this.elements = []),
            (this._isAnimated =
              this.transform.mProps.dynamicProperties.length || this.transform.op.effectsSequence.length);
        }
        (SVGShapeData.prototype.setAsAnimated = function () {
          this._isAnimated = !0;
        }),
          (SVGStyleData.prototype.reset = function () {
            (this.d = ''), (this._mdf = !1);
          }),
          (DashProperty.prototype.getValue = function (t) {
            if (
              (this.elem.globalData.frameId !== this.frameId || t) &&
              ((this.frameId = this.elem.globalData.frameId),
              this.iterateDynamicProperties(),
              (this._mdf = this._mdf || t),
              this._mdf)
            ) {
              var e = 0,
                i = this.dataProps.length;
              for ('svg' === this.renderer && (this.dashStr = ''), e = 0; e < i; e += 1)
                'o' !== this.dataProps[e].n
                  ? 'svg' === this.renderer
                    ? (this.dashStr += ' ' + this.dataProps[e].p.v)
                    : (this.dashArray[e] = this.dataProps[e].p.v)
                  : (this.dashoffset[0] = this.dataProps[e].p.v);
            }
          }),
          extendPrototype([DynamicPropertyContainer], DashProperty),
          extendPrototype([DynamicPropertyContainer], SVGStrokeStyleData),
          extendPrototype([DynamicPropertyContainer], SVGFillStyleData),
          extendPrototype([DynamicPropertyContainer], SVGNoStyleData),
          (GradientProperty.prototype.comparePoints = function (t, e) {
            for (var i = 0, s = this.o.length / 2; i < s; ) {
              if (Math.abs(t[4 * i] - t[4 * e + 2 * i]) > 0.01) return !1;
              i += 1;
            }
            return !0;
          }),
          (GradientProperty.prototype.checkCollapsable = function () {
            if (this.o.length / 2 != this.c.length / 4) return !1;
            if (this.data.k.k[0].s)
              for (var t = 0, e = this.data.k.k.length; t < e; ) {
                if (!this.comparePoints(this.data.k.k[t].s, this.data.p)) return !1;
                t += 1;
              }
            else if (!this.comparePoints(this.data.k.k, this.data.p)) return !1;
            return !0;
          }),
          (GradientProperty.prototype.getValue = function (t) {
            if ((this.prop.getValue(), (this._mdf = !1), (this._cmdf = !1), (this._omdf = !1), this.prop._mdf || t)) {
              var e,
                i,
                s,
                n = 4 * this.data.p;
              for (e = 0; e < n; e += 1)
                (i = e % 4 == 0 ? 100 : 255),
                  (s = Math.round(this.prop.v[e] * i)),
                  this.c[e] !== s && ((this.c[e] = s), (this._cmdf = !t));
              if (this.o.length)
                for (n = this.prop.v.length, e = 4 * this.data.p; e < n; e += 1)
                  (i = e % 2 == 0 ? 100 : 1),
                    (s = e % 2 == 0 ? Math.round(100 * this.prop.v[e]) : this.prop.v[e]),
                    this.o[e - 4 * this.data.p] !== s && ((this.o[e - 4 * this.data.p] = s), (this._omdf = !t));
              this._mdf = !t;
            }
          }),
          extendPrototype([DynamicPropertyContainer], GradientProperty),
          (SVGGradientFillStyleData.prototype.initGradientData = function (t, e, i) {
            (this.o = PropertyFactory.getProp(t, e.o, 0, 0.01, this)),
              (this.s = PropertyFactory.getProp(t, e.s, 1, null, this)),
              (this.e = PropertyFactory.getProp(t, e.e, 1, null, this)),
              (this.h = PropertyFactory.getProp(t, e.h || { k: 0 }, 0, 0.01, this)),
              (this.a = PropertyFactory.getProp(t, e.a || { k: 0 }, 0, degToRads, this)),
              (this.g = new GradientProperty(t, e.g, this)),
              (this.style = i),
              (this.stops = []),
              this.setGradientData(i.pElem, e),
              this.setGradientOpacity(e, i),
              (this._isAnimated = !!this._isAnimated);
          }),
          (SVGGradientFillStyleData.prototype.setGradientData = function (t, e) {
            var i = createElementID(),
              s = createNS(1 === e.t ? 'linearGradient' : 'radialGradient');
            s.setAttribute('id', i),
              s.setAttribute('spreadMethod', 'pad'),
              s.setAttribute('gradientUnits', 'userSpaceOnUse');
            var n,
              a,
              o,
              h = [];
            for (o = 4 * e.g.p, a = 0; a < o; a += 4) (n = createNS('stop')), s.appendChild(n), h.push(n);
            t.setAttribute('gf' === e.ty ? 'fill' : 'stroke', 'url(' + getLocationHref() + '#' + i + ')'),
              (this.gf = s),
              (this.cst = h);
          }),
          (SVGGradientFillStyleData.prototype.setGradientOpacity = function (t, e) {
            if (this.g._hasOpacity && !this.g._collapsable) {
              var i,
                s,
                n,
                a = createNS('mask'),
                o = createNS('path');
              a.appendChild(o);
              var h = createElementID(),
                l = createElementID();
              a.setAttribute('id', l);
              var p = createNS(1 === t.t ? 'linearGradient' : 'radialGradient');
              p.setAttribute('id', h),
                p.setAttribute('spreadMethod', 'pad'),
                p.setAttribute('gradientUnits', 'userSpaceOnUse'),
                (n = t.g.k.k[0].s ? t.g.k.k[0].s.length : t.g.k.k.length);
              var f = this.stops;
              for (s = 4 * t.g.p; s < n; s += 2)
                (i = createNS('stop')).setAttribute('stop-color', 'rgb(255,255,255)'), p.appendChild(i), f.push(i);
              o.setAttribute('gf' === t.ty ? 'fill' : 'stroke', 'url(' + getLocationHref() + '#' + h + ')'),
                'gs' === t.ty &&
                  (o.setAttribute('stroke-linecap', lineCapEnum[t.lc || 2]),
                  o.setAttribute('stroke-linejoin', lineJoinEnum[t.lj || 2]),
                  1 === t.lj && o.setAttribute('stroke-miterlimit', t.ml)),
                (this.of = p),
                (this.ms = a),
                (this.ost = f),
                (this.maskId = l),
                (e.msElem = o);
            }
          }),
          extendPrototype([DynamicPropertyContainer], SVGGradientFillStyleData),
          extendPrototype([SVGGradientFillStyleData, DynamicPropertyContainer], SVGGradientStrokeStyleData);
        var buildShapeString = function (t, e, i, s) {
            if (0 === e) return '';
            var n,
              a = t.o,
              o = t.i,
              h = t.v,
              l = ' M' + s.applyToPointStringified(h[0][0], h[0][1]);
            for (n = 1; n < e; n += 1)
              l +=
                ' C' +
                s.applyToPointStringified(a[n - 1][0], a[n - 1][1]) +
                ' ' +
                s.applyToPointStringified(o[n][0], o[n][1]) +
                ' ' +
                s.applyToPointStringified(h[n][0], h[n][1]);
            return (
              i &&
                e &&
                ((l +=
                  ' C' +
                  s.applyToPointStringified(a[n - 1][0], a[n - 1][1]) +
                  ' ' +
                  s.applyToPointStringified(o[0][0], o[0][1]) +
                  ' ' +
                  s.applyToPointStringified(h[0][0], h[0][1])),
                (l += 'z')),
              l
            );
          },
          SVGElementsRenderer = (function () {
            var t = new Matrix(),
              e = new Matrix();
            function i(t, e, i) {
              (i || e.transform.op._mdf) && e.transform.container.setAttribute('opacity', e.transform.op.v),
                (i || e.transform.mProps._mdf) &&
                  e.transform.container.setAttribute('transform', e.transform.mProps.v.to2dCSS());
            }
            function s() {}
            function n(i, s, n) {
              var a,
                o,
                h,
                l,
                p,
                f,
                u,
                c,
                d,
                m,
                $,
                g = s.styles.length,
                y = s.lvl;
              for (f = 0; f < g; f += 1) {
                if (((l = s.sh._mdf || n), s.styles[f].lvl < y)) {
                  for (c = e.reset(), m = y - s.styles[f].lvl, $ = s.transformers.length - 1; !l && m > 0; )
                    (l = s.transformers[$].mProps._mdf || l), (m -= 1), ($ -= 1);
                  if (l)
                    for (m = y - s.styles[f].lvl, $ = s.transformers.length - 1; m > 0; )
                      (d = s.transformers[$].mProps.v.props),
                        c.transform(
                          d[0],
                          d[1],
                          d[2],
                          d[3],
                          d[4],
                          d[5],
                          d[6],
                          d[7],
                          d[8],
                          d[9],
                          d[10],
                          d[11],
                          d[12],
                          d[13],
                          d[14],
                          d[15],
                        ),
                        (m -= 1),
                        ($ -= 1);
                } else c = t;
                if (((o = (u = s.sh.paths)._length), l)) {
                  for (h = '', a = 0; a < o; a += 1)
                    (p = u.shapes[a]) && p._length && (h += buildShapeString(p, p._length, p.c, c));
                  s.caches[f] = h;
                } else h = s.caches[f];
                (s.styles[f].d += !0 === i.hd ? '' : h), (s.styles[f]._mdf = l || s.styles[f]._mdf);
              }
            }
            function a(t, e, i) {
              var s = e.style;
              (e.c._mdf || i) &&
                s.pElem.setAttribute(
                  'fill',
                  'rgb(' + bmFloor(e.c.v[0]) + ',' + bmFloor(e.c.v[1]) + ',' + bmFloor(e.c.v[2]) + ')',
                ),
                (e.o._mdf || i) && s.pElem.setAttribute('fill-opacity', e.o.v);
            }
            function o(t, e, i) {
              h(t, e, i), l(0, e, i);
            }
            function h(t, e, i) {
              var s,
                n,
                a,
                o,
                h,
                l = e.gf,
                p = e.g._hasOpacity,
                f = e.s.v,
                u = e.e.v;
              if (e.o._mdf || i) {
                var c = 'gf' === t.ty ? 'fill-opacity' : 'stroke-opacity';
                e.style.pElem.setAttribute(c, e.o.v);
              }
              if (e.s._mdf || i) {
                var d = 1 === t.t ? 'x1' : 'cx',
                  m = 'x1' === d ? 'y1' : 'cy';
                l.setAttribute(d, f[0]),
                  l.setAttribute(m, f[1]),
                  p && !e.g._collapsable && (e.of.setAttribute(d, f[0]), e.of.setAttribute(m, f[1]));
              }
              if (e.g._cmdf || i) {
                s = e.cst;
                var $ = e.g.c;
                for (a = s.length, n = 0; n < a; n += 1)
                  (o = s[n]).setAttribute('offset', $[4 * n] + '%'),
                    o.setAttribute('stop-color', 'rgb(' + $[4 * n + 1] + ',' + $[4 * n + 2] + ',' + $[4 * n + 3] + ')');
              }
              if (p && (e.g._omdf || i)) {
                var g = e.g.o;
                for (a = (s = e.g._collapsable ? e.cst : e.ost).length, n = 0; n < a; n += 1)
                  (o = s[n]),
                    e.g._collapsable || o.setAttribute('offset', g[2 * n] + '%'),
                    o.setAttribute('stop-opacity', g[2 * n + 1]);
              }
              if (1 === t.t)
                (e.e._mdf || i) &&
                  (l.setAttribute('x2', u[0]),
                  l.setAttribute('y2', u[1]),
                  p && !e.g._collapsable && (e.of.setAttribute('x2', u[0]), e.of.setAttribute('y2', u[1])));
              else if (
                ((e.s._mdf || e.e._mdf || i) &&
                  ((h = Math.sqrt(Math.pow(f[0] - u[0], 2) + Math.pow(f[1] - u[1], 2))),
                  l.setAttribute('r', h),
                  p && !e.g._collapsable && e.of.setAttribute('r', h)),
                e.e._mdf || e.h._mdf || e.a._mdf || i)
              ) {
                h || (h = Math.sqrt(Math.pow(f[0] - u[0], 2) + Math.pow(f[1] - u[1], 2)));
                var y = Math.atan2(u[1] - f[1], u[0] - f[0]),
                  v = e.h.v;
                v >= 1 ? (v = 0.99) : v <= -1 && (v = -0.99);
                var _ = h * v,
                  b = Math.cos(y + e.a.v) * _ + f[0],
                  x = Math.sin(y + e.a.v) * _ + f[1];
                l.setAttribute('fx', b),
                  l.setAttribute('fy', x),
                  p && !e.g._collapsable && (e.of.setAttribute('fx', b), e.of.setAttribute('fy', x));
              }
            }
            function l(t, e, i) {
              var s = e.style,
                n = e.d;
              n &&
                (n._mdf || i) &&
                n.dashStr &&
                (s.pElem.setAttribute('stroke-dasharray', n.dashStr),
                s.pElem.setAttribute('stroke-dashoffset', n.dashoffset[0])),
                e.c &&
                  (e.c._mdf || i) &&
                  s.pElem.setAttribute(
                    'stroke',
                    'rgb(' + bmFloor(e.c.v[0]) + ',' + bmFloor(e.c.v[1]) + ',' + bmFloor(e.c.v[2]) + ')',
                  ),
                (e.o._mdf || i) && s.pElem.setAttribute('stroke-opacity', e.o.v),
                (e.w._mdf || i) &&
                  (s.pElem.setAttribute('stroke-width', e.w.v),
                  s.msElem && s.msElem.setAttribute('stroke-width', e.w.v));
            }
            return {
              createRenderFunction: function (t) {
                switch (t.ty) {
                  case 'fl':
                    return a;
                  case 'gf':
                    return h;
                  case 'gs':
                    return o;
                  case 'st':
                    return l;
                  case 'sh':
                  case 'el':
                  case 'rc':
                  case 'sr':
                    return n;
                  case 'tr':
                    return i;
                  case 'no':
                    return s;
                  default:
                    return null;
                }
              },
            };
          })();
        function SVGShapeElement(t, e, i) {
          (this.shapes = []),
            (this.shapesData = t.shapes),
            (this.stylesList = []),
            (this.shapeModifiers = []),
            (this.itemsData = []),
            (this.processedElements = []),
            (this.animatedContents = []),
            this.initElement(t, e, i),
            (this.prevViewData = []);
        }
        function LetterProps(t, e, i, s, n, a) {
          (this.o = t),
            (this.sw = e),
            (this.sc = i),
            (this.fc = s),
            (this.m = n),
            (this.p = a),
            (this._mdf = { o: !0, sw: !!e, sc: !!i, fc: !!s, m: !0, p: !0 });
        }
        function TextProperty(t, e) {
          (this._frameId = initialDefaultFrame),
            (this.pv = ''),
            (this.v = ''),
            (this.kf = !1),
            (this._isFirstFrame = !0),
            (this._mdf = !1),
            (this.data = e),
            (this.elem = t),
            (this.comp = this.elem.comp),
            (this.keysIndex = 0),
            (this.canResize = !1),
            (this.minimumFontSize = 1),
            (this.effectsSequence = []),
            (this.currentData = {
              ascent: 0,
              boxWidth: this.defaultBoxWidth,
              f: '',
              fStyle: '',
              fWeight: '',
              fc: '',
              j: '',
              justifyOffset: '',
              l: [],
              lh: 0,
              lineWidths: [],
              ls: '',
              of: '',
              s: '',
              sc: '',
              sw: 0,
              t: 0,
              tr: 0,
              sz: 0,
              ps: null,
              fillColorAnim: !1,
              strokeColorAnim: !1,
              strokeWidthAnim: !1,
              yOffset: 0,
              finalSize: 0,
              finalText: [],
              finalLineHeight: 0,
              __complete: !1,
            }),
            this.copyData(this.currentData, this.data.d.k[0].s),
            this.searchProperty() || this.completeTextData(this.currentData);
        }
        extendPrototype(
          [
            BaseElement,
            TransformElement,
            SVGBaseElement,
            IShapeElement,
            HierarchyElement,
            FrameElement,
            RenderableDOMElement,
          ],
          SVGShapeElement,
        ),
          (SVGShapeElement.prototype.initSecondaryElement = function () {}),
          (SVGShapeElement.prototype.identityMatrix = new Matrix()),
          (SVGShapeElement.prototype.buildExpressionInterface = function () {}),
          (SVGShapeElement.prototype.createContent = function () {
            this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0),
              this.filterUniqueShapes();
          }),
          (SVGShapeElement.prototype.filterUniqueShapes = function () {
            var t,
              e,
              i,
              s,
              n = this.shapes.length,
              a = this.stylesList.length,
              o = [],
              h = !1;
            for (i = 0; i < a; i += 1) {
              for (s = this.stylesList[i], h = !1, o.length = 0, t = 0; t < n; t += 1)
                -1 !== (e = this.shapes[t]).styles.indexOf(s) && (o.push(e), (h = e._isAnimated || h));
              o.length > 1 && h && this.setShapesAsAnimated(o);
            }
          }),
          (SVGShapeElement.prototype.setShapesAsAnimated = function (t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1) t[e].setAsAnimated();
          }),
          (SVGShapeElement.prototype.createStyleElement = function (t, e) {
            var i,
              s = new SVGStyleData(t, e),
              n = s.pElem;
            return (
              'st' === t.ty
                ? (i = new SVGStrokeStyleData(this, t, s))
                : 'fl' === t.ty
                ? (i = new SVGFillStyleData(this, t, s))
                : 'gf' === t.ty || 'gs' === t.ty
                ? ((i = new ('gf' === t.ty ? SVGGradientFillStyleData : SVGGradientStrokeStyleData)(this, t, s)),
                  this.globalData.defs.appendChild(i.gf),
                  i.maskId &&
                    (this.globalData.defs.appendChild(i.ms),
                    this.globalData.defs.appendChild(i.of),
                    n.setAttribute('mask', 'url(' + getLocationHref() + '#' + i.maskId + ')')))
                : 'no' === t.ty && (i = new SVGNoStyleData(this, t, s)),
              ('st' !== t.ty && 'gs' !== t.ty) ||
                (n.setAttribute('stroke-linecap', lineCapEnum[t.lc || 2]),
                n.setAttribute('stroke-linejoin', lineJoinEnum[t.lj || 2]),
                n.setAttribute('fill-opacity', '0'),
                1 === t.lj && n.setAttribute('stroke-miterlimit', t.ml)),
              2 === t.r && n.setAttribute('fill-rule', 'evenodd'),
              t.ln && n.setAttribute('id', t.ln),
              t.cl && n.setAttribute('class', t.cl),
              t.bm && (n.style['mix-blend-mode'] = getBlendMode(t.bm)),
              this.stylesList.push(s),
              this.addToAnimatedContents(t, i),
              i
            );
          }),
          (SVGShapeElement.prototype.createGroupElement = function (t) {
            var e = new ShapeGroupData();
            return (
              t.ln && e.gr.setAttribute('id', t.ln),
              t.cl && e.gr.setAttribute('class', t.cl),
              t.bm && (e.gr.style['mix-blend-mode'] = getBlendMode(t.bm)),
              e
            );
          }),
          (SVGShapeElement.prototype.createTransformElement = function (t, e) {
            var i = TransformPropertyFactory.getTransformProperty(this, t, this),
              s = new SVGTransformData(i, i.o, e);
            return this.addToAnimatedContents(t, s), s;
          }),
          (SVGShapeElement.prototype.createShapeElement = function (t, e, i) {
            var s = 4;
            'rc' === t.ty ? (s = 5) : 'el' === t.ty ? (s = 6) : 'sr' === t.ty && (s = 7);
            var n = new SVGShapeData(e, i, ShapePropertyFactory.getShapeProp(this, t, s, this));
            return this.shapes.push(n), this.addShapeToModifiers(n), this.addToAnimatedContents(t, n), n;
          }),
          (SVGShapeElement.prototype.addToAnimatedContents = function (t, e) {
            for (var i = 0, s = this.animatedContents.length; i < s; ) {
              if (this.animatedContents[i].element === e) return;
              i += 1;
            }
            this.animatedContents.push({ fn: SVGElementsRenderer.createRenderFunction(t), element: e, data: t });
          }),
          (SVGShapeElement.prototype.setElementStyles = function (t) {
            var e,
              i = t.styles,
              s = this.stylesList.length;
            for (e = 0; e < s; e += 1) this.stylesList[e].closed || i.push(this.stylesList[e]);
          }),
          (SVGShapeElement.prototype.reloadShapes = function () {
            this._isFirstFrame = !0;
            var t,
              e = this.itemsData.length;
            for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
            for (
              this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.layerElement, 0, [], !0),
                this.filterUniqueShapes(),
                e = this.dynamicProperties.length,
                t = 0;
              t < e;
              t += 1
            )
              this.dynamicProperties[t].getValue();
            this.renderModifiers();
          }),
          (SVGShapeElement.prototype.searchShapes = function (t, e, i, s, n, a, o) {
            var h,
              l,
              p,
              f,
              u,
              c,
              d = [].concat(a),
              m = t.length - 1,
              $ = [],
              g = [];
            for (h = m; h >= 0; h -= 1) {
              if (
                ((c = this.searchProcessedElement(t[h])) ? (e[h] = i[c - 1]) : (t[h]._render = o),
                'fl' === t[h].ty || 'st' === t[h].ty || 'gf' === t[h].ty || 'gs' === t[h].ty || 'no' === t[h].ty)
              )
                c ? (e[h].style.closed = !1) : (e[h] = this.createStyleElement(t[h], n)),
                  t[h]._render && e[h].style.pElem.parentNode !== s && s.appendChild(e[h].style.pElem),
                  $.push(e[h].style);
              else if ('gr' === t[h].ty) {
                if (c) for (p = e[h].it.length, l = 0; l < p; l += 1) e[h].prevViewData[l] = e[h].it[l];
                else e[h] = this.createGroupElement(t[h]);
                this.searchShapes(t[h].it, e[h].it, e[h].prevViewData, e[h].gr, n + 1, d, o),
                  t[h]._render && e[h].gr.parentNode !== s && s.appendChild(e[h].gr);
              } else
                'tr' === t[h].ty
                  ? (c || (e[h] = this.createTransformElement(t[h], s)), (f = e[h].transform), d.push(f))
                  : 'sh' === t[h].ty || 'rc' === t[h].ty || 'el' === t[h].ty || 'sr' === t[h].ty
                  ? (c || (e[h] = this.createShapeElement(t[h], d, n)), this.setElementStyles(e[h]))
                  : 'tm' === t[h].ty ||
                    'rd' === t[h].ty ||
                    'ms' === t[h].ty ||
                    'pb' === t[h].ty ||
                    'zz' === t[h].ty ||
                    'op' === t[h].ty
                  ? (c
                      ? ((u = e[h]).closed = !1)
                      : ((u = ShapeModifiers.getModifier(t[h].ty)).init(this, t[h]),
                        (e[h] = u),
                        this.shapeModifiers.push(u)),
                    g.push(u))
                  : 'rp' === t[h].ty &&
                    (c
                      ? ((u = e[h]).closed = !0)
                      : ((u = ShapeModifiers.getModifier(t[h].ty)),
                        (e[h] = u),
                        u.init(this, t, h, e),
                        this.shapeModifiers.push(u),
                        (o = !1)),
                    g.push(u));
              this.addProcessedElement(t[h], h + 1);
            }
            for (m = $.length, h = 0; h < m; h += 1) $[h].closed = !0;
            for (m = g.length, h = 0; h < m; h += 1) g[h].closed = !0;
          }),
          (SVGShapeElement.prototype.renderInnerContent = function () {
            this.renderModifiers();
            var t,
              e = this.stylesList.length;
            for (t = 0; t < e; t += 1) this.stylesList[t].reset();
            for (this.renderShape(), t = 0; t < e; t += 1)
              (this.stylesList[t]._mdf || this._isFirstFrame) &&
                (this.stylesList[t].msElem &&
                  (this.stylesList[t].msElem.setAttribute('d', this.stylesList[t].d),
                  (this.stylesList[t].d = 'M0 0' + this.stylesList[t].d)),
                this.stylesList[t].pElem.setAttribute('d', this.stylesList[t].d || 'M0 0'));
          }),
          (SVGShapeElement.prototype.renderShape = function () {
            var t,
              e,
              i = this.animatedContents.length;
            for (t = 0; t < i; t += 1)
              (e = this.animatedContents[t]),
                (this._isFirstFrame || e.element._isAnimated) &&
                  !0 !== e.data &&
                  e.fn(e.data, e.element, this._isFirstFrame);
          }),
          (SVGShapeElement.prototype.destroy = function () {
            this.destroyBaseElement(), (this.shapesData = null), (this.itemsData = null);
          }),
          (LetterProps.prototype.update = function (t, e, i, s, n, a) {
            (this._mdf.o = !1),
              (this._mdf.sw = !1),
              (this._mdf.sc = !1),
              (this._mdf.fc = !1),
              (this._mdf.m = !1),
              (this._mdf.p = !1);
            var o = !1;
            return (
              this.o !== t && ((this.o = t), (this._mdf.o = !0), (o = !0)),
              this.sw !== e && ((this.sw = e), (this._mdf.sw = !0), (o = !0)),
              this.sc !== i && ((this.sc = i), (this._mdf.sc = !0), (o = !0)),
              this.fc !== s && ((this.fc = s), (this._mdf.fc = !0), (o = !0)),
              this.m !== n && ((this.m = n), (this._mdf.m = !0), (o = !0)),
              a.length &&
                (this.p[0] !== a[0] ||
                  this.p[1] !== a[1] ||
                  this.p[4] !== a[4] ||
                  this.p[5] !== a[5] ||
                  this.p[12] !== a[12] ||
                  this.p[13] !== a[13]) &&
                ((this.p = a), (this._mdf.p = !0), (o = !0)),
              o
            );
          }),
          (TextProperty.prototype.defaultBoxWidth = [0, 0]),
          (TextProperty.prototype.copyData = function (t, e) {
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
            return t;
          }),
          (TextProperty.prototype.setCurrentData = function (t) {
            t.__complete || this.completeTextData(t),
              (this.currentData = t),
              (this.currentData.boxWidth = this.currentData.boxWidth || this.defaultBoxWidth),
              (this._mdf = !0);
          }),
          (TextProperty.prototype.searchProperty = function () {
            return this.searchKeyframes();
          }),
          (TextProperty.prototype.searchKeyframes = function () {
            return (
              (this.kf = this.data.d.k.length > 1), this.kf && this.addEffect(this.getKeyframeValue.bind(this)), this.kf
            );
          }),
          (TextProperty.prototype.addEffect = function (t) {
            this.effectsSequence.push(t), this.elem.addDynamicProperty(this);
          }),
          (TextProperty.prototype.getValue = function (t) {
            if ((this.elem.globalData.frameId !== this.frameId && this.effectsSequence.length) || t) {
              this.currentData.t = this.data.d.k[this.keysIndex].s.t;
              var e = this.currentData,
                i = this.keysIndex;
              if (this.lock) this.setCurrentData(this.currentData);
              else {
                (this.lock = !0), (this._mdf = !1);
                var s,
                  n = this.effectsSequence.length,
                  a = t || this.data.d.k[this.keysIndex].s;
                for (s = 0; s < n; s += 1)
                  a =
                    i !== this.keysIndex
                      ? this.effectsSequence[s](a, a.t)
                      : this.effectsSequence[s](this.currentData, a.t);
                e !== a && this.setCurrentData(a),
                  (this.v = this.currentData),
                  (this.pv = this.v),
                  (this.lock = !1),
                  (this.frameId = this.elem.globalData.frameId);
              }
            }
          }),
          (TextProperty.prototype.getKeyframeValue = function () {
            for (
              var t = this.data.d.k, e = this.elem.comp.renderedFrame, i = 0, s = t.length;
              i <= s - 1 && !(i === s - 1 || t[i + 1].t > e);

            )
              i += 1;
            return this.keysIndex !== i && (this.keysIndex = i), this.data.d.k[this.keysIndex].s;
          }),
          (TextProperty.prototype.buildFinalText = function (t) {
            for (var e, i, s = [], n = 0, a = t.length, o = !1; n < a; )
              (e = t.charCodeAt(n)),
                FontManager.isCombinedCharacter(e)
                  ? (s[s.length - 1] += t.charAt(n))
                  : e >= 55296 && e <= 56319
                  ? (i = t.charCodeAt(n + 1)) >= 56320 && i <= 57343
                    ? (o || FontManager.isModifier(e, i)
                        ? ((s[s.length - 1] += t.substr(n, 2)), (o = !1))
                        : s.push(t.substr(n, 2)),
                      (n += 1))
                    : s.push(t.charAt(n))
                  : e > 56319
                  ? ((i = t.charCodeAt(n + 1)),
                    FontManager.isZeroWidthJoiner(e, i)
                      ? ((o = !0), (s[s.length - 1] += t.substr(n, 2)), (n += 1))
                      : s.push(t.charAt(n)))
                  : FontManager.isZeroWidthJoiner(e)
                  ? ((s[s.length - 1] += t.charAt(n)), (o = !0))
                  : s.push(t.charAt(n)),
                (n += 1);
            return s;
          }),
          (TextProperty.prototype.completeTextData = function (t) {
            t.__complete = !0;
            var e,
              i,
              s,
              n,
              a,
              o,
              h,
              l = this.elem.globalData.fontManager,
              p = this.data,
              f = [],
              u = 0,
              c = p.m.g,
              d = 0,
              m = 0,
              $ = 0,
              g = [],
              y = 0,
              v = 0,
              _ = l.getFontByName(t.f),
              b = 0,
              x = getFontProperties(_);
            (t.fWeight = x.weight),
              (t.fStyle = x.style),
              (t.finalSize = t.s),
              (t.finalText = this.buildFinalText(t.t)),
              (i = t.finalText.length),
              (t.finalLineHeight = t.lh);
            var P,
              k = (t.tr / 1e3) * t.finalSize;
            if (t.sz)
              for (var w, A, C = !0, E = t.sz[0], D = t.sz[1]; C; ) {
                (w = 0), (y = 0), (i = (A = this.buildFinalText(t.t)).length), (k = (t.tr / 1e3) * t.finalSize);
                var S = -1;
                for (e = 0; e < i; e += 1)
                  (P = A[e].charCodeAt(0)),
                    (s = !1),
                    ' ' === A[e]
                      ? (S = e)
                      : (13 !== P && 3 !== P) || ((y = 0), (s = !0), (w += t.finalLineHeight || 1.2 * t.finalSize)),
                    l.chars
                      ? ((h = l.getCharData(A[e], _.fStyle, _.fFamily)), (b = s ? 0 : (h.w * t.finalSize) / 100))
                      : (b = l.measureText(A[e], t.f, t.finalSize)),
                    y + b > E && ' ' !== A[e]
                      ? (-1 === S ? (i += 1) : (e = S),
                        (w += t.finalLineHeight || 1.2 * t.finalSize),
                        A.splice(e, S === e ? 1 : 0, '\r'),
                        (S = -1),
                        (y = 0))
                      : ((y += b), (y += k));
                (w += (_.ascent * t.finalSize) / 100),
                  this.canResize && t.finalSize > this.minimumFontSize && D < w
                    ? ((t.finalSize -= 1), (t.finalLineHeight = (t.finalSize * t.lh) / t.s))
                    : ((t.finalText = A), (i = t.finalText.length), (C = !1));
              }
            (y = -k), (b = 0);
            var T,
              F = 0;
            for (e = 0; e < i; e += 1)
              if (
                ((s = !1),
                13 === (P = (T = t.finalText[e]).charCodeAt(0)) || 3 === P
                  ? ((F = 0), g.push(y), (v = y > v ? y : v), (y = -2 * k), (n = ''), (s = !0), ($ += 1))
                  : (n = T),
                l.chars
                  ? ((h = l.getCharData(T, _.fStyle, l.getFontByName(t.f).fFamily)),
                    (b = s ? 0 : (h.w * t.finalSize) / 100))
                  : (b = l.measureText(n, t.f, t.finalSize)),
                ' ' === T ? (F += b + k) : ((y += b + k + F), (F = 0)),
                f.push({ l: b, an: b, add: d, n: s, anIndexes: [], val: n, line: $, animatorJustifyOffset: 0 }),
                2 == c)
              ) {
                if (((d += b), '' === n || ' ' === n || e === i - 1)) {
                  for (('' !== n && ' ' !== n) || (d -= b); m <= e; )
                    (f[m].an = d), (f[m].ind = u), (f[m].extra = b), (m += 1);
                  (u += 1), (d = 0);
                }
              } else if (3 == c) {
                if (((d += b), '' === n || e === i - 1)) {
                  for ('' === n && (d -= b); m <= e; ) (f[m].an = d), (f[m].ind = u), (f[m].extra = b), (m += 1);
                  (d = 0), (u += 1);
                }
              } else (f[u].ind = u), (f[u].extra = 0), (u += 1);
            if (((t.l = f), (v = y > v ? y : v), g.push(y), t.sz)) (t.boxWidth = t.sz[0]), (t.justifyOffset = 0);
            else
              switch (((t.boxWidth = v), t.j)) {
                case 1:
                  t.justifyOffset = -t.boxWidth;
                  break;
                case 2:
                  t.justifyOffset = -t.boxWidth / 2;
                  break;
                default:
                  t.justifyOffset = 0;
              }
            t.lineWidths = g;
            var M,
              I,
              L,
              z,
              B = p.a;
            o = B.length;
            var R = [];
            for (a = 0; a < o; a += 1) {
              for (
                (M = B[a]).a.sc && (t.strokeColorAnim = !0),
                  M.a.sw && (t.strokeWidthAnim = !0),
                  (M.a.fc || M.a.fh || M.a.fs || M.a.fb) && (t.fillColorAnim = !0),
                  z = 0,
                  L = M.s.b,
                  e = 0;
                e < i;
                e += 1
              )
                ((I = f[e]).anIndexes[a] = z),
                  ((1 == L && '' !== I.val) ||
                    (2 == L && '' !== I.val && ' ' !== I.val) ||
                    (3 == L && (I.n || ' ' == I.val || e == i - 1)) ||
                    (4 == L && (I.n || e == i - 1))) &&
                    (1 === M.s.rn && R.push(z), (z += 1));
              p.a[a].s.totalChars = z;
              var V,
                O = -1;
              if (1 === M.s.rn)
                for (e = 0; e < i; e += 1)
                  O != (I = f[e]).anIndexes[a] &&
                    ((O = I.anIndexes[a]), (V = R.splice(Math.floor(Math.random() * R.length), 1)[0])),
                    (I.anIndexes[a] = V);
            }
            (t.yOffset = t.finalLineHeight || 1.2 * t.finalSize),
              (t.ls = t.ls || 0),
              (t.ascent = (_.ascent * t.finalSize) / 100);
          }),
          (TextProperty.prototype.updateDocumentData = function (t, e) {
            e = void 0 === e ? this.keysIndex : e;
            var i = this.copyData({}, this.data.d.k[e].s);
            (i = this.copyData(i, t)),
              (this.data.d.k[e].s = i),
              this.recalculate(e),
              this.elem.addDynamicProperty(this);
          }),
          (TextProperty.prototype.recalculate = function (t) {
            var e = this.data.d.k[t].s;
            (e.__complete = !1), (this.keysIndex = 0), (this._isFirstFrame = !0), this.getValue(e);
          }),
          (TextProperty.prototype.canResizeFont = function (t) {
            (this.canResize = t), this.recalculate(this.keysIndex), this.elem.addDynamicProperty(this);
          }),
          (TextProperty.prototype.setMinimumFontSize = function (t) {
            (this.minimumFontSize = Math.floor(t) || 1),
              this.recalculate(this.keysIndex),
              this.elem.addDynamicProperty(this);
          });
        var TextSelectorProp = (function () {
          var t = Math.max,
            e = Math.min,
            i = Math.floor;
          function s(t, e) {
            (this._currentTextLength = -1),
              (this.k = !1),
              (this.data = e),
              (this.elem = t),
              (this.comp = t.comp),
              (this.finalS = 0),
              (this.finalE = 0),
              this.initDynamicPropertyContainer(t),
              (this.s = PropertyFactory.getProp(t, e.s || { k: 0 }, 0, 0, this)),
              (this.e = 'e' in e ? PropertyFactory.getProp(t, e.e, 0, 0, this) : { v: 100 }),
              (this.o = PropertyFactory.getProp(t, e.o || { k: 0 }, 0, 0, this)),
              (this.xe = PropertyFactory.getProp(t, e.xe || { k: 0 }, 0, 0, this)),
              (this.ne = PropertyFactory.getProp(t, e.ne || { k: 0 }, 0, 0, this)),
              (this.sm = PropertyFactory.getProp(t, e.sm || { k: 100 }, 0, 0, this)),
              (this.a = PropertyFactory.getProp(t, e.a, 0, 0.01, this)),
              this.dynamicProperties.length || this.getValue();
          }
          return (
            (s.prototype = {
              getMult: function (s) {
                this._currentTextLength !== this.elem.textProperty.currentData.l.length && this.getValue();
                var n = 0,
                  a = 0,
                  o = 1,
                  h = 1;
                this.ne.v > 0 ? (n = this.ne.v / 100) : (a = -this.ne.v / 100),
                  this.xe.v > 0 ? (o = 1 - this.xe.v / 100) : (h = 1 + this.xe.v / 100);
                var l = BezierFactory.getBezierEasing(n, a, o, h).get,
                  p = 0,
                  f = this.finalS,
                  u = this.finalE,
                  c = this.data.sh;
                if (2 === c) p = l((p = u === f ? (s >= u ? 1 : 0) : t(0, e(0.5 / (u - f) + (s - f) / (u - f), 1))));
                else if (3 === c)
                  p = l((p = u === f ? (s >= u ? 0 : 1) : 1 - t(0, e(0.5 / (u - f) + (s - f) / (u - f), 1))));
                else if (4 === c)
                  u === f
                    ? (p = 0)
                    : (p = t(0, e(0.5 / (u - f) + (s - f) / (u - f), 1))) < 0.5
                    ? (p *= 2)
                    : (p = 1 - 2 * (p - 0.5)),
                    (p = l(p));
                else if (5 === c) {
                  if (u === f) p = 0;
                  else {
                    var d = u - f,
                      m = -d / 2 + (s = e(t(0, s + 0.5 - f), u - f)),
                      $ = d / 2;
                    p = Math.sqrt(1 - (m * m) / ($ * $));
                  }
                  p = l(p);
                } else
                  6 === c
                    ? (p = l(
                        (p =
                          u === f
                            ? 0
                            : (1 + Math.cos(Math.PI + (2 * Math.PI * (s = e(t(0, s + 0.5 - f), u - f))) / (u - f))) /
                              2),
                      ))
                    : (s >= i(f) && (p = t(0, e(s - f < 0 ? e(u, 1) - (f - s) : u - s, 1))), (p = l(p)));
                if (100 !== this.sm.v) {
                  var g = 0.01 * this.sm.v;
                  0 === g && (g = 1e-8);
                  var y = 0.5 - 0.5 * g;
                  p < y ? (p = 0) : (p = (p - y) / g) > 1 && (p = 1);
                }
                return p * this.a.v;
              },
              getValue: function (t) {
                this.iterateDynamicProperties(),
                  (this._mdf = t || this._mdf),
                  (this._currentTextLength = this.elem.textProperty.currentData.l.length || 0),
                  t && 2 === this.data.r && (this.e.v = this._currentTextLength);
                var e = 2 === this.data.r ? 1 : 100 / this.data.totalChars,
                  i = this.o.v / e,
                  s = this.s.v / e + i,
                  n = this.e.v / e + i;
                if (s > n) {
                  var a = s;
                  (s = n), (n = a);
                }
                (this.finalS = s), (this.finalE = n);
              },
            }),
            extendPrototype([DynamicPropertyContainer], s),
            {
              getTextSelectorProp: function (t, e, i) {
                return new s(t, e, i);
              },
            }
          );
        })();
        function TextAnimatorDataProperty(t, e, i) {
          var s = { propType: !1 },
            n = PropertyFactory.getProp,
            a = e.a;
          (this.a = {
            r: a.r ? n(t, a.r, 0, degToRads, i) : s,
            rx: a.rx ? n(t, a.rx, 0, degToRads, i) : s,
            ry: a.ry ? n(t, a.ry, 0, degToRads, i) : s,
            sk: a.sk ? n(t, a.sk, 0, degToRads, i) : s,
            sa: a.sa ? n(t, a.sa, 0, degToRads, i) : s,
            s: a.s ? n(t, a.s, 1, 0.01, i) : s,
            a: a.a ? n(t, a.a, 1, 0, i) : s,
            o: a.o ? n(t, a.o, 0, 0.01, i) : s,
            p: a.p ? n(t, a.p, 1, 0, i) : s,
            sw: a.sw ? n(t, a.sw, 0, 0, i) : s,
            sc: a.sc ? n(t, a.sc, 1, 0, i) : s,
            fc: a.fc ? n(t, a.fc, 1, 0, i) : s,
            fh: a.fh ? n(t, a.fh, 0, 0, i) : s,
            fs: a.fs ? n(t, a.fs, 0, 0.01, i) : s,
            fb: a.fb ? n(t, a.fb, 0, 0.01, i) : s,
            t: a.t ? n(t, a.t, 0, 0, i) : s,
          }),
            (this.s = TextSelectorProp.getTextSelectorProp(t, e.s, i)),
            (this.s.t = e.s.t);
        }
        function TextAnimatorProperty(t, e, i) {
          (this._isFirstFrame = !0),
            (this._hasMaskedPath = !1),
            (this._frameId = -1),
            (this._textData = t),
            (this._renderType = e),
            (this._elem = i),
            (this._animatorsData = createSizedArray(this._textData.a.length)),
            (this._pathData = {}),
            (this._moreOptions = { alignment: {} }),
            (this.renderedLetters = []),
            (this.lettersChangedFlag = !1),
            this.initDynamicPropertyContainer(i);
        }
        function ITextElement() {}
        (TextAnimatorProperty.prototype.searchProperties = function () {
          var t,
            e,
            i = this._textData.a.length,
            s = PropertyFactory.getProp;
          for (t = 0; t < i; t += 1)
            (e = this._textData.a[t]), (this._animatorsData[t] = new TextAnimatorDataProperty(this._elem, e, this));
          this._textData.p && 'm' in this._textData.p
            ? ((this._pathData = {
                a: s(this._elem, this._textData.p.a, 0, 0, this),
                f: s(this._elem, this._textData.p.f, 0, 0, this),
                l: s(this._elem, this._textData.p.l, 0, 0, this),
                r: s(this._elem, this._textData.p.r, 0, 0, this),
                p: s(this._elem, this._textData.p.p, 0, 0, this),
                m: this._elem.maskManager.getMaskProperty(this._textData.p.m),
              }),
              (this._hasMaskedPath = !0))
            : (this._hasMaskedPath = !1),
            (this._moreOptions.alignment = s(this._elem, this._textData.m.a, 1, 0, this));
        }),
          (TextAnimatorProperty.prototype.getMeasures = function (t, e) {
            if (
              ((this.lettersChangedFlag = e),
              this._mdf || this._isFirstFrame || e || (this._hasMaskedPath && this._pathData.m._mdf))
            ) {
              this._isFirstFrame = !1;
              var i,
                s,
                n,
                a,
                o,
                h,
                l,
                p,
                f,
                u,
                c,
                d,
                m,
                $,
                g,
                y,
                v,
                _,
                b,
                x = this._moreOptions.alignment.v,
                P = this._animatorsData,
                k = this._textData,
                w = this.mHelper,
                A = this._renderType,
                C = this.renderedLetters.length,
                E = t.l;
              if (this._hasMaskedPath) {
                if (((b = this._pathData.m), !this._pathData.n || this._pathData._mdf)) {
                  var D,
                    S = b.v;
                  for (
                    this._pathData.r.v && (S = S.reverse()),
                      o = { tLength: 0, segments: [] },
                      a = S._length - 1,
                      y = 0,
                      n = 0;
                    n < a;
                    n += 1
                  )
                    (D = bez.buildBezierData(
                      S.v[n],
                      S.v[n + 1],
                      [S.o[n][0] - S.v[n][0], S.o[n][1] - S.v[n][1]],
                      [S.i[n + 1][0] - S.v[n + 1][0], S.i[n + 1][1] - S.v[n + 1][1]],
                    )),
                      (o.tLength += D.segmentLength),
                      o.segments.push(D),
                      (y += D.segmentLength);
                  (n = a),
                    b.v.c &&
                      ((D = bez.buildBezierData(
                        S.v[n],
                        S.v[0],
                        [S.o[n][0] - S.v[n][0], S.o[n][1] - S.v[n][1]],
                        [S.i[0][0] - S.v[0][0], S.i[0][1] - S.v[0][1]],
                      )),
                      (o.tLength += D.segmentLength),
                      o.segments.push(D),
                      (y += D.segmentLength)),
                    (this._pathData.pi = o);
                }
                if (
                  ((o = this._pathData.pi),
                  (h = this._pathData.f.v),
                  (c = 0),
                  (u = 1),
                  (p = 0),
                  (f = !0),
                  ($ = o.segments),
                  h < 0 && b.v.c)
                )
                  for (
                    o.tLength < Math.abs(h) && (h = -Math.abs(h) % o.tLength),
                      u = (m = $[(c = $.length - 1)].points).length - 1;
                    h < 0;

                  )
                    (h += m[u].partialLength), (u -= 1) < 0 && (u = (m = $[(c -= 1)].points).length - 1);
                (d = (m = $[c].points)[u - 1]), (g = (l = m[u]).partialLength);
              }
              (a = E.length), (i = 0), (s = 0);
              var T,
                F,
                M,
                I,
                L,
                z = 1.2 * t.finalSize * 0.714,
                B = !0;
              M = P.length;
              var R,
                V,
                O,
                N,
                G,
                q,
                j,
                H,
                W,
                U,
                Y,
                X,
                K = -1,
                Z = h,
                J = c,
                Q = u,
                tt = -1,
                te = '',
                ti = this.defaultPropsArray;
              if (2 === t.j || 1 === t.j) {
                var ts = 0,
                  tr = 0,
                  tn = 2 === t.j ? -0.5 : -1,
                  ta = 0,
                  to = !0;
                for (n = 0; n < a; n += 1)
                  if (E[n].n) {
                    for (ts && (ts += tr); ta < n; ) (E[ta].animatorJustifyOffset = ts), (ta += 1);
                    (ts = 0), (to = !0);
                  } else {
                    for (F = 0; F < M; F += 1)
                      (T = P[F].a).t.propType &&
                        (to && 2 === t.j && (tr += T.t.v * tn),
                        (L = P[F].s.getMult(E[n].anIndexes[F], k.a[F].s.totalChars)).length
                          ? (ts += T.t.v * L[0] * tn)
                          : (ts += T.t.v * L * tn));
                    to = !1;
                  }
                for (ts && (ts += tr); ta < n; ) (E[ta].animatorJustifyOffset = ts), (ta += 1);
              }
              for (n = 0; n < a; n += 1) {
                if ((w.reset(), (N = 1), E[n].n))
                  (i = 0),
                    (s += t.yOffset),
                    (s += B ? 1 : 0),
                    (h = Z),
                    (B = !1),
                    this._hasMaskedPath &&
                      ((u = Q), (d = (m = $[(c = J)].points)[u - 1]), (g = (l = m[u]).partialLength), (p = 0)),
                    (te = ''),
                    (Y = ''),
                    (W = ''),
                    (X = ''),
                    (ti = this.defaultPropsArray);
                else {
                  if (this._hasMaskedPath) {
                    if (tt !== E[n].line) {
                      switch (t.j) {
                        case 1:
                          h += y - t.lineWidths[E[n].line];
                          break;
                        case 2:
                          h += (y - t.lineWidths[E[n].line]) / 2;
                      }
                      tt = E[n].line;
                    }
                    K !== E[n].ind && (E[K] && (h += E[K].extra), (h += E[n].an / 2), (K = E[n].ind)),
                      (h += x[0] * E[n].an * 0.005);
                    var th = 0;
                    for (F = 0; F < M; F += 1)
                      (T = P[F].a).p.propType &&
                        ((L = P[F].s.getMult(E[n].anIndexes[F], k.a[F].s.totalChars)).length
                          ? (th += T.p.v[0] * L[0])
                          : (th += T.p.v[0] * L)),
                        T.a.propType &&
                          ((L = P[F].s.getMult(E[n].anIndexes[F], k.a[F].s.totalChars)).length
                            ? (th += T.a.v[0] * L[0])
                            : (th += T.a.v[0] * L));
                    for (
                      f = !0,
                        this._pathData.a.v &&
                          ((h =
                            0.5 * E[0].an +
                            ((y - this._pathData.f.v - 0.5 * E[0].an - 0.5 * E[E.length - 1].an) * K) / (a - 1)),
                          (h += this._pathData.f.v));
                      f;

                    )
                      p + g >= h + th || !m
                        ? ((v = (h + th - p) / l.partialLength),
                          (V = d.point[0] + (l.point[0] - d.point[0]) * v),
                          (O = d.point[1] + (l.point[1] - d.point[1]) * v),
                          w.translate(-x[0] * E[n].an * 0.005, -x[1] * z * 0.01),
                          (f = !1))
                        : m &&
                          ((p += l.partialLength),
                          (u += 1) >= m.length &&
                            ((u = 0),
                            $[(c += 1)]
                              ? (m = $[c].points)
                              : b.v.c
                              ? ((u = 0), (m = $[(c = 0)].points))
                              : ((p -= l.partialLength), (m = null))),
                          m && ((d = l), (g = (l = m[u]).partialLength)));
                    (R = E[n].an / 2 - E[n].add), w.translate(-R, 0, 0);
                  } else
                    (R = E[n].an / 2 - E[n].add),
                      w.translate(-R, 0, 0),
                      w.translate(-x[0] * E[n].an * 0.005, -x[1] * z * 0.01, 0);
                  for (F = 0; F < M; F += 1)
                    (T = P[F].a).t.propType &&
                      ((L = P[F].s.getMult(E[n].anIndexes[F], k.a[F].s.totalChars)),
                      (0 === i && 0 === t.j) ||
                        (this._hasMaskedPath
                          ? L.length
                            ? (h += T.t.v * L[0])
                            : (h += T.t.v * L)
                          : L.length
                          ? (i += T.t.v * L[0])
                          : (i += T.t.v * L)));
                  for (
                    t.strokeWidthAnim && (q = t.sw || 0),
                      t.strokeColorAnim && (G = t.sc ? [t.sc[0], t.sc[1], t.sc[2]] : [0, 0, 0]),
                      t.fillColorAnim && t.fc && (j = [t.fc[0], t.fc[1], t.fc[2]]),
                      F = 0;
                    F < M;
                    F += 1
                  )
                    (T = P[F].a).a.propType &&
                      ((L = P[F].s.getMult(E[n].anIndexes[F], k.a[F].s.totalChars)).length
                        ? w.translate(-T.a.v[0] * L[0], -T.a.v[1] * L[1], T.a.v[2] * L[2])
                        : w.translate(-T.a.v[0] * L, -T.a.v[1] * L, T.a.v[2] * L));
                  for (F = 0; F < M; F += 1)
                    (T = P[F].a).s.propType &&
                      ((L = P[F].s.getMult(E[n].anIndexes[F], k.a[F].s.totalChars)).length
                        ? w.scale(1 + (T.s.v[0] - 1) * L[0], 1 + (T.s.v[1] - 1) * L[1], 1)
                        : w.scale(1 + (T.s.v[0] - 1) * L, 1 + (T.s.v[1] - 1) * L, 1));
                  for (F = 0; F < M; F += 1) {
                    if (
                      ((T = P[F].a),
                      (L = P[F].s.getMult(E[n].anIndexes[F], k.a[F].s.totalChars)),
                      T.sk.propType &&
                        (L.length
                          ? w.skewFromAxis(-T.sk.v * L[0], T.sa.v * L[1])
                          : w.skewFromAxis(-T.sk.v * L, T.sa.v * L)),
                      T.r.propType && (L.length ? w.rotateZ(-T.r.v * L[2]) : w.rotateZ(-T.r.v * L)),
                      T.ry.propType && (L.length ? w.rotateY(T.ry.v * L[1]) : w.rotateY(T.ry.v * L)),
                      T.rx.propType && (L.length ? w.rotateX(T.rx.v * L[0]) : w.rotateX(T.rx.v * L)),
                      T.o.propType && (L.length ? (N += (T.o.v * L[0] - N) * L[0]) : (N += (T.o.v * L - N) * L)),
                      t.strokeWidthAnim && T.sw.propType && (L.length ? (q += T.sw.v * L[0]) : (q += T.sw.v * L)),
                      t.strokeColorAnim && T.sc.propType)
                    )
                      for (H = 0; H < 3; H += 1)
                        L.length ? (G[H] += (T.sc.v[H] - G[H]) * L[0]) : (G[H] += (T.sc.v[H] - G[H]) * L);
                    if (t.fillColorAnim && t.fc) {
                      if (T.fc.propType)
                        for (H = 0; H < 3; H += 1)
                          L.length ? (j[H] += (T.fc.v[H] - j[H]) * L[0]) : (j[H] += (T.fc.v[H] - j[H]) * L);
                      T.fh.propType && (j = L.length ? addHueToRGB(j, T.fh.v * L[0]) : addHueToRGB(j, T.fh.v * L)),
                        T.fs.propType &&
                          (j = L.length ? addSaturationToRGB(j, T.fs.v * L[0]) : addSaturationToRGB(j, T.fs.v * L)),
                        T.fb.propType &&
                          (j = L.length ? addBrightnessToRGB(j, T.fb.v * L[0]) : addBrightnessToRGB(j, T.fb.v * L));
                    }
                  }
                  for (F = 0; F < M; F += 1)
                    (T = P[F].a).p.propType &&
                      ((L = P[F].s.getMult(E[n].anIndexes[F], k.a[F].s.totalChars)),
                      this._hasMaskedPath
                        ? L.length
                          ? w.translate(0, T.p.v[1] * L[0], -T.p.v[2] * L[1])
                          : w.translate(0, T.p.v[1] * L, -T.p.v[2] * L)
                        : L.length
                        ? w.translate(T.p.v[0] * L[0], T.p.v[1] * L[1], -T.p.v[2] * L[2])
                        : w.translate(T.p.v[0] * L, T.p.v[1] * L, -T.p.v[2] * L));
                  if (
                    (t.strokeWidthAnim && (W = q < 0 ? 0 : q),
                    t.strokeColorAnim &&
                      (U =
                        'rgb(' +
                        Math.round(255 * G[0]) +
                        ',' +
                        Math.round(255 * G[1]) +
                        ',' +
                        Math.round(255 * G[2]) +
                        ')'),
                    t.fillColorAnim &&
                      t.fc &&
                      (Y =
                        'rgb(' +
                        Math.round(255 * j[0]) +
                        ',' +
                        Math.round(255 * j[1]) +
                        ',' +
                        Math.round(255 * j[2]) +
                        ')'),
                    this._hasMaskedPath)
                  ) {
                    if ((w.translate(0, -t.ls), w.translate(0, x[1] * z * 0.01 + s, 0), this._pathData.p.v)) {
                      var tl = (180 * Math.atan((_ = (l.point[1] - d.point[1]) / (l.point[0] - d.point[0])))) / Math.PI;
                      l.point[0] < d.point[0] && (tl += 180), w.rotate((-tl * Math.PI) / 180);
                    }
                    w.translate(V, O, 0),
                      (h -= x[0] * E[n].an * 0.005),
                      E[n + 1] && K !== E[n + 1].ind && ((h += E[n].an / 2), (h += 0.001 * t.tr * t.finalSize));
                  } else {
                    switch ((w.translate(i, s, 0), t.ps && w.translate(t.ps[0], t.ps[1] + t.ascent, 0), t.j)) {
                      case 1:
                        w.translate(
                          E[n].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[E[n].line]),
                          0,
                          0,
                        );
                        break;
                      case 2:
                        w.translate(
                          E[n].animatorJustifyOffset + t.justifyOffset + (t.boxWidth - t.lineWidths[E[n].line]) / 2,
                          0,
                          0,
                        );
                    }
                    w.translate(0, -t.ls),
                      w.translate(R, 0, 0),
                      w.translate(x[0] * E[n].an * 0.005, x[1] * z * 0.01, 0),
                      (i += E[n].l + 0.001 * t.tr * t.finalSize);
                  }
                  'html' === A
                    ? (te = w.toCSS())
                    : 'svg' === A
                    ? (te = w.to2dCSS())
                    : (ti = [
                        w.props[0],
                        w.props[1],
                        w.props[2],
                        w.props[3],
                        w.props[4],
                        w.props[5],
                        w.props[6],
                        w.props[7],
                        w.props[8],
                        w.props[9],
                        w.props[10],
                        w.props[11],
                        w.props[12],
                        w.props[13],
                        w.props[14],
                        w.props[15],
                      ]),
                    (X = N);
                }
                C <= n
                  ? ((I = new LetterProps(X, W, U, Y, te, ti)),
                    this.renderedLetters.push(I),
                    (C += 1),
                    (this.lettersChangedFlag = !0))
                  : ((I = this.renderedLetters[n]),
                    (this.lettersChangedFlag = I.update(X, W, U, Y, te, ti) || this.lettersChangedFlag));
              }
            }
          }),
          (TextAnimatorProperty.prototype.getValue = function () {
            this._elem.globalData.frameId !== this._frameId &&
              ((this._frameId = this._elem.globalData.frameId), this.iterateDynamicProperties());
          }),
          (TextAnimatorProperty.prototype.mHelper = new Matrix()),
          (TextAnimatorProperty.prototype.defaultPropsArray = []),
          extendPrototype([DynamicPropertyContainer], TextAnimatorProperty),
          (ITextElement.prototype.initElement = function (t, e, i) {
            (this.lettersChangedFlag = !0),
              this.initFrame(),
              this.initBaseData(t, e, i),
              (this.textProperty = new TextProperty(this, t.t, this.dynamicProperties)),
              (this.textAnimator = new TextAnimatorProperty(t.t, this.renderType, this)),
              this.initTransform(t, e, i),
              this.initHierarchy(),
              this.initRenderable(),
              this.initRendererElement(),
              this.createContainerElements(),
              this.createRenderableComponents(),
              this.createContent(),
              this.hide(),
              this.textAnimator.searchProperties(this.dynamicProperties);
          }),
          (ITextElement.prototype.prepareFrame = function (t) {
            (this._mdf = !1),
              this.prepareRenderableFrame(t),
              this.prepareProperties(t, this.isInRange),
              (this.textProperty._mdf || this.textProperty._isFirstFrame) &&
                (this.buildNewText(), (this.textProperty._isFirstFrame = !1), (this.textProperty._mdf = !1));
          }),
          (ITextElement.prototype.createPathShape = function (t, e) {
            var i,
              s,
              n = e.length,
              a = '';
            for (i = 0; i < n; i += 1) 'sh' === e[i].ty && (a += buildShapeString((s = e[i].ks.k), s.i.length, !0, t));
            return a;
          }),
          (ITextElement.prototype.updateDocumentData = function (t, e) {
            this.textProperty.updateDocumentData(t, e);
          }),
          (ITextElement.prototype.canResizeFont = function (t) {
            this.textProperty.canResizeFont(t);
          }),
          (ITextElement.prototype.setMinimumFontSize = function (t) {
            this.textProperty.setMinimumFontSize(t);
          }),
          (ITextElement.prototype.applyTextPropertiesToMatrix = function (t, e, i, s, n) {
            switch ((t.ps && e.translate(t.ps[0], t.ps[1] + t.ascent, 0), e.translate(0, -t.ls, 0), t.j)) {
              case 1:
                e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]), 0, 0);
                break;
              case 2:
                e.translate(t.justifyOffset + (t.boxWidth - t.lineWidths[i]) / 2, 0, 0);
            }
            e.translate(s, n, 0);
          }),
          (ITextElement.prototype.buildColor = function (t) {
            return 'rgb(' + Math.round(255 * t[0]) + ',' + Math.round(255 * t[1]) + ',' + Math.round(255 * t[2]) + ')';
          }),
          (ITextElement.prototype.emptyProp = new LetterProps()),
          (ITextElement.prototype.destroy = function () {});
        var emptyShapeData = { shapes: [] };
        function SVGTextLottieElement(t, e, i) {
          (this.textSpans = []), (this.renderType = 'svg'), this.initElement(t, e, i);
        }
        function ISolidElement(t, e, i) {
          this.initElement(t, e, i);
        }
        function NullElement(t, e, i) {
          this.initFrame(),
            this.initBaseData(t, e, i),
            this.initFrame(),
            this.initTransform(t, e, i),
            this.initHierarchy();
        }
        function SVGRendererBase() {}
        function ICompElement() {}
        function SVGCompElement(t, e, i) {
          (this.layers = t.layers),
            (this.supports3d = !0),
            (this.completeLayers = !1),
            (this.pendingElements = []),
            (this.elements = this.layers ? createSizedArray(this.layers.length) : []),
            this.initElement(t, e, i),
            (this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : { _placeholder: !0 });
        }
        function SVGRenderer(t, e) {
          (this.animationItem = t),
            (this.layers = null),
            (this.renderedFrame = -1),
            (this.svgElement = createNS('svg'));
          var i = '';
          if (e && e.title) {
            var s = createNS('title'),
              n = createElementID();
            s.setAttribute('id', n), (s.textContent = e.title), this.svgElement.appendChild(s), (i += n);
          }
          if (e && e.description) {
            var a = createNS('desc'),
              o = createElementID();
            a.setAttribute('id', o), (a.textContent = e.description), this.svgElement.appendChild(a), (i += ' ' + o);
          }
          i && this.svgElement.setAttribute('aria-labelledby', i);
          var h = createNS('defs');
          this.svgElement.appendChild(h);
          var l = createNS('g');
          this.svgElement.appendChild(l),
            (this.layerElement = l),
            (this.renderConfig = {
              preserveAspectRatio: (e && e.preserveAspectRatio) || 'xMidYMid meet',
              imagePreserveAspectRatio: (e && e.imagePreserveAspectRatio) || 'xMidYMid slice',
              contentVisibility: (e && e.contentVisibility) || 'visible',
              progressiveLoad: (e && e.progressiveLoad) || !1,
              hideOnTransparent: !(e && !1 === e.hideOnTransparent),
              viewBoxOnly: (e && e.viewBoxOnly) || !1,
              viewBoxSize: (e && e.viewBoxSize) || !1,
              className: (e && e.className) || '',
              id: (e && e.id) || '',
              focusable: e && e.focusable,
              filterSize: {
                width: (e && e.filterSize && e.filterSize.width) || '100%',
                height: (e && e.filterSize && e.filterSize.height) || '100%',
                x: (e && e.filterSize && e.filterSize.x) || '0%',
                y: (e && e.filterSize && e.filterSize.y) || '0%',
              },
              width: e && e.width,
              height: e && e.height,
              runExpressions: !e || void 0 === e.runExpressions || e.runExpressions,
            }),
            (this.globalData = { _mdf: !1, frameNum: -1, defs: h, renderConfig: this.renderConfig }),
            (this.elements = []),
            (this.pendingElements = []),
            (this.destroyed = !1),
            (this.rendererType = 'svg');
        }
        function CVContextData() {
          var t;
          for (
            this.saved = [],
              this.cArrPos = 0,
              this.cTr = new Matrix(),
              this.cO = 1,
              this.savedOp = createTypedArray('float32', 15),
              t = 0;
            t < 15;
            t += 1
          )
            this.saved[t] = createTypedArray('float32', 16);
          this._length = 15;
        }
        function ShapeTransformManager() {
          (this.sequences = {}), (this.sequenceList = []), (this.transform_key_count = 0);
        }
        function CVEffects() {}
        function CVMaskElement(t, e) {
          (this.data = t),
            (this.element = e),
            (this.masksProperties = this.data.masksProperties || []),
            (this.viewData = createSizedArray(this.masksProperties.length));
          var i,
            s = this.masksProperties.length,
            n = !1;
          for (i = 0; i < s; i += 1)
            'n' !== this.masksProperties[i].mode && (n = !0),
              (this.viewData[i] = ShapePropertyFactory.getShapeProp(this.element, this.masksProperties[i], 3));
          (this.hasMasks = n), n && this.element.addRenderableComponent(this);
        }
        function CVBaseElement() {}
        function CVShapeData(t, e, i, s) {
          (this.styledShapes = []), (this.tr = [0, 0, 0, 0, 0, 0]);
          var n,
            a = 4;
          'rc' === e.ty ? (a = 5) : 'el' === e.ty ? (a = 6) : 'sr' === e.ty && (a = 7),
            (this.sh = ShapePropertyFactory.getShapeProp(t, e, a, t));
          var o,
            h = i.length;
          for (n = 0; n < h; n += 1)
            i[n].closed ||
              ((o = { transforms: s.addTransformSequence(i[n].transforms), trNodes: [] }),
              this.styledShapes.push(o),
              i[n].elements.push(o));
        }
        function CVShapeElement(t, e, i) {
          (this.shapes = []),
            (this.shapesData = t.shapes),
            (this.stylesList = []),
            (this.itemsData = []),
            (this.prevViewData = []),
            (this.shapeModifiers = []),
            (this.processedElements = []),
            (this.transformsManager = new ShapeTransformManager()),
            this.initElement(t, e, i);
        }
        function CVTextElement(t, e, i) {
          (this.textSpans = []),
            (this.yOffset = 0),
            (this.fillColorAnim = !1),
            (this.strokeColorAnim = !1),
            (this.strokeWidthAnim = !1),
            (this.stroke = !1),
            (this.fill = !1),
            (this.justifyOffset = 0),
            (this.currentRender = null),
            (this.renderType = 'canvas'),
            (this.values = { fill: 'rgba(0,0,0,0)', stroke: 'rgba(0,0,0,0)', sWidth: 0, fValue: '' }),
            this.initElement(t, e, i);
        }
        function CVImageElement(t, e, i) {
          (this.assetData = e.getAssetData(t.refId)),
            (this.img = e.imageLoader.getAsset(this.assetData)),
            this.initElement(t, e, i);
        }
        function CVSolidElement(t, e, i) {
          this.initElement(t, e, i);
        }
        function CanvasRendererBase(t, e) {
          (this.animationItem = t),
            (this.renderConfig = {
              clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
              context: (e && e.context) || null,
              progressiveLoad: (e && e.progressiveLoad) || !1,
              preserveAspectRatio: (e && e.preserveAspectRatio) || 'xMidYMid meet',
              imagePreserveAspectRatio: (e && e.imagePreserveAspectRatio) || 'xMidYMid slice',
              contentVisibility: (e && e.contentVisibility) || 'visible',
              className: (e && e.className) || '',
              id: (e && e.id) || '',
            }),
            (this.renderConfig.dpr = (e && e.dpr) || 1),
            this.animationItem.wrapper && (this.renderConfig.dpr = (e && e.dpr) || window.devicePixelRatio || 1),
            (this.renderedFrame = -1),
            (this.globalData = { frameNum: -1, _mdf: !1, renderConfig: this.renderConfig, currentGlobalAlpha: -1 }),
            (this.contextData = new CVContextData()),
            (this.elements = []),
            (this.pendingElements = []),
            (this.transformMat = new Matrix()),
            (this.completeLayers = !1),
            (this.rendererType = 'canvas');
        }
        function CVCompElement(t, e, i) {
          (this.completeLayers = !1),
            (this.layers = t.layers),
            (this.pendingElements = []),
            (this.elements = createSizedArray(this.layers.length)),
            this.initElement(t, e, i),
            (this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : { _placeholder: !0 });
        }
        function CanvasRenderer(t, e) {
          (this.animationItem = t),
            (this.renderConfig = {
              clearCanvas: !e || void 0 === e.clearCanvas || e.clearCanvas,
              context: (e && e.context) || null,
              progressiveLoad: (e && e.progressiveLoad) || !1,
              preserveAspectRatio: (e && e.preserveAspectRatio) || 'xMidYMid meet',
              imagePreserveAspectRatio: (e && e.imagePreserveAspectRatio) || 'xMidYMid slice',
              contentVisibility: (e && e.contentVisibility) || 'visible',
              className: (e && e.className) || '',
              id: (e && e.id) || '',
              runExpressions: !e || void 0 === e.runExpressions || e.runExpressions,
            }),
            (this.renderConfig.dpr = (e && e.dpr) || 1),
            this.animationItem.wrapper && (this.renderConfig.dpr = (e && e.dpr) || window.devicePixelRatio || 1),
            (this.renderedFrame = -1),
            (this.globalData = { frameNum: -1, _mdf: !1, renderConfig: this.renderConfig, currentGlobalAlpha: -1 }),
            (this.contextData = new CVContextData()),
            (this.elements = []),
            (this.pendingElements = []),
            (this.transformMat = new Matrix()),
            (this.completeLayers = !1),
            (this.rendererType = 'canvas');
        }
        function HBaseElement() {}
        function HSolidElement(t, e, i) {
          this.initElement(t, e, i);
        }
        function HShapeElement(t, e, i) {
          (this.shapes = []),
            (this.shapesData = t.shapes),
            (this.stylesList = []),
            (this.shapeModifiers = []),
            (this.itemsData = []),
            (this.processedElements = []),
            (this.animatedContents = []),
            (this.shapesContainer = createNS('g')),
            this.initElement(t, e, i),
            (this.prevViewData = []),
            (this.currentBBox = { x: 999999, y: -999999, h: 0, w: 0 });
        }
        function HTextElement(t, e, i) {
          (this.textSpans = []),
            (this.textPaths = []),
            (this.currentBBox = { x: 999999, y: -999999, h: 0, w: 0 }),
            (this.renderType = 'svg'),
            (this.isMasked = !1),
            this.initElement(t, e, i);
        }
        function HCameraElement(t, e, i) {
          this.initFrame(), this.initBaseData(t, e, i), this.initHierarchy();
          var s = PropertyFactory.getProp;
          if (
            ((this.pe = s(this, t.pe, 0, 0, this)),
            t.ks.p.s
              ? ((this.px = s(this, t.ks.p.x, 1, 0, this)),
                (this.py = s(this, t.ks.p.y, 1, 0, this)),
                (this.pz = s(this, t.ks.p.z, 1, 0, this)))
              : (this.p = s(this, t.ks.p, 1, 0, this)),
            t.ks.a && (this.a = s(this, t.ks.a, 1, 0, this)),
            t.ks.or.k.length && t.ks.or.k[0].to)
          ) {
            var n,
              a = t.ks.or.k.length;
            for (n = 0; n < a; n += 1) (t.ks.or.k[n].to = null), (t.ks.or.k[n].ti = null);
          }
          (this.or = s(this, t.ks.or, 1, degToRads, this)),
            (this.or.sh = !0),
            (this.rx = s(this, t.ks.rx, 0, degToRads, this)),
            (this.ry = s(this, t.ks.ry, 0, degToRads, this)),
            (this.rz = s(this, t.ks.rz, 0, degToRads, this)),
            (this.mat = new Matrix()),
            (this._prevMat = new Matrix()),
            (this._isFirstFrame = !0),
            (this.finalTransform = { mProp: this });
        }
        function HImageElement(t, e, i) {
          (this.assetData = e.getAssetData(t.refId)), this.initElement(t, e, i);
        }
        function HybridRendererBase(t, e) {
          (this.animationItem = t),
            (this.layers = null),
            (this.renderedFrame = -1),
            (this.renderConfig = {
              className: (e && e.className) || '',
              imagePreserveAspectRatio: (e && e.imagePreserveAspectRatio) || 'xMidYMid slice',
              hideOnTransparent: !(e && !1 === e.hideOnTransparent),
              filterSize: {
                width: (e && e.filterSize && e.filterSize.width) || '400%',
                height: (e && e.filterSize && e.filterSize.height) || '400%',
                x: (e && e.filterSize && e.filterSize.x) || '-100%',
                y: (e && e.filterSize && e.filterSize.y) || '-100%',
              },
            }),
            (this.globalData = { _mdf: !1, frameNum: -1, renderConfig: this.renderConfig }),
            (this.pendingElements = []),
            (this.elements = []),
            (this.threeDElements = []),
            (this.destroyed = !1),
            (this.camera = null),
            (this.supports3d = !0),
            (this.rendererType = 'html');
        }
        function HCompElement(t, e, i) {
          (this.layers = t.layers),
            (this.supports3d = !t.hasMask),
            (this.completeLayers = !1),
            (this.pendingElements = []),
            (this.elements = this.layers ? createSizedArray(this.layers.length) : []),
            this.initElement(t, e, i),
            (this.tm = t.tm ? PropertyFactory.getProp(this, t.tm, 0, e.frameRate, this) : { _placeholder: !0 });
        }
        function HybridRenderer(t, e) {
          (this.animationItem = t),
            (this.layers = null),
            (this.renderedFrame = -1),
            (this.renderConfig = {
              className: (e && e.className) || '',
              imagePreserveAspectRatio: (e && e.imagePreserveAspectRatio) || 'xMidYMid slice',
              hideOnTransparent: !(e && !1 === e.hideOnTransparent),
              filterSize: {
                width: (e && e.filterSize && e.filterSize.width) || '400%',
                height: (e && e.filterSize && e.filterSize.height) || '400%',
                x: (e && e.filterSize && e.filterSize.x) || '-100%',
                y: (e && e.filterSize && e.filterSize.y) || '-100%',
              },
              runExpressions: !e || void 0 === e.runExpressions || e.runExpressions,
            }),
            (this.globalData = { _mdf: !1, frameNum: -1, renderConfig: this.renderConfig }),
            (this.pendingElements = []),
            (this.elements = []),
            (this.threeDElements = []),
            (this.destroyed = !1),
            (this.camera = null),
            (this.supports3d = !0),
            (this.rendererType = 'html');
        }
        extendPrototype(
          [
            BaseElement,
            TransformElement,
            SVGBaseElement,
            HierarchyElement,
            FrameElement,
            RenderableDOMElement,
            ITextElement,
          ],
          SVGTextLottieElement,
        ),
          (SVGTextLottieElement.prototype.createContent = function () {
            this.data.singleShape && !this.globalData.fontManager.chars && (this.textContainer = createNS('text'));
          }),
          (SVGTextLottieElement.prototype.buildTextContents = function (t) {
            for (var e = 0, i = t.length, s = [], n = ''; e < i; )
              '\r' === t[e] || '\x03' === t[e] ? (s.push(n), (n = '')) : (n += t[e]), (e += 1);
            return s.push(n), s;
          }),
          (SVGTextLottieElement.prototype.buildShapeData = function (t, e) {
            if (t.shapes && t.shapes.length) {
              var i = t.shapes[0];
              if (i.it) {
                var s = i.it[i.it.length - 1];
                s.s && ((s.s.k[0] = e), (s.s.k[1] = e));
              }
            }
            return t;
          }),
          (SVGTextLottieElement.prototype.buildNewText = function () {
            this.addDynamicProperty(this);
            var t = this.textProperty.currentData;
            (this.renderedLetters = createSizedArray(t ? t.l.length : 0)),
              t.fc
                ? this.layerElement.setAttribute('fill', this.buildColor(t.fc))
                : this.layerElement.setAttribute('fill', 'rgba(0,0,0,0)'),
              t.sc &&
                (this.layerElement.setAttribute('stroke', this.buildColor(t.sc)),
                this.layerElement.setAttribute('stroke-width', t.sw)),
              this.layerElement.setAttribute('font-size', t.finalSize);
            var e = this.globalData.fontManager.getFontByName(t.f);
            if (e.fClass) this.layerElement.setAttribute('class', e.fClass);
            else {
              this.layerElement.setAttribute('font-family', e.fFamily);
              var i = t.fWeight,
                s = t.fStyle;
              this.layerElement.setAttribute('font-style', s), this.layerElement.setAttribute('font-weight', i);
            }
            this.layerElement.setAttribute('aria-label', t.t);
            var n,
              a,
              o,
              h = t.l || [],
              l = !!this.globalData.fontManager.chars;
            a = h.length;
            var p = this.mHelper,
              f = this.data.singleShape,
              u = 0,
              c = 0,
              d = !0,
              m = 0.001 * t.tr * t.finalSize;
            if (!f || l || t.sz) {
              var $,
                g = this.textSpans.length;
              for (n = 0; n < a; n += 1) {
                if (
                  (this.textSpans[n] || (this.textSpans[n] = { span: null, childSpan: null, glyph: null }),
                  !l || !f || 0 === n)
                ) {
                  if (((o = g > n ? this.textSpans[n].span : createNS(l ? 'g' : 'text')), g <= n)) {
                    if (
                      (o.setAttribute('stroke-linecap', 'butt'),
                      o.setAttribute('stroke-linejoin', 'round'),
                      o.setAttribute('stroke-miterlimit', '4'),
                      (this.textSpans[n].span = o),
                      l)
                    ) {
                      var y,
                        v = createNS('g');
                      o.appendChild(v), (this.textSpans[n].childSpan = v);
                    }
                    (this.textSpans[n].span = o), this.layerElement.appendChild(o);
                  }
                  o.style.display = 'inherit';
                }
                if (
                  (p.reset(),
                  f &&
                    (h[n].n && ((u = -m), (c += t.yOffset), (c += d ? 1 : 0), (d = !1)),
                    this.applyTextPropertiesToMatrix(t, p, h[n].line, u, c),
                    (u += h[n].l || 0),
                    (u += m)),
                  l)
                ) {
                  if (
                    1 ===
                    ($ = this.globalData.fontManager.getCharData(
                      t.finalText[n],
                      e.fStyle,
                      this.globalData.fontManager.getFontByName(t.f).fFamily,
                    )).t
                  )
                    y = new SVGCompElement($.data, this.globalData, this);
                  else {
                    var _ = emptyShapeData;
                    $.data && $.data.shapes && (_ = this.buildShapeData($.data, t.finalSize)),
                      (y = new SVGShapeElement(_, this.globalData, this));
                  }
                  if (this.textSpans[n].glyph) {
                    var b = this.textSpans[n].glyph;
                    this.textSpans[n].childSpan.removeChild(b.layerElement), b.destroy();
                  }
                  (this.textSpans[n].glyph = y),
                    (y._debug = !0),
                    y.prepareFrame(0),
                    y.renderFrame(),
                    this.textSpans[n].childSpan.appendChild(y.layerElement),
                    1 === $.t &&
                      this.textSpans[n].childSpan.setAttribute(
                        'transform',
                        'scale(' + t.finalSize / 100 + ',' + t.finalSize / 100 + ')',
                      );
                } else
                  f && o.setAttribute('transform', 'translate(' + p.props[12] + ',' + p.props[13] + ')'),
                    (o.textContent = h[n].val),
                    o.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
              }
              f && o && o.setAttribute('d', '');
            } else {
              var x = this.textContainer,
                P = 'start';
              switch (t.j) {
                case 1:
                  P = 'end';
                  break;
                case 2:
                  P = 'middle';
                  break;
                default:
                  P = 'start';
              }
              x.setAttribute('text-anchor', P), x.setAttribute('letter-spacing', m);
              var k = this.buildTextContents(t.finalText);
              for (a = k.length, c = t.ps ? t.ps[1] + t.ascent : 0, n = 0; n < a; n += 1)
                ((o = this.textSpans[n].span || createNS('tspan')).textContent = k[n]),
                  o.setAttribute('x', 0),
                  o.setAttribute('y', c),
                  (o.style.display = 'inherit'),
                  x.appendChild(o),
                  this.textSpans[n] || (this.textSpans[n] = { span: null, glyph: null }),
                  (this.textSpans[n].span = o),
                  (c += t.finalLineHeight);
              this.layerElement.appendChild(x);
            }
            for (; n < this.textSpans.length; ) (this.textSpans[n].span.style.display = 'none'), (n += 1);
            this._sizeChanged = !0;
          }),
          (SVGTextLottieElement.prototype.sourceRectAtTime = function () {
            if (
              (this.prepareFrame(this.comp.renderedFrame - this.data.st), this.renderInnerContent(), this._sizeChanged)
            ) {
              this._sizeChanged = !1;
              var t = this.layerElement.getBBox();
              this.bbox = { top: t.y, left: t.x, width: t.width, height: t.height };
            }
            return this.bbox;
          }),
          (SVGTextLottieElement.prototype.getValue = function () {
            var t,
              e,
              i = this.textSpans.length;
            for (this.renderedFrame = this.comp.renderedFrame, t = 0; t < i; t += 1)
              (e = this.textSpans[t].glyph) &&
                (e.prepareFrame(this.comp.renderedFrame - this.data.st), e._mdf && (this._mdf = !0));
          }),
          (SVGTextLottieElement.prototype.renderInnerContent = function () {
            if (
              (!this.data.singleShape || this._mdf) &&
              (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag),
              this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)
            ) {
              this._sizeChanged = !0;
              var t,
                e,
                i,
                s,
                n,
                a = this.textAnimator.renderedLetters,
                o = this.textProperty.currentData.l;
              for (e = o.length, t = 0; t < e; t += 1)
                o[t].n ||
                  ((i = a[t]),
                  (s = this.textSpans[t].span),
                  (n = this.textSpans[t].glyph) && n.renderFrame(),
                  i._mdf.m && s.setAttribute('transform', i.m),
                  i._mdf.o && s.setAttribute('opacity', i.o),
                  i._mdf.sw && s.setAttribute('stroke-width', i.sw),
                  i._mdf.sc && s.setAttribute('stroke', i.sc),
                  i._mdf.fc && s.setAttribute('fill', i.fc));
            }
          }),
          extendPrototype([IImageElement], ISolidElement),
          (ISolidElement.prototype.createContent = function () {
            var t = createNS('rect');
            t.setAttribute('width', this.data.sw),
              t.setAttribute('height', this.data.sh),
              t.setAttribute('fill', this.data.sc),
              this.layerElement.appendChild(t);
          }),
          (NullElement.prototype.prepareFrame = function (t) {
            this.prepareProperties(t, !0);
          }),
          (NullElement.prototype.renderFrame = function () {}),
          (NullElement.prototype.getBaseElement = function () {
            return null;
          }),
          (NullElement.prototype.destroy = function () {}),
          (NullElement.prototype.sourceRectAtTime = function () {}),
          (NullElement.prototype.hide = function () {}),
          extendPrototype([BaseElement, TransformElement, HierarchyElement, FrameElement], NullElement),
          extendPrototype([BaseRenderer], SVGRendererBase),
          (SVGRendererBase.prototype.createNull = function (t) {
            return new NullElement(t, this.globalData, this);
          }),
          (SVGRendererBase.prototype.createShape = function (t) {
            return new SVGShapeElement(t, this.globalData, this);
          }),
          (SVGRendererBase.prototype.createText = function (t) {
            return new SVGTextLottieElement(t, this.globalData, this);
          }),
          (SVGRendererBase.prototype.createImage = function (t) {
            return new IImageElement(t, this.globalData, this);
          }),
          (SVGRendererBase.prototype.createSolid = function (t) {
            return new ISolidElement(t, this.globalData, this);
          }),
          (SVGRendererBase.prototype.configAnimation = function (t) {
            this.svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg'),
              this.svgElement.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink'),
              this.renderConfig.viewBoxSize
                ? this.svgElement.setAttribute('viewBox', this.renderConfig.viewBoxSize)
                : this.svgElement.setAttribute('viewBox', '0 0 ' + t.w + ' ' + t.h),
              this.renderConfig.viewBoxOnly ||
                (this.svgElement.setAttribute('width', t.w),
                this.svgElement.setAttribute('height', t.h),
                (this.svgElement.style.width = '100%'),
                (this.svgElement.style.height = '100%'),
                (this.svgElement.style.transform = 'translate3d(0,0,0)'),
                (this.svgElement.style.contentVisibility = this.renderConfig.contentVisibility)),
              this.renderConfig.width && this.svgElement.setAttribute('width', this.renderConfig.width),
              this.renderConfig.height && this.svgElement.setAttribute('height', this.renderConfig.height),
              this.renderConfig.className && this.svgElement.setAttribute('class', this.renderConfig.className),
              this.renderConfig.id && this.svgElement.setAttribute('id', this.renderConfig.id),
              void 0 !== this.renderConfig.focusable &&
                this.svgElement.setAttribute('focusable', this.renderConfig.focusable),
              this.svgElement.setAttribute('preserveAspectRatio', this.renderConfig.preserveAspectRatio),
              this.animationItem.wrapper.appendChild(this.svgElement);
            var e = this.globalData.defs;
            this.setupGlobalData(t, e),
              (this.globalData.progressiveLoad = this.renderConfig.progressiveLoad),
              (this.data = t);
            var i = createNS('clipPath'),
              s = createNS('rect');
            s.setAttribute('width', t.w), s.setAttribute('height', t.h), s.setAttribute('x', 0), s.setAttribute('y', 0);
            var n = createElementID();
            i.setAttribute('id', n),
              i.appendChild(s),
              this.layerElement.setAttribute('clipPath', 'url(' + getLocationHref() + '#' + n + ')'),
              e.appendChild(i),
              (this.layers = t.layers),
              (this.elements = createSizedArray(t.layers.length));
          }),
          (SVGRendererBase.prototype.destroy = function () {
            this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ''),
              (this.layerElement = null),
              (this.globalData.defs = null);
            var t,
              e = this.layers ? this.layers.length : 0;
            for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy();
            (this.elements.length = 0), (this.destroyed = !0), (this.animationItem = null);
          }),
          (SVGRendererBase.prototype.updateContainerSize = function () {}),
          (SVGRendererBase.prototype.findIndexByInd = function (t) {
            var e = 0,
              i = this.layers.length;
            for (e = 0; e < i; e += 1) if (this.layers[e].ind === t) return e;
            return -1;
          }),
          (SVGRendererBase.prototype.buildItem = function (t) {
            var e = this.elements;
            if (!e[t] && 99 !== this.layers[t].ty) {
              e[t] = !0;
              var i = this.createItem(this.layers[t]);
              if (
                ((e[t] = i),
                getExpressionsPlugin() &&
                  (0 === this.layers[t].ty && this.globalData.projectInterface.registerComposition(i),
                  i.initExpressions()),
                this.appendElementInPos(i, t),
                this.layers[t].tt)
              ) {
                var s = 'tp' in this.layers[t] ? this.findIndexByInd(this.layers[t].tp) : t - 1;
                if (-1 === s) return;
                if (this.elements[s] && !0 !== this.elements[s]) {
                  var n = e[s].getMatte(this.layers[t].tt);
                  i.setMatte(n);
                } else this.buildItem(s), this.addPendingElement(i);
              }
            }
          }),
          (SVGRendererBase.prototype.checkPendingElements = function () {
            for (; this.pendingElements.length; ) {
              var t = this.pendingElements.pop();
              if ((t.checkParenting(), t.data.tt))
                for (var e = 0, i = this.elements.length; e < i; ) {
                  if (this.elements[e] === t) {
                    var s = 'tp' in t.data ? this.findIndexByInd(t.data.tp) : e - 1,
                      n = this.elements[s].getMatte(this.layers[e].tt);
                    t.setMatte(n);
                    break;
                  }
                  e += 1;
                }
            }
          }),
          (SVGRendererBase.prototype.renderFrame = function (t) {
            if (this.renderedFrame !== t && !this.destroyed) {
              null === t ? (t = this.renderedFrame) : (this.renderedFrame = t),
                (this.globalData.frameNum = t),
                (this.globalData.frameId += 1),
                (this.globalData.projectInterface.currentFrame = t),
                (this.globalData._mdf = !1);
              var e,
                i = this.layers.length;
              for (this.completeLayers || this.checkLayers(t), e = i - 1; e >= 0; e -= 1)
                (this.completeLayers || this.elements[e]) && this.elements[e].prepareFrame(t - this.layers[e].st);
              if (this.globalData._mdf)
                for (e = 0; e < i; e += 1) (this.completeLayers || this.elements[e]) && this.elements[e].renderFrame();
            }
          }),
          (SVGRendererBase.prototype.appendElementInPos = function (t, e) {
            var i = t.getBaseElement();
            if (i) {
              for (var s, n = 0; n < e; )
                this.elements[n] &&
                  !0 !== this.elements[n] &&
                  this.elements[n].getBaseElement() &&
                  (s = this.elements[n].getBaseElement()),
                  (n += 1);
              s ? this.layerElement.insertBefore(i, s) : this.layerElement.appendChild(i);
            }
          }),
          (SVGRendererBase.prototype.hide = function () {
            this.layerElement.style.display = 'none';
          }),
          (SVGRendererBase.prototype.show = function () {
            this.layerElement.style.display = 'block';
          }),
          extendPrototype(
            [BaseElement, TransformElement, HierarchyElement, FrameElement, RenderableDOMElement],
            ICompElement,
          ),
          (ICompElement.prototype.initElement = function (t, e, i) {
            this.initFrame(),
              this.initBaseData(t, e, i),
              this.initTransform(t, e, i),
              this.initRenderable(),
              this.initHierarchy(),
              this.initRendererElement(),
              this.createContainerElements(),
              this.createRenderableComponents(),
              (!this.data.xt && e.progressiveLoad) || this.buildAllItems(),
              this.hide();
          }),
          (ICompElement.prototype.prepareFrame = function (t) {
            if (
              ((this._mdf = !1),
              this.prepareRenderableFrame(t),
              this.prepareProperties(t, this.isInRange),
              this.isInRange || this.data.xt)
            ) {
              if (this.tm._placeholder) this.renderedFrame = t / this.data.sr;
              else {
                var e = this.tm.v;
                e === this.data.op && (e = this.data.op - 1), (this.renderedFrame = e);
              }
              var i,
                s = this.elements.length;
              for (this.completeLayers || this.checkLayers(this.renderedFrame), i = s - 1; i >= 0; i -= 1)
                (this.completeLayers || this.elements[i]) &&
                  (this.elements[i].prepareFrame(this.renderedFrame - this.layers[i].st),
                  this.elements[i]._mdf && (this._mdf = !0));
            }
          }),
          (ICompElement.prototype.renderInnerContent = function () {
            var t,
              e = this.layers.length;
            for (t = 0; t < e; t += 1) (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
          }),
          (ICompElement.prototype.setElements = function (t) {
            this.elements = t;
          }),
          (ICompElement.prototype.getElements = function () {
            return this.elements;
          }),
          (ICompElement.prototype.destroyElements = function () {
            var t,
              e = this.layers.length;
            for (t = 0; t < e; t += 1) this.elements[t] && this.elements[t].destroy();
          }),
          (ICompElement.prototype.destroy = function () {
            this.destroyElements(), this.destroyBaseElement();
          }),
          extendPrototype([SVGRendererBase, ICompElement, SVGBaseElement], SVGCompElement),
          (SVGCompElement.prototype.createComp = function (t) {
            return new SVGCompElement(t, this.globalData, this);
          }),
          extendPrototype([SVGRendererBase], SVGRenderer),
          (SVGRenderer.prototype.createComp = function (t) {
            return new SVGCompElement(t, this.globalData, this);
          }),
          (CVContextData.prototype.duplicate = function () {
            var t = 2 * this._length,
              e = this.savedOp;
            (this.savedOp = createTypedArray('float32', t)), this.savedOp.set(e);
            var i = 0;
            for (i = this._length; i < t; i += 1) this.saved[i] = createTypedArray('float32', 16);
            this._length = t;
          }),
          (CVContextData.prototype.reset = function () {
            (this.cArrPos = 0), this.cTr.reset(), (this.cO = 1);
          }),
          (ShapeTransformManager.prototype = {
            addTransformSequence: function (t) {
              var e,
                i = t.length,
                s = '_';
              for (e = 0; e < i; e += 1) s += t[e].transform.key + '_';
              var n = this.sequences[s];
              return (
                n ||
                  ((n = { transforms: [].concat(t), finalTransform: new Matrix(), _mdf: !1 }),
                  (this.sequences[s] = n),
                  this.sequenceList.push(n)),
                n
              );
            },
            processSequence: function (t, e) {
              for (var i, s = 0, n = t.transforms.length, a = e; s < n && !e; ) {
                if (t.transforms[s].transform.mProps._mdf) {
                  a = !0;
                  break;
                }
                s += 1;
              }
              if (a)
                for (t.finalTransform.reset(), s = n - 1; s >= 0; s -= 1)
                  (i = t.transforms[s].transform.mProps.v.props),
                    t.finalTransform.transform(
                      i[0],
                      i[1],
                      i[2],
                      i[3],
                      i[4],
                      i[5],
                      i[6],
                      i[7],
                      i[8],
                      i[9],
                      i[10],
                      i[11],
                      i[12],
                      i[13],
                      i[14],
                      i[15],
                    );
              t._mdf = a;
            },
            processSequences: function (t) {
              var e,
                i = this.sequenceList.length;
              for (e = 0; e < i; e += 1) this.processSequence(this.sequenceList[e], t);
            },
            getNewKey: function () {
              return (this.transform_key_count += 1), '_' + this.transform_key_count;
            },
          }),
          (CVEffects.prototype.renderFrame = function () {}),
          (CVMaskElement.prototype.renderFrame = function () {
            if (this.hasMasks) {
              var t,
                e,
                i,
                s,
                n = this.element.finalTransform.mat,
                a = this.element.canvasContext,
                o = this.masksProperties.length;
              for (a.beginPath(), t = 0; t < o; t += 1)
                if ('n' !== this.masksProperties[t].mode) {
                  this.masksProperties[t].inv &&
                    (a.moveTo(0, 0),
                    a.lineTo(this.element.globalData.compSize.w, 0),
                    a.lineTo(this.element.globalData.compSize.w, this.element.globalData.compSize.h),
                    a.lineTo(0, this.element.globalData.compSize.h),
                    a.lineTo(0, 0)),
                    (s = this.viewData[t].v),
                    (e = n.applyToPointArray(s.v[0][0], s.v[0][1], 0)),
                    a.moveTo(e[0], e[1]);
                  var h,
                    l = s._length;
                  for (h = 1; h < l; h += 1)
                    (i = n.applyToTriplePoints(s.o[h - 1], s.i[h], s.v[h])),
                      a.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5]);
                  (i = n.applyToTriplePoints(s.o[h - 1], s.i[0], s.v[0])),
                    a.bezierCurveTo(i[0], i[1], i[2], i[3], i[4], i[5]);
                }
              this.element.globalData.renderer.save(!0), a.clip();
            }
          }),
          (CVMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty),
          (CVMaskElement.prototype.destroy = function () {
            this.element = null;
          }),
          (CVBaseElement.prototype = {
            createElements: function () {},
            initRendererElement: function () {},
            createContainerElements: function () {
              (this.canvasContext = this.globalData.canvasContext),
                (this.renderableEffectsManager = new CVEffects(this));
            },
            createContent: function () {},
            setBlendMode: function () {
              var t = this.globalData;
              if (t.blendMode !== this.data.bm) {
                t.blendMode = this.data.bm;
                var e = getBlendMode(this.data.bm);
                t.canvasContext.globalCompositeOperation = e;
              }
            },
            createRenderableComponents: function () {
              this.maskManager = new CVMaskElement(this.data, this);
            },
            hideElement: function () {
              this.hidden || (this.isInRange && !this.isTransparent) || (this.hidden = !0);
            },
            showElement: function () {
              this.isInRange &&
                !this.isTransparent &&
                ((this.hidden = !1), (this._isFirstFrame = !0), (this.maskManager._isFirstFrame = !0));
            },
            renderFrame: function () {
              if (!this.hidden && !this.data.hd) {
                this.renderTransform(), this.renderRenderable(), this.setBlendMode();
                var t = 0 === this.data.ty;
                this.globalData.renderer.save(t),
                  this.globalData.renderer.ctxTransform(this.finalTransform.mat.props),
                  this.globalData.renderer.ctxOpacity(this.finalTransform.mProp.o.v),
                  this.renderInnerContent(),
                  this.globalData.renderer.restore(t),
                  this.maskManager.hasMasks && this.globalData.renderer.restore(!0),
                  this._isFirstFrame && (this._isFirstFrame = !1);
              }
            },
            destroy: function () {
              (this.canvasContext = null), (this.data = null), (this.globalData = null), this.maskManager.destroy();
            },
            mHelper: new Matrix(),
          }),
          (CVBaseElement.prototype.hide = CVBaseElement.prototype.hideElement),
          (CVBaseElement.prototype.show = CVBaseElement.prototype.showElement),
          (CVShapeData.prototype.setAsAnimated = SVGShapeData.prototype.setAsAnimated),
          extendPrototype(
            [
              BaseElement,
              TransformElement,
              CVBaseElement,
              IShapeElement,
              HierarchyElement,
              FrameElement,
              RenderableElement,
            ],
            CVShapeElement,
          ),
          (CVShapeElement.prototype.initElement = RenderableDOMElement.prototype.initElement),
          (CVShapeElement.prototype.transformHelper = { opacity: 1, _opMdf: !1 }),
          (CVShapeElement.prototype.dashResetter = []),
          (CVShapeElement.prototype.createContent = function () {
            this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []);
          }),
          (CVShapeElement.prototype.createStyleElement = function (t, e) {
            var i = {
                data: t,
                type: t.ty,
                preTransforms: this.transformsManager.addTransformSequence(e),
                transforms: [],
                elements: [],
                closed: !0 === t.hd,
              },
              s = {};
            if (
              ('fl' === t.ty || 'st' === t.ty
                ? ((s.c = PropertyFactory.getProp(this, t.c, 1, 255, this)),
                  s.c.k ||
                    (i.co = 'rgb(' + bmFloor(s.c.v[0]) + ',' + bmFloor(s.c.v[1]) + ',' + bmFloor(s.c.v[2]) + ')'))
                : ('gf' !== t.ty && 'gs' !== t.ty) ||
                  ((s.s = PropertyFactory.getProp(this, t.s, 1, null, this)),
                  (s.e = PropertyFactory.getProp(this, t.e, 1, null, this)),
                  (s.h = PropertyFactory.getProp(this, t.h || { k: 0 }, 0, 0.01, this)),
                  (s.a = PropertyFactory.getProp(this, t.a || { k: 0 }, 0, degToRads, this)),
                  (s.g = new GradientProperty(this, t.g, this))),
              (s.o = PropertyFactory.getProp(this, t.o, 0, 0.01, this)),
              'st' === t.ty || 'gs' === t.ty)
            ) {
              if (
                ((i.lc = lineCapEnum[t.lc || 2]),
                (i.lj = lineJoinEnum[t.lj || 2]),
                1 == t.lj && (i.ml = t.ml),
                (s.w = PropertyFactory.getProp(this, t.w, 0, null, this)),
                s.w.k || (i.wi = s.w.v),
                t.d)
              ) {
                var n = new DashProperty(this, t.d, 'canvas', this);
                (s.d = n), s.d.k || ((i.da = s.d.dashArray), (i.do = s.d.dashoffset[0]));
              }
            } else i.r = 2 === t.r ? 'evenodd' : 'nonzero';
            return this.stylesList.push(i), (s.style = i), s;
          }),
          (CVShapeElement.prototype.createGroupElement = function () {
            return { it: [], prevViewData: [] };
          }),
          (CVShapeElement.prototype.createTransformElement = function (t) {
            return {
              transform: {
                opacity: 1,
                _opMdf: !1,
                key: this.transformsManager.getNewKey(),
                op: PropertyFactory.getProp(this, t.o, 0, 0.01, this),
                mProps: TransformPropertyFactory.getTransformProperty(this, t, this),
              },
            };
          }),
          (CVShapeElement.prototype.createShapeElement = function (t) {
            var e = new CVShapeData(this, t, this.stylesList, this.transformsManager);
            return this.shapes.push(e), this.addShapeToModifiers(e), e;
          }),
          (CVShapeElement.prototype.reloadShapes = function () {
            this._isFirstFrame = !0;
            var t,
              e = this.itemsData.length;
            for (t = 0; t < e; t += 1) this.prevViewData[t] = this.itemsData[t];
            for (
              this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, !0, []),
                e = this.dynamicProperties.length,
                t = 0;
              t < e;
              t += 1
            )
              this.dynamicProperties[t].getValue();
            this.renderModifiers(), this.transformsManager.processSequences(this._isFirstFrame);
          }),
          (CVShapeElement.prototype.addTransformToStyleList = function (t) {
            var e,
              i = this.stylesList.length;
            for (e = 0; e < i; e += 1) this.stylesList[e].closed || this.stylesList[e].transforms.push(t);
          }),
          (CVShapeElement.prototype.removeTransformFromStyleList = function () {
            var t,
              e = this.stylesList.length;
            for (t = 0; t < e; t += 1) this.stylesList[t].closed || this.stylesList[t].transforms.pop();
          }),
          (CVShapeElement.prototype.closeStyles = function (t) {
            var e,
              i = t.length;
            for (e = 0; e < i; e += 1) t[e].closed = !0;
          }),
          (CVShapeElement.prototype.searchShapes = function (t, e, i, s, n) {
            var a,
              o,
              h,
              l,
              p,
              f,
              u = t.length - 1,
              c = [],
              d = [],
              m = [].concat(n);
            for (a = u; a >= 0; a -= 1) {
              if (
                ((l = this.searchProcessedElement(t[a])) ? (e[a] = i[l - 1]) : (t[a]._shouldRender = s),
                'fl' === t[a].ty || 'st' === t[a].ty || 'gf' === t[a].ty || 'gs' === t[a].ty)
              )
                l ? (e[a].style.closed = !1) : (e[a] = this.createStyleElement(t[a], m)), c.push(e[a].style);
              else if ('gr' === t[a].ty) {
                if (l) for (h = e[a].it.length, o = 0; o < h; o += 1) e[a].prevViewData[o] = e[a].it[o];
                else e[a] = this.createGroupElement(t[a]);
                this.searchShapes(t[a].it, e[a].it, e[a].prevViewData, s, m);
              } else
                'tr' === t[a].ty
                  ? (l || ((f = this.createTransformElement(t[a])), (e[a] = f)),
                    m.push(e[a]),
                    this.addTransformToStyleList(e[a]))
                  : 'sh' === t[a].ty || 'rc' === t[a].ty || 'el' === t[a].ty || 'sr' === t[a].ty
                  ? l || (e[a] = this.createShapeElement(t[a]))
                  : 'tm' === t[a].ty || 'rd' === t[a].ty || 'pb' === t[a].ty || 'zz' === t[a].ty || 'op' === t[a].ty
                  ? (l
                      ? ((p = e[a]).closed = !1)
                      : ((p = ShapeModifiers.getModifier(t[a].ty)).init(this, t[a]),
                        (e[a] = p),
                        this.shapeModifiers.push(p)),
                    d.push(p))
                  : 'rp' === t[a].ty &&
                    (l
                      ? ((p = e[a]).closed = !0)
                      : ((p = ShapeModifiers.getModifier(t[a].ty)),
                        (e[a] = p),
                        p.init(this, t, a, e),
                        this.shapeModifiers.push(p),
                        (s = !1)),
                    d.push(p));
              this.addProcessedElement(t[a], a + 1);
            }
            for (this.removeTransformFromStyleList(), this.closeStyles(c), u = d.length, a = 0; a < u; a += 1)
              d[a].closed = !0;
          }),
          (CVShapeElement.prototype.renderInnerContent = function () {
            (this.transformHelper.opacity = 1),
              (this.transformHelper._opMdf = !1),
              this.renderModifiers(),
              this.transformsManager.processSequences(this._isFirstFrame),
              this.renderShape(this.transformHelper, this.shapesData, this.itemsData, !0);
          }),
          (CVShapeElement.prototype.renderShapeTransform = function (t, e) {
            (t._opMdf || e.op._mdf || this._isFirstFrame) &&
              ((e.opacity = t.opacity), (e.opacity *= e.op.v), (e._opMdf = !0));
          }),
          (CVShapeElement.prototype.drawLayer = function () {
            var t,
              e,
              i,
              s,
              n,
              a,
              o,
              h,
              l,
              p = this.stylesList.length,
              f = this.globalData.renderer,
              u = this.globalData.canvasContext;
            for (t = 0; t < p; t += 1)
              if (
                (('st' !== (h = (l = this.stylesList[t]).type) && 'gs' !== h) || 0 !== l.wi) &&
                l.data._shouldRender &&
                0 !== l.coOp &&
                0 !== this.globalData.currentGlobalAlpha
              ) {
                for (
                  f.save(),
                    a = l.elements,
                    'st' === h || 'gs' === h
                      ? ((u.strokeStyle = 'st' === h ? l.co : l.grd),
                        (u.lineWidth = l.wi),
                        (u.lineCap = l.lc),
                        (u.lineJoin = l.lj),
                        (u.miterLimit = l.ml || 0))
                      : (u.fillStyle = 'fl' === h ? l.co : l.grd),
                    f.ctxOpacity(l.coOp),
                    'st' !== h && 'gs' !== h && u.beginPath(),
                    f.ctxTransform(l.preTransforms.finalTransform.props),
                    i = a.length,
                    e = 0;
                  e < i;
                  e += 1
                ) {
                  for (
                    ('st' !== h && 'gs' !== h) ||
                      (u.beginPath(), l.da && (u.setLineDash(l.da), (u.lineDashOffset = l.do))),
                      n = (o = a[e].trNodes).length,
                      s = 0;
                    s < n;
                    s += 1
                  )
                    'm' === o[s].t
                      ? u.moveTo(o[s].p[0], o[s].p[1])
                      : 'c' === o[s].t
                      ? u.bezierCurveTo(o[s].pts[0], o[s].pts[1], o[s].pts[2], o[s].pts[3], o[s].pts[4], o[s].pts[5])
                      : u.closePath();
                  ('st' !== h && 'gs' !== h) || (u.stroke(), l.da && u.setLineDash(this.dashResetter));
                }
                'st' !== h && 'gs' !== h && u.fill(l.r), f.restore();
              }
          }),
          (CVShapeElement.prototype.renderShape = function (t, e, i, s) {
            var n, a;
            for (a = t, n = e.length - 1; n >= 0; n -= 1)
              'tr' === e[n].ty
                ? ((a = i[n].transform), this.renderShapeTransform(t, a))
                : 'sh' === e[n].ty || 'el' === e[n].ty || 'rc' === e[n].ty || 'sr' === e[n].ty
                ? this.renderPath(e[n], i[n])
                : 'fl' === e[n].ty
                ? this.renderFill(e[n], i[n], a)
                : 'st' === e[n].ty
                ? this.renderStroke(e[n], i[n], a)
                : 'gf' === e[n].ty || 'gs' === e[n].ty
                ? this.renderGradientFill(e[n], i[n], a)
                : 'gr' === e[n].ty
                ? this.renderShape(a, e[n].it, i[n].it)
                : e[n].ty;
            s && this.drawLayer();
          }),
          (CVShapeElement.prototype.renderStyledShape = function (t, e) {
            if (this._isFirstFrame || e._mdf || t.transforms._mdf) {
              var i,
                s,
                n,
                a = t.trNodes,
                o = e.paths,
                h = o._length;
              a.length = 0;
              var l = t.transforms.finalTransform;
              for (n = 0; n < h; n += 1) {
                var p = o.shapes[n];
                if (p && p.v) {
                  for (s = p._length, i = 1; i < s; i += 1)
                    1 === i && a.push({ t: 'm', p: l.applyToPointArray(p.v[0][0], p.v[0][1], 0) }),
                      a.push({ t: 'c', pts: l.applyToTriplePoints(p.o[i - 1], p.i[i], p.v[i]) });
                  1 === s && a.push({ t: 'm', p: l.applyToPointArray(p.v[0][0], p.v[0][1], 0) }),
                    p.c &&
                      s &&
                      (a.push({ t: 'c', pts: l.applyToTriplePoints(p.o[i - 1], p.i[0], p.v[0]) }), a.push({ t: 'z' }));
                }
              }
              t.trNodes = a;
            }
          }),
          (CVShapeElement.prototype.renderPath = function (t, e) {
            if (!0 !== t.hd && t._shouldRender) {
              var i,
                s = e.styledShapes.length;
              for (i = 0; i < s; i += 1) this.renderStyledShape(e.styledShapes[i], e.sh);
            }
          }),
          (CVShapeElement.prototype.renderFill = function (t, e, i) {
            var s = e.style;
            (e.c._mdf || this._isFirstFrame) &&
              (s.co = 'rgb(' + bmFloor(e.c.v[0]) + ',' + bmFloor(e.c.v[1]) + ',' + bmFloor(e.c.v[2]) + ')'),
              (e.o._mdf || i._opMdf || this._isFirstFrame) && (s.coOp = e.o.v * i.opacity);
          }),
          (CVShapeElement.prototype.renderGradientFill = function (t, e, i) {
            var s,
              n = e.style;
            if (!n.grd || e.g._mdf || e.s._mdf || e.e._mdf || (1 !== t.t && (e.h._mdf || e.a._mdf))) {
              var a,
                o = this.globalData.canvasContext,
                h = e.s.v,
                l = e.e.v;
              if (1 === t.t) s = o.createLinearGradient(h[0], h[1], l[0], l[1]);
              else {
                var p = Math.sqrt(Math.pow(h[0] - l[0], 2) + Math.pow(h[1] - l[1], 2)),
                  f = Math.atan2(l[1] - h[1], l[0] - h[0]),
                  u = e.h.v;
                u >= 1 ? (u = 0.99) : u <= -1 && (u = -0.99);
                var c = p * u,
                  d = Math.cos(f + e.a.v) * c + h[0],
                  m = Math.sin(f + e.a.v) * c + h[1];
                s = o.createRadialGradient(d, m, 0, h[0], h[1], p);
              }
              var $ = t.g.p,
                g = e.g.c,
                y = 1;
              for (a = 0; a < $; a += 1)
                e.g._hasOpacity && e.g._collapsable && (y = e.g.o[2 * a + 1]),
                  s.addColorStop(
                    g[4 * a] / 100,
                    'rgba(' + g[4 * a + 1] + ',' + g[4 * a + 2] + ',' + g[4 * a + 3] + ',' + y + ')',
                  );
              n.grd = s;
            }
            n.coOp = e.o.v * i.opacity;
          }),
          (CVShapeElement.prototype.renderStroke = function (t, e, i) {
            var s = e.style,
              n = e.d;
            n && (n._mdf || this._isFirstFrame) && ((s.da = n.dashArray), (s.do = n.dashoffset[0])),
              (e.c._mdf || this._isFirstFrame) &&
                (s.co = 'rgb(' + bmFloor(e.c.v[0]) + ',' + bmFloor(e.c.v[1]) + ',' + bmFloor(e.c.v[2]) + ')'),
              (e.o._mdf || i._opMdf || this._isFirstFrame) && (s.coOp = e.o.v * i.opacity),
              (e.w._mdf || this._isFirstFrame) && (s.wi = e.w.v);
          }),
          (CVShapeElement.prototype.destroy = function () {
            (this.shapesData = null),
              (this.globalData = null),
              (this.canvasContext = null),
              (this.stylesList.length = 0),
              (this.itemsData.length = 0);
          }),
          extendPrototype(
            [
              BaseElement,
              TransformElement,
              CVBaseElement,
              HierarchyElement,
              FrameElement,
              RenderableElement,
              ITextElement,
            ],
            CVTextElement,
          ),
          (CVTextElement.prototype.tHelper = createTag('canvas').getContext('2d')),
          (CVTextElement.prototype.buildNewText = function () {
            var t = this.textProperty.currentData;
            this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
            var e = !1;
            t.fc ? ((e = !0), (this.values.fill = this.buildColor(t.fc))) : (this.values.fill = 'rgba(0,0,0,0)'),
              (this.fill = e);
            var i = !1;
            t.sc && ((i = !0), (this.values.stroke = this.buildColor(t.sc)), (this.values.sWidth = t.sw));
            var s,
              n,
              a,
              o,
              h,
              l,
              p,
              f,
              u,
              c,
              d,
              m,
              $ = this.globalData.fontManager.getFontByName(t.f),
              g = t.l,
              y = this.mHelper;
            (this.stroke = i),
              (this.values.fValue = t.finalSize + 'px ' + this.globalData.fontManager.getFontByName(t.f).fFamily),
              (n = t.finalText.length);
            var v = this.data.singleShape,
              _ = 0.001 * t.tr * t.finalSize,
              b = 0,
              x = 0,
              P = !0,
              k = 0;
            for (s = 0; s < n; s += 1) {
              (o =
                ((a = this.globalData.fontManager.getCharData(
                  t.finalText[s],
                  $.fStyle,
                  this.globalData.fontManager.getFontByName(t.f).fFamily,
                )) &&
                  a.data) ||
                {}),
                y.reset(),
                v && g[s].n && ((b = -_), (x += t.yOffset), (x += P ? 1 : 0), (P = !1)),
                (u = (p = o.shapes ? o.shapes[0].it : []).length),
                y.scale(t.finalSize / 100, t.finalSize / 100),
                v && this.applyTextPropertiesToMatrix(t, y, g[s].line, b, x),
                (d = createSizedArray(u - 1));
              var w = 0;
              for (f = 0; f < u; f += 1)
                if ('sh' === p[f].ty) {
                  for (l = p[f].ks.k.i.length, c = p[f].ks.k, m = [], h = 1; h < l; h += 1)
                    1 === h && m.push(y.applyToX(c.v[0][0], c.v[0][1], 0), y.applyToY(c.v[0][0], c.v[0][1], 0)),
                      m.push(
                        y.applyToX(c.o[h - 1][0], c.o[h - 1][1], 0),
                        y.applyToY(c.o[h - 1][0], c.o[h - 1][1], 0),
                        y.applyToX(c.i[h][0], c.i[h][1], 0),
                        y.applyToY(c.i[h][0], c.i[h][1], 0),
                        y.applyToX(c.v[h][0], c.v[h][1], 0),
                        y.applyToY(c.v[h][0], c.v[h][1], 0),
                      );
                  m.push(
                    y.applyToX(c.o[h - 1][0], c.o[h - 1][1], 0),
                    y.applyToY(c.o[h - 1][0], c.o[h - 1][1], 0),
                    y.applyToX(c.i[0][0], c.i[0][1], 0),
                    y.applyToY(c.i[0][0], c.i[0][1], 0),
                    y.applyToX(c.v[0][0], c.v[0][1], 0),
                    y.applyToY(c.v[0][0], c.v[0][1], 0),
                  ),
                    (d[w] = m),
                    (w += 1);
                }
              v && ((b += g[s].l), (b += _)),
                this.textSpans[k] ? (this.textSpans[k].elem = d) : (this.textSpans[k] = { elem: d }),
                (k += 1);
            }
          }),
          (CVTextElement.prototype.renderInnerContent = function () {
            var t,
              e,
              i,
              s,
              n,
              a,
              o = this.canvasContext;
            (o.font = this.values.fValue),
              (o.lineCap = 'butt'),
              (o.lineJoin = 'miter'),
              (o.miterLimit = 4),
              this.data.singleShape ||
                this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag);
            var h,
              l = this.textAnimator.renderedLetters,
              p = this.textProperty.currentData.l;
            e = p.length;
            var f,
              u,
              c = null,
              d = null,
              m = null;
            for (t = 0; t < e; t += 1)
              if (!p[t].n) {
                if (
                  ((h = l[t]) &&
                    (this.globalData.renderer.save(),
                    this.globalData.renderer.ctxTransform(h.p),
                    this.globalData.renderer.ctxOpacity(h.o)),
                  this.fill)
                ) {
                  for (
                    h && h.fc
                      ? c !== h.fc && ((c = h.fc), (o.fillStyle = h.fc))
                      : c !== this.values.fill && ((c = this.values.fill), (o.fillStyle = this.values.fill)),
                      s = (f = this.textSpans[t].elem).length,
                      this.globalData.canvasContext.beginPath(),
                      i = 0;
                    i < s;
                    i += 1
                  )
                    for (a = (u = f[i]).length, this.globalData.canvasContext.moveTo(u[0], u[1]), n = 2; n < a; n += 6)
                      this.globalData.canvasContext.bezierCurveTo(
                        u[n],
                        u[n + 1],
                        u[n + 2],
                        u[n + 3],
                        u[n + 4],
                        u[n + 5],
                      );
                  this.globalData.canvasContext.closePath(), this.globalData.canvasContext.fill();
                }
                if (this.stroke) {
                  for (
                    h && h.sw
                      ? m !== h.sw && ((m = h.sw), (o.lineWidth = h.sw))
                      : m !== this.values.sWidth && ((m = this.values.sWidth), (o.lineWidth = this.values.sWidth)),
                      h && h.sc
                        ? d !== h.sc && ((d = h.sc), (o.strokeStyle = h.sc))
                        : d !== this.values.stroke && ((d = this.values.stroke), (o.strokeStyle = this.values.stroke)),
                      s = (f = this.textSpans[t].elem).length,
                      this.globalData.canvasContext.beginPath(),
                      i = 0;
                    i < s;
                    i += 1
                  )
                    for (a = (u = f[i]).length, this.globalData.canvasContext.moveTo(u[0], u[1]), n = 2; n < a; n += 6)
                      this.globalData.canvasContext.bezierCurveTo(
                        u[n],
                        u[n + 1],
                        u[n + 2],
                        u[n + 3],
                        u[n + 4],
                        u[n + 5],
                      );
                  this.globalData.canvasContext.closePath(), this.globalData.canvasContext.stroke();
                }
                h && this.globalData.renderer.restore();
              }
          }),
          extendPrototype(
            [BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement],
            CVImageElement,
          ),
          (CVImageElement.prototype.initElement = SVGShapeElement.prototype.initElement),
          (CVImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame),
          (CVImageElement.prototype.createContent = function () {
            if (this.img.width && (this.assetData.w !== this.img.width || this.assetData.h !== this.img.height)) {
              var t = createTag('canvas');
              (t.width = this.assetData.w), (t.height = this.assetData.h);
              var e,
                i,
                s = t.getContext('2d'),
                n = this.img.width,
                a = this.img.height,
                o = n / a,
                h = this.assetData.w / this.assetData.h,
                l = this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio;
              (o > h && 'xMidYMid slice' === l) || (o < h && 'xMidYMid slice' !== l)
                ? (e = (i = a) * h)
                : (i = (e = n) / h),
                s.drawImage(this.img, (n - e) / 2, (a - i) / 2, e, i, 0, 0, this.assetData.w, this.assetData.h),
                (this.img = t);
            }
          }),
          (CVImageElement.prototype.renderInnerContent = function () {
            this.canvasContext.drawImage(this.img, 0, 0);
          }),
          (CVImageElement.prototype.destroy = function () {
            this.img = null;
          }),
          extendPrototype(
            [BaseElement, TransformElement, CVBaseElement, HierarchyElement, FrameElement, RenderableElement],
            CVSolidElement,
          ),
          (CVSolidElement.prototype.initElement = SVGShapeElement.prototype.initElement),
          (CVSolidElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame),
          (CVSolidElement.prototype.renderInnerContent = function () {
            var t = this.canvasContext;
            (t.fillStyle = this.data.sc), t.fillRect(0, 0, this.data.sw, this.data.sh);
          }),
          extendPrototype([BaseRenderer], CanvasRendererBase),
          (CanvasRendererBase.prototype.createShape = function (t) {
            return new CVShapeElement(t, this.globalData, this);
          }),
          (CanvasRendererBase.prototype.createText = function (t) {
            return new CVTextElement(t, this.globalData, this);
          }),
          (CanvasRendererBase.prototype.createImage = function (t) {
            return new CVImageElement(t, this.globalData, this);
          }),
          (CanvasRendererBase.prototype.createSolid = function (t) {
            return new CVSolidElement(t, this.globalData, this);
          }),
          (CanvasRendererBase.prototype.createNull = SVGRenderer.prototype.createNull),
          (CanvasRendererBase.prototype.ctxTransform = function (t) {
            if (1 !== t[0] || 0 !== t[1] || 0 !== t[4] || 1 !== t[5] || 0 !== t[12] || 0 !== t[13]) {
              if (this.renderConfig.clearCanvas) {
                this.transformMat.cloneFromProps(t);
                var e = this.contextData.cTr.props;
                this.transformMat.transform(
                  e[0],
                  e[1],
                  e[2],
                  e[3],
                  e[4],
                  e[5],
                  e[6],
                  e[7],
                  e[8],
                  e[9],
                  e[10],
                  e[11],
                  e[12],
                  e[13],
                  e[14],
                  e[15],
                ),
                  this.contextData.cTr.cloneFromProps(this.transformMat.props);
                var i = this.contextData.cTr.props;
                this.canvasContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13]);
              } else this.canvasContext.transform(t[0], t[1], t[4], t[5], t[12], t[13]);
            }
          }),
          (CanvasRendererBase.prototype.ctxOpacity = function (t) {
            if (!this.renderConfig.clearCanvas)
              return (
                (this.canvasContext.globalAlpha *= t < 0 ? 0 : t),
                void (this.globalData.currentGlobalAlpha = this.contextData.cO)
              );
            (this.contextData.cO *= t < 0 ? 0 : t),
              this.globalData.currentGlobalAlpha !== this.contextData.cO &&
                ((this.canvasContext.globalAlpha = this.contextData.cO),
                (this.globalData.currentGlobalAlpha = this.contextData.cO));
          }),
          (CanvasRendererBase.prototype.reset = function () {
            this.renderConfig.clearCanvas ? this.contextData.reset() : this.canvasContext.restore();
          }),
          (CanvasRendererBase.prototype.save = function (t) {
            if (this.renderConfig.clearCanvas) {
              t && this.canvasContext.save();
              var e,
                i = this.contextData.cTr.props;
              this.contextData._length <= this.contextData.cArrPos && this.contextData.duplicate();
              var s = this.contextData.saved[this.contextData.cArrPos];
              for (e = 0; e < 16; e += 1) s[e] = i[e];
              (this.contextData.savedOp[this.contextData.cArrPos] = this.contextData.cO),
                (this.contextData.cArrPos += 1);
            } else this.canvasContext.save();
          }),
          (CanvasRendererBase.prototype.restore = function (t) {
            if (this.renderConfig.clearCanvas) {
              t && (this.canvasContext.restore(), (this.globalData.blendMode = 'source-over')),
                (this.contextData.cArrPos -= 1);
              var e,
                i = this.contextData.saved[this.contextData.cArrPos],
                s = this.contextData.cTr.props;
              for (e = 0; e < 16; e += 1) s[e] = i[e];
              this.canvasContext.setTransform(i[0], i[1], i[4], i[5], i[12], i[13]),
                (i = this.contextData.savedOp[this.contextData.cArrPos]),
                (this.contextData.cO = i),
                this.globalData.currentGlobalAlpha !== i &&
                  ((this.canvasContext.globalAlpha = i), (this.globalData.currentGlobalAlpha = i));
            } else this.canvasContext.restore();
          }),
          (CanvasRendererBase.prototype.configAnimation = function (t) {
            if (this.animationItem.wrapper) {
              this.animationItem.container = createTag('canvas');
              var e = this.animationItem.container.style;
              (e.width = '100%'), (e.height = '100%');
              var i = '0px 0px 0px';
              (e.transformOrigin = i),
                (e.mozTransformOrigin = i),
                (e.webkitTransformOrigin = i),
                (e['-webkit-transform'] = i),
                (e.contentVisibility = this.renderConfig.contentVisibility),
                this.animationItem.wrapper.appendChild(this.animationItem.container),
                (this.canvasContext = this.animationItem.container.getContext('2d')),
                this.renderConfig.className &&
                  this.animationItem.container.setAttribute('class', this.renderConfig.className),
                this.renderConfig.id && this.animationItem.container.setAttribute('id', this.renderConfig.id);
            } else this.canvasContext = this.renderConfig.context;
            (this.data = t),
              (this.layers = t.layers),
              (this.transformCanvas = { w: t.w, h: t.h, sx: 0, sy: 0, tx: 0, ty: 0 }),
              this.setupGlobalData(t, document.body),
              (this.globalData.canvasContext = this.canvasContext),
              (this.globalData.renderer = this),
              (this.globalData.isDashed = !1),
              (this.globalData.progressiveLoad = this.renderConfig.progressiveLoad),
              (this.globalData.transformCanvas = this.transformCanvas),
              (this.elements = createSizedArray(t.layers.length)),
              this.updateContainerSize();
          }),
          (CanvasRendererBase.prototype.updateContainerSize = function (t, e) {
            var i, s, n, a;
            if (
              (this.reset(),
              t
                ? ((i = t), (s = e), (this.canvasContext.canvas.width = i), (this.canvasContext.canvas.height = s))
                : (this.animationItem.wrapper && this.animationItem.container
                    ? ((i = this.animationItem.wrapper.offsetWidth), (s = this.animationItem.wrapper.offsetHeight))
                    : ((i = this.canvasContext.canvas.width), (s = this.canvasContext.canvas.height)),
                  (this.canvasContext.canvas.width = i * this.renderConfig.dpr),
                  (this.canvasContext.canvas.height = s * this.renderConfig.dpr)),
              -1 !== this.renderConfig.preserveAspectRatio.indexOf('meet') ||
                -1 !== this.renderConfig.preserveAspectRatio.indexOf('slice'))
            ) {
              var o = this.renderConfig.preserveAspectRatio.split(' '),
                h = o[1] || 'meet',
                l = o[0] || 'xMidYMid',
                p = l.substr(0, 4),
                f = l.substr(4);
              (n = i / s),
                ((a = this.transformCanvas.w / this.transformCanvas.h) > n && 'meet' === h) || (a < n && 'slice' === h)
                  ? ((this.transformCanvas.sx = i / (this.transformCanvas.w / this.renderConfig.dpr)),
                    (this.transformCanvas.sy = i / (this.transformCanvas.w / this.renderConfig.dpr)))
                  : ((this.transformCanvas.sx = s / (this.transformCanvas.h / this.renderConfig.dpr)),
                    (this.transformCanvas.sy = s / (this.transformCanvas.h / this.renderConfig.dpr))),
                (this.transformCanvas.tx =
                  'xMid' === p && ((a < n && 'meet' === h) || (a > n && 'slice' === h))
                    ? ((i - this.transformCanvas.w * (s / this.transformCanvas.h)) / 2) * this.renderConfig.dpr
                    : 'xMax' === p && ((a < n && 'meet' === h) || (a > n && 'slice' === h))
                    ? (i - this.transformCanvas.w * (s / this.transformCanvas.h)) * this.renderConfig.dpr
                    : 0),
                (this.transformCanvas.ty =
                  'YMid' === f && ((a > n && 'meet' === h) || (a < n && 'slice' === h))
                    ? ((s - this.transformCanvas.h * (i / this.transformCanvas.w)) / 2) * this.renderConfig.dpr
                    : 'YMax' === f && ((a > n && 'meet' === h) || (a < n && 'slice' === h))
                    ? (s - this.transformCanvas.h * (i / this.transformCanvas.w)) * this.renderConfig.dpr
                    : 0);
            } else
              'none' === this.renderConfig.preserveAspectRatio
                ? ((this.transformCanvas.sx = i / (this.transformCanvas.w / this.renderConfig.dpr)),
                  (this.transformCanvas.sy = s / (this.transformCanvas.h / this.renderConfig.dpr)),
                  (this.transformCanvas.tx = 0),
                  (this.transformCanvas.ty = 0))
                : ((this.transformCanvas.sx = this.renderConfig.dpr),
                  (this.transformCanvas.sy = this.renderConfig.dpr),
                  (this.transformCanvas.tx = 0),
                  (this.transformCanvas.ty = 0));
            (this.transformCanvas.props = [
              this.transformCanvas.sx,
              0,
              0,
              0,
              0,
              this.transformCanvas.sy,
              0,
              0,
              0,
              0,
              1,
              0,
              this.transformCanvas.tx,
              this.transformCanvas.ty,
              0,
              1,
            ]),
              this.ctxTransform(this.transformCanvas.props),
              this.canvasContext.beginPath(),
              this.canvasContext.rect(0, 0, this.transformCanvas.w, this.transformCanvas.h),
              this.canvasContext.closePath(),
              this.canvasContext.clip(),
              this.renderFrame(this.renderedFrame, !0);
          }),
          (CanvasRendererBase.prototype.destroy = function () {
            var t;
            for (
              this.renderConfig.clearCanvas &&
                this.animationItem.wrapper &&
                (this.animationItem.wrapper.innerText = ''),
                t = (this.layers ? this.layers.length : 0) - 1;
              t >= 0;
              t -= 1
            )
              this.elements[t] && this.elements[t].destroy();
            (this.elements.length = 0),
              (this.globalData.canvasContext = null),
              (this.animationItem.container = null),
              (this.destroyed = !0);
          }),
          (CanvasRendererBase.prototype.renderFrame = function (t, e) {
            if (
              (this.renderedFrame !== t || !0 !== this.renderConfig.clearCanvas || e) &&
              !this.destroyed &&
              -1 !== t
            ) {
              (this.renderedFrame = t),
                (this.globalData.frameNum = t - this.animationItem._isFirstFrame),
                (this.globalData.frameId += 1),
                (this.globalData._mdf = !this.renderConfig.clearCanvas || e),
                (this.globalData.projectInterface.currentFrame = t);
              var i,
                s = this.layers.length;
              for (this.completeLayers || this.checkLayers(t), i = 0; i < s; i += 1)
                (this.completeLayers || this.elements[i]) && this.elements[i].prepareFrame(t - this.layers[i].st);
              if (this.globalData._mdf) {
                for (
                  !0 === this.renderConfig.clearCanvas
                    ? this.canvasContext.clearRect(0, 0, this.transformCanvas.w, this.transformCanvas.h)
                    : this.save(),
                    i = s - 1;
                  i >= 0;
                  i -= 1
                )
                  (this.completeLayers || this.elements[i]) && this.elements[i].renderFrame();
                !0 !== this.renderConfig.clearCanvas && this.restore();
              }
            }
          }),
          (CanvasRendererBase.prototype.buildItem = function (t) {
            var e = this.elements;
            if (!e[t] && 99 !== this.layers[t].ty) {
              var i = this.createItem(this.layers[t], this, this.globalData);
              (e[t] = i), i.initExpressions();
            }
          }),
          (CanvasRendererBase.prototype.checkPendingElements = function () {
            for (; this.pendingElements.length; ) this.pendingElements.pop().checkParenting();
          }),
          (CanvasRendererBase.prototype.hide = function () {
            this.animationItem.container.style.display = 'none';
          }),
          (CanvasRendererBase.prototype.show = function () {
            this.animationItem.container.style.display = 'block';
          }),
          extendPrototype([CanvasRendererBase, ICompElement, CVBaseElement], CVCompElement),
          (CVCompElement.prototype.renderInnerContent = function () {
            var t,
              e = this.canvasContext;
            for (
              e.beginPath(),
                e.moveTo(0, 0),
                e.lineTo(this.data.w, 0),
                e.lineTo(this.data.w, this.data.h),
                e.lineTo(0, this.data.h),
                e.lineTo(0, 0),
                e.clip(),
                t = this.layers.length - 1;
              t >= 0;
              t -= 1
            )
              (this.completeLayers || this.elements[t]) && this.elements[t].renderFrame();
          }),
          (CVCompElement.prototype.destroy = function () {
            var t;
            for (t = this.layers.length - 1; t >= 0; t -= 1) this.elements[t] && this.elements[t].destroy();
            (this.layers = null), (this.elements = null);
          }),
          (CVCompElement.prototype.createComp = function (t) {
            return new CVCompElement(t, this.globalData, this);
          }),
          extendPrototype([CanvasRendererBase], CanvasRenderer),
          (CanvasRenderer.prototype.createComp = function (t) {
            return new CVCompElement(t, this.globalData, this);
          }),
          (HBaseElement.prototype = {
            checkBlendMode: function () {},
            initRendererElement: function () {
              (this.baseElement = createTag(this.data.tg || 'div')),
                this.data.hasMask
                  ? ((this.svgElement = createNS('svg')),
                    (this.layerElement = createNS('g')),
                    (this.maskedElement = this.layerElement),
                    this.svgElement.appendChild(this.layerElement),
                    this.baseElement.appendChild(this.svgElement))
                  : (this.layerElement = this.baseElement),
                styleDiv(this.baseElement);
            },
            createContainerElements: function () {
              (this.renderableEffectsManager = new CVEffects(this)),
                (this.transformedElement = this.baseElement),
                (this.maskedElement = this.layerElement),
                this.data.ln && this.layerElement.setAttribute('id', this.data.ln),
                this.data.cl && this.layerElement.setAttribute('class', this.data.cl),
                0 !== this.data.bm && this.setBlendMode();
            },
            renderElement: function () {
              var t = this.transformedElement ? this.transformedElement.style : {};
              if (this.finalTransform._matMdf) {
                var e = this.finalTransform.mat.toCSS();
                (t.transform = e), (t.webkitTransform = e);
              }
              this.finalTransform._opMdf && (t.opacity = this.finalTransform.mProp.o.v);
            },
            renderFrame: function () {
              this.data.hd ||
                this.hidden ||
                (this.renderTransform(),
                this.renderRenderable(),
                this.renderElement(),
                this.renderInnerContent(),
                this._isFirstFrame && (this._isFirstFrame = !1));
            },
            destroy: function () {
              (this.layerElement = null),
                (this.transformedElement = null),
                this.matteElement && (this.matteElement = null),
                this.maskManager && (this.maskManager.destroy(), (this.maskManager = null));
            },
            createRenderableComponents: function () {
              this.maskManager = new MaskElement(this.data, this, this.globalData);
            },
            addEffects: function () {},
            setMatte: function () {},
          }),
          (HBaseElement.prototype.getBaseElement = SVGBaseElement.prototype.getBaseElement),
          (HBaseElement.prototype.destroyBaseElement = HBaseElement.prototype.destroy),
          (HBaseElement.prototype.buildElementParenting = BaseRenderer.prototype.buildElementParenting),
          extendPrototype(
            [BaseElement, TransformElement, HBaseElement, HierarchyElement, FrameElement, RenderableDOMElement],
            HSolidElement,
          ),
          (HSolidElement.prototype.createContent = function () {
            var t;
            this.data.hasMask
              ? ((t = createNS('rect')).setAttribute('width', this.data.sw),
                t.setAttribute('height', this.data.sh),
                t.setAttribute('fill', this.data.sc),
                this.svgElement.setAttribute('width', this.data.sw),
                this.svgElement.setAttribute('height', this.data.sh))
              : (((t = createTag('div')).style.width = this.data.sw + 'px'),
                (t.style.height = this.data.sh + 'px'),
                (t.style.backgroundColor = this.data.sc)),
              this.layerElement.appendChild(t);
          }),
          extendPrototype(
            [
              BaseElement,
              TransformElement,
              HSolidElement,
              SVGShapeElement,
              HBaseElement,
              HierarchyElement,
              FrameElement,
              RenderableElement,
            ],
            HShapeElement,
          ),
          (HShapeElement.prototype._renderShapeFrame = HShapeElement.prototype.renderInnerContent),
          (HShapeElement.prototype.createContent = function () {
            var t;
            if (((this.baseElement.style.fontSize = 0), this.data.hasMask))
              this.layerElement.appendChild(this.shapesContainer), (t = this.svgElement);
            else {
              t = createNS('svg');
              var e = this.comp.data ? this.comp.data : this.globalData.compSize;
              t.setAttribute('width', e.w),
                t.setAttribute('height', e.h),
                t.appendChild(this.shapesContainer),
                this.layerElement.appendChild(t);
            }
            this.searchShapes(this.shapesData, this.itemsData, this.prevViewData, this.shapesContainer, 0, [], !0),
              this.filterUniqueShapes(),
              (this.shapeCont = t);
          }),
          (HShapeElement.prototype.getTransformedPoint = function (t, e) {
            var i,
              s = t.length;
            for (i = 0; i < s; i += 1) e = t[i].mProps.v.applyToPointArray(e[0], e[1], 0);
            return e;
          }),
          (HShapeElement.prototype.calculateShapeBoundingBox = function (t, e) {
            var i,
              s,
              n,
              a,
              o,
              h = t.sh.v,
              l = t.transformers,
              p = h._length;
            if (!(p <= 1)) {
              for (i = 0; i < p - 1; i += 1)
                (s = this.getTransformedPoint(l, h.v[i])),
                  (n = this.getTransformedPoint(l, h.o[i])),
                  (a = this.getTransformedPoint(l, h.i[i + 1])),
                  (o = this.getTransformedPoint(l, h.v[i + 1])),
                  this.checkBounds(s, n, a, o, e);
              h.c &&
                ((s = this.getTransformedPoint(l, h.v[i])),
                (n = this.getTransformedPoint(l, h.o[i])),
                (a = this.getTransformedPoint(l, h.i[0])),
                (o = this.getTransformedPoint(l, h.v[0])),
                this.checkBounds(s, n, a, o, e));
            }
          }),
          (HShapeElement.prototype.checkBounds = function (t, e, i, s, n) {
            this.getBoundsOfCurve(t, e, i, s);
            var a = this.shapeBoundingBox;
            (n.x = bmMin(a.left, n.x)),
              (n.xMax = bmMax(a.right, n.xMax)),
              (n.y = bmMin(a.top, n.y)),
              (n.yMax = bmMax(a.bottom, n.yMax));
          }),
          (HShapeElement.prototype.shapeBoundingBox = { left: 0, right: 0, top: 0, bottom: 0 }),
          (HShapeElement.prototype.tempBoundingBox = { x: 0, xMax: 0, y: 0, yMax: 0, width: 0, height: 0 }),
          (HShapeElement.prototype.getBoundsOfCurve = function (t, e, i, s) {
            for (
              var n,
                a,
                o,
                h,
                l,
                p,
                f,
                u = [
                  [t[0], s[0]],
                  [t[1], s[1]],
                ],
                c = 0;
              c < 2;
              ++c
            )
              (a = 6 * t[c] - 12 * e[c] + 6 * i[c]),
                (n = -3 * t[c] + 9 * e[c] - 9 * i[c] + 3 * s[c]),
                (o = 3 * e[c] - 3 * t[c]),
                (a |= 0),
                (o |= 0),
                (0 == (n |= 0) && 0 === a) ||
                  (0 === n
                    ? (h = -o / a) > 0 && h < 1 && u[c].push(this.calculateF(h, t, e, i, s, c))
                    : (l = a * a - 4 * o * n) >= 0 &&
                      ((p = (-a + bmSqrt(l)) / (2 * n)) > 0 && p < 1 && u[c].push(this.calculateF(p, t, e, i, s, c)),
                      (f = (-a - bmSqrt(l)) / (2 * n)) > 0 && f < 1 && u[c].push(this.calculateF(f, t, e, i, s, c))));
            (this.shapeBoundingBox.left = bmMin.apply(null, u[0])),
              (this.shapeBoundingBox.top = bmMin.apply(null, u[1])),
              (this.shapeBoundingBox.right = bmMax.apply(null, u[0])),
              (this.shapeBoundingBox.bottom = bmMax.apply(null, u[1]));
          }),
          (HShapeElement.prototype.calculateF = function (t, e, i, s, n, a) {
            return (
              bmPow(1 - t, 3) * e[a] +
              3 * bmPow(1 - t, 2) * t * i[a] +
              3 * (1 - t) * bmPow(t, 2) * s[a] +
              bmPow(t, 3) * n[a]
            );
          }),
          (HShapeElement.prototype.calculateBoundingBox = function (t, e) {
            var i,
              s = t.length;
            for (i = 0; i < s; i += 1)
              t[i] && t[i].sh
                ? this.calculateShapeBoundingBox(t[i], e)
                : t[i] && t[i].it
                ? this.calculateBoundingBox(t[i].it, e)
                : t[i] && t[i].style && t[i].w && this.expandStrokeBoundingBox(t[i].w, e);
          }),
          (HShapeElement.prototype.expandStrokeBoundingBox = function (t, e) {
            var i = 0;
            if (t.keyframes) {
              for (var s = 0; s < t.keyframes.length; s += 1) {
                var n = t.keyframes[s].s;
                n > i && (i = n);
              }
              i *= t.mult;
            } else i = t.v * t.mult;
            (e.x -= i), (e.xMax += i), (e.y -= i), (e.yMax += i);
          }),
          (HShapeElement.prototype.currentBoxContains = function (t) {
            return (
              this.currentBBox.x <= t.x &&
              this.currentBBox.y <= t.y &&
              this.currentBBox.width + this.currentBBox.x >= t.x + t.width &&
              this.currentBBox.height + this.currentBBox.y >= t.y + t.height
            );
          }),
          (HShapeElement.prototype.renderInnerContent = function () {
            if ((this._renderShapeFrame(), !this.hidden && (this._isFirstFrame || this._mdf))) {
              var t = this.tempBoundingBox,
                e = 999999;
              if (
                ((t.x = e),
                (t.xMax = -e),
                (t.y = e),
                (t.yMax = -e),
                this.calculateBoundingBox(this.itemsData, t),
                (t.width = t.xMax < t.x ? 0 : t.xMax - t.x),
                (t.height = t.yMax < t.y ? 0 : t.yMax - t.y),
                !this.currentBoxContains(t))
              ) {
                var i = !1;
                if (
                  (this.currentBBox.w !== t.width &&
                    ((this.currentBBox.w = t.width), this.shapeCont.setAttribute('width', t.width), (i = !0)),
                  this.currentBBox.h !== t.height &&
                    ((this.currentBBox.h = t.height), this.shapeCont.setAttribute('height', t.height), (i = !0)),
                  i || this.currentBBox.x !== t.x || this.currentBBox.y !== t.y)
                ) {
                  (this.currentBBox.w = t.width),
                    (this.currentBBox.h = t.height),
                    (this.currentBBox.x = t.x),
                    (this.currentBBox.y = t.y),
                    this.shapeCont.setAttribute(
                      'viewBox',
                      this.currentBBox.x +
                        ' ' +
                        this.currentBBox.y +
                        ' ' +
                        this.currentBBox.w +
                        ' ' +
                        this.currentBBox.h,
                    );
                  var s = this.shapeCont.style,
                    n = 'translate(' + this.currentBBox.x + 'px,' + this.currentBBox.y + 'px)';
                  (s.transform = n), (s.webkitTransform = n);
                }
              }
            }
          }),
          extendPrototype(
            [
              BaseElement,
              TransformElement,
              HBaseElement,
              HierarchyElement,
              FrameElement,
              RenderableDOMElement,
              ITextElement,
            ],
            HTextElement,
          ),
          (HTextElement.prototype.createContent = function () {
            if (((this.isMasked = this.checkMasks()), this.isMasked)) {
              (this.renderType = 'svg'),
                (this.compW = this.comp.data.w),
                (this.compH = this.comp.data.h),
                this.svgElement.setAttribute('width', this.compW),
                this.svgElement.setAttribute('height', this.compH);
              var t = createNS('g');
              this.maskedElement.appendChild(t), (this.innerElem = t);
            } else (this.renderType = 'html'), (this.innerElem = this.layerElement);
            this.checkParenting();
          }),
          (HTextElement.prototype.buildNewText = function () {
            var t = this.textProperty.currentData;
            this.renderedLetters = createSizedArray(t.l ? t.l.length : 0);
            var e = this.innerElem.style,
              i = t.fc ? this.buildColor(t.fc) : 'rgba(0,0,0,0)';
            (e.fill = i), (e.color = i), t.sc && ((e.stroke = this.buildColor(t.sc)), (e.strokeWidth = t.sw + 'px'));
            var s,
              n,
              a = this.globalData.fontManager.getFontByName(t.f);
            if (!this.globalData.fontManager.chars) {
              if (((e.fontSize = t.finalSize + 'px'), (e.lineHeight = t.finalSize + 'px'), a.fClass))
                this.innerElem.className = a.fClass;
              else {
                e.fontFamily = a.fFamily;
                var o = t.fWeight,
                  h = t.fStyle;
                (e.fontStyle = h), (e.fontWeight = o);
              }
            }
            var l,
              p,
              f,
              u = t.l;
            n = u.length;
            var c,
              d = this.mHelper,
              m = '',
              $ = 0;
            for (s = 0; s < n; s += 1) {
              if (
                (this.globalData.fontManager.chars
                  ? (this.textPaths[$]
                      ? (l = this.textPaths[$])
                      : ((l = createNS('path')).setAttribute('stroke-linecap', lineCapEnum[1]),
                        l.setAttribute('stroke-linejoin', lineJoinEnum[2]),
                        l.setAttribute('stroke-miterlimit', '4')),
                    this.isMasked ||
                      (this.textSpans[$]
                        ? (f = (p = this.textSpans[$]).children[0])
                        : (((p = createTag('div')).style.lineHeight = 0),
                          (f = createNS('svg')).appendChild(l),
                          styleDiv(p))))
                  : this.isMasked
                  ? (l = this.textPaths[$] ? this.textPaths[$] : createNS('text'))
                  : this.textSpans[$]
                  ? ((p = this.textSpans[$]), (l = this.textPaths[$]))
                  : (styleDiv((p = createTag('span'))), styleDiv((l = createTag('span'))), p.appendChild(l)),
                this.globalData.fontManager.chars)
              ) {
                var g,
                  y = this.globalData.fontManager.getCharData(
                    t.finalText[s],
                    a.fStyle,
                    this.globalData.fontManager.getFontByName(t.f).fFamily,
                  );
                if (
                  ((g = y ? y.data : null),
                  d.reset(),
                  g &&
                    g.shapes &&
                    g.shapes.length &&
                    ((c = g.shapes[0].it),
                    d.scale(t.finalSize / 100, t.finalSize / 100),
                    (m = this.createPathShape(d, c)),
                    l.setAttribute('d', m)),
                  this.isMasked)
                )
                  this.innerElem.appendChild(l);
                else {
                  if ((this.innerElem.appendChild(p), g && g.shapes)) {
                    document.body.appendChild(f);
                    var v = f.getBBox();
                    f.setAttribute('width', v.width + 2),
                      f.setAttribute('height', v.height + 2),
                      f.setAttribute('viewBox', v.x - 1 + ' ' + (v.y - 1) + ' ' + (v.width + 2) + ' ' + (v.height + 2));
                    var _ = f.style,
                      b = 'translate(' + (v.x - 1) + 'px,' + (v.y - 1) + 'px)';
                    (_.transform = b), (_.webkitTransform = b), (u[s].yOffset = v.y - 1);
                  } else f.setAttribute('width', 1), f.setAttribute('height', 1);
                  p.appendChild(f);
                }
              } else if (
                ((l.textContent = u[s].val),
                l.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve'),
                this.isMasked)
              )
                this.innerElem.appendChild(l);
              else {
                this.innerElem.appendChild(p);
                var x = l.style,
                  P = 'translate3d(0,' + -t.finalSize / 1.2 + 'px,0)';
                (x.transform = P), (x.webkitTransform = P);
              }
              this.isMasked ? (this.textSpans[$] = l) : (this.textSpans[$] = p),
                (this.textSpans[$].style.display = 'block'),
                (this.textPaths[$] = l),
                ($ += 1);
            }
            for (; $ < this.textSpans.length; ) (this.textSpans[$].style.display = 'none'), ($ += 1);
          }),
          (HTextElement.prototype.renderInnerContent = function () {
            var t;
            if (this.data.singleShape) {
              if (!this._isFirstFrame && !this.lettersChangedFlag) return;
              if (this.isMasked && this.finalTransform._matMdf) {
                this.svgElement.setAttribute(
                  'viewBox',
                  -this.finalTransform.mProp.p.v[0] +
                    ' ' +
                    -this.finalTransform.mProp.p.v[1] +
                    ' ' +
                    this.compW +
                    ' ' +
                    this.compH,
                ),
                  (t = this.svgElement.style);
                var e =
                  'translate(' + -this.finalTransform.mProp.p.v[0] + 'px,' + -this.finalTransform.mProp.p.v[1] + 'px)';
                (t.transform = e), (t.webkitTransform = e);
              }
            }
            if (
              (this.textAnimator.getMeasures(this.textProperty.currentData, this.lettersChangedFlag),
              this.lettersChangedFlag || this.textAnimator.lettersChangedFlag)
            ) {
              var i,
                s,
                n,
                a,
                o,
                h = 0,
                l = this.textAnimator.renderedLetters,
                p = this.textProperty.currentData.l;
              for (s = p.length, i = 0; i < s; i += 1)
                p[i].n
                  ? (h += 1)
                  : ((a = this.textSpans[i]),
                    (o = this.textPaths[i]),
                    (n = l[h]),
                    (h += 1),
                    n._mdf.m &&
                      (this.isMasked
                        ? a.setAttribute('transform', n.m)
                        : ((a.style.webkitTransform = n.m), (a.style.transform = n.m))),
                    (a.style.opacity = n.o),
                    n.sw && n._mdf.sw && o.setAttribute('stroke-width', n.sw),
                    n.sc && n._mdf.sc && o.setAttribute('stroke', n.sc),
                    n.fc && n._mdf.fc && (o.setAttribute('fill', n.fc), (o.style.color = n.fc)));
              if (this.innerElem.getBBox && !this.hidden && (this._isFirstFrame || this._mdf)) {
                var f = this.innerElem.getBBox();
                if (
                  (this.currentBBox.w !== f.width &&
                    ((this.currentBBox.w = f.width), this.svgElement.setAttribute('width', f.width)),
                  this.currentBBox.h !== f.height &&
                    ((this.currentBBox.h = f.height), this.svgElement.setAttribute('height', f.height)),
                  this.currentBBox.w !== f.width + 2 ||
                    this.currentBBox.h !== f.height + 2 ||
                    this.currentBBox.x !== f.x - 1 ||
                    this.currentBBox.y !== f.y - 1)
                ) {
                  (this.currentBBox.w = f.width + 2),
                    (this.currentBBox.h = f.height + 2),
                    (this.currentBBox.x = f.x - 1),
                    (this.currentBBox.y = f.y - 1),
                    this.svgElement.setAttribute(
                      'viewBox',
                      this.currentBBox.x +
                        ' ' +
                        this.currentBBox.y +
                        ' ' +
                        this.currentBBox.w +
                        ' ' +
                        this.currentBBox.h,
                    ),
                    (t = this.svgElement.style);
                  var u = 'translate(' + this.currentBBox.x + 'px,' + this.currentBBox.y + 'px)';
                  (t.transform = u), (t.webkitTransform = u);
                }
              }
            }
          }),
          extendPrototype([BaseElement, FrameElement, HierarchyElement], HCameraElement),
          (HCameraElement.prototype.setup = function () {
            var t,
              e,
              i,
              s,
              n = this.comp.threeDElements.length;
            for (t = 0; t < n; t += 1)
              if ('3d' === (e = this.comp.threeDElements[t]).type) {
                (i = e.perspectiveElem.style), (s = e.container.style);
                var a = this.pe.v + 'px',
                  o = '0px 0px 0px',
                  h = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)';
                (i.perspective = a),
                  (i.webkitPerspective = a),
                  (s.transformOrigin = o),
                  (s.mozTransformOrigin = o),
                  (s.webkitTransformOrigin = o),
                  (i.transform = h),
                  (i.webkitTransform = h);
              }
          }),
          (HCameraElement.prototype.createElements = function () {}),
          (HCameraElement.prototype.hide = function () {}),
          (HCameraElement.prototype.renderFrame = function () {
            var t,
              e,
              i = this._isFirstFrame;
            if (this.hierarchy)
              for (e = this.hierarchy.length, t = 0; t < e; t += 1)
                i = this.hierarchy[t].finalTransform.mProp._mdf || i;
            if (
              i ||
              this.pe._mdf ||
              (this.p && this.p._mdf) ||
              (this.px && (this.px._mdf || this.py._mdf || this.pz._mdf)) ||
              this.rx._mdf ||
              this.ry._mdf ||
              this.rz._mdf ||
              this.or._mdf ||
              (this.a && this.a._mdf)
            ) {
              if ((this.mat.reset(), this.hierarchy))
                for (t = e = this.hierarchy.length - 1; t >= 0; t -= 1) {
                  var s,
                    n,
                    a,
                    o = this.hierarchy[t].finalTransform.mProp;
                  this.mat.translate(-o.p.v[0], -o.p.v[1], o.p.v[2]),
                    this.mat.rotateX(-o.or.v[0]).rotateY(-o.or.v[1]).rotateZ(o.or.v[2]),
                    this.mat.rotateX(-o.rx.v).rotateY(-o.ry.v).rotateZ(o.rz.v),
                    this.mat.scale(1 / o.s.v[0], 1 / o.s.v[1], 1 / o.s.v[2]),
                    this.mat.translate(o.a.v[0], o.a.v[1], o.a.v[2]);
                }
              if (
                (this.p
                  ? this.mat.translate(-this.p.v[0], -this.p.v[1], this.p.v[2])
                  : this.mat.translate(-this.px.v, -this.py.v, this.pz.v),
                this.a)
              ) {
                var h,
                  l = Math.sqrt(
                    Math.pow(
                      (h = this.p
                        ? [this.p.v[0] - this.a.v[0], this.p.v[1] - this.a.v[1], this.p.v[2] - this.a.v[2]]
                        : [this.px.v - this.a.v[0], this.py.v - this.a.v[1], this.pz.v - this.a.v[2]])[0],
                      2,
                    ) +
                      Math.pow(h[1], 2) +
                      Math.pow(h[2], 2),
                  ),
                  p = [h[0] / l, h[1] / l, h[2] / l],
                  f = Math.atan2(p[1], Math.sqrt(p[2] * p[2] + p[0] * p[0])),
                  u = Math.atan2(p[0], -p[2]);
                this.mat.rotateY(u).rotateX(-f);
              }
              this.mat.rotateX(-this.rx.v).rotateY(-this.ry.v).rotateZ(this.rz.v),
                this.mat.rotateX(-this.or.v[0]).rotateY(-this.or.v[1]).rotateZ(this.or.v[2]),
                this.mat.translate(this.globalData.compSize.w / 2, this.globalData.compSize.h / 2, 0),
                this.mat.translate(0, 0, this.pe.v);
              var c = !this._prevMat.equals(this.mat);
              if ((c || this.pe._mdf) && this.comp.threeDElements) {
                for (e = this.comp.threeDElements.length, t = 0; t < e; t += 1)
                  if ('3d' === (s = this.comp.threeDElements[t]).type) {
                    if (c) {
                      var d = this.mat.toCSS();
                      ((a = s.container.style).transform = d), (a.webkitTransform = d);
                    }
                    this.pe._mdf &&
                      (((n = s.perspectiveElem.style).perspective = this.pe.v + 'px'),
                      (n.webkitPerspective = this.pe.v + 'px'));
                  }
                this.mat.clone(this._prevMat);
              }
            }
            this._isFirstFrame = !1;
          }),
          (HCameraElement.prototype.prepareFrame = function (t) {
            this.prepareProperties(t, !0);
          }),
          (HCameraElement.prototype.destroy = function () {}),
          (HCameraElement.prototype.getBaseElement = function () {
            return null;
          }),
          extendPrototype(
            [
              BaseElement,
              TransformElement,
              HBaseElement,
              HSolidElement,
              HierarchyElement,
              FrameElement,
              RenderableElement,
            ],
            HImageElement,
          ),
          (HImageElement.prototype.createContent = function () {
            var t = this.globalData.getAssetsPath(this.assetData),
              e = new Image();
            this.data.hasMask
              ? ((this.imageElem = createNS('image')),
                this.imageElem.setAttribute('width', this.assetData.w + 'px'),
                this.imageElem.setAttribute('height', this.assetData.h + 'px'),
                this.imageElem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', t),
                this.layerElement.appendChild(this.imageElem),
                this.baseElement.setAttribute('width', this.assetData.w),
                this.baseElement.setAttribute('height', this.assetData.h))
              : this.layerElement.appendChild(e),
              (e.crossOrigin = 'anonymous'),
              (e.src = t),
              this.data.ln && this.baseElement.setAttribute('id', this.data.ln);
          }),
          extendPrototype([BaseRenderer], HybridRendererBase),
          (HybridRendererBase.prototype.buildItem = SVGRenderer.prototype.buildItem),
          (HybridRendererBase.prototype.checkPendingElements = function () {
            for (; this.pendingElements.length; ) this.pendingElements.pop().checkParenting();
          }),
          (HybridRendererBase.prototype.appendElementInPos = function (t, e) {
            var i = t.getBaseElement();
            if (i) {
              var s = this.layers[e];
              if (s.ddd && this.supports3d) this.addTo3dContainer(i, e);
              else if (this.threeDElements) this.addTo3dContainer(i, e);
              else {
                for (var n, a, o = 0; o < e; )
                  this.elements[o] &&
                    !0 !== this.elements[o] &&
                    this.elements[o].getBaseElement &&
                    ((a = this.elements[o]),
                    (n = (this.layers[o].ddd ? this.getThreeDContainerByPos(o) : a.getBaseElement()) || n)),
                    (o += 1);
                n
                  ? (s.ddd && this.supports3d) || this.layerElement.insertBefore(i, n)
                  : (s.ddd && this.supports3d) || this.layerElement.appendChild(i);
              }
            }
          }),
          (HybridRendererBase.prototype.createShape = function (t) {
            return this.supports3d
              ? new HShapeElement(t, this.globalData, this)
              : new SVGShapeElement(t, this.globalData, this);
          }),
          (HybridRendererBase.prototype.createText = function (t) {
            return this.supports3d
              ? new HTextElement(t, this.globalData, this)
              : new SVGTextLottieElement(t, this.globalData, this);
          }),
          (HybridRendererBase.prototype.createCamera = function (t) {
            return (this.camera = new HCameraElement(t, this.globalData, this)), this.camera;
          }),
          (HybridRendererBase.prototype.createImage = function (t) {
            return this.supports3d
              ? new HImageElement(t, this.globalData, this)
              : new IImageElement(t, this.globalData, this);
          }),
          (HybridRendererBase.prototype.createSolid = function (t) {
            return this.supports3d
              ? new HSolidElement(t, this.globalData, this)
              : new ISolidElement(t, this.globalData, this);
          }),
          (HybridRendererBase.prototype.createNull = SVGRenderer.prototype.createNull),
          (HybridRendererBase.prototype.getThreeDContainerByPos = function (t) {
            for (var e = 0, i = this.threeDElements.length; e < i; ) {
              if (this.threeDElements[e].startPos <= t && this.threeDElements[e].endPos >= t)
                return this.threeDElements[e].perspectiveElem;
              e += 1;
            }
            return null;
          }),
          (HybridRendererBase.prototype.createThreeDContainer = function (t, e) {
            var i,
              s,
              n = createTag('div');
            styleDiv(n);
            var a = createTag('div');
            if ((styleDiv(a), '3d' === e)) {
              ((i = n.style).width = this.globalData.compSize.w + 'px'), (i.height = this.globalData.compSize.h + 'px');
              var o = '50% 50%';
              (i.webkitTransformOrigin = o), (i.mozTransformOrigin = o), (i.transformOrigin = o);
              var h = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)';
              ((s = a.style).transform = h), (s.webkitTransform = h);
            }
            n.appendChild(a);
            var l = { container: a, perspectiveElem: n, startPos: t, endPos: t, type: e };
            return this.threeDElements.push(l), l;
          }),
          (HybridRendererBase.prototype.build3dContainers = function () {
            var t,
              e,
              i = this.layers.length,
              s = '';
            for (t = 0; t < i; t += 1)
              this.layers[t].ddd && 3 !== this.layers[t].ty
                ? ('3d' !== s && ((s = '3d'), (e = this.createThreeDContainer(t, '3d'))),
                  (e.endPos = Math.max(e.endPos, t)))
                : ('2d' !== s && ((s = '2d'), (e = this.createThreeDContainer(t, '2d'))),
                  (e.endPos = Math.max(e.endPos, t)));
            for (t = (i = this.threeDElements.length) - 1; t >= 0; t -= 1)
              this.resizerElem.appendChild(this.threeDElements[t].perspectiveElem);
          }),
          (HybridRendererBase.prototype.addTo3dContainer = function (t, e) {
            for (var i = 0, s = this.threeDElements.length; i < s; ) {
              if (e <= this.threeDElements[i].endPos) {
                for (var n, a = this.threeDElements[i].startPos; a < e; )
                  this.elements[a] && this.elements[a].getBaseElement && (n = this.elements[a].getBaseElement()),
                    (a += 1);
                n
                  ? this.threeDElements[i].container.insertBefore(t, n)
                  : this.threeDElements[i].container.appendChild(t);
                break;
              }
              i += 1;
            }
          }),
          (HybridRendererBase.prototype.configAnimation = function (t) {
            var e = createTag('div'),
              i = this.animationItem.wrapper,
              s = e.style;
            (s.width = t.w + 'px'),
              (s.height = t.h + 'px'),
              (this.resizerElem = e),
              styleDiv(e),
              (s.transformStyle = 'flat'),
              (s.mozTransformStyle = 'flat'),
              (s.webkitTransformStyle = 'flat'),
              this.renderConfig.className && e.setAttribute('class', this.renderConfig.className),
              i.appendChild(e),
              (s.overflow = 'hidden');
            var n = createNS('svg');
            n.setAttribute('width', '1'), n.setAttribute('height', '1'), styleDiv(n), this.resizerElem.appendChild(n);
            var a = createNS('defs');
            n.appendChild(a),
              (this.data = t),
              this.setupGlobalData(t, n),
              (this.globalData.defs = a),
              (this.layers = t.layers),
              (this.layerElement = this.resizerElem),
              this.build3dContainers(),
              this.updateContainerSize();
          }),
          (HybridRendererBase.prototype.destroy = function () {
            this.animationItem.wrapper && (this.animationItem.wrapper.innerText = ''),
              (this.animationItem.container = null),
              (this.globalData.defs = null);
            var t,
              e = this.layers ? this.layers.length : 0;
            for (t = 0; t < e; t += 1) this.elements[t].destroy();
            (this.elements.length = 0), (this.destroyed = !0), (this.animationItem = null);
          }),
          (HybridRendererBase.prototype.updateContainerSize = function () {
            var t,
              e,
              i,
              s,
              n = this.animationItem.wrapper.offsetWidth,
              a = this.animationItem.wrapper.offsetHeight,
              o = n / a;
            this.globalData.compSize.w / this.globalData.compSize.h > o
              ? ((t = n / this.globalData.compSize.w),
                (e = n / this.globalData.compSize.w),
                (i = 0),
                (s = (a - this.globalData.compSize.h * (n / this.globalData.compSize.w)) / 2))
              : ((t = a / this.globalData.compSize.h),
                (e = a / this.globalData.compSize.h),
                (i = (n - this.globalData.compSize.w * (a / this.globalData.compSize.h)) / 2),
                (s = 0));
            var h = this.resizerElem.style;
            (h.webkitTransform = 'matrix3d(' + t + ',0,0,0,0,' + e + ',0,0,0,0,1,0,' + i + ',' + s + ',0,1)'),
              (h.transform = h.webkitTransform);
          }),
          (HybridRendererBase.prototype.renderFrame = SVGRenderer.prototype.renderFrame),
          (HybridRendererBase.prototype.hide = function () {
            this.resizerElem.style.display = 'none';
          }),
          (HybridRendererBase.prototype.show = function () {
            this.resizerElem.style.display = 'block';
          }),
          (HybridRendererBase.prototype.initItems = function () {
            if ((this.buildAllItems(), this.camera)) this.camera.setup();
            else {
              var t,
                e = this.globalData.compSize.w,
                i = this.globalData.compSize.h,
                s = this.threeDElements.length;
              for (t = 0; t < s; t += 1) {
                var n = this.threeDElements[t].perspectiveElem.style;
                (n.webkitPerspective = Math.sqrt(Math.pow(e, 2) + Math.pow(i, 2)) + 'px'),
                  (n.perspective = n.webkitPerspective);
              }
            }
          }),
          (HybridRendererBase.prototype.searchExtraCompositions = function (t) {
            var e,
              i = t.length,
              s = createTag('div');
            for (e = 0; e < i; e += 1)
              if (t[e].xt) {
                var n = this.createComp(t[e], s, this.globalData.comp, null);
                n.initExpressions(), this.globalData.projectInterface.registerComposition(n);
              }
          }),
          extendPrototype([HybridRendererBase, ICompElement, HBaseElement], HCompElement),
          (HCompElement.prototype._createBaseContainerElements = HCompElement.prototype.createContainerElements),
          (HCompElement.prototype.createContainerElements = function () {
            this._createBaseContainerElements(),
              this.data.hasMask
                ? (this.svgElement.setAttribute('width', this.data.w),
                  this.svgElement.setAttribute('height', this.data.h),
                  (this.transformedElement = this.baseElement))
                : (this.transformedElement = this.layerElement);
          }),
          (HCompElement.prototype.addTo3dContainer = function (t, e) {
            for (var i, s = 0; s < e; )
              this.elements[s] && this.elements[s].getBaseElement && (i = this.elements[s].getBaseElement()), (s += 1);
            i ? this.layerElement.insertBefore(t, i) : this.layerElement.appendChild(t);
          }),
          (HCompElement.prototype.createComp = function (t) {
            return this.supports3d
              ? new HCompElement(t, this.globalData, this)
              : new SVGCompElement(t, this.globalData, this);
          }),
          extendPrototype([HybridRendererBase], HybridRenderer),
          (HybridRenderer.prototype.createComp = function (t) {
            return this.supports3d
              ? new HCompElement(t, this.globalData, this)
              : new SVGCompElement(t, this.globalData, this);
          });
        var CompExpressionInterface = function (t) {
            function e(e) {
              for (var i = 0, s = t.layers.length; i < s; ) {
                if (t.layers[i].nm === e || t.layers[i].ind === e) return t.elements[i].layerInterface;
                i += 1;
              }
              return null;
            }
            return (
              Object.defineProperty(e, '_name', { value: t.data.nm }),
              (e.layer = e),
              (e.pixelAspect = 1),
              (e.height = t.data.h || t.globalData.compSize.h),
              (e.width = t.data.w || t.globalData.compSize.w),
              (e.pixelAspect = 1),
              (e.frameDuration = 1 / t.globalData.frameRate),
              (e.displayStartTime = 0),
              (e.numLayers = t.layers.length),
              e
            );
          },
          Expressions = {
            initExpressions: function (t) {
              var e = 0,
                i = [];
              (t.renderer.compInterface = CompExpressionInterface(t.renderer)),
                t.renderer.globalData.projectInterface.registerComposition(t.renderer),
                (t.renderer.globalData.pushExpression = function () {
                  e += 1;
                }),
                (t.renderer.globalData.popExpression = function () {
                  0 == (e -= 1) &&
                    (function () {
                      var t,
                        e = i.length;
                      for (t = 0; t < e; t += 1) i[t].release();
                      i.length = 0;
                    })();
                }),
                (t.renderer.globalData.registerExpressionProperty = function (t) {
                  -1 === i.indexOf(t) && i.push(t);
                });
            },
          },
          MaskManagerInterface = (function () {
            function t(t, e) {
              (this._mask = t), (this._data = e);
            }
            return (
              Object.defineProperty(t.prototype, 'maskPath', {
                get: function () {
                  return this._mask.prop.k && this._mask.prop.getValue(), this._mask.prop;
                },
              }),
              Object.defineProperty(t.prototype, 'maskOpacity', {
                get: function () {
                  return this._mask.op.k && this._mask.op.getValue(), 100 * this._mask.op.v;
                },
              }),
              function (e) {
                var i,
                  s = createSizedArray(e.viewData.length),
                  n = e.viewData.length;
                for (i = 0; i < n; i += 1) s[i] = new t(e.viewData[i], e.masksProperties[i]);
                return function (t) {
                  for (i = 0; i < n; ) {
                    if (e.masksProperties[i].nm === t) return s[i];
                    i += 1;
                  }
                  return null;
                };
              }
            );
          })(),
          ExpressionPropertyInterface = (function () {
            var t = { pv: 0, v: 0, mult: 1 },
              e = { pv: [0, 0, 0], v: [0, 0, 0], mult: 1 };
            function i(t, e, i) {
              Object.defineProperty(t, 'velocity', {
                get: function () {
                  return e.getVelocityAtTime(e.comp.currentFrame);
                },
              }),
                (t.numKeys = e.keyframes ? e.keyframes.length : 0),
                (t.key = function (s) {
                  if (!t.numKeys) return 0;
                  var n = '';
                  n =
                    's' in e.keyframes[s - 1]
                      ? e.keyframes[s - 1].s
                      : 'e' in e.keyframes[s - 2]
                      ? e.keyframes[s - 2].e
                      : e.keyframes[s - 2].s;
                  var a = 'unidimensional' === i ? new Number(n) : Object.assign({}, n);
                  return (
                    (a.time = e.keyframes[s - 1].t / e.elem.comp.globalData.frameRate),
                    (a.value = 'unidimensional' === i ? n[0] : n),
                    a
                  );
                }),
                (t.valueAtTime = e.getValueAtTime),
                (t.speedAtTime = e.getSpeedAtTime),
                (t.velocityAtTime = e.getVelocityAtTime),
                (t.propertyGroup = e.propertyGroup);
            }
            function s() {
              return t;
            }
            return function (n) {
              var a, o, h, l, p, f, u, c, d;
              return n
                ? 'unidimensional' === n.propType
                  ? (((a = n) && 'pv' in a) || (a = t),
                    (o = 1 / a.mult),
                    (h = a.pv * o),
                    ((l = new Number(h)).value = h),
                    i(l, a, 'unidimensional'),
                    function () {
                      return (
                        a.k && a.getValue(),
                        (h = a.v * o),
                        l.value !== h && (((l = new Number(h)).value = h), i(l, a, 'unidimensional')),
                        l
                      );
                    })
                  : (((p = n) && 'pv' in p) || (p = e),
                    (f = 1 / p.mult),
                    (c = createTypedArray('float32', (u = (p.data && p.data.l) || p.pv.length))),
                    (d = createTypedArray('float32', u)),
                    (c.value = d),
                    i(c, p, 'multidimensional'),
                    function () {
                      p.k && p.getValue();
                      for (var t = 0; t < u; t += 1) (d[t] = p.v[t] * f), (c[t] = d[t]);
                      return c;
                    })
                : s;
            };
          })(),
          TransformExpressionInterface = function (t) {
            var e, i, s, n;
            function a(t) {
              switch (t) {
                case 'scale':
                case 'Scale':
                case 'ADBE Scale':
                case 6:
                  return a.scale;
                case 'rotation':
                case 'Rotation':
                case 'ADBE Rotation':
                case 'ADBE Rotate Z':
                case 10:
                  return a.rotation;
                case 'ADBE Rotate X':
                  return a.xRotation;
                case 'ADBE Rotate Y':
                  return a.yRotation;
                case 'position':
                case 'Position':
                case 'ADBE Position':
                case 2:
                  return a.position;
                case 'ADBE Position_0':
                  return a.xPosition;
                case 'ADBE Position_1':
                  return a.yPosition;
                case 'ADBE Position_2':
                  return a.zPosition;
                case 'anchorPoint':
                case 'AnchorPoint':
                case 'Anchor Point':
                case 'ADBE AnchorPoint':
                case 1:
                  return a.anchorPoint;
                case 'opacity':
                case 'Opacity':
                case 11:
                  return a.opacity;
                default:
                  return null;
              }
            }
            return (
              Object.defineProperty(a, 'rotation', { get: ExpressionPropertyInterface(t.r || t.rz) }),
              Object.defineProperty(a, 'zRotation', { get: ExpressionPropertyInterface(t.rz || t.r) }),
              Object.defineProperty(a, 'xRotation', { get: ExpressionPropertyInterface(t.rx) }),
              Object.defineProperty(a, 'yRotation', { get: ExpressionPropertyInterface(t.ry) }),
              Object.defineProperty(a, 'scale', { get: ExpressionPropertyInterface(t.s) }),
              t.p
                ? (n = ExpressionPropertyInterface(t.p))
                : ((e = ExpressionPropertyInterface(t.px)),
                  (i = ExpressionPropertyInterface(t.py)),
                  t.pz && (s = ExpressionPropertyInterface(t.pz))),
              Object.defineProperty(a, 'position', {
                get: function () {
                  return t.p ? n() : [e(), i(), s ? s() : 0];
                },
              }),
              Object.defineProperty(a, 'xPosition', { get: ExpressionPropertyInterface(t.px) }),
              Object.defineProperty(a, 'yPosition', { get: ExpressionPropertyInterface(t.py) }),
              Object.defineProperty(a, 'zPosition', { get: ExpressionPropertyInterface(t.pz) }),
              Object.defineProperty(a, 'anchorPoint', { get: ExpressionPropertyInterface(t.a) }),
              Object.defineProperty(a, 'opacity', { get: ExpressionPropertyInterface(t.o) }),
              Object.defineProperty(a, 'skew', { get: ExpressionPropertyInterface(t.sk) }),
              Object.defineProperty(a, 'skewAxis', { get: ExpressionPropertyInterface(t.sa) }),
              Object.defineProperty(a, 'orientation', { get: ExpressionPropertyInterface(t.or) }),
              a
            );
          },
          LayerExpressionInterface = (function () {
            function t(t) {
              var e = new Matrix();
              return (
                void 0 !== t
                  ? this._elem.finalTransform.mProp.getValueAtTime(t).clone(e)
                  : this._elem.finalTransform.mProp.applyToMatrix(e),
                e
              );
            }
            function e(t, e) {
              var i = this.getMatrix(e);
              return (i.props[12] = 0), (i.props[13] = 0), (i.props[14] = 0), this.applyPoint(i, t);
            }
            function i(t, e) {
              var i = this.getMatrix(e);
              return this.applyPoint(i, t);
            }
            function s(t, e) {
              var i = this.getMatrix(e);
              return (i.props[12] = 0), (i.props[13] = 0), (i.props[14] = 0), this.invertPoint(i, t);
            }
            function n(t, e) {
              var i = this.getMatrix(e);
              return this.invertPoint(i, t);
            }
            function a(t, e) {
              if (this._elem.hierarchy && this._elem.hierarchy.length) {
                var i,
                  s = this._elem.hierarchy.length;
                for (i = 0; i < s; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(t);
              }
              return t.applyToPointArray(e[0], e[1], e[2] || 0);
            }
            function o(t, e) {
              if (this._elem.hierarchy && this._elem.hierarchy.length) {
                var i,
                  s = this._elem.hierarchy.length;
                for (i = 0; i < s; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(t);
              }
              return t.inversePoint(e);
            }
            function h(t) {
              var e = new Matrix();
              if (
                (e.reset(),
                this._elem.finalTransform.mProp.applyToMatrix(e),
                this._elem.hierarchy && this._elem.hierarchy.length)
              ) {
                var i,
                  s = this._elem.hierarchy.length;
                for (i = 0; i < s; i += 1) this._elem.hierarchy[i].finalTransform.mProp.applyToMatrix(e);
              }
              return e.inversePoint(t);
            }
            function l() {
              return [1, 1, 1, 1];
            }
            return function (p) {
              function f(t) {
                switch (t) {
                  case 'ADBE Root Vectors Group':
                  case 'Contents':
                  case 2:
                    return f.shapeInterface;
                  case 1:
                  case 6:
                  case 'Transform':
                  case 'transform':
                  case 'ADBE Transform Group':
                    return u;
                  case 4:
                  case 'ADBE Effect Parade':
                  case 'effects':
                  case 'Effects':
                    return f.effect;
                  case 'ADBE Text Properties':
                    return f.textInterface;
                  default:
                    return null;
                }
              }
              (f.getMatrix = t),
                (f.invertPoint = o),
                (f.applyPoint = a),
                (f.toWorld = i),
                (f.toWorldVec = e),
                (f.fromWorld = n),
                (f.fromWorldVec = s),
                (f.toComp = i),
                (f.fromComp = h),
                (f.sampleImage = l),
                (f.sourceRectAtTime = p.sourceRectAtTime.bind(p)),
                (f._elem = p);
              var u,
                c = getDescriptor((u = TransformExpressionInterface(p.finalTransform.mProp)), 'anchorPoint');
              return (
                Object.defineProperties(f, {
                  hasParent: {
                    get: function () {
                      return p.hierarchy.length;
                    },
                  },
                  parent: {
                    get: function () {
                      return p.hierarchy[0].layerInterface;
                    },
                  },
                  rotation: getDescriptor(u, 'rotation'),
                  scale: getDescriptor(u, 'scale'),
                  position: getDescriptor(u, 'position'),
                  opacity: getDescriptor(u, 'opacity'),
                  anchorPoint: c,
                  anchor_point: c,
                  transform: {
                    get: function () {
                      return u;
                    },
                  },
                  active: {
                    get: function () {
                      return p.isInRange;
                    },
                  },
                }),
                (f.startTime = p.data.st),
                (f.index = p.data.ind),
                (f.source = p.data.refId),
                (f.height = 0 === p.data.ty ? p.data.h : 100),
                (f.width = 0 === p.data.ty ? p.data.w : 100),
                (f.inPoint = p.data.ip / p.comp.globalData.frameRate),
                (f.outPoint = p.data.op / p.comp.globalData.frameRate),
                (f._name = p.data.nm),
                (f.registerMaskInterface = function (t) {
                  f.mask = new MaskManagerInterface(t, p);
                }),
                (f.registerEffectsInterface = function (t) {
                  f.effect = t;
                }),
                f
              );
            };
          })(),
          propertyGroupFactory = function (t, e) {
            return function (i) {
              return (i = void 0 === i ? 1 : i) <= 0 ? t : e(i - 1);
            };
          },
          PropertyInterface = function (t, e) {
            var i = { _name: t };
            return function (t) {
              return (t = void 0 === t ? 1 : t) <= 0 ? i : e(t - 1);
            };
          },
          EffectsExpressionInterface = (function () {
            var t = {
              createEffectsInterface: function (t, i) {
                if (t.effectsManager) {
                  var s,
                    n = [],
                    a = t.data.ef,
                    o = t.effectsManager.effectElements.length;
                  for (s = 0; s < o; s += 1) n.push(e(a[s], t.effectsManager.effectElements[s], i, t));
                  var h = t.data.ef || [],
                    l = function (t) {
                      for (s = 0, o = h.length; s < o; ) {
                        if (t === h[s].nm || t === h[s].mn || t === h[s].ix) return n[s];
                        s += 1;
                      }
                      return null;
                    };
                  return (
                    Object.defineProperty(l, 'numProperties', {
                      get: function () {
                        return h.length;
                      },
                    }),
                    l
                  );
                }
                return null;
              },
            };
            function e(t, s, n, a) {
              function o(e) {
                for (var i = t.ef, s = 0, n = i.length; s < n; ) {
                  if (e === i[s].nm || e === i[s].mn || e === i[s].ix) return 5 === i[s].ty ? p[s] : p[s]();
                  s += 1;
                }
                throw Error();
              }
              var h,
                l = propertyGroupFactory(o, n),
                p = [],
                f = t.ef.length;
              for (h = 0; h < f; h += 1)
                5 === t.ef[h].ty
                  ? p.push(e(t.ef[h], s.effectElements[h], s.effectElements[h].propertyGroup, a))
                  : p.push(i(s.effectElements[h], t.ef[h].ty, a, l));
              return (
                'ADBE Color Control' === t.mn &&
                  Object.defineProperty(o, 'color', {
                    get: function () {
                      return p[0]();
                    },
                  }),
                Object.defineProperties(o, {
                  numProperties: {
                    get: function () {
                      return t.np;
                    },
                  },
                  _name: { value: t.nm },
                  propertyGroup: { value: l },
                }),
                (o.enabled = 0 !== t.en),
                (o.active = o.enabled),
                o
              );
            }
            function i(t, e, i, s) {
              var n = ExpressionPropertyInterface(t.p);
              return (
                t.p.setGroupProperty && t.p.setGroupProperty(PropertyInterface('', s)),
                function () {
                  return 10 === e ? i.comp.compInterface(t.p.v) : n();
                }
              );
            }
            return t;
          })(),
          ShapePathInterface = function (t, e, i) {
            var s = e.sh;
            function n(t) {
              return 'Shape' === t ||
                'shape' === t ||
                'Path' === t ||
                'path' === t ||
                'ADBE Vector Shape' === t ||
                2 === t
                ? n.path
                : null;
            }
            var a = propertyGroupFactory(n, i);
            return (
              s.setGroupProperty(PropertyInterface('Path', a)),
              Object.defineProperties(n, {
                path: {
                  get: function () {
                    return s.k && s.getValue(), s;
                  },
                },
                shape: {
                  get: function () {
                    return s.k && s.getValue(), s;
                  },
                },
                _name: { value: t.nm },
                ix: { value: t.ix },
                propertyIndex: { value: t.ix },
                mn: { value: t.mn },
                propertyGroup: { value: i },
              }),
              n
            );
          },
          ShapeExpressionInterface = (function () {
            function t(t, o, c) {
              var d,
                m = [],
                $ = t ? t.length : 0;
              for (d = 0; d < $; d += 1)
                'gr' === t[d].ty
                  ? m.push(e(t[d], o[d], c))
                  : 'fl' === t[d].ty
                  ? m.push(i(t[d], o[d], c))
                  : 'st' === t[d].ty
                  ? m.push(n(t[d], o[d], c))
                  : 'tm' === t[d].ty
                  ? m.push(a(t[d], o[d], c))
                  : 'tr' === t[d].ty ||
                    ('el' === t[d].ty
                      ? m.push(h(t[d], o[d], c))
                      : 'sr' === t[d].ty
                      ? m.push(l(t[d], o[d], c))
                      : 'sh' === t[d].ty
                      ? m.push(ShapePathInterface(t[d], o[d], c))
                      : 'rc' === t[d].ty
                      ? m.push(p(t[d], o[d], c))
                      : 'rd' === t[d].ty
                      ? m.push(f(t[d], o[d], c))
                      : 'rp' === t[d].ty
                      ? m.push(u(t[d], o[d], c))
                      : 'gf' === t[d].ty
                      ? m.push(s(t[d], o[d], c))
                      : m.push(
                          (t[d],
                          o[d],
                          function () {
                            return null;
                          }),
                        ));
              return m;
            }
            function e(e, i, s) {
              var n,
                a,
                h,
                l,
                p,
                f,
                u = function (t) {
                  switch (t) {
                    case 'ADBE Vectors Group':
                    case 'Contents':
                    case 2:
                      return u.content;
                    default:
                      return u.transform;
                  }
                };
              u.propertyGroup = propertyGroupFactory(u, s);
              var c =
                  ((n = e),
                  (a = i),
                  (h = u.propertyGroup),
                  ((p = function (t) {
                    for (var e = 0, i = l.length; e < i; ) {
                      if (
                        l[e]._name === t ||
                        l[e].mn === t ||
                        l[e].propertyIndex === t ||
                        l[e].ix === t ||
                        l[e].ind === t
                      )
                        return l[e];
                      e += 1;
                    }
                    return 'number' == typeof t ? l[t - 1] : null;
                  }).propertyGroup = propertyGroupFactory(p, h)),
                  (l = t(n.it, a.it, p.propertyGroup)),
                  (p.numProperties = l.length),
                  (f = o(n.it[n.it.length - 1], a.it[a.it.length - 1], p.propertyGroup)),
                  (p.transform = f),
                  (p.propertyIndex = n.cix),
                  (p._name = n.nm),
                  p),
                d = o(e.it[e.it.length - 1], i.it[i.it.length - 1], u.propertyGroup);
              return (
                (u.content = c),
                (u.transform = d),
                Object.defineProperty(u, '_name', {
                  get: function () {
                    return e.nm;
                  },
                }),
                (u.numProperties = e.np),
                (u.propertyIndex = e.ix),
                (u.nm = e.nm),
                (u.mn = e.mn),
                u
              );
            }
            function i(t, e, i) {
              function s(t) {
                return 'Color' === t || 'color' === t ? s.color : 'Opacity' === t || 'opacity' === t ? s.opacity : null;
              }
              return (
                Object.defineProperties(s, {
                  color: { get: ExpressionPropertyInterface(e.c) },
                  opacity: { get: ExpressionPropertyInterface(e.o) },
                  _name: { value: t.nm },
                  mn: { value: t.mn },
                }),
                e.c.setGroupProperty(PropertyInterface('Color', i)),
                e.o.setGroupProperty(PropertyInterface('Opacity', i)),
                s
              );
            }
            function s(t, e, i) {
              function s(t) {
                return 'Start Point' === t || 'start point' === t
                  ? s.startPoint
                  : 'End Point' === t || 'end point' === t
                  ? s.endPoint
                  : 'Opacity' === t || 'opacity' === t
                  ? s.opacity
                  : null;
              }
              return (
                Object.defineProperties(s, {
                  startPoint: { get: ExpressionPropertyInterface(e.s) },
                  endPoint: { get: ExpressionPropertyInterface(e.e) },
                  opacity: { get: ExpressionPropertyInterface(e.o) },
                  type: {
                    get: function () {
                      return 'a';
                    },
                  },
                  _name: { value: t.nm },
                  mn: { value: t.mn },
                }),
                e.s.setGroupProperty(PropertyInterface('Start Point', i)),
                e.e.setGroupProperty(PropertyInterface('End Point', i)),
                e.o.setGroupProperty(PropertyInterface('Opacity', i)),
                s
              );
            }
            function n(t, e, i) {
              var s,
                n = propertyGroupFactory(p, i),
                a = propertyGroupFactory(l, n);
              function o(i) {
                Object.defineProperty(l, t.d[i].nm, { get: ExpressionPropertyInterface(e.d.dataProps[i].p) });
              }
              var h = t.d ? t.d.length : 0,
                l = {};
              for (s = 0; s < h; s += 1) o(s), e.d.dataProps[s].p.setGroupProperty(a);
              function p(t) {
                return 'Color' === t || 'color' === t
                  ? p.color
                  : 'Opacity' === t || 'opacity' === t
                  ? p.opacity
                  : 'Stroke Width' === t || 'stroke width' === t
                  ? p.strokeWidth
                  : null;
              }
              return (
                Object.defineProperties(p, {
                  color: { get: ExpressionPropertyInterface(e.c) },
                  opacity: { get: ExpressionPropertyInterface(e.o) },
                  strokeWidth: { get: ExpressionPropertyInterface(e.w) },
                  dash: {
                    get: function () {
                      return l;
                    },
                  },
                  _name: { value: t.nm },
                  mn: { value: t.mn },
                }),
                e.c.setGroupProperty(PropertyInterface('Color', n)),
                e.o.setGroupProperty(PropertyInterface('Opacity', n)),
                e.w.setGroupProperty(PropertyInterface('Stroke Width', n)),
                p
              );
            }
            function a(t, e, i) {
              function s(e) {
                return e === t.e.ix || 'End' === e || 'end' === e
                  ? s.end
                  : e === t.s.ix
                  ? s.start
                  : e === t.o.ix
                  ? s.offset
                  : null;
              }
              var n = propertyGroupFactory(s, i);
              return (
                (s.propertyIndex = t.ix),
                e.s.setGroupProperty(PropertyInterface('Start', n)),
                e.e.setGroupProperty(PropertyInterface('End', n)),
                e.o.setGroupProperty(PropertyInterface('Offset', n)),
                (s.propertyIndex = t.ix),
                (s.propertyGroup = i),
                Object.defineProperties(s, {
                  start: { get: ExpressionPropertyInterface(e.s) },
                  end: { get: ExpressionPropertyInterface(e.e) },
                  offset: { get: ExpressionPropertyInterface(e.o) },
                  _name: { value: t.nm },
                }),
                (s.mn = t.mn),
                s
              );
            }
            function o(t, e, i) {
              function s(e) {
                return t.a.ix === e || 'Anchor Point' === e
                  ? s.anchorPoint
                  : t.o.ix === e || 'Opacity' === e
                  ? s.opacity
                  : t.p.ix === e || 'Position' === e
                  ? s.position
                  : t.r.ix === e || 'Rotation' === e || 'ADBE Vector Rotation' === e
                  ? s.rotation
                  : t.s.ix === e || 'Scale' === e
                  ? s.scale
                  : (t.sk && t.sk.ix === e) || 'Skew' === e
                  ? s.skew
                  : (t.sa && t.sa.ix === e) || 'Skew Axis' === e
                  ? s.skewAxis
                  : null;
              }
              var n = propertyGroupFactory(s, i);
              return (
                e.transform.mProps.o.setGroupProperty(PropertyInterface('Opacity', n)),
                e.transform.mProps.p.setGroupProperty(PropertyInterface('Position', n)),
                e.transform.mProps.a.setGroupProperty(PropertyInterface('Anchor Point', n)),
                e.transform.mProps.s.setGroupProperty(PropertyInterface('Scale', n)),
                e.transform.mProps.r.setGroupProperty(PropertyInterface('Rotation', n)),
                e.transform.mProps.sk &&
                  (e.transform.mProps.sk.setGroupProperty(PropertyInterface('Skew', n)),
                  e.transform.mProps.sa.setGroupProperty(PropertyInterface('Skew Angle', n))),
                e.transform.op.setGroupProperty(PropertyInterface('Opacity', n)),
                Object.defineProperties(s, {
                  opacity: { get: ExpressionPropertyInterface(e.transform.mProps.o) },
                  position: { get: ExpressionPropertyInterface(e.transform.mProps.p) },
                  anchorPoint: { get: ExpressionPropertyInterface(e.transform.mProps.a) },
                  scale: { get: ExpressionPropertyInterface(e.transform.mProps.s) },
                  rotation: { get: ExpressionPropertyInterface(e.transform.mProps.r) },
                  skew: { get: ExpressionPropertyInterface(e.transform.mProps.sk) },
                  skewAxis: { get: ExpressionPropertyInterface(e.transform.mProps.sa) },
                  _name: { value: t.nm },
                }),
                (s.ty = 'tr'),
                (s.mn = t.mn),
                (s.propertyGroup = i),
                s
              );
            }
            function h(t, e, i) {
              function s(e) {
                return t.p.ix === e ? s.position : t.s.ix === e ? s.size : null;
              }
              var n = propertyGroupFactory(s, i);
              s.propertyIndex = t.ix;
              var a = 'tm' === e.sh.ty ? e.sh.prop : e.sh;
              return (
                a.s.setGroupProperty(PropertyInterface('Size', n)),
                a.p.setGroupProperty(PropertyInterface('Position', n)),
                Object.defineProperties(s, {
                  size: { get: ExpressionPropertyInterface(a.s) },
                  position: { get: ExpressionPropertyInterface(a.p) },
                  _name: { value: t.nm },
                }),
                (s.mn = t.mn),
                s
              );
            }
            function l(t, e, i) {
              function s(e) {
                return t.p.ix === e
                  ? s.position
                  : t.r.ix === e
                  ? s.rotation
                  : t.pt.ix === e
                  ? s.points
                  : t.or.ix === e || 'ADBE Vector Star Outer Radius' === e
                  ? s.outerRadius
                  : t.os.ix === e
                  ? s.outerRoundness
                  : t.ir && (t.ir.ix === e || 'ADBE Vector Star Inner Radius' === e)
                  ? s.innerRadius
                  : t.is && t.is.ix === e
                  ? s.innerRoundness
                  : null;
              }
              var n = propertyGroupFactory(s, i),
                a = 'tm' === e.sh.ty ? e.sh.prop : e.sh;
              return (
                (s.propertyIndex = t.ix),
                a.or.setGroupProperty(PropertyInterface('Outer Radius', n)),
                a.os.setGroupProperty(PropertyInterface('Outer Roundness', n)),
                a.pt.setGroupProperty(PropertyInterface('Points', n)),
                a.p.setGroupProperty(PropertyInterface('Position', n)),
                a.r.setGroupProperty(PropertyInterface('Rotation', n)),
                t.ir &&
                  (a.ir.setGroupProperty(PropertyInterface('Inner Radius', n)),
                  a.is.setGroupProperty(PropertyInterface('Inner Roundness', n))),
                Object.defineProperties(s, {
                  position: { get: ExpressionPropertyInterface(a.p) },
                  rotation: { get: ExpressionPropertyInterface(a.r) },
                  points: { get: ExpressionPropertyInterface(a.pt) },
                  outerRadius: { get: ExpressionPropertyInterface(a.or) },
                  outerRoundness: { get: ExpressionPropertyInterface(a.os) },
                  innerRadius: { get: ExpressionPropertyInterface(a.ir) },
                  innerRoundness: { get: ExpressionPropertyInterface(a.is) },
                  _name: { value: t.nm },
                }),
                (s.mn = t.mn),
                s
              );
            }
            function p(t, e, i) {
              function s(e) {
                return t.p.ix === e
                  ? s.position
                  : t.r.ix === e
                  ? s.roundness
                  : t.s.ix === e || 'Size' === e || 'ADBE Vector Rect Size' === e
                  ? s.size
                  : null;
              }
              var n = propertyGroupFactory(s, i),
                a = 'tm' === e.sh.ty ? e.sh.prop : e.sh;
              return (
                (s.propertyIndex = t.ix),
                a.p.setGroupProperty(PropertyInterface('Position', n)),
                a.s.setGroupProperty(PropertyInterface('Size', n)),
                a.r.setGroupProperty(PropertyInterface('Rotation', n)),
                Object.defineProperties(s, {
                  position: { get: ExpressionPropertyInterface(a.p) },
                  roundness: { get: ExpressionPropertyInterface(a.r) },
                  size: { get: ExpressionPropertyInterface(a.s) },
                  _name: { value: t.nm },
                }),
                (s.mn = t.mn),
                s
              );
            }
            function f(t, e, i) {
              function s(e) {
                return t.r.ix === e || 'Round Corners 1' === e ? s.radius : null;
              }
              var n = propertyGroupFactory(s, i),
                a = e;
              return (
                (s.propertyIndex = t.ix),
                a.rd.setGroupProperty(PropertyInterface('Radius', n)),
                Object.defineProperties(s, {
                  radius: { get: ExpressionPropertyInterface(a.rd) },
                  _name: { value: t.nm },
                }),
                (s.mn = t.mn),
                s
              );
            }
            function u(t, e, i) {
              function s(e) {
                return t.c.ix === e || 'Copies' === e ? s.copies : t.o.ix === e || 'Offset' === e ? s.offset : null;
              }
              var n = propertyGroupFactory(s, i),
                a = e;
              return (
                (s.propertyIndex = t.ix),
                a.c.setGroupProperty(PropertyInterface('Copies', n)),
                a.o.setGroupProperty(PropertyInterface('Offset', n)),
                Object.defineProperties(s, {
                  copies: { get: ExpressionPropertyInterface(a.c) },
                  offset: { get: ExpressionPropertyInterface(a.o) },
                  _name: { value: t.nm },
                }),
                (s.mn = t.mn),
                s
              );
            }
            return function (e, i, s) {
              var n;
              function a(t) {
                if ('number' == typeof t) return 0 === (t = void 0 === t ? 1 : t) ? s : n[t - 1];
                for (var e = 0, i = n.length; e < i; ) {
                  if (n[e]._name === t) return n[e];
                  e += 1;
                }
                return null;
              }
              return (
                (a.propertyGroup = propertyGroupFactory(a, function () {
                  return s;
                })),
                (n = t(e, i, a.propertyGroup)),
                (a.numProperties = n.length),
                (a._name = 'Contents'),
                a
              );
            };
          })(),
          TextExpressionInterface = function (t) {
            var e, i;
            function s(t) {
              return 'ADBE Text Document' === t ? s.sourceText : null;
            }
            return (
              Object.defineProperty(s, 'sourceText', {
                get: function () {
                  t.textProperty.getValue();
                  var s = t.textProperty.currentData.t;
                  return (
                    s !== e && ((t.textProperty.currentData.t = e), ((i = new String(s)).value = s || new String(s))), i
                  );
                },
              }),
              s
            );
          };
        function _typeof$2(t) {
          return (_typeof$2 =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                })(t);
        }
        var t,
          t,
          t,
          dataInterfaceFactory,
          FootageInterface =
            ((dataInterfaceFactory = function (t) {
              function e(t) {
                return 'Outline' === t ? e.outlineInterface() : null;
              }
              return (
                (e._name = 'Outline'),
                (e.outlineInterface = (function (t) {
                  var e = '',
                    i = t.getFootageData();
                  function s(t) {
                    if (i[t]) return (e = t), 'object' === _typeof$2((i = i[t])) ? s : i;
                    var n = t.indexOf(e);
                    if (-1 !== n) {
                      var a = parseInt(t.substr(n + e.length), 10);
                      return 'object' === _typeof$2((i = i[a])) ? s : i;
                    }
                    return '';
                  }
                  return function () {
                    return (e = ''), (i = t.getFootageData()), s;
                  };
                })(t)),
                e
              );
            }),
            function (t) {
              function e(t) {
                return 'Data' === t ? e.dataInterface : null;
              }
              return (e._name = 'Data'), (e.dataInterface = dataInterfaceFactory(t)), e;
            }),
          interfaces = {
            layer: LayerExpressionInterface,
            effects: EffectsExpressionInterface,
            comp: CompExpressionInterface,
            shape: ShapeExpressionInterface,
            text: TextExpressionInterface,
            footage: FootageInterface,
          };
        function getInterface(t) {
          return interfaces[t] || null;
        }
        function _typeof$1(t) {
          return (_typeof$1 =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                })(t);
        }
        function seedRandom(t, e) {
          var i = this,
            s = 256,
            n = e.pow(s, 6),
            a = e.pow(2, 52),
            o = 2 * a,
            h = 255;
          function l(t) {
            var e,
              i = t.length,
              n = this,
              a = 0,
              o = (n.i = n.j = 0),
              l = (n.S = []);
            for (i || (t = [i++]); a < s; ) l[a] = a++;
            for (a = 0; a < s; a++) (l[a] = l[(o = h & (o + t[a % i] + (e = l[a])))]), (l[o] = e);
            n.g = function (t) {
              for (var e, i = 0, a = n.i, o = n.j, l = n.S; t--; )
                (e = l[(a = h & (a + 1))]), (i = i * s + l[h & ((l[a] = l[(o = h & (o + e))]) + (l[o] = e))]);
              return (n.i = a), (n.j = o), i;
            };
          }
          function p(t, e) {
            return (e.i = t.i), (e.j = t.j), (e.S = t.S.slice()), e;
          }
          function f(t, e) {
            var i,
              s = [],
              n = _typeof$1(t);
            if (e && 'object' == n)
              for (i in t)
                try {
                  s.push(f(t[i], e - 1));
                } catch (a) {}
            return s.length ? s : 'string' == n ? t : t + '\0';
          }
          function u(t, e) {
            for (var i, s = t + '', n = 0; n < s.length; ) e[h & n] = h & ((i ^= 19 * e[h & n]) + s.charCodeAt(n++));
            return c(e);
          }
          function c(t) {
            return String.fromCharCode.apply(0, t);
          }
          (e.seedrandom = function (h, d, m) {
            var $ = [],
              g = u(
                f(
                  (d = !0 === d ? { entropy: !0 } : d || {}).entropy
                    ? [h, c(t)]
                    : null === h
                    ? (function () {
                        try {
                          var e = new Uint8Array(s);
                          return (i.crypto || i.msCrypto).getRandomValues(e), c(e);
                        } catch (n) {
                          var a = i.navigator,
                            o = a && a.plugins;
                          return [+new Date(), i, o, i.screen, c(t)];
                        }
                      })()
                    : h,
                  3,
                ),
                $,
              ),
              y = new l($),
              v = function () {
                for (var t = y.g(6), e = n, i = 0; t < a; ) (t = (t + i) * s), (e *= s), (i = y.g(1));
                for (; t >= o; ) (t /= 2), (e /= 2), (i >>>= 1);
                return (t + i) / e;
              };
            return (
              (v.int32 = function () {
                return 0 | y.g(4);
              }),
              (v.quick = function () {
                return y.g(4) / 4294967296;
              }),
              (v.double = v),
              u(c(y.S), t),
              (
                d.pass ||
                m ||
                function (t, i, s, n) {
                  return (
                    n &&
                      (n.S && p(n, y),
                      (t.state = function () {
                        return p(y, {});
                      })),
                    s ? ((e.random = t), i) : t
                  );
                }
              )(v, g, 'global' in d ? d.global : this == e, d.state)
            );
          }),
            u(e.random(), t);
        }
        function initialize$2(t) {
          seedRandom([], t);
        }
        var propTypes = { SHAPE: 'shape' };
        function _typeof(t) {
          return (_typeof =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (t) {
                  return typeof t;
                }
              : function (t) {
                  return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype
                    ? 'symbol'
                    : typeof t;
                })(t);
        }
        var ExpressionManager = (function () {
            var ob = {},
              Math = BMMath,
              window = null,
              document = null,
              XMLHttpRequest = null,
              fetch = null,
              frames = null;
            function $bm_isInstanceOfArray(t) {
              return t.constructor === Array || t.constructor === Float32Array;
            }
            function isNumerable(t, e) {
              return 'number' === t || 'boolean' === t || 'string' === t || e instanceof Number;
            }
            function $bm_neg(t) {
              var e = _typeof(t);
              if ('number' === e || 'boolean' === e || t instanceof Number) return -t;
              if ($bm_isInstanceOfArray(t)) {
                var i,
                  s = t.length,
                  n = [];
                for (i = 0; i < s; i += 1) n[i] = -t[i];
                return n;
              }
              return t.propType ? t.v : -t;
            }
            initialize$2(BMMath);
            var easeInBez = BezierFactory.getBezierEasing(0.333, 0, 0.833, 0.833, 'easeIn').get,
              easeOutBez = BezierFactory.getBezierEasing(0.167, 0.167, 0.667, 1, 'easeOut').get,
              easeInOutBez = BezierFactory.getBezierEasing(0.33, 0, 0.667, 1, 'easeInOut').get;
            function sum(t, e) {
              var i = _typeof(t),
                s = _typeof(e);
              if ('string' === i || 'string' === s || (isNumerable(i, t) && isNumerable(s, e))) return t + e;
              if ($bm_isInstanceOfArray(t) && isNumerable(s, e)) return ((t = t.slice(0))[0] += e), t;
              if (isNumerable(i, t) && $bm_isInstanceOfArray(e)) return ((e = e.slice(0))[0] = t + e[0]), e;
              if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                for (var n = 0, a = t.length, o = e.length, h = []; n < a || n < o; )
                  ('number' == typeof t[n] || t[n] instanceof Number) &&
                  ('number' == typeof e[n] || e[n] instanceof Number)
                    ? (h[n] = t[n] + e[n])
                    : (h[n] = void 0 === e[n] ? t[n] : t[n] || e[n]),
                    (n += 1);
                return h;
              }
              return 0;
            }
            var add = sum;
            function sub(t, e) {
              var i = _typeof(t),
                s = _typeof(e);
              if (isNumerable(i, t) && isNumerable(s, e))
                return 'string' === i && (t = parseInt(t, 10)), 'string' === s && (e = parseInt(e, 10)), t - e;
              if ($bm_isInstanceOfArray(t) && isNumerable(s, e)) return ((t = t.slice(0))[0] -= e), t;
              if (isNumerable(i, t) && $bm_isInstanceOfArray(e)) return ((e = e.slice(0))[0] = t - e[0]), e;
              if ($bm_isInstanceOfArray(t) && $bm_isInstanceOfArray(e)) {
                for (var n = 0, a = t.length, o = e.length, h = []; n < a || n < o; )
                  ('number' == typeof t[n] || t[n] instanceof Number) &&
                  ('number' == typeof e[n] || e[n] instanceof Number)
                    ? (h[n] = t[n] - e[n])
                    : (h[n] = void 0 === e[n] ? t[n] : t[n] || e[n]),
                    (n += 1);
                return h;
              }
              return 0;
            }
            function mul(t, e) {
              var i,
                s,
                n,
                a = _typeof(t),
                o = _typeof(e);
              if (isNumerable(a, t) && isNumerable(o, e)) return t * e;
              if ($bm_isInstanceOfArray(t) && isNumerable(o, e)) {
                for (i = createTypedArray('float32', (n = t.length)), s = 0; s < n; s += 1) i[s] = t[s] * e;
                return i;
              }
              if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                for (i = createTypedArray('float32', (n = e.length)), s = 0; s < n; s += 1) i[s] = t * e[s];
                return i;
              }
              return 0;
            }
            function div(t, e) {
              var i,
                s,
                n,
                a = _typeof(t),
                o = _typeof(e);
              if (isNumerable(a, t) && isNumerable(o, e)) return t / e;
              if ($bm_isInstanceOfArray(t) && isNumerable(o, e)) {
                for (i = createTypedArray('float32', (n = t.length)), s = 0; s < n; s += 1) i[s] = t[s] / e;
                return i;
              }
              if (isNumerable(a, t) && $bm_isInstanceOfArray(e)) {
                for (i = createTypedArray('float32', (n = e.length)), s = 0; s < n; s += 1) i[s] = t / e[s];
                return i;
              }
              return 0;
            }
            function mod(t, e) {
              return (
                'string' == typeof t && (t = parseInt(t, 10)), 'string' == typeof e && (e = parseInt(e, 10)), t % e
              );
            }
            var $bm_sum = sum,
              $bm_sub = sub,
              $bm_mul = mul,
              $bm_div = div,
              $bm_mod = mod;
            function clamp(t, e, i) {
              if (e > i) {
                var s = i;
                (i = e), (e = s);
              }
              return Math.min(Math.max(t, e), i);
            }
            function radiansToDegrees(t) {
              return t / degToRads;
            }
            var radians_to_degrees = radiansToDegrees;
            function degreesToRadians(t) {
              return t * degToRads;
            }
            var degrees_to_radians = radiansToDegrees,
              helperLengthArray = [0, 0, 0, 0, 0, 0];
            function length(t, e) {
              if ('number' == typeof t || t instanceof Number) return (e = e || 0), Math.abs(t - e);
              e || (e = helperLengthArray);
              var i,
                s = Math.min(t.length, e.length),
                n = 0;
              for (i = 0; i < s; i += 1) n += Math.pow(e[i] - t[i], 2);
              return Math.sqrt(n);
            }
            function normalize(t) {
              return div(t, length(t));
            }
            function rgbToHsl(t) {
              var e,
                i,
                s = t[0],
                n = t[1],
                a = t[2],
                o = Math.max(s, n, a),
                h = Math.min(s, n, a),
                l = (o + h) / 2;
              if (o === h) (e = 0), (i = 0);
              else {
                var p = o - h;
                switch (((i = l > 0.5 ? p / (2 - o - h) : p / (o + h)), o)) {
                  case s:
                    e = (n - a) / p + (n < a ? 6 : 0);
                    break;
                  case n:
                    e = (a - s) / p + 2;
                    break;
                  case a:
                    e = (s - n) / p + 4;
                }
                e /= 6;
              }
              return [e, i, l, t[3]];
            }
            function hue2rgb(t, e, i) {
              return (
                i < 0 && (i += 1),
                i > 1 && (i -= 1),
                i < 1 / 6 ? t + 6 * (e - t) * i : i < 0.5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
              );
            }
            function hslToRgb(t) {
              var e,
                i,
                s,
                n = t[0],
                a = t[1],
                o = t[2];
              if (0 === a) (e = o), (s = o), (i = o);
              else {
                var h = o < 0.5 ? o * (1 + a) : o + a - o * a,
                  l = 2 * o - h;
                (e = hue2rgb(l, h, n + 1 / 3)), (i = hue2rgb(l, h, n)), (s = hue2rgb(l, h, n - 1 / 3));
              }
              return [e, i, s, t[3]];
            }
            function linear(t, e, i, s, n) {
              if (((void 0 !== s && void 0 !== n) || ((s = e), (n = i), (e = 0), (i = 1)), i < e)) {
                var a = i;
                (i = e), (e = a);
              }
              if (t <= e) return s;
              if (t >= i) return n;
              var o,
                h = i === e ? 0 : (t - e) / (i - e);
              if (!s.length) return s + (n - s) * h;
              var l = s.length,
                p = createTypedArray('float32', l);
              for (o = 0; o < l; o += 1) p[o] = s[o] + (n[o] - s[o]) * h;
              return p;
            }
            function random(t, e) {
              if ((void 0 === e && (void 0 === t ? ((t = 0), (e = 1)) : ((e = t), (t = void 0))), e.length)) {
                var i,
                  s = e.length;
                t || (t = createTypedArray('float32', s));
                var n = createTypedArray('float32', s),
                  a = BMMath.random();
                for (i = 0; i < s; i += 1) n[i] = t[i] + a * (e[i] - t[i]);
                return n;
              }
              return void 0 === t && (t = 0), t + BMMath.random() * (e - t);
            }
            function createPath(t, e, i, s) {
              var n,
                a = t.length,
                o = shapePool.newElement();
              o.setPathData(!!s, a);
              var h,
                l,
                p = [0, 0];
              for (n = 0; n < a; n += 1)
                (h = e && e[n] ? e[n] : p),
                  (l = i && i[n] ? i[n] : p),
                  o.setTripleAt(
                    t[n][0],
                    t[n][1],
                    l[0] + t[n][0],
                    l[1] + t[n][1],
                    h[0] + t[n][0],
                    h[1] + t[n][1],
                    n,
                    !0,
                  );
              return o;
            }
            function initiateExpression(elem, data, property) {
              function noOp(t) {
                return t;
              }
              if (!elem.globalData.renderConfig.runExpressions) return noOp;
              var transform,
                $bm_transform,
                content,
                effect,
                val = data.x,
                needsVelocity = /velocity(?![\w\d])/.test(val),
                _needsRandom = -1 !== val.indexOf('random'),
                elemType = elem.data.ty,
                thisProperty = property;
              (thisProperty.valueAtTime = thisProperty.getValueAtTime),
                Object.defineProperty(thisProperty, 'value', {
                  get: function () {
                    return thisProperty.v;
                  },
                }),
                (elem.comp.frameDuration = 1 / elem.comp.globalData.frameRate),
                (elem.comp.displayStartTime = 0);
              var loopIn,
                loop_in,
                loopOut,
                loop_out,
                smooth,
                toWorld,
                fromWorld,
                fromComp,
                toComp,
                fromCompToSurface,
                position,
                rotation,
                anchorPoint,
                scale,
                thisLayer,
                thisComp,
                mask,
                valueAtTime,
                velocityAtTime,
                scoped_bm_rt,
                inPoint = elem.data.ip / elem.comp.globalData.frameRate,
                outPoint = elem.data.op / elem.comp.globalData.frameRate,
                width = elem.data.sw ? elem.data.sw : 0,
                height = elem.data.sh ? elem.data.sh : 0,
                name = elem.data.nm,
                expression_function = eval('[function _expression_function(){' + val + ';scoped_bm_rt=$bm_rt}]')[0],
                numKeys = property.kf ? data.k.length : 0,
                active = !this.data || !0 !== this.data.hd,
                wiggle = function (t, e) {
                  var i,
                    s,
                    n = this.pv.length ? this.pv.length : 1,
                    a = createTypedArray('float32', n),
                    o = Math.floor(5 * time);
                  for (i = 0, s = 0; i < o; ) {
                    for (s = 0; s < n; s += 1) a[s] += -e + 2 * e * BMMath.random();
                    i += 1;
                  }
                  var h = 5 * time,
                    l = h - Math.floor(h),
                    p = createTypedArray('float32', n);
                  if (n > 1) {
                    for (s = 0; s < n; s += 1) p[s] = this.pv[s] + a[s] + (-e + 2 * e * BMMath.random()) * l;
                    return p;
                  }
                  return this.pv + a[0] + (-e + 2 * e * BMMath.random()) * l;
                }.bind(this);
              function loopInDuration(t, e) {
                return loopIn(t, e, !0);
              }
              function loopOutDuration(t, e) {
                return loopOut(t, e, !0);
              }
              thisProperty.loopIn && (loop_in = loopIn = thisProperty.loopIn.bind(thisProperty)),
                thisProperty.loopOut && (loop_out = loopOut = thisProperty.loopOut.bind(thisProperty)),
                thisProperty.smooth && (smooth = thisProperty.smooth.bind(thisProperty)),
                this.getValueAtTime && (valueAtTime = this.getValueAtTime.bind(this)),
                this.getVelocityAtTime && (velocityAtTime = this.getVelocityAtTime.bind(this));
              var time,
                velocity,
                value,
                text,
                textIndex,
                textTotal,
                selectorValue,
                comp = elem.comp.globalData.projectInterface.bind(elem.comp.globalData.projectInterface);
              function lookAt(t, e) {
                var i = [e[0] - t[0], e[1] - t[1], e[2] - t[2]],
                  s = Math.atan2(i[0], Math.sqrt(i[1] * i[1] + i[2] * i[2])) / degToRads;
                return [-Math.atan2(i[1], i[2]) / degToRads, s, 0];
              }
              function easeOut(t, e, i, s, n) {
                return applyEase(easeOutBez, t, e, i, s, n);
              }
              function easeIn(t, e, i, s, n) {
                return applyEase(easeInBez, t, e, i, s, n);
              }
              function ease(t, e, i, s, n) {
                return applyEase(easeInOutBez, t, e, i, s, n);
              }
              function applyEase(t, e, i, s, n, a) {
                void 0 === n ? ((n = i), (a = s)) : (e = (e - i) / (s - i)), e > 1 ? (e = 1) : e < 0 && (e = 0);
                var o = t(e);
                if ($bm_isInstanceOfArray(n)) {
                  var h,
                    l = n.length,
                    p = createTypedArray('float32', l);
                  for (h = 0; h < l; h += 1) p[h] = (a[h] - n[h]) * o + n[h];
                  return p;
                }
                return (a - n) * o + n;
              }
              function nearestKey(t) {
                var e,
                  i,
                  s,
                  n = data.k.length;
                if (data.k.length && 'number' != typeof data.k[0]) {
                  if (((i = -1), (t *= elem.comp.globalData.frameRate) < data.k[0].t)) (i = 1), (s = data.k[0].t);
                  else {
                    for (e = 0; e < n - 1; e += 1) {
                      if (t === data.k[e].t) {
                        (i = e + 1), (s = data.k[e].t);
                        break;
                      }
                      if (t > data.k[e].t && t < data.k[e + 1].t) {
                        t - data.k[e].t > data.k[e + 1].t - t
                          ? ((i = e + 2), (s = data.k[e + 1].t))
                          : ((i = e + 1), (s = data.k[e].t));
                        break;
                      }
                    }
                    -1 === i && ((i = e + 1), (s = data.k[e].t));
                  }
                } else (i = 0), (s = 0);
                var a = {};
                return (a.index = i), (a.time = s / elem.comp.globalData.frameRate), a;
              }
              function key(t) {
                if (!data.k.length || 'number' == typeof data.k[0])
                  throw Error('The property has no keyframe at index ' + t);
                (t -= 1), (e = { time: data.k[t].t / elem.comp.globalData.frameRate, value: [] });
                var e,
                  i,
                  s,
                  n = Object.prototype.hasOwnProperty.call(data.k[t], 's') ? data.k[t].s : data.k[t - 1].e;
                for (s = n.length, i = 0; i < s; i += 1) (e[i] = n[i]), (e.value[i] = n[i]);
                return e;
              }
              function framesToTime(t, e) {
                return e || (e = elem.comp.globalData.frameRate), t / e;
              }
              function timeToFrames(t, e) {
                return t || 0 === t || (t = time), e || (e = elem.comp.globalData.frameRate), t * e;
              }
              function seedRandom(t) {
                BMMath.seedrandom(randSeed + t);
              }
              function sourceRectAtTime() {
                return elem.sourceRectAtTime();
              }
              function substring(t, e) {
                return 'string' == typeof value ? (void 0 === e ? value.substring(t) : value.substring(t, e)) : '';
              }
              function substr(t, e) {
                return 'string' == typeof value ? (void 0 === e ? value.substr(t) : value.substr(t, e)) : '';
              }
              function posterizeTime(t) {
                value = valueAtTime((time = 0 === t ? 0 : Math.floor(time * t) / t));
              }
              var parent,
                index = elem.data.ind,
                hasParent = !(!elem.hierarchy || !elem.hierarchy.length),
                randSeed = Math.floor(1e6 * Math.random()),
                globalData = elem.globalData;
              function executeExpression(t) {
                return (
                  (value = t),
                  this.frameExpressionId === elem.globalData.frameId && 'textSelector' !== this.propType
                    ? value
                    : ('textSelector' === this.propType &&
                        ((textIndex = this.textIndex),
                        (textTotal = this.textTotal),
                        (selectorValue = this.selectorValue)),
                      thisLayer ||
                        ((text = elem.layerInterface.text),
                        (thisLayer = elem.layerInterface),
                        (thisComp = elem.comp.compInterface),
                        (toWorld = thisLayer.toWorld.bind(thisLayer)),
                        (fromWorld = thisLayer.fromWorld.bind(thisLayer)),
                        (fromComp = thisLayer.fromComp.bind(thisLayer)),
                        (toComp = thisLayer.toComp.bind(thisLayer)),
                        (mask = thisLayer.mask ? thisLayer.mask.bind(thisLayer) : null),
                        (fromCompToSurface = fromComp)),
                      transform ||
                        (($bm_transform = transform = elem.layerInterface('ADBE Transform Group')),
                        transform && (anchorPoint = transform.anchorPoint)),
                      4 !== elemType || content || (content = thisLayer('ADBE Root Vectors Group')),
                      effect || (effect = thisLayer(4)),
                      (hasParent = !(!elem.hierarchy || !elem.hierarchy.length)) &&
                        !parent &&
                        (parent = elem.hierarchy[0].layerInterface),
                      (time = this.comp.renderedFrame / this.comp.globalData.frameRate),
                      _needsRandom && seedRandom(randSeed + time),
                      needsVelocity && (velocity = velocityAtTime(time)),
                      expression_function(),
                      (this.frameExpressionId = elem.globalData.frameId),
                      (scoped_bm_rt = scoped_bm_rt.propType === propTypes.SHAPE ? scoped_bm_rt.v : scoped_bm_rt))
                );
              }
              return (
                (executeExpression.__preventDeadCodeRemoval = [
                  $bm_transform,
                  anchorPoint,
                  time,
                  velocity,
                  inPoint,
                  outPoint,
                  width,
                  height,
                  name,
                  loop_in,
                  loop_out,
                  smooth,
                  toComp,
                  fromCompToSurface,
                  toWorld,
                  fromWorld,
                  mask,
                  position,
                  rotation,
                  scale,
                  thisComp,
                  numKeys,
                  active,
                  wiggle,
                  loopInDuration,
                  loopOutDuration,
                  comp,
                  lookAt,
                  easeOut,
                  easeIn,
                  ease,
                  nearestKey,
                  key,
                  text,
                  textIndex,
                  textTotal,
                  selectorValue,
                  framesToTime,
                  timeToFrames,
                  sourceRectAtTime,
                  substring,
                  substr,
                  posterizeTime,
                  index,
                  globalData,
                ]),
                executeExpression
              );
            }
            return (
              (ob.initiateExpression = initiateExpression),
              (ob.__preventDeadCodeRemoval = [
                window,
                document,
                XMLHttpRequest,
                fetch,
                frames,
                $bm_neg,
                add,
                $bm_sum,
                $bm_sub,
                $bm_mul,
                $bm_div,
                $bm_mod,
                clamp,
                radians_to_degrees,
                degreesToRadians,
                degrees_to_radians,
                normalize,
                rgbToHsl,
                hslToRgb,
                linear,
                random,
                createPath,
              ]),
              ob
            );
          })(),
          expressionHelpers = {
            searchExpressions: function (t, e, i) {
              e.x &&
                ((i.k = !0),
                (i.x = !0),
                (i.initiateExpression = ExpressionManager.initiateExpression),
                i.effectsSequence.push(i.initiateExpression(t, e, i).bind(i)));
            },
            getSpeedAtTime: function (t) {
              var e,
                i = this.getValueAtTime(t),
                s = this.getValueAtTime(t + -0.01),
                n = 0;
              if (i.length) {
                for (e = 0; e < i.length; e += 1) n += Math.pow(s[e] - i[e], 2);
                n = 100 * Math.sqrt(n);
              } else n = 0;
              return n;
            },
            getVelocityAtTime: function (t) {
              if (void 0 !== this.vel) return this.vel;
              var e,
                i,
                s = -0.001,
                n = this.getValueAtTime(t),
                a = this.getValueAtTime(t + s);
              if (n.length)
                for (e = createTypedArray('float32', n.length), i = 0; i < n.length; i += 1) e[i] = (a[i] - n[i]) / s;
              else e = (a - n) / s;
              return e;
            },
            getValueAtTime: function (t) {
              return (
                (t *= this.elem.globalData.frameRate),
                (t -= this.offsetTime) !== this._cachingAtTime.lastFrame &&
                  ((this._cachingAtTime.lastIndex =
                    this._cachingAtTime.lastFrame < t ? this._cachingAtTime.lastIndex : 0),
                  (this._cachingAtTime.value = this.interpolateValue(t, this._cachingAtTime)),
                  (this._cachingAtTime.lastFrame = t)),
                this._cachingAtTime.value
              );
            },
            getStaticValueAtTime: function () {
              return this.pv;
            },
            setGroupProperty: function (t) {
              this.propertyGroup = t;
            },
          };
        function addPropertyDecorator() {
          function t(t, e, i) {
            if (!this.k || !this.keyframes) return this.pv;
            t = t ? t.toLowerCase() : '';
            var s,
              n,
              a,
              o,
              h,
              l = this.comp.renderedFrame,
              p = this.keyframes,
              f = p[p.length - 1].t;
            if (l <= f) return this.pv;
            if (
              (i
                ? (n =
                    f -
                    (s = e
                      ? Math.abs(f - this.elem.comp.globalData.frameRate * e)
                      : Math.max(0, f - this.elem.data.ip)))
                : ((!e || e > p.length - 1) && (e = p.length - 1), (s = f - (n = p[p.length - 1 - e].t))),
              'pingpong' === t)
            ) {
              if (Math.floor((l - n) / s) % 2 != 0)
                return this.getValueAtTime((s - ((l - n) % s) + n) / this.comp.globalData.frameRate, 0);
            } else {
              if ('offset' === t) {
                var u = this.getValueAtTime(n / this.comp.globalData.frameRate, 0),
                  c = this.getValueAtTime(f / this.comp.globalData.frameRate, 0),
                  d = this.getValueAtTime((((l - n) % s) + n) / this.comp.globalData.frameRate, 0),
                  m = Math.floor((l - n) / s);
                if (this.pv.length) {
                  for (o = (h = Array(u.length)).length, a = 0; a < o; a += 1) h[a] = (c[a] - u[a]) * m + d[a];
                  return h;
                }
                return (c - u) * m + d;
              }
              if ('continue' === t) {
                var $ = this.getValueAtTime(f / this.comp.globalData.frameRate, 0),
                  g = this.getValueAtTime((f - 0.001) / this.comp.globalData.frameRate, 0);
                if (this.pv.length) {
                  for (o = (h = Array($.length)).length, a = 0; a < o; a += 1)
                    h[a] = $[a] + (($[a] - g[a]) * ((l - f) / this.comp.globalData.frameRate)) / 5e-4;
                  return h;
                }
                return $ + ((l - f) / 0.001) * ($ - g);
              }
            }
            return this.getValueAtTime((((l - n) % s) + n) / this.comp.globalData.frameRate, 0);
          }
          function e(t, e, i) {
            if (!this.k) return this.pv;
            t = t ? t.toLowerCase() : '';
            var s,
              n,
              a,
              o,
              h,
              l = this.comp.renderedFrame,
              p = this.keyframes,
              f = p[0].t;
            if (l >= f) return this.pv;
            if (
              (i
                ? (n =
                    f +
                    (s = e ? Math.abs(this.elem.comp.globalData.frameRate * e) : Math.max(0, this.elem.data.op - f)))
                : ((!e || e > p.length - 1) && (e = p.length - 1), (s = (n = p[e].t) - f)),
              'pingpong' === t)
            ) {
              if (Math.floor((f - l) / s) % 2 == 0)
                return this.getValueAtTime((((f - l) % s) + f) / this.comp.globalData.frameRate, 0);
            } else {
              if ('offset' === t) {
                var u = this.getValueAtTime(f / this.comp.globalData.frameRate, 0),
                  c = this.getValueAtTime(n / this.comp.globalData.frameRate, 0),
                  d = this.getValueAtTime((s - ((f - l) % s) + f) / this.comp.globalData.frameRate, 0),
                  m = Math.floor((f - l) / s) + 1;
                if (this.pv.length) {
                  for (o = (h = Array(u.length)).length, a = 0; a < o; a += 1) h[a] = d[a] - (c[a] - u[a]) * m;
                  return h;
                }
                return d - (c - u) * m;
              }
              if ('continue' === t) {
                var $ = this.getValueAtTime(f / this.comp.globalData.frameRate, 0),
                  g = this.getValueAtTime((f + 0.001) / this.comp.globalData.frameRate, 0);
                if (this.pv.length) {
                  for (o = (h = Array($.length)).length, a = 0; a < o; a += 1)
                    h[a] = $[a] + (($[a] - g[a]) * (f - l)) / 0.001;
                  return h;
                }
                return $ + (($ - g) * (f - l)) / 0.001;
              }
            }
            return this.getValueAtTime((s - (((f - l) % s) + f)) / this.comp.globalData.frameRate, 0);
          }
          function i(t, e) {
            if (!this.k || ((t = 0.5 * (t || 0.4)), (e = Math.floor(e || 5)) <= 1)) return this.pv;
            var i,
              s,
              n = this.comp.renderedFrame / this.comp.globalData.frameRate,
              a = n - t,
              o = e > 1 ? (n + t - a) / (e - 1) : 1,
              h = 0,
              l = 0;
            for (i = this.pv.length ? createTypedArray('float32', this.pv.length) : 0; h < e; ) {
              if (((s = this.getValueAtTime(a + h * o)), this.pv.length))
                for (l = 0; l < this.pv.length; l += 1) i[l] += s[l];
              else i += s;
              h += 1;
            }
            if (this.pv.length) for (l = 0; l < this.pv.length; l += 1) i[l] /= e;
            else i /= e;
            return i;
          }
          function s(t) {
            this._transformCachingAtTime || (this._transformCachingAtTime = { v: new Matrix() });
            var e = this._transformCachingAtTime.v;
            if ((e.cloneFromProps(this.pre.props), this.appliedTransformations < 1)) {
              var i = this.a.getValueAtTime(t);
              e.translate(-i[0] * this.a.mult, -i[1] * this.a.mult, i[2] * this.a.mult);
            }
            if (this.appliedTransformations < 2) {
              var s = this.s.getValueAtTime(t);
              e.scale(s[0] * this.s.mult, s[1] * this.s.mult, s[2] * this.s.mult);
            }
            if (this.sk && this.appliedTransformations < 3) {
              var n = this.sk.getValueAtTime(t),
                a = this.sa.getValueAtTime(t);
              e.skewFromAxis(-n * this.sk.mult, a * this.sa.mult);
            }
            if (this.r && this.appliedTransformations < 4) {
              var o = this.r.getValueAtTime(t);
              e.rotate(-o * this.r.mult);
            } else if (!this.r && this.appliedTransformations < 4) {
              var h = this.rz.getValueAtTime(t),
                l = this.ry.getValueAtTime(t),
                p = this.rx.getValueAtTime(t),
                f = this.or.getValueAtTime(t);
              e.rotateZ(-h * this.rz.mult)
                .rotateY(l * this.ry.mult)
                .rotateX(p * this.rx.mult)
                .rotateZ(-f[2] * this.or.mult)
                .rotateY(f[1] * this.or.mult)
                .rotateX(f[0] * this.or.mult);
            }
            if (this.data.p && this.data.p.s) {
              var u = this.px.getValueAtTime(t),
                c = this.py.getValueAtTime(t);
              if (this.data.p.z) {
                var d = this.pz.getValueAtTime(t);
                e.translate(u * this.px.mult, c * this.py.mult, -d * this.pz.mult);
              } else e.translate(u * this.px.mult, c * this.py.mult, 0);
            } else {
              var m = this.p.getValueAtTime(t);
              e.translate(m[0] * this.p.mult, m[1] * this.p.mult, -m[2] * this.p.mult);
            }
            return e;
          }
          function n() {
            return this.v.clone(new Matrix());
          }
          var a = TransformPropertyFactory.getTransformProperty;
          TransformPropertyFactory.getTransformProperty = function (t, e, i) {
            var o = a(t, e, i);
            return (
              o.dynamicProperties.length ? (o.getValueAtTime = s.bind(o)) : (o.getValueAtTime = n.bind(o)),
              (o.setGroupProperty = expressionHelpers.setGroupProperty),
              o
            );
          };
          var o = PropertyFactory.getProp;
          PropertyFactory.getProp = function (s, n, a, h, l) {
            var p = o(s, n, a, h, l);
            p.kf
              ? (p.getValueAtTime = expressionHelpers.getValueAtTime.bind(p))
              : (p.getValueAtTime = expressionHelpers.getStaticValueAtTime.bind(p)),
              (p.setGroupProperty = expressionHelpers.setGroupProperty),
              (p.loopOut = t),
              (p.loopIn = e),
              (p.smooth = i),
              (p.getVelocityAtTime = expressionHelpers.getVelocityAtTime.bind(p)),
              (p.getSpeedAtTime = expressionHelpers.getSpeedAtTime.bind(p)),
              (p.numKeys = 1 === n.a ? n.k.length : 0),
              (p.propertyIndex = n.ix);
            var f = 0;
            return (
              0 !== a && (f = createTypedArray('float32', 1 === n.a ? n.k[0].s.length : n.k.length)),
              (p._cachingAtTime = { lastFrame: initialDefaultFrame, lastIndex: 0, value: f }),
              expressionHelpers.searchExpressions(s, n, p),
              p.k && l.addDynamicProperty(p),
              p
            );
          };
          var h = ShapePropertyFactory.getConstructorFunction(),
            l = ShapePropertyFactory.getKeyframedConstructorFunction();
          function p() {}
          (p.prototype = {
            vertices: function (t, e) {
              this.k && this.getValue();
              var i,
                s = this.v;
              void 0 !== e && (s = this.getValueAtTime(e, 0));
              var n = s._length,
                a = s[t],
                o = s.v,
                h = createSizedArray(n);
              for (i = 0; i < n; i += 1)
                h[i] = 'i' === t || 'o' === t ? [a[i][0] - o[i][0], a[i][1] - o[i][1]] : [a[i][0], a[i][1]];
              return h;
            },
            points: function (t) {
              return this.vertices('v', t);
            },
            inTangents: function (t) {
              return this.vertices('i', t);
            },
            outTangents: function (t) {
              return this.vertices('o', t);
            },
            isClosed: function () {
              return this.v.c;
            },
            pointOnPath: function (t, e) {
              var i = this.v;
              void 0 !== e && (i = this.getValueAtTime(e, 0)),
                this._segmentsLength || (this._segmentsLength = bez.getSegmentsLength(i));
              for (
                var s, n = this._segmentsLength, a = n.lengths, o = n.totalLength * t, h = 0, l = a.length, p = 0;
                h < l;

              ) {
                if (p + a[h].addedLength > o) {
                  var f = h,
                    u = i.c && h === l - 1 ? 0 : h + 1,
                    c = (o - p) / a[h].addedLength;
                  s = bez.getPointInSegment(i.v[f], i.v[u], i.o[f], i.i[u], c, a[h]);
                  break;
                }
                (p += a[h].addedLength), (h += 1);
              }
              return s || (s = i.c ? [i.v[0][0], i.v[0][1]] : [i.v[i._length - 1][0], i.v[i._length - 1][1]]), s;
            },
            vectorOnPath: function (t, e, i) {
              1 == t ? (t = this.v.c) : 0 == t && (t = 0.999);
              var s = this.pointOnPath(t, e),
                n = this.pointOnPath(t + 0.001, e),
                a = n[0] - s[0],
                o = n[1] - s[1],
                h = Math.sqrt(Math.pow(a, 2) + Math.pow(o, 2));
              return 0 === h ? [0, 0] : 'tangent' === i ? [a / h, o / h] : [-o / h, a / h];
            },
            tangentOnPath: function (t, e) {
              return this.vectorOnPath(t, e, 'tangent');
            },
            normalOnPath: function (t, e) {
              return this.vectorOnPath(t, e, 'normal');
            },
            setGroupProperty: expressionHelpers.setGroupProperty,
            getValueAtTime: expressionHelpers.getStaticValueAtTime,
          }),
            extendPrototype([p], h),
            extendPrototype([p], l),
            (l.prototype.getValueAtTime = function (t) {
              return (
                this._cachingAtTime ||
                  (this._cachingAtTime = {
                    shapeValue: shapePool.clone(this.pv),
                    lastIndex: 0,
                    lastTime: initialDefaultFrame,
                  }),
                (t *= this.elem.globalData.frameRate),
                (t -= this.offsetTime) !== this._cachingAtTime.lastTime &&
                  ((this._cachingAtTime.lastIndex = this._cachingAtTime.lastTime < t ? this._caching.lastIndex : 0),
                  (this._cachingAtTime.lastTime = t),
                  this.interpolateShape(t, this._cachingAtTime.shapeValue, this._cachingAtTime)),
                this._cachingAtTime.shapeValue
              );
            }),
            (l.prototype.initiateExpression = ExpressionManager.initiateExpression);
          var f = ShapePropertyFactory.getShapeProp;
          ShapePropertyFactory.getShapeProp = function (t, e, i, s, n) {
            var a = f(t, e, i, s, n);
            return (
              (a.propertyIndex = e.ix),
              (a.lock = !1),
              3 === i
                ? expressionHelpers.searchExpressions(t, e.pt, a)
                : 4 === i && expressionHelpers.searchExpressions(t, e.ks, a),
              a.k && t.addDynamicProperty(a),
              a
            );
          };
        }
        function initialize$1() {
          addPropertyDecorator();
        }
        function addDecorator() {
          (TextProperty.prototype.getExpressionValue = function (t, e) {
            var i = this.calculateExpression(e);
            if (t.t !== i) {
              var s = {};
              return this.copyData(s, t), (s.t = i.toString()), (s.__complete = !1), s;
            }
            return t;
          }),
            (TextProperty.prototype.searchProperty = function () {
              var t = this.searchKeyframes(),
                e = this.searchExpressions();
              return (this.kf = t || e), this.kf;
            }),
            (TextProperty.prototype.searchExpressions = function () {
              return this.data.d.x
                ? ((this.calculateExpression = ExpressionManager.initiateExpression.bind(this)(
                    this.elem,
                    this.data.d,
                    this,
                  )),
                  this.addEffect(this.getExpressionValue.bind(this)),
                  !0)
                : null;
            });
        }
        function initialize() {
          addDecorator();
        }
        function SVGComposableEffect() {}
        function SVGTintFilter(t, e, i, s, n) {
          this.filterManager = e;
          var a = createNS('feColorMatrix');
          a.setAttribute('type', 'matrix'),
            a.setAttribute('color-interpolation-filters', 'linearRGB'),
            a.setAttribute(
              'values',
              '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0',
            ),
            a.setAttribute('result', s + '_tint_1'),
            t.appendChild(a),
            (a = createNS('feColorMatrix')).setAttribute('type', 'matrix'),
            a.setAttribute('color-interpolation-filters', 'sRGB'),
            a.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'),
            a.setAttribute('result', s + '_tint_2'),
            t.appendChild(a),
            (this.matrixFilter = a);
          var o = this.createMergeNode(s, [n, s + '_tint_1', s + '_tint_2']);
          t.appendChild(o);
        }
        function SVGFillFilter(t, e, i, s) {
          this.filterManager = e;
          var n = createNS('feColorMatrix');
          n.setAttribute('type', 'matrix'),
            n.setAttribute('color-interpolation-filters', 'sRGB'),
            n.setAttribute('values', '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'),
            n.setAttribute('result', s),
            t.appendChild(n),
            (this.matrixFilter = n);
        }
        function SVGStrokeEffect(t, e, i) {
          (this.initialized = !1), (this.filterManager = e), (this.elem = i), (this.paths = []);
        }
        function SVGTritoneFilter(t, e, i, s) {
          this.filterManager = e;
          var n = createNS('feColorMatrix');
          n.setAttribute('type', 'matrix'),
            n.setAttribute('color-interpolation-filters', 'linearRGB'),
            n.setAttribute(
              'values',
              '0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0',
            ),
            t.appendChild(n);
          var a = createNS('feComponentTransfer');
          a.setAttribute('color-interpolation-filters', 'sRGB'), a.setAttribute('result', s), (this.matrixFilter = a);
          var o = createNS('feFuncR');
          o.setAttribute('type', 'table'), a.appendChild(o), (this.feFuncR = o);
          var h = createNS('feFuncG');
          h.setAttribute('type', 'table'), a.appendChild(h), (this.feFuncG = h);
          var l = createNS('feFuncB');
          l.setAttribute('type', 'table'), a.appendChild(l), (this.feFuncB = l), t.appendChild(a);
        }
        function SVGProLevelsFilter(t, e, i, s) {
          this.filterManager = e;
          var n = this.filterManager.effectElements,
            a = createNS('feComponentTransfer');
          (n[10].p.k ||
            0 !== n[10].p.v ||
            n[11].p.k ||
            1 !== n[11].p.v ||
            n[12].p.k ||
            1 !== n[12].p.v ||
            n[13].p.k ||
            0 !== n[13].p.v ||
            n[14].p.k ||
            1 !== n[14].p.v) &&
            (this.feFuncR = this.createFeFunc('feFuncR', a)),
            (n[17].p.k ||
              0 !== n[17].p.v ||
              n[18].p.k ||
              1 !== n[18].p.v ||
              n[19].p.k ||
              1 !== n[19].p.v ||
              n[20].p.k ||
              0 !== n[20].p.v ||
              n[21].p.k ||
              1 !== n[21].p.v) &&
              (this.feFuncG = this.createFeFunc('feFuncG', a)),
            (n[24].p.k ||
              0 !== n[24].p.v ||
              n[25].p.k ||
              1 !== n[25].p.v ||
              n[26].p.k ||
              1 !== n[26].p.v ||
              n[27].p.k ||
              0 !== n[27].p.v ||
              n[28].p.k ||
              1 !== n[28].p.v) &&
              (this.feFuncB = this.createFeFunc('feFuncB', a)),
            (n[31].p.k ||
              0 !== n[31].p.v ||
              n[32].p.k ||
              1 !== n[32].p.v ||
              n[33].p.k ||
              1 !== n[33].p.v ||
              n[34].p.k ||
              0 !== n[34].p.v ||
              n[35].p.k ||
              1 !== n[35].p.v) &&
              (this.feFuncA = this.createFeFunc('feFuncA', a)),
            (this.feFuncR || this.feFuncG || this.feFuncB || this.feFuncA) &&
              (a.setAttribute('color-interpolation-filters', 'sRGB'), t.appendChild(a)),
            (n[3].p.k ||
              0 !== n[3].p.v ||
              n[4].p.k ||
              1 !== n[4].p.v ||
              n[5].p.k ||
              1 !== n[5].p.v ||
              n[6].p.k ||
              0 !== n[6].p.v ||
              n[7].p.k ||
              1 !== n[7].p.v) &&
              ((a = createNS('feComponentTransfer')).setAttribute('color-interpolation-filters', 'sRGB'),
              a.setAttribute('result', s),
              t.appendChild(a),
              (this.feFuncRComposed = this.createFeFunc('feFuncR', a)),
              (this.feFuncGComposed = this.createFeFunc('feFuncG', a)),
              (this.feFuncBComposed = this.createFeFunc('feFuncB', a)));
        }
        function SVGDropShadowEffect(t, e, i, s, n) {
          var a = e.container.globalData.renderConfig.filterSize,
            o = e.data.fs || a;
          t.setAttribute('x', o.x || a.x),
            t.setAttribute('y', o.y || a.y),
            t.setAttribute('width', o.width || a.width),
            t.setAttribute('height', o.height || a.height),
            (this.filterManager = e);
          var h = createNS('feGaussianBlur');
          h.setAttribute('in', 'SourceAlpha'),
            h.setAttribute('result', s + '_drop_shadow_1'),
            h.setAttribute('stdDeviation', '0'),
            (this.feGaussianBlur = h),
            t.appendChild(h);
          var l = createNS('feOffset');
          l.setAttribute('dx', '25'),
            l.setAttribute('dy', '0'),
            l.setAttribute('in', s + '_drop_shadow_1'),
            l.setAttribute('result', s + '_drop_shadow_2'),
            (this.feOffset = l),
            t.appendChild(l);
          var p = createNS('feFlood');
          p.setAttribute('flood-color', '#00ff00'),
            p.setAttribute('flood-opacity', '1'),
            p.setAttribute('result', s + '_drop_shadow_3'),
            (this.feFlood = p),
            t.appendChild(p);
          var f = createNS('feComposite');
          f.setAttribute('in', s + '_drop_shadow_3'),
            f.setAttribute('in2', s + '_drop_shadow_2'),
            f.setAttribute('operator', 'in'),
            f.setAttribute('result', s + '_drop_shadow_4'),
            t.appendChild(f);
          var u = this.createMergeNode(s, [s + '_drop_shadow_4', n]);
          t.appendChild(u);
        }
        (SVGComposableEffect.prototype = {
          createMergeNode: function (t, e) {
            var i,
              s,
              n = createNS('feMerge');
            for (n.setAttribute('result', t), s = 0; s < e.length; s += 1)
              (i = createNS('feMergeNode')).setAttribute('in', e[s]), n.appendChild(i), n.appendChild(i);
            return n;
          },
        }),
          extendPrototype([SVGComposableEffect], SVGTintFilter),
          (SVGTintFilter.prototype.renderFrame = function (t) {
            if (t || this.filterManager._mdf) {
              var e = this.filterManager.effectElements[0].p.v,
                i = this.filterManager.effectElements[1].p.v,
                s = this.filterManager.effectElements[2].p.v / 100;
              this.matrixFilter.setAttribute(
                'values',
                i[0] -
                  e[0] +
                  ' 0 0 0 ' +
                  e[0] +
                  ' ' +
                  (i[1] - e[1]) +
                  ' 0 0 0 ' +
                  e[1] +
                  ' ' +
                  (i[2] - e[2]) +
                  ' 0 0 0 ' +
                  e[2] +
                  ' 0 0 0 ' +
                  s +
                  ' 0',
              );
            }
          }),
          (SVGFillFilter.prototype.renderFrame = function (t) {
            if (t || this.filterManager._mdf) {
              var e = this.filterManager.effectElements[2].p.v,
                i = this.filterManager.effectElements[6].p.v;
              this.matrixFilter.setAttribute(
                'values',
                '0 0 0 0 ' + e[0] + ' 0 0 0 0 ' + e[1] + ' 0 0 0 0 ' + e[2] + ' 0 0 0 ' + i + ' 0',
              );
            }
          }),
          (SVGStrokeEffect.prototype.initialize = function () {
            var t,
              e,
              i,
              s,
              n = this.elem.layerElement.children || this.elem.layerElement.childNodes;
            for (
              1 === this.filterManager.effectElements[1].p.v
                ? ((s = this.elem.maskManager.masksProperties.length), (i = 0))
                : (s = 1 + (i = this.filterManager.effectElements[0].p.v - 1)),
                (e = createNS('g')).setAttribute('fill', 'none'),
                e.setAttribute('stroke-linecap', 'round'),
                e.setAttribute('stroke-dashoffset', 1);
              i < s;
              i += 1
            )
              (t = createNS('path')), e.appendChild(t), this.paths.push({ p: t, m: i });
            if (3 === this.filterManager.effectElements[10].p.v) {
              var a = createNS('mask'),
                o = createElementID();
              a.setAttribute('id', o),
                a.setAttribute('mask-type', 'alpha'),
                a.appendChild(e),
                this.elem.globalData.defs.appendChild(a);
              var h = createNS('g');
              for (h.setAttribute('mask', 'url(' + getLocationHref() + '#' + o + ')'); n[0]; ) h.appendChild(n[0]);
              this.elem.layerElement.appendChild(h), (this.masker = a), e.setAttribute('stroke', '#fff');
            } else if (
              1 === this.filterManager.effectElements[10].p.v ||
              2 === this.filterManager.effectElements[10].p.v
            ) {
              if (2 === this.filterManager.effectElements[10].p.v)
                for (n = this.elem.layerElement.children || this.elem.layerElement.childNodes; n.length; )
                  this.elem.layerElement.removeChild(n[0]);
              this.elem.layerElement.appendChild(e),
                this.elem.layerElement.removeAttribute('mask'),
                e.setAttribute('stroke', '#fff');
            }
            (this.initialized = !0), (this.pathMasker = e);
          }),
          (SVGStrokeEffect.prototype.renderFrame = function (t) {
            this.initialized || this.initialize();
            var e,
              i,
              s,
              n = this.paths.length;
            for (e = 0; e < n; e += 1)
              if (
                -1 !== this.paths[e].m &&
                ((i = this.elem.maskManager.viewData[this.paths[e].m]),
                (s = this.paths[e].p),
                (t || this.filterManager._mdf || i.prop._mdf) && s.setAttribute('d', i.lastPath),
                t ||
                  this.filterManager.effectElements[9].p._mdf ||
                  this.filterManager.effectElements[4].p._mdf ||
                  this.filterManager.effectElements[7].p._mdf ||
                  this.filterManager.effectElements[8].p._mdf ||
                  i.prop._mdf)
              ) {
                if (
                  0 !== this.filterManager.effectElements[7].p.v ||
                  100 !== this.filterManager.effectElements[8].p.v
                ) {
                  var a =
                      0.01 *
                      Math.min(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v),
                    o =
                      0.01 *
                      Math.max(this.filterManager.effectElements[7].p.v, this.filterManager.effectElements[8].p.v),
                    h = s.getTotalLength();
                  l = '0 0 0 ' + h * a + ' ';
                  var l,
                    p,
                    f,
                    u = Math.floor(
                      (h * (o - a)) /
                        (1 +
                          2 *
                            this.filterManager.effectElements[4].p.v *
                            this.filterManager.effectElements[9].p.v *
                            0.01),
                    );
                  for (p = 0; p < u; p += 1)
                    l +=
                      '1 ' +
                      2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * 0.01 +
                      ' ';
                  l += '0 ' + 10 * h + ' 0 0';
                } else
                  l =
                    '1 ' +
                    2 * this.filterManager.effectElements[4].p.v * this.filterManager.effectElements[9].p.v * 0.01;
                s.setAttribute('stroke-dasharray', l);
              }
            if (
              ((t || this.filterManager.effectElements[4].p._mdf) &&
                this.pathMasker.setAttribute('stroke-width', 2 * this.filterManager.effectElements[4].p.v),
              (t || this.filterManager.effectElements[6].p._mdf) &&
                this.pathMasker.setAttribute('opacity', this.filterManager.effectElements[6].p.v),
              (1 === this.filterManager.effectElements[10].p.v || 2 === this.filterManager.effectElements[10].p.v) &&
                (t || this.filterManager.effectElements[3].p._mdf))
            ) {
              var c = this.filterManager.effectElements[3].p.v;
              this.pathMasker.setAttribute(
                'stroke',
                'rgb(' + bmFloor(255 * c[0]) + ',' + bmFloor(255 * c[1]) + ',' + bmFloor(255 * c[2]) + ')',
              );
            }
          }),
          (SVGTritoneFilter.prototype.renderFrame = function (t) {
            if (t || this.filterManager._mdf) {
              var e = this.filterManager.effectElements[0].p.v,
                i = this.filterManager.effectElements[1].p.v,
                s = this.filterManager.effectElements[2].p.v,
                n = s[0] + ' ' + i[0] + ' ' + e[0],
                a = s[1] + ' ' + i[1] + ' ' + e[1],
                o = s[2] + ' ' + i[2] + ' ' + e[2];
              this.feFuncR.setAttribute('tableValues', n),
                this.feFuncG.setAttribute('tableValues', a),
                this.feFuncB.setAttribute('tableValues', o);
            }
          }),
          (SVGProLevelsFilter.prototype.createFeFunc = function (t, e) {
            var i = createNS(t);
            return i.setAttribute('type', 'table'), e.appendChild(i), i;
          }),
          (SVGProLevelsFilter.prototype.getTableValue = function (t, e, i, s, n) {
            for (
              var a,
                o,
                h = 0,
                l = Math.min(t, e),
                p = Math.max(t, e),
                f = Array.call(null, { length: 256 }),
                u = 0,
                c = n - s,
                d = e - t;
              h <= 256;

            )
              (o =
                (a = h / 256) <= l ? (d < 0 ? n : s) : a >= p ? (d < 0 ? s : n) : s + c * Math.pow((a - t) / d, 1 / i)),
                (f[u] = o),
                (u += 1),
                (h += 256 / 255);
            return f.join(' ');
          }),
          (SVGProLevelsFilter.prototype.renderFrame = function (t) {
            if (t || this.filterManager._mdf) {
              var e,
                i = this.filterManager.effectElements;
              this.feFuncRComposed &&
                (t || i[3].p._mdf || i[4].p._mdf || i[5].p._mdf || i[6].p._mdf || i[7].p._mdf) &&
                ((e = this.getTableValue(i[3].p.v, i[4].p.v, i[5].p.v, i[6].p.v, i[7].p.v)),
                this.feFuncRComposed.setAttribute('tableValues', e),
                this.feFuncGComposed.setAttribute('tableValues', e),
                this.feFuncBComposed.setAttribute('tableValues', e)),
                this.feFuncR &&
                  (t || i[10].p._mdf || i[11].p._mdf || i[12].p._mdf || i[13].p._mdf || i[14].p._mdf) &&
                  ((e = this.getTableValue(i[10].p.v, i[11].p.v, i[12].p.v, i[13].p.v, i[14].p.v)),
                  this.feFuncR.setAttribute('tableValues', e)),
                this.feFuncG &&
                  (t || i[17].p._mdf || i[18].p._mdf || i[19].p._mdf || i[20].p._mdf || i[21].p._mdf) &&
                  ((e = this.getTableValue(i[17].p.v, i[18].p.v, i[19].p.v, i[20].p.v, i[21].p.v)),
                  this.feFuncG.setAttribute('tableValues', e)),
                this.feFuncB &&
                  (t || i[24].p._mdf || i[25].p._mdf || i[26].p._mdf || i[27].p._mdf || i[28].p._mdf) &&
                  ((e = this.getTableValue(i[24].p.v, i[25].p.v, i[26].p.v, i[27].p.v, i[28].p.v)),
                  this.feFuncB.setAttribute('tableValues', e)),
                this.feFuncA &&
                  (t || i[31].p._mdf || i[32].p._mdf || i[33].p._mdf || i[34].p._mdf || i[35].p._mdf) &&
                  ((e = this.getTableValue(i[31].p.v, i[32].p.v, i[33].p.v, i[34].p.v, i[35].p.v)),
                  this.feFuncA.setAttribute('tableValues', e));
            }
          }),
          extendPrototype([SVGComposableEffect], SVGDropShadowEffect),
          (SVGDropShadowEffect.prototype.renderFrame = function (t) {
            if (t || this.filterManager._mdf) {
              if (
                ((t || this.filterManager.effectElements[4].p._mdf) &&
                  this.feGaussianBlur.setAttribute('stdDeviation', this.filterManager.effectElements[4].p.v / 4),
                t || this.filterManager.effectElements[0].p._mdf)
              ) {
                var e = this.filterManager.effectElements[0].p.v;
                this.feFlood.setAttribute(
                  'flood-color',
                  rgbToHex(Math.round(255 * e[0]), Math.round(255 * e[1]), Math.round(255 * e[2])),
                );
              }
              if (
                ((t || this.filterManager.effectElements[1].p._mdf) &&
                  this.feFlood.setAttribute('flood-opacity', this.filterManager.effectElements[1].p.v / 255),
                t || this.filterManager.effectElements[2].p._mdf || this.filterManager.effectElements[3].p._mdf)
              ) {
                var i = this.filterManager.effectElements[3].p.v,
                  s = (this.filterManager.effectElements[2].p.v - 90) * degToRads,
                  n = i * Math.cos(s),
                  a = i * Math.sin(s);
                this.feOffset.setAttribute('dx', n), this.feOffset.setAttribute('dy', a);
              }
            }
          });
        var _svgMatteSymbols = [];
        function SVGMatte3Effect(t, e, i) {
          (this.initialized = !1),
            (this.filterManager = e),
            (this.filterElem = t),
            (this.elem = i),
            (i.matteElement = createNS('g')),
            i.matteElement.appendChild(i.layerElement),
            i.matteElement.appendChild(i.transformedElement),
            (i.baseElement = i.matteElement);
        }
        function SVGGaussianBlurEffect(t, e, i, s) {
          t.setAttribute('x', '-100%'),
            t.setAttribute('y', '-100%'),
            t.setAttribute('width', '300%'),
            t.setAttribute('height', '300%'),
            (this.filterManager = e);
          var n = createNS('feGaussianBlur');
          n.setAttribute('result', s), t.appendChild(n), (this.feGaussianBlur = n);
        }
        return (
          (SVGMatte3Effect.prototype.findSymbol = function (t) {
            for (var e = 0, i = _svgMatteSymbols.length; e < i; ) {
              if (_svgMatteSymbols[e] === t) return _svgMatteSymbols[e];
              e += 1;
            }
            return null;
          }),
          (SVGMatte3Effect.prototype.replaceInParent = function (t, e) {
            var i = t.layerElement.parentNode;
            if (i) {
              for (var s, n = i.children, a = 0, o = n.length; a < o && n[a] !== t.layerElement; ) a += 1;
              a <= o - 2 && (s = n[a + 1]);
              var h = createNS('use');
              h.setAttribute('href', '#' + e), s ? i.insertBefore(h, s) : i.appendChild(h);
            }
          }),
          (SVGMatte3Effect.prototype.setElementAsMask = function (t, e) {
            if (!this.findSymbol(e)) {
              var i = createElementID(),
                s = createNS('mask');
              s.setAttribute('id', e.layerId), s.setAttribute('mask-type', 'alpha'), _svgMatteSymbols.push(e);
              var n = t.globalData.defs;
              n.appendChild(s);
              var a = createNS('symbol');
              a.setAttribute('id', i), this.replaceInParent(e, i), a.appendChild(e.layerElement), n.appendChild(a);
              var o = createNS('use');
              o.setAttribute('href', '#' + i), s.appendChild(o), (e.data.hd = !1), e.show();
            }
            t.setMatte(e.layerId);
          }),
          (SVGMatte3Effect.prototype.initialize = function () {
            for (
              var t = this.filterManager.effectElements[0].p.v, e = this.elem.comp.elements, i = 0, s = e.length;
              i < s;

            )
              e[i] && e[i].data.ind === t && this.setElementAsMask(this.elem, e[i]), (i += 1);
            this.initialized = !0;
          }),
          (SVGMatte3Effect.prototype.renderFrame = function () {
            this.initialized || this.initialize();
          }),
          (SVGGaussianBlurEffect.prototype.renderFrame = function (t) {
            if (t || this.filterManager._mdf) {
              var e = 0.3 * this.filterManager.effectElements[0].p.v,
                i = this.filterManager.effectElements[1].p.v,
                s = 3 == i ? 0 : e,
                n = 2 == i ? 0 : e;
              this.feGaussianBlur.setAttribute('stdDeviation', s + ' ' + n);
              var a = 1 == this.filterManager.effectElements[2].p.v ? 'wrap' : 'duplicate';
              this.feGaussianBlur.setAttribute('edgeMode', a);
            }
          }),
          registerRenderer('canvas', CanvasRenderer),
          registerRenderer('html', HybridRenderer),
          registerRenderer('svg', SVGRenderer),
          ShapeModifiers.registerModifier('tm', TrimModifier),
          ShapeModifiers.registerModifier('pb', PuckerAndBloatModifier),
          ShapeModifiers.registerModifier('rp', RepeaterModifier),
          ShapeModifiers.registerModifier('rd', RoundCornersModifier),
          ShapeModifiers.registerModifier('zz', ZigZagModifier),
          ShapeModifiers.registerModifier('op', OffsetPathModifier),
          setExpressionsPlugin(Expressions),
          setExpressionInterfaces(getInterface),
          initialize$1(),
          initialize(),
          registerEffect(20, SVGTintFilter, !0),
          registerEffect(21, SVGFillFilter, !0),
          registerEffect(22, SVGStrokeEffect, !1),
          registerEffect(23, SVGTritoneFilter, !0),
          registerEffect(24, SVGProLevelsFilter, !0),
          registerEffect(25, SVGDropShadowEffect, !0),
          registerEffect(28, SVGMatte3Effect, !1),
          registerEffect(29, SVGGaussianBlurEffect, !0),
          lottie
        );
      }),
      (module.exports = factory()));
  var _templateObject$1,
    _templateObject,
    _templateObject2,
    _templateObject3,
    _templateObject4,
    _templateObject5,
    PlayerState,
    PlayMode,
    PlayerEvents,
    lottie = lottie$1.exports,
    styles = r$3(
      _templateObject$1 ||
        (_templateObject$1 = _taggedTemplateLiteral([
          '\n  * {\n    box-sizing: border-box;\n  }\n\n  :host {\n    --lottie-player-toolbar-height: 35px;\n    --lottie-player-toolbar-background-color: transparent;\n    --lottie-player-toolbar-icon-color: #999;\n    --lottie-player-toolbar-icon-hover-color: #222;\n    --lottie-player-toolbar-icon-active-color: #555;\n    --lottie-player-seeker-track-color: #ccc;\n    --lottie-player-seeker-thumb-color: rgba(0, 107, 120, 0.8);\n    --lottie-player-seeker-display: block;\n\n    display: block;\n    width: 100%;\n    height: 100%;\n  }\n\n  .main {\n    display: flex;\n    flex-direction: column;\n    height: 100%;\n    width: 100%;\n  }\n\n  .animation {\n    width: 100%;\n    height: 100%;\n    display: flex;\n  }\n  .animation.controls {\n    height: calc(100% - 35px);\n  }\n\n  .toolbar {\n    display: flex;\n    align-items: center;\n    justify-items: center;\n    background-color: var(--lottie-player-toolbar-background-color);\n    margin: 0 5px;\n    height: 35px;\n  }\n\n  .toolbar button {\n    cursor: pointer;\n    fill: var(--lottie-player-toolbar-icon-color);\n    display: flex;\n    background: none;\n    border: 0;\n    padding: 0;\n    outline: none;\n    height: 100%;\n  }\n\n  .toolbar button:hover {\n    fill: var(--lottie-player-toolbar-icon-hover-color);\n  }\n\n  .toolbar button.active {\n    fill: var(--lottie-player-toolbar-icon-active-color);\n  }\n\n  .toolbar button.active:hover {\n    fill: var(--lottie-player-toolbar-icon-hover-color);\n  }\n\n  .toolbar button:focus {\n    outline: 1px dotted var(--lottie-player-toolbar-icon-active-color);\n  }\n\n  .toolbar button svg {\n  }\n\n  .toolbar button.disabled svg {\n    display: none;\n  }\n\n  .seeker {\n    -webkit-appearance: none;\n    width: 95%;\n    outline: none;\n    background-color: var(--lottie-player-toolbar-background-color);\n    display: var(--lottie-player-seeker-display);\n  }\n\n  .seeker::-webkit-slider-runnable-track {\n    width: 100%;\n    height: 5px;\n    cursor: pointer;\n    background: var(--lottie-player-seeker-track-color);\n    border-radius: 3px;\n  }\n  .seeker::-webkit-slider-thumb {\n    height: 15px;\n    width: 15px;\n    border-radius: 50%;\n    background: var(--lottie-player-seeker-thumb-color);\n    cursor: pointer;\n    -webkit-appearance: none;\n    margin-top: -5px;\n  }\n  .seeker:focus::-webkit-slider-runnable-track {\n    background: #999;\n  }\n  .seeker::-moz-range-track {\n    width: 100%;\n    height: 5px;\n    cursor: pointer;\n    background: var(--lottie-player-seeker-track-color);\n    border-radius: 3px;\n  }\n  .seeker::-moz-range-thumb {\n    height: 15px;\n    width: 15px;\n    border-radius: 50%;\n    background: var(--lottie-player-seeker-thumb-color);\n    cursor: pointer;\n  }\n  .seeker::-ms-track {\n    width: 100%;\n    height: 5px;\n    cursor: pointer;\n    background: transparent;\n    border-color: transparent;\n    color: transparent;\n  }\n  .seeker::-ms-fill-lower {\n    background: var(--lottie-player-seeker-track-color);\n    border-radius: 3px;\n  }\n  .seeker::-ms-fill-upper {\n    background: var(--lottie-player-seeker-track-color);\n    border-radius: 3px;\n  }\n  .seeker::-ms-thumb {\n    border: 0;\n    height: 15px;\n    width: 15px;\n    border-radius: 50%;\n    background: var(--lottie-player-seeker-thumb-color);\n    cursor: pointer;\n  }\n  .seeker:focus::-ms-fill-lower {\n    background: var(--lottie-player-seeker-track-color);\n  }\n  .seeker:focus::-ms-fill-upper {\n    background: var(--lottie-player-seeker-track-color);\n  }\n\n  .error {\n    display: flex;\n    justify-content: center;\n    height: 100%;\n    align-items: center;\n  }\n',
        ])),
    ),
    LOTTIE_PLAYER_VERSION = '2.0.2',
    LOTTIE_WEB_VERSION = '^5.10.0';
  function parseSrc(t) {
    if ('object' == typeof t) return t;
    try {
      return JSON.parse(t);
    } catch (e) {
      return new URL(t, window.location.href).toString();
    }
  }
  function isLottie(t) {
    return ['v', 'ip', 'op', 'layers', 'fr', 'w', 'h'].every((e) => Object.prototype.hasOwnProperty.call(t, e));
  }
  function fromURL(t) {
    return _fromURL.apply(this, arguments);
  }
  function _fromURL() {
    return (_fromURL = _asyncToGenerator(function* (t) {
      if ('string' != typeof t) throw Error('The url value must be a string');
      try {
        var e;
        e = yield (yield fetch(new URL(t).toString())).json();
      } catch (i) {
        throw Error('An error occurred while trying to load the Lottie file from URL');
      }
      return e;
    })).apply(this, arguments);
  }
  (exports.PlayerState = void 0),
    ((PlayerState = exports.PlayerState || (exports.PlayerState = {})).Destroyed = 'destroyed'),
    (PlayerState.Error = 'error'),
    (PlayerState.Frozen = 'frozen'),
    (PlayerState.Loading = 'loading'),
    (PlayerState.Paused = 'paused'),
    (PlayerState.Playing = 'playing'),
    (PlayerState.Stopped = 'stopped'),
    (exports.PlayMode = void 0),
    ((PlayMode = exports.PlayMode || (exports.PlayMode = {})).Bounce = 'bounce'),
    (PlayMode.Normal = 'normal'),
    (exports.PlayerEvents = void 0),
    ((PlayerEvents = exports.PlayerEvents || (exports.PlayerEvents = {})).Complete = 'complete'),
    (PlayerEvents.Destroyed = 'destroyed'),
    (PlayerEvents.Error = 'error'),
    (PlayerEvents.Frame = 'frame'),
    (PlayerEvents.Freeze = 'freeze'),
    (PlayerEvents.Load = 'load'),
    (PlayerEvents.Loop = 'loop'),
    (PlayerEvents.Pause = 'pause'),
    (PlayerEvents.Play = 'play'),
    (PlayerEvents.Ready = 'ready'),
    (PlayerEvents.Rendered = 'rendered'),
    (PlayerEvents.Stop = 'stop'),
    (exports.LottiePlayer = class extends s {
      constructor() {
        super(...arguments),
          (this.autoplay = !1),
          (this.background = 'transparent'),
          (this.controls = !1),
          (this.currentState = exports.PlayerState.Loading),
          (this.description = 'Lottie animation'),
          (this.direction = 1),
          (this.disableCheck = !1),
          (this.disableShadowDOM = !1),
          (this.hover = !1),
          (this.intermission = 1),
          (this.loop = !1),
          (this.mode = exports.PlayMode.Normal),
          (this.preserveAspectRatio = 'xMidYMid meet'),
          (this.renderer = 'svg'),
          (this.speed = 1),
          (this._io = void 0),
          (this._counter = 1);
      }
      load(t) {
        var e = this;
        return _asyncToGenerator(function* () {
          var i = {
            container: e.container,
            loop: !1,
            autoplay: !1,
            renderer: e.renderer,
            rendererSettings: Object.assign(
              {
                preserveAspectRatio: e.preserveAspectRatio,
                clearCanvas: !1,
                progressiveLoad: !0,
                hideOnTransparent: !0,
              },
              e.viewBoxSize && { viewBoxSize: e.viewBoxSize },
            ),
          };
          try {
            var s = parseSrc(t),
              n = {},
              a = 'string' == typeof s ? 'path' : 'animationData';
            e._lottie && e._lottie.destroy(),
              e.webworkers && lottie$1.exports.useWebWorker(!0),
              (e._lottie = lottie$1.exports.loadAnimation(Object.assign(Object.assign({}, i), { [a]: s }))),
              e._attachEventListeners(),
              e.disableCheck ||
                ('path' === a ? ((n = yield fromURL(s)), (a = 'animationData')) : (n = s),
                isLottie(n) ||
                  ((e.currentState = exports.PlayerState.Error),
                  e.dispatchEvent(new CustomEvent(exports.PlayerEvents.Error))));
          } catch (o) {
            (e.currentState = exports.PlayerState.Error), e.dispatchEvent(new CustomEvent(exports.PlayerEvents.Error));
          }
        })();
      }
      getLottie() {
        return this._lottie;
      }
      getVersions() {
        return { lottieWebVersion: LOTTIE_WEB_VERSION, lottiePlayerVersion: LOTTIE_PLAYER_VERSION };
      }
      play() {
        this._lottie &&
          (this._lottie.play(),
          (this.currentState = exports.PlayerState.Playing),
          this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Play)));
      }
      pause() {
        this._lottie &&
          (this._lottie.pause(),
          (this.currentState = exports.PlayerState.Paused),
          this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Pause)));
      }
      stop() {
        this._lottie &&
          ((this._counter = 1),
          this._lottie.stop(),
          (this.currentState = exports.PlayerState.Stopped),
          this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Stop)));
      }
      destroy() {
        this._lottie &&
          (this._lottie.destroy(),
          (this._lottie = null),
          (this.currentState = exports.PlayerState.Destroyed),
          this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Destroyed)),
          this.remove());
      }
      seek(t) {
        if (this._lottie) {
          var e = /^(\d+)(%?)$/.exec(t.toString());
          if (e) {
            var i = '%' === e[2] ? (this._lottie.totalFrames * Number(e[1])) / 100 : Number(e[1]);
            (this.seeker = i),
              this.currentState === exports.PlayerState.Playing
                ? this._lottie.goToAndPlay(i, !0)
                : (this._lottie.goToAndStop(i, !0), this._lottie.pause());
          }
        }
      }
      snapshot() {
        var t = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
        if (this.shadowRoot) {
          var e = this.shadowRoot.querySelector('.animation svg'),
            i = new XMLSerializer().serializeToString(e);
          if (t) {
            var s = document.createElement('a');
            (s.href = 'data:image/svg+xml;charset=utf-8,'.concat(encodeURIComponent(i))),
              (s.download = 'download_'.concat(this.seeker, '.svg')),
              document.body.appendChild(s),
              s.click(),
              document.body.removeChild(s);
          }
          return i;
        }
      }
      setSpeed() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
        this._lottie && this._lottie.setSpeed(t);
      }
      setDirection(t) {
        this._lottie && this._lottie.setDirection(t);
      }
      setLooping(t) {
        this._lottie && ((this.loop = t), (this._lottie.loop = t));
      }
      togglePlay() {
        return this.currentState === exports.PlayerState.Playing ? this.pause() : this.play();
      }
      toggleLooping() {
        this.setLooping(!this.loop);
      }
      resize() {
        this._lottie && this._lottie.resize();
      }
      static get styles() {
        return styles;
      }
      disconnectedCallback() {
        this.isConnected ||
          (this._io && (this._io.disconnect(), (this._io = void 0)),
          document.removeEventListener('visibilitychange', () => this._onVisibilityChange()),
          this.destroy());
      }
      render() {
        var t = this.controls ? 'main controls' : 'main',
          e = this.controls ? 'animation controls' : 'animation';
        return $(
          _templateObject ||
            (_templateObject = _taggedTemplateLiteral([
              ' <div\n      id="animation-container"\n      class=',
              '\n      lang="en"\n      aria-label=',
              '\n      role="img"\n    >\n      <div\n        id="animation"\n        class=',
              '\n        style="background:',
              ';"\n      >\n        ',
              '\n      </div>\n      ',
              '\n    </div>',
            ])),
          t,
          this.description,
          e,
          this.background,
          this.currentState === exports.PlayerState.Error
            ? $(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(['<div class="error">⚠️</div>'])))
            : void 0,
          this.controls && !this.disableShadowDOM ? this.renderControls() : void 0,
        );
      }
      createRenderRoot() {
        return (
          this.disableShadowDOM && (this.style.display = 'block'),
          this.disableShadowDOM ? this : super.createRenderRoot()
        );
      }
      firstUpdated() {
        'IntersectionObserver' in window &&
          ((this._io = new IntersectionObserver((t) => {
            t[0].isIntersecting
              ? this.currentState === exports.PlayerState.Frozen && this.play()
              : this.currentState === exports.PlayerState.Playing && this.freeze();
          })),
          this._io.observe(this.container)),
          void 0 !== document.hidden && document.addEventListener('visibilitychange', () => this._onVisibilityChange()),
          this.src && this.load(this.src),
          this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Rendered));
      }
      renderControls() {
        var t = this.currentState === exports.PlayerState.Playing,
          e = this.currentState === exports.PlayerState.Paused,
          i = this.currentState === exports.PlayerState.Stopped;
        return $(
          _templateObject3 ||
            (_templateObject3 = _taggedTemplateLiteral([
              '\n      <div\n        id="lottie-controls"\n        aria-label="lottie-animation-controls"\n        class="toolbar"\n      >\n        <button\n          id="lottie-play-button"\n          @click=',
              '\n          class=',
              '\n          style="align-items:center;"\n          tabindex="0"\n          aria-label="play-pause"\n        >\n          ',
              '\n        </button>\n        <button\n          id="lottie-stop-button"\n          @click=',
              '\n          class=',
              '\n          style="align-items:center;"\n          tabindex="0"\n          aria-label="stop"\n        >\n          <svg width="24" height="24" aria-hidden="true" focusable="false">\n            <path d="M6 6h12v12H6V6z" />\n          </svg>\n        </button>\n        <input\n          id="lottie-seeker-input"\n          class="seeker"\n          type="range"\n          min="0"\n          step="1"\n          max="100"\n          .value=',
              '\n          @input=',
              '\n          @mousedown=',
              '\n          @mouseup=',
              '\n          aria-valuemin="1"\n          aria-valuemax="100"\n          role="slider"\n          aria-valuenow=',
              '\n          tabindex="0"\n          aria-label="lottie-seek-input"\n        />\n        <button\n          id="lottie-loop-toggle"\n          @click=',
              '\n          class=',
              '\n          style="align-items:center;"\n          tabindex="0"\n          aria-label="loop-toggle"\n        >\n          <svg width="24" height="24" aria-hidden="true" focusable="false">\n            <path\n              d="M17.016 17.016v-4.031h1.969v6h-12v3l-3.984-3.984 3.984-3.984v3h10.031zM6.984 6.984v4.031H5.015v-6h12v-3l3.984 3.984-3.984 3.984v-3H6.984z"\n            />\n          </svg>\n        </button>\n      </div>\n    ',
            ])),
          this.togglePlay,
          t || e ? 'active' : '',
          $(
            t
              ? _templateObject4 ||
                  (_templateObject4 = _taggedTemplateLiteral([
                    '<svg\n                width="24"\n                height="24"\n                aria-hidden="true"\n                focusable="false"\n              >\n                <path\n                  d="M14.016 5.016H18v13.969h-3.984V5.016zM6 18.984V5.015h3.984v13.969H6z"\n                />\n              </svg>',
                  ]))
              : _templateObject5 ||
                  (_templateObject5 = _taggedTemplateLiteral([
                    '<svg\n                width="24"\n                height="24"\n                aria-hidden="true"\n                focusable="false"\n              >\n                <path d="M8.016 5.016L18.985 12 8.016 18.984V5.015z" />\n              </svg>',
                  ])),
          ),
          this.stop,
          i ? 'active' : '',
          this.seeker,
          this._handleSeekChange,
          () => {
            (this._prevState = this.currentState), this.freeze();
          },
          () => {
            this._prevState === exports.PlayerState.Playing && this.play();
          },
          this.seeker,
          this.toggleLooping,
          this.loop ? 'active' : '',
        );
      }
      _onVisibilityChange() {
        !0 === document.hidden && this.currentState === exports.PlayerState.Playing
          ? this.freeze()
          : this.currentState === exports.PlayerState.Frozen && this.play();
      }
      _handleSeekChange(t) {
        if (this._lottie && !isNaN(t.target.value)) {
          var e = (t.target.value / 100) * this._lottie.totalFrames;
          this.seek(e);
        }
      }
      _attachEventListeners() {
        this._lottie.addEventListener('enterFrame', () => {
          (this.seeker = (this._lottie.currentFrame / this._lottie.totalFrames) * 100),
            this.dispatchEvent(
              new CustomEvent(exports.PlayerEvents.Frame, {
                detail: { frame: this._lottie.currentFrame, seeker: this.seeker },
              }),
            );
        }),
          this._lottie.addEventListener('complete', () => {
            this.currentState === exports.PlayerState.Playing
              ? ((!!this.loop && (!this.count || !(this._counter >= this.count))) ||
                  (this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Complete)),
                  this.mode === exports.PlayMode.Bounce && 0 !== this._lottie.currentFrame)) &&
                (this.mode === exports.PlayMode.Bounce
                  ? (this.count && (this._counter += 0.5),
                    setTimeout(() => {
                      this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Loop)),
                        this.currentState === exports.PlayerState.Playing &&
                          (this._lottie.setDirection(-1 * this._lottie.playDirection), this._lottie.play());
                    }, this.intermission))
                  : (this.count && (this._counter += 1),
                    window.setTimeout(() => {
                      this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Loop)),
                        this.currentState === exports.PlayerState.Playing &&
                          (-1 === this.direction
                            ? (this.seek('99%'), this.play())
                            : (this._lottie.stop(), this._lottie.play()));
                    }, this.intermission)))
              : this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Complete));
          }),
          this._lottie.addEventListener('DOMLoaded', () => {
            this.setSpeed(this.speed),
              this.setDirection(this.direction),
              this.autoplay && (-1 === this.direction && this.seek('100%'), this.play()),
              this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Ready));
          }),
          this._lottie.addEventListener('data_ready', () => {
            this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Load));
          }),
          this._lottie.addEventListener('data_failed', () => {
            (this.currentState = exports.PlayerState.Error),
              this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Error));
          }),
          this.container.addEventListener('mouseenter', () => {
            this.hover && this.currentState !== exports.PlayerState.Playing && this.play();
          }),
          this.container.addEventListener('mouseleave', () => {
            this.hover && this.currentState === exports.PlayerState.Playing && this.stop();
          });
      }
      freeze() {
        this._lottie &&
          (this._lottie.pause(),
          (this.currentState = exports.PlayerState.Frozen),
          this.dispatchEvent(new CustomEvent(exports.PlayerEvents.Freeze)));
      }
    }),
    __decorate([e$5({ type: Boolean })], exports.LottiePlayer.prototype, 'autoplay', void 0),
    __decorate([e$5({ type: String, reflect: !0 })], exports.LottiePlayer.prototype, 'background', void 0),
    __decorate([e$5({ type: Boolean })], exports.LottiePlayer.prototype, 'controls', void 0),
    __decorate([e$5({ type: Number })], exports.LottiePlayer.prototype, 'count', void 0),
    __decorate([e$5({ type: String })], exports.LottiePlayer.prototype, 'currentState', void 0),
    __decorate([e$5({ type: String })], exports.LottiePlayer.prototype, 'description', void 0),
    __decorate([e$5({ type: Number })], exports.LottiePlayer.prototype, 'direction', void 0),
    __decorate([e$5({ type: Boolean })], exports.LottiePlayer.prototype, 'disableCheck', void 0),
    __decorate([e$5({ type: Boolean })], exports.LottiePlayer.prototype, 'disableShadowDOM', void 0),
    __decorate([e$5({ type: Boolean })], exports.LottiePlayer.prototype, 'hover', void 0),
    __decorate([e$5()], exports.LottiePlayer.prototype, 'intermission', void 0),
    __decorate([e$5({ type: Boolean, reflect: !0 })], exports.LottiePlayer.prototype, 'loop', void 0),
    __decorate([e$5()], exports.LottiePlayer.prototype, 'mode', void 0),
    __decorate([e$5({ type: String })], exports.LottiePlayer.prototype, 'preserveAspectRatio', void 0),
    __decorate([e$5({ type: String })], exports.LottiePlayer.prototype, 'renderer', void 0),
    __decorate([e$5({ type: String })], exports.LottiePlayer.prototype, 'viewBoxSize', void 0),
    __decorate([e$5()], exports.LottiePlayer.prototype, 'seeker', void 0),
    __decorate([e$5({ type: Number })], exports.LottiePlayer.prototype, 'speed', void 0),
    __decorate([e$5({ type: String })], exports.LottiePlayer.prototype, 'src', void 0),
    __decorate([e$5({ type: Boolean })], exports.LottiePlayer.prototype, 'webworkers', void 0),
    __decorate([i('.animation')], exports.LottiePlayer.prototype, 'container', void 0),
    (exports.LottiePlayer = __decorate([n$1('lottie-player')], exports.LottiePlayer)),
    (exports.parseSrc = parseSrc),
    Object.defineProperty(exports, '__esModule', { value: !0 });
});
