import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-datasets',
  templateUrl: './datasets.component.html',
  styleUrls: ['./datasets.component.scss']
})
export class DatasetsComponent implements OnInit {

  form: FormGroup;

   authorName = [
    { id: 1, name: 'Kuhn, Gerhard' },
    { id: 2, name: 'Hillenbrand, Claus-Dieter' },
    { id: 3, name: 'Oerter, Hans' },
    { id: 4, name: 'Johnsen, Sigfus J' },
    { id: 5, name: 'Larter, Robert D' }
  ];

  years = [
    { id: 1, name: '2019' },
    { id: 2, name: '2018' },
    { id: 3, name: '2017' },
    { id: 4, name: '2016' },
    { id: 5, name: '2015' }
  ];

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
   
   repositries = [
    { id: 1, name: 'ODP' },
    { id: 2, name: 'AWI_Paleo' },
    { id: 3, name: 'MARUM' }
   ];

   filetypes = [
    { id: 1, name: 'XLS' },
    { id: 2, name: 'CSV' },
    { id: 3, name: 'SHP' },
    { id: 4, name: 'TIF' }
   ];

   constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      authorName: new FormArray([]),
      years: new FormArray([]),
      categories: new FormArray([]),
      repositries: new FormArray([]),
      filetypes: new FormArray([]),
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {

    this.categories.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.categories as FormArray).push(control);
    });

    this.authorName.map((o, j) => {
      const control = new FormControl(j === 0); // if first item set to true, else false
      (this.form.controls.authorName as FormArray).push(control);
    });

    this.years.map((o, k) => {
      const control = new FormControl(k === 0); // if first item set to true, else false
      (this.form.controls.years as FormArray).push(control);
    });

    this.repositries.map((o, l) => {
      const control = new FormControl(l === 0); // if first item set to true, else false
      (this.form.controls.repositries as FormArray).push(control);
    });

    this.filetypes.map((o, m) => {
      const control = new FormControl(m === 0); // if first item set to true, else false
      (this.form.controls.filetypes as FormArray).push(control);
    });
  }

  ngOnInit() {
  }

}
