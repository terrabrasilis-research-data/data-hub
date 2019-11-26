import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  id_open: number;

  constructor(private snackBar: MatSnackBar) {
   }

  ngOnInit() {
  
  }

  favorites = [
  ];

  changeText(id: number, status: boolean){

    if (status == true){
      this.id_open = id;
    } else {
      this.id_open = null;
    }
    
  }

  check(id: number){
    if (id == this.id_open){
      return true
    } else {
      return false
    }
  }
  
  isFavorite(id: number){
    return this.favorites.some(x => x.id === id)
   } 

   SaveDataset(id: number){
     this.snackBar.open("Saved to Bookmarks", "", {
      duration: 2000,
    });
    this.favorites.push({id: id});
   }
  
   RemoveDataset(ids: number){
    this.snackBar.open("Removed from Bookmarks", "", {
     duration: 2000,
   });
   this.favorites = this.favorites.filter(x => (x.id != ids));
  }
 
  groups: Group[] = [
    {"group_id": 1, "name": "LabISA", "authors": ["Jairo Francisco","Cornils Astrid"], "year": 2019},
    {"group_id": 2, "name": "LiSS", "authors": ["Cornils Astrid"], "year": 2018},
    {"group_id": 3, "name": "LAF", "authors": ["Krahl Guilherme", "Jairo Francisco","Cornils Astrid"], "year": 2017},
    {"group_id": 4, "name": "TREES", "authors": ["Francisco Jairo ","Cornils Astrid"], "year": 2016},
    {"group_id": 5, "name": "LOA", "authors": ["Astrid Cornils"], "year": 2015}  ]
  
}

export interface Group {
  group_id: number;
  authors: Array < string >;
  name: string;
  year: number;
}