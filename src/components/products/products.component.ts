import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserinfoService } from '../../services/userinfo.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, AccordionModule,FormsModule,AlertModule  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  animations :[trigger('fadeIn', [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(-20px)' }),
      animate('400ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ])]
})
export class ProductsComponent {
  productList: { [key: string]: any[] } = {};
  toggleProductView: boolean = false;
  activeIndustry: string | null = '';
  filteredProductList: { [key: string]: any[] } = {};
  searchTerm: string = '';
  datascheme: any[] = []
  formdata = { Occupation: '', salary: 0, age: 0 }
  filterschemes: any[] = []
  occulistpation: string[] = []
  selectedOccupation: string = '';
  showDangerAlert = false;
  isloading: boolean = false;
  emptyScheme: boolean = false;
  selectedScheme :any = null;
  private toastr = inject(ToastrService);
  constructor(private http: HttpClient, private cd: ChangeDetectorRef,private adduser : UserinfoService) { }
   
    ngOnInit():void{
      this.http.get<any>('assets/products.json').subscribe(response =>{
        this.datascheme = response.data;
        this.occulistpation =this.datascheme.map((occ) => occ.Occupation);
        this.filteredProductList = { ...this.productList };
        this.cd.markForCheck()
      }) 
     
    }
    limitAgeLength(event: any): void {
      let input = event.target.value;
      if (input.length > 2) {
        event.target.value = input.slice(0, 2);
      }
    }
    onSubmit(schemeForm: any) {
      if (schemeForm.invalid) {
        return;
      }
      this.isloading = true;
      this.formdata = schemeForm.value;

      setTimeout(() => {
        this.getfilterdata();
        this.isloading = false;
        this.emptyScheme = this.filterschemes.length === 0;
        if (this.emptyScheme) {
          setTimeout(() => {
            this.emptyScheme = false;
            schemeForm.reset();
            this.formdata = { Occupation: '', salary: 0, age: 0 };
          }, 3000);
        }
      }, 1000);
    }
   

  getfilterdata() {
    const { Occupation, salary, age } = this.formdata
    const occupationData = this.datascheme.find(occ => occ.Occupation == Occupation);
    if (!occupationData) {
      this.filterschemes = [];
      return;
    }

  const matchedCategory = occupationData.Categories.find((category: any) => {
      const [minSalary, maxSalary] = category["Salary Range"].split('-').map(Number);
      const [minAge, maxAge] = category["Age Range"].split('-').map(Number);

      return salary >= minSalary && salary <= maxSalary && age >= minAge && age <= maxAge;
    });

    this.filterschemes = matchedCategory ? matchedCategory.Schemes : [];

  }



  openModal(scheme: any) {
    this.selectedScheme = scheme;
  }
    
}



