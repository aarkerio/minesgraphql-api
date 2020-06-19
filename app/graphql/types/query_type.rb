module Types
  class QueryType < Types::BaseObject

    field :get_records, [GameType], null: true do
      description "get best records"
      argument :limit, Integer, required: true
    end

    # Resolver
    def get_records(limit:)
      Game.best_records(limit)
    end

    field :post, PostType, null: true do
      description "Find a post by ID"
      argument :id, ID, required: true
    end

    # Resolver
    def post(id:)
      Post.find(id)
    end

  end
end
