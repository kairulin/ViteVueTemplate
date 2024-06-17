import { reactive, toRefs } from "vue";

export default function useAxios (api) {
    const state = reactive({
        data:null,
        errorMessage:'',
        isError: false,
        isLoading: true,
    })
    const fetchData = async (payload) => {
        console.log('payload', payload)
        try {
            const response = await api(payload);
            const responseData = response.data;
            state.data = responseData.data;           
        } catch (e) {
            state.isError = true;
            state.errorMessage = e.msg;
        } finally {
            state.isLoading = false;
        }
    }
    return {
        ...toRefs(state),
        fetchData
    }
}