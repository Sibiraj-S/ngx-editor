import {
  Component, ElementRef, HostBinding,
  HostListener, OnDestroy, Input
} from '@angular/core';
import { EditorView } from 'prosemirror-view';
import { Subscription } from 'rxjs';

import Icon from '../../../icons';
import { NgxEditorService } from '../../../editor.service';
import { MenuService } from '../menu.service';
import { TextColor, TextBackgroundColor } from '../MenuCommands';

type Command = typeof TextColor | typeof TextBackgroundColor;

@Component({
  selector: 'ngx-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss']
})
export class ColorPickerComponent implements OnDestroy {
  @Input() presets: string[][];

  constructor(
    private el: ElementRef,
    private menuService: MenuService,
    private ngxeService: NgxEditorService
  ) {
    this.editorView = this.menuService.view;

    this.pluginUpdateSubscription = this.menuService.plugin.update.subscribe((view: EditorView) => {
      this.update(view);
    });
  }

  @HostBinding('class.NgxEditor__MenuItem--Active') get valid(): boolean {
    return this.isActive || this.showPopup;
  }

  @HostBinding('class.NgxEditor--Disabled') get disabled(): boolean {
    return !this.canExecute;
  }

  get title(): string {
    return this.getLabel(this.type === 'text_color' ? 'text_color' : 'background_color');
  }

  get icon(): string {
    return Icon.get(this.type === 'text_color' ? 'text_color' : 'color_fill');
  }

  private get command(): Command {
    return this.type === 'text_color' ? TextColor : TextBackgroundColor;
  }

  private pluginUpdateSubscription: Subscription;
  private editorView: EditorView;
  showPopup = false;
  isActive = false;
  activeColors = [];
  private canExecute = true;

  @Input() type: string;

  getContrastYIQ(hexcolor: string): string {
    hexcolor = hexcolor.replace('#', '');
    const r = parseInt(hexcolor.substr(0, 2), 16);
    const g = parseInt(hexcolor.substr(2, 2), 16);
    const b = parseInt(hexcolor.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  }

  @HostListener('document:mousedown', ['$event']) onDocumentClick(e: MouseEvent): void {
    if (!this.el.nativeElement.contains(e.target) && this.showPopup) {
      this.hidePopup();
    }
  }

  private hidePopup(): void {
    this.showPopup = false;
  }

  togglePopup(e: MouseEvent): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    this.showPopup = !this.showPopup;
  }

  remove(e: MouseEvent): void {
    e.preventDefault();
    const { state, dispatch } = this.editorView;

    this.command.remove(state, dispatch);
    this.hidePopup();
  }

  onColorSelect(e: MouseEvent, color: string): void {
    e.preventDefault();

    if (e.button !== 0) {
      return;
    }

    const { state, dispatch } = this.editorView;

    const attrs: Record<string, any> = {};

    if (this.type === 'text_color') {
      attrs.color = color;
    } else {
      attrs.backgroundColor = color;
    }

    this.command.execute(attrs)(state, dispatch);

    if (!this.editorView.hasFocus()) {
      this.editorView.focus();
    }

    this.hidePopup();
  }

  private update = (view: EditorView) => {
    const { state } = view;
    this.canExecute = this.command.execute(null)(state);
    this.isActive = this.command.isActive(state);
    this.activeColors = [];

    if (this.isActive) {
      this.activeColors = this.command.getActiveColors(state);
    }
  }

  getLabel(key: string): string {
    return this.ngxeService.locals.get(key);
  }

  ngOnDestroy(): void {
    this.pluginUpdateSubscription.unsubscribe();
  }
}
