// $("#sortable").sortable();
// $("#sortable").disableSelection();

// countTodos();

// // all done btn
// $("#checkAll").click(function(){
//     AllDone();
// });

// //create todo
// $('.add-todo').on('keypress',function (e) {
//       e.preventDefault
//       if (e.which == 13) {
//            if($(this).val() != ''){
//            var todo = $(this).val();
//             createTodo(todo); 
//             countTodos();
//            }else{
//                // some validation
//            }
//       }
// });
// // mark task as done
// $('.todolist').on('change','#sortable li input[type="checkbox"]',function(){
//     if($(this).prop('checked')){
//         var doneItem = $(this).parent().parent().find('label').text();
//         $(this).parent().parent().parent().addClass('remove');
//         done(doneItem);
//         countTodos();
//     }
// });

// //delete done task from "already done"
// $('.todolist').on('click','.remove-item',function(){
//     removeItem(this);
// });

// // count tasks
// function countTodos(){
//     var count = $("#sortable li").length;
//     $('.count-todos').html(count);
// }

// //create task
// function createTodo(text){
//     var markup = '<li class="ui-state-default"><div class="checkbox"><label><input type="checkbox" value="" />'+ text +'</label></div></li>';
//     $('#sortable').append(markup);
//     $('.add-todo').val('');
// }

// //mark task as done
// function done(doneItem){
//     var done = doneItem;
//     var markup = '<li>'+ done +'<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
//     $('#done-items').append(markup);
//     $('.remove').remove();
// }

// //mark all tasks as done
// function AllDone(){
//     var myArray = [];

//     $('#sortable li').each( function() {
//          myArray.push($(this).text());   
//     });
    
//     // add to done
//     for (i = 0; i < myArray.length; i++) {
//         $('#done-items').append('<li>' + myArray[i] + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>');
//     }
    
//     // myArray
//     $('#sortable li').remove();
//     countTodos();
// }

// //remove done task from list
// function removeItem(element){
//     $(element).parent().remove();
// }

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
                this.lists = result.data;
                this.countTodos();
            })
            .catch(err=>{
                console.log(err)
            })
        },

        createTodo(){
            axios.post('http://localhost:3000/api/todo/create', {
                userId : this.lists[0].userId,
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
        this.getList();
    }
})