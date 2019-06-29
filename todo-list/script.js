
//  1. Adding  event listner over Add Button
let add = document.getElementById('btn-add')
add.addEventListener('click',function (){
    //  Selecting our list of task 
    let task_list = document.getElementById('task_list')
    
    // getting User entered Task and adding it to task_list
    let task = document.getElementsByTagName('input')[0].value
    if (task === "") return 
    task_list.innerHTML += `<li>${task}</li>`

    //  clearing input field for new Input from User
    document.getElementsByTagName('input')[0].value = ""
})


// 2. changing css if list item is clicked
let task_list = document.getElementById('task_list')
task_list.addEventListener('click', function(){
    
    let ele = event.target;
    console.log("ouch")
    if (ele.style.textDecoration === ""){
        ele.style.background = 'rgba(240,0,0,.8)'
        ele.style.textDecoration = 'line-through';    
    }else{
        ele.style.background = ''
        ele.style.textDecoration = '';
    }
})



// 3. Deleting selected list-items when delete btn is clicked
let deletebtn = document.getElementById('btn-delete')
deletebtn.addEventListener('click',function (){
    let task_list = document.getElementById('task_list')

    let i = 0;
    while (i<task_list.childElementCount) {
        if (task_list.children[i].style.textDecoration === 'line-through'){
            task_list.removeChild(task_list.children[i])
        }else{
            i++;
        }
    }
})
