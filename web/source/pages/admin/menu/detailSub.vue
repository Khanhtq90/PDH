<template>
    <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }"
        labelAlign="left">
        <a-row>
            <a-col :span="12">
                <a-form-model-item ref="name" label="Tên" prop="name">
                    <a-input v-model="form.name" @blur="() => { $refs.name.onFieldBlur(); }" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item ref="name_en" label="Tên tiếng anh" prop="name_en">
                    <a-input v-model="form.name_en" />
                </a-form-model-item>
            </a-col>
            <a-col :span="12" style="padding-left: 10px;">
                <a-form-model-item label="Vị trí hiển thị" prop="order">
                    <a-input v-model="form.order" type="number" />
                </a-form-model-item>
            </a-col>
        </a-row>
        <a-form-model-item :wrapper-col="{ span: 4, offset: 20 }">
            <a-button v-if="modalType === 'create'" type="primary" @click="onSubmitAdd">
                Tạo mới
            </a-button>
            <a-button v-else type="primary" @click="onSubmitUpdate">
                Cập nhật
            </a-button>
            <a-button style="margin-left: 10px;" @click="() => this.$emit('onCancel')">
                Huỷ
            </a-button>
        </a-form-model-item>
    </a-form-model>
</template>
<script>
import general from "~/mixins/general";
import { mapActions, mapMutations } from 'vuex'
export default {
    mixins: [general],
    props: {
        item: {
            type: Object,
            default: {},
        },
        parent_id: {
            type: Number,
            default: null
        },
        modalType: {
            type: String,
            default: 'create'
        },
        modalOpen: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: {
                name: undefined,
                name_en: undefined,
                order: 0
            },
            rules: {
                name: [{ required: true, message: 'Tên không thể để trống', trigger: 'blur' }],
                name_en: [{ required: true, message: 'Tên không thể để trống', trigger: 'blur' }],
            },
            loading: false,
        }
    },
    mounted() {
        if (this.item && this.item.id) {
            this.$refs.ruleForm.resetFields();
            this.form = {
                name: this.item.attributes.name,
                name_en: this.item.attributes.name_en,
                order: this.item.attributes.order,
            }
        }
    },
    watch: {
        modalType: function (val) {
            if (val && val === 'create') {
                this.$refs.ruleForm.resetFields();
            }
        },
        modalOpen: function (val) {
            if (this.modalType && this.modalType === 'create') {
                this.$refs.ruleForm.resetFields();
            }
        },
        item: function (val) {
            if (val && val.id && val.attributes) {
                this.$refs.ruleForm.resetFields();
                this.form = {
                    name: val.attributes.name,
                    name_en: val.attributes.name_en,
                    order: val.attributes.order,
                }
            }
        },
    },
    methods: {
        ...mapActions({
            updateItem: "collectionCate/updateItem",
            createItem: "collectionCate/createItem",
            postbyUrl: 'common/postbyUrl'
        }),
        async onSubmitAdd() {
            if (this.parent_id) {
                this.$refs.ruleForm.validate(async valid => {
                    if (valid) {
                        let rs = await this.createItem({
                            data: {
                                ...this.form,
                                type: 'sub',
                                parent: this.parent_id
                            }
                        })
                        if (rs && rs.id) {
                            this.$message.success('Tạo mới thành công');
                            this.$emit('onReload')
                            this.$emit('onCancel')
                        } else {
                            this.$message.error('Tạo mới không thành công! Xin thử lại sau!');
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        async onSubmitUpdate() {
            this.$refs.ruleForm.validate(async valid => {
                if (valid) {
                    let rs = await this.updateItem({
                        id: this.item.id,
                        data: {
                            ...this.form
                        }
                    })
                    if (rs && rs.id) {
                        this.$message.success('Cập nhật thành công');
                        this.$emit('onReload')
                        this.$emit('onCancel')
                    } else {
                        this.$message.error('Cập nhật không thành công! Xin thử lại sau!');
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    }
}
</script>
  
<style lang="scss" scoped></style>
  