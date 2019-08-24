class AddSessionHashToSpark < ActiveRecord::Migration[5.1]
  def change
    add_column :sparks, :session_hash, :string
  end
end
