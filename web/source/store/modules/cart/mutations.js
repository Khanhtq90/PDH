export default {
    set_list_cart(state, payload) {
        state.list_cart = payload.list_cart;
    },
    set_list_user_cart(state, payload) {
        state.list_user_cart = payload.list_user_cart;
    },
    set_cart(state, payload) {
        state.cart = payload.cart;
    }
};
