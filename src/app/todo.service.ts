import { todo } from './todo';
import { Injectable } from '@angular/core';
import { InitTodos } from './todosFromServer';
import { DatePipe } from '@angular/common';

@Injectable()
export class TodoService extends InitTodos{
  
  constructor() { 
    super();
    console.log('Todo service is initialized.....');
    this.load();
  }
  
  
  getTodoList(){
    var todoList = JSON.parse(localStorage.getItem('todos'));
    return todoList;
  }
  
  addTodo(newTodo){
    var todoList = JSON.parse(localStorage.getItem('todos'));
    todoList.push(newTodo);
    
    localStorage.setItem('todos', JSON.stringify(todoList));
  }
  
  deleteTodo(_id){
    var todoList = JSON.parse(localStorage.getItem('todos'));
    
    let index = todoList.findIndex(x => x.id == _id);
    todoList.splice(index, 1);
    
    localStorage.setItem('todos', JSON.stringify(todoList));
  }
  
  completeTodo(_id){
    var todoList = JSON.parse(localStorage.getItem('todos'));
    
    var todo = todoList.find(x => x.id == _id);
    var date = new DatePipe("en-US");
    todo.dateCompleted = date.transform(Date.now(), 'dd/MM/yyyy');
    
    localStorage.setItem('todos', JSON.stringify(todoList));
  }
  
  updateTodo(todo){
    var todoList = JSON.parse(localStorage.getItem('todos'));
    
    todoList.find(x => x.id == todo.id).text = todo.text;
    
    localStorage.setItem('todos', JSON.stringify(todoList));
  }
}
