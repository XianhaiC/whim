class ThreadsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "threads_channel"
  end

  def unsubscribed
  end
end
