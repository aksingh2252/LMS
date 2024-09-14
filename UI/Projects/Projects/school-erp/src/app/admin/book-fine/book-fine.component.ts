import { Component, ViewChild } from '@angular/core';
import { Status } from '../../utils/enum';
import { ActionModel, StaffLoginModel } from '../../utils/interface';
import { ConstantData } from '../../utils/constant-data';
import { AppService } from '../../utils/app.service';
import { ToastrService } from 'ngx-toastr';
import { LoadDataService } from '../../utils/load-data.service';
import { LocalService } from '../../utils/local.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-book-fine',
  templateUrl: './book-fine.component.html',
  styleUrls: ['./book-fine.component.css'],
})
export class BookFineComponent {
  p: number = 1;
  isSubmitted = false;
  StatusList = this.loadData.GetEnumList(Status);
  dataLoading: boolean = false;
  BookFineList: any[] = [];
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'BookFineTypeNo';
  BookFineTypeList: any[] = [];
  BookFine: any = {};
  staffLogin: any = {};
  ClassList: any[] = [];
  ParentClassList: any[] = [];
  BookList: any = [];
  filterBook: any = [];

  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router
  ) {}
  @ViewChild('formBookFineType') formBookFineType: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getBookFineList();
    this.SaveBookFine();
  }

  onTableDataChange(p: any) {
    this.p = p;
  }

  NewBookFine() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }

  editBookFine(obj: any) {
    this.resetRack();
    this.BookFine = obj;
  }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.BookFine = {};
    if (this.formBookFineType) {
      this.formBookFineType.control.markAsPristine();
      this.formBookFineType.control.markAsUntouched();
    }
    this.isSubmitted = false;
    this.BookFine.Status = 1;
  }

  validiateMenu() {
    var obj = {
      Url: this.router.url,
      StaffLoginId: this.staffLogin.StaffLoginId,
    };
    this.dataLoading = true;
    this.service.validiateMenu(obj).subscribe(
      (response: any) => {
        this.action = this.loadData.validiateMenu(
          response,
          this.toastr,
          this.router
        );
        this.dataLoading = false;
      },
      (err) => {
        this.toastr.error('Error while fetching records');
        this.dataLoading = false;
      }
    );
  }

  getBookFineList() {
    var obj = {};
    this.dataLoading = true;
    this.service.getBookFineList(obj).subscribe(
      (r1) => {
        let response = r1 as any;
        if (response.Message == ConstantData.SuccessMessage) {
          this.BookFineList = response.BookFineList;
          console.log(this.BookFineList);
        } else {
          this.toastr.error(response.Message);
        }
        this.dataLoading = false;
      },
      (err) => {
        this.toastr.error('Error while fetching records');
        this.dataLoading = false;
      }
    );
  }

  BookChange(option: any) {
    this.BookFine.BookId = option.BookId;
    this.BookFine.BookCount = option.BookCount;
  }

  SaveBookFine() {
    this.isSubmitted = true;
 
    this.BookFine.UpdatedBy = this.staffLogin.StaffLoginId;
    this.BookFine.CreatedBy = this.staffLogin.StaffLoginId;

    this.dataLoading = true;
    this.service.saveBookFine(this.BookFine).subscribe(
      (r1) => {
        let response = r1 as any;
        if (response.Message == ConstantData.SuccessMessage) {
          if (this.BookFine.BookFineId > 0) {
            this.toastr.success('Updated successfully');
            $('#staticBackdrop').modal('hide');
          } else {
            //this.toastr.success('Issued successfully');
          }
          this.resetRack();
          this.getBookFineList();
        } else {
          this.toastr.error(response.Message);
          this.dataLoading = false;
        }
      },
      (err) => {
        this.toastr.error('Error occured while submitting data');
        this.dataLoading = false;
      }
    );
  }

  deleteBookFine(obj: any) {
    if (confirm('Are your sure you want to delete this recored')) {
      this.dataLoading = true;
      this.service.deleteBookFine(obj).subscribe(
        (r1) => {
          let response = r1 as any;
          if (response.Message == ConstantData.SuccessMessage) {
            this.toastr.success('Record Deleted successfully');
            this.getBookFineList();
          } else {
            this.toastr.error(response.Message);
            this.dataLoading = false;
          }
        },
        (err) => {
          this.toastr.error('Error occured while deleteing the recored');
          this.dataLoading = false;
        }
      );
    }
  }
}
