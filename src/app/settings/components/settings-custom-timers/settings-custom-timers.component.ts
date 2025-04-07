import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SimpleSettingsButtonComponent } from '../../../shared/components/buttons/simple-settings-button/simple-settings-button.component';
import { SettingsServiceService } from '../../../shared/services/settings-service.service';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlowSequence } from '../../../models/flow-sequence.model';
import { FlowTime } from '../../../models/flow-time.model';
import { ShortBreak } from '../../../models/short-break.model';
import { LongBreak } from '../../../models/long-break.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Step } from '../../../models/step.model';
import { FlowSequenceServiceService } from '../../../shared/services/flow-sequence-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-custom-timers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SimpleSettingsButtonComponent,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './settings-custom-timers.component.html',
  styleUrl: './settings-custom-timers.component.scss',
})
export class SettingsCustomTimersComponent {
  public settingsService = inject(SettingsServiceService);
  public flowSequenceService = inject(FlowSequenceServiceService);
  private router = inject(Router);

  @ViewChild('sequenceNameInput') sequenceNameInput!: ElementRef;
  @ViewChild('sequenceDescriptionInput') sequenceDescriptionInput!: ElementRef;

  public flowTimeDuration: number = 30;
  public shortBreakDuration: number = 5;
  public longBreakDuration: number = 15;
  public sequenceName: string = '';
  public sequenceDescription: string = '';

  public nameError: boolean = false;
  public sequenceCountError = false;

  public newFlowSequence: FlowSequence = new FlowSequence();

  @Output() closeOverlayEvent = new EventEmitter();

  @ViewChildren('nameInput') nameInputFields: QueryList<ElementRef> | null =
    null;

  editSequence(sequence: FlowSequence) {
    this.newFlowSequence = sequence;
    this.sequenceName = sequence.name;
    this.sequenceDescription = sequence.description;
  }

  deleteSequence(index: number) {
    const sequences = this.settingsService.appSettings.customSequences;
    sequences.splice(index, 1);
    this.settingsService.saveSettings();
  }

  toggleShowCountdown() {
    this.settingsService.appSettings.countdownInBrowserTab =
      !this.settingsService.appSettings.countdownInBrowserTab;

    this.settingsService.saveSettings();
  }

  chooseSequence(index: number) {
    const chosenSequece =
      this.settingsService.appSettings.customSequences[index];
    this.flowSequenceService.activeFlowSequence.set(chosenSequece);

    this.flowSequenceService.resetTimer();
    this.settingsService.settingsOpen = false;
    // this.closeOverlayEvent.emit();
    this.router.navigate(['flowsequencetimer'], {
      queryParams: { id: chosenSequece.id },
    });
  }

  viewSequence(sequence: FlowSequence) {
    console.log(sequence);
    this.settingsService.previewOpen = true;
    this.flowSequenceService.previewSequence = sequence;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.settingsService.appSettings.customSequences,
      event.previousIndex,
      event.currentIndex
    );
    this.settingsService.saveSettings();
  }

  dropCreateSequence(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.newFlowSequence.steps,
      event.previousIndex,
      event.currentIndex
    );
  }

  addFlowTime() {
    const step = new FlowTime({
      name: '',
      type: 'flowTime',
      position: 0,
      complete: false,
      duration: this.flowTimeDuration,
    });
    this.newFlowSequence.addStep(step);
    this.asignPostion();

    setTimeout(() => {
      this.focusLastImput();
    }, 1);
  }

  addShortBreak() {
    const step = new ShortBreak({
      name: 'Short Break',
      type: 'shortBreak',
      position: 0,
      complete: false,
      duration: this.shortBreakDuration,
    });
    this.newFlowSequence.addStep(step);
    this.asignPostion();
  }

  addLongBreak() {
    const step = new LongBreak({
      name: 'Long Break',
      type: 'longBreak',
      position: 0,
      complete: false,
      duration: this.longBreakDuration,
    });
    this.newFlowSequence.addStep(step);
    this.asignPostion();
  }

  focusLastImput() {
    if (this.nameInputFields && this.nameInputFields.length > 0) {
      const lastInput = this.nameInputFields.last;

      if (lastInput) lastInput.nativeElement.focus();
    }
  }

  renameStep(step: Step, event: Event) {
    const target = event.target as HTMLInputElement;

    if (target) {
      step.name = target.value;
    }
  }

  editStepDuration(step: Step, event: Event) {
    const target = event.target as HTMLInputElement;

    if (target) {
      step.duration = +target.value;
    }
  }

  copyStep(step: Step) {
    let copiedStep: FlowTime | ShortBreak | LongBreak | null = null;

    if (step instanceof FlowTime) {
      copiedStep = new FlowTime({
        name: step.name,
        duration: step.duration,
        position: step.position,
        complete: step.complete,
        type: step.type,
      });
    } else if (step instanceof ShortBreak) {
      copiedStep = new ShortBreak({
        name: step.name,
        duration: step.duration,
        position: step.position,
        complete: step.complete,
        type: step.type,
      });
    } else if (step instanceof LongBreak) {
      copiedStep = new LongBreak({
        name: step.name,
        duration: step.duration,
        position: step.position,
        complete: step.complete,
        type: step.type,
      });
    }

    if (copiedStep) {
      this.newFlowSequence.steps.push(copiedStep);
    }
  }

  deleteStep(index: number) {
    this.newFlowSequence.steps.splice(index, 1);
  }

  asignPostion() {
    this.newFlowSequence.steps.forEach((step, index) => {
      step.position = index;
    });
  }

  saveNewFlowSequence() {
    if (this.formIsValid()) {
      this.handleFormIsValid();
    } else {
      this.handleError();
    }
  }

  formIsValid() {
    const maxSequences = this.settingsService.appSettings.premiumUser ? 15 : 5;

    return (
      this.sequenceName &&
      this.sequenceDescription &&
      this.settingsService.appSettings.customSequences.length < maxSequences
    );
  }

  handleFormIsValid() {
    this.newFlowSequence.name = this.sequenceName;
    this.newFlowSequence.description = this.sequenceDescription;

    if (this.newFlowSequence.id) {
      this.handleEditSequence();
    } else {
      this.newFlowSequence.id = Date.now();
      this.settingsService.appSettings.customSequences.push(
        this.newFlowSequence
      );
    }

    this.settingsService.saveSettings();
    this.resetForm();
  }

  handleEditSequence() {
    const index = this.settingsService.appSettings.customSequences.findIndex(
      (seq) => seq.id === this.newFlowSequence.id
    );

    if (index !== -1) {
      this.settingsService.appSettings.customSequences[index] =
        this.newFlowSequence;
    }
  }

  resetForm() {
    this.sequenceName = '';
    this.sequenceDescription = '';
    this.newFlowSequence = new FlowSequence();
    this.nameError = false;
    this.sequenceCountError = false;
  }

  handleError() {
    if (!this.sequenceName) {
      this.nameError = true;
      this.sequenceNameInput.nativeElement.focus();
    } else if (!this.sequenceDescription) {
      this.nameError = true;
      this.sequenceDescriptionInput.nativeElement.focus();
    } else {
      this.sequenceCountError = true;
    }
  }
}
