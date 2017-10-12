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

    /**
     * 获取词条在各搜索引擎中的收录情况
     * @return {Array}
     */
    function getListSiteRecord() {
        var arr = [];

        var jTable = $('.cha-index-wrap .table:last');

        var keyArr = $('tr:eq(0) td', jTable).map(function () {
            return $.trim($(this).text());
        });

        var valueArr = $('tr:eq(1) td', jTable).map(function () {
            return $.trim($(this).text());
        });

        for (var i = 1, length = keyArr.length; i < length; i++) {
            arr.push({
                name: keyArr[i],
                value: valueArr[i]
            });
        }

        return arr;
    }

    /**
     * 获取来路关键词
     * @return {Array}
     */
    function getListPcFromKeys() {
        var arr = [];

        var jTable = $('#c1 .list .tabs-content:last .table');

        var keyArr = [];
        $('tr:eq(0) td', jTable).each(function () {
            keyArr.push(_getPureStr($(this).text()));
        });

        arr.push(keyArr);

        $('#baidurank_keywords_pc tr').each(function () {
            var valueArr = [];

            $('td', $(this)).map(function () {
                valueArr.push(_getPureStr($(this).text()));
            });

            arr.push(valueArr);
        });

        return arr;
    }

    /**
     * 获取MATE关键词
     * @return {Array}
     */
    function getListMetaKeys() {
        var arr = [];

        var jTable = $('#c1 .list .tabs-content:first .table');

        var keyArr = [];
        $('tr:eq(0) td', jTable).each(function () {
            keyArr.push(_getPureStr($(this).text()));
        });

        arr.push(keyArr);

        $('#webpage_keywords tr').each(function () {
            var valueArr = [];

            $('td', $(this)).map(function () {
                valueArr.push(_getPureStr($(this).text()));
            });

            arr.push(valueArr);
        });

        return arr;
    }

    function _getPureStr(str) {
        if (typeof str !== 'string') {
            return str;
        }
        return $.trim(str).replace(/[\n\r]/gi, ' ').replace(/\s+/gi, ' ');
    }

    return {
        getListSeoBasic: getListSeoBasic,
        getListIndexChange: getListIndexChange,
        getListSiteRecord: getListSiteRecord,
        getListPcFromKeys: getListPcFromKeys,
        getListMetaKeys: getListMetaKeys,
    };
})();