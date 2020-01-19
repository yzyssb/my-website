//新闻列表
export function dyArticleList(data) {
    return axios({
        url: '/dyArticleList',
        method: 'post',
        data: data
    })
}
//分类列表
export function dyCategoryList(data) {
    return axios({
        url: '/dyCategoryList',
        method: 'post',
        data: data
    })
}
//编辑
export function dyNewArticle(data) {
    return axios({
        url: '/dyNewArticle',
        method: 'post',
        data: data
    })
}
//删除
export function dyDelete(data) {
    return axios({
        url: '/dyDelete',
        method: 'post',
        data: data
    })
}
//上传图片
export function multiUpload(data) {
    return axios({
        url: '/multiUpload',
        method: 'post',
        data: data,
        contentType: false,
        processData: false,
    })
}
//从服务器上删除图片
export function delFile(data) {
    return axios({
        url: '/delFile',
        method: 'post',
        data: data
    })
}
export function delAllFiels(data) {
    return axios({
        url: '/delAllFiels',
        method: 'post',
        data: data
    })
}