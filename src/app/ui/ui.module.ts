import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BboxComponent } from './bbox/bbox.component';
import { TintervalComponent } from './tinterval/tinterval.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, SidebarComponent, BboxComponent, TintervalComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [LayoutComponent]
})
export class UiModule { }
