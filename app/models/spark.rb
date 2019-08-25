class Spark < ApplicationRecord
  belongs_to :account
  belongs_to :impulse
  has_many :messages, -> { order('created_at DESC') }

  validates :name, presence: true, length: { maximum: 50 }
  validates :impulse_id, presence: true
end
