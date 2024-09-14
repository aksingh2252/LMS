import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly baseUrl: string = 'https://localhost:44378/';
  private readonly apiUrl: string = '';

  constructor(private http: HttpClient) {
    //this.baseUrl = "http://192.168.29.227:1114/"
    this.apiUrl = this.baseUrl + 'api/';
  }

  getImageUrl(): string {
    return this.baseUrl;
  }

  printFeeePaymentReceipt(id: any) {
    window.open(this.baseUrl + 'report/feepaymentreceipt/' + id);
  }

  // Status Type
  getStatusList(obj: any) {
    return this.http.post(this.apiUrl + 'enum/StatusList', obj);
  }

  //  gender Type
  getGenderList(obj: any) {
    return this.http.post(this.apiUrl + 'enum/GenderList', obj);
  }

  // Staff Type
  getStaffTypeList(obj: any) {
    return this.http.post(this.apiUrl + 'enum/StaffTypeList', obj);
  }

  // Category
  getCategoryList(obj: any) {
    return this.http.post(this.apiUrl + 'enum/CategoryList', obj);
  }

  // BloodGroup
  getBloodGroupList(obj: any) {
    return this.http.post(this.apiUrl + 'enum/BloodGroupList', obj);
  }

  // Religon
  getReligionList(obj: any) {
    return this.http.post(this.apiUrl + 'enum/ReligionList', obj);
  }

  // Nationality
  getNationalityList(obj: any) {
    return this.http.post(this.apiUrl + 'enum/NationalityList', obj);
  }
  // FeeFor
  getFeeForList(obj: any) {
    return this.http.post(this.apiUrl + 'enum/FeeForList', obj);
  }

  // Admission Type
  getAdmissionTypeList(obj: any) {
    return this.http.post(this.apiUrl + 'enum/AdmissionTypeList', obj);
  }

  // Registration
  saveRegistration(obj: any) {
    return this.http.post(this.apiUrl + 'Registration/saveRegistration', obj);
  }

  getRegistrationListS(obj: any) {
    return this.http.post(this.apiUrl + 'Registration/RegistrationList', obj);
  }

  /* ---------------------------------------------------------------------- */

  // FeePayment
  getFeePaymentList(obj: any) {
    return this.http.post(this.apiUrl + 'FeePayment/FeePaymentList', obj);
  }
  getFeePaymentDetailForFee(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeePayment/FeePaymentDetailForFee',
      obj
    );
  }
  saveFeePayment(obj: any) {
    return this.http.post(this.apiUrl + 'FeePayment/SaveFeePayment', obj);
  }
  deleteFeePayment(obj: any) {
    return this.http.post(this.apiUrl + 'FeePayment/DeleteFeePayment', obj);
  }
  getFeeDueList(obj: any) {
    return this.http.post(this.apiUrl + 'FeePayment/FeeDueList', obj);
  }
  // Month
  getMonthList(obj: any) {
    return this.http.post(this.apiUrl + 'Month/MonthList', obj);
  }

  // Pupil Admission
  getPupilListForPromotion(obj: any) {
    return this.http.post(
      this.apiUrl + 'PupilAdmission/PupilListForPromotion',
      obj
    );
  }
  pupilPromotion(obj: any) {
    return this.http.post(this.apiUrl + 'PupilAdmission/pupilPromotion', obj);
  }

  /* ---------------------------------------------------------------------- */
  // FeePaymentDetail
  getFeePaymentDetailList(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeePaymentDetail/FeePaymentDetailList',
      obj
    );
  }

  /* ---------------------------------------------------------------------- */

  // Designation
  getDesignationList(obj: any) {
    return this.http.post(this.apiUrl + 'Designation/DesignationList', obj);
  }

  saveDesignation(obj: any) {
    return this.http.post(this.apiUrl + 'Designation/saveDesignation', obj);
  }

  deleteDesignation(obj: any) {
    return this.http.post(this.apiUrl + 'Designation/deleteDesignation', obj);
  }

  /* ---------------------------------------------------------------------- */

  //Department
  getDepartmentList(obj: any) {
    return this.http.post(this.apiUrl + 'Department/DepartmentList', obj);
  }

  saveDepartment(obj: any) {
    return this.http.post(this.apiUrl + 'Department/saveDepartment', obj);
  }

  deleteDepartment(obj: any) {
    return this.http.post(this.apiUrl + 'Department/deleteDepartment', obj);
  }

  /* ---------------------------------------------------------------------- */

  // Staff
  getStaffList(obj: any) {
    return this.http.post(this.apiUrl + 'Staff/StaffList', obj);
  }

  saveStaff(obj: any) {
    return this.http.post(this.apiUrl + 'Staff/saveStaff', obj);
  }

  deleteStaff(obj: any) {
    return this.http.post(this.apiUrl + 'Staff/deleteStaff', obj);
  }

  /* ---------------------------------------------------------------------- */

  // Staff Login
  StaffLogin(obj: any) {
    return this.http.post(this.apiUrl + 'StaffLogin/StaffLogin', obj);
  }

  getStaffLoginList(obj: any) {
    return this.http.post(this.apiUrl + 'StaffLogin/StaffLoginList', obj);
  }

  saveStaffLogin(obj: any) {
    return this.http.post(this.apiUrl + 'StaffLogin/saveStaffLogin', obj);
  }

  deleteStaffLogin(obj: any) {
    return this.http.post(this.apiUrl + 'StaffLogin/deleteStaffLogin', obj);
  }

  changePassword(obj: any) {
    return this.http.post(this.apiUrl + 'StaffLogin/changePassword', obj);
  }

  /* ---------------------------------------------------------------------- */

  // School
  getSchoolList(obj: any) {
    return this.http.post(this.apiUrl + 'School/SchoolList', obj);
  }

  saveSchool(obj: any) {
    return this.http.post(this.apiUrl + 'School/saveSchool', obj);
  }

  deleteSchool(obj: any) {
    return this.http.post(this.apiUrl + 'School/deleteSchool', obj);
  }

  /* ---------------------------------------------------------------------- */

  //PageGroup
  getPageGroupList(obj: any) {
    return this.http.post(this.apiUrl + 'PageGroup/PageGroupList', obj);
  }

  savePageGroup(obj: any) {
    return this.http.post(this.apiUrl + 'PageGroup/savePageGroup', obj);
  }

  deletePageGroup(obj: any) {
    return this.http.post(this.apiUrl + 'PageGroup/deletePageGroup', obj);
  }

  /* ---------------------------------------------------------------------- */

  //Page
  getPageList(obj: any) {
    return this.http.post(this.apiUrl + 'Page/PageList', obj);
  }

  savePage(obj: any) {
    return this.http.post(this.apiUrl + 'Page/savePage', obj);
  }

  deletePage(obj: any) {
    return this.http.post(this.apiUrl + 'Page/deletePage', obj);
  }

  /* ---------------------------------------------------------------------- */

  //Menu
  getUserMenuList(obj: any) {
    return this.http.post(this.apiUrl + 'Menu/UserMenuList', obj);
  }

  validiateMenu(obj: any) {
    return this.http.post(this.apiUrl + 'Menu/ValidiateMenu', obj);
  }

  getMenuList(obj: any) {
    return this.http.post(this.apiUrl + 'Menu/MenuList', obj);
  }

  saveMenu(obj: any) {
    return this.http.post(this.apiUrl + 'Menu/saveMenu', obj);
  }

  deleteMenu(obj: any) {
    return this.http.post(this.apiUrl + 'Menu/deleteMenu', obj);
  }

  menuUp(obj: any) {
    return this.http.post(this.apiUrl + 'Menu/MenuUp', obj);
  }

  menuDown(obj: any) {
    return this.http.post(this.apiUrl + 'Menu/MenuDown', obj);
  }

  /* ---------------------------------------------------------------------- */

  //Role
  getRoleList(obj: any) {
    return this.http.post(this.apiUrl + 'Role/RoleList', obj);
  }

  saveRole(obj: any) {
    return this.http.post(this.apiUrl + 'Role/saveRole', obj);
  }

  deleteRole(obj: any) {
    return this.http.post(this.apiUrl + 'Role/deleteRole', obj);
  }

  /* ---------------------------------------------------------------------- */

  //RoleMenu
  getRoleMenuList(obj: any) {
    return this.http.post(this.apiUrl + 'RoleMenu/AllRoleMenuList', obj);
  }

  saveRoleMenu(obj: any) {
    return this.http.post(this.apiUrl + 'RoleMenu/saveRoleMenu', obj);
  }

  /* ---------------------------------------------------------------------- */

  //StaffLoginRole
  getStaffLoginRoleList(obj: any) {
    return this.http.post(
      this.apiUrl + 'StaffLoginRole/StaffLoginRoleList',
      obj
    );
  }

  saveStaffLoginRole(obj: any) {
    return this.http.post(
      this.apiUrl + 'StaffLoginRole/saveStaffLoginRole',
      obj
    );
  }

  deleteStaffLoginRole(obj: any) {
    return this.http.post(
      this.apiUrl + 'StaffLoginRole/deleteStaffLoginRole',
      obj
    );
  }

  /* ---------------------------------------------------------------------- */

  //Head
  getHeadList(obj: any) {
    return this.http.post(this.apiUrl + 'Head/HeadList', obj);
  }

  saveHead(obj: any) {
    return this.http.post(this.apiUrl + 'Head/saveHead', obj);
  }

  deleteHead(obj: any) {
    return this.http.post(this.apiUrl + 'Head/deleteHead', obj);
  }

  /* ---------------------------------------------------------------------- */

  //Session
  getSessionList(obj: any) {
    return this.http.post(this.apiUrl + 'Session/SessionList', obj);
  }

  saveSession(obj: any) {
    return this.http.post(this.apiUrl + 'Session/saveSession', obj);
  }

  deleteSession(obj: any) {
    return this.http.post(this.apiUrl + 'Session/deleteSession', obj);
  }

  /* ---------------------------------------------------------------------- */

  /* ---------------------------------------------------------------------- */

  //City
  getCityList(obj: any) {
    return this.http.post(this.apiUrl + 'City/CityList', obj);
  }

  saveCity(obj: any) {
    return this.http.post(this.apiUrl + 'City/saveCity', obj);
  }

  deleteCity(obj: any) {
    return this.http.post(this.apiUrl + 'City/deleteCity', obj);
  }

  /* ---------------------------------------------------------------------- */

  //Class
  getClassStreamList(obj: any) {
    return this.http.post(this.apiUrl + 'Class/ClassStreamList', obj);
  }

  getClassList(obj: any) {
    return this.http.post(this.apiUrl + 'Class/ClassList', obj);
  }

  getAllClassList(obj: any) {
    return this.http.post(this.apiUrl + 'Class/AllClassList', obj);
  }

  saveClass(obj: any) {
    return this.http.post(this.apiUrl + 'Class/saveClass', obj);
  }

  deleteClass(obj: any) {
    return this.http.post(this.apiUrl + 'Class/deleteClass', obj);
  }

  /* ---------------------------------------------------------------------- */

  //Section
  getSectionList(obj: any) {
    return this.http.post(this.apiUrl + 'Section/SectionList', obj);
  }

  saveSection(obj: any) {
    return this.http.post(this.apiUrl + 'Section/saveSection', obj);
  }

  deleteSection(obj: any) {
    return this.http.post(this.apiUrl + 'Section/deleteSection', obj);
  }

  /* ---------------------------------------------------------------------- */

  //PupilType
  getPupilTypeList(obj: any) {
    return this.http.post(this.apiUrl + 'PupilType/PupilTypeList', obj);
  }

  savePupilType(obj: any) {
    return this.http.post(this.apiUrl + 'PupilType/savePupilType', obj);
  }

  deletePupilType(obj: any) {
    return this.http.post(this.apiUrl + 'PupilType/deletePupilType', obj);
  }

  //PupilWaiveOff
  getPupilWaiveOffListforEntry(obj: any) {
    return this.http.post(
      this.apiUrl + 'PupilWaiveOff/PupilWaiveOffListforEntry',
      obj
    );
  }

  savePupilWaiveOff(obj: any) {
    return this.http.post(this.apiUrl + 'PupilWaiveOff/savePupilWaiveOff', obj);
  }

  /* ---------------------------------------------------------------------- */
  //FeeClass
  getAllFeeClassList(obj: any) {
    return this.http.post(this.apiUrl + 'FeeClass/AllFeeClassList', obj);
  }

  saveFeeClass(obj: any) {
    return this.http.post(this.apiUrl + 'FeeClass/saveFeeClass', obj);
  }

  /* ---------------------------------------------------------------------- */
  //FeeClassHead
  getAllFeeClassHeadList(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeeClassHead/AllFeeClassHeadList',
      obj
    );
  }

  saveFeeClassHead(obj: any) {
    return this.http.post(this.apiUrl + 'FeeClassHead/saveFeeClassHead', obj);
  }

  //FeeAdmissionHead
  getFeeAdmissionHeadList(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeeAdmissionHead/FeeAdmissionHeadList',
      obj
    );
  }

  saveFeeAdmissionHead(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeeAdmissionHead/saveFeeAdmissionHead',
      obj
    );
  }

  deleteFeeAdmissionHead(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeeAdmissionHead/deleteFeeAdmissionHead',
      obj
    );
  }

  /* ---------------------------------------------------------------------- */

  //FeeAdmission
  getFeeAdmissionList(obj: any) {
    return this.http.post(this.apiUrl + 'FeeAdmission/FeeAdmissionList', obj);
  }

  saveFeeAdmission(obj: any) {
    return this.http.post(this.apiUrl + 'FeeAdmission/saveFeeAdmission', obj);
  }

  deleteFeeAdmission(obj: any) {
    return this.http.post(this.apiUrl + 'FeeAdmission/deleteFeeAdmission', obj);
  }

  /* ---------------------------------------------------------------------- */

  //TransportBatch
  getTransportBatchList(obj: any) {
    return this.http.post(
      this.apiUrl + 'TransportBatch/TransportBatchList',
      obj
    );
  }

  saveTransportBatch(obj: any) {
    return this.http.post(
      this.apiUrl + 'TransportBatch/saveTransportBatch',
      obj
    );
  }

  deleteTransportBatch(obj: any) {
    return this.http.post(
      this.apiUrl + 'TransportBatch/deleteTransportBatch',
      obj
    );
  }

  /* ---------------------------------------------------------------------- */

  //TransportDuration
  getTransportDurationList(obj: any) {
    return this.http.post(
      this.apiUrl + 'TransportDuration/TransportDurationList',
      obj
    );
  }

  saveTransportDuration(obj: any) {
    return this.http.post(
      this.apiUrl + 'TransportDuration/saveTransportDuration',
      obj
    );
  }

  deleteTransportDuration(obj: any) {
    return this.http.post(
      this.apiUrl + 'TransportDuration/deleteTransportDuration',
      obj
    );
  }

  /* ---------------------------------------------------------------------- */

  //TransportPupil
  getTransportPupilList(obj: any) {
    return this.http.post(
      this.apiUrl + 'TransportPupil/TransportPupilList',
      obj
    );
  }

  saveTransportPupil(obj: any) {
    return this.http.post(
      this.apiUrl + 'TransportPupil/saveTransportPupil',
      obj
    );
  }

  deleteTransportPupil(obj: any) {
    return this.http.post(
      this.apiUrl + 'TransportPupil/deleteTransportPupil',
      obj
    );
  }

  /* ---------------------------------------------------------------------- */

  //Vehicle
  getVehicleList(obj: any) {
    return this.http.post(this.apiUrl + 'Vehicle/VehicleList', obj);
  }

  saveVehicle(obj: any) {
    return this.http.post(this.apiUrl + 'Vehicle/saveVehicle', obj);
  }

  deleteVehicle(obj: any) {
    return this.http.post(this.apiUrl + 'Vehicle/deleteVehicle', obj);
  }

  //VehicleType
  getVehicleTypeList(obj: any) {
    return this.http.post(this.apiUrl + 'VehicleType/VehicleTypeList', obj);
  }

  saveVehicleType(obj: any) {
    return this.http.post(this.apiUrl + 'VehicleType/saveVehicleType', obj);
  }

  deleteVehicleType(obj: any) {
    return this.http.post(this.apiUrl + 'VehicleType/deleteVehicleType', obj);
  }

  //Pupil
  getPupilList(obj: any) {
    return this.http.post(this.apiUrl + 'Pupil/PupilList', obj);
  }
  getAllSearchPupilList(obj: any) {
    return this.http.post(this.apiUrl + 'Pupil/AllSearchPupilList', obj);
  }
  getSearchPupilList(obj: any) {
    return this.http.post(this.apiUrl + 'Pupil/SearchPupilList', obj);
  }

  savePupil(obj: any) {
    return this.http.post(this.apiUrl + 'Pupil/savePupil', obj);
  }

  deletePupil(obj: any) {
    return this.http.post(this.apiUrl + 'Pupil/deletePupil', obj);
  }

  //PupilCharge
  getPupilChargeList(obj: any) {
    return this.http.post(this.apiUrl + 'PupilCharge/PupilChargeList', obj);
  }

  savePupilCharge(obj: any) {
    return this.http.post(this.apiUrl + 'PupilCharge/savePupilCharge', obj);
  }

  deletePupilCharge(obj: any) {
    return this.http.post(this.apiUrl + 'PupilCharge/deletePupilCharge', obj);
  }

  //Fee Registration
  getFeeRegistrationList(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeeRegistration/FeeRegistrationList',
      obj
    );
  }

  //Fee Registration Head
  getFeeRegistrationHeadList(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeeRegistrationHead/FeeRegistrationHeadList',
      obj
    );
  }

  saveFeeRegistrationHead(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeeRegistrationHead/saveFeeRegistrationHead',
      obj
    );
  }

  //FeeTransportHead
  getFeeTransportHeadList(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeeTransportHead/FeeTransportHeadList',
      obj
    );
  }

  saveFeeTransportHead(obj: any) {
    return this.http.post(
      this.apiUrl + 'FeeTransportHead/saveFeeTransportHead',
      obj
    );
  }

  //FeeTransport
  getFeeTransportList(obj: any) {
    return this.http.post(this.apiUrl + 'FeeTransport/FeeTransportList', obj);
  }

  saveFeeTransport(obj: any) {
    return this.http.post(this.apiUrl + 'FeeTransport/saveFeeTransport', obj);
  }

  deleteFeeTransport(obj: any) {
    return this.http.post(this.apiUrl + 'FeeTransport/deleteFeeTransport', obj);
  }

  //StaffClass
  getStaffClassList(obj: any) {
    return this.http.post(this.apiUrl + 'StaffClass/StaffClassList', obj);
  }

  saveStaffClass(obj: any) {
    return this.http.post(this.apiUrl + 'StaffClass/saveStaffClass', obj);
  }

  deleteStaffClass(obj: any) {
    return this.http.post(this.apiUrl + 'StaffClass/deleteStaffClass', obj);
  }

  //RegistrationForm
  getRegistrationFormList(obj: any) {
    return this.http.post(
      this.apiUrl + 'RegistrationForm/RegistrationFormList',
      obj
    );
  }

  saveRegistrationForm(obj: any) {
    return this.http.post(
      this.apiUrl + 'RegistrationForm/saveRegistrationForm',
      obj
    );
  }

  deleteRegistrationForm(obj: any) {
    return this.http.post(
      this.apiUrl + 'RegistrationForm/deleteRegistrationForm',
      obj
    );
  }
  //RackList
  getRackList() {
    return this.http.get(this.apiUrl + 'Rack/RackList');
  }

  saveRack(obj: any) {
    return this.http.post(this.apiUrl + 'Rack/SaveRack', obj);
  }
  deleteRack(obj: any) {
    return this.http.post(this.apiUrl + 'Rack/DeleteRack', obj);
  }

  //BookType
  getBookTypeList() {
    return this.http.get(this.apiUrl + 'BookType/BookTypeList');
  }
  SaveBookType(obj: any) {
    return this.http.post(this.apiUrl + 'BookType/SaveBookType', obj);
  }
  deleteBookType(obj: any) {
    return this.http.post(this.apiUrl + 'BookType/deleteBookType', obj);
  }

  //Book
  getBookList() {
    return this.http.get(this.apiUrl + 'Book/BookList');
  }
  SaveBook(obj: any) {
    return this.http.post(this.apiUrl + 'Book/SaveBook', obj);
  }
  deleteBook(obj: any) {
    return this.http.post(this.apiUrl + 'Book/deleteBook', obj);
  }

  getAuthorList() {
    return this.http.get(this.apiUrl + 'Book/AuthorList');
  }
  getEditionList() {
    return this.http.get(this.apiUrl + 'Book/EditionList');
  }
  getPublisherList() {
    return this.http.get(this.apiUrl + 'Book/PublisherList');
  }

  //BookSubject
  getBookSubjectList(obj: any) {
    return this.http.post(this.apiUrl + 'BookSubject/BookSubjectList', obj);
  }
  SaveBookSubject(obj: any) {
    return this.http.post(this.apiUrl + 'BookSubject/SaveBookSubject', obj);
  }
  deleteBookSubject(obj: any) {
    return this.http.post(this.apiUrl + 'BookSubject/deleteBookSubject', obj);
  }

  //BookClass
  getBookClassList(obj: any) {
    return this.http.post(this.apiUrl + 'BookClass/BookClassList', obj);
  }
  SaveBookClass(obj: any) {
    return this.http.post(this.apiUrl + 'BookClass/SaveBookClass', obj);
  }
  deleteBookClass(obj: any) {
    return this.http.post(this.apiUrl + 'BookClass/deleteBookClass', obj);
  }
  //BookSupplier
  getSupplierList(obj: any) {
    return this.http.post(this.apiUrl + 'Supplier/SupplierList', obj);
  }
  SaveSupplier(obj: any) {
    return this.http.post(this.apiUrl + 'Supplier/SaveSupplier', obj);
  }
  deleteSupplier(obj: any) {
    return this.http.post(this.apiUrl + 'Supplier/deleteSupplier', obj);
  }
  //Purchase
  getPurchaseList(obj: any) {
    return this.http.post(this.apiUrl + 'Purchase/PurchaseList', obj);
  }
  SavePurchase(obj: any) {
    return this.http.post(this.apiUrl + 'Purchase/SavePurchase', obj);
  }
  deletePurchase(obj: any) {
    return this.http.post(this.apiUrl + 'Purchase/deletePurchase', obj);
  }
  //Newspaper
  getNewspaperList(obj: any) {
    return this.http.post(this.apiUrl + 'Newspaper/NewspaperList', obj);
  }
  SaveNewspaper(obj: any) {
    return this.http.post(this.apiUrl + 'Newspaper/SaveNewspaper', obj);
  }
  DeleteNewsPaper(obj: any) {
    return this.http.post(this.apiUrl + 'Newspaper/deleteNewspaper', obj);
  }

  //PurchaseNewsPaper
  getPurchaseNewsPaperList(obj: any) {
    return this.http.post(
      this.apiUrl + 'PurchaseNewsPaper/PurchaseNewsPaperList',
      obj
    );
  }
  SavePurchaseNewsPaper(obj: any) {
    return this.http.post(
      this.apiUrl + 'PurchaseNewsPaper/SavePurchaseNewsPaper',
      obj
    );
  }
  deletePurchaseNewsPaper(obj: any) {
    return this.http.post(
      this.apiUrl + 'PurchaseNewsPaper/deletePurchaseNewsPaper',
      obj
    );
  }

  //Language
  getLanguageList(obj: any) {
    return this.http.post(this.apiUrl + 'Language/LanguageList', obj);
  }
  saveLanguage(obj: any) {
    return this.http.post(this.apiUrl + 'Language/SaveLanguage', obj);
  }
  deleteLanguage(obj: any) {
    return this.http.post(this.apiUrl + 'Language/deleteLanguage', obj);
  }

  //Magazine
  getMagazineList(obj: any) {
    return this.http.post(this.apiUrl + 'Magazine/MagazineList', obj);
  }
  saveMagazine(obj: any) {
    return this.http.post(this.apiUrl + 'Magazine/SaveMagazine', obj);
  }
  deleteMagazine(obj: any) {
    return this.http.post(this.apiUrl + 'Magazine/deleteMagazine', obj);
  }

  //PurchaseMagazine
  getPurchaseMagazineList(obj: any) {
    return this.http.post(
      this.apiUrl + 'PurchaseMagazine/PurchaseMagazineList',
      obj
    );
  }
  savePurchaseMagazine(obj: any) {
    return this.http.post(
      this.apiUrl + 'PurchaseMagazine/SavePurchaseMagazine',
      obj
    );
  }
  deletePurchaseMagazine(obj: any) {
    return this.http.post(
      this.apiUrl + 'PurchaseMagazine/deletePurchaseMagazine',
      obj
    );
  }
  //State
  getStateList(obj: any) {
    return this.http.post(this.apiUrl + 'State/StateList', obj);
  }

  saveState(obj: any) {
    return this.http.post(this.apiUrl + 'State/saveState', obj);
  }

  deleteState(obj: any) {
    return this.http.post(this.apiUrl + 'State/deleteState', obj);
  }

  //BookIssue
  getBookIssueList(obj: any) {
    return this.http.post(this.apiUrl + 'BookIssue/BookIssueList', obj);
  }

  saveBookIssue(obj: any) {
    return this.http.post(this.apiUrl + 'BookIssue/saveBookIssue', obj);
  }

  deleteBookIssue(obj: any) {
    return this.http.post(this.apiUrl + 'BookIssue/deleteBookIssue', obj);
  }

  //BookFine
  getBookFineList(obj: any) {
    return this.http.post(this.apiUrl + 'BookFine/BookFineList', obj);
  }

  saveBookFine(obj: any) {
    return this.http.post(this.apiUrl + 'BookFine/saveBookFine', obj);
  }

  deleteBookFine(obj: any) {
    return this.http.post(this.apiUrl + 'BookFine/deleteBookFine', obj);
  }
}
