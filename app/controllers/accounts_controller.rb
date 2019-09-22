class AccountsController < ApplicationController
  before_action :authenticate_login, except: [:create]

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
    if params[:id].to_i != @current_account.id
      puts "CURRENT ID: #{@current_account.id}, REQ ID: #{params[:id]}"
      return render json: { errors: ["Unauthorized for action: logged in account doesn't match requested account"] }, status: :unauthorized
    end

    account = Account.find(params[:id])
    if !account.nil?
      serialized_data = ActiveModel::Serializer::CollectionSerializer.new(
        account.impulses, each_serializer: ImpulseSerializer)
      puts "SENDING IMPS"
      puts serialized_data

      render json: serialized_data
    else
      render json: { errors: ["Account not found"] }, status => 400
    end
  end

  def sparks
    account = Account.find(params[:id])
    if !account.nil?
      render json: account.sparks
    else
      render json: { errors: ["Account not found"] }, status => 400
    end
  end

  private
  def account_params
    params.require(:account).permit(:name, :email, :password, :password_confirmation)
  end
end
