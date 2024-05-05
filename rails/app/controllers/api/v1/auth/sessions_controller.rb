class Api::V1::Auth::SessionsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def show
    if current_api_v1_user
      render json: current_api_v1_user, serializer: CurrentUserSerializer, status: :ok
    else
      render json: { message: "ログインしてください" }, status: :unauthorized
    end
  end
end
