import { Component, OnInit } from '@angular/core';
import { Alert } from '../../models/alert';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  message = {} as Alert;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.getMessage().subscribe((message: Alert) => {
      this.message = message;
    });
  }
}
