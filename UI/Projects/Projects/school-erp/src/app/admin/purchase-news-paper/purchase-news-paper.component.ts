import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { ToastrService } from 'ngx-toastr';
import { LoadDataService } from '../../utils/load-data.service';
import { LocalService } from '../../utils/local.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ActionModel } from '../../utils/interface';
declare var $: any

@Component({
  selector: 'app-purchase-news-paper',
  templateUrl: './purchase-news-paper.component.html',
  styleUrls: ['./purchase-news-paper.component.css']
})
export class PurchaseNewsPaperComponent {
  p: number = 1;
  NewspaperList: any[] = []
  isSubmitted = false
  // StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  PurchaseNewsPaperList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'PurchaseNewsPaperNo';
  PurchaseNewsPaper
    : any = {}
  staffLogin: any = {}
  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formPurchaseNewsPaper') formPurchaseNewsPaper: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getPurchaseNewsPaperList();
    this.getNewspaperList();
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewPurchaseNewsPaper() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }

  editPurchaseNewsPaper(obj: any) {
    this.resetRack()
    this.PurchaseNewsPaper
      = obj
  }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.PurchaseNewsPaper
      = {};
    if (this.formPurchaseNewsPaper) {
      this.formPurchaseNewsPaper.control.markAsPristine();
      this.formPurchaseNewsPaper.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.PurchaseNewsPaper
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
  getPurchaseNewsPaperList() {
    var obj = {}
    this.dataLoading = true
    this.service.getPurchaseNewsPaperList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.PurchaseNewsPaperList = response.PurchaseNewsPaperList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SavePurchaseNewsPaper() {
    this.isSubmitted = true;
    this.formPurchaseNewsPaper.control.markAllAsTouched();
    if (this.formPurchaseNewsPaper.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.PurchaseNewsPaper
      .UpdatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.SavePurchaseNewsPaper(this.PurchaseNewsPaper
    ).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.PurchaseNewsPaper
          .PurchaseNewsPaperId > 0) {
          this.toastr.success("Rack Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
          $('#staticBackdrop').modal('hide')
        }
        this.resetRack();
        this.getPurchaseNewsPaperList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deletePurchaseNewsPaper(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deletePurchaseNewsPaper(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getPurchaseNewsPaperList()
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

  getNewspaperList() {
    var obj = {}
    this.dataLoading = true
    this.service.getNewspaperList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.NewspaperList = response.NewsPaperList;


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
