import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';  
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list'; 
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips'; 

import { StoreModule } from '@ngrx/store';
import * as fromLogin from './pages/login/login.reducer';

import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { CommentTree } from './pages/dataset/comments/comment-tree.component'
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { HomeComponent } from './pages/home/home.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';
import { DatasetsComponent } from './pages/datasets/datasets.component';
import { LoginComponent } from './pages/login/login.component';
import { SidebarModule } from 'ng-sidebar';

import { SignupComponent } from './pages/signup/signup.component';
import { RepositorieComponent } from './pages/repositorie/repositorie.component';
import { DatasetComponent } from './pages/dataset/dataset.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NewdatasetComponent } from './pages/newdataset/newdataset.component';
import { NewrepositorieComponent } from './pages/newrepositorie/newrepositorie.component';
import { MyrepositoriesComponent } from './pages/myrepositories/myrepositories.component';
import { MydatasetsComponent } from './pages/mydatasets/mydatasets.component';
import { MyservicesComponent } from './pages/myservices/myservices.component';
import { GroupsComponent } from './pages/groups/groups.component';
import { GroupComponent } from './pages/group/group.component';
import { NewgroupComponent } from './pages/newgroup/newgroup.component';
import { MygroupsComponent } from './pages/mygroups/mygroups.component';
import { HttpClientModule } from '@angular/common/http';
import { DataMapComponent } from './pages/dataset/data-map/data-map.component';
import { FileComponent } from './pages/newgroup/file/file.component';

@NgModule({
  declarations: [
    CommentTree,
    AppComponent,
    HomeComponent,
    RepositoriesComponent,
    DatasetsComponent,
    LoginComponent,
    SignupComponent,
    RepositorieComponent,
    DatasetComponent,
    DashboardComponent,
    NewdatasetComponent,
    NewrepositorieComponent,
    MyrepositoriesComponent,
    MydatasetsComponent,
    MyservicesComponent,
    GroupsComponent,
    GroupComponent,
    NewgroupComponent,
    MygroupsComponent,
    DataMapComponent,
    FileComponent
  ],
  entryComponents: [ ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatTooltipModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatListModule,
    MatNativeDateModule,
    UiModule,
    MatDialogModule,
    RouterModule,
    LeafletModule.forRoot(),
    SidebarModule.forRoot(),
    NgBootstrapFormValidationModule.forRoot(),
    StoreModule.forRoot({ login: fromLogin.reducer }),
    MatSnackBarModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }