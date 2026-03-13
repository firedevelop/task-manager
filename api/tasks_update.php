<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-control-max-age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../models/task.php';

$database = new Database();
$db = $database->getConnection();

$task = new Task($db);

$data = json_decode(file_get_contents("php://input"));

$task->id = $data->id;

$task->name = $data->name;
$task->description = $data->description;
$task->start_date = $data->start_date;
$task->end_date = $data->end_date;
$task->completed = $data->completed;

if ($task->update()) {
    http_response_code(200);
    echo json_encode(array("message" => "Task was updated."));
} else {
    http_response_code(503);
    echo json_encode(array("message" => "Unable to update task."));
}
