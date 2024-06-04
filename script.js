$(document).ready(function() {
    $('#add-task-btn').click(function() {
        const taskText = $('#task-input').val().trim();
        if (taskText !== '') {
            addTask(taskText);
            $('#task-input').val('').focus();
        }
    });

    $('#task-input').keypress(function(e) {
        if (e.which == 13) {
            $('#add-task-btn').click();
        }
    });

    $('#task-list').on('click', '.remove-btn', function() {
        $(this).parent().remove();
        $('#task-input').focus();
    });

    $('#task-list').on('click', '.complete-btn', function() {
        $(this).parent().toggleClass('completed');
    });

    function addTask(taskText) {
        const taskItem = $('<li class="task-item" tabindex="0"></li>').text(taskText);
        const completeBtn = $('<button class="complete-btn" aria-label="Mark task as complete">&#x2713;</button>');
        const removeBtn = $('<button class="remove-btn" aria-label="Remove task">&#x2715;</button>');
        taskItem.append(completeBtn).append(removeBtn);
        $('#task-list').append(taskItem);
    }
});
