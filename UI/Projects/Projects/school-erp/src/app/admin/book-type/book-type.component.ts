import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../utils/app.service';
import { ToastrService } from 'ngx-toastr';
import { LoadDataService } from '../../utils/load-data.service';
import { LocalService } from '../../utils/local.service';
import { Router } from '@angular/router';
import { ConstantData } from '../../utils/constant-data';
import { ActionModel } from '../../utils/interface';
import { Status } from '../../utils/enum';
import { NgForm } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-book-type',
  templateUrl: './book-type.component.html',
  styleUrls: ['./book-type.component.css']
})
export class BookTypeComponent {
  p: number = 1;
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  BookTypeList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'BookTypeNo';
  BookType: any = {}
  staffLogin: any = {}
  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formBookType') formBookType: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getBookTypeList();
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewBookType() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }
  
  editBookType(obj: any) {
    this.resetRack()
    this.BookType = obj
  }
  
  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.BookType = {};
    if (this.formBookType) {
      this.formBookType.control.markAsPristine();
      this.formBookType.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.BookType.Status = 1
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
  getBookTypeList() {
    var obj = {}
    this.dataLoading = true
    this.service.getBookTypeList().subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.BookTypeList = response.BookTypeList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SaveBookType() {
    this.isSubmitted = true;
    this.formBookType.control.markAllAsTouched();
    if (this.formBookType.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.BookType.UpdatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.SaveBookType(this.BookType).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.BookType.BookTypeId > 0) {
          this.toastr.success("Book Type Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
        }
        this.resetRack();
        this.getBookTypeList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }
   
  deleteBookType(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deleteBookType(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getBookTypeList()
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
