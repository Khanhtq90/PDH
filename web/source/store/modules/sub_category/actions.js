import qs from 'qs';
import ApiService from '@/service/api.service'
export default {
    getListClub: async ({ commit, rootState }, data = {}) => {
        const query = qs.stringify({
            pagination: data.pagination,
            _sort: data.sort ?? 'order:desc,id:desc',
            filters: data.filters ?? { },
            populate: '*'
        }, {
            encodeValuesOnly: true, // prettify URL
        });
        let res = await ApiService.request({
            method: 'get',
            url: `/api/clubs?${query}`
        })
        commit('set_list_club', {
            list_club: res.data.filter(i => i.attributes.state === 'active'),
            pagination: res.meta.pagination
        })
    },

    getClubBySlug: async ({ commit, rootState }, data) => {
        let res = await ApiService.request({
            method: 'get',
            url: `/api/clubs?populate=*&filters[slug][$eq]=${data}`
        })
        if (res && res.data && res.data.length > 0) {
            commit('set_club', {
                club: res?.data[0]
            })
        }
    },

    getListClubAdmin: async ({ commit, rootState }, data = {}) => {
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
            url: `/api/clubs?${query}`
        })
        commit('set_data', {
            name: 'list_club_admin',
            data: {
                data: res.data,
                pagination: res.meta?.pagination
            }
        })
    },

    createClub: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "post",
            url: `/api/clubs`,
            data: { data : data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },

    updateClub: async function ({
        commit
    }, data) {
        let res = await ApiService.request({
            method: "put",
            url: `/api/clubs/${data.id}`,
            data: { data : data.data }
        });
        if (res && res.data) {
            return res.data
        }
        return false
    },
    
    // getListWork: async ({ commit, rootState }, data = {}) => {
    //     let res = await ApiService.request({
    //         method: 'get',
    //         // url: rootState.common.api_host + `/works`,
    //         url: '/api/works',
    //         data: data.params ? data.params : {}
    //     })
    //     commit('set_list_work', {
    //         list_work: res
    //     })
    // },

    // getCountWork: async ({ commit, rootState }, data = {}) => {
    //     let res = await ApiService.request({
    //         method: 'get',
    //         // url: rootState.common.api_host + `/works/count`,
    //         url: '/api/works/count',
    //         data: data.params ? data.params : {}
    //     })
    //     return res
    // },

    // getWorkId: async ({ commit, rootState }, data = {}) => {
    //     let res = await ApiService.request({
    //         method: 'get',
    //         // url: rootState.common.api_host + `/works/${data.id}`,
    //         url: '/api/works/${data.id}',
    //         data: data.params ? data.params : {}
    //     })
    //     if (res && res.content.includes('<figure class="media"><oembed ')) {
    //         const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
    //         res.content = res.content.replace(regex,
    //             '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
    //             + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    //             + '</div></div>');
    //     }
    //     if (res && res.content_vn.includes('<figure class="media"><oembed ')) {
    //         const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
    //         res.content_vn = res.content_vn.replace(regex,
    //             '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
    //             + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    //             + '</div></div>');
    //     }
    //     commit('set_work', {
    //         work: res
    //     })
    // },

    // getWorkBySlug: async ({ commit, rootState }, data = {}) => {
    //     let res = await ApiService.request({
    //         method: 'get',
    //         // url: rootState.common.api_host + `/works?url=${data.url}`
    //         url: `/api/works?url=${data.url}`
    //     })
    //     if (res && res.length > 0) {
    //         if (res[0].content.includes('<figure class="media"><oembed ')) {
    //             const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
    //             res[0].content = res[0].content.replace(regex,
    //                 '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
    //                 + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    //                 + '</div></div>');
    //         }
    //         if (res[0].content_vn.includes('<figure class="media"><oembed ')) {
    //             const regex = /<oembed.+?url="https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})"><\/oembed>/g;
    //             res[0].content_vn = res[0].content_vn.replace(regex,
    //                 '<div><div style="position: relative; padding-bottom: 100%; height: 0; padding-bottom: 56.2493%;">'
    //                 + '<iframe style="position: absolute;width: 100%;height: 100%;top: 0;left: 0;" width="560" height="315" src="https://www.youtube.com/embed/$1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    //                 + '</div></div>');
    //         }
    //         commit('set_work', {
    //             work: res[0]
    //         })
    //     }
    // }

}