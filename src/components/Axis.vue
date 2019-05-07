<template>
    <g>
        <line x1="10" :y1="y" x2="885" :y2="y"></line>
        <text x="10" :y="y + 20">{{label}}</text>
    </g>
</template>

<script>
    export default {
        props: {
            y: {
                type: Number,
                required: true
            },
            label: {
                type: String,
                required: true
            }
        }
    }

</script>

<style lang="scss" scoped>
    line {
        stroke: #000000;
        stroke-width: 2;
    }
</style>