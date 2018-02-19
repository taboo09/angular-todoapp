export class InitTodos{
    load(){
        if(localStorage.getItem('todos') === null 
            || localStorage.getItem('todos') == undefined 
            || localStorage.getItem('todos').length == 0 )
            {
            console.log('No todos found ....Creating..');

            var todos = [
                {
                  id: 0, text: "Add, Edit and Delete ToDos...."
                }
            ];

            localStorage.setItem('todos', JSON.stringify(todos));
            return
        } else {
            console.log('Todos found ....'+localStorage.getItem('todos').length);
        }
    }
}