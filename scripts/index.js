import { slidesData } from '../data/slidesData.js';

const controls = document.getElementById('controls');
const noSelection = document.getElementById('noSelection');
const inpName = document.getElementById('fieldName');
const inpText = document.getElementById('fieldText');
const selFont = document.getElementById('fontFamily');
const inpSize = document.getElementById('fontSize');
const inpColor = document.getElementById('fontColor');
const selWeight = document.getElementById('fontWeight');
const selAlign = document.getElementById('align');
const inpLH = document.getElementById('lineHeight');
const selLang = document.getElementById('lang');
const btnDelete = document.getElementById('deleteField');

const addTextBtn = document.getElementById('addTextBtn');
const backBtn = document.getElementById('backBtn');
const idlePanel = document.getElementById('idlePanel');

let selectedField = null;

// swiper config
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// hide controls when slide changes
swiper.on('slideChange', () => {
  selectedField = null;
  if (controls) controls.classList.add('hidden');
  if (noSelection) noSelection.classList.remove('hidden');
  if (idlePanel) idlePanel.classList.remove('hidden');
  if (backBtn) backBtn.classList.add('hidden');
});

// field selection and control panel logic
function genId() { return 'f' + Date.now() + Math.floor(Math.random() * 1000); }

function selectField(slideIndex, id, el) {
  selectedField = { slideIndex, id, el };
  if (idlePanel) idlePanel.classList.add('hidden');
  if (controls) controls.classList.remove('hidden');
  if (noSelection) noSelection.classList.add('hidden');
  if (backBtn) backBtn.classList.remove('hidden');

  const f = (slidesData[slideIndex] || []).find(x => x.id === id);
  if (!f) return;

  if (inpName) inpName.value = f.name || '';
  if (inpText) inpText.value = f.text || '';
  if (selFont) selFont.value = f.fontFamily || 'Arial, sans-serif';
  if (inpSize) inpSize.value = f.fontSize ?? 20;
  if (inpColor) inpColor.value = f.color || '#ffffff';
  if (selWeight) selWeight.value = f.fontWeight ?? 400;
  if (selAlign) selAlign.value = f.align || 'center';
  if (inpLH) inpLH.value = f.lineHeight ?? 1.2;
  if (selLang) selLang.value = f.lang || 'en';

  let badge = el.querySelector('.field-label');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'field-label';
    el.prepend(badge);
  }
  badge.textContent = f.name || '';
}

// control panel events
if (inpName) {
  inpName.addEventListener('input', () => {
    if (!selectedField) return;
    const { slideIndex, id, el } = selectedField;
    const f = slidesData[slideIndex].find(x => x.id === id);
    if (!f) return;
    f.name = inpName.value;
    const badge = el.querySelector('.field-label');
    if (badge) badge.textContent = f.name;
  });
}

if (inpText) {
  inpText.addEventListener('input', () => {
    if (!selectedField) return;
    const { slideIndex, id, el } = selectedField;
    const f = slidesData[slideIndex].find(x => x.id === id);
    if (!f) return;
    f.text = inpText.value;
    const badge = el.querySelector('.field-label');
    el.textContent = f.text;
    if (badge) el.prepend(badge);
  });
}

if (selFont) {
  selFont.addEventListener('change', () => {
    if (!selectedField) return;
    const { slideIndex, id, el } = selectedField;
    const f = slidesData[slideIndex].find(x => x.id === id);
    if (!f) return;
    f.fontFamily = selFont.value;
    el.style.setProperty('--ff-family', f.fontFamily);
  });
}

if (inpSize) {
  inpSize.addEventListener('input', () => {
    if (!selectedField) return;
    const { slideIndex, id, el } = selectedField;
    const f = slidesData[slideIndex].find(x => x.id === id);
    if (!f) return;
    f.fontSize = Number(inpSize.value);
    el.style.setProperty('--ff-size', f.fontSize + 'px');
  });
}

