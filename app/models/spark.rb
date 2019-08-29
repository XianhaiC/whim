class Spark < ApplicationRecord
  belongs_to :account, optional: true
  belongs_to :impulse
  has_many :messages, -> { order('created_at DESC') }

  validates :name, presence: true, length: { maximum: 50 }
  validates :impulse_id, presence: true
  validates :session_token, presence: true
end
