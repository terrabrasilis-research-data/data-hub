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
  image: string;
  abstract: string;
}

const ELEMENT_DATA: Element[] = [
  {name: 'Hydrogen Repository', image: "Kuhn, Gerhard & Johnsen, Sigfus J", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Helium Repository', image: " Hillenbrand, Claus-Dieter", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Lithium Repository', image: "Kuhn, Gerhard & Oerter, Hans", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Beryllium Repository', image: "Kuhn, Gerhard", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Boron Repository', image: "Oerter, Hans", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Carbon Repository', image: "Kuhn, Gerhard & Hillenbrand, Claus-Dieter", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Nitrogen Repository', image: "Oerter, Hans", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Oxygen Repository', image: "Kuhn, Gerhard", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Fluorine Repository', image: "Oerter, Hans", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Neon Repository', image: "Kuhn, Gerhard & Oerter, Hans", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Sodium Repository', image: "Johnsen, Sigfus J", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Magnesium Repository', image: "Hillenbrand, Claus-Dieter", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Aluminum Repository', image: "Johnsen, Sigfus J", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Silicon Repository', image: "Kuhn, Gerhard & Johnsen, Sigfus J", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Phosphorus Repository', image: " Hillenbrand, Claus-Dieter", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Sulfur Repository', image: "Johnsen, Sigfus J", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Chlorine Repository', image: "Kuhn, Gerhard & Hillenbrand, Claus-Dieter", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Argon Repository', image: "Hillenbrand, Claus-Dieter & Oerter, Hans", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Potassium Repository', image: "Oerter, Hans & Johnsen, Sigfus J", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
  {name: 'Calcium Repository', image: "Kuhn, Gerhard & Hillenbrand, Claus-Dieter", abstract: "Some quick example text to build on the card title and make up the bulk of the card's content."},
];