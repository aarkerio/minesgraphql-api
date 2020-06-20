module Mutations
  class CreateRecord < BaseMutation
    # arguments passed to the `resolve` method
    argument :name, String, required: true
    argument :time, Integer, required: true

    # return type from the mutation
    type Types::GameType

    def resolve(name: nil, time: nil)
      Game.create!(
        name: name,
        time: time,
      )
    end
  end
end

