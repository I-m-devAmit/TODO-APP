import { 
   Component,
   ElementRef, 
   Input, 
   OnChanges, 
   OnInit, 
   Output,
   EventEmitter, 
   SimpleChanges, 
   ViewChild } from "@angular/core";
import { TodosService } from "../../services/todos.service";
import { TodoInterface } from "../../types/todo.interface";

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
})

export class TodoComponent implements OnInit , OnChanges{
  
  @Input('todo') todoProps!: TodoInterface
  @Input ('isEditing') isEditingProps!: boolean;
  @Output('setEditingId') setEditingIdEvent : EventEmitter<
  string | null 
  > = new EventEmitter();

  editingText: string = '';
  @ViewChild('textInput') textInput!: ElementRef;

  constructor( private todoService: TodosService){}

  ngOnInit(): void {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (changes["isEditingProps"].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode(): void {
    console.log('setTodoInEditMode');
    this.setEditingIdEvent.emit(this.todoProps.id)
  }
  removeTodo(): void{
    console.log('removeTodo');
    this.todoService.removeTodo(this.todoProps.id)
  }

  toggleTodo(): void{
    console.log('toggleTodo');
    this.todoService.toggleTodo(this.todoProps.id);
  }

  changeText(event: Event): void {
    const value= (event.target as HTMLInputElement).value;
    this.editingText = value;
    console.log('changeText');
  }
  changeTodo(): void{
    console.log('changeTodo', this.editingText);
    this.todoService.changeTodo(this.todoProps.id, this.editingText)
    this.setEditingIdEvent.emit(null);

  }
}