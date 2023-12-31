import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements  OnInit{

  constructor(  private productService:ProductService,private router:Router,public appState:AppStateService) {

  }



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
    // this.appState.setProductState({
    //   status:"LOADING"
    // });
 this.productService.getProducts(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pageSize)
    .subscribe({
      next:(resp) => {
        let products=resp.body as Product[];
       //  this.appState.productState.products=resp.body as Product[];
      let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
        //this.appState.productState.totalProducts=totalProducts;
      // console.log(totalProducts);
       // this.appState.productState.totalPages=
        let totalPages=
         Math.floor(totalProducts/this.appState.productState.pageSize);
       if (totalProducts %this.appState.productState.pageSize!=0 ){
         ++totalPages;
       }
        this.appState.setProductState({
          products :products,
          totalProducts :totalProducts,
          totalPages :totalPages,
           status :"LOADED"
        })

        },
      error:err => {
        this.appState.setProductState({
          status:"ERROR",
          errorMessage:err
        })
        // console.log(err);
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
      this.getProducts();
        //this.appState.productState.products=this.appState.productState.products.filter((p: any)=>p.id!=product.id)

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
    this.appState.productState.currentPage=page;
    this.getProducts();
  }

  handleEdit(product: Product) {
  this.router.navigateByUrl(`/admin/editProduct/${product.id}`)

  }
}
