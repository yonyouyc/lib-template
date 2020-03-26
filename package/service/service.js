import {Ajax,setCookie} from "../userInfor";

export function getUserInfo() {
    let result = null;
    Ajax(`/yuncai/ebvplogin`, {method: 'GET', async: false}, (data) => {
        if (!data.needrelogin) {
            // 重写cookie 和 localStorage
            setCookie('_yc_user', data.user.ucuserid + '_' +data.enterprise.tenantid)
            window.localStorage.setItem('user', JSON.stringify(data))
            result = data;
        }
    });
    return result;
}


