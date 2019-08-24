class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :impulse_id, :spark_id
end
