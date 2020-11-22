import { toggleMark } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import { EditorState } from 'prosemirror-state';
import { MarkType, NodeType } from 'prosemirror-model';

import { isNodeActive, isMarkActive, isListItem } from 'ngx-editor/helpers';
import { toggleList, toggleBlockType, toggleWrap } from 'ngx-editor/commands';

import { MenuItemMeta } from '../meta';
import {
  MenuItemSpec,
  Command,
  MenuItemViewRender,
  MenuItemDOM,
  DOMUpdateOptions
} from '../../types';

export const MENU_ITEM_CLASSNAME = 'NgxEditor__MenuItem';
export const MENU_ITEM_ICON_CLASSNAME = 'NgxEditor__MenuItem--Icon';
export const MENU_ITEM_ICON_CONTAINER_CLASSNAME = 'NgxEditor__MenuItem--IconContainer';
export const ACTIVE_MENU_ITEM_CLASSNAME = `${MENU_ITEM_CLASSNAME}--Active`;
export const DISABLED_CLASSNAME = 'NgxEditor--Disabled';

export const getMenuItemDom = (spec: MenuItemSpec): MenuItemDOM => {
  const div = document.createElement('div');

  let toggleIcon = null;

  if (spec.classNames) {
    spec.classNames.forEach(className => {
      div.classList.add(className);
    });
  }

  if (spec.attrs) {
    Object.entries(spec.attrs).forEach(obj => {
      div.setAttribute(obj[0], obj[1]);
    });
  }

  if (spec.icon) {
    const icon = document.createElement('div');
    icon.className = MENU_ITEM_ICON_CONTAINER_CLASSNAME;

    icon.innerHTML = spec.icon.default;

    toggleIcon = (toggle: boolean): void => {
      icon.innerHTML = toggle ? spec.icon.alt : spec.icon.default;
    };

    div.appendChild(icon);
  }

  if (spec.textContent) {
    div.textContent = spec.textContent;
  }

  const update = (options: DOMUpdateOptions) => {
    div.classList.toggle(spec.activeClass, options.active);
    div.classList.toggle(spec.disabledClass, options.disabled);
  };

  return {
    dom: div,
    update,
    toggleIcon
  };
};

class MenuItem {
  private menuItem: MenuItemMeta;
  private editorView: EditorView;
  private spec: MenuItemSpec;

  constructor(menuItem: MenuItemMeta, editorView: EditorView, spec: MenuItemSpec) {
    this.menuItem = menuItem;
    this.editorView = editorView;
    this.spec = spec;
  }

  render(): MenuItemViewRender {
    const { dom, update: updateDom } = getMenuItemDom(this.spec);

    const { schema } = this.editorView.state;
    const { command } = this.setupCommandListeners(dom);

    const update = (state: EditorState): void => {
      const menuItem = this.menuItem;
      let isActive = false;

      const canExecute = command(this.editorView.state, null);

      if (menuItem.type === 'mark') {
        const type: MarkType = schema.marks[menuItem.key];
        isActive = isMarkActive(state, type);
      }

      if (menuItem.type === 'node') {
        const type: NodeType = schema.nodes[menuItem.key];
        isActive = isNodeActive(state, type, menuItem.attrs);
      }

      updateDom({
        active: isActive,
        disabled: !canExecute
      });
    };

    return {
      dom,
      update
    };
  }

  private setupCommandListeners(dom: HTMLElement): { command: Command } {
    const { schema } = this.editorView.state;

    let command: Command;

    if (this.menuItem.type === 'mark') {
      command = toggleMark(schema.marks[this.menuItem.key]);
    }

    if (this.menuItem.type === 'node') {
      const type = schema.nodes[this.menuItem.key];

      if (isListItem(type, schema)) {
        command = toggleList(type, schema.nodes.list_item);
      }

      if (type === schema.nodes.heading) {
        command = toggleBlockType(type, schema.nodes.paragraph, { level: this.menuItem.attrs.level });
      }

      if (type === schema.nodes.blockquote) {
        command = toggleWrap(type);
      }
    }

    dom.addEventListener('mousedown', (e: MouseEvent) => {
      e.preventDefault();

      // don't execute if not left click
      if (e.buttons !== 1) {
        return;
      }

      // execute command
      command(this.editorView.state, this.editorView.dispatch);
    });

    return { command };
  }
}

export default MenuItem;
