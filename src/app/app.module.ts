import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { IconDefinition } from '@ant-design/icons-angular';
import { MenuOutline } from '@ant-design/icons-angular/icons';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { GenreListComponent } from './genre-list/genre-list.component';

registerLocaleData(en);

const icons: IconDefinition[] = [MenuOutline];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MovieComponent,
    MovieCardComponent,
    GenreListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    NzIconModule.forRoot(icons),
    NzLayoutModule,
    NzToolTipModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
