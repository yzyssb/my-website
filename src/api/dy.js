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