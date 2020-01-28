import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
 {

  constructor(private snackBar: MatSnackBar, private hs:HomeService) { }

  ngOnInit() {
    document.getElementById("wrapper").className = "d-flex toggled";
    this.getFeaturedDatasets();
  }
  
  async getFeaturedDatasets(){
    const response = await this.hs.get_featured_datasets();
    this.datasets = response;
  } 

  datasets: Dataset[];

}

export interface Dataset {
  id: number;
  authors: Array < string >;
  created_on:  string;
  name: string;
  year: number;
  abstract: string;
  repositorie?: string;
}