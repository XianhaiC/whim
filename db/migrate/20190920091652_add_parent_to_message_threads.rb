class AddParentToMessageThreads < ActiveRecord::Migration[5.1]
  def change
    remove_column :message_threads, :parent_id, :parent_type
    add_reference :message_threads, :parent, polymorphic: true, index: true
  end
end
