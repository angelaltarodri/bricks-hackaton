import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface Task {
  name: string;
  completed: boolean;
  color: any;
  subtasks?: Task[];
}

@Component({
  selector: 'app-aprobar-dialog',
  templateUrl: './aprobar-dialog.component.html',
  styleUrls: ['./aprobar-dialog.component.scss'],
})
export class AprobarDialogComponent {
  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      { name: 'Primary', completed: false, color: 'primary' },
      { name: 'Accent', completed: false, color: 'accent' },
      { name: 'Warn', completed: false, color: 'warn' },
    ],
  };

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t: any) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t: any) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t: any) => (t.completed = completed));
  }

  // LO DEMAS

  aceptoForm: FormGroup = this.fb.group({
    aceptoValue: ['ACEPTO', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<AprobarDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
      ok: boolean;
    },
    private fb: FormBuilder
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  isAccepted() {
    if (this.aceptoForm.get('aceptoValue')!.value === 'ACEPTO') {
      this.dialogRef.close('ACEPTO');
    } else {
      console.log(2);
      this.aceptoForm.get('aceptoValue')!.setErrors({ error: 'invalid data' });
    }
  }
}
