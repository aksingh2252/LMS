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
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent {
  p: number = 1;
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  LanguageList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  Language
    : any = {}
  staffLogin: any = {}
  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formLanguage') formLanguage: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getLanguageList();
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewLanguage() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }

  editLanguage(obj: any) {
    this.resetRack()
    this.Language
      = obj
  }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.Language = {};
    if (this.formLanguage) {
      this.formLanguage.control.markAsPristine();
      this.formLanguage.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Language.Status = 1
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
  getLanguageList() {
    var obj = {}
    this.dataLoading = true
    this.service.getLanguageList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.LanguageList = response.LanguageList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SaveLanguage() {
    this.isSubmitted = true;
    this.formLanguage.control.markAllAsTouched();
    if (this.formLanguage.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.Language
      .UpdatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.saveLanguage(this.Language
    ).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Language
          .LanguageId > 0) {
          this.toastr.success("Rack Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
          $('#staticBackdrop').modal('hide')
        }
        this.resetRack();
        this.getLanguageList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  DeleteLanguage(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deleteLanguage(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getLanguageList()
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
