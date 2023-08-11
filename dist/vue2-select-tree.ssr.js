'use strict';var Vue=require('vue'),ElementUI=require('element-ui');require('element-ui/lib/theme-chalk/index.css');var Clickoutside=require('element-ui/src/utils/clickoutside'),objectAssign=require('element-ui/src/utils/merge'),util=require('element-ui/src/utils/util'),VirtualList=require('vue-virtual-scroll-list'),ElCollapseTransition=require('element-ui/src/transitions/collapse-transition'),ElCheckbox=require('element-ui/packages/checkbox'),emitter=require('element-ui/src/mixins/emitter'),locale=require('element-ui/src/locale'),dom=require('element-ui/src/utils/dom');function _interopDefaultLegacy(e){return e&&typeof e==='object'&&'default'in e?e:{'default':e}}var Vue__default=/*#__PURE__*/_interopDefaultLegacy(Vue);var ElementUI__default=/*#__PURE__*/_interopDefaultLegacy(ElementUI);var Clickoutside__default=/*#__PURE__*/_interopDefaultLegacy(Clickoutside);var objectAssign__default=/*#__PURE__*/_interopDefaultLegacy(objectAssign);var VirtualList__default=/*#__PURE__*/_interopDefaultLegacy(VirtualList);var ElCollapseTransition__default=/*#__PURE__*/_interopDefaultLegacy(ElCollapseTransition);var ElCheckbox__default=/*#__PURE__*/_interopDefaultLegacy(ElCheckbox);var emitter__default=/*#__PURE__*/_interopDefaultLegacy(emitter);function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return typeof key === "symbol" ? key : String(key);
}var treeData = {
  selectKeys: [],
  selectNodes: [],
  pop: function pop() {
    this.selectKeys.pop();
    this.selectNodes.pop();
  },
  remove: function remove(index) {
    this.selectKeys.splice(index, 1);
    this.selectNodes.splice(index, 1);
  },
  clear: function clear() {
    this.selectKeys = [];
    this.selectNodes = [];
  }
};//
var script$4 = {
  name: 'ElInputTag',
  props: {
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    addTagOnKeys: {
      type: Array,
      default: function _default() {
        return [13, 188, 9];
      }
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    size: String,
    placeholder: String
  },
  data: function data() {
    return {
      store: treeData,
      newTag: ''
    };
  },
  methods: {
    focusTagInput: function focusTagInput() {
      if (this.readOnly || !this.$el.querySelector('.tag-input')) {
        return;
      } else {
        this.$el.querySelector('.tag-input').focus();
      }
    },
    addTag: function addTag(tag) {
      tag = tag.trim();
      if (tag && !this.innerTags.includes(tag)) {
        this.innerTags.push(tag);
        return true;
      }
      return false;
    },
    remove: function remove(index) {
      treeData.remove(index);
    },
    focus: function focus() {
      this.$emit('focus');
    },
    blur: function blur() {
      this.$emit('blur');
    },
    searchTextChange: function searchTextChange(val) {
      var text = val.target.value;
      this.$emit('searchTextChange', text);
    },
    clear: function clear() {
      treeData.selectKeys = [];
      treeData.selectNodes = [];
      this.$emit('clear');
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "el-input-tag input-tag-wrapper",
    class: [_vm.size ? 'el-input-tag--' + _vm.size : ''],
    on: {
      "click": _vm.focusTagInput
    }
  }, [_vm._l(_vm.store.selectNodes, function (tag, idx) {
    return _c('el-tag', _vm._b({
      key: tag.id,
      attrs: {
        "size": _vm.size,
        "closable": !_vm.readOnly,
        "disable-transitions": false
      },
      on: {
        "close": function close($event) {
          return _vm.remove(idx);
        }
      }
    }, 'el-tag', _vm.$attrs, false), [_vm._v("\n    " + _vm._s(tag.label) + "\n  ")]);
  }), _vm._ssrNode(" " + (!_vm.readOnly ? "<input" + _vm._ssrAttr("placeholder", _vm.placeholder) + _vm._ssrAttr("value", _vm.newTag) + " class=\"tag-input\" data-v-52c20492>" : "<!---->") + " <i class=\"el-icon-close icon-close\" data-v-52c20492></i>")], 2);
};
var __vue_staticRenderFns__$4 = [];

/* style */
var __vue_inject_styles__$4 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-52c20492_0", {
    source: ".el-form-item.is-error .el-input-tag[data-v-52c20492]{border-color:#f56c6c}.input-tag-wrapper[data-v-52c20492]{position:relative;font-size:14px;background-color:#fff;background-image:none;border-radius:4px;border:1px solid #dcdfe6;box-sizing:border-box;color:#606266;display:inline-block;outline:0;padding:0 10px 0 5px;transition:border-color .2s cubic-bezier(.645,.045,.355,1);width:100%}.el-tag[data-v-52c20492]{margin-right:4px}.tag-input[data-v-52c20492]{min-height:30px;background:0 0;border:0;font-size:inherit;outline:0;padding-left:0;width:100px}.el-input-tag[data-v-52c20492]{text-align:left;display:flex;flex-direction:row;flex-wrap:wrap;padding-top:3px;padding-bottom:3px;min-height:42px}.el-input-tag--mini[data-v-52c20492]{min-height:28px;line-height:28px;font-size:12px}.el-input-tag--small[data-v-52c20492]{min-height:32px;line-height:32px}.el-input-tag--medium[data-v-52c20492]{min-height:36px;line-height:36px}.icon-close[data-v-52c20492]{position:absolute;right:5px;top:50%;transform:translateY(-50%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__$4 = "data-v-52c20492";
/* module identifier */
var __vue_module_identifier__$4 = "data-v-52c20492";
/* functional template */
var __vue_is_functional_template__$4 = false;
/* style inject shadow dom */

var __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, undefined, createInjectorSSR, undefined);var NODE_KEY = '$treeNodeId';
var markNodeData = function markNodeData(node, data) {
  if (!data || data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};
var getNodeKey = function getNodeKey(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};
var findNearestComponent = function findNearestComponent(element, componentName) {
  var target = element;
  while (target && target.tagName !== 'BODY') {
    if (target.__vue__ && target.__vue__.$options.name === componentName) {
      return target.__vue__;
    }
    target = target.parentNode;
  }
  return null;
};var getChildState = function getChildState(node) {
  var all = true;
  var none = true;
  var allWithoutDisable = true;
  for (var i = 0, j = node.length; i < j; i++) {
    var n = node[i];
    if (n.checked !== true || n.indeterminate) {
      all = false;
      if (!n.disabled) {
        allWithoutDisable = false;
      }
    }
    if (n.checked !== false || n.indeterminate) {
      none = false;
    }
  }
  return {
    all: all,
    none: none,
    allWithoutDisable: allWithoutDisable,
    half: !all && !none
  };
};
var reInitChecked = function reInitChecked(node) {
  if (node.childNodes.length === 0) return;
  var _getChildState = getChildState(node.childNodes),
    all = _getChildState.all,
    none = _getChildState.none,
    half = _getChildState.half;
  if (all) {
    node.checked = true;
    node.indeterminate = false;
  } else if (half) {
    node.checked = false;
    node.indeterminate = true;
  } else if (none) {
    node.checked = false;
    node.indeterminate = false;
  }
  var parent = node.parent;
  if (!parent || parent.level === 0) return;
  if (!node.store.checkStrictly) {
    reInitChecked(parent);
  }
};
var getPropertyFromData = function getPropertyFromData(node, prop) {
  var props = node.store.props;
  var data = node.data || {};
  var config = props[prop];
  if (typeof config === 'function') {
    return config(data, node);
  } else if (typeof config === 'string') {
    return data[config];
  } else if (typeof config === 'undefined') {
    var dataProp = data[prop];
    return dataProp === undefined ? '' : dataProp;
  }
};
var nodeIdSeed = 0;
var Node = /*#__PURE__*/function () {
  function Node(options) {
    _classCallCheck(this, Node);
    this.id = nodeIdSeed++;
    this.text = null;
    this.checked = false;
    this.indeterminate = false;
    this.data = null;
    this.expanded = false;
    this.parent = null;
    this.visible = true;
    this.isCurrent = false;
    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    // internal
    this.level = 0;
    this.loaded = false;
    this.childNodes = [];
    this.loading = false;
    if (this.parent) {
      this.level = this.parent.level + 1;
    }
    var store = this.store;
    if (!store) {
      throw new Error('[Node]store is required!');
    }
    store.registerNode(this);
    var props = store.props;
    if (props && typeof props.isLeaf !== 'undefined') {
      var isLeaf = getPropertyFromData(this, 'isLeaf');
      if (typeof isLeaf === 'boolean') {
        this.isLeafByUser = isLeaf;
      }
    }
    if (store.lazy !== true && this.data) {
      this.setData(this.data);
      if (store.defaultExpandAll) {
        this.expanded = true;
      }
    } else if (this.level > 0 && store.lazy && store.defaultExpandAll) {
      this.expand();
    }
    if (!Array.isArray(this.data)) {
      markNodeData(this, this.data);
    }
    if (!this.data) return;
    var defaultExpandedKeys = store.defaultExpandedKeys;
    var key = store.key;
    if (key && defaultExpandedKeys && defaultExpandedKeys.indexOf(this.key) !== -1) {
      this.expand(null, store.autoExpandParent);
    }
    if (key && store.currentNodeKey !== undefined && this.key === store.currentNodeKey) {
      store.currentNode = this;
      store.currentNode.isCurrent = true;
    }
    if (store.lazy) {
      store._initDefaultCheckedNode(this);
    }
    this.updateLeafState();
  }
  _createClass(Node, [{
    key: "setData",
    value: function setData(data) {
      if (!Array.isArray(data)) {
        markNodeData(this, data);
      }
      this.data = data;
      this.childNodes = [];
      var children;
      if (this.level === 0 && this.data instanceof Array) {
        children = this.data;
      } else {
        children = getPropertyFromData(this, 'children') || [];
      }
      for (var i = 0, j = children.length; i < j; i++) {
        this.insertChild({
          data: children[i]
        });
      }
    }
  }, {
    key: "label",
    get: function get() {
      return getPropertyFromData(this, 'label');
    }
  }, {
    key: "key",
    get: function get() {
      var nodeKey = this.store.key;
      if (this.data) return this.data[nodeKey];
      return null;
    }
  }, {
    key: "disabled",
    get: function get() {
      return getPropertyFromData(this, 'disabled');
    }
  }, {
    key: "nextSibling",
    get: function get() {
      var parent = this.parent;
      if (parent) {
        var index = parent.childNodes.indexOf(this);
        if (index > -1) {
          return parent.childNodes[index + 1];
        }
      }
      return null;
    }
  }, {
    key: "previousSibling",
    get: function get() {
      var parent = this.parent;
      if (parent) {
        var index = parent.childNodes.indexOf(this);
        if (index > -1) {
          return index > 0 ? parent.childNodes[index - 1] : null;
        }
      }
      return null;
    }
  }, {
    key: "contains",
    value: function contains(target) {
      var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var walk = function walk(parent) {
        var children = parent.childNodes || [];
        var result = false;
        for (var i = 0, j = children.length; i < j; i++) {
          var child = children[i];
          if (child === target || deep && walk(child)) {
            result = true;
            break;
          }
        }
        return result;
      };
      return walk(this);
    }
  }, {
    key: "remove",
    value: function remove() {
      var parent = this.parent;
      if (parent) {
        parent.removeChild(this);
      }
    }
  }, {
    key: "insertChild",
    value: function insertChild(child, index, batch) {
      if (!child) throw new Error('insertChild error: child is required.');
      if (!(child instanceof Node)) {
        if (!batch) {
          var children = this.getChildren(true);
          if (children.indexOf(child.data) === -1) {
            if (typeof index === 'undefined' || index < 0) {
              children.push(child.data);
            } else {
              children.splice(index, 0, child.data);
            }
          }
        }
        objectAssign__default["default"](child, {
          parent: this,
          store: this.store
        });
        child = new Node(child);
      }
      child.level = this.level + 1;
      if (typeof index === 'undefined' || index < 0) {
        this.childNodes.push(child);
      } else {
        this.childNodes.splice(index, 0, child);
      }
      this.updateLeafState();
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(child, ref) {
      var index;
      if (ref) {
        index = this.childNodes.indexOf(ref);
      }
      this.insertChild(child, index);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(child, ref) {
      var index;
      if (ref) {
        index = this.childNodes.indexOf(ref);
        if (index !== -1) index += 1;
      }
      this.insertChild(child, index);
    }
  }, {
    key: "removeChild",
    value: function removeChild(child) {
      var children = this.getChildren() || [];
      var dataIndex = children.indexOf(child.data);
      if (dataIndex > -1) {
        children.splice(dataIndex, 1);
      }
      var index = this.childNodes.indexOf(child);
      if (index > -1) {
        this.store && this.store.deregisterNode(child);
        child.parent = null;
        this.childNodes.splice(index, 1);
      }
      this.updateLeafState();
    }
  }, {
    key: "removeChildByData",
    value: function removeChildByData(data) {
      var targetNode = null;
      for (var i = 0; i < this.childNodes.length; i++) {
        if (this.childNodes[i].data === data) {
          targetNode = this.childNodes[i];
          break;
        }
      }
      if (targetNode) {
        this.removeChild(targetNode);
      }
    }
  }, {
    key: "expand",
    value: function expand(callback, expandParent) {
      var _this = this;
      var done = function done() {
        if (expandParent) {
          var parent = _this.parent;
          while (parent.level > 0) {
            parent.expanded = true;
            parent = parent.parent;
          }
        }
        _this.expanded = true;
        if (callback) callback();
      };
      if (this.shouldLoadData()) {
        this.loadData(function (data) {
          if (data instanceof Array) {
            if (_this.checked) {
              _this.setChecked(true, true);
            } else if (!_this.store.checkStrictly) {
              reInitChecked(_this);
            }
            done();
          }
        });
      } else {
        done();
      }
    }
  }, {
    key: "doCreateChildren",
    value: function doCreateChildren(array) {
      var _this2 = this;
      var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      array.forEach(function (item) {
        _this2.insertChild(objectAssign__default["default"]({
          data: item
        }, defaultProps), undefined, true);
      });
    }
  }, {
    key: "collapse",
    value: function collapse() {
      this.expanded = false;
    }
  }, {
    key: "shouldLoadData",
    value: function shouldLoadData() {
      return this.store.lazy === true && this.store.load && !this.loaded;
    }
  }, {
    key: "updateLeafState",
    value: function updateLeafState() {
      if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
        this.isLeaf = this.isLeafByUser;
        return;
      }
      var childNodes = this.childNodes;
      if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
        this.isLeaf = !childNodes || childNodes.length === 0;
        return;
      }
      this.isLeaf = false;
    }
  }, {
    key: "setChecked",
    value: function setChecked(value, deep, recursion, passValue) {
      var _this3 = this;
      this.indeterminate = value === 'half';
      this.checked = value === true;
      if (this.store.checkStrictly) return;
      if (!(this.shouldLoadData() && !this.store.checkDescendants)) {
        var _getChildState2 = getChildState(this.childNodes),
          all = _getChildState2.all,
          allWithoutDisable = _getChildState2.allWithoutDisable;
        if (!this.isLeaf && !all && allWithoutDisable) {
          this.checked = false;
          value = false;
        }
        var handleDescendants = function handleDescendants() {
          if (deep) {
            var childNodes = _this3.childNodes;
            for (var i = 0, j = childNodes.length; i < j; i++) {
              var child = childNodes[i];
              passValue = passValue || value !== false;
              var isCheck = child.disabled ? child.checked : passValue;
              child.setChecked(isCheck, deep, true, passValue);
            }
            var _getChildState3 = getChildState(childNodes),
              half = _getChildState3.half,
              _all = _getChildState3.all;
            if (!_all) {
              _this3.checked = _all;
              _this3.indeterminate = half;
            }
          }
        };
        if (this.shouldLoadData()) {
          // Only work on lazy load data.
          this.loadData(function () {
            handleDescendants();
            reInitChecked(_this3);
          }, {
            checked: value !== false
          });
          return;
        } else {
          handleDescendants();
        }
      }
      var parent = this.parent;
      if (!parent || parent.level === 0) return;
      if (!recursion) {
        reInitChecked(parent);
      }
    }
  }, {
    key: "getChildren",
    value: function getChildren() {
      var forceInit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      // this is data
      if (this.level === 0) return this.data;
      var data = this.data;
      if (!data) return null;
      var props = this.store.props;
      var children = 'children';
      if (props) {
        children = props.children || 'children';
      }
      if (data[children] === undefined) {
        data[children] = null;
      }
      if (forceInit && !data[children]) {
        data[children] = [];
      }
      return data[children];
    }
  }, {
    key: "updateChildren",
    value: function updateChildren() {
      var _this4 = this;
      var newData = this.getChildren() || [];
      var oldData = this.childNodes.map(function (node) {
        return node.data;
      });
      var newDataMap = {};
      var newNodes = [];
      newData.forEach(function (item, index) {
        var key = item[NODE_KEY];
        var isNodeExists = !!key && util.arrayFindIndex(oldData, function (data) {
          return data[NODE_KEY] === key;
        }) >= 0;
        if (isNodeExists) {
          newDataMap[key] = {
            index: index,
            data: item
          };
        } else {
          newNodes.push({
            index: index,
            data: item
          });
        }
      });
      if (!this.store.lazy) {
        oldData.forEach(function (item) {
          if (!newDataMap[item[NODE_KEY]]) _this4.removeChildByData(item);
        });
      }
      newNodes.forEach(function (_ref) {
        var index = _ref.index,
          data = _ref.data;
        _this4.insertChild({
          data: data
        }, index);
      });
      this.updateLeafState();
    }
  }, {
    key: "loadData",
    value: function loadData(callback) {
      var _this5 = this;
      var defaultProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.store.lazy === true && this.store.load && !this.loaded && (!this.loading || Object.keys(defaultProps).length)) {
        this.loading = true;
        var resolve = function resolve(children) {
          _this5.loaded = true;
          _this5.loading = false;
          _this5.childNodes = [];
          _this5.doCreateChildren(children, defaultProps);
          _this5.updateLeafState();
          if (callback) {
            callback.call(_this5, children);
          }
        };
        this.store.load(this, resolve);
      } else {
        if (callback) {
          callback.call(this);
        }
      }
    }
  }]);
  return Node;
}();var TreeStore = /*#__PURE__*/function () {
  function TreeStore(options) {
    var _this = this;
    _classCallCheck(this, TreeStore);
    this.currentNode = null;
    this.currentNodeKey = null;
    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }
    this.nodesMap = {};
    this.root = new Node({
      data: this.data,
      store: this
    });
    if (this.lazy && this.load) {
      var loadFn = this.load;
      loadFn(this.root, function (data) {
        _this.root.doCreateChildren(data);
        _this._initDefaultCheckedNodes();
      });
    } else {
      this._initDefaultCheckedNodes();
    }
  }
  _createClass(TreeStore, [{
    key: "filter",
    value: function filter(value) {
      var filterNodeMethod = this.filterNodeMethod;
      var lazy = this.lazy;
      var traverse = function traverse(node) {
        var childNodes = node.root ? node.root.childNodes : node.childNodes;
        childNodes.forEach(function (child) {
          child.visible = filterNodeMethod.call(child, value, child.data, child);
          traverse(child);
        });
        if (!node.visible && childNodes.length) {
          var allHidden = true;
          allHidden = !childNodes.some(function (child) {
            return child.visible;
          });
          if (node.root) {
            node.root.visible = allHidden === false;
          } else {
            node.visible = allHidden === false;
          }
        }
        if (!value) return;
        if (node.visible && !node.isLeaf && !lazy) node.expand();
      };
      traverse(this);
    }
  }, {
    key: "setData",
    value: function setData(newVal) {
      var instanceChanged = newVal !== this.root.data;
      if (instanceChanged) {
        this.root.setData(newVal);
        this._initDefaultCheckedNodes();
      } else {
        this.root.updateChildren();
      }
    }
  }, {
    key: "getNode",
    value: function getNode(data) {
      if (data instanceof Node) return data;
      var key = _typeof(data) !== 'object' ? data : getNodeKey(this.key, data);
      return this.nodesMap[key] || null;
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(data, refData) {
      var refNode = this.getNode(refData);
      refNode.parent.insertBefore({
        data: data
      }, refNode);
    }
  }, {
    key: "insertAfter",
    value: function insertAfter(data, refData) {
      var refNode = this.getNode(refData);
      refNode.parent.insertAfter({
        data: data
      }, refNode);
    }
  }, {
    key: "remove",
    value: function remove(data) {
      var node = this.getNode(data);
      if (node && node.parent) {
        if (node === this.currentNode) {
          this.currentNode = null;
        }
        node.parent.removeChild(node);
      }
    }
  }, {
    key: "append",
    value: function append(data, parentData) {
      var parentNode = parentData ? this.getNode(parentData) : this.root;
      if (parentNode) {
        parentNode.insertChild({
          data: data
        });
      }
    }
  }, {
    key: "_initDefaultCheckedNodes",
    value: function _initDefaultCheckedNodes() {
      var _this2 = this;
      var defaultCheckedKeys = this.defaultCheckedKeys || [];
      var nodesMap = this.nodesMap;
      defaultCheckedKeys.forEach(function (checkedKey) {
        var node = nodesMap[checkedKey];
        if (node) {
          node.setChecked(true, !_this2.checkStrictly);
        }
      });
    }
  }, {
    key: "_initDefaultCheckedNode",
    value: function _initDefaultCheckedNode(node) {
      var defaultCheckedKeys = this.defaultCheckedKeys || [];
      if (defaultCheckedKeys.indexOf(node.key) !== -1) {
        node.setChecked(true, !this.checkStrictly);
      }
    }
  }, {
    key: "setDefaultCheckedKey",
    value: function setDefaultCheckedKey(newVal) {
      if (newVal !== this.defaultCheckedKeys) {
        this.defaultCheckedKeys = newVal;
        this._initDefaultCheckedNodes();
      }
    }
  }, {
    key: "registerNode",
    value: function registerNode(node) {
      var key = this.key;
      if (!key || !node || !node.data) return;
      var nodeKey = node.key;
      if (nodeKey !== undefined) this.nodesMap[node.key] = node;
    }
  }, {
    key: "deregisterNode",
    value: function deregisterNode(node) {
      var _this3 = this;
      var key = this.key;
      if (!key || !node || !node.data) return;
      node.childNodes.forEach(function (child) {
        _this3.deregisterNode(child);
      });
      delete this.nodesMap[node.key];
    }
  }, {
    key: "getCheckedNodes",
    value: function getCheckedNodes() {
      var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var includeHalfChecked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var checkedNodes = [];
      var traverse = function traverse(node) {
        var childNodes = node.root ? node.root.childNodes : node.childNodes;
        childNodes.forEach(function (child) {
          if ((child.checked || includeHalfChecked && child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
            checkedNodes.push(child.data);
          }
          traverse(child);
        });
      };
      traverse(this);
      return checkedNodes;
    }
  }, {
    key: "getCheckedKeys",
    value: function getCheckedKeys() {
      var _this4 = this;
      var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this.getCheckedNodes(leafOnly).map(function (data) {
        return (data || {})[_this4.key];
      });
    }
  }, {
    key: "getHalfCheckedNodes",
    value: function getHalfCheckedNodes() {
      var nodes = [];
      var traverse = function traverse(node) {
        var childNodes = node.root ? node.root.childNodes : node.childNodes;
        childNodes.forEach(function (child) {
          if (child.indeterminate) {
            nodes.push(child.data);
          }
          traverse(child);
        });
      };
      traverse(this);
      return nodes;
    }
  }, {
    key: "getHalfCheckedKeys",
    value: function getHalfCheckedKeys() {
      var _this5 = this;
      return this.getHalfCheckedNodes().map(function (data) {
        return (data || {})[_this5.key];
      });
    }
  }, {
    key: "_getAllNodes",
    value: function _getAllNodes() {
      var allNodes = [];
      var nodesMap = this.nodesMap;
      for (var nodeKey in nodesMap) {
        if (nodesMap.hasOwnProperty(nodeKey)) {
          allNodes.push(nodesMap[nodeKey]);
        }
      }
      return allNodes;
    }
  }, {
    key: "updateChildren",
    value: function updateChildren(key, data) {
      var node = this.nodesMap[key];
      if (!node) return;
      var childNodes = node.childNodes;
      for (var i = childNodes.length - 1; i >= 0; i--) {
        var child = childNodes[i];
        this.remove(child.data);
      }
      for (var _i = 0, j = data.length; _i < j; _i++) {
        var _child = data[_i];
        this.append(_child, node.data);
      }
    }
  }, {
    key: "_setCheckedKeys",
    value: function _setCheckedKeys(key) {
      var _this6 = this;
      var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var checkedKeys = arguments.length > 2 ? arguments[2] : undefined;
      var allNodes = this._getAllNodes().sort(function (a, b) {
        return b.level - a.level;
      });
      var cache = Object.create(null);
      var keys = Object.keys(checkedKeys);
      allNodes.forEach(function (node) {
        return node.setChecked(false, false);
      });
      var _loop = function _loop() {
          var node = allNodes[i];
          var nodeKey = node.data[key].toString();
          var checked = keys.indexOf(nodeKey) > -1;
          if (!checked) {
            if (node.checked && !cache[nodeKey]) {
              node.setChecked(false, false);
            }
            return 0; // continue
          }
          var parent = node.parent;
          while (parent && parent.level > 0) {
            cache[parent.data[key]] = true;
            parent = parent.parent;
          }
          if (node.isLeaf || _this6.checkStrictly) {
            node.setChecked(true, false);
            return 0; // continue
          }
          node.setChecked(true, true);
          if (leafOnly) {
            node.setChecked(false, false);
            var traverse = function traverse(node) {
              var childNodes = node.childNodes;
              childNodes.forEach(function (child) {
                if (!child.isLeaf) {
                  child.setChecked(false, false);
                }
                traverse(child);
              });
            };
            traverse(node);
          }
        },
        _ret;
      for (var i = 0, j = allNodes.length; i < j; i++) {
        _ret = _loop();
        if (_ret === 0) continue;
      }
    }
  }, {
    key: "setCheckedNodes",
    value: function setCheckedNodes(array) {
      var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var key = this.key;
      var checkedKeys = {};
      array.forEach(function (item) {
        checkedKeys[(item || {})[key]] = true;
      });
      this._setCheckedKeys(key, leafOnly, checkedKeys);
    }
  }, {
    key: "setCheckedKeys",
    value: function setCheckedKeys(keys) {
      var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.defaultCheckedKeys = keys;
      var key = this.key;
      var checkedKeys = {};
      keys.forEach(function (key) {
        checkedKeys[key] = true;
      });
      this._setCheckedKeys(key, leafOnly, checkedKeys);
    }
  }, {
    key: "setDefaultExpandedKeys",
    value: function setDefaultExpandedKeys(keys) {
      var _this7 = this;
      keys = keys || [];
      this.defaultExpandedKeys = keys;
      keys.forEach(function (key) {
        var node = _this7.getNode(key);
        if (node) node.expand(null, _this7.autoExpandParent);
      });
    }
  }, {
    key: "setChecked",
    value: function setChecked(data, checked, deep) {
      var node = this.getNode(data);
      if (node) {
        node.setChecked(!!checked, deep);
      }
    }
  }, {
    key: "getCurrentNode",
    value: function getCurrentNode() {
      return this.currentNode;
    }
  }, {
    key: "setCurrentNode",
    value: function setCurrentNode(currentNode) {
      var prevCurrentNode = this.currentNode;
      if (prevCurrentNode) {
        prevCurrentNode.isCurrent = false;
      }
      this.currentNode = currentNode;
      this.currentNode.isCurrent = true;
    }
  }, {
    key: "setUserCurrentNode",
    value: function setUserCurrentNode(node) {
      var key = node[this.key];
      var currNode = this.nodesMap[key];
      this.setCurrentNode(currNode);
    }
  }, {
    key: "setCurrentNodeKey",
    value: function setCurrentNodeKey(key) {
      if (key === null || key === undefined) {
        this.currentNode && (this.currentNode.isCurrent = false);
        this.currentNode = null;
        return;
      }
      var node = this.getNode(key);
      if (node) {
        this.setCurrentNode(node);
      }
    }
  }]);
  return TreeStore;
}();var mixinNode = {
  methods: {
    handleDragStart: function handleDragStart(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-start', event, this);
    },
    handleDragOver: function handleDragOver(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-over', event, this);
      event.preventDefault();
    },
    handleDrop: function handleDrop(event) {
      event.preventDefault();
    },
    handleDragEnd: function handleDragEnd(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-end', event, this);
    },
    creator: function creator(parent, nodeTag) {
      var node = this[nodeTag];
      if (parent.isTree) {
        this.tree = parent;
      } else {
        this.tree = parent.tree;
      }
      var tree = this.tree;
      if (!tree) {
        console.warn("Can not find node's tree.");
      }
      var props = tree.props || {};
      var childrenKey = props['children'] || 'children';
      this.$watch("".concat(nodeTag, ".data.").concat(childrenKey), function () {
        node.updateChildren();
      });
      if (node.expanded) {
        this.expanded = true;
        this.childNodeRendered = true;
      }
      if (this.tree.accordion) {
        this.$on('tree-node-expand', function (currentNode) {
          if (node !== currentNode) {
            node.collapse();
          }
        });
      }
    },
    getNodeKey: function getNodeKey$1(node) {
      return getNodeKey(this.tree.nodeKey, node.data);
    },
    handleSelectChange: function handleSelectChange(checked, indeterminate) {
      var node = this.node || this.source;
      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
        this.tree.$emit('check-change', node.data, checked, indeterminate);
      }
      this.oldChecked = checked;
      this.indeterminate = indeterminate;
    },
    handleClick: function handleClick() {
      var node = this.node || this.source;
      var store = this.tree.store;
      store.setCurrentNode(node);
      this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
      this.tree.currentNode = this;
      if (this.tree.expandOnClickNode) {
        this.handleExpandIconClick();
      }
      if (this.tree.checkOnClickNode && !node.disabled) {
        this.handleCheckChange(null, {
          target: {
            checked: !node.checked
          }
        });
      }
      this.tree.$emit('node-click', node.data, node, this);
    },
    handleContextMenu: function handleContextMenu(event) {
      var node = this.node || this.source;
      if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
        event.stopPropagation();
        event.preventDefault();
      }
      this.tree.$emit('node-contextmenu', event, node.data, node, this);
    },
    handleExpandIconClick: function handleExpandIconClick() {
      var node = this.node || this.source;
      if (node.isLeaf) return;
      if (this.expanded) {
        this.tree.$emit('node-collapse', node.data, node, this);
        node.collapse();
      } else {
        node.expand();
        this.$emit('node-expand', node.data, node, this);
      }
    },
    handleCheckChange: function handleCheckChange(_, ev) {
      var _this = this;
      var node = this.node || this.source;
      node.setChecked(ev.target.checked, !this.tree.checkStrictly);
      this.$nextTick(function () {
        var store = _this.tree.store;
        _this.tree.$emit('check', node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys()
        });
      });
    },
    handleChildNodeExpand: function handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('ElTreeNode', 'tree-node-expand', node);
      this.tree.$emit('node-expand', nodeData, node, instance);
    }
  }
};//
var script$3 = {
  name: 'ElTreeNode',
  componentName: 'ElTreeNode',
  mixins: [emitter__default["default"], mixinNode],
  props: {
    node: {
      default: function _default() {
        return {};
      }
    },
    props: {},
    renderContent: Function,
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ElCollapseTransition: ElCollapseTransition__default["default"],
    ElCheckbox: ElCheckbox__default["default"],
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render: function render(h) {
        var parent = this.$parent;
        var tree = parent.tree;
        var node = this.node;
        var data = node.data,
          store = node.store;
        return parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, {
          _self: tree.$vnode.context,
          node: node,
          data: data,
          store: store
        }) : tree.$scopedSlots.default ? tree.$scopedSlots.default({
          node: node,
          data: data
        }) : h("span", {
          "class": "el-tree-node__label"
        }, [node.label]);
      }
    }
  },
  data: function data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      oldChecked: null,
      oldIndeterminate: null
    };
  },
  watch: {
    'node.indeterminate': function nodeIndeterminate(val) {
      this.handleSelectChange(this.node.checked, val);
    },
    'node.checked': function nodeChecked(val) {
      this.handleSelectChange(val, this.node.indeterminate);
    },
    'node.expanded': function nodeExpanded(val) {
      var _this = this;
      this.$nextTick(function () {
        return _this.expanded = val;
      });
      if (val) {
        this.childNodeRendered = true;
      }
    }
  },
  methods: {
    getNodeKey: function getNodeKey$1(node) {
      return getNodeKey(this.tree.nodeKey, node.data);
    },
    handleDragStart: function handleDragStart(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-start', event, this);
    },
    handleDragOver: function handleDragOver(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-over', event, this);
      event.preventDefault();
    },
    handleDrop: function handleDrop(event) {
      event.preventDefault();
    },
    handleDragEnd: function handleDragEnd(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-end', event, this);
    }
  },
  created: function created() {
    var parent = this.$parent;
    this.creator(parent, 'node');
  }
};/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function __vue_render__() {
  var this$1$1 = this;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.node.visible,
      expression: "node.visible"
    }],
    ref: "node",
    staticClass: "el-tree-node",
    class: {
      'is-expanded': _vm.expanded,
      'is-current': _vm.node.isCurrent,
      'is-hidden': !_vm.node.visible,
      'is-focusable': !_vm.node.disabled,
      'is-checked': !_vm.node.disabled && _vm.node.checked
    },
    attrs: {
      "role": "treeitem",
      "tabindex": "-1",
      "aria-expanded": _vm.expanded,
      "aria-disabled": _vm.node.disabled,
      "aria-checked": _vm.node.checked,
      "draggable": _vm.tree.draggable
    },
    on: {
      "click": function click($event) {
        $event.stopPropagation();
        return _vm.handleClick.apply(null, arguments);
      },
      "contextmenu": function contextmenu($event) {
        return this$1$1.handleContextMenu($event);
      },
      "dragstart": function dragstart($event) {
        $event.stopPropagation();
        return _vm.handleDragStart.apply(null, arguments);
      },
      "dragover": function dragover($event) {
        $event.stopPropagation();
        return _vm.handleDragOver.apply(null, arguments);
      },
      "dragend": function dragend($event) {
        $event.stopPropagation();
        return _vm.handleDragEnd.apply(null, arguments);
      },
      "drop": function drop($event) {
        $event.stopPropagation();
        return _vm.handleDrop.apply(null, arguments);
      }
    }
  }, [_vm._ssrNode("<div class=\"el-tree-node__content\"" + _vm._ssrStyle(null, {
    'padding-left': (_vm.node.level - 1) * _vm.tree.indent + 'px'
  }, null) + ">", "</div>", [_vm._ssrNode("<span" + _vm._ssrClass(null, [{
    'is-leaf': _vm.node.isLeaf,
    expanded: !_vm.node.isLeaf && _vm.expanded
  }, 'el-tree-node__expand-icon', _vm.tree.iconClass ? _vm.tree.iconClass : 'el-icon-caret-right']) + "></span> "), _vm.showCheckbox ? _c('el-checkbox', {
    attrs: {
      "indeterminate": _vm.node.indeterminate,
      "disabled": !!_vm.node.disabled
    },
    on: {
      "change": _vm.handleCheckChange
    },
    nativeOn: {
      "click": function click($event) {
        $event.stopPropagation();
      }
    },
    model: {
      value: _vm.node.checked,
      callback: function callback($$v) {
        _vm.$set(_vm.node, "checked", $$v);
      },
      expression: "node.checked"
    }
  }) : _vm._e(), _vm._ssrNode(" " + (_vm.node.loading ? "<span class=\"el-tree-node__loading-icon el-icon-loading\"></span>" : "<!---->") + " "), _c('node-content', {
    attrs: {
      "node": _vm.node
    }
  })], 2), _vm._ssrNode(" "), _c('el-collapse-transition', [!_vm.renderAfterExpand || _vm.childNodeRendered ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.expanded,
      expression: "expanded"
    }],
    staticClass: "el-tree-node__children",
    attrs: {
      "role": "group",
      "aria-expanded": _vm.expanded
    }
  }, _vm._l(_vm.node.childNodes, function (child) {
    return _c('el-tree-node', {
      key: _vm.getNodeKey(child),
      attrs: {
        "render-content": _vm.renderContent,
        "render-after-expand": _vm.renderAfterExpand,
        "show-checkbox": _vm.showCheckbox,
        "node": child
      },
      on: {
        "node-expand": _vm.handleChildNodeExpand
      }
    });
  }), 1) : _vm._e()])], 2);
};
var __vue_staticRenderFns__$3 = [];

