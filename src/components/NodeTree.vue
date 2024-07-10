<template>
    <el-tree ref="treeRef" :data="data" :props="{ class: customNodeClass }" show-checkbox node-key="code"
        default-expand-all @check="changeCheck" />
</template>
<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
const props = defineProps({
    data: Array,
    originalData: Array
})
const emit = defineEmits(['change'])
const treeRef = ref(null)
// 自訂class
const customNodeClass = (data, node) => {
    if (data.isPenultimate) {
        return 'is-penultimate'
    }
    return null
}
const premissionsSetting = (nodes, action) => {
    // 如果只是檢視，則打勾列表
    if (action === 'show') {
        return checkSomeKey(nodes, 'list')
    }
    // 如果是新增、編輯、刪除、送審、審核、匯出，則打勾列表和顯示
    if (action === 'create' ||
        action === 'update' ||
        action === 'destroy' ||
        action === 'toReview' ||
        action === 'review' ||
        action === 'export' ||
        action === 'resetPassword' ||
        action === 'destroy'
    ) {
        checkSomeKey(nodes, 'show')
        checkSomeKey(nodes, 'list')
    }
}
// 勾選某些基礎權限
const checkSomeKey = (nodes, key) => {
    let code = nodes.find((child) => child.action === key)
    if (!code) return
    treeRef.value.setChecked(code.code, true)
}
// 清除節點
const clearNodes = (nodes) => {
    nodes.forEach(node => {
        treeRef.value.setChecked(node.code, false)
    })
}
// 對節點進行相關操作
const processLeafNode = (nodes, checkNode) => {
    // 如果是取消勾選列表，把相關操作全部取消
    if (checkNode.action === 'list') {
        // let isUnchecked = !treeRef.value.getCheckedKeys().includes(checkNode.code);
        let isUnchecked = !treeRef.value.getCheckedKeys().find(item => item === checkNode.code)
        if (isUnchecked) {
            clearNodes(nodes);
        }
        return;
    }
    premissionsSetting(nodes, checkNode.action);
    isFind = true;
}

// 遞迴尋找節點
let isFind = false
const recursionNode = (nodes, checkNode) => {
    if (isFind || !nodes) return isFind;
    nodes.forEach(node => {
        if (isFind) return;
        if (!node.children || node.children.length === 0) {
            if (nodes.findIndex(node => node.code === checkNode.code) !== -1) {
                processLeafNode(nodes, checkNode);
            }
        } else {
            isFind = recursionNode(node.children, checkNode)
        }
    })
    return isFind;
}
// 選擇某些權限時，把另一個基礎權限也打勾
const changeCheck = (node, parent) => {
    recursionNode(parent.halfCheckedNodes, node)
    isFind = false
    const filterData = treeRef.value.getCheckedKeys().filter(item => item !== null && item !== undefined)
    emit('change', filterData)
}
watch(() => [props.originalData, treeRef.value], (newVal) => {
    if (treeRef.value) {
        nextTick(() => {
            treeRef.value.setCheckedKeys(newVal[0])
        })
    }
})
</script>