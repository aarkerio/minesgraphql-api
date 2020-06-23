module Mutations
  class DeleteRecord < BaseMutation
    # arguments passed to the `resolve` method
    argument :id, Integer, required: true

    # return type from the mutation
    type Types::GameType

    def resolve(id: nil)
      game = Game.find(id)
      if game.destroy
        { id: id, name: "Record removed", time: 0 }
      else
        { id: 0, name: game.errors.full_messages, time: 0 }
      end
    end
  end
end

