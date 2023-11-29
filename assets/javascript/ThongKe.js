// Hàm chuyển đổi ngày thành định dạng "dd/mm/yyyy"
function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Bắt sự kiện click của nút "Thống kê"
document.getElementById('filterButton').addEventListener('click', function () {
    // Gọi hàm thực hiện việc lọc và hiển thị sản phẩm
    displayProducts();
});

// Hàm lọc và hiển thị sản phẩm
function displayProducts() {
    // Lấy giá trị từ các trường ngày và loại sản phẩm
    var startDate = new Date(document.getElementById("startDate").value);
    var endDate = new Date(document.getElementById("endDate").value);
    var selectedProductType = document.getElementById("productType").value;

    // Lấy dữ liệu từ localStorage
    var Statistique = JSON.parse(localStorage.getItem('bills')) || [];
    var bodyTableStatis = document.getElementById("bodyTableStatis");
    bodyTableStatis.innerHTML = "";

    // Sử dụng đối tượng để theo dõi thông tin của từng sản phẩm và tổng giá tiền
    const productTotals = {};
    let totalAmount = 0;
    let totalQuantity = 0;

    Statistique.forEach(order => {
        order.detailBill.forEach(product => {
            const productDate = new Date(product.dateSold);
            const isTypeMatch = selectedProductType === "" || selectedProductType === product.category;

            if (productDate >= startDate && productDate <= endDate && isTypeMatch) {
                if (productTotals[product.productName]) {
                    // Nếu sản phẩm đã tồn tại, cộng thêm số lượng và giá
                    productTotals[product.productName].quantity += parseInt(product.qualityPro);
                    productTotals[product.productName].totalPrice += product.pricePro * parseInt(product.qualityPro);

                    // Cập nhật tổng giá tiền
                    totalAmount += product.pricePro * parseInt(product.qualityPro);
                } else {
                    // Nếu sản phẩm chưa tồn tại, thêm mới vào danh sách
                    productTotals[product.productName] = {
                        quantity: parseInt(product.qualityPro),
                        totalPrice: product.pricePro * parseInt(product.qualityPro),
                        latestDateSold: product.dateSold,
                        picture: product.picture
                    };

                    // Cập nhật tổng giá tiền
                    totalAmount += product.pricePro * parseInt(product.qualityPro);
                    totalQuantity += parseInt(product.qualityPro);
                }
            }
        });
    });

    // Hiển thị thông tin đã thống kê lên bảng
    Object.keys(productTotals).forEach(productName => {
        const product = productTotals[productName];
        const row = document.createElement('tr');
        row.classList.add('row-product-admin');
        row.innerHTML = `<td>${productName}</td>
            <td><img src="${product.picture}" width="80" alt="Hình ảnh sản phẩm"></td>
            <td>${formatDate(new Date(product.latestDateSold))}</td>
            <td>${product.quantity}</td>
            <td>${product.totalPrice}</td>`;
        bodyTableStatis.appendChild(row);
    });

    // Hiển thị tổng giá tiền
    const totalAmountRow = document.createElement('tr');
    totalAmountRow.innerHTML = `<td colspan="3"><strong>Tổng:</strong></td>
        <td style="color: red"><strong>${totalQuantity}</strong></td>
        <td style="color: red"><strong>${totalAmount}</strong></td>`;
    bodyTableStatis.appendChild(totalAmountRow);
}
