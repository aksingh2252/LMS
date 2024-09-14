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
  selector: 'app-book-issue',
  templateUrl: './book-issue.component.html',
  styleUrls: ['./book-issue.component.css'],
})
export class BookIssueComponent {
  p: number = 1;
  isSubmitted = false;
  StatusList = this.loadData.GetEnumList(Status);
  dataLoading: boolean = false;
  BookIssueList: any[] = [];
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'BookIssueTypeNo';
  BookIssueTypeList: any[] = [];
  BookIssue: any = {};
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
  @ViewChild('formBookIssueType') formBookIssueType: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getBookIssueList();
    this.getBookList();
  }
  onTableDataChange(p: any) {
    this.p = p;
  }

  NewBookIssue() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }

  editBookIssue(obj: any) {
    this.resetRack();
    this.BookIssue = obj;
  }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.BookIssue = {};
    if (this.formBookIssueType) {
      this.formBookIssueType.control.markAsPristine();
      this.formBookIssueType.control.markAsUntouched();
    }
    this.isSubmitted = false;
    this.BookIssue.Status = 1;
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


  getBookIssueList() {
    var obj = {};
    this.dataLoading = true;
    this.service.getBookIssueList(obj).subscribe(
      (r1) => {
        let response = r1 as any;
        if (response.Message == ConstantData.SuccessMessage) {
          this.BookIssueList = response.BookIssueList;
          console.log(this.BookIssueList);
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
    this.BookIssue.BookId = option.BookId;
    this.BookIssue.BookCount = option.BookCount;
  }

  SaveBookIssue() {
    this.isSubmitted = true;
    this.formBookIssueType.control.markAllAsTouched();
    if (this.formBookIssueType.invalid) {
      this.toastr.error('Fill all the required fields !!');
      return;
    }
    this.BookIssue.UpdatedBy = this.staffLogin.StaffLoginId;
    this.BookIssue.CreatedBy = this.staffLogin.StaffLoginId;
    this.BookIssue.IssueDate = this.loadData.loadDateYMD(
      this.BookIssue.IssueDate
    );
    this.BookIssue.ReturnDate = this.loadData.loadDateYMD(
      this.BookIssue.ReturnDate
    );

    if (this.BookIssue.IssueDate > this.BookIssue.ReturnDate) {
      this.toastr.error('Issue Date must be smaller than Return Date');
      return;
    }


    this.dataLoading = true;
    this.service.saveBookIssue(this.BookIssue).subscribe(
      (r1) => {
        let response = r1 as any;
        if (response.Message == ConstantData.SuccessMessage) {
          if (this.BookIssue.BookIssueId > 0) {
            this.toastr.success('Updated successfully');
            $('#staticBackdrop').modal('hide');
          } else {
            this.toastr.success('Issued successfully');
          }
          this.resetRack();
          this.getBookIssueList();
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

  deleteBookIssue(obj: any) {
    if (confirm('Are your sure you want to delete this recored')) {
      this.dataLoading = true;
      this.service.deleteBookIssue(obj).subscribe(
        (r1) => {
          let response = r1 as any;
          if (response.Message == ConstantData.SuccessMessage) {
            this.toastr.success('Record Deleted successfully');
            this.getBookIssueList();
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

  getBookList() {
    var obj = {};
    this.dataLoading = true;
    this.service.getBookList().subscribe(
      (r1) => {
        let response = r1 as any;
        if (response.Message == ConstantData.SuccessMessage) {
          this.BookList = response.BookList;
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

  filterBookList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filterBook = this.BookList.filter((option: any) =>
        option.BookName.toLowerCase().includes(filterValue)
      );
    } else {
      this.filterBook = this.BookList;
    }
  }
}
