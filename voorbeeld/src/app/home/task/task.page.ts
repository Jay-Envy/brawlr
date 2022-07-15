import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss']
})
export class TaskPage implements OnInit {

  taskName: string;
  yearValues: number[] = [];
  deadline: string;
  description: string;
  id?: number = undefined;

  constructor() {
    const currentYear: number = (new Date()).getFullYear();
    for (let year = currentYear; year < (currentYear + 50); year++) {
      this.yearValues.push(year);
    }
  }

  ngOnInit(): void {
  }

  setData(): void {
  }

  createTask(): void {
  }

  updateTask(): void {
  }

  handleCreateAndUpdate(): void {
  }
}
