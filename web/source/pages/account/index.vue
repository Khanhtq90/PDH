<template>
    <div class="account-content">
        <div class="account-content-top" v-if="!isMobile">
            <img class="account-content-image" src="/images/top-account.jpg" />
            <div class="account-content-name">welcome, {{ profile?.username }}</div>
        </div>
        <div class="account-content-top" v-if="isMobile">
            <img class="account-content-image" src="/images/top-mobile.jpg" />
            <div class="account-content-name">welcome, <span>{{ profile?.username }}</span></div>
        </div>
        <div class="account-content-data" v-if="!isMobile">
            <div class="container d-flex justify-content-between">
                <div class="account-content-left">
                    <div class="account-content-card">
                        <div class="account-content-card-head d-flex justify-content-between align-items-center">
                            <div class="account-content-card-head-title">Profile</div>
                            <div class="account-content-card-head-edit" @click="showUpdateProfile = true">Edit</div>
                        </div>
                        <div class="account-content-body">
                            <div class="account-content-body-text">Full Name: {{ profile.username }}</div>
                            <div class="account-content-body-text">Email Address: {{ profile.email }}</div>
                            <div class="account-content-body-text">Phone: {{ profile.phone }}</div>
                        </div>

                    </div>
                    <div class="account-content-card">
                        <div class="account-content-card-head d-flex justify-content-between align-items-center">
                            <div class="account-content-card-head-title">Edit password</div>
                            <div class="account-content-card-head-edit" @click="showUpdatePassword = true">Edit</div>
                        </div>
                        <div class="account-content-body">
                            <div class="account-content-body-text">Password: *******</div>
                        </div>

                    </div>
                    <div class="account-content-card">
                        <div class=" account-content-card-head d-flex justify-content-between align-items-center">
                            <div class="account-content-card-head-title">Address book</div>
                            <div class="account-content-card-head-edit" @click="showUpdateAddress = true">Edit</div>
                        </div>
                        <div class="account-content-body">
                            <div class="account-content-body-text">
                                {{ address.attributes?.name }}
                            </div>
                            <div class="account-content-body-text">
                                {{ address.attributes?.email }}
                            </div>
                            <div class="account-content-body-text">
                                {{ address.attributes?.phone }}
                            </div>
                            <div class="account-content-body-text">
                                {{ address.attributes?.full_address }}
                            </div>
                        </div>

                    </div>
                </div>
                <div class="account-content-right">
                    <div class="account-content-card">
                        <div class="account-content-card-head d-flex justify-content-between align-items-center">
                            <div class="account-content-card-head-title">Saved items</div>
                        </div>
                        <div class="account-content-body">
                            <div class="account-content-body-text">
                                All your favorite pieces in one beautiful place.</div>
                        </div>
                        <NuxtLink to="/save-item">
                            <div class="account-content-footer">
                                show all
                            </div>
                        </NuxtLink>
                    </div>
                    <div class="account-content-card">
                        <div class="account-content-card-head d-flex justify-content-between align-items-center">
                            <div class="account-content-card-head-title">My orders</div>
                        </div>
                        <div class="account-content-body">
                            <div class="account-content-order-item" v-for="_order, index in listUserOrder" :key="index">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <img class="account-content-order-item-img"
                                            :src="_order.cart.product.data.attributes.thub.data.attributes.url" />
                                        <div class="account-content-order-item-state">{{ $i18n.locale === 'vn' ?
                                            getStateOrderUser(_order.attributes.state)
                                            : getStateOrderUserEn(_order.attributes.state) }}</div>
                                    </div>
                                    <div class="account-content-order-item-info">
                                        <div class="account-content-order-item-info-name">
                                            {{ _order.cart.product.data.attributes.name }}
                                        </div>
                                        <div class="account-content-order-item-info-des">Color: <span>{{
                                            _order.cart.variant.data.attributes.color.data.attributes.name }}</span>
                                        </div>
                                        <div class="account-content-order-item-info-des">Size: <span>{{
                                            _order.cart.variant.data.attributes.size.data.attributes.name }}</span>
                                        </div>
                                        <div class="account-content-order-item-info-des">Quantity: <span>{{
                                            _order.cart.quantity }}</span></div>
                                        <div class="account-content-order-item-info-price">
                                            {{ _order.attributes.price | numberWithCommas }}{{ ' ' }}đ
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <NuxtLink to="/my-order">
                            <div class="account-content-footer">
                                show all
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
        <div class="account-content-data" v-if="isMobile">
            <div class="container">
                <div class="account-content-card">
                    <div class="account-content-card-head d-flex justify-content-between align-items-center">
                        <div class="account-content-card-head-title">Profile</div>
                        <div class="account-content-card-head-edit" @click="showUpdateProfile = true">Edit</div>
                    </div>
                    <div class="account-content-body">
                        <div class="account-content-body-text">Full Name: {{ profile.username }}</div>
                        <div class="account-content-body-text">Email Address: {{ profile.email }}</div>
                        <div class="account-content-body-text">Phone: {{ profile.phone }}</div>
                    </div>
                </div>
                <div class="account-content-card">
                    <div class="account-content-card-head d-flex justify-content-between align-items-center">
                        <div class="account-content-card-head-title">Edit password</div>
                        <div class="account-content-card-head-edit" @click="showUpdatePassword = true">Edit</div>
                    </div>
                    <div class="account-content-body">
                        <div class="account-content-body-text">Password: *******</div>
                    </div>
                </div>
                <div class="account-content-card">
                    <div class=" account-content-card-head d-flex justify-content-between align-items-center">
                        <div class="account-content-card-head-title">Address book</div>
                        <div class="account-content-card-head-edit" @click="showUpdateAddress = true">Edit</div>
                    </div>
                    <div class="account-content-body">
                        <div class="account-content-body-text">
                            {{ address.attributes?.name }}
                        </div>
                        <div class="account-content-body-text">
                            {{ address.attributes?.email }}
                        </div>
                        <div class="account-content-body-text">
                            {{ address.attributes?.phone }}
                        </div>
                        <div class="account-content-body-text">
                            {{ address.attributes?.full_address }}
                        </div>
                    </div>
                </div>
                <div class="account-content-card">
                    <div class="account-content-card-head d-flex justify-content-between align-items-center">
                        <div class="account-content-card-head-title">Saved items</div>
                    </div>
                    <div class="account-content-body">
                        <div class="account-content-body-text">All your favorite pieces in one beautiful place.</div>
                    </div>
                    <NuxtLink to="/save-item">
                        <div class="account-content-footer">
                            show all
                        </div>
                    </NuxtLink>
                </div>
                <div class="account-content-card">
                    <div class="account-content-card-head d-flex justify-content-between align-items-center">
                        <div class="account-content-card-head-title">My orders</div>
                    </div>
                    <div class="account-content-body">
                        <div class="account-content-order-item" v-for="_order, index in listUserOrder" :key="index">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <img class="account-content-order-item-img"
                                        :src="_order.cart.product.data.attributes.thub.data.attributes.url" />
                                    <div class="account-content-order-item-state">{{ $i18n.locale === 'vn' ?
                                        getStateOrderUser(_order.attributes.state)
                                        : getStateOrderUserEn(_order.attributes.state) }}</div>
                                </div>
                                <div class="account-content-order-item-info">
                                    <div class="account-content-order-item-info-name">
                                        {{ _order.cart.product.data.attributes.name }}
                                    </div>
                                    <div class="account-content-order-item-info-des">Color: <span>{{
                                        _order.cart.variant.data.attributes.color.data.attributes.name }}</span>
                                    </div>
                                    <div class="account-content-order-item-info-des">Size: <span>{{
                                        _order.cart.variant.data.attributes.size.data.attributes.name }}</span>
                                    </div>
                                    <div class="account-content-order-item-info-des">Quantity: <span>{{
                                        _order.cart.quantity }}</span></div>
                                    <div class="account-content-order-item-info-price">
                                        {{ _order.attributes.price | numberWithCommas }}{{ ' ' }}đ
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <NuxtLink to="/my-order">
                        <div class="account-content-footer">
                            show all
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </div>
        <UserProfile v-if="showUpdateProfile" :isMobile="isMobile" @closeUpdate="showUpdateProfile = false">
        </UserProfile>
        <Password v-if="showUpdatePassword" :isMobile="isMobile" @closeUpdate="showUpdatePassword = false">
        </Password>
        <Address v-if="showUpdateAddress" :item="address" :isMobile="isMobile" @closeUpdate="closeUpdateAddress"></Address>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
