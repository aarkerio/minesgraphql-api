class CreateTiles < ActiveRecord::Migration[6.0]
  def change
    create_table :tiles do |t|
      t.number :game_id
      t.number :x
      t.number :y
      t.number :flagged

      t.timestamps
    end
  end
end
