import { Component } from '@angular/core';
import { UserinfoService } from '../../services/userinfo.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
 
 userDatas : any[]=[]

  constructor(private userdata : UserinfoService){

  }
  async ngOnInit(){
    this.userDatas = await this.userdata.getComplaints();
  console.log("Fetched complaints:", this.userDatas)
  }
 async deleteComplaint(id:string){
    if (confirm('Are you sure you want to clear this complaint?')) {
      await this.userdata.deleteComplaint(id);
      this.userDatas = this.userDatas.filter(complaint => complaint.id !== id);
    }
  }

}
