import { Component, ViewChild } from '@angular/core';
import { Status } from '../../utils/enum';
import { ActionModel } from '../../utils/interface';
import { ConstantData } from '../../utils/constant-data';
import { AppService } from '../../utils/app.service';
import { ToastrService } from 'ngx-toastr';
import { LoadDataService } from '../../utils/load-data.service';
import { LocalService } from '../../utils/local.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-book-class',
  templateUrl: './book-class.component.html',
  styleUrls: ['./book-class.component.css']
})
export class BookClassComponent {

  p: number = 1;
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  BookClassList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'BookClassTypeNo';
  BookClassTypeList: any[] = []
  BookClass: any = {}
  staffLogin: any = {}
  ClassList: any[] = []
  ParentClassList:any[]=[];
  
  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formBookClassType') formBookClassType: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getBookClassList();
    this.getClassList();
     
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewBookClass() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }
  
  editBookClass(obj: any) {
    this.resetRack()
    this.BookClass = obj
  }
  
  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.BookClass = {};
    if (this.formBookClassType) {
      this.formBookClassType.control.markAsPristine();
      this.formBookClassType.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.BookClass.Status = 1
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
  getBookClassList() {
    var obj = {}
    this.dataLoading = true
    this.service.getBookClassList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.BookClassList = response.BookClassList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SaveBookClass() {
    this.isSubmitted = true;
    this.formBookClassType.control.markAllAsTouched();
    if (this.formBookClassType.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.BookClass.UpdatedBy = this.staffLogin.StaffLoginId;
    this.BookClass.CreatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.SaveBookClass(this.BookClass).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.BookClass.BookClassTypeId > 0) {
          this.toastr.success("Rack Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
        }
        this.resetRack();
        this.getBookClassList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }
   
  deleteBookClass(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deleteBookClass(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getBookClassList()
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

  getClassList() {
    var obj = {}
    this.dataLoading = true
    this.service.getClassList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.ClassList = response.ClassList;
        this.ParentClassList = this.ClassList.filter(x=>x.ParentClassId );

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
