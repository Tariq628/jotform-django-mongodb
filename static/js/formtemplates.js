$(document).ready(function () {
    $('.template-box').click(function () {
        var id = $(this).attr('form-id').replace(/^`|`$/g, '');
        
        var url = `/your_redirect_view/${id}`;

        window.location.href = url;
    })
})
