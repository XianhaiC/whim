class AddSessionTokenToSpark < ActiveRecord::Migration[5.1]
  def change
    add_column :sparks, :session_token, :string
  end
end
