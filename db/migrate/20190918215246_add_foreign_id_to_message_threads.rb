class AddForeignIdToMessageThreads < ActiveRecord::Migration[5.1]
  def change
    add_column :message_threads, :impulse_id, :integer
    add_column :message_threads, :inspiration_id, :integer
  end
end
