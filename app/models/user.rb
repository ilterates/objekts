class User < ActiveRecord::Base

  has_many :scores
  # has_secure_password
  #
  # validates :username, presence: true, uniqueness: true, length: { in: 3..3 }
  # validates :password, presence: true

  # def self.confirm(params)
  #   @user = User.find_by({username: params[:username]})
  #   @user.try(:authenticate, params[:password])
  # end
end
