var frame = $('#ClientView').contents();
window.location = 'admin.html?#';
function StartSession(){
    var SessionKey = $('#SessionKey').val();
    $('#ClientView')[0].contentWindow.JoinRoom(SessionKey);
}
function ResizePreview(width, height){
    $('#ClientView').width(width);
    $('#ClientView').height(height);
}
function RemoveMouse(){
    $('body').remove('#ClientPointer');
}
function AddMouse(){
    $('body').append('<div id="ClientPointer" style="position: absolute; z-index: 1; height: 30px; width: 30px; border-radius: 5em; background-color: green; opacity:0.5; top: 1px"></div> ');
}
function MoveMouse(x,y){
    $('#ClientPointer').css({'left': x - 15, 'top': y + 30});
}