$.fn.ajaxLoad = function (params) {
    var cache = new Map;
    var options = Object.assign({
        cache: true,
        scripts: false,
        inlineScripts: true,
        onbefore: null,
        onafter: null,
        onerror: null,
        target: null,
    }, params);
    
    var links = this.filter('a');

    var applyResult = function (target, result) {
        if (options.onbefore instanceof Function) {
            options.onbefore($this, target, result);
        }

        target.html(result);

        if (options.onafter instanceof Function) {
            options.onafter($this, target, result);
        }
    };

    links.on('click', function (e) {
        e.preventDefault();

        var $this = $(this);
        var url = $this.attr('href');
        var targetSelector = $this.data('ajax-target') || options.target;
        var target = $( document.getElementById(targetSelector) );

        if (options.cache && cache.has(url)) {
            applyResult(target, cache.get(url));
            return;
        }

        $.ajax({
            url: url,
            method: 'GET',
            success: function (html) {
                var result = $( $(html).find('#' + targetSelector).html() );

                if (!options.scripts) {
                    result = result.filter(function () {
                        return !$(this).is('script[src]');
                    });
                }

                if (!options.inlineScripts) {
                    result = result.filter(function () {
                        return !$(this).is('script');
                    });
                }

                if (options.cache) {
                    cache.set(url, result);
                }

                applyResult(target, result);
            },
            error: function (err) {
                if (options.onerror instanceof Function) {
                    options.onerror(err, $this);
                }
            }
        });
    });

   
}