import Address from "~/components/account/address.vue"
import Password from "~/components/account/password.vue"
import UserProfile from "~/components/account/profile.vue"
export default {
    name: 'IndexPage',
    components: {
        Address,
        Password,
        UserProfile,
        // ListProductPopup,
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile",
            loggedIn: "auth/getloggedIn",
            address: "auth/getAddress",
            listOrder: "order/getListOrder",
            // listProduct: "product/getListProductView",
        }),
    },
    mixins: [general],
    data() {
        return {
            isMobile: false,
            showUpdateAddress: false,
            showUpdatePassword: false,
            showUpdateProfile: false,
            isShowOrders: false,
            isShowProducts: false,
            isShowLike: false,
            listUserOrder: []
        }
    },
    async mounted() {
        if (!this.loggedIn) {
            this.$router.push({ path: '/dang-nhap' })
        }
        this.isMobile = this.checkMobile()
        await this.getAddressByUser(this.profile.id)
        await this.getListOrder({
            filters: {
                user: { id: { $eq: this.profile.id } }
            }
        })
        this.listUserOrder = this.listOrder.map(o => {
            return {
                ...o,
                cart: o.attributes.cartitems.data[0].attributes
            }
        })
        // if (this.$route.hash) {
        //     this.setShow(parseInt(this.$route.hash.replace('#', '').replace('tab', '')))
        // }
        // this.getListProvince({ pagination: { pageSize: 100 } })
    },
    methods: {
        ...mapActions({
            setLoggedIn: "auth/setLoggedIn",
            logout: 'auth/logout',
            getAddressByUser: "auth/getAddressByUser",
            getListOrder: "order/getListOrder",
            // getListProvince: 'user/getListProvince',
        }),
        async onRefresh() {
            await this.getListOrder({
                filters: {
                    user: { id: { $eq: this.profile.id } }
                }
            })
        },
        checkMobile() {
            if (!process.server) {
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    return true
                } else {
                    return false
                }
            }
        },
        onLogOut() {
            this.logout()
            this.$router.push({ path: '/' })
        },
        async closePopup() {
            await this.getAddressByUser(this.profile.id)
            this.show_address = false
        },
        async closeUpdateAddress() {
            await this.getAddressByUser(this.profile.id)
            this.showUpdateAddress = false
        },
        setShow(_num) {
            switch (_num) {
                case 1:
                    this.tab1 = !this.tab1
                    this.tab2 = false
                    this.tab3 = false
                    this.tab4 = false
                    this.tab5 = false
                    this.tab6 = false
                    break;
                case 2:
                    this.tab1 = false
                    this.tab2 = !this.tab2
                    this.tab3 = false
                    this.tab4 = false
                    this.tab5 = false
                    this.tab6 = false
                    break;
                case 3:
                    this.tab1 = false
                    this.tab2 = false
                    this.tab3 = !this.tab3
                    this.tab4 = false
                    this.tab5 = false
                    this.tab6 = false
                    break;
                case 4:
                    this.tab1 = false
                    this.tab2 = false
                    this.tab3 = false
                    this.tab4 = !this.tab4
                    this.tab5 = false
                    this.tab6 = false
                    break;
                case 5:
                    this.tab1 = false
                    this.tab2 = false
                    this.tab3 = false
                    this.tab4 = false
                    this.tab5 = !this.tab5
                    this.tab6 = false
                    break;
                case 6:
                    this.tab1 = false
                    this.tab2 = false
                    this.tab3 = false
                    this.tab4 = false
                    this.tab5 = false
                    this.tab6 = !this.tab6
                    break;
                default:
                    break;
            }
        },

    }
}
</script>
<style lang="scss">
.account-content {
    .account-content-top {
        position: relative;

        .account-content-image {
            width: 100%;
        }

        .account-content-name {
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            bottom: 90px;
            color: #FFF;
            text-align: center;
            font-family: 'Aeroport';
            font-size: 50px;
            text-transform: uppercase;
        }
    }

    .account-content-data {
        background-color: #EEEEEE;
        padding: 65px 0px;

        .account-content-left {
            width: calc(50% - 10px);
            display: inline-block;
        }

        .account-content-right {
            width: calc(50% - 10px);
            display: inline-block;
        }

        .account-content-card {
            background-color: #fff;
            margin-bottom: 20px;

            .account-content-card-head {
                height: 35px;
                line-height: 35px;
                padding: 0px 20px;
                border-bottom: 2px solid #F4F4F4;

                .account-content-card-head-title {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 16px;
                    text-transform: uppercase;
                }

                .account-content-card-head-edit {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 13px;
                    text-decoration-line: underline;
                    cursor: pointer;
                }
            }

            .account-content-body {
                padding: 10px 24px;
                background-color: #fafafa;

                .account-content-body-text {
                    margin-bottom: 10px;
                    color: #717171;
                    font-family: 'Aeroport-light';
                    font-size: 16px;
                }
            }

            .account-content-footer {
                height: 35px;
                line-height: 35px;
                padding: 0px 20px;
                background-color: #fff;
                text-align: right;
                cursor: pointer;
                text-decoration-line: underline;
                color: #717171;
                text-transform: uppercase;
                font-size: 13px;
            }

            .account-content-order-item {
                background-color: #FAFAFA;
                padding: 15px 5px;
                margin-bottom: 10px;

                .account-content-order-item-img {
                    width: 95px;
                    height: 105px;
                }

                .account-content-order-item-state {
                    color: #000;
                    font-family: 'Aeroport-light';
                    font-size: 13px;
                    margin-top: 8px;
                    white-space: nowrap;
                }

                .account-content-order-item-info {
                    width: calc(100% - 105px);
                    position: relative;

                    .account-content-order-item-info-name {
                        color: #000;
                        font-family: 'Aeroport-light';
                        font-size: 16px;
                        text-transform: uppercase;
                        margin-bottom: 10px;
                    }

                    .account-content-order-item-info-des {
                        color: #717171;
                        font-family: 'Aeroport-light';
                        font-size: 13px;
                        line-height: 20px;

                        span {
                            color: #000;
                        }
                    }

                    .account-content-order-item-info-price {
                        color: #000;
                        font-family: 'Aeroport-light';
                        font-size: 13px;
                        text-transform: uppercase;
                        position: absolute;
                        bottom: 0px;
                        right: 0px;
                    }
                }

            }
        }
    }
}