/* style */
var __vue_inject_styles__$3 = undefined;
/* scoped */
var __vue_scope_id__$3 = undefined;
/* module identifier */
var __vue_module_identifier__$3 = "data-v-3f1aea5c";
/* functional template */
var __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);//
var script$2 = {
  name: 'ElTreeVirtualNode',
  componentName: 'ElTreeVirtualNode',
  mixins: [emitter__default["default"], mixinNode],
  props: {
    source: {
      default: function _default() {
        return {};
      }
    },
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ElCheckbox: ElCheckbox__default["default"],
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render: function render(h) {
        var parent = this.$parent;
        var tree = parent.tree;
        var node = this.node;
        var data = node.data,
          store = node.store;
        return parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, {
          _self: tree.$vnode.context,
          node: node,
          data: data,
          store: store
        }) : tree.$scopedSlots.default ? tree.$scopedSlots.default({
          node: node,
          data: data
        }) : h("span", {
          "class": "el-tree-node__label"
        }, [node.label]);
      }
    }
  },
  data: function data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      oldChecked: null,
      oldIndeterminate: null
    };
  },
  watch: {
    'source.indeterminate': function sourceIndeterminate(val) {
      this.handleSelectChange(this.source.checked, val);
    },
    'source.checked': function sourceChecked(val) {
      this.handleSelectChange(val, this.source.indeterminate);
    },
    'source.expanded': function sourceExpanded(val) {
      var _this = this;
      this.$nextTick(function () {
        return _this.expanded = val;
      });
      if (val) {
        this.childNodeRendered = true;
      }
    }
  },
  created: function created() {
    var parent = this.$parent.$parent.$parent;
    this.node = this.source;
    this.creator(parent, 'source');
  }
};/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function __vue_render__() {
  var this$1$1 = this;
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.source.visible,
      expression: "source.visible"
    }],
    ref: "node",
    staticClass: "el-tree-node",
    class: {
      'is-expanded': _vm.expanded,
      'is-current': _vm.source.isCurrent,
      'is-hidden': !_vm.source.visible,
      'is-focusable': !_vm.source.disabled,
      'is-checked': !_vm.source.disabled && _vm.source.checked
    },
    attrs: {
      "role": "treeitem",
      "tabindex": "-1",
      "aria-expanded": _vm.expanded,
      "aria-disabled": _vm.source.disabled,
      "aria-checked": _vm.source.checked,
      "draggable": _vm.tree.draggable
    },
    on: {
      "click": function click($event) {
        $event.stopPropagation();
        return _vm.handleClick.apply(null, arguments);
      },
      "contextmenu": function contextmenu($event) {
        return this$1$1.handleContextMenu($event);
      },
      "dragstart": function dragstart($event) {
        $event.stopPropagation();
        return _vm.handleDragStart.apply(null, arguments);
      },
      "dragover": function dragover($event) {
        $event.stopPropagation();
        return _vm.handleDragOver.apply(null, arguments);
      },
      "dragend": function dragend($event) {
        $event.stopPropagation();
        return _vm.handleDragEnd.apply(null, arguments);
      },
      "drop": function drop($event) {
        $event.stopPropagation();
        return _vm.handleDrop.apply(null, arguments);
      }
    }
  }, [_vm._ssrNode("<div class=\"el-tree-node__content\">", "</div>", [_vm._ssrNode("<span aria-hidden=\"true\"" + _vm._ssrStyle(null, {
    'min-width': (_vm.source.level - 1) * _vm.tree.indent + 'px'
  }, null) + "></span> <span" + _vm._ssrClass(null, [{
    'is-leaf': _vm.source.isLeaf,
    expanded: !_vm.source.isLeaf && _vm.expanded
  }, 'el-tree-node__expand-icon', _vm.tree.iconClass ? _vm.tree.iconClass : 'el-icon-caret-right']) + "></span> "), _vm.showCheckbox ? _c('el-checkbox', {
    attrs: {
      "indeterminate": _vm.source.indeterminate,
      "disabled": !!_vm.source.disabled
    },
    on: {
      "change": _vm.handleCheckChange
    },
    nativeOn: {
      "click": function click($event) {
        $event.stopPropagation();
      }
    },
    model: {
      value: _vm.source.checked,
      callback: function callback($$v) {
        _vm.$set(_vm.source, "checked", $$v);
      },
      expression: "source.checked"
    }
  }) : _vm._e(), _vm._ssrNode(" " + (_vm.source.loading ? "<span class=\"el-tree-node__loading-icon el-icon-loading\"></span>" : "<!---->") + " "), _c('node-content', {
    attrs: {
      "node": _vm.source
    }
  })], 2)]);
};
var __vue_staticRenderFns__$2 = [];

