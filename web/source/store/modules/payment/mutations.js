export default {
    set_list_payment(state, payload) {
        state.list_payment = payload.list_payment;
    },
    set_data(state, payload) {
        state[payload.name] = payload.data;
    },
};
