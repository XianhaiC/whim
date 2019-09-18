class Impulse < ApplicationRecord
  has_many :messages, -> { order('created_at DESC') }
  has_many :message_threads
  has_many :sparks
  has_many :accounts, through: :sparks

  validates :name, presence: true
end
