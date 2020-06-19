module Types
  class GameType < Types::BaseObject
    field :id, Integer, null: false
    field :name, String, null: true
    field :status, String, null: true
    field :time, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
