class MessageThreadsChannel < ApplicationCable::Channel
  def subscribed
    thread = MessageThread.find(params[:thread])
    stream_for thread
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
