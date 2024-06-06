$(document).ready(function () {
    // Event listeners
    $('#add-task-btn').click(handleAddTask);
    $('#task-input').keypress(handleInputKeyPress);
    $('#task-list').on('click', '.remove-btn', handleRemoveTask);
    $('#task-list').on('click', '.complete-btn', handleToggleComplete);
    $('#task-list').on('keydown', '.task-item', handleTaskItemKeyDown);
    $('#task-input').keydown(handleInputKeyDown);
    $('#add-task-btn').keydown(handleAddButtonKeyDown);

    // Event handlers
    function handleAddTask() {
        const taskText = $('#task-input').val().trim();
        if (taskText !== '') {
            const newTask = addTask(taskText);
            announceToScreenReader(`Task added: ${taskText}`);
            setTimeout(() => {
                $('#task-input').val('');
                newTask.focus();
            }, 500);
        }
    }

    function handleInputKeyPress(e) {
        if (e.which == 13) {
            $('#add-task-btn').click();
        }
    }

    function handleRemoveTask() {
        const taskItem = $(this).closest('.task-item');
        const taskText = taskItem.find('.task-text').text();
        announceToScreenReader(`Task removed: ${taskText}`);
        taskItem.remove();
        setTimeout(() => {
            $('#task-input').focus();
        }, 500);
    }

    function handleToggleComplete() {
        const taskItem = $(this).closest('.task-item');
        const taskText = taskItem.find('.task-text').text();
        taskItem.toggleClass('completed');
        const status = taskItem.hasClass('completed')
            ? 'completed'
            : 'incomplete';
        announceToScreenReader(`Task ${status}: ${taskText}`);
    }

    function handleTaskItemKeyDown(e) {
        switch (e.key) {
            case 'ArrowUp':
                if ($(this).prev().length) {
                    $(this).prev().focus();
                } else {
                    $('#add-task-btn').focus();
                }
                break;
            case 'ArrowDown':
                $(this).next().focus();
                break;
            case 'ArrowLeft':
                $(this).find('.complete-btn').focus();
                break;
            case 'ArrowRight':
                $(this).find('.remove-btn').focus();
                break;
        }
    }

    function handleInputKeyDown(e) {
        if (e.key === 'ArrowRight') {
            const cursorPosition = this.selectionEnd;
            const inputLength = this.value.length;
            if (cursorPosition === inputLength) {
                $('#add-task-btn').focus();
                e.preventDefault();
            }
        } else if (e.key === 'ArrowDown') {
            $('#add-task-btn').focus();
            e.preventDefault();
        }
    }

    function handleAddButtonKeyDown(e) {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            $('#task-input').focus();
            e.preventDefault();
        } else if (
            (e.key === 'ArrowDown' || e.key === 'ArrowRight') &&
            $('#task-list').children().length > 0
        ) {
            $('#task-list').children().first().focus();
            e.preventDefault();
        }
    }

    // Utility functions
    function addTask(taskText) {
        const taskItem = $('<li class="task-item" tabindex="0"></li>');
        const taskTextSpan = $('<span class="task-text"></span>').text(
            taskText
        );
        const buttonDiv = $('<div class="task-buttons"></div>');
        const completeBtn = $(
            '<button class="complete-btn" aria-label="Mark task as complete">&#x2713;</button>'
        );
        const removeBtn = $(
            '<button class="remove-btn" aria-label="Remove task">&#x2715;</button>'
        );
        buttonDiv.append(completeBtn).append(removeBtn);
        taskItem.append(taskTextSpan).append(buttonDiv);
        $('#task-list').append(taskItem);
        return taskItem;
    }

    function announceToScreenReader(message) {
        const $srAnnouncements = $('#sr-announcements');
        $srAnnouncements.text('');
        setTimeout(() => {
            $srAnnouncements.text(message);
        }, 100);
    }
});
