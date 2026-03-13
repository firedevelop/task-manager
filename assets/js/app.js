$(document).ready(function() {
    const apiUrl = 'api';

    // Check if we are on the login page
    if ($('#login-form').length) {
        $('#login-form').submit(function(e) {
            e.preventDefault();
            const email = $('#email').val();
            const password = $('#password').val();

            $.ajax({
                url: `${apiUrl}/login.php`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ email, password }),
                success: function(data) {
                    // For simplicity, we'll just redirect to the users page on successful login.
                    // In a real application, you would handle sessions or tokens.
                    window.location.href = 'users.html';
                },
                error: function(err) {
                    alert('Login failed');
                }
            });
        });
    }

    // Check if we are on the users page
    if ($('#users-table').length) {
        loadUsers();

        $('#create-user-form').submit(function(e) {
            e.preventDefault();
            const name = $('#create-name').val();
            const surname = $('#create-surname').val();
            const email = $('#create-email').val();
            const password = $('#create-password').val();

            $.ajax({
                url: `${apiUrl}/users/create.php`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name, surname, email, password }),
                success: function(data) {
                    $('#createUserModal').modal('hide');
                    loadUsers();
                },
                error: function(err) {
                    alert('Error creating user');
                }
            });
        });

        $('#update-user-form').submit(function(e) {
            e.preventDefault();
            const id = $('#update-user-id').val();
            const name = $('#update-name').val();
            const surname = $('#update-surname').val();
            const email = $('#update-email').val();

            $.ajax({
                url: `${apiUrl}/users/update.php`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ id, name, surname, email }),
                success: function(data) {
                    $('#updateUserModal').modal('hide');
                    loadUsers();
                },
                error: function(err) {
                    alert('Error updating user');
                }
            });
        });
    }

    function loadUsers() {
        $.ajax({
            url: `${apiUrl}/users.php`,
            type: 'GET',
            success: function(data) {
                let tableContent = '';
                data.records.forEach(user => {
                    tableContent += `
                        <tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.email}</td>
                            <td>
                                <button class="btn btn-info btn-sm" onclick="openUpdateUserModal(${user.id})">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                });
                $('#users-table').html(tableContent);
            }
        });
    }

    window.openUpdateUserModal = function(id) {
        $.ajax({
            url: `${apiUrl}/users/read_one.php?id=${id}`,
            type: 'GET',
            success: function(user) {
                $('#update-user-id').val(user.id);
                $('#update-name').val(user.name);
                $('#update-surname').val(user.surname);
                $('#update-email').val(user.email);
                $('#updateUserModal').modal('show');
            }
        });
    }

    window.deleteUser = function(id) {
        if (confirm('Are you sure you want to delete this user?')) {
            $.ajax({
                url: `${apiUrl}/users/delete.php`,
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ id }),
                success: function(data) {
                    loadUsers();
                },
                error: function(err) {
                    alert('Error deleting user');
                }
            });
        }
    }


    // Check if we are on the tasks page
    if ($('#tasks-table').length) {
        loadTasks();
        loadUsersForDropdown();

        $('#create-task-form').submit(function(e) {
            e.preventDefault();
            const name = $('#create-task-name').val();
            const description = $('#create-task-description').val();
            const user_id = $('#create-task-user').val();
            const start_date = $('#create-task-start-date').val();
            const end_date = $('#create-task-end-date').val();
            const completed = $('#create-task-completed').is(':checked') ? 1 : 0;

            $.ajax({
                url: `${apiUrl}/tasks_create.php`,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name, description, user_id, start_date, end_date, completed }),
                success: function(data) {
                    $('#createTaskModal').modal('hide');
                    loadTasks();
                },
                error: function(err) {
                    alert('Error creating task');
                }
            });
        });

        $('#update-task-form').submit(function(e) {
            e.preventDefault();
            const id = $('#update-task-id').val();
            const name = $('#update-task-name').val();
            const description = $('#update-task-description').val();
            const user_id = $('#update-task-user').val();
            const start_date = $('#update-task-start-date').val();
            const end_date = $('#update-task-end-date').val();
            const completed = $('#update-task-completed').is(':checked') ? 1 : 0;

            $.ajax({
                url: `${apiUrl}/tasks_update.php`,
                type: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({ id, name, description, user_id, start_date, end_date, completed }),
                success: function(data) {
                    $('#updateTaskModal').modal('hide');
                    loadTasks();
                },
                error: function(err) {
                    alert('Error updating task');
                }
            });
        });
    }

    function loadTasks() {
        $.ajax({
            url: `${apiUrl}/tasks.php`,
            type: 'GET',
            success: function(data) {
                let tableContent = '';
                data.records.forEach(task => {
                    tableContent += `
                        <tr>
                            <td>${task.id}</td>
                            <td>${task.name}</td>
                            <td>${task.description}</td>
                            <td>${task.user_name}</td>
                            <td>${task.start_date}</td>
                            <td>${task.end_date}</td>
                            <td>${task.completed == 1 ? 'Yes' : 'No'}</td>
                            <td>
                                <button class="btn btn-info btn-sm" onclick="openUpdateTaskModal(${task.id}, ${task.user_id})">Edit</button>
                                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                });
                $('#tasks-table').html(tableContent);
            }
        });
    }

    function loadUsersForDropdown() {
        $.ajax({
            url: `${apiUrl}/users.php`,
            type: 'GET',
            success: function(data) {
                let selectContent = '<option value="">Select User</option>';
                data.records.forEach(user => {
                    selectContent += `<option value="${user.id}">${user.name} ${user.surname}</option>`;
                });
                $('#create-task-user, #update-task-user').html(selectContent);
            }
        });
    }

    window.openUpdateTaskModal = function(id, user_id) {
        $.ajax({
            url: `${apiUrl}/task.php?id=${id}`,
            type: 'GET',
            success: function(task) {
                $('#update-task-id').val(task.id);
                $('#update-task-name').val(task.name);
                $('#update-task-description').val(task.description);
                $('#update-task-user').val(user_id);
                $('#update-task-start-date').val(task.start_date.replace(' ', 'T'));
                $('#update-task-end-date').val(task.end_date.replace(' ', 'T'));
                $('#update-task-completed').prop('checked', task.completed == 1);
                $('#updateTaskModal').modal('show');
            }
        });
    }

    window.deleteTask = function(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            $.ajax({
                url: `${apiUrl}/tasks_delete.php`,
                type: 'DELETE',
                contentType: 'application/json',
                data: JSON.stringify({ id }),
                success: function(data) {
                    loadTasks();
                },
                error: function(err) {
                    alert('Error deleting task');
                }
            });
        }
    }

});