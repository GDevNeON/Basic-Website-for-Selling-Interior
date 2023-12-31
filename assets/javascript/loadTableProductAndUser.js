//table product
var products = JSON.parse(localStorage.getItem('products')) || [];
const bodytable = document.querySelector('.bodyTableProduct');
products.forEach(product => {
  const row = document.createElement('tr');
  row.classList.add('row-product-admin')
  row.innerHTML = `<td class = "table-product-name">`+ product.productName + `</td>
  <td><img src="`+ product.imageProduct +`" width="80" alt="Hình ảnh sản phẩm"></td>
  <td>`+ product.priceProduct.toLocaleString('vi-VN') +`</td>
  <td>
    <button class="btn-edit btn-ed" data-id="`+ product.idProduct +`" fdprocessedid="vt1kwm" onclick = "editRow(this)">
      <img src="./assets/icon/pen-to-square-regular (1).svg" width="15px" alt=""> Sửa
    </button>
    <button class="btn-delete btn-ed" data-id="`+ product.idProduct +`" fdprocessedid="7v9vxi" onclick = "deleteRow(this)">
      <img src="./assets/icon/trash.png" width="15px" alt=""> Xóa
    </button>
  </td>`
  // 4. Thêm dòng vào bảng
  bodytable.appendChild(row);
  
});

