# Плагин jQuery AJAX перезагрузки

## Описание

Плагин предназначен для ajax загрузки содержимого для нажатой ссылки.
Например, для загрузки следующий страницы или раздела без перезагрузки.

## Использование

    $('a.selector').ajaxLoad({
        cache: true, // кэшировать результат
        target: null, // id цели (в этот элемент будут вставляться новые данного такого же элемента)
        scripts: false, // Выполнять подключаемые скрипты
        inlineScripts: true, // Выполнять инлайновые скрипты
        onbefore: null, // callback перед обновлением
        onafter: null, // callback после обновления
        onerror: null, // callback на ошибку
    });

Подвержены работе будут только ссылки.
Если у неё есть атрибут **data-ajax-target**, то он будет использоваться приоритетнее.

## Пример

    # Страница /news/133

    // ...

    <main id="content">
        <h3>Новость 133</h3>
        <p>lorem ipsum</p>
    </main>
    <a class="navigation-link" href="/news/132" data-ajax-target="content">Предыдущая новость</a>
    <a class="navigation-link" href="/news/134" data-ajax-target="content">Следующая новость</a>

    <script>
        $('a.navigation-link').ajaxLoad({
            inlineScripts: false,
            target: "content",
            onafter: function () {
                console.log('Loaded!');
            }
        });
    </script>

## Кеширование

Страницы кешируются до перезагрузки страницы.
В качестве ключа кеш использует **href** ссылки.