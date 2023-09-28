<?php
// Database configuration
$host = 'localhost';
$user = 'bit_acadmey';
$password = 'bit_acadmey';
$database = 'survey';

// Create a database connection
$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
   die('Database connection failed: ' . $conn->connect_error);
}

// API endpoint to add a quiz question
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   $data = json_decode(file_get_contents('php://input'), true);

   // Insert the question into the database
   $text = $conn->real_escape_string($data['text']);
   $type = $conn->real_escape_string($data['type']);
   $options = json_encode($data['options']);
   $timeLimit = (int)$data['timeLimit'];

   $query = "INSERT INTO questions (text, type, options, time_limit) VALUES ('$text', '$type', '$options', $timeLimit)";
   $result = $conn->query($query);

   if ($result) {
       echo json_encode(['message' => 'Question added successfully']);
   } else {
       echo json_encode(['error' => 'Internal Server Error']);
   }
}

// API endpoint to get quiz questions
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
   $query = "SELECT * FROM questions";
   $result = $conn->query($query);

   if ($result) {
       $questions = [];

       while ($row = $result->fetch_assoc()) {
           $questions[] = [
               'id' => $row['id'],
               'text' => $row['text'],
               'type' => $row['type'],
               'options' => json_decode($row['options']),
               'timeLimit' => $row['time_limit'],
           ];
       }

       echo json_encode($questions);
   } else {
       echo json_encode(['error' => 'Internal Server Error']);
   }
}

// Close the database connection
$conn->close();
