import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Clickoutside from 'element-ui/src/utils/clickoutside';
import objectAssign from 'element-ui/src/utils/merge';
import { arrayFindIndex } from 'element-ui/src/utils/util';
import VirtualList from 'vue-virtual-scroll-list';
import ElCollapseTransition from 'element-ui/src/transitions/collapse-transition';
import ElCheckbox from 'element-ui/packages/checkbox';
import emitter from 'element-ui/src/mixins/emitter';
import { t } from 'element-ui/src/locale';
import { removeClass, addClass } from 'element-ui/src/utils/dom';

const treeData = {
  selectKeys: [],
  selectNodes: [],
  pop() {
    this.selectKeys.pop();
    this.selectNodes.pop();
  },
  remove(index) {
    this.selectKeys.splice(index, 1);
    this.selectNodes.splice(index, 1);
  },
  clear() {
    this.selectKeys = [];
    this.selectNodes = [];
  }
};

//
var script$4 = {
  name: 'ElInputTag',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    addTagOnKeys: {
      type: Array,
      default: () => [13, 188, 9]
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    size: String,
    placeholder: String
  },
  data() {
    return {
      store: treeData,
      newTag: ''
    };
  },
  methods: {
    focusTagInput() {
      if (this.readOnly || !this.$el.querySelector('.tag-input')) {
        return;
      } else {
        this.$el.querySelector('.tag-input').focus();
      }
    },
    addTag(tag) {
      tag = tag.trim();
      if (tag && !this.innerTags.includes(tag)) {
        this.innerTags.push(tag);
        return true;
      }
      return false;
    },
    remove(index) {
      treeData.remove(index);
    },
    focus() {
      this.$emit('focus');
    },
    blur() {
      this.$emit('blur');
    },
    searchTextChange(val) {
      const text = val.target.value;
      this.$emit('searchTextChange', text);
    },
    clear() {
      treeData.selectKeys = [];
      treeData.selectNodes = [];
      this.$emit('clear');
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {
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
        "close": function ($event) {
          return _vm.remove(idx);
        }
      }
    }, 'el-tag', _vm.$attrs, false), [_vm._v("\n    " + _vm._s(tag.label) + "\n  ")]);
  }), _vm._v(" "), !_vm.readOnly ? _c('input', {
    staticClass: "tag-input",
    attrs: {
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": _vm.newTag
    },
    on: {
      "blur": _vm.blur,
      "focus": _vm.focus,
      "input": _vm.searchTextChange
    }
  }) : _vm._e(), _vm._v(" "), _c('i', {
    staticClass: "el-icon-close icon-close",
    on: {
      "click": _vm.clear
    }
  })], 2);
};
var __vue_staticRenderFns__$4 = [];

