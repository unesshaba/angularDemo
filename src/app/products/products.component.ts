import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements  OnInit{

  constructor(  private productService:ProductService) {

  }
  public keyword:string="";
  products:Array<Product>=[

    ]

  handleCheckProduct(product: Product) {
 this.productService.checkProduct(product)
    .subscribe({
      next:updatedProduct=>{
        //c'est la meme chose  on veux juste modifier l'attribut checked
         product.checked=!product.checked
        // this.products$.map(p=>{
        //   if (p.id==product.id){
        //     return updatedProduct
        //   }else return p;
        // })
      }
    })
    // product.checked=!product.checked;
  }
  getProducts(){
 this.productService.getProducts(2,3)
    .subscribe({
      next:data => this.products=data,
      error:err => {
        console.log(err);
      }
    })
  // this.products$=this.productService.getProducts();
}
  ngOnInit(): void {
    this.getProducts();

  }

  handleDelete(product: Product) {
    if(confirm("Etes vous sure?"))
  this.productService.deleteProduct(product).subscribe(
    {next:value=>{
     // this.getProducts();
        this.products=this.products.filter(p=>p.id!=product.id)

      }
    }
  )
  }

  searchProduct() {
this.productService.searchProduct(this.keyword).subscribe(
  {
    next:value => {
      this.products=value;
    }
  }
)
  }
}
