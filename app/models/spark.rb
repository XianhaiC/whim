class Spark < ApplicationRecord
  belongs_to :account
  belongs_to :impulse
  has_many :messages
end
