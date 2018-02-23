import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AuthGuard, ChatRoomGuard } from './guard/authGuard';
import { BooksComponent } from './books/books.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookComponent } from './books/book/book.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '', component: AuthenticationComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },
  {
    path: 'book', component: BooksComponent, canActivate: [AuthGuard], children: [
      {
        path: '', component: BookListComponent, children: [
          { path: ':id', component: BookComponent },
        ]
      },
    ]
  },
  { path: 'chat-room', component: ChatRoomComponent, canActivate: [AuthGuard], canDeactivate: [ChatRoomGuard] },
  { path: '**', component: LoginComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule { }
