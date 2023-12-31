import {Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {checkPort} from "@angular-devkit/build-angular/src/utils/check-port";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent  implements OnInit{
  constructor(public appState:AppStateService) {
  }
  ngOnInit(): void {
  }

  totalCheckedProducts() {
    let checkedProducts =
    this.appState.productState.products.filter((p:any)=>p.checked==true);
    return checkedProducts.length;
  }
}
