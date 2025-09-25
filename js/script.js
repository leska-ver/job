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
    const elements = {
      burger: document.querySelector('.burger'),
      headerNav: document.querySelector('.header__nav'),
      overlay: document.querySelector('.header__overlay'),
      links: document.querySelectorAll('.header__link')
    };
    
    console.log('Найденные элементы:');
    console.log('- burger:', elements.burger);
    console.log('- header__nav:', elements.headerNav);
    console.log('- overlay:', elements.overlay);
    console.log('- links:', elements.links.length);
    
    function toggleMenu() {
      const isActive = elements.burger.classList.contains('burger--active');
        
      if (!isActive) {
        // Открываем меню
        elements.burger.classList.add('burger--active');
        elements.headerNav.classList.add('header__nav--active');
        elements.overlay.classList.add('overlay--active');
        document.body.style.overflow = 'hidden';
      } else {
        // Закрываем меню
        elements.burger.classList.remove('burger--active');
        elements.headerNav.classList.remove('header__nav--active');
        elements.overlay.classList.remove('overlay--active');
        document.body.style.overflow = '';
      }
      
      console.log('Состояние меню:', !isActive ? 'OPEN' : 'CLOSED');
    }
    
    function closeMenu() {
      elements.burger.classList.remove('burger--active');
      elements.headerNav.classList.remove('header__nav--active');
      elements.overlay.classList.remove('overlay--active');
      document.body.style.overflow = '';
      console.log('Меню закрыто');
    }
    
    // Обработчики событий
    if (elements.burger) {
      elements.burger.addEventListener('click', toggleMenu);
      console.log('✅ Бургер инициализирован');
    }
            
    if (elements.overlay) {
      elements.overlay.addEventListener('click', closeMenu);
    }
    
    elements.links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
    
    // Закрытие меню при ресайзе окна
    window.addEventListener('resize', function() {
      if (window.innerWidth > 666) {
        closeMenu();
      }
    });


    
  
});