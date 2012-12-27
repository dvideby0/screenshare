var socket = io.connect('http://localhost:3001');
socket.on('ClientScreen', function(msg) {
    $('#ClientScreen').empty();
    $('#ClientScreen').html(msg.message);
    $('#AdminPointer').remove();
});
socket.on('ClientMousePosition', function(msg) {
    $('#ClientPointer').css({'left': msg.PositionLeft, 'top': msg.PositionTop + $('#ClientScreen').offset().top});
});
function SendMouse(){
    document.onmousemove = function(e) {
        if(!e) e = window.event;

        if(e.pageX == null && e.clientX != null) {
            var doc = document.documentElement, body = document.body;

            e.pageX = e.clientX
                + (doc && doc.scrollLeft || body && body.scrollLeft || 0)
                - (doc.clientLeft || 0);

            e.pageY = e.clientY
                + (doc && doc.scrollTop || body && body.scrollTop || 0)
                - (doc.clientTop || 0);
        }
        socket.emit('AdminMousePosition', {PositionLeft: e.pageX, PositionTop: e.pageY - $('#ClientScreen').offset().top, room:$('#SessionID').val()});
    }
}
socket.on('SessionStarted', function() {
    $('body').append('<div id="ClientPointer" style="position: absolute; z-index: 1; height: 30px; width: 30px; border-radius: 5em; background-color: green; opacity:0.5; top: 1px"></div> ');
    SendMouse();
});
function JoinRoom(){
    socket.emit('JoinRoom', $('#SessionKey').val());
}
