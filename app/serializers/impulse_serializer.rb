class ImpulseSerializer < ActiveModel::Serializer
  has_many :sparks
  has_many :messages

  attributes :id, :name, :description, :invite_hash
end
