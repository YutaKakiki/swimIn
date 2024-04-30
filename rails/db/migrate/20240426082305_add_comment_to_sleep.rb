class AddCommentToSleep < ActiveRecord::Migration[7.0]
  def change
    add_column :sleeps, :comment, :text
  end
end
