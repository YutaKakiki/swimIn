#!/bin/bash
set -e

echo "Start entrypoint.prod.sh"

# Clear Rails cache
echo "rails tmp:cache:clear"
bundle exec rails tmp:cache:clear

echo "rm -f /myapp/tmp/pids/server.pid"
rm -f /myapp/tmp/pids/server.pid

# DBをリセット
# echo "rails db:drop"
# DISABLE_DATABASE_ENVIRONMENT_CHECK=1 bundle exec rails db:drop RAILS_ENV=production

# 初回デプロイ時のみ
# echo "bundle exec rails db:create RAILS_ENV=production"
# bundle exec rails db:create RAILS_ENV=production

echo "bundle exec rails db:migrate RAILS_ENV=production"
bundle exec rails db:migrate RAILS_ENV=production



echo "exec pumactl start"
bundle exec pumactl start
