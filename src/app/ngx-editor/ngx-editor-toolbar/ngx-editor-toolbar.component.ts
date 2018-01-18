import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as Utils from '../common/utils/ngx-editor.utils';

@Component({
  selector: 'app-ngx-editor-toolbar',
  templateUrl: './ngx-editor-toolbar.component.html',
  styleUrls: ['./ngx-editor-toolbar.component.scss']
})

export class NgxEditorToolbarComponent {

  @Input() config: any;
  @Output() execute: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  /**
   * enable or diable toolbar based on configuration
   *
   * @param value toolbar buttons
   */
  canEnableToolbarOptions(value): boolean {
    return Utils.canEnableToolbarOptions(value, this.config['toolbar']);
  }

  /**
   * triggers command from the toolbar to be executed
   *
   * @param command command to be executed
   */
  triggerCommand(command: string): void {
    this.execute.emit(command);
  }

}
