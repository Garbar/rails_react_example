class AddLatLngToEstates < ActiveRecord::Migration
  def change
    add_column :estates, :lat, :string
    add_column :estates, :lng, :string
  end
end
