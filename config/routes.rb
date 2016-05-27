Rails.application.routes.draw do
  root "score#index"

  get "/textures", to: "score#image"
end
