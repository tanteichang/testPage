

function initApplication(el) {
    var dataSource = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: `https://raw.githubusercontent.com/tanteichang/testPage/master/data/datax.json?date=${new Date().getTime()}`,
    });
    var jqueryEl = $(el)
    jqueryEl.on('typeahead:select', function (unused, obj) {
        return navigate(obj);
    });
    jqueryEl.keyup(function (k) {
        if (k.keyCode === 13) {
            var selectables = jqueryEl.siblings(".tt-menu").find(".tt-selectable");
            $(selectables[0]).trigger("click");
        }
    });
    function navigate(record) {
        window.location.href = "https://www.npmjs.org/package/@types/" + record.value;
    }
    jqueryEl.typeahead(
        null,
        {
            name: 'dependenciesSearch',
            display: 'value',
            source: dataSource,
            templates: {
                empty: [
                    '<div class="empty-message">',
                      '暂未收录此库，请点击此<a href="https://www.google.com">链接</a>进行反馈',
                    '</div>'
                  ].join('\n'),
            },
        },
    );
}