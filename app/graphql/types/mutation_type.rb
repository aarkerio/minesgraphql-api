module Types
  class MutationType < Types::BaseObject

    field :create_record, mutation: Mutations::CreateRecord
    field :delete_record, mutation: Mutations::DeleteRecord
  end
end
