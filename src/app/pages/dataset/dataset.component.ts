import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, tileLayer, Layer, geoJSON } from 'leaflet';
import { CommentNode } from 'src/app/pages/dataset/comments/comment-tree.component';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})

export class DatasetComponent implements OnInit, OnDestroy, LeafletModule {

  @Input()
  comments:CommentNode[] = [];
  text:string;
  
  addComment(comment:CommentNode){
    this.comments.push(new CommentNode(this.text))
    this.text="";    
    console.log(this.comments);
  }

  google_terrain = {
    id: 'google_terrain',
    enabled: false,
    name: 'Google Terrain',
    layer: tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
       subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }),
 };

  google_sattelite = {
    id: 'google_sattelite',
    enabled: false,
    name: 'Google Satellite',
    layer: tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
       subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }),
 };

  google_hybrid = {
    id: 'google_hybrid',
    enabled: true,
    name: 'Google Hybrid',
    layer: tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
       subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }),
 }
  
	geoJSON = {
		id: 'geoJSON',
		name: 'Geo JSON Polygon',
		enabled: true,
		layer: geoJSON(
			({
        type: 'Polygon',

				coordinates: [[
          [
            -67.92626,
            6.656333333333333
          ],
          [
            -49.38799999999998,
            6.656333333333333
          ],
          [
            -49.38799999999998,
            -3.89446
          ],
          [
            -67.92626,
            -3.89446
          ],
          [
            -67.92626,
            6.656333333333333
          ]
				]]
			}) as any,
			{ style: () => ({ color: '#ff7800' })})
	};

  layers: Layer[] = [];
  
	options = {
  };
  
  id: number;
  private sub: any;
  
  data_objects: Data_obj[] = [
    {"id": 1, "name": "GHGSat_CH4_03sep2018_source1.npy", "size": "91.4 kB", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT"}, 
    {"id": 2, "name": "GHGSat_CH4_08nov2018_source1.npy", "size": "91.4 kB", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT"}, 
    {"id": 3, "name": "GHGSat_CH4_13jan2019_source1_source2.npy", "size": "91.4 kB", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT"}
  ]

  users: User[] = [
    {"email": "email@email.com", "username": "username_1", "uri": "http://127.0.0.1:5000/api/v1.0/users/1", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Krahl Guilherme", "image": "assets/images/img_avatar.png"}, 
    {"email": "email2@email2.com", "username": "username_2", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Jairo Francisco", "image": "assets/images/img_avatar2.png"},
    {"email": "email2@email2.com", "username": "username_2", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Cornils Astrid", "image": "assets/images/img_avatar2.png"},
    {"email": "email2@email2.com", "username": "username_2", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Armand Leanne K", "image": "assets/images/img_avatar2.png"},
    {"email": "email2@email2.com", "username": "username_2", "uri": "http://127.0.0.1:5000/api/v1.0/users/2", "last_login": "Wed, 04 Sep 2019 14:48:54 GMT", "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", "full_name": "Noble Taryn L", "image": "assets/images/img_avatar2.png"}

  ]

  categories: string[] = [
    "Sensoriamento Remoto"
  ]
  
  keywords: string[] = [
    "Sistemas Socioambientais", 
    "Atividade Antr\u00f3picas", 
    "Uso e Cobertura da Terra"
  ]
  
  others_datasets: GetAllDataset[] = [
    {"dataset_id": 1, "name": "Radiocarbon ages and pollen record of Kongor Lake sediments", "authors": ["Krahl Guilherme", "Jairo Francisco","Cornils Astrid"], "year": 2019},
    {"dataset_id": 2, "name": "Multiple proxy data at DSDP Site 72-516F and ODP Hole 171-1049C during Dan-C2 and lower C29n", "authors": ["Jairo Francisco","Cornils Astrid"],"year": 2018},
    {"dataset_id": 3, "name": "Latest Maastrichtian dinocyst and benthic foraminiferal records of Bass River, Meirs Farm and Search Farm sediment cores, New Jersey, USA", "authors": ["Cornils Astrid"],"year": 2017},
    {"dataset_id": 4, "name": "Clumped isotope measurements of Mesozoic belemnites from southern high latitudes", "authors": ["Francisco Jairo","Cornils Astrid"],"year": 2016},
    {"dataset_id": 5, "name": "Sedimentary Fe speciation and Fe isotope compositions from SONNE cruise SO241", "authors": ["Guilherme Krahl", "Jairo Francisco","Cornils Astrid"],"year": 2015},
    {"dataset_id": 6, "name": "Organic and inorganic geochemical data of sediment cores XC-03 and XC-01-2, Xingu River, Amazon Basin", "authors": ["Cornils Astrid"],"year": 2014},
    {"dataset_id": 7, "name": "Tephra data of sediment cores of the Black Sea covering MIS 6 (184-130 ka BP)", "authors": ["Astrid Cornils"],"year": 2019},
    {"dataset_id": 8, "name": "High resolution in situ temperatures across coral reef slopes: Iriomote-jima, Japan and Gulf of Chiriquí, Panama", "authors": ["Guilherme Krahl", "Jairo Francisco","Cornils Astrid"],"year": 2016},   
  ]

  dataset: Dataset[] = [
      {
        "custom_fields": [], 
        "repo_id": 1, 
        "abstract": "During several expeditions to the Southern Ocean from 1982 to 2005 the gonad maturity of selected calanoid copepods was determined to elucidate the life-cycle strategies of the different species. Five different developmental stages of ovaries (unripe, semi-ripe, ripe, semi-spent, spent) were separated according to Runge (1985) and Corkett and McLaren (1979). The stage „semi-spent“ was only investigated in few species and expeditions. In this stages the spent oviduct still contains a few eggs in some unwarranted rows.", 
        "language": "Portugu\u00eas", 
        "name": "Geochemical fingerprints of Australian dusts at their source", 
        "bbox": "{\"type\":\"Polygon\",\"coordinates\":[[[-70.0588433406,-33.3848757513],[-35.2541558406,-33.3848757513],[-35.2541558406,0.2315631899],[-70.0588433406,0.2315631899],[-70.0588433406,-33.3848757513]]]}", 
        "created_on": "Wed, 04 Sep 2019 14:48:54 GMT", 
        "maintainer": "username"
      }
  ]

  constructor(private route: ActivatedRoute) {}

  
  ngOnInit() {

    document.getElementById("wrapper").className = "d-flex toggled";

    //this.comments =  [new CommentNode("First")]
    
    this.layers.push(this.google_hybrid.layer)

    this.layers.push(this.geoJSON.layer)
    
    this.options = 	{ 
      zoom: 4,
		  center: this.geoJSON.layer.getBounds().getCenter()
    }

    this.sub = this.route.params.subscribe(params => {

       this.id = +params['id']; // (+) converts string 'id' to a number

       // In a real app: dispatch action to load the details here.
    });
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  checkServiceStatus(id: number){
    // if (id == 2){
    //     return false;
    // } else {
    //   return true;
    // }
   return true;
   }



}

export interface Dataset{
  custom_fields: Array < string >;
  repo_id: number;
  abstract: string;
  language: string;
  name: string;
  bbox: string;
  created_on: string;
  maintainer: string;
}

export interface Data_obj {
  id: number;
  name: string;
  size: string;
  created_on: string;
}

export interface User {
  email: string;
  username: string;
  uri: string;
  last_login: string;
  created_on: string;
  full_name: string;
  image:  string;

}

export interface GetAllDataset {
  dataset_id: number;
  authors: Array < string >;
  name: string;
  year: number;
}