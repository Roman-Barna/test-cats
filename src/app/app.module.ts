import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment.prod';
import { AnimalsState } from './state/cats.state';
import { LayoutComponent } from './components/layout/layout.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { FilterFormComponent } from './components/filter-form/filter-form.component';
import { AnimalsComponent } from './components/animals/animals.component';
import { DetailsAnimalsComponent } from './components/details-animals/details-animals.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AnimalsComponent,
    LayoutComponent,
    DetailsAnimalsComponent,
    FilterPipe,
    FilterFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    NgxsModule.forRoot([AnimalsState], {developmentMode: !environment.production})
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
