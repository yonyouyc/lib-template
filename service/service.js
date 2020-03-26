import {Ajax,setCookie} from "../package/userInfor";

export function getUserInfo() {
    let result = {};
    Ajax(`/yuncai/ebvplogin`, {method: 'GET', async: false}, (data) => {
        if (!data.needrelogin) {
            // 重写cookie 和 localStorage
            setCookie('_yc_userid', data.user.ucuserid)
            window.localStorage.setItem('user', JSON.stringify(data))
            result = data;
        } else {
            return null
        }
    });
    return result;
}


