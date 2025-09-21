<?php
  // Предотвращение кэширования
  header("Cache-Control: no-cache, no-store, must-revalidate");
  header("Pragma: no-cache");
  header("Expires: 0");

  // Включение отображения ошибок для отладки
  error_reporting(E_ALL);
  ini_set('display_errors', 1);

  // Подключение "Базы данных", тот же код. ПРОФИ КОД. Скопировали и закинули в файл list.php
  // Исправляем код на своё cj90733_test disxost99
  $dbname = 'cj90733_test';//Из сайта имя "Базы данных MySQL"/
  $dbuser = 'cj90733_test';//Из сайта имя "Базы данных MySQL"/
  $dbpass = 'disxost99';//Пароль из сайта "Базы данных"/
  $pdo = new PDO("mysql:host=localhost;dbname=$dbname", $dbuser, $dbpass);

  // Устанавливаем обработку ошибок PDO
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Получение данных из формы (ВСЕХ полей, включая ваши скрытые!)
  $name = $_POST['name'] ?? '';
  $email = $_POST['email'] ?? '';
  $message = $_POST['message'] ?? '';
  $admin_emails = $_POST['admin_email'] ?? []; // ← ВАЖНО: ваши email из формы
  $form_subject = $_POST['form_subject'] ?? 'Оставьте заявку forms'; // ← тема из формы

  // Валидация данных
  if (empty($name) || empty($email) || empty($message)) {
    die('empty_fields');
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die('invalid_email');
  }

  // Сохраняем в базу данных
  $sql = "INSERT INTO orders (order_date, name, email, message) VALUES (NOW(), :name, :email, :message)";
  $stmt = $pdo->prepare($sql);
  $stmt->bindValue(':name', $name);
  $stmt->bindValue(':email', $email);
  $stmt->bindValue(':message', $message);

  if ($stmt->execute()) {
    // Отправка email на ВАШИ email адреса из формы
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: 77job.site <no-reply@77job.site>\r\n";//77job.site - мой сайт 
    $headers .= "Reply-To: $name <$email>\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    $headers .= "X-Priority: 1\r\n";
    
    $email_message = "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Новая заявка</title>
        </head>
        <body>
            <h2>Новая заявка с сайта 77job.site</h2>
            <table style='width: 100%; border-collapse: collapse;'>
                <tr>
                    <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;'><strong>Имя:</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>$name</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;'><strong>Email:</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>$email</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;'><strong>Сообщение:</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>$message</td>
                </tr>
                <tr>
                    <td style='padding: 10px; border: 1px solid #ddd; background-color: #f9f9f9;'><strong>Дата и время:</strong></td>
                    <td style='padding: 10px; border: 1px solid #ddd;'>" . date('d.m.Y H:i:s') . "</td>
                </tr>
            </table>
        </body>
        </html>
    ";
    
    // Отправляем на ВСЕ ваши email из скрытых полей формы
    $email_sent = false;
    foreach ($admin_emails as $admin_email) {
        if (filter_var($admin_email, FILTER_VALIDATE_EMAIL)) {
          if (mail($admin_email, "=?UTF-8?B?" . base64_encode($form_subject) . "?=", $email_message, $headers)) {
            $email_sent = true;
          }
        }
    }

    echo '1'; // Успешное сохранение в базу данных
  } else {
      echo '0'; // Ошибка сохранения в базу данных
      exit;
  }
  
?>