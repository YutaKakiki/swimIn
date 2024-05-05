class ChangeColmunToCalculatedTime < ActiveRecord::Migration[7.0]
  def change
    change_column :calculated_times,:created_at,:date
    change_column :calculated_times,:updated_at,:date
  end
end
