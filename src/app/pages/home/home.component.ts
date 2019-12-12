import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
 {

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
    document.getElementById("wrapper").className = "d-flex toggled";
  }
  
  datasets: Dataset[] = [
    {"id": 1, "name": "Radiocarbon ages and pollen record of Kongor Lake sediments", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "authors": ["Krahl Guilherme", "Jairo Francisco","Astrid"], "year": 2019, "abstract": "cross the globe, vulture species are experiencing major population declines. A key factor for the long-term persistence of these endangered species is the maintenance of genetic diversity patterns within wild."},
    {"id": 2, "name": "Multiple proxy data at DSDP Site 72-516F and ODP Hole 171-1049C during Dan-C2 and lower C29n", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT" ,"authors": ["Jairo Francisco","Cornils Astrid"],"year": 2018,  "abstract": "Forest biomass is an essential indicator for monitoring the Earth’s ecosystems and climate. It is a critical input to greenhouse gas accounting, estimation of carbon losses and forest degradation, assessment of."},
    {"id": 3, "name": "Latest Maastrichtian dinocyst and benthic foraminiferal records of Bass River, Meirs Farm and Search Farm sediment cores, New Jersey, USA", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "authors": ["Cornils Astrid"],"year": 2017, "abstract": "The upper limb activity of twenty unilateral upper limb myoelectric prosthesis users and twenty anatomically intact adults were recorded over a 7-day period using two wrist worn accelerometers (Actigraph, LLC)."},
  
  ]

}

export interface Dataset {
  id: number;
  authors: Array < string >;
  created_on:  string;
  name: string;
  year: number;
  abstract: string;
}