Rails.application.routes.draw do
  get 'sessions/new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api/v1' do
    resources :accounts, only: [:show, :create, :update]
    resources :sparks, only: [:show, :create, :update]
    resources :impulses, only: [:show, :create, :update]
    resources :messages, only: [:show, :create, :update, :destroy]

    # retrieving array information
    get '/accounts/:id/data', to: 'accounts#data'
    get '/sparks/:id/messages', to: 'sparks#messages'
    get '/impulses/:id/messages', to: 'impulses#messages'
    get '/impulses/:id/sparks', to: 'impulses#sparks'
    post '/session', to: 'sessions#session'
    get '/threads/:id/messages', to: 'message_threads#load'

    # session routes
    get    '/login',   to: 'sessions#new'
    post   '/login',   to: 'sessions#create'
    delete '/logout',  to: 'sessions#destroy'
    get    '/register', to: 'sessions#register'

    # invites
    get '/impulses/:id/invite/new', to: 'impulses#invite_new'
    get '/impulses/invite/:invite_hash', to: 'impulses#invite'

    # account confirmation
    get '/confirmation/:uuid', to: 'accounts#confirmation'

    mount ActionCable.server => '/cable'
  end
end
