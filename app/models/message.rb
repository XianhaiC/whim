class Message < ApplicationRecord
  belongs_to :spark
  belongs_to :impulse
  belongs_to :parent_thread, class_name: "MessageThread"
  has_one :own_thread, as: :parent, class_name: "MessageThread", required: false

  validates :spark_id, presence: true
  validates :impulse_id, presence: true
  validates :parent_thread_id, presence: true
end
