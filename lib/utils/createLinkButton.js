'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getCurrentEntityKey(editorState) {
  var selection = editorState.getSelection();
  var anchorKey = selection.getAnchorKey();
  var contentState = editorState.getCurrentContent();
  var anchorBlock = contentState.getBlockForKey(anchorKey);
  var offset = selection.anchorOffset;
  var index = selection.isBackward ? offset - 1 : offset;
  return anchorBlock.getEntityAt(index);
}

function getCurrentEntity(editorState) {
  var contentState = editorState.getCurrentContent();
  var entityKey = getCurrentEntityKey(editorState);
  if (entityKey) {
    return contentState.getEntity(entityKey);
  }
  return null;
}

function hasEntity(entityType, editorState) {
  var entity = getCurrentEntity(editorState);
  if (entity && entity.getType() === entityType) {
    return true;
  }
  return false;
}

exports.default = function (_ref) {
  var children = _ref.children;
  return function (_Component) {
    _inherits(linkButton, _Component);

    function linkButton() {
      var _ref2;

      var _temp, _this, _ret;

      _classCallCheck(this, linkButton);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = linkButton.__proto__ || Object.getPrototypeOf(linkButton)).call.apply(_ref2, [this].concat(args))), _this), _this.activate = function (event) {
        event.preventDefault();
        event.stopPropagation();

        var editorState = _this.props.getEditorState();

        var url = '';
        var entitySelected = hasEntity('link', editorState);
        if (entitySelected) {
          var entity = getCurrentEntity(editorState);
          if (entity) {
            var data = entity.getData();
            url = data.url;
          }
        }

        url = window.prompt('Enter/Paste URL...', url);

        if (url) {
          var contentState = editorState.getCurrentContent();
          var contentStateWithEntity = contentState.createEntity('link', 'IMMUTABLE', { url: url });
          var entityKey = contentStateWithEntity.getLastCreatedEntityKey();
          _this.props.setEditorState(_draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey));
        } else {
          _this.props.setEditorState(_draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), null));
        }
        _draftJs.EditorState.forceSelection(editorState, editorState.getCurrentContent().getSelectionAfter());
      }, _this.preventBubblingUp = function (event) {
        event.preventDefault();
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(linkButton, [{
      key: 'render',
      value: function render() {
        var theme = this.props.theme;

        return _react2.default.createElement(
          'div',
          {
            className: theme.buttonWrapper,
            onMouseDown: this.preventBubblingUp
          },
          _react2.default.createElement('button', {
            className: theme.button,
            onClick: this.activate,
            type: 'button',
            children: children
          })
        );
      }
    }]);

    return linkButton;
  }(_react.Component);
};