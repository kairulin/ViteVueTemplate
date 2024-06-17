import { reactive, toRefs } from "vue";

export default function usePage() {
    const pagination = reactive({
        totalSize: 0,
        currentPage:1,
        pageSize:10,
        firstSize:1,
        lastSize:1,        
    })
    const fetchPagination = async (data) => {
        pagination.totalSize = data.total;
        pagination.currentPage = data.current_page;
        pagination.pageSize = data.per_page;
        pagination.firstSize = (pagination.currentPage - 1) * pagination.pageSize + 1;
        pagination.lastSize = pagination.currentPage * pagination.pageSize;
    }
    return {
        ...toRefs(pagination),
        fetchPagination
    }
}