import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  model1 = {mail: '', mdp: ''};
  model2 = {mail: '', mdp: '', confirm: ''};


  constructor() { }

  ngOnInit() {
  }
  onAction_login(){
    //INSERER ICI LA REQUETE POST POUR LOGIN
    alert(this.model1.mail);
  }
  onAction_newAccount(){
    //INSERER ICI LA REQUETE POST POUR CREER UN NOUVEAU COMPTE
    alert(this.model2.mail);
  }
}
