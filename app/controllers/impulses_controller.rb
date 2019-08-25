class ImpulsesController < ApplicationController
  def show
    impulse = Impulse.find(params[:id])

    if !impulse.nil?
      serialized_data = ActiveModelSerializers::Adapter::Json.new(
          ImpulseSerializer.new(impulse)
        ).serializable_hash
      render json: serialized_data
    else
      render json: { errors: ['Impulse not found'] }, status => 400
    end
  end

  def create
    puts "CRETING NEW IMP"
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
