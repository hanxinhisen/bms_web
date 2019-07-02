<template>

    <div>
        <el-table element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                  fit
                  :data="list" border style="width: 100%" ref="multipleTable" tooltip-effect="dark" height="500">
            <el-table-column prop="id" label="id" sortable=""></el-table-column>
            <el-table-column prop="name" label="书名"></el-table-column>
            <el-table-column prop="author" label="作者"  sortable></el-table-column>
            <el-table-column prop="price" label="价格" :filters="pricelist"  :filter-method="filterHandler" sortable=""></el-table-column>
            <el-table-column prop="publish_date" label="发布时间" :formatter="dateFormat" sortable
                             :filters="datelist"  :filter-method="filterHandler"></el-table-column>

            <el-table-column label="编辑">
                <template slot-scope="scope">
                    <router-link to="/updateBook">
                        <el-button type="primary" icon="el-icon-edit" size="mini"
                                   @click.prevent="updateBook(scope.$index, scope.row)">编辑
                        </el-button>
                    </router-link>
                    <el-button type="danger" icon="el-icon-delete" size="mini"
                               @click.prevent="deleteBook(scope.$index, scope.row)">删除
                    </el-button>

                </template>
            </el-table-column>

        </el-table>

    </div>

</template>

<script>
    export default {
        // name: "ListBook",
        inject: ["reload"],
        created() {
            this.loadBookList();
        },
        data() {
            return {
                input: 0,
                list: [],
                datelist :[],
                pricelist:[],
            };

        },
        methods: {
            filterHandler(value, row, column){
                const property = column['property'];
                return row[property] === value;
            },
            dateFormatDate: function (date) {
                if (date == undefined) {
                    return "未填";
                }
                return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            isINArray(arr,value){
                for(let i = 0; i < arr.length; i++){
                    if(JSON.stringify(value) === JSON.stringify(arr[i])){
                        return true;
                    }
                }
                return false;
            },

            loadBookList() {
                let self = this
                self.$http.get("book").then(result => {
                    result = result.body;
                    let datalist = []
                    let pricelist = []
                    if (result.code === 200) {
                        self.list = result.data
                        result.data.forEach(function (v) {
                            let t = {text:self.dateFormatDate(v.publish_date),value:v.publish_date};
                            if (!self.isINArray(datalist,t)){
                                datalist.push(t)
                            }
                            let p  = {text:v.price,value:v.price}
                            if (!self.isINArray(pricelist,p)){
                                pricelist.push(p)
                            }

                        })
                        self.datelist = datalist
                        self.pricelist = pricelist
                    }
                });

            },

            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "未填";
                }
                return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
            },
            updateBook(index, row) {
                this.$router.push({
                    path: `/updateBook/${row.id}`
                });
            },
            deleteBook(index, row) {
                this.$http.delete("book/" + row.id).then(result => {
                    var result = result.body
                    if (result.code === 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.reload()
                    }
                })
            }
        }

    };

</script>