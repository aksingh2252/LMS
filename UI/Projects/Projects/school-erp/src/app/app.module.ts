import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppService } from "./utils/app.service";
import { AppComponent } from './app.component';
import { AdminMasterComponent } from './admin/admin-master/admin-master.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ProgressComponent } from './component/progress/progress.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { StaffLoginComponent } from './admin/staff-login/staff-login.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageGroupComponent } from './admin/page-group/page-group.component';
import { PageComponent } from './admin/page/page.component';
import { MenuComponent } from './admin/menu/menu.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleMenuComponent } from './admin/role-menu/role-menu.component';
import { NgxPaginationModule } from "ngx-pagination";
import { OrderModule } from "ngx-order-pipe";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { StaffLoginRoleComponent } from './admin/staff-login-role/staff-login-role.component';
import { HeadComponent } from './admin/head/head.component';
import { PupilTypeComponent } from './admin/pupil-type/pupil-type.component';
import { AdmissionListComponent } from './admin/admission-list/admission-list.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { MoneyPipe } from './pipes/money.pipe';
import { EnumCasePipe } from './pipes/enum-case.pipe';
import { RackComponent } from './admin/rack/rack.component';
import { ClassComponent } from './admin/class/class.component';
import { BookTypeComponent } from './admin/book-type/book-type.component';
import { BookComponent } from './admin/book/book.component';
import { BookSubjectComponent } from './admin/book-subject/book-subject.component';
import { BookClassComponent } from './admin/book-class/book-class.component';
import { SupplierComponent } from './admin/supplier/supplier.component';
import { PurchaseComponent } from './admin/purchase/purchase.component';
import { NewsPaperComponent } from './admin/news-paper/news-paper.component';
import { PurchaseNewsPaperComponent } from './admin/purchase-news-paper/purchase-news-paper.component';
import { LanguageComponent } from './admin/language/language.component';
import { MagazineComponent } from './admin/magazine/magazine.component';
import { PurchaseMagazineComponent } from './admin/purchase-magazine/purchase-magazine.component';
import { BookIssueComponent } from './admin/book-issue/book-issue.component';
import { BookFineComponent } from './admin/book-fine/book-fine.component';
 



@NgModule({
  declarations: [
    AppComponent,
    AdminMasterComponent,
    AdminDashboardComponent,
    PageNotFoundComponent,
    ProgressComponent,
    StaffLoginComponent,
    AdminLoginComponent,
    PageGroupComponent,
    PageComponent,
    MenuComponent,
    RoleComponent,
    RoleMenuComponent,
    StaffLoginRoleComponent,
    HeadComponent,
    PupilTypeComponent,
    AdmissionListComponent,
    ChangePasswordComponent,
    MoneyPipe,
    EnumCasePipe,
    RackComponent,
    ClassComponent,
    BookTypeComponent,
    BookComponent,
    BookSubjectComponent,
    BookClassComponent,
    SupplierComponent,
    PurchaseComponent,
    NewsPaperComponent,
    PurchaseNewsPaperComponent,
    LanguageComponent,
    MagazineComponent,
    PurchaseMagazineComponent,
    BookIssueComponent,
    BookFineComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastrModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgxMatSelectSearchModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule,
    EditorModule,
  ],
  
  providers: [AppService, { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
