<template>
  <div class="scroll-wrapper" :ref="scrollWarp">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
    props: {
        hasRefresh: {
            type: null
        },
        scrollWarp: {
            type: String,
            default: "wrapper"
        },
        stopPropagation: {
            type: Boolean,
            default: false
        },
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        listenScroll: {
            type: Boolean,
            default: false
        },
        listenBeforeScroll: {
            type: Boolean,
            default: false
        },
        direction: {
            type: String,
            default: "vertical"
        },
        scrollbar: {
            type: null,
            default: false
        },
        pullDownRefresh: {
            type: null,
            default: false
        },
        pullup: {
            type: null,
            default: false
        },
        pullUpLoad: {
            type: null,
            default: false
        },
        startY: {
            type: Number,
            default: 0
        },
        refreshDelay: {
            type: Number,
            default: 20
        },
        freeScroll: {
            type: Boolean,
            default: false
        },
        mouseWheel: {
            type: Boolean,
            default: false
        },
        bounce: {
            default: true
        },
        zoom: {
            default: false
        },
        data: {
            type: Array,
            default: null
        }
    },
    mounted () {
        // 保证在DOM渲染完毕后初始化better-scroll
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll () {
            if (!this.$refs[this.scrollWarp]) {
                return
            }
            // better-scroll的初始化
            this.scroll = new BScroll(this.$refs[this.scrollWarp], {
                probeType: this.probeType,
                click: this.click,
                scrollY: this.freeScroll || this.direction === "vertical",
                scrollX: this.freeScroll || this.direction === "horizontal",
                scrollbar: this.scrollbar,
                pullDownRefresh: this.pullDownRefresh,
                pullUpLoad: this.pullUpLoad,
                startY: this.startY,
                freeScroll: this.freeScroll,
                mouseWheel: this.mouseWheel,
                bounce: this.bounce,
                zoom: this.zoom
            })
            // 是否派发滚动事件
            if (this.listenScroll) {
                this.scroll.on("scroll", (pos) => {
                    this.$emit("scroll", pos)
                })
            }

            // 是否派发滚动到底部事件，用于上拉加载
            if (this.pullup) {
                this.scroll.on("scrollEnd", (pos) => {
                    // 滚动到底部
                    // if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                    this.$emit("scrollToEnd", pos)
                    // }
                })
            }

            // 是否派发顶部下拉事件，用于下拉刷新
            if (this.pulldown) {
                this.scroll.on("touchend", (pos) => {
                    // 下拉动作
                    if (pos.y > 50) {
                        this.$emit("pulldown")
                    }
                })
            }

            // 是否派发列表滚动开始的事件
            if (this.beforeScroll) {
                this.scroll.on("beforeScrollStart", () => {
                    this.$emit("beforeScroll")
                })
            }
        },
        disable () {
        // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable()
        },
        enable () {
        // 代理better-scroll的enable方法
            this.scroll && this.scroll.enable()
        },
        refresh () {
        // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh()
        },
        scrollTo () {
        // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement () {
            // 代理better-scroll的scrollToElement方法
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    watch: {
        // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
        hasRefresh () {
            setTimeout(() => {
                this.refresh()
            }, this.refreshDelay)
        }
    }
}
</script>

<style lang="scss">
    .scroll-wrapper {
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
</style>
