class Api::V1::SleepsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def show
    user=User.find_by(id: params[:id])
    sleep=user.sleep
    time=user.calculated_times.where(created_at:Time.zone.today)

    if sleep
      render json:sleep,serializer: SleepSerializer,status: :ok
    else
      render json: {message:"まだ睡眠状態がありません"},status: :ok
    end
  end

  def create
    user=User.find_by(id: params[:user_id])
    sleep=user.build_sleep(sleep_params)
    sleep.update(state:"sleep",bedtime:DateTime.now)
    if sleep.save
      render json: sleep,serializer: SleepSerializer,status: :ok
    else
      render json:{error:"おやすみ打刻に失敗しました。"},status: :bad_request
    end
  end

  def update
    user=User.find_by(id:params[:id])
    sleep=user.sleep
    actual_wake=Time.zone.parse(params[:sleep][:actual_wake])
    sleep.update(state:"wake",actual_wake:params[:sleep][:actual_wake] ,comment:params[:sleep][:comment])
    user.calculate_time(actual_wake)
    render json: sleep,serializer: SleepSerializer,status: :ok
  end

  def destroy
  end



  private
  def sleep_params
    params.require(:sleep).permit(:state,:target_wake,:comment,:actual_wake)
  end
end
