require 'rails_helper'

RSpec.describe "Api::V1::Sleeps", type: :request do
  let(:current_user) { create(:user) }
  let(:headers) { current_user.create_new_auth_token }
  let(:params) {{
        user_id:current_user.id,
        sleep:{
          target_wake: DateTime.now + Rational(8,24),
          comment: "明日起きてなかったら起こしてください。"
        }
      }}

  describe "POST /api/v1/sleeps" do
     subject {  post(api_v1_sleeps_path, headers: headers, params: params) }
    context "おやすみAPIを叩いてデータを送信したとき" do
      it "正しくJSON形式のデータが返ってくる" do
        subject
        res=JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(res.keys).to eq ["state","target_wake","bedtime","comment","actual_wake"]
        expect(res["state"]).to eq "sleep"
      end
    end
  end

  describe "GET /api/v1/sleep/:id" do
    before do
      post(api_v1_sleeps_path, headers: headers, params: params)
    end
    subject { get(api_v1_sleep_path(current_user.id),headers:headers) }
    it "睡眠情報を取得できる" do
      subject
      res=JSON.parse(response.body)
      expect(res.keys).to eq ["state","target_wake","bedtime","comment","actual_wake"]
    end
  end

  describe "PATCH /api/v1/sleeps/:id" do
    before do
      post(api_v1_sleeps_path, headers: headers, params: params)
    end
    subject { patch(api_v1_sleep_path(current_user.id),headers:headers,params:body) }
    context "おはようAPIを叩いた時" do
      let(:body){{
        sleep: {
          actual_wake: DateTime.now + Rational(10,24),
          comment: "明日起きてなかったら起こしてください。"
        }
      }
      }
      it "stateがwakeに変更され、actual_wakeが返ってくる" do
        subject
        res=JSON.parse(response.body)
        expect(res["state"]).to eq "wake"
        actual_wake=DateTime.parse(res["actual_wake"])
        expect(actual_wake).to  be_within(1).of(DateTime.now)
      end
      it "睡眠時間が計算される" do
        expect{subject}.to change{CalculatedTime.count}.by(1)
        calculated_time=current_user.calculated_times.first
        calculated_time.sleep_time=current_user.sleep.actual_wake - current_user.sleep.bedtime
        calculated_time.diff_time=current_user.sleep.actual_wake - current_user.sleep.target_wake
      end

    end
  end

end
