import qs from 'qs';
import ApiService from '@/service/api.service'
export default {

    getListItem: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            filters: data.filters,
            sort: data.sort,
            pagination: data.pagination,
            populate: '*'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/sizes?${query}`
        })
        commit('set_data', {
            name: 'list_item',
            data: {
                data: res.data,
                pagination: res.meta?.pagination
            }
        })
    },

    createItem: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "post",
            url: `/api/sizes`,
            data: { data: data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },

    updateItem: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "put",
            url: `/api/sizes/${data.id}`,
            data: { data: data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },

    deleteItem: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "delete",
            url: `/api/sizes/${data.id}`,
            data: { data: data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },

}