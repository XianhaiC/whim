class Impulse < ApplicationRecord
  has_many :messages
  has_many :sparks
  has_many :accounts, through: :sparks
end
