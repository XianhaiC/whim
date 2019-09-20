class AddIndexToMessageThreads < ActiveRecord::Migration[5.1]
  def change
    add_reference :message_threads, :parent, polymorphic: true, index: true
  end
end
