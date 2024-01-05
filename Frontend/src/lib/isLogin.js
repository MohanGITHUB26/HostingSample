// import lib
import getAuthToken from "./localStorage";

const isLogin = () => {
    let token = getAuthToken();

    if (token) {
        return true;
    }

    return false;
}

export default isLogin;