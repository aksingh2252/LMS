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
  selector: 'app-book-subject',
  templateUrl: './book-subject.component.html',
  styleUrls: ['./book-subject.component.css']
})
export class BookSubjectComponent {
  p: number = 1;
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  BookSubjectList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'BookSubjectTypeNo';
  BookSubjectTypeList: any[] = []
  BookSubject: any = {}
  staffLogin: any = {}
  
  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formBookSubjectType') formBookSubjectType: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getBookSubjectList();
     
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewBookSubject() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }
  
  editBookSubject(obj: any) {
    this.resetRack()
    this.BookSubject = obj
  }
  
  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.BookSubject = {};
    if (this.formBookSubjectType) {
      this.formBookSubjectType.control.markAsPristine();
      this.formBookSubjectType.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.BookSubject.Status = 1
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
  getBookSubjectList() {
    var obj = {}
    this.dataLoading = true
    this.service.getBookSubjectList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.BookSubjectList = response.BookSubjectList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SaveBookSubject() {
    this.isSubmitted = true;
    this.formBookSubjectType.control.markAllAsTouched();
    if (this.formBookSubjectType.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.BookSubject.UpdatedBy = this.staffLogin.StaffLoginId;
    this.BookSubject.CreatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.SaveBookSubject(this.BookSubject).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.BookSubject.BookSubjectTypeId > 0) {
          this.toastr.success("Rack Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
        }
        this.resetRack();
        this.getBookSubjectList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }
   
  deleteBookSubject(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deleteBookSubject(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getBookSubjectList()
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
