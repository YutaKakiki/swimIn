FactoryBot.define do
  factory :user do
    sequence(:id) {|n| n }
    name { Faker::Name.name }
    sequence(:email) {|n| "#{n}_test@test.com" }
    password { Faker::Internet.password(min_length: 10) }
    confirmed_at { Time.current }
  end
end