if (selWeight) {
  selWeight.addEventListener('change', () => {
    if (!selectedField) return;
    const { slideIndex, id, el } = selectedField;
    const f = slidesData[slideIndex].find(x => x.id === id);
    if (!f) return;
    f.fontWeight = selWeight.value;
    el.style.setProperty('--ff-weight', f.fontWeight);
  });
}

if (inpColor) {
  inpColor.addEventListener('input', () => {
    if (!selectedField) return;
    const { slideIndex, id, el } = selectedField;
    const f = slidesData[slideIndex].find(x => x.id === id);
    if (!f) return;
    f.color = inpColor.value;
    el.style.setProperty('--ff-color', f.color);
  });
}

if (selAlign) {
  selAlign.addEventListener('change', () => {
    if (!selectedField) return;
    const { slideIndex, id, el } = selectedField;
    const f = slidesData[slideIndex].find(x => x.id === id);
    if (!f) return;
    f.align = selAlign.value;
    el.style.setProperty('--align', f.align);
  });
}

if (inpLH) {
  inpLH.addEventListener('input', () => {
    if (!selectedField) return;
    const { slideIndex, id, el } = selectedField;
    const f = slidesData[slideIndex].find(x => x.id === id);
    if (!f) return;
    f.lineHeight = Number(inpLH.value);
    el.style.setProperty('--line', f.lineHeight);
  });
}

if (selLang) {
  selLang.addEventListener('change', () => {
    if (!selectedField) return;
    const { slideIndex, id, el } = selectedField;
    const f = slidesData[slideIndex].find(x => x.id === id);
    if (!f) return;
    f.lang = selLang.value;
    el.lang = selLang.value;
  });
}

if (btnDelete) {
  btnDelete.addEventListener('click', () => {
    if (!selectedField) return;
    const { slideIndex, id } = selectedField;
    const arr = slidesData[slideIndex] || [];
    const i = arr.findIndex(x => x.id === id);
    if (i >= 0) arr.splice(i, 1);
    const el = document.querySelector(`.swiper-slide:nth-child(${slideIndex + 1}) .text-layer .text-field[data-id="${id}"]`);
    if (el) el.remove();
    selectedField = null;
    if (controls) controls.classList.add('hidden');
    if (noSelection) noSelection.classList.remove('hidden');
    if (idlePanel) idlePanel.classList.remove('hidden');
    if (backBtn) backBtn.classList.add('hidden');
  });
}

// rendering + addField + add button

const slideNodes = document.querySelectorAll('.swiper-slide');

function addField(slideIndex, field) {
  const slide = slideNodes[slideIndex];
  if (!slide) return null;
  const layer = slide.querySelector('.text-layer');
  if (!layer) return null;

  const el = document.createElement('div');
  el.className = 'text-field';
  el.setAttribute('data-id', field.id);
  el.contentEditable = true;
  el.innerText = field.text;

  el.style.setProperty('--left', (field.x ?? 50) + '%');
  el.style.setProperty('--top', (field.y ?? 80) + '%');
  el.style.setProperty('--ff-size', (field.fontSize ?? 20) + 'px');
  el.style.setProperty('--ff-color', field.color || '#ffffff');
  el.style.setProperty('--ff-family', field.fontFamily || 'Arial, sans-serif');
  el.style.setProperty('--ff-weight', field.fontWeight ?? 400);
  el.style.setProperty('--line', field.lineHeight ?? 1.2);
  el.style.setProperty('--align', field.align || 'center');
  el.style.setProperty('--z', field.zIndex ?? 1);
  if (field.lang) el.lang = field.lang;

  el.addEventListener('input', () => {
    const obj = (slidesData[slideIndex] || []).find(x => x.id === field.id);
    if (obj) obj.text = el.textContent;
  });

  el.addEventListener('click', (ev) => { ev.stopPropagation(); selectField(slideIndex, field.id, el); });
  el.addEventListener('focus', () => selectField(slideIndex, field.id, el));

  makeDraggable(el, slideIndex, field.id);

  layer.appendChild(el);
  return el;
}

