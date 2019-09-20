class FixRename < ActiveRecord::Migration[5.1]
  def change
    remove_column :messages, :message_thread_id
    add_column :messages, :parent_thread_id, :integer
  end
end
