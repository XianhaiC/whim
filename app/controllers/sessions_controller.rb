class SessionsController < ApplicationController
  before_action :authenticate_session, only: [:session_sparks]
  def new
  end

  #TODO change to better function names
  def create
    account = Account.find_by(email: params[:email].downcase)
    if !account.nil? && account.authenticate(params[:password])
      render json: { auth: auth_token(account), activated: account.activated }
    else
    end
  end

  def destroy
  end

  def register
    time = Time.now.to_i
    tok = JsonWebToken.encode({ timestamp: time })
    render json: { auth_token: tok }
  end

  def session
    sparks = Spark.where(session_token: params[:session_token]).to_a
    session_spark_ids = sparks.map {|spark| spark.id}
    impulses = sparks.map { |spark| spark.impulse }

    # get sparks for each impulses' inspiration messages
    impulses.each {|impulse|
      impulse.message_threads.each {|thread|
        sparks << thread.parent.spark if thread.parent_type === "Message"
      }
    }
    sparks = sparks.uniq

    render json: {
      impulses: ActiveModel::Serializer::CollectionSerializer.new(
        impulses, each_serializer: ImpulseSerializer),
      sparks: ActiveModel::Serializer::CollectionSerializer.new(
        sparks, each_serializer: SparkSerializer),
      session_spark_ids: session_spark_ids
    }
  end

  private
    def auth_token(account)
      return nil unless account and account.id
      {
        auth_token: JsonWebToken.encode({ account_id: account.id }),
        account: { id: account.id, handle: account.handle, email: account.email }
      }
    end
end
