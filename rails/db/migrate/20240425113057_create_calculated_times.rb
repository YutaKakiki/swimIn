class CreateCalculatedTimes < ActiveRecord::Migration[7.0]
  def change
    create_table :calculated_times do |t|
      t.time :sleep_time,comment:"睡眠時間"
      t.time :diff_time,comment:"目標起床時刻と実際の起床時刻の差分"
      t.references :user,null:false,foreign_key:true
      t.timestamps
    end
  end
end
