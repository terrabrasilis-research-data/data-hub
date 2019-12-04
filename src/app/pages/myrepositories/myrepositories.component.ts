import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Routes, RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BboxComponent } from 'src/app/ui/bbox/bbox.component';
import { TintervalComponent } from 'src/app/ui/tinterval/tinterval.component';


@Component({
  selector: 'app-myrepositories',
  templateUrl: './myrepositories.component.html',
  styleUrls: ['./myrepositories.component.scss']
})

export class MyrepositoriesComponent implements OnInit {

  displayedColumns = ['name', 'image', 'abstract'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  
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

filterChange() {
    this.dataSource.data = ELEMENT_DATA;
    for (let i = 0; i < this.categories.length; i++) {
        if (this.filterCategories[this.categories[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.categories.includes(this.categories[i].name)))
        } else {}
    }

    for (let i = 0; i < this.keywords.length; i++) {
        if (this.filterKeywords[this.keywords[i].name] != false) {

            this.dataSource.data = this.dataSource.data.filter(x => (x.keywords.includes(this.keywords[i].name)))

        } else {

        }

    }
}

Map() {
    const dialogRef = this.dialog.open(BboxComponent, {
        data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
    });
}

Time(){
    const dialogRef = this.dialog.open(TintervalComponent, {
        data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
    });
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

export interface DialogData {

}

export interface Element {
    id: number;
    name: string;
    image: Array < string > ;
    abstract: string;
    categories: Array < string > ;
    keywords: Array < string > ;
}

const ELEMENT_DATA: Element[] = [
  {id: 1, name: 'Hydrogen Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: [,'Atmosphere','Geophysics'] , keywords: ['Climate','Ecology']},
  {id: 2, name: 'Helium Repository', image: ["assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Lakes & Rivers' ], keywords: ['Fire','Biodiversity ']},
  {id: 3, name: 'Lithium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar2.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Agriculture'], keywords: ['Fire','Monitoring']},
  {id: 4, name: 'Beryllium Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png"], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Oceans','Ecology','Geophysics'], keywords: ['Climate','Fire ']},
  {id: 5, name: 'Boron Repository', image: ["assets/images/img_avatar2.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png", "assets/images/img_avatar.png",], abstract: "Some quick example text to build on the card title and make up the bulk of the card's content.",categories: ['Chemistry','Land Surface','Lakes & Rivers','Human Dimensions'], keywords: ['Biodiversity','Monitoring']},
  ];
