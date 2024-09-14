import { Component, ViewChild } from '@angular/core';
import { Status } from '../../utils/enum';
import { ActionModel } from '../../utils/interface';
import { ConstantData } from '../../utils/constant-data';
import { AppService } from '../../utils/app.service';
import { ToastrService } from 'ngx-toastr';
import { LoadDataService } from '../../utils/load-data.service';
import { LocalService } from '../../utils/local.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
declare var $: any

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent {
  p: number = 1;
  isSubmitted = false
  StatusList = this.loadData.GetEnumList(Status)
  dataLoading: boolean = false
  BookList: any[] = []
  action: ActionModel = {} as ActionModel;
  PageSize = ConstantData.PageSizes;
  itemPerPage: number = this.PageSize[1];
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = 'BookTypeNo';
  BookTypeList: any[] = []
  Book: any = {}
  staffLogin: any = {}
  ClassList: any[] = []
  ParentClassList: any[] = [];

  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private loadData: LoadDataService,
    private localService: LocalService,
    private router: Router

  ) { }
  @ViewChild('formBookType') formBookType: NgForm;
  ngOnInit() {
    this.staffLogin = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getBookList();
    this.getBookTypeList();
    this.getAuthorList();
    this.getEditionList();
    this.getPublisherList();
    this.getClassList();
  }
  onTableDataChange(p: any) {
    this.p = p
  }
  NewBook() {
    this.resetRack();
    $('#staticBackdrop').modal('show');
  }

  editBook(obj: any) {
    this.resetRack()
    this.Book = obj
  }

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  resetRack() {
    this.Book = {};
    if (this.formBookType) {
      this.formBookType.control.markAsPristine();
      this.formBookType.control.markAsUntouched();
    }
    this.isSubmitted = false
    this.Book.Status = 1
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

  AuthorList: any[] = [];
  AllAuthorList: any[] = [];
  getAuthorList() {
    var obj = {}
    this.dataLoading = true
    this.service.getAuthorList().subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.AllAuthorList = response.AuthorList;
        this.AuthorList = response.AuthorList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  filterAuthorList(event: string) {
    if (event) {
      const filterValue = event.toLowerCase();
      this.AuthorList = this.AllAuthorList.filter((option: any) => option.toLowerCase().includes(filterValue));
    } else {
      this.AuthorList = this.AllAuthorList;
    }
  }

  clearAuthor() {
    this.Book.AuthorId = null;
    this.Book.AuthorName = null;
  }

  getBookList() {
    var obj = {}
    this.dataLoading = true
    this.service.getBookList().subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.BookList = response.BookList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  SaveBook() {
    this.isSubmitted = true;
    this.formBookType.control.markAllAsTouched();

    if (this.formBookType.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }

    this.Book.UpdatedBy = this.staffLogin.StaffLoginId;
    this.Book.CreatedBy = this.staffLogin.StaffLoginId;
    this.dataLoading = true;
    this.service.SaveBook(this.Book).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Book.BookTypeId > 0) {
          this.toastr.success("Rack Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Rack added successfully")
        }
        this.resetRack();
        this.getBookList();
        this.getAuthorList();
      } else {
        this.toastr.error(response.Message)
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deleteBook(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.dataLoading = true;
      this.service.deleteBook(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getBookList()
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

  getBookTypeList() {
    var obj = {}
    this.dataLoading = true
    this.service.getBookTypeList().subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.BookTypeList = response.BookTypeList;


      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  EditionList: any[] = [];
  AllEditionList: any[] = [];
  getEditionList() {
    var obj = {}
    this.dataLoading = true
    this.service.getEditionList().subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.AllEditionList = response.EditionList;
        this.EditionList = response.EditionList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  filterEditionList(event: string) {
    if (event) {
      const filterValue = event.toLowerCase();
      this.EditionList = this.AllEditionList.filter((option: any) => option.toLowerCase().includes(filterValue));
    } else {
      this.AuthorList = this.AllAuthorList;
    }
  }

  clearEdition() {
    this.Book.EditionId = null;
    this.Book.Edition = null;
  }

  PublisherList: any[] = [];
  AllPublisherList: any[] = [];
  getPublisherList() {
    var obj = {}
    this.dataLoading = true
    this.service.getPublisherList().subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.AllPublisherList = response.PublisherList;
        this.PublisherList = response.PublisherList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  filterPublisherList(event: string) {
    if (event) {
      const filterValue = event.toLowerCase();
      this.PublisherList = this.AllPublisherList.filter((option: any) => option.toLowerCase().includes(filterValue));
    } else {
      this.PublisherList = this.AllPublisherList;
    }
  }

  clearPublisher() {
    this.Book.PublisherId = null;
    this.Book.Publisher = null;
  }


  getClassList() {
    var obj = {}
    this.dataLoading = true
    this.service.getClassList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.ClassList = response.ClassList;
        this.ParentClassList = this.ClassList.filter(x => x.ParentClassId);

      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }


  //Class
  // changeFeeHeadInput(event: any, form: NgForm) {
  //   for (let i1 = 0; i1 < this.OPDFeeHeadList.length; i1++) {
  //     const e1 = this.OPDFeeHeadList[i1];
  //     if (e1.FeeHeadName == event) {
  //       this.afterFeeHeadSelected(e1);
  //       this.addFeeHead(form, 1);
  //       break;
  //     }
  //   }
  // }
  changeClasslist(event: any, form: NgForm) {
    for (let i1 = 0; i1 < this.ClassList.length; i1++) {
      const e1 = this.ClassList[i1];
      if (e1.ClassName == event) {
        this.afterClassListSelected(e1);
        this.addClass(form, 1);
      }
    }
  }

  Class: any = {}
  afterClassListSelected(item: any) {
    for (let i = 0; i < this.ClassList.length; i++) {
      const e1 = this.ClassList[i];
    }
    this.Class.ClassId = item.classId;
    this.Class.ClassName = item.ClassName;
  }

  ClearClass() {
    this.Class.ClassId = 0;
    
  }
  isClassSubmitted: boolean = false;
  addClass(form: NgForm, isCheck?: number) {
    this.isClassSubmitted = true;
    if (form.invalid && isCheck != 1) {
      return;
    }
  }

  
  
}
