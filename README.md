# NOVAX STAGE — Ready Package

Энэ багц нь Vercel / GitHub дээр шууд хуулж deploy хийхэд бэлэн хувилбар.

## Зассан зүйлс

1. Монгол текстийн font бүгдийг Manrope болгосон.
2. Navbar дээрх `Тоног` цэсийг `Каталог` болгосон.
3. Зүүн дээд logo-г томруулсан.
4. Утасны дэлгэц дээр hero хэсэг багтахгүй байсан responsive алдааг зассан.
5. `catalog.html` нэмсэн. Flow: `Каталог → AODELI → төрөл → JPG gallery`.
6. Gallery дээр зураг дарахад томорч нээгдэнэ, баруун/зүүн сум болон keyboard arrow ажиллана.
7. Үнийн санал авах Formspree form хэвээр ажиллана.

## Каталог зураг нэмэх дүрэм

Жишээ нь Beam folder дотор зургаа ингэж нэрлэнэ:

```text
catalog/aodeli/beam/001.jpg
catalog/aodeli/beam/002.jpg
catalog/aodeli/beam/003.jpg
```

Систем 001-080 хүртэлх `jpg`, `jpeg`, `png`, `webp` файлуудыг автоматаар хайж gallery-д харуулна.

## Deploy хийх

1. ZIP-г задлаад бүх файлыг project-ийн root/public хавтас руу хуулна.
2. Өөрийн catalog зурагнуудаа `catalog/aodeli/...` folder-ууд руу оруулна.
3. GitHub рүү push хийнэ.
4. Vercel автоматаар дахин deploy хийнэ.
