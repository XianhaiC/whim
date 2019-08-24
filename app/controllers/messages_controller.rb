class MessagesController < ApplicationController
  def show
  end

  def new
  end

  def create
    message = Message.new(message_params)
    impulse = Impulse.find(message_params[:impulse_id])

    if message.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        MessageSerializer.new(message)
      ).serializable_hash

      MessagesChannel.broadcast_to impulse, serialized_data

      head :ok
    else
      render json: { errors: message.errors }, status => 400
    end
  end

  def edit
  end

  def update
  end

  private
    def message_params
      params.require(:message).permit(:body, :spark_id. :impulse_id)
    end
end
