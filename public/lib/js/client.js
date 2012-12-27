$(document).ready(function(){
    $('*').each(function(){
        $(this).attr('index', $(this).index());
        $(this).attr('css', document.defaultView.getComputedStyle(this,null).cssText);
    });
    $('img').attr('src', function(){
        if(!/(\.com)|(\.org)|(\.edu)|(\.co)|(\.net)/ig.test($(this).attr('src'))){
            $(this).attr('src', '//' + document.domain + '/' + $(this).attr('src'));
        }
    });
});

var socket;
function CreateSession(){
    (function( $ ){

        $.fn.observe = function( callback, options ) {

            var settings = $.extend( {
                    attributes: true,
                    childList: true,
                    characterData: true
                },
                options );

            return this.each(function() {
                var self = this,
                    observer,
                    MutationObserver = window.MutationObserver ||
                        window.WebKitMutationObserver ||
                        window.MozMutationObserver;

                if (MutationObserver && callback) {
                    observer = new MutationObserver(function(mutations) {
                        callback.call(self, mutations);
                    });
                    observer.observe(this, settings);
                }
            });
        };
    })( jQuery );


    var fn = function (m) {
            console.log(m, this);
        },
        options = {characterData: false};

// usage:
    $('*').observe(fn, options);
    socket = io.connect('http://localhost:3001');
    socket.on('connect', function(){
        socket.emit('CreateSession', document.getElementById('SessionKey').value);
        socket.on('SessionStarted', function() {
            SendScreen();
            SendMouse();
            $('body').append('<div id="AdminPointer" style="position: absolute; z-index: 1; height: 30px; width: 30px; border-radius: 5em; background-color: orange; opacity:0.5; top: 1px"></div> ')
        });
        socket.on('AdminMousePosition', function(msg) {
            $('#AdminPointer').css({'left': msg.PositionLeft - 15, 'top': msg.PositionTop});
        });
        $('input').bind('keyup', function() {
            //SendScreen($(this).index());
            $(this).attr('value', this.value);

        });
        $('select').change(function(){
            $(this).attr('selected', true);
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
function SendScreen(){
    $(':input').each(function(){
        $(this).attr('value', this.value);
    });
    $('select option:selected').each(function(){
        $(this).attr('selected', true);
    });
    socket.emit('SendScreen', {Room: document.getElementById('SessionKey').value, Data: document.getElementsByTagName('body')[0].innerHTML});
}

