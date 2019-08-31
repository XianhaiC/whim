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

  def invite
    impulse = Impulse.find_by(invite_hash: params[:invite_hash])
    if !impulse.nil?
      render json: impulse
    else
      render json: { errors: ['Impulse not found'] }, status => 400
    end
  end

  def invite_new
    impulse = Impulse.find(params[:id])
    if !impulse.nil?
      invite_hash = gen_hash(INVITE_HASH_LENGTH)
      impulse.update(invite_hash: invite_hash)
      render json: impulse
    else
      render json: { errors: ['Impulse not found'] }, status => 400
    end
  end

  private
    def impulse_params
      params.require(:impulse).permit(:name, :description)
    end
end