/* style */
var __vue_inject_styles__$2 = undefined;
/* scoped */
var __vue_scope_id__$2 = undefined;
/* module identifier */
var __vue_module_identifier__$2 = "data-v-345c55aa";
/* functional template */
var __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);var script$1 = {
  name: 'ElTree',
  mixins: [emitter__default["default"]],
  components: {
    VirtualList: VirtualList__default["default"],
    ElTreeNode: __vue_component__$4
  },
  data: function data() {
    return {
      store: null,
      root: null,
      currentNode: null,
      treeItems: null,
      checkboxItems: [],
      dragState: {
        showDropIndicator: false,
        draggingNode: null,
        dropNode: null,
        allowDrop: true
      },
      itemComponent: __vue_component__$3
    };
  },
  props: {
    data: {
      type: Array
    },
    emptyText: {
      type: String,
      default: function _default() {
        return locale.t('el.tree.emptyText');
      }
    },
    renderAfterExpand: {
      type: Boolean,
      default: true
    },
    nodeKey: String,
    checkStrictly: Boolean,
    defaultExpandAll: Boolean,
    expandOnClickNode: {
      type: Boolean,
      default: true
    },
    checkOnClickNode: Boolean,
    checkDescendants: {
      type: Boolean,
      default: false
    },
    autoExpandParent: {
      type: Boolean,
      default: true
    },
    defaultCheckedKeys: Array,
    defaultExpandedKeys: Array,
    currentNodeKey: [String, Number],
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    allowDrag: Function,
    allowDrop: Function,
    props: {
      default: function _default() {
        return {
          children: 'children',
          label: 'label',
          disabled: 'disabled'
        };
      }
    },
    lazy: {
      type: Boolean,
      default: false
    },
    highlightCurrent: Boolean,
    load: Function,
    filterNodeMethod: Function,
    accordion: Boolean,
    indent: {
      type: Number,
      default: 18
    },
    iconClass: String,
    height: {
      type: [String, Number],
      default: 0
    },
    extraLine: {
      type: Number,
      default: 8
    }
  },
  computed: {
    children: {
      set: function set(value) {
        this.data = value;
      },
      get: function get() {
        return this.data;
      }
    },
    treeItemArray: function treeItemArray() {
      return Array.prototype.slice.call(this.treeItems);
    },
    isEmpty: function isEmpty() {
      var childNodes = this.root.childNodes;
      return !childNodes || childNodes.length === 0 || childNodes.every(function (_ref) {
        var visible = _ref.visible;
        return !visible;
      });
    },
    visibleList: function visibleList() {
      return this.flattenTree(this.root.childNodes);
    }
  },
  watch: {
    defaultCheckedKeys: function defaultCheckedKeys(newVal) {
      this.store.setDefaultCheckedKey(newVal);
    },
    defaultExpandedKeys: function defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    },
    data: function data(newVal) {
      this.store.setData(newVal);
    },
    checkboxItems: function checkboxItems(val) {
      Array.prototype.forEach.call(val, function (checkbox) {
        checkbox.setAttribute('tabindex', -1);
      });
    },
    checkStrictly: function checkStrictly(newVal) {
      this.store.checkStrictly = newVal;
    }
  },
  methods: {
    flattenTree: function flattenTree(datas) {
      var _this = this;
      return datas.reduce(function (conn, data) {
        if (data.visible) {
          conn.push(data);
        }
        if (data.expanded && data.childNodes.length) {
          conn.push.apply(conn, _toConsumableArray(_this.flattenTree(data.childNodes)));
        }
        return conn;
      }, []);
    },
    filter: function filter(value) {
      if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
      this.store.filter(value);
    },
    getNodeKey: function getNodeKey$1(node) {
      return getNodeKey(this.nodeKey, node.data);
    },
    getNodePath: function getNodePath(data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath');
      var node = this.store.getNode(data);
      if (!node) return [];
      var path = [node.data];
      var parent = node.parent;
      while (parent && parent !== this.root) {
        path.push(parent.data);
        parent = parent.parent;
      }
      return path.reverse();
    },
    getCheckedNodes: function getCheckedNodes(leafOnly, includeHalfChecked) {
      return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
    },
    getCheckedKeys: function getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    },
    getCurrentNode: function getCurrentNode() {
      var currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },
    getCurrentKey: function getCurrentKey() {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
      var currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },
    setCheckedNodes: function setCheckedNodes(nodes, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedNodes(nodes, leafOnly);
    },
    setCheckedKeys: function setCheckedKeys(keys, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys');
      this.store.setCheckedKeys(keys, leafOnly);
    },
    setChecked: function setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    },
    getHalfCheckedNodes: function getHalfCheckedNodes() {
      return this.store.getHalfCheckedNodes();
    },
    getHalfCheckedKeys: function getHalfCheckedKeys() {
      return this.store.getHalfCheckedKeys();
    },
    setCurrentNode: function setCurrentNode(node) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode');
      this.store.setUserCurrentNode(node);
    },
    setCurrentKey: function setCurrentKey(key) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey');
      this.store.setCurrentNodeKey(key);
    },
    getNode: function getNode(data) {
      return this.store.getNode(data);
    },
    remove: function remove(data) {
      this.store.remove(data);
    },
    append: function append(data, parentNode) {
      this.store.append(data, parentNode);
    },
    insertBefore: function insertBefore(data, refNode) {
      this.store.insertBefore(data, refNode);
    },
    insertAfter: function insertAfter(data, refNode) {
      this.store.insertAfter(data, refNode);
    },
    handleNodeExpand: function handleNodeExpand(nodeData, node, instance) {
      this.broadcast('ElTreeNode', 'tree-node-expand', node);
      this.$emit('node-expand', nodeData, node, instance);
    },
    updateKeyChildren: function updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
      this.store.updateChildren(key, data);
    },
    initTabIndex: function initTabIndex() {
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
      this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
      var checkedItem = this.$el.querySelectorAll('.is-checked[role=treeitem]');
      if (checkedItem.length) {
        checkedItem[0].setAttribute('tabindex', 0);
        return;
      }
      this.treeItems[0] && this.treeItems[0].setAttribute('tabindex', 0);
    },
    handleKeydown: function handleKeydown(ev) {
      var currentItem = ev.target;
      if (currentItem.className.indexOf('el-tree-node') === -1) return;
      var keyCode = ev.keyCode;
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
      var currentIndex = this.treeItemArray.indexOf(currentItem);
      var nextIndex;
      if ([38, 40].indexOf(keyCode) > -1) {
        // up、down
        ev.preventDefault();
        if (keyCode === 38) {
          // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
        } else {
          nextIndex = currentIndex < this.treeItemArray.length - 1 ? currentIndex + 1 : 0;
        }
        this.treeItemArray[nextIndex].focus(); // 选中
      }

      if ([37, 39].indexOf(keyCode) > -1) {
        // left、right 展开
        ev.preventDefault();
        currentItem.click(); // 选中
      }

      var hasInput = currentItem.querySelector('[type="checkbox"]');
      if ([13, 32].indexOf(keyCode) > -1 && hasInput) {
        // space enter选中checkbox
        ev.preventDefault();
        hasInput.click();
      }
    }
  },
  created: function created() {
    var _this2 = this;
    this.isTree = true;
    this.store = new TreeStore({
      key: this.nodeKey,
      data: this.data,
      lazy: this.lazy,
      props: this.props,
      load: this.load,
      currentNodeKey: this.currentNodeKey,
      checkStrictly: this.checkStrictly,
      checkDescendants: this.checkDescendants,
      defaultCheckedKeys: this.defaultCheckedKeys,
      defaultExpandedKeys: this.defaultExpandedKeys,
      autoExpandParent: this.autoExpandParent,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod
    });
    this.root = this.store.root;
    var dragState = this.dragState;
    this.$on('tree-node-drag-start', function (event, treeNode) {
      if (typeof _this2.allowDrag === 'function' && !_this2.allowDrag(treeNode.node)) {
        event.preventDefault();
        return false;
      }
      event.dataTransfer.effectAllowed = 'move';

      // wrap in try catch to address IE's error when first param is 'text/plain'
      try {
        // setData is required for draggable to work in FireFox
        // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
        event.dataTransfer.setData('text/plain', '');
      } catch (e) {
        console.log(e);
      }
      dragState.draggingNode = treeNode;
      _this2.$emit('node-drag-start', treeNode.node, event);
    });
    this.$on('tree-node-drag-over', function (event, treeNode) {
      var dropNode = findNearestComponent(event.target, 'ElTreeVirtualNode');
      var oldDropNode = dragState.dropNode;
      if (oldDropNode && oldDropNode !== dropNode) {
        dom.removeClass(oldDropNode.$el, 'is-drop-inner');
      }
      var draggingNode = dragState.draggingNode;
      if (!draggingNode || !dropNode) return;
      var dropPrev = true;
      var dropInner = true;
      var dropNext = true;
      var userAllowDropInner = true;
      if (typeof _this2.allowDrop === 'function') {
        dropPrev = _this2.allowDrop(draggingNode.node, dropNode.node, 'prev');
        userAllowDropInner = dropInner = _this2.allowDrop(draggingNode.node, dropNode.node, 'inner');
        dropNext = _this2.allowDrop(draggingNode.node, dropNode.node, 'next');
      }
      event.dataTransfer.dropEffect = dropInner ? 'move' : 'none';
      if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
        if (oldDropNode) {
          _this2.$emit('node-drag-leave', draggingNode.node, oldDropNode.node, event);
        }
        _this2.$emit('node-drag-enter', draggingNode.node, dropNode.node, event);
      }
      if (dropPrev || dropInner || dropNext) {
        dragState.dropNode = dropNode;
      }
      if (dropNode.node.nextSibling === draggingNode.node) {
        dropNext = false;
      }
      if (dropNode.node.previousSibling === draggingNode.node) {
        dropPrev = false;
      }
      if (dropNode.node.contains(draggingNode.node, false)) {
        dropInner = false;
      }
      if (draggingNode.node === dropNode.node || draggingNode.node.contains(dropNode.node)) {
        dropPrev = false;
        dropInner = false;
        dropNext = false;
      }
      var targetPosition = dropNode.$el.getBoundingClientRect();
      var treePosition = _this2.$el.getBoundingClientRect();
      var dropType;
      var prevPercent = dropPrev ? dropInner ? 0.25 : dropNext ? 0.45 : 1 : -1;
      var nextPercent = dropNext ? dropInner ? 0.75 : dropPrev ? 0.55 : 0 : 1;
      var indicatorTop = -9999;
      var distance = event.clientY - targetPosition.top;
      if (distance < targetPosition.height * prevPercent) {
        dropType = 'before';
      } else if (distance > targetPosition.height * nextPercent) {
        dropType = 'after';
      } else if (dropInner) {
        dropType = 'inner';
      } else {
        dropType = 'none';
      }
      var iconPosition = dropNode.$el.querySelector('.el-tree-node__expand-icon').getBoundingClientRect();
      var dropIndicator = _this2.$refs.dropIndicator;
      if (dropType === 'before') {
        indicatorTop = iconPosition.top - treePosition.top;
      } else if (dropType === 'after') {
        indicatorTop = iconPosition.bottom - treePosition.top;
      }
      dropIndicator.style.top = indicatorTop + 'px';
      dropIndicator.style.left = iconPosition.right - treePosition.left + 'px';
      if (dropType === 'inner') {
        dom.addClass(dropNode.$el, 'is-drop-inner');
      } else {
        dom.removeClass(dropNode.$el, 'is-drop-inner');
      }
      dragState.showDropIndicator = dropType === 'before' || dropType === 'after';
      dragState.allowDrop = dragState.showDropIndicator || userAllowDropInner;
      dragState.dropType = dropType;
      _this2.$emit('node-drag-over', draggingNode.node, dropNode.node, event);
    });
    this.$on('tree-node-drag-end', function (event) {
      var draggingNode = dragState.draggingNode,
        dropType = dragState.dropType,
        dropNode = dragState.dropNode;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      if (draggingNode && dropNode) {
        var draggingNodeCopy = {
          data: draggingNode.node.data
        };
        if (dropType !== 'none') {
          draggingNode.node.remove();
        }
        if (dropType === 'before') {
          dropNode.node.parent.insertBefore(draggingNodeCopy, dropNode.node);
        } else if (dropType === 'after') {
          dropNode.node.parent.insertAfter(draggingNodeCopy, dropNode.node);
        } else if (dropType === 'inner') {
          dropNode.node.insertChild(draggingNodeCopy);
        }
        if (dropType !== 'none') {
          _this2.store.registerNode(draggingNodeCopy);
        }
        dom.removeClass(dropNode.$el, 'is-drop-inner');
        _this2.$emit('node-drag-end', draggingNode.node, dropNode.node, dropType, event);
        if (dropType !== 'none') {
          _this2.$emit('node-drop', draggingNode.node, dropNode.node, dropType, event);
        }
      }
      if (draggingNode && !dropNode) {
        _this2.$emit('node-drag-end', draggingNode.node, null, dropType, event);
      }
      dragState.showDropIndicator = false;
      dragState.draggingNode = null;
      dragState.dropNode = null;
      dragState.allowDrop = true;
    });
  },
  mounted: function mounted() {
    this.initTabIndex();
    this.$el.addEventListener('keydown', this.handleKeydown);
  },
  updated: function updated() {
    this.treeItems = this.$el.querySelectorAll('[role=treeitem]');
    this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
  }
};/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "el-tree",
    class: {
      'el-tree--highlight-current': _vm.highlightCurrent,
      'is-dragging': !!_vm.dragState.draggingNode,
      'is-drop-not-allow': !_vm.dragState.allowDrop,
      'is-drop-inner': _vm.dragState.dropType === 'inner'
    },
    attrs: {
      "role": "tree"
    }
  }, [_vm.height ? _c('virtual-list', {
    style: {
      'max-height': _vm.height,
      'overflow-y': 'auto'
    },
    attrs: {
      "data-key": _vm.getNodeKey,
      "data-sources": _vm.visibleList,
      "data-component": _vm.itemComponent,
      "extra-props": {
        renderAfterExpand: _vm.renderAfterExpand,
        showCheckbox: _vm.showCheckbox,
        renderContent: _vm.renderContent,
        onNodeExpand: _vm.handleNodeExpand
      }
    }
  }) : _vm._l(_vm.root.childNodes, function (child) {
    return _c('el-tree-node', {
      key: _vm.getNodeKey(child),
      attrs: {
        "node": child,
        "props": _vm.props,
        "render-after-expand": _vm.renderAfterExpand,
        "show-checkbox": _vm.showCheckbox,
        "render-content": _vm.renderContent
      },
      on: {
        "node-expand": _vm.handleNodeExpand
      }
    });
  }), _vm._ssrNode(" " + (_vm.isEmpty ? "<div class=\"el-tree__empty-block\"><span class=\"el-tree__empty-text\">" + _vm._ssrEscape(_vm._s(_vm.emptyText)) + "</span></div>" : "<!---->") + " <div class=\"el-tree__drop-indicator\"" + _vm._ssrStyle(null, null, {
    display: _vm.dragState.showDropIndicator ? '' : 'none'
  }) + "></div>")], 2);
};
var __vue_staticRenderFns__$1 = [];

