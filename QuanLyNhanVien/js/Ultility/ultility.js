/**
 * 
 * @param {str} str : nhận vào 1 chuỗi tiếng việt 
 * @returns 1 str tieng viet không dấu
 */
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
/**
 * 
 * @param {Mảng chứa các id input của form dùng để chạy vòng lặp tự DOM tới các input} arrInputIDs 
 * @param {Obj rỗng cần đc fill giá trị từ form vào} obj 
 * @returns OBj đã đc fill đầy đủ giá trị
 */
function createNewObject (arrInputIDs,obj) {
    for(var i = 0; i < arrInputIDs.length ; i++){
        var value = document.getElementById(arrInputIDs[i]).value;
        obj[arrInputIDs[i]] = value;
    };
    return obj;
}

/**
 * 
 * @param {mảng chứa objs cần in ra} arrObjs 
 * @param {mảng chứa các thuộc tính objs muốn in} arrAttributiesObj 
 * @param {id của table muốn in vào} idTableDisplay 
 */
function renderContentTable(arrObjs,arrAttributiesObj,idTableDisplay){
    var content = '';
    for (var i = 0 ; i < arrObjs.length ; i++){
        var obj = arrObjs[i];
        var row = '';
        for (var j = 0; j < arrAttributiesObj.length ; j ++){
            row += `<td>${obj[arrAttributiesObj[j]]}</td>`;
        };
        content += row + `
            <td>
                <button class="btn btn-danger" onclick="xoaNhanVien(${obj.tknv})">Xóa</button>
                <button class="btn btn-warning" onclick="suaNhanVien(${obj.tknv})" data-toggle="modal" data-target="#myModal">Sửa</button>
            </td>
        </tr>`;
    };
    document.getElementById(idTableDisplay).innerHTML = "<tr>" + content;
}
/**
 * Function lưu data vào localStorage
 */
function luuDataLocal(key,arrObjs){
    //chuyen mang thành dang json
    var newArr = JSON.stringify(arrObjs);
    localStorage.setItem(key,newArr);
}
/**
 * Function lấy dữ liệu từ dưới localStorage 
 */
function getDataLocal(key){
    var arr = localStorage.getItem(key);
    //lưu ý nếu dữ liệu phải khác NULL => key nhập vào không khớp với dữ liệu trên local
    console.log(`>>> MẢn lấy từ localstorage`,arr);
    
    if(arr != null){
        //chuyển đổi dữ liệu về dữ liệu ban đầu
        var newArr = []; 
        newArr = JSON.parse(arr);
        return newArr;
    }
}