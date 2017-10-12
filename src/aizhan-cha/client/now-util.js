var NOW_UTIL = (function () {

    /**
     * 获取 SEO 信息
     * @return {Array}
     */
    function getListSeoBasic() {
        var arr = [];

        arr.push({
            name: '百度来路',
            value: $('#baidurank_ip').text()
        });

        arr.push({
            name: '移动来路',
            value: $('#baidurank_m_ip').text()
        });

        arr.push({
            name: '出站链接',
            value: $('#webpage_link_o').text()
        });

        arr.push({
            name: '首页內链',
            value: $('#webpage_link_i').text()
        });

        return arr;
    }

    return {
        getListSeoBasic: getListSeoBasic
    }
})();