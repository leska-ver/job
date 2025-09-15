document.addEventListener('DOMContentLoaded', function () {


  function burgerMenu(selector) {
    let menu = $(selector);
    if (menu.length === 0) return; // Добавить проверку от ИИ

    let button = menu.find('.burger-menu__button', '.burger-menu__lines');
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



  // inputmask - Телефон //
  const form = document.querySelector('.form');
  if (!form) return;
  // Раскомментируйте, когда будете использовать:
  // const telSelector = form.querySelector('input[type="tel"]');
  // const inputMask = new Inputmask('+7 (999) 999-99-99');
  // inputMask.mask(telSelector);

  new window.JustValidate('.form', {
    // rules: {
    //   tel: {
    //     required: true,
    //     function: () => {
    //       const phone = telSelector.inputmask.unmaskedvalue();
    //       return Number(phone) && phone.length === 10;
    //     }
    //   }
    // },

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
      // tel: {
      //   required: 'Введите телефон',
      //   function: 'Здесь должно быть 10 символов без +7'
      // },
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

      // ↓↓↓ ДОБАВЬТЕ ЭТОТ КОД ПРЯМО ЗДЕСЬ ↓↓↓
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
      // ↑↑↑ КОНЕЦ ДОБАВЛЕННОГО КОДА ↑↑↑

          
      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      // Убрать второй thisForm.reset() отсюда!
    }
  })


});