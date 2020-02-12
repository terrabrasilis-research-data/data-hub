import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Routes, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})

export class RepositoriesComponent implements OnInit {

  displayedColumns = ['name', 'image', 'abstract'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  
  filterCategories = {}
 
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

filterChange() {
    this.dataSource.data = ELEMENT_DATA;
    for (let i = 0; i < this.categories.length; i++) {
        if (this.filterCategories[this.categories[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.categories.includes(this.categories[i].name)))
        } else {}
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

constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.form = this.formBuilder.group({
        categories: new FormArray([]),
    });

    this.addCheckboxes();
}

private addCheckboxes() {
    this.categories.map((o, i) => {
        const control = new FormControl(i === 0); // if first item set to true, else false
        (this.form.controls.categories as FormArray).push(control);
    });
    
}

ngOnInit() {

    this.categories.forEach(obj => {
        this.filterCategories[obj.name] = false
    })
}

}

export interface DialogData {

}

export interface Element {
    id: number;
    name: string;
    image: Array < string > ;
    abstract: string;
    categories: Array < string > ;
}

const ELEMENT_DATA: Element[] = [
  {id: 1, name: 'Hydrogen Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: [,'Atmosphere','Geophysics'] },
  {id: 2, name: 'Helium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Lakes & Rivers' ]},
  {id: 3, name: 'Lithium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Agriculture'], },
  {id: 4, name: 'Beryllium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Ecology','Geophysics']},
  {id: 5, name: 'Boron Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png",], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Lakes & Rivers','Human Dimensions']},
  {id: 6, name: 'Carbon Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Oceans','Atmosphere' ]},
  {id: 7, name: 'Nitrogen Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Land Surface','Agriculture']},
  {id: 8, name: 'Oxygen Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Ecology','Land Surface','Geophysics'], },
  {id: 9, name: 'Fluorine Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Ecology','Human Dimensions']},
  {id: 10, name: 'Neon Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere']},
  {id: 11, name: 'Sodium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Oceans','Ecology','Geophysics','Agriculture']},
  {id: 12, name: 'Magnesium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface']},
  {id: 13, name: 'Aluminum Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Land Surface','Lakes & Rivers']},
  {id: 14, name: 'Silicon Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Oceans','Ecology','Geophysics']},
  {id: 15, name: 'Phosphorus Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface']},
  {id: 16, name: 'Sulfur Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics','Lakes & Rivers','Human Dimensions']},
  {id: 17, name: 'Chlorine Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics']},
  {id: 18, name: 'Argon Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics']},
  {id: 19, name: 'Potassium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Land Surface','Agriculture']},
  {id: 20, name: 'Calcium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Atmosphere','Geophysics','Lakes & Rivers','Human Dimensions']},
];
