describe('To-Do List Application', function () {
    beforeEach(function () {
        $.holdReady(false);
    });

    afterEach(function () {
        $('#task-list').empty();
    });

    it('should add a task when the add button is clicked', function () {
        $('#task-input').val('Test Task');
        $('#add-task-btn').click();

        const taskList = $('#task-list');
        expect(taskList.children().length).toBe(1);
        expect(taskList.children().first().find('.task-text').text()).toBe(
            'Test Task'
        );
    });

    it('should announce the task addition to the screen reader', function (done) {
        $('#task-input').val('Test Task');
        $('#add-task-btn').click();

        setTimeout(function () {
            const srAnnouncements = $('#sr-announcements').text();
            expect(srAnnouncements).toBe('Task added: Test Task');
            done();
        }, 200);
    });

    it('should remove a task when the remove button is clicked', function () {
        $('#task-input').val('Test Task 1');
        $('#add-task-btn').click();
        $('#task-input').val('Test Task 2');
        $('#add-task-btn').click();
        $('#task-input').val('Test Task 3');
        $('#add-task-btn').click();

        const taskItem = $('#task-list').children().first();
        taskItem.find('.remove-btn').click();

        expect($('#task-list').children().length).toBe(2);
    });

    it('should announce the task removal to the screen reader', function (done) {
        $('#task-input').val('Test Task');
        $('#add-task-btn').click();

        const taskItem = $('#task-list').children().first();
        taskItem.find('.remove-btn').click();

        setTimeout(function () {
            const srAnnouncements = $('#sr-announcements').text();
            expect(srAnnouncements).toBe('Task removed: Test Task');
            done();
        }, 200);
    });

    it('should mark a task as complete when the complete button is clicked', function () {
        $('#task-input').val('Test Task');
        $('#add-task-btn').click();

        const taskItem = $('#task-list').children().first();
        taskItem.find('.complete-btn').click();

        expect(taskItem.hasClass('completed')).toBe(true);
    });

    it('should announce the task completion status to the screen reader', function (done) {
        $('#task-input').val('Test Task');
        $('#add-task-btn').click();

        const taskItem = $('#task-list').children().first();
        taskItem.find('.complete-btn').click();

        setTimeout(function () {
            const srAnnouncements = $('#sr-announcements').text();
            expect(srAnnouncements).toBe('Task completed: Test Task');
            done();
        }, 200);
    });

    it('should handle keyboard navigation for task items', function () {
        $('#task-input').val('Task 1');
        $('#add-task-btn').click();
        $('#task-input').val('Task 2');
        $('#add-task-btn').click();

        const firstTask = $('#task-list').children().first();
        const secondTask = $('#task-list').children().last();

        firstTask.focus();
        const eDown = $.Event('keydown');
        eDown.key = 'ArrowDown';
        firstTask.trigger(eDown);

        expect(document.activeElement).toEqual(secondTask[0]);

        secondTask.focus();
        const eUp = $.Event('keydown');
        eUp.key = 'ArrowUp';
        secondTask.trigger(eUp);

        expect(document.activeElement).toEqual(firstTask[0]);
    });

    it('should focus the add button when ArrowDown is pressed on the input field', function () {
        $('#task-input').val('Task 1');
        $('#task-input').focus();
        const e = $.Event('keydown');
        e.key = 'ArrowDown';
        $('#task-input').trigger(e);

        expect(document.activeElement).toEqual($('#add-task-btn')[0]);
    });

    it('should focus the add button when ArrowRight is pressed on the input field', function () {
        $('#task-input').val('Task 1');
        $('#task-input').focus();
        const e = $.Event('keydown');
        e.key = 'ArrowRight';
        $('#task-input').trigger(e);

        expect(document.activeElement).toEqual($('#add-task-btn')[0]);
    });

    it('should focus the first task when ArrowDown is pressed on the add button', function () {
        $('#task-input').val('Task 1');
        $('#add-task-btn').click();
        $('#add-task-btn').focus();
        const e = $.Event('keydown');
        e.key = 'ArrowDown';
        $('#add-task-btn').trigger(e);

        expect(document.activeElement).toEqual(
            $('#task-list').children().first()[0]
        );
    });

    it('should focus the input field when ArrowUp is pressed on the add button', function () {
        $('#task-input').focus();
        const e = $.Event('keydown');
        e.key = 'ArrowUp';
        $('#add-task-btn').trigger(e);

        expect(document.activeElement).toEqual($('#task-input')[0]);
    });

    it('should focus the input field when ArrowLeft is pressed on the add button', function () {
        $('#task-input').focus();
        const e = $.Event('keydown');
        e.key = 'ArrowLeft';
        $('#add-task-btn').trigger(e);

        expect(document.activeElement).toEqual($('#task-input')[0]);
    });

    it('should focus the previous task when ArrowUp is pressed on a task', function () {
        $('#task-input').val('Task 1');
        $('#add-task-btn').click();
        $('#task-input').val('Task 2');
        $('#add-task-btn').click();

        const firstTask = $('#task-list').children().first();
        const secondTask = $('#task-list').children().last();

        secondTask.focus();
        const e = $.Event('keydown');
        e.key = 'ArrowUp';
        secondTask.trigger(e);

        expect(document.activeElement).toEqual(firstTask[0]);
    });

    it('should focus the add button when ArrowUp is pressed on the first task', function () {
        $('#task-input').val('Task 1');
        $('#add-task-btn').click();

        const firstTask = $('#task-list').children().first();
        firstTask.focus();
        const e = $.Event('keydown');
        e.key = 'ArrowUp';
        firstTask.trigger(e);

        expect(document.activeElement).toEqual($('#add-task-btn')[0]);
    });
});
