class ImpulseSerializer < ActiveModel::Serializer
  has_many :sparks
  has_many :message_threads
  has_one :message_thread, as: :parent

  attributes :id, :name, :description, :invite_hash, :sparks_joined, :inspirations_created

  def sparks_joined
    object.sparks.length
  end

  def inspirations_created
    # subtract one to account for the impulses' own thread
    object.message_threads.length - 1
  end
end
