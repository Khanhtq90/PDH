<template>
    <div class="backgroud-black">
        <div class="prodile-content">
            <img class="prodile-close" src="/images/close-outline.png" @click="$emit('closeUpdate')" />
            <div class="prodile-title">Edit Profile</div>
            <div class="input-form-des-text">*required field</div>
            <b-row v-if="!isMobile" class="mt-3">
                <b-col cols="12">
                    <div class="input-form-des">*Full name</div>
                    <b-form-input class="input-form-prodile" v-model="form.username"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <div class="input-form-des">*Phone</div>
                    <b-form-input class="input-form-prodile" v-model="form.phone"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <div class="input-form-des">*Email</div>
                    <div>{{ profile.email }}</div>
                </b-col>
                <b-col cols="12">
                    <div class="input-form-des">*Brithday</div>
                    <b-form-datepicker id="example-datepicker" v-model="form.brithday" placeholder="Nhập ngày sinh"
                        :locale="'vi'"></b-form-datepicker>
                </b-col>
            </b-row>
            <b-row v-else>
                <b-col cols="12">
                    <div class="input-form-des">*Full name</div>
                    <b-form-input class="input-form-prodile" v-model="form.username"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <div class="input-form-des">*Phone</div>
                    <b-form-input class="input-form-prodile" v-model="form.phone"></b-form-input>
                </b-col>
                <b-col cols="12">
                    <div class="input-form-des">*Email</div>
                    <div>{{ profile.email }}</div>
                </b-col>
                <b-col cols="12">
                    <div class="input-form-des">*Brithday</div>
                    <b-form-datepicker id="example-datepicker" v-model="form.brithday" placeholder="Nhập ngày sinh"
                        :locale="'vi'"></b-form-datepicker>
                </b-col>
            </b-row>
            <div class="up-add-btn" @click="onUpdate()">Cập nhật
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapGetters, mapActions } from "vuex"
import general from "~/mixins/general"
export default {
    mixins: [general],
    props: {
        isMobile: {
            type: Boolean,
            default: false
        },
    },
    computed: {
        ...mapGetters({
            profile: "auth/getProfile"
        }),
    },
    data() {
        return {
            form: {
                username: null,
                phone: null,
                brithday: null
            }
        }
    },
    async mounted() {
        this.form = {
            username: this.profile.username,
            phone: this.profile.phone,
            brithday: this.profile.brithday
        }
    },
    methods: {
        ...mapActions({
            updateUser: "auth/updateProfile",
        }),
        async onUpdate() {
            if (!this.form.username) {
                this.$message.warning('Vui lòng nhập tên');
                return
            }
            let rs = await this.updateUser({
                id: this.profile.id,
                data: {
                    username: this.form.username,
                    phone: this.form.phone,
                    brithday: this.form.brithday
                }
            })
            if (rs && rs.id) {
                this.$emit('closeUpdate')
                this.$message.success('Cập nhật thành công');
            } else {
                this.$message.error('Cập nhật không thành công! Xin thử lại sau!');
            }
        }
    }
}
</script>
<style lang="scss">
.backgroud-black {
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0px;
    top: 0px;
    background-color: #000000b3;
    z-index: 15;
}

.prodile-content {
    position: relative;
    top: calc(50% - 630px/2);
    margin: auto;
    width: 550px;
    height: 630px;
    background-color: #ffffff;
    padding: 30px;

    .prodile-close {
        position: absolute;
        right: 30px;
        top: 30px;
        cursor: pointer;
    }

    .prodile-title {
        color: #000;
        font-family: 'Aeroport';
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .input-form-des {
        color: #717171;
        font-family: 'Aeroport-light';
        font-size: 13px;
        margin-bottom: 5px;
        margin-top: 20px;
    }

    .input-form-des-text {
        color: #717171;
        font-family: 'Aeroport-light';
        font-size: 13px;
    }

    .input-form-prodile {
        color: #717171;
        font-family: 'Aeroport-light';
        font-size: 13px;
        border: 1px solid #000;
        border-radius: 0px;
    }

    .up-add-btn {
        width: 100%;
        height: 55px;
        line-height: 53px;
        text-align: center;
        color: #FFF;
        border: 1px solid #000;
        background-color: #000;
        font-family: 'Aeroport';
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        cursor: pointer;
        margin-top: 30px;
        position: relative;
    }

}

@media (max-width: 520px) {
    .prodile-content {
        position: relative;
        top: calc(50% - 470px/2);
        margin: auto;
        width: 90%;
        height: 470px;
        background-color: #ffffff;
        padding: 20px;

        .prodile-close {
            position: absolute;
            right: 10px;
            top: 10px;
            cursor: pointer;
        }

        .prodile-title {
            color: #000;
            font-family: 'Aeroport';
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
        }

        .input-form-des {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 13px;
            margin-bottom: 5px;
            margin-top: 20px;
        }

        .input-form-des-text {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 13px;
        }

        .input-form-prodile {
            color: #717171;
            font-family: 'Aeroport-light';
            font-size: 13px;
            border: 1px solid #000;
            border-radius: 0px;
        }

        .up-add-btn {
            width: 100%;
            height: 35px;
            line-height: 33px;
            text-align: center;
            color: #FFF;
            border: 1px solid #000;
            background-color: #000;
            font-family: 'Aeroport';
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            cursor: pointer;
            margin-top: 60px;
            position: relative;
        }

    }
}
</style>
  