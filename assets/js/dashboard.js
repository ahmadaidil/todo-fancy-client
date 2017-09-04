var todo = new Vue({
    el: '#todo',
    data: {
        lists : null,
        itemsLeft : null,
        itemsDone : null
    },
    methods: {
        getList(){
            axios.get('http://35.186.146.79/api/todo/searchId', {
                headers: {
                    token: localStorage.getItem('accesstoken')
                }
            })
            .then(response => {
                this.lists = null
                this.lists = response.data
                this.countTodos()
            })
        },

        createTodo(){
            axios.post('http://35.186.146.79/api/todo/create', {
                task : $('.add-todo').val()
            },{
                headers : {
                    token : localStorage.getItem('accesstoken')
                }
            })
            .then(response => {
                $('.add-todo').val('')
                this.getList()
            })
        },

        completeTodo(list){
            axios.put(`http://35.186.146.79/api/todo/updateComplete/${list._id}`, {}, {
                headers : {
                    token : localStorage.getItem('accesstoken')
                }
            })
            .then((response)=>{
                // console.log(result)
                this.getList()
            })
        },

        deleteTodo(list){
            axios.delete(`http://35.186.146.79/api/todo/remove/${list._id}`, {
                headers : {
                    token : localStorage.getItem('accesstoken')
                }
            })
            .then(response => {
                // console.log(result)
                this.getList()
            })
        },

        logout(){
            FBLogout()
            localStorage.removeItem('fbaccesstoken')
            localStorage.removeItem('accesstoken')
            window.location = `${window.location.protocol}//${window.location.hostname}`
        },

        //helpers
        // count tasks
        countTodos(){
            this.itemsLeft = null
            this.itemsDone = null
            this.lists.forEach(list =>{
                if (!list.completed) this.itemsLeft += 1;
                else if(list.completed) this.itemsDone +=1;
            })
        }
    },
    mounted() {
        this.getList()
    }
})