class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!



  def show
    user=User.find_by(uid: CGI.unescape(params[:id])+".com")
    render json: user,serializer: CurrentUserSerializer, status: :ok
  end

  def update
    user=User.find_by(uid: CGI.unescape(params[:id])+".com")
    user.update(user_params)
    if user.save
      render json:user,serializer: CurrentUserSerializer, status: :ok
    else
      render json: {error:"ユーザの更新に失敗しました"},stauts: :bad_request
    end

  end

  def following
    following=current_api_v1_user.following
    render json: following, each_serializer: CurrentUserSerializer
  end



  # def followers
  #   followers=current_api_v1_user.followers
  #   render json: followers
  # end

  private
  def user_params
    params.require(:user).permit(:name,:email,:image)
  end
end
