Rails.application.routes.draw do
  get 'sessions/new'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api/v1' do
    resources :accounts, only: [:show, :create, :update]
    resources :sparks, only: [:show, :create, :update]
    resources :impulses, only: [:show, :create, :update]
    resources :messages, only: [:show, :create, :update]

    # retrieving array information
    get '/accounts/:id/impulses', to: 'accounts#impulses'
    get '/accounts/:id/sparks', to: 'accounts#sparks'
    get '/sparks/:id/messages', to: 'sparks#messages'
    get '/impulses/:id/messages', to: 'impulses#messages'
    get '/impulses/:id/sparks', to: 'impulses#sparks'

    # session routes
    get    '/login',   to: 'sessions#new'
    post   '/login',   to: 'sessions#create'
    delete '/logout',  to: 'sessions#destroy'

    mount ActionCable.server => '/cable'
  end
end
