import type { TreeNodeData } from '../../type';
const useCheckedChange = (node:TreeNodeData) => {
    const checkedAll = (value:boolean) => {
        node.checked = value
        if(node.children && value !== undefined) {            
            node.children.forEach(child => {
                child.checked = node.checked
            })
        }
        // 勾選這個，底下的indeterminate都要是false
        return false
    }
    const checkIndeterminate = (value?:boolean) => {
        let indeterminate = false
        if(node.children) {
            const isTrue = node.children.some(child => child.checked)
            const isFalse = node.children.some(child => !child.checked)
            console.log('node', node)
            console.log('value', value)
             // 如果有勾選，但是也有沒勾選的，就是indeterminate
            if (isTrue && isFalse) {
                indeterminate = true;
                node.checked = undefined;
            // 如果全部勾選，就是true
            } else if (isTrue) {
                indeterminate = false;
                node.checked = true;
            // 如果全部沒有勾選，就是false
            } else if (isFalse) {
            // 如果有一個是indeterminate，上層就是indeterminate
                indeterminate = value ? true : false;
                node.checked = undefined;
            }
            console.log('indeterminate', indeterminate) 
        }
        return indeterminate
    }
    return {
        checkedAll,
        checkIndeterminate
    }
}

export {useCheckedChange}