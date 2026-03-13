<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

include_once '../config/database.php';
include_once '../models/task.php';

$database = new Database();
$db = $database->getConnection();

$task = new Task($db);

$task->id = isset($_GET['id']) ? $_GET['id'] : die();

if ($task->readOne()) {
    $task_arr = array(
        "id" =>  $task->id,
        "user_id" => $task->user_id,
        "name" => $task->name,
        "description" => $task->description,
        "start_date" => $task->start_date,
        "end_date" => $task->end_date,
        "completed" => $task->completed,
        "user_name" => $task->user_name
    );

    http_response_code(200);
    echo json_encode($task_arr);
} else {
    http_response_code(404);
    echo json_encode(array("message" => "Task does not exist."));
}
