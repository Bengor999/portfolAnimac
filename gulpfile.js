//Импортируем основной модуль галп
import gulp from "gulp";

//Импортируем пути
import { path } from "./gulp/config/path.js";

//Импортируем общие плагины
import { plugins } from "./gulp/config/plugins.js";

//Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}

//Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
// import { otfToTtf, ttfToWoff, fontStyle } from "./gulp/tasks/fonts.js";


//Наблюдатель за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}

// //Обработка шрифтов
// //последовательно
// const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle);

//Основные задачи
//последовательно (некоторые Параллельно)
// const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
const mainTasks = gulp.parallel(copy, html, scss, js, images);

//Построение сценария выполнения задач
//Последовательно (некоторые параллельно)
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

//Экспорт сценариев
export { dev }
export { build }


//Выполнение сценария по умолчанию
gulp.task(`default`, dev);