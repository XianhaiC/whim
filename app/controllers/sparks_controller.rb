class SparksController < ApplicationController
  before_action :authenticate_login, only: [:update]
  before_action :authenticate_session, only: [:create]

  def show
    spark = Sparks.find(params[:id])
    render json: spark
  end

  def create
    # account_id is null upon creation, will be set with PUT request during
    # account linking
    spark = Spark.new(spark_params)
    if spark.save
      render json: spark
    else
      render json: { errors: spark.errors }, status: 400
    end
  end

  def update
    spark = Spark.find(params[:id])
    account = Account.find(params[:account_id])
    spark.session_token = nil

    if !account || !account.activated
      render json: {
        errors:["Account does not exist or has not been activated"] },
      status: 400

    # update the spark with the account id
    spark.account_id = account.id
    if spark.save
      render json: spark
    else
      render json: { errors: spark.errors }, status: 400
    end
  end

  def messages
    spark = Spark.find(params[:id])
    serialized_data = spark.messages.to_json
    render json: serialized_data
  end

  private
    def spark_params
      params.require(:spark).permit(
        :name, :account_id, :impulse_id, :session_token)
    end

    def auth_token_spark(spark)
      return nil unless spark and spark.id
      {
        auth_token: JsonWebToken.encode({ spark_id: spark.id }),
        spark: { id: spark.id }
      }
    end
end
