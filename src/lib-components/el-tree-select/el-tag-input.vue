<template>
  <div
    class="el-input-tag input-tag-wrapper"
    :class="[size ? 'el-input-tag--' + size : '']"
    @click="focusTagInput">
    <el-tag
      v-for="(tag, idx) in store.selectNodes"
      v-bind="$attrs"
      :key="tag.id"
      :size="size"
      :closable="!readOnly"
      :disable-transitions="false"
      @close="remove(idx)">
      {{tag.label}}
    </el-tag>
    <input
      v-if="!readOnly"
      class="tag-input"
      :placeholder="placeholder"
      :value="newTag"
      @blur = "blur"
      @focus="focus"
      @input="searchTextChange"
    >
    <i @click="clear" class="el-icon-close icon-close"></i>
  </div>
</template>

<script>
import store from './store'

export default {
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
    placeholder: String,
  },
  data () {
    return {
      store,
      newTag: ''
    }
  },
  methods: {
    focusTagInput () {
      if (this.readOnly || !this.$el.querySelector('.tag-input')) {
        return
      } else {
        this.$el.querySelector('.tag-input').focus()
      }
    },
    addTag (tag) {
      tag = tag.trim()
      if (tag && !this.innerTags.includes(tag)) {
        this.innerTags.push(tag)
        return true
      }
      return false
    },
    remove (index) {
      store.remove(index)
    },
    focus () {
      this.$emit('focus')
    },
    blur () {
      this.$emit('blur')
    },
    searchTextChange (val) {
      const text = val.target.value
      this.$emit('searchTextChange', text)
    },
    clear () {
      store.selectKeys = []
      store.selectNodes = []
      this.$emit('clear')
    }
  }
}
</script>

<style scoped>
  .el-form-item.is-error .el-input-tag {
      border-color: #f56c6c;
  }
  .input-tag-wrapper {
    position: relative;
    font-size: 14px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    outline: none;
    padding: 0 10px 0 5px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .el-tag {
    margin-right: 4px;
  }

  .tag-input {
    min-height: 30px;
    background: transparent;
    border: 0;
    font-size: inherit;
    outline: none;
    padding-left: 0;
    width: 100px;
  }
  .el-input-tag {
    text-align: left;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 3px;
    padding-bottom: 3px;
    min-height: 42px;
  }
  .el-input-tag--mini {
    min-height: 28px;
    line-height: 28px;
    font-size: 12px;
  }

  .el-input-tag--small {
    min-height: 32px;
    line-height: 32px;
  }

  .el-input-tag--medium {
    min-height: 36px;
    line-height: 36px;
  }

  .icon-close {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }

</style>