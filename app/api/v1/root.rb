class Root < Grape::API
  helpers do

    def current_user
      User.find_by(email: headers['Uid'])
    end

    def authorize()
      error!('401 Unauthorized', 401) unless current_user
    end

  end
  version 'v1'
  mount Estates
end
