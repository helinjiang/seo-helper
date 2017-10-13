var NOW_UTIL = (function () {

    /**
     * 获取词条收录变化等信息
     * @return {Array}
     */
    function getListIndexChange() {
        var arr = [];

        var jTable = $('#seoinfo').next('.SEOMainWrap01');

        var keyArr = $('.col-gray02 .Ma01LiRow', jTable).map(function () {
            return _getPureStr($(this).text());
        });

        var valueArr = $('.bbn .Ma01LiRow', jTable).map(function () {
            return _getPureStr($(this).text());
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

        var jTable = $('#contentImg').next('.SEOMainWrap01');

        var keyArr = $('.col-gray02 .Ma01LiRow', jTable).map(function () {
            return _getPureStr($(this).text());
        });

        var valueArr = $('li:eq(2) .Ma01LiRow', jTable).map(function () {
            return _getPureStr($(this).text());
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
     * 获取PC来路关键词
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
            obj.baiduIndex = _getPureNumber(jTd.eq(2).text());

            // PC指数
            obj.pcIndex = _getPureNumber(jTd.eq(3).text());

            // 移动指数
            obj.mIndex = _getPureNumber(jTd.eq(4).text());

            // 收录量
            obj.recordCount = _getPureNumber(jTd.eq(5).text());

            arr.push(obj);
        });

        return arr;
    }

    /**
     * 获取移动来路关键词
     * @return {Array}
     */
    function getListMobileFromKeys() {
        var arr = [];

        $('#baidurank_keywords_mobile tr').each(function (index) {
            var jTd = $('td', $(this));

            var obj = {};

            obj.index = index;

            // 关键词
            obj.keyword = _getPureStr(jTd.eq(0).text());

            // 百度排名
            obj.baiduRank = _getPureStr(jTd.eq(1).text());

            // 移动指数
            obj.mIndex = _getPureNumber(jTd.eq(4).text());

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

        $('#seov2kwsort li').each(function (index) {
            if (index < 1) {
                return;
            }

            var jTd = $('.Ma01LiRow', $(this));

            var obj = {};

            obj.index = index - 1;

            // 关键词
            obj.keyword = _getPureStr(jTd.eq(0).text());

            // PC 指数
            obj.indexBaiduPC = _getPureNumber(jTd.eq(1).text());

            // 移动指数
            obj.indexBaiduMobile = _getPureNumber(jTd.eq(2).text());

            // 360指数
            obj.index360 = _getPureNumber(jTd.eq(3).text());

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
            var baiduRank = _getPureStr($('#baidu_' + item.index + '_2').text());
            if (baiduRank === '重试' || baiduRank === '查询' || baiduRank === '') {
                baiduRank = '获取失败';
            }

            item.baiduRank = baiduRank;

            // 排名变化

            // 预计流量
            var expectIp = _getPureStr($('#baidu_' + item.index + '_1').text());
            if (expectIp === '重试' || expectIp === '查询' || expectIp === '') {
                expectIp = '获取失败';
            }

            item.expectIp = expectIp;
        });

        return arr;
    }

    function _getPureStr(str) {
        if (typeof str !== 'string') {
            return str;
        }
        return $.trim(str).replace(/[\n\r]/gi, ' ').replace(/\s+/gi, ' ');
    }

    function _getPureNumber(str) {
        if (typeof str !== 'string') {
            return str;
        }
        return _getPureStr(str).replace(/\,/gi, '');
    }

    return {
        getListIndexChange: getListIndexChange,
        getListSiteRecord: getListSiteRecord,
        getListPcFromKeys: getListPcFromKeys,
        getListMobileFromKeys: getListMobileFromKeys,
        getListMetaKeys: getListMetaKeys,
        setListMetaKeysRank: setListMetaKeysRank
    };
})();