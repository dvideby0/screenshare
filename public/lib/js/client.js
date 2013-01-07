var socket = undefined;
var SessionKey;
var oDOM;
$(document).on('ready', function(){
    $('#HomePage').show();
    $('.nav li').click(function(){
        $(this).parent('ul').children('li').removeClass('active');
        $(this).addClass('active');
        var Name = $(this).children('a').text();
        $('.page').hide();
        $('#' + Name + 'Page').show()
    });
    AddMenu();
});
function socketSend(msg) {
    socket.emit('changeHappened', {change: msg, room: SessionKey});
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
    socket = io.connect('http://localhost:3001');
    SessionKey = document.getElementById('SessionKey').value;
    socket.on('connect', function(){
        socket.emit('CreateSession', SessionKey);
        $('#RemoteStatus').text('Status: Waiting for connection.');
        socket.on('SessionStarted', function() {
            $('#RemoteStatus').text('Status: Connected!');
            socketSend({height: $(window).height(), width: $(window).width()});
            socketSend({ base: location.href.match(/^(.*\/)[^\/]*$/)[1] });
            socketSend(oDOM);
            SendMouse();
            $('body').append('<div id="AdminPointer" style="position: absolute; z-index: 9999; height: 30px; width: 30px; border-radius: 5em; background-color: orange; opacity:0.5; top: 1px"></div> ');
            $(window).scroll(function(){
                socketSend({scroll: $(window).scrollTop()});
            });
        });
        socket.on('AdminMousePosition', function(msg) {
            $('#AdminPointer').css({'left': msg.PositionLeft - 15, 'top': msg.PositionTop});
        });
        socket.on('DOMLoaded', function(){
            BindEverything();
        })
    });

}

function BindEverything(){
    $(':input').each(function(){
        $(this).attr('value', this.value);
    });
    $('select').each(function(){
        var Selected = $(this).children('option:selected');
        $(this).children('option').removeAttr('selected', false);
        Selected.attr('selected', true);
        $(this).replaceWith($(this)[0].outerHTML);
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
        socket.emit('ClientMousePosition', {room: document.getElementById('SessionKey').value, PositionLeft: e.pageX, PositionTop: e.pageY});
    }
}

function AddMenu(){
    $('body').append('<table id="MenuTable" cellpadding="0"><tr><td><div id="SlideMenu"><p class="rotate">HELP</p></div></td><td id="MainMenuTD" style="height: 300px; width: 300px; text-align: center"><h3>Remote Assistance</h3><p style="text-align: justify">To Start a remote session, please create a key and provide it to the representative assisting you. Keys should be between 6 and 10 characters.</p><input id="SessionKey" style="margin-top: 15px; margin-bottom: 15px; width: 90%; height: 30px; font-size: 25px;"><p id="RemoteStatus">Status: Disconnected</p><a class="btn" style="width: 70%" onclick="CreateSession();">Create Key</a></td></tr></table>');
    $('#SlideMenu').css({width:30, height:100, paddingTop: 80});
    $('#MenuTable').css({position: 'fixed', zIndex: 9998, left: $(window).width() - 30, top: ($(window).height()/2) - 150, margin: 0, padding: 0});
    $('#SlideMenu').mouseenter(function(){
        if($('#MenuTable').offset().left == $(window).width() -30){
            $('#MenuTable').animate({left:'-=' + ($('#MenuTable').width() - 30)},'fast');
        }
    });
    $('#MenuTable').mouseleave(function(){
        if($(this).offset().left == $(window).width() - $('#MenuTable').width()){
            $(this).animate({left:'+=' + ($('#MenuTable').width() - 30)},'fast');
        }
    });
}

$(window).resize(function() {
    if(socket != undefined){
        socketSend({height: $(window).height(), width: $(window).width()});
    }
    $('#MenuTable').css({left: ($(window).width() - 30), top: ($(window).height()/2) - 150});
});