class CreateTiles < ActiveRecord::Migration[6.0]
  def change
    create_table :tiles do |t|
      t.numeric :game_id
      t.numeric :x
      t.numeric :y
      t.numeric :flagged

      t.timestamps
    end
  end
end
