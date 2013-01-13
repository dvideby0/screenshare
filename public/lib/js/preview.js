var socket = io.connect('http://yearofthecu.com:3001');
var SessionKey;
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
        socket.emit('AdminMousePosition', {PositionLeft: e.pageX, PositionTop: e.pageY - 15, room: SessionKey});
    }
}
socket.on('SessionStarted', function() {
    SessionStarted();
    SendMouse();
});
function JoinRoom(key){
    SessionKey = key;
    socket.emit('JoinRoom', key);
}
function SessionStarted(){
    while (document.firstChild) {
        document.removeChild(document.firstChild);
    }
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
    window.parent.RemoveMouse();
    window.parent.AddMouse();

    socket.on('changes', function(msg){
        if (msg.base){
            base = msg.base;
        }
        if(msg.height){
            window.parent.ResizePreview(msg.width, msg.height);
        }
        if(msg.args){
            mirror[msg.f].apply(mirror, msg.args);
            if(msg.f == 'initialize'){
                socket.emit('DOMLoaded', {room: SessionKey});
            }
        }
        if(msg.scroll){
            $(window).scrollTop(msg.scroll);
        }
    });
    socket.on('ClientMousePosition', function(msg){
        window.parent.MoveMouse(msg.PositionLeft, msg.PositionTop - $(document).scrollTop());
    });
}