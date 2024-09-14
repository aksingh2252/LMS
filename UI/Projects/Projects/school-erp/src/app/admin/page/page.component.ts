import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LocalService } from '../../utils/local.service';
import { Status } from '../../utils/enum';
import { LoadDataService } from '../../utils/load-data.service';
declare var $: any;

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {
  dataLoading: boolean = false
  PageList: any = []
  Page: any = {}
  isSubmitted = false
  PageGroupList: any[] = []
  filterPageGroup: any[] = []
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  StaffDetails: any = {};
  StatusList = this.loadData.GetEnumList(Status);



  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  onTableDataChange(p: any) {
    this.p = p
  }

  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private localService: LocalService,
    private loadData:LoadDataService
  ) { }

  ngOnInit(): void {
    this.getPageList();
    this.getPageGroupList();
    this.StaffDetails = this.localService.getEmployeeDetail();
  }

  @ViewChild('formPage') formPage: NgForm;
  resetForm() {
    this.Page = {};
    if (this.formPage) {
      this.formPage.control.markAsPristine();
      this.formPage.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Page.Status = 1
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.PageList.filter = filterValue.trim().toLowerCase();
  }

  filterPageGroupList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filterPageGroup = this.PageGroupList.filter((option: any) => option.PageGroupName.toLowerCase().includes(filterValue));
    } else {
      this.filterPageGroup = this.PageGroupList;
    }
  }

  getPageGroupList() {
    var obj = {}
    this.dataLoading = true
    this.service.getPageGroupList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.PageGroupList = response.PageGroupList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  getPageList() {
    var obj = {}
    this.dataLoading = true
    this.service.getPageList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.PageList = response.PageList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  savePage() {
    this.formPage.control.markAllAsTouched();
    this.isSubmitted = true
    if (this.formPage.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }

    this.Page.UpdatedBy = this.StaffDetails.StaffLoginId;
    this.dataLoading = true;
    this.service.savePage(this.Page).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Page.PageId > 0) {
          this.toastr.success("Page detail updated successfully")
        } else {
          this.toastr.success("Page added successfully")
        }
        $('#staticBackdrop').modal('hide')
        // this.resetForm();
        // form.resetForm();
        this.Page.PageName = null;
        this.Page.PageUrl = null;
        this.Page.PageId = null;
        this.formPage.control.markAsUntouched();
        this.formPage.control.markAsUntouched();
        this.getPageList()
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deletePage(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deletePage(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getPageList()
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

  editPage(obj: any) {
    this.resetForm()
    this.Page = obj
  }
}
