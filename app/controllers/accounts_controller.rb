class AccountsController < ApplicationController
  before_action :authenticate_request!, except: [:create]

  def show
    account = Account.find(params[:id])
    render json: account
  end

  def create
    account = Account.new(account_params)
    if account.save
      render json: account
    else
      render json: { errors: account.errors }, status => 400
    end
  end

  def update
  end

  def impulses
    account = Account.find(params[:id])
    serialized_data = account.impulses.to_json
    render json: serialized_data
  end

  def sparks
    account = Account.find(params[:id])
    serialized_data = account.sparks.to_json
    render json: serialized_data
  end

  private
    def account_params
      params.require(:account).permit(:name, :email, :password, :password_confirmation)
    end
end
