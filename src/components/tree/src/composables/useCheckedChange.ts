const useCheckedChange = (node:TreeNodeData) => {
    // emit:(event: "nodeChecked", ...args: any[]) => void
    const checkedAll = (node:TreeNodeData) => {
        if(node.children) {
            node.children.forEach(child => child.checked = node.checked)
        }
        // emit('nodeChecked', node.checked)
    }
    return {
        checkedAll
    }
}
export {useCheckedChange}