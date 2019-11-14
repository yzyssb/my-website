//文章分类列表
export function getCategory(data) {
    return axios({
        url: '/getCategory',
        method: 'post',
        data: data
    })
}

//新增、修改文章分类
export function handleCategory(data) {
    return axios({
        url: '/handleCategory',
        method: 'post',
        data: data
    })
}

//删除文章分类
export function deleteCategory(data) {
    return axios({
        url: '/deleteCategory',
        method: 'post',
        data: data
    })
}

//所有文章列表
export function getAllArticles(data) {
    return axios({
        url: '/getAllArticles',
        method: 'post',
        data: data
    })
}

//查询分类下的文章列表
export function getArticlesByCategoryId(data) {
    return axios({
        url: '/getArticlesByCategoryId',
        method: 'post',
        data: data
    })
}

//新增、修改文章
export function handleArticle(data) {
    return axios({
        url: '/handleArticle',
        method: 'post',
        data: data
    })
}

//删除文章
export function deleteArticle(data) {
    return axios({
        url: '/deleteArticle',
        method: 'post',
        data: data
    })
}

//文章详情
export function getArticleDetail(data) {
    return axios({
        url: '/getArticleDetail',
        method: 'post',
        data: data
    })
}