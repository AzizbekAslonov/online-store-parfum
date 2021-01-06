let subsImageSlide = new Swiper('.images-product__subslider', {
   observer: true,
   observeParents: true,
   slidesPerView: 4,
   speed: 1000,
})
new Swiper('.images-product__mainslider', {
   observer: true,
   observeParents: true,
   slidesPerView: 1,
   speed: 1000,
   loop: true,
   autoplay: {
      delay: 2200,
      disableOnInteraction: false,
   },
   thumbs: {
      swiper: subsImageSlide
   }
})


