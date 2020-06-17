
module Types
  class QueryType < Types::BaseObject

    # TODO: remove me
    field :test_field, String, null: false do
      description "An example field added by the generator"
    end

    def test_field
      "Hello World!"
    end

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :all_orders, [Types::OrderType], null: false

    # TODO: remove me
    field :test_field, String, null: false do
      description "An example field added by the generator"
    end

    def test_field
      "Hello World!"
    end

  end
end
