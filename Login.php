<?php

$host="localhost";
$user="bit_academy";
$password="bit_academy";
$db="bit_academy";

session_start();
?> 

<!DOCTYPE html>  
 <html>  
      <head>  
           <title>Login Page</title>
           <link rel="stylesheet" href="login.css">
      </head>  
      <body>  
           <br />
              <div class="center">
      <h1>Login</h1>
      <form method="post">
        <div class="txt_field">
          <input type="username" name="username" required>
          <span></span>
          <label>Gebruikersnaam</label>
        </div>
        <div class="txt_field">
          <input type="password" name="password" required>
          <span></span>
          <label>Wachtwoord</label> 
        </div>
        <div class="btn_field">
          <button type="submit" name="login">Inloggen</button>


      </body>  
 </html>  