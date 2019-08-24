class AddForeignKeysToMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :spark_id, :integer
    add_column :messages, :impulse_id, :integer
  end
end
