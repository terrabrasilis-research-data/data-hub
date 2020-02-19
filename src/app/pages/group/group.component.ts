import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { Clipboard } from 'ts-clipboard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DatasetsService } from '../datasets/datasets.service';
import { GroupsService } from '../groups/groups.service';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, MatCardModule {
  id: number;
  private sub: any;

  DATASETS: Element[] = [];

  displayedColumns = ['dataset'];
  dataSource = new MatTableDataSource<Element>(this.DATASETS);
  size = this.DATASETS.length;
  filterYear = {}
  filterCategory = {}
  filterRepository = {}
  filterFiletypes = {}
  title = ""
 
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  
  form: FormGroup;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  years = [];

  categories = [];
  
  repositories = [];

  filetypes = [];
  
  groups: Group[]; 
  selected_group: Group[];
  
  CopyBibTex(id: number){
    this.snackBar.open("Copied to Clipboard", "", {
      duration: 2000,
    });
    let data = this.DATASETS[id-1];
    let BibTex = '@proceedings{'+ data.id +', \ntitle\t = {'+data.title+'}, \neditor\t = {'+data.author+'},   \nyear\t = {'+data.year+'}, \nDOI\t = {'+data.DOI+'} \n}';
    Clipboard.copy(BibTex);
   }

   checkOpen(id: number){
   return true;
   }


   filterChange() {
    this.dataSource.data = this.DATASETS;
    this.size = this.dataSource.data.length;
    for (let i = 0; i < this.years.length; i++) {
      if (this.filterYear[this.years[i].name] != false) {
        this.dataSource.data = this.dataSource.data.filter(x => (x.year == this.years[i].name) )
        this.size = this.dataSource.data.length;
      } else {
      }
    }
    for (let i = 0; i < this.categories.length; i++) {
        if (this.filterCategory[this.categories[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.categories.includes(this.categories[i].name)))
            this.size = this.dataSource.data.length;
        } else {

        }
      }
    for (let i = 0; i < this.repositories.length; i++) {

        if (this.filterRepository[this.repositories[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.repositorie == this.repositories[i].name) )
            this.size = this.dataSource.data.length;
        } else {

        }
      }
    for (let i = 0; i < this.filetypes.length; i++) {
        if (this.filterFiletypes[this.filetypes[i].name] != false) {
            this.dataSource.data = this.dataSource.data.filter(x => (x.filetypes.includes(this.filetypes[i].name)))
            this.size = this.dataSource.data.length;
        } else  {

        }
      }
}

   constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog, private route: ActivatedRoute, private ds: DatasetsService, private gs:GroupsService) {
    this.form = this.formBuilder.group({
      years: new FormArray([]),
      categories: new FormArray([]),
      repositories: new FormArray([]),
      filetypes: new FormArray([]),
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {

    this.categories.map((o, i) => {
      const control = new FormControl(i === 0); // if first item set to true, else false
      (this.form.controls.categories as FormArray).push(control);
    });

    this.years.map((o, k) => {
      const control = new FormControl(k === 0); // if first item set to true, else false
      (this.form.controls.years as FormArray).push(control);
    });

    this.repositories.map((o, l) => {
      const control = new FormControl(l === 0); // if first item set to true, else false
      (this.form.controls.repositories as FormArray).push(control);
    });

    this.filetypes.map((o, m) => {
      const control = new FormControl(m === 0); // if first item set to true, else false
      (this.form.controls.filetypes as FormArray).push(control);
    });
  }

  ngOnInit() {
    
    document.getElementById("wrapper").className = "d-flex toggled";

    this.getDatasets();
    this.getGroups();

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
  });
    
}

  async getGroups(){

    const response = await this.gs.get_groups();
    this.groups = response;
    this.selected_group = this.groups.filter(x => (x.group_id == this.id))
    this.title = this.selected_group[0].name
    
    var lookup = {};
    var count = 0;
  
    for (let i = 0; i < this.groups.length; i++) {
      var name = this.groups[i].name;
    
      if (!(name in lookup)) {
        lookup[name] = 1;
        count = count + 1;
        this.repositories.push({"id": count, "name":  this.groups[i].name})
        }
      }

      this.addCheckboxes();
  
      this.years.forEach(obj => {
        this.filterYear[obj.name] = false
      })
      this.categories.forEach(obj => {
        this.filterCategory[obj.name] = false
      })
      this.repositories.forEach(obj => {
        this.filterRepository[obj.name] = false
        if (obj.name == this.selected_group[0].name){
          this.filterRepository[obj.name] = true
        }
      })
      this.filetypes.forEach(obj => {
        this.filterFiletypes[obj.name] = false
      });

      this.dataSource.data = this.dataSource.data.filter(x => (x.repositorie == this.selected_group[0].name) )
      this.size = this.dataSource.data.length;
  }

  async getDatasets(){
    const response = await this.ds.get_datasets();
    this.DATASETS = response;
    this.dataSource.data = this.DATASETS;
    this.size = this.DATASETS.length;
   
    var lookup = {};
    var count = 0;
  
    for (let i = 0; i < this.DATASETS.length; i++) {
      for (let j = 0; j < this.DATASETS[i].filetypes.length; j++) {
      var name = this.DATASETS[i].filetypes[j];
    
      if (!(name in lookup)) {
        lookup[name] = 1;
        count = count + 1;
        this.filetypes.push({"id": count, "name": this.DATASETS[i].filetypes[j]})
        }
      }
    }
  
    lookup = {};
    count = 0;
  
    for (let i = 0; i < this.DATASETS.length; i++) {
      var name =this.DATASETS[i].year;
    
      if (!(name in lookup)) {
        lookup[name] = 1;
        count = count + 1;
        this.years.push({"id": count, "name": this.DATASETS[i].year})
        }
      }
  
    for (let i = 0; i < this.DATASETS.length; i++) {
      for (let j = 0; j < this.DATASETS[i].categories.length; j++) {
      var name = this.DATASETS[i].categories[j];
    
      if (!(name in lookup)) {
        lookup[name] = 1;
        count = count + 1;
        this.categories.push({"id": count, "name": this.DATASETS[i].categories[j]})
        }
      }
    }
    
  }
  
}

export interface Element {
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
}

export interface Group {
  group_id: number;
  authors: Array < string >;
  name: string;
  year: number;
  abstract: string;
  image: string;
}