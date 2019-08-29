class SparkSerializer < ActiveModel::Serializer
  has_many :messages

  attributes :id, :name, :account_id, :impulse_id
end
