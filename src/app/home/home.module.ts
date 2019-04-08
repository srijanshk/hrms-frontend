import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home.routing.module'
import { HomeMainComponent } from './home-main/home-main.component'

@NgModule({
  declarations: [
    HomeMainComponent
  ],
  imports: [
      HomeRoutingModule
  ],
  providers: [
  ]
})
export class HomeModule { }