function editRow(e) {
    // Lấy giá trị data-id từ nút
    var productId = e.getAttribute('data-id');
    var updatedProduct = products.find(product => product.idProduct == productId);
    console.log(updatedProduct)
    var pageCurrent = document.getElementsByClassName('active')[0];
    var pageNeedAdd = document.getElementsByClassName('not-active')[0];
    var btnSub = document.getElementById('btn-submit');
    pageCurrent.classList.add('not-active');
    pageCurrent.classList.remove('active');
    pageNeedAdd.classList.add('active');
    pageNeedAdd.classList.remove('not-active');
    btnSub.textContent = 'Update';

    //save image to base64
    var imageBase64 = updatedProduct.imageProduct;
      fileInput.addEventListener("change", function (event) {
          var selectedFile = event.target.files[0];
          if (selectedFile) {
              var reader = new FileReader();
              reader.onload = function (e) {
                  imageBase64 = e.target.result;
                  //imageElement.src = imageBase64;
                  //alert(imageBase64)
              };
              reader.readAsDataURL(selectedFile);
          }
      });
  
    var nameinput = document.getElementById('Add-name_product');
    var price = document.getElementById('Add-price');
    var detail = document.getElementById('Add-detail_Product');
    var category = document.getElementById('select_category');
    var image = document.getElementById('Add-Image_product');
    // Lắng nghe và gán giá trị cho các trường input
    nameinput.value = updatedProduct.productName;
    price.value = parseInt(updatedProduct.priceProduct);
    detail.value = updatedProduct.detailProduct;
    category.value = updatedProduct.category;
      
    btnSub.addEventListener('click', function() {
        var check = 0;
        var spanNamePro = document.getElementById('span_namePro')
        var spanCatePro = document.getElementById('span_CategoryPro')
        var spanPricePro = document.getElementById('span_pricePro')
        var spanDetailPro = document.getElementById('span_detailPro')
        var spanImagePro = document.getElementById('span_imagePro')

        const regexSpace = /^.*\S.{2,}.*$/;
        const regexNamePro = /^[\p{L}\d\s'.,]+$/u;
        if(nameinput.value == ''){
            check++;
            spanNamePro.innerHTML = 'Vui lòng nhập trường này';
            spanNamePro.style = "color: red; font-size : 12px;"
        } else if(!nameinput.value.match(regexSpace)){
            check++;
            spanNamePro.innerHTML = 'Vui lòng nhập ít nhất 3 kí tự khác khoảng trắng';
            spanNamePro.style = "color: red; font-size : 12px;"
        } else if(!nameinput.value.match(regexNamePro)){
            check++;
            spanNamePro.innerHTML = 'Tên không được chứa kí tự đặc biệt';
            spanNamePro.style = "color: red; font-size : 12px;"
        } else spanNamePro.innerHTML = '';
        // check loại
        if(categorySelect.value == ''){
            check++;
            spanCatePro.innerHTML = 'Vui lòng chọn';
            spanCatePro.style = "color: red; font-size : 12px;"
        } else spanCatePro.innerHTML = '';
        // check chi tiết
        if(detail.value == ''){
            check++;
            spanDetailPro.innerHTML = 'Vui lòng nhâp trường này';
            spanDetailPro.style = "color: red; font-size : 12px;"
        } else if(!detail.value.match(regexSpace)){
            check++;
            spanDetailPro.innerHTML = 'Vui lòng nhập ít nhất 3 kí tự khác khoảng trắng';
            spanDetailPro.style = "color: red; font-size : 12px;"
        } else if(!detail.value.match(regexNamePro)){
            check++;
            spanDetailPro.innerHTML = 'Không được chứa kí tự đặc biệt';
            spanDetailPro.style = "color: red; font-size : 12px;"
        } else spanDetailPro.innerHTML = '';
        // check giá
        if(price.value == ''){
            check++;
            spanPricePro.innerHTML = 'Vui lòng nhập trường này';
            spanPricePro.style = "color: red; font-size : 12px;"
        } else if(price.value < 0){
            check++;
            spanPricePro.innerHTML = 'Giá phải lớn hơn 0';
            spanPricePro.style = "color: red; font-size : 12px;"
        } else spanPricePro.innerHTML = '';
      // Cập nhật thông tin sản phẩm
      if(check == 0){
        updatedProduct.productName = nameinput.value;
        updatedProduct.priceProduct = parseInt(price.value);
        updatedProduct.detailProduct = detail.value;
        updatedProduct.imageProduct = imageBase64;
        var btnDeleteImg = document.getElementById('deleteImg');
        if(btnDeleteImg.checked){
            updatedProduct.imageProduct = './assets/image/picture-delete.png';
        }
        
        // Cập nhật danh sách sản phẩm trong localStorage
        localStorage.setItem('products', JSON.stringify(products));

        alert('Cập nhật thành công');
        location.reload();
      }
    });
};
function deleteRow(e){
    const productId = e.getAttribute('data-id');
    //const productIdToDelete = e.target.getAttribute('data-id');
    const ProductsAfterDelete = products.filter(product => product.idProduct != productId);
    var result = confirm("Bạn có thật sự muốn xóa không?")
    if(result){
      if(ProductsAfterDelete.length<products.length){
          localStorage.setItem('products', JSON.stringify(ProductsAfterDelete));
          alert('Sản phẩm đã được xóa')
        } else alert('không tìm thấy sản phẩm cần xóa')
      location.reload();
    }
    
}

// table user
var users = JSON.parse(localStorage.getItem('users')) || [];
var bodytableUser = document.getElementsByClassName('bodyTableUser')[0];
users.forEach(u => {
    if(u.isAdmin == 0){
        const row = document.createElement('tr');
        row.classList.add('row-product-admin')
        row.innerHTML = `<td>` +u.loginName+  `</td>
        <td>`+ u.userName + `</td>
        <td>`+ u.address +`</td>
        <td>`+ u.telephone +`</td>
        <td><input onclick="blockUser(this)" type="checkbox" class="blockUser" id="`+u.loginName+`" /></td>`
        if(u.block==1){
            var checkbox = row.querySelector('.blockUser');
            checkbox.checked = true;
        }
        // 4. Thêm dòng vào bảng
        bodytableUser.appendChild(row);
    }
});

function blockUser(u){
    users.forEach(user => {
        if(user.loginName == u.id) {
            if(user.block == 0){
                user.block = 1;
                alert("Bạn đã khóa tài khoản "+u.id);
            } else {
                user.block = 0;
                alert("Bạn đã mở khóa tài khoản "+u.id);
            }
        }
    })
    localStorage.setItem('users', JSON.stringify(users));
}

// ẩn hiện bảng user và product
let currentPage = 1;
var table = document.getElementsByClassName('tableProduct')[0];
var rows = table.getElementsByClassName('bodyTableProduct')[0].getElementsByTagName('tr');

var proTable = document.getElementById('contain_tableProduct');
var userTable = document.getElementById('contain_tableUser');
var statisTable = document.getElementById('contain_tableStatis');
var detailTable = document.getElementById('contain_tableDetail');
var btnAddProduct = document.getElementById('add-product')

var numRow = document.getElementsByClassName('contain_select_numRow')[0]
var listPaging = document.getElementsByClassName('listPage')[0]

document.getElementById('productTable').addEventListener('click', function(e){ 
    proTable.style.display = 'block';
    btnAddProduct.style.display = 'block';
    userTable.style.display = 'none';
    statisTable.style.display = 'none';
    detailTable.style.display = 'none';
    numRow.style.display = 'block';
    listPaging.style.display = 'block';
    table = document.getElementsByClassName('tableProduct')[0];
    rows = table.getElementsByClassName('bodyTableProduct')[0].getElementsByTagName('tr');
    showPage(currentPage);
})
document.getElementById('userTable').addEventListener('click', function(e){
    proTable.style.display = 'none';
    btnAddProduct.style.display = 'none';
    userTable.style.display = 'block';
    statisTable.style.display = 'none';
    detailTable.style.display = 'none';
    numRow.style.display = 'block';
    listPaging.style.display = 'block';
    table = document.getElementsByClassName('tableUser')[0];
    rows = table.getElementsByClassName('bodyTableUser')[0].getElementsByTagName('tr');
    showPage(currentPage);
})
document.getElementById('detailTable').addEventListener('click', function(e){

    proTable.style.display = 'none';
    btnAddProduct.style.display = 'none';
    userTable.style.display = 'none';
    statisTable.style.display = 'none';
    detailTable.style.display = 'block';
    numRow.style.display = 'none';
    listPaging.style.display = 'none';
})
document.getElementById('statisTable').addEventListener('click', function(e){
    proTable.style.display = 'none';
    btnAddProduct.style.display = 'none';
    userTable.style.display = 'none';
    statisTable.style.display = 'block';
    detailTable.style.display = 'none';
    numRow.style.display = 'none';
    listPaging.style.display = 'block';
    table = document.getElementsByClassName('tableStatis')[0];
    rows = table.getElementsByClassName('bodyTableStatis')[0].getElementsByTagName('tr');
    showPage(currentPage);
})


// phân trang
var itemsPerPage = document.getElementById("selectNumRow").value; // Số mục trên mỗi trang

function showPage(page) {
    let totalItems = rows.length;

    // Kiểm tra nếu không đủ sản phẩm để hiển thị thanh phân trang
    if (totalItems <= itemsPerPage) {
        document.querySelector(".listPage").style.display = "none";
        return;
    } else {
        document.querySelector(".listPage").style.display = "block";
    }

    for (let i = 0; i < totalItems; i++) {
        if (i < (page - 1) * itemsPerPage || i >= page * itemsPerPage) {
            rows[i].style.display = "none";
        } else {
            rows[i].style.display = "";
        }
    }
    listPage();
}

function listPage() {
    let count = Math.ceil(rows.length / itemsPerPage);
    document.querySelector(".listPage").innerHTML = "";

    console.log(rows.length);
    console.log(itemsPerPage);
    if (currentPage != 1) {
        let prev = document.createElement("li");
        prev.innerText = "PREV";
        prev.setAttribute("onclick", "changePage(" + (currentPage - 1) + ")");
        document.querySelector(".listPage").appendChild(prev);
    }
    console.log(count);
    for (i = 1; i <= count; i++) {
        let newPage = document.createElement("li");
        newPage.innerText = i;
        if (i == currentPage) {
            newPage.classList.add("active");
        }
        newPage.setAttribute("onclick", "changePage(" + i + ")");
        document.querySelector(".listPage").appendChild(newPage);
    }

    if (currentPage != count) {
        let next = document.createElement("li");
        next.innerHTML = "NEXT";
        next.setAttribute("onclick", "changePage(" + (currentPage + 1) + ")");
        document.querySelector(".listPage").appendChild(next);
    }
}
function changePage(i) {
    currentPage = i;
    showPage(currentPage);
}
document
    .getElementsByClassName("contain_select_numRow")[0]
    .addEventListener("change", () => {
        itemsPerPage = document.getElementById("selectNumRow").value;
        showPage(currentPage);
    });
// Hiển thị trang đầu tiên khi tải trang
showPage(currentPage);