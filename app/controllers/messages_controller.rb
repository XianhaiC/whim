class MessagesController < ApplicationController
  before_action :attempt_login, only: [:create]
  before_action :authenticate_session, only: [:create]

  MESSAGES_PER_PAGE = 30

  def show
  end

  def new
  end

  def create
    # authenticate spark before creating message
    authenticate_spark_session(Spark.find(params[:spark_id]))

    message = Message.new(message_params)
    impulse = Impulse.find(message_params[:impulse_id])
    spark = message.spark

    if message.save
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
        MessageSerializer.new(message)).serializable_hash.merge(
          ActiveModelSerializers::Adapter::Json.new(
          SparkSerializer.new(spark)).serializable_hash)

      ActiveMessagesChannel.broadcast_to impulse, serialized_data

      head :ok
    else
      render json: { errors: message.errors }, status => 400
    end
  end

  def edit
  end

  def update
  end

  def query_paginate
    # query the impulse with the associated id for a set of messages created
    # after the given date
    messages = Message.where("created_at < (?) AND impulse_id = (?)",
                             params[:offset], params[:id])
      .order("created_at DESC").limit(MESSAGES_PER_PAGE)
    render json: messages
  end

  private
    def message_params
      params.require(:message).permit(:body, :spark_id, :impulse_id)
    end

    def authenticate_spark_session(spark)
      if spark.account.nil?
        # authenticate via token verification
        if spark.session_token != @current_session_token
          render json: { errors: ['Spark not authenticated: Token mismatch'] }, status: :unauthorized
        end
      elsif @current_account.nil?
        render json: { errors: ['Spark not authenticated: Spark linked, but not logged in'] }, status: :unauthorized
      elsif !@current_account.nil? && @current_account.id.to_i != spark.account.id.to_i
        # authenticate via account link verification
        render json: { errors: ['Spark not authenticated: Spark does not belong to account'] }, status: :unauthorized
      end
    end
end
