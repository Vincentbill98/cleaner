// ✅ Generic Swiper config function for reuse (without arrows)
function initSwiper(selector) {
  return new Swiper(selector, {
    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
      el: selector + ' .swiper-pagination',
      clickable: true,
    },

    breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
  });
}

// ✅ Init existing Swipers
initSwiper('.sports-swiper');
initSwiper('.accessories-swiper');
initSwiper('.cling-Swiper');

// ✅ Init NEW Bike Parts Swiper
initSwiper('.bikeparts-swiper');

// ✅ Init Bicycle Lights Swiper
initSwiper('.lights-swiper');

// ✅ Init Cycling Tech & Essentials Swiper
initSwiper('.tech-swiper');

