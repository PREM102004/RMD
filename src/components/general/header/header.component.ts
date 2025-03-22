import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserinfoService } from '../../../services/userinfo.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLinkActive,RouterLink,FormsModule,ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  
})
export class HeaderComponent {
  isNavbarCollapsed = true;
  complaintForm: FormGroup;
  constructor(private fb : FormBuilder, private adduser : UserinfoService){
    this.complaintForm = this.fb.group({
      name: ['', Validators.required],
      age:['',[Validators.required, Validators.min(18), Validators.max(80)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      complaintinfo: ['', Validators.required],
      schemedetails: ['', [Validators.required, Validators.minLength(10)]],
      description: ['',Validators.required],
    });
  }
  onSubmit(){
    if (this.complaintForm.valid) {
      this.adduser.addUsers('userInfo', this.complaintForm.value) .then((response) => {
        console.log("Complaint submitted successfully with ID:", response.id);
        this.complaintForm.reset(); 
      })
      this.complaintForm.reset();
    } else {
      this.complaintForm.markAllAsTouched(); // Show errors if form is invalid
    }
  }
}
