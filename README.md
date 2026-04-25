# NOVAX STAGE – Stage · Light · Sound

Мэргэжлийн тайз, гэрэл, дууны тоног төхөөрөмжийн худалдаа, түрээсийн вэбсайт.

## Файл бүтэц

```
novax/
├── index.html        # Үндсэн хуудас
├── css/
│   └── style.css     # Бүх загвар
├── js/
│   └── main.js       # Интерактив функцууд
├── images/           # Зурган файлууд (өөрийн зургаа нэмнэ)
└── README.md
```

## Технологи

- HTML5
- CSS3 (CSS Variables, Grid, Flexbox, Animations)
- Vanilla JavaScript (IntersectionObserver, scroll events)
- Google Fonts: Bebas Neue + DM Sans

## GitHub Pages дээр байршуулах

1. GitHub дээр шинэ repository үүсгэх
2. Файлуудыг upload хийх
3. Settings → Pages → Branch: `main` → Save
4. `https://username.github.io/novax` хаягаар нээгдэнэ

## Хэрэглэгчийн өөрчлөх хэсгүүд

### Холбоо барих мэдээлэл
`index.html` файлд утас, имэйл, хаягийг шинэчлэх:

```html
<div class="co-val">+976 9924-5574</div>   <!-- Утас -->
<div class="co-val">novaxstage@gmail.com</div>     <!-- Имэйл -->
```

### Тоног нэмэх
`index.html`-д `.eq-card` блок нэмэх:

```html
<div class="eq-card">
  <div class="eq-badge">Дуу</div>
  <div class="eq-name">Тоногийн нэр</div>
  <div class="eq-model">Загварын нэр</div>
  <div class="eq-type">Түрээс · Худалдаа</div>
</div>
```

### Хийсэн ажил нэмэх
```html
<div class="project-row">
  <div class="proj-num">07</div>
  <div class="proj-name">АЖЛЫН НЭР</div>
  <div class="proj-meta">Тайз · Гэрэл</div>
  <div class="proj-year">2025</div>
</div>
```

### Өнгө өөрчлөх
`style.css` файлын `:root` хэсэгт:

```css
:root {
  --accent: #38bdf8;   /* Ногоон accent → өөр өнгөөр солих */
  --black:  #0a0a0a;   /* Дэвсгэр өнгө */
}
```

## License

MIT
