class SparksController < ApplicationController
  def show
    spark = Sparks.find(params[:id])
    render json: spark
  end

  def create
    # account_id is null upon creation, will be set with PUT request during account linking
    spark = Spark.new(spark_params)
    if spark.save
      render json: spark
    else
      render json: { errors: spark.errors }, status => 400
    end
  end

  def update
    spark = Spark.find(params[:id])
    if spark.update(spark_params)
      head :ok
    else
      render json: { errors: spark.errors }, status => 400
    end
  end

  def messages
    spark = Sparks.find(params[:id])
    serialized_data = spark.messages.to_json
    render json: serialized_data
  end
  private
    def spark_params
      params.require(:spark).permit(:name, :sessions_hash, :account_id, :impulse_id)
    end
end
