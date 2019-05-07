<template>
    <div class="home">
        <div class="inputContainer">
            <inputs v-model.number="alpha" :disabled="disabled" :min="0.1" :max="5" :step="0.01">
                Alpha
            </inputs>
            <inputs v-model.number="beta" :disabled="disabled" :min="0.1" :max="5" :step="0.01">
                Beta
            </inputs>
            <inputs v-model.number="sampleSize" :disabled="disabled" :min="1" :max="15" :step="1">
                Sample Size
            </inputs>
            <inputs v-model.number="draws" :disabled="disabled" :min="1" :max="200" :step="1">
                Draws
            </inputs>
            <inputs v-model.number="dt" :disabled="disabled" :min="100" :max="2000" :step="100">
                Time per Draw (ms)
            </inputs>

            <el-button @click="start()" :disabled="disabled" type="primary">Start</el-button>
            <el-button @click="stop()" >Stop</el-button>
            <el-button @click="reset()" :disabled="disabled" type="danger">Reset</el-button>
        </div>
        <div class="canvasContainer">
            <svg class="canvas" :height="height" :width="width">
                <distribution :alpha="alpha" :beta="beta" :range="range" :xstep="xstep"></distribution>
                <axis :y="370" label="Average"></axis>
                <axis :y="602" label="Count"></axis>
                <axis :y="200" label="Draw"></axis>
                <bar
                    :height="bar" :x="x(key)"
                    :label="bar" :maxHeight="maxHeight"
                    v-for="(bar, key) in averages" :key="`bar_${key}`"
                ></bar>
                <ball
                    :startx="ball.startx" :endx="ball.endx"
                    :average="ball.average" :key="ball.id" :id="ball.id"
                    v-for="ball in ballData" :dt="dt/1000"
                    @increase-average="increaseAverage($event)"
                    @remove-ball="removeBall($event)"
                ></ball>
            </svg>
        </div>
    </div>
</template>

<script>
    import Ball from '../components/Ball.vue'
    import Bar from '../components/Bar.vue'
    import Axis from '../components/Axis.vue'
    import Inputs from '../components/Inputs.vue'
    import Distribution from '../components/Distribution.vue'
    import jStat from 'jStat'

    export default {
        components: {
            Ball,
            Bar,
            Axis,
            Inputs,
            Distribution
        },
        data() {
            return {
                height: 625,
                width: 895,
                xstep: 0,
                dt: 500,
                sampleSize: 4,
                draws: 10,
                processedDraws: 0,
                range: 20,
                averages: {},
                ballData: [],
                process: null,
                maxHeight: 1,
                disabled: false,
                alpha: 1,
                beta: 1
            }
        },
        methods: {
            x(val) {
                return (parseInt(val) * this.xstep) + 10
            },
            getSample() {
                return Math.floor(jStat.beta.sample(this.alpha, this.beta) * this.range)
            },
            getBallId() {
                return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5))
            },
            getDraw() {
                var samples = []
                var total = 0
                for (var d = 0; d < this.sampleSize; d++) {
                    var sample = this.getSample()
                    samples.push(sample)
                    total += sample
                }

                var average = Math.floor(total / this.sampleSize)

                return {
                    samples: samples,
                    average: average
                }
            },
            createBall(samples, average) {
                for (var i = 0; i < samples.length; i++) {
                    var data = {
                        startx: this.x(samples[i]),
                        endx: this.x(average),
                        id: this.getBallId()
                    }

                    if (i === 0) {
                        data['average'] = average
                    }

                    this.ballData.push(data)
                }
            },
            start() {
                this.processedDraws = 0
                this.disabled = true
                this.process = setInterval(() => {
                    var draw = this.getDraw()
                    this.createBall(draw.samples, draw.average)

                    this.processedDraws += 1
                    if (this.processedDraws >= this.draws) {
                        this.disabled = false
                        clearInterval(this.process)
                    }
                }, this.dt)
            },
            removeBall(id) {
                for (var i = 0; i < this.ballData.length; i++) {
                    if (this.ballData[i].id === id) {
                        this.ballData.splice(i, 1)
                    }
                }
            },
            increaseAverage(average) {
                this.averages[average] += 1
                this.updateMaxHeight()
            },
            updateMaxHeight() {
                for (var key in this.averages) {
                    if (this.averages[key] > this.maxHeight) {
                        this.maxHeight = this.averages[key]
                    }
                }
            },
            initAverage() {
                var averages = {}
                for (var i = 0; i < this.range; i++) {
                    averages[i] = 0
                }
                this.averages = averages
            },
            setWorkArea() {
                this.xstep = Math.floor(this.width / this.range)
            },
            reset() {
                for (var key in this.averages) {
                    this.averages[key] = 0
                }
            }
        },
        mounted() {
            this.setWorkArea()
            this.initAverage()
        }
    }
</script>

<style>
    body {
        margin: 0;
        padding: 0;
    }

    .inputContainer {
        margin: 20px;
        float: left;
        width: calc(100vw - 1000px);
        max-width: 300px;
        min-width: 200px;
    }

    .canvasContainer {
        margin: 20px;
        width: 900px;
        float: left;
    }


</style>