import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective} from 'ng2-charts';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';

// Component imports
import { LoginComponentComponent } from './component/login-component/login-component.component';
import { RegisterComponentComponent } from './component/register-component/register-component.component';
import { HomeComponentComponent } from './component/home-component/home-component.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FeedComponent } from './component/feed/feed.component';
import { PostComponent } from './component/post/post.component';
import { StoriesComponent } from './component/stories/stories.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MenuComponent } from './component/menu/menu.component';
import { AddPostComponent } from './component/add-post/add-post.component';
import { AdminloginComponent } from './component/admin/adminlogin/adminlogin.component';
import { AdmindashboardComponent } from './component/admin/admindashboard/admindashboard.component';
import { MenuSidebarComponent } from './component/admin/menu-sidebar/menu-sidebar.component';
import { UsersListComponent } from './component/admin/users-list/users-list.component';
import { PostsListComponent } from './component/admin/posts-list/posts-list.component';
import { PostsDetailsComponent } from './component/admin/posts-details/posts-details.component';
import { AddCommentComponent } from './component/add-comment/add-comment.component';
import { ShowallCommentsComponent } from './component/showall-comments/showall-comments.component';
import { ShowallLikesComponent } from './component/showall-likes/showall-likes.component';
import { ChatComponent } from './component/chat/chat.component';
import { OtpComponent } from './component/auth/otp/otp.component';
import { OtpInputDirective } from './directive/otp-input.directive';
import { UserCardComponent } from './component/user-card/user-card.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { VideocallComponent } from './component/videocall/videocall.component';
import { NotificationComponent } from './component/notification/notification.component';
import { IconSidebarMenuComponent } from './component/icon-sidebar-menu/icon-sidebar-menu.component';
import { SearchComponent } from './component/search/search.component';
import { EditPostModalComponent } from './component/edit-post-modal/edit-post-modal.component';
import { FollowersComponent } from './component/modal/followers/followers.component';
import { FollowingComponent } from './component/modal/following/following.component';
import { LiveStreamComponent } from './component/live-stream/live-stream.component';
import { TestInterfaceComponent } from './component/mock-test/test-interface/test-interface.component';
import { TestResultComponent } from './component/mock-test/test-result/test-result.component';
import { QuestonsComponent } from './component/mock-test/questons/questons.component';
import { UserEditModalComponent } from './component/modal/user-edit-modal/user-edit-modal.component';
import { ConfirmDialogComponent } from './component/modal/confirm-dialog/confirm-dialog.component';
import { TalkToMeComponent } from './component/talk-to-me/talk-to-me.component';
import { TrainerProfileFormComponent } from './component/trainer/trainer-profile-form/trainer-profile-form.component';
import { TrainerDashboardComponent } from './component/trainer/trainer-dashboard/trainer-dashboard.component';
import { AddTimeSlotComponent } from './component/modal/add-time-slot/add-time-slot.component';
import { ListTrainerComponent } from './component/trainer/list-trainer/list-trainer.component';
import { TrainerProfileComponent } from './component/trainer/trainer-profile/trainer-profile.component';
import { ProgressComponent } from './component/progress/progress.component';
import { MyAppointmentsComponent } from './component/my-appointments/my-appointments.component';
import { ChartModule } from 'angular-highcharts'; 
import { AuthInterceptor } from './auth.interceptor';
import { FluencyTestComponent } from './component/modal/fluency-test/fluency-test.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    RegisterComponentComponent,
    HomeComponentComponent,
    NavbarComponent,
    FeedComponent,
    PostComponent,
    StoriesComponent,
    ProfileComponent,
    MenuComponent,
    AddPostComponent,
    AdminloginComponent,
    AdmindashboardComponent,
    MenuSidebarComponent,
    UsersListComponent,
    PostsListComponent,
    PostsDetailsComponent,
    AddCommentComponent,
    ShowallCommentsComponent,
    ShowallLikesComponent,
    ChatComponent,
    OtpComponent,
    OtpInputDirective,
    UserCardComponent,
    UserListComponent,
    VideocallComponent,
    NotificationComponent,
    IconSidebarMenuComponent,
    SearchComponent,
    EditPostModalComponent,
    FollowersComponent,
    FollowingComponent,
    LiveStreamComponent,
    TestInterfaceComponent,
    TestResultComponent,
    QuestonsComponent,
    UserEditModalComponent,
    ConfirmDialogComponent,
    TalkToMeComponent,
    TrainerProfileFormComponent,
    TrainerDashboardComponent,
    AddTimeSlotComponent,
    ListTrainerComponent,
    TrainerProfileComponent,
    ProgressComponent,
    MyAppointmentsComponent,
    FluencyTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BaseChartDirective,
    FilterPipeModule,
    SlickCarouselModule,
    CarouselModule,
    NgxPaginationModule,
    ChartModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
