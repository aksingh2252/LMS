import { Component, ViewChild } from '@angular/core';
import { ConstantData } from '../../utils/constant-data';
import { Status } from '../../utils/enum';
import { ActionModel } from '../../utils/interface';
import { AppService } from '../../utils/app.service';
import { ToastrService } from 'ngx-toastr';
import { LoadDataService } from '../../utils/load-data.service';
import { LocalService } from '../../utils/local.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-magazine',
  templateUrl: './magazine.component.html',
  styleUrls: ['./magazine.component.css']
})
export class MagazineComponent {
  p: number = 1;
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  MagazineList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  Magazine
    : any = {}
  staffLogin: any = {}
  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formMagazine') formMagazine: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getMagazineList();
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewMagazine() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }

  editMagazine(obj: any) {
    this.resetRack()
    this.Magazine
      = obj
  }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.Magazine
      = {};
    if (this.formMagazine) {
      this.formMagazine.control.markAsPristine();
      this.formMagazine.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Magazine
      .Status = 1
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

  getMagazineList() {
    var obj = {}
    this.dataLoading = true
    this.service.getMagazineList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.MagazineList = response.MagazineList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SaveMagazine() {
    this.isSubmitted = true;
    this.formMagazine.control.markAllAsTouched();
    if (this.formMagazine.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.Magazine
      .UpdatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.saveMagazine(this.Magazine
    ).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Magazine
          .MagazineId > 0) {
          this.toastr.success("Rack Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
          $('#staticBackdrop').modal('hide')
        }
        this.resetRack();
        this.getMagazineList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  DeleteMagazine(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deleteMagazine(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getMagazineList()
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
