$(document).ready(function () {
    $('.clickable').click(function () {
        var id = $(this).attr('form-id');
        var url = `/form_view/${id}`;
        window.location.href = url;
    });
});
