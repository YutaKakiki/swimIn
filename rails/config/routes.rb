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

      resources :sleeps, only: [:show, :create, :update] do
        collection do
          get :sleeping_friends
          get :return_times
          get :forget_stamp_process
        end
      end

      get "health_check", to: "health_check#index"
    end
  end
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
end
