import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LoadDataService } from '../../utils/load-data.service';
import { LocalService } from '../../utils/local.service';
import { ActionModel } from '../../utils/interface';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-admission-list',
  templateUrl: './admission-list.component.html',
  styleUrls: ['./admission-list.component.css']
})
export class AdmissionListComponent {

  dataLoading: boolean = false
  PupilList: any = []
  Pupil: any = {}
  isSubmitted = false
  StatusList: any[] = []
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  PupilTypeList: any[] = [];
  GenderList: any[] = [];
  CategoryList: any[] = [];
  ReligionList: any[] = [];
  BloodGroupList: any[] = [];
  NationalityList: any[] = [];
  StateList: any[] = [];
  State: any = {}
  AllCityList: any[] = [];
  CrosspondanceCityList: any[] = [];
  PermanentCityList: any[] = [];
  SectionList: any[] = [];
  SectionList2: any[] = [];
  AllSectionList: any[] = [];
  SessionList: any[] = [];
  AdmissionTypeList: any[] = [];
  ClassList: any[] = [];
  PupilAdmission: any = {};
  StaffDetails: any = {};
  FilterObj: any = {
    ClassId: '',
    SectionId: '',
    SessionId: '',
    AdmissionType: '',
    PupilTypeId: '',
  };
  action: ActionModel = {} as ActionModel;
  @ViewChild('AdmissionForm') AdmissionForm: NgForm;
  @ViewChild('FilterObjForm') FilterObjForm: NgForm;


  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private localService: LocalService,
    private loadDataService: LoadDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // this.getPupilList();
    this.StaffDetails = this.localService.getEmployeeDetail();
    this.validiateMenu();
    this.getStatusList();
    this.getPupilTypeList();
    this.getGenderList();
    this.getCategoryList();
    this.getReligionList();
    this.getBloodGroupList();
    this.getNationalityList();
    this.getCityList();
    this.getStateList();
    this.getSectionList();
    this.getSessionList();
    this.getAdmissionTypeList();
    this.getClassList();
  }

  validiateMenu() {
    var obj = {
      Url: this.router.url,
      StaffLoginId: this.StaffDetails.StaffLoginId
    }
    this.dataLoading = true
    this.service.validiateMenu(obj).subscribe((response: any) => {
      this.action = this.loadDataService.validiateMenu(response, this.toastr, this.router)
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error while fetching records")
      this.dataLoading = false;
    }))
  }

  resetForm() {
    this.AdmissionForm.control.markAsUntouched();
    this.AdmissionForm.control.markAsPristine();
    this.Pupil = {}
    this.isSubmitted = false
    this.Pupil.Status = 1
  }

  getPupilList() {
    if (this.FilterObjForm.invalid) {
      this.toastr.error("Session is required!!");
      return;
    }
    this.dataLoading = true
    this.service.getPupilList(this.FilterObj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.PupilList = response.PupilList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  savePupil() {
    this.isSubmitted = true
    if (this.AdmissionForm.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }

    this.Pupil.DOB = this.loadDataService.loadDateYMD(this.Pupil.DOB)
    this.Pupil.PreviousSchoolTCDate = this.loadDataService.loadDateYMD(this.Pupil.PreviousSchoolTCDate)
    this.PupilAdmission.AdmissinDate = this.loadDataService.loadDateYMD(this.PupilAdmission.AdmissinDate)

    var obj = {
      Pupil: this.Pupil,
      PupilAdmission: this.PupilAdmission,
      StaffLoginId: this.StaffDetails.StaffLoginId
    }
    this.dataLoading = true;
    this.service.savePupil(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Pupil.PupilId > 0) {
          this.toastr.success("Pupil Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Pupil added successfully")
        }
        this.resetForm();
        this.getPupilList()
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error occured while submitting data")
    }))
  }

  deletePupil(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deletePupil(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getPupilList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editPupil(obj: any) {
    this.resetForm()
    this.Pupil = obj;
    this.PupilAdmission = obj.PupilAdmission;
    this.onStateChange(1);
    this.onStateChange(2);
    this.onClassChange();
  }

  getCategoryList() {
    var obj = {}
    this.service.getCategoryList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.CategoryList = response.CategoryList
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error while fetching Category records")
    }))
  }

  getReligionList() {
    var obj = {}
    this.service.getReligionList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.ReligionList = response.ReligionList
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error while fetching Religion records")
    }))
  }

  getBloodGroupList() {
    var obj = {}
    this.service.getBloodGroupList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.BloodGroupList = response.BloodGroupList
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error while fetching BloodGroup records")
    }))
  }

  getNationalityList() {
    var obj = {}
    this.service.getNationalityList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.NationalityList = response.NationalityList
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error while fetching nationality records")
    }))
  }

  getGenderList() {
    var obj = {}
    this.service.getGenderList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.GenderList = response.GenderList
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error while fetching Gender records")
    }))
  }

  getStatusList() {
    var obj = {}
    this.service.getStatusList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.StatusList = response.StatusList
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error while fetching status records")
    }))
  }

  getAdmissionTypeList() {
    var obj = {}
    this.service.getAdmissionTypeList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.AdmissionTypeList = response.AdmissionTypeList
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error while fetching status records")
    }))
  }

  getPupilTypeList() {
    var obj = {}
    this.dataLoading = true
    this.service.getPupilTypeList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.PupilTypeList = response.PupilTypeList;

      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }


  getCityList() {
    var obj = {}
    this.dataLoading = true
    this.service.getCityList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.AllCityList = response.CityList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }


  getStateList() {
    var obj = {}
    this.dataLoading = true
    this.service.getStateList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.StateList = response.StateList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  onStateChange(type: number) {
    if (type == 1) { // Crosspondance
      this.CrosspondanceCityList = [];
      this.AllCityList.forEach((e1: any) => {
        if (e1.StateId == this.Pupil.CorrespondenceStateId) {
          this.CrosspondanceCityList.push(e1);
        }
      });
    }

    if (type == 2) { // Permanent
      this.PermanentCityList = [];
      this.AllCityList.forEach((e1: any) => {
        if (e1.StateId == this.Pupil.PermanentStateId) {
          this.PermanentCityList.push(e1);
        }
      });
    }
  }

  onClassChange() {
    this.SectionList = [];
    this.AllSectionList.forEach((e1: any) => {
      if (e1.ClassId == this.PupilAdmission.ClassId) {
        this.SectionList.push(e1);
      }
    })
  }

  onClassChange2() {
    this.SectionList2 = [];
    this.AllSectionList.forEach((e1: any) => {
      if (e1.ClassId == this.FilterObj.ClassId) {
        this.SectionList2.push(e1);
      }
    })
  }

  getSectionList() {
    var obj = {}
    this.dataLoading = true
    this.service.getSectionList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.AllSectionList = response.SectionList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }


  getSessionList() {
    var obj = {}
    this.dataLoading = true
    this.service.getSessionList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.SessionList = response.SessionList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  getClassList() {
    var obj = {}
    this.dataLoading = true
    this.service.getClassList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.ClassList = response.ClassList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  @ViewChild('table_1') table_1: ElementRef;
  isExporting: boolean = false;
  exportToExcel() {
    this.isExporting = true;
    var itemPerPage = this.itemPerPage;
    var p = this.p;
    this.p = 1;
    this.itemPerPage = this.PupilList.length;
    setTimeout(() => {
      this.loadDataService.exportToExcel(this.table_1, "Pupil List " + this.loadDataService.loadDateTime(new Date()));
      this.itemPerPage = itemPerPage;
      this.p = p;
      this.isExporting = false;
    }, 1000);

  }

}
