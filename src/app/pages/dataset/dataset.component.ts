import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { latLng, tileLayer, Layer, geoJSON } from 'leaflet';
import { CommentNode } from 'src/app/pages/dataset/comments/comment-tree.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Clipboard } from 'ts-clipboard';
import { DatasetsService } from '../datasets/datasets.service';

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
  }

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
  
  CopyBibTex(){
    this.snackBar.open("Copied to Clipboard", "", {
      duration: 2000,
    });
    let data = this.dataset;
    let BibTex = '@proceedings{'+ data.id +', \ntitle\t = {'+data.title+'}, \neditor\t = {'+data.author+'},   \nyear\t = {'+data.year+'}, \nDOI\t = {'+data.DOI+'} \n}';
    Clipboard.copy(BibTex);
   }

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, public dialog: MatDialog, private ds: DatasetsService,) {}

  
  ngOnInit() {

    document.getElementById("wrapper").className = "d-flex toggled";
    
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

    this.get_datasets();
    
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

   async get_datasets(){

    const response = await this.ds.get_datasets();
    this.others_datasets = response;

    this.dataset = this.others_datasets.filter(x => (x.id == this.id))[0];
    this.categories = this.others_datasets[this.id].categories;
    this.users = this.others_datasets[this.id].author;
    this.data_objects = this.others_datasets[this.id].data;

  }

  dataset: Dataset = null;

  categories: string[];
  
  data_objects: Data_obj[];

  users: string[];

  others_datasets: Dataset[];

}

export interface Dataset{
  custom_fields: Array < string >;
  repo_id: number;
  language: string;
  bbox: string;
  maintainer: string;
  data: Array < Data_obj > ;
  id: number;
  title: string;
  year: string;
  author: Array < string > ;
  abstract: string;
  categories: Array < string > ;
  size: number;
  repositorie: string;
  DOI: string;
  filetypes:  Array < string > 
  created_on: string;
  license: string;
  contact_email: string;
}

export interface Data_obj {
  id: number;
  name: string;
  size: string;
  created_on: string;
}