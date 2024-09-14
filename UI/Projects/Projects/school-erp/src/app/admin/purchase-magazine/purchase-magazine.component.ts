import { Component, ViewChild } from '@angular/core';
import { ConstantData } from '../../utils/constant-data';
import { Status } from '../../utils/enum';
import { ActionModel } from '../../utils/interface';
import { AppService } from '../../utils/app.service';
import { ToastrService } from 'ngx-toastr';
import { LoadDataService } from '../../utils/load-data.service';
import { LocalService } from '../../utils/local.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-purchase-magazine',
  templateUrl: './purchase-magazine.component.html',
  styleUrls: ['./purchase-magazine.component.css']
})
export class PurchaseMagazineComponent {
  p: number = 1;
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  PurchaseMagazineList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  PurchaseMagazine
    : any = {}
  staffLogin: any = {}
  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formPurchaseMagazine') formPurchaseMagazine: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getPurchaseMagazineList();
    this.getLanguageList();
    this.getMagazineList();
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewPurchaseMagazine() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }

  editPurchaseMagazine(obj: any) {
    this.resetRack()
    this.PurchaseMagazine
      = obj
  }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.PurchaseMagazine
      = {};
    if (this.formPurchaseMagazine) {
      this.formPurchaseMagazine.control.markAsPristine();
      this.formPurchaseMagazine.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.PurchaseMagazine
      .Status = 1
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
  getPurchaseMagazineList() {
    var obj = {}
    this.dataLoading = true
    this.service.getPurchaseMagazineList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.PurchaseMagazineList = response.PurchaseMagazineList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SavePurchaseMagazine() {
    this.isSubmitted = true;
    this.formPurchaseMagazine.control.markAllAsTouched();
    if (this.formPurchaseMagazine.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.PurchaseMagazine
      .UpdatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.savePurchaseMagazine(this.PurchaseMagazine
    ).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.PurchaseMagazine
          .PurchaseMagazineId > 0) {
          this.toastr.success("Rack Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
          $('#staticBackdrop').modal('hide')
        }
        this.resetRack();
        this.getPurchaseMagazineList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  DeletePurchaseMagazine(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deletePurchaseMagazine(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getPurchaseMagazineList()
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
  MagazineList: any = []
  getMagazineList() {
    var obj = {}
    this.dataLoading = true
    this.service.getMagazineList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.MagazineList = response.MagazineList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  LanguageList: any = []
  getLanguageList() {
    var obj = {}
    this.dataLoading = true
    this.service.getLanguageList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.LanguageList = response.LanguageList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

}
