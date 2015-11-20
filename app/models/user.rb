class User < ActiveRecord::Base
  # Include default devise modules.
  #:registerable, :recoverable, :confirmable,
  devise :database_authenticatable, :rememberable, :trackable, :validatable,
           :omniauthable
  include DeviseTokenAuth::Concerns::User
end
