Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations",
      }

      resource :relationships, only: [:create, :destroy]

      resources :users, only: [:show, :update, :destroy] do
        collection do
          get :following, :followers
        end
      end


      namespace :auth do
        resource :confirmations, only: [:update]
        resource :sessions, only: [:show]
      end

      resource :sleeps

      # get "health_check", to: "health_check#index"

    end
  end
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