/* style */
var __vue_inject_styles__$1 = undefined;
/* scoped */
var __vue_scope_id__$1 = undefined;
/* module identifier */
var __vue_module_identifier__$1 = "data-v-0b261c29";
/* functional template */
var __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);__vue_component__$2.install = function (Vue) {
  Vue.component(__vue_component__$2.name, __vue_component__$2);
};//
var script = {
  directives: {
    Clickoutside: Clickoutside__default["default"]
  },
  props: {
    value: [],
    height: {
      type: String,
      default: '200px'
    }
  },
  data: function data() {
    return {
      popperVisible: false,
      store: treeData
    };
  },
  components: {
    ElTagInput: __vue_component__$5,
    ElVirtualTree: __vue_component__$2
  },
  watch: {
    'store.selectKeys': {
      handler: function handler(val) {
        var _this = this;
        this.$nextTick(function () {
          _this.$refs.tree.setCheckedKeys([]);
          // TODO: 直接使用setCheckedKeys(val)会导致无法选中，需要遍历使用setChecked
          val && val.forEach(function (el) {
            _this.$refs.tree.setChecked(el, true, false);
          });
          _this.$refs.popper.updatePopper();
        });
      },
      deep: true
    }
  },
  methods: {
    searchTextChange: function searchTextChange(val) {
      this.$refs.tree.filter(val);
    },
    currentChange: function currentChange(checkItem, checkObj) {
      var _this2 = this;
      this.$emit('update:value', checkObj.checkedKeys);
      treeData.selectKeys = checkObj.checkedKeys;
      treeData.selectNodes = checkObj.checkedNodes;
      // TODO: 需要使用setTimeout，否则无法清空
      setTimeout(function () {
        _this2.$refs.popper.updatePopper();
      }, 400);
    },
    filterNode: function filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    focus: function focus() {
      this.popperVisible = true;
    },
    hide: function hide() {
      this.popperVisible = false;
    },
    clear: function clear() {
      var _this3 = this;
      this.$refs.tree.setCheckedKeys([]);
      // TODO: 需要使用setTimeout，否则无法清空
      setTimeout(function () {
        _this3.$refs.popper.updatePopper();
      }, 400);
    }
  }
};/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function __vue_render__() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c('div', {
    staticClass: "container"
  }, [_c('el-popover', {
    directives: [{
      name: "clickoutside",
      rawName: "v-clickoutside",
      value: _vm.hide,
      expression: "hide"
    }],
    ref: "popper",
    staticClass: "select-ele-tree",
    attrs: {
      "trigger": "manual",
      "placement": "bottom-start",
      "visible-arrow": false,
      "append-to-body": false,
      "popper-class": "popper"
    },
    model: {
      value: _vm.popperVisible,
      callback: function callback($$v) {
        _vm.popperVisible = $$v;
      },
      expression: "popperVisible"
    }
  }, [_c('el-scrollbar', {
    staticStyle: {
      "min-height": "200px"
    }
  }, [_c('el-virtual-tree', _vm._b({
    ref: "tree",
    attrs: {
      "show-checkbox": "",
      "node-key": "id",
      "height": _vm.height,
      "filter-node-method": _vm.filterNode
    },
    on: {
      "check": _vm.currentChange
    }
  }, 'el-virtual-tree', _vm.$attrs, false))], 1), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "reference"
    },
    slot: "reference"
  }, [_c('el-tag-input', {
    attrs: {
      "size": "small"
    },
    on: {
      "searchTextChange": _vm.searchTextChange,
      "focus": _vm.focus,
      "clear": _vm.clear
    }
  })], 1)], 1)], 1);
};
var __vue_staticRenderFns__ = [];

/* style */
var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-02ce6fc8_0", {
    source: ".container[data-v-02ce6fc8]{position:relative;display:inline-block;width:100%}[data-v-02ce6fc8] .popper.el-popper{margin-top:0;box-sizing:border-box;width:100%;padding:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
var __vue_scope_id__ = "data-v-02ce6fc8";
/* module identifier */
var __vue_module_identifier__ = "data-v-02ce6fc8";
/* functional template */
var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);
var __vue_component__$1 = __vue_component__;Vue__default["default"].use(ElementUI__default["default"]);var components$1=/*#__PURE__*/Object.freeze({__proto__:null,EleTreeVirtual:__vue_component__$1});// install function executed by Vue.use()
var install = function installVue2SelectTree(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];
    Vue.component(componentName, component);
  });
};var components=/*#__PURE__*/Object.freeze({__proto__:null,'default':install,EleTreeVirtual:__vue_component__$1});// Attach named exports directly to plugin. IIFE/CJS will
// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)
Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    componentName = _ref2[0],
    component = _ref2[1];
  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;