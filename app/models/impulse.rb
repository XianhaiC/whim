class Impulse < ApplicationRecord
  has_many :messages, -> { order('created_at DESC') }
  has_many :message_threads
  has_many :sparks
  has_many :accounts, through: :sparks
  has_one :message_thread, as: :parent

  validates :name, presence: true
end
