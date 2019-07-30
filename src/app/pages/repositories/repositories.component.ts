import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})

export class RepositoriesComponent implements OnInit {

  displayedColumns = ['name', 'image', 'abstract'];
  dataSource = new MatTableDataSource<Element>(FILTERED_ELEMENT_DATA);
  
  filterCategories = {}
  filterKeywords = {}
 
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
  
  keywords = [
    { id: 1, name: 'Climate' },
    { id: 2, name: 'Fire ' },
    { id: 3, name: 'Biodiversity' },
    { id: 4, name: 'Monitoring' },
    { id: 5, name: 'Ecology' }
  ]

  ELEMENT_DATA = this.ELEMENT_DATA;
  
  filterChangeCategories() {
      for (let i = 0; i < this.categories.length; i++) {
          if (this.filterCategories[this.categories[i].name] != false) {
  
              //let FILTERED_ELEMENT_DATA = ELEMENT_DATA.filter(x =>
              //    (x.categories.includes(this.categories[i].name))
              //);
  
              console.log(this.categories[i].name + " TRUE") // debbug
              //console.log(FILTERED_ELEMENT_DATA.length) // debbug
  
          } else {
  
              console.log(this.categories[i].name + " FALSE") // debbug
  
          }
  
      }
  }

  filterChangeKeywords() {
    for (let i = 0; i < this.keywords.length; i++) {
        if (this.filterKeywords[this.keywords[i].name] != false) {

            //let FILTERED_ELEMENT_DATA = ELEMENT_DATA.filter(x =>
            //    (x.keywords.includes(this.keywords[i].name))
            //);

            console.log(this.keywords[i].name + " TRUE") // debbug
            //console.log(FILTERED_ELEMENT_DATA.length) // debbug

        } else {

            console.log(this.keywords[i].name + " FALSE") // debbug

        }

    }
}
  @ViewChild(MatPaginator, {
      static: false
  }) paginator: MatPaginator;
  
  form: FormGroup;
  
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  }
  
  constructor(private formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
          categories: new FormArray([]),
          keywords: new FormArray([])
      });
  
      this.addCheckboxes();
  }
  
  private addCheckboxes() {
      this.categories.map((o, i) => {
          const control = new FormControl(i === 0); // if first item set to true, else false
          (this.form.controls.categories as FormArray).push(control);
      });
      this.keywords.map((o, j) => {
          const control = new FormControl(j === 0); // if first item set to true, else false
          (this.form.controls.keywords as FormArray).push(control);
      });
  }
  
  ngOnInit() {
  
      this.categories.forEach(obj => {
          this.filterCategories[obj.name] = false
      })
      this.keywords.forEach(obj => {
          this.filterKeywords[obj.name] = false
      })
  }
  
  }
  
  export interface Element {
      name: string;
      image: Array < string > ;
      abstract: string;
      categories: Array < string > ;
      keywords: Array < string > ;
  }

const ELEMENT_DATA: Element[] = [
  {name: 'Hydrogen Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: [,'Atmosphere','Geophysics'] , keywords: ['Climate','Ecology']},
  {name: 'Helium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Lakes & Rivers' ], keywords: ['Fire','Biodiversity ']},
  {name: 'Lithium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Agriculture'], keywords: ['Fire','Monitoring']},
  {name: 'Beryllium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Ecology','Geophysics'], keywords: ['Climate','Fire ']},
  {name: 'Boron Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png",], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Lakes & Rivers','Human Dimensions'], keywords: ['Biodiversity','Monitoring']},
  {name: 'Carbon Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Oceans','Atmosphere' ], keywords: ['Monitoring','Biodiversity ']},
  {name: 'Nitrogen Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Land Surface','Agriculture'], keywords: ['Climate', 'Fire ']},
  {name: 'Oxygen Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Ecology','Land Surface','Geophysics'], keywords: ['Fire','Monitoring']},
  {name: 'Fluorine Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Ecology','Human Dimensions'], keywords: ['Biodiversity','Ecology']},
  {name: 'Neon Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere'], keywords: ['Climate','Biodiversity ']},
  {name: 'Sodium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Oceans','Ecology','Geophysics','Agriculture'], keywords: ['Monitoring','Monitoring']},
  {name: 'Magnesium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface'], keywords: ['Biodiversity','Fire ']},
  {name: 'Aluminum Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Land Surface','Lakes & Rivers'], keywords: ['Climate','Ecology']},
  {name: 'Silicon Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Oceans','Ecology','Geophysics'], keywords: ['Fire','Biodiversity ']},
  {name: 'Phosphorus Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface'], keywords: ['Monitoring','Monitoring']},
  {name: 'Sulfur Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics','Lakes & Rivers','Human Dimensions'], keywords: ['Biodiversity', 'Fire ']},
  {name: 'Chlorine Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics'], keywords: ['Fire','Ecology']},
  {name: 'Argon Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics'], keywords: ['Climate','Biodiversity ']},
  {name: 'Potassium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Land Surface','Agriculture'], keywords: ['Climate','Monitoring']},
  {name: 'Calcium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics','Lakes & Rivers','Human Dimensions'], keywords: ['Biodiversity', 'Fire ']},
];

const FILTERED_ELEMENT_DATA = ELEMENT_DATA;
