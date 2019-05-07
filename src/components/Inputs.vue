<template>
    <div>
        <label><slot></slot></label>
        <el-slider v-model="model" :disabled="disabled" :min="min" :max="max" :step="step" show-input></el-slider>
    </div>
</template>

<script>
    export default {
        props: {
            value: {},
            disabled: {
                type: Boolean,
                default: false
            },
            min: {},
            max: {},
            step: {}
        },
        data() {
            return {
                model: this.value
            }
        },
        watch: {
            model(val) {
                this.$emit('input', val)
            },
            value(val) {
                this.model = val
            }
        }
    }
</script>

<style lang="scss" scoped>
    label {
        float: left;
        width: 100%;
    }

    input {
    }

    div {
        float: left;
        width: 100%;
        margin: 10px;
    }
</style>