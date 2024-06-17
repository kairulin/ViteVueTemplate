import { toRefs } from "vue"
import { provide } from 'vue'
export default function usePagination(state) {
    const stateRefs = toRefs(state)
    provide('currentPage', stateRefs.currentPage)
    provide('firstSize', stateRefs.firstSize)
    provide('lastSize', stateRefs.lastSize)
    provide('totalSize', stateRefs.totalSize)
    provide('pageSize', stateRefs.pageSize)
}