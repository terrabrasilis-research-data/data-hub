import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
 {
  news: Element[] = [
    {id: 1, name: 'Microsatellite genotypes of the South African Cape vulture, Gyps coprotheres', created_on: "Wed, 04 Sep 2019 14:48:54 GMT", image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "cross the globe, vulture species are experiencing major population declines. A key factor for the long-term persistence of these endangered species is the maintenance of genetic diversity patterns within wild.",categories: [,'Atmosphere','Geophysics'] , keywords: ['Climate','Ecology']},
    {id: 2, name: 'The Forest Observation System, building a global reference dataset for remote sensing of forest biomass', created_on: "Wed, 04 Sep 2019 14:48:54 GMT", image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Forest biomass is an essential indicator for monitoring the Earth’s ecosystems and climate. It is a critical input to greenhouse gas accounting, estimation of carbon losses and forest degradation, assessment of.",categories: ['Chemistry','Oceans','Lakes & Rivers' ], keywords: ['Fire','Biodiversity ']},
    {id: 3, name: 'Upper limb activity of twenty myoelectric prosthesis users and twenty healthy anatomically intact adults', created_on: "Wed, 04 Sep 2019 14:48:54 GMT", image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png"], abstract: "The upper limb activity of twenty unilateral upper limb myoelectric prosthesis users and twenty anatomically intact adults were recorded over a 7-day period using two wrist worn accelerometers (Actigraph, LLC).",categories: ['Chemistry','Land Surface','Agriculture'], keywords: ['Fire','Monitoring']}
  ]

  constructor() { }

  ngOnInit() {
    document.getElementById("wrapper").className = "d-flex toggled";
  }

}

export interface Element {
  id: number;
  name: string;
  image: Array < string > ;
  abstract: string;
  categories: Array < string > ;
  keywords: Array < string > ;
  created_on: string;
}
