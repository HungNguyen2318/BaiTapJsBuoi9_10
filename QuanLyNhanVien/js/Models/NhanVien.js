function NhanVien () {
    this.tknv = '';
    this.name = '';
    this.email = '';
    this.password = '';
    this.datepicker = '';
    this.luongCB = 0;
    this.chucvu = '';
    this.gioLam = '';
    this.tongLuong = 0;
    this.loaiNV = '';
    
    this.tinhTongLuong = function() {
        if(this.chucvu == 'Sếp' ){
            return this.luongCB * 3;
        };  
        if(this.chucvu == 'Trưởng Phòng'){
            return this.luongCB * 2;
        }
        if(this.chucvu == 'Nhân Viên'){
            return this.luongCB * 1;
        }
    };
    this.xepLoaiNV = function() {
        if(this.gioLam < 160 ){
            return 'Trung Bình';
        };  
        if(160 <= this.gioLam < 176){
            return 'Khá';
        }
        if(176 <= this.gioLam < 192){
            return 'Giỏi';
        }
        if(192 <= this.gioLam) {
            return 'Xuất Sắc';
        }
    };
}