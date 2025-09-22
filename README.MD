# Card Editor

A small vanilla HTML/CSS/JS card editor that uses SwiperJS for swiping portrait slides and lets you add, edit, drag and style text fields per slide.

## Features
- Multiple swipable slides (SwiperJS).
- Per-slide text fields with:
  - editable text (contenteditable)
  - drag to reposition (pointer events, percent coordinates)
  - font family, size, weight, color, alignment, line-height, language
- Add new text fields, delete fields.
- Simple side-panel for selecting and styling the active field.

## File structure
```
/index.html
/styles/styles.css
/scripts/index.js
/data/slidesData.js   # initial slide/text data
/assets/              # images used in slides
```

## Run locally
1. Open the project folder in VS Code.
2. Install Live Server extension (Ritwick Dey) or use any static server.
3. Open `index.html` with Live Server (`Right click → Open with Live Server`).