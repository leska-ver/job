<?php
  $dbname = 'cj90733_test';//Из сайта имя "Базы данных MySQL"/
  $dbuser = 'cj90733_test';//Из сайта имя "Базы данных MySQL"/
  $dbpass = 'disxost99';//Пароль из сайта "Базы данных"/
  $pdo = new PDO("mysql:host=localhost;dbname=$dbname", $dbuser, $dbpass);

  // Устанавливаем обработку ошибок PDO
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Пишем наш SQL запрос SELECT. Позволит вывести заявки таблицы "Базы даных" в обратном порядке убывания числа.
  $stmt = $pdo->query('SELECT * FROM orders ORDER BY id DESC');
?>

<!-- Пишим таблицу через html код. Она выйдет по акуратнее и симпатичной в браузере(https://ссылка/list.php)-->
<!DOCTYPE html>
<html>
  <!--Результат таблицы http://ссылка/list.php -->
  <head>
    <title>Список заявок</title>
    <style>
        table {
            border: 1px solid darkgray;
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }

        th {
            color: #fff;
            background-color: #368c02;
            padding: 10px;
        }

        th, td {
            padding: 8px;
            border: 1px solid #3da001;
            text-align: left;
        }

        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
    </style>
  </head>
  <body>
    <h1>Список заявок</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Фамилия и Имя</th>
        <th>Email</th>
        <th>Сообщение</th>
        <th>Дата и время</th>
      </tr>
      <?php
        foreach ($stmt as $row) {
          echo '<tr>';
          echo '<td>' . htmlspecialchars($row['id']) . '</td>';
          echo '<td>' . htmlspecialchars($row['name']) . '</td>';
          echo '<td>' . htmlspecialchars($row['email']) . '</td>';
          echo '<td>' . htmlspecialchars($row['message']) . '</td>';
          echo '<td>' . htmlspecialchars($row['order_date']) . '</td>';
          echo '</tr>';
        }
      ?>
    </table>
  </body>
</html> 
