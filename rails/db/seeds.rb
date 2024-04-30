# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# メインのサンプルユーザーを1人作成する
User.create!(name:  "柿木優汰",
             email: "uta31501224@gmail.com",
             password:              "password",
             password_confirmation: "password",
             confirmed_at: Time.current)

# 追加のユーザーをまとめて生成する
10.times do |n|
  name  = Faker::Name.name
  email = "test#{n+1}@test.com"
  password = "password"
  User.create!(name:  name,
               email: email,
               password:              password,
               password_confirmation: password,
               confirmed_at:Time.current)
end
