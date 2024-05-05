class Sleep < ApplicationRecord
  belongs_to :user
  enum :state, { sleep: 0, wake: 1 }
end
