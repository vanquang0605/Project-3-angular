import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatRoomService } from './chat-room.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../authentication/user.model';
import 'rxjs/operator/concatAll';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, AfterViewChecked {
  @ViewChild('scroll') private feedContainer: ElementRef;
  message;
  currentUser;
  chatForm: FormGroup;
  _isTyping = false;
  _sbTyping = '';

  constructor(private chatRoomService: ChatRoomService,
    private formBuider: FormBuilder,
    private firebaseAuth: AngularFireAuth) {
    this.currentUser = this.firebaseAuth.auth.currentUser;
    this.createChatForm();
    this.chatRoomService.getIsTyping()
      .subscribe((isTyping) => {
        this._isTyping = isTyping.isTyping;
        this._sbTyping = isTyping.user;
      });
  }

  ngOnInit() {
    const inputChange = this.chatForm.valueChanges;
    let timeout;
    inputChange
      .subscribe(() => {
        clearTimeout(timeout);
        this.chatRoomService.setIsTyping(true);
        timeout = setTimeout(() => {
          this.chatRoomService.setIsTyping(false);
        }, 500);
      });
    this.chatRoomService.getMessage().valueChanges()
      .subscribe((messageObj) => {
        this.message = messageObj;
      });
  }

  onNewMessage(message) {
    this.chatRoomService.newMessage(message);
    this.chatForm.reset();
  }

  createChatForm() {
    this.chatForm = this.formBuider.group({
      user: [''],
      time: [''],
      value: [''],
    });
  }

  canDeactive() {
    if (this.chatForm.value.value) {
      return false;
    } else {
      return true;
    }
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
