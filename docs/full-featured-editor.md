# Full featured editor

Use the following config to created a full featured editor

### plugin.ts

```ts
import { undo, redo, history } from 'prosemirror-history';
import {
  splitListItem,
  liftListItem,
  sinkListItem,
} from 'prosemirror-schema-list';
import { keymap } from 'prosemirror-keymap';
import { toggleMark, baseKeymap } from 'prosemirror-commands';
import { Plugin } from 'prosemirror-state';

import { placeholder, image } from 'ngx-editor/plugins';

import { buildInputRules } from './input-rules';
import schema from '../schema';

const isMacOs = /Mac/.test(navigator.platform);

export type KeyMap = { [key: string]: any };

const getHistoryKeyMap = (): KeyMap => {
  const historyMap: KeyMap = {};

  historyMap['Mod-z'] = undo;

  if (isMacOs) {
    historyMap['Shift-Mod-z'] = redo;
  } else {
    historyMap['Mod-y'] = redo;
  }

  return historyMap;
};

const getListKeyMap = (): KeyMap => {
  const listMap: KeyMap = {};

  listMap.Enter = splitListItem(schema.nodes.list_item);
  listMap['Mod-['] = liftListItem(schema.nodes.list_item);
  listMap['Mod-]'] = sinkListItem(schema.nodes.list_item);
  listMap.Tab = sinkListItem(schema.nodes.list_item);

  return listMap;
};

const getPlugins = (): Plugin[] => {
  const historyKeyMap = getHistoryKeyMap();
  const listKeyMap = getListKeyMap();

  const plugins = [
    history(),
    keymap({
      'Mod-b': toggleMark(schema.marks.strong),
      'Mod-i': toggleMark(schema.marks.em),
      'Mod-`': toggleMark(schema.marks.code),
    }),
    keymap(historyKeyMap),
    keymap(listKeyMap),
    keymap(baseKeymap),
    buildInputRules(schema),
    placeholder('Type Something here...'),
    image({
      resize: true,
    }),
  ];

  return plugins;
};

export default getPlugins();
```

### app.module.ts

```ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxEditorModule, schema } from 'ngx-editor';

import plugins from './plugins';

@NgModule({
  imports: [
    FormsModule,
    NgxEditorModule.forRoot({
      schema,
      plugins,
      menu: [
        ['bold', 'italic'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
      ],
      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // pupups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },
    }),
  ],
})
export class AppModule {}
```
