
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LocalService } from '../../utils/local.service';
import { Status } from '../../utils/enum';
import { LoadDataService } from '../../utils/load-data.service';
declare var $: any;

@Component({
  selector: 'app-page-group',
  templateUrl: './page-group.component.html',
  styleUrls: ['./page-group.component.css']
})
export class PageGroupComponent {
  dataLoading: boolean = false
  PageGroupList: any = []
  PageGroup: any = {}
  isSubmitted = false
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  StaffDetails: any = {}
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
    this.getPageGroupList();
    this.StaffDetails = this.localService.getEmployeeDetail();
  }

  @ViewChild('formPageGroup') formPageGroup: NgForm;
  resetForm() {
    this.PageGroup = {};
    if (this.formPageGroup) {
      this.formPageGroup.control.markAsPristine();
      this.formPageGroup.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.PageGroup.Status = 1
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.PageGroupList.filter = filterValue.trim().toLowerCase();
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
    }))
  }

  savePageGroup() {
    this.formPageGroup.control.markAllAsTouched();
    this.isSubmitted = true
    if (this.formPageGroup.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }

    this.PageGroup.UpdatedBy = this.StaffDetails.StaffLoginId;
    this.dataLoading = true;
    this.service.savePageGroup(this.PageGroup).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.PageGroup.PageGroupId > 0) {
          this.toastr.success("PageGroup detail updated successfully")
        } else {
          this.toastr.success("PageGroup added successfully")
        }
        $('#staticBackdrop').modal('hide')
        this.resetForm()
        this.getPageGroupList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deletePageGroup(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deletePageGroup(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getPageGroupList()
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

  editPageGroup(obj: any) {
    this.resetForm()
    this.PageGroup = obj

  }
}
