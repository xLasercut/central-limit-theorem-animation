<template>
    <g>
        <circle :cx="startx + 20" :cy="200" r="5" ref="ball"></circle>
    </g>
</template>

<script>
    import { TimelineLite } from 'gsap/all'

    export default {
        props: {
            startx: {
                type: Number,
                required: true
            },
            endx: {
                type: Number,
                required: true
            },
            dt: {
                type: Number,
                required: true
            },
            average: {
                default: null
            },
            id: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                baseTime: this.dt,
            }
        },
        mounted() {
            const ball = this.$refs["ball"]
            const timeline = new TimelineLite()


            timeline.to(ball, this.baseTime, {y: 170})
            timeline.to(ball, this.baseTime/2, {x: this.endx - this.startx, fill: '#fb9a1a'})
            timeline.to(ball, this.baseTime/2, {y: 410})

            setTimeout(() => {
                if (this.average || this.average === 0) {
                    this.$emit('increase-average', this.average)
                }
                this.$emit('remove-ball', this.id)
            }, this.baseTime * 2000)
        }
    }
</script>

<style scoped>
    circle {
        fill: #f1d600;
    }
</style>