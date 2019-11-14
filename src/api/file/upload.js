// import axios from "axios";

export function upload(formdata) {
    return axios({
        url: "/upload",
        method: "post",
        data: formdata
    });
}

// 上传文件
export function uploadFile(url, formdata) {
    return axios({
        url: url,
        method: "post",
        data: formdata
    });
}
