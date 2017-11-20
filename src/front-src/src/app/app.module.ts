import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ProjectViewComponent } from './project-view/project-view.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProjectsComponent } from './projects/projects.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
	declarations: [
		AppComponent,
		SigninComponent,
		ProjectViewComponent,
		HomeComponent,
		HeaderComponent,
		ProjectsComponent,
		SignupComponent
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
