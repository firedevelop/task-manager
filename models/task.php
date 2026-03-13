<?php
class Task {
    private $conn;
    private $table_name = "tasks";

    public $id;
    public $user_id;
    public $name;
    public $description;
    public $start_date;
    public $end_date;
    public $completed;

    public function __construct($db) {
        $this->conn = $db;
    }

    function create() {
        $query = "INSERT INTO " . $this->table_name . " SET user_id=:user_id, name=:name, description=:description, start_date=:start_date, end_date=:end_date, completed=:completed";
        $stmt = $this->conn->prepare($query);

        $this->user_id = htmlspecialchars(strip_tags($this->user_id));
        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->start_date = htmlspecialchars(strip_tags($this->start_date));
        $this->end_date = htmlspecialchars(strip_tags($this->end_date));
        $this->completed = htmlspecialchars(strip_tags($this->completed));

        $stmt->bindParam(":user_id", $this->user_id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":start_date", $this->start_date);
        $stmt->bindParam(":end_date", $this->end_date);
        $stmt->bindParam(":completed", $this->completed);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    function read() {
        $query = "SELECT t.id, t.user_id, t.name, t.description, t.start_date, t.end_date, t.completed, u.name as user_name FROM " . $this->table_name . " t LEFT JOIN users u ON t.user_id = u.id";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    function readOne() {
        $query = "SELECT t.id, t.user_id, t.name, t.description, t.start_date, t.end_date, t.completed, u.name as user_name FROM " . $this->table_name . " t LEFT JOIN users u ON t.user_id = u.id WHERE t.id = ? LIMIT 0,1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if($row) {
            $this->user_id = $row['user_id'];
            $this->name = $row['name'];
            $this->description = $row['description'];
            $this->start_date = $row['start_date'];
            $this->end_date = $row['end_date'];
            $this->completed = $row['completed'];
            $this->user_name = $row['user_name'];
            return true;
        }
        return false;
    }

    function update() {
        $query = "UPDATE " . $this->table_name . " SET name = :name, description = :description, start_date = :start_date, end_date = :end_date, completed = :completed WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $this->name = htmlspecialchars(strip_tags($this->name));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->start_date = htmlspecialchars(strip_tags($this->start_date));
        $this->end_date = htmlspecialchars(strip_tags($this->end_date));
        $this->completed = htmlspecialchars(strip_tags($this->completed));
        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(':name', $this->name);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':start_date', $this->start_date);
        $stmt->bindParam(':end_date', $this->end_date);
        $stmt->bindParam(':completed', $this->completed);
        $stmt->bindParam(':id', $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }

    function delete() {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1, $this->id);

        if($stmt->execute()) {
            return true;
        }

        return false;
    }
}
?>