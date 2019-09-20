class ImpulseSerializer < ActiveModel::Serializer
  has_many :sparks
  has_many :messages
  has_one :message_thread

  attributes :id, :name, :description, :invite_hash
end
