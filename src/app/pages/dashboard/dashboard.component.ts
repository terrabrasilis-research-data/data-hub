import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  activities: Activities[] = [
    {"username": "Gabriel", "activity_type": "updated the dataset", "package_name": "ASGS Geographic Correspondences (2016)", "package_id": "1", "timestamp": "Wed, 04 Sep 2019 14:48:54 GMT"},
    {"username": "Gabriel", "activity_type": "updated the dataset", "package_name": "ASGS Geographic Correspondences (2011)", "package_id": "2", "timestamp": "Wed, 04 Sep 2019 14:48:54 GMT"},
    {"username": "João", "activity_type": "updated the dataset", "package_name": "ASGS Geographic Correspondences (2006)", "package_id": "3", "timestamp": "Wed, 04 Sep 2019 14:48:54 GMT"},
    {"username": "Lucas", "activity_type": "updated the dataset", "package_name": "ASGS Geographic Correspondences (2001)", "package_id": "4", "timestamp": "Wed, 04 Sep 2019 14:48:54 GMT"},
  ]
}

export interface Activities {
  username: string;
  activity_type: string;
  package_name: string;
  package_id: string;
  timestamp: string;

}