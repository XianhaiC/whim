class AddParentThreadIdToMessages < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :parent_thread_id, :integer
  end
end
