class CreateEstates < ActiveRecord::Migration
  def change
    create_table :estates do |t|
      t.string :title
      t.string :city
      t.string :country
      t.string :address
      t.string :image
      t.integer :price

      t.timestamps null: false
    end
  end
end
