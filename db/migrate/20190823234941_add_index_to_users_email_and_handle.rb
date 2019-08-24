class AddIndexToUsersEmailAndHandle < ActiveRecord::Migration[5.1]
  def change
    add_index :accounts, :email, unique: true
    add_index :accounts, :handle, unique: true
  end
end
