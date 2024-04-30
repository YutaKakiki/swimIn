class ChangeColumnsToCalculatedTimes < ActiveRecord::Migration[7.0]
  def change
    change_column :calculated_times, :sleep_time, :integer
    change_column :calculated_times, :diff_time, :integer
  end
end
