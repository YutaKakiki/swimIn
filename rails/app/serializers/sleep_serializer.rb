class SleepSerializer < ActiveModel::Serializer
  attributes :state,:target_wake,:bedtime,:comment,:actual_wake
end
