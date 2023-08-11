<template>
  <div class="container">
    <el-popover
      ref="popper"
      v-model="popperVisible"
      v-clickoutside="hide"
      trigger="manual"
      class="select-ele-tree"
      placement="bottom-start"
      :visible-arrow="false"
      :append-to-body="false"
      popper-class="popper"
    >
      <el-scrollbar style="min-height: 200px">
        <el-virtual-tree
          ref="tree"
          v-bind="$attrs"
          show-checkbox
          @check="currentChange"
          node-key="id"
          :height="height"
          :filter-node-method="filterNode"
        ></el-virtual-tree>
      </el-scrollbar>

      <div slot="reference">
        <el-tag-input
          size="small"
          @searchTextChange="searchTextChange"
          @focus="focus"
          @clear="clear"
        >
        </el-tag-input>
      </div>
    </el-popover>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'
import ElTagInput from './el-tag-input.vue'
import ElVirtualTree from './el-virtual-tree'
import store from './store'

export default {
  directives: { Clickoutside },
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
      store: store
    }
  },
  components: {
    ElTagInput,
    ElVirtualTree
  },
  watch: {
    'store.selectKeys': {
      handler(val) {
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys([])
          // TODO: 直接使用setCheckedKeys(val)会导致无法选中，需要遍历使用setChecked
          val && val.forEach(el => {
            this.$refs.tree.setChecked(el, true, false)
          })
          this.$refs.popper.updatePopper()
        })
      },
      deep: true
    },
  },
  methods: {
    searchTextChange(val) {
      this.$refs.tree.filter(val)
    },
    currentChange(checkItem, checkObj){
      this.$emit('update:value', checkObj.checkedKeys)
      store.selectKeys = checkObj.checkedKeys
      store.selectNodes = checkObj.checkedNodes
      // TODO: 需要使用setTimeout，否则无法清空
      setTimeout(() => {
        this.$refs.popper.updatePopper()
      }, 400);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1
    },
    focus() {
      this.popperVisible = true
    },
    hide() {
      this.popperVisible = false
    },
    clear() {
      this.$refs.tree.setCheckedKeys([])
      // TODO: 需要使用setTimeout，否则无法清空
      setTimeout(() => {
        this.$refs.popper.updatePopper()
      }, 400);
    }
  }
}
</script>

<style scoped>
.container{
  position: relative;
  display: inline-block;
  width: 100%;
}
/deep/ .popper.el-popper {
  margin-top: 0px;
  box-sizing: border-box;
  width: 100%;
  padding: 0;
}
</style>
