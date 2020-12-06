const defaults = {
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

  // pupups, forms, others...
  url: 'URL',
  text: 'Text',
  openInNewTab: 'Open in new tab',
  insert: 'Insert',
  altText: 'Alt Text',
  title: 'Title'
};

export type I18nKeys = keyof typeof defaults;

class I18n {
  locals = defaults;

  constructor(newLocals: Partial<Record<I18nKeys, string>> = {}) {
    this.locals = Object.assign({}, defaults, newLocals);
  }

  get = (key: string) => {
    return this.locals[key] ?? '';
  }
}

export default I18n;