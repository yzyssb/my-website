<template>
    <el-form size="mini" :model="query" inline>
        <el-form-item label="关键词" prop="search">
            <el-input v-model="query.key"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="searchAction">搜索</el-button>
            <el-button type="primary" @click="newAction">新增</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    props:{
        query:{
            type:Array,
            default:[]
        }
    },
    methods:{
        searchAction(){
            this.$emit('transferQuery',this.query)
        },
        newAction(){
            this.$emit('showNewDialog')
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
