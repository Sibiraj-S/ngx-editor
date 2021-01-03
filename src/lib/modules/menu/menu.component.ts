import {
  Component, Input, OnDestroy,
  OnInit, TemplateRef, ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Toolbar, ToolbarItem } from '../../types';

import { MenuService } from './menu.service';
import Editor from '../../Editor';

const DEFAULT_TOOLBAR: Toolbar = [
  ['bold', 'italic'],
  ['code', 'blockquote'],
  ['underline', 'strike'],
  ['ordered_list', 'bullet_list'],
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['link', 'image'],
  ['text_color', 'background_color'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
];

const DEFAULT_COLOR_PRESETS = [
  '#b60205',
  '#d93f0b',
  '#fbca04',
  '#0e8a16',
  '#006b75',
  '#1d76db',
  '#0052cc',
  '#5319e7',
  '#e99695',
  '#f9d0c4',
  '#fef2c0',
  '#c2e0c6',
  '#bfdadc',
  '#c5def5',
  '#bfd4f2',
  '#d4c5f9'
];

@Component({
  selector: 'ngx-editor-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MenuComponent implements OnInit, OnDestroy {
  @Input() toolbar: any = DEFAULT_TOOLBAR;
  @Input() colorPresets: string[] = DEFAULT_COLOR_PRESETS;
  @Input() disabled = false;
  @Input() editor: Editor;
  @Input() customMenuRef: TemplateRef<any> = null;

  private updateSubscription: Subscription;

  simpleCommands = [
    'bold', 'italic',
    'underline', 'strike',
    'code', 'blockquote',
    'ordered_list', 'bullet_list',
    'align_left', 'align_center', 'align_right', 'align_justify'
  ];

  iconContainerClass = ['NgxEditor__MenuItem', 'NgxEditor__MenuItem--Icon'];
  dropdownContainerClass = ['NgxEditor__Dropdown'];
  seperatorClass = ['NgxEditor__Seperator'];

  constructor(private menuService: MenuService) { }

  get presets(): string[][] {
    const col = 8;
    const colors: string[][] = [];

    this.colorPresets.forEach((color, index) => {
      const row = Math.floor(index / col);

      if (!colors[row]) {
        colors.push([]);
      }

      colors[row].push(color);
    });

    return colors;
  }

  isDropDown(item: ToolbarItem): boolean {
    if (typeof item === 'object') {
      return true;
    }

    return false;
  }

  ngOnInit(): void {
    if (!this.editor) {
      throw new Error('NgxEditor: Required editor instance');
    }

    this.menuService.view = this.editor.view;

    this.updateSubscription = this.editor.onUpdate.subscribe(() => {
      this.menuService.plugin.update.next(this.editor.view);
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
  }
}
