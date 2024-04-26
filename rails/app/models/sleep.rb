class Sleep < ApplicationRecord
  enum :state, {:sleep,:wake}
end
