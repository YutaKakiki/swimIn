class Api::V1::Auth::ConfirmationsController < ApplicationController
  def update
    user = User.find_by(confirmation_token: params[:confirmation_token])
    return render json: { message: "認証トークンが正しくありません" }, status: :not_found if user.nil?
    return render json: { message: "すでに認証済みのユーザーです" }, status: :bad_request if user.confirmed?

    user.update_attribute(:confirmed_at, Time.current)
    render json: { message: "ユーザーの認証に成功しました" }, status: :ok
  end
end
