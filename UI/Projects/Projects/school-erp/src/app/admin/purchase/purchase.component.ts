import { Component, ViewChild } from '@angular/core';
import { ConstantData } from '../../utils/constant-data';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../../utils/local.service';
import { LoadDataService } from '../../utils/load-data.service';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ActionModel } from '../../utils/interface';
import { Status } from '../../utils/enum';
declare var $: any

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent {
  p: number = 1;
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  PurchaseList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'PurchaseTypeNo';
  PurchaseTypeList: any[] = []
  Purchase: any = {}
  staffLogin: any = {}
  
  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formPurchaseType') formPurchaseType: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getPurchaseList();
    
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewPurchase() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }

  editPurchase(obj: any) {
    this.resetRack()
    this.Purchase = obj
  }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.Purchase = {};
    if (this.formPurchaseType) {
      this.formPurchaseType.control.markAsPristine();
      this.formPurchaseType.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Purchase.Status = 1
  }


  validiateMenu() {
    var obj = {
      Url: this.router.url,
      StaffLoginId: this.staffLogin.StaffLoginId
    }
    this.dataLoading = true
    this.service.validiateMenu(obj).subscribe((response: any) => {
      this.action = this.loadData.validiateMenu(response, this.toastr, this.router)
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }
  getPurchaseList() {
    var obj = {}
    this.dataLoading = true
    this.service.getPurchaseList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.PurchaseList = response.PurchaseList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SavePurchase() {
    this.isSubmitted = true;
    this.formPurchaseType.control.markAllAsTouched();
    if (this.formPurchaseType.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.Purchase.UpdatedBy = this.staffLogin.StaffLoginId;
    this.Purchase.CreatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.SavePurchase(this.Purchase).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Purchase.PurchaseTypeId > 0) {
          this.toastr.success("Rack Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
        }
        this.resetRack();
        this.getPurchaseList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deletePurchase(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deletePurchase(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getPurchaseList()
        } else {
          this.toastr.error(response.Message)
          this.dataLoading = false;
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
        this.dataLoading = false;
      }))
    }
  }
}
