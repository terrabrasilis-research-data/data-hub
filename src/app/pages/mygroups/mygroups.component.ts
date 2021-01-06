import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupsService } from '../groups/groups.service';
import * as fromLogin from '../login/login.reducer';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mygroups',
  templateUrl: './mygroups.component.html',
  styleUrls: ['./mygroups.component.scss']
})

export class MygroupsComponent implements OnInit  {

  id_open: number;

  constructor(
    private snackBar: MatSnackBar,
    private gs:GroupsService,
    private router: Router,
    private store: Store<fromLogin.AppState>,
    ) { this.store.pipe(select('login')).subscribe(res => {
      if(res){
        this.user = res;
      }
    })
  }

   public user: any = null;

   ngOnInit() {

    if(!this.user['user']){
      this.router.navigate(['/login']);
    }

    document.getElementById("wrapper").className = "d-flex toggled";
    this.getGroupsFromUser(this.user['user']['user_id']);
  }

  async getGroupsFromUser(user_id: number){
    const response = await this.gs.get_groups_from_user(user_id);
    if(response['groups']){
      this.groups = response['groups'];
    }
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
