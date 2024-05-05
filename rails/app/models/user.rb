# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  include DeviseTokenAuth::Concerns::User

  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed

  has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy
  has_many :followers, through: :passive_relationships

  has_many :calculated_times, dependent: :destroy

  has_one :sleep, dependent: :destroy

  def follow(user)
    active_relationships.create(followed_id: user.id)
  end

  def unfollow(user)
    self.active_relationships.find_by(followed_id: user.id).destroy
  end

  def following?(user)
    self.following.include?(user)
  end

  def calculate_time(actual_wake)
    sleep = self.sleep
    bedtime = sleep.bedtime
    target_wake = sleep.target_wake

    sleep_time = (actual_wake - bedtime).to_i / 60
    diff_time = (actual_wake - target_wake).to_i / 60

    self.calculated_times.create!(sleep_time:, diff_time:)
  end
end
