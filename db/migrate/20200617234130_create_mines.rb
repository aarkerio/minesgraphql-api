class CreateMines < ActiveRecord::Migration[6.0]
  def change
    create_table :mines do |t|
      t.numeric :game_id
      t.numeric :x
      t.numeric :y

      t.timestamps
    end
  end
end
