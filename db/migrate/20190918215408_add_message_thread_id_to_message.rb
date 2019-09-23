class AddMessageThreadIdToMessage < ActiveRecord::Migration[5.1]
  def change
    add_column :messages, :message_thread_id, :integer
  end
end
