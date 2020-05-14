import { Component, OnInit } from '@angular/core';
import {TrainingService} from './shared/training.service';
@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css'],
  providers:[TrainingService]
})
export class TrainingsComponent implements OnInit {

  constructor(public trainingService:TrainingService) { }

  ngOnInit(): void {
  }

}
