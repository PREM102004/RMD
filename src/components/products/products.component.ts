import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, AccordionModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
     productList:{ [key: string]: any[] }={};
     toggleProductView:boolean=false;
  activeIndustry: string | null='';
  filteredProductList: { [key: string]: any[] } = {};
   searchTerm: string = '';
   datascheme :any[]=[]
   formdata = {Occupation : '',salary : 0,age : 0}
   filterschemes : any[]=[]
   occulistpation : string[]=[]
   selectedOccupation: string = '';

    constructor(private http : HttpClient){}
   
    ngOnInit():void{
      this.http.get<any>('assets/products.json').subscribe(response =>{
        this.datascheme = response.data;
        console.log('this.productList: ', this.datascheme);
        this.occulistpation =this.datascheme.map((occ) => occ.Occupation);
        this.filteredProductList = { ...this.productList };
        console.log('occulistpation',this.occulistpation)
      })
    }
    onSubmit(formvalue:any){
      this.formdata = formvalue;
      this.getfilterdata()
    }
    // toggleViewlist(industryKey: string): void {
    //   this.activeIndustry = this.activeIndustry === industryKey ? null : industryKey;
    // }

getfilterdata(){
  const {Occupation , salary,age} = this.formdata
   const occupationData =this.datascheme.find(occ => occ.Occupation == Occupation);

   if(!occupationData){
    this.filterschemes = []
    return
   }

   const matchedSchemes = occupationData.Categories.find((category:any)=>{
  const [minsalary,maxsalary] = category["Salary Range"].split('-').map(Number);
  const [minage,maxage] = category["Age Range"].split('-').map(Number);

  return salary >= minsalary && salary<= maxsalary && age >=minage && age <=maxage;
});
  this.filterschemes = matchedSchemes.Schemes;
   
}



    searchProducts(event: Event): void {
      const searchTerm = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
      // Reset to full product list if search input is cleared
      if (!searchTerm) {
        this.filteredProductList = { ...this.productList };
        return;
      }
  
      // Filter the products based on the search term
      this.filteredProductList = Object.fromEntries(
        Object.entries(this.productList).map(([industry, products]) => [
          industry,
          products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
          )
        ]).filter(([_, products]) => products.length > 0) // Remove industries with no matching products
      );
    }
    isFilteredListEmpty(): boolean {
      return Object.keys(this.filteredProductList).length === 0;
    }

    keepOriginalOrder = () => 0;
}
