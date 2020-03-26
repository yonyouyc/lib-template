import { getUserInfo } from '../service/service'

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
        if (userObj.user && userObj.user.ucuserid == getCookie('_yc_userid')) {
            return userObj.user;
        } else {
            userObj = getUserInfo()
            if (userObj) {
                return userObj.user
            } else {
                return null
            }
        }
    } else {
        var userObj = null
        userObj = getUserInfo()
        if (userObj) {
            return userObj.user
        } else {
            return null
        }
    }
}

export const isLand = () => {
    var isLand
    var resData = getUserInfo()
    if (resData) {
        isLand = true
    } else {
        isLand = false
    }
    return isLand
}

export const getEnterpriseId = () => {
    var user = getUserContext()
    if (user) {
        return user.enterpriseId
    } else {
        return null
    }

}
export const getEnterpriseName = () => {
    var user = getUserContext()
    if (user) {
        return user.getEnterpriseName
    } else {
        return null
    }
}
export const getTenantId = () =>{
    var user = getUserContext()
    if (user) {
        return user.tenantid
    } else {
        return null
    }
}