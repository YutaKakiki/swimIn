require 'rails_helper'

RSpec.describe "Api::V1::HealthChecks", type: :request do
  describe "GET /index" do
    subject { get(api_v1_health_check_path) }
    it "JSON形式で出力できる" do
      subject
      res=JSON.parse(response.body)
      expect(res["message"]).to eq "ヘルスチェックOK!!"
      expect(response).to have_http_status(:success)
    end
  end
end
