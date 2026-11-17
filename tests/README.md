# Local browser audit

Run from the repository root on Windows with Chrome or Edge installed:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -Command "& './tests/run-browser-audit.ps1' -Widths @(320,390,768,1024,1440)"
```

Restricted execution environments may require the runner's `-DisableSandbox` switch. It only affects the isolated test browser process.

Reports are written to `.review/audit-<width>.json`. The browser uses a separate profile under `.review/`, never your normal browser profile.

The harness renders all seven pages in real browser iframes, loads their actual CSS and JavaScript, and exercises UI controls. It intercepts navigation before creating the frames, so WhatsApp URLs are inspected as drafts and no messages are sent. Saved test carts only live in the test browser profile.

Checks cover script errors, horizontal overflow, loaded images, menus, first-outside-click behavior, cart opening and scroll locking, shade selection, quantities, removing items, empty carts, all four markets, exact totals, WhatsApp draft contents, corrupted/invalid carts, whitespace-only checkout, Escape dismissal, country cart isolation, question symbols, the screenshot viewer, and favourites saving, removal, filtering, persistence and damaged-data recovery.

The harness uses programmatic clicks and keyboard events. It does not replace physical-device testing, network/server checks, or a final review of WhatsApp's own interface.

Arabic checks cover all seven pages, original layout and logo placement, the EN / AR switch, preserved shade names and arrows, every product's generated details, saved shade IDs, untranslated visible copy, language-aware navigation, and Arabic WhatsApp drafts that preserve customer names, addresses and phone numbers.
