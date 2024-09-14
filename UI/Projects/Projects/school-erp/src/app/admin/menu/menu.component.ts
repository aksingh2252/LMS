
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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  dataLoading: boolean = false
  MenuList: any = []
  Menu: any = {}
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status);
  filterPage: any[] = []
  PageList: any[] = []
  ParentMenuId: any = null;
  StaffDetials: any = {};
  Search:any=null;


  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private localService: LocalService,
    private loadData:LoadDataService
  ) {

  }

  ngOnInit(): void {
    this.getMenuList();
    this.getPageList();
    this.StaffDetials = this.localService.getEmployeeDetail();
  }
  
  @ViewChild('formMenu') formMenu: NgForm;
  resetForm() {
    this.Menu = {};
    if (this.formMenu) {
      this.formMenu.control.markAsPristine();
      this.formMenu.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Menu.Status = 1
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.MenuList.filter = filterValue.trim().toLowerCase();
  }

  filterPageList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filterPage = this.PageList.filter((option: any) => option.PageName.toLowerCase().includes(filterValue));
    } else {
      this.filterPage = this.PageList;
    }
  }


  getPageList() {
    var obj = {}
    this.dataLoading = true
    this.service.getPageList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.PageList = response.PageList;
        this.filterPage = this.PageList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  getStatusList() {
    var obj = {}
    this.dataLoading = true;
    this.service.getStatusList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.StatusList = response.StatusList
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching status records")
      this.dataLoading = false;
    }))
  }

  getMenuList() {
    var obj = {}
    this.dataLoading = true
    this.service.getMenuList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.MenuList = response.MenuList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  saveMenu() {
    this.formMenu.control.markAllAsTouched()
    this.isSubmitted = true
    if (this.formMenu.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }

    this.Menu.UpdatedBy = this.StaffDetials.StaffLoginId

    this.dataLoading = true;
    this.service.saveMenu(this.Menu).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Menu.MenuId > 0) {
          this.toastr.success("Menu detail updated successfully");
          this.resetForm()
        } else {
          this.toastr.success("Menu added successfully");
          this.Menu.PageName = null;
          this.Menu.MenuTitle = null;
          this.formMenu.control.markAsPristine();
          this.formMenu.control.markAsUntouched();
        }
        $('#staticBackdrop').modal('hide')
        this.getMenuList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deleteMenu(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {
      this.dataLoading = true;
      this.service.deleteMenu(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getMenuList()
        } else {
          this.toastr.error(response.Message)
          this.dataLoading = false;
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the record")
        this.dataLoading = false;
      }))
    }
  }

  menuDown(obj: any) {
    this.dataLoading = true;
    this.service.menuDown(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Success")
          this.getMenuList()
        } else {
          this.toastr.error(response.Message)
          this.dataLoading = false;
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the record")
        this.dataLoading = false;
      }))
  }
  

  menuUp(obj: any) {
    this.dataLoading = true;
    this.service.menuUp(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.toastr.success("Success")
        this.getMenuList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while deleteing the record")
      this.dataLoading = false;
    }))
}

  editMenu(obj: any) {
    this.resetForm()
    this.Menu = obj
  }

}
