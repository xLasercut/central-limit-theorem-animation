<template>
    <path :d="distributionPath"></path>
</template>

<script>
    import jStat from 'jStat'

    export default {
        props: {
            alpha: {
                type: Number,
                required: true
            },
            beta: {
                type: Number,
                required: true
            },
        },
        computed: {
            distributionPath() {
                var width = 875
                var range = 175
                var ystep = 30
                var xstep = 875 / range

                var path = 'M ' + 10 + ' ' + (180 - (jStat.beta.pdf(0.005, this.alpha, this.beta) * ystep))

                for (var i = 0.010; i <= 1; i+=0.005) {
                    var x = Math.floor(i * xstep * range) + 10
                    var y = 180 - (jStat.beta.pdf(i, this.alpha, this.beta) * ystep)
                    path += ' L ' + x + ' ' + y
                }
                return path
            }
        },
        mounted() {
            this.distributionPath
        }
    }
</script>

<style scoped>
    path {
        fill: none;
        stroke: #f1d500;
        stroke-width: 3px;
    }
</style>