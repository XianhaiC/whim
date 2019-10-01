class AccountsController < ApplicationController
  before_action :authenticate_login, except: [:create]

  def show
    account = Account.find(params[:id])
    render json: account
  end

  def create
    account = Account.new(account_params)
    if account.save
      ActivationMailer.activation_email(account).deliver
      render json: account
    else
      render json: { errors: account.errors }, status => 400
    end
  end

  def update
  end

  def data
    if params[:id].to_i != @current_account.id
      puts "CURRENT ID: #{@current_account.id}, REQ ID: #{params[:id]}"
      return render json: { errors: ["Unauthorized for action: logged in account doesn't match requested account"] }, status: :unauthorized
    end

    account = Account.find(params[:id])
    if !account.nil?
      sparks = account.sparks.to_a;
      puts sparks

      # get sparks for each impulses' inspiration messages
      account.impulses.each {|impulse|
        impulse.message_threads.each {|thread|
          sparks << thread.parent.spark if thread.parent_type === "Message"
        }
      }
      sparks = sparks.uniq

      render json: {
        impulses: ActiveModel::Serializer::CollectionSerializer.new(
          account.impulses, each_serializer: ImpulseSerializer),
        sparks: ActiveModel::Serializer::CollectionSerializer.new(
          sparks, each_serializer: SparkSerializer)
      }
    else
      render json: { errors: ["Account not found"] }, status => 400
    end
  end

  private
  def account_params
    params.require(:account).permit(:name, :email, :password, :password_confirmation)
  end
end
