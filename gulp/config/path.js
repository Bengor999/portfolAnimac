
//Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());


const buildFolder = `./dist`; 
const srcFolder = `./src`;

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        images: `${buildFolder}/img/`,
        // fonts: `${buildFolder}/fonts/`,
        html: `${buildFolder}/`,
        files: `${buildFolder}/files/`,
    }, ///Обьект путей к папкам с результатаом 
    src: {
        js: `${srcFolder}/js/app.js`,
        scss: `${srcFolder}/scss/style.scss`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        html: `${srcFolder}/*.pug`, //заменить на .html если нaдо работать с HTML
        files: `${srcFolder}/files/**/*.*`,
    },  //обьект путей к исходникам
    watch: {
        js: `${srcFolder}/**/*.js`,
        scss: `${srcFolder}/**/*.scss`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        html: `${srcFolder}/**/*.pug`,  //заменить на .html если нaдо работать с HTML
        files: `${srcFolder}/files/**/*.*`,
    }, //папки за которыми следить
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``   //Папка на удаленном FTP сервере 
}