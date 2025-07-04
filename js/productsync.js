
  // Load file JSON sản phẩm
  fetch('../products.json') // đường dẫn đúng với thư mục mày đang đặt
    .then(res => res.json())
    .then(products => {
      // Tìm đúng sản phẩm bằng URL hiện tại
      const currentUrl = location.pathname.split('/').pop(); // ví dụ "thachdarae.html"
      const product = products.find(p => p.url.includes(currentUrl));

      if (!product || !product.gallery || product.gallery.length === 0) return;

      // Render thumbnail
      const thumbContainer = document.getElementById('thumb-slider-inner');
      const mainContainer = document.getElementById('main-slider');

      product.gallery.forEach((imgUrl, index) => {
        // Thêm vào thumbnail
        const thumbDiv = document.createElement('div');
        thumbDiv.innerHTML = `<img src="${imgUrl}" data-index="${index}">`;
        thumbContainer.appendChild(thumbDiv);

        // Thêm vào main image
        const mainDiv = document.createElement('div');
        mainDiv.innerHTML = `<img src="${imgUrl}">`;
        mainContainer.appendChild(mainDiv);
      });
    })
    .catch(err => {
      console.error("Lỗi khi tải gallery từ JSON:", err);
    });


  fetch('../products.json')
    .then(res => res.json())
    .then(products => {
      const currentFile = location.pathname.split('/').pop();
      const product = products.find(p => p.url.includes(currentFile));
      if (!product) return;

      // 1. Cập nhật title của trang
      document.title = product.title;

      // 3. Cập nhật giá FOB và MOQ
      const fobValue = document.getElementById('fob-value');
      const moqValue = document.getElementById('moq-value');

      if (fobValue) fobValue.textContent = product.price;
      if (moqValue) moqValue.textContent = product.moq;

      // ✅ Thêm link đến website nhà sản xuất (nếu có)
      if (product.manufacturerLink) {
        const manuLinkBox = document.getElementById('manufacturer-link-box');
        if (manuLinkBox) {
          manuLinkBox.innerHTML = `
            <p style="margin: 0;">
              <strong>Link sản phẩm từ nhà sản xuất:</strong>
              <a href="${product.manufacturerLink}" target="_blank" rel="noopener noreferrer" style="margin-left: 6px; word-break: break-word;">
                ${product.manufacturerLink}
              </a>
            </p>
          `;
        }
      }
    })
    .catch(error => {
      console.error("Không thể tải sản phẩm từ products.json", error);
    });

