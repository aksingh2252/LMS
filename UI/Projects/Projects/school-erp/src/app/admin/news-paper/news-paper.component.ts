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
  selector: 'app-news-paper',
  templateUrl: './news-paper.component.html',
  styleUrls: ['./news-paper.component.css']
})
export class NewsPaperComponent {
  p: number = 1;
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  NewspaperList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'NewspaperNo';
  Newspaper
  : any = {}
  staffLogin: any = {}
  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formNewspaper') formNewspaper: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getNewspaperList();
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewNewspaper() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }
  
  editNewspaper(obj: any) {
    this.resetRack()
    this.Newspaper
     = obj
  }
  
  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.Newspaper
     = {};
    if (this.formNewspaper) {
      this.formNewspaper.control.markAsPristine();
      this.formNewspaper.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Newspaper
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
  getNewspaperList() {
    var obj = {}
    this.dataLoading = true
    this.service.getNewspaperList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.NewspaperList = response.NewsPaperList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SaveNewspaper() {
    this.isSubmitted = true;
    this.formNewspaper.control.markAllAsTouched();
    if (this.formNewspaper.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.Newspaper
    .UpdatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.SaveNewspaper(this.Newspaper
      ).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Newspaper
          .NewspaperId > 0) {
          this.toastr.success("Rack Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
          $('#staticBackdrop').modal('hide')
        }
        this.resetRack();
        this.getNewspaperList()
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }
   
  DeleteNewsPaper(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.DeleteNewsPaper(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getNewspaperList()
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
