class SparkSerializer < ActiveModel::Serializer
  attributes :id, :name, :account_id, :impulse_id, :session_token
end