/* style */
const __vue_inject_styles__$4 = function (inject) {
  if (!inject) return;
  inject("data-v-52c20492_0", {
    source: ".el-form-item.is-error .el-input-tag[data-v-52c20492]{border-color:#f56c6c}.input-tag-wrapper[data-v-52c20492]{position:relative;font-size:14px;background-color:#fff;background-image:none;border-radius:4px;border:1px solid #dcdfe6;box-sizing:border-box;color:#606266;display:inline-block;outline:0;padding:0 10px 0 5px;transition:border-color .2s cubic-bezier(.645,.045,.355,1);width:100%}.el-tag[data-v-52c20492]{margin-right:4px}.tag-input[data-v-52c20492]{min-height:30px;background:0 0;border:0;font-size:inherit;outline:0;padding-left:0;width:100px}.el-input-tag[data-v-52c20492]{text-align:left;display:flex;flex-direction:row;flex-wrap:wrap;padding-top:3px;padding-bottom:3px;min-height:42px}.el-input-tag--mini[data-v-52c20492]{min-height:28px;line-height:28px;font-size:12px}.el-input-tag--small[data-v-52c20492]{min-height:32px;line-height:32px}.el-input-tag--medium[data-v-52c20492]{min-height:36px;line-height:36px}.icon-close[data-v-52c20492]{position:absolute;right:5px;top:50%;transform:translateY(-50%)}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__$4 = "data-v-52c20492";
/* module identifier */
const __vue_module_identifier__$4 = undefined;
/* functional template */
const __vue_is_functional_template__$4 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$5 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$4,
  staticRenderFns: __vue_staticRenderFns__$4
}, __vue_inject_styles__$4, __vue_script__$4, __vue_scope_id__$4, __vue_is_functional_template__$4, __vue_module_identifier__$4, false, createInjector, undefined, undefined);

const NODE_KEY = '$treeNodeId';
const markNodeData = function (node, data) {
  if (!data || data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};
const getNodeKey = function (key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};
const findNearestComponent = (element, componentName) => {
  let target = element;
  while (target && target.tagName !== 'BODY') {
    if (target.__vue__ && target.__vue__.$options.name === componentName) {
      return target.__vue__;
    }
    target = target.parentNode;
  }
  return null;
};

const getChildState = node => {
  let all = true;
  let none = true;
  let allWithoutDisable = true;
  for (let i = 0, j = node.length; i < j; i++) {
    const n = node[i];
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
    all,
    none,
    allWithoutDisable,
    half: !all && !none
  };
};
const reInitChecked = function (node) {
  if (node.childNodes.length === 0) return;
  const {
    all,
    none,
    half
  } = getChildState(node.childNodes);
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
  const parent = node.parent;
  if (!parent || parent.level === 0) return;
  if (!node.store.checkStrictly) {
    reInitChecked(parent);
  }
};
const getPropertyFromData = function (node, prop) {
  const props = node.store.props;
  const data = node.data || {};
  const config = props[prop];
  if (typeof config === 'function') {
    return config(data, node);
  } else if (typeof config === 'string') {
    return data[config];
  } else if (typeof config === 'undefined') {
    const dataProp = data[prop];
    return dataProp === undefined ? '' : dataProp;
  }
};
let nodeIdSeed = 0;
class Node {
  constructor(options) {
    this.id = nodeIdSeed++;
    this.text = null;
    this.checked = false;
    this.indeterminate = false;
    this.data = null;
    this.expanded = false;
    this.parent = null;
    this.visible = true;
    this.isCurrent = false;
    for (let name in options) {
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
    const store = this.store;
    if (!store) {
      throw new Error('[Node]store is required!');
    }
    store.registerNode(this);
    const props = store.props;
    if (props && typeof props.isLeaf !== 'undefined') {
      const isLeaf = getPropertyFromData(this, 'isLeaf');
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
    const defaultExpandedKeys = store.defaultExpandedKeys;
    const key = store.key;
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
  setData(data) {
    if (!Array.isArray(data)) {
      markNodeData(this, data);
    }
    this.data = data;
    this.childNodes = [];
    let children;
    if (this.level === 0 && this.data instanceof Array) {
      children = this.data;
    } else {
      children = getPropertyFromData(this, 'children') || [];
    }
    for (let i = 0, j = children.length; i < j; i++) {
      this.insertChild({
        data: children[i]
      });
    }
  }
  get label() {
    return getPropertyFromData(this, 'label');
  }
  get key() {
    const nodeKey = this.store.key;
    if (this.data) return this.data[nodeKey];
    return null;
  }
  get disabled() {
    return getPropertyFromData(this, 'disabled');
  }
  get nextSibling() {
    const parent = this.parent;
    if (parent) {
      const index = parent.childNodes.indexOf(this);
      if (index > -1) {
        return parent.childNodes[index + 1];
      }
    }
    return null;
  }
  get previousSibling() {
    const parent = this.parent;
    if (parent) {
      const index = parent.childNodes.indexOf(this);
      if (index > -1) {
        return index > 0 ? parent.childNodes[index - 1] : null;
      }
    }
    return null;
  }
  contains(target, deep = true) {
    const walk = function (parent) {
      const children = parent.childNodes || [];
      let result = false;
      for (let i = 0, j = children.length; i < j; i++) {
        const child = children[i];
        if (child === target || deep && walk(child)) {
          result = true;
          break;
        }
      }
      return result;
    };
    return walk(this);
  }
  remove() {
    const parent = this.parent;
    if (parent) {
      parent.removeChild(this);
    }
  }
  insertChild(child, index, batch) {
    if (!child) throw new Error('insertChild error: child is required.');
    if (!(child instanceof Node)) {
      if (!batch) {
        const children = this.getChildren(true);
        if (children.indexOf(child.data) === -1) {
          if (typeof index === 'undefined' || index < 0) {
            children.push(child.data);
          } else {
            children.splice(index, 0, child.data);
          }
        }
      }
      objectAssign(child, {
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
  insertBefore(child, ref) {
    let index;
    if (ref) {
      index = this.childNodes.indexOf(ref);
    }
    this.insertChild(child, index);
  }
  insertAfter(child, ref) {
    let index;
    if (ref) {
      index = this.childNodes.indexOf(ref);
      if (index !== -1) index += 1;
    }
    this.insertChild(child, index);
  }
  removeChild(child) {
    const children = this.getChildren() || [];
    const dataIndex = children.indexOf(child.data);
    if (dataIndex > -1) {
      children.splice(dataIndex, 1);
    }
    const index = this.childNodes.indexOf(child);
    if (index > -1) {
      this.store && this.store.deregisterNode(child);
      child.parent = null;
      this.childNodes.splice(index, 1);
    }
    this.updateLeafState();
  }
  removeChildByData(data) {
    let targetNode = null;
    for (let i = 0; i < this.childNodes.length; i++) {
      if (this.childNodes[i].data === data) {
        targetNode = this.childNodes[i];
        break;
      }
    }
    if (targetNode) {
      this.removeChild(targetNode);
    }
  }
  expand(callback, expandParent) {
    const done = () => {
      if (expandParent) {
        let parent = this.parent;
        while (parent.level > 0) {
          parent.expanded = true;
          parent = parent.parent;
        }
      }
      this.expanded = true;
      if (callback) callback();
    };
    if (this.shouldLoadData()) {
      this.loadData(data => {
        if (data instanceof Array) {
          if (this.checked) {
            this.setChecked(true, true);
          } else if (!this.store.checkStrictly) {
            reInitChecked(this);
          }
          done();
        }
      });
    } else {
      done();
    }
  }
  doCreateChildren(array, defaultProps = {}) {
    array.forEach(item => {
      this.insertChild(objectAssign({
        data: item
      }, defaultProps), undefined, true);
    });
  }
  collapse() {
    this.expanded = false;
  }
  shouldLoadData() {
    return this.store.lazy === true && this.store.load && !this.loaded;
  }
  updateLeafState() {
    if (this.store.lazy === true && this.loaded !== true && typeof this.isLeafByUser !== 'undefined') {
      this.isLeaf = this.isLeafByUser;
      return;
    }
    const childNodes = this.childNodes;
    if (!this.store.lazy || this.store.lazy === true && this.loaded === true) {
      this.isLeaf = !childNodes || childNodes.length === 0;
      return;
    }
    this.isLeaf = false;
  }
  setChecked(value, deep, recursion, passValue) {
    this.indeterminate = value === 'half';
    this.checked = value === true;
    if (this.store.checkStrictly) return;
    if (!(this.shouldLoadData() && !this.store.checkDescendants)) {
      let {
        all,
        allWithoutDisable
      } = getChildState(this.childNodes);
      if (!this.isLeaf && !all && allWithoutDisable) {
        this.checked = false;
        value = false;
      }
      const handleDescendants = () => {
        if (deep) {
          const childNodes = this.childNodes;
          for (let i = 0, j = childNodes.length; i < j; i++) {
            const child = childNodes[i];
            passValue = passValue || value !== false;
            const isCheck = child.disabled ? child.checked : passValue;
            child.setChecked(isCheck, deep, true, passValue);
          }
          const {
            half,
            all
          } = getChildState(childNodes);
          if (!all) {
            this.checked = all;
            this.indeterminate = half;
          }
        }
      };
      if (this.shouldLoadData()) {
        // Only work on lazy load data.
        this.loadData(() => {
          handleDescendants();
          reInitChecked(this);
        }, {
          checked: value !== false
        });
        return;
      } else {
        handleDescendants();
      }
    }
    const parent = this.parent;
    if (!parent || parent.level === 0) return;
    if (!recursion) {
      reInitChecked(parent);
    }
  }
  getChildren(forceInit = false) {
    // this is data
    if (this.level === 0) return this.data;
    const data = this.data;
    if (!data) return null;
    const props = this.store.props;
    let children = 'children';
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
  updateChildren() {
    const newData = this.getChildren() || [];
    const oldData = this.childNodes.map(node => node.data);
    const newDataMap = {};
    const newNodes = [];
    newData.forEach((item, index) => {
      const key = item[NODE_KEY];
      const isNodeExists = !!key && arrayFindIndex(oldData, data => data[NODE_KEY] === key) >= 0;
      if (isNodeExists) {
        newDataMap[key] = {
          index,
          data: item
        };
      } else {
        newNodes.push({
          index,
          data: item
        });
      }
    });
    if (!this.store.lazy) {
      oldData.forEach(item => {
        if (!newDataMap[item[NODE_KEY]]) this.removeChildByData(item);
      });
    }
    newNodes.forEach(({
      index,
      data
    }) => {
      this.insertChild({
        data
      }, index);
    });
    this.updateLeafState();
  }
  loadData(callback, defaultProps = {}) {
    if (this.store.lazy === true && this.store.load && !this.loaded && (!this.loading || Object.keys(defaultProps).length)) {
      this.loading = true;
      const resolve = children => {
        this.loaded = true;
        this.loading = false;
        this.childNodes = [];
        this.doCreateChildren(children, defaultProps);
        this.updateLeafState();
        if (callback) {
          callback.call(this, children);
        }
      };
      this.store.load(this, resolve);
    } else {
      if (callback) {
        callback.call(this);
      }
    }
  }
}

class TreeStore {
  constructor(options) {
    this.currentNode = null;
    this.currentNodeKey = null;
    for (let option in options) {
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
      const loadFn = this.load;
      loadFn(this.root, data => {
        this.root.doCreateChildren(data);
        this._initDefaultCheckedNodes();
      });
    } else {
      this._initDefaultCheckedNodes();
    }
  }
  filter(value) {
    const filterNodeMethod = this.filterNodeMethod;
    const lazy = this.lazy;
    const traverse = function (node) {
      const childNodes = node.root ? node.root.childNodes : node.childNodes;
      childNodes.forEach(child => {
        child.visible = filterNodeMethod.call(child, value, child.data, child);
        traverse(child);
      });
      if (!node.visible && childNodes.length) {
        let allHidden = true;
        allHidden = !childNodes.some(child => child.visible);
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
  setData(newVal) {
    const instanceChanged = newVal !== this.root.data;
    if (instanceChanged) {
      this.root.setData(newVal);
      this._initDefaultCheckedNodes();
    } else {
      this.root.updateChildren();
    }
  }
  getNode(data) {
    if (data instanceof Node) return data;
    const key = typeof data !== 'object' ? data : getNodeKey(this.key, data);
    return this.nodesMap[key] || null;
  }
  insertBefore(data, refData) {
    const refNode = this.getNode(refData);
    refNode.parent.insertBefore({
      data
    }, refNode);
  }
  insertAfter(data, refData) {
    const refNode = this.getNode(refData);
    refNode.parent.insertAfter({
      data
    }, refNode);
  }
  remove(data) {
    const node = this.getNode(data);
    if (node && node.parent) {
      if (node === this.currentNode) {
        this.currentNode = null;
      }
      node.parent.removeChild(node);
    }
  }
  append(data, parentData) {
    const parentNode = parentData ? this.getNode(parentData) : this.root;
    if (parentNode) {
      parentNode.insertChild({
        data
      });
    }
  }
  _initDefaultCheckedNodes() {
    const defaultCheckedKeys = this.defaultCheckedKeys || [];
    const nodesMap = this.nodesMap;
    defaultCheckedKeys.forEach(checkedKey => {
      const node = nodesMap[checkedKey];
      if (node) {
        node.setChecked(true, !this.checkStrictly);
      }
    });
  }
  _initDefaultCheckedNode(node) {
    const defaultCheckedKeys = this.defaultCheckedKeys || [];
    if (defaultCheckedKeys.indexOf(node.key) !== -1) {
      node.setChecked(true, !this.checkStrictly);
    }
  }
  setDefaultCheckedKey(newVal) {
    if (newVal !== this.defaultCheckedKeys) {
      this.defaultCheckedKeys = newVal;
      this._initDefaultCheckedNodes();
    }
  }
  registerNode(node) {
    const key = this.key;
    if (!key || !node || !node.data) return;
    const nodeKey = node.key;
    if (nodeKey !== undefined) this.nodesMap[node.key] = node;
  }
  deregisterNode(node) {
    const key = this.key;
    if (!key || !node || !node.data) return;
    node.childNodes.forEach(child => {
      this.deregisterNode(child);
    });
    delete this.nodesMap[node.key];
  }
  getCheckedNodes(leafOnly = false, includeHalfChecked = false) {
    const checkedNodes = [];
    const traverse = function (node) {
      const childNodes = node.root ? node.root.childNodes : node.childNodes;
      childNodes.forEach(child => {
        if ((child.checked || includeHalfChecked && child.indeterminate) && (!leafOnly || leafOnly && child.isLeaf)) {
          checkedNodes.push(child.data);
        }
        traverse(child);
      });
    };
    traverse(this);
    return checkedNodes;
  }
  getCheckedKeys(leafOnly = false) {
    return this.getCheckedNodes(leafOnly).map(data => (data || {})[this.key]);
  }
  getHalfCheckedNodes() {
    const nodes = [];
    const traverse = function (node) {
      const childNodes = node.root ? node.root.childNodes : node.childNodes;
      childNodes.forEach(child => {
        if (child.indeterminate) {
          nodes.push(child.data);
        }
        traverse(child);
      });
    };
    traverse(this);
    return nodes;
  }
  getHalfCheckedKeys() {
    return this.getHalfCheckedNodes().map(data => (data || {})[this.key]);
  }
  _getAllNodes() {
    const allNodes = [];
    const nodesMap = this.nodesMap;
    for (let nodeKey in nodesMap) {
      if (nodesMap.hasOwnProperty(nodeKey)) {
        allNodes.push(nodesMap[nodeKey]);
      }
    }
    return allNodes;
  }
  updateChildren(key, data) {
    const node = this.nodesMap[key];
    if (!node) return;
    const childNodes = node.childNodes;
    for (let i = childNodes.length - 1; i >= 0; i--) {
      const child = childNodes[i];
      this.remove(child.data);
    }
    for (let i = 0, j = data.length; i < j; i++) {
      const child = data[i];
      this.append(child, node.data);
    }
  }
  _setCheckedKeys(key, leafOnly = false, checkedKeys) {
    const allNodes = this._getAllNodes().sort((a, b) => b.level - a.level);
    const cache = Object.create(null);
    const keys = Object.keys(checkedKeys);
    allNodes.forEach(node => node.setChecked(false, false));
    for (let i = 0, j = allNodes.length; i < j; i++) {
      const node = allNodes[i];
      const nodeKey = node.data[key].toString();
      let checked = keys.indexOf(nodeKey) > -1;
      if (!checked) {
        if (node.checked && !cache[nodeKey]) {
          node.setChecked(false, false);
        }
        continue;
      }
      let parent = node.parent;
      while (parent && parent.level > 0) {
        cache[parent.data[key]] = true;
        parent = parent.parent;
      }
      if (node.isLeaf || this.checkStrictly) {
        node.setChecked(true, false);
        continue;
      }
      node.setChecked(true, true);
      if (leafOnly) {
        node.setChecked(false, false);
        const traverse = function (node) {
          const childNodes = node.childNodes;
          childNodes.forEach(child => {
            if (!child.isLeaf) {
              child.setChecked(false, false);
            }
            traverse(child);
          });
        };
        traverse(node);
      }
    }
  }
  setCheckedNodes(array, leafOnly = false) {
    const key = this.key;
    const checkedKeys = {};
    array.forEach(item => {
      checkedKeys[(item || {})[key]] = true;
    });
    this._setCheckedKeys(key, leafOnly, checkedKeys);
  }
  setCheckedKeys(keys, leafOnly = false) {
    this.defaultCheckedKeys = keys;
    const key = this.key;
    const checkedKeys = {};
    keys.forEach(key => {
      checkedKeys[key] = true;
    });
    this._setCheckedKeys(key, leafOnly, checkedKeys);
  }
  setDefaultExpandedKeys(keys) {
    keys = keys || [];
    this.defaultExpandedKeys = keys;
    keys.forEach(key => {
      const node = this.getNode(key);
      if (node) node.expand(null, this.autoExpandParent);
    });
  }
  setChecked(data, checked, deep) {
    const node = this.getNode(data);
    if (node) {
      node.setChecked(!!checked, deep);
    }
  }
  getCurrentNode() {
    return this.currentNode;
  }
  setCurrentNode(currentNode) {
    const prevCurrentNode = this.currentNode;
    if (prevCurrentNode) {
      prevCurrentNode.isCurrent = false;
    }
    this.currentNode = currentNode;
    this.currentNode.isCurrent = true;
  }
  setUserCurrentNode(node) {
    const key = node[this.key];
    const currNode = this.nodesMap[key];
    this.setCurrentNode(currNode);
  }
  setCurrentNodeKey(key) {
    if (key === null || key === undefined) {
      this.currentNode && (this.currentNode.isCurrent = false);
      this.currentNode = null;
      return;
    }
    const node = this.getNode(key);
    if (node) {
      this.setCurrentNode(node);
    }
  }
}

var mixinNode = {
  methods: {
    handleDragStart(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-start', event, this);
    },
    handleDragOver(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-over', event, this);
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
    },
    handleDragEnd(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-end', event, this);
    },
    creator(parent, nodeTag) {
      const node = this[nodeTag];
      if (parent.isTree) {
        this.tree = parent;
      } else {
        this.tree = parent.tree;
      }
      const tree = this.tree;
      if (!tree) {
        console.warn("Can not find node's tree.");
      }
      const props = tree.props || {};
      const childrenKey = props['children'] || 'children';
      this.$watch(`${nodeTag}.data.${childrenKey}`, () => {
        node.updateChildren();
      });
      if (node.expanded) {
        this.expanded = true;
        this.childNodeRendered = true;
      }
      if (this.tree.accordion) {
        this.$on('tree-node-expand', currentNode => {
          if (node !== currentNode) {
            node.collapse();
          }
        });
      }
    },
    getNodeKey(node) {
      return getNodeKey(this.tree.nodeKey, node.data);
    },
    handleSelectChange(checked, indeterminate) {
      const node = this.node || this.source;
      if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
        this.tree.$emit('check-change', node.data, checked, indeterminate);
      }
      this.oldChecked = checked;
      this.indeterminate = indeterminate;
    },
    handleClick() {
      const node = this.node || this.source;
      const store = this.tree.store;
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
    handleContextMenu(event) {
      const node = this.node || this.source;
      if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
        event.stopPropagation();
        event.preventDefault();
      }
      this.tree.$emit('node-contextmenu', event, node.data, node, this);
    },
    handleExpandIconClick() {
      const node = this.node || this.source;
      if (node.isLeaf) return;
      if (this.expanded) {
        this.tree.$emit('node-collapse', node.data, node, this);
        node.collapse();
      } else {
        node.expand();
        this.$emit('node-expand', node.data, node, this);
      }
    },
    handleCheckChange(_, ev) {
      const node = this.node || this.source;
      node.setChecked(ev.target.checked, !this.tree.checkStrictly);
      this.$nextTick(() => {
        const store = this.tree.store;
        this.tree.$emit('check', node.data, {
          checkedNodes: store.getCheckedNodes(),
          checkedKeys: store.getCheckedKeys(),
          halfCheckedNodes: store.getHalfCheckedNodes(),
          halfCheckedKeys: store.getHalfCheckedKeys()
        });
      });
    },
    handleChildNodeExpand(nodeData, node, instance) {
      this.broadcast('ElTreeNode', 'tree-node-expand', node);
      this.tree.$emit('node-expand', nodeData, node, instance);
    }
  }
};

//
var script$3 = {
  name: 'ElTreeNode',
  componentName: 'ElTreeNode',
  mixins: [emitter, mixinNode],
  props: {
    node: {
      default() {
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
    ElCollapseTransition,
    ElCheckbox,
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const parent = this.$parent;
        const tree = parent.tree;
        const node = this.node;
        const {
          data,
          store
        } = node;
        return parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, {
          _self: tree.$vnode.context,
          node,
          data,
          store
        }) : tree.$scopedSlots.default ? tree.$scopedSlots.default({
          node,
          data
        }) : h("span", {
          "class": "el-tree-node__label"
        }, [node.label]);
      }
    }
  },
  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      oldChecked: null,
      oldIndeterminate: null
    };
  },
  watch: {
    'node.indeterminate'(val) {
      this.handleSelectChange(this.node.checked, val);
    },
    'node.checked'(val) {
      this.handleSelectChange(val, this.node.indeterminate);
    },
    'node.expanded'(val) {
      this.$nextTick(() => this.expanded = val);
      if (val) {
        this.childNodeRendered = true;
      }
    }
  },
  methods: {
    getNodeKey(node) {
      return getNodeKey(this.tree.nodeKey, node.data);
    },
    handleDragStart(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-start', event, this);
    },
    handleDragOver(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-over', event, this);
      event.preventDefault();
    },
    handleDrop(event) {
      event.preventDefault();
    },
    handleDragEnd(event) {
      if (!this.tree.draggable) return;
      this.tree.$emit('tree-node-drag-end', event, this);
    }
  },
  created() {
    const parent = this.$parent;
    this.creator(parent, 'node');
  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {
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
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.handleClick.apply(null, arguments);
      },
      "contextmenu": function ($event) {
        return this$1$1.handleContextMenu($event);
      },
      "dragstart": function ($event) {
        $event.stopPropagation();
        return _vm.handleDragStart.apply(null, arguments);
      },
      "dragover": function ($event) {
        $event.stopPropagation();
        return _vm.handleDragOver.apply(null, arguments);
      },
      "dragend": function ($event) {
        $event.stopPropagation();
        return _vm.handleDragEnd.apply(null, arguments);
      },
      "drop": function ($event) {
        $event.stopPropagation();
        return _vm.handleDrop.apply(null, arguments);
      }
    }
  }, [_c('div', {
    staticClass: "el-tree-node__content",
    style: {
      'padding-left': (_vm.node.level - 1) * _vm.tree.indent + 'px'
    }
  }, [_c('span', {
    class: [{
      'is-leaf': _vm.node.isLeaf,
      expanded: !_vm.node.isLeaf && _vm.expanded
    }, 'el-tree-node__expand-icon', _vm.tree.iconClass ? _vm.tree.iconClass : 'el-icon-caret-right'],
    on: {
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.handleExpandIconClick.apply(null, arguments);
      }
    }
  }), _vm._v(" "), _vm.showCheckbox ? _c('el-checkbox', {
    attrs: {
      "indeterminate": _vm.node.indeterminate,
      "disabled": !!_vm.node.disabled
    },
    on: {
      "change": _vm.handleCheckChange
    },
    nativeOn: {
      "click": function ($event) {
        $event.stopPropagation();
      }
    },
    model: {
      value: _vm.node.checked,
      callback: function ($$v) {
        _vm.$set(_vm.node, "checked", $$v);
      },
      expression: "node.checked"
    }
  }) : _vm._e(), _vm._v(" "), _vm.node.loading ? _c('span', {
    staticClass: "el-tree-node__loading-icon el-icon-loading"
  }) : _vm._e(), _vm._v(" "), _c('node-content', {
    attrs: {
      "node": _vm.node
    }
  })], 1), _vm._v(" "), _c('el-collapse-transition', [!_vm.renderAfterExpand || _vm.childNodeRendered ? _c('div', {
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
  }), 1) : _vm._e()])], 1);
};
var __vue_staticRenderFns__$3 = [];

/* style */
const __vue_inject_styles__$3 = undefined;
/* scoped */
const __vue_scope_id__$3 = undefined;
/* module identifier */
const __vue_module_identifier__$3 = undefined;
/* functional template */
const __vue_is_functional_template__$3 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$4 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$3,
  staticRenderFns: __vue_staticRenderFns__$3
}, __vue_inject_styles__$3, __vue_script__$3, __vue_scope_id__$3, __vue_is_functional_template__$3, __vue_module_identifier__$3, false, undefined, undefined, undefined);

//
var script$2 = {
  name: 'ElTreeVirtualNode',
  componentName: 'ElTreeVirtualNode',
  mixins: [emitter, mixinNode],
  props: {
    source: {
      default() {
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
    ElCheckbox,
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const parent = this.$parent;
        const tree = parent.tree;
        const node = this.node;
        const {
          data,
          store
        } = node;
        return parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, {
          _self: tree.$vnode.context,
          node,
          data,
          store
        }) : tree.$scopedSlots.default ? tree.$scopedSlots.default({
          node,
          data
        }) : h("span", {
          "class": "el-tree-node__label"
        }, [node.label]);
      }
    }
  },
  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      oldChecked: null,
      oldIndeterminate: null
    };
  },
  watch: {
    'source.indeterminate'(val) {
      this.handleSelectChange(this.source.checked, val);
    },
    'source.checked'(val) {
      this.handleSelectChange(val, this.source.indeterminate);
    },
    'source.expanded'(val) {
      this.$nextTick(() => this.expanded = val);
      if (val) {
        this.childNodeRendered = true;
      }
    }
  },
  created() {
    const parent = this.$parent.$parent.$parent;
    this.node = this.source;
    this.creator(parent, 'source');
  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {
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
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.handleClick.apply(null, arguments);
      },
      "contextmenu": function ($event) {
        return this$1$1.handleContextMenu($event);
      },
      "dragstart": function ($event) {
        $event.stopPropagation();
        return _vm.handleDragStart.apply(null, arguments);
      },
      "dragover": function ($event) {
        $event.stopPropagation();
        return _vm.handleDragOver.apply(null, arguments);
      },
      "dragend": function ($event) {
        $event.stopPropagation();
        return _vm.handleDragEnd.apply(null, arguments);
      },
      "drop": function ($event) {
        $event.stopPropagation();
        return _vm.handleDrop.apply(null, arguments);
      }
    }
  }, [_c('div', {
    staticClass: "el-tree-node__content"
  }, [_c('span', {
    style: {
      'min-width': (_vm.source.level - 1) * _vm.tree.indent + 'px'
    },
    attrs: {
      "aria-hidden": "true"
    }
  }), _vm._v(" "), _c('span', {
    class: [{
      'is-leaf': _vm.source.isLeaf,
      expanded: !_vm.source.isLeaf && _vm.expanded
    }, 'el-tree-node__expand-icon', _vm.tree.iconClass ? _vm.tree.iconClass : 'el-icon-caret-right'],
    on: {
      "click": function ($event) {
        $event.stopPropagation();
        return _vm.handleExpandIconClick.apply(null, arguments);
      }
    }
  }), _vm._v(" "), _vm.showCheckbox ? _c('el-checkbox', {
    attrs: {
      "indeterminate": _vm.source.indeterminate,
      "disabled": !!_vm.source.disabled
    },
    on: {
      "change": _vm.handleCheckChange
    },
    nativeOn: {
      "click": function ($event) {
        $event.stopPropagation();
      }
    },
    model: {
      value: _vm.source.checked,
      callback: function ($$v) {
        _vm.$set(_vm.source, "checked", $$v);
      },
      expression: "source.checked"
    }
  }) : _vm._e(), _vm._v(" "), _vm.source.loading ? _c('span', {
    staticClass: "el-tree-node__loading-icon el-icon-loading"
  }) : _vm._e(), _vm._v(" "), _c('node-content', {
    attrs: {
      "node": _vm.source
    }
  })], 1)]);
};
var __vue_staticRenderFns__$2 = [];

