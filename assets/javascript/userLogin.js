

document.addEventListener("click", function (event) {
    if (
        !menu.contains(event.target) &&
        !event.target.matches(".toggle-menu__icon")
    ) {
        menu.classList.remove("transform-100");
        menuToggle.classList.remove("transform-100");
        menuToggle.classList.add("transform-100");
    }
});

// nếu local storage chưa lưu trạng thái đăng nhập thì tạo mới
var login = JSON.parse(localStorage.getItem('login'));
if(login === null) {
    var trangthaiLogin = {
        isLogin: 0,
        nameLogin: ""
    };
    localStorage.setItem('login', JSON.stringify(trangthaiLogin));
}
// nếu local chưa có user thì tạo 1 tài khoản admin
var users = JSON.parse(localStorage.getItem('users')) || []

if(users.length == 0){
    var currentDate = new Date();
    var newUser = {
        isAdmin: 1,
        loginName: 'admin',
        passWord: '12345',
        userName: 'KietVIP',
        telephone: '0976077913',
        address: "Quận 6",
        block: 0,
        userBag: []
    }
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
}
// khi nhấn nút đăng ký
document.getElementsByClassName('btn-submit-register')[0].addEventListener('click', function(e) {
    e.preventDefault();
    
    var nameLogin = document.getElementById('register_name').value;
    var passWord = document.getElementById('register_password').value;
    var repassWord = document.getElementById('register_repassword').value;
    var nameUser = document.getElementById('user_name').value;
    var phoneNum = document.getElementById('phoneUser').value;
    var addressUser = document.getElementById('addressUser').value;
    
    var check = 0
    
    //check tên đăng nhập có tồn tại chưa
    var spanName = document.getElementById('span_for_nameLogin');
    const regexLoginName = /^[a-zA-Z0-9]+$/ ;
    if(nameLogin == ''){
        check++;
        spanName.innerHTML = "Vui lòng nhập trường này";
        spanName.style = "color: red; font-size: 12px;"
    } else if (!nameLogin.match(regexLoginName)){
        check++;
        spanName.innerHTML = "Tên đăng nhập chỉ được chứa kí tự chữ và số";
        spanName.style = "color: red; font-size: 12px;"
    }
    users.forEach(u => {
        if(u.loginName == nameLogin){
            check++;
            spanName.innerHTML = "Tên đăng nhập đã tồn tại";
            spanName.style = "color: red; font-size: 12px"
        }
    });
    if(check==0) spanName.innerHTML = '';
    
    //check mật khẩu
    var spanPass = document.getElementById('span_for_passWord');
    const regexPass = /^\S*$/;
    if(passWord.length<6){
        check++;
        spanPass.innerHTML = "Mật khẩu ít nhất 6 kí tự";
        spanPass.style = "color: red; font-size: 12px"
    } else if(!passWord.match(regexPass)){
        check++;
        spanPass.innerHTML = "Mật khẩu không được chứa khoảng trắng";
        spanPass.style = "color: red; font-size: 12px"
    } else spanPass.innerHTML=''
    // nhập lại mật khẩu
    var spanrePass = document.getElementById('span_for_repassWord');
    if(repassWord != passWord){
        check++;
        spanrePass.innerHTML = "Mật khẩu nhập lại chưa chính xác";
        spanrePass.style = "color: red; font-size: 12px"
    } else spanrePass.innerHTML=''
    // check tên user
    var spanNameUser = document.getElementById('span_for_userName');
    const regexNameUser = /^[\p{L}\d\s']+$/u;
    const regexSpace = /^.*\S.*$/;
    if(nameUser == ''){
        check++;
        spanNameUser.innerHTML = "Vui lòng nhập trường này";
        spanNameUser.style = "color: red; font-size: 12px"
    } else if(!nameUser.match(regexSpace)) {
        check++;
        spanNameUser.innerHTML = "Tên phải ít nhất 1 kí tự không phải khoảng trắng";
        spanNameUser.style = "color: red; font-size: 12px"
    } else if (!nameUser.match(regexNameUser)){
        check++;
        spanNameUser.innerHTML = "Tên không được chứa kí tự đặc biệt";
        spanNameUser.style = "color: red; font-size: 12px"
    }
    else spanNameUser.innerHTML=''

    //check sdt
    var spanPhoneNum = document.getElementById('span_for_phoneUser');
    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if(phoneNum == ''){
        check++;
        spanPhoneNum.innerHTML = "Vui lòng nhập trường này";
        spanPhoneNum.style = "color: red; font-size: 12px"
    } else if(!phoneNum.match(regexPhoneNumber)){
        check++;
        spanPhoneNum.innerHTML = "Số điện thoại không hợp lệ";
        spanPhoneNum.style = "color: red; font-size: 12px"
    } else spanPhoneNum.innerHTML=''

    //check địa chỉ
    var spanAddress = document.getElementById('span_for_addressUser');
    const regexAddress = /^[\p{L}0-9\s,.'-]{3,}$/u;
    if(addressUser == ''){
        check++;
        spanAddress.innerHTML = "Vui lòng nhập trường này";
        spanAddress.style = "color: red; font-size: 12px"
    } else if(!addressUser.match(regexAddress) || !addressUser.match(regexSpace)){
        check++;
        spanAddress.innerHTML = "Địa chỉ không hợp lệ";
        spanAddress.style = "color: red; font-size: 12px"
    } else spanAddress.innerHTML=''
    //var users = JSON.parse(localStorage.getItem('users')) || [];

    if(check === 0){
        var newUser = {
            isAdmin: 0,
            trangthaidangnhap: 0,
            loginName: nameLogin,
            passWord: passWord,
            userName: nameUser,
            telephone: phoneNum,
            address: addressUser,
            block: 0,
            userBag: []
            };
            users.push(newUser)
            localStorage.setItem('users', JSON.stringify(users));
            alert('Đăng ký thành công')
            location.reload()
    }
});

//khi nhấn nút đăng nhập
document.getElementsByClassName('btn-submit-login')[0].addEventListener('click', function(e) {
    e.preventDefault(); // Ngăn chặn sự kiện mặc định của nút submit

    //var aUserWantToDisable = document

    var nameLogin = document.getElementById('login_name').value;
    var passWord = document.getElementById('login_password').value;
    // Lấy dữ liệu từ localStorage
    var users = JSON.parse(localStorage.getItem('users'));
    
    if (users) {
        // Tìm kiếm trong mảng users
        var foundUser = users.find(function(user) {
            return user.loginName === nameLogin && user.passWord === passWord;
        });
        console.log(foundUser);
        if (foundUser) {
            if(foundUser.block == 1){
                alert('Tài khoản của bạn đã bị khóa do vi phạm!')
            } else if(foundUser.isAdmin == 0){
                // Đăng nhập thành công
                alert('Đăng nhập thành công!');
                var login = JSON.parse(localStorage.getItem('login'));
                login.isLogin=1;
                login.nameLogin = foundUser.loginName;
                localStorage.setItem('login', JSON.stringify(login));
                location.reload();
            } else if(foundUser.isAdmin == 1) {
                window.location.href = "indexADMIN.html"
            }
        } else {
            // Đăng nhập thất bại
            alert('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
    } else {
        // Trường hợp mảng users không tồn tại trong localStorage
        alert('Chưa có tài khoản nào được đăng ký.');
    }
});

//khi nhấn nút đăng xuất
var login = JSON.parse(localStorage.getItem('login'));
var btnLogOut = document.getElementById('btnLogOut');
var iconLogOut = document.getElementById('iconLogout');
if(login.isLogin==0) {
     btnLogOut.style.display = 'none';
     iconLogOut.style.display = 'none'
}

btnLogOut.addEventListener('click', function(e){

    btnLogOut.style.display='none';
    iconLogOut.style.display='none';
    var login = JSON.parse(localStorage.getItem('login'));
    login.isLogin=0;
    login.nameLogin = '';
    localStorage.setItem('login', JSON.stringify(login));
    var nameLogin = document.getElementById('UserNameHeader');
    nameLogin.textContent = "Đăng nhập";
    location.reload();
})

