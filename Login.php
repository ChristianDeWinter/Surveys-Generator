<?php

$host="localhost";
$user="bit_academy";
$password="bit_academy";
$db="bit_academy";

session_start();


$data=mysqli_connect($host,$user,$password,$db);

if ($data===false) {
	die("connection error");
}


if ($_SERVER["REQUEST_METHOD"]=="POST") {
	$username=$_POST["username"];
	$password=$_POST["password"];


	$sql="select * from login where username='" . $username . "' AND password='" . $password . "' ";

	$result=mysqli_query($data,$sql);

	$row=mysqli_fetch_array($result);

	if ($row["usertype"]=="user") {

		$_SESSION["username"]=$username;
		
		header("location:adminindex.php");
	} else {
		echo "username or password incorrect";
	}

}
?> 
  <!DOCTYPE html>  
 <html>  
      <head>  
           <title>Login Page</title>
           <link rel="stylesheet" href="login.css">
      </head>  
      <body>  
           <br />  

                <?php  
                if (isset($message)) {  
                     echo '<label class="mssg">' . $message . '</label>';  
                }  
                ?>  
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

