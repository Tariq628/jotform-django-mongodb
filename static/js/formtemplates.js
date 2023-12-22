$(document).ready(function () {
    $('.clickable').click(function () {
        var id = $(this).attr('form-id');
        var url = `/your_redirect_view/${id}`;
        window.location.href = url;
    });
});
