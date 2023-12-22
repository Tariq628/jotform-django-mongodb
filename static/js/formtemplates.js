$(document).ready(function () {
    $('.template-box').click(function () {
        // Get the ID of the clicked div
        var id = $(this).attr('form-id');
        id = id.replace(/^`|`$/g, '');

        var url = "{% url 'your_redirect_view' form_id='PLACEHOLDER' %}".replace('PLACEHOLDER', id);

        window.location.href = url;
    });
});