class ImpulseActivitiesChannel < ApplicationCable::Channel
  def subscribed
    impulse = Impulse.find(params[:impulse])
    stream_for impulse
  end

  def unsubscribed
  end
end
