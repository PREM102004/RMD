import { Component } from '@angular/core';
import { UserinfoService } from '../../services/userinfo.service';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {AgGridModule} from 'ag-grid-angular';
import { ColDef,AllCommunityModule,ModuleRegistry  } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule,CommonModule,AgGridModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  public tooltipShowDelay = 100;
  gridApi : any;
  gridColumnApi:any;
 userDatas : any[]=[]
 columnDefs: ColDef[] = [
  { field: 'id', headerName: 'Reference ID',headerTooltip: 'Reference ID', minWidth:150, sortable: true, filter: true , flex : 1 },
  { field: 'name', headerName: 'Name', headerTooltip: 'Name', minWidth: 150,sortable: true, filter: true , flex : 1 },
  { field: 'email', headerName: 'Email', headerTooltip: 'Email', minWidth:150,sortable: true, filter: true , flex : 1 },
  { field: 'phone', headerName: 'Phone',headerTooltip: 'Phone',  minWidth:150,sortable: true, filter: true , flex : 1 },
  { field: 'schemedetails', headerName: 'Scheme Details',headerTooltip: 'Scheme Details', minWidth:150, sortable: true, filter: true , flex : 1 },
  { field: 'complaintinfo', headerName: 'Complaint Info',headerTooltip: 'Complaint Info',  minWidth:150,sortable: true, filter: true , flex : 1 },
  { field: 'description', headerName: 'Complaint Desc',headerTooltip: 'Complaint Desc', minWidth:150, sortable: true, filter: true , flex : 1 },
  {
    field: 'actions',
    headerName: 'Clear Complaint',
    cellRenderer: (params: any) => {
      return `<button style="border: none;
    background-color: transparent;
    color:#005aa7 ;"><i class="fa fa-trash"></i></button>`;
    },
    onCellClicked: (params: any) => {
      this.deleteComplaint(params.data.id);
    },
    flex : 1
  }
];
defaultColDef ={ resizable : true,flex : 1}
gridOptions = {
  rowHeight:150,
  headerHeight:150, 
};
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
  onGridReady(params: any) {
    this.gridApi = params.api;
    console.log(' this.gridApi: ',  this.gridApi);
    this.gridColumnApi = params.columnApi;
    if(this.gridApi){
      this.gridApi.sizeColumnsToFit();
    }
  }

}
