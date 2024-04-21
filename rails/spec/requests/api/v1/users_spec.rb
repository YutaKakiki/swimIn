require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe "GET /api/v1/user/following" do
    subject { get(following_api_v1_users_path,headers:) }
    let(:current_user){create(:user)}
    let(:headers){current_user.create_new_auth_token}
    let(:user2){create(:user)}
    let(:user3){create(:user)}
    let(:user4){create(:user)}
    before do
      current_user.follow(user2)
      current_user.follow(user3)
      current_user.follow(user4)
    end
    it "自分がフォローしているユーザが取得できる" do
      subject
      json_response = JSON.parse(response.body)
      following_ids = json_response.map { |user| user["id"] }
      expect(following_ids).to include(user2.id, user3.id, user4.id)
    end
  end

  describe "GET /api/v1/user/:id" do
    let(:current_user){ create(:user) }
    let(:target_user){ create(:user) }
    let(:headers){ current_user.create_new_auth_token }

    subject { get(api_v1_user_path(target_user.email), headers: headers) }

    it "emailを検索キーとしてユーザを検索できる" do
      subject
      expect(response).to have_http_status(:ok)
      res=JSON.parse(response.body)
      expect(res["email"]).to eq(target_user.email)

    end
  end

end
