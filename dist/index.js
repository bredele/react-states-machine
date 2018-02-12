'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Dependencie(s)
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * State machine instance.
 *
 * @param {Object} flow
 * @param {Object} props
 * @api public
 */

exports.default = function (flow) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var state = arguments[2];

  return _react2.default.createElement(Machine, _extends({ flow: flow, state: state }, props));
};

/**
 * State machine component.
 *
 * All props are passed to the state machine.
 * Props:
 *
 *  - flow: object describing state machine flow
 *
 *
 * @param {Object} props
 * @api public
 */

var Machine = function (_React$Component) {
  _inherits(Machine, _React$Component);

  function Machine(props) {
    _classCallCheck(this, Machine);

    var _this = _possibleConstructorReturn(this, (Machine.__proto__ || Object.getPrototypeOf(Machine)).call(this, props));

    var flow = props.flow,
        state = props.state,
        attrs = _objectWithoutProperties(props, ['flow', 'state']);

    _this.state = {
      path: state || first(flow),
      data: attrs
    };
    return _this;
  }

  _createClass(Machine, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$flow$state$pat = _slicedToArray(this.props.flow[this.state.path], 2),
          state = _props$flow$state$pat[0],
          transitions = _props$flow$state$pat[1];

      return state(_extends({}, this.state.data, {
        transition: transition(this, transitions),
        goto: function goto(next, data) {
          return _goto(_this2, data, next);
        }
      }));
    }
  }]);

  return Machine;
}(_react2.default.Component);

/**
 * Transition factory (function that triggers
 * a state machine transition).
 *
 * @param {Object} source
 * @param {Object} transitions
 * @return {Function}
 * @api private
 */

function transition(source) {
  var transitions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (path) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var dest = transitions[path];
    if (dest) {
      var _transition = [].concat(dest);
      Promise.resolve(_transition[0].apply(_transition, [source.state.data].concat(args))).then(function (data) {
        return _goto(source, data, _transition[1]);
      });
    }
  };
}

/**
 * Change source state with given path and data.
 *
 * Avoid invalid attempt to destructure non-iterable instance.
 *
 * @param {Object} source
 * @param {Object} data
 * @param {String} path
 * @api private
 */

function _goto(source, data, path) {
  source.setState(function (prev) {
    return {
      path: path || prev.path,
      data: data || prev.data
    };
  });
}

/**
 * Get first property of an object.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function first(obj) {
  for (var key in obj) {
    return key;
  }
}