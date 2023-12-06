import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements  OnInit{

  constructor(  private productService:ProductService,private router:Router) {

  }
  public keyword:string="";
  public products:Array<Product>=[];
  totalPages:number=0;
  pageSize :number=2;
  currentPage:number=1;


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
 this.productService.getProducts(this.keyword,this.currentPage,this.pageSize)
    .subscribe({
      next:(resp) => {this.products=resp.body as Product[];
      let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
       console.log(totalProducts);
       this.totalPages=Math.floor(totalProducts/this.pageSize);
       if (totalProducts %this.pageSize!=0 ){
         this.totalPages=this.totalPages+1;
       }
        },
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

//   searchProduct() {
//     this.currentPage=1;
//     this.totalPages=0;
// this.productService.searchProduct(this.keyword,this.currentPage,this.pageSize).subscribe(
//   {
//     next:value => {
//       this.products=value;
//     }
//   }
// )
//   }

  handleGotoPage(page:number) {
    this.currentPage=page;
    this.getProducts();
  }

  handleEdit(product: Product) {
  this.router.navigateByUrl(`/editProduct/${product.id}`)

  }
}
