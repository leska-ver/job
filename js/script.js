document.addEventListener('DOMContentLoaded', function () {


  // inputmask - Телефон //
  // ИСПРАВЛЕНИЕ 1: Правильный селектор формы
  const form = document.querySelector('.contacts__form');
  if (!form) {
      console.error('Форма не найдена! Проверьте селектор');
      return;
  }

  // ИСПРАВЛЕНИЕ 2: Проверка загрузки библиотек
  if (typeof Inputmask !== 'undefined') {
      // Inputmask для телефона (раскомментируйте когда нужно)
      // const telSelector = form.querySelector('input[type="tel"]');
      // if (telSelector) {
      //     const inputMask = new Inputmask('+7 (999) 999-99-99');
      //     inputMask.mask(telSelector);
      // }
  } else {
      console.error('Inputmask не загружен!');
  }

  // ИСПРАВЛЕНИЕ 3: Правильная инициализация JustValidate
  if (typeof JustValidate !== 'undefined') {
      const validation = new JustValidate('.contacts__form', {
          colorWrong: '#ff0f0f',
          messages: {
              name: {
                  required: 'Введите имя',
                  minLength: 'Введите 3 и более символов',
                  maxLength: 'Запрещено вводить более 15 символов'
              },
              email: {
                  email: 'Введите корректный email',
                  required: 'Введите email'
              },
              text: {
                  required: 'Введите сообщение',
                  minLength: 'Введите 15 и более символов',
                  maxLength: 'Запрещено вводить более 1000 символов'
              }
          },
          submitHandler: function (thisForm) {
              let formData = new FormData(thisForm);
              let xhr = new XMLHttpRequest();

              // Сохраняем ссылку на форму и кнопку
              const submitBtn = thisForm.querySelector('button[type="submit"]');
              const originalText = submitBtn.textContent;
              const originalBackground = submitBtn.style.background;

              xhr.onreadystatechange = function () {
                  if (xhr.readyState === 4) {
                      if (xhr.status === 200) {
                          /* alert('Сообщение успешно отправлено!');
                          thisForm.reset();*/
                          // console.log('Отправлено');
                          
                          // Успешная отправка
                          submitBtn.textContent = '✅ Отправлено!';
                          submitBtn.style.background = '#4CAF50';
                          
                          // Вернуть исходный текст через 3 секунды
                          setTimeout(() => {
                              submitBtn.textContent = originalText;
                              submitBtn.style.background = originalBackground;
                          }, 3000);
                          
                          thisForm.reset();
                      } else {
                          // Ошибка отправки (сервер вернул ошибку)
                          console.error('Ошибка отправки формы. Статус:', xhr.status);
                          submitBtn.textContent = '❌ Ошибка!';
                          submitBtn.style.background = '#ff4757';
                          
                          // Вернуть исходный текст через 3 секунды 
                          setTimeout(() => {
                              submitBtn.textContent = originalText;
                              submitBtn.style.background = originalBackground;
                          }, 3000);
                      }
                  }
              };

              xhr.onerror = function() {
                  // Ошибка сети (нет соединения, CORS и т.д.)
                  console.error('Ошибка сети при отправке формы');
                  submitBtn.textContent = '❌ Ошибка сети!';
                  submitBtn.style.background = '#ff4757';
                  
                  // Вернуть исходный текст через 3 секунды
                  setTimeout(() => {
                      submitBtn.textContent = originalText;
                      submitBtn.style.background = originalBackground;
                  }, 3000);
              };
              
              xhr.open('POST', 'mail.php', true);
              xhr.send(formData);
          }
      });

      // Добавляем правила валидации
      validation
          .addField('#name', [
              { rule: 'required', errorMessage: 'Введите имя' },
              { rule: 'minLength', value: 3, errorMessage: 'Минимум 3 символа' },
              { rule: 'maxLength', value: 15, errorMessage: 'Максимум 15 символов' }
          ])
          .addField('#email', [
              { rule: 'required', errorMessage: 'Введите email' },
              { rule: 'email', errorMessage: 'Неверный формат email' }
          ])
          .addField('#message', [
              { rule: 'required', errorMessage: 'Введите сообщение' },
              { rule: 'minLength', value: 15, errorMessage: 'Минимум 15 символов' },
              { rule: 'maxLength', value: 1000, errorMessage: 'Максимум 1000 символов' }
          ]);
  } else {
      console.error('JustValidate не загружен!');
  }

  // Бургер-меню ставим ниже 
  function burgerMenu(selector) {
      let menu = $(selector);
      if (menu.length === 0) return;

      let button = menu.find('.burger-menu__button, .burger-menu__lines');
      let links = menu.find('.burger-menu__link');
      let overlay = menu.find('.burger-menu__overlay');
      
      button.on('click', (e) => {
          e.preventDefault();
          toggleMenu();
      });
      
      links.on('click', () => toggleMenu());
      overlay.on('click', () => toggleMenu());
      
      function toggleMenu(){
          menu.toggleClass('burger-menu__active');
          
          if (menu.hasClass('burger-menu__active')) {
              $('body').css('overflow', 'hidden');
          } else {
              $('body').css('overflow', 'visible');
          }
      }
  }
  
  burgerMenu('.burger-menu');
});