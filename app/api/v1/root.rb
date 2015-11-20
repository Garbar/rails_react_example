class Root < Grape::API
  helpers do

    def current_user
      User.find_by(email: headers['Uid'])
    end

    def authorize(current_user, policy, record)
      if current_user.nil?
        error! 'You are not authenticated', 401
      else
        error! 'Access Denied', 403 unless policy.constantize.new(current_user, record).index?
      end
    end

  end
  version 'v1'
  mount Estates
end
