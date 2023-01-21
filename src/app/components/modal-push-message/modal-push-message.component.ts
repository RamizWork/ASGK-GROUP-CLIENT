import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

import {UsersDataService} from "../../services/users-data.service";
import {PushMessageInterface} from "../../interfaces/pushMessage.interface";

@Component({
  selector: 'app-modal-push-message',
  templateUrl: './modal-push-message.component.html',
  styleUrls: ['./modal-push-message.component.scss']
})
export class ModalPushMessageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  pushMessageSub$: Subscription | undefined;

  constructor(
    public dialogRef: MatDialogRef<ModalPushMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private userDataService: UsersDataService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      message: new FormControl('', Validators.required)
    });
  }

  modalClose(): void {
    this.dialogRef.close();
  }

  submit() {
    const pushMessage: PushMessageInterface = {
      user_id: this.data.toString(),
      push_message: this.form.value.message
    }

    if (pushMessage.push_message) {
      this.pushMessageSub$ = this.userDataService.sendPushMessage(pushMessage).subscribe(
        () => {
          this.toastr.success('Push message send to user');
          this.dialogRef.close();
        },
        (error) => {
          this.toastr.error('Internal Server Error');
        }
      );
    }
  }

  ngOnDestroy() {
    this.pushMessageSub$?.unsubscribe();
  }
}
