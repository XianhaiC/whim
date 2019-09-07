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
    post '/session-sparks', to: 'sessions#session_sparks'
    get '/query_messages/:id', to: 'messages#query_paginate'

    # session routes
    get    '/login',   to: 'sessions#new'
    post   '/login',   to: 'sessions#create'
    delete '/logout',  to: 'sessions#destroy'
    get    '/register', to: 'sessions#register'

    # invites
    get '/impulses/:id/invite/new', to: 'impulses#invite_new'
    get '/impulses/invite/:invite_hash', to: 'impulses#invite'

    mount ActionCable.server => '/cable'
  end
end
