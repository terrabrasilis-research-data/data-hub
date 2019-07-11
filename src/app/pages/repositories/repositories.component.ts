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

  displayedColumns = ['position', 'name', 'weight', 'symbol'];
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
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];