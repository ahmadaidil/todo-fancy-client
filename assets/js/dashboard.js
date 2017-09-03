var todo = new Vue({
    el: '#todo',
    data: {
        lists : null,
        itemsLeft : null,
        itemsDone : null
    },
    computed: {

    },
    methods: {
        getList(){
            axios.get('http://localhost:3000/api/todo/searchId', {
                headers: {
                    token: localStorage.getItem('accesstoken')
                }
            })
            .then(result=>{
                console.log(result)
                this.lists = result.data;
                this.countTodos();
            })
            .catch(err=>{
                console.log(err)
            })
        },

        // checkFB(){
        //     this.fbAuth = localStorage.getItem('fbAuth')
        //     if(this.fbAuth){
        //         this.getList('todofb')    
        //     }
        //     else{
        //         this.getList('todo')
        //     }
        // },

        createTodo(){
            axios.post('http://localhost:3000/api/todo/create', {
                task : $('.add-todo').val()
            },{
                headers : {
                    token : localStorage.getItem('accesstoken')
                }
            })
            .then(result=>{
                $('.add-todo').val('')
                this.getList()
            })
        },

        completeTodo(list){
            axios.put(`http://localhost:3000/api/todo/updateComplete/${list._id}`, {}, {
                headers : {
                    token : localStorage.getItem('accesstoken')
                }
            })
            .then(result=>{
                // console.log(result)
                this.getList()
            })
            .catch(err=>{
                console.log(err)
            })
        },

        deleteTodo(list){
            axios.delete(`http://localhost:3000/api/todo/remove/${list._id}`, {
                headers : {
                    token : localStorage.getItem('accesstoken')
                }
            })
            .then(result=>{
                // console.log(result)
                this.getList()
            })
            .catch(err=>{
                console.log(err)
            })
        },

        logout(){
            FBLogout()
            localStorage.removeItem('fbaccesstoken')
            localStorage.removeItem('accesstoken')
            window.location = `${window.location.protocol}//${window.location.hostname}:8080`
        },

        //helpers
        // count tasks
        countTodos(){
            this.itemsLeft = null
            this.itemsDone = null
            this.lists.forEach(list=>{
                if (!list.completed) this.itemsLeft += 1;
                else if(list.completed) this.itemsDone +=1;
            })
        }
    },
    created() {
        this.getList()
    }
})