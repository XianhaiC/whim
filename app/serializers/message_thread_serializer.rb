class MessageThreadSerializer < ActiveModel::Serializer
  #belongs_to :parent, polymorphic: true

  attributes :id, :impulse_id, :parent_type
  attribute :parent, polymorphic: true
end

#class ParentSerializer < ActiveModel::Serializer
#  attributes
#end
