var arrNotiIDs = [
    'tbTKNV',
    'tbTen',
    'tbEmail',
    'tbMatKhau',
    'tbNgay',
    'tbLuongCB',
    'tbChucVu',
    'tbGiolam',
];

function checkTKNV(arrNhanVien,tknv){
    console.log(">>> Hàm check TKNV");
    console.log(arrNhanVien);
    console.log(`>>>`,tknv.length);
    for ( var i = 0 ; i < arrNhanVien.length ; i ++ ){
        if( tknv == arrNhanVien[i].tknv){   
            console.log(`>>> check duplicate`)        
            document.getElementById('tbTKNV').innerHTML = "Tài khoản đã tồn tại";
            document.getElementById('tbTKNV').style.display = 'block';
            return false;
        }
        if( tknv.length <  4 || tknv.length > 6) {
            console.log('>>> check empty');
            document.getElementById('tbTKNV').innerHTML = "Tài khoản tối đa 4 - 6 ký số";
            document.getElementById('tbTKNV').style.display = 'block';
            return false;
        }     
    }
    document.getElementById('tbTKNV').style.display = 'none';
    return true;
}

function checkValidateEmail(email) {
    console.log('hàm check email...',email)
    var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; 
    if(regexEmail.test(email)){
        document.getElementById('tbEmail').style.display = 'none';
        return true;
    }else {
        console.log(`>>> check email`)        
        document.getElementById('tbEmail').innerHTML = "Email phải đúng định dạng, không để trống";
        document.getElementById('tbEmail').style.display = 'block';
        return false;
    }
}

function checkName (name){
    var regexName = /^[a-zA-Z]+$/;
    if(regexName.test(removeVietnameseTones(name))){
        document.getElementById('tbTen').style.display = 'none';
        return true;
    }else {
        document.getElementById('tbTen').innerHTML = "Tên nhân viên phải là chữ, không để trống";
        document.getElementById('tbTen').style.display = 'block';
        return false;
    }
}

function checkPassword(pw){
    var regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,10}$/;
    if(regexPassword.test(pw)){
        document.getElementById('tbMatKhau').style.display = 'none';
        return true;
    }else {
        document.getElementById('tbMatKhau').innerHTML = "Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt),không để trống";
        document.getElementById('tbMatKhau').style.display = 'block';
        return false;
    }
}
function checkDay(day){
    console.log(day);
    var regexDate = /^\d{2}[/]d{2}[/]\d{4}$/;
    if(regexDate.test(day)){
        document.getElementById('tbNgay').style.display = 'none';
        return true;
    }else {
        document.getElementById('tbNgay').innerHTML = "Ngày làm không để trống, định dạng mm/dd/yyyy";
        document.getElementById('tbNgay').style.display = 'block';
        return false;
    }
}
function checkLuongCB(luongCB){
    if(luongCB < 1000000 || luongCB > 20000000){
        document.getElementById('tbLuongCB').innerHTML = "Lương cơ bản 1 000 000 - 20 000 000, không để trống";
        document.getElementById('tbLuongCB').style.display = 'block';
        return false;
    }else {
        document.getElementById('tbLuongCB').style.display = 'none';
        return true;
    }

}
function checkChucVu(chucvu){
    if(chucvu == ''){
        document.getElementById('tbChucVu').innerHTML = "Chức vụ phải chọn chức vụ hợp lệ (Giám đốc, Trưởng Phòng, Nhân Viên)";
        document.getElementById('tbChucVu').style.display = 'block';
        return false;
    }else {
        document.getElementById('tbChucVu').style.display = 'none';
        return true;
    }
}
function checkGioLam(gioLam){
    if(80 <= gioLam <= 200 && gioLam != ''){
        document.getElementById('tbGiolam').style.display = 'none';
        return true;
    }else{
        document.getElementById('tbGiolam').innerHTML = "Số giờ làm trong tháng 80 - 200 giờ, không để trống";
        document.getElementById('tbGiolam').style.display = 'block';
        return false;
    }
}