var socket = io.connect('http://localhost:3001');
//socket.on('ClientMousePosition', function(msg) {
//    $('#ClientPointer').css({'left': msg.PositionLeft, 'top': msg.PositionTop + $('#ClientScreen').offset().top});
//});
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
        socket.emit('AdminMousePosition', {PositionLeft: e.pageX, PositionTop: e.pageY, room:$('#SessionID').val()});
    }
}
socket.on('SessionStarted', function() {
    $('body').append('<div id="ClientPointer" style="position: absolute; z-index: 1; height: 30px; width: 30px; border-radius: 5em; background-color: green; opacity:0.5; top: 1px"></div> ');
    SessionStarted()
    SendMouse();
});
function JoinRoom(){
    socket.emit('JoinRoom', $('#SessionKey').val());
}
function SessionStarted(){
    while (document.firstChild) {
        document.removeChild(document.firstChild);
    }
    //$('button, input').remove();

    var base;

    var mirror = new TreeMirror(document, {
        createElement: function(tagName) {
            if (tagName == 'SCRIPT') {
                var node = document.createElement('NO-SCRIPT');
                node.style.display = 'none';
                return node;
            }

            if (tagName == 'HEAD') {
                var node = document.createElement('HEAD');
                node.appendChild(document.createElement('BASE'));
                node.firstChild.href = base;
                return node;
            }
        }
    });

    socket.on('changes', function(msg){
        if (msg.base)
            base = msg.base;
        else
            mirror[msg.f].apply(mirror, msg.args);
    });
}