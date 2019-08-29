class SessionsController < ApplicationController
  before_action :authenticate_session, only: [:session_sparks]
  def new
  end

  def create
    account = Account.find_by(email: params[:email].downcase)
    if account && account.authenticate(params[:password])
      render json: auth_token(account)
    else
    end

  end

  def destroy
  end

  #TODO Fix authentication issue. It seems that the session token isn't being accepted for some reason. figure out what the decryption depends on
  def register
    time = Time.now.to_i
    tok = JsonWebToken.encode({ timestamp: time })
    puts "TIME #{time}"
    puts "GEN #{tok}"
    render json: { auth_token: tok }
  end

  def session_sparks
    sparks = Spark.where(session_token: params[:session_token])
    impulses = sparks.map { |spark| spark.impulse }
    render json: { impulses: impulses, sparks: sparks }
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
