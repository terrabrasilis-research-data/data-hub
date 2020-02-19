import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupsService } from './groups.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  id_open: number;

  constructor(private snackBar: MatSnackBar, private gs:GroupsService) {
   }

  ngOnInit() {
    document.getElementById("wrapper").className = "d-flex toggled";
    this.getGroups();
  }
  
  async getGroups(){
    const response = await this.gs.get_groups();
    this.groups = response;
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
 
  groups: Group[]; 
}

export interface Group {
  group_id: number;
  authors: Array < string >;
  name: string;
  year: number;
  abstract: string;
  image: string;
}