      /*fetch ưu đãi doanh nghiệp*/
      fetch('../supplier/uudaichodoanhnghiep.html')
        .then(res => res.text())
        .then(data => {
          document.getElementById('uudaichodoanhnghiep').innerHTML = data;
        });




      // Hàm đồng bộ chiều cao của thanh trượt hình thu nhỏ với hình chính
      $(document).ready(function() {
        const $mainSlider = $('.main-slider');
       const $thumbInner = $('.thumb-slider-inner');
        let currentThumbIndex = 0;
        const thumbStep = 1;
        const thumbImages = $('.thumb-slider img');

        $mainSlider.slick({
          vertical: true,
          arrows: true,
          prevArrow: $('.main-image .slick-prev'),
          nextArrow: $('.main-image .slick-next'),
          adaptiveHeight: true,
          autoplay: true,
          autoplaySpeed: 5000,
          infinite: true,
          speed: 800,
          cssEase: 'ease-in-out'
        });

          // ✅ Đồng bộ chiều cao khi Slick set xong vị trí
        $mainSlider.on('setPosition', function () {
          syncThumbHeight();
        });

        thumbImages.on('mouseenter', function() {
          const index = $(this).data('index');
          $mainSlider.slick('slickGoTo', index);
        });

        thumbImages.on('mouseenter', function () {
          const index = $(this).data('index');
          $mainSlider.slick('slickGoTo', index);
          thumbImages.removeClass('active-thumb');
          $(this).addClass('active-thumb');
        });

        $mainSlider.on('afterChange', function(event, slick, currentSlide){
          thumbImages.removeClass('active-thumb');
          thumbImages.eq(currentSlide).addClass('active-thumb');
        });


        $('.thumb-prev').click(function() {
          if (currentThumbIndex > 0) {
            currentThumbIndex -= thumbStep;
            $thumbInner.css('transform', `translateY(-${currentThumbIndex * 90}px)`);
          }
        });

        $('.thumb-next').click(function() {
          if ((currentThumbIndex + 5) < thumbImages.length) {
            currentThumbIndex += thumbStep;
            $thumbInner.css('transform', `translateY(-${currentThumbIndex * 90}px)`);
          }
        });
      });

      document.querySelectorAll('.sticky-sidebar a').forEach(link => {
        const href = link.getAttribute('href');
        // Chỉ chặn mặc định nếu href là ID trong trang
        if (href && href.startsWith('#')) {
          link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(href);
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      });


      document.querySelectorAll('.product-navigation-box a').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetEl = document.querySelector(targetId);
          const offset = 100; // 👈 chỉnh khoảng cách phù hợp chiều cao navbar

          if (targetEl) {
            const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top: topPos, behavior: 'smooth' });
          }
        });
      });

// Khởi tạo slider chính và slider hình thu nhỏ khi deploy
$(document).ready(function(){
  $('#main-slider').slick({
    slidesToShow: 1,
    arrows: true,
    asNavFor: '#thumb-slider-inner',
    vertical: true
  });

  $('#thumb-slider-inner').slick({
    slidesToShow: 4,
    asNavFor: '#main-slider',
    focusOnSelect: true,
    vertical: true
  });
});
