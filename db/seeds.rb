# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# User.create(email: 'user@mail.com', password: '123456').errors.messages
Estate.destroy_all
10.times do
  Estate.create(
    title: Faker::Lorem.sentence,
    country: Faker::Address.country,
    city: Faker::Address.city,
    address: Faker::Address.street_address,
    price: Faker::Commerce.price,
    lat: Faker::Address.latitude,
    lng: Faker::Address.longitude
  )
end
