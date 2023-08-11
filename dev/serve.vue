<script>
import Vue from 'vue';
import { getData } from '../src/util'
// import { Vue2SelectTreeSample } from '@/entry.esm';
// import EleTreeVirtual from 'ele-tree-virtual';
import EleTreeVirtual from '@/entry.esm';

Vue.use(EleTreeVirtual)

export default Vue.extend({
  name: 'ServeDev',
  data() {
    return {
      data: [],
      select: []
    }
  },
  methods: {
  },
  mounted() {
    this.data = getData()
  }
});
</script>

<template>
  <div id="app">
    <ele-tree-virtual
      :value.sync="select"
      :data="data"
    />
  </div>
</template>
