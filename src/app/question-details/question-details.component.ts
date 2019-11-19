import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  
  info = null;
  currentId = null;
  

  constructor(private activatedRoute: ActivatedRoute, private service: UserService, private toaster:ToastrService,
    private router: Router) { }

  ngOnInit() {

    let id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.service.GetMortgagedHous(id)
    .subscribe(result =>{
      console.log('details:', result);
      this.info = result;
      
      this.currentId = id+1;
    });
  }

  
  formData?: any ={}



  resetForm(form? : NgForm){
    if(form != null){

    
      form.resetForm();
      this.service.formData = {
        answer:""
      }
      }
    }


    onSubmit(form: NgForm){
      
    this.service.postAnswer().subscribe(
      res =>{
        // if(res != null && res != undefined)
        console.log(res);
        this.toaster.success("Answer Submitted Successfully", "Theory Based");
        // this.service.refreshList();
        this.resetForm(form);
        // this.router.navigate([this.currentId])
        this.router.navigateByUrl('home/questions/'+this.currentId);
      },
      err =>
      {
        console.log(err);
      }
      
    )
    }
}


