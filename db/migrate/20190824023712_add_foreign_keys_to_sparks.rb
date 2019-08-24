class AddForeignKeysToSparks < ActiveRecord::Migration[5.1]
  def change
    add_column :sparks, :account_id, :integer
    add_column :sparks, :impulse_id, :integer
  end
end
