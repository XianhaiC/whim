class RemoveSessionHashFromSparks < ActiveRecord::Migration[5.1]
  def self.up
    remove_column :sparks, :session_hash
  end
  def self.down
    add_column :sparks, :session_hash, :string
  end
end
