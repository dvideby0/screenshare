var frame = $('#ClientView').contents();
//socket.on('ClientMousePosition', function(msg) {
//    $('#ClientPointer').css({'left': msg.PositionLeft, 'top': msg.PositionTop + $('#ClientScreen').offset().top});
//});
function StartSession(){
    var SessionKey = $('#SessionKey').val();
    $('#ClientView')[0].contentWindow.JoinRoom(SessionKey);
}
function ResizePreview(width, height){
    $('#ClientView').width(width);
    $('#ClientView').height(height);
}