slideNodes.forEach((_, i) => {
  slidesData[i] = slidesData[i] || [];
  if (slidesData[i].length === 0) {
    slidesData[i].push({
      id: genId(),
      name: 'Title',
      text: 'Edit me',
      x: 50, y: 80,
      fontFamily: 'Arial, sans-serif',
      fontSize: 22,
      fontWeight: 400,
      align: 'center',
      lineHeight: 1.2,
      color: '#ffffff',
      lang: 'en',
      zIndex: 1
    });
  }
  slidesData[i].forEach(f => addField(i, f));
});

if (addTextBtn) {
  addTextBtn.addEventListener('click', () => {
    const idx = swiper.realIndex || 0;
    const newField = {
      id: genId(),
      name: 'New field',
      text: 'New text',
      x: 50, y: 50,
      fontFamily: 'Arial, sans-serif',
      fontSize: 22,
      fontWeight: 400,
      align: 'center',
      lineHeight: 1.2,
      color: '#ffffff',
      lang: 'en',
      zIndex: 10
    };
    slidesData[idx] = slidesData[idx] || [];
    slidesData[idx].push(newField);
    const node = addField(idx, newField);
    if (node) {
      node.focus();
      selectField(idx, newField.id, node);
      document.execCommand('selectAll', false, null);
      document.getSelection().collapseToEnd();
    }
  });
}

if (backBtn) {
  backBtn.addEventListener('click', () => {
    selectedField = null;
    if (controls) controls.classList.add('hidden');
    if (noSelection) noSelection.classList.remove('hidden');
    if (idlePanel) idlePanel.classList.remove('hidden');
    backBtn.classList.add('hidden');
  });
}


function makeDraggable(el, slideIndex, fieldId) {
  let startX = 0, startY = 0, startLeft = 50, startTop = 50, rect = null;
  let dragging = false;
  const MOVE_THRESHOLD = 6;

  el.onpointerdown = (e) => {
    rect = el.closest('.text-layer').getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;
    const computed = getComputedStyle(el);
    startLeft = parseFloat(computed.getPropertyValue('--left')) || 50;
    startTop = parseFloat(computed.getPropertyValue('--top')) || 80;
    dragging = false;
    if (typeof swiper !== 'undefined') swiper.allowTouchMove = false;
    document.onpointermove = elementDrag;
    document.onpointerup = closeDrag;
  };

  function elementDrag(e) {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    if (!dragging && Math.hypot(dx, dy) < MOVE_THRESHOLD) return;
    if (!dragging) {
      dragging = true;
      el.classList.add('dragging');
    }
    const newLeft = (startLeft / 100 * rect.width + dx) / rect.width * 100;
    const newTop = (startTop / 100 * rect.height + dy) / rect.height * 100;
    const nx = Math.max(2, Math.min(98, newLeft));
    const ny = Math.max(2, Math.min(98, newTop));
    el.style.setProperty('--left', nx + '%');
    el.style.setProperty('--top', ny + '%');
  }

  function closeDrag() {
    document.onpointermove = null;
    document.onpointerup = null;
    if (dragging) {
      const arr = slidesData[slideIndex] || [];
      const obj = arr.find(x => x.id === fieldId);
      if (obj) {
        const computed = getComputedStyle(el);
        obj.x = parseFloat(computed.getPropertyValue('--left')) || obj.x;
        obj.y = parseFloat(computed.getPropertyValue('--top')) || obj.y;
      }
      el.classList.remove('dragging');
    } else {
      el.focus();
    }
    dragging = false;
    if (typeof swiper !== 'undefined') swiper.allowTouchMove = true;
  }

  return () => { el.onpointerdown = null; };
}