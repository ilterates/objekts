Rails.application.routes.draw do
  root "users#index"

  get "/users", to: "users#index", as: "users"
  get "/signup", to: "users#new", as: "new_user"
  post "/users", to: "users#create"
  get "/users/:id", to: "users#show", as: "user"

  get "/login", to: "sessions#new", as: "new_session"
  get "/logout", to: "sessions#destroy"
  post "/sessions", to: "sessions#create"

  # get "/scores/new", to: "scores#new", as: "new_score"
  get "/scores", to: "scores#index", as: "top_scores"
  post "/scores", to: "scores#create"

end
