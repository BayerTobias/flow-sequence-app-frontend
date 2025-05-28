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
  public confirmDeleteIndex: number | null = null;

  public nameError: boolean = false;
  public sequenceCountError = false;

  public newFlowSequence: FlowSequence = new FlowSequence();

  @Output() closeOverlayEvent = new EventEmitter();

  @ViewChildren('nameInput') nameInputFields: QueryList<ElementRef> | null =
    null;

  /**
   * Loads an existing sequence into the form for editing.
   */
  editSequence(sequence: FlowSequence) {
    this.newFlowSequence = sequence;
    this.sequenceName = sequence.name;
    this.sequenceDescription = sequence.description;
  }

  /**
   * Deletes a sequence by its index.
   */
  deleteSequence(index: number) {
    const sequences = this.settingsService.appSettings.customSequences;
    sequences.splice(index, 1);
    this.confirmDeleteIndex = null;
    this.settingsService.saveSettings();
  }

  /**
   * Toggles whether the countdown is shown in the browser tab.
   */
  toggleShowCountdown() {
    this.settingsService.appSettings.countdownInBrowserTab =
      !this.settingsService.appSettings.countdownInBrowserTab;

    this.settingsService.saveSettings();
  }

  /**
   * Activates the selected sequence and navigates to the timer view.
   */
  chooseSequence(index: number) {
    const chosenSequence =
      this.settingsService.appSettings.customSequences[index];
    this.flowSequenceService.activeFlowSequence.set(chosenSequence);
    this.flowSequenceService.resetTimer();
    this.settingsService.settingsOpen = false;

    this.router.navigate(['flowsequencetimer'], {
      queryParams: { id: chosenSequence.id },
    });
  }

  /**
   * Opens the sequence in preview mode.
   */
  viewSequence(sequence: FlowSequence) {
    this.settingsService.previewOpen = true;
    this.flowSequenceService.previewSequence = sequence;
  }

  /**
   * Reorders saved sequences after a drag-and-drop operation.
   */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.settingsService.appSettings.customSequences,
      event.previousIndex,
      event.currentIndex
    );
    this.settingsService.saveSettings();
  }

  /**
   * Reorders steps of the currently edited sequence.
   */
  dropCreateSequence(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.newFlowSequence.steps,
      event.previousIndex,
      event.currentIndex
    );
  }

  /**
   * Adds a new flow time step to the current sequence.
   */
  addFlowTime() {
    const step = new FlowTime({
      name: '',
      type: 'flowTime',
      position: 0,
      complete: false,
      duration: this.flowTimeDuration,
    });
    this.newFlowSequence.addStep(step);
    this.assignPosition();

    setTimeout(() => {
      this.focusLastInput();
    }, 1);
  }

  /**
   * Adds a new short break step to the current sequence.
   */
  addShortBreak() {
    const step = new ShortBreak({
      name: 'Short Break',
      type: 'shortBreak',
      position: 0,
      complete: false,
      duration: this.shortBreakDuration,
    });
    this.newFlowSequence.addStep(step);
    this.assignPosition();
  }

  /**
   * Adds a new long break step to the current sequence.
   */
  addLongBreak() {
    const step = new LongBreak({
      name: 'Long Break',
      type: 'longBreak',
      position: 0,
      complete: false,
      duration: this.longBreakDuration,
    });
    this.newFlowSequence.addStep(step);
    this.assignPosition();
  }

  /**
   * Focuses the name input of the last added step.
   */
  focusLastInput() {
    if (this.nameInputFields && this.nameInputFields.length > 0) {
      const lastInput = this.nameInputFields.last;

      if (lastInput) lastInput.nativeElement.focus();
    }
  }

  /**
   * Updates the name of a step based on user input.
   */
  renameStep(step: Step, event: Event) {
    const target = event.target as HTMLInputElement;

    if (target) {
      step.name = target.value;
    }
  }

  /**
   * Updates the duration of a step based on user input.
   */
  editStepDuration(step: Step, event: Event) {
    const target = event.target as HTMLInputElement;

    if (target) {
      step.duration = +target.value;
    }
  }

  /**
   * Copies an existing step and appends it to the sequence.
   */
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

  /**
   * Deletes a step by index from the sequence.
   */
  deleteStep(index: number) {
    this.newFlowSequence.steps.splice(index, 1);
  }

  /**
   * Assigns correct position indexes to all steps in the sequence.
   */
  assignPosition() {
    this.newFlowSequence.steps.forEach((step, index) => {
      step.position = index;
    });
  }

  /**
   * Validates and saves the current sequence.
   */
  saveNewFlowSequence() {
    if (this.formIsValid()) {
      this.handleFormIsValid();
    } else {
      this.handleError();
    }
  }

  /**
   * Checks whether the form is valid and the user has not exceeded their limit.
   */
  formIsValid() {
    const maxSequences = this.settingsService.appSettings.premiumUser ? 15 : 5;

    return (
      this.sequenceName &&
      this.sequenceDescription &&
      this.settingsService.appSettings.customSequences.length < maxSequences
    );
  }

  /**
   * Handles logic after the form is validated.
   */
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

  /**
   * Applies the edited sequence to the settings.
   */
  handleEditSequence() {
    const index = this.settingsService.appSettings.customSequences.findIndex(
      (seq) => seq.id === this.newFlowSequence.id
    );

    if (index !== -1) {
      this.settingsService.appSettings.customSequences[index] =
        this.newFlowSequence;
    }
  }

  /**
   * Resets the form and all temporary values.
   */
  resetForm() {
    this.sequenceName = '';
    this.sequenceDescription = '';
    this.newFlowSequence = new FlowSequence();
    this.nameError = false;
    this.sequenceCountError = false;
  }

  /**
   * Handles validation errors by focusing the appropriate input or showing errors.
   */
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
