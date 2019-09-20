class MessageSerializer < ActiveModel::Serializer
  has_one :spark

  attributes :id, :body, :created_at, :impulse_id, :parent_thread_id
end
