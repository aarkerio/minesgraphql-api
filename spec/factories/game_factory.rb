FactoryBot.define do
  factory :game do
    sequence(:name) { |n| "John (#{n})" }
    sequence(:time) { |n| "Smith (#{n})" }
  end
end

