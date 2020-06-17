class CreateMines < ActiveRecord::Migration[6.0]
  def change
    create_table :mines do |t|
      t.number :game_id
      t.number :x
      t.number :y

      t.timestamps
    end
  end
end
