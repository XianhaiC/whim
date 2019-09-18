class MessageThread < ApplicationRecord
  belongs_to :impulse
  belongs_to :inspiration, class_name: "Message", optional: true
  has_many :messages

  validates :impulse_id, presence: true
end
