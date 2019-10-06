class SparkSerializer < ActiveModel::Serializer
  attributes :id, :name, :account_id, :impulse_id, :session_token,
    :email

  def email
    if !object.account.nil?
      return object.account.email
    else
      return nil
    end
  end
end
