import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { TodosService } from '../../services/todos.service';
import { map } from 'rxjs/operators';
import { FilterEnum } from '../../types/filter.enum';
@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  {
noTodosClass$:Observable<boolean>;
activeCount$: Observable<number>;
itemsLeftText$: Observable <string>;
filter$: Observable<FilterEnum>;
filterEnum = FilterEnum;

  constructor(private todosService: TodosService ) {
    this.activeCount$= this.todosService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted ).length)
    );
    this.itemsLeftText$= this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's': ''} left`)
    );
    this.noTodosClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
      );
      this.filter$ = this.todosService.filter$
   }

   changeFilter(event: Event , filterName: FilterEnum): void{
     event.preventDefault();
     console.log('changeFilter' , filterName);
     this.todosService.changeFilter(filterName);
   } 

}

// var arr= ['abc','def', 'ghi' , 'jkl']

// arr.find(function(value , inx){
//   console.log(inx + value);
// })