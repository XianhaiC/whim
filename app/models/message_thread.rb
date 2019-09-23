class MessageThread < ApplicationRecord
  belongs_to :impulse
  belongs_to :parent, polymorphic: true
  has_many :messages, :foreign_key => "parent_thread"

  validates :impulse_id, presence: true
  validates :parent_id, presence: true
end
