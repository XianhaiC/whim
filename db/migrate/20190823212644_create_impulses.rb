class CreateImpulses < ActiveRecord::Migration[5.1]
  def change
    create_table :impulses do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
