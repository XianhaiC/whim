class Message < ApplicationRecord
  belongs_to :spark
  belongs_to :impulse

  validates :spark_id, presence: true
  validates :impulse_id, presence: true
end
