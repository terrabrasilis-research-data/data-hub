import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

  form: FormGroup;

  categories = [
    { id: 1, name: 'Oceans' },
    { id: 2, name: 'Atmosphere' },
    { id: 3, name: 'Biosphere' },
    { id: 4, name: 'Land Surface' },
    { id: 5, name: 'Geophysics' },
    { id: 6, name: 'Cryosphere' },
    { id: 7, name: 'Lakes & Rivers' },
    { id: 8, name: 'Human Dimensions' },
    { id: 9, name: 'Fisheries' },
    { id: 10, name: 'Agriculture' }
   ];

  filters = [
    { id: 1, name: 'Land Use and Land Cover' },
    { id: 2, name: 'Oceans and Geophysics' },
    { id: 3, name: 'Agriculture and Human Dimensions' },
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
