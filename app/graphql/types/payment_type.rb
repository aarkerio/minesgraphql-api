module Types
  class PaymentType < Types::BaseObject
    field :id, ID, null: false
    field :order_id, Integer, null: true
    field :amount, Float, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
