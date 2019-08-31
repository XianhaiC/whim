class AddInviteHashToImpulses < ActiveRecord::Migration[5.1]
  def change
    add_column :impulses, :invite_hash, :string
  end
end
