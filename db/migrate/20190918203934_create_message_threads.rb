class CreateMessageThreads < ActiveRecord::Migration[5.1]
  def change
    create_table :message_threads do |t|

      t.timestamps
    end
    add_column :messages, :is_inspiration, :boolean
  end
end
