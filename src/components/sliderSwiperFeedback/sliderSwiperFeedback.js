import Swiper, { Navigation, Pagination } from 'swiper'

export default function swiper3 () {
  const swiper = new Swiper('.slider-video1', {
    loop: false,
    navigation: {
      nextEl: '.slider-video1-button-next',
      prevEl: '.slider-video1-button-prev',
    },
    slidesPerView: 1.9,
    
    pagination: {
      // el: value.nextElementSibling,
      el: '.slider-video1-pagination',
      clickable: true,
    },
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    updateOnWindowResize: true,
    // spaceBetween: 20,
    autoHeight: true,
    // breakpoints: {
    //     0: {
    //         spaceBetween: 20,
    //       },
    //     767: {
    //         spaceBetween: 20,
    //       }
    //     // 1280: {
    //     //     spaceBetween: 20,
    //     //   }
    // }
  });
}
