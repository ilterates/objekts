class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.confirm(user_params)
    if @user
      login(@user)
      puts "logged in"
      redirect_to @user
    else
      redirect_to "/" # CHANGE THIS PATH!
      puts "failed to login"
  end

  def destroy
    logout
    redirect_to "/"
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
