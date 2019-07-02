import VueRouter from 'vue-router'
import ListBook from './components/listBook'
import addBook from './components/addBook'
import updateBook from './components/updateBook'

var router = new VueRouter({
    routes: [
        {path: '/', component: ListBook},
        {path: '/listBooks', component: ListBook},
        {path: '/addBook', component: addBook},
        {path: '/updateBook/:id', component: updateBook},
    ]

})
export default router