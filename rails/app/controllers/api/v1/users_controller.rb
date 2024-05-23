class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!

  def update
    user = User.find_by(id: params[:id])
    if user.update(user_params)
      render json: user, serializer: CurrentUserSerializer, status: :ok
    else
      render json: { error: "ユーザの更新に失敗しました" }, status: :bad_request
    end
  end

  def following
    followings = current_api_v1_user.following.includes(:sleep).order("sleeps.updated_at DESC")
    followings_sleep = followings.map(&:sleep)
    render json: { followings:, followings_sleep: }, each_serializer: CurrentUserSerializer
  end

  def find
    email = params[:user][:email]
    user = User.find_by(uid: email)
    render json: user, serializer: CurrentUserSerializer, status: :ok
  end

  def followers
    followers = current_api_v1_user.followers.where.not(id: current_api_v1_user.following.pluck(:id))
    render json: followers
  end

  private

    def user_params
      params.require(:user).permit(:id, :name, :email)
    end
end
