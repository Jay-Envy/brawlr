import { Injectable } from '@angular/core';
import { Task } from 'src/datatypes/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskList: Task[] = [];
  private id = 0;

  constructor() { 

  }

  getAllTasks(): Task[]{
    return this.taskList;
  }

  deleteTask(id: number): void{
    this.taskList = this.taskList.filter(t => t.id !== id);
  }

  toggleTaskStatus(id: number): void {
    const task = this.taskList.find(t => t.id === id);
    task.done = !task.done;
  }

  newTask(name: string, description: string, deadline?: string): void{
    this.taskList.push(new Task({
      name, 
      id: this.id,
      done: false,
      description,
      deadline
    }));
    this.id++;
  }

  getFilteredTasks(filter: Filter): Task[]{
    return this.getAllTasks()
    .filter(t => this.taskMatchesFilter(t, filter));
  }

  private taskMatchesFilter(task: Task, filter: Filter): boolean{
    if(filter.all === filter)
    return true;

    return (filter === filter.completed && task.done) ||
    (filter === filter.toDo && !task.done);
  }
  
}
