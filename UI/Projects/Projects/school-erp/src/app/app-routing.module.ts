import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMasterComponent } from './admin/admin-master/admin-master.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { StaffLoginComponent } from './admin/staff-login/staff-login.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageGroupComponent } from './admin/page-group/page-group.component';
import { PageComponent } from './admin/page/page.component';
import { MenuComponent } from './admin/menu/menu.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleMenuComponent } from './admin/role-menu/role-menu.component';
import { StaffLoginRoleComponent } from './admin/staff-login-role/staff-login-role.component';
import { HeadComponent } from './admin/head/head.component';
import { PupilTypeComponent } from './admin/pupil-type/pupil-type.component';
import { AdmissionListComponent } from './admin/admission-list/admission-list.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
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


const routes: Routes = [
  { path: '', redirectTo: "/admin-login", pathMatch: 'full' },
  { path: 'admin-login', component: AdminLoginComponent },
  {
    path: 'admin', component: AdminMasterComponent, children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'staffLogin', component: StaffLoginComponent },
      { path: 'page-group', component: PageGroupComponent },
      { path: 'page', component: PageComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'role', component: RoleComponent },
      { path: 'role-menu', component: RoleMenuComponent },
      { path: 'staff-login-role', component: StaffLoginRoleComponent },
      { path: 'head', component: HeadComponent },
      { path: 'pupil-type', component: PupilTypeComponent },
      { path: 'admission-list', component: AdmissionListComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'rack', component: RackComponent },
      { path: 'class', component: ClassComponent },
      { path: 'book-type', component: BookTypeComponent },
      { path: 'book', component: BookComponent },
      { path: 'book-subject', component: BookSubjectComponent },
      { path: 'book-class', component: BookClassComponent },
      { path: 'supplier', component: SupplierComponent },
      { path: 'purchase', component: PurchaseComponent },
      { path: 'news-paper', component: NewsPaperComponent },
      { path: 'purchase-news-paper', component: PurchaseNewsPaperComponent },
      { path: 'language', component: LanguageComponent },
      { path: 'magazine', component: MagazineComponent },
      { path: 'purchase-magazine', component: PurchaseMagazineComponent },
      { path: 'book-issue', component: BookIssueComponent },
      { path: 'book-fine', component: BookFineComponent },
    ]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
