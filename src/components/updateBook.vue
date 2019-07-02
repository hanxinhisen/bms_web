<template>
    <div>
        <el-form ref="form" label-width="80px">
            <el-form-item label="ID">
                <el-input v-model="id" disabled></el-input>
            </el-form-item>
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
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updateBook()">立即修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        created() {
            this.getBookInfo()

        },
        data() {
            return {
                id: "",
                name: "",
                author: "",
                price: "",
                publish_date: ""
            };
        },
        methods: {
            dateFormat: function (date) {
                if (date == undefined) {
                    return "未填";
                }
                return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            getBookInfo() {
                this.$http
                    .get("book/" + this.$route.params.id).then(result => {
                    var result = result.body;
                    if (result.code === 200) {
                        this.id = result.data[0].id;
                        this.name = result.data[0].name;
                        this.author = result.data[0].author;
                        this.price = result.data[0].price;
                        this.publish_date = result.data[0].publish_date;
                    } else {
                        // 失败了
                        alert("获取失败！");
                    }
                });
            },

            updateBook() {
                this.$http
                    .put("book", {
                        id: this.id,
                        name: this.name,
                        author: this.author,
                        price: this.price,
                        publish_date: this.dateFormat(this.publish_date),
                    })
                    .then(result => {
                        var result = result.body;
                        if (result.code === 200) {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$router.push({path: '/listBooks'})
                        } else {
                            // 失败了
                            alert("添加失败！");
                        }
                    });
            }
        }

    };
</script>
