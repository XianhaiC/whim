class MessageThreadSerializer < ActiveModel::Serializer
  belongs_to :parent

  attributes :id, :parent_type
end
