

export default class GeneralPage {
  constructor() {
    this.source = 0;
    this.dest = 0;
    this.len = 0;
    this.now = 0;
    this.delay = 100;
    this.letters = 1;
    this.logicSwitchShowText = true;
    this.logicSwitchhammerEndPin = true;
    this.listener();

    }
  

  //вешаем слушателей
  listener() {
    let that = this;
    // Запускаем функцию при прокрутке страницы
    window.addEventListener('scroll', function() {
      that.visibleElement(document.querySelector('.quote__content-text'));
    });
    // А также запустим функцию сразу. А то вдруг, элемент изначально видно
    that.visibleElement (document.querySelector('.quote__content-text'));
    //Вешаем слушателя для молотки и гвозди
    that.hammerEndPin()
    //Вешаем слушателя для молотки и гвозди
    that.helpBtnListener()
  }
  
    

  //Запуск вывода текста
  showText() {
    if (this.logicSwitchShowText) {
      this.logicSwitchShowText = false;
      this.source = document.querySelector(".quote__content-text_hidden");
      this.dest = document.querySelector(".quote__content-text");
      this.len = this.source.innerHTML.length;
      //ОБЯЗАТЕЛЬНО везде стрелочные функции, setTimeout ломает this-ссылку!!!
      setTimeout(() => {this.showSignPosition()}, 10000)

      this.show();

    }
  }

  //Повторяемый побуквенный вывод текста
  show() {
    this.dest.innerHTML += this.source.innerHTML.substr(this.now,this.letters);
    this.now+=this.letters;
    if(this.now<this.len) {setTimeout(() => {this.show()},100)};
  };

  //Показ подписи и должности
  showSignPosition() {
    let sign = document.querySelector(".quote__content-text-sign");
    let position = document.querySelector(".quote__content-text-position");
    sign.classList.remove("quote__content-text-sign_hidden")
    position.classList.remove("quote__content-text-position_hidden")
  };

