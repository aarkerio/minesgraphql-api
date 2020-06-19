class Game < ApplicationRecord
  has_many :tiles
  has_many :mines

  def self.best_records(limit=10)
    Game.order(time: :desc).limit(limit)
  end

  def generate_board
    (1..8).each do |x|
      (1..8).each do |y|
        self.tiles.create({:x=>x, :y=>y})
      end
    end

    mines_tmp = Array.new
    count = 1
    while count <= 10
      tmp = {:x => 1+rand(8), :y => 1+rand(8)}
      if !mines_tmp.include?(tmp)
        self.mines.create(tmp)
        mines_tmp << tmp
        count = count + 1
      end
    end
  end

  def play(grid)

  end

end
