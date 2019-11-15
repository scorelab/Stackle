import { Component, OnInit } from '@angular/core';
import { StackService } from '../../services/stack.service';
import { MatSnackBar } from '@angular/material'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-stack',
  templateUrl: './create-stack.component.html',
  styleUrls: ['./create-stack.component.css'],
})
export class CreateStackComponent implements OnInit {

  private stackObject;

  constructor(
    private stackService: StackService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.stackObject = {};
  }

  createStack() {
    this.stackObject.createdUser = localStorage.getItem('username');

    // validate user inputs
    if(this.stackObject.name == undefined || this.stackObject.name == ""){
      this.showSnackBar('Please enter a name!');
    }else if(this.stackObject.description == undefined || this.stackObject.description == ""){
      this.showSnackBar('Please enter a description!');
    }else if(this.stackObject.stackleUrl == undefined || this.stackObject.stackleUrl == ""){
      this.showSnackBar('Please enter the Stackle URL!');
    }else if (!this.checkUrl(this.stackObject.stackleUrl) || !this.checkUrl(this.stackObject.githubUrl)){
      this.showSnackBar('Please enter a Valid URL!');
    }else {

      this.stackService.createNewStack(this.stackObject).subscribe( response => {
        if(response.status == 200){
          this.showSnackBar('Stack created!');
          this.router.navigate(['app/stacks']);
        }else {
          this.showSnackBar('Could not create stack!');
        }
      })

    }

  }

  checkUrl(url: any) {
    const regx = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
    let urlIsValid = new RegExp(regx).test(url);
    return urlIsValid;
  }

  clear() {
    this.stackObject = {};
  }

  showSnackBar(message:string) {
    this.snackBar.open(message, null, {
      duration: 2000
    })
  }

}
