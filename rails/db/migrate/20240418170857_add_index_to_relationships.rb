class AddIndexToRelationships < ActiveRecord::Migration[7.0]
  def change
    # 一意制約に違反する重複レコードを削除
    execute <<-SQL
      CREATE TEMPORARY TABLE tmp_relationships AS
      SELECT MIN(id) AS id FROM relationships GROUP BY follower_id, followed_id;
    SQL

    # 明示的にコミット
    execute "COMMIT;"

    execute <<-SQL
      DELETE FROM relationships WHERE id NOT IN (SELECT id FROM tmp_relationships);
    SQL

    execute "COMMIT;"

    execute <<-SQL
      DROP TABLE tmp_relationships;
    SQL

    # follower_idにインデックスを追加します（存在しない場合のみ）
    unless index_exists?(:relationships, :follower_id)
      add_index :relationships, :follower_id
    end

    # followed_idにインデックスを追加します（存在しない場合のみ）
    unless index_exists?(:relationships, :followed_id)
      add_index :relationships, :followed_id
    end

    # follower_idとfollowed_idの組み合わせに一意インデックスを追加します（存在しない場合のみ）
    unless index_exists?(:relationships, [:follower_id, :followed_id], unique: true)
      add_index :relationships, [:follower_id, :followed_id], unique: true
    end
  end
end
