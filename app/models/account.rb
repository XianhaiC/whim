class Account < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  after_commit :reload_uuid, on: :create
  has_many :sparks
  has_many :impulses, through: :sparks
  has_many :messages, through: :sparks

  validates :handle, presence: true, length: { maximum: 50 }, 
    uniqueness: true
  validates :email, presence: true, length: { maximum: 255 },
    format: { with: VALID_EMAIL_REGEX },
    uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }

  has_secure_password

  def reload_uuid
    self[:uuid] = self.class.where(id: id).pluck(:uuid).first
  end
end
