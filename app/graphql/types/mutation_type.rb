module Types
  class MutationType < Types::BaseObject

    field :create_record, mutation: Mutations::CreateRecord

  end
end
