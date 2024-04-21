require 'rails_helper'

RSpec.describe "Api::V1::Relationships", type: :request do
  describe "POST /api/v1/relationship" do
    subject { post(api_v1_relationship_path, headers: headers, params: body ) }
    let(:current_user){create(:user)}
    let(:other_user){create(:user)}
    let(:headers){current_user.create_new_auth_token}
    let(:body){{email: other_user.email}}

    context "ユーザをフォローしたとき" do
      it "Relationshipが一つ増えている" do
        expect {subject}.to change{Relationship.count}.by(1)
      end
      it "current_userのfollowingにother_userが含まれている" do
        subject
        expect(current_user.following?(other_user)).to be_truthy
      end
    end
    context "自分自身をフォローしたとき" do
      let(:body){{email: current_user.email}}
      it "bad_requestレスポンスが返る" do
        subject
        res=JSON.parse(response.body)
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
end
