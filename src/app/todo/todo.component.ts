import { TodoService } from './../todo.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { todo } from '../todo';
import { DatePipe } from '@angular/common';

declare var $:any;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoList: todo[] = [];
  todotext;
  editState = false;
  editTodoId;
  
  
  constructor(private _todoService: TodoService) {}
  
  ngOnInit() {
    this.todoList = this._todoService.getTodoList();
  }
  
  
  addTodo(){
    let _id = 0;
    if(this.todoList.length > 0){
      _id = this.todoList[this.todoList.length - 1].id + 1;
    }
    var textTodo = this.todotext;
    
    var newTodo = new todo(_id, textTodo);
    
    this.todoList.push(newTodo);
    this._todoService.addTodo(newTodo);
    this.todotext = "";
  }
  
  editTodo(_id){
    this.todotext = this.todoList.find(x => x.id == _id).text;
    this.editState = true;
    this.editTodoId = _id;
  }
  
  saveTodo(){
    let newTodo = this.todoList.find(x =>x.id == this.editTodoId);
    newTodo.text = this.todotext;
    
    var date = new DatePipe("en-US");
    newTodo.dateUpdated = date.transform(Date.now(), 'dd/MM/yyyy');
    
    this.todotext = "";
    this._todoService.updateTodo(newTodo);
    
    this.editState = false;
  }
  
  completeTodo(_id){
    var todo = this.todoList.find(x => x.id == _id);
    
    var date = new DatePipe("en-US");
    todo.dateCompleted = date.transform(Date.now(), 'dd/MM/yyyy');
    
    this._todoService.completeTodo(_id);
  }
  
  deleteTodo(_id){
    let index = this.todoList.findIndex(x => x.id == _id);
    alert('"'+ this.todoList[index].text + '" will be delete!');
    this.todoList.splice(index, 1);
    
    this._todoService.deleteTodo(_id);
  }
  
  optionsDisplayIn(id){
    $('#elem' + id).find('.options').css({"opacity": .7});
  }
  optionsDisplayOut(id){
    $('#elem' + id).find('.options').css({"opacity": 0.1});
  }
  
}
