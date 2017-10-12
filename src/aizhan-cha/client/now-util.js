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

    /**
     * 获取词条收录变化等信息
     * @return {Array}
     */
    function getListIndexChange() {
        var arr = [];

        var jTable = $('.cha-index-change-wrap .table');

        var keyArr = $('tr:eq(0) td', jTable).map(function () {
            return $(this).text();
        });

        var valueArr = $('tr:eq(1) td', jTable).map(function () {
            return $(this).text();
        });

        for (var i = 0, length = keyArr.length; i < length; i++) {
            arr.push({
                name: keyArr[i],
                value: valueArr[i]
            });
        }

        return arr;
    }

    return {
        getListSeoBasic: getListSeoBasic,
        getListIndexChange: getListIndexChange
    };
})();