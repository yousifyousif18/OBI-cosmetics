# Website languages

Use the **عربي / EN** switch in the header: عربي is on the left and EN is on the right. Every page opens in English, even after selecting Arabic on another page. Arabic only applies to the current page after selecting عربي; navigation and refresh reset to English.

Arabic uses respectful Modern Standard Arabic. Only wording changes: layout direction, feature positions, logos, arrows, and original colour/shade names remain the same as English. Brand photographs, packaging and customer screenshots keep their original content.

- `translations.js`: Arabic copy keyed by the original English text.
- `language-init.js`: always starts each page in English.
- `language.js`: localises page text, generated product/cart content, accessibility labels and WhatsApp order templates, and restores English when switching back.
- `language.css`: the styled EN / AR switch, with no language-specific layout changes.

Keep product IDs, shade names in data attributes, form values, cart keys and favourites in their existing canonical format. Only their presentation is translated. This preserves selections, prices and saved shades across languages.

When adding new English copy, add the corresponding Arabic entry to `translations.js`. Avoid applying translation to user-entered text. Use `data-no-translate` for proper names or content that must remain unchanged.

Run the browser checks as described in `tests/README.md` after changing translations or generated UI.
