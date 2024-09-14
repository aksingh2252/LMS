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
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {

  p: number = 1;
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  SupplierList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'SupplierTypeNo';
  SupplierTypeList: any[] = []
  Supplier: any = {}
  staffLogin: any = {}
  City: any ={}
  State: any ={}
  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formSupplierType') formSupplierType: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getSupplierList();
    this.getStateList() ;
    this. getCityList();
    this.changeState();

    
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewSupplier() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }

  editSupplier(obj: any) {
    this.resetRack()
    this.Supplier = obj
  }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.Supplier = {};
    if (this.formSupplierType) {
      this.formSupplierType.control.markAsPristine();
      this.formSupplierType.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Supplier.Status = 1
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
  getSupplierList() {
    var obj = {}
    this.dataLoading = true
    this.service.getSupplierList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.SupplierList = response.SupplierList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SaveSupplier() {
    this.isSubmitted = true;
    this.formSupplierType.control.markAllAsTouched();
    if (this.formSupplierType.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.Supplier.UpdatedBy = this.staffLogin.StaffLoginId;
    this.Supplier.CreatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.SaveSupplier(this.Supplier).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Supplier.SupplierId > 0) {
          this.toastr.success("Supplier Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Supplier added successfully")
        }
        this.resetRack();
        this.getSupplierList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deleteSupplier(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deleteSupplier(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getSupplierList()
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

  StateList: any[] = []
  getStateList() {
    var obj = {}
    this.dataLoading = true
    this.service.getStateList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.StateList = response.StateList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  allCityList:any[]=[];
  CityList: any[] = []
  getCityList() {
    var obj = {}
    this.dataLoading = true
    this.service.getCityList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.CityList = response.CityList;
        this.allCityList = response.CityList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  changeState(){
    this.CityList = this.allCityList.filter(x=> x.StateId == this.Supplier.StateId);
  }

}
