// import { Component, OnInit } from '@angular/core';
// import { UserService } from '../shared/user.service';
// import { ToastrService } from 'ngx-toastr';
// import { NgForm } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-add-questions',
//   templateUrl: './add-questions.component.html',
//   styleUrls: ['./add-questions.component.css']
// })
// export class AddQuestionsComponent implements OnInit {

//   constructor(private service: UserService, private toaster: ToastrService, private router: Router) { }

//   ngOnInit() {
    
//     this.service.Questions();
//     console.log( this.service.Questions());
  
//   }

  
//   formData?: any ={}



//   resetForm(form? : NgForm){
//     if(form != null){

    
//       form.resetForm();
//       this.service.formData = {
//         question:"",
//         expected: ""
//       }
//       }
//     }


//     onSubmit(form: NgForm){
      
//     this.service.postQuestions().subscribe(
//       res =>{
//         // if(res != null && res != undefined)
//         console.log(res);
//         this.toaster.success("Submitted Successfully", "Payment Detail Register");
//         // this.service.refreshList();
//         this.resetForm(form);
//         // this.router.navigateByUrl('home/admin/mortgage');
//       },
//       err =>
//       {
//         console.log(err);
//       }
      
//     )
//     }
// }

