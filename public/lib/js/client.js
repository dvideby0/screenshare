var socket = undefined;
var oDOM;
function socketSend(msg) {
    socket.emit('changeHappened', msg);
}

window.addEventListener('load', function() {
    startMirroring();
});
function startMirroring() {
    var mirrorClient;
    mirrorClient = new TreeMirrorClient(document, {
        initialize: function(rootId, children) {
            oDOM = {
                f: 'initialize',
                args: [rootId, children]
            }
        },

        applyChanged: function(removed, addedOrMoved, attributes, text) {
            if(socket != undefined){
                socketSend({
                    f: 'applyChanged',
                    args: [removed, addedOrMoved, attributes, text]
                });
            }
        }
    });
}
function CreateSession(){
    $('#myModal').modal('hide');
    socket = io.connect('http://localhost:3001');
    socket.on('connect', function(){
        socket.emit('CreateSession', document.getElementById('SessionKey').value);
        socket.on('SessionStarted', function() {
            socketSend({ base: location.href.match(/^(.*\/)[^\/]*$/)[1] });
            socketSend(oDOM);
            SendMouse();
            $('body').append('<div id="AdminPointer" style="position: absolute; z-index: 1; height: 30px; width: 30px; border-radius: 5em; background-color: orange; opacity:0.5; top: 1px"></div> ');
        });
        socket.on('AdminMousePosition', function(msg) {
            $('#AdminPointer').css({'left': msg.PositionLeft - 15, 'top': msg.PositionTop});
        });
        $(':input').bind('keyup', function() {
            $(this).attr('value', this.value);
        });
        $('select').change(function(){
            var Selected = $(this).children('option:selected');
            $(this).children('option').removeAttr('selected', false);
            Selected.attr('selected', true);
            $(this).replaceWith($(this)[0].outerHTML);
            $('select').unbind('change');
            $('select').change(function(){
                var Selected = $(this).children('option:selected');
                $(this).children('option').removeAttr('selected', false);
                Selected.attr('selected', true);
                $(this).replaceWith($(this)[0].outerHTML);
                $('select').unbind('change');
            });
        });
    });

}

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
        socket.emit('ClientMousePosition', {Room: document.getElementById('SessionKey').value, PositionLeft: e.pageX, PositionTop: e.pageY});
    }
}