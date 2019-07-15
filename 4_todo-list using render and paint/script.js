let todo_state = []

// pure function
function render(todo_state) {
    // this is the entry point of our page which is loaded as soon as we come to index.html 
    // hence need to load complete todo_state

    // using Imperative code -> Telling How to do some task
    // let list = document.getElementById('task-list')
    // for(let i = 0 ; i < todo_state.length ; i++){
    //     list.innerHTML += ` <li ${todo_state[i].striked ? `class = 'striked'` : '' }> ${todo_state[i].title} </li>` 
    // }


    // using Declarative code -> Telling What to do 
    return todo_state.reduce((acum, obj, index) => {
        return acum += ` <li ${obj.striked ? `class = 'striked'` : '' } data-id = ${index}> ${obj.title} </li>`
    },'')
    
}

// not pure because not returning anything 
function paint(todo_state) {
    const list = document.getElementById('task-list')
    list.innerHTML = render(todo_state)
}


// Adding Todo
document.getElementById('btn-add').addEventListener('click', function(){    
    const val = document.getElementsByTagName('input')[0].value;
    if (val == '') return
    document.getElementsByTagName('input')[0].value = ''
    todo_state.push({
        title : val,
        striked : false
    })

    paint(todo_state)
})

document.getElementById('task-list').addEventListener('click', (e) => {
    const elementIdToBeDeleted = e.target.dataset.id
    todo_state[elementIdToBeDeleted].striked  = !todo_state[elementIdToBeDeleted].striked 
    paint(todo_state)
})


// deleting striked elements
document.getElementById('btn-delete').addEventListener('click', function(){
    todo_state =  todo_state.filter(obj => obj.striked === false)
    paint(todo_state)
})
























