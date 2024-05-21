class Api::V1::HealthCheckController < ApplicationController
  def index
    render json: { message: "ヘルスチェックOK!!!" }, staus: :ok
  end
end
