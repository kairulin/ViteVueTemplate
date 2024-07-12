import type { TreeNodeData } from '../../type';
const useCheckedChange = (node:TreeNodeData, emit:(event: "nodeChecked", ...args: any[]) => void) => {
    const changeAll = (node:TreeNodeData) => {
        if(node.children) {
            node.children.forEach(child => {
                child.checked = node.checked
                changeAll(child);
            })
        }
        emit('nodeChecked', node.checked)
    }
}