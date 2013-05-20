
$(function(){

  var dispatcher = new WebSocketRails('localhost:3000/websocket');

  var channel = dispatcher.subscribe( "messages" );

  channel.bind('update_chat', function(data){
    console.log( "UC: " + data );
    var colorClass = "";
    if( data.nickname === $("#nickname").val()){
      colorClass = "blue";
    }
    $("#chat").prepend(
      $("<div class=\"chatline\"><div class=\"chatnick " + colorClass + " \">" + data.nickname + 
        "</div><div class=\"chatmsg\">" + data.message + "</div></div>").hide().
      fadeIn(1000));
  });

  dispatcher.on_open = function(data) {
    console.log('Connection has been established:');
    console.log (data);
  };

  if($("#nickname").val() === ""){
    var random = Math.floor(Math.random()*1001);
    $("#nickname").val("Guest_" + random);
  }

  $("#sendbutton").click(function(e){
    e.preventDefault();
    dispatcher.trigger( "message", 
      { body: $("#msg").val(), nickname: $("#nickname").val() });
    $("#msg").val("");
    $("#nickname").prop("disabled", true);
  });

  $("#nickname").prop("disabled", false);

});