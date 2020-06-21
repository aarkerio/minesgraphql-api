module Mutations
  class CreateRecord < BaseMutation
    # arguments passed to the `resolve` method
    argument :name, String, required: true
    argument :time, Integer, required: true

    # return type from the mutation
    type Types::GameType

    def resolve(name: nil, time: nil)
      game = Game.new(name: name, time: time)
      if game.save
        game
      else
        { id: 0, name: game.errors.full_messages, time: 0 }
      end
    end
  end
end

