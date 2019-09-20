#TODO change all render to return render
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
    impulse = Impulse.new(impulse_params)
    if !impulse.save
      return render json: { errors: impulse.errors }, status => 400
    end

    thread = MessageThread.new(impulse: impulse, parent: impulse)
    if !thread.save
      return render json: { errors: thread.errors }, status => 400
    end

    # note that the impulses' thread is embeded into the JSON by the serializer
    return render json: impulse
  end

  def update
  end

  def messages
    impulse = Impulse.find(params[:id])
    render json: impulse.messages
  end

  def sparks
    impulse = Impulse.find(params[:id])
    render json: impulse.sparks
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
