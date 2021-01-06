// <Search> ============================================================
let searchTitle = document.querySelector('.page-search__title');
let searchSelect = document.querySelector('.page-search__select');
let checkboxes = document.querySelectorAll('.checkbox');

if (searchTitle) {
   searchTitle.addEventListener('click', function () {
      searchSelect.classList.toggle('active');
   })
}

for (let i = 0; i < checkboxes.length; i++) {
   const checkbox = checkboxes[i];

   checkbox.addEventListener('change', () => {
      checkbox.classList.toggle('count');

      let checkboxActive = document.querySelectorAll('.checkbox.count');

      if (checkboxActive.length > 0) searchTitle.textContent = `Tanlandi ${checkboxActive.length}`;

      else searchTitle.textContent = 'Qidirish';
   })
}
// </Search> ============================================================

// <Slider part> ============================================================

let sliders = document.querySelectorAll('.swiper');
for (let i = 0; i < sliders.length; i++) {
   const slider = sliders[i];

   if (!slider.classList.contains('swiper-bild')) {
      let slider_items = slider.children;
      if (slider_items) {
         for (let j = 0; j < slider_items.length; j++) {
            const el = slider_items[j];
            el.classList.add('swiper-slide')
         }
      }
      let slider_content = slider.innerHTML;
      let slider_wrapper = document.createElement('div');
      slider_wrapper.classList.add('swiper-wrapper');
      slider_wrapper.innerHTML = slider_content;
      slider.innerHTML = '';
      slider.appendChild(slider_wrapper);
      slider.classList.add('swiper-bild')
   }
}
if (document.querySelector('.mainslider__body')) {
   new Swiper('.mainslider__body', {
      observer: true,
      observeParents: true,
      autoHeight: true,
      speed: 800,
      // loop: true,
      slidesPerView: 1,
      pagination: {
         el: '.mainslider__dotts',
         clickable: true,
         // dynamicBullets: true,
         renderBullet: function (index, className) {
            return `<span class="${className}">${index + 1}</span>`
         },
      }
   });
}

let mainSliderImages = document.querySelectorAll('.mainslider__image');
let mainSliderDotts = document.querySelectorAll('.mainslider__dotts .swiper-pagination-bullet');

for (let i = 0; i < mainSliderImages.length; i++) {
   const image = mainSliderImages[i].querySelector('img').getAttribute('src');

   mainSliderDotts[i].style.backgroundImage = `url(${image})`;
}
// </Slider part> ===========================================================

// <Second slider> ======================================================
if (document.querySelector('.products-slider__item_1')) {
   new Swiper('.products-slider__item_1', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      autoHeight: true,
      speed: 1000,
      loop: true,
      navigation: {
         nextEl: '.products-slider__next',
         prevEl: '.products-slider__prev',
      },
      pagination: {
         el: '.products-slider__info',
         type: 'fraction',
      },
      autoplay: {
         delay: 2000,
         disableOnInteraction: false,
      },
   })
}
if (document.querySelector('.products-slider__item_2')) {
   new Swiper('.products-slider__item_2', {
      observer: true,
      observeParents: true,
      slidesPerView: 1,
      autoHeight: true,
      speed: 800,
      scrollbar: {
         el: '.swiper-scrollbar',
         // Возможность перетаскивать Scroll
         draggable: true,
      },
   })
}

let itemProduct = document.querySelectorAll('.items-products__column .item-product');
for (let i = 0; i < itemProduct.length; i++) {
   const item = itemProduct[i];
   item.addEventListener('mouseenter', () => {
      item.querySelector('.hover-item-product').classList.add('hover');
      item.querySelector('.item-product__body').classList.add('hide')
   })
   item.addEventListener('mouseleave', () => {
      item.querySelector('.hover-item-product').classList.remove('hover');
      item.querySelector('.item-product__body').classList.remove('hide')
   })
}
// </Second slider> ======================================================

// Brands

if (document.querySelector('.brands-slider__body')) {
   new Swiper('.brands-slider__body', {
      slidesPerView: 5,
      speed: 600,
      loop: true,
      navigation: {
         nextEl: '.brands-slider__arrow_next',
         prevEl: '.brands-slider__arrow_prev',
      },
      autoplay: {
         delay: 1000,
         disableOnInteraction: false,
      },
      breakpoints: {
         320: {
            slidesPerView: 1,
            autoHeight: true
         },
         480: {
            slidesPerView: 3,
         },
         768: {
            slidesPerView: 4,
         },
         992: {
            slidesPerView: 5,
         },
      }
   })
}



