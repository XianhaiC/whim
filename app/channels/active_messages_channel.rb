class ActiveMessagesChannel < ApplicationCable::Channel
  def subscribed
    impulse = Impulse.find(params[:impulse])
    stream_for impulse
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
