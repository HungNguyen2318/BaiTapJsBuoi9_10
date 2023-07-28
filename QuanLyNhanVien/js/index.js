//mảng chứa tất cả ID của input trong form
var arrInputIDs = [
    'tknv',
    'name',
    'email',
    'password',
    'datepicker',
    'luongCB',
    'chucvu',
    'gioLam',
];
//mảng thuộc tính của nhân viên muốn hiện lên table
var arrAttributiesNhanVien = [
    'tknv',
    'name',
    'email',
    'datepicker',
    'chucvu',
    'tongLuong',
    'loaiNV',
];
//mảng chứa danh sách nhân viên
var arrNhanVien = [];
//gọi hàm lấy dữ liệu local khi khởi chạy
arrNhanVienLocal = getDataLocal('arrNhanVien');
if (arrNhanVienLocal) {
    arrNhanVien = arrNhanVienLocal;
}
console.log(`>>> Mảng nhân viên lấy từ local: `,arrNhanVien);
renderContentTable(arrNhanVien,arrAttributiesNhanVien,'tableDanhSach');
//thêm nhân viên
function themNhanVien(){
    console.log('>>> This is function Thêm Nhân Viên');
    //ngăn trang reload lại mỗi khi click vào
    event.preventDefault();
    //tạo 1 obj rỗng
    var newNhanVien = new NhanVien();
    //dùng hàmg tạo object để tạo nhân viên mới và gán ngược lại vào obj rỗng vừa tạo
    newNhanVien = createNewObject(arrInputIDs,newNhanVien);
    //Thêm thuộc tính tổng lương và loại nhân viên
    newNhanVien.tongLuong = newNhanVien.tinhTongLuong();
    newNhanVien.loaiNV = newNhanVien.xepLoaiNV();
    //thêm nhân viên vào mảng
    console.log(newNhanVien.tknv + "++++")
    var valid = validValues(newNhanVien);
    console.log(valid);
    if (valid) {
        arrNhanVien.push(newNhanVien);
        //lưu dữ liệu xuống localhost
        luuDataLocal('arrNhanVien',arrNhanVien);
        //render lại table
        renderContentTable(arrNhanVien,arrAttributiesNhanVien,'tableDanhSach');
    }
}
//xóa nhân viên
function xoaNhanVien(tknv) {
    console.log(`>>> Bắt đầu xóa Nhân Viên - Key :`, tknv, `...`);
    //tạo 1 biến index
    var index = -1;
    for(var i = 0; i < arrNhanVien.length ; i++){
        if(arrNhanVien[i].tknv == tknv){
            index = i;
            console.log(`>>> Nhân viên sắp bị xóa: `,arrNhanVien[i]);
        }
    }
    arrNhanVien.splice(index,1);
    console.log(`>>> Mảng nhân viên sau khi xóa tại vị trí :`,i, arrNhanVien);
    luuDataLocal('arrNhanVien',arrNhanVien);
    renderContentTable(arrNhanVien,arrAttributiesNhanVien,'tableDanhSach');
}
//sửa thông tin nhân viên
function suaNhanVien(tknv) {
    console.log(`>>> Đây là hàm sửa nhân viên`,tknv);
    //tạo 1 biến index
    var index = -1;
    for(var i = 0 ; i <arrNhanVien.length ; i++){
        if(arrNhanVien[i].tknv == tknv){
            index = i;
        }
    }
    var nhanVien = arrNhanVien[index];
    for(var i = 0; i < arrInputIDs.length ; i++){
        document.getElementById(arrInputIDs[i]).value = nhanVien[arrInputIDs[i]];
    }
    document.getElementById('tknv').toggleAttribute('readOnly');
}
//cập nhật thông tin nhân viên
function capNhatNhanVien(){
    console.log('>>> Đang cập nhật nhân viên...');
    var nhanVien = new NhanVien();
    nhanVien = createNewObject(arrInputIDs,nhanVien);
    //Thêm thuộc tính tổng lương và loại nhân viên
    nhanVien.tongLuong = nhanVien.tinhTongLuong();
    nhanVien.loaiNV = nhanVien.xepLoaiNV();
    //tìm toi du lieu sinh vien cu dang dung
    for(var i = 0; i< arrNhanVien.length; i++){
        if(nhanVien.tknv == arrNhanVien[i].tknv){
            arrNhanVien[i] = nhanVien;
        }
    }
    luuDataLocal('arrNhanVien',arrNhanVien);
    renderContentTable(arrNhanVien,arrAttributiesNhanVien,'tableDanhSach');
}
//hàm tìm kiếm nhân viênn theo loại
function searchNhanVien(){
    var key = event.target.value.toLowerCase().trim();
    //chuyenẻ đổi về lowercase, loại bỏ khoản cách
    var newKey = removeVietnameseTones(key);
    console.log(newKey);
    //hàm giúp kiểm tra ký tự có trong chuỗi hay ko
    //includes
    var arrKetQuaTimKiem = [];
    for (var i = 0; i < arrNhanVien.length; i++ ){
        var loaiNV = arrNhanVien[i].loaiNV.toLowerCase().trim();
        var new_loaiNV = removeVietnameseTones(loaiNV);
        console.log(new_loaiNV)
        if( new_loaiNV.includes(newKey)){
            arrKetQuaTimKiem.push(arrNhanVien[i]);
        }
    }
    console.log(arrKetQuaTimKiem);
    if(!arrKetQuaTimKiem){
        arrKetQuaTimKiem = arrNhanVien;
    }
    renderContentTable(arrKetQuaTimKiem,arrAttributiesNhanVien,'tableDanhSach');
}
//function validate
function validValues (newNhanVien) {
    console.log(">>> Đây là hàm check valid ...");
    var flag = false;
    if(checkTKNV(arrNhanVien,newNhanVien.tknv)
    &&checkValidateEmail(newNhanVien.email)
    &&checkName (newNhanVien.name)
    &&checkPassword (newNhanVien.password)
    &&checkLuongCB(newNhanVien.luongCB)
    &&checkChucVu(newNhanVien.chucvu)
    &&checkGioLam(newNhanVien.gioLam)){
        flag = true;
    }
    return flag;
}
