module Resolvers
  class ApiGame
    def all_orders
      Order.all
    end
  end
end

