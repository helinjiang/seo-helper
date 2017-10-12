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

        $('#baidurank_keywords_pc tr').each(function (index) {
            var jTd = $('td', $(this));

            var obj = {};

            obj.index = index;

            // 关键词
            obj.keyword = _getPureStr(jTd.eq(0).text());

            // 百度排名
            obj.baiduRank = _getPureStr(jTd.eq(1).text());

            // 百度指数
            obj.baiduIndex = _getPureStr(jTd.eq(2).text());

            // PC指数
            obj.pcIndex = _getPureStr(jTd.eq(3).text());

            // 移动指数
            obj.mIndex = _getPureStr(jTd.eq(4).text());

            // 收录量
            obj.recordCount = _getPureStr(jTd.eq(5).text());

            arr.push(obj);
        });

        return arr;
    }

    /**
     * 获取MATE关键词
     * @return {Array}
     */
    function getListMetaKeys() {
        var arr = [];

        $('#webpage_keywords tr').each(function (index) {
            var jTd = $('td', $(this));

            var obj = {};

            obj.index = index;

            // 关键词
            obj.keyword = _getPureStr(jTd.eq(0).text());

            // 出现频率
            obj.frequency = _getPureStr(jTd.eq(1).text());

            // 2%≦密度≦8%
            obj.density = _getPureStr(jTd.eq(2).text()).replace(/\%/gi, '');

            // 百度指数
            obj.indexBaidu = _getPureStr(jTd.eq(3).text()).replace(/\,/gi, '');

            // 360指数
            obj.index360 = _getPureStr(jTd.eq(4).text()).replace(/\,/gi, '');

            arr.push(obj);
        });

        return arr;
    }

    /**
     * 设置MATE关键词的排名情况
     * @return {Array}
     */
    function setListMetaKeysRank(arr) {
        arr.forEach(function (item) {
            // 百度排名
            item.baiduRank = _getPureStr($('#keywords_postion_' + (item.index + 1)).text());

            // 排名变化

            // 预计流量
            item.expectIp = _getPureStr($('#keywords_postion_ip_' + (item.index + 1)).text());
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
        setListMetaKeysRank: setListMetaKeysRank
    };
})();