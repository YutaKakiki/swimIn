class CreateSleeps < ActiveRecord::Migration[7.0]
  def change
    create_table :sleeps do |t|
      t.integer :state,comment:"状態(0:睡眠中,1:起床中)"
      t.datetime :bedtime,comment:"就寝時刻"
      t.datetime :target_wake, comment:"目標起床時刻"
      t.datetime :actual_wake,comment:"実際の起床時刻"
      t.references :user,null:false,foreign_key:true

      t.timestamps
    end
  end
end
