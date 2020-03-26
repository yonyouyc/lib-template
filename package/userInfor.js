import { getUserInfo } from './service/service'

export const Ajax = (url, config, callback) => {
    const xhr = new XMLHttpRequest()
    config.method = config.method || 'GET'
    config.async = config.async === false ? false : true
    config.data = config.data || null
    xhr.open(config.method, url, config.async)
    xhr.onload = function() {
        if (xhr.status === 200) {
            callback && callback(JSON.parse(this.responseText))
        } else {
            console.error('Error occurred:' + this.statusText)
        }
    }
    xhr.send(config.data)
}
export const setCookie = function (name, value) {
    var Days = 1
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie =
        name + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
}
export const getCookie = function(sName) {
    var sRE = '(?:; )?' + sName + '=([^;]*);?'
    var oRE = new RegExp(sRE)

    if (oRE.test(document.cookie)) {
        return decodeURIComponent(RegExp['$1'])
    } else return null
}

export const getUserContext = () => {
    var userString = localStorage.getItem('user')
    // 判断本地是否登录
    if (userString) {
        var userObj = JSON.parse(userString)
        // 判断user里的用户和cookie里的用户是否一样
        var _yc_user = userObj.user.ucuserid + '_' + userObj.enterprise.tenantid
        if (userObj.user && _yc_user == getCookie('_yc_user')) {
            return userObj.user;
        } else {
            userObj = getUserInfo()
            return userObj?userObj.user:null
        }
    } else {
        var userObj = getUserInfo()
        return userObj?userObj.user:null

    }
}
export const getEnterpriseContext = () =>{
    var userString = localStorage.getItem('user')
    // 判断本地是否登录
    if (userString) {
        var userObj = JSON.parse(userString)
        // 判断user里的用户和cookie里的用户是否一样
        var _yc_user = userObj.user.ucuserid + '_' + userObj.enterprise.tenantid
        if (userObj.user && _yc_user == getCookie('_yc_user')) {
            return userObj.enterprise;
        } else {
            userObj = getUserInfo()
            return userObj?userObj.enterprise:null
        }
    } else {
        var userObj = getUserInfo()
        return userObj?userObj.enterprise:null
    }
}

export const isLogin = () => {
    var resData = getUserInfo()
    return !!resData
}

export const getEnterpriseId = () => {
    var enterprise = getEnterpriseContext()
    return enterprise?enterprise.id:''

}
export const getEnterpriseName = () => {
    var enterprise = getEnterpriseContext()
    return enterprise?enterprise.name:''
}
export const getTenantId = () =>{
    var enterprise = getEnterpriseContext()
    return enterprise?enterprise.tenantid:null
}