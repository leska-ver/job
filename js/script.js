document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM загружен!');

  const form = document.querySelector('.contacts__form');
  if (!form) {
    console.error('Форма не найдена!');
    return;
  }

  console.log('Настраиваю простую форму...');

  // Создаем контейнер для ошибок
  const createErrorLabel = (input, message) => {
    // Удаляем старую ошибку
    const oldError = input.parentNode.querySelector('.custom-error');
    if (oldError) oldError.remove();

    // Создаем новую ошибку
    const error = document.createElement('div');
    error.className = 'custom-error';
    //Спрятали запись Оибки(Введите сообщение)
    error.style.color = 'transparent';
    error.style.fontSize = '0px';
    error.style.marginTop = '0px';
    error.textContent = message;
    
    input.parentNode.appendChild(error);
    return error;
  };

  // Убираем ошибку
  const removeError = (input) => {
    const error = input.parentNode.querySelector('.custom-error');
    if (error) error.remove();
  };

  // Подсветка поля
  const highlightField = (input, isValid) => {
    if (isValid) {
      input.classList.remove('custom-error-field');
      input.classList.add('custom-success-field');
    } else {
      input.classList.remove('custom-success-field');
      input.classList.add('custom-error-field');
    }
  };

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = this.querySelector('#name');
    const emailInput = this.querySelector('#email');
    const messageInput = this.querySelector('#message');
    
    let isValid = true;

    // Валидация имени
    removeError(nameInput);
    if (!nameInput.value.trim()) {
      createErrorLabel(nameInput, 'Введите имя');
      highlightField(nameInput, false);
      isValid = false;
    } else if (nameInput.value.length < 3) {
        createErrorLabel(nameInput, 'Минимум 3 символа');
        highlightField(nameInput, false);
        isValid = false;
    } else if (nameInput.value.length > 15) {
        createErrorLabel(nameInput, 'Максимум 15 символов');
        highlightField(nameInput, false);
        isValid = false;
    } else {
        highlightField(nameInput, true);
    }

    // Валидация email
    removeError(emailInput);
    const emailValue = emailInput.value.trim();

    if (!emailValue) {
      createErrorLabel(emailInput, 'Введите email');
      highlightField(emailInput, false);
      isValid = false;
    } else if (!isValidEmail(emailValue)) { // Используем функцию проверки
      createErrorLabel(emailInput, 'Неверный формат email');
      highlightField(emailInput, false);
      isValid = false;
    } else {
      highlightField(emailInput, true);
    }

    // Добавляем функцию проверки email
    function isValidEmail(email) {
      // Более строгое регулярное выражение для проверки email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    // Валидация сообщения
    removeError(messageInput);
    if (!messageInput.value.trim()) {
      createErrorLabel(messageInput, 'Введите сообщение');
      highlightField(messageInput, false);
      isValid = false;
    } else if (messageInput.value.length < 15) {
        createErrorLabel(messageInput, 'Минимум 15 символов');
        highlightField(messageInput, false);
        isValid = false;
    } else if (messageInput.value.length > 1000) {
        createErrorLabel(messageInput, 'Максимум 1000 символов');
        highlightField(messageInput, false);
        isValid = false;
    } else {
        highlightField(messageInput, true);
    }

    if (!isValid) return;

    // Отправка формы
    let formData = new FormData(this);
    let submitBtn = this.querySelector('button[type="submit"]');
    
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Добавляем случайный параметр к URL чтобы избежать кэширования
    const url = 'mail.php?' + new Date().getTime();

    fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => response.text())
    .then(data => {
      console.log('Ответ:', data);
      
      if (data === '1') {
        submitBtn.textContent = '✅ Отправлено!';
        this.reset();
        // Сбрасываем подсветку
        document.querySelectorAll('.contacts__input, .contact__textarea').forEach(input => {
          input.classList.remove('custom-error-field', 'custom-success-field');
        });
      } else {
          submitBtn.textContent = '❌ Ошибка!';
      }
      
      setTimeout(() => {
        submitBtn.textContent = 'Отправить';
        submitBtn.disabled = false;
      }, 3000);
    })
    .catch(error => {
      console.error('Ошибка:', error);
      submitBtn.textContent = '❌ Ошибка!';
      submitBtn.disabled = false;
    });
  });

  
  
  
  
  // ==================== БУРГЕР-МЕНЮ ставим ниже ==================== 
  function burgerMenu(selector) {
    let menu = $(selector);
    if (menu.length === 0) {
      console.error('Бургер-меню не найдено!');
      return;
    }

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

  // Запускаем бургер-меню
  burgerMenu('.burger-menu');
  console.log('Бургер-меню инициализировано!');


  
});