# Reactive Forms

## Module

```ts
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## AppComponent

```ts
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from 'ngx-editor';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  form = new FormGroup({
    editorContent: new FormControl(null, [Validators.required()]),
  });
}
```

## Template

```html
<form [formGroup]="form">
  <ngx-editor formControlName="editorContent"></ngx-editor>
</form>
```

### Validators

```ts
import { Validators } from 'ngx-editor';

Validators.required(schema); // pass schema if you are using a custom schema else leave it empty
```
