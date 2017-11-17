import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ProjectViewComponent } from './project-view/project-view.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
	declarations: [
		AppComponent,
		AuthComponent,
		ProjectViewComponent,
		HomeComponent,
		HeaderComponent
	],
	imports: [
		BrowserModule,
		NgbModule.forRoot(),
		AppRoutingModule,
		HttpClientModule,
		FormsModule
	],
	providers: [
		AuthService,
		AuthGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
