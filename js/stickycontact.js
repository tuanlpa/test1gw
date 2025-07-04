    const toTopBtn = document.getElementById("btn-to-top");

    toTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", function () {
      toTopBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    });

    // Mặc định ẩn nút "lên đầu trang"
    toTopBtn.style.display = "none";

    function syncThumbHeight() {
        const mainImage = document.querySelector('.main-image');
        const thumbSlider = document.querySelector('.thumb-slider');

        if (mainImage && thumbSlider) {
          const height = mainImage.offsetHeight;
          thumbSlider.style.maxHeight = height + 'px';
        }
    }

     // Chạy sau khi ảnh load
    window.addEventListener('load', syncThumbHeight);
    window.addEventListener('resize', syncThumbHeight);
