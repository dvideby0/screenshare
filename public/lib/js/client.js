$(document).ready(function(){
    $('img').attr('src', function(){
        if(!/(\.com)|(\.org)|(\.edu)|(\.co)|(\.net)/ig.test($(this).attr('src'))){
            $(this).attr('src', '//' + document.domain + '/' + $(this).attr('src'));
        }
    });
    $('div, input, button, select, textarea, p, span, a').not('#myModal').each(function(){
        $(this).attr('style', getAllStyles(this).join().replace(/,/g, ';'));
    });
});

var socket;
function CreateSession(){
    $('#myModal').modal('hide');
    $('.modal-backdrop').remove();
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
            console.log(m);
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
            $(this).attr('value', this.value);
            SendScreen();

        });
        $('select').change(function(){
            $(this).attr('selected', true);
            SendScreen();
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

function getStyleById(id) {
    return getAllStyles(document.getElementById(id));
}
function getAllStyles(elem) {
    if (!elem) return []; // Element does not exist, empty list.
    var win = document.defaultView || window, style, styleNode = [];
    if (win.getComputedStyle) { /* Modern browsers */
        style = win.getComputedStyle(elem, '');
        for (var i=0; i<style.length; i++) {
            styleNode.push( style[i] + ':' + style.getPropertyValue(style[i]) );
            //               ^name ^           ^ value ^
        }
    } else if (elem.currentStyle) { /* IE */
        style = elem.currentStyle;
        for (var name in currentStyle) {
            styleNode.push( name + ':' + currentStyle[name] );
        }
    } else { /* Ancient browser..*/
        style = elem.style;
        for (var i=0; i<style.length; i++) {
            styleNode.push( style[i] + ':' + style[style[i]] );
        }
    }
    return styleNode;
}