/* style */
const __vue_inject_styles__$2 = undefined;
/* scoped */
const __vue_scope_id__$2 = undefined;
/* module identifier */
const __vue_module_identifier__$2 = undefined;
/* functional template */
const __vue_is_functional_template__$2 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$3 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$2,
  staticRenderFns: __vue_staticRenderFns__$2
}, __vue_inject_styles__$2, __vue_script__$2, __vue_scope_id__$2, __vue_is_functional_template__$2, __vue_module_identifier__$2, false, undefined, undefined, undefined);

//
var script$1 = {
  name: 'ElTree',
  mixins: [emitter],
  components: {
    VirtualList,
    ElTreeNode: __vue_component__$4
  },
  data() {
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
      default() {
        return t('el.tree.emptyText');
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
      default() {
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
      set(value) {
        this.data = value;
      },
      get() {
        return this.data;
      }
    },
    treeItemArray() {
      return Array.prototype.slice.call(this.treeItems);
    },
    isEmpty() {
      const {
        childNodes
      } = this.root;
      return !childNodes || childNodes.length === 0 || childNodes.every(({
        visible
      }) => !visible);
    },
    visibleList() {
      return this.flattenTree(this.root.childNodes);
    }
  },
  watch: {
    defaultCheckedKeys(newVal) {
      this.store.setDefaultCheckedKey(newVal);
    },
    defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    },
    data(newVal) {
      this.store.setData(newVal);
    },
    checkboxItems(val) {
      Array.prototype.forEach.call(val, checkbox => {
        checkbox.setAttribute('tabindex', -1);
      });
    },
    checkStrictly(newVal) {
      this.store.checkStrictly = newVal;
    }
  },
  methods: {
    flattenTree(datas) {
      return datas.reduce((conn, data) => {
        if (data.visible) {
          conn.push(data);
        }
        if (data.expanded && data.childNodes.length) {
          conn.push(...this.flattenTree(data.childNodes));
        }
        return conn;
      }, []);
    },
    filter(value) {
      if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
      this.store.filter(value);
    },
    getNodeKey(node) {
      return getNodeKey(this.nodeKey, node.data);
    },
    getNodePath(data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath');
      const node = this.store.getNode(data);
      if (!node) return [];
      const path = [node.data];
      let parent = node.parent;
      while (parent && parent !== this.root) {
        path.push(parent.data);
        parent = parent.parent;
      }
      return path.reverse();
    },
    getCheckedNodes(leafOnly, includeHalfChecked) {
      return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
    },
    getCheckedKeys(leafOnly) {
      return this.store.getCheckedKeys(leafOnly);
    },
    getCurrentNode() {
      const currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },
    getCurrentKey() {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
      const currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },
    setCheckedNodes(nodes, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
      this.store.setCheckedNodes(nodes, leafOnly);
    },
    setCheckedKeys(keys, leafOnly) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys');
      this.store.setCheckedKeys(keys, leafOnly);
    },
    setChecked(data, checked, deep) {
      this.store.setChecked(data, checked, deep);
    },
    getHalfCheckedNodes() {
      return this.store.getHalfCheckedNodes();
    },
    getHalfCheckedKeys() {
      return this.store.getHalfCheckedKeys();
    },
    setCurrentNode(node) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode');
      this.store.setUserCurrentNode(node);
    },
    setCurrentKey(key) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey');
      this.store.setCurrentNodeKey(key);
    },
    getNode(data) {
      return this.store.getNode(data);
    },
    remove(data) {
      this.store.remove(data);
    },
    append(data, parentNode) {
      this.store.append(data, parentNode);
    },
    insertBefore(data, refNode) {
      this.store.insertBefore(data, refNode);
    },
    insertAfter(data, refNode) {
      this.store.insertAfter(data, refNode);
    },
    handleNodeExpand(nodeData, node, instance) {
      this.broadcast('ElTreeNode', 'tree-node-expand', node);
      this.$emit('node-expand', nodeData, node, instance);
    },
    updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
      this.store.updateChildren(key, data);
    },
    initTabIndex() {
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
      this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
      const checkedItem = this.$el.querySelectorAll('.is-checked[role=treeitem]');
      if (checkedItem.length) {
        checkedItem[0].setAttribute('tabindex', 0);
        return;
      }
      this.treeItems[0] && this.treeItems[0].setAttribute('tabindex', 0);
    },
    handleKeydown(ev) {
      const currentItem = ev.target;
      if (currentItem.className.indexOf('el-tree-node') === -1) return;
      const keyCode = ev.keyCode;
      this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
      const currentIndex = this.treeItemArray.indexOf(currentItem);
      let nextIndex;
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

      const hasInput = currentItem.querySelector('[type="checkbox"]');
      if ([13, 32].indexOf(keyCode) > -1 && hasInput) {
        // space enter选中checkbox
        ev.preventDefault();
        hasInput.click();
      }
    }
  },
  created() {
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
    let dragState = this.dragState;
    this.$on('tree-node-drag-start', (event, treeNode) => {
      if (typeof this.allowDrag === 'function' && !this.allowDrag(treeNode.node)) {
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
      this.$emit('node-drag-start', treeNode.node, event);
    });
    this.$on('tree-node-drag-over', (event, treeNode) => {
      const dropNode = findNearestComponent(event.target, 'ElTreeVirtualNode');
      const oldDropNode = dragState.dropNode;
      if (oldDropNode && oldDropNode !== dropNode) {
        removeClass(oldDropNode.$el, 'is-drop-inner');
      }
      const draggingNode = dragState.draggingNode;
      if (!draggingNode || !dropNode) return;
      let dropPrev = true;
      let dropInner = true;
      let dropNext = true;
      let userAllowDropInner = true;
      if (typeof this.allowDrop === 'function') {
        dropPrev = this.allowDrop(draggingNode.node, dropNode.node, 'prev');
        userAllowDropInner = dropInner = this.allowDrop(draggingNode.node, dropNode.node, 'inner');
        dropNext = this.allowDrop(draggingNode.node, dropNode.node, 'next');
      }
      event.dataTransfer.dropEffect = dropInner ? 'move' : 'none';
      if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
        if (oldDropNode) {
          this.$emit('node-drag-leave', draggingNode.node, oldDropNode.node, event);
        }
        this.$emit('node-drag-enter', draggingNode.node, dropNode.node, event);
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
      const targetPosition = dropNode.$el.getBoundingClientRect();
      const treePosition = this.$el.getBoundingClientRect();
      let dropType;
      const prevPercent = dropPrev ? dropInner ? 0.25 : dropNext ? 0.45 : 1 : -1;
      const nextPercent = dropNext ? dropInner ? 0.75 : dropPrev ? 0.55 : 0 : 1;
      let indicatorTop = -9999;
      const distance = event.clientY - targetPosition.top;
      if (distance < targetPosition.height * prevPercent) {
        dropType = 'before';
      } else if (distance > targetPosition.height * nextPercent) {
        dropType = 'after';
      } else if (dropInner) {
        dropType = 'inner';
      } else {
        dropType = 'none';
      }
      const iconPosition = dropNode.$el.querySelector('.el-tree-node__expand-icon').getBoundingClientRect();
      const dropIndicator = this.$refs.dropIndicator;
      if (dropType === 'before') {
        indicatorTop = iconPosition.top - treePosition.top;
      } else if (dropType === 'after') {
        indicatorTop = iconPosition.bottom - treePosition.top;
      }
      dropIndicator.style.top = indicatorTop + 'px';
      dropIndicator.style.left = iconPosition.right - treePosition.left + 'px';
      if (dropType === 'inner') {
        addClass(dropNode.$el, 'is-drop-inner');
      } else {
        removeClass(dropNode.$el, 'is-drop-inner');
      }
      dragState.showDropIndicator = dropType === 'before' || dropType === 'after';
      dragState.allowDrop = dragState.showDropIndicator || userAllowDropInner;
      dragState.dropType = dropType;
      this.$emit('node-drag-over', draggingNode.node, dropNode.node, event);
    });
    this.$on('tree-node-drag-end', event => {
      const {
        draggingNode,
        dropType,
        dropNode
      } = dragState;
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      if (draggingNode && dropNode) {
        const draggingNodeCopy = {
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
          this.store.registerNode(draggingNodeCopy);
        }
        removeClass(dropNode.$el, 'is-drop-inner');
        this.$emit('node-drag-end', draggingNode.node, dropNode.node, dropType, event);
        if (dropType !== 'none') {
          this.$emit('node-drop', draggingNode.node, dropNode.node, dropType, event);
        }
      }
      if (draggingNode && !dropNode) {
        this.$emit('node-drag-end', draggingNode.node, null, dropType, event);
      }
      dragState.showDropIndicator = false;
      dragState.draggingNode = null;
      dragState.dropNode = null;
      dragState.allowDrop = true;
    });
  },
  mounted() {
    this.initTabIndex();
    this.$el.addEventListener('keydown', this.handleKeydown);
  },
  updated() {
    this.treeItems = this.$el.querySelectorAll('[role=treeitem]');
    this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
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
  }), _vm._v(" "), _vm.isEmpty ? _c('div', {
    staticClass: "el-tree__empty-block"
  }, [_c('span', {
    staticClass: "el-tree__empty-text"
  }, [_vm._v(_vm._s(_vm.emptyText))])]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: _vm.dragState.showDropIndicator,
      expression: "dragState.showDropIndicator"
    }],
    ref: "dropIndicator",
    staticClass: "el-tree__drop-indicator"
  })], 2);
};
var __vue_staticRenderFns__$1 = [];

