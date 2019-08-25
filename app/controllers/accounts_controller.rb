class AccountsController < ApplicationController
  before_action :authenticate_login!, except: [:create]

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

    serialized_data = [] 
    if !account.nil?
      render json: account.impulses
    else
      render json: { errors: ['Account not found'] }, status => 400
    end
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
