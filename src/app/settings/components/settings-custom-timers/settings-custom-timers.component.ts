import {
  Component,
  ElementRef,
  inject,
  QueryList,
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

  public flowTimeDuration: number = 30;
  public shortBreakDuration: number = 5;
  public longBreakDuration: number = 15;
  public sequenceName: string = '';
  public sequenceDescription: string = '';

  public newFlowSequence: FlowSequence = new FlowSequence();

  @ViewChildren('nameInput') nameInputFields: QueryList<ElementRef> | null =
    null;

  editSequence() {
    console.log('edit');
  }

  toggleShowCountdown() {
    this.settingsService.showCountdownInBrowserTab =
      !this.settingsService.showCountdownInBrowserTab;
  }

  chooseSequence(index: number) {
    this.flowSequenceService.activeFlowSequence =
      this.settingsService.appSettings.customSequences[index];

    // close overlay
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.settingsService.appSettings.customSequences,
      event.previousIndex,
      event.currentIndex
    );
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
    console.log(this.newFlowSequence);

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
    if (this.sequenceName && this.sequenceDescription) {
      this.newFlowSequence.name = this.sequenceName;
      this.newFlowSequence.description = this.sequenceDescription;
      this.settingsService.appSettings.customSequences.push(
        this.newFlowSequence
      );
      this.settingsService.saveSettings();
      this.sequenceName = '';
      this.sequenceDescription = '';
      this.newFlowSequence = new FlowSequence();
    }
  }
}
