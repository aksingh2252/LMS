import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LoadDataService } from '../../utils/load-data.service';
import { Status } from '../../utils/enum';
declare var $: any

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {

  dataLoading: boolean = false
  HeadList: any = []
  Head: any = {}
  isSubmitted = false
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
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
    private loadData: LoadDataService
  ) { }

  ngOnInit(): void {
    this.getHeadList();
    this.resetForm();
  }


  @ViewChild('formHead') formHead: NgForm;
  resetForm() {
    this.Head = {};
    if (this.formHead) {
      this.formHead.control.markAsPristine();
      this.formHead.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Head.Status = 1
  }

  selectChange(obj: any) {
    if (obj.IsSelected) {
      obj.IsCompulsory = true
    } else {
      obj.IsCompulsory = false;
    }
  }

  getHeadList() {
    var obj = {}
    this.dataLoading = true
    this.service.getHeadList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.HeadList = response.HeadList;

      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false
    }))
  }

  saveHead() {
    this.isSubmitted = true;
    this.formHead.control.markAllAsTouched();
    if (this.formHead.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.dataLoading = true;
    this.service.saveHead(this.Head).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Head.HeadId > 0) {
          this.toastr.success("Head Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Head added successfully")
        }
        this.resetForm();
        this.getHeadList()
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deleteHead(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deleteHead(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getHeadList()
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

  editHead(obj: any) {
    this.resetForm()
    this.Head = obj
  }
}
