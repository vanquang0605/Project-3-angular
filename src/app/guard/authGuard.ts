import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../authentication/auth.service';
import { ChatRoomComponent } from '../chat-room/chat-room.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url;
    return this.checkLogin();
  }

  checkLogin() {
    if (this.authService.user) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}

export class ChatRoomGuard implements CanDeactivate<ChatRoomComponent> {
  canDeactivate(component: ChatRoomComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    console.log('ChatRoomGuard');
    return component.canDeactive() || window.confirm('Do you want to get out page ?');
  }

}
