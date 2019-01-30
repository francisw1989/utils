let funs = {
    getUrlParam(name) {
        let url = location.search;
        paramStr = url.substring(1);
        let param = this.urlToObj(paramStr);
        if (name) {
            return param[name];
        }
        return param;
    },
    urlToObj(paramStr) {
        let urlParam = null;
        if (paramStr) {
            let params = paramStr.split('&');
            for (let p in params) {
                if (!urlParam) {
                    urlParam = {};
                };
                let param = params[p].split('=');
                urlParam[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
            }
        }
        return urlParam;
    },
    
    ajax(param) {
        let ajax = new XMLHttpRequest();
        ajax.open(param.type, param.url);
        ajax.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        ajax.send();
        ajax.onreadystatechange = () => {
            if (ajax.readyState == 4 && ajax.status == 200) {
                try {
                    param.success(JSON.parse(ajax.responseText));
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
};
exports.yzfPublicUtils = funs;