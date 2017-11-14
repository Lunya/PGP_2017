import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TextComponent } from './text/text.component';
import { HeaderComponent } from './header/header.component';
import { ConnectedViewComponent } from './connected-view/connected-view.component';



@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    HeaderComponent,
    ConnectedViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
