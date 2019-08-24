Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api/v1' do
    resources :accounts, only: [:show, :new, :create, :edit, :update]
    resources :sparks, only: [:show, :new, :create, :edit, :update]
    resources :impulses, only: [:show, :new, :create, :edit, :update]
    resources :messages, only: [:show, :new, :create, :edit, :update]
    mount ActionCable.server => '/cable'
  end
end
