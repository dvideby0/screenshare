$(document).on('ready', function(){
    $('#HomePage').show();
    $('.nav li').click(function(){
        $(this).parent('ul').children('li').removeClass('active');
        $(this).addClass('active');
        var Name = $(this).children('a').text();
        $('.page').hide();
        $('#' + Name + 'Page').show()
    });
});

function SubmitForm(){
    if($('#croot').val() != 7){
        $('#FailModal').modal('show')
    }
    else{
        $('#SubmitModal').modal('show')
    }
}