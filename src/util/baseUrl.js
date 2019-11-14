let baseURL=''
if (process.env.NODE_ENV == "development") {
    baseURL = 'http://192.168.1.195/tp5/public';
} else if (process.env.NODE_ENV == "production") {
    baseURL = window.location.protocol + "//yangzhiyuan.top"
}
export default baseURL;