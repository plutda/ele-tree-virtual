const treeData = {
  selectKeys: [],
  selectNodes: [],
  pop() {
    this.selectKeys.pop()
    this.selectNodes.pop()
  },
  remove(index) {
    this.selectKeys.splice(index, 1)
    this.selectNodes.splice(index, 1)
  },
  clear() {
    this.selectKeys = []
    this.selectNodes = []
  }
}
export default treeData
