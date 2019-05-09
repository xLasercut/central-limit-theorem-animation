<template>
    <g>
        <rect class="bar" :x="x" y="400" height="200" width="40"></rect>
        <rect class="overlay" :x="x-1" y="398" height="202" width="42" ref="overlay"></rect>
        <text v-bind="labelStyle" :y="595" v-if="label">{{label}}</text>
    </g>
</template>

<script>
    export default {
        props: {
            height: {
                type: Number,
                required: true
            },
            x: {
                type: Number,
                required: true
            },
            label: {},
            maxHeight: {
                type: Number,
                default: 1
            }
        },
        watch: {
            height(val) {
                this.tweenHeight()
            },
            maxHeight(val) {
                this.tweenHeight()
            }
        },
        computed: {
            labelStyle() {
                var x = this.x + 10

                if (this.label < 10) {
                    x = this.x + 15
                }
                else if (this.label > 99) {
                    x = this.x + 7
                }

                return {
                    x: x
                }
            }
        },
        methods: {
            tweenHeight() {
                var percentage = 1 - (this.height / this.maxHeight)
                const overlay = this.$refs['overlay']
                const timeline = new TimelineLite()

                timeline.to(overlay, 0.5, {scaleY: percentage})
            }
        },
        mounted() {
            this.tweenHeight()
        }
    }
</script>

<style scoped>
    .bar {
        fill: #fec18c;
    }

    .overlay {
        fill: white;
    }
</style>