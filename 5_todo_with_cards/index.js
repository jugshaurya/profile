// states that defines our complete todo-list
let saved_cards = []
let current_card =[]

// function to render html for page
function render(current_card, saved_cards) {

    const current_card_html = current_card.reduce((acum, init, index) => acum +
        `<li ${init.striked? `class = 'striked'`: ''} data-id =${index} > 
            ${init.title}
        </li>`
    , '')

    // showing saved cards
    const saved_cards_html = saved_cards.length != 0 
    ? saved_cards.reduce((acum, card, index) => acum + print_card(card,index), '') 
    : 'No Saved Card'

    return [current_card_html, saved_cards_html]

    //private function to render
    function print_card(card, index) {
        return card.edit_state ?`
        <div class ='s-card'>
            <ul>
            ${
                card.todos.reduce((acum, init) => acum + 
                    `</li>
                        <input value = ' ${init.title} '>
                    </li>`
                ,'')
            }
            </ul>
            <button data-action = 'save' data-cardno = ${index} > Save Changes </button>
        </div>
        `:`
        <div class = 's-card'>
                <ul>
                ${
                    card.todos.reduce((acum, init) => acum +
                        `<li${init.striked? ` class = 'striked'`:''}>
                            ${init.title}
                        </li>`
                    ,'')
                }
                </ul>
                <button data-action = 'edit' data-cardno = ${index}> Edit </button>
                <button data-action = 'delete' data-cardno = ${index}> Delete Card </button>
        </div>`
    }
}

function paint(){
    let cards_html = render(current_card,saved_cards)
    document.getElementById('todo-list').innerHTML = cards_html[0]
    document.getElementById('saved-cards').innerHTML = cards_html[1]
    // console.log('Done HTML Rendering!!!!')
}

// test
// paint(current_card, saved_cards)

// Add Button
document.getElementById('add-btn').addEventListener('click', (e) => {
    const { value } = document.getElementById('add-todo');
    if(value == '') return ;
    current_card.push({
        title : value,
        striked : false
    })
    document.getElementById('add-todo').value = ''
    paint()
})

// striked functionality
document.getElementById('todo-list').addEventListener('click', (e) => {
    const elementIdtoBeDeleted = e.target.dataset.id
    current_card[elementIdtoBeDeleted].striked = !current_card[elementIdtoBeDeleted].striked
    paint()
})

// delete striked TODOs functionality
document.getElementById('delete-btn').addEventListener('click', (e) => {
    current_card = current_card.filter(todo => todo.striked == false)
    paint()
})

// saving the current card to saved_card list - Assuming User will always delete striked if not they will not be added 
document.getElementById('save-btn').addEventListener('click', (e) => {
    if (current_card.length == 0) return ;
    saved_cards = [...saved_cards , {todos: current_card.filter(item => !item.striked), edit_state : false}] 
    current_card = [];
    paint()
});

// Moving to saving the card functionality
document.getElementById('saved-cards').addEventListener('click', function(e) {

    const whichCard = e.target.dataset.cardno;
    const action = e.target.dataset.action;

    if (! action){ 
        return;
    }

    switch (action) {
        case 'delete':
            // splice(start:number, deleteCount:number)
            saved_cards.splice(whichCard,1)
            break
        case 'edit':
            saved_cards[whichCard].edit_state = !saved_cards[whichCard].edit_state            
            break
        case 'save':
            const changes = [...e.target.parentNode.querySelectorAll('input')]
            saved_cards[whichCard].todos = saved_cards[whichCard].todos.map((item, index) => (
                {
                    title : changes[index].value,
                    striked : item.striked  
                }
            ))
            saved_cards[whichCard].edit_state = !saved_cards[whichCard].edit_state
    }
    paint()   
})