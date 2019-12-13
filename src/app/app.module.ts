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

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { HomeComponent } from './pages/home/home.component';
import { RepositoriesComponent } from './pages/repositories/repositories.component';
import { DatasetsComponent } from './pages/datasets/datasets.component';
import { LoginComponent } from './pages/login/login.component';
import { SidebarModule } from 'ng-sidebar';

import { BboxComponent } from './ui/bbox/bbox.component';
import { TintervalComponent } from './ui/tinterval/tinterval.component';
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

@NgModule({
  declarations: [
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
    MygroupsComponent
  ],
  entryComponents: [ ],
  imports: [
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatTooltipModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatListModule,
    MatNativeDateModule,
    UiModule,
    MatDialogModule,
    RouterModule,
    LeafletModule.forRoot(),
    SidebarModule.forRoot(),
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