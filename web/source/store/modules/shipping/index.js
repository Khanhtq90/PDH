import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const state = () => ({
    list_shipping : []
});

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
