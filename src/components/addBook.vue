<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="书名">
                <el-input v-model="name"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="author"></el-input>
            </el-form-item>
            <el-form-item label="价格">
                <el-input v-model="price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="发版日期">
                <el-date-picker
                        v-model="publish_date"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        default-time="18:00:00"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addBook()">立即添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: "",
                author: "",
                price: "",
                publish_date: ""
            };
        },
        methods: {
            addBook() {
                this.$http
                    .post("book", {
                        name: this.name,
                        author: this.author,
                        price: this.price,
                        publish_date: this.publish_date,
                    })
                    .then(result => {
                        var result = result.body;
                        if (result.code === 200) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.name = "";
                            this.author = "";
                            this.price = "";
                            this.publish_date = "";
                        } else {
                            // 失败了
                            alert("添加失败！");
                        }
                    });
            }
        }
    };
</script>
