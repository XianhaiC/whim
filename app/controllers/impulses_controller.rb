class ImpulsesController < ApplicationController
  def show
  end

  def new
  end

  def create
    impulse = Impulse.new(impulse_params)
    if impulse.save
      render json: impulse
    else
      render json: { errors: impulse.errors }, status => 400
    end
  end

  def edit
  end

  def update
  end

  private
    def impulse_params
      params.require(:impulse).permit(:name, :description)
    end
end
