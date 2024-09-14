import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { Status } from '../../utils/enum';
import { LoadDataService } from '../../utils/load-data.service';
import { ActionModel, StaffLoginModel } from '../../utils/interface';
import { LocalService } from '../../utils/local.service';
import { Router } from '@angular/router';
declare var $: any


@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.css']
})
export class RackComponent {
  dataLoading: boolean = false
  RackList: any[] = []
  Rack: any = {}
  isSubmitted = false
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'RackNo';
  itemPerPage: number = this.PageSize[1];
  ParentRackList: any[] = [];
  StatusList = this.loadData.GetEnumList(Status);
  action: ActionModel = {} as ActionModel;
  staffLogin: StaffLoginModel = {} as StaffLoginModel;

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
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getRackList();
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

  @ViewChild('formRack') formRack: NgForm;
  resetRack() {
    this.Rack = {};
    if (this.formRack) {
      this.formRack.control.markAsPristine();
      this.formRack.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Rack.Status = 1
  }
  NewRack() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }

  getRackList() {
    var obj = {}
    this.dataLoading = true
    this.service.getRackList().subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.RackList = response.RackList;
        this.ParentRackList = this.RackList.filter(x => x.ParentRackId);

      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  saveRack() {
    this.isSubmitted = true;
    this.formRack.control.markAllAsTouched();
    if (this.formRack.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.Rack.UpdatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.saveRack(this.Rack).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Rack.RackId > 0) {
          this.toastr.success("Rack Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
        }
        this.resetRack();
        this.getRackList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deleteRack(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deleteRack(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getRackList()
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

  editRack(obj: any) {
    this.resetRack()
    this.Rack = obj
  }
}
