import { Component } from '@angular/core';
import { Task } from 'src/datatypes/task';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  taskList: Task[] = [];
  id = 0;
  verticalFabPosition = "bottom";

  constructor(private alertController: AlertController) {
    for(let i = 0; i<50; i++){
      this.taskList.push(new Task({
        name: 'Task ' + i,
        done: this.id % 2 === 0,
        id: this.id
      }));
      this.id++;
    }
    //we maken een vluchtige lijst van taken aan omdat we nog niet met een API/persistente storage werken
    //elke taak met een even id wordt als afgewerkt gemarkeerd

    // setInterval(
    //   () => {
    //     this.verticalFabPosition = 
    //     this.verticalFabPosition === 'bottom' ? 'top' : 'bottom'
    //   },
    //   250
    // );
  }
  toggleTaskStatus(id: number): void{
    const task = this.taskList.find(t => t.id === id);
    task.done = !task.done
  }

  async presentAlert(): Promise<void>{
    //see the documentation for more info about each attribute.
    //https://ionicframework.com/docs/api/alert
    const alert = await this.alertController.create({
      header: 'New Task',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'OK',
          handler: (inputs) => {
            this.newTask(inputs.name);
          }
        }
      ],
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Task Description'
        }
      ]
    });

    await alert.present();
  }

  newTask(name: string): void{
    this.taskList.push({
      name,
      id: this.id,
      done: false
    });
    this.id++;
  }
  
}