  //Повторяемый побуквенный вывод текста, определяем когда элемент попадет в видимую область
  visibleElement(target) {
    // Все позиции элемента
    let targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      },
      // Получаем позиции окна
      windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };
  
    if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
      targetPosition.top < windowPosition.bottom //&& // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
      //targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
      //targetPosition.left < windowPosition.right
      ) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
      // Если элемент полностью видно, то запускаем следующий код
      this.showText()
      //Чистим слушателей лишних
      window.removeEventListener('scroll', function() {
        that.visibleElement(document.querySelector('.quote__content-text'));
      });
    };
  }

  //Молотки и гвозди
  //Вешаем слушателей 
  hammerEndPin() {
    let that = this;
    let tagElement = document.querySelector(".section-age__content-tag")
    let hammerElement = document.querySelector(".section-age__content-tag-hammer");
    let pinLeftElement = document.querySelector(".section-age__content-tag-pin_left");
    let pinRightElement = document.querySelector(".section-age__content-tag-pin_right");
    
    tagElement.addEventListener('mouseover', function() {
      that.visibleTools(hammerElement, pinLeftElement, pinRightElement);
    });
    tagElement.addEventListener('click', function() {
      that.workingTools(hammerElement, pinLeftElement, pinRightElement, tagElement);
    });
    tagElement.addEventListener('mouseout', function() {
      that.hiddenTools(hammerElement, pinLeftElement, pinRightElement);
    });
  };

  //показываем инструменты
  visibleTools(hammerElement, pinLeftElement, pinRightElement) {
    if(this.logicSwitchhammerEndPin) {
      hammerElement.classList.add("section-age__content-tag-hammer_increase");
      pinLeftElement.classList.add("section-age__content-tag-pin_increase");
      pinRightElement.classList.add("section-age__content-tag-pin_increase");
    }
  };

  //Прячем инструменты
  hiddenTools(hammerElement, pinLeftElement, pinRightElement) {
    hammerElement.classList.remove("section-age__content-tag-hammer_increase");
    pinLeftElement.classList.remove("section-age__content-tag-pin_increase");
    pinRightElement.classList.remove("section-age__content-tag-pin_increase");
  };

  //Начинаем забивать
  workingTools(hammerElement, pinLeftElement, pinRightElement, tagElement) {
    if (this.logicSwitchhammerEndPin) {
      this.logicSwitchhammerEndPin = false;

      tagElement.classList.remove("js-section-age__content-tag");

      hammerElement.classList.add("section-age__content-tag-hammer_hammering");
      hammerElement.classList.remove("section-age__content-tag-hammer_increase");

      pinLeftElement.classList.add("js-pin-left__hammering");
      pinLeftElement.classList.remove("section-age__content-tag-pin_increase");
      pinRightElement.classList.add("js-pin-right__hammering");
      pinRightElement.classList.remove("section-age__content-tag-pin_increase");
      
      setTimeout(() => {this.workingToolsDislocation()},3000)
    }
  };

  //перемещаем молоток
  workingToolsDislocation() {
    let hammerElement = document.querySelector(".section-age__content-tag-hammer");
    hammerElement.classList.add("section-age__content-tag-hammer_hammering-dislocation");
    hammerElement.classList.remove("section-age__content-tag-hammer_hammering");
    setTimeout(() => {this.workingToolsRight()},1000);
  };

  //Забиваем левый гвоздь
  workingToolsRight() {
    // let that = this;
    let hammerElement = document.querySelector(".section-age__content-tag-hammer");
    hammerElement.classList.add("section-age__content-tag-hammer_hammering-right");
    hammerElement.classList.remove("section-age__content-tag-hammer_hammering-dislocation");
    setTimeout(() => {
      let tagElement = document.querySelector(".section-age__content-tag")
      let hammerElement = document.querySelector(".section-age__content-tag-hammer");
      // let pinLeftElement = document.querySelector(".section-age__content-tag-pin_left");
      // let pinRightElement = document.querySelector(".section-age__content-tag-pin_right");
      
      tagElement.removeEventListener('mouseover', function() {
        this.visibleTools(hammerElement, pinLeftElement, pinRightElement);
      });
      tagElement.removeEventListener('click', function() {
        this.workingTools(hammerElement, pinLeftElement, pinRightElement, tagElement);
      });
      tagElement.removeEventListener('mouseout', function() {
        this.hiddenTools(hammerElement, pinLeftElement, pinRightElement);
      });
      hammerElement.classList.remove("section-age__content-tag-hammer_hammering-right");
    }, 3000);
  };


  //Подсказки
  //Вешаем слушателя на кнопку
  helpBtnListener() {
    let that = this;
    let helpBtnEl = document.querySelector(".help__button")
    let helpBtnClosedEl = document.querySelector(".help__button-closed")
    let arrHelpTag = document.querySelectorAll(".help__tag")
    helpBtnEl.addEventListener('mouseover', function() {
      that.visibleHelpTag(arrHelpTag);
    });
    helpBtnEl.addEventListener('mouseout', function() {
      that.hiddenHelpTag(arrHelpTag);
    });
    helpBtnClosedEl.addEventListener('click', function() {
      that.hiddenHelpBtn(helpBtnEl);
    });
  };

  //Показываем подсказки
  visibleHelpTag(arrHelpTag) {
    for (let index = 0; index < arrHelpTag.length; index++) {
      let element = arrHelpTag[index];
      element.classList.add("help__tag-visible")
    }
  };
  //Скрываем подсказки
  hiddenHelpTag(arrHelpTag) {
    for (let index = 0; index < arrHelpTag.length; index++) {
      let element = arrHelpTag[index];
      element.classList.remove("help__tag-visible")
    }
  };
  //Скрываем кнопку подсказок
  hiddenHelpBtn(helpBtnEl) {
    helpBtnEl.classList.add("help__button-hidden")
  };
}




