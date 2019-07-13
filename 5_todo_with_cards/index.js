// states that defines our complete todo-list
let saved_cards = [
    {
        todos : [{
                    title: 'code_saved',
                    striked: false
                },
                {
                    title: 'sleep_saved',
                    striked: !false
                }],
        edit_state : false

    },
    {
        todos : [{
                    title: 'code_saved2',
                    striked: false
                },
                {
                    title: 'sleep_saved2',
                    striked: !false
                }],
        edit_state : true
    },    {
        todos : [{
                    title: 'code_saved',
                    striked: false
                },
                {
                    title: 'sleep_saved',
                    striked: !false
                }],
        edit_state : false

    },
    {
        todos : [{
                    title: 'code_saved2',
                    striked: false
                },
                {
                    title: 'sleep_saved2',
                    striked: !false
                }],
        edit_state : true
    },
] 
let current_card = [{
        title: 'code',
        striked: false
    },{
        title: 'sleep',
        striked: !false
    },
]

// function to render html for page
function render(current_card, saved_cards) {

    if(current_card.length != 0){
        var current_card_html =  current_card.reduce((acum, init,index) =>{
            return acum += `<li${init.striked? ` class = 'striked'`:''} data-id =${index} > ${init.title}</li>`
        }, '')
    }else{
        var current_card_html = 'Enter Some Todos'
    }

    // showing saved cards
    if(saved_cards.length != 0){
        var saved_cards_html= saved_cards.reduce((acum,init,index)=>{
            return acum += print_card(init,index)
        }, '')
    }else{
        var saved_cards_html = 'No Saved Card'
    }

    return [current_card_html, saved_cards_html]

    // private function to render
    function print_card(card, index){
        if (!card.edit_state){
            return `<div class = 's-card'>
                <ul>
                ${
                    card.todos.reduce((acum, init) =>{
                        return acum += `<li${init.striked? ` class = 'striked'`:''}> ${init.title}</li>`
                    },'')
                }
                </ul>
                <button class='edit-btn' data-cardNo = ${index}> Edit </button>
            </div>`
        }else{
            return `<div class = 's-card'>
                <ul>
                ${
                    card.todos.reduce((acum, init) =>{
                        return acum += `</li><input placeholder ='${init.title}'></li>`
                    },'')
                }
                </ul>
                <button  class='savechanges-btn' data-cardNo = ${index} > Save Changes </button>
            </div>`

        }
    }

}

// painting the html
function paint(current_card, saved_cards){
    let cards_html = render(current_card,saved_cards)
    document.getElementById('todo-list').innerHTML = cards_html[0]
    document.getElementById('saved-cards').innerHTML = cards_html[1]
}

// add functionality
document.getElementById('add-btn').addEventListener('click', (e) => {
    const { value } = document.getElementById('add-todo');
    if(value == '') return;
    current_card.push({
        title : value,
        striked : false
    })
    document.getElementById('add-todo').value = ''
    paint(current_card,saved_cards)

})

// striked functinality
document.getElementById('todo-list').addEventListener('click', (e) => {
    const elementIdtoBeDeleted = e.target.dataset.id
    current_card[elementIdtoBeDeleted].striked = !current_card[elementIdtoBeDeleted].striked
    paint(current_card, saved_cards)
})

//delete functionality
document.getElementById('delete-btn').addEventListener('click', (e) => {
    current_card = current_card.filter(todo => todo.striked == false)
    paint(current_card, saved_cards)
})

// saving the current card to saved_card list
document.getElementById('save-btn').addEventListener('click', (e) => {
    if (current_card.length == 0) return ;
    saved_cards = [...saved_cards , {todos: current_card, edit_state : false}] 
    current_card = [];
    paint(current_card, saved_cards)
});

// moving to saving the card functionality
let alpha  = document.getElementsByClassName('edit-btn');
console.log(alpha)
console.log('alpha length in vscode:  ',  alpha.length)


// test
paint(current_card, saved_cards)