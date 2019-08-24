class SparksController < ApplicationController
  def show
  end

  def new
  end

  def create
    # account_id is null upon creation, must be set with a put
    spark = Spark.new(spark_params)
    if spark.save
      render json: spark
    else
      render json: { errors: spark.errors }, status => 400
    end
  end

  def edit
  end

  def update
    spark = Spark.find(params[:id])
    if spark.update(spark_params)
      head :ok
    else
      render json: { errors: spark.errors }, status => 400
    end
  end


  private
    def spark_params
      params.require(:spark).permit(:name, :sessions_hash, :account_id, :impulse_id)
    end
end
