<template>
    <div id="app">
        <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
                 active-text-color="#ffd04b">
            <el-menu-item index="1">
                <router-link to="/listBooks">书籍列表</router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link to="/addBook">添加书籍</router-link>
            </el-menu-item>
        </el-menu>
        <br>
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<style>
    a {
        text-decoration: none;
    }
</style>

<script>
    export default {
        name: 'App',
        provide() {
            return {
                reload: this.reload
            }
        },
        data() {
            return {
                isRouterAlive: true
            }
        },
        methods: {
            reload() {
                this.isRouterAlive = false
                this.$nextTick(function () {
                    this.isRouterAlive = true
                })
            }
        }
    }
</script>