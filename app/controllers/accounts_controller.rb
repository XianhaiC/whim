class AccountsController < ApplicationController
  def show
    account = Account.find(param[:id])
    #TODO should we send back list of impulses as well? Or should that be sent in a different request?
    render json: account
  end

  def new
  end

  def create
    account = Account.new(account_params)
    if account.save
      render json: account
    else
      render json: { errors: account.errors }, status => 400
    end
  end

  def edit
  end

  def update
  end

  private
    def account_params
      params.require(:account).permit(:name, :email, :password, :password_confirmation)
    end
end
