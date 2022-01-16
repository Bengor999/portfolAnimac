
// import fileinclude from "gulp-file-include";
import webpHtmlNoSvg from "gulp-webp-html-nosvg"; //Переделка ссылок на все картинки для WEBP
import versionNumber from "gulp-version-number"; //добавление версии файлов(только для режима разработчика)
import pug from "gulp-pug"; 

export const html = () => {
    return app.gulp.src(app.path.src.html) 
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        // .pipe(fileinclude())
        .pipe(pug({
            //сжатие HTML
            pretty: true,
            //Показывать в терминале какой файл обработан
            verbose: true
        }))
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpHtmlNoSvg()
            )
        )
        .pipe(
            app.plugins.if(
                app.isDev,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js',
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browserSync.stream())

}