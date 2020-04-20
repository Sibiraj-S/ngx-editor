# NgxEditor

<p align="center">
  <a href="https://github.com/sibiraj-s/ngx-editor">
   <img src="https://raw.githubusercontent.com/sibiraj-s/ngx-editor/master/src/assets/icons/ngx-editor.png" alt="ngxEditor">
  </a>
</p>
<p align="center">A Simple WYSIWYG Editor for Angular 6 Applications.</p>
<p align="center">
  <a href="https://travis-ci.org/sibiraj-s/ngx-editor">
    <img alt="Build Status" src="https://travis-ci.org/sibiraj-s/ngx-editor.svg?branch=master">
  </a>
  <a href="https://www.npmjs.com/package/ngx-editor">
    <img alt="npm version" src="https://img.shields.io/npm/v/ngx-editor.svg">
  </a>
  <a href="https://www.npmjs.com/package/ngx-editor">
    <img alt="npm" src="https://img.shields.io/npm/dm/ngx-editor.svg">
  </a>
  <a href="https://github.com/sibiraj-s/ngx-editor/blob/master/LICENSE">
    <img alt="licence" src="https://img.shields.io/npm/l/ngx-editor.svg">
  </a>
</p>

## Getting Started

### Installation

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ngx-editor --save
# or
yarn add ngx-editor
```

#### PeerDependencies

- prosemirror-state
- prosemirror-view
- prosemirror-schema-basic
- prosemirror-commands
- prosemirror-history
- prosemirror-keymap

### Usage

Import `ngx-editor` module

```ts
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  imports: [NgxEditorModule],
})

export class AppModule {}
```

Then in HTML

```html
<ngx-editor [(ngModel)]="value"></ngx-editor>
```

For `ngModel` to work, You must import `FormsModule` from `@angular/forms`

## Compatibility

All Evergreen-Browsers are supported

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Opera

## Demo

Demo at stackblitz [ngx-editor](https://ngx-editor.stackblitz.io/)

## Documentation

Documentation is auto-generated using [compodoc][compodoc], and can be viewed here: [https://sibiraj-s.github.io/ngx-editor/](https://sibiraj-s.github.io/ngx-editor/)

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/
[wiki]: https://github.com/sibiraj-s/ngx-editor/wiki/ngxEditor
[compodoc]: https://compodoc.github.io/website/
