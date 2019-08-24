class SessionsController < ApplicationController
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

  private
    def auth_token(account)
      return nil unless account and account.id
      {
        auth_token: JsonWebToken.encode({account_id: account.id}),
        account: {id: account.id, handle: account.handle, email: account.email}
      }
    end
end
