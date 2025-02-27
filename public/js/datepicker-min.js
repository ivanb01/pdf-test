(() => {
  'use strict';
  var e = {};
  function t(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function i(e) {
    return e[e.length - 1];
  }
  function a(e, ...t) {
    return (
      t.forEach((t) => {
        !e.includes(t) && e.push(t);
      }),
      e
    );
  }
  function r(e, t) {
    return e ? e.split(t) : [];
  }
  function s(e, t, i) {
    return (void 0 === t || e >= t) && (void 0 === i || e <= i);
  }
  function n(e, t, i) {
    return e < t ? t : e > i ? i : e;
  }
  function d(e, t, i = {}, a = 0, r = '') {
    let s = Object.keys(i).reduce((e, t) => {
      let r = i[t];
      return 'function' == typeof r && (r = r(a)), `${e} ${t}="${r}"`;
    }, e);
    r += `<${s}></${e}>`;
    let n = a + 1;
    return n < t ? d(e, t, i, n, r) : r;
  }
  function l(e) {
    return e.replace(/>\s+/g, '>').replace(/\s+</, '<');
  }
  function o(e) {
    return new Date(e).setHours(0, 0, 0, 0);
  }
  function h() {
    return new Date().setHours(0, 0, 0, 0);
  }
  function c(...e) {
    switch (e.length) {
      case 0:
        return h();
      case 1:
        return o(e[0]);
    }
    let t = new Date(0);
    return t.setFullYear(...e), t.setHours(0, 0, 0, 0);
  }
  function u(e, t) {
    let i = new Date(e);
    return i.setDate(i.getDate() + t);
  }
  function g(e, t) {
    return u(e, 7 * t);
  }
  function $(e, t) {
    let i = new Date(e),
      a = i.getMonth() + t,
      r = a % 12;
    r < 0 && (r += 12);
    let s = i.setMonth(a);
    return i.getMonth() !== r ? i.setDate(0) : s;
  }
  function f(e, t) {
    let i = new Date(e),
      a = i.getMonth(),
      r = i.setFullYear(i.getFullYear() + t);
    return 1 === a && 2 === i.getMonth() ? i.setDate(0) : r;
  }
  function p(e, t) {
    return (e - t + 7) % 7;
  }
  function b(e, t, i = 0) {
    let a = new Date(e).getDay();
    return u(e, p(t, i) - p(a, i));
  }
  function y(e) {
    let t = b(e, 4, 1),
      i = b(new Date(t).setMonth(0, 4), 4, 1);
    return Math.round((t - i) / 6048e5) + 1;
  }
  function m(e, t) {
    let i = new Date(e).getFullYear();
    return Math.floor(i / t) * t;
  }
  let k = /dd?|DD?|mm?|MM?|yy?(?:yy)?/,
    w = /[\s!-/:-@[-`{-~年月日]+/,
    v = {},
    x = {
      y: (e, t) => new Date(e).setFullYear(parseInt(t, 10)),
      m(e, t, i) {
        let a = new Date(e),
          r = parseInt(t, 10) - 1;
        if (isNaN(r)) {
          if (!t) return NaN;
          let s = t.toLowerCase(),
            n = (e) => e.toLowerCase().startsWith(s);
          if (((r = i.monthsShort.findIndex(n)) < 0 && (r = i.months.findIndex(n)), r < 0)) return NaN;
        }
        return a.setMonth(r), a.getMonth() !== D(r) ? a.setDate(0) : a.getTime();
      },
      d: (e, t) => new Date(e).setDate(parseInt(t, 10)),
    },
    _ = {
      d: (e) => e.getDate(),
      dd: (e) => M(e.getDate(), 2),
      D: (e, t) => t.daysShort[e.getDay()],
      DD: (e, t) => t.days[e.getDay()],
      m: (e) => e.getMonth() + 1,
      mm: (e) => M(e.getMonth() + 1, 2),
      M: (e, t) => t.monthsShort[e.getMonth()],
      MM: (e, t) => t.months[e.getMonth()],
      y: (e) => e.getFullYear(),
      yy: (e) => M(e.getFullYear(), 2).slice(-2),
      yyyy: (e) => M(e.getFullYear(), 4),
    };
  function D(e) {
    return e > -1 ? e % 12 : D(e + 12);
  }
  function M(e, t) {
    return e.toString().padStart(t, '0');
  }
  function S(e) {
    if ('string' != typeof e) throw Error('Invalid date format.');
    if (e in v) return v[e];
    let t = e.split(k),
      a = e.match(RegExp(k, 'g'));
    if (0 === t.length || !a) throw Error('Invalid date format.');
    let r = a.map((e) => _[e]),
      s = Object.keys(x).reduce((e, t) => {
        let i = a.find((e) => 'D' !== e[0] && e[0].toLowerCase() === t);
        return i && e.push(t), e;
      }, []);
    return (v[e] = {
      parser(e, t) {
        let i = e.split(w).reduce((e, t, i) => {
          if (t.length > 0 && a[i]) {
            let r = a[i][0];
            'M' === r ? (e.m = t) : 'D' !== r && (e[r] = t);
          }
          return e;
        }, {});
        return s.reduce((e, a) => {
          let r = x[a](e, i[a], t);
          return isNaN(r) ? e : r;
        }, h());
      },
      formatter(e, a) {
        let s;
        return r.reduce((i, r, s) => (i += `${t[s]}${r(e, a)}`), '') + i(t);
      },
    });
  }
  function C(e, t, i) {
    if (e instanceof Date || 'number' == typeof e) {
      let a = o(e);
      return isNaN(a) ? void 0 : a;
    }
    if (e) {
      if ('today' === e) return h();
      if (t && t.toValue) {
        let r = t.toValue(e, t, i);
        return isNaN(r) ? void 0 : o(r);
      }
      return S(t).parser(e, i);
    }
  }
  function O(e, t, i) {
    if (isNaN(e) || (!e && 0 !== e)) return '';
    let a = 'number' == typeof e ? new Date(e) : e;
    return t.toDisplay ? t.toDisplay(a, t, i) : S(t).formatter(a, i);
  }
  let E = new WeakMap(),
    { addEventListener: F, removeEventListener: L } = EventTarget.prototype;
  function V(e, t) {
    let i = E.get(e);
    i || ((i = []), E.set(e, i)),
      t.forEach((e) => {
        F.call(...e), i.push(e);
      });
  }
  function B(e) {
    let t = E.get(e);
    t &&
      (t.forEach((e) => {
        L.call(...e);
      }),
      E.delete(e));
  }
  if (!Event.prototype.composedPath) {
    let A = (e, t = []) => {
      t.push(e);
      let i;
      return (
        e.parentNode ? (i = e.parentNode) : e.host ? (i = e.host) : e.defaultView && (i = e.defaultView),
        i ? A(i, t) : t
      );
    };
    Event.prototype.composedPath = function () {
      return A(this.target);
    };
  }
  function Y(e, t, i, a = 0) {
    let r = e[a];
    return t(r) ? r : r !== i && r.parentElement ? Y(e, t, i, a + 1) : void 0;
  }
  function W(e, t) {
    return Y(e.composedPath(), 'function' == typeof t ? t : (e) => e.matches(t), e.currentTarget);
  }
  let N = {
      en: {
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        months: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        today: 'Today',
        clear: 'Clear',
        titleFormat: 'MM y',
      },
    },
    H = {
      autohide: !1,
      beforeShowDay: null,
      beforeShowDecade: null,
      beforeShowMonth: null,
      beforeShowYear: null,
      calendarWeeks: !1,
      clearBtn: !1,
      dateDelimiter: ',',
      datesDisabled: [],
      daysOfWeekDisabled: [],
      daysOfWeekHighlighted: [],
      defaultViewDate: void 0,
      disableTouchKeyboard: !1,
      format: 'mm/dd/yyyy',
      language: 'en',
      maxDate: null,
      maxNumberOfDates: 1,
      maxView: 3,
      minDate: null,
      nextArrow:
        '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>',
      orientation: 'auto',
      pickLevel: 0,
      prevArrow:
        '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>',
      showDaysOfWeek: !0,
      showOnClick: !0,
      showOnFocus: !0,
      startView: 0,
      title: '',
      todayBtn: !1,
      todayBtnMode: 0,
      todayHighlight: !1,
      updateOnBlur: !0,
      weekStart: 0,
    },
    K = H,
    T = document.createRange();
  function P(e) {
    return T.createContextualFragment(e);
  }
  function R(e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }
  function q(e) {
    'none' !== e.style.display &&
      (e.style.display && (e.dataset.styleDisplay = e.style.display), (e.style.display = 'none'));
  }
  function I(e) {
    'none' === e.style.display &&
      (e.dataset.styleDisplay
        ? ((e.style.display = e.dataset.styleDisplay), delete e.dataset.styleDisplay)
        : (e.style.display = ''));
  }
  function J(e) {
    e.firstChild && (e.removeChild(e.firstChild), J(e));
  }
  function z(e, t) {
    J(e),
      t instanceof DocumentFragment
        ? e.appendChild(t)
        : 'string' == typeof t
          ? e.appendChild(P(t))
          : 'function' == typeof t.forEach &&
            t.forEach((t) => {
              e.appendChild(t);
            });
  }
  let { language: j, format: U, weekStart: X } = K;
  function G(e, t) {
    return e.length < 6 && t >= 0 && t < 7 ? a(e, t) : e;
  }
  function Q(e) {
    return (e + 6) % 7;
  }
  function Z(e, t, i, a) {
    let r = C(e, t, i);
    return void 0 !== r ? r : a;
  }
  function ee(e, t, i = 3) {
    let a = parseInt(e, 10);
    return a >= 0 && a <= i ? a : t;
  }
  function et(e, i) {
    let r = Object.assign({}, e),
      s = {},
      n = i.constructor.locales,
      {
        format: d,
        language: l,
        locale: o,
        maxDate: h,
        maxView: u,
        minDate: g,
        pickLevel: $,
        startView: f,
        weekStart: p,
      } = i.config || {};
    if (r.language) {
      let b;
      if (
        (r.language !== l &&
          (n[r.language] ? (b = r.language) : void 0 === n[(b = r.language.split('-')[0])] && (b = !1)),
        delete r.language,
        b)
      ) {
        l = s.language = b;
        let y = o || n[j];
        (o = Object.assign({ format: U, weekStart: X }, n[j])),
          l !== j && Object.assign(o, n[l]),
          (s.locale = o),
          d === y.format && (d = s.format = o.format),
          p === y.weekStart && ((p = s.weekStart = o.weekStart), (s.weekEnd = Q(o.weekStart)));
      }
    }
    if (r.format) {
      let m = 'function' == typeof r.format.toDisplay,
        w = 'function' == typeof r.format.toValue,
        v = k.test(r.format);
      ((m && w) || v) && (d = s.format = r.format), delete r.format;
    }
    let x = g,
      _ = h;
    if (
      (void 0 !== r.minDate && ((x = null === r.minDate ? c(0, 0, 1) : Z(r.minDate, d, o, x)), delete r.minDate),
      void 0 !== r.maxDate && ((_ = null === r.maxDate ? void 0 : Z(r.maxDate, d, o, _)), delete r.maxDate),
      _ < x
        ? ((g = s.minDate = _), (h = s.maxDate = x))
        : (g !== x && (g = s.minDate = x), h !== _ && (h = s.maxDate = _)),
      r.datesDisabled &&
        ((s.datesDisabled = r.datesDisabled.reduce((e, t) => {
          let i = C(t, d, o);
          return void 0 !== i ? a(e, i) : e;
        }, [])),
        delete r.datesDisabled),
      void 0 !== r.defaultViewDate)
    ) {
      let D = C(r.defaultViewDate, d, o);
      void 0 !== D && (s.defaultViewDate = D), delete r.defaultViewDate;
    }
    if (void 0 !== r.weekStart) {
      let M = Number(r.weekStart) % 7;
      isNaN(M) || ((p = s.weekStart = M), (s.weekEnd = Q(M))), delete r.weekStart;
    }
    if (
      (r.daysOfWeekDisabled &&
        ((s.daysOfWeekDisabled = r.daysOfWeekDisabled.reduce(G, [])), delete r.daysOfWeekDisabled),
      r.daysOfWeekHighlighted &&
        ((s.daysOfWeekHighlighted = r.daysOfWeekHighlighted.reduce(G, [])), delete r.daysOfWeekHighlighted),
      void 0 !== r.maxNumberOfDates)
    ) {
      let S = parseInt(r.maxNumberOfDates, 10);
      S >= 0 && ((s.maxNumberOfDates = S), (s.multidate = 1 !== S)), delete r.maxNumberOfDates;
    }
    r.dateDelimiter && ((s.dateDelimiter = String(r.dateDelimiter)), delete r.dateDelimiter);
    let O = $;
    void 0 !== r.pickLevel && ((O = ee(r.pickLevel, 2)), delete r.pickLevel), O !== $ && ($ = s.pickLevel = O);
    let E = u;
    void 0 !== r.maxView && ((E = ee(r.maxView, u)), delete r.maxView),
      (E = $ > E ? $ : E) !== u && (u = s.maxView = E);
    let F = f;
    if (
      (void 0 !== r.startView && ((F = ee(r.startView, F)), delete r.startView),
      F < $ ? (F = $) : F > u && (F = u),
      F !== f && (s.startView = F),
      r.prevArrow)
    ) {
      let L = P(r.prevArrow);
      L.childNodes.length > 0 && (s.prevArrow = L.childNodes), delete r.prevArrow;
    }
    if (r.nextArrow) {
      let V = P(r.nextArrow);
      V.childNodes.length > 0 && (s.nextArrow = V.childNodes), delete r.nextArrow;
    }
    if (
      (void 0 !== r.disableTouchKeyboard &&
        ((s.disableTouchKeyboard = 'ontouchstart' in document && !!r.disableTouchKeyboard),
        delete r.disableTouchKeyboard),
      r.orientation)
    ) {
      let B = r.orientation.toLowerCase().split(/\s+/g);
      (s.orientation = {
        x: B.find((e) => 'left' === e || 'right' === e) || 'auto',
        y: B.find((e) => 'top' === e || 'bottom' === e) || 'auto',
      }),
        delete r.orientation;
    }
    if (void 0 !== r.todayBtnMode) {
      switch (r.todayBtnMode) {
        case 0:
        case 1:
          s.todayBtnMode = r.todayBtnMode;
      }
      delete r.todayBtnMode;
    }
    return (
      Object.keys(r).forEach((e) => {
        void 0 !== r[e] && t(K, e) && (s[e] = r[e]);
      }),
      s
    );
  }
  let ei = l(`<div class="datepicker hidden">
  <div class="datepicker-picker inline-block rounded-lg bg-white dark:bg-gray-700 shadow-lg p-4">
    <div class="datepicker-header">
      <div class="datepicker-title bg-white dark:bg-gray-700 dark:text-white px-2 py-3 text-center font-semibold"></div>
      <div class="datepicker-controls flex justify-between mb-2">
        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 prev-btn"></button>
        <button type="button" class="text-sm rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 font-semibold py-2.5 px-5 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch"></button>
        <button type="button" class="bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white text-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-200 next-btn"></button>
      </div>
    </div>
    <div class="datepicker-main p-1"></div>
    <div class="datepicker-footer">
      <div class="datepicker-controls flex space-x-2 mt-2">
        <button type="button" class="%buttonClass% today-btn text-white bg-blue-700 dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>
        <button type="button" class="%buttonClass% clear-btn text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center w-1/2"></button>
      </div>
    </div>
  </div>
</div>`),
    ea = ei,
    er = l(`<div class="days">
  <div class="days-of-week grid grid-cols-7 mb-1">${d('span', 7, { class: 'dow block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm' })}</div>
  <div class="datepicker-grid w-64 grid grid-cols-7">${d('span', 42, { class: 'block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400' })}</div>
</div>`),
    es = er,
    en = l(`<div class="calendar-weeks">
  <div class="days-of-week flex"><span class="dow h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400"></span></div>
  <div class="weeks">${d('span', 6, { class: 'week block flex-1 leading-9 border-0 rounded-lg cursor-default text-center text-gray-900 font-semibold text-sm' })}</div>
</div>`),
    ed = en;
  class el {
    constructor(e, t) {
      Object.assign(this, t, {
        picker: e,
        element: P('<div class="datepicker-view flex"></div>').firstChild,
        selected: [],
      }),
        this.init(this.picker.datepicker.config);
    }
    init(e) {
      void 0 !== e.pickLevel && (this.isMinView = this.id === e.pickLevel),
        this.setOptions(e),
        this.updateFocus(),
        this.updateSelection();
    }
    performBeforeHook(e, t, i) {
      let r = this.beforeShow(new Date(i));
      switch (typeof r) {
        case 'boolean':
          r = { enabled: r };
          break;
        case 'string':
          r = { classes: r };
      }
      if (r) {
        if ((!1 === r.enabled && (e.classList.add('disabled'), a(this.disabled, t)), r.classes)) {
          let s = r.classes.split(/\s+/);
          e.classList.add(...s), s.includes('disabled') && a(this.disabled, t);
        }
        r.content && z(e, r.content);
      }
    }
  }
  class eo extends el {
    constructor(e) {
      super(e, { id: 0, name: 'days', cellClass: 'day' });
    }
    init(e, t = !0) {
      if (t) {
        let i = P(es).firstChild;
        (this.dow = i.firstChild), (this.grid = i.lastChild), this.element.appendChild(i);
      }
      super.init(e);
    }
    setOptions(e) {
      let i;
      if (
        (t(e, 'minDate') && (this.minDate = e.minDate),
        t(e, 'maxDate') && (this.maxDate = e.maxDate),
        e.datesDisabled && (this.datesDisabled = e.datesDisabled),
        e.daysOfWeekDisabled && ((this.daysOfWeekDisabled = e.daysOfWeekDisabled), (i = !0)),
        e.daysOfWeekHighlighted && (this.daysOfWeekHighlighted = e.daysOfWeekHighlighted),
        void 0 !== e.todayHighlight && (this.todayHighlight = e.todayHighlight),
        void 0 !== e.weekStart && ((this.weekStart = e.weekStart), (this.weekEnd = e.weekEnd), (i = !0)),
        e.locale)
      ) {
        let a = (this.locale = e.locale);
        (this.dayNames = a.daysMin), (this.switchLabelFormat = a.titleFormat), (i = !0);
      }
      if (
        (void 0 !== e.beforeShowDay &&
          (this.beforeShow = 'function' == typeof e.beforeShowDay ? e.beforeShowDay : void 0),
        void 0 !== e.calendarWeeks)
      ) {
        if (e.calendarWeeks && !this.calendarWeeks) {
          let r = P(ed).firstChild;
          (this.calendarWeeks = { element: r, dow: r.firstChild, weeks: r.lastChild }),
            this.element.insertBefore(r, this.element.firstChild);
        } else
          this.calendarWeeks &&
            !e.calendarWeeks &&
            (this.element.removeChild(this.calendarWeeks.element), (this.calendarWeeks = null));
      }
      void 0 !== e.showDaysOfWeek &&
        (e.showDaysOfWeek
          ? (I(this.dow), this.calendarWeeks && I(this.calendarWeeks.dow))
          : (q(this.dow), this.calendarWeeks && q(this.calendarWeeks.dow))),
        i &&
          Array.from(this.dow.children).forEach((e, t) => {
            let i = (this.weekStart + t) % 7;
            (e.textContent = this.dayNames[i]),
              (e.className = this.daysOfWeekDisabled.includes(i)
                ? 'dow disabled text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'dow text-center h-6 leading-6 text-sm font-medium text-gray-500 dark:text-gray-400');
          });
    }
    updateFocus() {
      let e = new Date(this.picker.viewDate),
        t = e.getFullYear(),
        i = e.getMonth(),
        a = c(t, i, 1),
        r = b(a, this.weekStart, this.weekStart);
      (this.first = a), (this.last = c(t, i + 1, 0)), (this.start = r), (this.focused = this.picker.viewDate);
    }
    updateSelection() {
      let { dates: e, rangepicker: t } = this.picker.datepicker;
      (this.selected = e), t && (this.range = t.dates);
    }
    render() {
      (this.today = this.todayHighlight ? h() : void 0), (this.disabled = [...this.datesDisabled]);
      let e = O(this.focused, this.switchLabelFormat, this.locale);
      if (
        (this.picker.setViewSwitchLabel(e),
        this.picker.setPrevBtnDisabled(this.first <= this.minDate),
        this.picker.setNextBtnDisabled(this.last >= this.maxDate),
        this.calendarWeeks)
      ) {
        let t = b(this.first, 1, 1);
        Array.from(this.calendarWeeks.weeks.children).forEach((e, i) => {
          e.textContent = y(g(t, i));
        });
      }
      Array.from(this.grid.children).forEach((e, t) => {
        let i = e.classList,
          r = u(this.start, t),
          s = new Date(r),
          n = s.getDay();
        if (
          ((e.className = `datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`),
          (e.dataset.date = r),
          (e.textContent = s.getDate()),
          r < this.first
            ? i.add('prev', 'text-gray-500', 'dark:text-white')
            : r > this.last && i.add('next', 'text-gray-500', 'dark:text-white'),
          this.today === r && i.add('today', 'bg-gray-100', 'dark:bg-gray-600', 'dark:bg-gray-600'),
          (r < this.minDate || r > this.maxDate || this.disabled.includes(r)) &&
            i.add('disabled', 'cursor-not-allowed'),
          this.daysOfWeekDisabled.includes(n) && (i.add('disabled', 'cursor-not-allowed'), a(this.disabled, r)),
          this.daysOfWeekHighlighted.includes(n) && i.add('highlighted'),
          this.range)
        ) {
          let [d, l] = this.range;
          r > d &&
            r < l &&
            (i.add('range', 'bg-gray-200', 'dark:bg-gray-600'), i.remove('rounded-lg', 'rounded-l-lg', 'rounded-r-lg')),
            r === d &&
              (i.add('range-start', 'bg-gray-100', 'dark:bg-gray-600', 'rounded-l-lg'),
              i.remove('rounded-lg', 'rounded-r-lg')),
            r === l &&
              (i.add('range-end', 'bg-gray-100', 'dark:bg-gray-600', 'rounded-r-lg'),
              i.remove('rounded-lg', 'rounded-l-lg'));
        }
        this.selected.includes(r) &&
          (i.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white'),
          i.remove('text-gray-900', 'text-gray-500', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600')),
          r === this.focused && i.add('focused'),
          this.beforeShow && this.performBeforeHook(e, r, r);
      });
    }
    refresh() {
      let [e, t] = this.range || [];
      this.grid.querySelectorAll('.range, .range-start, .range-end, .selected, .focused').forEach((e) => {
        e.classList.remove(
          'range',
          'range-start',
          'range-end',
          'selected',
          'bg-blue-700',
          'text-white',
          'dark:bg-blue-600',
          'dark:text-white',
          'focused',
          'bg-gray-100',
          'dark:bg-gray-600',
        ),
          e.classList.add('text-gray-900', 'rounded-lg', 'dark:text-white');
      }),
        Array.from(this.grid.children).forEach((i) => {
          let a = Number(i.dataset.date),
            r = i.classList;
          a > e && a < t && (r.add('range', 'bg-gray-200', 'dark:bg-gray-600'), r.remove('rounded-lg')),
            a === e &&
              (r.add('range-start', 'bg-gray-200', 'dark:bg-gray-600', 'rounded-l-lg'),
              r.remove('rounded-lg', 'rounded-r-lg')),
            a === t &&
              (r.add('range-end', 'bg-gray-200', 'dark:bg-gray-600', 'rounded-r-lg'),
              r.remove('rounded-lg', 'rounded-l-lg')),
            this.selected.includes(a) &&
              (r.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white'),
              r.remove('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600')),
            a === this.focused && r.add('focused', 'bg-gray-100', 'dark:bg-gray-600');
        });
    }
    refreshFocus() {
      let e = Math.round((this.focused - this.start) / 864e5);
      this.grid.querySelectorAll('.focused').forEach((e) => {
        e.classList.remove('focused', 'bg-gray-100', 'dark:bg-gray-600');
      }),
        this.grid.children[e].classList.add('focused', 'bg-gray-100', 'dark:bg-gray-600');
    }
  }
  function eh(e, t) {
    if (!e || !e[0] || !e[1]) return;
    let [[i, a], [r, s]] = e;
    if (!(i > t) && !(r < t)) return [i === t ? a : -1, r === t ? s : 12];
  }
  class ec extends el {
    constructor(e) {
      super(e, { id: 1, name: 'months', cellClass: 'month' });
    }
    init(e, t = !0) {
      t &&
        ((this.grid = this.element),
        this.element.classList.add('months', 'datepicker-grid', 'w-64', 'grid', 'grid-cols-4'),
        this.grid.appendChild(P(d('span', 12, { 'data-month': (e) => e })))),
        super.init(e);
    }
    setOptions(e) {
      if ((e.locale && (this.monthNames = e.locale.monthsShort), t(e, 'minDate'))) {
        if (void 0 === e.minDate) this.minYear = this.minMonth = this.minDate = void 0;
        else {
          let i = new Date(e.minDate);
          (this.minYear = i.getFullYear()), (this.minMonth = i.getMonth()), (this.minDate = i.setDate(1));
        }
      }
      if (t(e, 'maxDate')) {
        if (void 0 === e.maxDate) this.maxYear = this.maxMonth = this.maxDate = void 0;
        else {
          let a = new Date(e.maxDate);
          (this.maxYear = a.getFullYear()),
            (this.maxMonth = a.getMonth()),
            (this.maxDate = c(this.maxYear, this.maxMonth + 1, 0));
        }
      }
      void 0 !== e.beforeShowMonth &&
        (this.beforeShow = 'function' == typeof e.beforeShowMonth ? e.beforeShowMonth : void 0);
    }
    updateFocus() {
      let e = new Date(this.picker.viewDate);
      (this.year = e.getFullYear()), (this.focused = e.getMonth());
    }
    updateSelection() {
      let { dates: e, rangepicker: t } = this.picker.datepicker;
      (this.selected = e.reduce((e, t) => {
        let i = new Date(t),
          r = i.getFullYear(),
          s = i.getMonth();
        return void 0 === e[r] ? (e[r] = [s]) : a(e[r], s), e;
      }, {})),
        t &&
          t.dates &&
          (this.range = t.dates.map((e) => {
            let t = new Date(e);
            return isNaN(t) ? void 0 : [t.getFullYear(), t.getMonth()];
          }));
    }
    render() {
      (this.disabled = []),
        this.picker.setViewSwitchLabel(this.year),
        this.picker.setPrevBtnDisabled(this.year <= this.minYear),
        this.picker.setNextBtnDisabled(this.year >= this.maxYear);
      let e = this.selected[this.year] || [],
        t = this.year < this.minYear || this.year > this.maxYear,
        i = this.year === this.minYear,
        a = this.year === this.maxYear,
        r = eh(this.range, this.year);
      Array.from(this.grid.children).forEach((s, n) => {
        let d = s.classList,
          l = c(this.year, n, 1);
        if (
          ((s.className = `datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`),
          this.isMinView && (s.dataset.date = l),
          (s.textContent = this.monthNames[n]),
          (t || (i && n < this.minMonth) || (a && n > this.maxMonth)) && d.add('disabled'),
          r)
        ) {
          let [o, h] = r;
          n > o && n < h && d.add('range'), n === o && d.add('range-start'), n === h && d.add('range-end');
        }
        e.includes(n) &&
          (d.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white'),
          d.remove('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600')),
          n === this.focused && d.add('focused', 'bg-gray-100', 'dark:bg-gray-600'),
          this.beforeShow && this.performBeforeHook(s, n, l);
      });
    }
    refresh() {
      let e = this.selected[this.year] || [],
        [t, i] = eh(this.range, this.year) || [];
      this.grid.querySelectorAll('.range, .range-start, .range-end, .selected, .focused').forEach((e) => {
        e.classList.remove(
          'range',
          'range-start',
          'range-end',
          'selected',
          'bg-blue-700',
          'dark:bg-blue-600',
          'dark:text-white',
          'text-white',
          'focused',
          'bg-gray-100',
          'dark:bg-gray-600',
        ),
          e.classList.add('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600');
      }),
        Array.from(this.grid.children).forEach((a, r) => {
          let s = a.classList;
          r > t && r < i && s.add('range'),
            r === t && s.add('range-start'),
            r === i && s.add('range-end'),
            e.includes(r) &&
              (s.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white'),
              s.remove('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600')),
            r === this.focused && s.add('focused', 'bg-gray-100', 'dark:bg-gray-600');
        });
    }
    refreshFocus() {
      this.grid.querySelectorAll('.focused').forEach((e) => {
        e.classList.remove('focused', 'bg-gray-100');
      }),
        this.grid.children[this.focused].classList.add('focused', 'bg-gray-100', 'dark:bg-gray-600');
    }
  }
  function eu(e) {
    return [...e].reduce((e, t, i) => (e += i ? t : t.toUpperCase()), '');
  }
  class eg extends el {
    constructor(e, t) {
      super(e, t);
    }
    init(e, t = !0) {
      t &&
        ((this.navStep = 10 * this.step),
        (this.beforeShowOption = `beforeShow${eu(this.cellClass)}`),
        (this.grid = this.element),
        this.element.classList.add(this.name, 'datepicker-grid', 'w-64', 'grid', 'grid-cols-4'),
        this.grid.appendChild(P(d('span', 12)))),
        super.init(e);
    }
    setOptions(e) {
      if (
        (t(e, 'minDate') &&
          (void 0 === e.minDate
            ? (this.minYear = this.minDate = void 0)
            : ((this.minYear = m(e.minDate, this.step)), (this.minDate = c(this.minYear, 0, 1)))),
        t(e, 'maxDate') &&
          (void 0 === e.maxDate
            ? (this.maxYear = this.maxDate = void 0)
            : ((this.maxYear = m(e.maxDate, this.step)), (this.maxDate = c(this.maxYear, 11, 31)))),
        void 0 !== e[this.beforeShowOption])
      ) {
        let i = e[this.beforeShowOption];
        this.beforeShow = 'function' == typeof i ? i : void 0;
      }
    }
    updateFocus() {
      let e = new Date(this.picker.viewDate),
        t = m(e, this.navStep),
        i = t + 9 * this.step;
      (this.first = t), (this.last = i), (this.start = t - this.step), (this.focused = m(e, this.step));
    }
    updateSelection() {
      let { dates: e, rangepicker: t } = this.picker.datepicker;
      (this.selected = e.reduce((e, t) => a(e, m(t, this.step)), [])),
        t &&
          t.dates &&
          (this.range = t.dates.map((e) => {
            if (void 0 !== e) return m(e, this.step);
          }));
    }
    render() {
      (this.disabled = []),
        this.picker.setViewSwitchLabel(`${this.first}-${this.last}`),
        this.picker.setPrevBtnDisabled(this.first <= this.minYear),
        this.picker.setNextBtnDisabled(this.last >= this.maxYear),
        Array.from(this.grid.children).forEach((e, t) => {
          let i = e.classList,
            a = this.start + t * this.step,
            r = c(a, 0, 1);
          if (
            ((e.className = `datepicker-cell hover:bg-gray-100 dark:hover:bg-gray-600 block flex-1 leading-9 border-0 rounded-lg cursor-pointer text-center text-gray-900 dark:text-white font-semibold text-sm ${this.cellClass}`),
            this.isMinView && (e.dataset.date = r),
            (e.textContent = e.dataset.year = a),
            0 === t ? i.add('prev') : 11 === t && i.add('next'),
            (a < this.minYear || a > this.maxYear) && i.add('disabled'),
            this.range)
          ) {
            let [s, n] = this.range;
            a > s && a < n && i.add('range'), a === s && i.add('range-start'), a === n && i.add('range-end');
          }
          this.selected.includes(a) &&
            (i.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white'),
            i.remove('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600')),
            a === this.focused && i.add('focused', 'bg-gray-100', 'dark:bg-gray-600'),
            this.beforeShow && this.performBeforeHook(e, a, r);
        });
    }
    refresh() {
      let [e, t] = this.range || [];
      this.grid.querySelectorAll('.range, .range-start, .range-end, .selected, .focused').forEach((e) => {
        e.classList.remove(
          'range',
          'range-start',
          'range-end',
          'selected',
          'bg-blue-700',
          'text-white',
          'dark:bg-blue-600',
          'dark:text-white',
          'focused',
          'bg-gray-100',
          'dark:bg-gray-600',
        );
      }),
        Array.from(this.grid.children).forEach((i) => {
          let a = Number(i.textContent),
            r = i.classList;
          a > e && a < t && r.add('range'),
            a === e && r.add('range-start'),
            a === t && r.add('range-end'),
            this.selected.includes(a) &&
              (r.add('selected', 'bg-blue-700', 'text-white', 'dark:bg-blue-600', 'dark:text-white'),
              r.remove('text-gray-900', 'hover:bg-gray-100', 'dark:text-white', 'dark:hover:bg-gray-600')),
            a === this.focused && r.add('focused', 'bg-gray-100', 'dark:bg-gray-600');
        });
    }
    refreshFocus() {
      let e = Math.round((this.focused - this.start) / this.step);
      this.grid.querySelectorAll('.focused').forEach((e) => {
        e.classList.remove('focused', 'bg-gray-100', 'dark:bg-gray-600');
      }),
        this.grid.children[e].classList.add('focused', 'bg-gray-100', 'dark:bg-gray-600');
    }
  }
  function e$(e, t) {
    let i = {
      date: e.getDate(),
      viewDate: new Date(e.picker.viewDate),
      viewId: e.picker.currentView.id,
      datepicker: e,
    };
    e.element.dispatchEvent(new CustomEvent(t, { detail: i }));
  }
  function ef(e, t) {
    let { minDate: i, maxDate: a } = e.config,
      { currentView: r, viewDate: s } = e.picker,
      d;
    switch (r.id) {
      case 0:
        d = $(s, t);
        break;
      case 1:
        d = f(s, t);
        break;
      default:
        d = f(s, t * r.navStep);
    }
    (d = n(d, i, a)), e.picker.changeFocus(d).render();
  }
  function ep(e) {
    let t = e.picker.currentView.id;
    t !== e.config.maxView && e.picker.changeView(t + 1).render();
  }
  function eb(e) {
    e.config.updateOnBlur ? e.update({ autohide: !0 }) : (e.refresh('input'), e.hide());
  }
  function ey(e, t) {
    let i = e.picker,
      a = new Date(i.viewDate),
      r = i.currentView.id,
      s = 1 === r ? $(a, t - a.getMonth()) : f(a, t - a.getFullYear());
    i.changeFocus(s)
      .changeView(r - 1)
      .render();
  }
  function em(e) {
    let t = e.picker,
      i = h();
    if (1 === e.config.todayBtnMode) {
      if (e.config.autohide) {
        e.setDate(i);
        return;
      }
      e.setDate(i, { render: !1 }), t.update();
    }
    t.viewDate !== i && t.changeFocus(i), t.changeView(0).render();
  }
  function ek(e) {
    e.setDate({ clear: !0 });
  }
  function ew(e) {
    ep(e);
  }
  function ev(e) {
    ef(e, -1);
  }
  function ex(e) {
    ef(e, 1);
  }
  function e_(e, t) {
    let i = W(t, '.datepicker-cell');
    if (!i || i.classList.contains('disabled')) return;
    let { id: a, isMinView: r } = e.picker.currentView;
    r ? e.setDate(Number(i.dataset.date)) : 1 === a ? ey(e, Number(i.dataset.month)) : ey(e, Number(i.dataset.year));
  }
  function eD(e) {
    e.inline || e.config.disableTouchKeyboard || e.inputField.focus();
  }
  function eM(e, i) {
    if (
      (void 0 !== i.title &&
        (i.title
          ? ((e.controls.title.textContent = i.title), I(e.controls.title))
          : ((e.controls.title.textContent = ''), q(e.controls.title))),
      i.prevArrow)
    ) {
      let a = e.controls.prevBtn;
      J(a),
        i.prevArrow.forEach((e) => {
          a.appendChild(e.cloneNode(!0));
        });
    }
    if (i.nextArrow) {
      let r = e.controls.nextBtn;
      J(r),
        i.nextArrow.forEach((e) => {
          r.appendChild(e.cloneNode(!0));
        });
    }
    if (
      (i.locale &&
        ((e.controls.todayBtn.textContent = i.locale.today), (e.controls.clearBtn.textContent = i.locale.clear)),
      void 0 !== i.todayBtn && (i.todayBtn ? I(e.controls.todayBtn) : q(e.controls.todayBtn)),
      t(i, 'minDate') || t(i, 'maxDate'))
    ) {
      let { minDate: n, maxDate: d } = e.datepicker.config;
      e.controls.todayBtn.disabled = !s(h(), n, d);
    }
    void 0 !== i.clearBtn && (i.clearBtn ? I(e.controls.clearBtn) : q(e.controls.clearBtn));
  }
  function eS(e) {
    let { dates: t, config: a } = e,
      r = t.length > 0 ? i(t) : a.defaultViewDate;
    return n(r, a.minDate, a.maxDate);
  }
  function eC(e, t) {
    let i = new Date(e.viewDate),
      a = new Date(t),
      { id: r, year: s, first: n, last: d } = e.currentView,
      l = a.getFullYear();
    switch (
      ((e.viewDate = t),
      l !== i.getFullYear() && e$(e.datepicker, 'changeYear'),
      a.getMonth() !== i.getMonth() && e$(e.datepicker, 'changeMonth'),
      r)
    ) {
      case 0:
        return t < n || t > d;
      case 1:
        return l !== s;
      default:
        return l < n || l > d;
    }
  }
  function e4(e) {
    return window.getComputedStyle(e).direction;
  }
  class eO {
    constructor(e) {
      this.datepicker = e;
      let t = ea.replace(/%buttonClass%/g, e.config.buttonClass),
        i = (this.element = P(t).firstChild),
        [a, r, s] = i.firstChild.children,
        n = a.firstElementChild,
        [d, l, o] = a.lastElementChild.children,
        [h, c] = s.firstChild.children,
        u = { title: n, prevBtn: d, viewSwitch: l, nextBtn: o, todayBtn: h, clearBtn: c };
      (this.main = r), (this.controls = u);
      let g = e.inline ? 'inline' : 'dropdown';
      i.classList.add(`datepicker-${g}`),
        'dropdown' === g && i.classList.add('dropdown', 'absolute', 'top-0', 'left-0', 'z-20', 'pt-2'),
        eM(this, e.config),
        (this.viewDate = eS(e)),
        V(e, [
          [i, 'click', eD.bind(null, e), { capture: !0 }],
          [r, 'click', e_.bind(null, e)],
          [u.viewSwitch, 'click', ew.bind(null, e)],
          [u.prevBtn, 'click', ev.bind(null, e)],
          [u.nextBtn, 'click', ex.bind(null, e)],
          [u.todayBtn, 'click', em.bind(null, e)],
          [u.clearBtn, 'click', ek.bind(null, e)],
        ]),
        (this.views = [
          new eo(this),
          new ec(this),
          new eg(this, { id: 2, name: 'years', cellClass: 'year', step: 1 }),
          new eg(this, { id: 3, name: 'decades', cellClass: 'decade', step: 10 }),
        ]),
        (this.currentView = this.views[e.config.startView]),
        this.currentView.render(),
        this.main.appendChild(this.currentView.element),
        e.config.container.appendChild(this.element);
    }
    setOptions(e) {
      eM(this, e),
        this.views.forEach((t) => {
          t.init(e, !1);
        }),
        this.currentView.render();
    }
    detach() {
      this.datepicker.config.container.removeChild(this.element);
    }
    show() {
      if (this.active) return;
      this.element.classList.add('active', 'block'), this.element.classList.remove('hidden'), (this.active = !0);
      let e = this.datepicker;
      if (!e.inline) {
        let t = e4(e.inputField);
        t !== e4(e.config.container) ? (this.element.dir = t) : this.element.dir && this.element.removeAttribute('dir'),
          this.place(),
          e.config.disableTouchKeyboard && e.inputField.blur();
      }
      e$(e, 'show');
    }
    hide() {
      this.active &&
        (this.datepicker.exitEditMode(),
        this.element.classList.remove('active', 'block'),
        this.element.classList.add('active', 'block', 'hidden'),
        (this.active = !1),
        e$(this.datepicker, 'hide'));
    }
    place() {
      let { classList: e, style: t } = this.element,
        { config: i, inputField: a } = this.datepicker,
        r = i.container,
        { width: s, height: n } = this.element.getBoundingClientRect(),
        { left: d, top: l, width: o } = r.getBoundingClientRect(),
        { left: h, top: c, width: u, height: g } = a.getBoundingClientRect(),
        { x: $, y: f } = i.orientation,
        p,
        b,
        y;
      r === document.body
        ? ((p = window.scrollY), (b = h + window.scrollX), (y = c + p))
        : ((p = r.scrollTop), (b = h - d), (y = c - l + p)),
        'auto' === $ &&
          (b < 0 ? (($ = 'left'), (b = 10)) : ($ = b + s > o ? 'right' : 'rtl' === e4(a) ? 'right' : 'left')),
        'right' === $ && (b -= s - u),
        'auto' === f && (f = y - n < p ? 'bottom' : 'top'),
        'top' === f ? (y -= n) : (y += g),
        e.remove(
          'datepicker-orient-top',
          'datepicker-orient-bottom',
          'datepicker-orient-right',
          'datepicker-orient-left',
        ),
        e.add(`datepicker-orient-${f}`, `datepicker-orient-${$}`),
        (t.top = y ? `${y}px` : y),
        (t.left = b ? `${b}px` : b);
    }
    setViewSwitchLabel(e) {
      this.controls.viewSwitch.textContent = e;
    }
    setPrevBtnDisabled(e) {
      this.controls.prevBtn.disabled = e;
    }
    setNextBtnDisabled(e) {
      this.controls.nextBtn.disabled = e;
    }
    changeView(e) {
      let t = this.currentView,
        i = this.views[e];
      return (
        i.id !== t.id &&
          ((this.currentView = i),
          (this._renderMethod = 'render'),
          e$(this.datepicker, 'changeView'),
          this.main.replaceChild(i.element, t.element)),
        this
      );
    }
    changeFocus(e) {
      return (
        (this._renderMethod = eC(this, e) ? 'render' : 'refreshFocus'),
        this.views.forEach((e) => {
          e.updateFocus();
        }),
        this
      );
    }
    update() {
      let e = eS(this.datepicker);
      return (
        (this._renderMethod = eC(this, e) ? 'render' : 'refresh'),
        this.views.forEach((e) => {
          e.updateFocus(), e.updateSelection();
        }),
        this
      );
    }
    render(e = !0) {
      let t = (e && this._renderMethod) || 'render';
      delete this._renderMethod, this.currentView[t]();
    }
  }
  function e0(e, t, i, a, r, n) {
    if (s(e, r, n)) {
      if (a(e)) {
        let d = t(e, i);
        return e0(d, t, i, a, r, n);
      }
      return e;
    }
  }
  function eE(e, t, i, a) {
    let r = e.picker,
      s = r.currentView,
      n = s.step || 1,
      d = r.viewDate,
      l,
      o;
    switch (s.id) {
      case 0:
        (d = a ? u(d, 7 * i) : t.ctrlKey || t.metaKey ? f(d, i) : u(d, i)),
          (l = u),
          (o = (e) => s.disabled.includes(e));
        break;
      case 1:
        (d = $(d, a ? 4 * i : i)),
          (l = $),
          (o = (e) => {
            let t = new Date(e),
              { year: i, disabled: a } = s;
            return t.getFullYear() === i && a.includes(t.getMonth());
          });
        break;
      default:
        (d = f(d, i * (a ? 4 : 1) * n)), (l = f), (o = (e) => s.disabled.includes(m(e, n)));
    }
    void 0 !== (d = e0(d, l, i < 0 ? -n : n, o, s.minDate, s.maxDate)) && r.changeFocus(d).render();
  }
  function eF(e, t) {
    if ('Tab' === t.key) {
      eb(e);
      return;
    }
    let i = e.picker,
      { id: a, isMinView: r } = i.currentView;
    if (i.active) {
      if (e.editMode)
        switch (t.key) {
          case 'Escape':
            i.hide();
            break;
          case 'Enter':
            e.exitEditMode({ update: !0, autohide: e.config.autohide });
            break;
          default:
            return;
        }
      else
        switch (t.key) {
          case 'Escape':
            i.hide();
            break;
          case 'ArrowLeft':
            if (t.ctrlKey || t.metaKey) ef(e, -1);
            else if (t.shiftKey) {
              e.enterEditMode();
              return;
            } else eE(e, t, -1, !1);
            break;
          case 'ArrowRight':
            if (t.ctrlKey || t.metaKey) ef(e, 1);
            else if (t.shiftKey) {
              e.enterEditMode();
              return;
            } else eE(e, t, 1, !1);
            break;
          case 'ArrowUp':
            if (t.ctrlKey || t.metaKey) ep(e);
            else if (t.shiftKey) {
              e.enterEditMode();
              return;
            } else eE(e, t, -1, !0);
            break;
          case 'ArrowDown':
            if (t.shiftKey && !t.ctrlKey && !t.metaKey) {
              e.enterEditMode();
              return;
            }
            eE(e, t, 1, !0);
            break;
          case 'Enter':
            r ? e.setDate(i.viewDate) : i.changeView(a - 1).render();
            break;
          case 'Backspace':
          case 'Delete':
            e.enterEditMode();
            return;
          default:
            1 !== t.key.length || t.ctrlKey || t.metaKey || e.enterEditMode();
            return;
        }
    } else
      switch (t.key) {
        case 'ArrowDown':
        case 'Escape':
          i.show();
          break;
        case 'Enter':
          e.update();
          break;
        default:
          return;
      }
    t.preventDefault(), t.stopPropagation();
  }
  function eL(e) {
    e.config.showOnFocus && !e._showing && e.show();
  }
  function e2(e, t) {
    let i = t.target;
    (e.picker.active || e.config.showOnClick) &&
      ((i._active = i === document.activeElement),
      (i._clicking = setTimeout(() => {
        delete i._active, delete i._clicking;
      }, 2e3)));
  }
  function eV(e, t) {
    let i = t.target;
    i._clicking &&
      (clearTimeout(i._clicking),
      delete i._clicking,
      i._active && e.enterEditMode(),
      delete i._active,
      e.config.showOnClick && e.show());
  }
  function eB(e, t) {
    t.clipboardData.types.includes('text/plain') && e.enterEditMode();
  }
  function eA(e, t) {
    let i = e.element;
    if (i !== document.activeElement) return;
    let a = e.picker.element;
    !W(t, (e) => e === i || e === a) && eb(e);
  }
  function eY(e, t) {
    return e.map((e) => O(e, t.format, t.locale)).join(t.dateDelimiter);
  }
  function eW(e, t, i = !1) {
    let { config: a, dates: r, rangepicker: n } = e;
    if (0 === t.length) return i ? [] : void 0;
    let d = n && e === n.datepickers[1],
      l = t.reduce((e, t) => {
        let i = C(t, a.format, a.locale);
        if (void 0 === i) return e;
        if (a.pickLevel > 0) {
          let r = new Date(i);
          i =
            1 === a.pickLevel
              ? d
                ? r.setMonth(r.getMonth() + 1, 0)
                : r.setDate(1)
              : d
                ? r.setFullYear(r.getFullYear() + 1, 0, 0)
                : r.setMonth(0, 1);
        }
        return (
          !s(i, a.minDate, a.maxDate) ||
            e.includes(i) ||
            a.datesDisabled.includes(i) ||
            a.daysOfWeekDisabled.includes(new Date(i).getDay()) ||
            e.push(i),
          e
        );
      }, []);
    if (0 !== l.length)
      return (
        a.multidate &&
          !i &&
          (l = l.reduce(
            (e, t) => (r.includes(t) || e.push(t), e),
            r.filter((e) => !l.includes(e)),
          )),
        a.maxNumberOfDates && l.length > a.maxNumberOfDates ? l.slice(-1 * a.maxNumberOfDates) : l
      );
  }
  function e5(e, t = 3, i = !0) {
    let { config: a, picker: r, inputField: s } = e;
    if (2 & t) {
      let n = r.active ? a.pickLevel : a.startView;
      r.update().changeView(n).render(i);
    }
    1 & t && s && (s.value = eY(e.dates, a));
  }
  function eN(e, t, i) {
    let { clear: a, render: r, autohide: s } = i;
    void 0 === r && (r = !0), r ? void 0 === s && (s = e.config.autohide) : (s = !1);
    let n = eW(e, t, a);
    n &&
      (n.toString() !== e.dates.toString() ? ((e.dates = n), e5(e, r ? 3 : 1), e$(e, 'changeDate')) : e5(e, 1),
      s && e.hide());
  }
  class e7 {
    constructor(e, t = {}, i) {
      (e.datepicker = this), (this.element = e);
      let a = (this.config = Object.assign(
        {
          buttonClass: (t.buttonClass && String(t.buttonClass)) || 'button',
          container: document.body,
          defaultViewDate: h(),
          maxDate: void 0,
          minDate: void 0,
        },
        et(K, this),
      ));
      (this._options = t), Object.assign(a, et(t, this));
      let s = (this.inline = 'INPUT' !== e.tagName),
        n,
        d;
      if (s) (a.container = e), (d = r(e.dataset.date, a.dateDelimiter)), delete e.dataset.date;
      else {
        let l = t.container ? document.querySelector(t.container) : null;
        l && (a.container = l),
          (n = this.inputField = e).classList.add('datepicker-input'),
          (d = r(n.value, a.dateDelimiter));
      }
      if (i) {
        let o = i.inputs.indexOf(n),
          c = i.datepickers;
        if (o < 0 || o > 1 || !Array.isArray(c)) throw Error('Invalid rangepicker object.');
        (c[o] = this), Object.defineProperty(this, 'rangepicker', { get: () => i });
      }
      this.dates = [];
      let u = eW(this, d);
      u && u.length > 0 && (this.dates = u), n && (n.value = eY(this.dates, a));
      let g = (this.picker = new eO(this));
      if (s) this.show();
      else {
        let $ = eA.bind(null, this),
          f = [
            [n, 'keydown', eF.bind(null, this)],
            [n, 'focus', eL.bind(null, this)],
            [n, 'mousedown', e2.bind(null, this)],
            [n, 'click', eV.bind(null, this)],
            [n, 'paste', eB.bind(null, this)],
            [document, 'mousedown', $],
            [document, 'touchstart', $],
            [window, 'resize', g.place.bind(g)],
          ];
        V(this, f);
      }
    }
    static formatDate(e, t, i) {
      return O(e, t, (i && N[i]) || N.en);
    }
    static parseDate(e, t, i) {
      return C(e, t, (i && N[i]) || N.en);
    }
    static get locales() {
      return N;
    }
    get active() {
      return !!(this.picker && this.picker.active);
    }
    get pickerElement() {
      return this.picker ? this.picker.element : void 0;
    }
    setOptions(e) {
      let t = this.picker,
        i = et(e, this);
      Object.assign(this._options, e), Object.assign(this.config, i), t.setOptions(i), e5(this, 3);
    }
    show() {
      if (this.inputField) {
        if (this.inputField.disabled) return;
        this.inputField !== document.activeElement &&
          ((this._showing = !0), this.inputField.focus(), delete this._showing);
      }
      this.picker.show();
    }
    hide() {
      !this.inline && (this.picker.hide(), this.picker.update().changeView(this.config.startView).render());
    }
    destroy() {
      return (
        this.hide(),
        B(this),
        this.picker.detach(),
        this.inline || this.inputField.classList.remove('datepicker-input'),
        delete this.element.datepicker,
        this
      );
    }
    getDate(e) {
      let t = e ? (t) => O(t, e, this.config.locale) : (e) => new Date(e);
      return this.config.multidate ? this.dates.map(t) : this.dates.length > 0 ? t(this.dates[0]) : void 0;
    }
    setDate(...e) {
      let t = [...e],
        a = {},
        r = i(e);
      'object' != typeof r || Array.isArray(r) || r instanceof Date || !r || Object.assign(a, t.pop());
      let s = Array.isArray(t[0]) ? t[0] : t;
      eN(this, s, a);
    }
    update(e) {
      if (this.inline) return;
      let t = { clear: !0, autohide: !!(e && e.autohide) },
        i = r(this.inputField.value, this.config.dateDelimiter);
      eN(this, i, t);
    }
    refresh(e, t = !1) {
      e && 'string' != typeof e && ((t = e), (e = void 0));
      let i;
      e5(this, (i = 'picker' === e ? 2 : 'input' === e ? 1 : 3), !t);
    }
    enterEditMode() {
      !this.inline &&
        this.picker.active &&
        !this.editMode &&
        ((this.editMode = !0), this.inputField.classList.add('in-edit', 'border-blue-700'));
    }
    exitEditMode(e) {
      if (this.inline || !this.editMode) return;
      let t = Object.assign({ update: !1 }, e);
      delete this.editMode, this.inputField.classList.remove('in-edit', 'border-blue-700'), t.update && this.update(t);
    }
  }
  function eH(e) {
    let t = Object.assign({}, e);
    return delete t.inputs, delete t.allowOneSidedRange, delete t.maxNumberOfDates, t;
  }
  function e8(e, t, i, a) {
    V(e, [[i, 'changeDate', t]]), new e7(i, a, e);
  }
  function eK(e, t) {
    if (e._updating) return;
    e._updating = !0;
    let i = t.target;
    if (void 0 === i.datepicker) return;
    let a = e.datepickers,
      r = { render: !1 },
      s = e.inputs.indexOf(i),
      n = 0 === s ? 1 : 0,
      d = a[s].dates[0],
      l = a[n].dates[0];
    void 0 !== d && void 0 !== l
      ? 0 === s && d > l
        ? (a[0].setDate(l, r), a[1].setDate(d, r))
        : 1 === s && d < l && (a[0].setDate(d, r), a[1].setDate(l, r))
      : e.allowOneSidedRange || (void 0 === d && void 0 === l) || ((r.clear = !0), a[n].setDate(a[s].dates, r)),
      a[0].picker.update().render(),
      a[1].picker.update().render(),
      delete e._updating;
  }
  class e1 {
    constructor(e, t = {}) {
      let i = Array.isArray(t.inputs) ? t.inputs : Array.from(e.querySelectorAll('input'));
      if (i.length < 2) return;
      (e.rangepicker = this),
        (this.element = e),
        (this.inputs = i.slice(0, 2)),
        (this.allowOneSidedRange = !!t.allowOneSidedRange);
      let a = eK.bind(null, this),
        r = eH(t),
        s = [];
      Object.defineProperty(this, 'datepickers', { get: () => s }),
        e8(this, a, this.inputs[0], r),
        e8(this, a, this.inputs[1], r),
        Object.freeze(s),
        s[0].dates.length > 0
          ? eK(this, { target: this.inputs[0] })
          : s[1].dates.length > 0 && eK(this, { target: this.inputs[1] });
    }
    get dates() {
      return 2 === this.datepickers.length ? [this.datepickers[0].dates[0], this.datepickers[1].dates[0]] : void 0;
    }
    setOptions(e) {
      this.allowOneSidedRange = !!e.allowOneSidedRange;
      let t = eH(e);
      this.datepickers[0].setOptions(t), this.datepickers[1].setOptions(t);
    }
    destroy() {
      this.datepickers[0].destroy(), this.datepickers[1].destroy(), B(this), delete this.element.rangepicker;
    }
    getDates(e) {
      let t = e ? (t) => O(t, e, this.datepickers[0].config.locale) : (e) => new Date(e);
      return this.dates.map((e) => (void 0 === e ? e : t(e)));
    }
    setDates(e, t) {
      let [i, a] = this.datepickers,
        r = this.dates;
      (this._updating = !0),
        i.setDate(e),
        a.setDate(t),
        delete this._updating,
        a.dates[0] !== r[1]
          ? eK(this, { target: this.inputs[1] })
          : i.dates[0] !== r[0] && eK(this, { target: this.inputs[0] });
    }
  }
  var e9 = function e(t) {
    var i = t.hasAttribute('datepicker-buttons'),
      a = t.hasAttribute('datepicker-autohide'),
      r = t.hasAttribute('datepicker-format'),
      s = t.hasAttribute('datepicker-orientation'),
      n = t.hasAttribute('datepicker-title'),
      d = {};
    return (
      i && ((d.todayBtn = !0), (d.clearBtn = !0)),
      a && (d.autohide = !0),
      r && (d.format = t.getAttribute('datepicker-format')),
      s && (d.orientation = t.getAttribute('datepicker-orientation')),
      n && (d.title = t.getAttribute('datepicker-title')),
      d
    );
  };
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[datepicker]').forEach(function (e) {
      new e7(e, e9(e));
    }),
      document.querySelectorAll('[inline-datepicker]').forEach(function (e) {
        new e7(e, e9(e));
      }),
      document.querySelectorAll('[date-rangepicker]').forEach(function (e) {
        new e1(e, e9(e));
      });
  });
})();
