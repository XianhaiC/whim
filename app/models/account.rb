class Account < ApplicationRecord
  has_many :sparks
  has_many :impulses, through: :sparks
  has_many :messages, through: :sparks
end
