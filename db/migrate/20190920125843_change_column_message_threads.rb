class ChangeColumnMessageThreads < ActiveRecord::Migration[5.1]
  def change
    change_column :messages, :message_thread_id, :parent_thread_id
  end
end
