import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../shared/training.service';
@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit {

  constructor(public trainingService:TrainingService) { }

  ngOnInit(): void {
    this.trainingService.getTrainingList();
  }

}
