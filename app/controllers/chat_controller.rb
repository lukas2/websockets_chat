class ChatController < WebsocketRails::BaseController
  def initialize_session
  end

  def client_connected
  	send_message :test, { :message => "You're connected, Sir." }
  end

  def new_message
    send_message :test, {:message => "recieved #{message}" }
    WebsocketRails[:messages].trigger :update_chat, { :message => message["body"], 
      :nickname => message["nickname"] }
  end
end