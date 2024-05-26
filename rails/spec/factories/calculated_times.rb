FactoryBot.define do
  factory :calculated_time_April, class: "CalculatedTime" do
    sleep_time { Faker::Number.between(from: 40, to: 90) }
    diff_time { Faker::Number.between(from: -30, to: 30) }
    sequence(:created_at) {|n| DateTime.new(2024, 4, n) }
    sequence(:updated_at) {|n| DateTime.new(2024, 4, n) }
  end
end

FactoryBot.define do
  factory :calculated_time_May, class: "CalculatedTime" do
    sleep_time { 360 }
    diff_time { 60 }
    sequence(:created_at) {|n| DateTime.new(2024, 5, n) }
    sequence(:updated_at) {|n| DateTime.new(2024, 5, n) }
  end
end