@media (max-width: 520px) {
    .account-content {
        .account-content-top {
            position: relative;

            .account-content-image {
                width: 100%;
            }

            .account-content-name {
                position: absolute;
                left: 50%;
                transform: translate(-50%);
                bottom: 300px;
                color: #FFF;
                text-align: center;
                font-family: 'Aeroport';
                font-size: 30px;
                text-transform: uppercase;

                span {
                    white-space: nowrap;
                }
            }
        }

        .account-content-data {
            background-color: #EEEEEE;
            padding: 65px 0px;

            .account-content-left {
                width: calc(50% - 10px);
                display: inline-block;
            }

            .account-content-right {
                width: calc(50% - 10px);
                display: inline-block;
            }

            .account-content-card {
                background-color: #fff;
                margin-bottom: 20px;

                .account-content-card-head {
                    height: 35px;
                    line-height: 35px;
                    padding: 0px 20px;
                    border-bottom: 2px solid #F4F4F4;

                    .account-content-card-head-title {
                        color: #000;
                        font-family: 'Aeroport-light';
                        font-size: 16px;
                        text-transform: uppercase;
                    }

                    .account-content-card-head-edit {
                        color: #000;
                        font-family: 'Aeroport-light';
                        font-size: 13px;
                        text-decoration-line: underline;
                        cursor: pointer;
                    }
                }

                .account-content-body {
                    padding: 10px 24px;
                    background-color: #fafafa;

                    .account-content-body-text {
                        margin-bottom: 10px;
                        color: #717171;
                        font-family: 'Aeroport-light';
                        font-size: 16px;
                    }
                }

                .account-content-footer {
                    height: 35px;
                    line-height: 35px;
                    padding: 0px 20px;
                    background-color: #fff;
                    text-align: right;
                    cursor: pointer;
                    text-decoration-line: underline;
                    color: #717171;
                    text-transform: uppercase;
                    font-size: 13px;
                }

                .account-content-order-item {
                    background-color: #FAFAFA;
                    padding: 5px 0px;
                    margin-bottom: 5px;

                    .account-content-order-item-img {
                        width: 70px;
                        height: 95px;
                    }

                    .account-content-order-item-state {
                        color: #000;
                        font-family: 'Aeroport-light';
                        font-size: 10px;
                        margin-top: 8px;
                        white-space: nowrap;
                    }

                    .account-content-order-item-info {
                        width: calc(100% - 80px);
                        position: relative;

                        .account-content-order-item-info-name {
                            color: #000;
                            font-family: 'Aeroport-light';
                            font-size: 12px;
                            text-transform: uppercase;
                            margin-bottom: 5px;
                        }

                        .account-content-order-item-info-des {
                            color: #717171;
                            font-family: 'Aeroport-light';
                            font-size: 10px;
                            line-height: 16px;

                            span {
                                color: #000;
                            }
                        }

                        .account-content-order-item-info-price {
                            color: #000;
                            font-family: 'Aeroport-light';
                            font-size: 13px;
                            text-transform: uppercase;
                            position: absolute;
                            bottom: 0px;
                            right: 0px;
                        }
                    }

                }
            }
        }
    }
}
</style>