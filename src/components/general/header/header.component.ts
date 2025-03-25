import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserinfoService } from '../../../services/userinfo.service';
declare var bootstrap: any;
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
  showPasswordInput = false;
  adminSuccess: boolean = false;
  password : string = '';
  referenceid : string='';
  adminpwd : any;
  isloading : boolean=false;
  showModal:boolean=false
  @ViewChild('referenceModal') referenceModal!: ElementRef;
  constructor(private fb : FormBuilder, private adduser : UserinfoService,private route : Router){
    this.complaintForm = this.fb.group({
      name: ['', Validators.required],
      age:['',[Validators.required, Validators.min(18), Validators.max(80)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$'),Validators.maxLength(10)]],
      complaintinfo: ['', Validators.required],
      schemedetails: ['', [Validators.required, Validators.minLength(10)]],
      description: ['',Validators.required],
    });
  }
  ngOnInit(){
    this.adduser.getadmindata().then(data => {
      this.adminpwd = data[0].password;
      console.log('this.adminpwd: ', this.adminpwd);
    });
    this.adminSuccess = localStorage.getItem('admin') === 'true';
  }
  
    onSubmit() {
      if (this.complaintForm.valid) {
        this.isloading = true; // Show loader
    
        this.adduser.addUsers('userInfo', this.complaintForm.value).then((response) => {
          console.log("Complaint submitted successfully with ID:", response.id);
          this.referenceid = response.id;
          this.showModal = true; 
          let modal = new bootstrap.Modal(this.referenceModal.nativeElement);
          modal.show();
          setTimeout(() => {
            this.isloading = false; // Hide loader after delay
            this.complaintForm.reset(); // Reset form after loader hides
            
            
          }, 1000);
        }).catch(error => {
          console.error("Error submitting complaint:", error);
          this.isloading = false; // Ensure loader hides on error
        });
    
      } else {
        this.complaintForm.markAllAsTouched(); // Show validation errors
      }
    }
    closeModal() {
      this.showModal = false;
  
      // Close Bootstrap Modal properly
      let modalElement = this.referenceModal.nativeElement;
      let modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
      setTimeout(() => {
        document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
        document.body.classList.remove('modal-open'); // Remove body class that causes blur
        document.body.style.overflow = ''; // Restore scroll behavior
      }, 300);
    }
  togglePasswordInput(){

    this.isNavbarCollapsed = true;
    if (this.route.url === '/admin' || this.adminSuccess) {
      this.showPasswordInput = false;
      this.route.navigate(['/admin'])
    } else {
      this.showPasswordInput = !this.showPasswordInput; 
    }

  }
  checkPassword(){
     if(this.password == 'admin'){
      this.route.navigate(['/admin']).then(() => {
        localStorage.setItem("admin","true");
        this.adminSuccess = true;
        this.showPasswordInput = false;
        console.log('Navigation successful');
      }).catch(err => {
        console.error('Navigation failed', err);
      });
      
    } else {
      alert('Incorrect password');
    }
     
  }
  logoutAdmin() {
    this.password = '';
    localStorage.removeItem('admin');
    this.adminSuccess = false;
    this.route.navigate(['/']); 
  }
}
