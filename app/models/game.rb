class Game < ApplicationRecord
  has_many :tiles
  has_many :mines

  def self.best_records(limit=10)
    Game.order(time: :asc).limit(limit)
  end

end
