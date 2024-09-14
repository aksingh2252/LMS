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
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  dataLoading: boolean = false
  RoleList: any = []
  Role: any = {}
  isSubmitted = false
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  StaffDetails:any = {}
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
    this.getRoleList();
    this.resetForm();
    this.StaffDetails = this.localService.getEmployeeDetail();
  }
  @ViewChild('formRole') formRole: NgForm;
  resetForm() {
    this.Role = {};
    if (this.formRole) {
      this.formRole.control.markAsPristine();
      this.formRole.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Role.Status = 1
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.RoleList.filter = filterValue.trim().toLowerCase();
  }


  getRoleList() {
    var obj = {}
    this.dataLoading = true
    this.service.getRoleList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.RoleList = response.RoleList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  saveRole() {
    this.isSubmitted = true;
    this.formRole.control.markAllAsTouched();
    if (this.formRole.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.Role.UpdatedBy = this.StaffDetails.StaffLoginId;
    this.dataLoading = true;
    this.service.saveRole(this.Role).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Role.RoleId > 0) {
          this.toastr.success("Role Updated successfully")
        } else {
          this.toastr.success("Role added successfully")
        }
        $('#staticBackdrop').modal('hide')
        this.resetForm()
        this.getRoleList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deleteRole(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deleteRole(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getRoleList()
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

  editRole(obj: any) {
    this.resetForm()
    this.Role = obj

  }

}
