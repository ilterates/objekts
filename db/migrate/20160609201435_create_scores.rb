class CreateScores < ActiveRecord::Migration
  def change
    create_table :scores do |t|
      t.string :top_score

      t.timestamps null: false
    end
  end
end
