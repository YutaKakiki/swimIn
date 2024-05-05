class Api::V1::RelationshipsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def create
    user = User.find_by(email: params[:email])
    if user
      if user == current_api_v1_user
        render json: { message: "自分自身はフォローできません" }, status: :bad_request
      else
        current_api_v1_user.follow(user)
        render json: { message: "フォローしました" }, status: :ok
      end
    else
      render json: { error: "User not found" }, status: :not_found
    end
  end

  def destroy
    user = User.find_by(id: params[:id])
    current_api_v1_user.unfollow(user)
    render json: user, status: :ok
  end
end
