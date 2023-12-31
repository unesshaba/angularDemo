import { Injectable } from '@angular/core';
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
public productState:any={
  keyword:"",
  products:[],
  totalPages:0,
  pageSize :2,
  currentPage:1,
  totalProducts :0,
  status : "",
  errorMessage : ""
}
  constructor() { }
  public  setProductState(state :any):void {
    this.productState={...this.productState, ...state}
  }
}
