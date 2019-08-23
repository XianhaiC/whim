class CreateSparks < ActiveRecord::Migration[5.1]
  def change
    create_table :sparks do |t|
      t.string :name

      t.timestamps
    end
  end
end
