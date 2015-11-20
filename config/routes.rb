Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'
  root "main#index", as: 'main'

  mount Root => '/'
end