/* style */
const __vue_inject_styles__$1 = undefined;
/* scoped */
const __vue_scope_id__$1 = undefined;
/* module identifier */
const __vue_module_identifier__$1 = undefined;
/* functional template */
const __vue_is_functional_template__$1 = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$2 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, undefined, undefined);

__vue_component__$2.install = function (Vue) {
  Vue.component(__vue_component__$2.name, __vue_component__$2);
};

//
var script = {
  directives: {
    Clickoutside
  },
  props: {
    value: [],
    height: {
      type: String,
      default: '200px'
    }
  },
  data() {
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
      handler(val) {
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([]);
          // TODO: 直接使用setCheckedKeys(val)会导致无法选中，需要遍历使用setChecked
          val && val.forEach(el => {
            this.$refs.tree.setChecked(el, true, false);
          });
          this.$refs.popper.updatePopper();
        });
      },
      deep: true
    }
  },
  methods: {
    searchTextChange(val) {
      this.$refs.tree.filter(val);
    },
    currentChange(checkItem, checkObj) {
      this.$emit('update:value', checkObj.checkedKeys);
      treeData.selectKeys = checkObj.checkedKeys;
      treeData.selectNodes = checkObj.checkedNodes;
      // TODO: 需要使用setTimeout，否则无法清空
      setTimeout(() => {
        this.$refs.popper.updatePopper();
      }, 400);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    focus() {
      this.popperVisible = true;
    },
    hide() {
      this.popperVisible = false;
    },
    clear() {
      this.$refs.tree.setCheckedKeys([]);
      // TODO: 需要使用setTimeout，否则无法清空
      setTimeout(() => {
        this.$refs.popper.updatePopper();
      }, 400);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
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
      callback: function ($$v) {
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
const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-02ce6fc8_0", {
    source: ".container[data-v-02ce6fc8]{position:relative;display:inline-block;width:100%}[data-v-02ce6fc8] .popper.el-popper{margin-top:0;box-sizing:border-box;width:100%;padding:0}",
    map: undefined,
    media: undefined
  });
};
/* scoped */
const __vue_scope_id__ = "data-v-02ce6fc8";
/* module identifier */
const __vue_module_identifier__ = undefined;
/* functional template */
const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);
var __vue_component__$1 = __vue_component__;

Vue.use(ElementUI);

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  EleTreeVirtual: __vue_component__$1
});

// Import vue components

// install function executed by Vue.use()
const install = function installVue2SelectTree(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
};

export { __vue_component__$1 as EleTreeVirtual, install as default };
