class ImpulsesController < ApplicationController
  def show
  end

  def create
    impulse = Impulse.new(impulse_params)
    if impulse.save
      render json: impulse
    else
      render json: { errors: impulse.errors }, status => 400
    end
  end

  def update
  end

  def messages
    impulse = Impulse.find(params[:id])
    serialized_data = impulse.messages.to_json
    render json: serialized_data
  end

  def sparks
    impulse = Impulse.find(params[:id])
    serialized_data = impulse.sparks.to_json
    render json: serialized_data
  end

  private
    def impulse_params
      params.require(:impulse).permit(:name, :description)
    end
end
