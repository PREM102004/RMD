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


    constructor(private http : HttpClient){}
   
    ngOnInit():void{
      this.http.get<{ [key: string]: any[] }>('assets/products.json').subscribe(data =>{
        this.productList = data;
        this.filteredProductList = { ...this.productList };
        console.log('productList',this.productList)
      })
    }
    // toggleViewlist(industryKey: string): void {
    //   this.activeIndustry = this.activeIndustry === industryKey ? null : industryKey;
    // }

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
