class Api::V1::SleepsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def show
    user = User.find_by(id: params[:id])
    sleep = user.sleep
    user.calculated_times.where(created_at: Date.today)

    if sleep
      render json: sleep, serializer: SleepSerializer, status: :ok
    else
      render json: { state: "none" }, status: :ok
    end
  end

  def create
    user = User.find_by(id: params[:user_id])
    sleep = user.build_sleep(sleep_params)
    sleep.update!(state: "sleep", bedtime: DateTime.now)
    if sleep.save
      render json: sleep, serializer: SleepSerializer, status: :ok
    else
      render json: { error: "おやすみ打刻に失敗しました。" }, status: :bad_request
    end
  end

  def update
    user = User.find_by(id: params[:id])
    sleep = user.sleep
    actual_wake = Time.zone.parse(params[:sleep][:actual_wake])
    sleep.update!(state: "wake", actual_wake: params[:sleep][:actual_wake], comment: params[:sleep][:comment])
    user.calculate_time(actual_wake)
    render json: sleep, serializer: SleepSerializer, status: :ok
  end

  def sleeping_friends
    sleeping_friends = current_api_v1_user.following.select {|friend| friend.sleep.state == "sleep" if friend.sleep }
    if sleeping_friends
      render json: sleeping_friends, each_serializer: CurrentUserSerializer, status: :ok
    end
  end

  def return_times
    calc_times=current_api_v1_user.calculated_times
    monthly_times = current_api_v1_user.calculated_times.where("strftime('%m',created_at)=?", DateTime.now.strftime("%m"))
# 最大で七日分の要素を配列にしたい。
# DBが七日分のデータ以下だった場合には、
# その数分に応じた数の要素を詰めたい。
    if (calc_times.length == 1)
      weekly_times = current_api_v1_user.calculated_times.where(created_at: Date.today)
    elsif (calc_times.length == 2)
      weekly_times = current_api_v1_user.calculated_times.where(created_at: Date.today - 1..Date.today)
    elsif (calc_times.length == 3)
      weekly_times = current_api_v1_user.calculated_times.where(created_at: Date.today - 2..Date.today)
    elsif (calc_times.length == 4)
      weekly_times = current_api_v1_user.calculated_times.where(created_at: Date.today - 3..Date.today)
    elsif (calc_times.length == 5)
      weekly_times = current_api_v1_user.calculated_times.where(created_at: Date.today - 4..Date.today)
    elsif (calc_times.length == 6)
      weekly_times = current_api_v1_user.calculated_times.where(created_at: Date.today - 5..Date.today)
    else
      weekly_times = current_api_v1_user.calculated_times.where(created_at: Date.today - 6..Date.today)
    end



    weekly_sleep_times = weekly_times.map(&:sleep_time)
    weekly_diff_times = weekly_times.map(&:diff_time)
    # 平均睡眠時間は、当日のデータ（＝０ふん）を除いた（最大）過去6日分で計算したい
    weekly_sleep_times_for_av=weekly_times.map(&:sleep_time)
    weekly_sleep_times_for_av.pop if weekly_sleep_times_for_av.count > 1
    weekly_sleep_times_average = weekly_sleep_times_for_av.sum / weekly_sleep_times_for_av.length

    monthly_sleep_times = monthly_times.map(&:sleep_time)
    monthly_diff_times = monthly_times.map(&:diff_time)
    # 平均睡眠時間を、当日を除いた、当月の計算をしたい
    monthly_sleep_times_for_av=monthly_times.map(&:sleep_time)
    monthly_sleep_times_for_av.pop if monthly_sleep_times_for_av.count > 1
    monthly_sleep_times_average = monthly_sleep_times_for_av.sum / monthly_sleep_times_for_av.length



      render json:
      { weekly: {
          sleep_times: weekly_sleep_times,
          diff_times: weekly_diff_times,
          sleep_times_average: weekly_sleep_times_average,
        },
        monthly: {
          sleep_times: monthly_sleep_times,
          diff_times: monthly_diff_times,
          sleep_times_average: monthly_sleep_times_average,
        } }
  end

  def forget_stamp_process
    last_data = current_api_v1_user.calculated_times.last
    return if last_data.nil?
    while last_data.created_at < Date.today
      last_data = current_api_v1_user.calculated_times.create!(sleep_time: 0, diff_time: 0, created_at: last_data.created_at + 1, updated_at: last_data.created_at + 1)
    end
  end



  private

    def sleep_params
      params.require(:sleep).permit(:state, :target_wake, :comment, :actual_wake)
    end
end
