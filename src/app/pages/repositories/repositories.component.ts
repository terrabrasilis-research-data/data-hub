import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})

export class RepositoriesComponent implements OnInit {

  displayedColumns = ['name', 'image', 'abstract'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  form: FormGroup;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
  categories = [
   { id: 1, name: 'Chemistry' },
   { id: 2, name: 'Oceans' },
   { id: 3, name: 'Atmosphere' },
   { id: 4, name: 'Ecology' },
   { id: 5, name: 'Land Surface' },
   { id: 6, name: 'Geophysics' },
   { id: 7, name: 'Lakes & Rivers' },
   { id: 8, name: 'Human Dimensions' },
   { id: 9, name: 'Agriculture' }
  ]
  
  filters = [
    { id: 1, name: 'Climate' },
    { id: 2, name: 'Fire ' },
    { id: 3, name: 'Biodiversity ' },
    { id: 4, name: 'Monitoring' },
    { id: 5, name: 'Ecology' }
  ]
   
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      categories: new FormArray([]),
      filters: new FormArray([])
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.categories.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.categories as FormArray).push(control);
    });
    this.filters.map((o, j) => {
      const control = new FormControl(j === 0); // if first item set to true, else false
      (this.form.controls.filters as FormArray).push(control);
    });
  }

  ngOnInit() {
  }

}

export interface Element {
  name: string;
  image: Array<string>;
  abstract: string;
  categories: Array<string>;
}

const ELEMENT_DATA: Element[] = [
  {name: 'Hydrogen Repository', image: ["assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Atmosphere','Geophysics']},
  {name: 'Helium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Lakes & Rivers' ]},
  {name: 'Lithium Repository', image: ["assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Agriculture']},
  {name: 'Beryllium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Ecology','Geophysics']},
  {name: 'Boron Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png",], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Lakes & Rivers','Human Dimensions']},
  {name: 'Carbon Repository', image: ["assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Atmosphere' ]},
  {name: 'Nitrogen Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Agriculture']},
  {name: 'Oxygen Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Ecology','Land Surface','Geophysics']},
  {name: 'Fluorine Repository', image: ["assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Ecology','Human Dimensions']},
  {name: 'Neon Repository', image: ["assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Atmosphere']},
  {name: 'Sodium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Ecology','Geophysics','Agriculture']},
  {name: 'Magnesium Repository', image: ["assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface']},
  {name: 'Aluminum Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Lakes & Rivers']},
  {name: 'Silicon Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Ecology','Geophysics']},
  {name: 'Phosphorus Repository', image: ["assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface']},
  {name: 'Sulfur Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Atmosphere','Geophysics','Lakes & Rivers','Human Dimensions']},
  {name: 'Chlorine Repository', image: ["assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Atmosphere','Geophysics']},
  {name: 'Argon Repository', image: ["assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Atmosphere','Geophysics']},
  {name: 'Potassium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Agriculture']},
  {name: 'Calcium Repository', image: ["assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Atmosphere','Geophysics','Lakes & Rivers','Human Dimensions']},
];
















