import md5 from 'js-md5';

class Identify {
    static SESSION_STOREAGE = 1;
    static LOCAL_STOREAGE = 2;

    //main functions
    
    static makeid() {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 20; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return md5(text + Date.now());
    }

    static showLoading() {
        $(document).ready(function () {
            $('#app-loading').css({display: 'flex'});
        });
    }

    static hideLoading() {
        $(document).ready(function () {
            $('#app-loading').css({display: 'none'});
            $('#app-loading-more').css({display: 'none'});
        });
    }
}

export default Identify;
