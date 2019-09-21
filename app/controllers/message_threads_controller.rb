class MessageThreadsController < ApplicationController
  MESSAGES_PER_PAGE = 30

  def show
    message_thread = MessageThread.find(params[:id])
    render json: message_thread
  end

  def create
    message_thread = MessageThread.new(message_thread_params)
    if (message_thread.save)
      render json: message_thread
    else
      render json: { errors: message_thread.errors }, status => 400
    end
  end

  def load
    # query the message thread for messages created after date given by offset
    messages = Message.where("created_at < (?) AND parent_thread_id = (?)",
                             params[:offset], params[:id])
      .order("created_at DESC").limit(MESSAGES_PER_PAGE)
    render json: messages
  end

  private
    def message_thread_params
      params.require(:message_thread).permit(:impulse_id, :inspiration_id)
    end
end