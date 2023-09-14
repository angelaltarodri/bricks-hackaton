import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AprobarDialogComponent } from './dialog/inform-dialog/aprobar-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SwipeComponent } from './components/swipe/swipe.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LikesComponent } from './components/likes/likes.component';
import { BuscarComponent } from './components/buscar/buscar.component';

@NgModule({
  declarations: [
    HomeComponent,
    AprobarDialogComponent,
    SwipeComponent,
    ProfileComponent,
    LikesComponent,
    BuscarComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
