class ImpulseSerializer < ActiveModel::Serializer
  has_many :sparks
  has_many :message_threads
  has_one :message_thread, as: :parent

  attributes :id, :name, :description, :invite_hash
end
